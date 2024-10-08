<?php

namespace App\Models;

use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\Model;

class template extends Model
{
    protected  $connection = 'mongodb';
    protected $collection = 'templates';
    public $timestamps = false;
    protected static function boot() {
        parent::boot();

        static::creating(function ($post) {
            $post->created_at = Carbon::now()->timestamp;
            $post->updated_at = Carbon::now()->timestamp;
        });

        static::updating(function ($post) {
            $post->updated_at = Carbon::now()->timestamp;
        });

    }
    protected $fillable = [
        'website_id','name',

        'website_colors','page_setup',

        'home','category','product','about_us','privacy_policy','all_products',
        'cart','place_order','track_order','order_history','addToCart',
        'header','footer','announcement','popup','live_chat','mobileNav','scrollbar',

        'created_at',

    ];

    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function encode(){
        $template = $this->getAttributes();
        $template['settings'] = json_decode($template['settings'],true);
        $template['website_colors'] = json_decode($template['website_colors'],true);
        $template['page_setup'] = json_decode($template['page_setup'],true);
        $template['form_elements'] = json_decode($template['form_elements'],true);
        $template['website_header'] = json_decode($template['website_header'],true);
        $template['popup_window'] = json_decode($template['popup_window'],true);
        $template['home'] = json_decode($template['home'],true);
        $template['login'] = json_decode($template['login'],true);
        $template['signup'] = json_decode($template['signup'],true);
        $template['reset_password_1'] = json_decode($template['reset_password_1'],true);
        $template['reset_password_2'] = json_decode($template['reset_password_2'],true);
        $template['reset_password_3'] = json_decode($template['reset_password_3'],true);
        $template['account'] = json_decode($template['account'],true);

        return $template;
    }
}
