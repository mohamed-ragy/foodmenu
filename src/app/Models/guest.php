<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\HybridRelations;
use Carbon\Carbon;

class guest extends Authenticatable
{
    use HasFactory,Notifiable, HybridRelations;

    protected $connection = 'mysql';
    protected $table = 'guests';
    protected $guard = 'guest';
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
    // public $incrementing = false;

    protected $fillable = [
        'id',
        'number',
        'number',
        'ip',
        'password',
        'website_id',
        'lastSeen',
        'lastChat',
        'lastMsg_id',
    ];
    protected $hidden = [
        'password',
        'remember_token',
        'ip',
    ];
    // public function getIncrementing(): bool
    // {
    //     return false;
    // }
    // public static function boot()
    // {
    //     parent::boot();

    //     self::creating(function ($model) {
    //         $model->id = 'guest_' . ($model::count() + 1);
    //     });
    // }

    public function getAuthIdentifierForBroadcasting()
    {
        return 'guest' . $this->{$this->getAuthIdentifierName()};
    }

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function live_chats(){
        return $this->hasMany(liveChat::class,'guest_id','id');
    }
    public function last_msg(){
        return $this->belongsTo(liveChat::class,'lastMsg_id','_id');
    }
}
