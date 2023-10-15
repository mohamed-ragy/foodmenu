<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Carbon\Carbon;

class notification extends Model
{
    use HasFactory;
    protected $collection = 'notifications';
    protected  $connection = 'mongodb_notifications';
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
        'code','seen','website_id',
        'financialReport_id','month','year',
        'ticket_id',
        'user_id','userName',
        'order_id',
        'product_review_id','reviewsSum',
        'product_id','productName',
        'delivery_id','deliveryName',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
