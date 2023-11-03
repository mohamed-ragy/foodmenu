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
        'sort','name','website_id','img_id','img','thumbnail','names','descriptions'
    ];
    protected $casts = [
        'names' => 'array',
        'descriptions' => 'array',

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
