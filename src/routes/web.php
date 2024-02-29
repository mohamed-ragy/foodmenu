<?php

use App\Http\Controllers\adminController;
use App\Http\Controllers\billingController;
use App\Http\Controllers\cpanel\categoriesController;
use App\Http\Controllers\cpanel\designController;
use App\Http\Controllers\cpanel\myStaffController;
use App\Http\Controllers\cpanel\ordersController;
use App\Http\Controllers\cpanel\securityController;
use App\Http\Controllers\cpanel\settingsController;
use App\Http\Controllers\homeController;
use App\Http\Controllers\cpanelController;
use App\Http\Controllers\cpanel\productsController;
use App\Http\Controllers\cpanel\supportController;
use App\Http\Controllers\cpanel\usersController;
use App\Http\Controllers\deliveryAccountController;
use App\Http\Controllers\foodmenuController;
use App\Http\Controllers\helpController;
use App\Http\Controllers\stripeController;
use App\Http\Controllers\websiteController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cookie;


use Illuminate\Support\Facades\Mail;
use App\Mail\automatedEmails;
use App\Mail\welcomeMail;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/mail',function(){
    $account = Auth::guard('account')->user();
    $FoodMenuLang = Cookie::get('FoodMenuLang')  ?? 'en';
    $hello = str_replace(':name:',explode(' ',$account->name)[0],trans('mails/automated.hi'));
    $data = [
        'lang' => $FoodMenuLang,
        'subject' => 'Verify your email address',
        'icon' => 'email_verification.png',
        'account_email' => $account->email,
        'content' => <<<string
            <div style="font-size:2.3em;margin:20px;" class=" c_txt">$hello</div>
            <div style="margin:20px;font-size:1.2em;">Please use the code below to verify your Foodmenu account's email address.</div>
            <div style="text-align:center;width:calc(100% - 40px);margin:20px;">
                <div style="font-size:2.3em;font-weight:bold;letter-spacing:3px;padding: 10px 20px;margin:auto;border-radius:5px;width: fit-content;    border: 1px solid #dbdbdba1;">52s6fg</div>
            </div>
        string,
    ];

    dispatch(function () use ($data) {
        // Mail::to('xevaw10345@ricorit.com')->send(new automatedEmails($data));
        // Mail::to('muha.ragy@gmail.com')->send(new automatedEmails($data));
        // Mail::to('rolamahmoud15@gmail.com')->send(new automatedEmails($data));
    })->afterResponse();

    return new App\Mail\automatedEmails($data);

});

$getHost = request()->getHost();

Route::put('/underConstractionSignup',[homeController::class,'underConstractionSignup'])->name('underConstractionSignup');

Route::post('/stripe/invoices',[stripeController::class,'invoices']);
Route::post('/stripe/subscriptions',[stripeController::class,'subscriptions']);
Route::post('/stripe/paymentmethods',[stripeController::class,'paymentmethods']);

$FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en';
$foodmenu = function()use ($FoodMenuLang){
    Route::get('/', function () use ($FoodMenuLang){
        return redirect()->route('foodmenu.home', $FoodMenuLang);
    })->name('root');

    Route::prefix('{FoodMenuLang}')->group(function () use ($FoodMenuLang){
        Route::get('/', function () use ($FoodMenuLang){
            return redirect()->route('foodmenu.home', $FoodMenuLang);
        });
        Route::get('/home',[foodmenuController::class,'home',$FoodMenuLang])->name('foodmenu.home');
        Route::get('/register',[foodmenuController::class,'register',$FoodMenuLang])->name('foodmenu.register');
    });

    Route::post('/doRegister',[foodmenuController::class,'doRegister']);
    Route::post('/api',[foodmenuController::class,'api']);
};
$cpanel = function(){
    Route::post('/dologin',[cpanelController::class,'dologin'])->middleware(['guest'])->name('account.dologin');
    Route::Post('/logout',[cpanelController::class,'logout'])->middleware(['account'])->name('account.logout');
    Route::get('/login',[cpanelController::class,'login'])->middleware(['guest'])->name('account.login');
    Route::Post('/resetPassword',[cpanelController::class,'resetPassword'])->middleware(['guest'])->name('account.resetPassword');

    Route::middleware(['account'])->group(function () {
        Route::get('/',[cpanelController::class,'home'])->name('cpanel');
        Route::get('/financialreport/{action}',[cpanelController::class,'financialreport'])->name('cpanel.financialreport');
        Route::put('/notifications',[cpanelController::class,'notifications'])->name('cpanel.notifications');
        Route::put('/liveChat',[cpanelController::class,'liveChat'])->name('cpanel.liveChat');
        Route::put('/globalChannel',[cpanelController::class,'globalChannel'])->name('cpanel.globalChannel');

        Route::put('/dashboard',[cpanelController::class,'dashboard'])->name('cpanel.dashboard');
        Route::put('/settings',[settingsController::class,'settings'])->name('cpanel.settings');
        Route::put('/security',[securityController::class,'security'])->name('cpanel.security');
        Route::put('/orders',[ordersController::class,'orders'])->name('cpanel.orders');
        Route::put('/products',[productsController::class,'products'])->name('cpanel.products');
        Route::put('/users',[usersController::class,'users'])->name('cpanel.users');
        Route::post('/liveChat',[usersController::class,'liveChat'])->name('cpanel.liveChat');
        Route::put('/categories',[categoriesController::class,'categories'])->name('cpanel.categories');
        Route::Put('/billing',[billingController::class,'billing'])->name('cpanel.billing');
        Route::put('/design',[designController::class,'design'])->name('cpanel.design');
        Route::post('/imgs',[designController::class,'imgs'])->name('cpanel.imgs');
        Route::put('/support',[supportController::class,'support'])->name('cpanel.support');
        Route::put('/mystaff',[myStaffController::class,'mystaff'])->name('cpanel.mystaff');
    });
};
$billing = function()use($FoodMenuLang){
    Route::get('/', function () use ($FoodMenuLang){
        return redirect()->route('billing.home', $FoodMenuLang);
    })->name('billing.root');
    Route::prefix('{FoodMenuLang}')->group(function () use ($FoodMenuLang){
        Route::get('/',[billingController::class,'home',$FoodMenuLang])->name('billing.home');
        Route::get('/invoice/{invoice_id}',[billingController::class,'invoice',$FoodMenuLang])->name('billing.invoice');
        Route::get('/payment/{payment_return_url}',[billingController::class,'payment_return_url',$FoodMenuLang])->name('billing.payment_return_url');

    });

    Route::post('/api',[billingController::class,'api']);
};
$help = function()use($FoodMenuLang){
    Route::get('/', function ()use($FoodMenuLang){
        return redirect()->route('help.home', $FoodMenuLang);
    })->name('help.root');

    Route::prefix('{FoodMenuLang}')->group(function ()use($FoodMenuLang){
        Route::get('/', function ()use($FoodMenuLang){
            return redirect()->route('help.home', $FoodMenuLang);
        });
        Route::get('/home',[helpController::class,'home',$FoodMenuLang])->name('help.home');
        Route::get('/articles/{cat}',[helpController::class,'cat',$FoodMenuLang])->name('help.cat');
        Route::get('/articles/{cat}/{article}',[helpController::class,'article',$FoodMenuLang])->name('help.article');
        Route::get('/articles/{cat}/{article}/{section}',[helpController::class,'section',$FoodMenuLang])->name('help.section');
    });
    Route::post('/api',[helpController::class,'api']);
};
$delivery = function(){
    Route::get('/',[deliveryAccountController::class,'home'])->middleware(['delivery'])->name('delivery.home');
    Route::get('/login',[deliveryAccountController::class,'login'])->name('delivery.login');

    Route::post('/logout',[deliveryAccountController::class,'logout'])->Middleware(['delivery'])->name('delivery.logout');
    Route::post('/dologin',[deliveryAccountController::class,'dologin'])->name('delivery.dologin');
    Route::post('/orders',[deliveryAccountController::class,'orders'])->middleware('delivery')->name('delivery.orders');
};
$admin = function(){
    Route::get('/login',[adminController::class,'login'])->middleware(['guest'])->name('admin.login');
    Route::post('/dologin',[adminController::class,'dologin'])->middleware('guest')->name('admin.dologin');
    Route::post('/logout',[adminController::class,'logout'])->middleware(['admin'])->name('admin.logout');
    Route::post('/getInfo',[adminController::class,'getInfo'])->middleware('admin')->name('admin.getInfo');
    Route::get('/',[adminController::class,'home'])->middleware(['admin'])->name('admin.home');
};
$website = function()use ($getHost){
    $lang = Cookie::get(Str::slug($getHost.'_lang', '_')) ?? 'en';
    Route::get('/', function () use ($lang){
        return redirect()->route('website.home', $lang);
    });
    Route::post('/user/login',[websiteController::class,'userLogin'])->name('website.userLogin');
    Route::get('/user/logout',[websiteController::class,'userLogout'])->name('website.userLogout');
    Route::post('/user/singup',[websiteController::class,'userSignup'])->name('website.userSignup');
    Route::post('/user/recoverpassword',[websiteController::class,'recoverpassword'])->name('website.userRecoverpassword');
    Route::post('/user/editProfile',[websiteController::class,'editProfile'])->name('website.userEditProfile');

    Route::post('/website/liveChat',[websiteController::class,'liveChat'])->name('website.liveChat');
    Route::post('/website/order',[websiteController::class,'order'])->name('website.order');

    Route::post('/website/reviews',[websiteController::class,'reviews'])->name('website.reviews');
    Route::post('/website/placeOrder',[websiteController::class,'placeOrder'])->name('website.placeOrder');

    Route::post('/website/activity',[websiteController::class,'activity'])->name('website.activity');

    Route::prefix('{lang}')->group(function () use ($lang){

        Route::get('/', function  () use ($lang){
            return redirect()->route('website.home', $lang);
        });
        Route::get('/website-not-active',[websiteController::class,'websiteNotActive'])->name('websiteNotActive');

        Route::get('/home',[websiteController::class,'home',$lang])->name('website.home');
        Route::get('/aboutus',[websiteController::class,'aboutus',$lang])->name('website.aboutus');
        Route::get('/profile',[websiteController::class,'profile',$lang])->name('website.profile');
        Route::get('/privacypolicy',[websiteController::class,'privacypolicy',$lang])->name('website.privacypolicy');
        Route::get('/allproducts',[websiteController::class,'allproducts',$lang])->name('website.allproducts');
        Route::get('/{category}',[websiteController::class,'category',$lang])->name('website.category');
        Route::get('/{category}/{product}',[websiteController::class,'product',$lang])->name('website.product');
    });
};
if(
    $getHost === env('APP_DOMAIN') ||
    $getHost === 'www.'.env('APP_DOMAIN') ||
    $getHost === env('CPANEL_DOMAIN') ||
    $getHost === env('BILLING_CENTER_DOMAIN') ||
    $getHost === env('HELP_CENTER_DOMAIN') ||
    $getHost === env('DELIVERY_HUB_DOMAIN') ||
    $getHost === env('ADMINISTRATION_DOMAIN')
){
    Route::domain(env('APP_DOMAIN'))->group($foodmenu);
    Route::domain('www.'.env('APP_DOMAIN'))->group($foodmenu);
    Route::domain(env('CPANEL_DOMAIN'))->group($cpanel);
    Route::domain(env('BILLING_CENTER_DOMAIN'))->group($billing);
    Route::domain(env('HELP_CENTER_DOMAIN'))->group($help);
    Route::domain(env('DELIVERY_HUB_DOMAIN'))->group($delivery);
    Route::domain(env('ADMINISTRATION_DOMAIN'))->group($admin);
}else{
    Route::domain($getHost)->group($website);

}






