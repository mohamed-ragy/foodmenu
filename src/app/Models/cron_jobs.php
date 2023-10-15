<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cron_jobs extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $fillable = [
        'website_id',
        'type',
        'timeZone',
    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
}
