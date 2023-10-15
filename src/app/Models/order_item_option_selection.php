<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class order_item_option_selection extends Model
{
    use HasFactory;
    protected  $connection = 'mongodb_orders';
    // protected $collection = 'order_item_option_selections';

    protected $fillable = [
        'product_option_id','sort','product_option_selection_id','price','optionName','selectionName'
    ];

    // public function products(){
    //     return $this->belongsTo(product::class,'product_id','id');
    // }
    // public function product_options(){
    //     return $this->belongsTo(product_option::class,'product_option_id','id');
    // }
    // public function product_option_selections(){
    //     return $this->belongsTo(product_option_selection::class,'product_option_selection_id','id');
    // }
}
