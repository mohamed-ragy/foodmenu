<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\categories;
use App\Models\delivery;
use App\Models\foodmenuFunctions;
use App\Models\img;
use App\Models\invoice;
use App\Models\payment_method;
use App\Models\product;
use App\Models\product_option;
use App\Models\promocode;
use App\Models\website;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use PDF;
use stdClass;
use Illuminate\Support\Facades\Hash;

class billingController extends Controller
{
    protected $lang;
    public function __construct(Request $request)
    {
        $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
        // dd($stripe->subscriptions->retrieve(
        //     'sub_1NdERRIYxD8tIsOHkd3nGS6w',
        //     []
        // ));
        // dd($stripe->invoices->retrieve(
        //     'in_1Ngi0xIYxD8tIsOHBQ1Tq84S',
        //     ['expand' => ['charge']]
        // ));

        // dd($stripe->paymentIntents->retrieve(
        //     'pi_3NdERSIYxD8tIsOH1Bz5Af7O',
        //     []
        // ));
        $this->middleware(function ($request, $next) {
            if(!Auth::guard('account')->check()){
                return redirect()->route('account.login');
            }
            if(Auth::guard('account')->user()->is_master == false){
                return redirect()->route('cpanel');
            }
            $this->lang = $request->FoodMenuLang ?? 'en';
            Cookie::queue(Cookie::make('FoodMenuLang',$this->lang,9999999));
            return $next($request);
        });

        $this->middleware(function ($request, $next) {
            if(
                $request->FoodMenuLang === 'en'
            ){
                Cookie::queue(Cookie::make('FoodMenuLang',$request->FoodMenuLang,9999999));
                App::setLocale($request->FoodMenuLang);
                $this->lang = $request->FoodMenuLang;
            }else{
                Cookie::queue(Cookie::make('FoodMenuLang','en',9999999));
                App::setLocale('en');
                return redirect()->route('billing.home' , ['FoodMenuLang' => 'en']);
            }
            return $next($request);
        })->except(['api']);
    }

    public function home(Request $request){
        return view('billing.home',[
            'lang'=>$this->lang,
        ]);
    }

    public function payment_return_url(Request $request){
        return view('billing.payment_return_url',[
            'lang' => $this->lang,
            'payment'=>$request->payment_return_url,
            'texts' => collect(Lang::get('billing.payment_return_url')),
        ]);
    }

    public function invoice(Request $request){
        $invoice = invoice::where(['website_id'=>Auth::guard('account')->user()->website_id,'id'=>$request->invoice_id])->with('invoice_items')->first();
        if(!$invoice){return abort(404);}
        $invoice_created_at = Carbon::createFromTimestamp($invoice->created);

        $invoice->foodmenu_id = $invoice_created_at->month.$invoice_created_at->format('y').'-'.$invoice->id;
        $invoice->date = Carbon::createFromTimestamp($invoice->created)->format('F j, Y');
        if($invoice->paid_at != null){
            $invoice->paid_at = Carbon::createFromTimestamp($invoice->created)->format('F j, Y');
        }
        $invoice->website = website::where('id',$invoice->website_id)->select('domainName')->first();
        $invoice->accountEmail = Auth::guard('account')->user()->email;
        $invoice->total = number_format((float)$invoice->total / 100, 2, '.', '');
        $invoice->amount_due = number_format((float)$invoice->amount_due / 100, 2, '.', '');
        $invoice->amount_paid = number_format((float)$invoice->amount_paid / 100, 2, '.', '');
        $invoice->amount_remaining = number_format((float)$invoice->amount_remaining / 100, 2, '.', '');
        $invoice->amount_refunded_txt = number_format((float)$invoice->amount_refunded / 100, 2, '.', '');

        if($invoice->starting_balance < 0){$invoice->starting_balance = $invoice->starting_balance * -1;}
        if($invoice->ending_balance < 0){$invoice->ending_balance = $invoice->ending_balance * -1;}

        $invoice->starting_balance = number_format((float)$invoice->starting_balance / 100, 2, '.', '');
        $invoice->ending_balance = number_format((float)$invoice->ending_balance / 100, 2, '.', '');
        foreach($invoice->invoice_items as $key => $invoiceItem){
            $invoiceItem->amount = number_format((float)$invoiceItem->amount / 100, 2, '.', '');
        }
        $pdf = PDF::loadView(
            'billing.invoice',
            ['invoice' => $invoice,'lang'=>$this->lang],
            [
                'format' => 'A4',
                'author' => 'Foodmenu',
                'subject' => '',
                'keywords' => 'foodmenu, invoice,', // Separate values with comma
                'creator' => 'Foodmenu',
                'display_mode' => 'fullpage'
            ]
        );

        return $pdf->stream('Foodmenu-invoice'.$invoice->foodmenu_id.'.pdf');
    }

