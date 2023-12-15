<?php

namespace App\Http\Controllers\cpanel;

use App\Events\cpanelNotification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\phones;
use App\Models\emails;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\Account;
use App\Models\account_verifications;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\foodmenuFunctions;
use stdClass;

class securityController extends Controller
{
    protected $website_id;
    protected $account;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $this->website_id = Auth::guard('account')->user()->website_id;
            App::setlocale(Auth::guard('account')->user()->language);
            return $next($request);

        })->except(['dologin','login']);
        // Carbon::setLocale('en');
        $this->middleware(function ($request, $next) {
            $this->account = Auth::guard('account')->user();
            return $next($request);
        });
    }
    public function security(Request $request)
    {

        if($request->has(['verifyEmail'])){
            if($this->account->is_master == false){return;}
            if($this->account->email_verification_code == $request->verifyEmail){
                $verifyEmail = Account::where('id',Auth::guard('account')->user()->id)
                                ->update([
                                    'email_verified_at' => Carbon::now()->timestamp,
                                    'email_verification_code' => null,
                                ]);
                if($verifyEmail){
                    return response(['emailVerifyStats' => 1,'msg' => Lang::get('cpanel/security/responses.emailVerified'),'email_verified_at' => Carbon::now()->timestamp]);
                }

            }else{
                return response(['emailVerifyStats' => 0,'msg' => Lang::get('cpanel/security/responses.wrongVerificationCode')]);
            }
        }
        else if($request->has(['verifyEmailResendCode'])){
            if($this->account->is_master == false){return;}
            $lastSetCode = ($this->account->email_verification_code_sent_at ?? 0 ) + (60*10);
            $emailVerificationsToday = account_verifications::where(['account_id'=> $this->account->id  ])->where('email_verification_code_sent_at','>',Carbon::now()->subday(1)->timestamp)->count();

            if ( Carbon::now()->timestamp < $lastSetCode ){
                Account::where('id',$this->account->id)
                    ->update(['email_verification_code_sent_at' => Carbon::now()->timestamp ] );
                    account_verifications::create(['account_id'=> $this->account->id,'email_verification_code_sent_at'=>Carbon::now()->timestamp]);
                return response(['verifyEmailResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/responses.verificationCodeWait')]);
            }else{
                if($emailVerificationsToday > 4){
                    return response(['verifyEmailResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/responses.verificationCodeTryTomorrow')]);
                }else{
                    //replace 1+1=2 with send mail with verification code
                    if(1 + 1 == 2){
                    $resedCode = Account::where('id',$this->account->id)
                        ->update(['email_verification_code_sent_at' => Carbon::now()->timestamp ] );
                    account_verifications::create(['account_id'=> $this->account->id,'email_verification_code_sent_at'=>Carbon::now()->timestamp ]);
                    return response(['verifyEmailResendCodeStats' => 1, 'msg' => Lang::get('cpanel/security/responses.emailVirifyCodeResent'),'now'=> Carbon::now()->timestamp]);
                    }else{
                        return response(['verifyEmailResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/responses.responseError')]);
                    }
                }
            }
        }
        else if($request->has(['changeEmail'])){
            if($this->account->is_master == false){return;}
            if($this->account->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => $this->account->id,
                    'password_fails' => $this->account->password_fails,
                ],$this->account->website_id);

                Account::where('id',$this->account->id)->update(['account_unblock_code' => Str::random(100)]);
                ///send email with the unblock link
            }
            ///
            $phonesChangedLast3Days = phones::where('created_at','>',Carbon::now()->subDays(3)->timestamp)->where('account_id' , $this->account->id )->count();
            if($phonesChangedLast3Days > 0){
                //send email that a try to change email field because phone changed less than 3 days ago. and explain why.
                return response(['changeEmailStats' => 4, 'msg' => Lang::get('cpanel/security/responses.changeEmailPhoneChanged3daysBefore') ]);
            }
            ///
            $emailsChangedToday = emails::where('created_at','>',Carbon::now()->subHours(24)->timestamp)->where('account_id', $this->account->id )->count();
            if($emailsChangedToday > 2){
                return response(['changeEmailStats' => 2, 'msg' => Lang::get('cpanel/security/responses.emailChangeMaxNum') ]);
            }
            $validate = Validator::make(['newEmail' => $request->newEmail],[
                'newEmail' => 'required|email|unique:accounts,email',
            ],[
                'newEmail.required' => Lang::get('cpanel/security/responses.changeEmailRequired'),
                'newEmail.email' => Lang::get('cpanel/security/responses.emailEmail'),
                'newEmail.unique' => Lang::get('cpanel/security/responses.newEmailUnique'),
            ]);
            if($validate->fails()){
                return response(['changeEmailStats' => 0, 'errors' => $validate->errors() ]);
            }else{
                if(Hash::check($request->password, $this->account->password)){
                    $newCode = strtolower(Str::random(6));
                    $doChangeEmail = Account::where('id',$this->account->id)
                                    ->update(([
                                        'email' => strip_tags($request->newEmail),
                                        'email_verified_at'=> Null ,
                                        'email_verification_code'=> $newCode,
                                        'email_verification_code_sent_at' => Carbon::now()->timestamp,
                                        'password_fails' => 0,
                                    ]));
                    if($doChangeEmail){
                        ///send email to the new email address with the new verifiction code
                        $emails = new emails();
                        $emails->account_id = $this->account->id;
                        $emails->old_email = $this->account->email;
                        $emails->new_email = strip_tags($request->newEmail);
                        $emails->save();
                        //send short sms tell him that email changed and if its not him he can recover password and change it.
                        return response([
                            'changeEmailStats'=> 1,
                            'msg' => Lang::get('cpanel/security/responses.newEmailChanged'),
                            'now' => Carbon::now()->timestamp,
                        ]);
                    }else{
                        return response(['changeEmailStats' => 2, 'msg' => Lang::get('cpanel/security/responses.unknownError') ]);
                    }
                }else{
                    Account::where('id',$this->account->id)->increment('password_fails');
                    return response(['changeEmailStats' => 3, 'msg' => Lang::get('cpanel/security/responses.wrongPassword') ]);
                }
            }
        }
        //////

        else if ($request->has(['createPhone'])){
            if($this->account->is_master == false){return;}
            if($this->account->phone != null){return;}
            $validator = Validator::make(['createPhone' => $request->createPhone],[
                'createPhone' => 'required|regex:/^\+\d+$/|unique:accounts,phone|min:7'
            ],[
                'createPhone.required' => Lang::get('cpanel/security/responses.phoneRequired'),
                'createPhone.regex' => Lang::get('cpanel/security/responses.phoneRegex'),
                'createPhone.min' => Lang::get('cpanel/security/responses.phoneRegex'),
                'createPhone.unique' => Lang::get('cpanel/security/responses.newPhoneUnique'),
            ]);
            if($validator->fails()){
                return response(['createPhoneStatus'=>0, 'errors' => $validator->errors() ]);
            }else{
                $newCode = strtolower(Str::random(6));
                if( foodmenuFunctions::sendVeryficationSMS(strip_tags($request->createPhone),$newCode,1) ){
                    $addPhoneNumber = Account::where('id',$this->account->id)
                        ->update(['phone' => strip_tags($request->createPhone),'phone_verified_at'=> Null ,'phone_verification_code'=> $newCode,'phone_verification_code_sent_at' => Carbon::now()->timestamp]);
                    if($addPhoneNumber){
                        return response(['createPhoneStatus'=>1, 'msg' => Lang::get('cpanel/security/responses.newPhoneCreated'), 'now' => Carbon::now()->timestamp ]);
                    }else{
                    return response(['createPhoneStatus'=>2, 'msg' => Lang::get('cpanel/security/responses.unknownError') ]);

                    }
                }else{
                    return response(['createPhoneStatus'=>2, 'msg' => Lang::get('cpanel/security/responses.unknownError') ]);

                }
            }
        }
        else if($request->has(['verifyPhone'])){
            if($this->account->is_master == false){return;}
            if($this->account->phone_verification_code == $request->verifyPhone){
                Account::where('id',$this->account->id)
                                ->update([
                                    'phone_verified_at' => Carbon::now()->timestamp,
                                    'phone_verification_code' => null,
                            ]);
                return response(['phoneVerifyStats' => 1,'msg' => Lang::get('cpanel/security/responses.phoneVerified'),'phone_verified_at'=>Carbon::now()->timestamp]);
            }else{
                return response(['phoneVerifyStats' => 0,'msg' => Lang::get('cpanel/security/responses.wrongVerificationCode')]);
            }
        }
        else if($request->has(['verifyPhoneResendCode'])){
            if($this->account->is_master == false){return;}
            $lastSetCode = ($this->account->phone_verification_code_sent_at ?? 0 ) + (60*10);
            $phoneVerificationsToday = account_verifications::where(['account_id'=> $this->account->id  ])->where('phone_verification_code_sent_at','>',Carbon::now()->subday(1)->timestamp)->count();

            if ( Carbon::now()->timestamp < $lastSetCode ){
                Account::where('id',$this->account->id)
                    ->update(['phone_verification_code_sent_at' => Carbon::now()->timestamp ] );
                    account_verifications::create(['account_id'=> $this->account->id,'phone_verification_code_sent_at'=>Carbon::now()->timestamp]);
                return response(['verifyPhoneResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/responses.verificationCodeWait')]);
            }
            else{
                if($phoneVerificationsToday > 3){
                    return response(['verifyPhoneResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/responses.verificationCodeTryTomorrow')]);
                }else{
                    $code = $this->account->phone_verification_code;
                    $phone = $this->account->phone;
                    if(foodmenuFunctions::sendVeryficationSMS($phone,$code)){
                        Account::where('id',$this->account->id)
                            ->update(['phone_verification_code_sent_at' => Carbon::now()->timestamp ] );
                        account_verifications::create(['account_id'=> $this->account->id,'phone_verification_code_sent_at' => Carbon::now()->timestamp ]);
                        return response(['verifyPhoneResendCodeStats' => 1, 'msg' => Lang::get('cpanel/security/responses.phoneVirifyCodeResent'),'now'=>Carbon::now()->timestamp]);
                    }else{
                        return response(['verifyPhoneResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/responses.responseError')]);
                    }
                }
            }
        }
        else if($request->has('changePhone')){
            if($this->account->is_master == false){return;}
            if($this->account->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => $this->account->id,
                    'password_fails' => $this->account->password_fails,
                ],$this->account->website_id);

                Account::where('id',$this->account->id)->update(['account_unblock_code' => Str::random(100)]);
                ///send email with the unblock link
            }
            /////////
            $emailsChangedLast3Days = emails::whereDate('created_at','>',Carbon::now()->subDay(3)->timestamp)->where('account_id', $this->account->id )->count();
            if($emailsChangedLast3Days > 0){
                ///send sms inform email trying to change
                return response(['newPhoneStats' => 4, 'msg' => Lang::get('cpanel/security/responses.changePhoneEmailChanged3daysBefore') ]);
            }
            ///////////
            $phonesChangedToday = phones::where('created_at','>',Carbon::now()->subHours(24)->timestamp)->where('account_id' , $this->account->id )->count();

            if($phonesChangedToday > 2){
                return response(['newPhoneStats' => 2, 'msg' => Lang::get('cpanel/security/responses.phoneChangeMaxNum') ]);
            }
            ////////
            $validate = Validator::make(['newPhone' => $request->newPhone],[
                'newPhone' => 'required|unique:accounts,phone|min:7|regex:/^\+\d+$/',
            ],[
                'newPhone.required' => Lang::get('cpanel/security/responses.phoneRequired'),
                'newPhone.regex' => Lang::get('cpanel/security/responses.phoneRegex'),
                'newPhone.min' => Lang::get('cpanel/security/responses.phoneRegex'),
                'newPhone.unique' => Lang::get('cpanel/security/responses.newPhoneUnique'),
            ]);
            if($validate->fails()){
                return response(['newPhoneStats' => 0, 'errors' => $validate->errors() ]);
            }
            if(Hash::check($request->password, $this->account->password)){
                $newCode = strtolower(Str::random(6));
                if(foodmenuFunctions::sendVeryficationSMS($request->newPhone,$newCode)){
                    Account::where('id',$this->account->id)
                    ->update(([
                        'phone' => strip_tags($request->newPhone),
                        'phone_verified_at'=> Null ,
                        'phone_verification_code'=> $newCode,
                        'phone_verification_code_sent_at' => Carbon::now()->timestamp,
                        'password_fails' => 0,
                    ]));
                    $phones = new phones();
                    $phones->account_id = $this->account->id;
                    $phones->old_phone = $this->account->phone;
                    $phones->new_phone = $request->newPhone;
                    $phones->save();
                    //send email that phone number changed and tell him if its not him he can recover using email and email can'e change 3 days. advice to change password as well
                    return response([
                        'newPhoneStats'=> 1,
                        'msg' => Lang::get('cpanel/security/responses.newPhoneChanged'),
                        'now' => Carbon::now()->timestamp,
                    ]);
                }else{
                    return response(['newPhoneStats' => 2, 'msg' => Lang::get('cpanel/security/responses.unknownError') ]);
                }
            }else{
                Account::where('id',$this->account->id)->increment('password_fails');
                return response(['newPhoneStats' => 3, 'msg' => Lang::get('cpanel/security/responses.wrongPassword') ]);
            }

        }
        //////
        else if($request->has(['changePassword'])){
            if($this->account->is_master == false){return;}
            if($this->account->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => $this->account->id,
                    'password_fails' => $this->account->password_fails,
                ],$this->account->website_id);
                Account::where('id',$this->account->id)->update(['account_unblock_code' => Str::random(100)]);
                ///send email with the unblock link
                return;
            }

            $passwordChangedAt = $this->account->password_changed_at;
            if($passwordChangedAt > Carbon::now()->addHours(-1)->timestamp){
                return response(['changePasswordStat' => 4, 'msg' => lang::get('cpanel/security/responses.passwordChangeMaxNum')]);
            }


            if(!Hash::check($request->oldPassword, $this->account->password) ){
                Account::where('email',$this->account->email)->increment('password_fails');
                return response(['changePasswordStat' => 3, 'msg' => lang::get('cpanel/security/responses.wrongOldPassword')]);
            }
            if($request->oldPassword == $request->newPassword){
                return response(['changePasswordStat' => 2, 'msg' => Lang::get('cpanel/security/responses.passwordChangedSame')]);
            }

            $validate = Validator::make(['newPassword' => $request->newPassword,'newPasswordConfirm' => $request->newPasswordConfirm],[
                'newPassword' => 'required|min:8|max:100|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPasswordConfirm',
                'newPasswordConfirm' => 'required|min:8|max:100|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPassword',
            ],[
                'newPassword.required' => lang::get('cpanel/security/responses.newPasswordRequired'),
                'newPassword.min' => lang::get('cpanel/security/responses.newPasswordMin'),
                'newPassword.max' => lang::get('cpanel/security/responses.newPasswordMax'),
                'newPassword.regex' => lang::get('cpanel/security/responses.newPasswordRegex'),
                'newPassword.same' => lang::get('cpanel/security/responses.newPasswordSame'),

                'newPasswordConfirm.required' => lang::get('cpanel/security/responses.newPasswordRequired'),
                'newPasswordConfirm.min' => lang::get('cpanel/security/responses.newPasswordMin'),
                'newPasswordConfirm.max' => lang::get('cpanel/security/responses.newPasswordMax'),
                'newPasswordConfirm.regex' => lang::get('cpanel/security/responses.newPasswordRegex'),
                'newPasswordConfirm.same' => lang::get('cpanel/security/responses.newPasswordSame'),
            ]);
            if ($validate->fails()) {
                return response(['changePasswordStat' => 0, 'error' => $validate->errors()]);
            }

            if( Hash::check($request->oldPassword, $this->account->password) ){
                $changePassword = Account::where('id',$this->account->id)
                                    ->update([
                                        'password' => bcrypt($request->newPassword),
                                        'password_changed_at' => Carbon::now()->timestamp,
                                        'password_fails' => 0,
                                    ]);
                if($changePassword){
                    //send email that password changed
                    // Auth::guard('account')->logout();
                    // $request->session()->invalidate();
                    // $request->session()->regenerateToken();
                    return response(['changePasswordStat' => 1, 'msg' => Lang::get('cpanel/security/responses.passwordChanged')]);
                }else{
                    return response(['changePasswordStat' => 4, 'msg' => lang::get('cpanel/security/responses.unknownError')]);
                }
            }


        }
    }
}
