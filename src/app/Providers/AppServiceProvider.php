<?php

namespace App\Providers;

use App\Models\guest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {


    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        $getHost = request()->gethost();
        if(
            $getHost == env('APP_DOMAIN') ||
            $getHost == 'www'.env('APP_DOMAIN') ||
            $getHost == env('CPANEL_DOMAIN') ||
            $getHost == env('HELP_CENTER_DOMAIN') ||
            $getHost == env('BILLING_CENTER_DOMAIN')
        ){
            config(['session.domain' =>  '.'.env('APP_DOMAIN')]);
        }else{
            config(['session.cookie' =>  Str::slug($getHost, '_') ]);
        }

    }
}


