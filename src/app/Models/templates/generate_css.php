<?php
namespace App\Models\templates;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class generate_css
{
    public $template;
    public $css_file = '';
    public $animations;
    public $fonts = [];
    public $selected_fonts = [];
    public $parent_class_selector = '';
    public $lang_code;
    public function add_to_file($css){
        $this->css_file = $this->css_file.$css;
    }
    public function delete_lang_dir($lang,$website_id){
        if (File::exists(storage_path("app/public/websites/{$website_id}/style/style_{$lang}.css"))) {
            File::delete(storage_path("app/public/websites/{$website_id}/style/style_{$lang}.css"));
        }
    }
    public function add_transition($animation){
        if(!in_array($animation,$this->animations)){
            array_push($this->animations,templates_data::transitions()[$animation]);
        }
    }
    public function add_scroll_animation($animation){

    }
    public function generate($template,$lang_code){
        $this->template = $template;
        $this->lang_code = $lang_code;
        $this->animations = ['0' => templates_data::page_transitions()[$this->template['page_setup']['pageTransition']]];
        $this->fonts = templates_data::fonts();
        self::generate_vars();
        self::generate_global_selectors();

        self::add_to_file(self::generate_class($this->template['website_header']));
        // self::add_transition($this->template['website_header']['children']['header_wrapper']['children']['header_navList']['children']['header_drop_down_list']['animation_name']);
        // self::add_to_file(self::generate_class($this->template['website_header']['header_drop_down_list_item']));
        //


        self::add_to_file(self::generate_class($this->template['popup_window']));
        self::add_to_file(self::generate_class($this->template['login_popup']));
        // self::add_transition($this->template['popup_window']['transition']);

        foreach($this->template['home'] as $section){
            self::generate_class($section);
        }

        //
        foreach($this->animations as $animation){
            self::add_to_file($animation);
        }
        self::add_to_file('.none{display:none}.nowrap{white-space:nowrap;}.vH{visibility: hidden}');

        foreach($this->selected_fonts as $font){
            self::add_to_file("@font-face {font-family: '{$font['name']}';src: url('/storage/builder_fonts/{$font['language']}/{$font['name']}.ttf') format(\"truetype\");}");
            self::add_to_file(".font_{$font['name']}{font-family:{$font['name']};}");
        }
        $this->css_file = str_replace(array("\r","\n"),"",$this->css_file);

        if(Storage::put("websites/{$this->template['website_id']}/style/style_{$lang_code}.css", $this->css_file)){
            return true;
        }else{
            return false;
        }
    }
    public function generate_class($elem){
        // if(array_key_exists('font_style',$elem)){
        //     foreach($elem['font_style'] as $key => $val){
        //         $font = $this->fonts[array_search($val, array_column($this->fonts, 'name'))];
        //         if(array_key_exists('general_class',$elem)){
        //             if($val != ''){
        //                 self::add_to_file(".{$elem['class_selector']}_{$key}{font-family:{$val} !important;}");
        //             }
        //         }
        //         if(!array_key_exists($font['name'],$this->selected_fonts)){
        //             $this->selected_fonts[$font['name']] = $font;
        //         }
        //     }
        // }
        if(array_key_exists('transition',$elem)){
            self::add_transition($elem['transition']);
        }
        if(array_key_exists('class_selector',$elem)){
            $has_animation = false;
            if(array_key_exists('animation',$elem)){
                if($elem['animation']['name'] != 'no_animation' || $elem['animation_mobile']['name'] != 'no_animation'){
                    $has_animation = true;
                } 
            }
            $css_start = ".{$elem['class_selector']}{";
            $css = '';
            if(array_key_exists('css', $elem)){
                $css = $css.self::add_css_style($elem['vars'] ?? null,$elem['css'],$has_animation);
            }
            if(array_key_exists('background', $elem)){
                $css = $css.self::add_background_style($elem['background']);
            }
            if(array_key_exists('font_style',$elem)){
                if(array_key_exists($this->lang_code,$elem['font_style'])){
                    $css = $css."font-family:{$elem['font_style'][$this->lang_code]};";
                    $font = $this->fonts[array_search($elem['font_style'][$this->lang_code], array_column($this->fonts, 'name'))];
                    if(!array_key_exists($font['name'],$this->selected_fonts)){
                        $this->selected_fonts[$font['name']] = $font;
                    }
                }
            }
            $css = $css."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
            if(array_key_exists('css_mobile', $elem)){
                $css = $css.self::add_css_style($elem['vars'] ?? null,$elem['css_mobile'],$has_animation);
            }
            if(array_key_exists('background_mobile', $elem) ){
                $css = $css.self::add_background_style($elem['background_mobile']);
            }
            $css = $css."}";
            $css_end = "}";
            $final_css = $css_start.$css.$css_end;

            if(array_key_exists('animation',$elem)){
                if($elem['animation']['name'] != 'no_animation' || $elem['animation_mobile']['name'] != 'no_animation'){

                    $css_animation_up_out = ".{$elem['class_selector']}_animation_up_out{";
                    if($elem['animation']['name'] != 'no_animation'){
                        $css_animation_up_out = $css_animation_up_out."transition-duration:{$elem['animation']['up_out_duration']};";
                        $css_animation_up_out = $css_animation_up_out."transition-delay:{$elem['animation']['up_out_delay']};";
                        $css_animation_up_out = $css_animation_up_out."transition-timing-function:{$elem['animation']['up_out_timing_function']};";
                        $css_animation_up_out = $css_animation_up_out."transform:{$elem['animation']['up_out_transform']};";
                        $css_animation_up_out = $css_animation_up_out."transform-origin:{$elem['animation']['up_out_transform_origin']};";
                        $css_animation_up_out = $css_animation_up_out."filter:{$elem['animation']['up_out_filter']};";
                    }
                    if($elem['animation_mobile']['name'] != 'no_animation'){
                        $css_animation_up_out = $css_animation_up_out."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            $css_animation_up_out = $css_animation_up_out."transition-duration:{$elem['animation_mobile']['up_out_duration']};";
                            $css_animation_up_out = $css_animation_up_out."transition-delay:{$elem['animation_mobile']['up_out_delay']};";
                            $css_animation_up_out = $css_animation_up_out."transition-timing-function:{$elem['animation_mobile']['up_out_timing_function']};";
                            $css_animation_up_out = $css_animation_up_out."transform:{$elem['animation_mobile']['up_out_transform']};";
                            $css_animation_up_out = $css_animation_up_out."transform-origin:{$elem['animation_mobile']['up_out_transform_origin']};";
                            $css_animation_up_out = $css_animation_up_out."filter:{$elem['animation_mobile']['up_out_filter']};";
                        $css_animation_up_out = $css_animation_up_out."}";
                    }
                    $css_animation_up_out = $css_animation_up_out."}";
                    $final_css = $final_css.$css_animation_up_out;
                    //
                    $css_animation_up = ".{$elem['class_selector']}_animation_up{";
                    if($elem['animation']['name'] != 'no_animation'){
                        $css_animation_up = $css_animation_up."transition-duration:{$elem['animation']['up_duration']};";
                        $css_animation_up = $css_animation_up."transition-delay:{$elem['animation']['up_delay']};";
                        $css_animation_up = $css_animation_up."transition-timing-function:{$elem['animation']['up_timing_function']};";
                        $css_animation_up = $css_animation_up."transform:{$elem['animation']['up_transform']};";
                        $css_animation_up = $css_animation_up."transform-origin:{$elem['animation']['up_transform_origin']};";
                        $css_animation_up = $css_animation_up."filter:{$elem['animation']['up_filter']};";
                    }
                    if($elem['animation_mobile']['name'] != 'no_animation'){
                        $css_animation_up = $css_animation_up."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            $css_animation_up = $css_animation_up."transition-duration:{$elem['animation_mobile']['up_duration']};";
                            $css_animation_up = $css_animation_up."transition-delay:{$elem['animation_mobile']['up_delay']};";
                            $css_animation_up = $css_animation_up."transition-timing-function:{$elem['animation_mobile']['up_timing_function']};";
                            $css_animation_up = $css_animation_up."transform:{$elem['animation_mobile']['up_transform']};";
                            $css_animation_up = $css_animation_up."transform-origin:{$elem['animation_mobile']['up_transform_origin']};";
                            $css_animation_up = $css_animation_up."filter:{$elem['animation_mobile']['up_filter']};";
                        $css_animation_up = $css_animation_up."}";
                    }
                    $css_animation_up = $css_animation_up."}";
                    $final_css = $final_css.$css_animation_up;
                    //
                    $css_animation_in = ".{$elem['class_selector']}_animation_in{";
                    if($elem['animation']['name'] != 'no_animation'){
                        $css_animation_in = $css_animation_in."transition-duration:{$elem['animation']['in_duration']};";
                        $css_animation_in = $css_animation_in."transition-delay:{$elem['animation']['in_delay']};";
                        $css_animation_in = $css_animation_in."transition-timing-function:{$elem['animation']['in_timing_function']};";
                        $css_animation_in = $css_animation_in."transform:{$elem['animation']['in_transform']};";
                        $css_animation_in = $css_animation_in."transform-origin:{$elem['animation']['in_transform_origin']};";
                        $css_animation_in = $css_animation_in."filter:{$elem['animation']['in_filter']};";
                    }
                    if($elem['animation_mobile']['name'] != 'no_animation'){
                        $css_animation_in = $css_animation_in."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            $css_animation_in = $css_animation_in."transition-duration:{$elem['animation_mobile']['in_duration']};";
                            $css_animation_in = $css_animation_in."transition-delay:{$elem['animation_mobile']['in_delay']};";
                            $css_animation_in = $css_animation_in."transition-timing-function:{$elem['animation_mobile']['in_timing_function']};";
                            $css_animation_in = $css_animation_in."transform:{$elem['animation_mobile']['in_transform']};";
                            $css_animation_in = $css_animation_in."transform-origin:{$elem['animation_mobile']['in_transform_origin']};";
                            $css_animation_in = $css_animation_in."filter:{$elem['animation_mobile']['in_filter']};";
                        $css_animation_in = $css_animation_in."}";
                    }
                    $css_animation_in = $css_animation_in."}";
                    $final_css = $final_css.$css_animation_in;
                    //
                    $css_animation_down = ".{$elem['class_selector']}_animation_down{";
                    if($elem['animation']['name'] != 'no_animation'){
                        $css_animation_down = $css_animation_down."transition-duration:{$elem['animation']['down_duration']};";
                        $css_animation_down = $css_animation_down."transition-delay:{$elem['animation']['down_delay']};";
                        $css_animation_down = $css_animation_down."transition-timing-function:{$elem['animation']['down_timing_function']};";
                        $css_animation_down = $css_animation_down."transform:{$elem['animation']['down_transform']};";
                        $css_animation_down = $css_animation_down."transform-origin:{$elem['animation']['down_transform_origin']};";
                        $css_animation_down = $css_animation_down."filter:{$elem['animation']['down_filter']};";
                    }
                    if($elem['animation_mobile']['name'] != 'no_animation'){
                        $css_animation_down = $css_animation_down."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            $css_animation_down = $css_animation_down."transition-duration:{$elem['animation_mobile']['down_duration']};";
                            $css_animation_down = $css_animation_down."transition-delay:{$elem['animation_mobile']['down_delay']};";
                            $css_animation_down = $css_animation_down."transition-timing-function:{$elem['animation_mobile']['down_timing_function']};";
                            $css_animation_down = $css_animation_down."transform:{$elem['animation_mobile']['down_transform']};";
                            $css_animation_down = $css_animation_down."transform-origin:{$elem['animation_mobile']['down_transform_origin']};";
                            $css_animation_down = $css_animation_down."filter:{$elem['animation_mobile']['down_filter']};";
                        $css_animation_down = $css_animation_down."}";
                    }
                    $css_animation_down = $css_animation_down."}";
                    $final_css = $final_css.$css_animation_down;
                    //
                    $css_animation_down_out = ".{$elem['class_selector']}_animation_down_out{";
                    if($elem['animation']['name'] != 'no_animation'){
                        $css_animation_down_out = $css_animation_down_out."transition-duration:{$elem['animation']['down_out_duration']};";
                        $css_animation_down_out = $css_animation_down_out."transition-delay:{$elem['animation']['down_out_delay']};";
                        $css_animation_down_out = $css_animation_down_out."transition-timing-function:{$elem['animation']['down_out_timing_function']};";
                        $css_animation_down_out = $css_animation_down_out."transform:{$elem['animation']['down_out_transform']};";
                        $css_animation_down_out = $css_animation_down_out."transform-origin:{$elem['animation']['down_out_transform_origin']};";
                        $css_animation_down_out = $css_animation_down_out."filter:{$elem['animation']['down_out_filter']};";
                    }
                    if($elem['animation_mobile']['name'] != 'no_animation'){
                        $css_animation_down_out = $css_animation_down_out."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            $css_animation_down_out = $css_animation_down_out."transition-duration:{$elem['animation_mobile']['down_out_duration']};";
                            $css_animation_down_out = $css_animation_down_out."transition-delay:{$elem['animation_mobile']['down_out_delay']};";
                            $css_animation_down_out = $css_animation_down_out."transition-timing-function:{$elem['animation_mobile']['down_out_timing_function']};";
                            $css_animation_down_out = $css_animation_down_out."transform:{$elem['animation_mobile']['down_out_transform']};";
                            $css_animation_down_out = $css_animation_down_out."transform-origin:{$elem['animation_mobile']['down_out_transform_origin']};";
                            $css_animation_down_out = $css_animation_down_out."filter:{$elem['animation_mobile']['down_out_filter']};";
                        $css_animation_down_out = $css_animation_down_out."}";
                    }
                    $css_animation_down_out = $css_animation_down_out."}";
                    $final_css = $final_css.$css_animation_down_out;

                }
                // else{
                    // $final_css = $final_css.$css_hover_start.$css_hover.$css_hover_end;
                // }
            }
            if(array_key_exists('accessibility',$elem)){
                if(in_array('hover', $elem['accessibility'])){
                    $css_hover = '';
                    if(in_array('parent_hover', $elem['accessibility'])){
                        $css_hover_start = ".{$this->parent_class_selector}:hover{.{$elem['class_selector']}{";
                    }else{
                        $css_hover_start = ".{$elem['class_selector']}:hover{";
                    }
                    if(array_key_exists('css_hover',$elem)){
                        $css_hover = $css_hover.self::add_css_style($elem['vars'] ?? null,$elem['css_hover'],$has_animation);
                    }
                    if(array_key_exists('background_hover',$elem)){
                        $css_hover = $css_hover.self::add_background_style($elem['background_hover']);
                    }
                    $css_hover = $css_hover."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                    if(array_key_exists('css_hover_mobile',$elem)){
                        $css_hover = $css_hover.self::add_css_style($elem['vars'] ?? null,$elem['css_hover_mobile'],$has_animation);
                    }
                    if(array_key_exists('background_hover_mobile',$elem)){
                        $css_hover = $css_hover.self::add_background_style($elem['background_hover_mobile']);
                    }
                    $css_hover = $css_hover."}";
                    if(in_array('parent_hover', $elem['accessibility'])){
                        $css_hover_end = "}}";
                    }else{
                        $css_hover_end = "}";
                    }
                    $final_css = $final_css.$css_hover_start.$css_hover.$css_hover_end;
                }
                if(in_array('click', $elem['accessibility'])){
                    $css_click = '';
                    $css_click_start = ".{$elem['class_selector']}:active{";
                    if(array_key_exists('css_click',$elem)){
                        $css_click = $css_click.self::add_css_style($elem['vars'] ?? null,$elem['css_click'],$has_animation);
                    }
                    if(array_key_exists('background_click',$elem)){
                        $css_click = $css_click.self::add_background_style($elem['background_click']);
                    }
                    $css_click = $css_click."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                    if(array_key_exists('css_click_mobile',$elem)){
                        $css_click = $css_click.self::add_css_style($elem['vars'] ?? null,$elem['css_click_mobile'],$has_animation);
                    }
                    if(array_key_exists('background_click_mobile',$elem)){
                        $css_click = $css_click.self::add_background_style($elem['background_click_mobile']);
                    }
                    $css_click = $css_click."}";

                    $css_click_end = "}";
                    // else{
                    $final_css = $final_css.$css_click_start.$css_click.$css_click_end;
                    // }
                }
                if(in_array('focus', $elem['accessibility'])){
                    $css_focus = '';
                    $css_focus_start = ".{$elem['class_selector']}:focus{";
                    if(array_key_exists('css_focus',$elem)){
                        $css_focus = $css_focus.self::add_css_style($elem['vars'] ?? null,$elem['css_focus'],$has_animation);
                    }
                    if(array_key_exists('background_focus',$elem)){
                        $css_focus = $css_focus.self::add_background_style($elem['background_focus']);
                    }
                    $css_focus = $css_focus."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                    if(array_key_exists('css_focus_mobile',$elem)){
                        $css_focus = $css_focus.self::add_css_style($elem['vars'] ?? null,$elem['css_focus_mobile'],$has_animation);
                    }
                    if(array_key_exists('background_focus_mobile',$elem)){
                        $css_focus = $css_focus.self::add_background_style($elem['background_focus_mobile']);
                    }
                    $css_focus = $css_focus."}";
                    $css_focus_end = "}";
                    $final_css = $final_css.$css_focus_start.$css_focus.$css_focus_end;
                }
                if(in_array('disabled', $elem['accessibility'])){
                    $css_disabled = '';
                    $css_disabled_start = ".{$elem['class_selector']}:disabled{";
                    if(array_key_exists('css_disabled',$elem)){
                        $css_disabled = $css_disabled.self::add_css_style($elem['vars'] ?? null,$elem['css_disabled'],$has_animation);
                    }
                    if(array_key_exists('background_disabled',$elem)){
                        $css_disabled = $css_disabled.self::add_background_style($elem['background_disabled']);
                    }
                    $css_disabled = $css_disabled."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                    if(array_key_exists('css_disabled_mobile',$elem)){
                        $css_disabled = $css_disabled.self::add_css_style($elem['vars'] ?? null,$elem['css_disabled_mobile'],$has_animation);
                    }
                    if(array_key_exists('background_disabled_mobile',$elem)){
                        $css_disabled = $css_disabled.self::add_background_style($elem['background_disabled_mobile']);
                    }
                    $css_disabled = $css_disabled."}";
                    $css_disabled_end = "}";
                    $final_css = $final_css.$css_disabled_start.$css_disabled.$css_disabled_end;
                }
                if(in_array('placeholder', $elem['accessibility'])){
                    $css_placeholder = '';
                    $css_placeholder_start = ".{$elem['class_selector']}::placeholder {";
                    if(array_key_exists('css_placeholder',$elem)){
                        $css_placeholder = $css_placeholder.self::add_css_style($elem['vars'] ?? null,$elem['css_placeholder'],$has_animation);
                    }
                    $css_placeholder = $css_placeholder."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                    if(array_key_exists('css_placeholder_mobile',$elem)){
                        $css_placeholder = $css_placeholder.self::add_css_style($elem['vars'] ?? null,$elem['css_placeholder_mobile'],$has_animation);
                    }
                    $css_placeholder = $css_placeholder."}";
                    $css_placeholder_end = "}";
                    $final_css = $final_css.$css_placeholder_start.$css_placeholder.$css_placeholder_end;

                }
                if(in_array('hyperlink', $elem['accessibility'])){
                    $hyperlink_css = ".{$elem['class_selector']} a{color:{$elem['css_hyperlink']['color']};text-decoration:{$elem['css_hyperlink']['text-decoration']};}";
                    $final_css = $final_css.$hyperlink_css;
                }
            }
            if(array_key_exists('css_children',$elem)){
                foreach($elem['css_children'] as $child_key => $child_css){
                    $css_child = ".{$elem['class_selector']} {$child_key}{";
                    $css_child = $css_child.self::add_css_style($elem['vars'] ?? null,$child_css,$has_animation);
                    $css_child = $css_child."}";
                    $final_css = $final_css.$css_child;
                }
            }
            if(array_key_exists('keyframes',$elem)){
                foreach($elem['keyframes'] as $key => $keyframes){
                    $css_keyframe = "@keyframes {$key} {";
                    foreach($keyframes as $keyframe_key => $keyframe_val){
                        if($elem['vars'] !== null ){
                            foreach($elem['vars'] as $var_key => $var_val){
                                $keyframe_val = str_replace($var_key,$var_val,$keyframe_val);
                            }
                        }
                        $css_keyframe = $css_keyframe.$keyframe_key."{".self::add_css_style(null,$keyframe_val,false)."}";
                    }
                    $css_keyframe = $css_keyframe."}";
                    $final_css = $final_css.$css_keyframe;
                }
            }
            if(array_key_exists('type', $elem)){
                if($elem['type'] == 'section'){
                    $css_driver_section = ".{$elem['class_selector']}{";
                    $css_driver_section_mobile = "@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                    if($elem['attr']['adapt_header'] == 1){
                        $css_driver_section = $css_driver_section."margin-top:calc(var(--header_height) * -1);";
                        $css_driver_section_mobile = $css_driver_section_mobile."margin-top:calc(var(--header_height) * -1);";
                        $css_driver_section = $css_driver_section."padding-top:var(--header_height);";
                        $css_driver_section_mobile = $css_driver_section_mobile."padding-top:var(--header_height);";
                    }

                    if($elem['has_driver'] == '1'){
                        $css_driver_section = $css_driver_section."padding-{$elem['driver']['position']}:{$elem['driver']['css']['height']};";
                        $css_driver_section_mobile = $css_driver_section_mobile."padding-{$elem['driver']['position']}:{$elem['driver']['css_mobile']['height']};";

                        $css_driver_section_mobile = $css_driver_section_mobile.'}';
                        $css_driver_section = $css_driver_section.$css_driver_section_mobile."}";
                        $final_css = $final_css.$css_driver_section;

                        $css_driver_start = ".{$elem['class_selector']}_driver{";
                        $css_driver = "height:{$elem['driver']['css']['height']};";
                        if($elem['driver']['position'] == 'top'){
                            if($elem['driver']['flip'] == 1){
                                $css_driver = $css_driver."top:0;transform:rotateY(180deg);";
                            }else{
                                $css_driver = $css_driver."top:0;";
                            }
                        }else if($elem['driver']['position'] == 'bottom'){
                            if($elem['driver']['flip'] == 1){
                                $css_driver = $css_driver."bottom:0;transform:rotateZ(180deg) rotateY(180deg);";
                            }else{
                                $css_driver = $css_driver."bottom:0;transform:rotateZ(180deg);";
                            }
                        }
                        foreach($elem['driver']['svg_style'] as $key => $val){
                            $css_driver = $css_driver."{$key}:{$val};";
                        }
                        $css_driver = $css_driver."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){height:{$elem['driver']['css_mobile']['height']}}";
                        $css_driver_end = '}';
                        $final_css = $final_css.$css_driver_start.$css_driver.$css_driver_end;
                    }else{
                        $css_driver_section_mobile = $css_driver_section_mobile.'}';
                        $css_driver_section = $css_driver_section.$css_driver_section_mobile."}";
                        $final_css = $final_css.$css_driver_section;
                    }
                }
            }

            self::add_to_file($final_css);

        }


        if(array_key_exists('children',$elem)){
            if(array_key_exists('class_selector',$elem)){
                $this->parent_class_selector = $elem['class_selector'];
            }
            foreach($elem['children'] as $child){
                self::generate_class($child);
            }
        }
    }

    public function generate_vars(){
        $css = <<<string
        :root{
        --page_max_width:{$this->template['page_setup']['max_width']};

        --page_transition:{$this->template['page_setup']['pageTransition']};
        --page_transitionDuration:{$this->template['page_setup']['transitionDuration']};

        string;

        foreach($this->template['website_colors']['colors'] as $key => $val){
            $css = $css."--{$key}:{$val['r']},{$val['g']},{$val['b']};";
        }
        foreach($this->template['website_colors']['custom_colors'] as $key => $val){
            $css = $css."--{$key}:{$val['r']},{$val['g']},{$val['b']};";
        }
        $css = $css.<<<string
        }
        string;
        self::add_to_file($css);
    }

    public function generate_global_selectors(){
        $body_font_name = '';
        foreach($this->template['page_setup']['font_style'] as $key => $val){
            $font = $this->fonts[array_search($val, array_column($this->fonts, 'name'))];
            $body_font_name = $font['name'];
            if(!array_key_exists($font['name'],$this->selected_fonts)){
                $this->selected_fonts[$font['name']] = $font;
            }
        }
        $css = <<<string
        *{-webkit-tap-highlight-color: transparent;}
        html {margin: 0;padding: 0;height: 100%;width: 100%;overflow: hidden;}
        body{font-family:{$body_font_name};user-select: none;width:100%;height:100%;box-sizing: border-box;margin:auto;overflow-y: auto;overflow-x:hidden;position: relative;color:{$this->template['page_setup']['font_color']};background-color:{$this->template['page_setup']['bg_color']}}
        button{all:unset;}
        input{all:unset;}
        input[type='number'] {-moz-appearance:textfield;}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;}
        textarea{resize: none;}
        a{color:unset;text-decoration: unset;cursor: pointer;}
        a:hover{color:unset;text-decoration: unset;cursor: pointer;}
        #page{ position: relative; width:100%;animation-duration: var(--page_transitionDuration); }
        .transparent{background-color: unset;color:unset;}
        .adapted_header {
            background-color: transparent !important;
            background: transparent !important;
            box-shadow: none !important;
            backdrop-filter: unset !important;
            border-color:transparent !important;

            .header_navList_item , .header_iconsList_icon, .header_icon_cart_num, .header_mobileNav_icon_svg, .header_logo_restaurant_name {
                color: var(--adapt_header_color) !important;
                fill: var(--adapt_header_color) !important;
                stroke: var(--adapt_header_color) !important;
            }
            .header_navList_item:hover , .header_iconsList_icon:hover, .header_icon_cart_num:hover, .header_mobileNav_icon_svg:hover, .header_logo_restaurant_name:hover {
                color: var(--adapt_header_color) !important;
                fill: var(--adapt_header_color) !important;
                stroke: var(--adapt_header_color) !important;
            }
        }
        string;
        self::add_to_file($css);
        foreach ($this->template['form_elements'] as $form_element) {
            self::add_to_file(self::generate_class($form_element));
        }
        // self::add_to_file(self::generate_class($this->template['form_elements']['website_form']));
        // self::add_to_file(self::generate_class($this->template['form_elements']['form_title']));
        // self::add_to_file(self::generate_class($this->template['form_elements']['form_message']));
        // self::add_to_file(self::generate_class($this->template['form_elements']['form_input_box']));
    }
    public function add_css_style($vars,$styles,$has_animation){
        $return_style = '';
        foreach($styles as $key => $val){
            if($vars !== null ){
                foreach($vars as $var_key => $var_val){
                    $val = str_replace($var_key,$var_val,$val);
                }
            }
            $add_style = true;
            if($has_animation){
                if($key == 'filter' ||
                $key == 'transform' ||
                $key == 'transform-origin' ||
                $key == 'transition-duration' ||
                $key == 'transition-delay' ||
                $key == 'transition-timing-function'){
                    $add_style = false;
                }   
            }

            if($key == 'max-width' || $key == 'width' || $key == 'min-width'){
                    $margin_right = '0px';
                    $margin_left = '0px';
                    if($val != 'auto' && array_key_exists('margin',$styles) && $styles['margin'] != 'auto'){
                        try{
                            $margin = $styles['margin'];
                            if($vars !== null ){
                                foreach($vars as $var_key => $var_val){
                                    $margin = str_replace($var_key,$var_val,$margin);
                                }
                            }
                            $margin = explode(' ',$margin);
                            if($margin[1] !== 'auto'){$margin_right = $margin[1];}
                            if($margin[3] !== 'auto'){$margin_left = $margin[3];}
                        }catch (\Exception $e){}
                        $val = "calc({$val} - {$margin_right} - {$margin_left})";
                    }
            }
            if($key == 'max-height' || $key == 'height' || $key == 'min-height'){
                $margin_top = '0px';
                $margin_bottom = '0px';
                if($val != 'auto' && array_key_exists('margin',$styles) && $styles['margin'] != 'auto'){
                    try{
                        $margin = $styles['margin'];
                        if($vars !== null ){
                            foreach($vars as $var_key => $var_val){
                                $margin = str_replace($var_key,$var_val,$margin);
                            }
                        }
                        $margin = explode(' ',$margin);
                        if($margin[0] !== 'auto'){$margin_top = $margin[0];}
                        if($margin[2] !== 'auto'){$margin_bottom = $margin[2];}
                    }catch (\Exception $e){}
                    $val = "calc({$val} - {$margin_top} - {$margin_bottom})";
                }
                if($key == 'min-height' &&array_key_exists('margin-top',$styles) && array_key_exists('margin-bottom',$styles) && $val != 'auto'){
                    $val = "calc({$val} - {$styles['margin-top']} - {$styles['margin-bottom']})";
                }
            }
            if($key == 'position' && $val == 'dynamic'){
                $val = 'sticky';
            }
            if($add_style){
                $return_style = $return_style."{$key}:{$val};";
            }
        }

        return $return_style;
    }
    public function add_background_style($background){
        $background_style = '';
        if($background['type'] == 'none'){
            $background_style = $background_style."background:none;";
        }else if($background['type'] == 'color'){
            $background_style = $background_style."background:{$background['color']};";
        }else if($background['type'] == 'gradient'){
            $background_style = $background_style."background:{$background['gradient']};";
        }else if($background['type'] == 'backdrop_filter'){
            $background_style = $background_style."background-color:{$background['backdrop_filter_color']};";
            $background_style = $background_style."backdrop-filter:{$background['backdrop_filter']};";
        }else if($background['type'] == 'image'){
            $background_style = $background_style."background-image:url({$background['background_image']});";
            $background_style = $background_style."background-size:{$background['background_size']};";
            $background_style = $background_style."background-attachment:{$background['background_attachment']};";
            $background_style = $background_style."background-repeat:{$background['background_repeat']};";
            $background_style = $background_style."background-position:{$background['background_position']};";
            $background_style = $background_style."background-blend-mode:{$background['background_blend_mode']};";
            $background_style = $background_style."background-color:{$background['background_blend_mode_color']};";
        }
        return $background_style;
    }

}
