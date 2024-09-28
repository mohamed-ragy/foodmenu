<?php

namespace App\Http\Controllers;

use App\Models\foodmenuFunctions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\website;
use App\Models\guest;
use App\Models\notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class websiteController extends Controller
{
    private $website_id;
    private $website;
    private $lang;
    private $request_host;
    private $user;
    private $guest;
    private $auth_type;
    public function __construct(Request $request)
    {

        $this->middleware(function ($request, $next) {
            $this->website_id = $request->header('X-Website-Id');
            self::auth_check($request->server('HTTP_X_FORWARDED_FOR') ?? $request->ip());//need to be checked
            return $next($request);
        })->except(['home','category','product','allproducts','privacypolicy','aboutus','account']);

        $this->middleware(function ($request, $next) {

            $this->request_host = $request->getHost();

            self::get_website_data();
            //
            if($this->request_host != $this->website->url){
                return redirect()->to(env('APP_URL_HTTP').$this->website->url);
            }
            //
            
            if(!self::check_language($request->lang)){
                return redirect()->route('website_home',$this->lang);
            };
            self::check_subscription($request->route()->getName());//need to be checked
            self::auth_check($request->server('HTTP_X_FORWARDED_FOR') ?? $request->ip());//need to be checked
            return $next($request);
        })->only(['home','category','product','allproducts','privacypolicy','aboutus','account']);

    }
    public function check_language($request_lang){
        // if($request_lang === '--'){
        //     $request_lang = Cookie::get(Str::slug(request()->getHost().'_lang', '_')); 
        // }
        $defaultLang = '';
        $request_lang_check = false;
        foreach($this->website->languages as $lang){
            if($lang['websiteDefault']){
                $defaultLang = $lang['code'];
            }
            if($request_lang === $lang['code']){
                $request_lang_check = true;
            }
        }
        if($request_lang_check){
            $this->lang = $request_lang;
            App::setLocale($this->lang);
            Cookie::queue(Cookie::make(Str::slug($this->request_host.'_lang', '_'),$this->lang,9999999999999));
            return true;
        }else{
            $this->lang = Cookie::get(Str::slug(request()->getHost().'_lang', '_')) ?? $defaultLang;
            return false;
            // App::setLocale($defaultLang);
            // Cookie::queue(Cookie::make(Str::slug($this->request_host.'_lang', '_'),$defaultLang,9999999999999));
            // return false;
        }
    }
    public function check_subscription($route_name){
        if($this->website->subscription_status != 'trialing' && $this->website->subscription_status != 'active' && $this->website->subscription_status != 'past_due'){
            if($route_name != 'websiteNotActive'){
                return redirect()->route('websiteNotActive',['lang' => $this->lang]);
            }
        }else if($this->website->active == false){
            if($route_name != 'websiteNotActive'){
                return redirect()->route('websiteNotActive',['lang' => $this->lang]);
            }
        }else{
            if($route_name == 'websiteNotActive'){
                return redirect()->route('website_home',['lang' => $this->lang]);
            }
        }
    }
    public function auth_check($request_ip){
        if(Auth::guard('user')->check() && Auth::guard('user')->user()->website_id == $this->website_id){
            $this->user = Auth::guard('user')->user();
            $this->guest = 'null';
            $this->auth_type = 'user';
            if($this->user ->isBanned == true){
                Auth::guard('user')->logout();
                return redirect()->route('website_home',['lang' => $this->lang]);
            }else{
                User::where(['id' => $this->user->id ])->update(['lastSeen' => Carbon::now()->timestamp]);
            }
        }else{
            $this->user = 'null';
            $this->auth_type = 'guest';
            if(!Auth::guard('guest')->check() || Auth::guard('guest')->user()->website_id != $this->website_id){
                $password = Str::random(10);
                $guest  = new guest();
                $guest->number = guest::where('website_id',$this->website_id)->count() +1;
                $guest->name = 'Guest '.$guest->number;
                $guest->password = bcrypt($password);
                $guest->ip = $request_ip;
                $guest->lastSeen = Carbon::now()->timestamp;
                $guest->website_id = $this->website_id;
                $guest->save();
                Auth::guard('guest')->login($guest,$remember = true);

                Auth::guard('guest')->attempt(['id' => $guest->id ,'password' => $password],true);
                $this->guest = $guest;

            }else{
                $this->guest = Auth::guard('guest')->user();
                guest::where('id',Auth::guard('guest')->user()->id)->update(['lastSeen'=>Carbon::now()->timestamp]);
            }
        }
    }
    public function get_website_data(){
        $domain = explode('.', $this->request_host);
        if (count($domain) >= 3 && $domain[1] === 'food-menu') {
            $_website = website::where('domainName',$domain[0]);
        }else{
            $_website = website::where('user_domainName',$this->request_host);
        }
        $this->website =$_website->select([
            'id','subscription_status','active','url','domainName','languages','websiteNames','websiteDescriptions','icon','logo','metaImg','style_version'])
        ->with(['categories'])->with(['products'])->first();
        if(!$this->website){
            return abort(404);
        }
        $this->website_id = $this->website->id;
    }

    public function home(Request $request)
    {
        return view("website.index",[
            'website_id' => $this->website_id,
            'lang' => $this->lang,
            'title' => $this->website->websiteNames[$this->lang] ?? '',
            'description' => $this->website->websiteDescriptions[$this->lang] ?? '',
            'guest' => $this->guest,
            'user' => $this->user,
            'website' => $this->website,
            'page_data' => "{page:'home'}"
        ]);
    }
    public function account(Request $request){
        if($this->auth_type !== 'user'){
            return redirect()->route('website_home',['lang' => $this->lang]);
        }
        return view('website.index',[
            'website_id' => $this->website_id,
            'lang' => $this->lang,
            'title' => $this->website->websiteNames[$this->lang] ?? '',
            'description' => $this->website->websiteDescriptions[$this->lang] ?? '',
            'guest' => $this->guest,
            'user' => $this->user,
            'website' => $this->website,
            'page_data' => "{'page':'account','account_page':'{$request->account_page}'}"
        ]);
    }
    //api
    public function auth(Request $request){
        switch(true){
            case $request->has('user_login'):
                if($request->remember == 1){
                    $remember = true;
                }else if($request->remember == 0){
                    $remember = false;
                }
                if($request->user_login == '' || $request->user_login == null || $request->user_password == '' || $request->user_password == null){
                    return response(['msg' => 'authentication.login_fail']);
                }
                $userBanCheck = User::where([ 'email' => $request->user_login , 'website_id' => $this->website_id ])->pluck('isBanned')->first();
                if($userBanCheck == 1){
                    return response(['msg' => 'authentication.user_banned']);
                }
                if(Auth::guard('user')->attempt(['email' => $request->user_login , 'password' => $request->user_password, 'website_id' => $this->website_id ],$remember)){
                    Auth::guard('guest')->logout();
                    return response(['msg' => 'logged_in']);
                }else{
                    return response(['msg' => 'authentication.login_fail']);
                }
            break;
            case $request->has('user_logout'):
                Auth::guard('user')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            break;
            case $request->has('user_signup'):
                $validation = Validator::make([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => $request->password,
                    'password_confirm' => $request->password_confirm,
                    'privacy_policy' => $request->privacy_policy,
                ],[
                    'name'=>'required|min:3|max:100',
                    'email' => [
                        'required',
                        'email', 
                        Rule::unique('users')->where(function ($q)  use ($request) {
                            return $q->where('website_id', $this->website_id);
                        }),
                    ],
                    'password' => 'required|min:8|max:50',
                    'password_confirm' => 'required|same:password',
                    'privacy_policy' => 'in:1',

                ],[
                    'name.required' => 'authentication.name_required',
                    'name.min' => 'authentication.name_min',
                    'name.max' => 'authentication.name_max',

                    'email.required' => 'authentication.email_required',
                    'email.email' => 'authentication.email_email',
                    'email.unique' => 'authentication.email_unique',

                    'password.required' => 'authentication.password_required',
                    'password.min' => 'authentication.password_min',
                    'password.max' => 'authentication.password_max',
                    'password_confirm.required' => 'authentication.password_confirm_required',
                    'password_confirm.same' => 'authentication.password_confirm_same',

                    'privacy_policy.in' => 'authentication.privacy_policy_error'
                ]);
                
                if($validation->fails()){
                    return response(['status' => 'error', 'errors' => $validation->errors()]);
                }

                $user = User::create([
                    'name'=>strip_tags($request->name),
                    'email'=>strip_tags($request->email),
                    'password'=>bcrypt($request->password),
                    'addresses' => [],
                    'website_id' => $this->website_id,
                    'lastSeen' => null,
                    'cart' => '{}',
                    'cart_lastUpdate' => null,
                    'isBanned' => false,
                ]);

                $notification = notification::create([
                    'website_id'=>(int) $this->website_id ,
                    'seen' => false,
                    'code'=>'user.signup',
                    'user_id'=>(int) $user->id,
                    'userName'=>strip_tags($request->name),
                ]);

                foodmenuFunctions::notification('user.signup',[
                    'website_id' => (int) $this->website_id,
                    'code' => 'user.signed_up',
                    'user_id' => (int) $user->id,
                    'user_name' => $user->name,
                ],[
                    'notification' => $notification,
                ]);
                //send email to user that he signed up
                return response(['status' => 'success', 'msg' => 'authentication.accountCreated']);
            break;
            case $request->has('reset_password_1'):
                if($request->email == '' || $request->email == null){
                    return response(['status' => 'error','msg' => 'authentication.reset_password_description']);
                }
                $user = User::where([
                    'email' => $request->email,
                    'website_id' => $this->website_id
                ])->first();

                if($user === null){
                    return response(['status' => 'error','msg' => 'authentication.reset_password_email_incorrect']);
                }

                if($user->resetPassword_token_sent_at > Carbon::now()->subMinutes(30)->timestamp && $user->resetPassword_token_counter >= 5){
                    return response(['status' => 'error','msg' => 'authentication.reset_password_wait']);
                }

                $token = strtolower(Str::random(6));
                $update_token = User::where([
                    'email' => $request->email,
                    'website_id' => $this->website_id
                ])->update([
                    'resetPassword_token'=> $token,
                    'resetPassword_token_sent_at'=>Carbon::now()->timestamp,
                    'resetPassword_token_counter' => (int)$user->resetPassword_token_counter + 1,
                ]);
                if($update_token){
                    //send email with the reset password code and inform that the code is availabel for 10 mins
                    return response(['status' => 'success','msg' => 'authentication.reset_password_sent']);
                }else{
                    return response('',404);
                }
            break;
            case $request->has('reset_password_2'):
                $user = User::where('resetPassword_token',$request->code)->whereNotNull('resetPassword_token')->select(['resetPassword_token','resetPassword_token_sent_at'])->first();
                if($user == null){
                    return response(['status' => 'error','msg' => 'authentication.reset_password_wrong_code']);
                }
                if(Carbon::now()->subMinutes(10)->timestamp > $user->resetPassword_token_sent_at){
                    return response(['status' => 'error','msg' => 'authentication.reset_password_expired_code']);
                }
                return response(['status' => 'success','msg' => 'authentication.reset_password_enter_new_password']);
            break;
            case $request->has('reset_password_3'):
                $user = User::where('resetPassword_token',$request->code)->whereNotNull('resetPassword_token')->select(['id','email','resetPassword_token','resetPassword_token_sent_at'])->first();
                if($user == null){
                    return response(['status' => 'error','msg' => 'authentication.reset_password_wrong_code']);
                }
                if(Carbon::now()->subMinutes(10)->timestamp > $user->resetPassword_token_sent_at){
                    return response(['status' => 'error','msg' => 'authentication.reset_password_expired_code']);
                }
                $validation = Validator::make([
                    'password' => $request->password,
                    'password_confirm' => $request->password_confirm,
                ],[
                    'password' => 'required|min:8|max:50',
                    'password_confirm' => 'required|same:password',

                ],[
                    'password.required' => 'authentication.password_required',
                    'password.min' => 'authentication.password_min',
                    'password.max' => 'authentication.password_max',
                    'password_confirm.required' => 'authentication.password_confirm_required',
                    'password_confirm.same' => 'authentication.password_confirm_same',
                ]);
                
                if($validation->fails()){
                    return response(['status' => 'password_error', 'errors' => $validation->errors()]);
                }

                if($user->update([
                    'password' => bcrypt($request->password),
                    'resetPassword_token'=> NULL,
                    'resetPassword_token_sent_at'=> NULL,
                    'resetPassword_token_counter' => NULL,
                ])){
                    //send email password changed
                    return response(['status' => 'success', 'msg' => 'authentication.reset_password_changed', 'email' => $user->email]);
                }
            break;
            case $request->has('account_information'):
                $validation = Validator::make([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phoneNumber' => $request->phone_number,
                ],[
                    'name' => 'required|min:3|max:100',
                    'email' => [
                        'required', 'email', Rule::unique('users')->where(function($q) use ($request){
                            return $q->where('website_id',$this->website_id);
                        })->ignore($this->user->id)
                    ],
                    'phoneNumber' => [
                        'required','regex:/^[+0-9]+$/','min:5',Rule::unique('users')->where(function($q) use ($request){
                            return $q->where('website_id',$this->website_id);
                        })->ignore($this->user->id)
                    ],
                ],[
                    'name.required' => 'authentication.name_required',
                    'name.min' => 'authentication.name_min',
                    'name.max' => 'authentication.name_max',

                    'email.required' => 'authentication.email_required',
                    'email.email' => 'authentication.email_email',
                    'email.unique' => 'authentication.email_unique',

                    'phoneNumber.required' => 'authentication.phone_number_required',
                    'phoneNumber.regex' => 'authentication.phone_number_regex',
                    'phoneNumber.min' => 'authentication.phone_number_regex',
                    'phoneNumber.unique' => 'authentication.phone_number_unique',
                ]);
                if($validation->fails()){
                    return response(['status'=>'error','errors'=>$validation->errors()]);
                }
                $update_user = $this->user->update([
                    'name' => strip_tags($request->name),
                    'email' => strip_tags($request->email),
                    'phoneNumber' => strip_tags($request->phone_number),
                ]);
                if($update_user){
                    return response(['status' => 'success', 'msg' => 'authentication.profile_saved']);
                }else{
                    return response([],500);
                }
            break;
            case $request->has('change_account_password'):
                $validation = Validator::make([
                    'current_password' => $request->current_password,
                    'new_password' => $request->new_password,
                    'new_password_confirm' => $request->new_password_confirm, 
                ],[
                    'new_password' => 'required|min:8|max:50',
                    'new_password_confirm' => 'required|same:new_password',
                ],[
                    'new_password.required' => 'authentication.password_required',
                    'new_password.min' => 'authentication.password_min',
                    'new_password.max' => 'authentication.password_max',
                    'new_password_confirm.required' => 'authentication.password_confirm_required',
                    'new_password_confirm.same' => 'authentication.password_confirm_same',
                ]);
                $errors = $validation->errors();
                $current_password_check = true;
                if(!Hash::check($request->current_password,$this->user->password)){
                    $current_password_check = false;
                    $errors->add('current_password', 'authentication.wrong_password');
                }
                if($validation->fails() || !$current_password_check){
                    return response(['status' => 'error','errors' => $errors]);
                }
                $update_user = $this->user->update([
                    'password'=>bcrypt($request->new_password),
                ]);
                if($update_user){
                    return response(['status' => 'success', 'msg' => 'authentication.change_password_saved']);
                }else{
                    return response([],500);
                }
            break;
        }

    }
    public function activity(Request $request){
        if($request->has('userLastSeen'))
        {
            User::where('id',Auth::guard('user')->user()->id)->update(['lastSeen'=>Carbon::now()->timestamp ]);
        }
        else if($request->has('new_activity'))
        {
            foodmenuFunctions::notification('user.activity',null,[
                'activity' => $request->new_activity,
                'id' => $this ->{$this->auth_type}->id,
                'type' => $this->auth_type,
            ]);
        }
    }
    public function website(Request $request){
        // if($request->has('get_website_data')){
        //     $website = website::where('id',$this->website_id)->select([
        //         'id',
        //         'websiteNames',
        //         'websiteDescriptions',
        //         'logo','icon',
        //         'languages',
        //     ])->with(['categories'])->with(['products'])->first();
        //     return response($website);
        // }else 
        if($request->has('change_language')){
            $website_languages = website::where('id',$this->website_id)->pluck('languages')->first();
            $language_check = false;
            foreach($website_languages as $language){
                if($language['code'] == $request->change_language){
                    $language_check = true;
                }
            }
            // if(array_key_exists($request->change_language,$website_languages)){
            if($language_check){
                Cookie::queue(Cookie::make(Str::slug($request->getHost().'_lang', '_'),$request->change_language,9999999999999));
                return response(['state'=>1]);
            }
        }
    }
}
