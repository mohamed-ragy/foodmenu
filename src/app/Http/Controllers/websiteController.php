<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

use App\Models\website;
use App\Models\guest;
use App\Models\template;
use Carbon\Carbon;


class websiteController extends Controller
{
    private $website_id;
    private $website;
    private $lang;
    private $website_direction;
    private $request_host;
    private $user;
    private $guest;
    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {
            $this->website_id = $request->website_id;
            $this->lang = $request->lang;
            // self::check_subscription($request->route()->getName());//need to be checked
            self::auth_check($request->server('HTTP_X_FORWARDED_FOR') ?? $request->ip());//need to be checked
        })->except(['home','category','product','allproducts','privacypolicy','aboutus','profile']);

        $this->middleware(function ($request, $next) {
            $this->request_host = $request->getHost();
            self::get_website_data();
            //
            if($this->request_host != $this->website->url){
                return redirect()->to(env('APP_URL_HTTP').$this->website->url);
            }
            //
            if(!self::check_language($request->lang)){
                return redirect()->route('website.home',['lang'=>$this->lang]);
            };
            self::check_subscription($request->route()->getName());//need to be checked
            self::auth_check($request->server('HTTP_X_FORWARDED_FOR') ?? $request->ip());//need to be checked
            return $next($request);
        })->only(['home','category','product','allproducts','privacypolicy','aboutus','profile']);

    }

    public function home(Request $request)
    {
        return view('website.website',[
            'website_id' => $this->website_id,
            'lang' => $this->lang,
            'website_direction' => $this->website_direction,
            'title' => $this->website->websiteNames[$this->lang],
            'description' => $this->website->websiteDescriptions[$this->lang],
            'logo' => $this->website->logo,
            'icon' => $this->website->icon,
            'metaImg' => $this->website->logo,
            'url' => $this->website->url
        ]);
    }

    public function get_website_data(){
        $domain = explode('.', $this->request_host);
        $this->website = website::where('url' , preg_replace('/^www./', '',$this->request_host))->orWhere('domainName' , $domain[0] )
        ->select('id','subscription_status','active','url','domainName','languages','websiteNames','websiteDescriptions','icon','logo')
        ->with('template')
        ->first();
        if(!$this->website){
            return abort(404);
        }
        $this->website_id = $this->website->id;
    }
    public function check_language($request_lang,){
        $defaultLang = '';
        $request_lang_check = false;
        foreach($this->website->languages as $lang){
            if($lang['websiteDefault']){
                $defaultLang = $lang['code'];
                // $this->website_direction = $lang['direction'];
            }
            if($request_lang == $lang['code']){
                $request_lang_check = true;
                $this->website_direction = $lang['direction'];
            }
        }
        if($request_lang_check){
            App::setLocale($request_lang);
            $this->lang = $request_lang;
            Cookie::queue(Cookie::make(Str::slug($this->request_host.'_lang', '_'),$request_lang,9999999999999));
            return true;
        }else{
            App::setLocale($defaultLang);
            $this->lang = $defaultLang;
            Cookie::queue(Cookie::make(Str::slug($this->request_host.'_lang', '_'),$this->lang,9999999999999));
            return false;
        }
    }

    public function check_subscription($route_name){
        return redirect()->route('website.home',['lang' => $this->lang]);

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
                return redirect()->route('website.home',['lang' => $this->lang]);
            }
        }
    }

    public function auth_check($request_ip){
        if(Auth::guard('user')->check() && Auth::guard('user')->user()->website_id == $this->website_id){
            $this->user = Auth::guard('user')->user();
            if($this->user ->isBanned == true){
                Auth::guard('user')->logout();
                return redirect()->route('website.home',['lang' => $this->lang]);
            }else{
                User::where(['id' => $this->user->id ])->update(['lastSeen' => Carbon::now()->timestamp]);
            }
        }else{
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
}
