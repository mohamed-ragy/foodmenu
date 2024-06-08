<?php
namespace App\Models\templates;
use Illuminate\Support\Facades\Storage;

class generate_css
{
    public $template;
    public $css_file = '';
    public $animations;
    public function add_to_file($css){
        $this->css_file = $this->css_file.$css;
    }
    public function add_animation($animation){
        if(!in_array($animation,$this->animations)){
            array_push($this->animations,templates_data::animations()[$animation]);
        }
    }
    public function add_scroll_animation($animation){
        
    }
    public function generate($template){
        $this->template = $template;
        $this->animations = ['0' => templates_data::page_transitions()[$this->template['page_setup']['pageTransition']]];
        self::generate_vars();
        self::generate_global_selectors();

        self::add_to_file(<<<string
            .website_loading{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;display:flex;align-items:center;justify-content:center;}
            .loading_screen{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;animation-duration: var(--page_transitionDuration);h3{max-width:500px;text-align:center;margin:0;font-weight:normal}h1{margin:0;margin-bottom:5px;margin:20px;}}
        string);

        self::add_to_file(self::generate_class($this->template['website_header']['elems']));
        self::add_animation($this->template['website_header']['elems']['children']['header_wrapper']['children']['header_navList']['children']['header_drop_down_list']['animation_name']);
        self::add_to_file(self::generate_class($this->template['website_header']['header_drop_down_list_item']));
        //
        if(!empty($this->template['home'])){
            if($this->template['home'][0]['adapt_header'] == '1'){
                self::add_to_file(<<<string
                .adapted_header{background-color: transparent;box-shadow: none;color:var(--adapted_header_font_color);fill:var(--adapted_header_font_color);stroke:var(--adapted_header_font_color);a{color:var(--adapted_header_font_color);fill:var(--adapted_header_font_color);stroke:var(--adapted_header_font_color);}a:hover{color:var(--adapted_header_font_color);fill:var(--adapted_header_font_color);stroke:var(--adapted_header_font_color);}}
                string);
            }
        }

        foreach($this->template['form_elements']['elems'] as $elem){
            self::add_to_file(self::generate_class($elem));
        }
        self::add_to_file(templates_data::loading_spinners()[$this->template['loading_spinner']['key']]['css']);
        self::add_to_file(self::generate_class($this->template['popup_window']['elems']));
        self::add_animation($this->template['popup_window']['transition']);

        foreach($this->template['home'] as $section){
            self::generate_class($section);
        }

        foreach($this->animations as $animation){
            self::add_to_file($animation);
        }
        self::add_to_file('.none{display:none}.nowrap{white-space:nowrap;}');
        $this->css_file = str_replace(array("\r","\n"),"",$this->css_file);

        if(Storage::put('websites/'.$this->template['website_id'].'/style.css', $this->css_file)){
            return true;
        }else{
            return false;
        }
    }
    public function generate_class($elem){
        if(array_key_exists('class_selector',$elem)){
            if(array_key_exists('font_style',$elem)){
                $elem['css']['font-family'] = "var(--{$elem['font_style']}_name)";
                $elem['css']['line-height'] = "var(--{$elem['font_style']}_line_height)";
                $elem['css']['letter-spacing'] = "var(--{$elem['font_style']}_letter_spacing)";
            }
            if(!empty($elem['css'])){
                $css_start = ".{$elem['class_selector']}{";
                $css = '';
                // $css_hover = '';
                foreach($elem['css'] as $key => $val){
                    if(array_key_exists('background', $elem)){
                        if($elem['background'] != 'backdrop_filter' && $key == 'backdrop-filter'){
                            $val = 'unset';
                        }
                        if($elem['background'] =='backdrop_filter' && $key == 'backdrop_filter_color'){
                            $key = 'background-color';
                        }
                        if($elem['background'] == 'backdrop_filter' && $val == 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)'){
                            $val = 'unset';
                        }
                    }
                    $css = $css."{$key}:{$val};";
                }
                $css = $css."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                if(array_key_exists('css_mobile', $elem)){
                    foreach($elem['css_mobile'] as $key => $val){
                        if(array_key_exists('background', $elem)){
                            if($elem['background'] != 'backdrop_filter' && $key == 'backdrop-filter'){
                                $val = 'unset';
                            }
                            if($elem['background'] =='backdrop_filter' && $key == 'backdrop_filter_color'){
                                $key = 'background-color';
                            }
                            if($elem['background'] == 'backdrop_filter' && $val == 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)'){
                                $val = 'unset';
                            }
                        }
                        $css = $css."{$key}:{$val};";
                    }
                }
                if(array_key_exists('background', $elem)){
                    if($elem['background'] == 'image'){
                        foreach($elem['background_image_mobile'] as $key => $val){
                            if($key == 'background-image'){$val = "url('".$val."')";}
                            $css = $css."{$key}:{$val};";
                        }
                    }
                }
                $css = $css."}";

