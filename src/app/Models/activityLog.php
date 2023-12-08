<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Carbon\Carbon;

class activityLog extends Model
{
    use HasFactory;
    protected $collection = 'activity_logs';
    protected  $connection = 'mongodb_activity_logs';
    public $timestamps = false;
    protected static function boot() {
        parent::boot();

        static::creating(function ($post) {
            $post->created_at = Carbon::now()->timestamp;
        });

        static::updating(function ($post) {
            $post->updated_at = Carbon::now()->timestamp;
        });

    }
    protected $fillable = [
        'code','website_id',
        'user_id','user_name',
        'account_id','account_name',
        'product_id','product_name',
        'category_id','category_name',
        'delivery_id','delivery_name',
        'product_review_id','reviewsSum',
        'img_id','img_name',
        'promocode_id','promocode_name',
        'subaccount_id','subaccount_name',

        //
        'order_id','order_number',
        'new_qty','old_qty',
        'option_id','option_name',
        'selection_id','selection_name',
        'new_selection','old_selection',
        'new_itemNotice','old_itemNotice',
        'new_orderNotice','old_orderNotice',
        'new_phoneNumber' ,'old_phoneNumber',
        'new_address','old_address',
        'new_type','old_type',
        'new_deliveryCost','old_DeliveryCost',
        'new_discount','old_discount',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
