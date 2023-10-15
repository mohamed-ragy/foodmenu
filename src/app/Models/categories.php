<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categories extends Model
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
        'sort','name','website_id','img_id','name_en','name_eg',
        'name_ar','name_fr','name_it','name_de','name_es','name_ru','name_ua',
        'description_en','description_ar','description_eg','description_fr','description_de','description_it',
        'description_es','description_ru','description_ua',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function imgs(){
        return $this->belongsTo(img::class,'img_id','id');
    }
    public function products(){
        return $this->hasMany(product::class,'category_id','id');
    }
}
