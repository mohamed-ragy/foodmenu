<?php

namespace Database\Seeders;

use Database\Seeders\articles_en\basics\foodmenu_customer_support;
use Database\Seeders\articles_en\basics\your_accounts_help_tickets;
use Database\Seeders\articles_en\basics\the_share_tool;
use Database\Seeders\articles_en\basics\the_control_panels_navigation_bar;
use Database\Seeders\articles_en\basics\employing_live_chat_on_your_website;
use Database\Seeders\articles_en\basics\live_chat_features;
use Database\Seeders\articles_en\basics\your_product_reviews;
use Database\Seeders\articles_en\basics\guide_tips;
use Database\Seeders\articles_en\basics\your_restaurants_website_domain;
use Database\Seeders\articles_en\basics\the_activity_log;
use Database\Seeders\articles_en\basics\financial_reports;
use Database\Seeders\articles_en\basics\restaurant_expenses;
use Database\Seeders\articles_en\basics\your_websites_privacy_policy;

use Database\Seeders\articles_en\settings\your_restaurants_home_delivery_service;
use Database\Seeders\articles_en\settings\your_restaurants_order_pickup_service;
use Database\Seeders\articles_en\settings\your_restaurants_dinein_service;
use Database\Seeders\articles_en\settings\adjusting_your_restaurants_working_hours;
use Database\Seeders\articles_en\settings\scheduling_happy_hour;
use Database\Seeders\articles_en\settings\the_guide_mode;
use Database\Seeders\articles_en\settings\adjusting_the_control_panel_view;
use Database\Seeders\articles_en\settings\ordering_system_settings;
use Database\Seeders\articles_en\settings\review_system_settings;
use Database\Seeders\articles_en\settings\live_chat_system_settings;
use Database\Seeders\articles_en\settings\configuring_your_website_languages;
use Database\Seeders\articles_en\settings\changing_your_website_languages;
use Database\Seeders\articles_en\settings\time_zone_and_country;
use Database\Seeders\articles_en\settings\website_system_settings;
use Database\Seeders\articles_en\settings\adjusting_the_control_settings;
use Database\Seeders\articles_en\settings\managing_your_restaurant_information;
use Database\Seeders\articles_en\settings\adjusting_the_alert_notifications;

use Illuminate\Database\Seeder;

class articles_en extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //basics
        $this->call([foodmenu_customer_support::class]); //
        $this->call([your_accounts_help_tickets::class]); //
        $this->call([the_share_tool::class]); //
        $this->call([the_control_panels_navigation_bar::class]); //
        $this->call([employing_live_chat_on_your_website::class]); //
        $this->call([live_chat_features::class]); //
        $this->call([your_product_reviews::class]); //
        $this->call([guide_tips::class]); //
        $this->call([your_restaurants_website_domain::class]); //
        $this->call([the_activity_log::class]); //
        $this->call([financial_reports::class]); //
        $this->call([restaurant_expenses::class]); //
        $this->call([your_websites_privacy_policy::class]); //
        //settings
        $this->call([your_restaurants_home_delivery_service::class]); //
        $this->call([your_restaurants_order_pickup_service::class]); //
        $this->call([your_restaurants_dinein_service::class]); //
        $this->call([adjusting_your_restaurants_working_hours::class]); //
        $this->call([scheduling_happy_hour::class]); //
        $this->call([the_guide_mode::class]); //
        $this->call([adjusting_the_control_panel_view::class]); //
        $this->call([ordering_system_settings::class]); //
        $this->call([review_system_settings::class]); //
        $this->call([live_chat_system_settings::class]); //
        $this->call([configuring_your_website_languages::class]); //
        $this->call([changing_your_website_languages::class]); //
        $this->call([time_zone_and_country::class]); //
        $this->call([website_system_settings::class]); //
        $this->call([adjusting_the_control_settings::class]); //
        $this->call([managing_your_restaurant_information::class]); //
        $this->call([adjusting_the_alert_notifications::class]); //

    }
}
