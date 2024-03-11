<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class template extends Model
{
    protected $connection = 'mysql';
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
        'home',
        'created_at',

    ];

    protected $casts = [
        'home' => 'array',

    ];
    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
