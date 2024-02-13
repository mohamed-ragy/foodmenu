<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ticket_msg extends Model
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
        'author',
        'website_id',
        'admin_id',
        'ticket_id',
        'msg',
    ];

    public function tickets(){
        return $this->belongsTo(ticket::class,'id');
    }
    public function admins(){
        return $this->belongsTo(Admin::class,'admin_id');
    }
    public function websites(){
        return $this->belongsTo(website::class,'id');
    }
}
