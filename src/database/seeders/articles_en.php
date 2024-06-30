<?php

namespace Database\Seeders;

use Database\Seeders\articles_en\basics\foodmenu_customer_support;
use Database\Seeders\articles_en\basics\your_accounts_help_tickets;
use Database\Seeders\articles_en\basics\the_share_tool;
use Database\Seeders\articles_en\basics\the_control_panels_navigation_bar;
use Database\Seeders\articles_en\basics\employing_live_chat_on_your_website;
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
    }
}
