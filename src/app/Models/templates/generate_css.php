<?php
namespace App\Models\templates;
use Illuminate\Support\Facades\Storage;

class generate_css
{
    public $template;
    public $css_file = '';
    public function add_to_file($css){
        $this->css_file = $this->css_file.$css;
    }
    public function generate($template){
        $this->template = $template;
        self::generate_vars();
        self::generate_global_classes();
        self::add_to_file(templates_data::page_transitions()[$this->template['page_setup']['pageTransition']]);
        self::generate_form_classes();
        self::add_to_file(templates_data::loading_spinners()[$this->template['loading_spinner']['key']]['css']);
        foreach($this->template['home'] as $section){
            self::generate_class($section);
        }

        $this->css_file = str_replace(array("\r","\n"),"",$this->css_file);

        if(Storage::put('websites/'.$this->template->website_id.'/style.css', $this->css_file)){
            return true;
        }else{
            return false;
        }
    }
    public function generate_class($elem){
        if(array_key_exists('class_selector',$elem)){
            if(!empty($elem['css'])){
                $css_start = ".{$elem['class_selector']}{";
                $css = '';
                foreach($elem['css'] as $key => $val){
                    $css = $css."{$key}:{$val};";
                }
                if(array_key_exists('css_mobile', $elem)){
                    $css = $css."@media (max-width:720px){";
                    foreach($elem['css_mobile'] as $key => $val){
                        $css = $css."{$key}:{$val};";
                    }
                    $css = $css."}";
                }
                if(array_key_exists('background', $elem)){
                    if($elem['background'] == 'image'){
                        foreach($elem['background_image'] as $key => $val){
                            if($key == 'background-image'){$val = "url('".$val."')";}
                            $css = $css."{$key}:{$val};";
                        }
                    }
                }
                $css_end = "}";
                self::add_to_file($css_start.$css.$css_end);
            }
        }
        if(array_key_exists('children',$elem)){
            foreach($elem['children'] as $child){
                self::generate_class($child);
            }
        }
    }
    // public function generate_classes($elem){
    //     // if($elem['type'] == 'section'){
    //     //     $section_css_start = "#".$elem['section_container']['id']."{";
    //     //     $section_css = '';
    //     //     $section_css_end = "}";
    //     //     foreach($elem['section_container']['style'] as $key => $val){
    //     //         $section_css = $section_css."{$key}:{$val};";
    //     //     }
    //     //     self::add_to_file($section_css_start.$section_css.$section_css_end);
    //     // }

    //     if(array_key_exists('style_class',$elem)){
    //         if(!empty($elem['style'])){
    //             $css_start = ".{$elem['style_class']}{";
    //                 $css = '';
    //                 foreach($elem['style'] as $key => $val){
    //                     $css = $css."{$key}:{$val};";
    //                 }
    //                 if(array_key_exists('style_mobile', $elem)){
    //                     $css = $css."@media (max-width:720px){";
    //                     foreach($elem['style_mobile'] as $key => $val){
    //                         if($key == 'background-image' && $val != 'unset'){$val = "url('".$val."')";}
    //                         $css = $css."{$key}:{$val};";
    //                     }
    //                     $css = $css."}";
    //                 }
    //                 if(array_key_exists('background', $elem)){
    //                     if($elem['background'] == 'image'){
    //                         foreach($elem['background_image'] as $key => $val){
    //                             if($key == 'background-image'){$val = "url('".$val."')";}
    //                             $css = $css."{$key}:{$val};";
    //                         }
    //                     }
    //                 }
    //                 $css_end = "}";
    //                 self::add_to_file($css_start.$css.$css_end);
    //         }
    //     }
    //     if(array_key_exists('children',$elem)){
    //         foreach($elem['children'] as $child){
    //             self::generate_classes($child);
    //         }
    //     }
    // }

