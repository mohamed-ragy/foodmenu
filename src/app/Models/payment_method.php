<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class payment_method extends Model
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
        'website_id',
        'paymentMethod_id',
        'country',
        'fingerprint',
        'brand',
        'exp_month',
        'exp_year',
        'last4',
        'is_default',
    ];

    protected $hidden = [
        'paymentMethod_id','fingerprint',
    ];
}
