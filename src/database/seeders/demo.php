<?php

namespace Database\Seeders;

use Database\Seeders\demo\americanDiner;
use Database\Seeders\demo\asian;
use Database\Seeders\demo\burgers;
use Database\Seeders\demo\cafe;
use Database\Seeders\demo\casualDining;
use Database\Seeders\demo\chinese;
use Database\Seeders\demo\coffeeShop;
use Database\Seeders\demo\desserts;
use Database\Seeders\demo\donuts;
use Database\Seeders\demo\fastFood;
use Database\Seeders\demo\fineDining;
use Database\Seeders\demo\friedChicken;
use Database\Seeders\demo\icecream;
use Database\Seeders\demo\indian;
use Database\Seeders\demo\italian;
use Database\Seeders\demo\mediterranean;
use Database\Seeders\demo\mexican;
use Database\Seeders\demo\middleEastern;
use Database\Seeders\demo\patisserie;
use Database\Seeders\demo\pizzeria;
use Database\Seeders\demo\sandwiches;
use Database\Seeders\demo\seafood;
use Database\Seeders\demo\steakhouse;
use Database\Seeders\demo\sushiBar;
use Database\Seeders\demo\vegan;
use Database\Seeders\demo\vegetarian;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class demo extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            pizzeria::class,
            americanDiner::class,
            // casualDining::class,
            // fineDining::class,
            // italian::class,
            // burgers::class,
            // sandwiches::class,
            // donuts::class,
            // patisserie::class,
            // desserts::class,
            // fastFood::class,
            // vegan::class,
            // mexican::class,
            // vegetarian::class,
            // mediterranean::class,
            // asian::class,
            // indian::class,
            // steakhouse::class,
            // chinese::class,
            // sushiBar::class,
            // friedChicken::class,
            // seafood::class,
            // icecream::class,

            // coffeeShop::class, //canceled
            // cafe::class,
            // middleEastern::class, //canceled
        ]);
    }
}
