<?php

namespace Database\Seeders;

use Database\Seeders\articles_en\basics\foodmenu_customer_support;
use Database\Seeders\articles_en\basics\your_accounts_help_tickets;
use Database\Seeders\articles_en\basics\the_share_tool;
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
        $this->call([foodmenu_customer_support::class]); // Foodmenu’s Customer Support
        $this->call([your_accounts_help_tickets::class]); // Your-Accounts-Help-Tickets
        $this->call([the_share_tool::class]); // The Share Tool
    }
}
