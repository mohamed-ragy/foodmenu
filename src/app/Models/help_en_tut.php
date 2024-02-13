<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class help_en_tut extends Model
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
    protected $filabled =['id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'];

    public function help_sections(){
        return $this->hasMany(help_en_text::class,'help_en_tut_id','id');
    }
}
