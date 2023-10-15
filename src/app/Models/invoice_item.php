<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoice_item extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable =[
        'invoice_id','period_start','period_end','description','currency','amount',
    ];

    public function invoice(){
        return $this->belongsTo(invoice::class,'invoice_id','id');
    }
}
