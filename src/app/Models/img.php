<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class img extends Model
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
    protected $fillabel =[
        'website_id',
        'name',
        'url',
        'thumbnailUrl',
        'extension',
        'size',
        'height','width',
        'created_at'
    ];

    public function websites(){
        return $this->belongsTo(website::class);
    }

    public function categories(){
        return $this->hasMany(categories::class);
    }
    public function products(){
        return $this->hasMany(product::class);
    }
}