    public function generate_vars(){
        $css = <<<string
        :root{
        --color_1:{$this->template['website_colors']['color_theme']['color_1']};
        --color_1:{$this->template['website_colors']['color_theme']['color_1']};
        --color_2:{$this->template['website_colors']['color_theme']['color_2']};
        --color_3:{$this->template['website_colors']['color_theme']['color_3']};
        --color_4:{$this->template['website_colors']['color_theme']['color_4']};
        --color_star:{$this->template['website_colors']['other_colors']['color_star']};
        --color_error:{$this->template['website_colors']['other_colors']['color_error']};
        --color_success:{$this->template['website_colors']['other_colors']['color_success']};
        --color_warning:{$this->template['website_colors']['other_colors']['color_warning']};
        --color_theme_1_bg:{$this->template['website_colors']['color_theme']['color_1']};
        --color_theme_1_txt:{$this->template['website_colors']['color_theme']['color_2']};
        --color_theme_2_bg:{$this->template['website_colors']['color_theme']['color_1']};
        --color_theme_2_txt:{$this->template['website_colors']['color_theme']['color_3']};
        --color_theme_3_bg:{$this->template['website_colors']['color_theme']['color_1']};
        --color_theme_3_txt:{$this->template['website_colors']['color_theme']['color_4']};
        --color_theme_4_bg:{$this->template['website_colors']['color_theme']['color_2']};
        --color_theme_4_txt:{$this->template['website_colors']['color_theme']['color_1']};
        --color_theme_5_bg:{$this->template['website_colors']['color_theme']['color_2']};
        --color_theme_5_txt:{$this->template['website_colors']['color_theme']['color_3']};
        --color_theme_6_bg:{$this->template['website_colors']['color_theme']['color_2']};
        --color_theme_6_txt:{$this->template['website_colors']['color_theme']['color_4']};
        --color_theme_7_bg:{$this->template['website_colors']['color_theme']['color_3']};
        --color_theme_7_txt:{$this->template['website_colors']['color_theme']['color_1']};
        --color_theme_8_bg:{$this->template['website_colors']['color_theme']['color_3']};
        --color_theme_8_txt:{$this->template['website_colors']['color_theme']['color_2']};
        --color_theme_9_bg:{$this->template['website_colors']['color_theme']['color_3']};
        --color_theme_9_txt:{$this->template['website_colors']['color_theme']['color_4']};
        --color_theme_10_bg:{$this->template['website_colors']['color_theme']['color_4']};
        --color_theme_10_txt:{$this->template['website_colors']['color_theme']['color_1']};
        --color_theme_11_bg:{$this->template['website_colors']['color_theme']['color_4']};
        --color_theme_11_txt:{$this->template['website_colors']['color_theme']['color_2']};
        --color_theme_12_bg:{$this->template['website_colors']['color_theme']['color_4']};
        --color_theme_12_txt:{$this->template['website_colors']['color_theme']['color_3']};

        --body_color_theme_bg:var(--{$this->template['page_setup']['page_color_theme']}_bg);
        --body_color_theme_txt:var(--{$this->template['page_setup']['page_color_theme']}_txt);

        --font_t:'{$this->template['font_style']['title']}', '{$this->template['font_style']['custom_name']}', sans-serif;
        --font_t_fw:{$this->template['font_style']['title_weight']};
        --font_t_lh:{$this->template['font_style']['title_line_height']};
        --font_t_ls:{$this->template['font_style']['title_letter_spacing']};
        --font_p:'{$this->template['font_style']['paragraph']}', '{$this->template['font_style']['custom_name']}', sans-serif;
        --font_p_fw:{$this->template['font_style']['paragraph_weight']};
        --font_p_lh:{$this->template['font_style']['paragraph_line_height']};
        --font_p_ls:{$this->template['font_style']['paragraph_letter_spacing']};
        --page_max_width:{$this->template['page_setup']['max_width']};
        --page_margin:{$this->template['page_setup']['page_margin']};

        --page_transition:{$this->template['page_setup']['pageTransition']};
        --page_transitionDuration:{$this->template['page_setup']['transitionDuration']};
        --form_align:{$this->template['form_elements']['form_align']};
        --form_elem_spacing:{$this->template['form_elements']['spacing']};
        --input_text_align:{$this->template['form_elements']['input']['input_text_align']};
        --input_padding_y:{$this->template['form_elements']['input']['input_padding_y']};
        --input_padding_x:{$this->template['form_elements']['input']['input_padding_x']};
        --input_border_style:{$this->template['form_elements']['input']['input_border_style']};
        --input_border_width:{$this->template['form_elements']['input']['input_border_width']};
        --input_border_radius:{$this->template['form_elements']['input']['input_border_radius']};
        --input_border_color:{$this->template['form_elements']['input']['input_border_color']};
        --input_font_size:{$this->template['form_elements']['input']['input_font_size']};
        --input_font_color:{$this->template['form_elements']['input']['input_font_color']};
        --input_label_font_size:{$this->template['form_elements']['input']['input_label_font_size']};
        --input_label_margin:{$this->template['form_elements']['input']['input_label_margin']};
        --input_bg_color:{$this->template['form_elements']['input']['input_bg_color']};
        --input_transition_duration:{$this->template['form_elements']['input']['input_transition_duration']};

        --input_focus_outline_width:{$this->template['form_elements']['input']['input_focus_outline_width']};
        --input_focus_outline_color:{$this->template['form_elements']['input']['input_focus_outline_color']};
        --input_focus_bg_color:{$this->template['form_elements']['input']['input_focus_bg_color']};

        --checkbox_border_radius:{$this->template['form_elements']['checkbox']['checkbox_border_radius']};
        --checkbox_size:{$this->template['form_elements']['checkbox']['checkbox_size']};
        --checkbox_color:{$this->template['form_elements']['checkbox']['checkbox_color']};
        --checkbox_checkMark_color:{$this->template['form_elements']['checkbox']['checkbox_checkMark_color']};

        --button1_padding_y:{$this->template['form_elements']['button1']['button1_padding_y']};
        --button1_padding_x:{$this->template['form_elements']['button1']['button1_padding_x']};
        --button1_border_radius:{$this->template['form_elements']['button1']['button1_border_radius']};
        --button1_font_size:{$this->template['form_elements']['button1']['button1_font_size']};
        --button1_font_color:{$this->template['form_elements']['button1']['button1_font_color']};
        --button1_bg_color:{$this->template['form_elements']['button1']['button1_bg_color']};
        --button1_outline_color:{$this->template['form_elements']['button1']['button1_outline_color']};
        --button1_outline_width:{$this->template['form_elements']['button1']['button1_outline_width']};
        --button1_transition_duration:{$this->template['form_elements']['button1']['button1_transition_duration']};
        --button1_hover_font_color:{$this->template['form_elements']['button1']['button1_hover_font_color']};
        --button1_hover_bg_color:{$this->template['form_elements']['button1']['button1_hover_bg_color']};
        --button1_hover_outline_color:{$this->template['form_elements']['button1']['button1_hover_outline_color']};
        --button1_hover_outline_width:{$this->template['form_elements']['button1']['button1_hover_outline_width']};
        --button1_click_font_color:{$this->template['form_elements']['button1']['button1_click_font_color']};
        --button1_click_bg_color:{$this->template['form_elements']['button1']['button1_click_bg_color']};
        --button1_click_outline_color:{$this->template['form_elements']['button1']['button1_click_outline_color']};
        --button1_click_outline_width:{$this->template['form_elements']['button1']['button1_click_outline_width']};
        --button1_disabled_font_color:{$this->template['form_elements']['button1']['button1_disabled_font_color']};
        --button1_disabled_bg_color:{$this->template['form_elements']['button1']['button1_disabled_bg_color']};
        --button1_disabled_outline_color:{$this->template['form_elements']['button1']['button1_disabled_outline_color']};
        --button1_disabled_outline_width:{$this->template['form_elements']['button1']['button1_disabled_outline_width']};



        --button2_padding_y:{$this->template['form_elements']['button2']['button2_padding_y']};
        --button2_padding_x:{$this->template['form_elements']['button2']['button2_padding_x']};
        --button2_border_radius:{$this->template['form_elements']['button2']['button2_border_radius']};
        --button2_font_size:{$this->template['form_elements']['button2']['button2_font_size']};
        --button2_font_color:{$this->template['form_elements']['button2']['button2_font_color']};
        --button2_bg_color:{$this->template['form_elements']['button2']['button2_bg_color']};
        --button2_outline_color:{$this->template['form_elements']['button2']['button2_outline_color']};
        --button2_outline_width:{$this->template['form_elements']['button2']['button2_outline_width']};
        --button2_transition_duration:{$this->template['form_elements']['button2']['button2_transition_duration']};
        --button2_hover_font_color:{$this->template['form_elements']['button2']['button2_hover_font_color']};
        --button2_hover_bg_color:{$this->template['form_elements']['button2']['button2_hover_bg_color']};
        --button2_hover_outline_color:{$this->template['form_elements']['button2']['button2_hover_outline_color']};
        --button2_hover_outline_width:{$this->template['form_elements']['button2']['button2_hover_outline_width']};
        --button2_click_font_color:{$this->template['form_elements']['button2']['button2_click_font_color']};
        --button2_click_bg_color:{$this->template['form_elements']['button2']['button2_click_bg_color']};
        --button2_click_outline_color:{$this->template['form_elements']['button2']['button2_click_outline_color']};
        --button2_click_outline_width:{$this->template['form_elements']['button2']['button2_click_outline_width']};
        --button2_disabled_font_color:{$this->template['form_elements']['button2']['button2_disabled_font_color']};
        --button2_disabled_bg_color:{$this->template['form_elements']['button2']['button2_disabled_bg_color']};
        --button2_disabled_outline_color:{$this->template['form_elements']['button2']['button2_disabled_outline_color']};
        --button2_disabled_outline_width:{$this->template['form_elements']['button2']['button2_disabled_outline_width']};

        --loading_spinner_c1:{$this->template['loading_spinner']['colors']['loading_spinner_c1']});
        --loading_spinner_c2:{$this->template['loading_spinner']['colors']['loading_spinner_c2']});
        }
        @font-face {font-family:'{$this->template['font_style']['title']}';src:url('/storage/fonts/{$this->template['font_style']['title']}.ttf')format('truetype');}
        @font-face {font-family:'{$this->template['font_style']['paragraph']}';src:url('/storage/fonts/{$this->template['font_style']['paragraph']}.ttf')format('truetype');}
        string;
        self::add_to_file($css);
    }

    public function generate_global_classes(){
        $css = <<<string
        html {margin: 0;padding: 0;height: 100%;width: 100%;overflow: hidden;}
        body{color: var(--body_color_theme_txt);background-color: var(--body_color_theme_bg);width:100%;height:100%;box-sizing: border-box;margin:auto;overflow: auto;font-family: var(--font_p);line-height: var(--font_p_lh);letter-spacing: var(--font_p_ls);font-weight: var(--font_p_fw)}
        section{ width:100%; box-sizing:border-box;}
        .section_wrapper{ padding:0 var(--page_margin) ; box-sizing: border-box ; max-width:var(--page_max_width) ;margin:auto ; position: relative;}
        .section_elements_wrapper{display:flex;flex-direction: column; flex-wrap: nowrap;align-items: flex-start;justify-content: flex-start;box-sizing: border-box;}
        .font_t{font-family: var(--font_t);line-height: var(--font_t_lh);letter-spacing: var(--font_t_ls);font-weight: var(--font_t_fw)}
        .font_p{font-family: var(--font_p);line-height: var(--font_p_lh);letter-spacing: var(--font_p_ls);font-weight: var(--font_p_fw)}
        .body_color_theme{background-color: var(--body_color_theme_bg);color: var(--body_color_theme_txt);}
        #page{ position: relative; width:100%; height:100%; }
        .bg_color_1{background-color: var(--color_1);}
        .bg_color_2{background-color: var(--color_2);}
        .bg_color_3{background-color: var(--color_3);}
        .bg_color_4{background-color: var(--color_4);}
        .color_1{color: var(--color_1);}
        .color_2{color: var(--color_2);}
        .color_3{color: var(--color_3);}
        .color_4{color: var(--color_4);}
        .transparent{background-color: unset;color:unset;}
        .color_theme_1{background-color: var(--color_theme_1_bg);color:var(--color_theme_1_txt);}
        .color_theme_2{background-color: var(--color_theme_2_bg);color:var(--color_theme_2_txt);}
        .color_theme_3{background-color: var(--color_theme_3_bg);color:var(--color_theme_3_txt);}
        .color_theme_4{background-color: var(--color_theme_4_bg);color:var(--color_theme_4_txt);}
        .color_theme_5{background-color: var(--color_theme_5_bg);color:var(--color_theme_5_txt);}
        .color_theme_6{background-color: var(--color_theme_6_bg);color:var(--color_theme_6_txt);}
        .color_theme_7{background-color: var(--color_theme_7_bg);color:var(--color_theme_7_txt);}
        .color_theme_8{background-color: var(--color_theme_8_bg);color:var(--color_theme_8_txt);}
        .color_theme_9{background-color: var(--color_theme_9_bg);color:var(--color_theme_9_txt);}
        .color_theme_10{background-color: var(--color_theme_10_bg);color:var(--color_theme_10_txt);}
        .color_theme_11{background-color: var(--color_theme_11_bg);color:var(--color_theme_11_txt);}
        .color_theme_12{background-color: var(--color_theme_12_bg);color:var(--color_theme_12_txt);}
        .bg_color_star{background-color: var(--color_star);}
        .bg_color_success{background-color: var(--color_success);}
        .bg_color_error{background-color: var(--color_error);}
        .bg_color_warning{background-color: var(--color_warning);}
        .color_star{color: var(--color_star);}
        .color_success{color: var(--color_success);}
        .color_error{color: var(--color_error);}
        .color_warning{color: var(--color_warning);}
        string;
        self::add_to_file($css);
    }

    public function generate_form_classes(){
        $css = <<<string
        .form{display:flex;flex-direction: column;align-items: var(--form_align);justify-content: flex-start;width:fit-content;}
        input[type='number'] {-moz-appearance:textfield;}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;}
        .input{text-align: var(--input_text_align);margin-bottom:var(--form_elem_spacing);max-width:100%;box-sizing: border-box;padding:var(--input_padding_y) var(--input_padding_x);border-width:var(--input_border_width);border-style:var(--input_border_style);border-radius:var(--input_border_radius);border-color:var(--input_border_color);font-size:var(--input_font_size);color:var(--input_font_color);background-color: var(--input_bg_color);transition-duration: var(--input_transition_duration);outline-style: solid;outline-width: 0px;outline-color: transparent;}
        .input:focus{outline-style: solid;outline-width: var(--input_focus_outline_width);outline-color: var(--input_focus_outline_color);background-color: var(--input_focus_bg_color);}
        .input:read-only{cursor: not-allowed;}
        .input_lable{margin-top:var(--form_elem_spacing);font-size:var(--input_label_font_size);margin-inline:var(--input_label_margin);}
        textarea{resize: none;}
        .checkbox{width:var(--checkbox_size);height:var(--checkbox_size);position: relative;border:2px solid var(--checkbox_color);cursor: pointer;border-radius: var(--checkbox_border_radius);margin:var(--form_elem_spacing) 0;}
        .checkbox_checked{background-color: var(--checkbox_color);color: var(--checkbox_checkMark_color);}
        .button1{max-width:100%;box-sizing: border-box;cursor: pointer;border: none;outline: none;font-size: var(--button1_font_size);padding:var(--button1_padding_y) var(--button1_padding_x);background-color: var(--button1_bg_color);color: var(--button1_font_color);border-radius: var(--button1_border_radius);outline-style: solid;outline-color:var(--button1_outline_color);outline-width:var(--button1_outline_width);transition-duration: var(--button1_transition_duration);}
        .button1:hover{color:var(--button1_hover_font_color);background-color:var(--button1_hover_bg_color);outline-style: solid;outline-width: var(--button1_hover_outline_width);outline-color: var(--button1_hover_outline_color);}
        .button1:active{color:var(--button1_click_font_color);background-color:var(--button1_click_bg_color);outline-style: solid;outline-width: var(--button1_click_outline_width);outline-color: var(--button1_click_outline_color);}
        .button1:disabled{cursor: not-allowed;color:var(--button1_disabled_font_color);background-color:var(--button1_disabled_bg_color);outline-style: solid;outline-width: var(--button1_disabled_outline_width);outline-color: var(--button1_disabled_outline_color);}
        .button2{max-width:100%;box-sizing: border-box;cursor: pointer;border: none;outline: none;font-size: var(--button2_font_size);padding:var(--button2_padding_y) var(--button2_padding_x);background-color: var(--button2_bg_color);color: var(--button2_font_color);border-radius: var(--button2_border_radius);outline-style: solid;outline-color:var(--button2_outline_color);outline-width:var(--button2_outline_width);transition-duration: var(--button2_transition_duration);}
        .button2:hover{color:var(--button2_hover_font_color);background-color:var(--button2_hover_bg_color);outline-style: solid;outline-width: var(--button2_hover_outline_width);outline-color: var(--button2_hover_outline_color);}
        .button2:active{color:var(--button2_click_font_color);background-color:var(--button2_click_bg_color);outline-style: solid;outline-width: var(--button2_click_outline_width);outline-color: var(--button2_click_outline_color);}
        .button2:disabled{cursor: not-allowed;color:var(--button2_disabled_font_color);background-color:var(--button2_disabled_bg_color);outline-style: solid;outline-width: var(--button2_disabled_outline_width);outline-color: var(--button2_disabled_outline_color);}
        string;
        self::add_to_file($css);
    }
}
