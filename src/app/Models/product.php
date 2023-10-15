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
        'website_id','sort','category_id','img_id',
        'name','name_en','name_ar','name_eg','name_fr','name_de','name_it','name_es','name_ru','name_ua',
        'description_en','description_ar','description_eg','description_fr','description_de','description_it',
        'description_es','description_ru','description_ua','price','availability','rating','ratings_sum','ordered_sum',
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
