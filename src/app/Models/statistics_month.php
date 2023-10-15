<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\Model;

class statistics_month extends Model
{
    use HasFactory;
    // protected $dates = ['created_at','updated_at'];
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
    protected $collection = 'statistics_months';
    protected  $connection = 'mongodb_statistics';
    protected $fillable = [
        'website_id','month','year',
        'so','do','po','co','di',
        'users',
        'products',
        'deliveries',
    ];
}
