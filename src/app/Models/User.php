<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\HybridRelations;
use Carbon\Carbon;
class User extends Authenticatable
{
    use HasFactory, Notifiable, HybridRelations;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $connection = 'mysql';
    protected $table = 'users';
    protected $guard = 'user';
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
        'email',
        'password',
        'resetPassword_token',
        'resetPassword_token_sent_at',
        'website_id',
        'name',
        'phoneNumber',
        'address',
        'cart',
        'cart_lastUpdate',
        'isBanned',

        'lastSeen',
        'lastChat',
        'lastMsg_id',

        'lat','lng',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'resetPassword_token',
    ];
    public function getAuthIdentifierForBroadcasting()
    {
        return 'user' . $this->{$this->getAuthIdentifierName()};
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */

    public function websites(){
        return $this->belongsTo(website::class,'websites_id','id');
    }
    public function product_reviews(){
        return $this->hasMany(product_review::class);
    }
    public function orders(){
        return $this->hasMany(order::class);
    }
    public function live_chats(){
        return $this->hasMany(liveChat::class,'user_id','id');
    }
    public function last_msg(){
        return $this->belongsTo(liveChat::class,'lastMsg_id','_id');
    }
    public function promocodes(){
        return $this->belongsToMany(promocode::class,'users_promocodes','user_id','promocode_id');
        // return $this->belongsToMany(promocode::class,'users_promocodes','user_id','promocode_id')->withTimestamps();
    }

}
