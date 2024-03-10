<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class help_en_sections extends Model
{
    use HasFactory;
    protected $filabled =['id','sort','article_id','title','html','keyWords','priority'];
    public $timestamps = false;
    public function article(){
        return $this->belongsTo(help_en_articles::class,'article_id','id');
    }
}
