<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product_review extends Model
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
      'product_id','product_name','user_id','userName','rate','review','website_id','posted_at',
    ];

    public function users(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function products(){
        return $this->belongsTo(product::class,'product_id','id');
    }
    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
