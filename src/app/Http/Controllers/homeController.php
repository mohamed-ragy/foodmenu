<?php

namespace App\Http\Controllers;

use App\Models\foodmenuFunctions;
use App\Models\help_en_text;
use App\Models\help_en_tut;
use App\Models\website;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;

class homeController extends Controller
{
    public function __construct(Request $request)
    {
        // config(['session.cookie'=>'cpanelfood_menunet']);

        $this->middleware(function ($request, $next) {
            if(
                $request->FoodMenuLang === 'en' ||
                $request->FoodMenuLang === 'ar'
            ){
                Cookie::queue(Cookie::make('FoodMenuLang',$request->FoodMenuLang,9999999));
                App::setLocale($request->FoodMenuLang);
            }else{
                Cookie::queue(Cookie::make('FoodMenuLang','en',9999999));
                App::setLocale('en');
                return redirect()->route('home.home' , ['FoodMenuLang' => 'en']);
                // dd($request);
                // return redirect()->route($request->route()->getName() , ['FoodMenuLang' => 'en'])->with($request->parameters());

            }
            return $next($request);
        })->except(['logout','api','underConstractionSignup','stripe']);
    }
    public function underConstractionSignup(Request $request){
            if(Storage::append('/signup.txt', $request->email)){
                return response(['stat' => 1]);
            }else{
                return response(['stat' => 0]);
            }
    }
    public function home(Request $request){
        return view('home.home');
    }
    public function getStarted(Request $request){
        return view('home.getStarted');
    }
    public function logout(Request $request){
        Auth::guard('account')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
    public function help(Request $request){
        if(app()->getLocale() == 'en'){
            $help_recent = Cookie::get('helpEnRecent');
            if($help_recent != null){
                $rawOrder = DB::raw(sprintf('FIELD(id, %s)', implode(',', explode('.',$help_recent))));
                $help_recent2 = help_en_tut::whereIn('id',explode('.',$help_recent))
                    ->orderByRaw($rawOrder)->limit(5)->get();
            }else{
                $help_recent2 = null;
            }
            $mostPopular = help_en_tut::orderBy('upRates','DESC')->limit(5)->get();
        }
        return view('home.help',['mostPopular' => $mostPopular , 'help_recent' => $help_recent2]);
    }
    public function faq(){
        return view('home.faq');
    }
    public function contactus(){
        return view('home.contact-us');
    }
    public function helpCat(Request $request){
        $tuts = null;
        // dd($request->FoodMenuLan);
        if(app()->getLocale() == 'en'){
            switch($request->helpCat){
                case 'get-started':$tuts = help_en_tut::where('helpCat',0)->orderBy('sort','asc')->get();break;
                case 'basics':$tuts = help_en_tut::where('helpCat',1)->orderBy('sort','asc')->get();break;
                case 'security':$tuts = help_en_tut::where('helpCat',2)->orderBy('sort','asc')->get();break;
                case 'orders':$tuts = help_en_tut::where('helpCat',3)->orderBy('sort','asc')->get();break;
                case 'statistics':$tuts = help_en_tut::where('helpCat',4)->orderBy('sort','asc')->get();break;
                case 'Billing':$tuts = help_en_tut::where('helpCat',5)->orderBy('sort','asc')->get();break;
                case 'products-categories':$tuts = help_en_tut::where('helpCat',6)->orderBy('sort','asc')->get();break;
                case 'deliveryAccount':$tuts = help_en_tut::where('helpCat',7)->get();break;
                case 'users':$tuts = help_en_tut::where('helpCat',8)->orderBy('sort','asc')->get();break;
                case 'design':$tuts = help_en_tut::where('helpCat',9)->orderBy('sort','asc')->get();break;
                case 'settings':$tuts = help_en_tut::where('helpCat',10)->orderBy('sort','asc')->get();break;
            }
        }
        if($tuts == null){return abort(404);}
        $help_recent = Cookie::get('helpEnRecent');
        if($help_recent != null){
            $rawOrder = DB::raw(sprintf('FIELD(id, %s)', implode(',', explode('.',$help_recent))));
            $help_recent2 = help_en_tut::whereIn('id',explode('.',$help_recent))
                ->orderByRaw($rawOrder)->limit(5)->get();
        }else{
            $help_recent2 = null;
        }
        $mostPopular = help_en_tut::where('helpCat',$tuts[0]->helpCat)->orderBy('upRates','DESC')->limit(5)->get();
        return view('home.helpCat',['tuts'=>$tuts,'mostPopular'=>$mostPopular,'help_recent'=>$help_recent2]);
    }
    public function tut(Request $request){
        if(app()->getLocale() == 'en'){
            $tut = help_en_tut::where('id',$request->tut)
            ->with(['help_en_texts' => function($q){
                $q->orderBy('sort','asc');
            }])
            ->first();
            if($tut == null){return abort(404);}
            switch($tut->helpCat){
                case 0:$helpCat = 'get-started';break;
                case 1:$helpCat = 'basics';break;
                case 2:$helpCat = 'security';break;
                case 3:$helpCat = 'orders';break;
                case 4:$helpCat = 'statistics';break;
                case 5:$helpCat = 'Billing';break;
                case 6:$helpCat = 'products-categories';break;
                case 7:$helpCat = 'deliveryAccount';break;
                case 8:$helpCat = 'users';break;
                case 9:$helpCat = 'design';break;
                case 10:$helpCat = 'settings';break;
            }
            if($helpCat != $request->helpCat){return abort(404);}
            $keywords = explode('.',$tut->keyWords);
            $relatedTuts = help_en_tut::where(function($q) use($keywords){
                foreach($keywords as $keyword){
                    $q->orWhere('keyWords','LIKE','%'.$keyword.'%');
                }
            })->where('id','!=',$tut->id)->inRandomOrder()->get();

            $help_recent = Cookie::get('helpEnRecent');
            if($help_recent != null){
                $help_recent2 = implode('.',array_slice(array_unique(explode('.',$request->tut.'.'.$help_recent)),0,5));
                Cookie::queue(Cookie::make('helpEnRecent',$help_recent2,9999999));
            }else{
                Cookie::queue(Cookie::make('helpEnRecent',$request->tut,9999999));
            }

        }
        return view('home.tut',['tut' => $tut,'relatedTuts'=>$relatedTuts]);
    }
    public function search(Request $request){
        $mostPopular = [];
        if(!isset($request->p) || !is_numeric($request->p)){$request->p = 1;}

        if(app()->getLocale() == 'en'){
            if(!isset($request->q)){

                return view('home.search')->with(['results'=> '{0:"searchHome"}','count'=>0,'q'=>$request->q,'mostPopular'=>help_en_tut::orderBy('upRates','DESC')->limit(5)->get()]);
            }
            $queryOrder = "CASE WHEN title LIKE '%$request->q%' THEN 1 ";
            $queryOrder .= "WHEN html LIKE '%$request->q%' THEN 2 ";
            $queryOrder .= "ELSE 3 END";
            $results = help_en_text::where('title','LIKE','%'.$request->q.'%')
                ->orWhere('html','LIKE','%'.$request->q.'%')
                ->orderByRaw($queryOrder)
                ->with('help_en_tuts')
                ->skip(($request->p - 1) * 20)->limit(20)
                ->get();
            $results = $results->unique('id');
            $resultsCount = help_en_text::where('title','LIKE','%'.$request->q.'%')
                ->orWhere('html','LIKE','%'.$request->q.'%')
                ->get();
            $resultsCount = $resultsCount->unique('id');

            if($results->count() == 0){
                $mostPopular = help_en_tut::orderBy('upRates','DESC')->limit(5)->get();
            }
            foreach($results as $result){
                $result->help_tuts = $result->help_en_tuts;
                unset($result->help_en_tuts);
            }
        }
        return view('home.search')->with(['results'=> $results,'count'=>$resultsCount->count(),'q'=>$request->q,'mostPopular'=>$mostPopular]);

    }
    public function api(Request $request){
        if($request->has('tutRateUp')){
            if(app()->getLocale() == 'en'){
                help_en_tut::where('id',$request->tutRateUp)->increment('upRates');
            }
        }else if($request->has('tutRateDown')){
            if(app()->getLocale() == 'en'){
                help_en_tut::where('id',$request->tutRateDown)->increment('downRates');
            }
        }
    }

    // public function stripe(Request $request){
    //     // webhook.php
    //     //
    //     // Use this sample code to handle webhook events in your integration.
    //     //
    //     // 1) Paste this code into a new file (webhook.php)
    //     //
    //     // 2) Install dependencies
    //     //   composer require stripe/stripe-php
    //     //
    //     // 3) Run the server on http://localhost:4242
    //     //   php -S localhost:4242


    //     // The library needs to be configured with your account's secret key.
    //     // Ensure the key is kept out of any version control system you might be using.
    // $stripe = new \Stripe\StripeClient(env('STRIPE_KEY'));

    //     // This is your Stripe CLI webhook secret for testing your endpoint locally.
    //     $endpoint_secret = 'whsec_z1aRZ7eva1KHP6x2fwCqCg4A5ibsofLS';

    //     $payload = @file_get_contents('php://input');
    //     $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
    //     $event = null;

    //     try {
    //     $event = \Stripe\Webhook::constructEvent(
    //         $payload, $sig_header, $endpoint_secret
    //     );
    //     } catch(\UnexpectedValueException $e) {
    //     // Invalid payload
    //     http_response_code(400);
    //     exit();
    //     } catch(\Stripe\Exception\SignatureVerificationException $e) {
    //     // Invalid signature
    //     http_response_code(400);
    //     exit();
    //     }

    //     // Handle the event
    //     switch ($event->type) {
    //     case 'payment_intent.amount_capturable_updated':
    //         $paymentIntent = $event->data->object;
    //     case 'payment_intent.canceled':
    //         $paymentIntent = $event->data->object;
    //     case 'payment_intent.created':
    //         $paymentIntent = $event->data->object;
    //     case 'payment_intent.partially_funded':
    //         $paymentIntent = $event->data->object;
    //     case 'payment_intent.payment_failed':
    //         $paymentIntent = $event->data->object;
    //     case 'payment_intent.processing':
    //         $paymentIntent = $event->data->object;
    //     case 'payment_intent.requires_action':
    //         $paymentIntent = $event->data->object;
    //     case 'payment_intent.succeeded':
    //         $paymentIntent = $event->data->object;
    //     // ... handle other event types
    //     default:
    //         echo 'Received unknown event type ' . $event->type;
    //     }

    //     http_response_code(200);
    // }
    public function demo(Request $request){
        // if(Auth::guard('account')->check()){
        //     $restaurant = website::where('id',Auth::guard('account')->user()->website_id)->pluck('domainName')->first();
        // }else{
            // dd(Auth::guard('account')->user());
            if(isset(foodmenuFunctions::templates()[$request->t])){
                $restaurant = foodmenuFunctions::templates()[$request->t ?? 1]['restaurantType'] ;
            }else{
                // redirect to the examples or whatever
            }
        // }
        return view('home.demo',[
            'restaurant' => $restaurant,
            'template' => $request->t ?? 1,
        ]);

    }
}


