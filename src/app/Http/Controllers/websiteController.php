<?php

namespace App\Http\Controllers;

use App\Models\foodmenuFunctions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

use App\Models\website;
use App\Models\guest;
use Carbon\Carbon;


class websiteController extends Controller
{
    private $website_id;
    private $website;
    private $lang;
    private $request_host;
    private $user = 'null';
    private $guest = 'null';
    private $auth;
    private $auth_type;
    public function __construct(Request $request)
    {

        $this->middleware(function ($request, $next) {
            $this->website_id = $request->header('X-Website-Id');
            // $this->lang = $request->lang;
            // self::check_subscription($request->route()->getName());//need to be checked
            self::auth_check($request->server('HTTP_X_FORWARDED_FOR') ?? $request->ip());//need to be checked
            return $next($request);
        })->except(['home','category','product','allproducts','privacypolicy','aboutus','profile']);

        $this->middleware(function ($request, $next) {

            // $this->lang = $request->lang;
            // $this->lang = $request->lang ?? Cookie::get(Str::slug(request()->getHost().'_lang', '_')) ?? 'en';
            $this->request_host = $request->getHost();

            self::get_website_data();
            //
            if($this->request_host != $this->website->url){
                return redirect()->to(env('APP_URL_HTTP').$this->website->url);
            }
            //
            // self::check_language($this->lang);
            
            if(!self::check_language($request->lang)){
            //     return redirect()->route('website_home',$this->lang);
                return redirect()->route('website_home',$this->lang);
            };
            self::check_subscription($request->route()->getName());//need to be checked
            self::auth_check($request->server('HTTP_X_FORWARDED_FOR') ?? $request->ip());//need to be checked
            return $next($request);
        })->only(['home','category','product','allproducts','privacypolicy','aboutus','profile']);

    }

    public function home(Request $request)
    {
        return view("website.index",[
            'website_id' => $this->website_id,
            'lang' => $this->lang,
            'title' => $this->website->websiteNames[$this->lang] ?? '',
            'description' => $this->website->websiteDescriptions[$this->lang] ?? '',
            'logo' => $this->website->logo,
            'icon' => $this->website->icon,
            'style_version' => $this->website->style_version,
            // 'metaImg' => $this->website->template['page_setup']['social_image'] == null ? $this->website->logo : $this->website->template['page_setup']['social_image'],
            'url' => $this->website->url,
            'guest' => $this->guest,
            'user' => $this->user,
        ]);
    }

    public function get_website_data(){
        $domain = explode('.', $this->request_host);
        $this->website = website::where('url' , preg_replace('/^www./', '',$this->request_host))->orWhere('domainName' , $domain[0] )
        ->select('id','subscription_status','active','url','domainName','languages','websiteNames','websiteDescriptions','icon','logo','style_version')
        ->first();
        if(!$this->website){
            return abort(404);
        }
        $this->website_id = $this->website->id;
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
        return redirect()->route('website_home',['lang' => $this->lang]);

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
            $this->auth_type = 'user';
            if($this->user ->isBanned == true){
                Auth::guard('user')->logout();
                return redirect()->route('website_home',['lang' => $this->lang]);
            }else{
                User::where(['id' => $this->user->id ])->update(['lastSeen' => Carbon::now()->timestamp]);
            }
        }else{
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

    //

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
        if($request->has('get_website_data')){
            $website = website::where('id',$this->website_id)->select([
                'id',
                'websiteNames',
                'websiteDescriptions',
                'logo','icon',
                'languages',
            ])->with(['categories'])->with(['products'])->first();
            return response($website);
        }else if($request->has('change_language')){
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
