<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use App\Models\activityLog;
use Illuminate\Http\Request;
use App\Models\website;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\foodmenuFunctions;
use App\Models\notification;
use App\Models\order;
use App\Models\order_item;
use App\Models\product;
use App\Models\product_option_selection;
use Carbon\Carbon;
use stdClass;
use DateTime;
use DateTimeZone;
use MongoDB\BSON\UTCDateTime;

class ordersController extends Controller
{

    protected $website_id;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {

            $this->website_id = Auth::guard('account')->user()->website_id;
            App::setlocale(Auth::guard('account')->user()->language);
            return $next($request);

        });
        // Carbon::setLocale('en');

    }
    public function orders(Request $request)
    {


        if($request->has(['acceptOrder'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['id'=>(inT)$request->orderId,'website_id'=>$this->website_id])->first();
            if($order->status == 0){
                $receiveOrder = $order->update([
                    'status'=> 1,
                    'received_at'=> Carbon::now(),
                    'received_account_name' => Auth::guard('account')->user()->name,
                    'received_account_id' => Auth::guard('account')->user()->id,
                ]);
                if($receiveOrder){
                    $notification = new stdClass();
                    $notification->code = 7;
                    $notification->website_id = $this->website_id;
                    $notification->orderId = $request->orderId;
                    $notification->received_at = Carbon::now();
                    $notification->received_account_name = Auth::guard('account')->user()->name;
                    $notification->received_account_id = Auth::guard('account')->user()->id;
                    $notification->activity = activityLog::create([
                        'website_id' => $this->website_id,
                        'code' => 26,
                        'order_id'=> $request->orderId,
                        'account_id' => Auth::guard('account')->user()->id,
                        'account_name' => Auth::guard('account')->user()->name,
                    ]);
                    broadcast(new cpanelNotification($notification))->toOthers();
                    $user = new stdClass();
                    $order->user_id != null ? $user->id = $order->user_id : $user->id = 0;
                    $user->code = 23;
                    $user->status = 1;
                    $user->orderId = $request->orderId;
                    $user->website_id = $this->website_id;
                    $user->userType = 'user';
                    broadcast(new usersStatus($user))->toOthers();
                    return response(['receiveOrderStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.receiveOrderSaved')]);
                }else{
                    return response(['receiveOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.receiveOrderSaveFaild')]);

                }
            }else{
                return response(['receiveOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.receiveOrderSaveFaild')]);
            }
        }
        else if($request->has(['cancelOrder'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['cancelOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.cancelOrderSaveFaild')]);
            }
            $cancelOrder = $order->update([
                'status'=> 2,
                'canceled_at'=> Carbon::now(),
                'canceled_by'=>0,
                'canceled_account_name'=>Auth::guard('account')->user()->name,
                'canceled_account_id'=>Auth::guard('account')->user()->id
            ]);
            if($cancelOrder){
                $notification = new stdClass();
                $notification->code = 8;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->canceled_by = 0;
                $notification->canceled_at = Carbon::now();
                $notification->canceled_account_name = Auth::guard('account')->user()->name;
                $notification->canceled_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 25,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $order->user_id != null ? $user->id = $order->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 2;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['cancelOrderStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.cancelOrderSaved')]);
            }else{
                return response(['cancelOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.cancelOrderSaveFaild')]);

            }
        }
        else if($request->has(['setReadyForPickup'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $setReadyForPickup = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($setReadyForPickup->status != 1){
                return response(['setReadyToPickupStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsReadyToPickupSaveFaild')]);
            }
            if($setReadyForPickup->update([
                    'status'=> 4,
                    'readyToPickup_at'=> Carbon::now(),
                    'readyToPickup_account_name' => Auth::guard('account')->user()->name,
                    'readyToPickup_account_id' => Auth::guard('account')->user()->id,
                ])){
                $notification = new stdClass();
                $notification->code = 11;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->readyToPickup_at = Carbon::now();
                $notification->readyToPickup_account_name = Auth::guard('account')->user()->name;
                $notification->readyToPickup_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 29,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $setReadyForPickup->user_id != null ? $user->id = $setReadyForPickup->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 4;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['setReadyToPickupStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.markAsReadyToPickupSaved')]);
            }else{
                return response(['setReadyToPickupStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsReadyToPickupSaveFaild')]);

            }
        }
        else if($request->has(['setPickedup'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $setPickedUpOrder = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($setPickedUpOrder->status != 1 && $setPickedUpOrder->status != 4){
                return response(['setPickedUpOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsPickedUpOrderSaveFaild')]);
            }
            if($setPickedUpOrder->update([
                    'status'=> 6,
                    'pickedUp_at'=> Carbon::now(),
                    'pickedUp_account_name' => Auth::guard('account')->user()->name,
                    'pickedUp_account_id' => Auth::guard('account')->user()->id,
                ])){
                $notification = new stdClass();
                $notification->code = 12;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->pickedUp_at = Carbon::now();
                $notification->pickedUp_account_name = Auth::guard('account')->user()->name;
                $notification->pickedUp_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 27,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $setPickedUpOrder->user_id != null ? $user->id = $setPickedUpOrder->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 6;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['setPickedUpOrderStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.markAsPickedUpOrderSaved')]);
            }else{
                return response(['setPickedUpOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsPickedUpOrderSaveFaild')]);

            }
        }
        else if($request->has(['setWithDelivery'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $setWithDelivery = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($setWithDelivery->status != 1){
                return response(['setWithDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsWithDeliverySaveFaild')]);
            }
            if($setWithDelivery->update([
                'status'=> 3,
                'withDelivery_at'=> Carbon::now(),
                'withDelivery_account_name' => Auth::guard('account')->user()->name,
                'withDelivery_account_id' => Auth::guard('account')->user()->id,
            ])){
                $notification = new stdClass();
                $notification->code = 9;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->withDelivery_at = Carbon::now();
                $notification->withDelivery_account_name = Auth::guard('account')->user()->name;
                $notification->withDelivery_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 30,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $setWithDelivery->user_id != null ? $user->id = $setWithDelivery->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 3;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['setWithDeliveryStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.markAsWithDeliverySaved')]);
            }else{
                return response(['setWithDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsWithDeliverySaveFaild')]);

            }
        }
        else if($request->has(['giveToDelivery'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $giveToDelivery = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($giveToDelivery->status != 1 && $giveToDelivery->status != 3){
                return response(['giveToDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsWithDeliverySaveFaild')]);
            }
            if($giveToDelivery->update([
                'status' => 3,
                'delivery_id'=>(int)$request->deliveryId,
                'deliveryName'=>$request->deliveryName,
                'withDelivery_at'=>Carbon::now(),
                'withDelivery_account_name' => Auth::guard('account')->user()->name,
                'withDelivery_account_id' => Auth::guard('account')->user()->id,
            ])){
                $order = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->with('order_items')->first();
                $notification = new stdClass();
                $notification->code = 9.1;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->delivery_id = $request->deliveryId;
                $notification->deliveryName = $request->deliveryName;
                $notification->withDelivery_at = Carbon::now();
                $notification->withDelivery_account_name = Auth::guard('account')->user()->name;
                $notification->withDelivery_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 31,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'delivery_id'=>$request->deliveryId,
                    'delivery_name'=>$request->deliveryName,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $giveToDelivery->user_id != null ? $user->id = $giveToDelivery->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 3;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['giveToDeliveryStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.markAsWithDeliverySaved')]);
            }else{
                return response(['giveToDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsWithDeliverySaveFaild')]);
            }
        }
        else if($request->has(['setDelivered'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $setDelivered = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($setDelivered->status != 3 && $setDelivered->status != 1){
                return response(['setDeliveredStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsDeliveredOrderSaveFaild')]);
            }
            if($setDelivered->update([
                'status'=> 5,
                'delivered_at'=> Carbon::now(),
                'delivered_by' => 0,
                'delivered_account_name' => Auth::guard('account')->user()->name,
                'delivered_account_id' => Auth::guard('account')->user()->id,
            ])){
                $notification = new stdClass();
                $notification->code = 10;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->delivered_at = Carbon::now();
                $notification->delivered_by = 0;
                $notification->delivered_account_name = Auth::guard('account')->user()->name;
                $notification->delivered_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 28,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $setDelivered->user_id != null ? $user->id = $setDelivered->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 5;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['setDeliveredStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.markAsDeliveredOrderSaved')]);
            }else{
                return response(['setDeliveredStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/orders.markAsDeliveredOrderSaveFaild')]);

            }
        }
        else if($request->has('setDineIn')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $setDineIn = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($setDineIn->status != 1 && $setDineIn->status != 8){
                return response(['setDineInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/orders.markAsDineInOrderSaveFaild')]);
            }
            if($setDineIn->update([
                'status'=> 7,
                'dinein_at'=> Carbon::now(),
                'dinein_account_name' => Auth::guard('account')->user()->name,
                'dinein_account_id' => Auth::guard('account')->user()->id,
            ])){
                $notification = new stdClass();
                $notification->code = 6.6;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->dinein_at = Carbon::now();
                $notification->dinein_account_name = Auth::guard('account')->user()->name;
                $notification->dinein_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 25.6,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $setDineIn->user_id != null ? $user->id = $setDineIn->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 7;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['setDineInStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.markAsDineInOrderSaved')]);
            }else{
                return response(['setDineInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/orders.markAsDineInOrderSaveFaild')]);
            }
        }
        else if($request->has('setDiningIn')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $setDiningIn = order::where(['id'=>(int)$request->orderId,'website_id'=>$this->website_id])->first();
            if($setDiningIn->status != 1){
                return response(['setDineInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/orders.markAsDiningOrderSaveFaild')]);
            }
            if($setDiningIn->update([
                'status'=> 8,
                'diningin_at'=> Carbon::now(),
                'diningin_account_name' => Auth::guard('account')->user()->name,
                'diningin_account_id' => Auth::guard('account')->user()->id,
            ])){
                $notification = new stdClass();
                $notification->code = 6.7;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->diningin_at = Carbon::now();
                $notification->diningin_account_name = Auth::guard('account')->user()->name;
                $notification->diningin_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 25.5,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $setDiningIn->user_id != null ? $user->id = $setDiningIn->user_id : $user->id = 0;
                $user->code = 23;
                $user->status = 8;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['setDineInStatus' => 1, 'msg'=> Lang::get('cpanel/orders/orders.markAsDiningInOrderSaved')]);
            }else{
                return response(['setDineInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/orders.markAsDiningOrderSaveFaild')]);
            }
        }
        else if($request->has('changeOrderType')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            if($request->newType != 0 && $request->newType != 1 && $request->newType != 2){
                return response(['changeOrderTypeStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changeOrderTypeFail')]);
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            $oldType = $order->type;
            if($order == null){
                return response(['changeOrderTypeStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changeOrderTypeFail')]);
            }
            if($order->status != 0 && $order->status != 1){
                return response(['changeOrderTypeStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changeOrderTypeFail')]);
            }
            $website = website::where('id',$this->website_id)->select([
                'deliveryCost', 'deliveryTaxCost', 'deliveryTaxPercentage', 'useDeliveryTaxCost',
                'pickupTaxCost','pickupTaxPercentage','usePickupTaxCost',
                'dineInTaxPercentage','dineInTaxCost','useDineInTaxCost','dineInServicePercentage','dineInServiceCost','useDineInServiceCost',
            ])->first();

            $discount = (double)$order->discount;
            $discount_itemsTotal = (double)$order->discount_itemsTotal;
            $itemsTotal = (double)$order->itemsTotal;
            $deliveryCost = (double)0;
            $service = (double)0;
            $servicePercent = (double)0;
            $tax = (double)0;
            $taxPercent = (double)0;
            $total = (double)0;
            if($request->newType == 0){
                $deliveryCost = (double)$website->deliveryCost;
                if($website->useDeliveryTaxCost){
                    $tax = (double)$website->deliveryTaxCost;
                }else{
                    if((double)$website->deliveryTaxPercentage > 0){
                        $taxPercent = $website->deliveryTaxPercentage;
                        $tax = ((double)$website->deliveryTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }
            }else if($request->newType == 1){
                if($website->usePickupTaxCost){
                    $tax = (double)$website->pickupTaxCost;
                }else{
                    if((double)$website->pickupTaxPercentage > 0){
                        $taxPercent = $website->pickupTaxPercentage;
                        $tax = ((double)$website->pickupTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }
            }else if($request->newType == 2){
                if($website->useDineInTaxCost){
                    $tax = (double)$website->dineInTaxCost;
                }else{
                    if((double)$website->dineInTaxPercentage > 0){
                        $taxPercent = $website->dineInTaxPercentage;
                        $tax = ((double)$website->dineInTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }
                if($website->useDineInServiceCost){
                    $service = (double)$website->dineInServiceCost;
                }else{
                    if((double)$website->dineInServicePercentage > 0){
                        $servicePercent = $website->dineInServicePercentage;
                        $service = ((double)$website->dineInServicePercentage / 100) * $discount_itemsTotal;
                    }
                }
            }
            $total = $discount_itemsTotal + $tax + $service + $deliveryCost;

            if($order->update([
                'type' => (int)$request->newType,
                'typeEdit_account_name' => Auth::guard('account')->user()->name,
                'typeEdit_account_id' => Auth::guard('account')->user()->id,

                'tax' => (double)$tax,
                'taxPercent' => (double)$taxPercent,
                'service' => (double)$service,
                'servicePercent' => (double)$servicePercent,
                'deliveryCost' => (double)$deliveryCost,
                'total' => (double)$total,
                'deliveryEdit_account_name' => null,
                'deliveryEdit_account_id' => null,
                'paymentMethod' => null,
            ])){
                $notification = new stdClass();
                $notification->code = 7.1;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->newType = (int)$request->newType;
                $notification->typeEdit_account_name = Auth::guard('account')->user()->name;
                $notification->typeEdit_account_id = Auth::guard('account')->user()->id;
                $notification->tax = (double)$tax;
                $notification->taxPercent = (double)$taxPercent;
                $notification->service = (double)$service;
                $notification->servicePercent = (double)$servicePercent;
                $notification->deliveryCost = (double)$deliveryCost;
                $notification->total = (double)$total;

                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 36,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'newType' => $request->newType,
                    'oldType' => $oldType,

                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $order->user_id != null ? $user->id = $order->user_id : $user->id = 0;
                $user->code = 24;
                $user->type = (int)$request->newType;
                $user->orderId = $request->orderId;

                $user->tax = (double)$tax;
                $user->taxPercent = (double)$taxPercent;
                $user->service = (double)$service;
                $user->servicePercent = (double)$servicePercent;
                $user->deliveryCost = (double)$deliveryCost;
                $user->total = (double)$total;

                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response([
                    'changeOrderTypeStatus'=>1,
                    'msg'=> Lang::get('cpanel/orders/orders.changeOrderTypeSaved'),
                    'tax' => (double)$tax,
                    'taxPercent' => (double)$taxPercent,
                    'service' => (double)$service,
                    'servicePercent' => (double)$servicePercent,
                    'deliveryCost' => (double)$deliveryCost,
                    'total' => (double)$total,
                ]);
            }

        }
        else if($request->has('changeOrderNotice')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeOrderNoticeStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changeOrderNoticeFail')]);
            }
            if($order->update([
                'notice' => $request->newNotice,
                'noticeEdit_account_id' => Auth::guard('account')->user()->id,
                'noticeEdit_account_name' => Auth::guard('account')->user()->name,
            ])){
                $notification = new stdClass();
                $notification->code = 7.2;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->newNotice = $request->newNotice;
                $notification->noticeEdit_account_name = Auth::guard('account')->user()->name;
                $notification->noticeEdit_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 36.1,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['changeOrderNoticeStatus'=>1,'msg'=> Lang::get('cpanel/orders/orders.changeOrderNoticeSaved')]);
            }else{
                return response(['changeOrderNoticeStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changeOrderNoticeFail')]);
            }
        }
        else if($request->has('changePhoneNumber')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changePhoneNumberStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changePhoneNumberFail')]);
            }
            if($order->update([
                'phoneNumber' => $request->newPhoneNumber,
                'phoneEdit_account_id' => Auth::guard('account')->user()->id,
                'phoneEdit_account_name' => Auth::guard('account')->user()->name,
            ])){
                $notification = new stdClass();
                $notification->code = 7.3;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->newPhoneNumber = $request->newPhoneNumber;
                $notification->phoneEdit_account_name = Auth::guard('account')->user()->name;
                $notification->phoneEdit_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 36.2,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $order->user_id != null ? $user->id = $order->user_id : $user->id = 0;
                $user->code = 25;
                $user->phoneNumber = $request->newPhoneNumber;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['changePhoneNumberStatus'=>1,'msg'=> Lang::get('cpanel/orders/orders.changePhoneNumberSaved')]);
            }else{
                return response(['changePhoneNumberStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changePhoneNumberFail')]);
            }
        }
        else if($request->has('changeAddress')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeAddressStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changeAddressFail')]);
            }
            if($order->update([
                'address' => $request->newAddress,
                'addressEdit_account_id' => Auth::guard('account')->user()->id,
                'addressEdit_account_name' => Auth::guard('account')->user()->name,
            ])){
                $notification = new stdClass();
                $notification->code = 7.4;
                $notification->website_id = $this->website_id;
                $notification->orderId = $request->orderId;
                $notification->newAddress = $request->newAddress;
                $notification->addressEdit_account_name = Auth::guard('account')->user()->name;
                $notification->addressEdit_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 36.3,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $order->user_id != null ? $user->id = $order->user_id : $user->id = 0;
                $user->code = 26;
                $user->address = $request->newAddress;
                $user->orderId = $request->orderId;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response(['changeAddressStatus'=>1,'msg'=> Lang::get('cpanel/orders/orders.changeAddressSaved')]);
            }else{
                return response(['changeAddressStatus'=>0,'msg'=> Lang::get('cpanel/orders/orders.changeAddressFail')]);
            }
        }
        else if($request->has(['placeNewOrder'])){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }

            $website = website::where('id',$this->website_id)->select([
                'subscription_status',
                'timeZone',
                'deliveryCost', 'deliveryTaxCost', 'deliveryTaxPercentage', 'useDeliveryTaxCost', 'workingDays_delivery',
                'pickupTaxCost','pickupTaxPercentage','usePickupTaxCost','workingDays_pickup',
                'dineInTaxPercentage','dineInTaxCost','useDineInTaxCost','dineInServicePercentage','dineInServiceCost','useDineInServiceCost','workingDays_dinein',
            ])->first();
            if($website->subscription_status != 'trialing' && $website->subscription_status != 'active' && $website->subscription_status != 'past_due'){
                return abort(402,Lang::get('cpanel/cpanel.public.noPaymentPlaceOrderMsg'));
            }
            $orderItemsIds = [];
            $orderItems = [];
            $itemsTotal = (double)0;
            $discount_itemsTotal = (double)0;

            foreach($request->orderItems as $item){
                array_push($orderItemsIds,$item['product_id']);
            }
            $products = product::where('website_id',$this->website_id)->whereIn('id',$orderItemsIds)->with(['product_options'=>function($q){
                $q->with('product_option_selections');
            }])->get();

            if(empty($request->orderItems) || empty($products)){
                return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.placeNewOrderFaild')]);
            }
            foreach($request->orderItems as $item){
                $itemSelections = [];
                $product = $products->where('id',$item['product_id'])->first();
                if(!$product){return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.placeNewOrderFaild')]);}
                $itemTotal = (double)$product->price;
                if(!empty($item['order_item_option_selections'])){
                    foreach($item['order_item_option_selections'] as $itemOption){
                        $productOption = $product->product_options->where('id',$itemOption['product_option_id'])->first();
                        $productSelection = $productOption->product_option_selections->where('id',$itemOption['product_option_selection_id'])->first();
                        if(!$productOption || !$productSelection){return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.placeNewOrderFaild')]);}
                        $itemTotal = $itemTotal + $productSelection->price;
                        array_push($itemSelections,[
                            'optionName' => $productOption->name,
                            'product_option_id' => $productOption->id,
                            'selectionName'=>$productSelection->name,
                            'product_option_selection_id'=>$productSelection->id,
                            'price'=>(double)$productSelection->price,
                        ]);

                    }
                }
                $itemTotal = $itemTotal * (int)$item['qty'];
                $itemsTotal = $itemsTotal + $itemTotal;
                $itemTotal = (double)$itemTotal;
                array_push($orderItems,[
                    'product_id' => $product->id,
                    'productName' => $product->name,
                    'price' => (double)$product->price,
                    'qty' => (int)$item['qty'],
                    'total' => (double)$itemTotal,
                    'order_item_option_selections' => $itemSelections,
                    'itemNotice' => $item['itemNotice']
                ]);
            }




            $taxPercent = 0; $tax = 0;
            $servicePercent = 0; $service = 0;
            $deliveryCost = 0; $deliveryEdit_account_name = null; $deliveryEdit_account_id = null;
            $total = 0; $discount = 0; $discount_by = 0; $discount_account_name = null; $discount_account_id = null;
            $now = new DateTime('now',new DateTimeZone($website->timeZone));
            $yesterday = new DateTime('yesterday',new DateTimeZone($website->timeZone));

            if($request->orderType == 0){
                $orderType = 0;
                $deliveryCost = $request->deliveryCost;
                $deliveryTimes = $website->workingDays_delivery;
                $discount = foodmenuFunctions::getDiscount($deliveryTimes,$now,$yesterday);
                if($discount > 0){$discount_by = 2;}
                if($request->discount != $discount){
                    $discount = $request->discount;
                    $discount_by = 1;
                    $discount_account_name = Auth::guard('account')->user()->name;
                    $discount_account_id = Auth::guard('account')->user()->id;
                }
                $discount_itemsTotal = $itemsTotal  - (($itemsTotal  * $discount)/100);

                if((double)$website->deliveryCost != $request->deliveryCost){
                    $deliveryEdit_account_name = Auth::guard('account')->user()->name;
                    $deliveryEdit_account_id = Auth::guard('account')->user()->id;
                }
                if($website->useDeliveryTaxCost){
                    $tax = (double)$website->deliveryTaxCost;
                }else{
                    if((double)$website->deliveryTaxPercentage > 0){
                        $taxPercent = $website->deliveryTaxPercentage;
                        $tax = ((double)$website->deliveryTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }

            }else if($request->orderType == 1){
                $orderType = 1;
                $pickupTimes = $website->workingDays_pickup;
                $discount = foodmenuFunctions::getDiscount($pickupTimes,$now,$yesterday);
                if($discount > 0){$discount_by = 2;}
                if($request->discount != $discount){
                    $discount = $request->discount;
                    $discount_by = 1;
                    $discount_account_name = Auth::guard('account')->user()->name;
                    $discount_account_id = Auth::guard('account')->user()->id;
                }
                $discount_itemsTotal = $itemsTotal  - (($itemsTotal  * $discount)/100);

                if($website->usePickupTaxCost){
                    $tax = (double)$website->pickupTaxCost;
                }else{
                    if((double)$website->pickupTaxPercentage > 0){
                        $taxPercent = $website->pickupTaxPercentage;
                        $tax = ((double)$website->pickupTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }

            }else if($request->orderType == 2){
                $orderType = 2;
                $dineinTimes = $website->workingDays_dinein;
                $discount = foodmenuFunctions::getDiscount($dineinTimes,$now,$yesterday);
                if($discount > 0){$discount_by = 2;}
                if($request->discount != $discount){
                    $discount = $request->discount;
                    $discount_by = 1;
                    $discount_account_name = Auth::guard('account')->user()->name;
                    $discount_account_id = Auth::guard('account')->user()->id;
                }
                $discount_itemsTotal = $itemsTotal  - (($itemsTotal  * $discount)/100);

                if($website->useDineInTaxCost){
                    $tax = (double)$website->dineInTaxCost;
                }else{
                    if((double)$website->dineInTaxPercentage > 0){
                        $taxPercent = $website->dineInTaxPercentage;
                        $tax = ((double)$website->dineInTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }
                if($website->useDineInServiceCost){
                    $service = (double)$website->dineInServiceCost;
                }else{
                    if((double)$website->dineInServicePercentage > 0){
                        $servicePercent = $website->dineInServicePercentage;
                        $service = ((double)$website->dineInServicePercentage / 100) * $discount_itemsTotal;
                    }
                }

            }else{
                return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.placeNewOrderFaild')]);
            }


            $total = $discount_itemsTotal + $tax + $service + $deliveryCost;


            $request->isGuest == 1 ? $isGuest = true : $isGuest = false;
            $isGuest ? $user_id = null : $user_id = (int)$request->user_id;
            $isGuest ? $userName = null : $userName = strip_tags($request->userName);
            $order = new order([
                'website_id' => (int)$this->website_id,
                'id' => order::where('website_id',(int)$this->website_id )->max('id') + 1,

                'isGuest' => $isGuest,
                'user_id' => $user_id,
                'userName' => $userName,
                'phoneNumber' => strip_tags($request->phoneNumber),
                'address' => strip_tags($request->address),

                'lat' => (string)$request->lat,
                'lng' => (string)$request->lng,

                'type' => $orderType,
                'status' => 1,
                'notice' => strip_tags($request->orderNotice),
                'paymentMethod' => strip_tags($request->paymentMethod),
                'collectReviewSeen' => false,

                'discount' => (int)$discount,
                'discount_itemsTotal' => (double)$discount_itemsTotal,
                'itemsTotal' => (double)$itemsTotal,
                'tax' => (double)$tax,
                'taxPercent' => (double)$taxPercent,
                'service' => (double)$service,
                'servicePercent' => (double)$servicePercent,
                'deliveryCost' => (double)$deliveryCost,
                'total' => (double)$total,

                // 'delivery_id' => null,
                // 'deliveryName' => null,

                'placed_at' => new UTCDateTime(),
                'placed_by' => 0,
                'placed_account_name' => Auth::guard('account')->user()->name,
                'placed_account_id' => Auth::guard('account')->user()->id,
                'received_at' => new UTCDateTime(),
                'received_account_name' => Auth::guard('account')->user()->name,
                'received_account_id' => Auth::guard('account')->user()->id,

                'withDelivery_at' => null,
                'delivered_at' => null,

                'readyToPickup_at' => null,
                'pickedUp_at' => null,

                'diningin_at' => null,
                'dinein_at' => null,

                'canceled_at' => null,

                'discount_by' => $discount_by,
                // 'discount_promocode' => null,
                // 'discount_promocode_id' => null,
                'discount_account_name' => $discount_account_name,
                'discount_account_id' => $discount_account_id,

                // 'itemsEdit_account_name' => null,
                // 'itemsEdit_account_id' => null,

                'deliveryEdit_account_name' => $deliveryEdit_account_name,
                'deliveryEdit_account_id' => $deliveryEdit_account_id,

                // 'typeEdit_account_name' => null,
                // 'typeEdit_account_id' => null,

            ]);
            foreach($orderItems as $item){
                $orderItem = new order_item($item);
                $order->order_items()->associate($orderItem);
            }

            $order->save();
            if($order){
                $order = foodmenuFunctions::checkOrderId($this->website_id,$order->id);
                $notification = new stdClass();
                $notification->code = 6;
                $notification->website_id = $this->website_id;
                $notification->order = $order;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 34,
                    'order_id' => $order->id,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                if(!$isGuest){
                    $user = new stdClass();
                    $user->id = $user_id;
                    $user->code = 17;
                    $user->order = $order;
                    $user->website_id = $this->website_id;
                    $user->userType = 'user';
                    broadcast(new usersStatus($user))->toOthers();
                }
                return response(['placeOrderStat' => 1,'msg' => Lang::get('cpanel/orders/orders.placeNewOrderPlaced'), 'order' => $order]);


            }else{
                return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.placeNewOrderFaild')]);
            }
        }
        /////
        else if($request->has('findOrders')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $statuses = [];
            foreach($request->findOrderStatuses as $status){
                array_push($statuses,(int)$status);
            }
            if($request->orderNumber != '' && $request->orderNumber != ''){
                $orders = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderNumber])->whereIn('status',[2,5,6,7])->with('order_items')->get();
            }else if($request->userId != '' && $request->userId != null){
                if($request->findOrdersAfter == '' || $request->findOrdersAfter == null){
                    $orders = order::where(['website_id' => $this->website_id,'user_id'=>(int)$request->userId])
                    ->whereIn('status',$statuses)
                    ->with('order_items')
                    ->orderBy('placed_at','DESC')->take(30)->get();
                }else{
                    $orders = order::where(['website_id' => $this->website_id,'user_id'=>(int)$request->userId])
                    ->whereIn('status',$statuses)
                    ->where('placed_at','<', new DateTime($request->findOrdersAfter))
                    ->with('order_items')
                    ->orderBy('placed_at','DESC')->take(30)->get();
                }
            }else{
                if($request->users == 1 && $request->guests == 0){
                    if($request->findOrdersAfter == '' || $request->findOrdersAfter == null){
                        $orders = order::where('website_id',$this->website_id)->where('isGuest',false)
                        ->whereIn('status',$statuses)->with('order_items')
                        ->orderBy('placed_at','DESC')->take(30)->get();
                    }else{
                        $orders = order::where('website_id',$this->website_id)->where('isGuest',false)
                        ->whereIn('status',$statuses)
                        ->where('placed_at','<', new DateTime($request->findOrdersAfter))
                        ->with('order_items')
                        ->orderBy('placed_at','DESC')->take(30)->get();
                    }


                }else if($request->users == 0 && $request->guests == 1){
                    if($request->findOrdersAfter == '' || $request->findOrdersAfter == null){
                        $orders = order::where('website_id',$this->website_id)->where('isGuest',true)
                        ->whereIn('status',$statuses)
                        ->with('order_items')
                        ->orderBy('placed_at','DESC')->take(30)->get();
                    }else{
                        $orders = order::where('website_id',$this->website_id)->where('isGuest',true)
                        ->whereIn('status',$statuses)
                        ->where('placed_at','<', new DateTime($request->findOrdersAfter))
                        ->with('order_items')
                        ->orderBy('placed_at','DESC')->take(30)->get();
                    }

                }else if($request->users == 1 && $request->guests == 1){
                    if($request->findOrdersAfter == '' || $request->findOrdersAfter == null){
                        $orders = order::where('website_id',$this->website_id)
                        ->whereIn('status',$statuses)
                        ->with('order_items')
                        ->orderBy('placed_at','DESC')->take(30)->get();
                    }else{
                        $orders = order::where('website_id',$this->website_id)
                        ->whereIn('status',$statuses)
                        ->where('placed_at','<', new DateTime($request->findOrdersAfter))
                        ->with('order_items')
                        ->orderBy('placed_at','DESC')->take(30)->get();
                    }

                }

            }
            return response(['orders' => $orders]);

        }
        else if($request->has('getOrder')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->getOrder])
            ->with('order_items')
            ->first();
            return response(['order' => $order]);
        }
        /////
        else if($request->has('addItemToOrder')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }

            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order == null){return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.addItemToOrderFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.addItemToOrderFail')]);
            }
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }

            $product = product::where(['website_id' => $this->website_id,'id'=>$request->item['product_id']])
                ->with(['product_options'=>function($q){
                    $q->with('product_option_selections');
                }])->first();
            if($product == null){return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.addItemToOrderFail')]);}


            $itemSelections = [];
            $itemTotal = (double)$product->price;

            if(!empty($request->item['order_item_option_selections'])){
                foreach($request->item['order_item_option_selections'] as $itemOption){
                    $productOption = $product->product_options->where('id',$itemOption['product_option_id'])->first();
                    $productSelection = $productOption->product_option_selections->where('id',$itemOption['product_option_selection_id'])->first();
                    if(!$productOption || !$productSelection){return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.addItemToOrderFail')]);}
                    $itemTotal = $itemTotal + $productSelection->price;
                    array_push($itemSelections,[
                        'optionName' => $productOption->name,
                        'product_option_id' => $productOption->id,
                        'selectionName'=>$productSelection->name,
                        'product_option_selection_id'=>$productSelection->id,
                        'price'=>(double)$productSelection->price,
                    ]);
                }
            }

            $orderItem = [
                'itemNotice' => $request->item['itemNotice'],
                'order_item_option_selections' => $itemSelections,
                'price' => (double)$product->price,
                'productName' => $product->name,
                'product_id' => $product->id,
                'qty' => (int)$request->item['qty'],
                'total' => (double)($itemTotal * (int)$request->item['qty']),
            ];

            $addItem = $order->order_items()->create($orderItem);

            if($addItem){
                $itemsTotal = (double)0;
                $discount_itemsTotal = (double)0;
                foreach($order->order_items as $orderItem){
                    $itemsTotal = $itemsTotal + $orderItem->total;
                }
                $discount_itemsTotal = $itemsTotal - (($itemsTotal * $order->discount)/100);

                $tax = $order->tax;
                if((double)$order->taxPercent > 0){
                    $tax = ((double)$order->taxPercent / 100) * $discount_itemsTotal;
                }

                $service = $order->service;
                if((double)$order->servicePercent > 0){
                    $service = ((double)$order->servicePercent / 100) * $discount_itemsTotal;
                }


                $total = (double)$discount_itemsTotal + (double)$tax + (double)$service + (double)$order->deliveryCost;

                if($order->itemsEdit_account_id == null){
                    $order->update([
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                    ]);
                }

                $editedOrder = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->with('order_items')->first();

                $notification = new stdClass();
                $notification->code = 13;
                $notification->website_id = $this->website_id;
                $notification->order = $editedOrder;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 33,
                    'order_id'=> $editedOrder->id,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_name' => $orderItem['productName'],
                    'product_id' => $orderItem['product_id'],
                    'qty' => (int)$orderItem['qty'],
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $editedOrder->user_id != null ? $user->id = $editedOrder->user_id : $user->id = 0;
                $user->code = 16;
                $user->order = $editedOrder;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();
                return response([
                    'addItemToOrderStat' => 1,
                    'msg'=>Lang::get('cpanel/orders/orders.addItemToOrderSaved'),
                    'order' => $editedOrder,
                ]);
            }
        }
        else if($request->has('removeItemFromOrder')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }

            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order == null){return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.removeItemToOrderFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.removeItemToOrderFail')]);
            }
            if($order->order_items->count() == 1){return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.removeItemToOrderFail')]);}
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }

            $item = $order->order_items()->find($request->itemId);
            $productId = $item->product_id;
            $productName = $item->productName;


            $discount = (int)$order->discount;
            $itemsTotal = (double)$order->itemsTotal - (double)$item->total;
            $discount_itemsTotal = $itemsTotal - (($itemsTotal * $discount )/100);
            $tax = (double)$order->tax;
            $service = (double)$order->service;
            $deliveryCost = (double)$order->deliveryCost;

            if((double)$order->taxPercent > 0){
                $tax = ((double)$order->taxPercent / 100) * $discount_itemsTotal;
            }

            if((double)$order->servicePercent > 0){
                $service = ((double)$order->servicePercent / 100) * $discount_itemsTotal;
            }

            $total = $discount_itemsTotal + $tax + $service + $deliveryCost;

            if($item->delete()){
                if($order->itemsEdit_account_id == null){
                    $order->update([
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                    ]);
                }
                $editedOrder = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->with('order_items')->first();

                $notification = new stdClass();
                $notification->code = 13;
                $notification->website_id = $this->website_id;
                $notification->order = $editedOrder;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 32,
                    'order_id'=> $editedOrder->id,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_name' => $productName,
                    'product_id' => $productId,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();

                $user = new stdClass();
                $editedOrder->user_id != null ? $user->id = $editedOrder->user_id : $user->id = 0;
                $user->code = 16;
                $user->order = $editedOrder;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();

                return response([
                    'removeItemFromOrderStat' => 1,
                    'msg' => Lang::get('cpanel/orders/orders.removeItemToOrderSaved'),
                    'order' => $editedOrder,
                ]);
            }else{
                return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/orders.removeItemToOrderFail')]);
            }
        }
        else if($request->has('changeItemQty')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order == null){return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemQtyFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemQtyFail')]);
            }
            $item = $order->order_items()->find($request->itemId);
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }
            if($request->action != 'minus' && $request->action != 'plus'){
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemQtyFail')]);
            }
            if($request->action == 'minus' && $item->qty == 1){
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemQtyFail')]);
            }

            if($request->action == 'minus'){$newQty = (int)$item->qty - 1;}
            else if($request->action == 'plus'){$newQty = (int)$item->qty + 1;}
            $newItemTotal = ((double)$item->total / $item->qty) * $newQty ;
            $newItemsTotal = (double)$order->itemsTotal - $item->total + $newItemTotal;

            $discount = (int)$order->discount;
            $discount_itemsTotal = $newItemsTotal - (($newItemsTotal * $discount )/100);

            $tax = (double)$order->tax;
            $service = (double)$order->service;
            $deliveryCost = (double)$order->deliveryCost;

            if((double)$order->taxPercent > 0){
                $tax = ((double)$order->taxPercent / 100) * $discount_itemsTotal;
            }

            if((double)$order->servicePercent > 0){
                $service = ((double)$order->servicePercent / 100) * $discount_itemsTotal;
            }

            $total = $discount_itemsTotal + $tax + $service + $deliveryCost;

            if($item->update([
                'qty' => $newQty,
                'total' => $newItemTotal,
            ])){

                if($order->itemsEdit_account_id == null){
                    $order->update([
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                    ]);
                }

                $editedOrder = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->with('order_items')->first();
                $notification = new stdClass();
                $notification->code = 13;
                $notification->website_id = $this->website_id;
                $notification->order = $editedOrder;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 36.4,
                    'order_id'=> $editedOrder->id,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_name' => $item->productName,
                    'product_id' => $item->product_id,
                    'qty' => $newQty,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();

                $user = new stdClass();
                $editedOrder->user_id != null ? $user->id = $editedOrder->user_id : $user->id = 0;
                $user->code = 16;
                $user->order = $editedOrder;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();

                return response([
                    'changeItemQtyStat' => 1,
                    'msg' => Lang::get('cpanel/orders/orders.changeItemQtySaved'),
                    'order' => $editedOrder,
                ]);

            }else{
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemQtyFail')]);
            }

        }
        else if($request->has('changeItemSelection')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order == null){return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemSelectionFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemSelectionFail')]);
            }
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }
            $item = $order->order_items()->find($request->itemId);
            $oldItemTotal = (double)$item->total;

            $newItemTotal = (double)$item->price;
            $newItemSelectionsArr = [];
            $selection = product_option_selection::where(['website_id'=>$this->website_id,'id'=>$request->selectionId])->select(['id','name','price'])->first();
            if($selection == null){
                return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemSelectionFail')]);
            }
            foreach($item->order_item_option_selections as $key => $itemOption){
                if($itemOption['product_option_id'] == $request->optionId){
                    $optionName = $itemOption['optionName'];
                    $oldSelectionName = $itemOption['selectionName'];
                    array_push($newItemSelectionsArr,[
                        'optionName' => $itemOption['optionName'],
                        'price' => (double)$selection->price,
                        'product_option_id' => $itemOption['product_option_id'],
                        'product_option_selection_id' => $selection->id,
                        'selectionName' => $selection->name,
                    ]);
                    $newItemTotal = $newItemTotal + (double)$selection->price;
                }else{
                    array_push($newItemSelectionsArr,$itemOption);
                    $newItemTotal = $newItemTotal + (double)$itemOption['price'];
                }
            }

            $newItemTotal = $newItemTotal * (int)$item->qty;

            $discount = (int)$order->discount;
            $newItemsTotal = (double)$order->itemsTotal - $oldItemTotal + $newItemTotal;
            $discount_itemsTotal = $newItemsTotal - (($newItemsTotal * $discount )/100);


            $tax = (double)$order->tax;
            $service = (double)$order->service;
            $deliveryCost = (double)$order->deliveryCost;

            if((double)$order->taxPercent > 0){
                $tax = ((double)$order->taxPercent / 100) * $discount_itemsTotal;
            }

            if((double)$order->servicePercent > 0){
                $service = ((double)$order->servicePercent / 100) * $discount_itemsTotal;
            }

            $total = $discount_itemsTotal + $tax + $service + $deliveryCost;

            if($item->update([
                'total' => $newItemTotal,
                'order_item_option_selections' => $newItemSelectionsArr,
            ])){
                if($order->itemsEdit_account_id == null){
                    $order->update([
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> Auth::guard('account')->user()->name,
                        'itemsEdit_account_id'=> Auth::guard('account')->user()->id,
                    ]);
                }

                $editedOrder = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->with('order_items')->first();
                $notification = new stdClass();
                $notification->code = 13;
                $notification->website_id = $this->website_id;
                $notification->order = $editedOrder;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 36.5,
                    'order_id'=> $editedOrder->id,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_name' => $item->productName,
                    'product_id' => $item->product_id,
                    'option_name' => $optionName,
                    'old_selection_name' => $oldSelectionName,
                    'selection_name' => $selection->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();

                $user = new stdClass();
                $editedOrder->user_id != null ? $user->id = $editedOrder->user_id : $user->id = 0;
                $user->code = 16;
                $user->order = $editedOrder;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();

                return response([
                    'changeItemSelectionStat' => 1,
                    'msg' => Lang::get('cpanel/orders/orders.changeItemSelectionSaved'),
                    'order' => $editedOrder,
                ]);

            }else{
                return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemSelectionFail')]);
            }
        }
        else if($request->has('changeItemNotice')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            if($order == null){return response(['changeItemNoticeStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemNoticeFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeItemNoticeStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemNoticeFail')]);
            }
            $item = $order->order_items()->find($request->itemId);
            if($item->update([
                'itemNotice' => $request->itemNotice
            ])){
                $notification = new stdClass();
                $notification->code = 13.1;
                $notification->website_id = $this->website_id;
                $notification->orderId = (int)$request->orderId;
                $notification->itemId = $request->itemId;
                $notification->itemNotice = $request->itemNotice;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 36.6,
                    'order_id'=> $request->orderId,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_name' => $item->productName,
                    'product_id' => $item->product_id,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['changeItemNoticeStat' => 1,'msg' => Lang::get('cpanel/orders/orders.changeItemNoticeSaved')]);
            }else{
                return response(['changeItemNoticeStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeItemNoticeFail')]);
            }
        }
        else if($request->has('changeDeliveryCost')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            $oldDeliveryCost = $order->deliveryCost;
            if($order == null){return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeDeliverycostFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeDeliverycostFail')]);
            }
            if($order->type != 0){
                return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeDeliverycostFail')]);
            }
            $discount_itemsTotal = (double)$order->discount_itemsTotal;
            $tax = (double)$order->tax;
            $deliveryCost = (double)$request->deliveryCost;
            $total = $discount_itemsTotal + $tax + $deliveryCost;

            if($order->update([
                'deliveryCost' => (double)$deliveryCost,
                'total' => (double)$total,
                'deliveryEdit_account_name'=> Auth::guard('account')->user()->name,
                'deliveryEdit_account_id'=> Auth::guard('account')->user()->id,
            ])){

                $notification = new stdClass();
                $notification->code = 13.2;
                $notification->website_id = $this->website_id;
                $notification->orderId = $order->id;
                $notification->deliveryCost = $order->deliveryCost;
                $notification->total = $order->total;
                $notification->deliveryEdit_account_name = Auth::guard('account')->user()->name;
                $notification->deliveryEdit_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 33.5,
                    'order_id'=> $order->id,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'deliveryCost' => $order->deliveryCost,
                    'oldDeliveryCost' => $oldDeliveryCost,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();

                $user = new stdClass();
                $order->user_id != null ? $user->id = $order->user_id : $user->id = 0;
                $user->code = 27;
                $user->orderId = $order->id;
                $user->deliveryCost = $order->deliveryCost;
                $user->total = $order->total;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();

                return response([
                    'changeDeliveryCostStat' => 1,
                    'msg' => Lang::get('cpanel/orders/orders.changeDeliverycostSaved'),
                    'deliveryCost' => (double)$deliveryCost,
                    'total' => (double)$total,
                ]);
            }else{
                return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeDeliverycostFail')]);
            }
        }
        else if($request->has('changeDiscount')){
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'id'=>(int)$request->orderId])->first();
            $oldDiscount = $order->discount;
            if($order == null){return response(['changeDiscountStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeDiscountFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeDiscountStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeDiscountFail')]);
            }

            $itemsTotal = (double)$order->itemsTotal;
            $service = (double)$order->service;
            $tax = (double)$order->tax;
            $deliveryCost = (double)$order->deliveryCost;

            $discount = (int)$request->discount;
            $discount_itemsTotal = $itemsTotal - (($itemsTotal * $discount )/100);

            if((double)$order->taxPercent > 0){
                $tax = ((double)$order->taxPercent / 100) * $discount_itemsTotal;
            }

            if((double)$order->servicePercent > 0){
                $service = ((double)$order->servicePercent / 100) * $discount_itemsTotal;
            }

            $total = $discount_itemsTotal + $tax + $service + $deliveryCost;

            if($order->update([
                'discount' => (int)$discount,
                'discount_itemsTotal' => (double)$discount_itemsTotal,
                'tax' => (double)$tax,
                'service' => (double)$service,
                'total' => (double)$total,
                'discount_by' => 1,
                'discount_promocode' => null,
                'discount_promocode_id' => null,
                'discount_account_id' => Auth::guard('account')->user()->id,
                'discount_account_name' => Auth::guard('account')->user()->name,
            ])){

                $notification = new stdClass();
                $notification->code = 13.3;
                $notification->website_id = $this->website_id;
                $notification->orderId = $order->id;
                $notification->discount = (int)$discount;
                $notification->discount_itemsTotal = (double)$discount_itemsTotal;
                $notification->tax = (double)$tax;
                $notification->service = (double)$service;
                $notification->total = (double)$total;
                $notification->discount_account_name = Auth::guard('account')->user()->name;
                $notification->discount_account_id = Auth::guard('account')->user()->id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 33.6,
                    'order_id'=> $order->id,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'discount' => $discount,
                    'oldDiscount' => $oldDiscount,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();

                $user = new stdClass();
                $order->user_id != null ? $user->id = $order->user_id : $user->id = 0;
                $user->code = 28;
                $user->orderId = $order->id;
                $user->discount = (int)$discount;
                $user->discount_itemsTotal = $order->discount_itemsTotal;
                $user->tax = $order->tax;
                $user->service = $order->service;
                $user->total = $order->total;
                $user->website_id = $this->website_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user))->toOthers();

                return response([
                    'changeDiscountStat' => 1,
                    'msg' => Lang::get('cpanel/orders/orders.changeDiscountSaved'),
                    'discount' => (int)$discount,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                ]);
            }else{
                return response(['changeDiscountStat' => 0,'msg' => Lang::get('cpanel/orders/orders.changeDiscountFail')]);
            }
        }
    }
}
