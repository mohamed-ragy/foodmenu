<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'adminName' => 'Ragy',
            'password' => bcrypt(".ugdg, dhlh t[h[h"),
            'role' => 1,
        ]);

        $this->call([
            templates::class,
            // fake_articles::class,
            articles_en::class,
            demo::class,
            tickets::class,
            liveChats::class,
        ]);

    }
}
