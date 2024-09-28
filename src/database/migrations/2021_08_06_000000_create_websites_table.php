<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWebsitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('websites', function (Blueprint $table) {
            $table->id();
            $table->string('plan')->default('standard');
            $table->string('billingPeriod')->nullable();

            $table->string('customer_id')->nullable();
            $table->integer('balance')->default(0);
            $table->string('subscription_id')->nullable();
            $table->string('subscription_status')->nullable();
            $table->integer('subscription_start_period')->nullable();
            $table->integer('subscription_end_period')->nullable();

            $table->boolean('active')->default(true);
            $table->string('domainName')->unique();
            $table->string('user_domainName')->nullable()->unique();
            $table->json('user_domainNameServers')->nullable();

            $table->json('languages');

            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->text('delivery_range')->nullable();
            $table->string('url')->unique();
            $table->string('timeZone');
            $table->boolean('hour12')->default(true);
            $table->string('country_code')->nullable();

            $table->json('phoneNumbers');
            $table->json('addresses');
            $table->json('currencies');
            $table->json('websiteNames');
            $table->json('websiteDescriptions');
            $table->json('website_announcements');
            $table->json('website_receiptMsgs');
            $table->json('website_privacyPolicy');

            $table->string('facebookLink')->default('');
            $table->string('youtubeLink')->default('');
            $table->string('linkedinLink')->default('');
            $table->string('twitterLink')->default('');
            $table->string('instagramLink')->default('');
            $table->string('restaurantEmail')->default('');

            $table->json('expenses');
            $table->json('month_expenses');
            $table->json('trendingProducts')->nullable();

            $table->string('template_id');
            $table->integer('style_version')->default(1);
            $table->string('icon')->nullable();
            $table->string('logo')->nullable();
            $table->string('metaImg')->nullable();
            $table->bigInteger('icon_id')->nullable();
            $table->bigInteger('logo_id')->nullable();
            $table->bigInteger('metaImg_id')->nullable();

            $table->boolean('productReviews')->default(true);
            $table->boolean('guestReviews')->default(false);
            $table->boolean('collectReviews')->default(true);
            $table->boolean('guestOrders')->default(true);
            $table->boolean('acceptDeliveryOrders24')->default(true);
            $table->boolean('acceptPickupOrders24')->default(false);
            $table->boolean('discountAnnouncement')->default(true);
            $table->boolean('cancelOrder')->default(true);
            $table->boolean('dineinWorkingHours')->default(true);
            $table->boolean('liveChat')->default(true);
            $table->boolean('guestLiveChat')->default(true);
            $table->integer('cart_lifeTime')->default(10080);
            $table->boolean('langPopup')->default(false);
            $table->boolean('cookies_msg')->default(true);
            $table->boolean('fastLoading')->default(false);
            $table->integer('printerWidth')->default(80);

            $table->boolean('useDelivery')->default(true);
            $table->boolean('cash_on_delivery')->default(true);
            $table->boolean('card_on_delivery')->default(true);
            $table->decimal('deliveryCost',10,2)->default(0.00);
            $table->boolean('showDeliveryCostChangable')->default(false);
            $table->decimal('deliveryTaxCost',10,2)->default(0.00);
            $table->decimal('deliveryTaxPercentage',10,2)->default(0.00);
            $table->boolean('useDeliveryTaxCost')->default(false);
            $table->decimal('deliveryMinimumCharge',10,2)->default(0.00);
            $table->boolean('deliveryMinimumChargeIncludes')->default(false);
            $table->integer('averageDeliveryTime')->default(0);
            $table->json('workingDays_delivery');

            $table->boolean('usePickup')->default(true);
            $table->boolean('cash_at_restaurant')->default(true);
            $table->boolean('card_at_restaurant')->default(true);
            $table->decimal('pickupTaxCost',10,2)->default(0.00);
            $table->decimal('pickupTaxPercentage',10,2)->default(0.00);
            $table->boolean('usePickupTaxCost')->default(false);
            $table->decimal('pickupMinimumCharge',10,2)->default(0.00);
            $table->boolean('pickupMinimumChargeIncludes')->default(false);
            $table->integer('averagePickupTime')->default(0);
            $table->json('workingDays_pickup');

            $table->decimal('dineInTaxCost',10,2)->default(0.00);
            $table->decimal('dineInTaxPercentage',10,2)->default(0.00);
            $table->boolean('useDineInTaxCost')->default(false);
            $table->decimal('dineInServiceCost',10,2)->default(0.00);
            $table->decimal('dineInServicePercentage',10,2)->default(0.00);
            $table->boolean('useDineInServiceCost')->default(false);
            $table->json('workingDays_dinein');



            $table->integer('created_at');
            $table->integer('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('websites');
    }
}
