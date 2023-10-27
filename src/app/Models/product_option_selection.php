<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product_option_selection extends Model
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
        'website_id','product_option_id','sort','isDefault','price','name','names'
    ];
    protected $casts = [
        'names' => 'array',
    ];
    public function product_options(){
        return $this->belongsTo(product_option::class,'product_option_id','id');
    }
    public function order_item_option_selections(){
        return $this->hasMany(order_item_option_selection::class);
    }
}
