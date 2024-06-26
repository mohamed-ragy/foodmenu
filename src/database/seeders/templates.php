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
        template::where('name','Test template')->delete();
        $template = template::create([
            'website_id' => 1,
            'name' => 'Test template',
            'settings' => json_encode([
                'view' => 'desktop',
                'mobile_view_width' => '414',
                'mobile_view_height' => '736',
                'animations' => [
                    
                ],
                'font_styles' => [
                    
                ]
            ]),
            'website_colors' => json_encode([
                'gradation' => [
                    'color_1_gradation' => '50',
                    'color_2_gradation' => '50',
                    'color_3_gradation' => '50',
                    'color_4_gradation' => '50',
                ],
                'colors' => [
                    'color_1_1' => ['r'=>'0','g'=>'0','b'=>'0'],
                    'color_1_2' => ['r'=>'42','g'=>'42','b'=>'42'],
                    'color_1_3' => ['r'=>'84','g'=>'84','b'=>'84'],
                    'color_1_4' => ['r'=>'126','g'=>'126','b'=>'126'],
                    'color_1_5' => ['r'=>'168','g'=>'168','b'=>'168'],
                    'color_1_6' => ['r'=>'210','g'=>'210','b'=>'210'],
                    'color_1_7' => ['r'=>'252','g'=>'252','b'=>'252'],

                    'color_2_1' => ['r'=>'0','g'=>'0','b'=>'0'],
                    'color_2_2' => ['r'=>'42','g'=>'42','b'=>'42'],
                    'color_2_3' => ['r'=>'84','g'=>'84','b'=>'84'],
                    'color_2_4' => ['r'=>'126','g'=>'126','b'=>'126'],
                    'color_2_5' => ['r'=>'168','g'=>'168','b'=>'168'],
                    'color_2_6' => ['r'=>'210','g'=>'210','b'=>'210'],
                    'color_2_7' => ['r'=>'252','g'=>'252','b'=>'252'],

                    'color_3_1' => ['r'=>'0','g'=>'0','b'=>'0'],
                    'color_3_2' => ['r'=>'42','g'=>'42','b'=>'42'],
                    'color_3_3' => ['r'=>'84','g'=>'84','b'=>'84'],
                    'color_3_4' => ['r'=>'126','g'=>'126','b'=>'126'],
                    'color_3_5' => ['r'=>'168','g'=>'168','b'=>'168'],
                    'color_3_6' => ['r'=>'210','g'=>'210','b'=>'210'],
                    'color_3_7' => ['r'=>'252','g'=>'252','b'=>'252'],

                    'color_4_1' => ['r'=>'0','g'=>'0','b'=>'0'],
                    'color_4_2' => ['r'=>'42','g'=>'42','b'=>'42'],
                    'color_4_3' => ['r'=>'84','g'=>'84','b'=>'84'],
                    'color_4_4' => ['r'=>'126','g'=>'126','b'=>'126'],
                    'color_4_5' => ['r'=>'168','g'=>'168','b'=>'168'],
                    'color_4_6' => ['r'=>'210','g'=>'210','b'=>'210'],
                    'color_4_7' => ['r'=>'252','g'=>'252','b'=>'252'],
                ],
                'custom_colors' => [
                    '_star' => ['r'=>'255','g'=>'190','b'=>'11'],
                    '_success' => ['r'=>'91','g'=>'186','b'=>'111'],
                    '_error' => ['r'=>'193','g'=>'18','b'=>'31'],
                    '_warning' => ['r'=>'251','g'=>'86','b'=>'7'],
                ],
            ]),
            'font_style' => json_encode([
                'font_1' => [
                    'name' => 'playfairDisplay',
                    'line_height' => '1.5em',
                    'letter_spacing' => '0.8px',
                ],
                'font_2' => [
                    'name' => 'Nunito',
                    'line_height' => '1.3em',
                    'letter_spacing' => '0.2px',
                ],
                'font_3' => [
                    'name' => 'signikaNegative',
                    'line_height' => '1.3em',
                    'letter_spacing' => '0.2px',
                ],
                'google_font' => [
                    "name" => null,
                    "link" => null,
                ]
            ]),
            'page_setup' => json_encode([
                'mobile_max_width' => '720px',
                "max_width" => "1400px",
                "pageTransition" => "fade",
                "transitionDuration" => "648ms",
                "smooth_scroll" => "0",
                "smooth_scroll_distance" => "678px",
                "smooth_scroll_duration" => "835ms",
                'font_style' => 'Rubik',
            ]),
            'form_elements' => json_encode([
                'spacing' => '10px',
                'elems' => [
                    'form' => [
                        'class_selector' => 'form',
                        'css' => [
                            'align-items' => 'flex-start',
                            //
                            'display' => 'flex',
                            'flex-direction' => 'column',
                            'justify-content' => 'flex-start',
                            'width' => 'fit-content',
                        ]
                    ],
                    'input_label' => [
                        'class_selector' => 'input_label',
                        'font_style' => 'font_1',
                        'css' => [
                            'margin-bottom' => 'var(--form_elem_spacing)',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'font-size' => '0.9em',
                            'margin-inline' => '3px',
                        ]
                    ],
                    'input' => [
                        'class_selector' => 'input',
                        'font_style' => 'font_1',
                        'css' => [
                            'margin-bottom' => 'var(--form_elem_spacing)',
                            'max-width' => '100%',
                            'box-sizing' =>  'border-box',
                            'outline-style' =>  'solid',
                            'outline-width' =>  '0px',
                            'outline-color' =>  'transparent',
                            //
                            'text-align' => 'center',
                            'padding-block' => '7px',
                            'padding-inline' => '10px',
                            'font-size' => '1em',
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-color' => 'rgba(0,0,0,1)',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '1px',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                            'transition-duration' => '300ms',
                        ],
                        'css_focus' => [
                            'outline-style' => 'solid',
                            //
                            'background-color' =>  'rgba(250,250,250,1)',
                            'color' => 'rgba(0,0,0,1)',
                            'outline-width' =>  '1px',
                            'outline-color' =>  'rgba(0,0,0,.2)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.2)',
                        ],
                        'css_read-only' => [
                            'cursor' => 'not-allowed',
                        ],
                    ],
                    'checkbox' => [
                        'tag' => 'svg',
                        'class_selector' => 'checkbox',
                        'css' => [
                            'border-style' => 'solid',
                            'border-width' => '1px',
                            'fill' => 'none',
                            'position' => 'relative',
                            'cursor' => 'pointer',
                            'margin-bottom' => 'var(--form_elem_spacing) 0',
                            //
                            'border-radius' => '5px',
                            'width' => '1em',
                            'height' => '1em',
                            'padding' => '2px',
                            'border-color'=> 'rgba(0,0,0,1)',
                        ],
                        'attr' => [
                            'viewBox' => '0 -8 72 72',
                            'xmlns' => 'http://www.w3.org/2000/svg',
                            'stroke-linecap' => 'round',
                            'stroke-linejoin' => 'round',
                            'fill-rule' => 'evenodd',
                            'clip-rule' => 'evenodd',
                        ],
                        'children' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'stroke-width' => '0px',
                                    'd' => 'M61.07,12.9,57,8.84a2.93,2.93,0,0,0-4.21,0L28.91,32.73,19.2,23A3,3,0,0,0,15,23l-4.06,4.07a2.93,2.93,0,0,0,0,4.21L26.81,47.16a2.84,2.84,0,0,0,2.1.89A2.87,2.87,0,0,0,31,47.16l30.05-30a2.93,2.93,0,0,0,0-4.21Z',
                                ]
                            ],
                        ],
                    ],
                    'checkbox_checked' => [
                        'class_selector' => 'checkbox_checked',
                        'css' => [
                            'stroke' => 'rgba(0,0,0,1)',
                            'fill' => 'rgba(0,0,0,1)',
                        ],
                    ],
                    'button1' => [
                        'class_selector' => 'button1',
                        'font_style' => 'font_1',
                        'css' => [
                            'margin-bottom' => 'var(--form_elem_spacing)',
                            'max-width' => '100%',
                            'box-sizing' =>  'border-box',
                            'outline' =>  'none',
                            'cursor' =>  'pointer',
                            //
                            'padding-block' => '7px',
                            'padding-inline' => '10px',
                            'font-size' => '1em',
                            'font-weight' => 'bold',
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                            'transition-duration' => '300ms',
                        ],
                        'css_hover' => [
                            'outline-style' => 'solid',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ],
                        'css_active' => [
                            'outline-style' => 'solid',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ],
                        'css_disabled' => [
                            'outline-style' => 'solid',
                            'cursor' => 'not-allowed',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ]
                    ],
                    'button2' => [
                        'class_selector' => 'button2',
                        'font_style' => 'font_1',
                        'css' => [
                            'margin-bottom' => 'var(--form_elem_spacing)',
                            'max-width' => '100%',
                            'box-sizing' =>  'border-box',
                            'outline' =>  'none',
                            'cursor' =>  'pointer',
                            //
                            'padding-block' => '7px',
                            'padding-inline' => '10px',
                            'font-size' => '1em',
                            'font-weight' => 'bold',
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                            'transition-duration' => '300ms',
                        ],
                        'css_hover' => [
                            'outline-style' => 'solid',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ],
                        'css_active' => [
                            'outline-style' => 'solid',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ],
                        'css_disabled' => [
                            'outline-style' => 'solid',
                            'cursor' => 'not-allowed',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ]
                    ],
                    'button3' => [
                        'class_selector' => 'button3',
                        'font_style' => 'font_1',
                        'css' => [
                            'margin-bottom' => 'var(--form_elem_spacing)',
                            'max-width' => '100%',
                            'box-sizing' =>  'border-box',
                            'outline' =>  'none',
                            'cursor' =>  'pointer',
                            //
                            'padding-block' => '7px',
                            'padding-inline' => '10px',
                            'font-size' => '1em',
                            'font-weight' => 'bold',
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                            'transition-duration' => '300ms',
                        ],
                        'css_hover' => [
                            'outline-style' => 'solid',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ],
                        'css_active' => [
                            'outline-style' => 'solid',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ],
                        'css_disabled' => [
                            'outline-style' => 'solid',
                            'cursor' => 'not-allowed',
                            'outline' =>  'none',
                            //
                            'color' => 'rgba(0,0,0,1)',
                            'background-color' => 'rgba(255,255,255,1)',
                            'border-top-left-radius' => '3px',
                            'border-top-right-radius' => '3px',
                            'border-bottom-right-radius' => '3px',
                            'border-bottom-left-radius' => '3px',
                            'border-style' => 'solid solid solid solid',
                            'border-width' => '0px',
                            'border-color' => 'rgba(0,0,0,1)',
                            'box-shadow' =>  '0px 0px 0px 0px rgba(0,0,0,.1)',
                        ]
                    ]
                ],
            ]),
            'loading_spinner' => json_encode([
                "key" => "0",
                "elem" => "<div class=\"loading_spinner_0_:size:\"></div>",
                "colors" => [
                    "loading_spinner_c1" => "rgb(237, 237, 237)",
                    "loading_spinner_c2" => "rgba(29,151,179,1)",
                ],
            ]),
            'website_header' => json_encode([
                "adapted_font_color" => "rgba(69,69,69,1)",
                'header_drop_down_list_item' => [
                    'class_selector' => 'header_drop_down_list_item',
                    'font_style' => 'font_1',
                    'css' => [
                        "width" => "100%",
                        'box-sizing' => 'border-box',
                        "text-decoration" => "unset !important",
                        "display" => 'flex',
                        'align-items' => 'center',
                        'justify-content' => 'flex-start',

                        //
                        "min-width" => "100px",
                        "padding-top" => "10px",
                        "padding-bottom" => "10px",
                        "padding-left" => "10px",
                        "padding-right" => "25px",
                        "border-bottom-left-radius" => "1px",
                        "border-bottom-right-radius" => "1px",
                        "border-top-left-radius" => "1px",
                        "border-top-right-radius" => "1px",
                        "background-color" => "rgba(255,255,255,1)",
                        "color" => "rgba(50,50,50,1) !important",
                        "font-size" => "0.9em",
                        'font-weight' => 'normal',
                    ],
                    'css_hover' => [
                        "background-color" => "rgba(250,250,250,1)",
                        "color" => "rgba(50,50,50,1) !important",
                    ]
                ],
                "elems" => [
                    "name" => "website_header",
                    "tag" => "header",
                    "class_selector" => "website_header",
                    "css" => [
                        "position" => "sticky",
                        "box-shadow" => "0px 0px 5px 0px rgba(0,0,0,.1)",
                        "transition-duration" => "500ms",
                        "top" => "0",
                        "width" => "100%",
                        "z-index" => "110",
                    ],
                    "children" => [
                        'header_wrapper' => [
                            "name" => "header_wrapper",
                            "tag" => "div",
                            "class_selector" => "header_wrapper",
                            "css" => [
                                "max-width" => "var(--page_max_width)",
                                "padding-top" => "1px",
                                "padding-bottom" => "1px",
                                "padding-left" => "1px",
                                "padding-right" => "1px",
                                "box-sizing" => "border-box",
                                "display" => "grid",
                                "grid-gap" => "0px",
                                "grid-template-areas" => "'elem2 elem1 elem3'",
                                "grid-template-columns" =>
                                    "minmax(0, 1fr) 2fr minmax(0, 1fr)",
                                "align-items" => "center",
                                "justify-items" => "center",
                                "margin" => "auto",
                                "grid-template-rows" => "1fr",
                            ],
                            "css_mobile" => [
                                "grid-template-areas" => "'elem1 elem4'",
                                "grid-template-columns" => "3fr 1fr",
                                "grid-gap" => "0px",
                                "padding-top" => "10px",
                                "padding-bottom" => "10px",
                                "padding-left" => "10px",
                                "padding-right" => "10px",
                                "border-bottom-left-radius" => "1px",
                                "border-bottom-right-radius" => "1px",
                                "border-top-left-radius" => "1px",
                                "border-top-right-radius" => "1px",
                            ],
                            "children" => [
                                'header_logo' => [
                                    "name" => "header_logo",
                                    "tag" => "div",
                                    "class_selector" => "header_logo",
                                    "css" => [
                                        "grid-area" => "elem1",
                                        "align-self" => "center",
                                        "justify-self" => "center",
                                        "display" => "flex",
                                        "align-items" => "center",
                                        "gap" => "10px",
                                        "padding-top" => "10px",
                                        "padding-bottom" => "10px",
                                        "padding-left" => "10px",
                                        "padding-right" => "10px",
                                    ],
                                    "css_mobile" => [
                                        "gap" => "10px",
                                        "padding-top" => "10px",
                                        "padding-bottom" => "10px",
                                        "padding-left" => "10px",
                                        "padding-right" => "10px",
                                        "justify-self" => "start",
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
                                            "css_mobile" => ["height" => "30px"],
                                            "class" => "website_logo",
                                        ],
                                        'header_logo_restaurant_name' => [
                                            "name" => "header_logo_restaurant_name",
                                            "tag" => "div",
                                            'font_style' => 'font_1',
                                            "class_selector" =>
                                                "header_logo_restaurant_name",
                                            "css" => [
                                                "font-size" => "1.5em",
                                                "font-weight" => "bold",
                                                "white-space" => "nowrap",
                                                "display" => "block",
                                            ],
                                            "css_mobile" => ["font-size" => "1.2em"],
                                            "class" => "restaurant_name",
                                        ],
                                    ],
                                ],
                                'header_navList' => [
                                    "name" => "header_navList",
                                    "tag" => "ul",
                                    'font_style' => 'font_1',
                                    "class_selector" => "header_navList",
                                    "css" => [
                                        "list-style-type" => "none",
                                        "padding" => "0px",
                                        "margin" => "0px",
                                        "grid-area" => "elem2",
                                        "align-self" => "center",
                                        "justify-self" => "start",
                                        "display" => "flex",
                                        // "flex-wrap" => "wrap",
                                        "gap" => "18px",
                                        "padding-top" => "10px",
                                        "padding-right" => "10px",
                                        "padding-bottom" => "10px",
                                        "padding-left" => "10px",
                                        "align-items" => "center",
                                        "font-size" => "1em",
                                        'font-weight' => 'normal',
                                    ],
                                    "css_mobile" => ["display" => "none"],
                                    "children" => [
                                        'header_list_home' => [
                                            "name" => "header_list_home",
                                            "class_selector" => "header_list_home",
                                            "css" => ["display" => "block"],
                                            "tag" => "li",
                                            'attr' => ['sort' => 1],
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
                                        'header_list_foodmenu' => [
                                            "name" => "header_list_foodmenu",
                                            "class_selector" => "header_list_foodmenu",
                                            "css" => ["display" => "block"],
                                            "tag" => "li",
                                            'attr' => ['sort' => 2],
                                            "children" => [
                                                [
                                                    "tag" => "a",
                                                    "class" =>
                                                        "show_header_drop_down_list nowrap",
                                                        "attr" => [
                                                            "header_list" => "foodmenu",
                                                        ],
                                                    "text" => ["key" => "other.foodmenu"],
                                                ],
                                            ],
                                        ],
                                        'header_list_about_us' => [
                                            "name" => "header_list_about_us",
                                            "tag" => "li",
                                            "class_selector" => "header_list_about_us",
                                            "css" => ["display" => "block"],
                                            'attr' => ['sort' => 3],
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
                                        'header_list_our_products' => [
                                            "name" => "header_list_our_products",
                                            "tag" => "li",
                                            "class_selector" => "header_list_our_products",
                                            "css" => ["display" => "none"],
                                            'attr' => ['sort' => 4],
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
                                        'header_list_track_order' => [
                                            "name" => "header_list_track_order",
                                            "tag" => "li",
                                            "class_selector" => "header_list_track_order",
                                            "css" => ["display" => "none"],
                                            'attr' => ['sort' => 5],
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
                                        'header_list_see_more' => [
                                            "name" => "header_list_see_more",
                                            "class_selector" => "header_list_see_more",
                                            "css" => ["display" => "block"],
                                            'class' => 'none',
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
                                        'header_drop_down_list' => [
                                            'name' => 'header_drop_down_list',
                                            'tag' => 'div',
                                            'class_selector' => 'header_drop_down_list',
                                            "animation_name" => "slide_down",
                                            'attr' => ['sort' => 0],
                                            'css' => [
                                                'list-style-type' => 'none',
                                                'position' => 'absolute',
                                                'box-sizing' => 'border-box',
                                                'display' => 'flex',
                                                'flex-direction' => 'column',
                                                'overflow' => 'hidden',
                                                //
                                                "background-color" => "rgba(255,255,255,1)",
                                                "padding-top" => "1px",
                                                "padding-bottom" => "1px",
                                                "padding-left" => "1px",
                                                "padding-right" => "1px",
                                                "border-bottom-left-radius" => "1px",
                                                "border-bottom-right-radius" => "1px",
                                                "border-top-left-radius" => "1px",
                                                "border-top-right-radius" => "1px",
                                                "box-shadow" => "0px 0px 10px 0px rgba(0,0,0,.2)",
                                                'animation-duration' => '200ms',
                                            ],
                                            'class' => 'none',
                                        ]
                                    ],
                                ],
                                'header_iconsList' => [
                                    "name" => "header_iconsList",
                                    "tag" => "div",
                                    "class_selector" => "header_iconsList",
                                    "css" => [
                                        "padding" => "0px",
                                        "margin" => "0px",
                                        "grid-area" => "elem3",
                                        "align-self" => "center",
                                        "justify-self" => "end",
                                        "display" => "flex",
                                        "gap" => "15px",
                                        "padding-top" => "10px",
                                        "padding-right" => "15px",
                                        "padding-bottom" => "10px",
                                        "padding-left" => "15px",
                                        "align-items" => "center",
                                    ],
                                    "css_mobile" => ["display" => "none"],
                                    "children" => [
                                        'header_cart' => [
                                            "name" => "header_cart",
                                            "tag" => "div",
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
                                                'header_icon_cart' => [
                                                    "tag" => "svg",
                                                    "class_selector" => "header_icon_cart",
                                                    "css" => [
                                                        "cursor" => "pointer",
                                                        "width" => "25px",
                                                        "height" => "25px",
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
                                                    'font_style' => 'font_1',
                                                    "class_selector" =>
                                                        "header_icon_cart_num",
                                                    "css" => [
                                                        "position" => "relative",
                                                        "line-height" => "1em",
                                                        "font-size" => "0.9em",
                                                        "align-self" => "flex-end",
                                                        'width' => '0px',
                                                        'transform' => 'translate(-4px,0px) rotateZ(0deg) scale(1)',
                                                    ],
                                                ],
                                            ],
                                        ],
                                        'header_user' => [
                                            "name" => "header_user",
                                            "tag" => "div",
                                            "class_selector" => "header_user",
                                            "css" => [
                                                "text-decoration" => "unset",
                                                "display" => "flex",
                                                "align-items" => "center",
                                                "justify-content" => "center",
                                            ],
                                            "class" => "show_header_drop_down_list",
                                            "attr" => [
                                                "header_list" => "user",
                                                'sort' => '2',
                                            ],
                                            "children" => [
                                                'header_icon_user' => [
                                                    "tag" => "svg",
                                                    "class_selector" => "header_icon_user",
                                                    "css" => [
                                                        "cursor" => "pointer",
                                                        "width" => "23px",
                                                        "height" => "23px",
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
                                                                "d" =>
                                                                    "M12.0001 1.25C9.37678 1.25 7.25013 3.37665 7.25013 6C7.25013 8.62335 9.37678 10.75 12.0001 10.75C14.6235 10.75 16.7501 8.62335 16.7501 6C16.7501 3.37665 14.6235 1.25 12.0001 1.25ZM8.75013 6C8.75013 4.20507 10.2052 2.75 12.0001 2.75C13.7951 2.75 15.2501 4.20507 15.2501 6C15.2501 7.79493 13.7951 9.25 12.0001 9.25C10.2052 9.25 8.75013 7.79493 8.75013 6Z",
                                                            ],
                                                        ],
                                                        [
                                                            "tag" => "path",
                                                            "attr" => [
                                                                "stroke-width" => "0",
                                                                "d" =>
                                                                    "M12.0001 12.25C9.68658 12.25 7.55506 12.7759 5.97558 13.6643C4.41962 14.5396 3.25013 15.8661 3.25013 17.5L3.25007 17.602C3.24894 18.7638 3.24752 20.222 4.52655 21.2635C5.15602 21.7761 6.03661 22.1406 7.22634 22.3815C8.4194 22.6229 9.97436 22.75 12.0001 22.75C14.0259 22.75 15.5809 22.6229 16.7739 22.3815C17.9637 22.1406 18.8443 21.7761 19.4737 21.2635C20.7527 20.222 20.7513 18.7638 20.7502 17.602L20.7501 17.5C20.7501 15.8661 19.5807 14.5396 18.0247 13.6643C16.4452 12.7759 14.3137 12.25 12.0001 12.25ZM4.75013 17.5C4.75013 16.6487 5.37151 15.7251 6.71098 14.9717C8.02693 14.2315 9.89541 13.75 12.0001 13.75C14.1049 13.75 15.9733 14.2315 17.2893 14.9717C18.6288 15.7251 19.2501 16.6487 19.2501 17.5C19.2501 18.8078 19.2098 19.544 18.5265 20.1004C18.156 20.4022 17.5366 20.6967 16.4763 20.9113C15.4194 21.1252 13.9744 21.25 12.0001 21.25C10.0259 21.25 8.58087 21.1252 7.52393 20.9113C6.46366 20.6967 5.84425 20.4022 5.47372 20.1004C4.79045 19.544 4.75013 18.8078 4.75013 17.5Z",
                                                            ],
                                                        ],
                                                    ],
                                                ],
                                            ],
                                        ],
                                        'header_language' => [
                                            "name" => "header_language",
                                            "tag" => "div",
                                            "class_selector" => "header_language",
                                            "css" => [
                                                "text-decoration" => "unset",
                                                "display" => "flex",
                                                "align-items" => "center",
                                                "justify-content" => "center",
                                            ],
                                            "class" => "show_header_drop_down_list",
                                            "attr" => [
                                                "header_list" => "language",
                                                'sort' => '1',
                                            ],
                                            "children" => [
                                                'header_icon_language' => [
                                                    "tag" => "svg",
                                                    "class_selector" => "header_icon_language",
                                                    "css" => [
                                                        "cursor" => "pointer",
                                                        "width" => "23px",
                                                        "height" => "23px",
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
                                                                "d" =>
                                                                    "M2.5 9L21.5 9M2.5 15L21.5 15",
                                                            ],
                                                        ],
                                                    ],
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                                'header_mobileNav_icon' => [
                                    "name" => "header_mobileNav_icon",
                                    "tag" => "div",
                                    "class_selector" => "header_mobileNav_icon",
                                    "css" => [
                                        "text-decoration" => "unset",
                                        "display" => "none",
                                        "grid-area" => "elem4",
                                        "align-self" => "center",
                                        "justify-self" => "end",
                                        "padding-top" => "15px",
                                        "padding-right" => "15px",
                                        "padding-bottom" => "15px",
                                        "padding-left" => "15px",
                                    ],
                                    "css_mobile" => [
                                        "display" => "flex",
                                        "align-items" => "center",
                                        "justify-content" => "center",
                                    ],
                                    "class" => "show_mobileNav",
                                    "children" => [
                                        'header_mobileNav_icon' => [
                                            "tag" => "svg",
                                            "class_selector" => "header_mobileNav_icon_svg",
                                            "css" => [
                                                "cursor" => "pointer",
                                                "width" => "25px",
                                                "height" => "25px",
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
                        ]
                    ],
                ],
            ]),
            'popup_window' => json_encode([
                "transition" => "slide_down",
                "elems" => [
                    "name" => "popup_container",
                    "tag" => "div",
                    "class_selector" => "popup_container",
                    "css" => [
                        "background-color" => "rgba(0,0,0,.4)",
                        "position" => "fixed",
                        "top" => "0",
                        "bottom" => "0",
                        "left" => "0",
                        "right" => "0",
                        "box-sizing" => "border-box",
                        "z-index" => "120",
                        "backdrop-filter" => "blur(5px)",
                        "padding" => "10%",
                        "overflow-y" => "auto",
                        "display" => "grid",
                        "align-items" => "center",
                        "justify-items" => "center",
                    ],
                    "css_mobile" => ["padding-inline" => "5px", "padding-block" => "5px"],
                    "class" => "none",
                    "children" => [
                        'popup_card' => [
                            "name" => "popup_card",
                            "tag" => "div",
                            "class_selector" => "popup_card",
                            // "background" => "none",
                            "background_image" => [
                                "background-image" =>
                                "/storage/websites/1/imgs/foodmenu-americandiner-9p7jk8q9ourn7ttfdkb1.jpeg",
                                "background-attachment" => "local",
                                "background-position" => "50% 50%",
                                "background-repeat" => "no-repeat",
                                "background-size" => "cover",
                                "background-blend-mode" => "normal",
                                "background-color" => "#ffffff",
                            ],
                            "background_image_mobile" => [
                                "background-attachment" => "local",
                                "background-position" => "50% 50%",
                                "background-repeat" => "no-repeat",
                                "background-size" => "cover",
                            ],
                            "css" => [
                                "position" => "relative",
                                "border-bottom-left-radius" => "5px",
                                "border-bottom-right-radius" => "5px",
                                "border-top-left-radius" => "5px",
                                "border-top-right-radius" => "5px",
                                "box-sizing" => "border-box",
                                "padding-top" => "0px",
                                "padding-right" => "0px",
                                "padding-bottom" => "0px",
                                "padding-left" => "0px",
                                "animation-duration" => "400ms",
                                "box-shadow" => "0px 0px 0px 0px rgba(0,0,0,.1)",
                            ],
                            "css_mobile" => [
                                "width" => "calc(100% - 20px)",
                                "margin" => "10px",
                                "padding-top" => "0px",
                                "padding-right" => "0px",
                                "padding-bottom" => "0px",
                                "padding-left" => "0px",
                            ],
                            "class" => "",
                            "children" => [
                                'popup_close' => [
                                    "name" => "popup_close_svg",
                                    "tag" => "svg",
                                    "class_selector" => "popup_close_svg",
                                    "css" => [
                                        "position" => "absolute",
                                        "top" => "0px",
                                        "right" => "0px",
                                        'transform' => 'translate(0px,0px) rotateZ(0deg) scale(1)',
                                        "padding" => "3px",
                                        "cursor" => "pointer",
                                        "z-index" => "10",
                                        "width" => "25px",
                                        "height" => "25px",
                                        "background-color" => "rgba(255,255,255,1)",
                                        "border-bottom-left-radius" => "50px",
                                        "border-bottom-right-radius" => "50px",
                                        "border-top-left-radius" => "50px",
                                        "border-top-right-radius" => "50px",
                                        "border-width" => "3px",
                                        "border-style" => "solid solid solid solid",
                                        "border-color" => "rgba(255, 255, 255, 1)",
                                        "fill" => "rgba(135, 135, 135, 1)",
                                        "stroke" => "rgba(135, 135, 135, 1)",
                                    ],
                                    "css_hover" => [
                                        "background-color" => "rgba(245, 245, 245, 1)",
                                        "border-color" => "rgba(255, 255, 255, 1)",
                                        "fill" => "rgba(29,151,179,1)",
                                        "stroke" => "rgba(29,151,179,1)",
                                    ],
                                    "class" => "popup_close",
                                    "attr" => [
                                        "viewBox" => "0 0 24 24",
                                        "xmlns" => "http://www.w3.org/2000/svg",
                                        "stroke-linecap" => "round",
                                        "stroke-linejoin" => "round",
                                        "fill-rule" => "evenodd",
                                        "clip-rule" => "evenodd",
                                    ],
                                    "children" => [
                                        [
                                            "tag" => "path",
                                            "attr" => [
                                                "stroke-width" => "0px",
                                                "fill-rule" => "evenodd",
                                                "clip-rule" => "evenodd",
                                                "d" =>
                                                    "M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z",
                                            ],
                                        ],
                                    ],
                                ],
                                'popup_body' => [
                                    "name" => "popup_body",
                                    "tag" => "div",
                                    "class_selector" => "popup_body",
                                    "css" => [
                                        "position" => "relative",
                                        "box-sizing" => "border-box",
                                        "border-bottom-left-radius" => "5px",
                                        "border-bottom-right-radius" => "5px",
                                        "border-top-left-radius" => "5px",
                                        "border-top-right-radius" => "5px",
                                        "width" => "100%",
                                        "min-width" => "300px",
                                        "min-height" => "300px",
                                        "border-width" => "3px",
                                        "border-style" => "solid solid solid solid",
                                        "border-color" => "rgba(255,255,255,1)",
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]),
            'home' => json_encode([]),
        ]);
        website::where('id',1)->update(['template_id'=>$template->_id]);

    }
}

