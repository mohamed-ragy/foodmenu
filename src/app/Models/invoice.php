<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoice extends Model
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
        'website_id','invoice_id',
        'status','period_start','period_end',
        'currency','total','amount_due','amount_paid','amount_remaining','amount_refunded',
        'starting_balance','ending_balance',
        'paid_at','created',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function invoice_items(){
        return $this->hasMany(invoice_item::class,'invoice_id','id');
    }
}
