<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use App\Models\activityLog;
use Illuminate\Http\Request;
use App\Models\foodmenuFunctions;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\website;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\img;
use App\Models\template;
use App\Models\templates\templates_data;
use App\Models\templates\generate_css;
use App\Models\templates\generate_js;
use App\Models\websiteText;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class designController extends Controller
{
    protected $website_id;
    protected $account;
    public function __construct()
    {
        // dd(['default' => $en]);



        $this->middleware(function ($request, $next) {
            if(!Auth::guard('account')->check()){
                return redirect()->route('account.login');
            }
            $this->account = Auth::guard('account')->user();
            if(str_split($this->account->authorities)[3] == false){
                return redirect()->route('cpanel');
            }
            $this->website_id = $this->account->website_id;
            App::setlocale($this->account->language);

            return $next($request);
        });
    }
    public function home(Request $request){
        return view('builder.home');
    }
    public function api(Request $request){
        if($request->has('getData')){
            $website = website::where('id',$this->website_id)
            ->select([
                'icon',
                'languages',
                'websiteNames','websiteDescriptions'
            ])->first();

            $templates = template::where(['website_id'=>$this->website_id])->get();

            $default_language = '';
            $preview_language = null;
            foreach($website->languages as $lang){
                if($lang['code'] == $request->preview_language){$preview_language = $lang['code'];}
                if($lang['websiteDefault'] == true){$default_language = $lang['code'];}
            }
            if($preview_language != null){
                $website_texts = websiteText::where(['website_id'=>$this->website_id ,'lang'=>$preview_language])->first();
            }else{
                $website_texts = websiteText::where(['website_id'=>$this->website_id ,'lang'=>$default_language])->first();
            }
            return response([
                'website' => $website,
                'templates' => $templates,
                'texts' => Lang::get('builder'),
                'website_texts' => $website_texts,
            ]);
        }

        else if($request->has('get_langText')){
            $website_texts = websiteText::where(['website_id'=>$this->website_id ,'lang'=>$request->get_langText])->first();
            return response(['website_texts' => $website_texts]);
        }

        else if($request->has('get_colors')){
            return response(['colors' => templates_data::colors()]);
        }

        else if($request->has('get_fonts')){
            return response(['fonts' => templates_data::fonts()]);
        }

        else if($request->has('get_loading_spinners')){
            return response(['loading_spinners' => templates_data::loading_spinners()]);
        }

        else if($request->has('save_template')){
            $save_tempalte = template::where([
                'website_id' => $this->website_id,
                '_id'  => $request->template['_id']
            // ])->update([
            //     'updated_at' => Carbon::now()->timestamp,
            //     'website_colors' => [
            //         'c1' =>  $request->template['website_colors']['c1'],
            //         'c2' =>  $request->template['website_colors']['c2'],
            //         'c3' =>  $request->template['website_colors']['c3'],
            //         'c4' =>  $request->template['website_colors']['c4'],
            //         'c_star' =>  $request->template['website_colors']['c_star'],
            //         'c_success' =>  $request->template['website_colors']['c_success'],
            //         'c_error' =>  $request->template['website_colors']['c_error'],
            //         'c_warning' =>  $request->template['website_colors']['c_warning'],
            //     ],
            //     'font_style' => [
            //         'title' => $request->template['font_style']['title'],
            //         'title_weight' => $request->template['font_style']['title_weight'],
            //         'title_line_height' => $request->template['font_style']['title_line_height'],
            //         'title_letter_spacing' => $request->template['font_style']['title_letter_spacing'],
            //         'paragraph' => $request->template['font_style']['paragraph'],
            //         'paragraph_weight' => $request->template['font_style']['paragraph_weight'],
            //         'paragraph_line_height' => $request->template['font_style']['paragraph_line_height'],
            //         'paragraph_letter_spacing' => $request->template['font_style']['paragraph_letter_spacing'],
            //     ],
            //     'page_setup' => [
            //         'max_width' => $request->template['page_setup']['max_width'],
            //         'page_margin' => $request->template['page_setup']['page_margin'],
            //         'color_theme' => $request->template['page_setup']['color_theme'],
            //         'pageTransition' => $request->template['page_setup']['pageTransition'],
            //         'transitionDuration' => $request->template['page_setup']['transitionDuration'],
            //         'social_image' => $request->template['page_setup']['social_image'],

            //     ],
            //     'form_elements' => [
            //         'spacing' => $request->template['form_elements']['spacing'],
            //         'form_align' => $request->template['form_elements']['form_align'],
            //         'input' => [
            //             'text_align' => $request->template['form_elements']['input']['text_align'],
            //             'padding_y' => $request->template['form_elements']['input']['padding_y'],
            //             'padding_x' => $request->template['form_elements']['input']['padding_x'],
            //             'border_style' => $request->template['form_elements']['input']['border_style'],
            //             'border_width' => $request->template['form_elements']['input']['border_width'],
            //             'border_radius' => $request->template['form_elements']['input']['border_radius'],
            //             'border_color' => $request->template['form_elements']['input']['border_color'],
            //             'font_size' => $request->template['form_elements']['input']['font_size'],
            //             'font_color' => $request->template['form_elements']['input']['font_color'],
            //             'label_font_size' => $request->template['form_elements']['input']['label_font_size'],
            //             'label_margin' => $request->template['form_elements']['input']['label_margin'],
            //             'background_fill' => $request->template['form_elements']['input']['background_fill'],
            //             'input_bg_color' => $request->template['form_elements']['input']['input_bg_color'],
            //             'focus_outline_width' => $request->template['form_elements']['input']['focus_outline_width'],
            //             'focus_outline_color' => $request->template['form_elements']['input']['focus_outline_color'],
            //             'focus_border_color' => $request->template['form_elements']['input']['focus_border_color'],
            //             'focus_background_fill' => $request->template['form_elements']['input']['focus_background_fill'],
            //             'focus_bg_color' => $request->template['form_elements']['input']['focus_bg_color'],

            //         ],
            //         'checkbox' => [
            //             'border_radius' => $request->template['form_elements']['checkbox']['border_radius'],
            //             'size' => $request->template['form_elements']['checkbox']['size'],
            //             'color' => $request->template['form_elements']['checkbox']['color'],
            //             'check_mark_color' => $request->template['form_elements']['checkbox']['check_mark_color'],
            //         ],
            //         'button1' => [
            //             'padding_y' => $request->template['form_elements']['button1']['padding_y'],
            //             'padding_x' => $request->template['form_elements']['button1']['padding_x'],
            //             'border_radius' => $request->template['form_elements']['button1']['border_radius'],
            //             'font_size' => $request->template['form_elements']['button1']['font_size'],
            //             'font_color' => $request->template['form_elements']['button1']['font_color'],
            //             'bg_color' => $request->template['form_elements']['button1']['bg_color'],
            //             'outline_width' => $request->template['form_elements']['button1']['outline_width'],
            //             'outline_color' => $request->template['form_elements']['button1']['outline_color'],
            //             'hover_font_color' => $request->template['form_elements']['button1']['hover_font_color'],
            //             'hover_bg_color' => $request->template['form_elements']['button1']['hover_bg_color'],
            //             'hover_outline_width' => $request->template['form_elements']['button1']['hover_outline_width'],
            //             'hover_outline_color' => $request->template['form_elements']['button1']['hover_outline_color'],
            //             'click_font_color' => $request->template['form_elements']['button1']['click_font_color'],
            //             'click_bg_color' => $request->template['form_elements']['button1']['click_bg_color'],
            //             'click_outline_width' => $request->template['form_elements']['button1']['click_outline_width'],
            //             'click_outline_color' => $request->template['form_elements']['button1']['click_outline_color'],
            //             'disabled_font_color' => $request->template['form_elements']['button1']['disabled_font_color'],
            //             'disabled_bg_color' => $request->template['form_elements']['button1']['disabled_bg_color'],
            //             'disabled_outline_width' => $request->template['form_elements']['button1']['disabled_outline_width'],
            //             'disabled_outline_color' => $request->template['form_elements']['button1']['disabled_outline_color'],
            //         ],
            //         'button2' => [
            //             'padding_y' => $request->template['form_elements']['button2']['padding_y'],
            //             'padding_x' => $request->template['form_elements']['button2']['padding_x'],
            //             'border_radius' => $request->template['form_elements']['button2']['border_radius'],
            //             'font_size' => $request->template['form_elements']['button2']['font_size'],
            //             'font_color' => $request->template['form_elements']['button2']['font_color'],
            //             'bg_color' => $request->template['form_elements']['button2']['bg_color'],
            //             'outline_width' => $request->template['form_elements']['button2']['outline_width'],
            //             'outline_color' => $request->template['form_elements']['button2']['outline_color'],
            //             'hover_font_color' => $request->template['form_elements']['button2']['hover_font_color'],
            //             'hover_bg_color' => $request->template['form_elements']['button2']['hover_bg_color'],
            //             'hover_outline_width' => $request->template['form_elements']['button2']['hover_outline_width'],
            //             'hover_outline_color' => $request->template['form_elements']['button2']['hover_outline_color'],
            //             'click_font_color' => $request->template['form_elements']['button2']['click_font_color'],
            //             'click_bg_color' => $request->template['form_elements']['button2']['click_bg_color'],
            //             'click_outline_width' => $request->template['form_elements']['button2']['click_outline_width'],
            //             'click_outline_color' => $request->template['form_elements']['button2']['click_outline_color'],
            //             'disabled_font_color' => $request->template['form_elements']['button2']['disabled_font_color'],
            //             'disabled_bg_color' => $request->template['form_elements']['button2']['disabled_bg_color'],
            //             'disabled_outline_width' => $request->template['form_elements']['button2']['disabled_outline_width'],
            //             'disabled_outline_color' => $request->template['form_elements']['button2']['disabled_outline_color'],
            //         ],
            //     ],
            //     'loading_spinner' => [
            //         'key' => $request->template['loading_spinner']['key'],
            //         'elem' => $request->template['loading_spinner']['elem'],
            //         'colors' => $request->template['loading_spinner']['colors'],
            //     ],
            //     'loading_screen' => $request->template['loading_screen']
            // ]);
            ])->update([
                'updated_at' => Carbon::now()->timestamp,
                'settings' => $request->template['settings'],
                'website_colors' => $request->template['website_colors'],
                'font_style' => $request->template['font_style'],
                'page_setup' => $request->template['page_setup'],
                'form_elements' => $request->template['form_elements'],
                'loading_spinner' => $request->template['loading_spinner'],
                // 'loading_screen' => $request->template['loading_screen'],
                'home' => $request->template['home'] ?? [],
            ]);

            if($save_tempalte){

                $website_langs = website::where('id',$this->website_id)->pluck('languages')->first();
                $langs = [];
                foreach($website_langs as $lang){
                    array_push($langs,$lang['code']);
                }
                $template = template::where('_id',$request->template['_id'])->first();
                (new generate_css)->generate($template);
                (new generate_js)->generate($template,$langs);

                return response(['save_template_state' => 1]);
            }else{
                return response(['save_template_state' => 0]);
            }
        }
    }

    public function design(Request $request)
    {
        // if($request->has('applyTemplate')){
            // if(str_split($this->account->authorities)[3] == false){
        //         return;
        //     }
        //     $template = foodmenuFunctions::templates()[$request->applyTemplate];
        //     $updateTemplate = website::where('id',$this->website_id)->update([
        //         'template' => $template['id'],
        //         'website_colors' => $template['colors'],
        //         'useCustomColors' => false,
        //     ]);
        //     if($updateTemplate){
        //         // $notification = new stdClass();
        //         // $notification->code = 23;
        //         // $notification->website_id = $this->website_id;
        //         // $notification->template = $template;
        //         // $notification->activity = activityLog::create([
        //         //     'website_id' => $this->website_id,
        //         //     'code' => 39,
        //         //     'account_id' => $this->account->id,
        //         //     'account_name' => $this->account->name,
        //         // ]);
        //         // broadcast(new cpanelNotification($notification))->toOthers();
        //         return response([
        //             'applyTemplateStatus' => 1,
        //             'msg' => Lang::get('cpanel/design/Templates.applyTemplateSaved'),
        //             'template' => $template,
        //         ]);

        //     }else{
        //         return response(['applyTemplateStatus' => 0, 'msg' => Lang::get('cpanel/design/Templates.applyTemplateFail')]);
        //     }
        // }
        // else if($request->has(['loadTemplates'])){
        //     if(str_split($this->account->authorities)[3] == false){
        //         return;
        //     }
        //     $allTemplates = collect(foodmenuFunctions::templates());
        //     $templates = $allTemplates->where('restaurantType',$request->loadTemplates)->shuffle();
        //     return response(['templates' => $templates]);
        // }
        // else if($request->has('getColors')){
        //     return response(['colors' => foodmenuFunctions::websiteColors()]);
        // }
        // else if($request->has(['websiteColor'])){
        //     if(str_split($this->account->authorities)[3] == false){
        //         return;
        //     }
        //     $saveWebsiteColor = website::where('id',$this->website_id)->update([
        //         'website_colors'=>$request->websiteColor,
        //     ]);
        //     if($saveWebsiteColor){
        //         // $notification = new stdClass();
        //         // $notification->code = 30;
        //         // $notification->website_id = $this->website_id;
        //         // $notification->websiteColor = $request->websiteColor;
        //         // $notification->activity = activityLog::create([
        //         //     'website_id' => $this->website_id,
        //         //     'code' => 37,
        //         //     'account_id' => $this->account->id,
        //         //     'account_name' => $this->account->name,
        //         // ]);
        //         // broadcast(new cpanelNotification($notification))->toOthers();
        //         return response(['saveWebsiteColorStatus' => 1,'msg'=> Lang::get('cpanel/design/websiteStyle.saveWebsiteColorSaved') ]);
        //     }else{
        //         return response(['saveWebsiteColorStatus' => 0, 'msg'=> Lang::get('cpanel/design/websiteStyle.saveWebsiteColorSaveFail')]);
        //     }
        // }
        // else if($request->has(['saveCustomColors'])){
        //     if(str_split($this->account->authorities)[3] == false){
        //         return;
        //     }
        //     $saveCustomColors = website::where('id',$this->website_id)->update([
        //         'useCustomColors'=>$request->useCustomColors,
        //         'customColorsHexCode'=> [
        //             'color1'=>strip_tags($request->color1),
        //             'color2'=>strip_tags($request->color2),
        //             'color3'=>strip_tags($request->color3),
        //             'color4'=>strip_tags($request->color4),
        //             'color5'=>strip_tags($request->color5),
        //             'colorError'=>strip_tags($request->colorError),
        //             'colorSuccess'=>strip_tags($request->colorSuccess),
        //             'colorWarning'=>strip_tags($request->colorWarning),
        //             'colorStar'=>strip_tags($request->colorStar),
        //         ]
        //     ]);
        //     if($saveCustomColors){
        //         // $notification = new stdClass();
        //         // $notification->code = 29;
        //         // $notification->website_id = $this->website_id;
        //         // $notification->useCustomColors = $request->useCustomColors;
        //         // $notification->color1 = strip_tags($request->color1);
        //         // $notification->color2 = strip_tags($request->color2);
        //         // $notification->color3 = strip_tags($request->color3);
        //         // $notification->color4 = strip_tags($request->color4);
        //         // $notification->color5 = strip_tags($request->color5);
        //         // $notification->colorError = strip_tags($request->colorError);
        //         // $notification->colorSuccess = strip_tags($request->colorSuccess);
        //         // $notification->colorWarning = strip_tags($request->colorWarning);
        //         // $notification->colorStar = strip_tags($request->colorStar);
        //         // $notification->activity = activityLog::create([
        //         //     'website_id' => $this->website_id,
        //         //     'code' => 37,
        //         //     'account_id' => $this->account->id,
        //         //     'account_name' => $this->account->name,
        //         // ]);
        //         // broadcast(new cpanelNotification($notification))->toOthers();
        //         return response(['saveCustomColorsStatus' => 1,'msg'=> Lang::get('cpanel/design/websiteStyle.saveCustomColorsSaved') ]);
        //     }else{
        //         return response(['saveCustomColorsStatus' => 0, 'msg'=> Lang::get('cpanel/design/websiteStyle.saveCustomColorsSaveFail')]);
        //     }
        // }
        // /////////////////
        // else if($request->has(['saveComponent'])){
        //     if(str_split($this->account->authorities)[3] == false){
        //         return;
        //     }
        //     if($request->saveComponent == 'intro'){
        //         $saveComponent = website::where('id',$this->website_id)
        //             ->update([
        //                 'intro'=>[
        //                     'img' => $request->introImg,
        //                     'title_en' => strip_tags($request->title_en),
        //                     'title_es' => strip_tags($request->title_es),
        //                     'title_fr' => strip_tags($request->title_fr),
        //                     'title_de' => strip_tags($request->title_de),
        //                     'title_it' => strip_tags($request->title_it),
        //                     'title_eg' => strip_tags($request->title_eg),
        //                     'title_ar' => strip_tags($request->title_ar),
        //                     'title_ru' => strip_tags($request->title_ru),
        //                     'title_ua' => strip_tags($request->title_ua),
        //                     'des_en' => strip_tags($request->des_en),
        //                     'des_es' => strip_tags($request->des_es),
        //                     'des_fr' => strip_tags($request->des_fr),
        //                     'des_de' => strip_tags($request->des_de),
        //                     'des_it' => strip_tags($request->des_it),
        //                     'des_eg' => strip_tags($request->des_eg),
        //                     'des_ar' => strip_tags($request->des_ar),
        //                     'des_ru' => strip_tags($request->des_ru),
        //                     'des_ua' => strip_tags($request->des_ua),
        //                 ],
        //             ]);
        //             if($saveComponent){
        //                 // $notification = new stdClass();
        //                 // $notification->code = 52;
        //                 // $notification->website_id = $this->website_id;
        //                 // $notification->title_en = strip_tags($request->title_en);
        //                 // $notification->title_es = strip_tags($request->title_es);
        //                 // $notification->title_fr = strip_tags($request->title_fr);
        //                 // $notification->title_de = strip_tags($request->title_de);
        //                 // $notification->title_it = strip_tags($request->title_it);
        //                 // $notification->title_eg = strip_tags($request->title_eg);
        //                 // $notification->title_ar = strip_tags($request->title_ar);
        //                 // $notification->title_ru = strip_tags($request->title_ru);
        //                 // $notification->title_ua = strip_tags($request->title_ua);
        //                 // $notification->des_en = strip_tags($request->des_en);
        //                 // $notification->des_es = strip_tags($request->des_es);
        //                 // $notification->des_fr = strip_tags($request->des_fr);
        //                 // $notification->des_de = strip_tags($request->des_de);
        //                 // $notification->des_it = strip_tags($request->des_it);
        //                 // $notification->des_eg = strip_tags($request->des_eg);
        //                 // $notification->des_ar = strip_tags($request->des_ar);
        //                 // $notification->des_ru = strip_tags($request->des_ru);
        //                 // $notification->des_ua = strip_tags($request->des_ua);
        //                 // $notification->introImg = $request->introImg;
        //                 // $notification->activity = activityLog::create([
        //                 //     'website_id' => $this->website_id,
        //                 //     'code' => 64,
        //                 //     'account_id' => $this->account->id,
        //                 //     'account_name' => $this->account->name,
        //                 //     'component_name' => $request->saveComponent,
        //                 // ]);
        //                 // broadcast(new cpanelNotification($notification))->toOthers();
        //                 return response(['saveComponentStatus' => 1,'msg'=>Lang::get('cpanel/design/homePageSections.changeIntroSaved')]);

        //             }else{
        //                 return response(['saveComponentStatus' => 0,'msg'=>Lang::get('cpanel/design/homePageSections.changeIntroSaveFail')]);

        //             }

        //     }else if($request->saveComponent == 'slideShow'){
        //         $slideShow = [
        //             'interval' => $request->interval,
        //             'content' => [],
        //         ];
        //         if(isset($request->content)){
        //             foreach($request->content as $slideShowImg){
        //                 array_push($slideShow['content'],[
        //                     'imgId'=> (int)$slideShowImg['imgId'],
        //                     'linkNewTab'=> (boolean)$slideShowImg['linkNewTab'],
        //                     'title_en'=> strip_tags($slideShowImg['title_en']),
        //                     'title_fr'=> strip_tags($slideShowImg['title_fr']),
        //                     'title_de'=> strip_tags($slideShowImg['title_de']),
        //                     'title_it'=> strip_tags($slideShowImg['title_it']),
        //                     'title_es'=> strip_tags($slideShowImg['title_es']),
        //                     'title_ar'=> strip_tags($slideShowImg['title_ar']),
        //                     'title_ru'=> strip_tags($slideShowImg['title_ru']),
        //                     'title_ua'=> strip_tags($slideShowImg['title_ua']),
        //                     'title_eg'=> strip_tags($slideShowImg['title_eg']),
        //                     'des_en'=> strip_tags($slideShowImg['des_en']),
        //                     'des_fr'=> strip_tags($slideShowImg['des_fr']),
        //                     'des_de'=> strip_tags($slideShowImg['des_de']),
        //                     'des_it'=> strip_tags($slideShowImg['des_it']),
        //                     'des_es'=> strip_tags($slideShowImg['des_es']),
        //                     'des_ar'=> strip_tags($slideShowImg['des_ar']),
        //                     'des_ru'=> strip_tags($slideShowImg['des_ru']),
        //                     'des_ua'=> strip_tags($slideShowImg['des_ua']),
        //                     'des_eg'=> strip_tags($slideShowImg['des_eg']),
        //                     'link_en'=> strip_tags($slideShowImg['link_en']),
        //                     'link_fr'=> strip_tags($slideShowImg['link_fr']),
        //                     'link_de'=> strip_tags($slideShowImg['link_de']),
        //                     'link_it'=> strip_tags($slideShowImg['link_it']),
        //                     'link_es'=> strip_tags($slideShowImg['link_es']),
        //                     'link_ar'=> strip_tags($slideShowImg['link_ar']),
        //                     'link_ru'=> strip_tags($slideShowImg['link_ru']),
        //                     'link_ua'=> strip_tags($slideShowImg['link_ua']),
        //                     'link_eg'=> strip_tags($slideShowImg['link_eg']),
        //                 ]);
        //             }
        //         }

        //         $saveComponent = website::where('id',$this->website_id)
        //             ->update([
        //                 'slideShow' => $slideShow,
        //             ]);
        //             if($saveComponent){
        //                 // $notification = new stdClass();
        //                 // $notification->code = 45;
        //                 // $notification->website_id = $this->website_id;
        //                 // $notification->slideShow = $slideShow;
        //                 // $notification->activity = activityLog::create([
        //                 //     'website_id' => $this->website_id,
        //                 //     'code' => 64,
        //                 //     'account_id' => $this->account->id,
        //                 //     'account_name' => $this->account->name,
        //                 //     'component_name' => $request->saveComponent,
        //                 // ]);
        //                 // broadcast(new cpanelNotification($notification))->toOthers();
        //                 return response(['saveComponentStatus' => 1,'msg'=>Lang::get('cpanel/design/homePageSections.changeSlideShowSaved')]);

        //             }else{
        //                 return response(['saveComponentStatus' => 0,'msg'=>Lang::get('cpanel/design/homePageSections.changeSlideShowSaveFail')]);

        //             }
        //     }else if($request->saveComponent == 'gallery'){
        //         if($request->gallery == null){$request->gallery = '';}
        //         $saveComponent = website::where('id',$this->website_id)
        //             ->update([
        //                 'gallery' => $request->gallery,
        //             ]);
        //             if($saveComponent){
        //                 // $notification = new stdClass();
        //                 // $notification->code = 50;
        //                 // $notification->website_id = $this->website_id;
        //                 // $notification->gallery = $request->gallery;
        //                 // $notification->activity = activityLog::create([
        //                 //     'website_id' => $this->website_id,
        //                 //     'code' => 64,
        //                 //     'account_id' => $this->account->id,
        //                 //     'account_name' => $this->account->name,
        //                 //     'component_name' => $request->saveComponent,
        //                 // ]);
        //                 // broadcast(new cpanelNotification($notification))->toOthers();
        //                 return response(['saveComponentStatus' => 1,'msg'=>Lang::get('cpanel/design/homePageSections.changeGallerySaved')]);

        //             }else{
        //                 return response(['saveComponentStatus' => 0,'msg'=>Lang::get('cpanel/design/homePageSections.changeGallerySaveFail')]);

        //             }
        //     }else if($request->saveComponent == 'info'){
        //         $saveComponent = website::where('id',$this->website_id)
        //             ->update([
        //                 'info'=>[
        //                     'img' => $request->infoImg,
        //                     'title_en' => strip_tags($request->title_en),
        //                     'title_es' => strip_tags($request->title_es),
        //                     'title_fr' => strip_tags($request->title_fr),
        //                     'title_de' => strip_tags($request->title_de),
        //                     'title_it' => strip_tags($request->title_it),
        //                     'title_eg' => strip_tags($request->title_eg),
        //                     'title_ar' => strip_tags($request->title_ar),
        //                     'title_ru' => strip_tags($request->title_ru),
        //                     'title_ua' => strip_tags($request->title_ua),
        //                     'des_en' => strip_tags($request->des_en),
        //                     'des_es' => strip_tags($request->des_es),
        //                     'des_fr' => strip_tags($request->des_fr),
        //                     'des_de' => strip_tags($request->des_de),
        //                     'des_it' => strip_tags($request->des_it),
        //                     'des_eg' => strip_tags($request->des_eg),
        //                     'des_ar' => strip_tags($request->des_ar),
        //                     'des_ru' => strip_tags($request->des_ru),
        //                     'des_ua' => strip_tags($request->des_ua),
        //                 ],
        //             ]);
        //             if($saveComponent){
        //                 // $notification = new stdClass();
        //                 // $notification->code = 53;
        //                 // $notification->website_id = $this->website_id;
        //                 // $notification->title_en = strip_tags($request->title_en);
        //                 // $notification->title_es = strip_tags($request->title_es);
        //                 // $notification->title_fr = strip_tags($request->title_fr);
        //                 // $notification->title_de = strip_tags($request->title_de);
        //                 // $notification->title_it = strip_tags($request->title_it);
        //                 // $notification->title_eg = strip_tags($request->title_eg);
        //                 // $notification->title_ar = strip_tags($request->title_ar);
        //                 // $notification->title_ru = strip_tags($request->title_ru);
        //                 // $notification->title_ua = strip_tags($request->title_ua);
        //                 // $notification->des_en = strip_tags($request->des_en);
        //                 // $notification->des_es = strip_tags($request->des_es);
        //                 // $notification->des_fr = strip_tags($request->des_fr);
        //                 // $notification->des_de = strip_tags($request->des_de);
        //                 // $notification->des_it = strip_tags($request->des_it);
        //                 // $notification->des_eg = strip_tags($request->des_eg);
        //                 // $notification->des_ar = strip_tags($request->des_ar);
        //                 // $notification->des_ru = strip_tags($request->des_ru);
        //                 // $notification->des_ua = strip_tags($request->des_ua);
        //                 // $notification->infoImg = $request->infoImg;
        //                 // $notification->activity = activityLog::create([
        //                 //     'website_id' => $this->website_id,
        //                 //     'code' => 64,
        //                 //     'account_id' => $this->account->id,
        //                 //     'account_name' => $this->account->name,
        //                 //     'component_name' => $request->saveComponent,
        //                 // ]);
        //                 // broadcast(new cpanelNotification($notification))->toOthers();
        //                 return response(['saveComponentStatus' => 1,'msg'=>Lang::get('cpanel/design/homePageSections.changeInfoSaved')]);

        //             }else{
        //                 return response(['saveComponentStatus' => 0,'msg'=>Lang::get('cpanel/design/homePageSections.changeInfoSaveFail')]);

        //             }

        //     }else if($request->saveComponent == 'ourStory'){
        //         $saveComponent = website::where('id',$this->website_id)
        //             ->update([
        //                 'ourStory'=>[
        //                     'img' => $request->ourStoryImg,
        //                     'title_en' => strip_tags($request->title_en),
        //                     'title_es' => strip_tags($request->title_es),
        //                     'title_fr' => strip_tags($request->title_fr),
        //                     'title_de' => strip_tags($request->title_de),
        //                     'title_it' => strip_tags($request->title_it),
        //                     'title_eg' => strip_tags($request->title_eg),
        //                     'title_ar' => strip_tags($request->title_ar),
        //                     'title_ru' => strip_tags($request->title_ru),
        //                     'title_ua' => strip_tags($request->title_ua),
        //                     'des_en' => strip_tags($request->des_en),
        //                     'des_es' => strip_tags($request->des_es),
        //                     'des_fr' => strip_tags($request->des_fr),
        //                     'des_de' => strip_tags($request->des_de),
        //                     'des_it' => strip_tags($request->des_it),
        //                     'des_eg' => strip_tags($request->des_eg),
        //                     'des_ar' => strip_tags($request->des_ar),
        //                     'des_ru' => strip_tags($request->des_ru),
        //                     'des_ua' => strip_tags($request->des_ua),
        //                 ],
        //             ]);
        //             if($saveComponent){
        //                 // $notification = new stdClass();
        //                 // $notification->code = 54;
        //                 // $notification->website_id = $this->website_id;
        //                 // $notification->title_en = strip_tags($request->title_en);
        //                 // $notification->title_es = strip_tags($request->title_es);
        //                 // $notification->title_fr = strip_tags($request->title_fr);
        //                 // $notification->title_de = strip_tags($request->title_de);
        //                 // $notification->title_it = strip_tags($request->title_it);
        //                 // $notification->title_eg = strip_tags($request->title_eg);
        //                 // $notification->title_ar = strip_tags($request->title_ar);
        //                 // $notification->title_ru = strip_tags($request->title_ru);
        //                 // $notification->title_ua = strip_tags($request->title_ua);
        //                 // $notification->des_en = strip_tags($request->des_en);
        //                 // $notification->des_es = strip_tags($request->des_es);
        //                 // $notification->des_fr = strip_tags($request->des_fr);
        //                 // $notification->des_de = strip_tags($request->des_de);
        //                 // $notification->des_it = strip_tags($request->des_it);
        //                 // $notification->des_eg = strip_tags($request->des_eg);
        //                 // $notification->des_ar = strip_tags($request->des_ar);
        //                 // $notification->des_ru = strip_tags($request->des_ru);
        //                 // $notification->des_ua = strip_tags($request->des_ua);
        //                 // $notification->ourStoryImg = $request->ourStoryImg;
        //                 // $notification->activity = activityLog::create([
        //                 //     'website_id' => $this->website_id,
        //                 //     'code' => 64,
        //                 //     'account_id' => $this->account->id,
        //                 //     'account_name' => $this->account->name,
        //                 //     'component_name' => $request->saveComponent,
        //                 // ]);
        //                 // broadcast(new cpanelNotification($notification))->toOthers();
        //                 return response(['saveComponentStatus' => 1,'msg'=>Lang::get('cpanel/design/homePageSections.changeOurStorySaved')]);

        //             }else{
        //                 return response(['saveComponentStatus' => 0,'msg'=>Lang::get('cpanel/design/homePageSections.changeOurStorySaveFail')]);

        //             }
        //     }

        // }
    }
    public function imgs(Request $request)
    {
        if($request->has('gitStorageSize')){
            if(str_split($this->account->authorities)[3] == false){return;}
            return response(img::where(['website_id'=>$this->website_id])->sum('size'));
        }else if($request->has('getImgs')){
            $imgs = img::where(['website_id'=>$this->website_id])->orderBy('created_at','DESC')->skip($request->skip)->limit(10)->get();
            return response(['imgs'=>$imgs]);
        }else if($request->has('getImg')){
            return response(['img' => img::where(['id'=>$request->getImg,'website_id'=>$this->website_id])->first()]);
        }else if($request->has(['designUploadImg'])){
            if(str_split($this->account->authorities)[3] == false){return;}
            $validate = Validator::make(['uploadImg'=> $request->designUploadImg ],
            [
                'uploadImg' => 'required|mimes:webp,png,jpeg,gif,bmp,jpg,jpe|max:10240'
            ]);

            if($validate->fails()){
                return response( ['imgUpladStatus'=> 0,'error'=> Lang::get('cpanel/design/responses.uploadError') ] );
            }else{
                $website = website::where('id',$this->website_id)->select(['domainName','plan'])->first();
                $file = $request->file('designUploadImg');
                $fileExtention = $file->guessExtension();
                $fileSize = $file->getSize();
                $hash = strtolower( Str::random(20) );
                $tempname = 'foodmenu-'. $website->domainName .'-'. $hash;

                $planStorage = foodmenuFunctions::plans()[$website->plan]['storage'];
                $planStorage = $planStorage * 1024 * 1024;
                $currentStorage = img::where('website_id',$this->website_id)->sum('size');
                $newStorage = $currentStorage + $fileSize;


                if($newStorage > $planStorage){
                    return response( ['imgUpladStatus'=> 2,'msg'=> Lang::get('cpanel/design/responses.noSpace') ] );
                }else{
                    $file->storeAs('websites/'.$this->website_id.'/imgs/',$tempname.'.'.$fileExtention);
                    $img_width_height = getimagesize($file);
                    $width = $img_width_height[0];
                    $height = $img_width_height[1];
                    //
                    $manager = new ImageManager(Driver::class);
                    $thumbnail = $manager->read($file);
                    if((int)$width > (int)$height){
                        $thumbnail->scaleDown(width: 250);
                    }else{
                        $thumbnail->scaleDown(height: 250);
                    }
                    $thumbnail->save('storage/websites/'.$this->website_id.'/imgs/'.$tempname.'_thumbnail.'.$fileExtention);

                    $img = new img();
                    $img->website_id = $this->website_id;
                    $img->name = $tempname;
                    $img->type = 'storage';
                    $img->url = '/storage/websites/'.$this->website_id.'/imgs/'.$tempname.'.'.$fileExtention;
                    $img->thumbnail_url = '/storage/websites/'.$this->website_id.'/imgs/'.$tempname.'_thumbnail.'.$fileExtention;
                    $img->extension = $fileExtention;
                    $img->size = $fileSize;
                    $img->width = $width;
                    $img->height = $height;
                    $img->save();

                    foodmenuFunctions::notification('img.upload',[
                        'website_id' => $this->website_id,
                        'code' => 'img.uploaded',
                        'img_id' => $img->id,
                        'img_name' => $img->name,
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                    ],[
                        'img'=>$img,
                    ]);
                    return response( [ 'imgUpladStatus'=>1, 'msg'=> Lang::get('cpanel/design/responses.imgUploaded'), 'img' => $img ] );
                }
            }

        }else if($request->has(['deleteImg'])){
            if(str_split($this->account->authorities)[3] == false){return;}
            $img = img::where('id',$request->imgId)->select('url','thumbnail_url','name')->first();
            $delete_img = File::delete(ltrim($img->url,'/'));
            $delete_thumbnail = File::delete(ltrim($img->thumbnail_url,'/'));
            if($delete_img && $delete_thumbnail){
                if(img::where('id',$request->imgId)->delete()){
                    foodmenuFunctions::notification('img.delete',[
                        'website_id' => $this->website_id,
                        'code' => 'img.deleted',
                        'img_id' => $request->imgId,
                        'img_name' => $img->name,
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                    ],[
                        'img_id'=>$request->imgId,
                    ]);
                    return response(['deleteImgStatus' => 1,'msg'=>Lang::get('cpanel/design/responses.imgDeleted')]);
                }else{
                    return response(['deleteImgStatus' => 0, 'msg' => Lang::get('cpanel/design/responses.imgDeleteError')]);
                }
            }else{
                return response(['deleteImgStatus' => 0, 'msg' => Lang::get('cpanel/design/responses.imgDeleteError')]);
            }
        }else if($request->has('search_pexels')){
            $client = new GuzzleHttp\Client();
            $response = $client->request('GET',"https://api.pexels.com/v1/search?query=$request->search_pexels&per_page=80&page=$request->page&orientation=$request->orientation&size=$request->size&color=$request->color",[
            'headers' => [
                    'Authorization'=> 'zpjq9kL33Q1vAN43u1QsUchQ41SgmPWuHFgBGyNsBazZybzdTiDx2j0l',
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ],
            ]);
            return response(['imgs' => json_decode($response->getBody())]);
        }else if($request->has('add_pexel_img')){
            $client = new GuzzleHttp\Client();
            $response = $client->get($request->img_url);
            if ($response->getStatusCode() === 200) {
                $image = $response->getBody()->getContents();
                if (!$response->hasHeader('Content-Type')) {
                    return response(['code' => 0]);
                }


                $contentLength = $response->getHeader('Content-Length');
                $fileSize = $contentLength ? (int)$contentLength[0] : null;


                $website = website::where('id',$this->website_id)->select(['domainName','plan'])->first();
                $planStorage = foodmenuFunctions::plans()[$website->plan]['storage'];
                $planStorage = $planStorage * 1024 * 1024;
                $currentStorage = img::where('website_id',$this->website_id)->sum('size');
                $newStorage = $currentStorage + $fileSize;
                if($newStorage > $planStorage){
                    return response(['code' => 2]);
                }

                $contentType = $response->getHeader('Content-Type')[0];
                $fileExtention = explode('/', $contentType)[1];
                $dimensions = getimagesizefromstring($image);
                $hash = strtolower( Str::random(20) );
                $tempname = 'foodmenu-'. $website->domainName .'-'. $hash;
                $filename = "$tempname.$fileExtention";

                $path = storage_path("app/public/websites/$this->website_id/imgs/$filename");
                file_put_contents($path, $image);
                ///
                $manager = new ImageManager(Driver::class);
                $thumbnail = $manager->read($image);
                if((int)$dimensions[0] > (int)$dimensions[1]){
                    $thumbnail->scaleDown(width: 250);
                }else{
                    $thumbnail->scaleDown(height: 250);
                }
                $thumbnail->save('storage/websites/'.$this->website_id.'/imgs/'.$tempname.'_thumbnail.'.$fileExtention);
                ///

                $img = new img();
                $img->website_id = $this->website_id;
                $img->name = $tempname;
                $img->type = 'pexels';
                $img->photographer = $request->photographer;
                $img->photographer_url = $request->photographer_url;
                $img->url = '/storage/websites/'.$this->website_id.'/imgs/'.$tempname.'.'.$fileExtention;
                $img->thumbnail_url = '/storage/websites/'.$this->website_id.'/imgs/'.$tempname.'_thumbnail.'.$fileExtention;
                $img->extension = $fileExtention;
                $img->size = $fileSize;
                $img->width = $dimensions[0];
                $img->height = $dimensions[1];
                $img->save();

                foodmenuFunctions::notification('img.upload',[
                    'website_id' => $this->website_id,
                    'code' => 'img.uploaded',
                    'img_id' => $img->id,
                    'img_name' => $img->name,
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'img'=>$img,
                ]);

                return response(['code' => 1, 'img' => $img]);
            }else {
                return response(['code' => 0]);
            }




        }

        else if($request->has(['ticketUploadImg'])){
            if($this->account->is_master == false){return;}
            $validate = Validator::make(['ticketUploadImg'=> $request->ticketUploadImg ],
            [
                'ticketUploadImg' => 'required|mimes:webp,png,jpeg,gif,bmp,jpg,jpe|max:1024'
            ]);
            if($validate->fails()){
                return response( ['ticketUploadImgStatus'=> 0,'error'=> Lang::get('cpanel/design/responses.uploadError') ] );
            }else{
                $file = $request->file('ticketUploadImg');
                $fileExtention = $file->guessExtension();
                $tempname = 'foodmenu-'. $this->website_id .'-'. strtolower( Str::random(20) );
                $file->storeAs('websites/'. $this->website_id.'/ticketsImgs' ,$tempname.'.'.$fileExtention);
                return response(['ticketUploadImgStatus' => 1 , 'msg'=> Lang::get('cpanel/design/responses.uploaded'),'url'=>'websites/'. $this->website_id.'/ticketsImgs/'.$tempname.'.'.$fileExtention]);
            }
        }
        else if($request->has(['deleteTicketAttachment'])){
            if($this->account->is_master == false){return;}
            $deleteAttachment = Storage::delete([$request->deleteTicketAttachment]);
            if($deleteAttachment){
                return response(['deleteTicketAttachmentStatus'=>1]);
            }else{
                return response(['deleteTicketAttachmentStatus'=>0,'msg'=>Lang::get('cpanel/support/responses.faillToDeleteAttachment')]);
            }
        }
    }
}
