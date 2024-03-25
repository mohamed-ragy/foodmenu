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
                'page_color_theme' => 'color_1_2',
                'pageTransition' => 'fade',
                'transitionDuration' => '300ms',
                'social_image' => null, // data
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
            ],
            'loading_spinner' => [
                'key' => '5',
                'elem' => '<div class="loading_spinner_5_:size:"><div class="dot1"></div><div class="dot2"></div><div class="dot3"></div></div>',
                'colors' => [
                    'loading_spinner_c1' => ['r'=>243,'g'=>243,'b'=>243],
                    'loading_spinner_c2' => ['r'=>52,'g'=>152,'b'=>219],
                ],
            ],
            'home' => [
                [
                    'sort' => 1,
                    'tag' => 'section',
                    'type' => 'section',
                    'color_theme' => 'color_2_3',
                    'class' => '',
                    'style_class' => 'home_section_1',
                    'style' => [
                        'background-image' => '/storage/imgs/demo/americandiner/cat1.webp',
                        'background-attachment' => 'fixed',
                        'background-position-x' => 'left',
                        'background-position-y' => 'top',
                        'background-repeat' => 'no-repeat',
                        'background-size' => 'cover',
                    ],
                    'children' => [
                        'section_container' => [
                            'tag' => 'div',
                            'type' => 'section_container',
                            'class' => 'section_container',
                            'style_class' => 'home_section_1_container',
                            'style' => [
                                'min-height' => '100px',
                                'display' => 'grid',
                                'grid-template-areas' =>'"elem1 elem1" "elem2 elem3"',
                                'grid-template-columns' =>  'repeat(2, 1fr)',
                            ],
                            'style_mobile' => [
                                'grid-template-areas' =>'"elem1""elem2""elem3"',
                                'grid-template-columns' =>  'repeat(1, 1fr)',
                            ],
                            'children' => [
                                'element_container_1' => [
                                    'tag' => 'div',
                                    'type' => 'element_container',
                                    'color_theme' => 'transparent',
                                    'class' => 'element_container',
                                    'style_class' => 'home_section_1_elem_1',
                                    'style' => [
                                        'grid-area' => 'elem1',
                                        'display' => 'flex',
                                        'flex-direction' => 'row',
                                        'flex-wrap' => 'no-wrap',
                                        'align-items' => 'center',
                                        'justify-content' => 'center',
                                    ],
                                    'style_mobile' => [

                                    ],
                                ],
                                'element_container_2' => [
                                    'tag' => 'div',
                                    'type' => 'element_container',
                                    'color_theme' => 'transparent',
                                    'class' => 'element_container',
                                    'style_class' => 'home_section_1_elem_2',
                                    'style' => [
                                        'grid-area' => 'elem2',
                                        'display' => 'flex',
                                        'flex-direction' => 'row',
                                        'flex-wrap' => 'no-wrap',
                                        'align-items' => 'center',
                                        'justify-content' => 'center',
                                    ],
                                    'style_mobile' => [

                                    ],
                                ],
                                'element_container_3' => [
                                    'tag' => 'div',
                                    'type' => 'element_container',
                                    'color_theme' => 'color_1_4',
                                    'class' => 'element_container',
                                    'style_class' => 'home_section_1_elem_3',
                                    'style' => [
                                        'grid-area' => 'elem3',
                                        'display' => 'flex',
                                        'flex-direction' => 'row',
                                        'flex-wrap' => 'no-wrap',
                                        'align-items' => 'center',
                                        'justify-content' => 'center',
                                    ],
                                    'style_mobile' => [

                                    ],
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            // 'loading_screen' => [
            //     'tag' => 'div',
            //     'type' => 'section',
            //     'settings' => [
            //         'editable'=>'0',
            //         'resizable' => '0',
            //         'draggable' => '0',
            //         'formateable' => '0',
            //         'deletable' => '0',
            //     ],
            //     'settings' => [],
            //     // 'settings' => ['editable','resizable','draggable','formateable','deletable','swappable'],
            //     'elems' => ['loading_spinner','image','social_image','website_logo','website_icon','title','page_title','paragraph','page_paragraph'],
            //     'section_container' => [
            //         'class' => '',
            //         'id' => 'loading_screen',
            //         'color_theme' => 'color_2_1',
            //         'style' => [
            //             'height' => '100%',
            //             'background-image' => 'url("/storage/imgs/demo/americandiner/cat1.webp")',
            //             'background-image' => 'none',
            //             'background-attachment' => 'fixed',
            //             'background-position' => 'bottom center',
            //             'background-repeat' => 'no-repeat',
            //             'background-size' => 'cover',
            //         ],
            //     ],
            //     'attr' => [
            //         'class' => 'section loading_screen',
            //     ],
            //     'class_name' => 'loading_screen',
            //     'style' => [
            //         'height' => '100%',
            //         'display' => 'flex',
            //         'flex-direction' => 'column',
            //         'align-items' => 'center',
            //         'justify-content' => 'center',
            //     ],
            //     'children' => [
            //         'child_0' => [
            //             'tag' => 'loading_spinner',
            //             'type' => 'loading_spinner',
            //             'settings' => ['editable'],
            //             'attr' => [
            //                 'class' => 'section_elem',
            //             ],
            //             'class_name' => 'loading_screen_spinner',
            //             'style' => [
            //                 'margin-bottom'=>'10px',
            //             ],
            //             'style_desktop' => [
            //                 'top' => '50px',
            //                 'left' => '40%',
            //             ],
            //             'style_mobile' => [
            //                 'top' => '10px',
            //                 'left' => '10%',
            //                 'width' => '80%',
            //                 'height' => '70px',
            //             ],
            //             'size' => 'L',
            //         ],
            //         'child_1' => [
            //             'tag' => 'div',
            //             'type' => 'title',
            //             'settings' => ['editable'],
                        // 'text' => [
                        //     'key' => 'page_title',
                        // ],
            //             'attr' => [
            //                 'class' => 'loading_screen_title font_t section_elem',
            //             ],
            //             'class_name' => 'loading_screen_title',
            //             'style' => [
            //                 'font-size'=>'2em',
            //                 'text-align' => 'center',
            //             ],
            //             'style_desktop' => [
            //                 'top' => '10px',
            //                 'left' => '10%',
            //             ],
            //             'style_mobile' => [
            //                 'top' => '80px',
            //                 'left' => '10%',
            //                 'width' => '80%',
            //                 'height' => '200px',
            //             ],

            //         ],
            //         'child_2' => [
            //             'tag' => 'div',
            //             'type' => 'paragraph',
            //             'settings' => ['editable'],
            //             'text' => [
            //                 'key' => 'page_description',
            //             ],
            //             'attr' => [
            //                 'class' => 'loading_screen_paragraph font_p section_elem',
            //             ],
            //             'class_name' => 'loading_screen_paragraph',
            //             'style' => [
            //                 'font-size'=>'1em',
            //                 'text-align' => 'center',
            //                 'max-width' => '400px',
            //             ],
            //             'style_desktop' => [
            //                 'top' => '10px',
            //                 'left' => '80%',
            //             ],
            //             'style_mobile' => [
            //                 'top' => '300px',
            //                 'left' => '10%',
            //                 'width' => '80%',
            //                 'height' => '200px',
            //             ],
            //         ]
            //     ]
            // ],
            // 'home' => [
            //     'section_1' => [
            //         'tag' => 'div',
            //         'type' => 'section',
            //         'section_container' => [
            //             'class' => '',
            //             'id' => 'home_section_1',
            //             'color_theme' => 'color_2_1',
            //             'style' => [
            //                 'min-height' => '800px',
            //                 // 'height' => '100%',
            //                 'background-image' => 'url("/storage/imgs/demo/americandiner/cat1.webp")',
            //                 'background-image' => 'none',
            //                 'background-attachment' => 'fixed',
            //                 'background-position' => 'bottom center',
            //                 'background-repeat' => 'no-repeat',
            //                 'background-size' => 'cover',
            //             ]
            //         ],
            //         'attr' => [
            //             'class' => 'section home',
            //         ],
            //         'class_name' => 'home',
            //         'style' => [
            //             'height' => '100%',
            //             'min-height' => '800px',
            //             'display' => 'flex',
            //             'flex-direction' => 'column',
            //             'align-items' => 'center',
            //             'justify-content' => 'center',
            //         ],
            //         'children' => [
            //             'child_1' => [
            //                 'tag' => 'div',
            //                 'type' => 'title',
            //                 'settings' => ['editable'],
            //                 'text' => [
            //                     'key' => 'page_title',
            //                 ],
            //                 'attr' => [
            //                     'class' => 'loading_screen_title font_t section_elem',
            //                 ],
            //                 'class_name' => 'loading_screen_title',
            //                 'style' => [
            //                     'font-size'=>'2em',
            //                     'text-align' => 'center',
            //                 ],
            //             ],
            //             'child_2' => [
            //                 'tag' => 'div',
            //                 'type' => 'paragraph',
            //                 'settings' => ['editable'],
            //                 'text' => [
            //                     'key' => 'page_description',
            //                 ],
            //                 'attr' => [
            //                     'class' => 'loading_screen_paragraph font_p section_elem',
            //                 ],
            //                 'class_name' => 'loading_screen_paragraph',
            //                 'style' => [
            //                     'font-size'=>'1em',
            //                     'text-align' => 'center',
            //                     'max-width' => '400px',

            //                 ],
            //             ]
            //         ]
            //     ]

            // ]


        ]);
        website::where('id',1)->update(['template_id'=>$template->_id]);

    }
}
