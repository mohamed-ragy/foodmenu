<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Carbon\Carbon;

class activityLog extends Model
{
    use HasFactory;
    protected $collection = 'activity_logs';
    protected  $connection = 'mongodb';
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
        'account_id','account_name',
        'delivery_id','delivery_name',
        'product_review_id','reviewsSum',
        'img_id','img_name',
        //
        'user_id','user_name',
        'old_user','new_user',
        //
        'old_dinein_settings','new_dinein_settings',
        'old_pickup_settings','new_pickup_settings',
        'old_delivery_settings','new_delivery_settings',
        'old_working_hours','new_working_hours','day','service',
        //
        'lang_code','lang_name',
        'old_lang','new_lang',
        //
        'promocode_id','promocode_name','is_active',
        'old_promocode','new_promocode',
        //
        'old_system_settings','new_system_settings',
        'old_country','new_country',
        'old_timeZone','new_timeZone',
        'old_icon','new_icon',
        'old_logo','new_logo',
        'old_metaImg','new_metaImg',
        //
        'old_phone','new_phone',
        'old_email','new_email',
        //
        'subaccount_id','subaccount_name',
        'new_authorities','old_authorities',
        //
        'category_id','category_name',
        'product_id','product_name','availability',
        'new_category','old_category',
        'new_img','old_img',
        'new_names','old_names',
        'new_descriptions','old_descriptions',
        'new_price','old_price',
        'new_availability','old_availability',
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
        'new_deliveryCost','old_deliveryCost',
        'new_discount','old_discount',
        'domain',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
