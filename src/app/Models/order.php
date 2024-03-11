<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class order extends Model
{
    use HasFactory;
    // protected $dates = ['placed_at','accepted_at','out_for_delivery_at','ready_for_pickup_at','canceled_at','delivered_at','pickedUp_at','diningin_at','dinedin_at'];
    protected $collection = 'orders';
    protected  $connection = 'mongodb';
    public $timestamps = false;
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
        'accepted_at','accepted_account_name','accepted_account_id',

        'out_for_delivery_at','out_for_delivery_account_name','out_for_delivery_account_id',
        'delivered_at','delivered_by','delivered_account_name','delivered_account_id','delivered_delivery_name','delivered_delivery_id',

        'ready_for_pickup_at','ready_for_pickup_account_name','ready_for_pickup_account_id',
        'pickedUp_at','pickedUp_account_name','pickedUp_account_id',

        'diningin_at','diningin_account_name','diningin_account_id',
        'dinedin_at','dinedin_account_name','dinedin_account_id',

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
            //status
            //0 => pending(Pending)
            //1 => accepted(accepted)
            //3 => out_for_delivery(On the way to you)
            //4 => ready_for_pickup(Ready for pickup)
            //8 => diningin(Dining in)

            //5 => delivered(Delivered)
            //6 => pickedUp(Picked Up)
            //7 => dinedIn(Dined in)
            //2 => canceled(Canceled)

            // ('type');
            //0 => delivery
            //1 => pickup
            //2 => dineIn

            //placed_by
            //0->account,
            //1->user,

            //delivered by
            //0->account
            //1->delivery man

            //canceledby
            //0->account
            //1->user

            //discountby
            //0->no discount
            //1->account
            //2->happy hour
            //3->promocode

            //payment methods
            //"cash_on_delivery"
            //"card_on_delivery"
            //"cash_at_restaurant"
            //"card_at_restaurant"
