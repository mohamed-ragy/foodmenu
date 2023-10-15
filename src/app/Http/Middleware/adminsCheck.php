<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class adminsCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(env('APP_DOMAIN') == 'food-menu.test'){
            return $next($request);
        }
        if($request->server('HTTP_X_FORWARDED_FOR') == "196.129.66.42" || $request->ip() == "196.129.66.42"){
            return $next($request);
        }else if($request->server('HTTP_X_FORWARDED_FOR') == "196.129.66.42" || $request->ip() == "196.129.66.42"){
            return $next($request);
        }
        // return $next($request);
        // return redirect('https://www.food-menu.net');
        return redirect()->route('foodmenu.home',['FoodMenuLang'=> $FoodMenuLang = Cookie::get('FoodMenuLang') ?? 'en']);
        // return redirect()->route('foodmenu.home');
//
    }
}
