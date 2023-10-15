<?php

namespace App\Models;

// use App\Http\Middleware\account;
use Carbon\Carbon;
// use App\Models\Account as ModelsAccount;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cpanelSettings extends Model
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
    // public $timestamps = false;

    protected $fillable =[
        'account_id',
        'guideMode',
        'helpIcons',
        'hotKeys',
        'autoHelp',
        'guideHints',
        'bigSideMenu',
        'statusBar',
        'darkMode',
        'tooltip',
        'oneAlert',
        'dClickConfirm',
        'shareReminder',
        'chatPopup',
        'NewOrderAlerts',
        'DeliveredOrderAlerts',
        'NewUserAlerts',
        'NewReviewAlerts',
        'CanceledOrderAlerts',
        'onlineUserAlert',
        'onlineGuestAlert',
        'normalAlert',
        'errorAlert',
        'successAlert',
        'warningAlert',
        'newMsgAlert',

    ];
    public function accounts(){
        return $this->belongsTo(Account::class);
    }


}
