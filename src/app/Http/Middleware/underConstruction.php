<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class underConstruction
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(env('APP_DOMAIN') == 'food-menu.test'){
            return $next($request);
        }

        if(request()->getHost()  == 'ragy.food-menu.net' ||
            request()->getRequestUri() == '/underConstractionSignup' ||
            request()->getRequestUri() == '/stripe/invoices' ||
            request()->getRequestUri() == '/stripe/subscriptions' ||
            request()->getRequestUri() == '/stripe/paymentmethods'){
            return $next($request);
        }else if($request->server('HTTP_X_FORWARDED_FOR') == "156.202.150.149" || $request->ip() == "156.202.150.149"){
            // return new response(view('home.underConstruction2'));
            return $next($request);
        }else if($request->server('HTTP_X_FORWARDED_FOR') == "196.152.209.155" || $request->ip() == "196.152.209.155"){
            // return new response(view('home.underConstruction2'));
            return $next($request);
        }
        return new response(view('home.underConstruction2'));

    }
}
