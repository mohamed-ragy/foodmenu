<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class help_en_text extends Model
{
    use HasFactory;
    
    protected $filabled =['sort','help_en_tut_id','html'];
    public $timestamps = false;
    public function help_en_tuts(){
        return $this->belongsTo(help_en_tut::class,'help_en_tut_id','id');
    }
}
