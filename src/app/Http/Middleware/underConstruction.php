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
        }else if($request->server('HTTP_X_FORWARDED_FOR') == env('UNSERCONSTRACTION_IP1') || $request->ip() == env('UNSERCONSTRACTION_IP1')){
            // return new response(view('home.underConstruction2'));
            return $next($request);
        }else if($request->server('HTTP_X_FORWARDED_FOR') == env('UNSERCONSTRACTION_IP2') || $request->ip() == env('UNSERCONSTRACTION_IP2')){
            // return new response(view('home.underConstruction2'));
            return $next($request);
        }
        return new response(view('home.underConstruction2'));

    }
}
