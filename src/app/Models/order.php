<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class order extends Model
{
    use HasFactory;
    // protected $dates = ['placed_at','received_at','withDelivery_at','readyToPickup_at','canceled_at','delivered_at','pickedUp_at','diningin_at','dinein_at'];
    protected $collection = 'orders';
    protected  $connection = 'mongodb_orders';
    protected $fillable = [

        'website_id','id',

        'isGuest','user_id','userName','phoneNumber','address','lat','lng',

        'type','status','notice','paymentMethod','collectReviewSeen',

        'discount',
        'itemsTotal','discount_itemsTotal',
        'tax','taxPercent',
        'service','servicePercent',
        'deliveryCost',
        'total',
        'order_items',

        'deliveryName','delivery_id',


        'placed_at','placed_by','placed_account_name','placed_account_id',
        'received_at','received_account_name','received_account_id',

        'withDelivery_at','withDelivery_account_name','withDelivery_account_id',
        'delivered_at','delivered_by','delivered_account_name','delivered_account_id','delivered_delivery_name','delivered_delivery_id',

        'readyToPickup_at','readyToPickup_account_name','readyToPickup_account_id',
        'pickedUp_at','pickedUp_account_name','pickedUp_account_id',

        'diningin_at','diningin_account_name','diningin_account_id',
        'dinein_at','dinein_account_name','dinein_account_id',

        'canceled_at','canceled_by','canceled_account_name','canceled_account_id',

        'discount_by','discount_promocode','discount_promocode_id','discount_account_name','discount_account_id',

        'itemsEdit_account_name','itemsEdit_account_id','order_items_original',

        'deliveryEdit_account_name','deliveryEdit_account_id',

        'typeEdit_account_name', 'typeEdit_account_id',

        'noticeEdit_account_name', 'noticeEdit_account_id',

        'phoneEdit_account_name', 'phoneEdit_account_id',

        'addressEdit_account_name', 'addressEdit_account_id',
    ];


    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function users(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function order_items(){
        return $this->embedsMany(order_item::class);
    }
    public function deliveries(){
        return $this->belongsTo(delivery::class,'delivery_id','id');
    }
}