    public static function checkDowngrade($website,$plan_request,$plan_request_name){
        $downGradeValid = true;
        $errors = new stdClass();
        $is_downGrade = true;
        switch($website->plan){
            case 'small':
                if($plan_request_name == 'small' || $plan_request_name == 'standard' || $plan_request_name == 'large' || $plan_request_name === 'premium'){
                    $is_downGrade = false;
                }
            break;
            case 'standard':
                if($plan_request_name == 'standard' || $plan_request_name == 'large' || $plan_request_name === 'premium'){
                    $is_downGrade = false;
                }
            break;
            case 'large':
                if($plan_request_name == 'large' || $plan_request_name === 'premium'){
                    $is_downGrade = false;
                }
            break;
            case 'premium':
                if($plan_request_name === 'premium'){
                    $is_downGrade = false;
                }
            break;
        }

        if($is_downGrade){
            $subaccounts = Account::where(['website_id'=>Auth::guard('account')->user()->website_id,'is_master'=>false])->count();
            $categories = categories::where('website_id',Auth::guard('account')->user()->website_id)->count();
            $products = product::where('website_id',Auth::guard('account')->user()->website_id)->select(['id','website_id'])->with(['product_options'=>function($q){
                $q->select(['id','product_id']);
            }])->get();
            $productOptions = 0;
            $productOptions_products = 0;
            foreach($products as $product){
                if($product->product_options->count() > $plan_request['productOptions']){
                    $productOptions_products = $productOptions_products + 1;
                    if($product->product_options->count() > $productOptions){
                        $productOptions = $product->product_options->count();
                    }

                }
            }
            $specialDomainName = $website->specialDomainName;
            $storage =(img::where('website_id',Auth::guard('account')->user()->website_id)->sum('size') / 1024 / 1024 );
            $deliveryAccounts = delivery::where('website_id',Auth::guard('account')->user()->website_id)->count();
            $websiteLangs = count($website->languages);
            $promocodes = promocode::where('website_id',Auth::guard('account')->user()->website_id)->count();
            if($subaccounts > $plan_request['subAccounts']){
                $errors->subAccounts = [
                    'current' => $subaccounts,
                    'plan_request' =>$plan_request['subAccounts']
                ];
                $downGradeValid = false;
            }
            if($categories > $plan_request['categories']){
                $errors->categories = [
                    'current' => $categories,
                    'plan_request' =>$plan_request['categories']
                ];
                $downGradeValid = false;
            }
            if($products->count() > $plan_request['products']){
                $errors->products = [
                    'current' => $products->count(),
                    'plan_request' =>$plan_request['products']
                ];
                $downGradeValid = false;
            }
            if($productOptions > $plan_request['productOptions']){
                $errors->productOptions = [
                    'current' => $productOptions,
                    'plan_request' =>$plan_request['productOptions'],
                    'productOptions_products' => $productOptions_products,
                ];
                $downGradeValid = false;
            }
            if($plan_request['specialDomainName'] == false && $specialDomainName != null){
                $errors->specialDomainName = [
                    'current' => $specialDomainName,
                    'plan_request' =>$plan_request['specialDomainName']
                ];
                $downGradeValid = false;
            }
            if($storage > $plan_request['storage']){
                $errors->storage = [
                    'current' => $storage,
                    'plan_request' =>$plan_request['storage']
                ];
                $downGradeValid = false;
            }
            if($deliveryAccounts > $plan_request['deliveryAccounts']){
                $errors->deliveryAccounts = [
                    'current' => $deliveryAccounts,
                    'plan_request' =>$plan_request['deliveryAccounts']
                ];
                $downGradeValid = false;
            }
            if($websiteLangs > $plan_request['websiteLangs']){
                $errors->websiteLangs = [
                    'current' => $websiteLangs,
                    'plan_request' =>$plan_request['websiteLangs']
                ];
                $downGradeValid = false;
            }
            if($promocodes > $plan_request['promocodes']){
                $errors->promocodes = [
                    'current' => $promocodes,
                    'plan_request' =>$plan_request['promocodes']
                ];
                $downGradeValid = false;
            }
        }


        return [
            'errors' => $errors,
            'downGradeValid' => $downGradeValid,
            // 'is_downGrade' => $is_downGrade,
        ];
    }

