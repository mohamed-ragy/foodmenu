<?php
namespace App\Models\templates;

use App\Models\website;
use App\Models\websiteText;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


class generate_js
{
    public $template;
    public $js_file = '';
    public $text;
    public $langs;
    public function add_to_file($js){
        $this->js_file = $this->js_file.$js;
    }
    public function generate($template,$langs){
        $this->template = $template;
        ////delete old html files and create new directory
        if (File::exists(resource_path("views/websites/{$this->template['website_id']}/"))) {
            File::deleteDirectory(resource_path("views/websites/{$this->template['website_id']}/"));
        }
        File::makeDirectory(resource_path("/views/websites/{$this->template['website_id']}/"));
        foreach($langs as $lang){
            $this->text[$lang] = [];
            File::makeDirectory(resource_path("/views/websites/{$this->template['website_id']}/{$lang}/"));
        }
        $this->langs = $langs;
        /////website basic texts
        $website_texts = websiteText::where(['website_id'=>$this->template->website_id])->select(['text','lang'])->get();
        foreach($website_texts as $texts){
            $this->text[$texts['lang']]['authentication'] = $texts['text']['authentication'];
            $this->text[$texts['lang']]['orders'] = $texts['text']['orders'];
            $this->text[$texts['lang']]['reviews'] = $texts['text']['reviews'];
            $this->text[$texts['lang']]['liveChat'] = $texts['text']['liveChat'];
            $this->text[$texts['lang']]['other'] = $texts['text']['other'];
            // $this->text[$texts['lang']]['receipt'] = $texts['text']['receipt'];
        }
        //////draw_page
        $page_transitionDuration = str_replace('ms','',$this->template['page_setup']['transitionDuration']);
        self::add_to_file("draw_page = function(callback=()=>{}){
            $('#page').removeClass(`{$this->template['page_setup']['pageTransition']}_in`);
            $('#page').addClass(`{$this->template['page_setup']['pageTransition']}_out`);
            setTimeout(()=>{
                $('#page').removeClass(`{$this->template['page_setup']['pageTransition']}_out`).addClass(`{$this->template['page_setup']['pageTransition']}_in`);
                callback();
                setTimeout(()=>{
                    $('#page').removeClass(`{$this->template['page_setup']['pageTransition']}_in`);
                },{$page_transitionDuration});
            },{$page_transitionDuration});
        };");
        ///draw home page
        $home_html = '';
        foreach($this->template['home'] as $section){
            $home_html = $home_html.self::generate_html_elem($section);
        }
        self::add_to_file("draw_home_page = function(){ return `{$home_html}`; };");
        foreach($this->langs as $lang){
            $homt_view_html = '';
            foreach($this->template['home'] as $section){
                $homt_view_html = $homt_view_html.self::generate_html_elem($section,$lang);
                // Storage::put(resource_path("/views/websites/{$this->template['website_id']}/{$lang}/home.blade.php"), $homt_view_html);
                $filePath = resource_path("/views/websites/{$this->template['website_id']}/{$lang}/website_home.blade.php");
                file_put_contents($filePath, $homt_view_html);
            }
        }




        //loading spinner
        $loading_spinner_html = $this->template['loading_spinner']['elem'];
        self::add_to_file("draw_loading_spinner = function(size){return `{$loading_spinner_html}`.replace(':size:',size);};");
        /////smooth scrolling
        if($this->template['page_setup']['smooth_scroll'] == '1'){
            self::add_to_file("$('body').on('mousewheel', function(e){
                    if(event.wheelDelta < 0){
                        $('body').stop(false,false).animate({scrollTop:$('body').scrollTop() + (parseFloat($(window).height()) / 2)},{duration: 600,specialEasing: {width: 'easeOutBounce',height: 'easeOutBounce'}});
                    }else{
                        $('body').stop(false,false).animate({scrollTop:$('body').scrollTop() - (parseFloat($(window).height()) / 2)},{duration: 600,specialEasing: {width: 'easeOutBounce',height: 'easeOutBounce'}});
                    }
                });
            ");

        }



        ///save js file
        $this->js_file = "window.texts = ".json_encode($this->text).";".$this->js_file;
        $this->js_file = str_replace(array("\r","\n"),"",$this->js_file);
        if(Storage::put('websites/'.$this->template->website_id.'/script.js', $this->js_file)){
            website::where('id',$this->template->website_id)->increment('style_version');
            return true;
        }else{
            return false;
        }



    }

    public function generate_html_elem($elem,$draw_lang=null){
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
                if(array_key_exists('style_class',$elem)){
                    $html_start = $html_start." ".$elem['style_class'];
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
                $html_start = $html_start."\"";

                if(array_key_exists('attr',$elem)){
                    foreach($elem['attr'] as $key =>  $attr){
                        $html_start = $html_start." $key=\"{$attr}\"";
                    }
                }

                $html_start = $html_start.">";

                if(array_key_exists('text',$elem)){
                    if($draw_lang == null){
                        $html_start = $html_start."\${window.text.{$elem['text']['key']} ?? ''}";
                        if(array_key_exists('val',$elem['text'])){
                            foreach($this->langs as $lang){
                                $this->text[$lang][$elem['text']['key']] = $elem['text']['val'][$lang] ?? '';
                            }
                        }
                    }else{
                        if(array_key_exists('val',$elem['text'])){
                            if(array_key_exists($draw_lang,$elem['text']['val'])){
                                $html_start = $html_start.$elem['text']['val'][$draw_lang];
                            }
                        }else{
                            $keys = explode('.',$elem['text']['key']);
                            $html_start = $html_start.$this->text[$draw_lang][$keys[0]][$keys[1]];
                        }
                    }

                }

                if(array_key_exists('children',$elem)){
                    foreach($elem['children'] as $child){
                        $html = $html.self::generate_html_elem($child);
                    }
                }

                $html_end = "</{$elem['tag']}>";
            break;
        }
        return $html_start.$html.$html_end;
    }

}
