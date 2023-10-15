<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/




Broadcast::channel('globalChannel.{website_id}', function ($user , $website_id) {
    if(Auth::guard('account')->check() && (int) Auth::guard('account')->user()->website_id === (int)$website_id){
        $account = new stdClass();
        $account->id = $user->id;
        $account->type = 'account';
        $account->name = Auth::guard('account')->user()->name;
        $account->liveChatAuthority = str_split(Auth::guard('account')->user()->authorities)[5];
        $account->isInvisible = Auth::guard('account')->user()->isInvisible;
        $account->number = null;
        return $account;
    }else if(Auth::guard('user')->check() && (int)Auth::guard('user')->user()->website_id === (int)$website_id){
        $user_return = new stdClass();
        $user_return->id = $user->id;
        $user_return->name = Auth::guard('user')->user()->name;
        $user_return->type = 'user';
        $user_return->name = $user->name;
        $user_return->number = null;
        return $user_return;
    }else if(Auth::guard('guest')->check() && (int)Auth::guard('guest')->user()->website_id === (int)$website_id){
        $guest = new stdClass();
        $guest->id = $user->id;
        $guest->type = 'guest';
        $guest->name = $user->name;
        $guest->number = $user->number;
        return $guest;
    }else if(Auth::guard('delivery')->check() && (int)Auth::guard('delivery')->user()->website_id === (int)$website_id){
        $delivery = new stdClass();
        $delivery->id = $user->id;
        $delivery->type = 'delivery';
        $delivery->name = Auth::guard('delivery')->user()->deliveryName;
        return $delivery;
    }
}, ['guards' => ['user','account','guest','delivery']] );


Broadcast::channel('cpanelChannel.{website_id}', function ($account, $website_id) {
    return (int) $account->website_id === (int) $website_id;
}, ['guards' => ['account']] );

Broadcast::channel('websiteChannel.{website_id}.{user_type}.{user_id}', function ($user, $website_id, $user_type, $user_id) {
    if(Auth::guard('user')->check()){$user->type = 'user';}
    else if(Auth::guard('guest')->check()){$user->type = 'guest';}
    else {return false;}
    if((int) $user->website_id === (int) $website_id && (int)$user->id === (int)$user_id && $user->type === $user_type){
        return true;
    }else{
        return false;
    }
}, ['guards' => ['user','guest']] );



Broadcast::channel('admins', function ($admin) {
    return $admin;
}, ['guards' => ['admin']] );
