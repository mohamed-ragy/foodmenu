<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class help_en_articles extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $filabled =['id','sort','title_id','title','description','icon','category','keyWords','rating'];

    public function sections(){
        return $this->hasMany(help_en_sections::class,'article_id','id');
    }
}
