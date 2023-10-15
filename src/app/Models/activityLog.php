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
        'code','website_id','user_id','account_id','product_id','category_id','delivery_id','order_id','product_review_id','reviewsSum','img_id','promocode_id','subaccount_id',
        'user_name','account_name','product_name','category_name','delivery_name','qty','component_name','img_name','promocode_name','subaccount_name',

        'option_id','selection_id',
        'option_name','old_selection_name','selection_name',

        'oldEmail','newEmail',
        'oldType','newType',
        'deliveryCost','oldDeliveryCost',
        'discount','oldDiscount',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
