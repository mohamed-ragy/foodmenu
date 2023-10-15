<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $guard = 'admin';

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
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'adminName','password','role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password','role'
    ];

    public function getAuthIdentifierForBroadcasting()
    {
        return 'admin-' . $this->{$this->getAuthIdentifierName()};
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];


    public function ticket_msgs(){
        return $this->hasMany(ticket_msg::class);
    }

}
