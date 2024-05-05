<?php
namespace App\Models\templates;

use App\Models\website;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class generate_js
{
    public $template;
    public $js_file = '';
    // public $text = [];
    public $lang_code;
    public $lang_text;
    public function add_to_file($js){
        $this->js_file = $this->js_file.$js;
    }

    public function delete_lang_dir($lang,$website_id){
        if (File::exists(storage_path("app/public/websites/{$website_id}/views/$lang"))) {
            File::deleteDirectory(storage_path("app/public/websites/{$website_id}/views/$lang"));
        }
        if (File::exists(storage_path("app/public/websites/{$website_id}/script/script_{$lang}.js"))) {
            File::delete(storage_path("app/public/websites/{$website_id}/script/script_{$lang}.js"));
        }
    }
    public function create_lang_dir($lang){
        if (!File::exists(storage_path("app/public/websites/{$this->template['website_id']}/views/$lang"))) {
            File::makeDirectory(storage_path("app/public/websites/{$this->template['website_id']}/views/$lang"));
        }
    }
    public function generate($template,$lang_code,$lang_text,$add_lang){
        $this->template = $template;
        if($add_lang != null){
            self::create_lang_dir($add_lang);
        }
        $this->lang_code = $lang_code;
        $this->lang_text = $lang_text;

        self::add_to_file("window.mobile_max_width = '{$this->template['page_setup']['mobile_max_width']}';");
        //////////////////////
        ////loading////
        //////////////////////
        $loading_spinner_html = str_replace(':size:','L',$this->template['loading_spinner']['elem']);
        $loading_html = "{$loading_spinner_html}";
        Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/loading_spinner.html', $loading_html);
        $page_transitionDuration = str_replace('ms','',$this->template['page_setup']['transitionDuration']);
        self::add_to_file(<<<string
        hide_loading_screen = function(){
            $('.loading_screen').addClass(`{$this->template['page_setup']['pageTransition']}_out`);
            scroll_elem_animation('top');
            setTimeout(()=>{
                $('.loading_screen').addClass('none');
            },{$page_transitionDuration} - 100);
        };
        string);
        //////////////////////
        ////draw header////
        //////////////////////
        usort($this->template['website_header']['elems']['children']['header_wrapper']['children']['header_navList']['children'], function ($a, $b){
            return $a['attr']['sort'] <=> $b['attr']['sort'];
        });
        usort($this->template['website_header']['elems']['children']['header_wrapper']['children']['header_iconsList']['children'], function ($a, $b){
            return $a['attr']['sort'] <=> $b['attr']['sort'];
        });
        $headrer_view_html = '';
        $headrer_view_html = $headrer_view_html.self::generate_html_elem($this->template['website_header']['elems'],true);
        Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/website_header.html', $headrer_view_html);
        if(!empty($this->template['home'])){
            if($this->template['home'][0]['adapt_header'] == '1'){
                self::add_to_file(<<<string
                $(document).ready(function(e){
                    if(window.route == 'home' && $('body').scrollTop() == 0){
                        $('header').addClass('adapted_header');
                    }else{
                        $('header').removeClass('adapted_header');
                    }
                });
                $('body').on('scroll',function(e){
                    if(window.route == 'home' && $('body').scrollTop() == 0){
                        $('header').addClass('adapted_header');
                    }else{
                        $('header').removeClass('adapted_header');
                    }
                });
                string);
            }
        }

        /////////////////
        ////open_page////
        /////////////////
        $page_transitionDuration = str_replace('ms','',$this->template['page_setup']['transitionDuration']);
        self::add_to_file("open_page = function(callback=()=>{}){
            $('#page').removeClass(`{$this->template['page_setup']['pageTransition']}_in`);
            $('#page').addClass(`{$this->template['page_setup']['pageTransition']}_out`);
            setTimeout(()=>{
                $('body').scrollTop(0);
                $('#page').removeClass(`{$this->template['page_setup']['pageTransition']}_out`).addClass(`{$this->template['page_setup']['pageTransition']}_in`);
                $('#page').html(callback());
                set_website_data();
                scroll_elem_animation('top');
                setTimeout(()=>{
                    $('#page').removeClass(`{$this->template['page_setup']['pageTransition']}_in`);
                },{$page_transitionDuration});
            },{$page_transitionDuration} - 100);
        };");
        //////////////////////
        ////draw home page////
        //////////////////////
        $home_html = '';
        foreach($this->template['home'] as $section){
            $home_html = $home_html.self::generate_html_elem($section,false);
        }
        self::add_to_file("draw_home_page = function(){ return `{$home_html}`; };");
        // foreach($this->langs as $lang){
            $home_view_html = '';
            foreach($this->template['home'] as $section){
                $home_view_html = $home_view_html.self::generate_html_elem($section,true);
            // }
            //checkbox
            // $home_view_html = $home_view_html.self::generate_html_elem($this->template['form_elements']['elems']['checkbox'],$lang);
            //checkbox

        }
        Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/website_home.html', $home_view_html);

        /////////////////////////////////////
        ////create popup window html file////
        /////////////////////////////////////
        // foreach($this->langs as $lang){
            $popup_html = self::generate_html_elem($this->template['popup_window']['elems'],true);
            Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/popup_window.html', $popup_html);
        // }
        //////////////////
        ////open_popup////
        //////////////////
        self::add_to_file("open_popup = function(callback=()=>{}){
            $('.popup_card').addClass('{$this->template['popup_window']['transition']}');
            $('.popup_container').removeClass('none');
        };");
        ///////////////////
        ////close_popup////
        ///////////////////
        self::add_to_file("close_popup = function(callback=()=>{}){
            $('.popup_container').addClass('none');
            $('.popup_card').removeClass('{$this->template['popup_window']['transition']}');
        };");
        ///////////////////////
        ////loading spinner////
        ///////////////////////
        $loading_spinner_html = $this->template['loading_spinner']['elem'];
        self::add_to_file("draw_loading_spinner = function(size){return `{$loading_spinner_html}`.replace(':size:',size);};");
        ///////////////////////
        /////smooth scrolling
        ///////////////////////
        if($this->template['page_setup']['smooth_scroll'] == '1'){
            $scroll_duration = str_replace('ms','',$this->template['page_setup']['smooth_scroll_duration']);
            $scroll_distance = str_replace('px','',$this->template['page_setup']['smooth_scroll_distance']);
            self::add_to_file("$('body').on('wheel', function(e){
                    if(!$('.popup_container').hasClass('none')){return;}
                    $('body').stop(true,false);
                    if(event.wheelDelta < 0){
                        $('body').animate({scrollTop:$('body').scrollTop() + parseFloat({$scroll_distance})},{duration: {$scroll_duration},specialEasing: {width: 'easeOutQuint',height: 'easeOutQuint'}});
                    }else{
                        $('body').animate({scrollTop:$('body').scrollTop() - parseFloat({$scroll_distance})},{duration: {$scroll_duration},specialEasing: {width: 'easeOutQuint',height: 'easeOutQuint'}});
                    }
                });
            ");

        }
        //////////////////////////
        ////custom google font////
        //////////////////////////
        if($this->template['font_style']['google_font']['link'] != ''){
            self::add_to_file(<<<string
                    let font_link = "{$this->template['font_style']['google_font']['link']}".split('family=')[1];
                    font_link = font_link.split("')")[0];
                    $('style').append(`@import url('https://fonts.googleapis.com/css2?family=\${font_link}')`)
                string
            );
        }

        ////////////////////
        ////save js file////
        ////////////////////
        $this->js_file = "window.text = ".json_encode($this->lang_text).";".$this->js_file;
        $this->js_file = str_replace(array("\r","\n"),"",$this->js_file);
        if(Storage::put('websites/'.$this->template['website_id'].'/script/script_'.$this->lang_code.'.js', $this->js_file)){
            website::where('id',$this->template['website_id'])->increment('style_version');
            return true;
        }else{
            return false;
        }



    }

    public function generate_html_elem($elem,$is_html){
        $html_start = '';
        $html = '';
        $html_end = '';

        switch ($elem['tag']) {
            case 'loading_spinner':
                // $html = $html."<div class=\"{$elem['class_name']} {$elem['attr']['class']}\">\${draw_loading_spinner(`{$elem['size']}`)}</div>";
            break;

            default:

                $html_start = "<{$elem['tag']}";

                $html_start = $html_start." class=\"";
                if(array_key_exists('class',$elem)){
                    $html_start = $html_start." ".$elem['class'];
                }
                if(array_key_exists('class_selector',$elem)){
                    $html_start = $html_start." ".$elem['class_selector'];
                    // if(array_key_exists('animation',$elem) && is_array($elem['animation'])){
                    //     $html_start = $html_start." ".$elem['class_selector']."_animationOut";
                    // }
                }
                if(array_key_exists('font_style',$elem)){
                    $html_start = $html_start." ".$elem['font_style'];
                }
                if(array_key_exists('color_theme',$elem)){
                    if(array_key_exists('background',$elem)){
                        if($elem['background'] == 'color_theme'){
                            $html_start = $html_start." ".$elem['color_theme'];
                        }
                    }else{
                        $html_start = $html_start." ".$elem['color_theme'];
                    }
                }
                // if(array_key_exists('animation',$elem)){
                //     $html_start = $html_start." ".$elem['animation'];
                // }
                $html_start = $html_start."\"";
                if(array_key_exists('animation',$elem) && is_array($elem['animation'])){
                    if(
                        $elem['animation']['animationUp'] == '1' ||
                        $elem['animation_mobile']['animationUp'] == '1' ||
                        $elem['animation']['animationDown'] == '1' ||
                        $elem['animation_mobile']['animationDown'] == '1'
                    ){
                        $html_start = $html_start." animation=\"{$elem['class_selector']}\"";
                        $html_start = $html_start." animate_on_desktop=\"{$elem['animation']['animate_on']}\"";
                        $html_start = $html_start." animate_on_mobile=\"{$elem['animation_mobile']['animate_on']}\"";
                    }
                }
                if(array_key_exists('attr',$elem)){
                    foreach($elem['attr'] as $key =>  $attr){
                        $html_start = $html_start." $key=\"{$attr}\"";
                    }
                }

                $html_start = $html_start.">";
                if(array_key_exists('text',$elem)){
                    if($is_html == false){
                        $html_start = $html_start."\${window.text.{$elem['text']['key']} ?? ''}";
                        if(array_key_exists('val',$elem['text'])){
                            // foreach($this->langs as $lang){
                                $this->lang_text[$elem['text']['key']] = $elem['text']['val'][$this->lang_code] ?? '';
                            // }
                        }
                    }else{
                        if(array_key_exists('val',$elem['text'])){
                            if(array_key_exists($this->lang_code,$elem['text']['val'])){
                                $html_start = $html_start.$elem['text']['val'][$this->lang_code];
                            }
                        }else{
                            $keys = explode('.',$elem['text']['key']);
                            $html_start = $html_start.$this->lang_text[$keys[0]][$keys[1]];
                        }
                    }
                }
                if(array_key_exists('html',$elem)){
                    $html = $html.$elem['html'];
                }
                if(array_key_exists('type',$elem)){
                    if($elem['type'] == 'home_section' && $elem['has_driver'] == '1'){
                        $html = $html."<svg class='{$elem['class_selector']}_driver' ";
                        foreach($elem['driver']['svg_attr'] as $key => $val){
                            $html = $html." {$key}='{$val}'";
                        }
                        $html = $html.">";
                        foreach($elem['driver']['paths'] as $path){
                            $html = $html."<path d='{$path['path']}' fill='{$path['color']}'></path>";
                        }
                        $html = $html."</svg>";

                    }
                }

                if(array_key_exists('type',$elem)){
                    if($elem['type'] == 'section_block'){
                        usort($elem['children'], function ($a, $b){
                            return $a['sort'] <=> $b['sort'];
                        });
                    }
                }

                if(array_key_exists('children',$elem)){
                    foreach($elem['children'] as $child){
                        $html = $html.self::generate_html_elem($child,$is_html);
                    }
                }

                $html_end = "</{$elem['tag']}>";
            break;
        }
        return strip_tags($html_start.$html.$html_end,['section','div','span','svg','path','circle','header','a','img','ul','li','h1','h2','h3','h4','h5','h6','p']);
    }

}
