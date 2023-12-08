<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Account extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $guard = 'account';

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
        'website_id',
        'register',
        'newsLetter',
        'is_master',
        'authorities',
        'name',

        'email',
        'email_verified_at',
        'email_verification_code',
        'email_verification_code_sent_at',

        'phone',
        'phone_verified_at',
        'phone_verification_code',
        'phone_verification_code_sent_at',

        'password',
        'password_changed_at',

        'isInvisible',
        'lastSeen',
        'language',
        'helpTips',
        'account_unblock_code',
        'recover_password_code',
        'recover_password_code_sent_at',
        'password_fails',
    ];


    protected $hidden = [
        'register',
        'email_verification_code',

        'phone_verification_code',

        'password',
        'password_changed_at',

        'remember_token',
        'account_unblock_code',
        'recover_password_code',
        'recover_password_code_sent_at',
    ];

    protected $casts = [
        'helpTips' => 'array',

    ];


    public function getAuthIdentifierForBroadcasting()
    {
        return 'account' . $this->{$this->getAuthIdentifierName()};
    }

    public function help_tips(){
        return $this->hasMany(helpTip::class);
    }
    public function emails(){
        return $this->hasMany(emails::class);
    }
    public function phones(){
        return $this->hasMany(phones::class);
    }
    public function websites(){
        return $this->belongsTo(website::class,'website_id','id');
    }
    public function cpanelSettings(){
        return $this->hasOne(cpanelSettings::class);
    }
    public function account_verifications(){
        return $this->hasMany(account_verifications::class);
    }
}
