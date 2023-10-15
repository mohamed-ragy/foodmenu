<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class order_item extends Model
{
    use HasFactory;
    protected  $connection = 'mongodb_orders';
    // protected $collection = 'order_items';

    protected $fillable = [
        'product_id','productName','price','qty','total','order_item_option_selections','itemNotice'
    ];


    public function products(){
        return $this->belongsTo(product::class,'product_id','id');
    }
}