    public function api(Request $request){
        if($request->has('get_data')){
            $account = Auth::guard('account')->user();
            if($account->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => $account->id,
                ],$account->website_id);
                if($account->account_unblock_code == null || $account->account_unblock_code == ''){
                    Account::where('email',$account->email)->update(['account_unblock_code' => Str::random(100)]);
                    ///send email with the unblock link if master
                }
                Auth::guard('account')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response(['passwordCheck' => 2, 'msg' => Lang::get('cpanel/login.accountBlocked') ]);
            }
            if( Hash::check($request->password,Account::where('id',Auth::guard('account')->user()->id)->pluck('password')->first())){
                Account::where('email',$request->email)->update([ 'password_fails' => 0 ]);

                $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['domainName','plan','billingPeriod','subscription_status','subscription_start_period','subscription_end_period','balance'])->first();
                if($website->balance < 0){$website->balance = $website->balance * -1;}
                $plans = collect(foodmenuFunctions::plans());
                $plansData = $plans->map(function ($c) {
                    return collect($c)->forget('id')->forget('monthlyId')->forget('yearlyId');
                });
                return response([
                    'passwordCheck' => 1,
                    'website' => $website,
                    'lang'=>$this->lang,
                    'plans'=>$plansData,
                    'lastInvoices' => invoice::where(['website_id'=>Auth::guard('account')->user()->website_id])->orderBy('created','desc')->orderBy('created_at','desc')->limit(5)->get(),
                    'invoices_count' => invoice::where('website_id',Auth::guard('account')->user()->website_id)->count(),
                    'paymentMethods' => payment_method::where('website_id',Auth::guard('account')->user()->website_id)->orderBy('created_at','desc')->get(),
                    'texts' => Lang::get('billing'),
                ]);
            }else{
                Account::where('email',$account->email)->increment('password_fails');
                return response(['passwordCheck' => 0,'msg'=> Lang::get('billing.wrongPassword')]);
            }
        }
        else if($request->has('createPaymentIntent')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['customer_id','subscription_id'])->first();
            $intent = $stripe->setupIntents->create([
                'customer' => $website->customer_id,
                'automatic_payment_methods' => ['enabled' => true],
            ]);
            return response($intent);
        }
        else if($request->has('setPaymentMethodDefault')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['customer_id','subscription_id','subscription_status'])->first();
            if($website->subscription_status == 'canceled' || $website->subscription_status == 'incomplete_expired'){return;}
            $paymentMethod_id = payment_method::where(['website_id'=>Auth::guard('account')->user()->website_id,'id'=>$request->setPaymentMethodDefault])->pluck('paymentMethod_id')->first();
            $stripe->subscriptions->update(
                $website->subscription_id,
                ['default_payment_method'=>$paymentMethod_id]
            );
        }
        else if($request->has('deletePaymentMethod')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $paymentMethod = payment_method::where(['website_id'=>Auth::guard('account')->user()->website_id,'id'=>$request->deletePaymentMethod])->select(['paymentMethod_id','is_default'])->first();
            if($paymentMethod->is_default == 0){
                $stripe->paymentMethods->detach($paymentMethod->paymentMethod_id,[]);
            }
        }
        else if($request->has('retryPlanPayment')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $subscription_id = website::where('id',Auth::guard('account')->user()->website_id)->pluck('subscription_id')->first();
            $subscription = $stripe->subscriptions->retrieve($subscription_id,[]);
            $invoice = $stripe->invoices->retrieve($subscription->latest_invoice,[]);
            $payInvoice = $stripe->invoices->pay($invoice->id,[]);
            if($payInvoice){
                $payInvoice->payment_intent;
                $payment_intent = $stripe->paymentIntents->retrieve($payInvoice->payment_intent,[]);
                return response(['retryPlanPaymentStatus'=>1,'payment_intent'=>$payment_intent]);
            }

        }
        else if($request->has('getLastInvoice')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $subscription_id = website::where('id',Auth::guard('account')->user()->website_id)->pluck('subscription_id')->first();
            $subscription = $stripe->subscriptions->retrieve($subscription_id,[]);
            $lastInvoice = $stripe->invoices->retrieve($subscription->latest_invoice,['expand' => ['payment_intent']]);
            return response(['lastInvoice'=>$lastInvoice]);
        }
        else if($request->has('activate_plan')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['plan','billingPeriod','customer_id'])->first();
            $plan = collect(foodmenuFunctions::plans())->where('name',$website->plan)->first();
            if($website->billingPeriod == 'year'){$price_id = $plan['yearlyId'];}else if($website->billingPeriod == 'month'){$price_id = $plan['monthlyId'];}
            $subscription = $stripe->subscriptions->create([
                'customer' => $website->customer_id,
                'items' => [[
                    'price' => $price_id,
                ]],
                'payment_behavior' => 'default_incomplete',
                'payment_settings' => ['save_default_payment_method' => 'on_subscription'],
                'expand' => ['latest_invoice.payment_intent'],
            ]);
            if($subscription){
                website::where('id',Auth::guard('account')->user()->website_id)->update([
                    'subscription_id' => $subscription->id,
                ]);
                return response(['client_secret' => $subscription->latest_invoice->payment_intent->client_secret]);
            }
        }
        else if($request->has('activate_planAndPay')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['plan','billingPeriod','customer_id'])->first();
            $plan = collect(foodmenuFunctions::plans())->where('name',$website->plan)->first();
            if($website->billingPeriod == 'year'){$price_id = $plan['yearlyId'];}else if($website->billingPeriod == 'month'){$price_id = $plan['monthlyId'];}
            $paymentMethod = payment_method::where(['website_id'=>Auth::guard('account')->user()->website_id,'id'=>$request->paymentMethod_id])->first();


            $subscription = $stripe->subscriptions->create([
                'customer' => $website->customer_id,
                'items' => [[
                    'price' => $price_id,
                ]],
                'payment_behavior' => 'default_incomplete',
                'default_payment_method' => $paymentMethod->paymentMethod_id,
                // 'payment_settings' => ['save_default_payment_method' => 'on_subscription'],
                'expand' => ['latest_invoice.payment_intent'],
            ]);
            if($subscription){
                website::where('id',Auth::guard('account')->user()->website_id)->update([
                    'subscription_id' => $subscription->id,
                ]);
                $payInvoice = $stripe->invoices->pay($subscription->latest_invoice->id,[]);
            }
            return response(['client_secret' => $subscription->latest_invoice->payment_intent->client_secret]);
        }
        else if($request->has('loadMoreInvoices')){
            $invoices = invoice::where([
                'website_id'=>Auth::guard('account')->user()->website_id
            ])
            ->where('created','<',$request->loadMoreInvoices)
            ->orderBy('created','desc')->limit(5)->get();
            $invoices_count = invoice::where('website_id',Auth::guard('account')->user()->website_id)->count();
            return response(['invoices' => $invoices,'invoices_count' => $invoices_count]);
        }        
        else if($request->has('cancel_subscription')){
            $account = Auth::guard('account')->user();
            if($account->password_fails > 10){
                foodmenuFunctions::notification('0',null,[
                    'account_id' => $account->id,
                ],$account->website_id);
                if($account->account_unblock_code == null || $account->account_unblock_code == ''){
                    Account::where('email',$account->email)->update(['account_unblock_code' => Str::random(100)]);
                    ///send email with the unblock link if master
                }
                Auth::guard('account')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response(['cancelSubscriptionStatus' => 2, 'msg' => Lang::get('cpanel/login.accountBlocked') ]);
            }
            if( Hash::check($request->password,Account::where('id',Auth::guard('account')->user()->id)->pluck('password')->first())){
                $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
                $subscription_id = website::where('id',Auth::guard('account')->user()->website_id)->pluck('subscription_id')->first();
                $subscription = $stripe->subscriptions->retrieve($subscription_id,[]);
                if($subscription->delete()){
                    return response(['cancelSubscriptionStatus' => 1]);
                }
            }else{
                Account::where('email',$account->email)->increment('password_fails');
                return response(['cancelSubscriptionStatus' => 0,'msg'=> Lang::get('billing.wrongPassword')]);
            }
        }
        else if($request->has('checkSubscriptionStatus')){
            $subscriptionStatus = website::where('id',Auth::guard('account')->user()->website_id)->pluck('subscription_status')->first();
            return response(['subscriptionStatus'=>$subscriptionStatus]);
        }
        ////
        else if($request->has('payInvoice')){
            $invoice = invoice::where(['id'=>$request->payInvoice,'website_id'=>Auth::guard('account')->user()->website_id])->first();
            if($invoice == null){return;}
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $stripeInvoice = $stripe->invoices->retrieve(
                    $invoice->invoice_id,
                    []
            );
            $paymentInt = $stripe->paymentIntents->retrieve(
                $stripeInvoice->payment_intent,
                []
            );
            return response(['client_secret'=> $paymentInt->client_secret]);
        }
        else if($request->has('calcUpdateSubscription')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['subscription_status','customer_id','subscription_id','plan','billingPeriod','specialDomainName','languages'])->first();
            if($website->subscription_status == 'incomplete_expired'
                || $website->subscription_status == 'canceled'
                || $website->subscription_status == 'unpaid'
                || $website->subscription_status == 'paused'
            ){return;}
            if($website->billingPeriod == 'year' && $request->billedYearly == 0){
                if($website->subscription_status == 'active' || $website->subscription_status == 'past_due' || $website->subscription_status == 'incomplete'){
                    return;
                }
            }
            $plan_request = foodmenuFunctions::plans()[$request->plan];
            $checkDowngrade = self::checkDowngrade($website,$plan_request,$request->plan);

            if($checkDowngrade['downGradeValid']){
                if($request->billedYearly == 1){
                    $price_id = $plan_request['yearlyId'];
                }else{
                    $price_id = $plan_request['monthlyId'];
                }
                $subscription = $stripe->subscriptions->retrieve($website->subscription_id);
                $subscription_lastInvoice = $stripe->invoices->retrieve(
                    $subscription->latest_invoice,[]
                );
                if($subscription_lastInvoice->status != 'paid'){
                    return response(['actionValid' => 2]);
                }
                $items = [
                    [
                        'id' => $subscription->items->data[0]->id,
                        'price' => $price_id, # Switch to new price
                    ],
                ];
                if($subscription->status == 'trialing'){
                    $invoice = $stripe->invoices->upcoming([
                        'customer' => $website->customer_id,
                        'subscription' => $website->subscription_id,
                        'subscription_items' => $items,
                        // 'subscription_proration_behavior' => 'always_invoice'
                    ]);
                }else{
                    $invoice = $stripe->invoices->upcoming([
                        'customer' => $website->customer_id,
                        'subscription' => $website->subscription_id,
                        'subscription_items' => $items,
                        'subscription_proration_behavior' => 'always_invoice'
                    ]);
                }

                return response(['actionValid' => 1,'invoice'=>$invoice]);
            }else{
                return response(['actionValid' => 0,'errors' => $checkDowngrade['errors'],'currentPlan'=>$website->plan,'plan_request'=>$plan_request['name']]);
            }
        }
        else if($request->has('updateSubscription')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['subscription_status','customer_id','subscription_id','plan','billingPeriod','specialDomainName','languages'])->first();
            if($website->subscription_status == 'incomplete_expired'
                || $website->subscription_status == 'canceled'
                || $website->subscription_status == 'unpaid'
                || $website->subscription_status == 'paused'
            ){return;}
            if($website->billingPeriod == 'year' && $request->billedYearly == 0){
                if($website->subscription_status == 'active' || $website->subscription_status == 'past_due' || $website->subscription_status == 'incomplete'){
                    return;
                }
            }
            $plan_request = foodmenuFunctions::plans()[$request->planName];
            $checkDowngrade = self::checkDowngrade($website,$plan_request,$request->planName);
            if($checkDowngrade['downGradeValid']){
                if($request->billedYearly == 1){
                    $price_id = $plan_request['yearlyId'];
                }else{
                    $price_id = $plan_request['monthlyId'];
                }
                $subscription = $stripe->subscriptions->retrieve($website->subscription_id);
                $subscription_lastInvoice = $stripe->invoices->retrieve(
                    $subscription->latest_invoice,[]
                );
                if($subscription_lastInvoice->status != 'paid'){
                    return;
                }
                $newSubscription = $stripe->subscriptions->update(
                    $website->subscription_id,
                    [
                        'items' => [
                          [
                            'id' => $subscription->items->data[0]->id,
                            'deleted' => true,
                          ],
                          ['price' => $price_id],
                        ],
                        'proration_behavior' => 'always_invoice',
                        'payment_behavior' => 'error_if_incomplete',
                    ],
                );
                return response(['updateSubscriptionStatus' => 1, 'newSubscription' => $newSubscription]);
            }

        }
        else if($request->has('changePlan')){
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['subscription_status','billingPeriod','plan','specialDomainName','languages'])->first();
            $plan_request = foodmenuFunctions::plans()[$request->changePlan];
            $checkDowngrade = self::checkDowngrade($website,$plan_request,$request->changePlan);
            if($website->subscription_status == 'incomplete_expired'
                || $website->subscription_status == 'canceled'
                || $website->subscription_status == 'unpaid'
                || $website->subscription_status == 'paused'
            ){
                if($checkDowngrade['downGradeValid']){
                    $plan = foodmenuFunctions::plans()[$request->changePlan];
                    if($request->billedYearly == 1){$billingPeriod = 'year';}else{$billingPeriod = 'month';}
                    if($plan['name']){
                        website::where('id',Auth::guard('account')->user()->website_id)
                            ->update([
                                'plan' => $plan['name'],
                                'billingPeriod' => $billingPeriod,
                            ]);
                    }
                    if($website->billingPeriod == 'year'){$currentPlanPrice = $plan_request['yearlyCost'];}
                    else if($website->billingPeriod == 'month'){$currentPlanPrice = $plan_request['monthlyCost'];}
                    return response(['changePlanState' => 1,'plan_request' => $plan_request['name'],'currentPlanPrice' => $currentPlanPrice]);
                }else{
                    return response(['changePlanState' => 0,'errors' => $checkDowngrade['errors'],'currentPlan'=>$website->plan,'plan_request'=>$plan_request['name']]);
                }

            }
        }
        else if($request->has('refund')){
            $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['customer_id','subscription_id'])->first();
            $customer = $stripe->customers->retrieve($website->customer_id,[]);
            // $subscription = $stripe->subscriptions->retrieve($website->subscription_id,['expand'=>['latest_invoice']]);
            // $invoices = $stripe->invoices->retrieve($subscription->latest_invoice,[]);
            $invoices = $stripe->invoices->all(['subscription'=>$website->subscription_id,'expand'=>['data.charge']]);
            // return response($invoices);
            // $refundChargeList = [];
            // $refundAvailable = 0;
            $refunds = [];
            $customer_balance = ($customer->balance * -1);
            foreach($invoices->data as $invoice){
                if($invoice->charge != null && $customer_balance > 0){
                        $amountToRefund = 0;
                        if($invoice->charge->amount < $customer_balance){
                            $amountToRefund = $invoice->charge->amount;
                            $customer_balance = $customer_balance - $invoice->charge->amount;
                        }else if($invoice->charge->amount >= $customer_balance){
                            $amountToRefund = $customer_balance;
                            $customer_balance = 0;
                        }
                        $refund = $stripe->refunds->create([
                            'charge' => $invoice->charge->id,
                            'amount' =>  $amountToRefund,
                            'reason' => 'requested_by_customer',
                        ]);
                        if($refund->status == 'succeeded' || $refund->status == 'pending'){
                            $stripe->customers->update(
                                $website->customer_id,
                                ['balance' => $customer_balance]
                            );
                            array_push($refunds,$refund);
                        }
                }
            }
            website::where('id',Auth::guard('account')->user()->website_id)->update(['balance'=>$customer_balance]);
            return response(['refunds' => $refunds]);
        }
    }
}
