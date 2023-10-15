<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class account_verifications extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id','phone_verification_code_sent_at','email_verification_code_sent_at',
    ];
    public $timestamps = false;

    public function accounts(){
        return $this->belongsTo(Account::class,'account_id','id');
    }
}
