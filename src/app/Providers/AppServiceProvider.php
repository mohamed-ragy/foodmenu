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
        if(
            request()->gethost() == env('APP_DOMAIN') ||
            request()->gethost() == 'www'.env('APP_DOMAIN') ||
            request()->gethost() == env('CPANEL_DOMAIN') ||
            request()->gethost() == env('HELP_CENTER_DOMAIN') ||
            request()->gethost() == env('BILLING_CENTER_DOMAIN')
        ){
            config(['session.domain' =>  '.'.env('APP_DOMAIN')]);
        }else{
            config(['session.cookie' =>  Str::slug(request()->gethost(), '_') ]);
        }

    }
}


