<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\foodmenuFunctions;
use App\Models\guest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class usersController extends Controller
{
    protected $website_id;
    protected $account;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->account = Auth::guard('account')->user();
            $this->website_id = $this->account->website_id;
            App::setlocale($this->account->language);
            return $next($request);

        });
        // Carbon::setLocale('en');

    }
    public function users(Request $request){

        if($request->has('findUser')){
            $findUser = $request->findUser;
            $users = User::where('website_id',$this->website_id)
                ->where(function($q) use ($findUser){
                    $q->where('name','LIKE','%'.$findUser.'%')
                    ->orWhere('phoneNumber','LIKE','%'.$findUser.'%');
                })->select(['id','name','phoneNumber','address','lat','lng'])->get();
            return response(['users'=>$users]);
        }
        else if($request->has(['createNewUser'])){
            if(str_split($this->account->authorities)[2] == false){
                return;
            }

            $emailUniqeuCheck = user::where(['website_id' => $this->website_id,'email' => $request->email])->count();
            if($emailUniqeuCheck > 0){
                return response(['createNewUserStatus' => 2, 'msg' => Lang::get('cpanel/users/responses.emailUnique')]);
            }


            $emailValidate = Validator::make(['email' => $request->email],[
                'email' => 'required|email',
            ],[
                'email.required' => Lang::get('cpanel/users/responses.emailRequired'),
                'email.email' => Lang::get('cpanel/users/responses.emailEmail'),
            ]);
            if($emailValidate->fails()){
                return response(['createNewUserStatus' => 3, 'msg' => $emailValidate->errors()]);
            }


            $passwordValidate = Validator::make(['password'=> $request->password],[
                'password' => 'required|min:8|max:100',
            ],[
                'password.required' => Lang::get('cpanel/users/responses.passwordRequired'),
                'password.min' => Lang::get('cpanel/users/responses.passwordMin'),
                'password.max' => Lang::get('cpanel/users/responses.passwordMax'),
            ]);
            if($passwordValidate->fails()){
                return response(['createNewUserStatus'=> 4,'msg'=>$passwordValidate->errors()]);
            }


            $nameValidate = Validator::make(['name' => $request->name],[
                'name'=> 'required|min:5|max:100',
            ],[
                'name.required' => Lang::get('cpanel/users/responses.nameRequired'),
                'name.min' => Lang::get('cpanel/users/responses.nameMin'),
                'name.max' => Lang::get('cpanel/users/responses.nameMax'),
            ]);
            if($nameValidate->fails()){
                return response(['createNewUserStatus' => 5,'msg'=> $nameValidate->errors()]);
            }


            $addressValidate = Validator::make(['address' => $request->address],[
                'address' => 'required',
            ],[
                'address.required' => Lang::get('cpanel/users/responses.addressRequired'),
            ]);
            if($addressValidate->fails()){
                return response(['createNewUserStatus' => 6,'msg'=>$addressValidate->errors()]);
            }


            $phoneValidate = Validator::make(['phoneNumber'=>$request->phoneNumber],[
                'phoneNumber' => 'required|regex:/^[+0-9]+$/|min:5',
            ],[
                'phoneNumber.required' => Lang::get('cpanel/users/responses.phoneNumberRequired'),
                'phoneNumber.regex' => Lang::get('cpanel/users/responses.phoneNumberRegex'),
                'phoneNumber.min' => Lang::get('cpanel/users/responses.phoneNumberRequired'),
            ]);
            if($phoneValidate->fails()){
                return response(['createNewUserStatus' => 7,'msg'=>$phoneValidate->errors()]);
            }


            $createNewuser = user::create([
                'website_id' => $this->website_id,
                'email' => strip_tags($request->email),
                'password'=>bcrypt($request->password),
                'name'=>strip_tags($request->name),
                'phoneNumber'=>strip_tags($request->phoneNumber),
                'address'=>strip_tags($request->address),
                'lastSeen'=> null,
                'cart' => '[]',
                'cart_lastUpdate' => null,
                'lat' => $request->lat,
                'lng' => $request->lng,
            ]);
            if($createNewuser){
                foodmenuFunctions::notification('user.created_by_cpanel',[
                    'website_id' => $this->website_id,
                    'code' => 'user.created',
                    'user_id' => $createNewuser->id,
                    'user_name' => $request->name,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],null);
                return response(['createNewUserStatus' => 1, 'msg' => Lang::get('cpanel/users/responses.createNewUserCreated'),'user' => $createNewuser]);
            }else{
                return response(['createNewUserStatus' => 0, 'msg' => Lang::get('cpanel/users/responses.createNewUserFailed')]);
            }
        }
        else if($request->has('getUsers')){
            // if(str_split($this->account->authorities)[2] == false){
            //     return;
            // }
            $users = User::where('website_id',$this->website_id)->whereIn('id',$request->userIds)
                ->with('last_msg')
                ->get();
                return response(['users'=>$users]);
        }
        else if($request->has('getGuests')){
            // if(str_split($this->account->authorities)[2] == false){
            //     return;
            // }

            $guests = guest::where('website_id',$this->website_id)->whereIn('id',$request->guestsIds)
                ->with('last_msg')
                ->get();
                return response(['guests'=>$guests]);
        }
        else if($request->has('banUser')){
            if(str_split($this->account->authorities)[2] == false){
                return;
            }
            if($request->action == 1){
               $banUserAction = true;
               $activityCode = 'user.banned';
            }else if($request->action == 0){
                $banUserAction = false;
                $activityCode = 'user.ban_removed';
            }
            $banUser = User::where(['id'=>$request->banUser,'website_id'=>$this->website_id])->update([
                'isBanned'=> $banUserAction,
                'updated_at' => Carbon::now()->timestamp
            ]);
            if($banUser){
                foodmenuFunctions::notification('user.ban',[
                    'website_id' => $this->website_id,
                    'code' => $activityCode,
                    'user_id' => $request->banUser,
                    'user_name' => $request->userName,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'userId' => $request->banUser,
                    'isBan' => $banUserAction,
                ]);
                if($request->action == 1){
                    foodmenuFunctions::notification_website('user.logout',$this->website_id,'user',$request->banUser,[]);
                    $msg = Lang::get('cpanel/users/responses.banUserBanned');
                }else if($request->action == 0){
                    $msg = Lang::get('cpanel/users/responses.unBanUserSaved');
                }
                return response(['banUserState'=>1,'msg'=>$msg]);
            }else{
                if($request->action == 1){
                    $msg = Lang::get('cpanel/users/responses.banUserFail');
                }else if($request->action == 0){
                    $msg = Lang::get('cpanel/users/responses.unBanUserFail');
                }
                return response(['banUserState'=>0,'msg'=>$msg]);
            }


        }
        else if($request->has('editUser')){
            if(str_split($this->account->authorities)[2] == false){
                return;
            }
            $emailUniqeuCheck = user::where(['website_id' => $this->website_id,'email' => $request->email])->where('id','!=',$request->userId)->count();
            if($emailUniqeuCheck > 0){
                return response(['editUserStatus' => 2, 'msg' => Lang::get('cpanel/users/responses.emailUnique')]);
            }

            $emailValidate = Validator::make(['email' => $request->email],[
                'email' => 'required|email',
            ],[
                'email.required' => Lang::get('cpanel/users/responses.emailRequired'),
                'email.email' => Lang::get('cpanel/users/responses.emailEmail'),
            ]);
            if($emailValidate->fails()){
                return response(['editUserStatus' => 3, 'msg' => $emailValidate->errors()]);
            }

            if($request->changePassword == 1){
                $passwordValidate = Validator::make(['password'=> $request->password],[
                    'password' => 'min:8|max:100',
                ],[
                    'password.min' => Lang::get('cpanel/users/responses.passwordMin'),
                    'password.max' => Lang::get('cpanel/users/responses.passwordMax'),
                ]);
                if($passwordValidate->fails()){
                    return response(['editUserStatus'=> 4,'msg'=>$passwordValidate->errors()]);
                }
            }

            $nameValidate = Validator::make(['name' => $request->name],[
                'name'=> 'required|min:5|max:100',
            ],[
                'name.required' => Lang::get('cpanel/users/responses.nameRequired'),
                'name.min' => Lang::get('cpanel/users/responses.nameMin'),
                'name.max' => Lang::get('cpanel/users/responses.nameMax'),
            ]);
            if($nameValidate->fails()){
                return response(['editUserStatus' => 5,'msg'=> $nameValidate->errors()]);
            }


            $addressValidate = Validator::make(['address' => $request->address],[
                'address' => 'required',
            ],[
                'address.required' => Lang::get('cpanel/users/responses.addressRequired'),
            ]);
            if($addressValidate->fails()){
                return response(['editUserStatus' => 6,'msg'=>$addressValidate->errors()]);
            }


            $phoneValidate = Validator::make(['phoneNumber'=>$request->phoneNumber],[
                'phoneNumber' => 'required|regex:/^[+0-9]+$/|min:5',
            ],[
                'phoneNumber.required' => Lang::get('cpanel/users/responses.phoneNumberRequired'),
                'phoneNumber.regex' => Lang::get('cpanel/users/responses.phoneNumberRegex'),
                'phoneNumber.min' => Lang::get('cpanel/users/responses.phoneNumberRequired'),
            ]);
            if($phoneValidate->fails()){
                return response(['editUserStatus' => 7,'msg'=>$phoneValidate->errors()]);
            }
            $old_user = User::where(['website_id'=>$this->website_id,'id'=>$request->userId])->first();
            if($request->changePassword == 1){
                $updateUser = User::where(['website_id'=>$this->website_id,'id'=>$request->userId])
                    ->update([
                        'email' => strip_tags($request->email),
                        'password'=>bcrypt($request->password),
                        'name' => strip_tags($request->name),
                        'phoneNumber' => strip_tags($request->phoneNumber),
                        'address' => strip_tags($request->address),
                        'lat' => strip_tags($request->lat),
                        'lng' => strip_tags($request->lng),
                        'updated_at' => Carbon::now()->timestamp
                    ]);
            }else{
                $updateUser = User::where(['website_id'=>$this->website_id,'id'=>$request->userId])
                ->update([
                    'email' => strip_tags($request->email),
                    'name' => strip_tags($request->name),
                    'phoneNumber' => strip_tags($request->phoneNumber),
                    'address' => strip_tags($request->address),
                    'lat' => strip_tags($request->lat),
                    'lng' => strip_tags($request->lng),
                    'updated_at' => Carbon::now()->timestamp
                ]);
            }

            if($updateUser){
                $activity = null;
                if(
                    $old_user->email != strip_tags($request->email) ||
                    $old_user->name != strip_tags($request->name) ||
                    $old_user->phoneNumber != strip_tags($request->phoneNumber) ||
                    $old_user->address != strip_tags($request->address) ||
                    $old_user->lat != strip_tags($request->lat) ||
                    $old_user->lng != strip_tags($request->lng) ||
                    $request->changePassword == 1
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'user.edited_by_account',
                        'user_id' => $request->userId,
                        'user_name' => $request->name,
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_user' => [
                            'email' => $old_user->email,
                            'name' => $old_user->name,
                            'phoneNumber' => $old_user->phoneNumber,
                            'address' => $old_user->address,
                            'lat' => $old_user->lat,
                            'lng' => $old_user->lng,
                        ],
                        'new_user' => [
                            'email' => strip_tags($request->email),
                            'name' => strip_tags($request->name),
                            'phoneNumber' => strip_tags($request->phoneNumber),
                            'address' => strip_tags($request->address),
                            'lat' => strip_tags($request->lat),
                            'lng' => strip_tags($request->lng),
                            'password_changed' => $request->changePassword
                        ]
                    ];
                }
                foodmenuFunctions::notification('user.edited_by_account',$activity,[
                    'user_id' => $request->userId,
                    'email' => $request->email,
                    'name' => $request->name,
                    'phoneNumber' => $request->phoneNumber,
                    'address' => $request->address,
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                ]);
                foodmenuFunctions::notification_website('user.reload',$this->website_id,'user',$request->userId,[]);
                return response(['editUserStatus' => 1, 'msg' => Lang::get('cpanel/users/responses.userUpdateSaved')]);
            }else{
                return response(['editUserStatus' => 0, 'msg' => Lang::get('cpanel/users/responses.userUpdateFail')]);
            }

        }

    }


}
