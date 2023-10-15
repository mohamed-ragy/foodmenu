<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\guests_log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\guest;
class guestsLogs
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

        if(!Auth::guard('guest')->check()){
            $guestLogin = 'foodmenuGuest-'.Str::random(40);
            $guest  = new guest();
            $guest->guest = $guestLogin;
            $guest->password = 'foodmenu';
            $guest->ip = $request->server('HTTP_X_FORWARDED_FOR');
            $guest->save();
            Auth::guard('guest')->login($guest,$remember = false);
            $request->session()->regenerate();
        }
        return $next($request);
    }
}
