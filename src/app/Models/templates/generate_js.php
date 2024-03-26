<?php
namespace App\Models\templates;

use App\Models\website;
use App\Models\websiteText;
use Illuminate\Support\Facades\Storage;


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

        foreach($langs as $lang){
            $this->text[$lang] = [];
        }
        $this->langs = $langs;


        //
        $loading_spinner_html = $this->template['loading_spinner']['elem'];
        self::add_to_file("draw_loading_spinner = function(size){return `{$loading_spinner_html}`.replace(':size:',size);};");
        // $loading_screen_html = self::generate_html_elem($this->template['loading_screen']);
        // self::add_to_file("draw_loading_screen_page = function(){ return `{$loading_screen_html}`; };");
        $home_html = '';
        foreach($this->template['home'] as $section){
            $home_html = $home_html.self::generate_html_elem($section);
        }
        self::add_to_file("draw_home_page = function(){ return `{$home_html}`; };");


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
        }");
        //



        $website_texts = websiteText::where(['website_id'=>$this->template->website_id])->select(['text','lang'])->get();
        foreach($website_texts as $texts){
            $this->text[$texts['lang']]['authentication'] = $texts['text']['authentication'];
            $this->text[$texts['lang']]['orders'] = $texts['text']['orders'];
            $this->text[$texts['lang']]['reviews'] = $texts['text']['reviews'];
            $this->text[$texts['lang']]['liveChat'] = $texts['text']['liveChat'];
            $this->text[$texts['lang']]['other'] = $texts['text']['other'];
            // $this->text[$texts['lang']]['receipt'] = $texts['text']['receipt'];
        }
        $this->js_file = "window.texts = ".json_encode($this->text).";".$this->js_file;

        $this->js_file = str_replace(array("\r","\n"),"",$this->js_file);

        if(Storage::put('websites/'.$this->template->website_id.'/script.js', $this->js_file)){
            website::where('id',$this->template->website_id)->increment('style_version');
            return true;
        }else{
            return false;
        }
    }

    public function generate_html_elem($elem){
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
                    $html_start = $html_start." ".$elem['color_theme'];
                }
                $html_start = $html_start."\"";

                if(array_key_exists('attr',$elem)){
                    foreach($elem['attr'] as $key =>  $attr){
                        $html_start = $html_start." $key=\"{$attr}\"";
                    }
                }

                $html_start = $html_start.">";

                if(array_key_exists('text',$elem)){
                    $html_start = $html_start."\${window.text.{$elem['text']['key']} ?? ''}";
                    if(array_key_exists('val',$elem['text'])){
                        foreach($this->langs as $lang){
                            $this->text[$lang][$elem['text']['key']] = $elem['text']['val'][$lang] ?? '';
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
