<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class delivery extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $guard = 'delivery';
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
        'deliveryName',
        'password',
        'lastSeen',
    ];

    protected $hidden = [
        'password',
    ];
    public function getAuthIdentifierForBroadcasting()
    {
        return 'delivery-' . $this->{$this->getAuthIdentifierName()};
    }

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function orders(){
        return $this->hasMany(order::class);
    }
}
