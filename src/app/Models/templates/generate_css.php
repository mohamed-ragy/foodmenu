<?php
namespace App\Models\templates;
use Illuminate\Support\Facades\Storage;

class generate_css
{
    public $template;
    public $css_file = '';
    public $animations;
    public $fonts = [];
    public $selected_fonts = [];
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
        $this->fonts = templates_data::fonts();
        self::generate_vars();
        self::generate_global_selectors();

        self::add_to_file(self::generate_class($this->template['website_header']['elems']));
        self::add_animation($this->template['website_header']['elems']['children']['header_wrapper']['children']['header_navList']['children']['header_drop_down_list']['animation_name']);
        self::add_to_file(self::generate_class($this->template['website_header']['header_drop_down_list_item']));
        //


        // self::add_to_file(templates_data::loading_spinners()[$this->template['loading_spinner']['key']]['css']);
        self::add_to_file(self::generate_class($this->template['popup_window']['elems']));
        self::add_animation($this->template['popup_window']['transition']);

        foreach($this->template['home'] as $section){
            self::generate_class($section);
        }
        
        //
        foreach($this->animations as $animation){
            self::add_to_file($animation);
        }
        self::add_to_file('.none{display:none}.nowrap{white-space:nowrap;}');

        foreach($this->template['page_setup']['font_style'] as $key => $val){
            $font = $this->fonts[array_search($val, array_column($this->fonts, 'name'))];
            if(!array_key_exists($font['name'],$this->selected_fonts)){
                $this->selected_fonts[$font['name']] = $font;
            }
        }
        
