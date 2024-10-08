<?php

namespace Database\Seeders;

use App\Models\template;
use App\Models\website;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use League\Flysystem\Visibility;

class templates extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // [
            // 'name' => '',
            // 'tag' => '',
            // 'class_selector' => '',
            // 'css' => [],
            // 'css_mobile' => [],
            // 'background' => '',
            // 'background_image' => [],
            // 'class' => '',
            // 'attr' => [],
            // 'text' => [],// only key if basic text and if template text if will be key of the text and val:{} contain text of rach lang with the lang code as key
            // 'children' => [],
        // ],
        // $background = [
        //     'type' =>'none',
        //     'color' =>'rgba(var(--color_1_7),1)',
        //     'gradient' => 'linear-gradient(90deg, rgba(var(--color_1_5),1) 0%, rgba(var(--color_2_5),1) 100%)',
        //     'backdrop_filter' => 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
        //     'backdrop_filter_color' =>'rgba(var(--color_1_7),.2)',
        //     'background_image' => '/storage/imgs/cpanel/noimg.png',
        //     'background_attachment' => 'local',
        //     'background_size' => 'cover',
        //     'background_repeat' => 'no-repeat',
        //     'background_position' => '50% 50%',
        //     'background_blend_mode' => 'normal',
        //     'background_blend_mode_color' =>'rgba(var(--color_1_2),1)',
        // ];
        // $background_color = $background;
        // $background_color['type'] = 'color';
        // $animation = [
        //     'name' => 'no_animation',
        //     'repeat' => '0',
        //     'up_out_duration' => '0ms',
        //     'up_out_delay' => '0ms',
        //     'up_out_timing_function' => 'linear',
        //     'up_out_transform' => 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        //     'up_out_transform_origin' => 'center',
        //     'up_out_filter' => 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        //     'up_duration' => '0ms',
        //     'up_delay' => '0ms',
        //     'up_timing_function' => 'linear',
        //     'up_transform' => 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        //     'up_transform_origin' => 'center',
        //     'up_filter' => 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        //     'in_duration' => '0ms',
        //     'in_delay' => '0ms',
        //     'in_timing_function' => 'linear',
        //     'in_transform' => 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        //     'in_transform_origin' => 'center',
        //     'in_filter' => 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        //     'down_duration' => '0ms',
        //     'down_delay' => '0ms',
        //     'down_timing_function' => 'linear',
        //     'down_transform' => 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        //     'down_transform_origin' => 'center',
        //     'down_filter' => 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        //     'down_out_duration' => '0ms',
        //     'down_out_delay' => '0ms',
        //     'down_out_timing_function' => 'linear',
        //     'down_out_transform' => 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        //     'down_out_transform_origin' => 'center',
        //     'down_out_filter' => 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        // ];
        $driver = [
            'svg_style' => [
                'position' => 'absolute',
                'bottom' => '0',
                'left' => '0',
                'width' => '100%',
                'overflow' => 'hidden',
                'line-height' => '0',
                'display' => 'block',
            ],
            'svg_attr' => [
                'preserveAspectRatio' => 'none',
                'viewBox' => '0 0 1200 120',
            ],
            'paths' => [[
                'path' => 'M1200 120L0 16.48 0 0 1200 0 1200 120z',
                'color' => 'rgba(var(--color_4_7),1)',
            ]],
            'css' => [
                'height' => '100px',
            ],
            'css_mobile' => [
                'height' => '100px',
            ],
            'position' => 'bottom',
            'flip' => '0',
        ];
        // $filter = 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(var(--color_4_1),0))';
        // $transform = 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)';
        template::where('website_id',2)->delete();
        $template = template::create([
            'website_id' => 2,
            'name' => 'Test template',
            'settings' => json_encode([
                'view' => 'desktop',
                'mobile_view_width' => '414',
                'mobile_view_height' => '736',
                'selected_page' => 'home',
                'selected_popup' => null,
                'website_popup_opened' => '0',
                'selected_website_form' => 'login',
                'animations' => [

                ],
            ]),
            // 'website_colors' => json_encode([
            //     'gradation' => [
            //         'color_1_gradation' => '50',
            //         'color_2_gradation' => '50',
            //         'color_3_gradation' => '50',
            //         'color_4_gradation' => '50',
            //     ],
            //     'colors' => [
            //         'color_1_1' => ['r'=>'0','g'=>'0','b'=>'0'],
            //         'color_1_2' => ['r'=>'42','g'=>'42','b'=>'42'],
            //         'color_1_3' => ['r'=>'84','g'=>'84','b'=>'84'],
            //         'color_1_4' => ['r'=>'126','g'=>'126','b'=>'126'],
            //         'color_1_5' => ['r'=>'168','g'=>'168','b'=>'168'],
            //         'color_1_6' => ['r'=>'210','g'=>'210','b'=>'210'],
            //         'color_1_7' => ['r'=>'252','g'=>'252','b'=>'252'],

            //         'color_2_1' => ['r'=>'0','g'=>'0','b'=>'0'],
            //         'color_2_2' => ['r'=>'42','g'=>'42','b'=>'42'],
            //         'color_2_3' => ['r'=>'84','g'=>'84','b'=>'84'],
            //         'color_2_4' => ['r'=>'126','g'=>'126','b'=>'126'],
            //         'color_2_5' => ['r'=>'168','g'=>'168','b'=>'168'],
            //         'color_2_6' => ['r'=>'210','g'=>'210','b'=>'210'],
            //         'color_2_7' => ['r'=>'252','g'=>'252','b'=>'252'],

            //         'color_3_1' => ['r'=>'0','g'=>'0','b'=>'0'],
            //         'color_3_2' => ['r'=>'42','g'=>'42','b'=>'42'],
            //         'color_3_3' => ['r'=>'84','g'=>'84','b'=>'84'],
            //         'color_3_4' => ['r'=>'126','g'=>'126','b'=>'126'],
            //         'color_3_5' => ['r'=>'168','g'=>'168','b'=>'168'],
            //         'color_3_6' => ['r'=>'210','g'=>'210','b'=>'210'],
            //         'color_3_7' => ['r'=>'252','g'=>'252','b'=>'252'],

            //         'color_4_1' => ['r'=>'0','g'=>'0','b'=>'0'],
            //         'color_4_2' => ['r'=>'42','g'=>'42','b'=>'42'],
            //         'color_4_3' => ['r'=>'84','g'=>'84','b'=>'84'],
            //         'color_4_4' => ['r'=>'126','g'=>'126','b'=>'126'],
            //         'color_4_5' => ['r'=>'168','g'=>'168','b'=>'168'],
            //         'color_4_6' => ['r'=>'210','g'=>'210','b'=>'210'],
            //         'color_4_7' => ['r'=>'252','g'=>'252','b'=>'252'],
            //     ],
            //     'custom_colors' => [
            //         '_star' => ['r'=>'255','g'=>'190','b'=>'11'],
            //         '_success' => ['r'=>'91','g'=>'186','b'=>'111'],
            //         '_error' => ['r'=>'193','g'=>'18','b'=>'31'],
            //         '_warning' => ['r'=>'251','g'=>'86','b'=>'7'],
            //     ],
            // ]),
            // 'page_setup' => json_encode([
            //     'mobile_max_width' => '720px',
            //     "max_width" => "1400px",
            //     "pageTransition" => "fade",
            //     "transitionDuration" => "648ms",
            //     "smooth_scroll" => "0",
            //     "smooth_scroll_distance" => "678px",
            //     "smooth_scroll_duration" => "835ms",
            //     'font_style' => (object)[],
            //     'font_color' => 'rgba(var(--color_4_2),1)',
            //     'bg_color' => 'rgba(var(--color_4_7),1)',
            //     'font_size' => '1em',
            //     'line_height' => '1.3em',
            //     'letter_spacing' => '0px',
            // ]),
            'form_elements' => json_encode([
                'website_form' => [
                    'general_class' => '1',
                    'type' => 'form_elements',
                    'class_selector' => 'website_form',
                    'font_style' => (object)[],
                    'accessibility' => [
                        'interactions',
                        'can_hover',
                        'website_form',
                        'text_style',
                        'text_color',
                        'hyperlink',
                        'sizing',
                        'height',
                        'width',
                        'spacing',
                        'padding',
                        'margin',
                        'styling',
                        'border',
                        'box_shadow',
                        'border_radius',
                        'hover'
                    ],
                    'css' => [
                        'display' => 'flex',
                        'position' => 'relative',
                        'width' => 'auto',
                        'max-width' => '100%',
                        'flex-direction' => 'column',
                        'flex-wrap' => 'nowrap',
                        'box-sizing' => 'border-box',
                        'z-index' => '5',
                        'gap' => '10px',
                        'align-items' => 'stretch',
                        'justify-content' => 'flex-start',
                        'line-height' => 'inherit',
                        'letter-spacing' => 'inherit',
                        'font-size' => '1em',
                        'font-weight' => 'normal',
                        'text-decoration' => 'none',
                        'font-style' => 'normal',
                        'text-align' => 'start',
                        'color' => 'rgba(var(--color_4_3),1)',
                        'padding' => '10px 10px 10px 10px',
                        'margin' => '20px 20px 20px 20px'
                    ],
                    'css_mobile' => [
                        'gap' => '10px',
                        'justify-content' => 'flex-start',
                        'line-height' => 'inherit',
                        'letter-spacing' => 'inherit',
                        'font-weight' => 'normal',
                        'text-decoration' => 'none',
                        'font-style' => 'normal',
                        'color' => 'rgba(var(--color_4_1),1)',
                        'padding' => '10px 10px 10px 10px',
                        'margin' => '20px 20px 20px 20px'
                    ],
                    'css_hover' => (object)[],
                    'css_hover_mobile' => (object)[],
                    'css_hyperlink' => [
                        'color' => 'rgba(var(--color_1_2),1)',
                        'text-decoration' => 'none'
                    ],
                    'css_hyperlink_hover' => [
                        'color' => 'rgba(var(--color_1_3),1)',
                        'text-decoration' => 'none'
                    ]
                ],
                'form_title' => [
                    'type' => 'form_element',
                    'form_element' => 'form_title',
                    'general_class' => '1',
                    'class_selector' => 'form_title',
                    'font_style' => (object)[],
                    'accessibility' => [
                        'website_form',
                        'text_style',
                        'text_color',
                        'select_font',
                        'spacing',
                        'margin'
                    ],
                    'css' => [
                        'box-sizing' => 'border-box',
                        'position' => 'relative',
                        'z-index' => '1',
                        'display' => 'block',
                        'padding' => '0px',
                        'overflow' => 'visible',
                        'line-height' => 'inherit',
                        'letter-spacing' => 'inherit',
                        'font-size' => '1.5em',
                        'font-weight' => 'normal',
                        'text-decoration' => 'none',
                        'font-style' => 'normal',
                        'text-align' => 'start',
                        'color' => 'rgba(var(--color_4_3),1)',
                        'margin' => '0px 0px 0px 0px'
                    ],
                    'css_mobile' => [
                        'display' => 'block',
                        'overflow' => 'visible',
                        'line-height' => 'inherit',
                        'letter-spacing' => 'inherit',
                        'font-size' => '1.5em',
                        'font-weight' => 'normal',
                        'text-decoration' => 'none',
                        'font-style' => 'normal',
                        'text-align' => 'start',
                        'color' => 'rgba(var(--color_4_1),1)',
                        'margin' => '0px 0px 0px 0px'
                    ]
                ],
                'form_message' => [
                    'type' => 'form_element',
                    'form_element' => 'form_message',
                    'general_class' => '1',
                    'class_selector' => 'form_message',
                    'font_style' => (object)[],
                    'accessibility' => [
                        'website_form',
                        'form_response_colors',
                        'text_style',
                        'text_color',
                        'select_font',
                        'spacing',
                        'margin'
                    ],
                    'css' => [
                        'box-sizing' => 'border-box',
                        'position' => 'relative',
                        'z-index' => '1',
                        'display' => 'block',
                        'padding' => '0px',
                        'overflow' => 'visible',
                        'line-height' => 'inherit',
                        'letter-spacing' => 'inherit',
                        'font-size' => '1em',
                        'font-weight' => 'normal',
                        'text-decoration' => 'none',
                        'font-style' => 'normal',
                        'text-align' => 'start',
                        'color' => 'rgba(var(--color_4_3),1)',
                        'margin' => '0px 0px 10px 0px',
                        'max-width' => '400px',
                    ],
                    'css_mobile' => [
                        'display' => 'block',
                        'overflow' => 'visible',
                        'line-height' => 'inherit',
                        'letter-spacing' => 'inherit',
                        'font-size' => '1em',
                        'font-weight' => 'normal',
                        'text-decoration' => 'none',
                        'font-style' => 'normal',
                        'text-align' => 'start',
                        'color' => 'rgba(var(--color_4_1),1)'
                    ]
                ],
                'form_input_box' => [
                    'type' => 'form_element',
                    'form_element' => 'form_input_box',
                    'access_key_tree' => 'form_elements.form_input_box',
                    'tag' => 'div',
                    'general_html_content' => '1',
                    'class_selector' => 'form_input_box',
                    'class' => '',
                    'accessibility' => [
                        'interactions',
                        'website_form',
                        'hover',
                        'focus',
                        'error',
                        'input_box',
                        'text_style',
                        'text_color',
                        'placeholder',
                        'validation_message',
                        'spacing',
                        'padding',
                        'margin',
                        'styling',
                        'border',
                        'border_radius',
                        'box_shadow',
                        'sizing',
                        'width',
                        'background',
                        'background_gradient'
                    ],
                    'styling_target' => [
                        'padding' => 'form_elements.form_input_box.children.input_box',
                        'border' => 'form_elements.form_input_box.children.input_box',
                        'border_radius' => 'form_elements.form_input_box.children.input_box',
                        'box_shadow' => 'form_elements.form_input_box.children.input_box',
                        'background' => 'form_elements.form_input_box.children.input_box',
                        'text_style' => 'form_elements.form_input_box.children.input_box',
                        'text_color' => 'form_elements.form_input_box.children.input_box',
                        'interactions' => 'form_elements.form_input_box.children.input_box'
                    ],
                    'css' => [
                        'width' => 'auto',
                        'min-width' => 'auto',
                        'max-width' => '100%',
                        'margin' => '0px 0px 0px 0px'
                    ],
                    'css_mobile' => [
                        'margin' => '0px 0px 0px 0px'
                    ],
                    'children' => [
                        'input_label' => [
                            'tag' => 'div',
                            'render' => 'form_elements.form_input_box',
                            'class_selector' => 'form_input_box_label',
                            'text' => [
                                'key' => ''
                            ],
                            'class' => ' ',
                            'css' => [
                                'line-height' => 'inherit',
                                'letter-spacing' => 'inherit',
                                'font-size' => '0.85em',
                                'font-weight' => 'normal',
                                'text-decoration' => 'none',
                                'font-style' => 'normal',
                                'text-align' => 'start',
                                'margin' => '0px 0px 0px 5px'
                            ]
                        ],
                        'input_box' => [
                            'tag' => 'input',
                            'type' => 'input_box',
                            'render' => 'form_elements.form_input_box',
                            'class_selector' => 'form_input_box_input',
                            'attr' => [
                                'type' => ''
                            ],
                            'font_style' => (object)[],
                            'placeholder' => [
                                'key' => ''
                            ],
                            'accessibility' => [
                                'interactions',
                                'can_hover',
                                'can_focus',
                                'can_error',
                                'hover',
                                'focus',
                                'error'
                            ],
                            'css_placeholder' => [
                                'color' => 'rgba(var(--color_4_5),1)',
                                'visibility' => 'hidden'
                            ],
                            'css' => [
                                'width' => '100%',
                                'box-sizing' => 'border-box',
                                'line-height' => '1.3em',
                                'letter-spacing' => '0.03em',
                                'font-size' => '0.9em',
                                'font-weight' => 'normal',
                                'text-decoration' => 'none',
                                'font-style' => 'normal',
                                'text-align' => 'start',
                                'border-top' => '1px solid rgba(var(--color_4_3),.3)',
                                'border-right' => '1px solid rgba(var(--color_4_3),.3)',
                                'border-bottom' => '1px solid rgba(var(--color_4_3),.3)',
                                'border-left' => '1px solid rgba(var(--color_4_3),.3)',
                                'border-radius' => '5px 5px 5px 5px',
                                'padding' => '10px 15px 10px 15px',
                                'transition-duration' => '200ms'
                            ],
                            'css_hover' => (object)[],
                            'css_focus' => [
                                'box-shadow' => '0 0 2px 3px rgba(var(--color_1_3),.4)',
                                'border-top' => '1px solid rgba(var(--color_1_3),.3)',
                                'border-right' => '1px solid rgba(var(--color_1_3),.3)',
                                'border-bottom' => '1px solid rgba(var(--color_1_3),.3)',
                                'border-left' => '1px solid rgba(var(--color_1_3),.3)'
                            ],
                            'css_error' => [
                                'border-top' => '1px solid rgba(var(--_error),1)',
                                'border-right' => '1px solid rgba(var(--_error),1)',
                                'border-bottom' => '1px solid rgba(var(--_error),1)',
                                'border-left' => '1px solid rgba(var(--_error),1)'
                            ],
                            'background' => [
                                'type' => 'color',
                                'color' => 'rgba(var(--color_4_7),1)'
                            ]
                        ],
                        'validation_message' => [
                            'type' => 'input_box_validation_message',
                            'render' => 'form_elements.form_input_box',
                            'class_selector' => 'form_input_box_message',
                            'tag' => 'div',
                            'css' => [
                                'color' => 'rgba(var(--_error),1)',
                                'font-size' => '0.8em',
                                'max-width' => '400px',
                            ]
                        ]
                    ]
                ],
                'form_check_box' => [
                    'type' => 'form_element',
                    'form_element' => 'form_check_box',
                    'access_key_tree' => 'form_elements.form_check_box',
                    'class' => 'form_check_box_container',
                    'tag' => 'div',
                    'general_html_content' => '1',
                    'accessibility' => [
                        'website_form',
                        'check_box','check_box_validation'
                    ],
                    'styling_target' => [
                        'check_box' => 'form_elements.form_check_box.children.check_box.children.check_box',
                        'check_box_validation' => 'form_elements.form_check_box.children.validation_message',
                    ],
                    'children' => [
                        'check_box' => [
                            'tag' => 'div',
                            'children' => [
                                'check_box' => [
                                    'tag' => 'span',
                                    'render' => 'form_elements.form_check_box',
                                    'class_selector' => 'form_check_box',
                                    'attr' => ['tabindex' => '0'],
                                    'class' => '',
                                    'css' => [
                                        'vertical-align' => 'middle',
                                        'display' => 'inline-block',
                                        'line-height' => '0px',
                                        'cursor' => 'pointer',
                                        'width' => '10px',
                                        'fill' => 'rgba(var(--color_1_2),1)',
                                        'border-width' => '1px',
                                        'border-style' => 'solid',
                                        'border-color' => 'rgba(var(--color_4_3),1)',
                                        'border-radius' => '5px',
                                        'padding' => '2px',
                                        'aspect-ratio' => '1 / 1'
                                    ],
                                    'children' => [
                                        'icon' => [
                                            'tag' => 'svg',
                                            'class_selector' => 'form_check_box_marker',
                                            'css' => (object)[],
                                            'class' => 'check_box_marker',
                                            'attr' => [
                                                'viewBox' => '0 0 1920 1920',
                                                'xmlns' => 'http://www.w3.org/2000/svg',
                                                'fill-rule' => 'evenodd'
                                            ],
                                            'children' => [
                                                [
                                                    'tag' => 'path',
                                                    'attr' => [
                                                        'stroke-width' => '0',
                                                        'd' => 'M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z'
                                                    ]
                                                ]
                                            ],
                                        ],
                                    ]
                                ],
                                'check_box_text' => (object)[]
                            ]
                        ],
                        'validation_message' => [
                            'type' => 'check_box_validation_message',
                            'render' => 'form_elements.form_check_box',
                            'class_selector' => 'form_check_box_message',
                            'tag' => 'div',
                            'css' => [
                                'color' => 'rgba(var(--_error),1)',
                                'font-size' => '0.8em'
                            ]
                        ]
                    ]
                ],
                'form_button' => [
                    'type' => 'form_element',
                    'general_class' => '1',
                    'tag' => 'button',
                    'form_element' => 'form_button',
                    'class_selector' => 'form_button',
                    'font_style' => (object)[],
                    'class' => '',
                    'accessibility' => [
                        'website_form',
                        'interactions',
                        'hover',
                        'click',
                        'focus',
                        'can_hover',
                        'can_click',
                        'can_focus',
                        'button',
                        'text_style',
                        'text_color',
                        'select_font',
                        'spacing',
                        'margin',
                        'padding',
                        'sizing',
                        'width',
                        'styling',
                        'border',
                        'border_radius',
                        'box_shadow',
                        'background',
                        'background_gradient'
                    ],
                    'css' => [
                        'box-sizing' => 'border-box',
                        'position' => 'relative',
                        'cursor' => 'pointer',
                        'z-index' => '1',
                        'display' => 'block',
                        'overflow' => 'visible',
                        'align-self' => 'auto',
                        'font-weight' => 'normal',
                        'line-height' => 'inherit',
                        'letter-spacing' => 'inherit',
                        'font-size' => '1em',
                        'text-align' => 'center',
                        'padding' => '10px 25px 10px 25px',
                        'margin' => '0px 0px 0px 0px',
                        'width' => 'auto',
                        'min-width' => 'auto',
                        'max-width' => '100%',
                        'height' => 'auto',
                        'min-height' => 'auto',
                        'max-height' => '100%',
                        'color' => 'rgba(var(--color_1_7),1)',
                        'border-radius' => '5px 5px 5px 5px',
                        'transition-duration' => '200ms'
                    ],
                    'css_hover' => (object)[],
                    'css_click' => (object)[],
                    'css_disabled' => [
                        'cursor' => 'not-allowed',
                        'pointer-events' => 'none',
                        'color' => 'rgba(var(--color_4_5),1)'
                    ],
                    'background' => [
                        'type' => 'gradient',
                        'gradient' => 'linear-gradient(145deg, rgba(var(--color_1_3),1) 0%, rgba(var(--color_1_3),1) 100%)'
                    ],
                    'background_click' => [
                        'type' => 'gradient',
                        'gradient' => 'linear-gradient(145deg, rgba(var(--color_1_2),1) 0%, rgba(var(--color_1_3),1) 100%)'
                    ],
                    'background_disabled' => [
                        'type' => 'gradient',
                        'gradient' => 'linear-gradient(90deg, rgba(var(--color_4_6),1) 0%, rgba(var(--color_4_6),.8) 100%)'
                    ]
                ],
                'form_loading_spinner' => [
                    'type' => 'form_element',
                    'form_element' => 'form_loading_spinner',
                    'access_key_tree' => 'form_elements.form_loading_spinner',
                    'tag' => 'div',
                    'general_html_content' => '1',
                    'class_selector' => 'form_loading_spinner',
                    'class' => 'none',
                    'accessibility' => [
                        'website_form',
                        'loading_spinner'
                    ],
                    'css' => [
                        'position' => 'absolute',
                        'inset' => '0 0 0 0'
                    ],
                    'children' => [
                        'loading_spinner' => [
                            'tag' => 'div',
                            'spinner_key' => 3,
                            'class_selector' => 'form_loading_spinner3_spinner',
                            'vars' => [
                                ':color_1:' => 'rgba(var(--color_1_3),1)',
                                ':color_2:' => 'rgba(var(--color_4_6),0.5)',
                                ':size:' => '50px',
                                ':thickness:' => '5px',
                                ':speed:' => '1000'
                            ],
                            'css' => [
                                'position' => 'absolute',
                                'inset' => '0 0 0 0',
                                'margin' => 'auto',
                                'width' => ':size:',
                                'aspect-ratio' => '1 / 1',
                                'border' => ':thickness: solid :color_2:',
                                'border-top' => ':thickness: solid :color_1:',
                                'border-radius' => '50%',
                                'animation' => 'form_loading_spinner3_animation_1 :speed:ms linear infinite'
                            ],
                            'keyframes' => [
                                'form_loading_spinner3_animation_1' => [
                                    '0%' => [
                                        'transform' => 'rotate(0deg)'
                                    ],
                                    '100%' => [
                                        'transform' => 'rotate(360deg)'
                                    ]
                                ]
                            ]
                        ]
                    ]
                ],
                'website_form_success' => [
                    'class_selector' => 'website_form_success',
                    'css' => [
                        'color' => 'rgba(var(--_success),1)'
                    ]
                ],
                'website_form_error' => [
                    'class_selector' => 'website_form_error',
                    'css' => [
                        'color' => 'rgba(var(--_error),1)'
                    ]
                ],
                'website_form_warning' => [
                    'class_selector' => 'website_form_warning',
                    'css' => [
                        'color' => 'rgba(var(--_warning),1)'
                    ]
                ]
            ]),
            'website_header' => json_encode([
                "type" => "website_header",
                "tag" => "header",
                "class_selector" => "website_header",
                'attr' => ['dynamic' => '0'],
                'accessibility' => [
                    'interactions','can_hover',
                    'header_settings','header_layout','header_components',
                    'background','background_gradient','background_backdrop_filter',
                    'spacing','padding',
                    'styling','box_shadow','border',
                ],
                'styling_target' => [
                    'padding' => 'website_header.children.header_wrapper',
                ],
                "css" => [
                    "position" => "sticky",
                    "box-sizing" => "border-box",
                    "top" => "0",
                    "width" => "100%",
                    "z-index" => "110",
                ],
                'css_mobile' => (object)[],
                'css_hover' => (object)[],
                'css_hover_mobile' => (object)[],
                "children" => [
                    'header_wrapper' => [
                        "tag" => "div",
                        "type" => "header_wrapper",
                        "class_selector" => "header_wrapper",
                        'accessibility' => ['padding'],
                        'styling_target' => [
                            'background' => 'website_header',
                        ],
                        "css" => [
                            "box-sizing" => "border-box",
                            'position' => 'relative',
                            "display" => "grid",
                            "grid-gap" => "0px",
                            "grid-template-areas" => "'elem1 elem2 elem3'",
                            "grid-template-columns" => "minmax(auto, 1fr) minmax(auto, 4fr) minmax(auto, 1fr)",
                            'grid-template-rows' => '1fr',
                            "align-items" => "center",
                            "justify-items" => "center",
                            "margin" => "auto",
                            
                            "max-width" => "var(--page_max_width)",
                            "padding" => "1px 1px 1px 1px",
                        ],
                        "css_mobile" => [
                            "grid-template-areas" => "'elem1 elem4'",
                            "grid-template-columns" => "3fr 1fr",
                            "grid-gap" => "0px",
                            "padding" => "1px 1px 1px 1px",
                        ],
                        "children" => [
                            'header_logo' => [
                                "type" => "header_component",
                                'header_component' => 'logo_restaurant_name',
                                'accessibility' => [
                                    'header_components',
                                    'header_logo_alignment','header_logo_logo','header_logo_restaurant_name',
                                    'spacing','padding','margin',
                                    'background','background_gradient','background_backdrop_filter',
                                ],
                                "tag" => "div",
                                "class_selector" => "header_logo",
                                "css" => [
                                    "grid-area" => "elem1",
                                    "display" => "flex",
                                    'flex-direction' => 'row',
                                    "align-self" => "center",
                                    "justify-self" => "start",
                                    "align-items" => "center",
                                    'position' => 'relative',
                                    "gap" => "10px",
                                    'padding' => '10px 10px 10px 10px',
                                    "margin" => "1px 1px 1px 1px",
                                ],
                                "css_mobile" => [
                                    "justify-self" => "start",
                                    "gap" => "10px",
                                    'padding' => '10px 10px 10px 10px',
                                    "margin" => "1px 1px 1px 1px",
                                ],
                                "children" => [
                                    'header_logo_logo' => [
                                        "name" => "header_logo_logo",
                                        "tag" => "img",
                                        "class_selector" => "header_logo_logo",
                                        "css" => [
                                            "height" => "40px",
                                            "display" => "block",
                                        ],
                                        "css_mobile" => [
                                            "height" => "30px",
                                            "display" => "block",
                                        ],
                                        "class" => "website_logo",
                                    ],
                                    'header_logo_restaurant_name' => [
                                        "name" => "header_logo_restaurant_name",
                                        "tag" => "div",
                                        'font_style' => ['en' => ''],
                                        "class_selector" => "header_logo_restaurant_name",
                                        "css" => [
                                            "color" => 'rgba(var(--color_4_1),1)',
                                            "font-size" => "1.5em",
                                            'line-height' => 'inherit',
                                            'letter-spacing' => 'inherit',
                                            "font-weight" => "bold",
                                            'font-style' => 'normal',
                                            'text-decoration' => 'none',
                                            "white-space" => "nowrap",
                                            "display" => "block",
                                        ],
                                        "css_mobile" => [
                                            "display" => "block",
                                            "color" => 'rgba(var(--color_4_1),1)',
                                            "font-size" => "1.2em",
                                            'line-height' => 'inherit',
                                            'letter-spacing' => 'inherit',
                                            "font-weight" => "bold",
                                            'font-style' => 'normal',
                                            'text-decoration' => 'none',
                                        ],
                                        "class" => "restaurant_name",
                                    ],
                                ],
                            ],
                            'header_navList' => [
                                "type" => "header_component",
                                'header_component' => 'header_navList',
                                'is_responsive' => '0',
                                'accessibility' => [
                                    'header_components',
                                    'header_navList',
                                    'spacing','padding','margin',
                                ],
                                "tag" => "ul",
                                "class_selector" => "header_navList",
                                "css" => [
                                    "list-style-type" => "none",
                                    'position' => 'relative',
                                    "grid-area" => "elem2",
                                    "align-self" => "center",
                                    "justify-self" => "start",
                                    "display" => "flex",
                                    "align-items" => "center",
                                    "gap" => "18px",
                                    'padding' => '10px 10px 10px 10px',
                                    "margin" => "1px 1px 1px 1px",
                                ],
                                "css_mobile" => ["display" => "none"],
                                "children" => [
                                    [
                                        "type" => "header_navList_item",
                                        "class_selector" => "header_list_home",
                                        "css" => ["display" => "block"],
                                        "tag" => "li",
                                        'attr' => ['sort' => 1],
                                        'class' => 'header_navList_item',
                                        "children" => [
                                            [
                                                "tag" => "a",
                                                "class" => "open_page nowrap",
                                                "attr" => [
                                                    "href" => "/home",
                                                    "page" => "home",
                                                ],
                                                "text" => ["key" => "other.home"],
                                            ],
                                        ],
                                    ],
                                    [
                                        "type" => "header_navList_item",
                                        "class_selector" => "header_list_foodmenu",
                                        "css" => ["display" => "block"],
                                        "tag" => "li",
                                        'attr' => ['sort' => 2,"header_list" => "foodmenu"],
                                        'class' => 'header_navList_item show_header_drop_down_list',
                                        "children" => [
                                            [
                                                "tag" => "a",
                                                "class" => "nowrap",
                                                "text" => ["key" => "other.foodmenu"],
                                            ],
                                        ],
                                    ],
                                    [
                                        "type" => "header_navList_item",
                                        "tag" => "li",
                                        "class_selector" => "header_list_about_us",
                                        "css" => ["display" => "block"],
                                        'attr' => ['sort' => 3],
                                        'class' => 'header_navList_item',
                                        "children" => [
                                            [
                                                "tag" => "a",
                                                "class" => "open_page nowrap",
                                                "attr" => [
                                                    "href" => "/about_us",
                                                    "page" => "about_us",
                                                ],
                                                "text" => ["key" => "other.about_us"],
                                            ],
                                        ],
                                    ],
                                    [
                                        "type" => "header_navList_item",
                                        "tag" => "li",
                                        "class_selector" => "header_list_our_products",
                                        "css" => ["display" => "none"],
                                        'attr' => ['sort' => 4],
                                        'class' => 'header_navList_item',
                                        "children" => [
                                            [
                                                "tag" => "a",
                                                "class" => "open_page nowrap",
                                                "attr" => [
                                                    "href" => "/our_products",
                                                    "page" => "our_products",
                                                ],
                                                "text" => [
                                                    "key" => "other.our_products",
                                                ],
                                            ],
                                        ],
                                    ],
                                    [
                                        "type" => "header_navList_item",
                                        "tag" => "li",
                                        "class_selector" => "header_list_track_order",
                                        "css" => ["display" => "none"],
                                        'attr' => ['sort' => 5],
                                        'class' => 'header_navList_item',
                                        "children" => [
                                            [
                                                "tag" => "a",
                                                "class" => "open_page nowrap",
                                                "attr" => [
                                                    "href" => "/track_order",
                                                    "page" => "track_order",
                                                ],
                                                "text" => [
                                                    "key" => "orders.track_your_order",
                                                ],
                                            ],
                                        ],
                                    ],
                                    [
                                        "type" => "header_navList_item",
                                        "class_selector" => "header_list_see_more",
                                        'class' => 'header_navList_item none',
                                        "tag" => "li",
                                        'attr' => ['sort' => 6],
                                        "children" => [
                                            [
                                                "tag" => "a",
                                                "class" =>
                                                    "show_header_drop_down_list nowrap",
                                                    "attr" => [
                                                        "header_list" => "see_more",
                                                    ],
                                                "text" => ["key" => "other.see_more"],
                                            ],
                                        ],
                                    ],
                                ],

                            ],
                            'header_iconsList' => [
                                "type" => "header_component",
                                'header_component' => 'header_iconsList',
                                "tag" => "div",
                                'is_responsive' => '0',
                                'accessibility' => [
                                    'header_components',
                                    'interactions','can_hover','can_click',
                                    'header_iconsList',
                                    'spacing','padding','margin',
                                ],
                                'styling_target' => [
                                    'interactions' => 'website_header.children.header_wrapper.children.header_iconsList_icon'
                                ],
                                "class_selector" => "header_iconsList",
                                "css" => [
                                    'position' => 'relative',
                                    "grid-area" => "elem3",
                                    "align-self" => "center",
                                    "justify-self" => "end",
                                    "align-items" => "center",
                                    "display" => "flex",
                                    "gap" => "15px",
                                    'padding' => '10px 10px 10px 10px',
                                    'margin' => '0px 0px 0px 0px',
                                    'fill' => 'rgba(var(--color_4_1),1)',
                                    'stroke' => 'rgba(var(--color_4_1),1)',
                                ],
                                "css_mobile" => ["display" => "none"],
                                "children" => [
                                    [
                                        "tag" => "a",
                                        "class_selector" => "header_cart",
                                        "css" => [
                                            "text-decoration" => "unset",
                                            "display" => "flex",
                                            "align-items" => "center",
                                            "justify-content" => "center",
                                        ],
                                        "class" => "open_page",
                                        "attr" => [
                                            "page" => "cart",
                                                "href" => "/cart",
                                                'sort'=>'3'
                                        ],
                                        "children" => [
                                            'icon' => [
                                                "tag" => "svg",
                                                "class_selector" => "header_cart_icon",
                                                'class' => 'header_iconsList_icon',
                                                "css" => [
                                                    "cursor" => "pointer",
                                                    "width" => "25px",
                                                    "height" => "auto",
                                                    'aspect-ratio' => '1 / 1',
                                                ],
                                                "attr" => [
                                                    "viewBox" => "0 0 24 24",
                                                    "xmlns" =>
                                                        "http://www.w3.org/2000/svg",
                                                ],
                                                "children" => [
                                                    [
                                                        "tag" => "path",
                                                        "attr" => [
                                                            "stroke-width" => "0",
                                                            "d" =>
                                                                "M7.24995 12C7.24995 11.5858 7.58573 11.25 7.99995 11.25H15.9999C16.4142 11.25 16.7499 11.5858 16.7499 12C16.7499 12.4142 16.4142 12.75 15.9999 12.75H7.99995C7.58573 12.75 7.24995 12.4142 7.24995 12Z",
                                                        ],
                                                    ],
                                                    [
                                                        "tag" => "path",
                                                        "attr" => [
                                                            "stroke-width" => "0",
                                                            "d" =>
                                                                "M9.99995 14.25C9.58573 14.25 9.24995 14.5858 9.24995 15C9.24995 15.4142 9.58573 15.75 9.99995 15.75H13.9999C14.4142 15.75 14.7499 15.4142 14.7499 15C14.7499 14.5858 14.4142 14.25 13.9999 14.25H9.99995Z",
                                                        ],
                                                    ],
                                                    [
                                                        "tag" => "path",
                                                        "attr" => [
                                                            "fill-rule" => "evenodd",
                                                            "clip-rule" => "evenodd",
                                                            "stroke-width" => "0",
                                                            "d" =>
                                                                "M14.6645 2.32919C15.035 2.14395 15.4855 2.29412 15.6708 2.6646L17.4841 6.2912C17.9116 6.31294 18.3015 6.34614 18.6548 6.39687C19.7105 6.54845 20.5843 6.87432 21.2053 7.64247C21.8263 8.41062 21.9618 9.33329 21.8888 10.3973C21.8181 11.4285 21.5394 12.7289 21.191 14.3545L20.7396 16.4612C20.5047 17.5577 20.3141 18.4471 20.0743 19.1419C19.8244 19.866 19.4949 20.4614 18.9323 20.9163C18.3696 21.3711 17.7184 21.5685 16.958 21.6611C16.2284 21.75 15.3188 21.75 14.1974 21.75H9.80252C8.6812 21.75 7.77159 21.75 7.04196 21.6611C6.28159 21.5685 5.63033 21.3711 5.06769 20.9163C4.50505 20.4614 4.17561 19.866 3.92569 19.1419C3.68586 18.4471 3.49529 17.5577 3.26035 16.4612L2.80893 14.3546C2.46055 12.7289 2.18188 11.4285 2.11115 10.3973C2.03816 9.33329 2.17371 8.41062 2.7947 7.64247C3.41568 6.87432 4.28947 6.54845 5.34519 6.39687C5.69846 6.34615 6.08832 6.31294 6.51583 6.2912L8.32913 2.6646C8.51437 2.29412 8.96487 2.14395 9.33536 2.32919C9.70584 2.51443 9.85601 2.96494 9.67077 3.33542L8.21244 6.25207C8.576 6.25 8.95865 6.25001 9.36076 6.25001H14.6392C15.0412 6.25001 15.424 6.25 15.7875 6.25207L14.3291 3.33542C14.1439 2.96494 14.2941 2.51443 14.6645 2.32919ZM5.73206 7.85873L5.32913 8.6646C5.14388 9.03509 5.29405 9.48559 5.66454 9.67083C6.03502 9.85607 6.48553 9.70591 6.67077 9.33542L7.45802 7.76092C8.02842 7.75035 8.67786 7.75001 9.42191 7.75001H14.5781C15.3221 7.75001 15.9715 7.75035 16.5419 7.76092L17.3291 9.33542C17.5144 9.70591 17.9649 9.85607 18.3354 9.67083C18.7058 9.48559 18.856 9.03509 18.6708 8.6646L18.2678 7.85872C18.327 7.86588 18.3849 7.87351 18.4416 7.88164C19.3255 8.00855 19.7592 8.23967 20.0388 8.58549C20.3183 8.93131 20.4534 9.40383 20.3923 10.2947C20.3298 11.2058 20.0756 12.4008 19.7115 14.1L19.2829 16.1C19.0355 17.2546 18.8629 18.0541 18.6564 18.6525C18.4565 19.2314 18.2517 19.5376 17.9893 19.7498C17.7268 19.9619 17.3845 20.0981 16.7766 20.1721C16.1482 20.2487 15.3302 20.25 14.1495 20.25H9.85048C8.66972 20.25 7.85175 20.2487 7.22341 20.1721C6.61545 20.0981 6.27314 19.9619 6.01071 19.7498C5.74827 19.5376 5.54343 19.2314 5.3436 18.6525C5.13707 18.0541 4.96442 17.2546 4.71701 16.1L4.28844 14.1C3.92432 12.4008 3.67013 11.2058 3.60763 10.2947C3.54652 9.40383 3.68163 8.93131 3.9612 8.58549C4.24076 8.23967 4.67449 8.00855 5.55837 7.88164C5.61501 7.87351 5.67289 7.86588 5.73206 7.85873Z",
                                                        ],
                                                    ],
                                                ],
                                            ],
                                            'header_icon_cart_num' => [
                                                "name" => "header_icon_cart_num",
                                                "tag" => "span",
                                                "class_selector" => "header_icon_cart_num",
                                                "css" => [
                                                    'display' => 'inline',
                                                    "line-height" => "1em",
                                                    "font-size" => "15px",
                                                    "align-self" => "flex-end",
                                                    // 'width' => '0px',
                                                    'color' => 'rgba(var(--color_4_1),1)',
                                                ],
                                            ],
                                        ],
                                    ],
                                    [
                                        "tag" => "a",
                                        "class_selector" => "header_user",
                                        "css" => [
                                            "text-decoration" => "unset",
                                            "display" => "flex",
                                            "align-items" => "center",
                                            "justify-content" => "center",
                                        ],
                                        'class' => 'show_header_drop_down_list header_iconsList_icon',
                                        "attr" => [
                                            "header_list" => "user",
                                            'sort' => '2',
                                        ],
                                        "children" => [
                                            'icon' => [
                                                "tag" => "svg",
                                                "class_selector" => "header_user_icon",
                                                'class' => 'header_iconsList_icon',
                                                "css" => [
                                                    "cursor" => "pointer",
                                                    "width" => "23px",
                                                    "height" => "auto",
                                                    'aspect-ratio' => '1 / 1',
                                                ],
                                                "attr" => [
                                                    "viewBox" => "0 0 24 24",
                                                    "xmlns" =>
                                                        "http://www.w3.org/2000/svg",
                                                    "fill-rule" => "evenodd",
                                                    "clip-rule" => "evenodd",
                                                ],
                                                "children" => [
                                                    [
                                                        "tag" => "path",
                                                        "attr" => [
                                                            "stroke-width" => "0",
                                                            "d" => "M12.0001 1.25C9.37678 1.25 7.25013 3.37665 7.25013 6C7.25013 8.62335 9.37678 10.75 12.0001 10.75C14.6235 10.75 16.7501 8.62335 16.7501 6C16.7501 3.37665 14.6235 1.25 12.0001 1.25ZM8.75013 6C8.75013 4.20507 10.2052 2.75 12.0001 2.75C13.7951 2.75 15.2501 4.20507 15.2501 6C15.2501 7.79493 13.7951 9.25 12.0001 9.25C10.2052 9.25 8.75013 7.79493 8.75013 6Z",
                                                        ],
                                                    ],
                                                    [
                                                        "tag" => "path",
                                                        "attr" => [
                                                            "stroke-width" => "0",
                                                            "d" => "M12.0001 12.25C9.68658 12.25 7.55506 12.7759 5.97558 13.6643C4.41962 14.5396 3.25013 15.8661 3.25013 17.5L3.25007 17.602C3.24894 18.7638 3.24752 20.222 4.52655 21.2635C5.15602 21.7761 6.03661 22.1406 7.22634 22.3815C8.4194 22.6229 9.97436 22.75 12.0001 22.75C14.0259 22.75 15.5809 22.6229 16.7739 22.3815C17.9637 22.1406 18.8443 21.7761 19.4737 21.2635C20.7527 20.222 20.7513 18.7638 20.7502 17.602L20.7501 17.5C20.7501 15.8661 19.5807 14.5396 18.0247 13.6643C16.4452 12.7759 14.3137 12.25 12.0001 12.25ZM4.75013 17.5C4.75013 16.6487 5.37151 15.7251 6.71098 14.9717C8.02693 14.2315 9.89541 13.75 12.0001 13.75C14.1049 13.75 15.9733 14.2315 17.2893 14.9717C18.6288 15.7251 19.2501 16.6487 19.2501 17.5C19.2501 18.8078 19.2098 19.544 18.5265 20.1004C18.156 20.4022 17.5366 20.6967 16.4763 20.9113C15.4194 21.1252 13.9744 21.25 12.0001 21.25C10.0259 21.25 8.58087 21.1252 7.52393 20.9113C6.46366 20.6967 5.84425 20.4022 5.47372 20.1004C4.79045 19.544 4.75013 18.8078 4.75013 17.5Z",
                                                        ],
                                                    ],
                                                ],
                                            ],
                                        ],
                                    ],
                                    [
                                        "tag" => "a",
                                        "class_selector" => "header_language",
                                        "css" => [
                                            "text-decoration" => "unset",
                                            "display" => "flex",
                                            "align-items" => "center",
                                            "justify-content" => "center",
                                        ],
                                        "class" => "show_header_drop_down_list header_iconsList_icon",
                                        "attr" => [
                                            "header_list" => "language",
                                            'sort' => '1',
                                        ],
                                        "children" => [
                                            'icon' => [
                                                "tag" => "svg",
                                                "class_selector" => "header_language_icon",
                                                "css" => [
                                                    "cursor" => "pointer",
                                                    "width" => "23px",
                                                    "height" => "auto",
                                                    'aspect-ratio' => '1 / 1',
                                                ],
                                                "attr" => [
                                                    "viewBox" => "0 0 24 24",
                                                    "xmlns" =>
                                                    "http://www.w3.org/2000/svg",
                                                    "stroke-linejoin" => "miter",
                                                    "stroke-linecap" => "square",
                                                ],
                                                "children" => [
                                                    [
                                                        "tag" => "circle",
                                                        "attr" => [
                                                            "fill" => "none",
                                                            "cx" => "12",
                                                            "cy" => "12",
                                                            "r" => "10",
                                                            "stroke-width" => "1",
                                                        ],
                                                    ],
                                                    [
                                                        "tag" => "path",
                                                        "attr" => [
                                                            "fill" => "none",
                                                            "stroke-linecap" => "round",
                                                            "stroke-width" => "1",
                                                            "d" =>
                                                                "M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z",
                                                        ],
                                                    ],
                                                    [
                                                        "tag" => "path",
                                                        "attr" => [
                                                            "fill" => "none",
                                                            "stroke-linecap" => "round",
                                                            "stroke-width" => "1",
                                                            "d" => "M2.5 9L21.5 9M2.5 15L21.5 15",
                                                        ],
                                                    ],
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                            'header_iconsList_icon' => [
                                'class_selector' => 'header_iconsList_icon',
                                'type' => 'header_iconsList_icon',
                                'attr' => ['sort' => '0'],
                                'general_class' => '1',
                                'is_responsive' => '0',
                                'accessibility' => [
                                    'interactions','can_hover','can_click',
                                ],
                                'css' => [
                                    'fill' => 'rgba(var(--color_4_1),1)',
                                    'stroke' => 'rgba(var(--color_4_1),1)',
                                    'color' => 'rgba(var(--color_4_1),1)',
                                ],
                            ],
                            'header_navList_item' => [
                                'type' => 'header_navList_item',
                                'general_class' => '1',
                                'attr' => ['sort' => '0'],
                                'is_responsive' => '0',
                                'class_selector' => 'header_navList_item',
                                'font_style' => (object)[],
                                'accessibility' => [
                                    'header_components',
                                    'interactions','can_hover','can_click',
                                    'text_style','text_color',
                                    'spacing','padding','margin',
                                    'styling','border','box_shadow','border_radius',
                                    'background','background_gradient','background_backdrop_filter',
                                ],
                                'css' => [
                                    "color" => 'rgba(var(--color_4_1),1)',
                                    'text-align' => 'center',
                                    "font-size" => "1em",
                                    "font-weight" => "normal",
                                    'line-height' => 'inherit',
                                    'letter-spacing' => 'inherit',
                                    'font-style' => 'normal',
                                    'text-decoration' => 'none',
                                    "white-space" => "nowrap",
                                    "padding" => '0px 0px 0px 0px',
                                    'margin' => '0px 0px 0px 0px',
                                ],
                                'css_hover' => (object)[],
                                'css_click' => (object)[],
                            ],
                            'header_mobileNav_icon' => [
                                "type" => "header_component",
                                'header_component' => 'header_mobileNav_icon',
                                'is_responsive' => '0',
                                "tag" => "div",
                                "class_selector" => "header_mobileNav_icon",
                                'accessibility' => [
                                    'header_components',
                                    'header_mobileNav_icon',
                                    'spacing','padding',
                                ],
                                "css" => [
                                    "text-decoration" => "unset",
                                    'position' => 'relative',
                                    "display" => "none",
                                    "grid-area" => "elem4",
                                    "align-self" => "center",
                                    "justify-self" => "end",
                                    'padding' => '0px 0px 0px 0px',
                                    'fill' => 'rgba(var(--color_4_1),1)',
                                    'stroke' => 'rgba(var(--color_4_1),1)',
                                ],
                                "css_mobile" => [
                                    "display" => "flex",
                                    "align-items" => "center",
                                    "justify-content" => "center",
                                    'padding' => '10px 10px 10px 10px',
                                ],
                                "class" => "show_mobileNav",
                                "children" => [
                                    'icon' => [
                                        "tag" => "svg",
                                        "class_selector" => "header_mobileNav_icon_svg",
                                        "css" => [
                                            "cursor" => "pointer",
                                            "width" => "25px",
                                            "height" => "auto",
                                            'aspect-ratio' => '1 / 1',
                                        ],
                                        "attr" => [
                                            "viewBox" => "0 0 24 24",
                                            "xmlns" => "http://www.w3.org/2000/svg",
                                        ],
                                        "children" => [
                                            [
                                                "tag" => "path",
                                                "attr" => [
                                                    "stroke-width" => "2",
                                                    "stroke-linecap" => "round",
                                                    "stroke-linejoin" => "round",
                                                    "d" => "M4 6H20M4 12H20M4 18H20",
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'header_drop_down_list' => [
                        'type' => 'header_drop_down_list',
                        'tag' => 'div',
                        'class_selector' => 'header_drop_down_list',
                        "transition" => "slide_down",
                        'font_style' => ['en'=>''],
                        'is_responsive' => '0',
                        'class' => 'none',
                        'accessibility' => [
                            'header_components',
                            'header_drop_down_list',
                            'spacing','padding',
                            'styling','border','box_shadow','border_radius',
                            'background','background_gradient','background_backdrop_filter',
                            'transition',
                        ],
                        'css' => [
                            'list-style-type' => 'none',
                            'position' => 'fixed',
                            'box-sizing' => 'border-box',
                            'display' => 'flex',
                            'flex-direction' => 'column',
                            'gap' => '0px',
                            'overflow' => 'hidden',
                            //
                            'padding' => '1px 1px 1px 1px',
                        ],
                    ],
                    'header_drop_down_list_item' => [
                        'class_selector' => 'header_drop_down_list_item',
                        'type' => 'header_drop_down_list_item',
                        'general_class' => '1',
                        'is_responsive' => '0',
                        'accessibility' => [
                            'header_components',
                            'interactions','can_hover','can_click',
                            'header_drop_down_list_item',
                            'spacing','padding',
                            'styling','border','box_shadow','border_radius',
                            'background','background_gradient','background_backdrop_filter',
                        ],
                        'font_style' => (object)[],
                        'css' => [
                            "width" => "100%",
                            'box-sizing' => 'border-box',
                            //
                            'padding' => '10px 10px 10px 10px',
                            "color" => "rgba(var(--color_4_1),1)",
                            "font-size" => "1em",
                            "font-weight" => "bold",
                            'font-style' => 'normal',
                            'text-decoration' => 'none',
                            "white-space" => "nowrap",
                        ],
                        'css_hover' => (object)[],
                        'css_click' => (object)[]
                    ],
                ],
            ]),
            'popup_window' => json_encode([ 
                'type' => 'popup_window',
                'tag' => 'div',
                'class_selector' => 'popup_container',
                'accessibility' => [],
                'css' => [
                    'position' => 'fixed',
                    'top' => '0',
                    'bottom' => '0',
                    'left' => '0',
                    'right' => '0',
                    'box-sizing' => 'border-box',
                    'z-index' => '120',
                    'padding' => '10%',
                    'overflow-y' => 'auto',
                    'display' => 'grid',
                    'align-items' => 'center',
                    'justify-items' => 'center',
                    'backdrop-filter' => 'blur(5px)',
                    'background-color' => 'rgba(var(--color_4_1),.2)'
                ],
                'css_mobile' => [
                    'padding-inline' => '5px',
                    'padding-block' => '5px'
                ],
                'class' => 'none',
                'children' => [
                    'popup_card' => [
                        'type' => 'popup_card',
                        'tag' => 'div',
                        'class_selector' => 'popup_card',
                        'transition' => 'slide_down',
                        'accessibility' => [
                            'popup_widnow',
                            'popup_window_close_icon',
                            'interactions',
                            'can_hover',
                            'can_click',
                            'spacing',
                            'padding',
                            'styling',
                            'border',
                            'border_radius',
                            'box_shadow',
                            'background',
                            'background_gradient',
                            'background_backdrop_filter',
                            'transition'
                        ],
                        'styling_target' => [
                            'interactions' => 'popup_window.children.popup_card.children.popup_close'
                        ],
                        'css' => [
                            'position' => 'relative',
                            'box-sizing' => 'border-box',
                            'animation-duration' => '400ms',
                            'padding' => '0px 0px 0px 0px',
                            'min-width' => '400px',
                            'min-height' => '200px',
                        ],
                        'css_mobile' => [
                            'width' => 'calc(100% - 20px)',
                            'min-width' => 'calc(100% - 20px)',
                            'max-width' => 'calc(100% - 20px)',
                            'padding' => '0px 0px 0px 0px'
                        ],
                        'class' => '',
                        'children' => [
                            'popup_close' => [
                                'tag' => 'svg',
                                'class_selector' => 'popup_close_icon',
                                'accessibility' => ['interactions','can_hover','can_click'],
                                'class' => 'popup_close',
                                'css' => [
                                    'position' => 'absolute',
                                    'cursor' => 'pointer',
                                    'z-index' => '10',
                                    'width' => '22px',
                                    'height' => 'auto',
                                    'aspect-ratio' => '1 / 1',
                                    'inset' => '10px 10px auto auto',
                                    'padding' => '2px',
                                    'border-radius' => '20px',
                                    'background-color' => 'rgba(var(--color_4_6),0.3)',
                                    'fill' => 'rgba(var(--color_4_4),1)',
                                    'stroke' => 'rgba(var(--color_4_4),1)'
                                ],
                                'css_mobile' => [
                                    'width' => '22px',
                                    'height' => 'auto',
                                    'aspect-ratio' => '1 / 1',
                                    'inset' => '10px 10px auto auto',
                                    'padding' => '2px',
                                    'border-radius' => '20px',
                                    'background-color' => 'rgba(var(--color_4_6),0.3)',
                                    'fill' => 'rgba(var(--color_4_4),1)',
                                    'stroke' => 'rgba(var(--color_4_4),1)'
                                ],
                                'css_hover' => (object)[],
                                'css_hover_mobile' => (object)[],
                                'css_click' => (object)[],
                                'css_click_mobile' => (object)[],
                                'attr' => [
                                    'viewBox' => '0 0 1024 1024',
                                    'xmlns' => 'http://www.w3.org/2000/svg'
                                ],
                                'children' => [
                                    [
                                        'tag' => 'path',
                                        'attr' => [
                                            'stroke-width' => '0',
                                            'd' => 'M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z'
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        'background' => [
                            'type' => 'color',
                            'color' => 'rgba(var(--color_1_7),1)'
                        ],
                        'background_mobile' => [
                            'type' => 'color',
                            'color' => 'rgba(var(--color_1_7),1)'
                        ]
                    ]
                ]
            ]),
            'website_colors' => '{"gradation":{"color_1_gradation":"50","color_2_gradation":"50","color_3_gradation":"50","color_4_gradation":"50"},"colors":{"color_1_1":{"r":0,"g":47,"b":84},"color_1_2":{"r":10,"g":97,"b":134},"color_1_3":{"r":60,"g":147,"b":184},"color_1_4":{"r":110,"g":197,"b":234},"color_1_5":{"r":160,"g":247,"b":255},"color_1_6":{"r":210,"g":255,"b":255},"color_1_7":{"r":255,"g":255,"b":255},"color_2_1":{"r":150,"g":0,"b":0},"color_2_2":{"r":200,"g":0,"b":0},"color_2_3":{"r":250,"g":46,"b":46},"color_2_4":{"r":255,"g":96,"b":96},"color_2_5":{"r":255,"g":146,"b":146},"color_2_6":{"r":255,"g":196,"b":196},"color_2_7":{"r":255,"g":255,"b":255},"color_3_1":{"r":0,"g":76,"b":64},"color_3_2":{"r":2,"g":126,"b":114},"color_3_3":{"r":52,"g":176,"b":164},"color_3_4":{"r":102,"g":226,"b":214},"color_3_5":{"r":152,"g":255,"b":255},"color_3_6":{"r":202,"g":255,"b":255},"color_3_7":{"r":255,"g":255,"b":255},"color_4_1":{"r":"0","g":"0","b":"0"},"color_4_2":{"r":"42","g":"42","b":"42"},"color_4_3":{"r":"84","g":"84","b":"84"},"color_4_4":{"r":"126","g":"126","b":"126"},"color_4_5":{"r":"168","g":"168","b":"168"},"color_4_6":{"r":"210","g":"210","b":"210"},"color_4_7":{"r":"252","g":"252","b":"252"}},"custom_colors":{"_star":{"r":"255","g":"190","b":"11"},"_success":{"r":"91","g":"186","b":"111"},"_error":{"r":"193","g":"18","b":"31"},"_warning":{"r":"251","g":"86","b":"7"}}}',
            'page_setup' => '{"mobile_max_width":"720px","max_width":"1400px","pageTransition":"fade","transitionDuration":"648ms","smooth_scroll":"0","smooth_scroll_distance":"678px","smooth_scroll_duration":"835ms","font_style":{"en":"Assistant"},"font_color":"rgba(var(--color_4_2),1)","bg_color":"rgba(var(--color_4_7),1)","font_size":"1em","line_height":"1.3em","letter_spacing":"0px"}',
            'home' => json_encode([]),
            'login' => json_encode([
                'type' => 'form_elements',
                'name' => 'Login Form',
                'access_key_tree' => 'form_elements.website_form',
                'tag' => 'div',
                "general_class_selector" => "website_form",
                'children' => [
                    [
                        'general_html' => 'form_elements.form_loading_spinner',
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_title',
                        'access_key_tree' => 'form_elements.form_title',
                        'tag' => 'div',
                        "general_class_selector" => "form_title",
                        'text' => ['key' => 'authentication.login'],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_message',
                        'access_key_tree' => 'form_elements.form_message',
                        'tag' => 'div',
                        "general_class_selector" => "form_message",
                        'text' => ['key' => 'authentication.login_description'],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            'class' => 'login_email',
                            'children.input_label.text.key' => 'authentication.email',
                            'children.input_box.placeholder.key' => 'authentication.email',
                            'children.input_box.attr.type' => 'text',
                        ],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            '_name' => 'hidden',
                            'class' => 'login_password',
                            'children.input_label.text.key' => 'authentication.password',
                            'children.input_box.placeholder.key' => 'authentication.password',
                            'children.input_box.attr.type' => 'password',
                        ],
                    ],
                    [
                        'general_html' => 'form_elements.form_check_box',
                        'replace' =>[
                            'children.check_box.children.check_box.class' => 'login_remember_me check_box',
                            'children.check_box.children.check_box_text' => [
                                'tag' => 'span',
                                'class_selector' => 'login_form_remeber_me_text',
                                'css' => [
                                    'margin-left' => '5px',
                                    'vertical-align' => 'middle',
                                    'display' => 'inline-block',
                                ],
                                'text' => ['key' => 'authentication.remember_me'],
                            ],

                        ]
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_button',
                        'access_key_tree' => 'form_elements.form_button',
                        'tag' => 'button',
                        'general_class_selector' => 'form_button',
                        'text' => ['key' => 'authentication.login'],
                        'class' => 'login_button',
                    ],
                    [
                        'tag' => 'div',
                        'children' => [
                            [
                                'tag' => 'div',
                                'children' => [
                                    [
                                        'tag' => 'a',
                                        'text' => ['key' => 'authentication.forget_password_q'],
                                        'class' => 'open_popup',
                                        'attr' => [
                                            'popup' => 'reset_password_1',
                                            'input_focus' => '.reset_password_1_email .form_input_box_input',
                                        ]
                                    ]
                                ]
                            ],
                            [
                                'tag' => 'div',
                                'children' => [
                                    [
                                        'tag' => 'span',
                                        'html' => '&nbsp;',
                                        'text' => ['key' => 'authentication.dont_have_account_q'],
                                    ],
                                    [
                                        'tag' => 'a',
                                        'text' => ['key' => 'authentication.signup'],
                                        'class' => 'open_popup',
                                        'attr' => [
                                            'popup' => 'signup',
                                            'input_focus' => '.signup_name .form_input_box_input',
                                        ]
                                    ]
                                ]
                            ],
                        ]
                    ]
                ] 
            ]),
            'signup' => json_encode([
                'type' => 'form_elements',
                'name' => 'Signup Form',
                'access_key_tree' => 'form_elements.website_form',
                'tag' => 'div',
                "general_class_selector" => "website_form",
                'children' => [
                    [
                        'general_html' => 'form_elements.form_loading_spinner',
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_title',
                        'access_key_tree' => 'form_elements.form_title',
                        'tag' => 'div',
                        "general_class_selector" => "form_title",
                        'text' => ['key' => 'authentication.signup'],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_message',
                        'access_key_tree' => 'form_elements.form_message',
                        'tag' => 'div',
                        "general_class_selector" => "form_message",
                        // 'text' => ['key' => 'authentication.login_description'],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            'class' => 'signup_name',
                            'children.input_label.text.key' => 'authentication.name',
                            'children.input_box.placeholder.key' => 'authentication.name',
                            'children.input_box.attr.type' => 'text',
                        ],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            '_name' => 'hidden',
                            'class' => 'signup_email',
                            'children.input_label.text.key' => 'authentication.email',
                            'children.input_box.placeholder.key' => 'authentication.email',
                            'children.input_box.attr.type' => 'text',
                        ],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            '_name' => 'hidden',
                            'class' => 'signup_password',
                            'children.input_label.text.key' => 'authentication.password',
                            'children.input_box.placeholder.key' => 'authentication.password',
                            'children.input_box.attr.type' => 'password',
                        ],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            '_name' => 'hidden',
                            'class' => 'signup_password_confirm',
                            'children.input_label.text.key' => 'authentication.confirm_password',
                            'children.input_box.placeholder.key' => 'authentication.confirm_password',
                            'children.input_box.attr.type' => 'password',
                        ],
                    ],
                    [
                        'general_html' => 'form_elements.form_check_box',
                        'replace' =>[
                            'children.check_box.children.check_box.class' => 'signup_privacy_policy check_box',
                            'children.check_box.children.check_box.children.icon.class' => 'check_box_marker none',

                            'children.check_box.children.check_box_text' => [
                                'tag' => 'span',
                                'class_selector' => 'signup_privacy_policy_text',
                                'css' => [
                                    'margin-left' => '5px',
                                    'vertical-align' => 'middle',
                                    'display' => 'inline-block',
                                ],
                                'children' => [
                                    [
                                        'tag' => 'span',
                                        'text' => ['key' => 'other.agree_with'],
                                        'html' => '&nbsp;',
                                    ],
                                    [
                                        'tag' => 'a',
                                        'text' => ['key' => 'other.privacy_policy'],
                                        'class' => 'open_page',
                                        'attr' => [
                                            'href' => '/privacy_policy',
                                            'page' => 'privacy_policy',
                                        ]
                                    ]
                                ]
                            ],
                        
                        ],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_button',
                        'access_key_tree' => 'form_elements.form_button',
                        'tag' => 'button',
                        'general_class_selector' => 'form_button',
                        'text' => ['key' => 'authentication.signup'],
                        'class' => 'signup_button',
                    ],
                    [
                        'tag' => 'div',
                        'children' => [
                            [
                                'tag' => 'span',
                                'text' => ['key' => 'authentication.have_account_login'],
                                'html' => '&nbsp;',
                            ],
                            [
                                'tag' => 'a',
                                'text' => ['key' => 'authentication.login'],
                                'class' => 'open_popup',
                                'attr' => [
                                    'popup' => 'login',
                                    'input_focus' => '.login_email .form_input_box_input',
                                ]
                            ]
                        ]
                    ]
                ]
            ]),
            'reset_password_1' => json_encode([
                'type' => 'form_elements',
                'name' => 'Reset password setp 1 Form',
                'access_key_tree' => 'form_elements.website_form',
                'tag' => 'div',
                "general_class_selector" => "website_form",
                'children' => [
                    [
                        'general_html' => 'form_elements.form_loading_spinner',
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_title',
                        'access_key_tree' => 'form_elements.form_title',
                        'tag' => 'div',
                        "general_class_selector" => "form_title",
                        'text' => ['key' => 'authentication.reset_password'],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_message',
                        'access_key_tree' => 'form_elements.form_message',
                        'tag' => 'div',
                        "general_class_selector" => "form_message",
                        'text' => ['key' => 'authentication.reset_password_description'],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            'class' => 'reset_password_1_email',
                            'children.input_label.text.key' => 'authentication.email',
                            'children.input_box.placeholder.key' => 'authentication.email',
                            'children.input_box.attr.type' => 'text',
                        ],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_button',
                        'access_key_tree' => 'form_elements.form_button',
                        'tag' => 'button',
                        'general_class_selector' => 'form_button',
                        'text' => ['key' => 'authentication.reset_password_send_code'],
                        'class' => 'reset_password_1_button',
                    ],
                ]
            ]),
            'reset_password_2' => json_encode([
                'type' => 'form_elements',
                'name' => 'Reset password setp 3 Form',
                'access_key_tree' => 'form_elements.website_form',
                'tag' => 'div',
                "general_class_selector" => "website_form",
                'children' => [
                    [
                        'general_html' => 'form_elements.form_loading_spinner',
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_title',
                        'access_key_tree' => 'form_elements.form_title',
                        'tag' => 'div',
                        "general_class_selector" => "form_title",
                        'text' => ['key' => 'authentication.reset_password'],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_message',
                        'access_key_tree' => 'form_elements.form_message',
                        'tag' => 'div',
                        "general_class_selector" => "form_message",
                        'text' => ['key' => 'authentication.reset_password_sent'],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            'class' => 'reset_password_2_code',
                            'children.input_label.text.key' => 'authentication.reset_password_code',
                            'children.input_box.placeholder.key' => 'authentication.reset_password_code',
                            'children.input_box.attr.type' => 'text',
                        ],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_button',
                        'access_key_tree' => 'form_elements.form_button',
                        'tag' => 'button',
                        'general_class_selector' => 'form_button',
                        'text' => ['key' => 'other.confirm'],
                        'class' => 'reset_password_2_button',
                    ],
                    
                ]
            ]),
            'reset_password_3' => json_encode([
                'type' => 'form_elements',
                'name' => 'Reset password setp 2 Form',
                'access_key_tree' => 'form_elements.website_form',
                'tag' => 'div',
                "general_class_selector" => "website_form",
                'children' => [
                    [
                        'general_html' => 'form_elements.form_loading_spinner',
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_title',
                        'access_key_tree' => 'form_elements.form_title',
                        'tag' => 'div',
                        "general_class_selector" => "form_title",
                        'text' => ['key' => 'authentication.reset_password'],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_message',
                        'access_key_tree' => 'form_elements.form_message',
                        'tag' => 'div',
                        "general_class_selector" => "form_message",
                        'text' => ['key' => 'authentication.reset_password_enter_new_password'],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            'class' => 'reset_password_3_password',
                            'children.input_label.text.key' => 'authentication.password',
                            'children.input_box.placeholder.key' => 'authentication.password',
                            'children.input_box.attr.type' => 'password',
                        ],
                    ],
                    [
                        'general_html' => 'form_elements.form_input_box',
                        'replace' => [
                            '_name' => 'hidden',
                            'class' => 'reset_password_3_password_confirm',
                            'children.input_label.text.key' => 'authentication.confirm_password',
                            'children.input_box.placeholder.key' => 'authentication.confirm_password',
                            'children.input_box.attr.type' => 'password',
                        ],
                    ],
                    [
                        'type' => 'form_element',
                        'form_element' => 'form_button',
                        'access_key_tree' => 'form_elements.form_button',
                        'tag' => 'button',
                        'general_class_selector' => 'form_button',
                        'text' => ['key' => 'other.save'],
                        'class' => 'reset_password_3_button',
                    ],
                ]
            ]),
            'account' => json_encode([
                [
                    'name' => 'User profile section',
                    'sort' => 0,
                    'type' => 'section',
                    'tag' => 'section',
                    'accessibility' => [
                        'user_account_section',
                        'interactions','can_hover',
                        'add_section',
                        'section_swap',
                        'section_sizing',
                        'section_spacing',
                        'section_adapt_header', 
                        'section_driver',
                        'background','background_gradient','background_image',
                    ],
                    'class_selector' => 'user_account_section',
                    'css' => [
                        'position' => 'relative',
                        'box-sizing' => 'border-box',
                        'width' => '100%',
                    ],
                    'attr' => [
                        'adapt_header' => '0',
                        'adapt_header_color' => 'rgba(var(--color_4_7),1)',
                    ],
                    'class' => '',
                    'has_driver' => '0',
                    'driver' => $driver,
                    'children' => [
                        'section_wrapper' => [
                            'tag' => 'div',
                            'type' => 'section_wrapper',
                            'class_selector' => 'section_wrapper_user_account_section',
                            'css' => [
                                'grid-template-areas' => "'elem1'",
                                'grid-template-columns' => 'repeat(1, 1fr)',

                                'box-sizing' => 'border-box',
                                'position' => 'relative',
                                'display' => 'grid',
                                'padding-right' =>'0px',
                                'padding-left' =>'0px',
                                'margin-right' => 'auto',
                                'margin-left' => 'auto',
                
                                'max-width' => 'var(--page_max_width)',
                                'min-height' => '500px',
                                'padding-top' => '100px',
                                'padding-bottom' => '100px',
                                'grid-gap' => '10px',
                                'margin-top' => '0px',
                                'margin-bottom' => '0px',
                            ],
                            'css_mobile' => [
                                'grid-template-areas' => "'elem1'",
                                'grid-template-columns' => 'repeat(1, 1fr)',
                            ],
                            'children' => [
                                [
                                    'type' => 'section_block',
                                    'tag' => 'div',
                                    'accessibility' => [
                                        'interactions','can_hover',
                                        'alignment',
                                        'arrange',
                                        'spacing','margin','padding',
                                        'styling','border','border_radius','box_shadow',
                                        'animation',
                                        'background','background_gradient','background_backdrop_filter','background_image',
                                        'block_elems',
                                    ],
                                    'class' => 'user_account',
                                    'class_selector' => 'section_block_user_account',
                                    'css' => [
                                        'display' => 'flex',
                                        'position' => 'relative',
                                        'box-sizing' => 'border-box',
                                        'grid-area' => "'elem1'",
                                        'z-index' =>'1',
                                        'flex-direction' => 'column',
                                        'flex-wrap' => 'nowrap',
                                        'align-items' => 'center',
                                        'justify-content' => 'center',
                                        'margin' =>'0px 0px 0px 0px',
                                        'padding' =>'0px 0px 0px 0px',
                                        'overflow' =>'visible',
                                    ],
                                    'css_mobile' => [
                                        'flex-direction' => 'column',
                                        'flex-wrap' => 'nowrap',
                                        'align-items' => 'center',
                                        'justify-content' => 'center',
                                        'margin' =>'0px 0px 0px 0px',
                                        'padding' =>'0px 0px 0px 0px',
                                        'overflow' =>'visible',
                                    ],
                                    'children' => [

                                    ]
                                ],
                            ]
                        ]
                    ]
                ]
            ]),
            
            // 'loading_screen' => json_encode([
            //     [
            //         'name' => 'Loading screen',   
            //         'sort' => '0',
            //         'type' => 'section',
            //         'tag' => 'section',
            //         'accessibility' => [
            //             'section_sizing',
            //             'section_spacing',
            //             'background',
            //         ],
            //         'class_selector' => 'loading_screen_section',
            //         'css' => [
            //             'position' => 'relative',
            //             'box-sizing' => 'border-box',
            //             'width' => '100%',
            //         ],
            //         'css_mobile' => [],
            //         'background' => $background_color,
            //         'background_mobile' => $background_color,
            //         'class' => '',
            //         'children' => [
            //             'section_wrapper' => [
            //                 'tag' => 'div',
            //                 'class_selector' => 'loading_screen_wrapper',
            //                 'css' => [
            //                     'grid-template-areas' => "'elem1'",
            //                     'grid-template-columns' => 'repeat(1, 1fr)',
            //                     'position' => 'relative',
            //                     'box-sizing' => 'border-box',
            //                     'display' => 'grid',
            //                     'padding-right' =>'0px',
            //                     'padding-left' =>'0px',
            //                     'margin-right' => 'auto',
            //                     'margin-left' => 'auto',
            //                     'max-width' => 'var(--page_max_width)',
            //                     'min-height' => 'var(--screen_height)',
            //                     'padding-top' => '100px',
            //                     'padding-bottom' => '100px',
            //                     'grid-gap' => '10px',
            //                     'margin-top' => '0px',
            //                     'margin-bottom' => '0px',
            //                 ],
            //                 'css_mobile' => [
            //                     'max-width' => 'var(--page_max_width)',
            //                     'min-height' => 'var(--screen_height)',
            //                     'padding-top' => '100px',
            //                     'padding-bottom' => '100px',
            //                     'grid-gap' => '5px',
            //                     'margin-top' => '0px',
            //                     'margin-bottom' => '0px',
            //                 ],
            //                 'children' => [
            //                     [
            //                         'type' => 'section_block',
            //                         'tag' => 'div',
            //                         'sort' => '0',
            //                         'accessibility' => [
            //                             // 'add_elem','add_elem_title','add_elem_paragraph','add_elem_image','add_elem_button','add_elem_icon',
            //                             // 'copy',
            //                             'alignment',
            //                             // 'block_arrange',
            //                             'spacing','margin','padding',
            //                             'styling','border','border_radius','box_shadow',
            //                             'animation',
            //                             'background',
            //                             'block_elems',
            //                         ],
            //                         'class' => '',
            //                         'class_selector' => 'loading_screen_block',
            //                         'background' => $background,
            //                         'background_mobile' => $background,
            //                         'css' => [
            //                             'display' =>  'flex',
            //                             'position' =>  'relative',
            //                             'box-sizing' =>  'border-box',
            //                             'grid-area' =>  'elem1',
            //                             'z-index' => '1',
            //                             'flex-direction' => 'column',
            //                             'flex-wrap' => 'nowrap',
            //                             'align-items' => 'center',
            //                             'justify-content' => 'center',
            //                             'padding' => '10px 20px 10px 20px',
            //                             'margin' => '5px 5px 5px 5px',
            //                             'border-top' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-right' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-bottom' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-left' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-radius' =>'0px 0px 0px 0px',
            //                             'box-shadow' => 'none',
            //                         ],
            //                         'css_mobile' => [
            //                             'flex-direction' => 'column',
            //                             'flex-wrap' => 'nowrap',
            //                             'align-items' => 'center',
            //                             'justify-content' => 'center',
            //                             'padding' => '10px 10px 10px 10px',
            //                             'margin' => '5px 5px 5px 5px',
            //                             'border-top' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-right' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-bottom' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-left' => '0px none rgba(var(--color_4_1),1)',
            //                             'border-radius' => '0px 0px 0px 0px',
            //                             'box-shadow' => 'none',
            //                         ],
            //                         'animation' => $animation,
            //                         'animation_mobile' => $animation,
            //                         'children' => [
            //                             [
            //                                 'type' => 'elem',
            //                                 'elem_type' => 'title',
            //                                 'tag' => 'h1',
            //                                 'sort' => '0',
            //                                 'accessibility' => ['elem_swap','font','display','elem_arrange','sizing','width','height','spacing','margin','padding','styling','filter','border','border_radius','box_shadow','transform','animation','background'],
            //                                 'class_selector' => 'loading_screen_title',
            //                                 'font_style' => [],
            //                                 'background' => $background,
            //                                 'background_mobile' => $background,
            //                                 'css' => [
            //                                     'box-sizing' => 'border-box',
            //                                     'position' => 'relative',
            //                                     'z-index' => '1',
            //                                     'display' => 'block',
            //                                     'overflow' => 'visible',
            //                                     'align-self' => 'auto',
            //                                     'width' => 'auto',
            //                                     'min-width' => 'auto',
            //                                     'max-width' => '100%',
            //                                     'height' => 'auto',
            //                                     'min-height' => 'auto',
            //                                     'max-height' => '100%',
            //                                     'font-weight' => 'normal',
            //                                     'text-decoration' => 'normal',
            //                                     'font-style' => 'normal',
            //                                     'line-height' => '1.3em',
            //                                     'letter-spacing' => '0.05em',
            //                                     'font-size' => '1.5em',
            //                                     'text-align' => 'start',
            //                                     'padding' => '10px 20px 10px 20px',
            //                                     'margin' => '5px 5px 5px 5px',
            //                                     'border-top' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-right' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-bottom' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-left' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-radius' => '0px 0px 0px 0px',
            //                                     'box-shadow' => 'none',
            //                                     'filter' => $filter,
            //                                     'transform' => $transform,
            //                                     'transform-origin' => 'center',
            //                                 ],
            //                                 'css_mobile' => [
            //                                     'display' => 'block',
            //                                     'overflow' => 'visible',
            //                                     'align-self' => 'auto',
            //                                     'width' => 'auto',
            //                                     'min-width' => 'auto',
            //                                     'max-width' => '100%',
            //                                     'height' => 'auto',
            //                                     'min-height' => 'auto',
            //                                     'max-height' => '100%',
            //                                     'font-weight' => 'normal',
            //                                     'text-decoration' => 'normal',
            //                                     'font-style' => 'normal',
            //                                     'line-height' => '1.3em',
            //                                     'letter-spacing' => '0.05em',
            //                                     'font-size' => '1.5em',
            //                                     'text-align' => 'start',
            //                                     'padding' => '10px 20px 10px 20px',
            //                                     'margin' => '5px 5px 5px 5px',
            //                                     'border-top' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-right' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-bottom' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-left' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-radius' => '0px 0px 0px 0px',
            //                                     'box-shadow' => 'none',
            //                                     'filter' => $filter,
            //                                     'transform' => $transform,
            //                                     'transform-origin' => 'center',
            //                                 ],
            //                                 'animation' => $animation,
            //                                 'animation_mobile' => $animation,
            //                                 'class' => 'page_title',
            //                                 // 'text' => ['key' => 'page.title']
            //                             ],
            //                             [
            //                                 'type' => 'elem',
            //                                 'elem_type' => 'paragraph',
            //                                 'tag' => 'p',
            //                                 'sort' => '0',
            //                                 'accessibility' => ['elem_swap','font','display','elem_arrange','sizing','width','height','spacing','margin','padding','styling','filter','border','border_radius','box_shadow','transform','animation','background'],
            //                                 'class_selector' => 'loading_screen_description',
            //                                 'font_style' => [],
            //                                 'background' => $background,
            //                                 'background_mobile' => $background,
            //                                 'css' => [
            //                                     'box-sizing' => 'border-box',
            //                                     'position' => 'relative',
            //                                     'z-index' => '2',
            //                                     'display' => 'block',
            //                                     'overflow' => 'visible',
            //                                     'align-self' => 'auto',
            //                                     'width' => 'auto',
            //                                     'min-width' => 'auto',
            //                                     'max-width' => '400px',
            //                                     'height' => 'auto',
            //                                     'min-height' => 'auto',
            //                                     'max-height' => '100%',
            //                                     'font-weight' => 'normal',
            //                                     'text-decoration' => 'normal',
            //                                     'font-style' => 'normal',
            //                                     'line-height' => '1.3em',
            //                                     'letter-spacing' => '0.05em',
            //                                     'font-size' => '1em',
            //                                     'text-align' => 'center',
            //                                     'padding' => '0px 0px 0px 0px',
            //                                     'margin' => '0px 0px 0px 0px',
            //                                     'border-top' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-right' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-bottom' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-left' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-radius' => '0px 0px 0px 0px',
            //                                     'box-shadow' => 'none',
            //                                     'filter' => $filter,
            //                                     'transform' => $transform,
            //                                     'transform-origin' => 'center',
            //                                 ],
            //                                 'css_mobile' => [
            //                                     'display' => 'block',
            //                                     'overflow' => 'visible',
            //                                     'align-self' => 'auto',
            //                                     'width' => 'auto',
            //                                     'min-width' => 'auto',
            //                                     'max-width' => '100%',
            //                                     'height' => 'auto',
            //                                     'min-height' => 'auto',
            //                                     'max-height' => '100%',
            //                                     'font-weight' => 'normal',
            //                                     'text-decoration' => 'normal',
            //                                     'font-style' => 'normal',
            //                                     'line-height' => '1.3em',
            //                                     'letter-spacing' => '0.05em',
            //                                     'font-size' => '1em',
            //                                     'text-align' => 'center',
            //                                     'padding' => '0px 0px 0px 0px',
            //                                     'margin' => '0px 0px 0px 0px',
            //                                     'border-top' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-right' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-bottom' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-left' => '0px none rgba(var(--color_4_1),1)',
            //                                     'border-radius' => '0px 0px 0px 0px',
            //                                     'box-shadow' => 'none',
            //                                     'filter' => $filter,
            //                                     'transform' => $transform,
            //                                     'transform-origin' => 'center',
            //                                 ],
            //                                 'animation' => $animation,
            //                                 'animation_mobile' => $animation,
            //                                 'class' => 'page_description',
            //                                 // 'text' => ['key' => 'page.description']
            //                             ]
            //                         ]
            //                     ]
            //                 ]
            //             ]
            //         ],
            //     ]
            // ]),
        ]);

        website::where('id',2)->update(['template_id'=>$template->_id]);

    }
}

