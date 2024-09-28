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
    public function filter_text($text){
        $text = str_replace('contenteditable','',$text);
        $text = str_replace('="true"','',$text);
        $text = str_replace('="false"','',$text);

        return $text;
    }
    public function generate($template,$lang_code,$lang_text,$add_lang){
        $this->template = $template;
        if($add_lang != null){
            self::create_lang_dir($add_lang);
        }
        $this->lang_code = $lang_code;
        $this->lang_text = $lang_text;
        $this->lang_text['page'] = ['title' => '','description' => ''];
        self::add_to_file(<<<string
            window.pages = {};
            window.popups = {};
        string);

        self::add_to_file("window.mobile_max_width = '{$this->template['page_setup']['mobile_max_width']}';");
        self::add_to_file("window.page_transition = '{$this->template['page_setup']['pageTransition']}';");
        self::add_to_file("window.page_transition_duration = '{$this->template['page_setup']['transitionDuration']}';");
        self::add_to_file("window.popup_transition = '{$this->template['popup_window']['children']['popup_card']['transition']}';");
        self::add_to_file("window.popup_transition_duration = '{$this->template['popup_window']['children']['popup_card']['css']['animation-duration']}';");
        self::add_to_file("window.smooth_scroll = '{$this->template['page_setup']['smooth_scroll']}';");
        self::add_to_file("window.smooth_scroll_duration = '{$this->template['page_setup']['smooth_scroll_duration']}';");
        self::add_to_file("window.smooth_scroll_distance = '{$this->template['page_setup']['smooth_scroll_distance']}';");
       
        //////////////////////
        ////draw header////
        //////////////////////
        usort($this->template['website_header']['children']['header_wrapper']['children']['header_navList']['children'], function ($a, $b){
            return $a['attr']['sort'] <=> $b['attr']['sort'];
        });
        usort($this->template['website_header']['children']['header_wrapper']['children']['header_iconsList']['children'], function ($a, $b){
            return $a['attr']['sort'] <=> $b['attr']['sort'];
        });
        $headrer_view_html = '';
        $headrer_view_html = $headrer_view_html.self::generate_html_elem($this->template['website_header'],true);
        Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/website_header.html', $headrer_view_html);
        //////////////////////
        ////draw home page////
        //////////////////////
        $home_html = '';
        foreach($this->template['home'] as $section){
            $home_html = $home_html.self::generate_html_elem($section,false);
        }
        self::add_to_file("window.pages.home = `{$home_html}`;");
        $home_view_html = '';
        foreach($this->template['home'] as $section){
            $home_view_html = $home_view_html.self::generate_html_elem($section,true);
        }
        Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/website_home.html', $home_view_html);
        //////////////////////
        ////draw account page////
        //////////////////////
        $account_html = '';
        foreach($this->template['account'] as $section){
            $account_html = $account_html.self::generate_html_elem($section,false);
        }
        self::add_to_file("window.pages.account = `{$account_html}`;");
        $account_view_html = '';
        foreach($this->template['account'] as $section){
            $account_view_html = $account_view_html.self::generate_html_elem($section,true);
        }
        Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/website_account.html', $account_view_html);

        /////////////////////////////////////
        ////create popup window html file////
        /////////////////////////////////////
        $popup_html = self::generate_html_elem($this->template['popup_window'],true);
        Storage::put('websites/'.$this->template['website_id'].'/views/'.$this->lang_code.'/popup_window.html', $popup_html);
        ///////////////////
        ////login////
        ///////////////////
        $login_html = self::generate_html_elem($this->template['login'],false);
        self::add_to_file("window.popups.login = `{$login_html}`;");
        ///////////////////////
        ////signup////
        ///////////////////
        $signup_html = self::generate_html_elem($this->template['signup'],false);
        self::add_to_file("window.popups.signup = `{$signup_html}`;");
        //////////////////////
        /////reset_password_1
        //////////////////////
        $reset_password_1_html = self::generate_html_elem($this->template['reset_password_1'],false);
        self::add_to_file("window.popups.reset_password_1 = `{$reset_password_1_html}`;");
        //////////////////////
        /////reset_password_2
        //////////////////////
        $reset_password_2_html = self::generate_html_elem($this->template['reset_password_2'],false);
        self::add_to_file("window.popups.reset_password_2 = `{$reset_password_2_html}`;");
        //////////////////////
        /////reset_password_3
        //////////////////////
        $reset_password_3_html = self::generate_html_elem($this->template['reset_password_3'],false);
        self::add_to_file("window.popups.reset_password_3 = `{$reset_password_3_html}`;");
        ////save js file////
        ////////////////////
        $this->js_file = "window.texts = ".json_encode($this->lang_text).";".$this->js_file;
        $this->js_file = str_replace(array("\r","\n"),"",$this->js_file);
        if(Storage::put('websites/'.$this->template['website_id'].'/script/script_'.$this->lang_code.'.js', $this->js_file)){
            website::where('id',$this->template['website_id'])->increment('style_version');
            return true;
        }else{
            return false;
        }



    }

    public function get_elem($key_tree){
        $key_tree_arr = explode('.',$key_tree);
        $elem = $this->template;
        foreach($key_tree_arr as $key){
            $elem = $elem[$key];
        }
        return $elem;
    }
    public function generate_html_elem($elem,$is_html){
        $html_start = '';
        $html = '';
        $html_end = '';
        if(array_key_exists('tag',$elem)){
            $html_start = "<{$elem['tag']}";

            $html_start = $html_start." class=\"";
            if(array_key_exists('class',$elem)){
                $html_start = $html_start." ".$elem['class'];
            }
            if(array_key_exists('class_selector',$elem)){
                $html_start = $html_start." ".$elem['class_selector'];
            }
            if(array_key_exists('general_class_selector',$elem)){
                $html_start = $html_start." ".$elem['general_class_selector'];
            }
            if(array_key_exists('transition',$elem)){
                $html_start = $html_start." ".$elem['transition'];
            }
            $html_start = $html_start."\"";
            if(array_key_exists('class_selector',$elem)){
                $html_start = $html_start." class_selector=\"{$elem['class_selector']}\"";
            }
            if(array_key_exists('animation',$elem)){
                if(array_key_exists('name',$elem['animation'])){
                    if($elem['animation']['name'] != 'no_animation' || $elem['animation_mobile']['name'] != 'no_animation'){
                        $html_start = $html_start." animation=\"true\" animation_repeat=\"{$elem['animation']['repeat']}\" animation_mobile_repeat=\"{$elem['animation_mobile']['repeat']}\"";
                    }
                }
            }
            if(array_key_exists('attr',$elem)){
                foreach($elem['attr'] as $key =>  $attr){
                    if($key === 'href'){
                        $html_start = $html_start." $key=\"/{$this->lang_code}{$attr}\"";
                    }else{
                        $html_start = $html_start." $key=\"{$attr}\"";
                    }
                }
            }
            if($elem['tag'] == 'button'){
                $html_start = $html_start." tabindex=\"0\"";
            }
            if(array_key_exists('placeholder',$elem)){
                $keys = explode('.',$elem['placeholder']['key']);
                $placholder_key = $this->lang_text;
                foreach($keys as $key){
                    $placholder_key = $placholder_key[$key];
                }
                $html_start = $html_start." placeholder=\"{$placholder_key}\"";
            }
            $html_start = $html_start.">";
            if(array_key_exists('text',$elem)){
                $text = self::filter_text($elem['text']['val'][$this->lang_code] ?? '');
                if($is_html == false){
                    $html_start = $html_start."\${window.texts.{$elem['text']['key']} ?? ''}";
                    if(array_key_exists('val',$elem['text'])){
                        $this->lang_text[$elem['text']['key']] = $text;
                    }
                }else{
                    if(array_key_exists('val',$elem['text'])){
                        if(array_key_exists($this->lang_code,$elem['text']['val'])){
                            $html_start = $html_start.$text;
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
            // if(array_key_exists('general_html',$elem)){
            //     $html = $html.self::generate_html_elem(self::get_elem($elem['general_html']),false);
            // }
            if(array_key_exists('type',$elem)){
                if($elem['type'] == 'section' && $elem['has_driver'] == '1'){
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
        }else if(array_key_exists('general_html',$elem)){
            $general_html_elem = self::get_elem($elem['general_html']);
            if(array_key_exists('replace',$elem)){
                foreach($elem['replace'] as $replace_key => $replace_val){
                    $keys = explode('.', $replace_key);
                    $temp = &$general_html_elem;
                    foreach ($keys as $i => $key) {
                        if ($i === count($keys) - 1) {
                            $temp[$key] = $replace_val;
                        } else {
                            if (!isset($temp[$key])) {
                                break;
                            }
                            $temp = &$temp[$key];
                        }
                    }
                }
            }
            $generated_html = self::generate_html_elem($general_html_elem,$is_html);
            $html = $html.$generated_html;
        }
        return strip_tags($html_start.$html.$html_end,['section','div','span','svg','path','circle','header','a','img','ul','li','h1','h2','h3','h4','h5','h6','p','button','input']);
    }

}
