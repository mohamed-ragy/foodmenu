<?php

namespace App\Http\Controllers;

use App\Models\activityLog;
use App\Models\categories;
use App\Models\foodmenuFunctions;
use App\Models\liveChat;
use App\Models\notification;
use App\Models\order;
use App\Models\product;
use App\Models\product_review;
use App\Models\User;
use App\Models\website;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\guest;
use App\Models\img;
use App\Models\order_item;
use App\Models\promocode;
use App\Models\websiteText;
use stdClass;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\UTCDateTime;



class websiteController extends Controller
{
    private $websiteCheck;
    private $website_id;
    private $lang;
    private $urlLang;
    private $website;
    private $imgs;
    private $metaImg;
    private $customersReviews;
    // private $categories;
    // private $products;
    // private $imgsIds =[];
    // private $websiteIcon;
    // private $websiteLogo;
    public function __construct(Request $request)
    {
            // dd(order::where(['website_id'=>1,'status'=>0])->get());
            // order::where('_id','652930ccd59a1063106a1ee6')->update([
            //     'delivery_id'=>1,
            //     'out_for_delivery_at' => Carbon::now()->timestamp
            // ]);

        $this->middleware(function ($request, $next) {
            $domain = explode('.', request()->getHost());
            $websiteCheck = website::where('url' , preg_replace('/^www./', '',request()->gethost()) )->orWhere('domainName' , $domain[0] )->select('id','languages','active','subscription_status')->first();
            if(!$websiteCheck ){return abort(404);}
            $this->website_id  = $websiteCheck->id;

            $this->websiteCheck = $websiteCheck;

            if($websiteCheck->subscription_status != 'trialing' && $websiteCheck->subscription_status != 'active' && $websiteCheck->subscription_status != 'past_due'){
                if($request->route()->getName() != 'websiteNotActive'){
                    return redirect()->route('websiteNotActive',[$lang = $websiteCheck->defaultLanguage]);
                }
            }else if($websiteCheck->active == false){
                if($request->route()->getName() != 'websiteNotActive'){
                    return redirect()->route('websiteNotActive',[$lang = $websiteCheck->defaultLanguage]);
                }
            }else{
                if($request->route()->getName() == 'websiteNotActive'){
                    return redirect('/');
                }
            }


            if(Auth::guard('user')->check()){
                if(Auth::guard('user')->user()->isBanned == true){
                    Auth::guard('user')->logout();
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                    return redirect('/');
                }
            }
            return $next($request);
        })->except(['home','category','product','allproducts','privacypolicy','aboutus','profile']);

        $this->middleware(function ($request, $next) {
            $domain = explode('.', request()->getHost());
            $this->website = website::where('url' , preg_replace('/^www./', '',request()->gethost()))->orWhere('domainName' , $domain[0] )
            ->select(
                'id','active','subscription_status','url',
                'phoneNumbers',
                'addresses',
                'restaurantEmail',
                'lat','lng',
                'url',
                'timeZone','hour12',
                'currencies',
                'websiteNames',
                'websiteDescriptions',
                'website_announcements',

                'website_privacyPolicy',

                'languages',
                'facebookLink','youtubeLink','linkedinLink','twitterLink','instagramLink',
                'domainName','specialDomainName',
                'trendingProducts',

                'website_colors','useCustomColors','customColorsHexCode',
                'icon','logo','template',
                'intro',
                'info',
                'ourStory',
                'slideShow',
                'gallery',

                'productReviews',
                'guestReviews',
                'collectReviews',
                'guestOrders',
                'cancelOrder',
                'dineinWorkingHours',
                'liveChat',
                'guestLiveChat',
                'discountAnnouncement',
                'langPopup',
                'cookies_msg',
                'cart_lifeTime',
                'fastLoading',

                'useDelivery',
                'cash_on_delivery','card_on_delivery',
                'acceptDeliveryOrders24',
                'deliveryCost','showDeliveryCostChangable',
                'deliveryTaxCost','deliveryTaxPercentage','useDeliveryTaxCost',
                'deliveryMinimumCharge','deliveryMinimumChargeIncludes',
                'workingDays_delivery',
                'averageDeliveryTime',

                'usePickup',
                'cash_at_restaurant','card_at_restaurant',
                'acceptPickupOrders24',
                'pickupTaxCost','pickupTaxPercentage','usePickupTaxCost',
                'pickupMinimumCharge','pickupMinimumChargeIncludes',
                'workingDays_pickup',
                'averagePickupTime',

                'workingDays_dinein',

                'created_at',
                'updated_at',
            )
            // ->with(['website_texts'=>function($q) use ($request){
            //     $q->select([$request->lang,'website_id']);
            // }])
            ->with(['categories'=>function($q){
                $q->orderBy('sort','asc');
            }])
            ->with(['products'=>function($q){
                $q->orderBy('sort','asc')->where('category_id','!=',null)->with(['product_options'=>function($q2){
                    $q2->orderBy('sort','asc')->with(['product_option_selections' => function($q3){
                        $q3->orderBy('sort','asc');
                    }]);
                }]);
            }])
            ->first();

            if(!$this->website){return abort(404);}
            $this->website->websiteColorsHexCode = foodmenuFunctions::websiteColors()[$this->website->website_colors];

            // dd(request()->gethost().' '.$this->website->url);
            if(request()->gethost() != $this->website->url){
                return redirect()->to(env('APP_URL_HTTP').$this->website->url);
            }

            if($this->website->template == 'demo'){
                if($request->t){
                    Cookie::queue(Cookie::make('demoT',$request->t,9999999999));
                    $this->website->template = $request->t;
                }else{
                    if(Cookie::get('demoT')){
                        $this->website->template = Cookie::get('demoT');
                    }else{
                        // return redirect to examples or whatever
                    }
                }
                if(!isset(foodmenuFunctions::templates()[$this->website->template])){
                        // return redirect to examples or whatever
                    }
                if(strtolower(foodmenuFunctions::templates()[$this->website->template]['restaurantType']) != strtolower($this->website->domainName)){
                    // return redirect to examples or whatever
                    return redirect()->to(env('APP_URL_HTTP').foodmenuFunctions::templates()[$this->website->template]['restaurantType'].'.'.env('APP_DOMAIN').'/en/home?t='.$this->website->template);
                }
                $this->website->websiteColorsHexCode = foodmenuFunctions::websiteColors()[foodmenuFunctions::templates()[$this->website->template]['colors']];
                $this->website->isDemo = true;
            }else{
                $this->website->isDemo = false;
            }


            $this->website->templateData = foodmenuFunctions::templates()[$this->website->template];

            if($this->website->subscription_status != 'trialing' && $this->website->subscription_status != 'active' && $this->website->subscription_status != 'past_due'){
                if($request->route()->getName() != 'websiteNotActive'){
                    return redirect()->route('websiteNotActive',[$lang = $this->website->defaultLanguage]);
                }
            }else if($this->website->active == false){
                if($request->route()->getName() != 'websiteNotActive'){
                    return redirect()->route('websiteNotActive',[$lang = $this->website->defaultLanguage]);
                }
            }else{
                if($request->route()->getName() == 'websiteNotActive'){
                    return redirect('/');
                }
            }



            if(Auth::guard('user')->check()){
                if(Auth::guard('user')->user()->isBanned == true){
                    Auth::guard('user')->logout();
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                    return redirect('/');
                }

            }


            $langCheck = [];
            $defaultLang = '';
            foreach($this->website->languages as $lang){
                array_push($langCheck,$lang['code']);
                if($lang['websiteDefault']){
                    $defaultLang = $lang['code'];
                }
            }
            if(in_array($request->lang,$langCheck)){
                App::setLocale($request->lang);
                $this->lang = $request->lang;
                Cookie::queue(Cookie::make(Str::slug(request()->getHost().'_lang', '_'),$request->lang,9999999999999));
            }else{
                App::setLocale($defaultLang);
                $this->lang = $defaultLang;
                Cookie::queue(Cookie::make(Str::slug(request()->getHost().'_lang', '_'),$this->lang,9999999999999));
                return redirect()->route('website.home',['lang'=>$this->lang]);
            }
            $this->website_id = $this->website->id;
            $this->website->availableLangs = foodmenuFunctions::languages();
            if($this->lang == 'eg'){
                $this->urlLang = $this->website->customLang_code;
            }else{
                $this->urlLang = $this->lang;
            }
            $this->website->website_texts[$this->urlLang] = websiteText::where(['website_id'=>$this->website_id,'lang'=>$this->lang])->pluck('text')->first();

            $imgsIds = [];
            if($this->website->icon != null){array_push($imgsIds,$this->website->icon);}
            if($this->website->logo != null){array_push($imgsIds,$this->website->logo);}
            foreach($this->website->products as $product){if($product->img_id != null){array_push($imgsIds,$product->img_id);}}
            foreach($this->website->categories as $car){if($car->img_id != null){array_push($imgsIds,$car->img_id);}}
            if($this->website->intro['img'] != 'template'){array_push($imgsIds,$this->website->intro['img']);}
            if($this->website->info['img'] != 'template'){array_push($imgsIds,$this->website->info['img']);}
            if($this->website->ourStory['img'] != 'template'){array_push($imgsIds,$this->website->ourStory['img']);}
            foreach(explode('.',$this->website->gallery) as $galleryImgId){
                array_push($imgsIds,$galleryImgId);
            }
            foreach($this->website->slideShow['content'] as $slideShowImg){
                array_push($imgsIds,$slideShowImg['imgId']);
            }
            $imgsIds = array_unique($imgsIds);
            $this->imgs = img::where('website_id',$this->website_id)->whereIn('id',$imgsIds)->select('id','url','thumbnailUrl')->get();
            $this->websiteIcon = '/storage/imgs/templates/'.$this->website->template.'/icon.webp';
            $this->websiteLogo = '/storage/imgs/templates/'.$this->website->template.'/logo.webp';
            if($this->website->templateData['imgsType'] == 'normal'){
                $this->metaImg = '/storage/imgs/templates/'.$this->website->template.'/intro.webp';
            }else if($this->website->templateData['imgsType'] == 'trans'){
                $this->metaImg = '/storage/imgs/templates/trans/'.$this->website->template.'/intro.webp';
            }
            foreach($this->imgs as $img){
                if($img->id == $this->website->icon){
                    $this->websiteIcon = '/storage/'.$img->thumbnailUrl;
                }
                if($img->id == $this->website->logo){
                    $this->websiteLogo = '/storage/'.$img->url;
                }
            }
            if($this->website->intro['img'] != 'template'){
                $this->metaImg = '/storage/'.$this->imgs->where('id',$this->website->intro['img'])->first()->url;
            }
            $this->customersReviews = product_review::where([
                'website_id'=>$this->website_id,
                'rate' => 5,
            ])
            ->inRandomOrder()->limit(10)->get();
            $this->website->lastCompleteOrder = null;
            if(Auth::guard('user')->check() && Auth::guard('user')->user()->website_id == $this->website_id){
                // if(Carbon::make(Auth::guard('user')->user()->cart_lastUpdate) < Carbon::now()->subMinutes($this->website->cart_lifeTime)->timestamp){
                //     User::where(['id' => Auth::guard('user')->user()->id ])->update(['lastSeen' => Carbon::now()->timestamp ,'cart'=>'{}','cart_lastUpdate'=>Carbon::now()->timestamp]);
                // }else{
                    User::where(['id' => Auth::guard('user')->user()->id ])->update(['lastSeen' => Carbon::now()->timestamp]);
                // }
                // $this->website->liveChat = liveChat::where(['website_id'=>$this->website_id,'user_id'=>Auth::guard('user')->user()->id])->orderBy('sent_at','desc')->limit(30)->get();
                if($this->website->collectReviews == true){
                    $lastCompleteOrder = order::where([
                        'website_id' => $this->website_id,
                        'user_id' => Auth::guard('user')->user()->id,
                        'collectReviewSeen' => false,
                    ])
                    ->whereIn('status',[5,6,7])
                    ->with('order_items')
                    ->orderBy('placed_at','desc')
                    ->first();
                    // if(isset($lastCompleteOrder->order_items)){
                    if(isset($lastCompleteOrder->order_items) && $lastCompleteOrder->collectReviewSeen == false){
                        order::where('id',$lastCompleteOrder->id)->update(['collectReviewSeen'=>true]);
                        $notification = new stdClass();
                        $notification->website_id = $this->website_id;
                        $notification->code = 6.5;
                        $notification->order_id = $lastCompleteOrder->id;
                        broadcast(new cpanelNotification($notification))->toOthers();

                        $this->website->lastCompleteOrder = $lastCompleteOrder;
                    }
                }
            }else{
                if(!Auth::guard('guest')->check() || Auth::guard('guest')->user()->website_id != $this->website_id){
                    $guest  = new guest();
                    $guest->number = guest::where('website_id',$this->website_id)->count() +1;
                    $guest->name = 'Guest '.$guest->number;
                    $guest->password = bcrypt(Str::random(10));
                    $guest->ip = $request->server('HTTP_X_FORWARDED_FOR') ?? $request->ip();
                    $guest->lastSeen = Carbon::now()->timestamp;
                    $guest->website_id = $this->website_id;
                    $guest->save();
                    Auth::guard('guest')->login($guest,$remember = true);
                    $request->session()->regenerate();
                }else{
                    guest::where('id',Auth::guard('guest')->user()->id)->update(['lastSeen'=>Carbon::now()->timestamp]);
                }
            }
            return $next($request);
        })->only(['home','category','product','allproducts','privacypolicy','aboutus','profile']);
    }
    public function userLogin(Request $request)
    {
        if($request->remember == 1){
            $remember = true;
        }else if($request->remember == 0){
            $remember = false;
        }
        $userBanCheck = User::where('email',$request->email)->pluck('isBanned')->first();
        if($userBanCheck == 1){
            return response(['loginStats' => 2 ]);
        }else{
            if(Auth::guard('user')->attempt(['email' => $request->email , 'password' => $request->password, 'website_id' => $this->website_id ],$remember)){
                Auth::guard('guest')->logout();
                // if(Auth::guard('user')->user()->cart == '[]'){
                //     User::where('id',Auth::guard('user')->user()->id)->update(['cart'=>Cookie::get(website::where('id',Auth::guard('user')->user()->website_id)->pluck('domainName')->first().'_cart') ?? '[]']);
                // }
                if($request->loginCart != null || $request->loginCart != ''){
                    User::where('id',Auth::guard('user')->user()->id)->update(['cart' => $request->loginCart]);
                }
                return response(['loginStats' => 1]);
            }else{
                return response(['loginStats' => 0 ]);
            }
        }

    }
    public function userLogout(Request $request)
    {
        // if($request->logout == 1){
            Auth::guard('user')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            // return response(['logoutStats' => 1]);
            return redirect()->back();
        // }
    }
    public function userSignup(Request $request)
    {
        $validation = Validator::make($request->all(),[
            'email'=>'required|email',
            'name'=>'required|min:5|max:100',
            'password' => 'required|min:8|max:100',
            'phoneNumber' => 'required|regex:/^[+0-9]+$/|min:5|',
            'address' => 'required',
        ],[
            'email.required' => 'emailRequired',
            'email.email' =>  'emailEmail',

            'name.required' => 'nameRequired',
            'name.max' =>  'nameMax',
            'name.min' => 'nameMin',


            'password.required' => 'passwordRequired',
            'password.min' => 'passwordMin',
            'password.max' => 'passwordMax',

            'phoneNumber.required' => 'phoneNumberRequired',
            'phoneNumber.regex' => 'phoneNumberRegex',
            'phoneNumber.min' => 'phoneNumberRequired',
            'address.required' => 'addressRequired',

        ]);
        // $phoneCheck = User::where(['website_id'=>$this->website_id ,'phoneNumber'=>$request->phoneNumber])
        // ->where('phoneNumber','!=',Auth::guard('user')->user()->phoneNumber)
        // ->count();
        // if($phoneCheck > 0){
        //     $validation->after(function ($validation) {
        //         $validation->errors()->add('phoneNumber', 'phoneNumberUnique');
        //     });
        // }
        if($request->privacyPolicyCheck == 0){
            $validation->after(function ($validation) {
                $validation->errors()->add('privacyPolicy', 'privacyPolicy');
            });
        }
        $emailCheck = User::where(['website_id'=>$this->website_id ,'email'=>$request->email])->count();
        if($emailCheck > 0){
            $validation->after(function ($validation) {
                $validation->errors()->add('email', 'emailUnique');
            });
        }
        if($validation->fails()){
            return response(['signupstats' => 0 , 'error' => $validation->errors()]);
        }else{
            $user = User::create([
                'email'=>strip_tags($request->email),
                'password'=>bcrypt($request->password),
                'name'=>strip_tags($request->name),
                'phoneNumber' => strip_tags($request->phoneNumber),
                'address' => strip_tags($request->address),
                'website_id' => $this->website_id ,
                'lastSeen' => Carbon::now()->timestamp,
                'cart' => '{}',
                'cart_lastUpdate' => Carbon::now()->timestamp,
            ]);
            $notification = notification::create([
                'website_id'=>(int) $this->website_id ,
                'seen' => false,
                'code'=>3,
                'user_id'=>(int) $user->id,
                'userName'=>strip_tags($request->name),
            ]);
            $user->isBanned = false;
            $user->lat = 0;
            $user->lng = 0;
            $user->ordersSum = 0;
            $user->reviewsSum = 0;
            $notification->user = $user;
            $notification->activity = activityLog::create([
                'website_id'=>(int) $this->website_id ,
                'code' => 0,
                'user_id' => (int) $user->id,
                'user_name' => $user->name,
            ]);
            // broadcast(new cpanelNotification($notification))->toOthers();
            return response(['signupstats' => 1 ]);

        }
    }
    public function recoverpassword(Request $request)
    {
        if($request->has(['recoverPassword'])){
            $resetPassword_token_sent_at = User::where(['email'=>$request->email,'website_id'=>$this->website_id ])->pluck('resetPassword_token_sent_at')->first();
            if($resetPassword_token_sent_at > Carbon::now()->subMinutes(10)->timestamp){
                return response(['recoverPasswordStatus'=>2]);
            }else{
                if($request->email == Null || $request->email == ''){
                    return response(['recoverPasswordStatus'=>3]);
                }else{
                    $checkEmail = User::where(['email'=>$request->email,'website_id'=>$this->website_id ])->pluck('email')->first();
                    if($checkEmail == $request->email){
                                $token = Str::random(100);
                                $setResetPasswordToken = User::where(['email'=>$request->email,'website_id'=>$this->website_id ])->update(['resetPassword_token'=> $token ,'resetPassword_token_sent_at'=>now()->timestamp]);
                                if($setResetPasswordToken){
                                    ///send email with the token
                                    if(1+1==2){
                                        return response(['recoverPasswordStatus'=>1]);
                                    }else{
                                        return response(['recoverPasswordStatus'=>0 ]);
                                    }
                                }else{
                                    return response(['recoverPasswordStatus'=>0 ]);
                                }


                    }else{
                        return response(['recoverPasswordStatus'=>3]);
                    }
                }
            }
        }else if($request->has(['recoverPasswordTokenCheck'])){
            // return response(['recoverPasswordTokenCheckStatus'=>1]);

            // $recoverPasswordTokenCheck = User::where(['resetPassword_token'=>$request->recoverPasswordTokenCheck,'website_id'=>$this->website_id ])->count();
            $resetPassword_token_sent_at = User::where(['resetPassword_token' => $request->recoverPasswordTokenCheck,'website_id'=>$this->website_id ])->pluck('resetPassword_token_sent_at')->first();
            if($resetPassword_token_sent_at){
                if(Carbon::now()->subMinutes(10)->timestamp < $resetPassword_token_sent_at){
                    return response(['recoverPasswordTokenCheckStatus'=>0]);
                }else{
                    return response(['recoverPasswordTokenCheckStatus'=>1]);
                }
            }else{
                return response(['recoverPasswordTokenCheckStatus'=>2]);
            }
        }else if($request->has(['createNewPassword'])){
            $passwordRestToken = User::where(['resetPassword_token' => $request->recoverPasswordToken,'website_id'=>$this->website_id ])->select('resetPassword_token','resetPassword_token_sent_at')->first();
            if($passwordRestToken->resetPassword_token == $request->recoverPasswordToken){
                if(Carbon::now()->subMinutes(10)->timestamp < $passwordRestToken->resetPassword_token_sent_at){
                    return response(['createNewPasswordStatus'=>0]);
                }else{

                    $validation = Validator::make($request->all(),[
                        'newPassword' => 'required|min:8|max:100',
                    ],[
                        'newPassword.required' => 'passwordRequired' ,
                        'newPassword.min' => 'passwordMin' ,
                        'newPassword.max' => 'passwordMax' ,
                    ]);

                    if($validation->fails()){
                        return response(['createNewPasswordStatus' => 2 , 'error' => $validation->errors()]);
                    }else{

                        $changePassword = User::where(['resetPassword_token' => $request->recoverPasswordToken,'website_id'=>$this->website_id ])
                            ->update(['password'=>bcrypt($request->newPassword),'resetPassword_token'=>NULL,'resetPassword_token_sent_at'=>NULL]);
                        if($changePassword){
                            return response(['createNewPasswordStatus'=> 1 ]);
                        }else{
                            return response(['createNewPasswordStatus'=>3 ]);
                        }
                    }
                }
            }
            else{
                return response(['createNewPasswordStatus'=>4]);
            }
        }

    }
    public function editProfile(Request $request)
    {
        if($request->has(['editProfile'])){
            if($request->name == Auth::guard('user')->user()->name &&
                $request->phoneNumber == Auth::guard('user')->user()->phoneNumber &&
                $request->address == Auth::guard('user')->user()->address &&
                $request->lat == Auth::guard('user')->user()->lat &&
                $request->lng == Auth::guard('user')->user()->lng){
                    return response(['saveProfileStatus'=>1]);
                }
            $validate = Validator::make($request->all(),[
                'name'=>'required|min:5|max:100',
                'phoneNumber' => 'required|regex:/^[+0-9]+$/|min:5',
                'address' => 'required',
            ],[
                'name.required' =>  'nameRequired',
                'name.max' => 'nameMax',
                'name.min' => 'nameMin',
                'phoneNumber.required' => 'phoneNumberRequired',
                'phoneNumber.regex' => 'phoneNumberRegex',
                'address.required' => 'addressRequired',
            ]);
            if($validate->fails()){
                return response(['saveProfileStatus'=>0,'error'=>$validate->errors()]);
            }else{
                $saveProfile = User::where('id',Auth::guard('user')->user()->id)
                ->update([
                    'name'=>strip_tags($request->name),
                    'phoneNumber'=>strip_tags($request->phoneNumber),
                    'address' =>strip_tags($request->address),
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                ]);
                if($saveProfile){
                    $notification = new stdClass();
                    $notification->code = 20.3;
                    $notification->user = User::where('id',Auth::guard('user')->user()->id)->first();
                    $notification->website_id = (int) $this->website_id ;
                    $notification->activity = activityLog::create([
                        'website_id' =>(int) $this->website_id ,
                        'user_id' => Auth::guard('user')->user()->id,
                        'user_name' => strip_tags($request->name),
                        'code' => 1,
                    ]);
                    broadcast(new cpanelNotification($notification))->toOthers();
                    return response(['saveProfileStatus'=>1]);
                }else{
                    return response(['saveProfileStatus'=>2]);
                }
            }
        }
        else if($request->has(['changeEmail'])){
            $emailCheck = User::where(['website_id'=>$this->website_id ,'email'=>$request->newEmail])->count();
            if($emailCheck > 0){
                return response(['changeEmailStatus' => 2]);
            }
            $validation = Validator::make($request->all(),[
                'newEmail'=>'required|email',
            ],[
                'newEmail.required' =>  'emailRequired' ,
                'newEmail.email' => 'emailEmail',
            ]);
            if($validation->fails()){
                return response(['changeEmailStatus' => 0 , 'error' => $validation->errors()]);
            }else{
                $oldEmail = Auth::guard('user')->user()->email;
                $changeEmail = user::where('id',Auth::guard('user')->user()->id)
                    ->update(['email'=>strip_tags($request->newEmail)]);
                if($changeEmail){
                    $notification = new stdClass();
                    $notification->website_id =(int) $this->website_id ;
                    $notification->code = 20.3;
                    $notification->user = User::where('id',Auth::guard('user')->user()->id)->first();
                    $notification->activity = activityLog::create([
                        'website_id' => (int) $this->website_id ,
                        'user_id' => Auth::guard('user')->user()->id,
                        'user_name' => Auth::guard('user')->user()->name,
                        'code' => 2,
                        'oldEmail' => $oldEmail,
                        'newEmail' => $request->newEmail,
                    ]);
                    broadcast(new cpanelNotification($notification))->toOthers();
                    return response(['changeEmailStatus' => 1]);
                }else{
                    return response(['changeEmailStatus' => 3]);

                }
            }

        }
        else if($request->has(['changePassword'])){
            $validation = Validator::make($request->all(),[
                'newPassword' => 'required|min:8|max:100',
            ],[
                'newPassword.required' => 'passwordRequired',
                'newPassword.min' => 'passwordMin',
                'newPassword.max' => 'passwordMax',
            ]);
            if($validation->fails()){
                return response(['changePasswordStatus' => 0 , 'error' => $validation->errors()]);
            }else{
                $changePassword = user::where('id',Auth::guard('user')->user()->id)
                    ->update(['password'=>bcrypt($request->newPassword)]);
                if($changePassword){
                    $notification = new stdClass();
                    $notification->website_id =(int) $this->website_id ;
                    $notification->activity = activityLog::create([
                        'website_id' => (int) $this->website_id ,
                        'user_id' => Auth::guard('user')->user()->id,
                        'user_name' => Auth::guard('user')->user()->name,
                        'code' => 3,
                    ]);
                    broadcast(new cpanelNotification($notification))->toOthers();
                    return response(['changePasswordStatus' => 1]);
                }else{
                    return response(['changePasswordStatus' => 2]);

                }
            }
        }
    }
    public function liveChat(Request $request)
    {
        if($request->has(['getChats'])){
            if(Auth::guard('user')->check()){
                $getChats = liveChat::where([
                    'website_id'=>Auth::guard('user')->user()->website_id,
                    'user_id'=>Auth::guard('user')->user()->id,
                ])
                ->orderBy('sent_at','desc')->limit(30)->get();
            }else{
                $getChats = liveChat::where([
                    'website_id'=>Auth::guard('guest')->user()->website_id,
                    'guest_id'=>Auth::guard('guest')->user()->id,
                ])
                ->orderBy('sent_at','desc')->limit(30)->get();
            }

            return response(['getChats' => $getChats]);
        }
        else if($request->has(['getMoreChatMsgs'])){
            if(Auth::guard('user')->check()){
                $moreChatMSgs = liveChat::where([
                    'website_id'=>Auth::guard('user')->user()->website_id,
                    'user_id'=>Auth::guard('user')->user()->id,
                ])
                ->where('sent_at','<=',new DateTime($request->getMoreChatMsgs))
                ->where('_id','!=',$request->lastMsgId)
                ->orderBy('sent_at','desc')->limit(30)->get();
            }else{
                $moreChatMSgs = liveChat::where([
                    'website_id'=>Auth::guard('guest')->user()->website_id,
                    'guest_id'=>Auth::guard('guest')->user()->id,
                ])
                ->where('sent_at','<=',new DateTime($request->getMoreChatMsgs))
                ->where('_id','!=',$request->lastMsgId)
                ->orderBy('sent_at','desc')->limit(30)->get();
            }

            return response($moreChatMSgs);
        }
        else if($request->has(['deleteChatMessage'])){

            if(Auth::guard('user')->check()){
                $type = 'user';$id = Auth::guard('user')->user()->id;
            }else if(Auth::guard('guest')->check()){
                $type = 'guest'; $id = Auth::guard('guest')->user()->id;
            }
            $deleteMsg = liveChat::where(['_id'=>$request->deleteChatMessage,'website_id' => Auth::guard($type)->user()->website_id,'author'=>1,$type.'_id'=>$id ])->first()
            ->update(['is_deleted'=>true,'deleted_at'=> Carbon::now()->timestamp,'message'=> '--']);
            if($deleteMsg){
                foodmenuFunctions::notification('liveChat.msg_deleted_by_user',[],[
                    'type' => $type,
                    'id' => $id,
                    'msgId' => $request->deleteChatMessage,
                    'now' => Carbon::now()->timestamp,
                ]);
                return response(['deleteChatMessage' => 1,'now' => Carbon::now()->timestamp]);
            }else{
                return response(['deleteChatMessage' => 0]);
            }
            // }else{
            //     $deleteMsg = liveChat::where(['_id'=>$request->deleteChatMessage,'website_id' => Auth::guard('guest')->user()->website_id,'author'=>1 ,'guest_id'=>Auth::guard('guest')->user()->id])->first()
            //     ->update(['is_deleted'=>true,'deleted_at'=> new UTCDateTime(),'message'=> 'Deleted message']);
            //     if($deleteMsg){
            //         $user = new stdClass();
            //         $user->id = Auth::guard('guest')->user()->id;
            //         $user->website_id = Auth::guard('guest')->user()->website_id;
            //         $user->code = 1;
            //         $user->msgId = $request->deleteChatMessage;
            //         $user->now = Carbon::now();
            //         $user->userType = 'guest';
            //         broadcast(new usersStatus($user))->toOthers();
            //         return response(['deleteChatMessage' => 1,'now' => Carbon::now()]);
            //     }else{
            //         return response(['deleteChatMessage' => 0]);
            //     }
            // }

        }
        else if($request->has(['sendChatMessage'])){
            if(Auth::guard('user')->check()){$type = 'user';}else if(Auth::guard('guest')->check()){$type = 'guest';}
            $createChatMsg = liveChat::create([
                'website_id' => Auth::guard($type)->user()->website_id,
                $type.'_id' => Auth::guard($type)->user()->id,
                'author' => 1,
                'message' => strip_tags($request->sendChatMessage),
                'sent_at' => Carbon::now()->timestamp,
                'seen_at' => null,
                'is_seen'=>false,
                'is_deleted' =>false,
            ]);
            if($createChatMsg){
                if($type == 'user'){
                    User::where('id',Auth::guard('user')->user()->id)->update(['lastChat' => carbon::now()->timestamp,'lastMsg_id' => $createChatMsg->_id]);
                }else if($type == 'guest'){
                    guest::where('id',Auth::guard('guest')->user()->id)->update(['lastChat' => carbon::now()->timestamp,'lastMsg_id' => $createChatMsg->_id]);
                }
                foodmenuFunctions::notification('liveChat.new_msg_by_user',[],[
                    'type' => $type,
                    'id' => Auth::guard($type)->user()->id,
                    'msg' => $createChatMsg,
                ]);
                    return response(['sendChatMessage' => 1,'msg' => $createChatMsg, 'tempId'=> $request->tempId]);
                }else{
                    return response(['sendChatMessage' => 0]);
                }
        }
        else if($request->has('typing')){
            if(Auth::guard('user')->check()){
                foodmenuFunctions::notification('liveChat.typing',[],[
                    'type' => 'user',
                    'id' => Auth::guard('user')->user()->id
                ]);
            }else if(Auth::guard('guest')->check()){
                foodmenuFunctions::notification('liveChat.typing',[] ,[
                    'type' => 'guest',
                    'id' => Auth::guard('guest')->user()->id
                ]);
            }

        }
        else if($request->has(['setAsSeen'])){
            if(Auth::guard('user')->check()){$type = 'user';}else if(Auth::guard('guest')->check()){$type = 'guest';}
            $msg = liveChat::where([
                'website_id'=>Auth::guard($type)->user()->website_id,
                $type.'_id'=>Auth::guard($type)->user()->id,
                'author' => 0,
                'is_seen'=> false,
            ])
            ->update(['seen_at'=> Carbon::now()->timestamp,'is_seen'=>true]);
            foodmenuFunctions::notification('liveChat.seen_by_user',[],[
                'id'=>Auth::guard($type)->user()->id,
                'type' => $type,
                'seen_at' => Carbon::now()->timestamp,
            ]);
            return response(['seen_at' => Carbon::now()->timestamp]);
        }
    }
    public function order(Request $request)
    {
        if($request->has('setCart')){
            User::where(['website_id'=>$this->website_id,'id'=>Auth::guard('user')->user()->id])
                ->update(['cart'=>$request->setCart,'cart_lastUpdate'=>Carbon::now()->timestamp]);
                $notification = new stdClass();
                $notification->code = 1.5;
                $notification->website_id = $this->website_id;
                $notification->user_id = Auth::guard('user')->user()->id;
                $notification->cart = $request->setCart;
                $notification->cart_lastUpdate = Carbon::now()->timestamp;

                // $notification->activity = activityLog::create([
                //     'website_id' => $this->website_id,
                //     'code' => 4,
                //     'user_id'=>  Auth::guard('user')->user()->id,
                //     'user_name' => Auth::guard('user')->user()->name,
                // ]);
                broadcast(new cpanelNotification($notification))->toOthers();

        }else if($request->has(['placeOrder'])){
            $website = website::where('id',$this->website_id)->select([
                'timeZone','guestOrders',
                'usePickup','useDelivery',
                'acceptDeliveryOrders24','acceptPickupOrders24',
                'workingDays_delivery','workingDays_pickup',
                'deliveryCost','deliveryTaxCost','deliveryTaxPercentage','useDeliveryTaxCost','deliveryMinimumCharge','deliveryMinimumChargeIncludes',
                'pickupTaxCost','pickupTaxPercentage','usePickupTaxCost','pickupMinimumCharge','pickupMinimumChargeIncludes',
            ])->first();

            if(!$website->guestOrders && !Auth::guard('user')->check()){return;}

            if(Auth::guard('user')->check()){
                $user_id = Auth::guard('user')->user()->id; $isGuest = false; $userName = Auth::guard('user')->user()->name;
            }else{
                $user_id = null; $isGuest = true; $userName = null;
            }

            $orderItemsIds = [];
            $orderItems = [];
            $itemsTotal = (double)0;
            $discount_by = 0;
            $discount_promocode = null;
            $discount_promocode_id = null;

            foreach($request->orderItems as $item){
                array_push($orderItemsIds,$item['productId']);
            }
            $products = product::where('website_id',$this->website_id)->whereIn('id',$orderItemsIds)->with(['product_options'=>function($q){
                $q->with('product_option_selections');
            }])->get();
            if(empty($request->orderItems) || empty($products)){return response(['placeOrderStat' => 0]);}
            foreach($request->orderItems as $item){
                $itemSelections = [];
                $product = $products->where('id',$item['productId'])->first();
                if(!$product){return response(['placeOrderStat' => 0]);}
                $itemTotal = (double)$product->price;
                if(!empty($item['itemOptions'])){
                    foreach($item['itemOptions'] as $itemOption){
                        $productOption = $product->product_options->where('id',$itemOption['optionId'])->first();
                        $productSelection = $productOption->product_option_selections->where('id',$itemOption['selectionId'])->first();
                        if(!$productOption || !$productSelection){return response(['placeOrderStat' => 0]);}
                        $itemTotal = $itemTotal + $productSelection->price;
                        array_push($itemSelections,[
                            'optionName' => $productOption->name,
                            'product_option_id' => $productOption->id,
                            'selectionName'=>$productSelection->name,
                            'product_option_selection_id'=>$productSelection->id,
                            'price'=>(double)$productSelection->price,
                        ]);

                    }
                }
                $itemTotal = $itemTotal * (int)$item['qty'];
                $itemsTotal = $itemsTotal + $itemTotal;
                $itemTotal = (double)$itemTotal;
                array_push($orderItems,[
                    'product_id' => $product->id,
                    'productName' => $product->name,
                    'price' => (double)$product->price,
                    'qty' => (int)$item['qty'],
                    'total' => $itemTotal,
                    'order_item_option_selections' => $itemSelections,
                    'itemNotice' => $item['itemNotice']
                ]);
            }
            $discount = 0;
            $discount_itemsTotal = 0;
            $deliveryCost = 0;
            $tax = 0;
            $taxPercent = 0;
            $total = 0;
            $now = new DateTime('now',new DateTimeZone($website->timeZone));
            $yesterday = new DateTime('yesterday',new DateTimeZone($website->timeZone));
            if((int)$request->orderType == 0){
                if(!$website->useDelivery){return response(['placeOrderStat' => 0]);}
                $deliveryTimes = $website->workingDays_delivery;
                if(!$website->acceptDeliveryOrders24 && !foodmenuFunctions::checkOrderTimesAvailability($deliveryTimes,$now,$yesterday)){
                    return response(['placeOrderStat' => 0]);
                }else{
                    $discount = foodmenuFunctions::getDiscount($deliveryTimes,$now,$yesterday);

                    $discount_itemsTotal = $itemsTotal - (($itemsTotal * $discount)/100);
                    $deliveryCost = (double)$website->deliveryCost;
                    if($website->useDeliveryTaxCost){
                        $tax = (double)$website->deliveryTaxCost;
                    }else{
                        if((double)$website->deliveryTaxPercentage > 0){
                            $taxPercent = $website->deliveryTaxPercentage;
                            $tax = ((double)$website->deliveryTaxPercentage / 100) * $discount_itemsTotal;
                        }
                    }
                    $total = $discount_itemsTotal + $tax + $deliveryCost;
                    if((double)$website->deliveryMinimumCharge > 0){
                        if($website->deliveryMinimumChargeIncludes && (double)$website->deliveryMinimumCharge > $total){
                            return response(['placeOrderStat' => 0]);
                        }else if(!$website->deliveryMinimumChargeIncludes && (double)$website->deliveryMinimumCharge > $itemsTotal ){
                            return response(['placeOrderStat' => 0]);
                        }
                    }
                }

            }else if((int)$request->orderType == 1){
                if(!$website->usePickup){return response(['placeOrderStat' => 0]);}
                $pickupTimes = $website->workingDays_pickup;
                if(!$website->acceptPickupOrders24 && !foodmenuFunctions::checkOrderTimesAvailability($pickupTimes,$now,$yesterday)){
                    return response(['placeOrderStat' => 0]);
                }else{
                    $discount = foodmenuFunctions::getDiscount($pickupTimes,$now,$yesterday);

                    $discount_itemsTotal = $itemsTotal - (($itemsTotal * $discount)/100);
                    if($website->usePickupTaxCost){
                        $tax = (double)$website->pickupTaxCost;
                    }else{
                        if((double)$website->pickupTaxPercentage > 0){
                            $taxPercent = $website->pickupTaxPercentage;
                            $tax = ((double)$website->pickupTaxPercentage / 100) * $discount_itemsTotal;
                        }
                    }
                    $total = $discount_itemsTotal + $tax;
                    if((double)$website->pickupMinimumCharge > 0){
                        if($website->pickupMinimumChargeIncludes && (double)$website->pickupMinimumCharge > $total){
                            return response(['placeOrderStat' => 0]);
                        }else if(!$website->pickupMinimumChargeIncludes && (double)$website->pickupMinimumCharge > $itemsTotal ){
                            return response(['placeOrderStat' => 0]);
                        }
                    }
                }
            }
            if($itemsTotal > $discount_itemsTotal){
                $discount_by = 2;
                $discount_promocode = null;
                $discount_promocode_id = null;
            }
            if($request->promocode != null){
                $promocode = promocode::where(['website_id' => $this->website_id,'code' => $request->promocode])->first();
                // $promocode->users()->attach(Auth::guard('user')->user()->id);
                $promocodeCheck = true;
                if(!$promocode || !$promocode->is_active){
                    $promocodeCheck = false;
                }else{
                    if(!$promocode->is_guest && !Auth::guard('user')->check()){
                        $promocodeCheck = false;
                    }
                    if($promocode->is_expires){
                        $timeZone = $website->timeZone;
                        if($promocode->expires_at < Carbon::now()->timestamp){
                            $promocodeCheck = false;
                        }
                    }
                    if($promocode->is_oneUse && Auth::guard('user')->check()){
                        if(DB::table('users_promocodes')->where(['user_id'=>Auth::guard('user')->user()->id,'promocode_id'=>$promocode->id])->count() > 0){
                            $promocodeCheck = false;
                        }
                    }
                    if(!$promocode->is_delivery && $request->orderType == 0){
                        $promocodeCheck = false;
                    }
                    if(!$promocode->is_pickup && $request->orderType == 1){
                        $promocodeCheck = false;
                    }
                    if($promocode->minimum > 0 && $promocode->minimum > $total){
                        $promocodeCheck  = false;
                    }
                }

                //check delivery and pickup
                if($promocodeCheck == true){
                    $promocodeCode = $promocode->code;
                    $discount = (double)$promocode->discount;
                    $discount_itemsTotal = $itemsTotal - (($itemsTotal * $discount)/100);
                    if($promocode->cap > 0 && (double)$discount_itemsTotal > (double)$promocode->cap){
                        $discount_itemsTotal = $itemsTotal - (double)$promocode->cap;
                    }
                    if($taxPercent > 0){
                        $tax = ($taxPercent / 100) * $discount_itemsTotal;
                    }
                    $discount_by = 3;
                    $discount_promocode = $promocode->code;
                    $discount_promocode_id = $promocode->id;
                    $total = $discount_itemsTotal + $tax + $deliveryCost;
                }
            }
            $order = new order([
                'website_id' => (int)$this->website_id ,
                'id' => order::where('website_id',(int)$this->website_id )->max('id') + 1,

                'isGuest' => $isGuest,
                'user_id' => $user_id,
                'userName' => $userName,
                'phoneNumber' => strip_tags($request->phoneNumber),
                'address' => strip_tags($request->address),
                'lat' => (string)$request->lat,
                'lng' => (string)$request->lng,

                'type' => (int)$request->orderType,
                'status' => 0,
                'notice' => strip_tags($request->orderNotice),
                'paymentMethod' =>$request->paymentMethod,
                'collectReviewSeen' => false,

                'discount' => (int)$discount,
                'itemsTotal' => (double)$itemsTotal,
                'discount_itemsTotal' => (double)$discount_itemsTotal,
                'tax' => (double)$tax,
                'taxPercent' => (double)$taxPercent,
                'service' => 0,
                'servicePercent' => 0,
                'deliveryCost' => (double)$deliveryCost,
                'total' => (double)$total,

                // 'delivery_id' => null,
                // 'deliveryName' => null,

                'placed_at' => Carbon::now()->timestamp,
                'placed_by' => 1,
                // 'placed_account_name' => null,
                // 'placed_account_id' => null,

                'accepted_at' => null,

                'out_for_delivery_at' => null,
                'delivered_at' => null,

                'ready_for_pickup_at' => null,
                'pickedUp_at' => null,

                'diningin_at' => null,
                'dinedin_at' => null,

                'canceled_at' => null,

                'discount_by' => $discount_by,
                'discount_promocode' => $discount_promocode,
                'discount_promocode_id' => $discount_promocode_id,
                // 'discount_account_name' => null,
                // 'discount_account_id' => null,

                // 'itemsEdit_account_name' => null,
                // 'itemsEdit_account_id' => null,

                // 'deliveryEdit_account_name' => null,
                // 'deliveryEdit_account_id' => null,

                // 'typeEdit_account_name' => null,
                // 'typeEdit_account_id' => null,
            ]);



            foreach($orderItems as $item){
                $orderItem = new order_item($item);
                $order->order_items()->associate($orderItem);
            }

            $order->save();

            if($order){
                $order = foodmenuFunctions::checkOrderId($this->website_id,$order->id);

                if($request->promocode != null && $promocodeCheck && Auth::guard('user')->check()){
                    $promocode->users()->attach(Auth::guard('user')->user()->id);
                }

                $notification = notification::create([
                    'code' => 'orders.new_order_user',
                    'seen' => false,
                    'website_id'=>(int)$this->website_id ,
                    'order_id' => $order->_id,
                    'order_number' => $order->id,
                    'user_id' => $user_id,
                    'userName' => $userName,
                ]);

                foodmenuFunctions::notification('orders.new_order_user',[
                    'website_id' =>(int)$this->website_id ,
                    'code' => 'order.new_order_by_user',
                    'user_id' => $user_id,
                    'user_name' => $userName,
                    'order_id' => $order->_id,
                    'order_number' => $order->id,
                ],[
                    'order' => $order,
                    'notification' => $notification,
                ]);

                // $notification->order = $order;
                // $notification->activity = activityLog::create([
                //     'website_id' =>(int)$this->website_id ,
                //     'code' => 8,
                //     'user_id' => $user_id,
                //     'user_name' => $userName,
                //     'order_id' => $order->id,
                // ]);

                // broadcast(new cpanelNotification($notification))->toOthers();
                return response(['placeOrderStat' => 1,'order' => $order]);

            }

        }else if($request->has('trackOrder')){
            if(Auth::guard('user')->check()){
                $order = order::where([
                    'id'=>(int)$request->trackOrder,
                    'website_id'=>(int)$this->website_id ,
                    ])->where(function($q){
                        $q-> where('user_id',Auth::guard('user')->user()->id)->orWhere('isGuest',true);
                    })->first();
            }else{
                $order = order::where([
                    'id' =>(int) $request->trackOrder,
                    'isGuest' => true,
                    'website_id'=>(int)$this->website_id ,
                ])->first();
            }
            if($order){
                return response(['trackOrderStatus'=> 1,'order'=>$order]);
            }else{
                return response(['trackOrderStatus'=> 0]);
            }
        }else if($request->has(['cancelOrder'])){
            $order = order::where(['id'=>(int)$request->cancelOrder,'website_id'=>$this->website_id])->first();
            if($order->isGuest == false && $order->user_id != Auth::guard('user')->user()->id){return;}
            if($order->status == 0){
                $cancelOrder = $order->update(['status'=>2 , 'canceled_at' => Carbon::now()->timestamp,'canceled_by'=>1]);

                if($cancelOrder){
                    $order->status = 2;
                    $order->canceled_at = new DateTime();
                    if(Auth::guard('user')->check()){
                        $userName = Auth::guard('user')->user()->name;
                        $user_id = Auth::guard('user')->user()->id;
                    }else{
                        $userName = null;
                        $user_id = null;
                    }
                    $notification = notification::create([
                        'code' => 'orders.canceled_by_user',
                        'seen' => false,
                        'website_id'=>(int)$this->website_id ,
                        'order_id' => $order->_id,
                        'order_number' => $order->id,
                        'user_id' => $user_id,
                        'userName' => $userName,
                    ]);
                    // $notification->activity = activityLog::create([
                    //     'website_id' => (int)$this->website_id ,
                    //     'code' => 6,
                    //     'order_id' => (int) $request->cancelOrder,
                    //     'user_id' => $user_id,
                    //     'user_name' => $userName,
                    // ]);
                    // $orderId = (int) $request->cancelOrder;

                    foodmenuFunctions::notification('orders.canceled_by_user',[
                        'website_id' => (int)$this->website_id ,
                        'code' => 'order.canceled_by_user',
                        'order_id' => $order->_id,
                        'order_number' => $order->id,
                        'user_id' => $user_id,
                        'user_name' => $userName,
                    ],[
                        'order_id' => $order->_id,
                        'canceled_at' => Carbon::now()->timestamp,
                        'notification' => $notification,
                    ]);
                    // $notification->order = $order;
                    // broadcast(new cpanelNotification($notification))->toOthers();
                    return response(['cancelOrderStatus' => 1,'order' => $order]);
                }else{
                    return response(['cancelOrderStatus' =>0]);
                }
            }else{
                return response(['cancelOrderStatus' =>0]);
            }


        }else if($request->has(['getOrderHistory'])){
            if(Auth::guard('user')->check()){
                if($request->getMoreOrdersAfter == null || $request->getMoreOrdersAfter == ''){
                    $orders = order::where('user_id',Auth::guard('user')->user()->id)
                    ->orderBy('placed_at','desc')
                    ->take(20)->get();
                }else{
                    $orders = order::where('user_id',Auth::guard('user')->user()->id)
                    ->where('placed_at','<',new DateTime($request->getMoreOrdersAfter))
                    ->where('id','!=',$request->lastOrderId)
                    ->orderBy('placed_at','desc')
                    ->take(20)->get();
                }
                return response(['orders'=>$orders]);

            }
        }else if($request->has(['promocodeCheck'])){
            $promocode = promocode::where(['website_id' => $this->website_id,'code' => $request->promocodeCheck])->first();
            // $promocode->users()->attach(Auth::guard('user')->user()->id);
            if(!$promocode || !$promocode->is_active){
                return response(['promocodeCheck' => 0]);
            }
            if(!$promocode->is_guest && !Auth::guard('user')->check()){
                return response(['promocodeCheck' => 2]);
            }
            if($promocode->is_expires){

                if($promocode->expires_at < Carbon::now()->timestamp){
                    return response(['promocodeCheck' => 3]);
                }
            }
            if($promocode->is_oneUse && Auth::guard('user')->check()){
                if(DB::table('users_promocodes')->where(['user_id'=>Auth::guard('user')->user()->id,'promocode_id'=>$promocode->id])->count() > 0){
                    return response(['promocodeCheck' => 4]);
                }
            }
            return response(['promocodeCheck' => 1,'promocode'=>$promocode]);
        }
    }
    public function reviews(Request $request)
    {


        if($request->has(['postNewReview']))
        {
            if(Auth::guard('user')->check()){
                $userId = Auth::guard('user')->user()->id;
                $userName = Auth::guard('user')->user()->name;

            }else{
                $userId = null;
                $userName = null;
                if(!website::where('id',$this->website_id )->pluck('guestReviews')->first() && !Auth::guard('user')->check()){
                    return response(['postReviewStatus' => 0 ]);
                }
            }
            if($request->reviewRate == 0  || $request->reviewReview == null || $request->reviewReview == ''){
                return response(['postReviewStatus' => 0 ]);
            }else{
                $postReview = product_review::create([
                    'website_id' => $this->website_id ,
                    'product_id' => $request->productId,
                    'product_name' => $request->productName,
                    'userName' => $userName,
                    'user_id' => $userId,
                    'rate' => $request->reviewRate,
                    'review' => strip_tags($request->reviewReview),
                    'posted_at' => Carbon::now()->timestamp,
                ]);

                if($postReview){
                    $notification = notification::create([
                        'code' => 4,
                        'seen' => false,
                        'website_id'=>(int) $this->website_id ,
                        'user_id' => $userId,
                        'product_review_id'=> $postReview->id,
                        'productName' => $request->productName,
                        'userName' => $userName,
                    ]);
                    $notification->activity = activityLog::create([
                        'website_id' => (int) $this->website_id ,
                        'code' => 7,
                        'user_id' => $userId,
                        'user_name' => $userName,
                        'product_id' => $postReview->product_id,
                        'product_name' => $request->productName,
                        'product_review_id' => $postReview->id,
                    ]);
                    broadcast(new cpanelNotification($notification))->toOthers();

                    return response([
                        'postReviewStatus' => 1,
                        'review' => $postReview,
                    ]);

                }else{
                    return response(['postReviewStatus' => 0 ]);
                }
            }

        }else if($request->has('postCollectReviews')){
            if(Auth::guard('user')->check()){
                $userId = Auth::guard('user')->user()->id;
                $userName = Auth::guard('user')->user()->name;

            }else{
                $userId = null;
                $userName = null;
                if(!website::where('id',$this->website_id )->pluck('guestReviews')->first() && !Auth::guard('user')->check()){
                    return response(['postCollectReviewsStats' => 0 ]);
                }
            }
            $reviews = [];
            foreach($request->postCollectReviews as $review){
                array_push($reviews,[
                    'website_id' => $this->website_id ,
                    'product_id' => $review['productId'],
                    'product_name' => $review['productName'],
                    'userName' => $userName,
                    'user_id' => $userId,
                    'rate' => $review['reviewRate'],
                    'review' => strip_tags($review['reviewReview']),
                    'posted_at' => Carbon::now()->timestamp,
                ]);
            }
            $insertReviews = product_review::insert($reviews);
            if($insertReviews){
                $notification = notification::create([
                    'code' => 22,
                    'seen' => false,
                    'website_id'=>(int) $this->website_id ,
                    'reviewsSum' =>count($reviews),
                    'user_id' => $userId,
                    'userName' => $userName,
                ]);
                $notification->activity = activityLog::create([
                    'website_id' => (int) $this->website_id ,
                    'code' => 35,
                    'user_id' => $userId,
                    'user_name' => $userName,
                    'reviewsSum' =>count($reviews),
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['postCollectReviewsStats' => 1,'reviews' => $reviews ]);
            }else{
                return response(['postCollectReviewsStats' => 0 ]);
            }
        }
        else if($request->has(['getProductReview'])){
            if($request->getProductReviewAfter == null || $request->getProductReviewAfter == ''){
                $productMoreReviews = product_review::where(['product_id'=>$request->productId,'website_id' => $this->website_id])
                ->with(['users'=>function($q){
                    $q->select('name','id');
                }])
                ->limit(10)
                ->orderBy('posted_at','desc')
                ->get();
            }else{
                $productMoreReviews = product_review::where(['product_id'=>$request->productId,'website_id' => $this->website_id])
                ->where('posted_at','<',$request->getProductReviewAfter)
                ->with(['users'=>function($q){
                    $q->select('name','id');
                }])
                ->limit(10)
                ->orderBy('posted_at','desc')
                ->get();
            }
            return response(['reviews' => $productMoreReviews]);
        }
    }
    public function activity(Request $request){
        if($request->has('userLastSeen')){
            User::where('id',Auth::guard('user')->user()->id)->update(['lastSeen'=>Carbon::now()->timestamp ]);
        }
        else if($request->has('newActivity')){
            if(Auth::guard('user')->check()){
                $user_id = Auth::guard('user')->user()->id;
                $user_type = 'user';
            }else if(Auth::guard('guest')->check()){
                $user_id = Auth::guard('guest')->user()->id;
                $user_type = 'guest';
            }
            foodmenuFunctions::notification('user.activity',null,[
                'activity' => $request->newActivity,
                'id' => $user_id,
                'type' => $user_type,
            ]);

        }
    }

    //////////////////////////////////////////
    public function home(Request $request)
    {
        $title = $this->website->websiteNames[$this->lang] ?? $this->website->domainName;
        $description = $this->website->websiteDescriptions[$this->lang] ?? '';
        if($title == '' || $title == null){$title = $this->website->domainName;}

        return view('website.'.$this->website->templateData['view'].'.layout',[
            'lang'=>$this->lang,
            'urlLang' => $this->urlLang,
            'website' => $this->website,
            'imgs' => $this->imgs,
            'customersReviews'=>$this->customersReviews,

            'websiteIcon' => $this->websiteIcon,
            'websiteLogo' => $this->websiteLogo,

            'title' => $title,
            'description'=>$description,
            'metaImg' => $this->metaImg,
        ]);
    }
    public function profile(Request $request)
    {
        $title = $this->website->websiteNames[$this->lang] ?? $this->website->domainName;;
        $description = $this->website->websiteDescriptions[$this->lang] ?? '';
        if($title == '' || $title == null){$title = $this->website->domainName;}
        if(Auth::guard('user')->check()){
            $title =Auth::guard('user')->user()->name.' | '.$title;
        }
        return view('website.'.$this->website->templateData['view'].'.layout',[
            'lang'=>$this->lang,
            'urlLang' => $this->urlLang,
            'website' => $this->website,
            'imgs' => $this->imgs,
            'customersReviews'=>$this->customersReviews,

            'websiteIcon' => $this->websiteIcon,
            'websiteLogo' => $this->websiteLogo,

            'title' => $title,
            'description'=>$description,
            'metaImg' => $this->metaImg,
        ]);
    }
    public function aboutus(Request $request)
    {
        $title = $this->website->websiteNames[$this->lang] ?? $this->website->domainName;
        $description = $this->website->websiteDescriptions[$this->lang] ?? '';
        if($title == '' || $title == null){$title = $this->website->domainName;}
        return view('website.'.$this->website->templateData['view'].'.layout',[
            'lang'=>$this->lang,
            'urlLang' => $this->urlLang,
            'website' => $this->website,
            'imgs' => $this->imgs,
            'customersReviews'=>$this->customersReviews,

            'websiteIcon' => $this->websiteIcon,
            'websiteLogo' => $this->websiteLogo,

            'title' => $this->website->website_texts->{$this->lang}['other']['aboutUs'].' | '.$title,
            'description'=>$description,
            'metaImg' => $this->metaImg,
        ]);
    }
    public function category(Request $request)
    {
        $category = null;
        foreach($this->website->categories as $cat){
            if($cat->name == $request->category){$category = $cat;}
        }
        if($category == null){
            return abort(404);
        }else{
            $description = ($category->{'description_'.$this->lang});
            if($description == '' || $description == null){$description = $this->website->websiteDescriptions[$this->lang];}

            $title = ($category->{'name_'.$this->lang});
            if($title == '' || $title == null){$title = $category->name;}

            if($category->img_id != null || $category->img_id != null){
                $this->metaImg = '/storage/'.$this->imgs->where('id',$category->img_id)->first()->url;
            }

            $websiteName = $this->website->websiteNames[$this->lang] ?? $this->website->domainName;
            if($websiteName == '' || $websiteName == null){$websiteName = $this->website->domainName;}

            return view('website.'.$this->website->templateData['view'].'.layout',[
                'lang'=>$this->lang,
                'urlLang' => $this->urlLang,
                'website' => $this->website,
                'imgs' => $this->imgs,
                'customersReviews'=>$this->customersReviews,
                'pageCategoryId' => $category->id,
                'title' => $title.' | '.$websiteName,
                'description'=>$description,
                'websiteIcon' => $this->websiteIcon,
                'websiteLogo' => $this->websiteLogo,
                'metaImg' => $this->metaImg,
            ]);


        }
    }
    public function allproducts(Request $request)
    {
        $title = $this->website->websiteNames[$this->lang] ?? $this->website->domainName;
        $description = $this->website->websiteDescriptions[$this->lang] ?? '';
        if($title == '' || $title == null){$title = $this->website->domainName;}
        return view('website.'.$this->website->templateData['view'].'.layout',[
            'lang'=>$this->lang,
            'urlLang' => $this->urlLang,
            'website' => $this->website,
            'imgs' => $this->imgs,
            'customersReviews'=>$this->customersReviews,

            'websiteIcon' => $this->websiteIcon,
            'websiteLogo' => $this->websiteLogo,

            'title' => $this->website->website_texts->{$this->lang}['other']['allProducts'] .' | '.$title,
            'description'=>$description,
            'metaImg' => $this->metaImg,
        ]);
    }
    public function product(Request $request)
    {
        $product = null;
        foreach($this->website->products as $prod){
            if($prod->name == $request->product){
                $product = $prod;
            }
        }
        $category = null;
        if($product != null){
            foreach($this->website->categories as $cat){
                if($cat->name == $request->category && $product->category_id == $cat->id){
                    $category = $cat;
                }
            }
        }

        if($product == null || $category == null){
            return abort(404);
        }else{
            $pageProductId = $product->id;
            $description = ($product->{'description_'.$this->lang} ?? $this->website->websiteDescriptions[$this->lang] ?? '');
            if($description == '' || $description == null){$description = $this->website->websiteDescriptions[$this->lang];}

            $title = ($product->{'name_'.$this->lang} ?? $this->website->websiteNames[$this->lang] ?? $this->website->domainName);
            if($title == '' || $title == null){$title = $product->name;}

            if($product->img_id != null || $product->img_id != null){
                $this->metaImg = '/storage/'.$this->imgs->where('id',$product->img_id)->first()->url;
            }

            $websiteName = $this->website->websiteNames[$this->lang] ?? $this->website->domainName;
            if($websiteName == '' || $websiteName == null){$websiteName = $this->website->domainName;}

            return view('website.'.$this->website->templateData['view'].'.layout',[
                'lang'=>$this->lang,
                'urlLang' => $this->urlLang,
                'website' => $this->website,
                'imgs' => $this->imgs,
                'customersReviews'=>$this->customersReviews,
                'pageProductId' => $pageProductId,
                'title' => $title.' | '.$websiteName,
                'description'=>$description,
                'websiteIcon' => $this->websiteIcon,
                'websiteLogo' => $this->websiteLogo,
                'metaImg' => $this->metaImg,
            ]);
        }

        // $lang = $this->lang;
        // $product = product::where(['website_id'=>$this->website_id,'name'=>$request->product])
        // ->with('imgs')
        // ->with(['product_reviews'=>function($q){
        //     $q->limit(10)->orderBy('posted_at','desc')->with('users:id,name');
        // }])
        // ->with(['product_options'=>function($q){
        //     $q->orderBy('sort','asc')->with('product_option_selections:id,product_option_id,name,name_'.$this->lang.',price,isDefault');
        // }])
        // ->get()->first();
        // if(!$product){
        //     return abort(404);
        // }

        // // $reviewsCount = product_review::where('product_id',$product->id)->count();

        // $description = $product->{'description_'.$lang};
        // if($description == ''){$this->website->websiteDescriptions[$this->lang];}
        // $title = $product->{'name_'.$lang};
        // if($title == '' || $title == null){
        //     $title = $product->name;
        // }
        // if($this->website->website_components->ProductPageMoreProducts == true){
        //     $moreProducts = product::where('category_id',$product->category_id)
        //         ->where('id','!=',$product->id)
        //         ->with('imgs')
        //         ->with(['product_options'=>function($q){
        //             $q->orderBy('sort','asc')->with('product_option_selections:id,product_option_id,name,name_'.$this->lang.',price,isDefault');
        //         }])
        //         ->get();
        // }else{
        //     $moreProducts = collect();
        // }
        // return view('website.product',[
        //     'product'=>$product,
        //     'title'=>$title,
        //     'description' => $description,
        //     'lang' => $lang,
        //     'website' => $this->website,
        //     'moreProducts' => $moreProducts,
        // ]);
    }
    public function privacypolicy(Request $request)
    {
        $title = $this->website->websiteNames[$this->lang] ?? $this->website->domainName;
        $description = $this->website->websiteDescriptions[$this->lang] ?? '';
        if($title == '' || $title == null){$title = $this->website->domainName;}

        return view('website.'.$this->website->templateData['view'].'.layout',[
            'lang'=>$this->lang,
            'urlLang' => $this->urlLang,
            'website' => $this->website,
            'imgs' => $this->imgs,
            'customersReviews'=>$this->customersReviews,
            'websiteIcon' => $this->websiteIcon,
            'websiteLogo' => $this->websiteLogo,
            'title' => $this->website->website_texts->{$this->lang}['other']['privacypolicy'].' | '.$title,
            'description'=>$description,
            'metaImg' => $this->metaImg,
        ]);
    }


    public function websiteNotActive(Request $request)
    {

        $websiteCheck = $this->websiteCheck;
        $langCheck = [];
        $defaultLang = '';
        foreach($websiteCheck->languages as $lang){
            array_push($langCheck,$lang['code']);
            if($lang['websiteDefault']){
                $defaultLang = $lang['code'];
            }
        }
        if(in_array($request->lang,$langCheck)){
            App::setLocale($request->lang);
            $this->lang = $request->lang;
            Cookie::queue(Cookie::make(Str::slug(request()->getHost().'_lang', '_'),$request->lang,9999999999999));
        }else{
            App::setLocale($defaultLang);
            $this->lang = $defaultLang;
            Cookie::queue(Cookie::make(Str::slug(request()->getHost().'_lang', '_'),$this->lang,9999999999999));
            return redirect()->route('website.home',['lang'=>$this->lang]);
        }
        $website = website::where('id' , $this->website_id )
        ->select(
            'id','url','domainName',
            'websiteNames',
        )->first();
        $title = $website->websiteNames[$this->lang] ?? $this->website->domainName;
        if($title == '' || $title == null){$title = $website->domainName;}

        return view('website.notActive',[
            'title' => $title,
        ]);
    }
}

