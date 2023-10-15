<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ticket extends Model
{
    use HasFactory;
    protected $fillable = ['website_id','code','status','title','msg','comments','imgs','language','created_at'];
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
    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function ticket_msgs(){
        return $this->hasMany(ticket_msg::class);
    }

}
