<?php

namespace Database\Seeders;

use Database\Seeders\articles_en\article_1;
use Database\Seeders\articles_en\article_2;
use Database\Seeders\articles_en\article_3;
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
        $this->call([article_1::class]); // Foodmenu’s Customer Support
        $this->call([article_2::class]); // Your-Accounts-Help-Tickets
        $this->call([article_3::class]); // The Share Tool
    }
}
