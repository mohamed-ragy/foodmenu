<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product_option extends Model
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
        'website_id','product_id','name','sort','name_en','name_ar','name_eg',
        'name_fr','name_de','name_it','name_es','name_ru','name_ua',
    ];

    public function products(){
        return $this->belongsTo(product::class);
    }
    public function product_option_selections(){
        return $this->hasMany(product_option_selection::class);
    }
    public function order_item_option_selections(){
        return $this->hasMany(order_item_option_selection::class);
    }
}

