<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class websiteText extends Model
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
    protected $fillable =[
        'website_id','text','lang',
    ];

    protected $casts = [
        'text' => 'json',
    ];

    public function websites(){
        return $this->belongsTo(website::class);
    }
}
