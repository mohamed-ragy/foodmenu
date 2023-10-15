<?php

namespace App\Http\Controllers;

use App\Models\activityLog;
use App\Models\delivery;
use Illuminate\Http\Request;
use App\Models\notification;
use App\Models\order;
use App\Models\website;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cookie;

use DateTime;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use stdClass;

class deliveryAccountController extends Controller
{
    public function __construct()
    {
        // $this->middleware(function ($request, $next) {
        //     $deliveryLangs = ['en','ar','es','de','fr','it','ua'];
        //     if(!in_array($request->deliveryLang,$deliveryLangs)){
        //         return redirect()->route('delivery.home','en');
        //     }
        //     Cookie::queue(Cookie::make('deliveryLang',$request->deliveryLang,9999999));
        //     App::setlocale($request->deliveryLang);
        //     return $next($request);
        // })->except(['dologin','logout','orders']);


    }
    public function login(Request $request)
    {

        if($request->route()->getName() == 'delivery.login' && Auth::guard('delivery')->check()){
            return redirect()->route('delivery.home');
        }
        return view('deliveryAccount.login');
    }
    public function dologin(Request $request)
    {

        if (Auth::guard('delivery')->attempt(['deliveryName' => $request->loginName , 'password' => $request->password ])) {
            $request->session()->regenerate();
            return response(['status'=>1]);
        }else{
            return response(['status'=>0,'msg'=>Lang::get('deliveryAccount/deliveryAccount.wrongusernameorpassword')]);
        }

    }
    public function logout(Request $request)
    {
        Auth::guard('delivery')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
    public function orders(Request $request)
    {
        delivery::where('id',Auth::guard('delivery')->user()->id)->update(['lastSeen'=>Carbon::now()->timestamp]);
        if($request->has(['getOrders'])){
            $orders = order::where([
                'website_id'=> Auth::guard('delivery')->user()->website_id,
                'delivery_id' => Auth::guard('delivery')->user()->id,
                'status'=>3
            ])
            ->orderBy('withDelivery_at','desc')->select([
                'website_id','id','_id',
                'isGuest','userName','phoneNumber','address','lat','lng',
                'notice',
                'total','paymentMethod',
                'withDelivery_at',
            ])->get();
            return response(['orders'=> $orders]);
        }
        else if ($request->has(['orderDelivered'])){

            $updateOrder = order::where([
                'id'=>(int)$request->orderDelivered,
                'delivery_id'=> Auth::guard('delivery')->user()->id,
                'website_id' => Auth::guard('delivery')->user()->website_id,
                ])->first();
            if($updateOrder->status != 3){
                return response(['orderDeliveredStatus' => 0,',msg'=> Lang::get('deliveryAccount/deliveryAccount.orderDeliveredFaild')]);
            }
            if($updateOrder->update([
                'status' => 5,
                'delivered_at' => Carbon::now(),
                'delivered_by' => 1,
                'delivered_delivery_name' => Auth::guard('delivery')->user()->deliveryName,
                'delivered_delivery_id' => Auth::guard('delivery')->user()->id,
            ])){
                $notification = notification::create([
                    'website_id'=>Auth::guard('delivery')->user()->website_id,
                    'code'=>2,
                    'seen' => false,
                    'order_id'=>$request->orderDelivered,
                    'delivery_id' => Auth::guard('delivery')->user()->id,
                    'deliveryName' => Auth::guard('delivery')->user()->deliveryName,
                ]);
                $notification->delivered_at = Carbon::now();
                $notification->delivered_by = 1;
                $notification->activity = activityLog::create([
                    'website_id' => Auth::guard('delivery')->user()->website_id,
                    'code' => 17,
                    'order_id' => $request->orderDelivered,
                    'delivery_id' => Auth::guard('delivery')->user()->id,
                    'delivery_name' => Auth::guard('delivery')->user()->deliveryName,
                ]);

                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $updateOrder->user_id != null ? $user->id = $updateOrder->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 5;
                $user->orderId = $updateOrder->id;
                $user->website_id = Auth::guard('delivery')->user()->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['orderDeliveredStatus' => 1,'msg'=> Lang::get('deliveryAccount/deliveryAccount.orderDeliveredSuccess')]);
            }else{
                return response(['orderDeliveredStatus' => 0,',msg'=> Lang::get('deliveryAccount/deliveryAccount.orderDeliveredFaild')]);
            }
        }

    }
    public function home(Request $request)
    {   
        delivery::where('id',Auth::guard('delivery')->user()->id)->update(['lastSeen'=>Carbon::now()->timestamp]);
        $settings = website::where('id',Auth::guard('delivery')->user()->website_id)->select(['currencies','languages'])->first();
        return view('deliveryAccount.home',['settings' => $settings]);
    }
}
