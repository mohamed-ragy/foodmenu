<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class promocode extends Model
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
        'code',
        'is_active',
        'is_delivery',
        'is_pickup',
        'is_guest',
        'is_oneUse',
        'is_expires',
        'expires_at',
        'discount',
        'minimum',
        'cap',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'websites_id','id');
    }
    public function users(){
        return $this->belongsToMany(User::class,'users_promocodes','promocode_id','user_id');
        // return $this->belongsToMany(User::class,'users_promocodes','promocode_id','user_id')->withTimestamps();
    }
}
