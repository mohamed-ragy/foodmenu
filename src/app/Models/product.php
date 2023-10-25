<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class product extends Model
{
    use HasFactory;
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
        'website_id','sort','category_id','img_id','name',
        'names',
        'descriptions',
        'price','availability','rating','ratings_sum','ordered_sum',
    ];
    protected $casts = [
        'names' => 'array',
        'descriptions' => 'array',

    ];
    public function websites(){
        return $this->belongsTo(website::class);
    }
    public function imgs(){
        return $this->belongsTo(img::class,'img_id','id');
    }
    public function categories(){
        return $this->belongsTo(categories::class,'category_id','id');
    }
    public function product_options(){
        return $this->hasMany(product_option::class);
    }
    public function product_reviews(){
        return $this->hasMany(product_review::class);
    }
    public function order_items(){
        return $this->hasMany(order_item::class);
    }

    public function order_item_option_selections(){
        return $this->hasMany(order_item_option_selection::class);
    }
}
