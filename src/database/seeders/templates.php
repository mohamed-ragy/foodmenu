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
            'website_colors' => [
                'c1' => ['r'=>255, 'g'=>255, 'b'=>255],
                'c2' => ['r'=>0, 'g'=>48, 'b'=>73],
                'c3' => ['r'=>102, 'g'=>155, 'b'=>188],
                'c4' => ['r'=>253, 'g'=>240, 'b'=>213],
                'c_star' => ['r'=>255, 'g'=>190, 'b'=>11],
                'c_success' => ['r'=>91, 'g'=>186, 'b'=>111],
                'c_error' => ['r'=>193, 'g'=>18, 'b'=>31],
                'c_warning' => ['r'=>251, 'g'=>86, 'b'=>7],
            ],
            'font_style' => [
                'title' => 'rubik',
                'title_weight' => 'bold',
                'title_line_height' => '1.2em',
                'title_letter_spacing' => '0.04em',
                'paragraph' => 'signikaNegative',
                'paragraph_weight' => 'normal',
                'paragraph_line_height' => '1.2em',
                'paragraph_letter_spacing' => '0.04em',
            ],
            'page_setup' => [
                'max_width' => '1800px',
                'page_margin' => '0vw',
                'color_theme' => 'color_1_2',
                'pageTransition' => 'fade',
                'transitionDuration' => '300ms',
            ],
            'form_elements' => [
                'spacing' => '10px',
                'input' => [
                    'padding_y' => '7px',
                    'padding_x' => '10px',

                    'border_style' => 'solid solid none solid',
                    'border_width' => '1px',
                    'border_radius' => '3px',
                    'border_color' => ['r'=>200,'g'=>120,'b'=>200],
                    'focus_outline_width' => '1px',

                    'font_size' => '1em',
                    'font_color' => ['r'=>100,'g'=>20,'b'=>10],
                    'label_font_size' => '.9em',
                    'label_margin' => '5px',

                    'background_fill' => true,
                    'input_bg_color' => ['r'=>245,'g'=>245,'b'=>245],
                ],
                'checkbox' => [],
                'button' => [],
            ]
        ]);
    }
}
