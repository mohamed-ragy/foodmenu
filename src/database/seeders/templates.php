<?php

namespace Database\Seeders;

use App\Models\template;
use App\Models\website;
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
        $template = template::create([
            'website_id' => 1,
            'name' => 'Test template',
            'settings' => [
                'metrics_color' => 'rgba(102,155,188,1)',
            ],
            'website_colors' => [
                'color_theme' => [
                    'color_1' => 'rgba(255,255,255,1)',
                    'color_2' => 'rgba(0,48,73,1)',
                    'color_3' => 'rgba(102,155,188,1)',
                    'color_4' => 'rgba(253,240,213,1)',
                ],
                'other_colors' => [
                    'color_star' => 'rgba(255,190,11,1)',
                    'color_error' => 'rgba(91,186,111,1)',
                    'color_success' => 'rgba(193,18,31,1)',
                    'color_warning' => 'rgba(251,86,7,1)',
                ],
                'color_history' => [

                ]
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
                'page_color_theme' => 'color_1_2',
                'pageTransition' => 'fade',
                'transitionDuration' => '300ms',
                'smooth_scroll' => '0',
            ],
            'form_elements' => [
                'spacing' => '10px',
                'form_align' => 'flex-start',
                'input' => [
                    'input_text_align' => 'center',
                    'input_padding_y' => '7px',
                    'input_padding_x' => '10px',
                    'input_border_style' => 'solid solid solid solid',
                    'input_border_width' => '1px',
                    'input_border_radius' => '5px 5px 5px 5px',
                    'input_border_color' => 'rgba(0,0,0,.5)',
                    'input_font_size' => '1em',
                    'input_font_color' => 'rgba(0,0,0,1)',
                    'input_label_font_size' => '.9em',
                    'input_label_margin' => '3px',
                    'input_bg_color' => 'rgba(0,0,0,0.1)',

                    'input_focus_outline_width' => '1px',
                    'input_focus_outline_color' => 'rgba(0,0,0,0.1)',
                    'input_focus_bg_color' => 'rgba(0,0,0,0.1)',
                ],
                'checkbox' => [
                    'checkbox_border_radius' => '5px' ,
                    'checkbox_size' => '1em',
                    'checkbox_color' => 'rgba(0,0,0,0.1)',
                    'checkbox_checkMark_color' => 'rgba(0,0,0,0.1)',
                ],
                'button1' => [
                    'button1_padding_y' => '10px',
                    'button1_padding_x' => '25px',
                    'button1_border_radius' => '5px 5px 5px 5px',
                    'button1_font_size' => '1em',
                    'button1_font_color' => 'rgba(0,0,0,0.1)',
                    'button1_bg_color' => 'rgba(0,0,0,0.1)',
                    'button1_outline_color' => 'rgba(0,0,0,0.1)',
                    'button1_outline_width' => '2px',
                    'button1_hover_font_color' => 'rgba(0,0,0,0.1)',
                    'button1_hover_bg_color' => 'rgba(0,0,0,0.1)',
                    'button1_hover_outline_width' => '1px',
                    'button1_hover_outline_color' => 'rgba(0,0,0,0.1)',
                    'button1_click_font_color' => 'rgba(0,0,0,0.1)',
                    'button1_click_bg_color' => 'rgba(0,0,0,0.1)',
                    'button1_click_outline_width' => '0px',
                    'button1_click_outline_color' => 'rgba(0,0,0,0.1)',
                    'button1_disabled_font_color' => 'rgba(0,0,0,0.1)',
                    'button1_disabled_bg_color' => 'rgba(0,0,0,0.1)',
                    'button1_disabled_outline_width' => '0px',
                    'button1_disabled_outline_color' => 'rgba(0,0,0,0.1)',
                ],
                'button2' => [
                    'button2_padding_y' => '10px',
                    'button2_padding_x' => '25px',
                    'button2_border_radius' => '5px 5px 5px 5px',
                    'button2_font_size' => '1em',
                    'button2_font_color' => 'rgba(0,0,0,0.1)',
                    'button2_bg_color' => 'rgba(0,0,0,0.1)',
                    'button2_outline_color' => 'rgba(0,0,0,0.1)',
                    'button2_outline_width' => '2px',
                    'button2_hover_font_color' => 'rgba(0,0,0,0.1)',
                    'button2_hover_bg_color' => 'rgba(0,0,0,0.1)',
                    'button2_hover_outline_width' => '1px',
                    'button2_hover_outline_color' => 'rgba(0,0,0,0.1)',
                    'button2_click_font_color' => 'rgba(0,0,0,0.1)',
                    'button2_click_bg_color' => 'rgba(0,0,0,0.1)',
                    'button2_click_outline_width' => '0px',
                    'button2_click_outline_color' => 'rgba(0,0,0,0.1)',
                    'button2_disabled_font_color' => 'rgba(0,0,0,0.1)',
                    'button2_disabled_bg_color' => 'rgba(0,0,0,0.1)',
                    'button2_disabled_outline_width' => '0px',
                    'button2_disabled_outline_color' => 'rgba(0,0,0,0.1)',
                ],
            ],
            'loading_spinner' => [
                'key' => '5',
                'elem' => '<div class="loading_spinner_5_:size:"><div class="dot1"></div><div class="dot2"></div><div class="dot3"></div></div>',
                'colors' => [
                    'loading_spinner_c1' => 'rgb(237, 237, 237)',
                    'loading_spinner_c2' => 'rgba(102,155,188,1)',
                ],
            ],
            'home' => [],
        ]);
        website::where('id',1)->update(['template_id'=>$template->_id]);

    }
}
