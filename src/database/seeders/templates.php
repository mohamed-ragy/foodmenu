<?php

namespace Database\Seeders;

use App\Models\template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class templates extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        template::where('name','Test template')->delete();
        $tempalte = template::create([
            'website_id' => 1,
            'name' => 'Test template',
            'colors' => [
                'default_color_theme' => 'color_1_2',
                'c1' => ['r'=>255, 'g'=>255, 'b'=>255],
                'c2' => ['r'=>0, 'g'=>48, 'b'=>73],
                'c3' => ['r'=>102, 'g'=>155, 'b'=>188],
                'c4' => ['r'=>253, 'g'=>240, 'b'=>213],
            ],
            'fonts' => [],
            'spacing' => [],
            'form' => [
                'button' => [],
                'input' => [],
                'checkbox' => [],
            ]
        ]);
    }
}
