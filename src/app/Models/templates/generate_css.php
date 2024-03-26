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
            self::generate_classes($section);
        }

        $this->css_file = str_replace(array("\r","\n"),"",$this->css_file);

        if(Storage::put('websites/'.$this->template->website_id.'/style.css', $this->css_file)){
            return true;
        }else{
            return false;
        }
    }

    public function generate_classes($elem){
        // if($elem['type'] == 'section'){
        //     $section_css_start = "#".$elem['section_container']['id']."{";
        //     $section_css = '';
        //     $section_css_end = "}";
        //     foreach($elem['section_container']['style'] as $key => $val){
        //         $section_css = $section_css."{$key}:{$val};";
        //     }
        //     self::add_to_file($section_css_start.$section_css.$section_css_end);
        // }

        if(array_key_exists('style_class',$elem)){
            if(!empty($elem['style'])){
                $css_start = ".{$elem['style_class']}{";
                    $css = '';
                    foreach($elem['style'] as $key => $val){
                        $css = $css."{$key}:{$val};";
                    }
                    if(array_key_exists('background_style',$elem)){
                        foreach($elem['background_style'] as $key => $val){
                            if($key == 'background-image'){$val = "url('".$val."')";}
                            $css = $css."{$key}:{$val};";
                        }
                    }
                    if(array_key_exists('style_mobile', $elem)){
                        $css = $css."@media (max-width:720px){";
                        foreach($elem['style_mobile'] as $key => $val){
                            if($key == 'background-image' && $val != 'unset'){$val = "url('".$val."')";}
                            $css = $css."{$key}:{$val};";
                        }
                        $css = $css."}";
                    }
                    $css_end = "}";
                    self::add_to_file($css_start.$css.$css_end);
            }
        }
        if(array_key_exists('children',$elem)){
            foreach($elem['children'] as $child){
                self::generate_classes($child);
            }
        }
    }

    public function generate_vars(){
        $page_color_theme = explode('_',$this->template['page_setup']['page_color_theme']);
        $body_color_theme_bg = $this->template['website_colors']['c'.$page_color_theme[1]];
        $body_color_theme_txt = $this->template['website_colors']['c'.$page_color_theme[2]];
        if($this->template['form_elements']['input']['background_fill'] == '1'){
            $input_bg_color = "rgb({$this->template['form_elements']['input']['input_bg_color']['r']},{$this->template['form_elements']['input']['input_bg_color']['g']},{$this->template['form_elements']['input']['input_bg_color']['b']})";
        }else{
            $input_bg_color = "transparent";
        }
        if($this->template['form_elements']['input']['focus_background_fill'] == '1'){
            $input_focus_bg_color = "rgb({$this->template['form_elements']['input']['focus_bg_color']['r']},{$this->template['form_elements']['input']['focus_bg_color']['g']},{$this->template['form_elements']['input']['focus_bg_color']['b']})";
        }else{
            $input_focus_bg_color = "var(--input_bg_color)";
        }
        $css = <<<string
        :root{
        --color_1:rgb({$this->template['website_colors']['c1']['r']},{$this->template['website_colors']['c1']['g']},{$this->template['website_colors']['c1']['b']});
        --color_2:rgb({$this->template['website_colors']['c2']['r']},{$this->template['website_colors']['c2']['g']},{$this->template['website_colors']['c2']['b']});
        --color_3:rgb({$this->template['website_colors']['c3']['r']},{$this->template['website_colors']['c3']['g']},{$this->template['website_colors']['c3']['b']});
        --color_4:rgb({$this->template['website_colors']['c4']['r']},{$this->template['website_colors']['c4']['g']},{$this->template['website_colors']['c4']['b']});
        --color_star:rgb({$this->template['website_colors']['c_star']['r']},{$this->template['website_colors']['c_star']['g']},{$this->template['website_colors']['c_star']['b']});
        --color_error:rgb({$this->template['website_colors']['c_error']['r']},{$this->template['website_colors']['c_error']['g']},{$this->template['website_colors']['c_error']['b']});
        --color_success:rgb({$this->template['website_colors']['c_success']['r']},{$this->template['website_colors']['c_success']['g']},{$this->template['website_colors']['c_success']['b']});
        --color_warning:rgb({$this->template['website_colors']['c_warning']['r']},{$this->template['website_colors']['c_warning']['g']},{$this->template['website_colors']['c_warning']['b']});
        --font_t:{$this->template['font_style']['title']};
        --font_t_fw:{$this->template['font_style']['title_weight']};
        --font_t_lh:{$this->template['font_style']['title_line_height']};
        --font_t_ls:{$this->template['font_style']['title_letter_spacing']};
        --font_p:{$this->template['font_style']['paragraph']};
        --font_p_fw:{$this->template['font_style']['paragraph_weight']};
        --font_p_lh:{$this->template['font_style']['paragraph_line_height']};
        --font_p_ls:{$this->template['font_style']['paragraph_letter_spacing']};
        --page_max_width:{$this->template['page_setup']['max_width']};
        --page_margin:{$this->template['page_setup']['page_margin']};
        --body_color_theme_bg:rgb({$body_color_theme_bg['r']},{$body_color_theme_bg['g']},{$body_color_theme_bg['b']});
        --body_color_theme_txt:rgb({$body_color_theme_txt['r']},{$body_color_theme_txt['g']},{$body_color_theme_txt['b']});
        --page_transition:{$this->template['page_setup']['pageTransition']};
        --page_transitionDuration:{$this->template['page_setup']['transitionDuration']};
        --form_align:{$this->template['form_elements']['form_align']};
        --form_elem_spacing:{$this->template['form_elements']['spacing']};
        --input_text_align:{$this->template['form_elements']['input']['text_align']};
        --input_padding_y:{$this->template['form_elements']['input']['padding_y']};
        --input_padding_x:{$this->template['form_elements']['input']['padding_x']};
        --input_border_style:{$this->template['form_elements']['input']['border_style']};
        --input_border_width:{$this->template['form_elements']['input']['border_width']};
        --input_border_radius:{$this->template['form_elements']['input']['border_radius']};
        --input_border_color:rgb({$this->template['form_elements']['input']['border_color']['r']},{$this->template['form_elements']['input']['border_color']['g']},{$this->template['form_elements']['input']['border_color']['b']});
        --font_size:{$this->template['form_elements']['input']['font_size']};
        --input_font_color:rgb({$this->template['form_elements']['input']['font_color']['r']},{$this->template['form_elements']['input']['font_color']['g']},{$this->template['form_elements']['input']['font_color']['b']});
        --input_label_font_size:{$this->template['form_elements']['input']['label_font_size']};
        --input_bg_color:{$input_bg_color};
        --input_focus_outline_width:{$this->template['form_elements']['input']['focus_outline_width']};
        --input_focus_outline_color:rgb({$this->template['form_elements']['input']['focus_outline_color']['r']},{$this->template['form_elements']['input']['focus_outline_color']['g']},{$this->template['form_elements']['input']['focus_outline_color']['b']});
        --input_focus_bg_color:{$input_focus_bg_color};
        --checkbox_border_radius:{$this->template['form_elements']['checkbox']['border_radius']};
        --checkbox_size:{$this->template['form_elements']['checkbox']['size']};
        --checkbox_color:rgb({$this->template['form_elements']['checkbox']['color']['r']},{$this->template['form_elements']['checkbox']['color']['g']},{$this->template['form_elements']['checkbox']['color']['b']});
        --checkbox_checkMark_color:rgb({$this->template['form_elements']['checkbox']['check_mark_color']['r']},{$this->template['form_elements']['checkbox']['check_mark_color']['g']},{$this->template['form_elements']['checkbox']['check_mark_color']['b']});
        --button1_padding_y:{$this->template['form_elements']['button1']['padding_y']};
        --button1_padding_x:{$this->template['form_elements']['button1']['padding_x']};
        --button1_border_radius:{$this->template['form_elements']['button1']['border_radius']};
        --button1_font_size:{$this->template['form_elements']['button1']['font_size']};
        --button1_font_color:rgb({$this->template['form_elements']['button1']['font_color']['r']},{$this->template['form_elements']['button1']['font_color']['g']},{$this->template['form_elements']['button1']['font_color']['b']});
        --button1_bg_color:rgb({$this->template['form_elements']['button1']['bg_color']['r']},{$this->template['form_elements']['button1']['bg_color']['g']},{$this->template['form_elements']['button1']['bg_color']['b']});
        --button1_outline_color:rgb({$this->template['form_elements']['button1']['outline_color']['r']},{$this->template['form_elements']['button1']['outline_color']['g']},{$this->template['form_elements']['button1']['outline_color']['b']});
        --button1_outline_width:{$this->template['form_elements']['button1']['outline_width']};
        --button1_hover_font_color:rgb({$this->template['form_elements']['button1']['hover_font_color']['r']},{$this->template['form_elements']['button1']['hover_font_color']['g']},{$this->template['form_elements']['button1']['hover_font_color']['b']});
        --button1_hover_bg_color:rgb({$this->template['form_elements']['button1']['hover_bg_color']['r']},{$this->template['form_elements']['button1']['hover_bg_color']['g']},{$this->template['form_elements']['button1']['hover_bg_color']['b']});
        --button1_hover_outline_color:rgb({$this->template['form_elements']['button1']['hover_outline_color']['r']},{$this->template['form_elements']['button1']['hover_outline_color']['g']},{$this->template['form_elements']['button1']['hover_outline_color']['b']});
        --button1_hover_outline_width:{$this->template['form_elements']['button1']['hover_outline_width']};
        --button1_click_font_color:rgb({$this->template['form_elements']['button1']['click_font_color']['r']},{$this->template['form_elements']['button1']['click_font_color']['g']},{$this->template['form_elements']['button1']['click_font_color']['b']});
        --button1_click_bg_color:rgb({$this->template['form_elements']['button1']['click_bg_color']['r']},{$this->template['form_elements']['button1']['click_bg_color']['g']},{$this->template['form_elements']['button1']['click_bg_color']['b']});
        --button1_click_outline_color:rgb({$this->template['form_elements']['button1']['click_outline_color']['r']},{$this->template['form_elements']['button1']['click_outline_color']['g']},{$this->template['form_elements']['button1']['click_outline_color']['b']});
        --button1_click_outline_width:{$this->template['form_elements']['button1']['click_outline_width']};
        --button1_disabled_font_color:rgb({$this->template['form_elements']['button1']['disabled_font_color']['r']},{$this->template['form_elements']['button1']['disabled_font_color']['g']},{$this->template['form_elements']['button1']['disabled_font_color']['b']});
        --button1_disabled_bg_color:rgb({$this->template['form_elements']['button1']['disabled_bg_color']['r']},{$this->template['form_elements']['button1']['disabled_bg_color']['g']},{$this->template['form_elements']['button1']['disabled_bg_color']['b']});
        --button1_disabled_outline_color:rgb({$this->template['form_elements']['button1']['disabled_outline_color']['r']},{$this->template['form_elements']['button1']['disabled_outline_color']['g']},{$this->template['form_elements']['button1']['disabled_outline_color']['b']});
        --button1_disabled_outline_width:{$this->template['form_elements']['button1']['disabled_outline_width']};
        --button2_padding_y:{$this->template['form_elements']['button2']['padding_y']};
        --button2_padding_x:{$this->template['form_elements']['button2']['padding_x']};
        --button2_border_radius:{$this->template['form_elements']['button2']['border_radius']};
        --button2_font_size:{$this->template['form_elements']['button2']['font_size']};
        --button2_font_color:rgb({$this->template['form_elements']['button2']['font_color']['r']},{$this->template['form_elements']['button2']['font_color']['g']},{$this->template['form_elements']['button2']['font_color']['b']});
        --button2_bg_color:rgb({$this->template['form_elements']['button2']['bg_color']['r']},{$this->template['form_elements']['button2']['bg_color']['g']},{$this->template['form_elements']['button2']['bg_color']['b']});
        --button2_outline_color:rgb({$this->template['form_elements']['button2']['outline_color']['r']},{$this->template['form_elements']['button2']['outline_color']['g']},{$this->template['form_elements']['button2']['outline_color']['b']});
        --button2_outline_width:{$this->template['form_elements']['button2']['outline_width']};
        --button2_hover_font_color:rgb({$this->template['form_elements']['button2']['hover_font_color']['r']},{$this->template['form_elements']['button2']['hover_font_color']['g']},{$this->template['form_elements']['button2']['hover_font_color']['b']});
        --button2_hover_bg_color:rgb({$this->template['form_elements']['button2']['hover_bg_color']['r']},{$this->template['form_elements']['button2']['hover_bg_color']['g']},{$this->template['form_elements']['button2']['hover_bg_color']['b']});
        --button2_hover_outline_color:rgb({$this->template['form_elements']['button2']['hover_outline_color']['r']},{$this->template['form_elements']['button2']['hover_outline_color']['g']},{$this->template['form_elements']['button2']['hover_outline_color']['b']});
        --button2_hover_outline_width:{$this->template['form_elements']['button2']['hover_outline_width']};
        --button2_click_font_color:rgb({$this->template['form_elements']['button2']['click_font_color']['r']},{$this->template['form_elements']['button2']['click_font_color']['g']},{$this->template['form_elements']['button2']['click_font_color']['b']});
        --button2_click_bg_color:rgb({$this->template['form_elements']['button2']['click_bg_color']['r']},{$this->template['form_elements']['button2']['click_bg_color']['g']},{$this->template['form_elements']['button2']['click_bg_color']['b']});
        --button2_click_outline_color:rgb({$this->template['form_elements']['button2']['click_outline_color']['r']},{$this->template['form_elements']['button2']['click_outline_color']['g']},{$this->template['form_elements']['button2']['click_outline_color']['b']});
        --button2_click_outline_width:{$this->template['form_elements']['button2']['click_outline_width']};
        --button2_disabled_font_color:rgb({$this->template['form_elements']['button2']['disabled_font_color']['r']},{$this->template['form_elements']['button2']['disabled_font_color']['g']},{$this->template['form_elements']['button2']['disabled_font_color']['b']});
        --button2_disabled_bg_color:rgb({$this->template['form_elements']['button2']['disabled_bg_color']['r']},{$this->template['form_elements']['button2']['disabled_bg_color']['g']},{$this->template['form_elements']['button2']['disabled_bg_color']['b']});
        --button2_disabled_outline_color:rgb({$this->template['form_elements']['button2']['disabled_outline_color']['r']},{$this->template['form_elements']['button2']['disabled_outline_color']['g']},{$this->template['form_elements']['button2']['disabled_outline_color']['b']});
        --button2_disabled_outline_width:{$this->template['form_elements']['button2']['disabled_outline_width']};
        --loading_spinner_c1:rgb({$this->template['loading_spinner']['colors']['loading_spinner_c1']['r']},{$this->template['loading_spinner']['colors']['loading_spinner_c1']['g']},{$this->template['loading_spinner']['colors']['loading_spinner_c1']['b']});
        --loading_spinner_c2:rgb({$this->template['loading_spinner']['colors']['loading_spinner_c2']['r']},{$this->template['loading_spinner']['colors']['loading_spinner_c2']['g']},{$this->template['loading_spinner']['colors']['loading_spinner_c2']['b']});
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
        .home_section_container{ padding:0 var(--page_margin) ; box-sizing: border-box ; max-width:var(--page_max_width) ;margin:auto ; position: relative;}
        .home_section_elements_container{display:flex;flex-direction: column; flex-wrap: nowrap;align-items: flex-start;justify-content: flex-start;box-sizing: border-box;}
        .font_t{font-family: var(--font_t);line-height: var(--font_t_lh);letter-spacing: var(--font_t_ls);font-weight: var(--font_t_fw)}
        .font_p{font-family: var(--font_p);line-height: var(--font_p_lh);letter-spacing: var(--font_p_ls);font-weight: var(--font_p_fw)}
        .body_color_theme{background-color: var(--body_color_theme_bg);color: var(--body_color_theme_txt);}
        #page{ position: relative; width:100%; height:100%; }
        .bgc_1{background-color: var(--color_1);}
        .bgc_2{background-color: var(--color_2);}
        .bgc_3{background-color: var(--color_3);}
        .bgc_4{background-color: var(--color_4);}
        .c_1{color: var(--color_1);}
        .c_2{color: var(--color_2);}
        .c_3{color: var(--color_3);}
        .c_4{color: var(--color_4);}
        .transparent{background-color: unset;color:unset;}
        .color_1_2{background-color: var(--color_1);color:var(--color_2);}
        .color_1_3{background-color: var(--color_1);color:var(--color_3);}
        .color_1_4{background-color: var(--color_1);color:var(--color_4);}
        .color_2_1{background-color: var(--color_2);color:var(--color_1);}
        .color_2_3{background-color: var(--color_2);color:var(--color_3);}
        .color_2_4{background-color: var(--color_2);color:var(--color_4);}
        .color_3_1{background-color: var(--color_3);color:var(--color_1);}
        .color_3_2{background-color: var(--color_3);color:var(--color_2);}
        .color_3_4{background-color: var(--color_3);color:var(--color_4);}
        .color_4_1{background-color: var(--color_4);color:var(--color_1);}
        .color_4_2{background-color: var(--color_4);color:var(--color_2);}
        .color_4_3{background-color: var(--color_4);color:var(--color_3);}
        .bgc_star{background-color: var(--color_star);}
        .bgc_success{background-color: var(--color_success);}
        .bgc_error{background-color: var(--color_error);}
        .bgc_warning{background-color: var(--color_warning);}
        .c_star{color: var(--color_star);}
        .c_success{color: var(--color_success);}
        .c_error{color: var(--color_error);}
        .c_warning{color: var(--color_warning);}
        string;
        self::add_to_file($css);
    }

    public function generate_form_classes(){
        $css = <<<string
        .form{display:flex;flex-direction: column;align-items: var(--form_align);justify-content: flex-start;width:fit-content;}
        input[type='number'] {-moz-appearance:textfield;}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;}
        .input{text-align: var(--input_text_align);margin-bottom:var(--form_elem_spacing);max-width:100%;box-sizing: border-box;padding:var(--input_padding_y) var(--input_padding_x);border-width:var(--input_border_width);border-style:var(--input_border_style);border-radius:var(--input_border_radius);border-color:var(--input_border_color);font-size:var(--input_font_size);color:var(--input_font_color);background-color: var(--input_bg_color);}
        .input:focus{outline-style: solid;outline-width: var(--input_focus_outline_width);outline-color: var(--input_focus_outline_color);background-color: var(--input_focus_bg_color);}
        .input:read-only{cursor: not-allowed;}
        .input_lable{margin-top:var(--form_elem_spacing);font-size:var(--input_label_font_size);margin-inline:var(--input_label_margin);}
        textarea{resize: none;}
        .checkbox{width:var(--checkbox_size);height:var(--checkbox_size);position: relative;border:2px solid var(--checkbox_color);cursor: pointer;border-radius: var(--checkbox_border_radius);margin:var(--form_elem_spacing) 0;}
        .checkbox_checked{background-color: var(--checkbox_color);color: var(--checkbox_checkMark_color);}
        .button1{max-width:100%;box-sizing: border-box;cursor: pointer;border: none;outline: none;font-size: var(--button1_font_size);padding:var(--button1_padding_y) var(--button1_padding_x);background-color: var(--button1_bg_color);color: var(--button1_font_color);border-radius: var(--button1_border_radius);outline-style: solid;outline-color:var(--button1_outline_color);outline-width:var(--button1_outline_width);}
        .button1:hover{color:var(--button1_hover_font_color);background-color:var(--button1_hover_bg_color);outline-style: solid;outline-width: var(--button1_hover_outline_width);outline-color: var(--button1_hover_outline_color);}
        .button1:active{color:var(--button1_click_font_color);background-color:var(--button1_click_bg_color);outline-style: solid;outline-width: var(--button1_click_outline_width);outline-color: var(--button1_click_outline_color);}
        .button1:disabled{cursor: not-allowed;color:var(--button1_disabled_font_color);background-color:var(--button1_disabled_bg_color);outline-style: solid;outline-width: var(--button1_disabled_outline_width);outline-color: var(--button1_disabled_outline_color);}
        .button2{max-width:100%;box-sizing: border-box;cursor: pointer;border: none;outline: none;font-size: var(--button2_font_size);padding:var(--button2_padding_y) var(--button2_padding_x);background-color: var(--button2_bg_color);color: var(--button2_font_color);border-radius: var(--button2_border_radius);outline-style: solid;outline-color:var(--button2_outline_color);outline-width:var(--button2_outline_width);}
        .button2:hover{color:var(--button2_hover_font_color);background-color:var(--button2_hover_bg_color);outline-style: solid;outline-width: var(--button2_hover_outline_width);outline-color: var(--button2_hover_outline_color);}
        .button2:active{color:var(--button2_click_font_color);background-color:var(--button2_click_bg_color);outline-style: solid;outline-width: var(--button2_click_outline_width);outline-color: var(--button2_click_outline_color);}
        .button2:disabled{cursor: not-allowed;color:var(--button2_disabled_font_color);background-color:var(--button2_disabled_bg_color);outline-style: solid;outline-width: var(--button2_disabled_outline_width);outline-color: var(--button2_disabled_outline_color);}
        string;
        self::add_to_file($css);
    }
}
