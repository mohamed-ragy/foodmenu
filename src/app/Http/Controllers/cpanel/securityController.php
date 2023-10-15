<?php

namespace App\Http\Controllers\cpanel;

use App\Events\cpanelNotification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\cpanelSettings;
use App\Models\phones;
use App\Models\emails;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\website;
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

    }
    public function security(Request $request)
    {

        if($request->has(['verifyEmail'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            if(Auth::guard('account')->user()->email_verification_code == $request->verifyEmail){
                $verifyEmail = Account::where('id',Auth::guard('account')->user()->id)
                                ->update([
                                    'email_verified_at' => Carbon::now()->timestamp,
                                    'email_verification_code' => null,
                                ]);
                if($verifyEmail){
                    return response(['emailVerifyStats' => 1,'msg' => Lang::get('cpanel/security/email.emailVerified')]);
                }

            }else{
                return response(['emailVerifyStats' => 0,'msg' => Lang::get('cpanel/security/email.wrongVerificationCode')]);
            }
        }
        else if($request->has(['verifyEmailResendCode'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $lastSetCode = Auth::guard('account')->user()->email_verification_code_sent_at ?? 0 + (60*10);
            $emailVerificationsToday = account_verifications::where(['account_id'=> Auth::guard('account')->user()->id  ])->where('email_verification_code_sent_at','>',Carbon::now()->subday(1)->timestamp)->count();

            if ( Carbon::now()->timestamp < $lastSetCode ){
                Account::where('id',Auth::guard('account')->user()->id)
                    ->update(['email_verification_code_sent_at' => Carbon::now()->timestamp ] );
                    account_verifications::create(['account_id'=> Auth::guard('account')->user()->id,'email_verification_code_sent_at'=>Carbon::now()->timestamp]);
                return response(['verifyEmailResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/email.wait')]);
            }else{
                if($emailVerificationsToday > 4){
                    return response(['verifyEmailResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/email.tryTomorrow')]);
                }else{
                    //replace 1+1=2 with send mail with verification code
                    if(1 + 1 == 2){
                    $resedCode = Account::where('id',Auth::guard('account')->user()->id)
                        ->update(['email_verification_code_sent_at' => Carbon::now()->timestamp ] );
                    account_verifications::create(['account_id'=> Auth::guard('account')->user()->id,'email_verification_code_sent_at'=>Carbon::now()->timestamp ]);
                    return response(['verifyEmailResendCodeStats' => 1, 'msg' => Lang::get('cpanel/security/email.emailVirifyCodeResent'),'now'=> Carbon::now()]);
                    }else{
                        return response(['verifyEmailResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/email.responseError')]);
                    }
                }
            }
        }
        else if($request->has(['changeEmail'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            if(Auth::guard('account')->user()->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => Auth::guard('account')->user()->id,
                    'password_fails' => Auth::guard('account')->user()->password_fails,
                ],Auth::guard('account')->user()->website_id);

                Account::where('id',Auth::guard('account')->user()->id)->update(['account_unblock_code' => Str::random(100)]);
                ///send email with the unblock link
            }
            ///
            $phonesChangedLast3Days = phones::where('created_at','>',Carbon::now()->subDays(3)->timestamp)->where('account_id' , Auth::guard('account')->user()->id )->count();
            if($phonesChangedLast3Days > 0){
                //send email that a try to change email field because phone changed less than 3 days ago. and explain why.
                return response(['changeEmailStats' => 4, 'msg' => Lang::get('cpanel/security/email.changeEmailPhoneChanged3daysBefore') ]);
            }
            ///
            $emailsChangedToday = emails::where('created_at','>',Carbon::now()->subHours(24)->timestamp)->where('account_id', Auth::guard('account')->user()->id )->count();
            if($emailsChangedToday > 2){
                return response(['changeEmailStats' => 2, 'msg' => Lang::get('cpanel/security/email.emailChangeMaxNum') ]);
            }
            $validate = Validator::make(['newEmail' => $request->newEmail],[
                'newEmail' => 'required|email|unique:accounts,email',
            ],[
                'newEmail.required' => Lang::get('cpanel/security/email.changeEmailRequired'),
                'newEmail.email' => Lang::get('cpanel/security/email.emailEmail'),
                'newEmail.unique' => Lang::get('cpanel/security/email.newEmailUnique'),
            ]);
            if($validate->fails()){
                return response(['changeEmailStats' => 0, 'errors' => $validate->errors() ]);
            }else{
                if(Hash::check($request->password, Auth::guard('account')->user()->password)){
                    $newCode = strtolower(Str::random(6));
                    $doChangeEmail = Account::where('id',Auth::guard('account')->user()->id)
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
                        $emails->account_id = Auth::guard('account')->user()->id;
                        $emails->old_email = Auth::guard('account')->user()->email;
                        $emails->new_email = $request->newEmail;
                        $emails->save();
                        //send short sms tell him that email changed and if its not him he can recover password and change it.
                        return response([
                            'changeEmailStats'=> 1,
                            'msg' => Lang::get('cpanel/security/email.newEmailChanged'),
                        ]);
                    }else{
                        return response(['changeEmailStats' => 2, 'msg' => Lang::get('cpanel/security/email.unknownError') ]);
                    }
                }else{
                    Account::where('id',Auth::guard('account')->user()->id)->increment('password_fails');
                    return response(['changeEmailStats' => 3, 'msg' => Lang::get('cpanel/security/email.wrongPassword') ]);
                }
            }
        }
        //////

        else if ($request->has(['createPhone'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            if(Auth::guard('account')->user()->phone != null){return;}
            $validator = Validator::make(['createPhone' => $request->createPhone],[
                'createPhone' => 'required|regex:/^\+\d+$/|unique:accounts,phone|min:7'
            ],[
                'createPhone.required' => Lang::get('cpanel/security/phone.phoneRequired'),
                'createPhone.regex' => Lang::get('cpanel/security/phone.phoneRegex'),
                'createPhone.min' => Lang::get('cpanel/security/phone.phoneRegex'),
                'createPhone.unique' => Lang::get('cpanel/security/phone.newPhoneUnique'),
            ]);
            if($validator->fails()){
                return response(['createPhoneStatus'=>0, 'errors' => $validator->errors() ]);
            }else{
                $newCode = strtolower(Str::random(6));
                if( foodmenuFunctions::sendVeryficationSMS($request->createPhone,$newCode,1) ){
                    $addPhoneNumber = Account::where('id',Auth::guard('account')->user()->id)
                        ->update(['phone' => strip_tags($request->createPhone),'phone_verified_at'=> Null ,'phone_verification_code'=> $newCode,'phone_verification_code_sent_at' => Carbon::now()->timestamp]);
                    if($addPhoneNumber){
                        return response(['createPhoneStatus'=>1, 'msg' => Lang::get('cpanel/security/phone.newPhoneCreated') ]);
                    }else{
                    return response(['createPhoneStatus'=>2, 'msg' => Lang::get('cpanel/security/phone.unknownError') ]);

                    }
                }else{
                    return response(['createPhoneStatus'=>2, 'msg' => Lang::get('cpanel/security/phone.unknownError') ]);

                }
            }
        }
        else if($request->has(['verifyPhone'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            if(Auth::guard('account')->user()->phone_verification_code == $request->verifyPhone){
                Account::where('id',Auth::guard('account')->user()->id)
                                ->update([
                                    'phone_verified_at' => Carbon::now()->timestamp,
                                    'phone_verification_code' => null,
                            ]);
                return response(['phoneVerifyStats' => 1,'msg' => Lang::get('cpanel/security/phone.phoneVerified')]);
            }else{
                return response(['phoneVerifyStats' => 0,'msg' => Lang::get('cpanel/security/phone.wrongVerificationCode')]);
            }
        }
        else if($request->has(['verifyPhoneResendCode'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $lastSetCode = Auth::guard('account')->user()->phone_verification_code_sent_at ?? 0 + (60 *10);
            $emailVerificationsToday = account_verifications::where(['account_id'=> Auth::guard('account')->user()->id ])->where('phone_verification_code_sent_at','>',Carbon::now()->subday(1)->timestamp)->count();

            if ( Carbon::now() < $lastSetCode ){
                Account::where('id',Auth::guard('account')->user()->id)
                    ->update(['phone_verification_code_sent_at' => Carbon::now()->timestamp] );
                account_verifications::create(['account_id'=> Auth::guard('account')->user()->id,'phone_verification_code_sent_at'=>Carbon::now()->timestamp ]);
                return response(['verifyPhoneResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/phone.wait')]);
            }
            else{
                if($phoneVerificationsToday > 3){
                    return response(['verifyPhoneResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/phone.tryTomorrow')]);
                }else{
                    $code = Auth::guard('account')->user()->phone_verification_code;
                    $phone = Auth::guard('account')->user()->phone;
                    if(foodmenuFunctions::sendVeryficationSMS($phone,$code)){
                        Account::where('id',Auth::guard('account')->user()->id)
                            ->update(['phone_verification_code_sent_at' => Carbon::now()->timestamp ] );
                        account_verifications::create(['account_id'=> Auth::guard('account')->user()->id,'phone_verification_code_sent_at' => Carbon::now()->timestamp ]);
                        return response(['verifyPhoneResendCodeStats' => 1, 'msg' => Lang::get('cpanel/security/phone.phoneVirifyCodeResent')]);
                    }else{
                        return response(['verifyPhoneResendCodeStats' => 0, 'msg' => Lang::get('cpanel/security/phone.responseError')]);
                    }
                }
            }
        }
        else if($request->has('changePhone')){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            /////////////
            if(Auth::guard('account')->user()->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => Auth::guard('account')->user()->id,
                    'password_fails' => Auth::guard('account')->user()->password_fails,
                ],Auth::guard('account')->user()->website_id);

                Account::where('id',Auth::guard('account')->user()->id)->update(['account_unblock_code' => Str::random(100)]);
                ///send email with the unblock link
            }
            /////////
            $emailsChangedLast3Days = emails::whereDate('created_at','>',Carbon::now()->subDay(3)->timestamp)->where('account_id', Auth::guard('account')->user()->id )->count();
            if($emailsChangedLast3Days > 0){
                ///send sms inform email trying to change
                return response(['newPhoneStats' => 4, 'msg' => Lang::get('cpanel/security/phone.changePhoneEmailChanged3daysBefore') ]);
            }
            ///////////
            $phonesChangedToday = phones::where('created_at','>',Carbon::now()->subHours(24)->timestamp)->where('account_id' , Auth::guard('account')->user()->id )->count();

            if($phonesChangedToday > 2){
                return response(['newPhoneStats' => 2, 'msg' => Lang::get('cpanel/security/phone.phoneChangeMaxNum') ]);
            }
            ////////
            $validate = Validator::make(['newPhone' => $request->newPhone],[
                'newPhone' => 'required|unique:accounts,phone|min:7|regex:/^\+\d+$/',
            ],[
                'newPhone.required' => Lang::get('cpanel/security/phone.changePhoneRequired'),
                'newPhone.regex' => Lang::get('cpanel/security/phone.phoneRegex'),
                'newPhone.min' => Lang::get('cpanel/security/phone.phoneRegex'),
                'newPhone.unique' => Lang::get('cpanel/security/phone.newPhoneUnique'),
            ]);
            if($validate->fails()){
                return response(['newPhoneStats' => 0, 'errors' => $validate->errors() ]);
            }
            if(Hash::check($request->password, Auth::guard('account')->user()->password)){
                $newCode = strtolower(Str::random(6));
                if(foodmenuFunctions::sendVeryficationSMS($request->newPhone,$newCode)){
                    Account::where('id',Auth::guard('account')->user()->id)
                    ->update(([
                        'phone' => strip_tags($request->newPhone),
                        'phone_verified_at'=> Null ,
                        'phone_verification_code'=> $newCode,
                        'phone_verification_code_sent_at' => Carbon::now()->timestamp,
                        'password_fails' => 0,
                    ]));
                    $phones = new phones();
                    $phones->account_id = Auth::guard('account')->user()->id;
                    $phones->old_phone = Auth::guard('account')->user()->phone;
                    $phones->new_phone = $request->newPhone;
                    $phones->save();
                    //send email that phone number changed and tell him if its not him he can recover using email and email can'e change 3 days. advice to change password as well
                    return response([
                        'newPhoneStats'=> 1,
                        'msg' => Lang::get('cpanel/security/phone.newPhoneChanged')
                    ]);
                }else{
                    return response(['newPhoneStats' => 2, 'msg' => Lang::get('cpanel/security/phone.unknownError') ]);
                }
            }else{
                Account::where('id',Auth::guard('account')->user()->id)->increment('password_fails');
                return response(['newPhoneStats' => 3, 'msg' => Lang::get('cpanel/security/phone.wrongPassword') ]);
            }

        }
        //////
        else if($request->has(['changePassword'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            if(Auth::guard('account')->user()->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => Auth::guard('account')->user()->id,
                    'password_fails' => Auth::guard('account')->user()->password_fails,
                ],Auth::guard('account')->user()->website_id);
                Account::where('id',Auth::guard('account')->user()->id)->update(['account_unblock_code' => Str::random(100)]);
                ///send email with the unblock link
                return;
            }

            // $passwordChangedAt = Auth::guard('account')->user()->password_changed_at;
            // if($passwordChangedAt > Carbon::now()->addHours(-1)){
            //     return response(['changePasswordState' => 3, 'msg' => lang::get('cpanel/security/password.passwordChangeMaxNum')]);
            // }


            if(!Hash::check($request->oldPassword, Auth::guard('account')->user()->password) ){
                Account::where('email',Auth::guard('account')->user()->email)->increment('password_fails');
                return response(['changePasswordStat' => 3, 'msg' => lang::get('cpanel/security/password.wrongOldPassword')]);
            }


            $validate = Validator::make(['newPassword' => $request->newPassword,'newPasswordConfirm' => $request->newPasswordConfirm],[
                'newPassword' => 'required|min:8|max:20|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPasswordConfirm',
                'newPasswordConfirm' => 'required|min:8|max:20|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPassword',
            ],[
                'newPassword.required' => lang::get('cpanel/security/password.newPasswordRequired'),
                'newPassword.min' => lang::get('cpanel/security/password.newPasswordMin'),
                'newPassword.max' => lang::get('cpanel/security/password.newPasswordMax'),
                'newPassword.regex' => lang::get('cpanel/security/password.newPasswordRegex'),
                'newPassword.same' => lang::get('cpanel/security/password.newPasswordSame'),

                'newPasswordConfirm.required' => lang::get('cpanel/security/password.newPasswordRequired'),
                'newPasswordConfirm.min' => lang::get('cpanel/security/password.newPasswordMin'),
                'newPasswordConfirm.max' => lang::get('cpanel/security/password.newPasswordMax'),
                'newPasswordConfirm.regex' => lang::get('cpanel/security/password.newPasswordRegex'),
                'newPasswordConfirm.same' => lang::get('cpanel/security/password.newPasswordSame'),
            ]);
            if ($validate->fails()) {
                return response(['changePasswordStat' => 0, 'error' => $validate->errors()]);
            }
            if($request->oldPassword == $request->newPassword){
                return response(['changePasswordStat' => 2, 'msg' => Lang::get('cpanel/security/password.passwordChangedSame')]);
            }
            if( Hash::check($request->oldPassword, Auth::guard('account')->user()->password) ){
                $changePassword = Account::where('id',Auth::guard('account')->user()->id)
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
                    return response(['changePasswordStat' => 1, 'msg' => Lang::get('cpanel/security/password.passwordChanged')]);
                }else{
                    return response(['changePasswordStat' => 4, 'msg' => lang::get('cpanel/security/password.unknownError')]);
                }
            }


        }
        else if($request->has(['oldPassword'])){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }

            // Account::where('id',Auth::guard('account')->user()->id)->update(['password_changed_at'=> Carbon::now()->subDay()]);
            if($passwordChangedAt > Carbon::now()->addHours(-1)){
                return response(['changePasswordState' => 3, 'msg' => lang::get('cpanel/security/password.passwordChangeMaxNum')]);
            }else{
                $validate = Validator::make(['newPassword' => $request->newPasswordChange,'newPasswordConfirm' => $request->newPasswordConfirmChange],[
                    'newPassword' => 'required|min:8|max:20|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPasswordConfirm',
                    'newPasswordConfirm' => 'required|min:8|max:20|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPassword',
                ],[
                    'newPassword.required' => lang::get('cpanel/security/password.newPasswordRequired'),
                    'newPassword.min' => lang::get('cpanel/security/password.newPasswordMin'),
                    'newPassword.max' => lang::get('cpanel/security/password.newPasswordMax'),
                    'newPassword.regex' => lang::get('cpanel/security/password.newPasswordRegex'),
                    'newPassword.same' => lang::get('cpanel/security/password.newPasswordSame'),

                    'newPasswordConfirm.required' => lang::get('cpanel/security/password.newPasswordRequired'),
                    'newPasswordConfirm.min' => lang::get('cpanel/security/password.newPasswordMin'),
                    'newPasswordConfirm.max' => lang::get('cpanel/security/password.newPasswordMax'),
                    'newPasswordConfirm.regex' => lang::get('cpanel/security/password.newPasswordRegex'),
                    'newPasswordConfirm.same' => lang::get('cpanel/security/password.newPasswordSame'),
                ]);
                if ($validate->fails()) {
                    return response(['changePasswordState' => 0, 'msg' => lang::get('cpanel/security/password.unknownError')]);
                }
                if (!$validate->fails()) {
                    if($request->oldPassword == $request->newPasswordChange){
                        return response(['changePasswordState' => 3, 'msg' => Lang::get('cpanel/security/password.passwordChangedSame')]);
                    }else if($request->oldPassword != $request->newPasswordChange){
                        if( Hash::check($request->oldPassword, Auth::guard('account')->user()->password) ){
                            Account::where('email',Auth::guard('account')->user()->email)->update([ 'password_fails' => 0 ]);
                            $changePassword = Account::where('id',Auth::guard('account')->user()->id)
                                                ->update(['password' => bcrypt($request->newPasswordChange),
                                                            'password_changed_at' => now()->timestamp]);
                            if($changePassword){
                                //send email that password changed
                                Auth::guard('account')->logout();
                                $request->session()->invalidate();
                                $request->session()->regenerateToken();
                                $notification = new stdClass();
                                $notification->code = 55;
                                $notification->website_id = $this->website_id;
                                broadcast(new cpanelNotification($notification))->toOthers();
                                return response(['changePasswordState' => 1, 'msg' => Lang::get('cpanel/security/password.passwordChanged')]);
                            }else{
                                return response(['changePasswordState' => 0, 'msg' => lang::get('cpanel/security/password.unknownError')]);
                            }
                        }else{
                            Account::where('email',Auth::guard('account')->user()->email)->increment('password_fails');
                            return response(['changePasswordState' => 0, 'msg' => lang::get('cpanel/security/password.wrongOldPassword')]);
                        }
                    }
                }
            }
        }
        //////


        ////////




    }

}
