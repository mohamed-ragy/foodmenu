<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class liveChat extends Model
{
    use HasFactory;

    // protected $dates = ['sent_at','delivered_at','seen_at','deleted_at'];
    protected $collection = 'live_chats';
    protected  $connection = 'mongodb';
    protected $fillable = [
        'website_id',
        'user_id',
        'guest_id',
        'account_id',
        'author',
        'message',
        'sent_at',
        'seen_at',
        'deleted_at',
        'is_seen',
        'is_deleted',
        'deleted_by',
        // 'delivered_at',
        // 'is_delivered',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function users(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function guests(){
        return $this->belongsTo(User::class,'guest_id','id');
    }
    // public function last_msg(){
    //     return $this->hasOne(User::class,'lastMsg_id','_id');
    // }
}
