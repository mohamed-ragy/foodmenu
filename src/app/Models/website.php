<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\HybridRelations;
use Carbon\Carbon;

class website extends Model
{
    use HasFactory,HybridRelations;
    protected $connection = 'mysql';
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
        'plan','billingPeriod',
        'customer_id','balance','subscription_id','subscription_status','subscription_start_period','subscription_end_period',
        'active',
        'url',
        'domainName',
        'specialDomainName',
        'lat','lng',
        'timeZone',
        'hour12',
        'country_code',
        'restaurantEmail',
        'phoneNumbers',
        'addresses',
        'currencies',
        'websiteNames',
        'websiteDescriptions',
        'website_announcements',
        'website_receiptMsgs',
        'website_privacyPolicy',

        'languages',
        // 'defaultLanguage','receiptLanguage',
        // 'customLang_flag','customLang_name','customLang_rtl','customLang_code',
        'facebookLink','youtubeLink','linkedinLink','twitterLink','instagramLink',

        'expenses',
        'month_expenses',
        'trendingProducts',

        'website_colors',
        'useCustomColors',
        'customColorsHexCode',
        'icon','logo','template',
        'intro',
        'info',
        'ourStory',
        'slideShow',
        'gallery',

        'productReviews',
        'guestReviews',
        'collectReviews',
        'guestOrders',
        'cancelOrder',
        'dineinWorkingHours',
        'liveChat',
        'guestLiveChat',
        'discountAnnouncement',
        'cookies_msg',
        'langPopup',
        'printerWidth',
        'cart_lifeTime',
        'fastLoading',

        'useDelivery',
        'cashOnDelivery',
        'cardOnDelivery',
        'acceptDeliveryOrders24',
        'deliveryCost',
        'showDeliveryCostChangable',
        'deliveryTaxCost',
        'deliveryTaxPercentage',
        'useDeliveryTaxCost',
        'deliveryMinimumCharge',
        'deliveryMinimumChargeIncludes',
        'averageDeliveryTime',
        'workingDays_delivery',

        'usePickup',
        'cashOnPickup',
        'cardOnPickup',
        'acceptPickupOrders24',
        'pickupTaxCost',
        'pickupTaxPercentage',
        'usePickupTaxCost',
        'pickupMinimumCharge',
        'pickupMinimumChargeIncludes',
        'averagePickupTime',
        'workingDays_pickup',

        'dineInTaxPercentage',
        'dineInTaxCost',
        'useDineInTaxCost',
        'dineInServicePercentage',
        'dineInServiceCost',
        'useDineInServiceCost',
        'workingDays_dinein',
    ];
    protected $casts = [
        'trendingProducts' => 'array',
        'addresses' => 'array',
        'currencies' => 'array',
        'websiteNames' => 'array',
        'websiteDescriptions' => 'array',
        'website_announcements' => 'array',
        'phoneNumbers' => 'array',
        'website_receiptMsgs' => 'array',
        'website_privacyPolicy' => 'array',
        'languages' => 'array',
        'expenses' => 'array',
        'month_expenses' => 'array',
        'customColorsHexCode' => 'array',
        'intro' => 'array',
        'info' => 'array',
        'ourStory' => 'array',
        'slideShow' => 'array',
        'workingDays_delivery' => 'array',
        'workingDays_pickup'  => 'array',
        'workingDays_dinein' => 'array',
    ];
    protected $hidden = [
        'customer_id','subscription_id',
    ];
    public function accounts(){
        return $this->hasMany(Account::class,'website_id','id');
    }
    public function invoices(){
        return $this->hasMany(invoice::class,'website_id','id');
    }
    public function paymentMethods(){
        return $this->hasMany(payment_method::class,'website_id','id');
    }
    public function users(){
        return $this->hasMany(User::class,'website_id','id');
    }
    public function promocodes(){
        return $this->hasMany(promocode::class,'website_id','id');
    }
    public function guests(){
        return $this->hasMany(guest::class,'website_id','id');
    }
    public function tickets(){
        return $this->hasMany(ticket::class,'website_id');
    }
    public function imgs(){
        return $this->hasMany(img::class);
    }
    public function categories(){
        return $this->hasMany(categories::class,'website_id');
    }
    public function products(){
        return $this->hasMany(product::class);
    }
    public function product_reviews(){
        return $this->hasMany(product_review::class);
    }
    public function orders(){
        return $this->hasMany(order::class);
    }
    public function deliveries(){
        return $this->hasMany(delivery::class);
    }
    public function notifications(){
        return $this->hasMany(notification::class);
    }
    public function live_chats(){
        return $this->hasMany(liveChat::class,'website_id');
    }
    public function ticket_msgs(){
        return $this->hasMany(ticket_msg::class);
    }
    public function activity_logs(){
        return $this->hasMany(activityLog::class,'website_id','id');
    }
    public function website_texts(){
        return $this->hasOne(websiteText::class,'website_id');
    }
    public function cron_jobs(){
        return $this->hasMany(cron_jobs::class,'website_id','id');
    }
    public function financial_reports(){
        return $this->hasMany(financial_reports::class,'website_id','id');
    }
    public function bugs(){
        return $this->hasMany(bug::class,'website_id');
    }

}
