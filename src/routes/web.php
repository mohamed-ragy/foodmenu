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
    // $mail = Lang::get('mails/automated.welcome');
    // $mail = str_replace(':APP_URL:',env('APP_URL'),$mail);
    // $mail = str_replace(':lang:',$FoodMenuLang,$mail);
    // $mail_body = $mail['body'];
    // $mail_header = $mail['header'];
    // $mail_body = str_replace(':code:','000000',$mail_body);
    // $mail = [
    //     'account_name' => $account->name,
    //     'lang' => $FoodMenuLang,
    //     'subject' => Lang::get('mails/automated.welcome.subject'),
    //     'account_email' => $account->email,
    //     'body' => $mail_body,
    //     'header' => $mail_header,
    // ];
    // $account = Auth::guard('account')->user();
    $account->email = '288purple@yogirt.com';
    // $data = [
    //     'account_name' => 'mohamed ragy',
    //     'account_email' => $account->email,
    //     'lang' => $account->language,
    //     'content' => str_replace(':code:','000000',Lang::get('mails/automated.reset_password_email')),
    // ];
    // dd(Mail::send(new automatedEmails($data)));
    // dispatch(function () use($data,){Mail::send(new automatedEmails($data));})->afterResponse();
    // dispatch(function () use ($mail) {
        // Mail::to('288purple@yogirt.com')->send(new automatedEmails($mail));
    // })->afterResponse();

    return new App\Mail\automatedEmails([
        'account_name' => $account->name,
        'account_email' => $account->email,
        'lang' => $account->language,
        // 'content' => str_replace(':code:','000000',Lang::get('mails/automated.reset_password_email')),
        'content' => Lang::get('mails/automated.reset_password_email'),
    ]);

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
    Route::post('/dologin',[cpanelController::class,'dologin'])->name('account.dologin');
    Route::get('/login',[cpanelController::class,'login'])->name('account.login');
    Route::Post('/resetPassword',[cpanelController::class,'resetPassword'])->name('account.resetPassword');

    Route::Post('/logout',[cpanelController::class,'logout'])->name('account.logout');

    Route::group([],function () {
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
$builder = function(){
    Route::get('/', function (){
        return redirect()->route('builder.home');
    })->name('builder.root');
    Route::get('/',[designController::class,'home'])->name('builder.home');
    Route::post('/api',[designController::class,'api']);
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
        Route::get('/articles/{category}',[helpController::class,'category',$FoodMenuLang])->name('help.category');
        Route::get('/articles/{category}/{article}',[helpController::class,'article',$FoodMenuLang])->name('help.article');
        Route::get('/articles/{category}/{article}/{section}',[helpController::class,'section',$FoodMenuLang])->name('help.section');
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
$website2 = function()use ($getHost){
    // $lang = Cookie::get(Str::slug($getHost.'_lang', '_')) ?? 'en';
    // Route::get('/', function () use ($lang){
    //     return redirect()->route('website.home', $lang);
    // });
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

        // Route::get('/', function  () use ($lang){
        //     return redirect()->route('website.home', $lang);
        // });
        Route::get('/website-not-active',[websiteController::class,'websiteNotActive'])->name('websiteNotActive');

        // Route::get('/home',[websiteController::class,'home',$lang])->name('website.home');
        Route::get('/aboutus',[websiteController::class,'aboutus',$lang])->name('website.aboutus');
        Route::get('/profile',[websiteController::class,'profile',$lang])->name('website.profile');
        Route::get('/privacypolicy',[websiteController::class,'privacypolicy',$lang])->name('website.privacypolicy');
        Route::get('/allproducts',[websiteController::class,'allproducts',$lang])->name('website.allproducts');
        Route::get('/{category}',[websiteController::class,'category',$lang])->name('website.category');
        Route::get('/{category}/{product}',[websiteController::class,'product',$lang])->name('website.product');
    });
};
$website = function() use ($getHost){
    $lang = Cookie::get(Str::slug($getHost.'_lang', '_')) ?? 'en';
    Route::get('/', function () use ($lang){
        return redirect()->route('website.home', $lang);
    });

    Route::prefix('{lang}')->group(function () use ($lang){
        Route::get('/', function  () use ($lang){
            return redirect()->route('website.home', $lang);
        });
        Route::get('/home',[websiteController::class,'home',$lang])->name('website.home');

    });

};
if(
    $getHost === env('APP_DOMAIN') ||
    $getHost === 'www.'.env('APP_DOMAIN') ||
    $getHost === env('CPANEL_DOMAIN') ||
    $getHost === env('BILLING_CENTER_DOMAIN') ||
    $getHost === env('HELP_CENTER_DOMAIN') ||
    $getHost === env('DELIVERY_HUB_DOMAIN') ||
    $getHost === env('ADMINISTRATION_DOMAIN') ||
    $getHost === env('BUILDER_DOMAIN')
){
    Route::domain(env('APP_DOMAIN'))->group($foodmenu);
    Route::domain('www.'.env('APP_DOMAIN'))->group($foodmenu);
    Route::domain(env('CPANEL_DOMAIN'))->group($cpanel);
    Route::domain(env('BILLING_CENTER_DOMAIN'))->group($billing);
    Route::domain(env('HELP_CENTER_DOMAIN'))->group($help);
    Route::domain(env('DELIVERY_HUB_DOMAIN'))->group($delivery);
    Route::domain(env('ADMINISTRATION_DOMAIN'))->group($admin);
    Route::domain(env('BUILDER_DOMAIN'))->group($builder);
}else{
    Route::domain($getHost)->group($website);

}