                if(array_key_exists('background', $elem)){
                    if($elem['background'] == 'image'){
                        foreach($elem['background_image'] as $key => $val){
                            if($key == 'background-image'){$val = "url('".$val."')";}
                            $css = $css."{$key}:{$val};";
                        }
                    }
                }

                $css_end = "}";
                $final_css = $css_start.$css.$css_end;

                if(array_key_exists('css_hover', $elem)){
                    $css_hover = '';
                    $css_hover_start = ".{$elem['class_selector']}:hover{";
                    foreach($elem['css_hover'] as $key => $val){
                        if(array_key_exists('background', $elem)){
                            if($elem['background'] != 'backdrop_filter' && $key == 'backdrop-filter'){
                                $val = 'unset';
                            }
                            if($elem['background'] =='backdrop_filter' && $key == 'backdrop_filter_color'){
                                $key = 'background-color';
                            }
                            if($elem['background'] == 'backdrop_filter' && $val == 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)'){
                                $val = 'unset';
                            }
                        }
                        $css_hover = $css_hover."{$key}:{$val};";
                    }
                    if(array_key_exists('css_mobile_hover',$elem)){
                        $css_hover = $css_hover."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            foreach($elem['css_mobile_hover'] as $key => $val){
                                if(array_key_exists('background', $elem)){
                                    if($elem['background'] != 'backdrop_filter' && $key == 'backdrop-filter'){
                                        $val = 'unset';
                                    }
                                    if($elem['background'] =='backdrop_filter' && $key == 'backdrop_filter_color'){
                                        $key = 'background-color';
                                    }
                                    if($elem['background'] == 'backdrop_filter' && $val == 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)'){
                                        $val = 'unset';
                                    }
                                }
                                $css_hover = $css_hover."{$key}:{$val};";
                            }
                        $css_hover = $css_hover."}";
                    }

                    $css_hover_end = "}";
                    if(array_key_exists('animation',$elem)){
                        if($elem['animation']['name'] != 'no_animation' || $elem['animation_mobile']['name'] != 'no_animation'){

                            $css_animation_up_out = ".{$elem['class_selector']}_animation_up_out{";
                            if($elem['animation']['name'] != 'no_animation'){
                                $css_animation_up_out = $css_animation_up_out."transition-duration:{$elem['animation']['up_out_duration']};";
                                $css_animation_up_out = $css_animation_up_out."transition-delay:{$elem['animation']['up_out_delay']};";
                                $css_animation_up_out = $css_animation_up_out."transition-timing-function:{$elem['animation']['up_out_timing_function']};";
                                $css_animation_up_out = $css_animation_up_out."transform:{$elem['animation']['up_out_transform']};";
                                $css_animation_up_out = $css_animation_up_out."filter:{$elem['animation']['up_out_filter']};";
                            }
                            if($elem['animation_mobile']['name'] != 'no_animation'){
                                $css_animation_up_out = $css_animation_up_out."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                                    $css_animation_up_out = $css_animation_up_out."transition-duration:{$elem['animation_mobile']['up_out_duration']};";
                                    $css_animation_up_out = $css_animation_up_out."transition-delay:{$elem['animation_mobile']['up_out_delay']};";
                                    $css_animation_up_out = $css_animation_up_out."transition-timing-function:{$elem['animation_mobile']['up_out_timing_function']};";
                                    $css_animation_up_out = $css_animation_up_out."transform:{$elem['animation_mobile']['up_out_transform']};";
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
                                $css_animation_up = $css_animation_up."filter:{$elem['animation']['up_filter']};";
                            }
                            if($elem['animation_mobile']['name'] != 'no_animation'){
                                $css_animation_up = $css_animation_up."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                                    $css_animation_up = $css_animation_up."transition-duration:{$elem['animation_mobile']['up_duration']};";
                                    $css_animation_up = $css_animation_up."transition-delay:{$elem['animation_mobile']['up_delay']};";
                                    $css_animation_up = $css_animation_up."transition-timing-function:{$elem['animation_mobile']['up_timing_function']};";
                                    $css_animation_up = $css_animation_up."transform:{$elem['animation_mobile']['up_transform']};";
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
                                $css_animation_in = $css_animation_in."filter:{$elem['animation']['in_filter']};";
                            }
                            if($elem['animation_mobile']['name'] != 'no_animation'){
                                $css_animation_in = $css_animation_in."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                                    $css_animation_in = $css_animation_in."transition-duration:{$elem['animation_mobile']['in_duration']};";
                                    $css_animation_in = $css_animation_in."transition-delay:{$elem['animation_mobile']['in_delay']};";
                                    $css_animation_in = $css_animation_in."transition-timing-function:{$elem['animation_mobile']['in_timing_function']};";
                                    $css_animation_in = $css_animation_in."transform:{$elem['animation_mobile']['in_transform']};";
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
                                $css_animation_down = $css_animation_down."filter:{$elem['animation']['down_filter']};";
                            }
                            if($elem['animation_mobile']['name'] != 'no_animation'){
                                $css_animation_down = $css_animation_down."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                                    $css_animation_down = $css_animation_down."transition-duration:{$elem['animation_mobile']['down_duration']};";
                                    $css_animation_down = $css_animation_down."transition-delay:{$elem['animation_mobile']['down_delay']};";
                                    $css_animation_down = $css_animation_down."transition-timing-function:{$elem['animation_mobile']['down_timing_function']};";
                                    $css_animation_down = $css_animation_down."transform:{$elem['animation_mobile']['down_transform']};";
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
                                $css_animation_down_out = $css_animation_down_out."filter:{$elem['animation']['down_out_filter']};";
                            }
                            if($elem['animation_mobile']['name'] != 'no_animation'){
                                $css_animation_down_out = $css_animation_down_out."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                                    $css_animation_down_out = $css_animation_down_out."transition-duration:{$elem['animation_mobile']['down_out_duration']};";
                                    $css_animation_down_out = $css_animation_down_out."transition-delay:{$elem['animation_mobile']['down_out_delay']};";
                                    $css_animation_down_out = $css_animation_down_out."transition-timing-function:{$elem['animation_mobile']['down_out_timing_function']};";
                                    $css_animation_down_out = $css_animation_down_out."transform:{$elem['animation_mobile']['down_out_transform']};";
                                    $css_animation_down_out = $css_animation_down_out."filter:{$elem['animation_mobile']['down_out_filter']};";
                                $css_animation_down_out = $css_animation_down_out."}";
                            }
                            $css_animation_down_out = $css_animation_down_out."}";
                            $final_css = $final_css.$css_animation_down_out;

                        }else{
                            $final_css = $final_css.$css_hover_start.$css_hover.$css_hover_end;
                        }
                    }else{
                        $final_css = $final_css.$css_hover_start.$css_hover.$css_hover_end;
                    }
                }
                
                if(array_key_exists('css_focus', $elem)){
                    $css_focus = '';
                    $css_focus_start = ".{$elem['class_selector']}:focus{";
                    foreach($elem['css_focus'] as $key => $val){
                        $css_focus = $css_focus."{$key}:{$val};";
                    }
                    $css_focus_end = "}";
                    $final_css = $final_css.$css_focus_start.$css_focus.$css_focus_end;
                }
                if(array_key_exists('css_read-only', $elem)){
                    $css_read_only ='';
                    $css_read_only_start = ".{$elem['class_selector']}:read-only{";
                    foreach($elem['css_read-only'] as $key => $val){
                        $css_read_only = $css_read_only."{$key}:{$val};";
                    }
                    $css_read_only_end = "}";
                    $final_css = $final_css.$css_read_only_start.$css_read_only.$css_read_only_end;
                }
                if(array_key_exists('css_active', $elem)){
                    $css_active = '';
                    $css_active_start = ".{$elem['class_selector']}:active{";
                    foreach($elem['css_active'] as $key => $val){
                        $css_active = $css_active."{$key}:{$val};";
                    }
                    $css_active_end = "}";
                    $final_css = $final_css.$css_active_start.$css_active.$css_active_end;
                }
                if(array_key_exists('css_disabled', $elem)){
                    $css_disabled = '';
                    $css_disabled_start = ".{$elem['class_selector']}:disabled{";
                    foreach($elem['css_disabled'] as $key => $val){
                        $css_disabled = $css_disabled."{$key}:{$val};";
                    }
                    $css_disabled_end = "}";
                    $final_css = $final_css.$css_disabled_start.$css_disabled.$css_disabled_end;
                }
                if(array_key_exists('type', $elem)){
                    if($elem['type'] == 'home_section'){
                        $css_driver_section = ".{$elem['class_selector']}{";
                        $css_driver_section_mobile = "@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                        if($elem['adapt_header'] == 1){
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
        }
        if(array_key_exists('children',$elem)){
            foreach($elem['children'] as $child){
                self::generate_class($child);
            }
        }
    }

    public function generate_vars(){
        $css = <<<string
        :root{
        --adapted_header_font_color:{$this->template['website_header']['adapted_font_color']};

        --font_1_name:'{$this->template['font_style']['font_1']['name']}', '{$this->template['font_style']['google_font']['name']}', sans-serif;
        --font_1_line_height:{$this->template['font_style']['font_1']['line_height']};
        --font_1_letter_spacing:{$this->template['font_style']['font_1']['letter_spacing']};

        --font_2_name:'{$this->template['font_style']['font_2']['name']}', '{$this->template['font_style']['google_font']['name']}', sans-serif;
        --font_2_line_height:{$this->template['font_style']['font_2']['line_height']};
        --font_2_letter_spacing:{$this->template['font_style']['font_2']['letter_spacing']};

        --font_3_name:'{$this->template['font_style']['font_3']['name']}', '{$this->template['font_style']['google_font']['name']}', sans-serif;
        --font_3_line_height:{$this->template['font_style']['font_3']['line_height']};
        --font_3_letter_spacing:{$this->template['font_style']['font_3']['letter_spacing']};

        --page_max_width:{$this->template['page_setup']['max_width']};

        --page_transition:{$this->template['page_setup']['pageTransition']};
        --page_transitionDuration:{$this->template['page_setup']['transitionDuration']};

        --form_elem_spacing:{$this->template['form_elements']['spacing']};
        string;

        foreach($this->template['website_colors']['colors'] as $key => $val){
            $css = $css."--{$key}:{$val['r']},{$val['g']},{$val['b']};";
        }
        foreach($this->template['website_colors']['custom_colors'] as $key => $val){
            $css = $css."--{$key}:{$val['r']},{$val['g']},{$val['b']};";
        }
        foreach($this->template['loading_spinner']['colors'] as $key => $val){
            $css = $css."--{$key}:{$val};";
        }
        $css = $css.<<<string
        }
        @font-face {font-family:'{$this->template['font_style']['font_1']['name']}';src:url('/storage/fonts/{$this->template['font_style']['font_1']['name']}.ttf')format('truetype');}
        @font-face {font-family:'{$this->template['font_style']['font_2']['name']}';src:url('/storage/fonts/{$this->template['font_style']['font_2']['name']}.ttf')format('truetype');}
        @font-face {font-family:'{$this->template['font_style']['font_3']['name']}';src:url('/storage/fonts/{$this->template['font_style']['font_3']['name']}.ttf')format('truetype');}
        string;
        self::add_to_file($css);
    }

    public function generate_global_selectors(){
        $css = <<<string
        *{-webkit-tap-highlight-color: transparent;}
        html {margin: 0;padding: 0;height: 100%;width: 100%;overflow: hidden;}
        body{user-select: none;width:100%;height:100%;box-sizing: border-box;margin:auto;overflow-y: auto;overflow-x:hidden;font-family: var(--font_1_name);line-height: var(--font_1_line_height);letter-spacing: var(--font_1_letter_spacing);position: relative;}
        input[type='number'] {-moz-appearance:textfield;}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;}
        textarea{resize: none;}
        a{color:unset;text-decoration: unset;cursor: pointer;}
        a:hover{color:unset;text-decoration: unset;cursor: pointer;}
        .font_1{font-family: var(--font_1_name);line-height: var(--font_1_line_height);letter-spacing: var(--font_1_letter_spacing);}
        .font_2{font-family: var(--font_2_name);line-height: var(--font_2_line_height);letter-spacing: var(--font_2_letter_spacing);}
        .font_3{font-family: var(--font_3_name);line-height: var(--font_3_line_height);letter-spacing: var(--font_3_letter_spacing);}
        #page{ position: relative; width:100%;animation-duration: var(--page_transitionDuration); }
        .transparent{background-color: unset;color:unset;}
        string;
        self::add_to_file($css);
    }

}
