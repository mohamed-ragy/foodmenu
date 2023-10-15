<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class financial_reports extends Model
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
    protected $fillable = ['website_id','month','year','expenses','month_expenses','items_total','tax','service','delivery','total'];
    protected $casts = [
        'expenses' => 'array',
        'month_expenses' => 'array',
    ];
    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
