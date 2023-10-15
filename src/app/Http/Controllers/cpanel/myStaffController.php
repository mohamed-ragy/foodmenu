<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\delivery;
use App\Models\website;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\foodmenuFunctions;
use stdClass;
use App\Models\activityLog;
use App\Models\cpanelSettings;
use Carbon\Carbon;

class myStaffController extends Controller
{
    protected $website_id;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $this->website_id = Auth::guard('account')->user()->website_id;
            App::setlocale(Auth::guard('account')->user()->language);
            return $next($request);

        });
        // Carbon::setLocale('en');
    }
    public function mystaff(Request $request){
        if($request->has('createNewDeliveryAccount')){
            if($request->deliveryName == ''){
                    return response(['createNewDeliveryAccountStatus' => 0 ,'msg' => Lang::get('cpanel/staff/responses.deliveryNameRequires')]);
            }

            $domainName = website::where('id',$this->website_id)->pluck('domainName')->first();
            $deliveryName = strip_tags($request->deliveryName).'@'.$domainName;
            if($request->password == ''){
                return response(['createNewDeliveryAccountStatus' => 2 ,'msg' => Lang::get('cpanel/staff/responses.passwordRequired')]);
            }

            $deliveryNameCheack = delivery::where('deliveryName',$deliveryName)->count();
            if($deliveryNameCheack > 0){
                return response(['createNewDeliveryAccountStatus' => 3 ,'msg' => Lang::get('cpanel/staff/responses.deliveryNameUnique')]);
            }

            $validator = Validator::make(['deliveryName' => $request->deliveryName],[
                'deliveryName' => 'regex:/^[a-zA-Z0-9_]+$/'
            ],[
                'deliveryName.regex' => Lang::get('cpanel/staff/responses.deliveryNameRegex'),
            ]);
            if($validator->fails()){
                return response(['createNewDeliveryAccountStatus' => 5 ,'msg' => $validator->errors()]);
            }


            $deliveryAccountNumber = delivery::where('website_id',$this->website_id)->count();
            $plan = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()];
            if($deliveryAccountNumber >= $plan['deliveryAccounts']){
                return response(['createNewDeliveryAccountStatus' => 6 ,'msg' => Lang::get('cpanel/staff/responses.deliveryNamePlanLimit')]);
            }

            $createNewDelivery = delivery::create([
                'website_id' => $this->website_id,
                'deliveryName' => $deliveryName,
                'password' => bcrypt($request->password),
                'lastSeen' => null,
            ]);
            if($createNewDelivery){
                activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 18,
                    'delivery_id' => $createNewDelivery->id,
                    'delivery_name' => $deliveryName,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                return response(['createNewDeliveryAccountStatus' => 1 ,'msg' => Lang::get('cpanel/staff/responses.deliveryAccountCreated'),'deliveryAccount' => $createNewDelivery]);
            }else{
                return response(['createNewDeliveryAccountStatus' => 4 ,'msg' => Lang::get('cpanel/staff/responses.deliveryAccountCreateFail')]);
            }
        }
        else if($request->has(['deleteDeliveryAccount'])){
            if(str_split(Auth::guard('account')->user()->authorities)[2] == false){
                return;
            }

            $deleteDeliveryAccount = delivery::where(['id'=>$request->deleteDeliveryAccount,'website_id' => $this->website_id])->delete();
            if($deleteDeliveryAccount){
                activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 19,
                    'delivery_id' => $request->deleteDeliveryAccount,
                    'delivery_name' => $request->deliveryName,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                return response(['deleteDeliveryAccountStatus' => 1,'msg'=>Lang::get('cpanel/staff/responses.deliveryAccountDeleted')]);
            }else{
                return response(['deleteDeliveryAccountStatus' => 0,'msg'=>Lang::get('cpanel/staff/responses.deliveryAccountDeletefaild')]);
            }

        }
        else if($request->has(['changeDeliveryPassword'])){

            if($request->password == ''){
                return response(['changeDeliveryPasswordStats' => 0 ,'msg' => Lang::get('cpanel/staff/responses.passwordRequired')]);
            }

            $updateDeliveryAccountPassword = delivery::where(['id'=>$request->changeDeliveryPassword,'website_id'=>$this->website_id])->update([
                'password' => bcrypt($request->password),
                'updated_at' => Carbon::now()->timestamp
            ]);
            if($updateDeliveryAccountPassword){
                activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 20,
                    'delivery_id' => $request->deliveryAccountId,
                    'delivery_name' => delivery::where('id',$request->deliveryAccountId)->pluck('deliveryName')->first(),
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                return response(['changeDeliveryPasswordStats' => 1 ,'msg' => Lang::get('cpanel/staff/responses.editDeliveryAccountPasswordSaved')]);
            }else{
                return response(['changeDeliveryPasswordStats' => 2 ,'msg' => Lang::get('cpanel/staff/responses.editDeliveryAccountPasswordSavefaild')]);
            }

        }
        else if($request->has('unblockSubAccount')){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $updateAccount = Account::where(['website_id' => $this->website_id,'id'=>$request->account_id])->update(['password_fails' => 0,'account_unblock_code' => null,'updated_at' => Carbon::now()->timestamp]);
            if($updateAccount){
                return response(['unblockSubAccountStatus' => 1,'msg'=> Lang::get('cpanel/staff/responses.unblockSubAccountSaved')]);
            }else{
                return response(['unblockSubAccountStatus' => 0,'msg'=> Lang::get('cpanel/staff/responses.unblockSubAccountFail')]);
            }
        }
        else if($request->has(['forceLogout'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            foodmenuFunctions::notification('0',null,[
                'account_id' => $request->forceLogout,
            ]);
            return response(['forceLogoutStatus' => 1,'msg'=> Lang::get('cpanel/staff/responses.forceLogoutSent')]);
        }
        else if($request->has(['newSubAccount'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }

            $planAccountsLimit = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['subAccounts'];
            $currentSubAccounts = Account::where(['website_id' => $this->website_id,'is_master' => false])->count();
            if($planAccountsLimit <= $currentSubAccounts){
                return response(['newSubAccountStatus' => 2,'msg'=>Lang::get('cpanel/staff/responses.subAccountsLimitError')]);
            }
            $validation = Validator::make(['email'=>$request->email,'password'=>$request->password,'name'=>$request->name],[
                'email' => 'required|email|unique:accounts,email',
                'name' => 'required|regex:/^[a-zA-Z0-9_]+$/',
                'password' => 'required|min:8|max:20|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            ],[
                'email.required' => Lang::get('cpanel/staff/responses.nameRequired'),
                'email.email' => Lang::get('cpanel/staff/responses.nameRegex'),
                'email.unique' => Lang::get('cpanel/staff/responses.loginNameUnique'),
                'name.required' => Lang::get('cpanel/staff/responses.nameRequired'),
                'name.regex' => Lang::get('cpanel/staff/responses.nameRegex'),
                'password.required' => lang::get('cpanel/staff/responses.newPasswordRequired'),
                'password.min' => lang::get('cpanel/staff/responses.newPasswordMin'),
                'password.max' => lang::get('cpanel/staff/responses.newPasswordMax'),
                'password.regex' => lang::get('cpanel/staff/responses.newPasswordRegex'),
            ]);

            if(!$validation->fails()){
                $authorities = '';
                $request->authority0 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
                $request->authority1 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
                $request->authority2 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
                $request->authority3 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
                $request->authority4 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
                $request->authority5 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
                $createNewAccount = Account::create([
                    'authorities' => $authorities,
                    'register' => 3,
                    'is_master' => false,
                    'website_id' => $this->website_id,
                    'email' => strip_tags($request->email),
                    'name' => strip_tags($request->name),
                    'password' => bcrypt($request->password),
                    'email_verified_at' => carbon::now()->timestamp,
                    'email_verification_code_sent_at' => Carbon::now()->timestamp,
                    'password_fails' => 0,
                ]);
                if($createNewAccount){
                    $createCpanelSettings = cpanelSettings::create([
                        'account_id' => $createNewAccount->id,
                        'language' => Auth::guard('account')->user()->language,
                    ]);
                    if($createCpanelSettings){
                        activityLog::create([
                            'website_id' => $this->website_id,
                            'code' => 67,
                            'subaccount_id' => $createNewAccount->id,
                            'subaccount_name' => $createNewAccount->name,
                            'account_id' => Auth::guard('account')->user()->id,
                            'account_name' => Auth::guard('account')->user()->name,
                        ]);
                        return response(['newSubAccountStatus' => 1,'msg' => Lang::get('cpanel/staff/responses.subAccountCreated'),'subaccount'=>$createNewAccount]);
                    }else{
                        Account::where('id',$createNewAccount->id)->delete();
                        return response(['newSubAccountStatus' => 3,'msg' => Lang::get('cpanel/staff/responses.subAccountCreateFail')]);
                    }
                }else{
                    return response(['newSubAccountStatus' => 3,'msg' => Lang::get('cpanel/staff/responses.subAccountCreateFail')]);
                }
            }else{
                return response(['newSubAccountStatus'=> 0 ,'errors' => $validation->errors()]);
            }
        }
        else if($request->has(['deleteSubAccount'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $deleteSubAccount = Account::where(['id'=>$request->deleteSubAccount,'website_id' => $this->website_id])->delete();
            if($deleteSubAccount){
                foodmenuFunctions::notification('0',[
                    'website_id' => $this->website_id,
                    'code' => 68,
                    'subaccount_id' => $request->deleteSubAccount,
                    'subaccount_name' => $request->subaccountName,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'account_id' => $request->deleteSubAccount,
                ]);
                return response(['deleteSubAccountStatus' => 1,'msg'=>Lang::get('cpanel/staff/responses.subAccountDeleted')]);
            }else{
                return response(['deleteSubAccountStatus' => 0,'msg'=>Lang::get('cpanel/staff/responses.subAccountDeleteFail')]);
            }

        }
        else if($request->has(['updateSubAccountPassword'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $validation = Validator::make(['password'=>$request->password],[
                'password' => 'required|min:8|max:20|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            ],[
                'password.required' => lang::get('cpanel/staff/responses.newPasswordRequired'),
                'password.min' => lang::get('cpanel/staff/responses.newPasswordMin'),
                'password.max' => lang::get('cpanel/staff/responses.newPasswordMax'),
                'password.regex' => lang::get('cpanel/staff/responses.newPasswordRegex'),
            ]);

            if(!$validation->fails()){
                $updateSubAccountPassword = Account::where(['id'=>$request->updateSubAccountPassword,'website_id' => $this->website_id])
                    ->update(['password'=>bcrypt($request->password),'updated_at'=>Carbon::now()->timestamp]);
                if($updateSubAccountPassword){
                    activityLog::create([
                        'website_id' => $this->website_id,
                        'code' => 69,
                        'subaccount_id' => $request->updateSubAccountPassword,
                        'subaccount_name' => $request->subaccountName,
                        'account_id' => Auth::guard('account')->user()->id,
                        'account_name' => Auth::guard('account')->user()->name,
                    ]);
                    return response(['updateSubAccountPasswordStatus' => 1,'msg'=>Lang::get('cpanel/staff/responses.subAccountPasswordUpdated')]);
                }else{
                    return response(['updateSubAccountPasswordStatus' => 2,'msg'=>Lang::get('cpanel/staff/responses.subAccountPasswordUpdateFail')]);
                }
            }else{
                return response(['updateSubAccountPasswordStatus' => 0,'error'=>$validation->errors()]);
            }
        }
        else if($request->has(['ChangeSubAccountAuthorities'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $authorities = '';
            $request->authority0 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
            $request->authority1 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
            $request->authority2 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
            $request->authority3 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
            $request->authority4 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
            $request->authority5 == '1' ? $authorities = $authorities.'1' : $authorities = $authorities.'0'; 
            $updateAccountAuthorities = Account::where(['id'=>$request->accountId,'website_id'=> $this->website_id])->update(['authorities'=> $authorities,'updated_at'=>Carbon::now()->timestamp]);
            if($updateAccountAuthorities){
                foodmenuFunctions::notification('reload.update.account',[
                    'website_id' => $this->website_id,
                    'code' => 70,
                    'subaccount_id' => $request->accountId,
                    'subaccount_name' => $request->subaccountName,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'account_id' => $request->accountId,
                ]);
                return response(['ChangeSubAccountAuthoritiesStatus' => 1,'msg'=>Lang::get('cpanel/staff/responses.accountAuthoritiesUpdated')]);
            }else{
                return response(['ChangeSubAccountAuthoritiesStatus' => 0,'msg'=>Lang::get('cpanel/staff/responses.accountAuthoritiesUpdateFail')]);
            }

        }

    }
}
