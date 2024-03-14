<?php

namespace App\Models;

use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\Model;

class template extends Model
{
    protected  $connection = 'mongodb';
    protected $collection = 'templates';
    public $timestamps = false;
    protected static function boot() {
        parent::boot();

        static::creating(function ($post) {
            $post->created_at = Carbon::now()->timestamp;
            $post->updated_at = Carbon::now()->timestamp;
        });

        static::updating(function ($post) {
            $post->updated_at = Carbon::now()->timestamp;
        });

    }
    protected $fillable = [
        'website_id',
        'name',
        'colors','fonts','spacing','form',
        'home','category','product','about_us','privacy_policy','all_products',
        'cart','place_order','track_order','order_history','addToCart',
        'header','footer','announcement','popup','live_chat','mobileNav','scrollbar',

        'created_at',

    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