        foreach($this->selected_fonts as $font){
            self::add_to_file("@font-face {font-family: '{$font['name']}';src: url('/storage/builder_fonts/{$font['language']}/{$font['name']}.ttf') format(\"truetype\");}");
            self::add_to_file(".font_{$font['name']}{font-family:{$font['name']};}");
        }
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
                if(is_array($elem['font_style'])){
                    foreach($elem['font_style'] as $key => $val){
                        $font = $this->fonts[array_search($val, array_column($this->fonts, 'name'))];
                        if(!array_key_exists($font['name'],$this->selected_fonts)){
                            $this->selected_fonts[$font['name']] = $font;
                        }
                        // array_push($this->selected_fonts,$font);
                        // self::add_to_file("@font-face {font-family: '{$font['name']}';src: url('/storage/builder_fonts/{$font['language']}/{$font['name']}.ttf') format(\"truetype\");}");
                        // self::add_to_file(".font_{$val}{font-family:{$val};}");
                    }
                }
            }

            if(!empty($elem['css'])){
                $css_start = ".{$elem['class_selector']}{";
                $css = '';
                // $css_hover = '';
                foreach($elem['css'] as $key => $val){
                    $css = $css."{$key}:{$val};";
                }
                // if(array_key_exists('font-family',$elem['css'])){
                    // $font = $this->fonts[array_search($elem['css']['font-family'], array_column($this->fonts, 'name'))];
                    // self::add_to_file("@font-face {font-family: '{$font['name']}';src: url('/storage/builder_fonts/{$font['language']}/{$font['name']}.ttf') format(\"truetype\");}");
                // }
                if(array_key_exists('background', $elem)){
                    if($elem['background']['type'] == 'none'){
                        $css = $css."background-color:unset;";
                    }else if($elem['background']['type'] == 'color'){
                        $css = $css."background-color:{$elem['background']['color']};";
                    }else if($elem['background']['type'] == 'gradient'){
                        $css = $css."background:{$elem['background']['gradient']};";
                    }else if($elem['background']['type'] == 'backdrop_filter'){
                        $css = $css."background-color:{$elem['background']['backdrop_filter_color']};";
                        $css = $css."backdrop-filter:{$elem['background']['backdrop_filter']};";
                    }else if($elem['background']['type'] == 'image'){
                        $css = $css."background-image:url({$elem['background']['background_image']});";
                        $css = $css."background-size:{$elem['background']['background_size']};";
                        $css = $css."background-attachment:{$elem['background']['background_attachment']};";
                        $css = $css."background-repeat:{$elem['background']['background_repeat']};";
                        $css = $css."background-position:{$elem['background']['background_position']};";
                        $css = $css."background-blend-mode:{$elem['background']['background_blend_mode']};";
                        $css = $css."background-color:{$elem['background']['background_blend_mode_color']};";
                    
                    }
                }
                
                $css = $css."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                if(array_key_exists('css_mobile', $elem)){
                    foreach($elem['css_mobile'] as $key => $val){
                        $css = $css."{$key}:{$val};";
                    }
                    // if(array_key_exists('font-family',$elem['css_mobile'])){
                    //     $font = $this->fonts[array_search($elem['css_mobile']['font-family'], array_column($this->fonts, 'name'))];
                    //     self::add_to_file("@font-face {font-family: 'Rubik';src: url('/storage/builder_fonts/{$font['language']}/{$font['name']}.ttf') format(\"truetype\");}");
                    // }
                    if(array_key_exists('background_mobile', $elem) ){
                        if($elem['background_mobile']['type'] == 'none'){
                            $css = $css."background-color:unset;";
                            $css = $css."background-image:unset;";
                            $css = $css."background-size:unset;";
                            $css = $css."background-attachment:unset;";
                            $css = $css."background-repeat:unset;";
                            $css = $css."background-position:unset;";
                            $css = $css."background-blend-mode:unset;";
                        }else if($elem['background_mobile']['type'] == 'color'){
                            $css = $css."background-color:{$elem['background_mobile']['color']};";
                            $css = $css."background-image:unset;";
                            $css = $css."background-size:unset;";
                            $css = $css."background-attachment:unset;";
                            $css = $css."background-repeat:unset;";
                            $css = $css."background-position:unset;";
                            $css = $css."background-blend-mode:unset;";
                        }else if($elem['background_mobile']['type'] == 'gradient'){
                            $css = $css."background:{$elem['background_mobile']['gradient']};";
                            $css = $css."background-image:unset;";
                            $css = $css."background-size:unset;";
                            $css = $css."background-attachment:unset;";
                            $css = $css."background-repeat:unset;";
                            $css = $css."background-position:unset;";
                            $css = $css."background-blend-mode:unset;";
                        }else if($elem['background_mobile']['type'] == 'backdrop_filter'){
                            $css = $css."background-color:{$elem['background_mobile']['backdrop_filter_color']};";
                            $css = $css."backdrop-filter:{$elem['background_mobile']['backdrop_filter']};";
                            $css = $css."background-image:unset;";
                            $css = $css."background-size:unset;";
                            $css = $css."background-attachment:unset;";
                            $css = $css."background-repeat:unset;";
                            $css = $css."background-position:unset;";
                            $css = $css."background-blend-mode:unset;";
                        }else if($elem['background_mobile']['type'] == 'image'){
                            $css = $css."background-image:url({$elem['background_mobile']['background_image']});";
                            $css = $css."background-size:{$elem['background_mobile']['background_size']};";
                            $css = $css."background-attachment:{$elem['background_mobile']['background_attachment']};";
                            $css = $css."background-repeat:{$elem['background_mobile']['background_repeat']};";
                            $css = $css."background-position:{$elem['background_mobile']['background_position']};";
                            $css = $css."background-blend-mode:{$elem['background_mobile']['background_blend_mode']};";
                            $css = $css."background-color:{$elem['background_mobile']['background_blend_mode_color']};";
                        }
                    }
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

                if(array_key_exists('css_hover', $elem)){
                    $css_hover = '';
                    $css_hover_start = ".{$elem['class_selector']}:hover{";
                    foreach($elem['css_hover'] as $key => $val){
                        $css_hover = $css_hover."{$key}:{$val};";
                    }
                    if(array_key_exists('css_hover_mobile',$elem)){
                        $css_hover = $css_hover."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            foreach($elem['css_hover_mobile'] as $key => $val){
                                $css_hover = $css_hover."{$key}:{$val};";
                            }
                        $css_hover = $css_hover."}";
                    }

                    $css_hover_end = "}";
                    // else{
                    $final_css = $final_css.$css_hover_start.$css_hover.$css_hover_end;
                    // }
                }

                if(array_key_exists('css_click', $elem)){
                    $css_click = '';
                    $css_click_start = ".{$elem['class_selector']}:active{";
                    foreach($elem['css_click'] as $key => $val){
                        $css_click = $css_click."{$key}:{$val};";
                    }
                    if(array_key_exists('css_click_mobile',$elem)){
                        $css_click = $css_click."@media (max-width:{$this->template['page_setup']['mobile_max_width']}){";
                            foreach($elem['css_click_mobile'] as $key => $val){
                                $css_click = $css_click."{$key}:{$val};";
                            }
                        $css_click = $css_click."}";
                    }

                    $css_click_end = "}";
                    // else{
                    $final_css = $final_css.$css_click_start.$css_click.$css_click_end;
                    // }
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
                // if(array_key_exists('css_active', $elem)){
                //     $css_active = '';
                //     $css_active_start = ".{$elem['class_selector']}:active{";
                //     foreach($elem['css_active'] as $key => $val){
                //         $css_active = $css_active."{$key}:{$val};";
                //     }
                //     $css_active_end = "}";
                //     $final_css = $final_css.$css_active_start.$css_active.$css_active_end;
                // }
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
        foreach($this->template['loading_spinner']['colors'] as $key => $val){
            $css = $css."--{$key}:{$val};";
        }
        $css = $css.<<<string
        }
        string;
        self::add_to_file($css);
    }

    public function generate_global_selectors(){
        $css = <<<string
        *{-webkit-tap-highlight-color: transparent;}
        html {margin: 0;padding: 0;height: 100%;width: 100%;overflow: hidden;}
        body{user-select: none;width:100%;height:100%;box-sizing: border-box;margin:auto;overflow-y: auto;overflow-x:hidden;position: relative;color:{$this->template['page_setup']['font_color']};background-color:{$this->template['page_setup']['bg_color']}}
        input[type='number'] {-moz-appearance:textfield;}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;}
        textarea{resize: none;}
        a{color:unset;text-decoration: underline;cursor: pointer;}
        a:hover{color:unset;text-decoration: underline;cursor: pointer;}
        #page{ position: relative; width:100%;animation-duration: var(--page_transitionDuration); }
        .transparent{background-color: unset;color:unset;}
        .adapted_header{background-color: transparent;background: transparent !important;backdrop-filter: unset !important;.header_wrapper{border-color:transparent !important;}box-shadow: none !important;color:var(--adapt_header_color);fill:var(--adapt_header_color);stroke:var(--adapt_header_color);a{color:var(--adapt_header_color);fill:var(--adapt_header_color);stroke:var(--adapt_header_color);}a:hover{color:var(--adapt_header_color);fill:var(--adapt_header_color);stroke:var(--adapt_header_color);}}
        string;
        self::add_to_file($css);
    }

}
