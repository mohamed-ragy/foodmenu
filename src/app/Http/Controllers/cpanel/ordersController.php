<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use App\Models\activityLog;
use App\Models\delivery;
use Illuminate\Http\Request;
use App\Models\website;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\foodmenuFunctions;
use App\Models\order;
use App\Models\order_item;
use App\Models\product;
use App\Models\product_option_selection;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;

class ordersController extends Controller
{

    protected $website_id;
    protected $account;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->account = Auth::guard('account')->user();
            $this->website_id = $this->account->website_id;
            App::setlocale($this->account->language);
            return $next($request);

        });
        // Carbon::setLocale('en');

    }
    public function orders(Request $request)
    {
        if($request->has(['placeNewOrder'])){
            if(str_split($this->account->authorities)[0] == false){
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

            if(empty($request->orderItems)){
                return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.placeNewOrderFaild')]);
            }
            foreach($request->orderItems as $item){
                array_push($orderItemsIds,$item['product_id']);
            }
            $products = product::where('website_id',$this->website_id)->whereIn('id',$orderItemsIds)->with(['product_options'=>function($q){
                $q->with('product_option_selections');
            }])->get();

            if(empty($products)){
                return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.placeNewOrderFaild')]);
            }
            foreach($request->orderItems as $item){
                $itemSelections = [];
                $product = $products->where('id',$item['product_id'])->first();
                if(!$product){return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.placeNewOrderFaild')]);}
                $itemTotal = (double)$product->price;
                if(!empty($item['selections'])){
                    foreach($item['selections'] as $itemOption){
                        $productOption = $product->product_options->where('id',$itemOption['option_id'])->first();
                        $productSelection = $productOption->product_option_selections->where('id',$itemOption['selection_id'])->first();
                        if(!$productOption || !$productSelection){return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.placeNewOrderFaild')]);}
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
                    $discount_account_name = $this->account->name;
                    $discount_account_id = $this->account->id;
                }
                $discount_itemsTotal = $itemsTotal  - (($itemsTotal  * $discount)/100);

                if((double)$website->deliveryCost != $request->deliveryCost){
                    $deliveryEdit_account_name = $this->account->name;
                    $deliveryEdit_account_id = $this->account->id;
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
                    $discount_account_name = $this->account->name;
                    $discount_account_id = $this->account->id;
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
                    $discount_account_name = $this->account->name;
                    $discount_account_id = $this->account->id;
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
                return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.placeNewOrderFaild')]);
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

                'placed_at' => Carbon::now()->timestamp,
                'placed_by' => 0,
                'placed_account_name' => $this->account->name,
                'placed_account_id' => $this->account->id,
                'accepted_at' => Carbon::now()->timestamp,
                'accepted_account_name' => $this->account->name,
                'accepted_account_id' => $this->account->id,

                'out_for_delivery_at' => null,
                'delivered_at' => null,

                'ready_for_pickup_at' => null,
                'pickedUp_at' => null,

                'diningin_at' => null,
                'dinedin_at' => null,

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
                foodmenuFunctions::notification('orders.new_order_account',[
                    'website_id' => $this->website_id,
                    'code' => 'order.new_order_by_account',
                    'order_id' => $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order' => $order
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('new_order_account',$this->website_id,'user',$order->user_id,['order' => $order]);
                }
                return response(['placeOrderStat' => 1,'msg' => Lang::get('cpanel/orders/responses.placeNewOrderPlaced'), 'order' => $order]);


            }else{
                return response(['placeOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.placeNewOrderFaild')]);
            }
        }else if($request->has(['acceptOrder'])){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 0){
                return response(['acceptOrderState' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.acceptOrderSaveFaild')]);
            }
            $updateOrder = $order->update([
                'status'=> 1,
                'accepted_at'=> Carbon::now()->timestamp,
                'accepted_account_name' => $this->account->name,
                'accepted_account_id' => $this->account->id,
            ]);
            if($updateOrder){
                foodmenuFunctions::notification('orders.accepted',[
                    'website_id' => $this->website_id,
                    'code' => 'order.accepted',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $order->_id,
                    'accepted_at'=> Carbon::now()->timestamp,
                    'accepted_account_name' => $this->account->name,
                    'accepted_account_id' => $this->account->id,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_accepted',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                }
                return response(['acceptOrderState' => 1, 'msg'=> Lang::get('cpanel/orders/responses.acceptOrderSaved'),'now'=>Carbon::now()->timestamp]);
            }else{
                return response(['acceptOrderState' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.acceptOrderSaveFaild')]);
            }
        }else if($request->has(['cancelOrder'])){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['cancelOrderState' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.cancelOrderSaveFaild')]);
            }
            $cancelOrder = $order->update([
                'status'=> 2,
                'canceled_at'=> Carbon::now()->timestamp,
                'canceled_by'=> 0,
                'canceled_account_name'=>$this->account->name,
                'canceled_account_id'=>$this->account->id
            ]);
            if($cancelOrder){
                foodmenuFunctions::notification('orders.canceled_by_account',[
                    'website_id' => $this->website_id,
                    'code' => 'order.canceled_by_account',
                    'order_number' =>$order->id,
                    'order_id'=> $order->_id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $order->_id,
                    'canceled_at'=> Carbon::now()->timestamp,
                    'canceled_by'=> 0,
                    'canceled_account_name'=>$this->account->name,
                    'canceled_account_id'=>$this->account->id
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_canceled',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                }
                return response(['cancelOrderState' => 1, 'msg'=> Lang::get('cpanel/orders/responses.cancelOrderSaved'),'now'=>Carbon::now()->timestamp]);
            }else{
                return response(['cancelOrderState' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.cancelOrderSaveFaild')]);

            }
        }else if($request->has(['markAsreadyForPickup'])){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 1){
                return response(['markAsreadyForPickupState' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsReadyToPickupSaveFaild')]);
            }
            if($order->update([
                    'status'=> 4,
                    'ready_for_pickup_at'=> Carbon::now()->timestamp,
                    'ready_for_pickup_account_name' => $this->account->name,
                    'ready_for_pickup_account_id' => $this->account->id,
                ])){
                    foodmenuFunctions::notification('orders.ready_for_pickup',[
                        'website_id' => $this->website_id,
                        'code' => 'order.ready_for_pickup',
                        'order_id'=> $order->_id,
                        'order_number' => $order->id,
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                    ],[
                        'order_id' => $order->_id,
                        'ready_for_pickup_at'=> Carbon::now()->timestamp,
                        'ready_for_pickup_account_name' => $this->account->name,
                        'ready_for_pickup_account_id' => $this->account->id,
                    ]);
                    if(!$order->isGuest){
                        foodmenuFunctions::notification_website('order_ready_for_pickup',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                    }
                return response(['markAsreadyForPickupState' => 1, 'msg'=> Lang::get('cpanel/orders/responses.markAsReadyToPickupSaved'),'now'=>Carbon::now()->timestamp]);
            }else{
                return response(['markAsreadyForPickupState' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsReadyToPickupSaveFaild')]);

            }
        }else if($request->has(['setPickedup'])){
            if(str_split($this->account->authorities)[0] == false){
                return;
            }
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 1 && $order->status != 4){
                return response(['setPickedUpOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsPickedUpOrderSaveFaild')]);
            }
            if($order->update([
                    'status'=> 6,
                    'pickedUp_at'=> Carbon::now()->timestamp,
                    'pickedUp_account_name' => $this->account->name,
                    'pickedUp_account_id' => $this->account->id,
                ])){
                    foodmenuFunctions::notification('orders.picked_up',[
                        'website_id' => $this->website_id,
                        'code' => 'order.picked_up',
                        'order_id'=> $order->_id,
                        'order_number' => $order->id,
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                    ],[
                        'order_id' => $order->_id,
                        'pickedUp_at'=> Carbon::now()->timestamp,
                        'pickedUp_account_name' => $this->account->name,
                        'pickedUp_account_id' => $this->account->id,
                    ]);
                    if(!$order->isGuest){
                        foodmenuFunctions::notification_website('order_picked_up',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                    }
                return response(['setPickedUpOrderStatus' => 1, 'msg'=> Lang::get('cpanel/orders/responses.markAsPickedUpOrderSaved'),'now'=>Carbon::now()->timestamp]);
            }else{
                return response(['setPickedUpOrderStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsPickedUpOrderSaveFaild')]);

            }
        }else if($request->has(['markAsOutForDelivery'])){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 1){
                return response(['markAsOutForDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsWithDeliverySaveFaild')]);
            }
            if($order->update([
                'status'=> 3,
                'out_for_delivery_at'=> Carbon::now()->timestamp,
                'out_for_delivery_account_name' => $this->account->name,
                'out_for_delivery_account_id' => $this->account->id,
            ])){
                foodmenuFunctions::notification('orders.out_for_delivery',[
                    'website_id' => $this->website_id,
                    'code' => 'order.out_for_delivery',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $order->_id,
                    'out_for_delivery_at'=> Carbon::now()->timestamp,
                    'out_for_delivery_account_name' => $this->account->name,
                    'out_for_delivery_account_id' => $this->account->id,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_out_for_delivery',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                }
                return response(['markAsOutForDeliveryStatus' => 1, 'msg'=> Lang::get('cpanel/orders/responses.markAsWithDeliverySaved'),'now'=>Carbon::now()->timestamp]);
            }else{
                return response(['markAsOutForDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsWithDeliverySaveFaild')]);

            }
        }else if($request->has(['giveToDelivery'])){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 1 && $order->status != 3){
                return response(['giveToDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsWithDeliverySaveFaild')]);
            }
            $deliveryMan = delivery::where(['website_id'=> $this->website_id,'id' => $request->delivery_id])->first();
            $order->out_for_delivery_at == null ? $out_for_delivery_at = Carbon::now()->timestamp : $out_for_delivery_at = $order->out_for_delivery_at;
            if($order->update([
                'status' => 3,
                'delivery_id'=>$deliveryMan->id,
                'deliveryName'=>$deliveryMan->deliveryName,
                'out_for_delivery_at'=>$out_for_delivery_at,
                'out_for_delivery_account_name' => $this->account->name,
                'out_for_delivery_account_id' => $this->account->id,
            ])){
                foodmenuFunctions::notification('orders.to_delivery_man',[
                    'website_id' => $this->website_id,
                    'code' => 'order.to_delivery_man',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'delivery_id'=>$deliveryMan->id,
                    'delivery_name'=>$deliveryMan->deliveryName,
                ],[
                    'order_id' => $order->_id,
                    'delivery_id'=>$deliveryMan->id,
                    'delivery_name'=>$deliveryMan->deliveryName,
                    'out_for_delivery_at'=>$out_for_delivery_at,
                    'out_for_delivery_account_name' => $this->account->name,
                    'out_for_delivery_account_id' => $this->account->id,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_out_for_delivery',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                }
                return response(['giveToDeliveryStatus' => 1, 'msg'=> Lang::get('cpanel/orders/responses.markAsWithDeliverySaved'),'out_for_delivery_at'=>$out_for_delivery_at]);
            }else{
                return response(['giveToDeliveryStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsWithDeliverySaveFaild')]);
            }
        }else if($request->has(['setDelivered'])){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 3 && $order->status != 1){
                return response(['setDeliveredStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsDeliveredOrderSaveFaild')]);
            }
            if($order->update([
                'status'=> 5,
                'delivered_at'=> Carbon::now()->timestamp,
                'delivered_by' => 0,
                'delivered_account_name' => $this->account->name,
                'delivered_account_id' => $this->account->id,
            ])){
                foodmenuFunctions::notification('orders.delivered_by_account',[
                    'website_id' => $this->website_id,
                    'code' => 'order.delivered_by_account',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $order->_id,
                    'delivered_at'=> Carbon::now()->timestamp,
                    'delivered_by' => 0,
                    'delivered_account_name' => $this->account->name,
                    'delivered_account_id' => $this->account->id,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_delivered',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                }
                return response(['setDeliveredStatus' => 1, 'msg'=> Lang::get('cpanel/orders/responses.markAsDeliveredOrderSaved'),'now'=>Carbon::now()->timestamp]);
            }else{
                return response(['setDeliveredStatus' => 0, 'msg'=>  Lang::get('cpanel/orders/responses.markAsDeliveredOrderSaveFaild')]);

            }
        }else if($request->has('setDiningIn')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 1){
                return response(['setDiningInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/responses.markAsDiningOrderSaveFaild')]);
            }
            if($order->update([
                'status'=> 8,
                'diningin_at'=> Carbon::now()->timestamp,
                'diningin_account_name' => $this->account->name,
                'diningin_account_id' => $this->account->id,
            ])){
                foodmenuFunctions::notification('orders.diningin',[
                    'website_id' => $this->website_id,
                    'code' => 'order.diningin',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $order->_id,
                    'diningin_at'=> Carbon::now()->timestamp,
                    'diningin_account_name' => $this->account->name,
                    'diningin_account_id' => $this->account->id,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_diningin',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                }
                return response(['setDiningInStatus' => 1, 'msg'=> Lang::get('cpanel/orders/responses.markAsDiningInOrderSaved'),'now' => Carbon::now()->timestamp]);
            }else{
                return response(['setDiningInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/responses.markAsDiningOrderSaveFaild')]);
            }
        }else if($request->has('setDinedIn')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['_id'=>$request->order_id,'website_id'=>$this->website_id])->first();
            if($order->status != 1 && $order->status != 8){
                return response(['setDinedInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/responses.markAsDinedInOrderSaveFaild')]);
            }
            if($order->update([
                'status'=> 7,
                'dinedin_at'=> Carbon::now()->timestamp,
                'dinedin_account_name' => $this->account->name,
                'dinedin_account_id' => $this->account->id,
            ])){
                foodmenuFunctions::notification('orders.dinedin',[
                    'website_id' => $this->website_id,
                    'code' => 'order.dinedin',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $order->_id,
                    'dinedin_at'=> Carbon::now()->timestamp,
                    'dinedin_account_name' => $this->account->name,
                    'dinedin_account_id' => $this->account->id,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_dinedin',$this->website_id,'user',$order->user_id,['order' => $order->_id]);
                }
                return response(['setDinedInStatus' => 1, 'msg'=> Lang::get('cpanel/orders/responses.markAsDinedInOrderSaved'),'now'=>Carbon::now()->timestamp]);
            }else{
                return response(['setDinedInStatus' => 0, 'msg'=> Lang::get('cpanel/orders/responses.markAsDinedInOrderSaveFaild')]);
            }
        }else if($request->has('findOrders')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $statuses = [];
            foreach($request->statuses as $status){
                array_push($statuses,(int)$status);
            }

            $orders = order::where(['website_id'=>$this->website_id])->whereIn('status',$statuses);
            if($request->user == ''){
                if($request->byGuests == 1 && $request->byUsers == 0){
                    $orders->where(['isGuest'=>true]);
                }else if($request->byGuests == 0 && $request->byUsers == 1){
                    $orders->where(['isGuest'=>false]);
                }
            }else{
                $orders->where(['user_id'=>(int)$request->user]);
            }
            if($request->orderNumber != ''){
                $orders->where('id',(int)$request->orderNumber);
            }
            $orderBy = $request->orderBy;
            if($request->orderBy == 'price'){$orderBy = 'total';}
            else if($request->orderBy == 'customer'){$orderBy = 'userName';}
            else if($request->orderBy == 'items'){$orderBy = 'order_items';}
            return response(['orders' => $orders->orderBy($orderBy,$request->sort)->skip($request->skip)->limit(10)->get(),'count' => $orders->count()]);
        }else if($request->has('getOrder')){

            $order = order::where('website_id',$this->website_id)
            ->where('_id',$request->getOrder)
            ->with('order_items')
            ->first();
            if($order == null){
                $order = order::where('website_id',$this->website_id)
                ->where('id',(int)$request->getOrder)
                ->with('order_items')
                ->first();
            }

            return response(['order' => $order]);
        }else if($request->has('changeOrderNotice')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeOrderNoticeStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changeOrderNoticeFail')]);
            }
            $old_orderNotice = $order->notice;
            if($order->update([
                'notice' => $request->newNotice,
                'noticeEdit_account_id' => $this->account->id,
                'noticeEdit_account_name' => $this->account->name,
            ])){
                foodmenuFunctions::notification('orders.update.notice',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.notice',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'new_orderNotice' => $order->notice,
                    'old_orderNotice' => $old_orderNotice,
                ],[
                    'order_id' => $request->order_id,
                    'notice' => $request->newNotice,
                    'noticeEdit_account_id' => $this->account->id,
                    'noticeEdit_account_name' => $this->account->name,
                ]);
                return response(['changeOrderNoticeStatus'=>1,'msg'=> Lang::get('cpanel/orders/responses.changeOrderNoticeSaved')]);
            }else{
                return response(['changeOrderNoticeStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changeOrderNoticeFail')]);
            }
        }else if($request->has('changePhoneNumber')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changePhoneNumberStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changePhoneNumberFail')]);
            }
            $old_phoneNumber = $order->phoneNumber;
            if($order->update([
                'phoneNumber' => $request->phoneNumber,
                'phoneEdit_account_id' => $this->account->id,
                'phoneEdit_account_name' => $this->account->name,
            ])){
                foodmenuFunctions::notification('orders.update.phoneNumber',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.phoneNumber',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'old_phoneNumber' => $old_phoneNumber,
                    'new_phoneNumber' => $order->phoneNumber,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $request->order_id,
                    'phoneNumber' => $request->phoneNumber,
                    'phoneEdit_account_id' => $this->account->id,
                    'phoneEdit_account_name' => $this->account->name,
                ]);
                return response(['changePhoneNumberStatus'=>1,'msg'=> Lang::get('cpanel/orders/responses.changePhoneNumberSaved')]);
            }else{
                return response(['changePhoneNumberStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changePhoneNumberFail')]);
            }
        }else if($request->has('changeAddress')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeAddressStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changeAddressFail')]);
            }
            $old_address = $order->address;
            if($order->update([
                'address' => $request->address,
                'addressEdit_account_id' => $this->account->id,
                'addressEdit_account_name' => $this->account->name,
            ])){
                foodmenuFunctions::notification('orders.update.address',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.address',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'old_address' => $old_address,
                    'new_address' => $order->address,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'order_id' => $request->order_id,
                    'address' => $request->address,
                    'addressEdit_account_id' => $this->account->id,
                    'addressEdit_account_name' => $this->account->name,
                ]);
                return response(['changeAddressStatus'=>1,'msg'=> Lang::get('cpanel/orders/responses.changeAddressSaved')]);
            }else{
                return response(['changeAddressStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changeAddressFail')]);
            }
        }else if($request->has('changeOrderType')){
            if(str_split($this->account->authorities)[0] == false){return;}
            if($request->type != 0 && $request->type != 1 && $request->type != 2){
                return response(['changeOrderTypeStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changeOrderTypeFail')]);
            }
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            $oldType = $order->type;
            if($order == null){
                return response(['changeOrderTypeStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changeOrderTypeFail')]);
            }
            if($order->status != 0 && $order->status != 1){
                return response(['changeOrderTypeStatus'=>0,'msg'=> Lang::get('cpanel/orders/responses.changeOrderTypeFail')]);
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
            if($request->type == 0){
                $deliveryCost = (double)$website->deliveryCost;
                if($website->useDeliveryTaxCost){
                    $tax = (double)$website->deliveryTaxCost;
                }else{
                    if((double)$website->deliveryTaxPercentage > 0){
                        $taxPercent = $website->deliveryTaxPercentage;
                        $tax = ((double)$website->deliveryTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }
            }else if($request->type == 1){
                if($website->usePickupTaxCost){
                    $tax = (double)$website->pickupTaxCost;
                }else{
                    if((double)$website->pickupTaxPercentage > 0){
                        $taxPercent = $website->pickupTaxPercentage;
                        $tax = ((double)$website->pickupTaxPercentage / 100) * $discount_itemsTotal;
                    }
                }
            }else if($request->type == 2){
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
                'type' => (int)$request->type,
                'typeEdit_account_name' => $this->account->name,
                'typeEdit_account_id' => $this->account->id,

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
                foodmenuFunctions::notification('orders.update.type',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.type',
                    'order_id'=> $order->_id,
                    'order_number' => $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'new_type' => $order->type,
                    'old_type' => $oldType,
                ],[
                    'order_id' => $request->order_id,
                    'type' => (int)$request->type,
                    'typeEdit_account_name' => $this->account->name,
                    'typeEdit_account_id' => $this->account->id,
                    'tax' => (double)$tax,
                    'taxPercent' => (double)$taxPercent,
                    'service' => (double)$service,
                    'servicePercent' => (double)$servicePercent,
                    'deliveryCost' => (double)$deliveryCost,
                    'total' => (double)$total,
                    'deliveryEdit_account_name' => null,
                    'deliveryEdit_account_id' => null,
                    'paymentMethod' => null,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_type_change',$this->website_id,'user',$order->user_id,[
                        'type' => (int)$request->newType,
                        'tax' => (double)$tax,
                        'taxPercent' => (double)$taxPercent,
                        'service' => (double)$service,
                        'servicePercent' => (double)$servicePercent,
                        'deliveryCost' => (double)$deliveryCost,
                        'total' => (double)$total,
                        'deliveryEdit_account_name' => null,
                        'deliveryEdit_account_id' => null,
                        'paymentMethod' => null,
                    ]);
                }
                return response([
                    'changeOrderTypeStatus'=>1,
                    'msg'=> Lang::get('cpanel/orders/responses.changeOrderTypeSaved'),
                    'tax' => (double)$tax,
                    'taxPercent' => (double)$taxPercent,
                    'service' => (double)$service,
                    'servicePercent' => (double)$servicePercent,
                    'deliveryCost' => (double)$deliveryCost,
                    'total' => (double)$total,
                ]);
            }

        }else if($request->has('changeDiscount')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            $oldDiscount = $order->discount;
            if($order == null){return response(['changeDiscountStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeDiscountFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeDiscountStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeDiscountFail')]);
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
                'discount_account_id' => $this->account->id,
                'discount_account_name' => $this->account->name,
            ])){
                foodmenuFunctions::notification('orders.update.discount',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.discount',
                    'order_id'=> $order->_id,
                    'order_number'=> $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'new_discount' => $order->discount,
                    'old_discount' => $oldDiscount,
                ],[
                    'order_id' => $request->order_id,
                    'discount' => (int)$discount,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    'discount_by' => 1,
                    'discount_promocode' => null,
                    'discount_promocode_id' => null,
                    'discount_account_id' => $this->account->id,
                    'discount_account_name' => $this->account->name,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_discount_change',$this->website_id,'user',$order->user_id,[
                        'order_id' => $request->order_id,
                        'discount' => (int)$discount,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'discount_by' => 1,
                        'discount_promocode' => null,
                        'discount_promocode_id' => null,
                    ]);
                }
                return response([
                    'changeDiscountStat' => 1,
                    'msg' => Lang::get('cpanel/orders/responses.changeDiscountSaved'),
                    'discount' => (int)$discount,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    // 'discount_by' => 1,
                    // 'discount_promocode' => null,
                    // 'discount_promocode_id' => null,
                    // 'discount_account_id' => $this->account->id,
                    // 'discount_account_name' => $this->account->name,
                ]);
            }else{
                return response(['changeDiscountStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeDiscountFail')]);
            }
        }else if($request->has('changeDeliveryCost')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            $oldDeliveryCost = $order->deliveryCost;
            if($order == null){return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeDeliverycostFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeDeliverycostFail')]);
            }
            if($order->type != 0){
                return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeDeliverycostFail')]);
            }
            $discount_itemsTotal = (double)$order->discount_itemsTotal;
            $tax = (double)$order->tax;
            $deliveryCost = (double)$request->deliveryCost;
            $total = $discount_itemsTotal + $tax + $deliveryCost;

            if($order->update([
                'deliveryCost' => (double)$deliveryCost,
                'total' => (double)$total,
                'deliveryEdit_account_name'=> $this->account->name,
                'deliveryEdit_account_id'=> $this->account->id,
            ])){
                foodmenuFunctions::notification('orders.update.deliveryCost',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.deliveryCost',
                    'order_id'=> $order->_id,
                    'order_number'=> $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'new_deliveryCost' => $order->deliveryCost,
                    'old_deliveryCost' => $oldDeliveryCost,
                ],[
                    'order_id' => $request->order_id,
                    'deliveryCost' => (double)$deliveryCost,
                    'total' => (double)$total,
                    'deliveryEdit_account_name'=> $this->account->name,
                    'deliveryEdit_account_id'=> $this->account->id,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_deliveryCost_change',$this->website_id,'user',$order->user_id,[
                        'order_id' => $request->order_id,
                        'deliveryCost' => (double)$deliveryCost,
                        'total' => (double)$total,
                    ]);
                }

                return response([
                    'changeDeliveryCostStat' => 1,
                    'msg' => Lang::get('cpanel/orders/responses.changeDeliverycostSaved'),
                    'deliveryCost' => (double)$deliveryCost,
                    'total' => (double)$total,
                ]);
            }else{
                return response(['changeDeliveryCostStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeDeliverycostFail')]);
            }
        }else if($request->has('addItemToOrder')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order == null){return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.addItemToOrderFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.addItemToOrderFail')]);
            }
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }

            $product = product::where(['website_id' => $this->website_id,'id'=>$request->item['product_id']])
                ->with(['product_options'=>function($q){
                    $q->with('product_option_selections');
                }])->first();
            if($product == null){return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.addItemToOrderFail')]);}

            $itemSelections = [];
            $itemTotal = (double)$product->price;

            if(!empty($request->item['order_item_option_selections'])){
                foreach($request->item['order_item_option_selections'] as $itemOption){
                    $productOption = $product->product_options->where('id',$itemOption['product_option_id'])->first();
                    $productSelection = $productOption->product_option_selections->where('id',$itemOption['product_option_selection_id'])->first();
                    if(!$productOption || !$productSelection){return response(['addItemToOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.addItemToOrderFail')]);}
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
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                    ]);
                }
                foodmenuFunctions::notification('orders.update.addItem',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.addItem',
                    'order_id'=> $order->_id,
                    'order_number'=> $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'new_qty' => $request->item['qty'],
                    'product_name' => $product->name,
                    'product_id' => $product->id,
                ],[
                    'order_id' => $request->order_id,
                    'item' => $addItem,
                    'itemsTotal' => (double)$itemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    'itemsEdit_account_name'=> $this->account->name,
                    'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_item_added',$this->website_id,'user',$order->user_id,[
                        'order_id' => $request->order_id,
                        'item' => $addItem,
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                    ]);
                }

                return response([
                    'addItemToOrderStat' => 1,
                    'msg'=>Lang::get('cpanel/orders/responses.addItemToOrderSaved'),
                    'item' => $addItem,
                    'itemsTotal' => (double)$itemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    // 'itemsEdit_account_name'=> $this->account->name,
                    // 'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
            }
        }else if($request->has('removeItemFromOrder')){
            if(str_split($this->account->authorities)[0] == false){return;}

            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order == null){return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.removeItemToOrderFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.removeItemToOrderFail')]);
            }
            if($order->order_items->count() == 1){return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.removeItemToOrderFail')]);}
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }

            $item = $order->order_items()->find($request->item_id);
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
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                    ]);
                }
                foodmenuFunctions::notification('orders.update.removeItem',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.removeItem',
                    'order_id'=> $order->_id,
                    'order_number'=> $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_name' => $productName,
                    'product_id' => $productId,
                ],[
                    'order_id' => $request->order_id,
                    'item_id' => $request->item_id,
                    'itemsTotal' => (double)$itemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    'itemsEdit_account_name'=> $this->account->name,
                    'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_item_removed',$this->website_id,'user',$order->user_id,[
                        'order_id' => $request->order_id,
                        'item_id' => $request->item_id,
                        'itemsTotal' => (double)$itemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                    ]);
                }
                return response([
                    'removeItemFromOrderStat' => 1,
                    'msg' => Lang::get('cpanel/orders/responses.removeItemToOrderSaved'),
                    'itemsTotal' => (double)$itemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    // 'itemsEdit_account_name'=> $this->account->name,
                    // 'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
            }else{
                return response(['removeItemFromOrderStat' => 0,'msg' => Lang::get('cpanel/orders/responses.removeItemToOrderFail')]);
            }
        }else if($request->has('changeItemNotice')){
            if(str_split($this->account->authorities)[0] == false){
                return;
            }
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order == null){return response(['changeItemNoticeStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemNoticeFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeItemNoticeStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemNoticeFail')]);
            }
            $item = $order->order_items()->find($request->item_id);
            $old_itemNotice = $item->itemNotice;
            if($item->update([
                'itemNotice' => $request->itemNotice
            ])){
                foodmenuFunctions::notification('orders.update.itemNotice',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.itemNotice',
                    'order_id'=> $order->_id,
                    'order_number'=> $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_name' => $item->productName,
                    'product_id' => $item->product_id,
                    'new_itemNotice' => $item->itemNotice,
                    'old_itemNotice' => $old_itemNotice,
                ],[
                    'order_id' => $request->order_id,
                    'item_id' => $request->item_id,
                    'itemNotice' => $request->itemNotice,
                ]);

                return response(['changeItemNoticeStat' => 1,'msg' => Lang::get('cpanel/orders/responses.changeItemNoticeSaved')]);
            }else{
                return response(['changeItemNoticeStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemNoticeFail')]);
            }
        }else if($request->has('changeItemQty')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order == null){return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemQtyFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemQtyFail')]);
            }
            $item = $order->order_items()->find($request->item_id);
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }
            if($request->action != 'minus' && $request->action != 'plus'){
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemQtyFail')]);
            }
            if($request->action == 'minus' && $item->qty == 1){
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemQtyFail')]);
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


            $old_qty = $item->qty;
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
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                    ]);
                }

                foodmenuFunctions::notification('orders.update.qty',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.qty',
                    'order_id'=> $order->_id,
                    'order_number'=> $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_name' => $item->productName,
                    'product_id' => $item->product_id,
                    'old_qty' => $old_qty,
                    'new_qty' => $newQty,
                ],[
                    'order_id' => $request->order_id,
                    'item_id' => $request->item_id,
                    'item_total' => $newItemTotal,
                    'item_qty' => $newQty,
                    'itemsTotal' => (double)$newItemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    'itemsEdit_account_name'=> $this->account->name,
                    'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_item_qtyChanged',$this->website_id,'user',$order->user_id,[
                        'order_id' => $request->order_id,
                        'item_id' => $request->item_id,
                        'item_total' => $newItemTotal,
                        'item_qty' => $newQty,
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                    ]);
                }

                return response([
                    'changeItemQtyStat' => 1,
                    'msg' => Lang::get('cpanel/orders/responses.changeItemQtySaved'),
                    'item_total' => $newItemTotal,
                    'item_qty' => $newQty,
                    'itemsTotal' => (double)$newItemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    // 'itemsEdit_account_name'=> $this->account->name,
                    // 'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
            }else{
                return response(['changeItemQtyStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemQtyFail')]);
            }

        }else if($request->has('changeItemSelection')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $order = order::where(['website_id'=>$this->website_id,'_id'=>$request->order_id])->first();
            if($order == null){return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemSelectionFail')]);}
            if($order->status != 0 && $order->status != 1 && $order->status != 3 && $order->status != 4 && $order->status != 8){
                return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemSelectionFail')]);
            }
            if($order->itemsEdit_account_id == null){
                $orderOldItems = $order->order_items->toArray();
            }
            $item = $order->order_items()->find($request->item_id);
            $oldItemTotal = (double)$item->total;

            $newItemTotal = (double)$item->price;
            $newItemSelectionsArr = [];
            $selection = product_option_selection::where(['website_id'=>$this->website_id,'id'=>$request->selection_id])->select(['id','name','price'])->first();
            if($selection == null){
                return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemSelectionFail')]);
            }
            foreach($item->order_item_option_selections as $key => $itemOption){
                if($itemOption['product_option_id'] == $request->option_id){
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
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                        'order_items_original' => $orderOldItems,
                    ]);
                }else{
                    $order->update([
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                        'itemsEdit_account_name'=> $this->account->name,
                        'itemsEdit_account_id'=> $this->account->id,
                    ]);
                }
                foodmenuFunctions::notification('orders.update.selection',[
                    'website_id' => $this->website_id,
                    'code' => 'order.update.selection',
                    'order_id'=> $order->_id,
                    'order_number'=> $order->id,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_name' => $item->productName,
                    'product_id' => $item->product_id,
                    'option_name' => $optionName,
                    'old_selection' => $oldSelectionName,
                    'new_selection' => $selection->name,
                ],[
                    'order_id' => $request->order_id,
                    'item_id' => $request->item_id,
                    'item_total' => $newItemTotal,
                    'item_order_item_option_selections' => $newItemSelectionsArr,
                    'itemsTotal' => (double)$newItemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    'itemsEdit_account_name'=> $this->account->name,
                    'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
                if(!$order->isGuest){
                    foodmenuFunctions::notification_website('order_item_selectionChanged',$this->website_id,'user',$order->user_id,[
                        'order_id' => $request->order_id,
                        'item_id' => $request->item_id,
                        'item_total' => $newItemTotal,
                        'item_order_item_option_selections' => $newItemSelectionsArr,
                        'itemsTotal' => (double)$newItemsTotal,
                        'discount_itemsTotal' => (double)$discount_itemsTotal,
                        'tax' => (double)$tax,
                        'service' => (double)$service,
                        'total' => (double)$total,
                    ]);
                }
                return response([
                    'changeItemSelectionStat' => 1,
                    'msg' => Lang::get('cpanel/orders/responses.changeItemSelectionSaved'),
                    'item_total' => $newItemTotal,
                    'item_order_item_option_selections' => $newItemSelectionsArr,
                    'itemsTotal' => (double)$newItemsTotal,
                    'discount_itemsTotal' => (double)$discount_itemsTotal,
                    'tax' => (double)$tax,
                    'service' => (double)$service,
                    'total' => (double)$total,
                    'itemsEdit_account_name'=> $this->account->name,
                    'itemsEdit_account_id'=> $this->account->id,
                    'order_items_original' => $order->order_items_original,
                ]);
            }else{
                return response(['changeItemSelectionStat' => 0,'msg' => Lang::get('cpanel/orders/responses.changeItemSelectionFail')]);
            }
        }else if($request->has('getOrderActivities')){
            if(str_split($this->account->authorities)[0] == false){return;}
            $activities = activityLog::where(['website_id' => (int)$this->website_id, 'order_id' => $request->order_id])->orderBy('created_at','desc')->get();
            return response([
                'activities' => $activities,
            ]);
        }
    }
}
