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


use Illuminate\Support\Facades\Mail;
use App\Mail\welcomeMail;
use App\Models\invoice;
use App\Models\website;
// use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Cookie;

use Illuminate\Http\Request;

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
    dispatch(function () {
        $account = Auth::guard('account')->user()->id;
        $FoodMenuLang = Cookie::get('FoodMenuLang')  ?? 'en';
        Mail::to('migori3330@cwtaa.com')->send(new welcomeMail($account,$FoodMenuLang));
    })->afterResponse();

    // Mail::to('keyame5419@viperace.com')->send(new welcomeMail($account));

    // return new App\Mail\welcomeMail($account);

});


if (request()->getHost() == 'ragy.'.env('APP_DOMAIN')){
    Route::get('/',function(){
        return view('ragy.home');
    });
}

Route::put('/underConstractionSignup',[homeController::class,'underConstractionSignup'])->name('underConstractionSignup');

Route::post('/stripe/invoices',[stripeController::class,'invoices']);
Route::post('/stripe/subscriptions',[stripeController::class,'subscriptions']);
Route::post('/stripe/paymentmethods',[stripeController::class,'paymentmethods']);
$foodmenu = function(){
    Route::get('/', function (){
        return redirect()->route('foodmenu.home', $FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en');
    })->name('root');

    Route::prefix('{FoodMenuLang}')->group(function (){
        Route::get('/', function (){
            return redirect()->route('foodmenu.home', $FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en');
        });
        Route::get('/home',[foodmenuController::class,'home',$FoodMenuLang = Cookie::get('FoodMenuLang')  ?? 'en'])->name('foodmenu.home');
        Route::get('/register',[foodmenuController::class,'register',$FoodMenuLang = Cookie::get('FoodMenuLang')  ?? 'en'])->name('foodmenu.register');




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
        Route::get('/financialreport/{action}/{year}/{month}/{lang}/{currency}',[cpanelController::class,'financialreport'])->name('cpanel.financialreport');
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
$billing = function(){
    Route::get('/', function (){
        return redirect()->route('billing.home', $FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en');
    })->name('billing.root');

    Route::prefix('{FoodMenuLang}')->group(function (){
        Route::get('/',[billingController::class,'home',$FoodMenuLang = Cookie::get('FoodMenuLang')  ?? 'en'])->name('billing.home');
        Route::get('/invoice/{invoice_id}',[billingController::class,'invoice',$FoodMenuLang = Cookie::get('FoodMenuLang')  ?? 'en'])->name('billing.invoice');
        Route::get('/payment/{payment_return_url}',[billingController::class,'payment_return_url',$FoodMenuLang = Cookie::get('FoodMenuLang')  ?? 'en'])->name('billing.payment_return_url');

    });

    Route::post('/api',[billingController::class,'api']);
};
$help = function(){
    Route::get('/', function (){
        return redirect()->route('help.home', $FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en');
    })->name('help.root');

    Route::prefix('{FoodMenuLang}')->group(function (){
        Route::get('/', function (){
            return redirect()->route('help.home', $FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en');
        });
        Route::get('/home',[helpController::class,'home',$FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en'])->name('help.home');
        Route::get('/articles/{cat}',[helpController::class,'cat',$FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en'])->name('help.cat');
        Route::get('/articles/{cat}/{article}',[helpController::class,'article',$FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en'])->name('help.article');
        Route::get('/articles/{cat}/{article}/{section}',[helpController::class,'section',$FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en'])->name('help.section');
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
$administration = function(){
    Route::get('/login',[adminController::class,'login'])->middleware(['guest'])->name('admin.login');
    Route::post('/dologin',[adminController::class,'dologin'])->middleware('guest')->name('admin.dologin');
    Route::post('/logout',[adminController::class,'logout'])->middleware(['admin'])->name('admin.logout');
    Route::post('/getInfo',[adminController::class,'getInfo'])->middleware('admin')->name('admin.getInfo');
    Route::get('/',[adminController::class,'home'])->middleware(['admin'])->name('admin.home');
};
$website = function(){
    Route::get('/', function () {
        return redirect()->route('website.home', $lang = Cookie::get(Str::slug(request()->getHost().'_lang', '_')) ?? 'en');
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

    Route::prefix('{lang}')->group(function (){

        Route::get('/', function  (){
            return redirect()->route('website.home', $lang = Cookie::get(Str::slug(request()->getHost().'_lang', '_')) ?? 'en');
        });
        Route::get('/website-not-active',[websiteController::class,'websiteNotActive'])->name('websiteNotActive');

        Route::get('/home',[websiteController::class,'home',$lang = Cookie::get(Str::slug(request()->getHost().'_lang', '_'))  ?? 'en'])->name('website.home');
        Route::get('/aboutus',[websiteController::class,'aboutus',$lang = Cookie::get(Str::slug(request()->getHost().'_lang', '_'))  ?? 'en'])->name('website.aboutus');
        Route::get('/profile',[websiteController::class,'profile',$lang = Cookie::get(Str::slug(request()->getHost().'_lang', '_'))  ?? 'en'])->name('website.profile');
        Route::get('/privacypolicy',[websiteController::class,'privacypolicy',$lang  = Cookie::get(Str::slug(request()->getHost().'_lang', '_'))  ?? 'en'])->name('website.privacypolicy');
        Route::get('/allproducts',[websiteController::class,'allproducts',$lang  = Cookie::get(Str::slug(request()->getHost().'_lang', '_'))  ?? 'en'])->name('website.allproducts');
        Route::get('/{category}',[websiteController::class,'category',$lang  = Cookie::get(Str::slug(request()->getHost().'_lang', '_'))  ?? 'en'])->name('website.category');
        Route::get('/{category}/{product}',[websiteController::class,'product',$lang  = Cookie::get(Str::slug(request()->getHost().'_lang', '_'))  ?? 'en'])->name('website.product');
    });
};

Route::domain(env('APP_DOMAIN'))->group($foodmenu);
Route::domain('www.'.env('APP_DOMAIN'))->group($foodmenu);
Route::domain(env('CPANEL_DOMAIN'))->group($cpanel);
Route::domain(env('BILLING_CENTER_DOMAIN'))->group($billing);
Route::domain(env('HELP_CENTER_DOMAIN'))->group($help);
Route::domain(env('DELIVERY_HUB_DOMAIN'))->group($delivery);
Route::domain(env('ADMINISTRATION_DOMAIN'))->group($administration);
if(
    request()->getHost() !== env('APP_DOMAIN') &&
    request()->getHost() !== 'www.'.env('APP_DOMAIN') &&
    request()->getHost() !== env('CPANEL_DOMAIN') &&
    request()->getHost() !== env('BILLING_CENTER_DOMAIN') &&
    request()->getHost() !== env('HELP_CENTER_DOMAIN') &&
    request()->getHost() !== env('DELIVERY_HUB_DOMAIN') &&
    request()->getHost() !== env('ADMINISTRATION_DOMAIN')
){
    Route::domain(request()->getHost())->group($website);
}
