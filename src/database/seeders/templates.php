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
                'form_align' => 'flex-start',
                'input' => [
                    'text_align' => 'center',
                    'padding_y' => '7px',
                    'padding_x' => '10px',
                    'border_style' => 'solid solid none solid',
                    'border_width' => '1px',
                    'border_radius' => '5px 5px 5px 5px',
                    'border_color' => ['r'=>200,'g'=>120,'b'=>200],
                    'font_size' => '1em',
                    'font_color' => ['r'=>100,'g'=>20,'b'=>10],
                    'label_font_size' => '.9em',
                    'label_margin' => '3px',
                    'background_fill' => '1',
                    'input_bg_color' => ['r'=>245,'g'=>245,'b'=>245],

                    'focus_outline_width' => '1px',
                    'focus_outline_color' => ['r'=>100,'g'=>20,'b'=>10],
                    'focus_border_color' => ['r'=>120,'g'=>100,'b'=>150],
                    'focus_background_fill' => '1',
                    'focus_bg_color' => ['r'=>250,'g'=>250,'b'=>250],
                ],
                'checkbox' => [
                    'border_radius' => '5px',
                    'size' => 'calc(1em - 4px)',
                    'color' => ['r'=>200,'g'=>120,'b'=>200],
                    'check_mark_color' => ['r'=>255,'g'=>255,'b'=>255],
                ],
                'button1' => [
                    'padding_y' => '10px',
                    'padding_x' => '25px',
                    'border_radius' => '5px 5px 5px 5px',
                    'font_size' => '1em',
                    'font_color' => ['r'=>255, 'g'=>255, 'b'=>255],
                    'bg_color' => ['r'=>0, 'g'=>48, 'b'=>73],
                    'outline_width' => '2px',
                    'outline_color' => ['r'=>200,'g'=>120,'b'=>200],
                    'hover_font_color' => ['r'=>235, 'g'=>235, 'b'=>235],
                    'hover_bg_color' => ['r'=>20, 'g'=>68, 'b'=>93],
                    'hover_outline_width' => '1px',
                    'hover_outline_color' => ['r'=>190,'g'=>110,'b'=>190],
                    'click_font_color' => ['r'=>255, 'g'=>255, 'b'=>255],
                    'click_bg_color' => ['r'=>0, 'g'=>48, 'b'=>73],
                    'click_outline_width' => '0px',
                    'click_outline_color' => ['r'=>190,'g'=>110,'b'=>190],

                    'disabled_font_color' => ['r'=>255, 'g'=>255, 'b'=>255],
                    'disabled_bg_color' => ['r'=>0, 'g'=>48, 'b'=>73],
                    'disabled_outline_width' => '0px',
                    'disabled_outline_color' => ['r'=>190,'g'=>110,'b'=>190],
                ],
                'button2' => [
                    'padding_y' => '10px',
                    'padding_x' => '25px',
                    'border_radius' => '5px 5px 5px 5px',
                    'font_size' => '1em',

                    'font_color' => ['r'=>255, 'g'=>255, 'b'=>255],
                    'bg_color' => ['r'=>0, 'g'=>48, 'b'=>73],
                    'outline_width' => '2px',
                    'outline_color' => ['r'=>200,'g'=>120,'b'=>200],

                    'hover_font_color' => ['r'=>235, 'g'=>235, 'b'=>235],
                    'hover_bg_color' => ['r'=>20, 'g'=>68, 'b'=>93],
                    'hover_outline_width' => '1px',
                    'hover_outline_color' => ['r'=>190,'g'=>110,'b'=>190],

                    'click_font_color' => ['r'=>255, 'g'=>255, 'b'=>255],
                    'click_bg_color' => ['r'=>0, 'g'=>48, 'b'=>73],
                    'click_outline_width' => '0px',
                    'click_outline_color' => ['r'=>190,'g'=>110,'b'=>190],

                    'disabled_font_color' => ['r'=>255, 'g'=>255, 'b'=>255],
                    'disabled_bg_color' => ['r'=>0, 'g'=>48, 'b'=>73],
                    'disabled_outline_width' => '0px',
                    'disabled_outline_color' => ['r'=>190,'g'=>110,'b'=>190],
                ],
            ]
        ]);
    }
}
