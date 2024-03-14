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
use App\Models\templates_data;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Image;
use Illuminate\Support\Facades\Storage;

class designController extends Controller
{
    protected $website_id;
    protected $account;
    public function __construct()
    {
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
        $template = null;
        if($request->has('template')){
            $template = template::where([
                'website_id' => $this->website_id,
                '_id' => $request->template_id,
            ]);
        }
        return view('builder.home',['template_id' => $request->template_id]);
    }
    public function api(Request $request){
        if($request->has('getData')){
            $website = website::where('id',$this->website_id)->select(['template_id'])->first();
            $templates = template::where(['website_id'=>$this->website_id])->get();
            return response([
                'website' => $website,
                'templates' => $templates,
                'texts' => Lang::get('builder'),
                'colors' => templates_data::colors(),
            ]);
        }else if($request->has('save_template')){
            $save_tempalte = template::where([
                'website_id' => $this->website_id,
                '_id'  => $request->template['_id']
            ])->update([
                'updated_at' => Carbon::now()->timestamp,
                'colors' => [
                    'default_color_theme' => $request->template['colors']['default_color_theme'],
                    'c1' =>  $request->template['colors']['c1'],
                    'c2' =>  $request->template['colors']['c2'],
                    'c3' =>  $request->template['colors']['c3'],
                    'c4' =>  $request->template['colors']['c4'],
                ],
                'fonts' => [],
                'spacing' => [],
                'form' => [
                    'button' => [],
                    'input' => [],
                    'checkbox' => [],
                ]
            ]);

            if($save_tempalte){
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
                $domainName = website::where('id',$this->website_id)->pluck('domainName')->first();
                $file = $request->file('designUploadImg');
                $fileExtention = $file->guessExtension();
                $fileSize = $file->getSize();
                $tempname = 'foodmenu-'. $domainName .'-'. strtolower( Str::random(20) );

                $planStorage = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['storage'];
                $planStorage = $planStorage * 1024 * 1024;
                $currentStorage = img::where('website_id',$this->website_id)->sum('size');
                $newStorage = $currentStorage + $fileSize;


                if($newStorage > $planStorage){
                    return response( ['imgUpladStatus'=> 2,'msg'=> Lang::get('cpanel/design/responses.noSpace') ] );
                }else{
                    $file->storeAs('imgs/websites/'. $this->website_id ,$tempname.'.'.$fileExtention);

                    $thumbnail = Image::make($request->file('designUploadImg'));
                    $thumbnail->resize(400, 400, function ($constraint) { $constraint->aspectRatio(); $constraint->upsize(); });
                    $thumbnail->save( 'storage/imgs/websites/'. $this->website_id.'/'.$tempname.'_thumbnail.'.$fileExtention);

                    $img = new img();
                    $img->website_id = $this->website_id;
                    $img->name = $tempname;
                    $img->url = '/storage/imgs/websites/'. $this->website_id.'/'.$tempname.'.'.$fileExtention;
                    $img->thumbnailUrl = '/storage/imgs/websites/'. $this->website_id.'/'.$tempname.'_thumbnail.'.$fileExtention;
                    $img->extension = $fileExtention;
                    $img->size = $fileSize;
                    $img->width = Image::make($request->file('designUploadImg'))->width();
                    $img->height = Image::make($request->file('designUploadImg'))->height();
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
            $img = img::where('id',$request->imgId)->select('url','thumbnailUrl','name')->first();
            $deleteFiles = File::delete(ltrim($img->url,'/'),ltrim($img->thumbnailUrl,'/'));
            if($deleteFiles){
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
                return response(['deleteImgStatus' => 55, 'msg' => Lang::get('cpanel/design/responses.imgDeleteError')]);
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
                $file->storeAs('imgs/websites/'. $this->website_id.'/ticketsImgs' ,$tempname.'.'.$fileExtention);
                return response(['ticketUploadImgStatus' => 1 , 'msg'=> Lang::get('cpanel/design/responses.uploaded'),'url'=>'imgs/websites/'. $this->website_id.'/ticketsImgs/'.$tempname.'.'.$fileExtention]);
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
