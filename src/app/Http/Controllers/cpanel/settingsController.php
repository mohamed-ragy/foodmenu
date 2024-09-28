<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\activityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\cpanelSettings;
use App\Models\cron_jobs;
use App\Models\website;
use App\Models\foodmenuFunctions;
use App\Models\img;
use App\Models\order;
use App\Models\promocode;
use App\Models\statistics_day;
use App\Models\statistics_hour;
use App\Models\statistics_month;
use App\Models\template;
use App\Models\templates\generate_css;
use App\Models\templates\generate_js;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use App\Models\websiteText;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class settingsController extends Controller
{
    
    protected $website_id;
    protected $account;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->account = Auth::guard('account')->user();
            $this->website_id = $this->account->website_id;
            App::setlocale($this->account->language);
            return $next($request);
        });

    }
    public function settings(Request $request)
    {
        if($request->has(['websiteSwitch'])){
            if($this->account->is_master == false){
                return;
            }
            if($request->websiteSwitch == 1){
                $websiteStatus = website::where('id',$this->website_id)->pluck('subscription_status')->first();
                if($websiteStatus != 'trialing'&& $websiteStatus != 'incomplete' && $websiteStatus != 'active'){
                    return;
                }
                $switchOn =website::where('id',$this->website_id)->update(['active'=>true,'updated_at' => Carbon::now()->timestamp]);
                if($switchOn){
                    foodmenuFunctions::notification('website.online',[
                        'website_id' => $this->website_id,
                        'code' => 'settings.website_status.online',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                    ],[

                    ]);
                    return response(['websiteSwitchOnStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.switchedOn')]);
                }else{
                    return response(['websiteSwitchOnStatus'=>0 ,'msg'=>Lang::get('cpanel/settings/responses.switchOnFail')]);
                }
            }else if($request->websiteSwitch == 0){
                $switchOff =website::where('id',$this->website_id)->update(['active'=>false,'updated_at' => Carbon::now()->timestamp]);
                if($switchOff){
                    foodmenuFunctions::notification('website.offline',[
                        'website_id' => $this->website_id,
                        'code' => 'settings.website_status.offline',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                    ],[

                    ]);
                    return response(['websiteSwitchOffStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.switchedOff')]);
                }else{
                    return response(['websiteSwitchOffStatus'=>0 ,'msg'=>Lang::get('cpanel/settings/responses.switchedOffFail')]);
                }
            }

        }
        else if($request->has('saveSystemSettings')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_system_settings = website::where('id',$this->website_id)->select(['useDelivery','usePickup','productReviews','guestReviews','collectReviews','guestOrders','acceptPickupOrders24','acceptDeliveryOrders24','discountAnnouncement','cancelOrder','dineinWorkingHours','liveChat','guestLiveChat','cookies_msg','langPopup','cart_lifeTime','printerWidth','fastLoading'])->first();
            $saveSystemSettings = website::where('id',$this->website_id)
                ->update([
                    'useDelivery'=>$request->useDelivery,
                    'usePickup'=>$request->usePickup,
                    'productReviews' => $request->productReviews,
                    'guestReviews' => $request->guestReviews,
                    'collectReviews' => $request->collectReviews,
                    'guestOrders' => $request->guestOrders,
                    'acceptPickupOrders24' => $request->acceptPickupOrders24,
                    'acceptDeliveryOrders24' => $request->acceptDeliveryOrders24,
                    'discountAnnouncement' => $request->discountAnnouncement,
                    'cancelOrder' => $request->cancelOrder,
                    'dineinWorkingHours' => $request->dineinWorkingHours,
                    'liveChat' => $request->liveChat,
                    'guestLiveChat' => $request->guestLiveChat,
                    'cookies_msg' => $request->cookies_msg,
                    'langPopup' => $request->langPopup,
                    'cart_lifeTime' => $request->cart_lifeTime,
                    'printerWidth' =>$request->printerWidth,
                    'fastLoading' => $request->fastLoading,
                    'updated_at' => Carbon::now()->timestamp,
                ]);
                if($saveSystemSettings){
                    $activity = null;
                    if(
                        $old_system_settings->useDelivery != $request->useDelivery ||
                        $old_system_settings->usePickup != $request->usePickup ||
                        $old_system_settings->productReviews != $request->productReviews ||
                        $old_system_settings->guestReviews != $request->guestReviews ||
                        $old_system_settings->collectReviews != $request->collectReviews ||
                        $old_system_settings->guestOrders != $request->guestOrders ||
                        $old_system_settings->acceptPickupOrders24 != $request->acceptPickupOrders24 ||
                        $old_system_settings->acceptDeliveryOrders24 != $request->acceptDeliveryOrders24 ||
                        $old_system_settings->discountAnnouncement != $request->discountAnnouncement ||
                        $old_system_settings->cancelOrder != $request->cancelOrder ||
                        $old_system_settings->dineinWorkingHours != $request->dineinWorkingHours ||
                        $old_system_settings->liveChat != $request->liveChat ||
                        $old_system_settings->guestLiveChat != $request->guestLiveChat ||
                        $old_system_settings->cookies_msg != $request->cookies_msg ||
                        $old_system_settings->langPopup != $request->langPopup ||
                        $old_system_settings->cart_lifeTime != $request->cart_lifeTime ||
                        $old_system_settings->printerWidth != $request->printerWidth ||
                        $old_system_settings->fastLoading != $request->fastLoading
                    ){
                        $activity = [
                            'website_id' => $this->website_id,
                            'code' => 'settings.system_settings',
                            'account_id' => $this->account->id,
                            'account_name' => $this->account->name,
                            'old_system_settings' => [
                                'useDelivery'=>$old_system_settings->useDelivery,
                                'usePickup'=>$old_system_settings->usePickup,
                                'productReviews' => $old_system_settings->productReviews,
                                'guestReviews' => $old_system_settings->guestReviews,
                                'collectReviews' => $old_system_settings->collectReviews,
                                'guestOrders' => $old_system_settings->guestOrders,
                                'acceptPickupOrders24' => $old_system_settings->acceptPickupOrders24,
                                'acceptDeliveryOrders24' => $old_system_settings->acceptDeliveryOrders24,
                                'discountAnnouncement' => $old_system_settings->discountAnnouncement,
                                'cancelOrder' => $old_system_settings->cancelOrder,
                                'dineinWorkingHours' => $old_system_settings->dineinWorkingHours,
                                'liveChat' => $old_system_settings->liveChat,
                                'guestLiveChat' => $old_system_settings->guestLiveChat,
                                'cookies_msg' => $old_system_settings->cookies_msg,
                                'langPopup' => $old_system_settings->langPopup,
                                'cart_lifeTime' => $old_system_settings->cart_lifeTime,
                                'printerWidth' =>$old_system_settings->printerWidth,
                                'fastLoading' => $old_system_settings->fastLoading,
                            ],
                            'new_system_settings' => [
                                'useDelivery'=>$request->useDelivery,
                                'usePickup'=>$request->usePickup,
                                'productReviews' => $request->productReviews,
                                'guestReviews' => $request->guestReviews,
                                'collectReviews' => $request->collectReviews,
                                'guestOrders' => $request->guestOrders,
                                'acceptPickupOrders24' => $request->acceptPickupOrders24,
                                'acceptDeliveryOrders24' => $request->acceptDeliveryOrders24,
                                'discountAnnouncement' => $request->discountAnnouncement,
                                'cancelOrder' => $request->cancelOrder,
                                'dineinWorkingHours' => $request->dineinWorkingHours,
                                'liveChat' => $request->liveChat,
                                'guestLiveChat' => $request->guestLiveChat,
                                'cookies_msg' => $request->cookies_msg,
                                'langPopup' => $request->langPopup,
                                'cart_lifeTime' => $request->cart_lifeTime,
                                'printerWidth' =>$request->printerWidth,
                                'fastLoading' => $request->fastLoading,
                            ],
                        ];
                    }
                    foodmenuFunctions::notification('settings.systemSettings',$activity,[
                        'useDelivery' => $request->useDelivery,
                        'usePickup' => $request->usePickup,
                        'productReviews' => $request->productReviews,
                        'guestReviews' => $request->guestReviews,
                        'collectReviews' => $request->collectReviews,
                        'guestOrders' => $request->guestOrders,
                        'acceptPickupOrders24' => $request->acceptPickupOrders24,
                        'acceptDeliveryOrders24' => $request->acceptDeliveryOrders24,
                        'cancelOrder' => $request->cancelOrder,
                        'dineinWorkingHours' => $request->dineinWorkingHours,
                        'liveChat' => $request->liveChat,
                        'guestLiveChat' => $request->guestLiveChat,
                        'cookies_msg' => $request->cookies_msg,
                        'discountAnnouncement' => $request->discountAnnouncement,
                        'langPopup' => $request->langPopup,
                        'cart_lifeTime' => $request->cart_lifeTime,
                        'printerWidth' => $request->printerWidth,
                        'fastLoading' => $request->fastLoading,
                    ]);
                    return response(['saveSystemSettingsStatus'=> 1,'msg'=>Lang::get('cpanel/settings/responses.systemSettingsSaved')]);
                }else{
                    return response(['saveSystemSettingsStatus'=> 0,'msg'=>Lang::get('cpanel/settings/responses.systemSettingsSaveFail')]);
                }
        }
        else if($request->has(['saveWebsitePrivacyPolicy'])){
            if($this->account->is_master == false){
                return;
            }
            $saveWebsitePrivacyPolicyObj = [];
            foreach($request->saveWebsitePrivacyPolicy as $key => $pp){
                $saveWebsitePrivacyPolicyObj[$key] = strip_tags($pp,['b','i','u','br','p','span','div','h1','h2','h3','ol','ul','li']);
            }
            $saveWebsitePrivacyPolicy = website::where('id',$this->website_id)
                                                    ->update([
                                                        'website_privacyPolicy'=>$saveWebsitePrivacyPolicyObj,
                                                        'updated_at' => Carbon::now()->timestamp,
                                                    ]);
            if($saveWebsitePrivacyPolicy){
                foodmenuFunctions::notification(null,[
                    'website_id' => $this->website_id,
                    'code' => 'settings.website_privacyPolicy',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],null);
                return response(['saveWebsitePrivacyPolicy' => 1,'msg'=>Lang::get('cpanel/settings/responses.privacyPolicySaved')]);
            }else{
                return response(['saveWebsitePrivacyPolicy' => 0,'msg'=>Lang::get('cpanel/settings/responses.privacyPolicySaveFaild')]);
            }
        }
        else if($request->has('deleteHistoryData')){
            if($this->account->is_master == false){
                return;
            }
            if($this->account->password_fails > 10){
                Account::where('id',$this->account->id)->update([
                    'account_unblock_code' => Str::random(100),
                    'updated_at' => Carbon::now()->timestamp,
                ]);
                foodmenuFunctions::notification('0',null,[
                    'account_id' => $this->account->id
                ]);
                Auth::guard('account')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response(['deleteHistoryDataStatus' => 2]);
                ///send email with the unblock link

            }else{
                if(Hash::check($request->password, $this->account->password)){
                    order::where('website_id',$this->website_id)->delete();
                    statistics_day::where('website_id' , $this->website_id)->delete();
                    statistics_hour::where('website_id',$this->website_id)->delete();
                    statistics_month::where('website_id',$this->website_id)->delete();
                    activityLog::where('website_id',$this->website_id)->delete();
                    foodmenuFunctions::notification('reload.update',null,[]);
                    return response(['deleteHistoryDataStatus' => 1,'msg' => Lang::get('cpanel/settings/responses.dataDeleted')]);
                }else{
                    Account::where('email',$this->account->email)->increment('password_fails');
                    return response(['deleteHistoryDataStatus' => 0, 'msg' => Lang::get('cpanel/settings/responses.wrongPassword')]);
                }
            }

        }
        else if($request->has('systemFirstLoad')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            return response([
                'countries' => foodmenuFunctions::countries(),
                'timeZones' => foodmenuFunctions::timeZones(),
            ]);
        }
        else if($request->has(['saveCountry'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            if($request->saveCountry == null){return;}
            $old_country = website::where('id',$this->website_id)->pluck('country_code')->first();
            $saveCountry = website::where('id',$this->website_id)->update([
                'country_code'=> strip_tags($request->saveCountry),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveCountry){
                $activity = null;
                if( $old_country != $request->saveCountry){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.country',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_country' => $old_country,
                        'new_country' => strip_tags($request->saveCountry)
                    ];
                }
                foodmenuFunctions::notification('settings.country',$activity,[
                    'country' => $request->saveCountry,
                ]);
                return response(['saveCountryStatus' =>1,'msg'=> Lang::get('cpanel/settings/responses.countrySaved')]);
            }else{
                return response(['saveCountryStatus' =>0,'msg'=> Lang::get('cpanel/settings/responses.countrySaveFail')]);
            }
        }
        else if($request->has(['saveTimeZone'])){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $old_timeZone = website::where('id',$this->website_id)->pluck('timeZone')->first();
            $changeTimeZone = website::where('id',$this->website_id)->update([
                'hour12'=>$request->hour12,'timeZone'=>strip_tags($request->saveTimeZone),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($changeTimeZone){
                cron_jobs::where('website_id',$this->website_id)->update(['timeZone'=>$request->saveTimeZone]);
                $activity = null;
                if($old_timeZone != $request->saveTimeZone){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.timeZone',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_timeZone' => $old_timeZone,
                        'new_timeZone' => strip_tags($request->saveTimeZone),
                    ];
                }
                foodmenuFunctions::notification('settings.timeZone',$activity,[
                    'timeZone' => $request->saveTimeZone,
                    'hour12' => $request->hour12,
                ]);
                return response(['saveTimeZoneStatus' =>1,'msg'=> Lang::get('cpanel/settings/responses.timeZoneSaved')]);
            }else{
                return response(['saveTimeZoneStatus' =>0,'msg'=> Lang::get('cpanel/settings/responses.timeZoneSaveFail')]);
            }
        }
        else if($request->has(['websiteIcon'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_icon = website::where('id',$this->website_id)->pluck('icon')->first();
            if($request->websiteIcon == '' || $request->websiteIcon == null){
                $iconUrl = "/storage/imgs/cpanel/noimg.png";
                $iconId = null;
            }else{
                $img = img::where(['website_id' => $this->website_id,'id'=>$request->websiteIcon])->first();
                if($img == null){
                    return response(['saveWebsiteIconStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteIconSaveFail')]);
                }
                $iconUrl = $img->url;
                $iconId = $img->id;
            }
            $saveWebsiteIcon = website::where('id',$this->website_id)
                            ->update([
                                'icon'=>$iconUrl,
                                'icon_id'=>$iconId,
                                'updated_at' => Carbon::now()->timestamp,
                             ]);
            if($saveWebsiteIcon){
                $activity = null;
                if($old_icon != $iconUrl){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.logo_icon.icon',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_icon' => $old_icon,
                        'new_icon' => $iconUrl,
                    ];
                }
                foodmenuFunctions::notification('settings.websiteIcon',$activity,[
                    'icon'=>$iconUrl,
                    'icon_id' => $iconId,
                ]);
                return response(['saveWebsiteIconStatus' => 1,'msg'=>Lang::get('cpanel/settings/responses.websiteIconSaved')]);
            }else{
                return response(['saveWebsiteIconStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteIconSaveFail')]);
            }
        }
        else if($request->has(['websiteLogo'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_logo = website::where('id',$this->website_id)->pluck('logo')->first();

            if($request->websiteLogo == '' || $request->websiteLogo == null){
                $logoUrl = "/storage/imgs/cpanel/noimg.png";
                $logoId = null;
            }else{
                $img = img::where(['website_id' => $this->website_id,'id'=>$request->websiteLogo])->first();
                if($img == null){
                    return response(['saveWebsiteLogoStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteLogoSaveFail')]);
                }
                $logoUrl = $img->url;
                $logoId = $img->id;
            }
            $saveWebsiteLogo = website::where('id',$this->website_id)
                ->update([
                    'logo'=>$logoUrl,
                    'logo_id' => $logoId,
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveWebsiteLogo){
                $activity = null;
                if($old_logo != $logoUrl){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.logo_icon.logo',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_logo' => $old_logo,
                        'new_logo' => $logoUrl,
                    ];
                }
                foodmenuFunctions::notification('settings.websiteLogo',$activity,[
                    'logo'=>$logoUrl,
                    'logo_id' => $logoId,
                ]);
                return response(['saveWebsiteLogoStatus' => 1,'msg'=>Lang::get('cpanel/settings/responses.websiteLogoSaved')]);
            }else{
                return response(['saveWebsiteLogoStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteLogoSaveFail')]);
            }
        }
        else if($request->has(['websiteMetaImg'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_metaImg = website::where('id',$this->website_id)->pluck('metaImg')->first();

            if($request->websiteMetaImg == '' || $request->websiteMetaImg == null){
                $metaImgUrl = "/storage/imgs/cpanel/noimg.png";
                $metaImgId = null;
            }else{
                $img = img::where(['website_id' => $this->website_id,'id'=>$request->websiteMetaImg])->first();
                if($img == null){
                    return response(['saveWebsiteMetaImgStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteMetaImgSaveFail')]);
                }
                $metaImgUrl = $img->url;
                $metaImgId = $img->id;
            }
            $saveWebsiteMetaImg = website::where('id',$this->website_id)
                ->update([
                    'metaImg'=>$metaImgUrl,
                    'metaImg_id' => $metaImgId,
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveWebsiteMetaImg){
                $activity = null;
                if($old_metaImg != $metaImgUrl){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.logo_icon.metaImg',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_metaImg' => $old_metaImg,
                        'new_metaImg' => $metaImgUrl,
                    ];
                }
                foodmenuFunctions::notification('settings.websiteMetaImg',$activity,[
                    'metaImg'=>$metaImgUrl,
                    'metaImg_id' => $metaImgId,
                ]);
                return response(['saveWebsiteMetaImgStatus' => 1,'msg'=>Lang::get('cpanel/settings/responses.websiteMetaImgSaved')]);
            }else{
                return response(['saveWebsiteMetaImgStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteMetaImgSaveFail')]);
            }
        }
        else if($request->has(['saveWebsiteName'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_names = website::where('id',$this->website_id)->pluck('websiteNames')->first();
            $saveWebsiteNameObj = [];
            foreach($request->saveWebsiteName as $key => $val){
                $saveWebsiteNameObj[$key] = strip_tags($val);
            }
            $saveWebsiteName = website::where('id',$this->website_id)
                    ->update([
                        'websiteNames' => $saveWebsiteNameObj,
                        'updated_at' => Carbon::now()->timestamp,
                    ]);
            if($saveWebsiteName){
                $activity = null;
                if($old_names != $saveWebsiteNameObj){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.restaurant_names',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_names' => $old_names,
                        'new_names' => $saveWebsiteNameObj
                    ];
                }
                foodmenuFunctions::notification('settings.websiteName',$activity,[
                    'websiteNames' => $saveWebsiteNameObj,

                ]);
                return response(['saveWebsiteName' => 1,'msg'=>Lang::get('cpanel/settings/responses.nameSaved')]);
            }else{
                return response(['saveWebsiteName' => 0,'msg'=>Lang::get('cpanel/settings/responses.nameSaveFail')]);
            }
        }
        else if($request->has(['saveWebsiteDescription'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_descriptions = website::where('id',$this->website_id)->pluck('websiteDescriptions')->first();

            $saveWebsiteDescriptionOBJ = [];
            foreach($request->saveWebsiteDescription as $key => $val){
                $saveWebsiteDescriptionOBJ[$key] = strip_tags($val);
            }
            $saveWebsiteDescription = website::where('id',$this->website_id)
                ->update([
                    'websiteDescriptions' => $saveWebsiteDescriptionOBJ,
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveWebsiteDescription){
                $activity = null;
                if($old_descriptions != $saveWebsiteDescriptionOBJ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.restaurant_descriptions',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_descriptions' => $old_descriptions,
                        'new_descriptions' => $saveWebsiteDescriptionOBJ
                    ];
                }
                foodmenuFunctions::notification('settings.websiteDescription',$activity,[
                    'websiteDescriptions' => $saveWebsiteDescriptionOBJ,
                ]);
                return response(['saveWebsiteDescription' => 1,'msg'=>Lang::get('cpanel/settings/responses.descriptionSaved')]);
            }else{
                return response(['saveWebsiteDescription' => 0,'msg'=>Lang::get('cpanel/settings/responses.descriptionSaveFail')]);
            }
        }
        else if($request->has('saveRestaurantEmail')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_email = website::where('id',$this->website_id)->pluck('restaurantEmail')->first();
            $saveRestaurantEmail = website::where('id',$this->website_id)->update([
                    'restaurantEmail' => strip_tags($request->saveRestaurantEmail),
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveRestaurantEmail){
                $activity = null;
                if($old_email != strip_tags($request->saveRestaurantEmail)){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.restaurant_email',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'new_email' => strip_tags($request->saveRestaurantEmail),
                        'old_email' => $old_email,
                    ];
                }
                foodmenuFunctions::notification('settings.restaurantEmail',$activity,[
                    'restaurantEmail' => strip_tags($request->saveRestaurantEmail),
                ]);
                return response(['saveRestaurantEmail'=>1,'msg'=>Lang::get('cpanel/settings/responses.restaurantEmailChanged')]);
            }else{
                return response(['saveRestaurantEmail'=>0,'msg'=>Lang::get('cpanel/settings/responses.restaurantEmailChangeFail')]);
            }
        }
        else if($request->has(['changeWebsitePhoneNumbers'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_phone = website::where('id',$this->website_id)->pluck('phoneNumbers')->first();
            $savePhoneNumbers = [];
            if($request->websitePhoneNumbers != null){
                foreach($request->websitePhoneNumbers as $phoneNumber){
                    array_push($savePhoneNumbers,strip_tags($phoneNumber));
                }
            }
            $changeWesbitePhoneNumber = website::where('id',$this->website_id)->update([
                'phoneNumbers'=> $savePhoneNumbers,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($changeWesbitePhoneNumber){
                $activity = null;
                if($old_phone != $savePhoneNumbers){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.restaurant_phone_numbers',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_phone' => $old_phone,
                        'new_phone' => $savePhoneNumbers,
                    ];
                }
                foodmenuFunctions::notification('settings.websitePhoneNumbers',$activity,[
                    'phoneNumbers' => $savePhoneNumbers,
                ]);
                return response(['changeWebsitePhoneNumber'=>1,'msg'=>Lang::get('cpanel/settings/responses.changeWebsitePhoneNumberSaved')]);
            }else{
                return response(['changeWebsitePhoneNumber'=>0,'msg'=>Lang::get('cpanel/settings/responses.changeWebsitePhoneNumberSaveFail')]);
            }
        }
        else if($request->has(['websiteAddresses'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_addresses = website::where('id',$this->website_id)->pluck('addresses')->first();
            $websiteAddressesObj = [];
            foreach($request->websiteAddresses as $key => $val){
                $websiteAddressesObj[$key] = strip_tags($val);
            }
            $changeWebsiteAddress = website::where('id',$this->website_id)->update([
                'addresses' => $websiteAddressesObj,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($changeWebsiteAddress){
                $activity = null;
                if($old_addresses != $websiteAddressesObj){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => "settings.restaurant_info.restaurant_address",
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_names' => $old_addresses,
                        'new_names' => $websiteAddressesObj,
                    ];
                }
                foodmenuFunctions::notification('settings.websiteAddresses',$activity,[
                    'addresses' => $websiteAddressesObj,
                ]);
                return response(['changeWebsiteAddress'=>1,'msg'=>Lang::get('cpanel/settings/responses.changeWebsiteAddressSaved')]);
            }else{
                return response(['changeWebsiteAddress'=>0,'msg'=>Lang::get('cpanel/settings/responses.changeWebsiteAddressSaveFail')]);
            }
        }
        else if($request->has('saveRestaurantLocation')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $updateRestaurantLocation = website::where('id',$this->website_id)->update([
                'lat'=>$request->lat,
                'lng' => $request->lng,
                'delivery_range' => $request->delivery_range,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($updateRestaurantLocation){
                foodmenuFunctions::notification('settings.restaurantLocation',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.restaurant_info.restaurant_location',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                ],[
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                    'delivery_range' => $request->delivery_range,
                ]);
                return response(['saveRestaurantLocationStatus' => 1,'msg' => Lang::get('cpanel/settings/responses.restaurantLocationSaved')]);
            }else{
                return response(['saveRestaurantLocationStatus' => 0,'msg' => Lang::get('cpanel/settings/responses.restaurantLocationSaveFaild')]);
            }
        }
        else if($request->has(['saveCurrencies'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_currencies = website::where('id',$this->website_id)->pluck('currencies')->first();
            $saveCurrencyObj = [];
            foreach($request->saveCurrencies as $key => $val){
                $saveCurrencyObj[$key] = strip_tags($val);
            }
            $saveCurrencies = website::where('id',$this->website_id)->update([
                'currencies' => $saveCurrencyObj,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveCurrencies){
                $activity = null;
                if($old_currencies != $saveCurrencyObj){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.currency_symbol',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_names' => $old_currencies,
                        'new_names' => $saveCurrencyObj,
                    ];
                }
                foodmenuFunctions::notification('settings.currencies',$activity,[
                    'currencies' => $saveCurrencyObj,
                ]);
                return response(['saveCurrencyStatus' =>1,'msg'=> Lang::get('cpanel/settings/responses.currencySaved')]);
            }else{
                return response(['saveCurrencyStatus' =>0,'msg'=> Lang::get('cpanel/settings/responses.currencySaveFail')]);
            }
        }
        else if($request->has(['saveSocailMediaLinks'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_SocailMediaLinks = website::where('id',$this->website_id)->select(['facebookLink','twitterLink','youtubeLink','linkedinLink','instagramLink'])->first();

            $saveSocailMediaLinks = website::where('id',$this->website_id)->update([
                'facebookLink'=>strip_tags($request->facebookLink),
                'twitterLink'=>strip_tags($request->twitterLink),
                'youtubeLink'=>strip_tags($request->youtubeLink),
                'linkedinLink'=>strip_tags($request->linkedinLink),
                'instagramLink'=>strip_tags($request->instagramLink),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveSocailMediaLinks){
                $activity = null;
                if(
                    $old_SocailMediaLinks->facebookLink != strip_tags($request->facebookLink)||
                    $old_SocailMediaLinks->twitterLink != strip_tags($request->twitterLink)||
                    $old_SocailMediaLinks->youtubeLink != strip_tags($request->youtubeLink)||
                    $old_SocailMediaLinks->linkedinLink != strip_tags($request->linkedinLink)||
                    $old_SocailMediaLinks->instagramLink != strip_tags($request->instagramLink)
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.social_media_links',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_names' => [
                            'facebookLink' => $old_SocailMediaLinks->facebookLink,
                            'twitterLink' => $old_SocailMediaLinks->twitterLink,
                            'youtubeLink' => $old_SocailMediaLinks->youtubeLink,
                            'linkedinLink' => $old_SocailMediaLinks->linkedinLink,
                            'instagramLink' => $old_SocailMediaLinks->instagramLink,
                        ],
                        'new_names' => [
                            'facebookLink' => strip_tags($request->facebookLink),
                            'twitterLink' => strip_tags($request->twitterLink),
                            'youtubeLink' => strip_tags($request->youtubeLink),
                            'linkedinLink' => strip_tags($request->linkedinLink),
                            'instagramLink' => strip_tags($request->instagramLink),
                        ],
                    ];
                }
                foodmenuFunctions::notification('settings.socailMediaLinks',$activity,[
                    'facebookLink' => strip_tags($request->facebookLink),
                    'twitterLink' => strip_tags($request->twitterLink),
                    'youtubeLink' => strip_tags($request->youtubeLink),
                    'linkedinLink' => strip_tags($request->linkedinLink),
                    'instagramLink' => strip_tags($request->instagramLink),
                ]);

                return response(['saveSocailMediaLinksStatus'=>1,'msg'=> Lang::get('cpanel/settings/responses.saveSocialMediaLinksSaved')]);
            }else{
                return response(['saveSocailMediaLinksStatus'=>0,'msg'=> Lang::get('cpanel/settings/responses.saveSocialMediaLinksSaveFaild')]);
            }
        }
        else if($request->has(['saveWebsiteAnnouncements'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_names = website::where('id',$this->website_id)->pluck('website_announcements')->first();
            $saveWebsiteAnnouncementsObj = [];
            foreach($request->saveWebsiteAnnouncements as $key => $val){
                $saveWebsiteAnnouncementsObj[$key] = strip_tags($val);
            }
            $saveWebsiteAnnouncements = website::where('id',$this->website_id)->update([
                'website_announcements'=> $saveWebsiteAnnouncementsObj,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsiteAnnouncements){
                $activity = null;
                if($old_names != $saveWebsiteAnnouncementsObj){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.website_announcement',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_names' => $old_names,
                        'new_names' => $saveWebsiteAnnouncementsObj
                    ];
                }
                foodmenuFunctions::notification('settings.websiteAnnouncements',$activity,[
                    'website_announcements' => $saveWebsiteAnnouncementsObj,
                ]);
                return response(['saveWebsiteAnnouncement' => 1,'msg'=>Lang::get('cpanel/settings/responses.announcementSaved')]);
            }else{
                return response(['saveWebsiteAnnouncement' => 0,'msg'=>Lang::get('cpanel/settings/responses.announcementSaveFail')]);
            }
        }
        else if($request->has(['saveWebsiteReceiptMsgs'])){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_names = website::where('id',$this->website_id)->pluck('website_receiptMsgs')->first();
            $saveWebsiteReceiptMsgsObj = [];
            foreach($request->saveWebsiteReceiptMsgs as $key => $val){
                $saveWebsiteReceiptMsgsObj[$key] = strip_tags($val);
            }
            $saveWebsiteReceiptMsgs = website::where('id',$this->website_id)
                                                    ->update([
                                                        'website_receiptMsgs'=>$saveWebsiteReceiptMsgsObj,
                                                        'updated_at' => Carbon::now()->timestamp,
                                                    ]);
            if($saveWebsiteReceiptMsgs){
                $activity = null;
                if($old_names != $saveWebsiteReceiptMsgsObj){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.restaurant_info.receipt_footer_message',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_names' => $old_names,
                        'new_names' => $saveWebsiteReceiptMsgsObj,
                    ];
                }
                foodmenuFunctions::notification('settings.receiptMsgs',$activity,[
                    'website_receiptMsgs' => $saveWebsiteReceiptMsgsObj,
                ]);
                return response(['saveWebsiteReceiptMsgs' => 1,'msg'=>Lang::get('cpanel/settings/responses.receiptMsgSaved')]);
            }else{
                return response(['saveWebsiteReceiptMsgs' => 0,'msg'=>Lang::get('cpanel/settings/responses.receiptMsgSaveFaild')]);
            }
        }

        else if($request->has('getPromocodes')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $promocodes = promocode::where('website_id',$this->website_id)->get();
            return response(['promocodes'=>$promocodes]);
        }
        else if($request->has('promoCodeActive')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $promoCodeActive = promocode::where(['website_id' => $this->website_id,'id'=> $request->promoCodeActive,'code' => $request->promocode])->update([
                'is_active' => $request->is_active,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($promoCodeActive){
                foodmenuFunctions::notification('settings.promoCodeActive',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.promocode.activity_status',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'promocode_name' => $request->promocode,
                    'promocode_id' => $request->promoCodeActive,
                    'is_active' => $request->is_active,
                ],[
                    'codeId' => $request->promoCodeActive,
                    'is_active' => $request->is_active,
                ]);
                return response(['promoCodeActiveStat' => 1 , 'msg' => Lang::get('cpanel/settings/responses.PromoCodeActiveChanged')]);

            }else{
                return response(['promoCodeActiveStat' => 0 , 'msg' => Lang::get('cpanel/settings/responses.PromoCodeActiveChangeFail')]);
            }
        }
        else if($request->has('deletePromocode')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $deletecode = promocode::where(['website_id' => $this->website_id, 'id' => $request->deletePromocode,'code' => $request->promocode])->delete();
            if($deletecode){
                foodmenuFunctions::notification('settings.deletePromocode',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.promocode.deleted',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'promocode_name' => $request->promocode,
                    'promocode_id' => $request->deletePromocode,
                ],[
                    'codeId' => $request->deletePromocode,
                ]);
                return response(['deletePromocodestats' => 1,'msg' => Lang::get('cpanel/settings/responses.promocodeDeleted')]);
            }else{
                return response(['deletePromocodestats' => 0,'msg' => Lang::get('cpanel/settings/responses.promocodeDeletedfail')]);
            }
        }
        else if($request->has('createNewPromocode')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $websitedata = website::where('id',$this->website_id)->select(['plan','timeZone'])->first();
            if($request->is_expires == 1){
                $expires_at = Carbon::createFromFormat('Y-m-d H:i:s', $request->year.'-'.$request->month.'-'.$request->day.' 00:00:00')->timestamp;
            }else{$expires_at = null;}
            if(
                foodmenuFunctions::plans()[$websitedata->plan]['promocodes']
                <= promocode::where('website_id',$this->website_id)->count()
            ){
                return response(['createNewPromocodeStat' => 2]);
            }
            if($request->createNewPromocode == null || $request->createNewPromocode == ''){
                return response(['createNewPromocodeStat' => 3,'msg' => Lang::get('cpanel/settings/responses.codeRequired')]);
            }
            if(promocode::where(['website_id'=>$this->website_id,'code' => $request->createNewPromocode])->count() > 0){
                return response(['createNewPromocodeStat' => 3,'msg' => Lang::get('cpanel/settings/responses.codeUniqe')]);
            }
            $promocode = promocode::create([
                'website_id' => $this->website_id,
                'code' => $request->createNewPromocode,
                'is_active'=>true,
                'is_delivery' => $request->is_delivery,
                'is_pickup' => $request->is_pickup,
                'is_guest' => $request->is_guest,
                'is_oneUse' => $request->is_oneUse,
                'is_expires' => $request->is_expires,
                'expires_at' => $expires_at,
                'discount' => $request->discount,
                'minimum' => $request->minimum,
                'cap' => $request->cap,
            ]);
            if($promocode){
                foodmenuFunctions::notification('settings.createPromocode',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.promocode.created',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'promocode_name' => $promocode->code,
                    'promocode_id' => $promocode->id,
                ],[
                    'promocode' => $promocode,
                ]);
                return response(['createNewPromocodeStat' => 1,'msg' => Lang::get('cpanel/settings/responses.promocodeCreated'), 'promocode' => $promocode]);
            }else{
                return response(['createNewPromocodeStat' => 0,'msg' => Lang::get('cpanel/settings/responses.promocodeCreateFail')]);
            }
        }
        else if($request->has('editPromocode')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $websitedata = website::where('id',$this->website_id)->select(['plan','timeZone'])->first();
            if($request->is_expires == 1){
                $expires_at = Carbon::createFromFormat('Y-m-d H:i:s', $request->year.'-'.$request->month.'-'.$request->day.' 00:00:00')->timestamp;
            }else{$expires_at = null;}

            $promocode = promocode::where(['website_id'=>$this->website_id,'id'=>$request->editPromocode])->first();
            $old_promocode = [
                'discount' => $promocode->discount,
                'is_expires' => $promocode->is_expires,
                'expires_at' => $promocode->expires_at,
                'minimum' => $promocode->minimum,
                'cap' => $promocode->cap,
                'is_oneUse' => $promocode->is_oneUse,
                'is_delivery' => $promocode->is_delivery,
                'is_pickup' => $promocode->is_pickup,
                'is_guest' => $promocode->is_guest,
            ];
            $promocodeSave = $promocode->update([
                'discount' => $request->discount,
                'is_expires' => $request->is_expires,
                'expires_at' => $expires_at,
                'minimum' => $request->minimum,
                'cap' => $request->cap,
                'is_oneUse' => $request->is_oneUse,
                'is_delivery' => $request->is_delivery,
                'is_pickup' => $request->is_pickup,
                'is_guest' => $request->is_guest,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($promocodeSave){
                $activity = null;
                if(
                    $old_promocode['discount'] != $request->discount ||
                    $old_promocode['is_expires'] != $request->is_expires ||
                    $old_promocode['expires_at'] != $expires_at ||
                    $old_promocode['minimum'] != $request->minimum ||
                    $old_promocode['cap'] != $request->cap ||
                    $old_promocode['is_oneUse'] != $request->is_oneUse ||
                    $old_promocode['is_delivery'] != $request->is_delivery ||
                    $old_promocode['is_pickup'] != $request->is_pickup ||
                    $old_promocode['is_guest'] != $request->is_guest
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.promocode.edit',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'promocode_name' => $request->code,
                        'promocode_id' => $request->editPromocode,
                        'old_promocode' => $old_promocode,
                        'new_promocode' => [
                            'discount' => $request->discount,
                            'is_expires' => $request->is_expires,
                            'expires_at' => $expires_at,
                            'minimum' => $request->minimum,
                            'cap' => $request->cap,
                            'is_oneUse' => $request->is_oneUse,
                            'is_delivery' => $request->is_delivery,
                            'is_pickup' => $request->is_pickup,
                            'is_guest' => $request->is_guest,
                        ]
                        ];
                }
                foodmenuFunctions::notification('settings.editPromocode',$activity,[
                    'codeId' => $request->editPromocode,
                    'codeCode' => $request->code,
                    'discount' => $request->discount,
                    'expires_at' => $expires_at,
                    'is_expires' => $request->is_expires,
                    'minimum' => $request->minimum,
                    'cap' => $request->cap,
                    'is_oneUse' => $request->is_oneUse,
                    'is_delivery' => $request->is_delivery,
                    'is_pickup' => $request->is_pickup,
                    'is_guest' => $request->is_guest,
                ]);
                return response(['editPromocodeStat' => 1,'msg' => Lang::get('cpanel/settings/responses.promocodeEdited')]);
            }else{
                return response(['editPromocodeStat' => 0,'msg' => Lang::get('cpanel/settings/responses.promocodeEditFail')]);
            }
        }

        else if($request->has('saveViewSettings')){
            $saveViewSettings = cpanelSettings::where('account_id',$this->account->id)
            ->update([
                'bigSideMenu' => $request->bigSideMenu,
                'darkMode' => $request->darkMode,
                'statusBar' => $request->statusBar,
                'hotKeys' => $request->hotKeys,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveViewSettings){
                return response(['saveViewSettingsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.viewSettingsSaved')]);
            }else{
                return response(['saveViewSettingsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.viewSettingsSaveFail')]);
            }
        }
        else if($request->has('saveGuideMode')){
            $saveGuideMode = cpanelSettings::where('account_id',$this->account->id)
                ->update([
                    'guideMode' => $request->guideMode,
                    'autoHelp' => $request->autoHelp,
                    'helpIcons' => $request->helpIcons,
                    'guideHints' => $request->guideHints,
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveGuideMode){
                return response(['saveGuideModeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.guideModeSaved')]);
            }else{
                return response(['saveGuideModeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.guideModeSaveFail')]);
            }
        }
        else if($request->has('saveControlSettings')){
            $saveControlSettings = cpanelSettings::where('account_id',$this->account->id)
                    ->update([
                        'tooltip' => $request->tooltip,
                        'oneAlert' => $request->oneAlert,
                        'dClickConfirm' => $request->dClickConfirm,
                        'shareReminder' => $request->shareReminder,
                        'chatPopup' => $request->chatPopup,
                        'updated_at' => Carbon::now()->timestamp,
                    ]);
            if($saveControlSettings){
                return response(['saveControlSettingsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.controlSettingsSaved')]);
            }else{
                return response(['saveControlSettingsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.controlSettingsSaveFail')]);
            }
        }
        else if($request->has('saveAlertNotifications')){
            $saveAlertNotifications = cpanelSettings::where('account_id',$this->account->id)
                ->update([
                    'NewOrderAlerts' => $request->NewOrderAlerts,
                    'DeliveredOrderAlerts' => $request->DeliveredOrderAlerts,
                    'NewUserAlerts' => $request->NewUserAlerts,
                    'NewReviewAlerts' => $request->NewReviewAlerts,
                    'CanceledOrderAlerts' => $request->CanceledOrderAlerts,
                    'onlineUserAlert' => $request->onlineUserAlert,
                    'onlineGuestAlert' => $request->onlineGuestAlert,
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveAlertNotifications){
                return response(['saveAlertNotificationsStatus'=>1,'msg' => Lang::get('cpanel/settings/responses.alertNotificationsSaved')]);
            }else{
                return response(['saveAlertNotificationsStatus'=>0,'msg' => Lang::get('cpanel/settings/responses.alertNotificationsSaveFail')]);
            }
        }
        else if($request->has('muteChat')){
            cpanelSettings::where('account_id',$this->account->id)->update(['muteChat'=>(int)$request->muteChat]);
        }

        else if($request->has('getLangs')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $langs = foodmenuFunctions::languages();
            return response(['langs' => $langs]);
        }
        else if($request->has('addLang')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages','plan','template_id')->first();
            $websitePlan = foodmenuFunctions::plans()[$website->plan]['websiteLangs'];
            if(count($website->languages) + 1 > $websitePlan){
                return response(['addLangStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.planLangLimitError')]);
            }
            foreach($website->languages as $lang){
                if($lang['code'] == $request->addLang){
                    return response('',500);
                }
            }
            $addLang = foodmenuFunctions::languages()[$request->addLang];
            $newLang = [
                'code' => $addLang['code'],
                'flag' => $addLang['flag'],
                'name' => $addLang['name'],
                'receiptDefault' => false,
                'websiteDefault' => false,
            ];
            $websiteLangs = $website->languages;
            $websiteLangs[$addLang['code']] = $newLang;
            $saveWebsite = website::where('id',$this->website_id)->update(['languages'=> $websiteLangs]);
            if($saveWebsite){
                $new_lang_text = websiteText::create(['website_id'=>$this->website_id,'lang'=>$addLang['code'],'text'=>foodmenuFunctions::defaultLanguageText($addLang['code'])]);

                $template = template::where('_id',$website->template_id)->first()->encode();
                (new generate_js)->generate($template,$new_lang_text->lang,$new_lang_text->text,$new_lang_text->lang);
                (new generate_css)->generate($template,$new_lang_text->lang);


                foodmenuFunctions::notification('settings.installLang',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.language.installed',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'lang_code' => $addLang['code'],
                    'lang_name' => $addLang['name'],
                ],[
                    'lang' => $newLang,
                ]);
                return response(['addLangStats'=>1,'msg'=>Lang::get('cpanel/settings/responses.newLangAdded'),'lang'=>$newLang]);
            }else{
                return response(['addLangStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.failedToAddLang')]);
            }
        }
        else if($request->has('setLangDefault')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $websiteLangs = $website->languages;
            $thisLang;
            foreach($websiteLangs as $key => $lang){
                $websiteLangs[$key]['websiteDefault'] = false;
                if($lang['code'] == $request->setLangDefault){
                    $thisLang = $lang;
                    $websiteLangs[$key]['websiteDefault'] = true;
                }
            }
            $saveWebsite = website::where('id',$this->website_id)->update([
                'languages'=> $websiteLangs,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsite){
                foodmenuFunctions::notification('settings.defaultLang',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.language.website_default',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'lang_code' => $thisLang['code'],
                    'lang_name' => $thisLang['name']
                ],[
                    'lang' => $request->setLangDefault,
                ]);
                return response(['setLangDefaultStats'=>1,'msg'=> Lang::get('cpanel/settings/responses.setLangDefaultSaved')]);
            }else{
                return response(['setLangDefaultStats'=>0,'msg'=> Lang::get('cpanel/settings/responses.setLangDefaultFail')]);
            }
        }
        else if($request->has('setReceiptLang')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $websiteLangs = $website->languages;
            $thisLang;
            foreach($websiteLangs as $key => $lang){
                $websiteLangs[$key]['receiptDefault'] = false;
                if($lang['code'] == $request->setReceiptLang){
                    $thisLang = $lang;
                    $websiteLangs[$key]['receiptDefault'] = true;
                }
            }
            $saveWebsite = website::where('id',$this->website_id)->update([
                'languages'=> $websiteLangs,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsite){
                foodmenuFunctions::notification('settings.receiptLang',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.language.receipt_default',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'lang_code' => $thisLang['code'],
                    'lang_name' => $thisLang['name']
                ],[
                    'lang' => $request->setReceiptLang,
                ]);
                return response(['setReceiptLangStats'=>1,'msg'=>Lang::get('cpanel/settings/responses.setReceiptLangSaved')]);
            }else{
                return response(['setReceiptLangStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.setReceiptLangFail')]);
            }
        }
        else if($request->has('deleteLang')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $thisLang;
            foreach($website->languages as $key => $lang){
                if($lang['code'] == $request->deleteLang){
                    $thisLang = $lang;
                    if($lang['websiteDefault']){
                        return response('',500);
                    }
                    if($lang['receiptDefault']){
                        return response('',500);
                    }
                }else{
                    $websiteLangs[$key] = $lang;
                }
            }
            $saveWebsite = website::where('id',$this->website_id)->update([
                'languages'=> $websiteLangs,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsite){
                websiteText::where(['website_id'=>$this->website_id,'lang'=>$thisLang['code']])->delete();

                (new generate_js)->delete_lang_dir($thisLang['code'],$this->website_id);
                (new generate_css)->delete_lang_dir($thisLang['code'],$this->website_id);

                foodmenuFunctions::notification('settings.deleteLang',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.language.deleted',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'lang_code' => $thisLang['code'],
                    'lang_name' => $thisLang['name'],
                ],[
                    'lang' => $thisLang['code'],
                ]);

                return response(['deleteLangStats'=>1,'msg'=>Lang::get('cpanel/settings/responses.deleteLangSaved')]);
            }else{
                return response(['deleteLangStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.deleteLangFail')]);
            }
        }
        else if($request->has('createCustomLang')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $foodmenuLangs = foodmenuFunctions::languages();
            $langPack = null;
            foreach($foodmenuLangs as $lang){
                if($request->pack == $lang['code']){
                    $langPack = $lang['code'];
                }
            }
            if($langPack == null){
                return response('',500);
            }
            $website = website::where('id',$this->website_id)->select(['languages','template_id'])->first();
            $websiteLangs = $website->languages;
            foreach($website->languages as $lang){
                if($lang['code'] == $request->code){
                    return response(['createCustomLangStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.customLangCodeUnique')]);
                }
            }
            $newLang = [
                'code' => strip_tags($request->code),
                'flag' => strip_tags($request->flag),
                'name' => strip_tags($request->name),
                'receiptDefault' => false,
                'websiteDefault' => false,
            ];
            $websiteLangs[$request->code] = $newLang;
            $saveWebsite = website::where('id',$this->website_id)->update([
                'languages'=> $websiteLangs,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsite){
                $new_lang_text = websiteText::create(['website_id'=>$this->website_id,'lang'=>strip_tags($request->code),'text'=>foodmenuFunctions::defaultLanguageText($langPack)]);

                $template = template::where('_id',$website->template_id)->first()->encode();
                (new generate_js)->generate($template,$new_lang_text->lang,$new_lang_text->text,$new_lang_text->lang);
                (new generate_css)->generate($template,$new_lang_text->lang);

                foodmenuFunctions::notification('settings.installLang',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.language.custom_installed',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'lang_code' => $request->code,
                    'lang_name' => $request->name,
                ],[
                    'lang' => $newLang,
                ]);
                return response(['createCustomLangStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.customLangCreated'),'lang'=>$newLang]);
            }else{
                return response(['createCustomLangStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.customLangCreateFaile')]);
            }
        }
        else if($request->has('editLangOptions')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $websiteLangs = $website->languages;

            foreach($websiteLangs as $key => $lang){
                if($lang['code'] == $request->editLangOptions){
                    $websiteLangs[$key]['name'] = $request->name;
                    $websiteLangs[$key]['flag'] = $request->flag;
                    $old_lang = [
                        'name' => $lang['name'],
                        'flag' => $lang['flag'],
                    ];
                }
            }
            $saveWebsite = website::where('id',$this->website_id)->update([
                'languages'=> $websiteLangs,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsite){
                $activity = null;
                if(
                    $old_lang['name'] != $request->name ||
                    $old_lang['flag'] != $request->flag
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.language.edit_options',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'lang_code' => $request->editLangOptions,
                        'lang_name' => $request->name,
                        'old_lang' => $old_lang,
                        'new_lang' =>[
                            'name' => $request->name,
                            'flag' => $request->flag,
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.editLangOptions',$activity,[
                    'lang' => $request->editLangOptions,
                    'name' => $request->name,
                    'flag' => $request->flag,
                    'languages' => $websiteLangs,
                ]);
                return response(['editLangOptionsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.editLangOptionsSaved')]);
            }else{
                return response(['editLangOptionsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.editLangOptionsSaveFail')]);
            }
        }
        else if($request->has(['getLangTexts'])){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $texts = websiteText::where(['website_id'=>$this->website_id ,'lang'=>$request->getLangTexts])->first();
            return response($texts);
        }
        else if($request->has(['saveLangText'])){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $LangTexts = [
                'authentication' => [],
                'orders' => [],
                'reviews' => [],
                'liveChat' => [],
                'other' => [],
                'receipt' => [],
            ];
            foreach($request->saveLangText['authentication'] as $key => $val){
                $LangTexts['authentication'][$key] = strip_tags($val);
            }
            foreach($request->saveLangText['orders'] as $key => $val){
                $LangTexts['orders'][$key] = strip_tags($val);
            }
            foreach($request->saveLangText['reviews'] as $key => $val){
                $LangTexts['reviews'][$key] = strip_tags($val);
            }
            foreach($request->saveLangText['liveChat'] as $key => $val){
                $LangTexts['liveChat'][$key] = strip_tags($val);
            }
            foreach($request->saveLangText['receipt'] as $key => $val){
                $LangTexts['receipt'][$key] = strip_tags($val);
            }
            foreach($request->saveLangText['other'] as $key => $val){
                $LangTexts['other'][$key] = strip_tags($val);
            }
            $saveLanagText = websiteText::where(['website_id'=>$this->website_id,'lang'=>$request->lang])->update([
                'text' => $LangTexts,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveLanagText){
                $website= website::where('id',$this->website_id)->select(['template_id'])->first();
                $template = template::where('_id',$website->template_id)->first()->encode();
                (new generate_js)->generate($template,$request->lang,$LangTexts,null);
                (new generate_css)->generate($template,$request->lang);


                foodmenuFunctions::notification('settings.saveLangText',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.language.edit_texts',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'lang_code' => $request->lang,
                    'lang_name' => $request->langName
                ],[
                    'lang' => $request->lang,
                ]);
                return response(['saveLangTextStatus' => 1,'msg'=> Lang::get('cpanel/settings/responses.langTextSaved')]);
            }else{
                return response(['saveLangTextStatus' => 0,'msg'=> Lang::get('cpanel/settings/responses.langTextSaveFailed')]);
            }
        }
        ////////////
        else if($request->has('saveDineinServiceSettings')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $dinein_Settings = website::where('id',$this->website_id)->select(['useDineInServiceCost','dineInServiceCost','dineInServicePercentage'])->first();
            $old_dinein_settings = [
                'useDineInServiceCost' => $dinein_Settings->useDineInServiceCost,
                'dineInServiceCost' => $dinein_Settings->dineInServiceCost,
                'dineInServicePercentage' => $dinein_Settings->dineInServicePercentage,
            ];
            $saveDineinSettings = website::where('id',$this->website_id)->update([
                'useDineInServiceCost'=>$request->useDineInServiceCost,
                'dineInServiceCost'=>strip_tags($request->dineInServiceCost),
                'dineInServicePercentage'=>strip_tags($request->dineInServicePercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDineinSettings){
                $activity = null;
                if(
                    $old_dinein_settings['useDineInServiceCost'] != $request->useDineInServiceCost ||
                    $old_dinein_settings['dineInServiceCost'] != strip_tags($request->dineInServiceCost) ||
                    $old_dinein_settings['dineInServicePercentage'] != strip_tags($request->dineInServicePercentage)
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.dinein.service',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_dinein_settings' => $old_dinein_settings,
                        'new_dinein_settings' => [
                            'useDineInServiceCost' => $request->useDineInServiceCost,
                            'dineInServiceCost' => strip_tags($request->dineInServiceCost),
                            'dineInServicePercentage' => strip_tags($request->dineInServicePercentage),
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.dineinServiceSettings',$activity,[
                    'useDineInServiceCost' => $request->useDineInServiceCost,
                    'dineInServiceCost' => strip_tags($request->dineInServiceCost),
                    'dineInServicePercentage' => strip_tags($request->dineInServicePercentage),
                ]);
                return response(['dineinServiceSettingsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.dineInSettingsSaved')]);
            }else{
                return response(['dineinServiceSettingsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.dineInSettingsSaveFaild')]);
            }
        }
        else if($request->has('saveDineinTaxSettings')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $dinein_Settings = website::where('id',$this->website_id)->select(['useDineInTaxCost','dineInTaxCost','dineInTaxPercentage'])->first();
            $old_dinein_settings = [
                'useDineInTaxCost' => $dinein_Settings->useDineInTaxCost,
                'dineInTaxCost' => $dinein_Settings->dineInTaxCost,
                'dineInTaxPercentage' => $dinein_Settings->dineInTaxPercentage,
            ];
            $saveDineinSettings = website::where('id',$this->website_id)->update([
                'useDineInTaxCost'=>$request->useDineInTaxCost,
                'dineInTaxCost'=>strip_tags($request->dineInTaxCost),
                'dineInTaxPercentage'=>strip_tags($request->dineInTaxPercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDineinSettings){
                $activity = null;
                if(
                    $old_dinein_settings['useDineInTaxCost'] != $request->useDineInTaxCost ||
                    $old_dinein_settings['dineInTaxCost'] != strip_tags($request->dineInTaxCost) ||
                    $old_dinein_settings['dineInTaxPercentage'] != strip_tags($request->dineInTaxPercentage)
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.dinein.tax',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_dinein_settings' => $old_dinein_settings,
                        'new_dinein_settings' => [
                            'useDineInTaxCost' => $request->useDineInTaxCost,
                            'dineInTaxCost' => strip_tags($request->dineInTaxCost),
                            'dineInTaxPercentage' => strip_tags($request->dineInTaxPercentage),
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.dineinTaxSettings',$activity,[
                    'useDineInTaxCost' => $request->useDineInTaxCost,
                    'dineInTaxCost' => strip_tags($request->dineInTaxCost),
                    'dineInTaxPercentage' => strip_tags($request->dineInTaxPercentage),
                ]);
                return response(['dineinTaxSettingsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.dineInSettingsSaved')]);
            }else{
                return response(['dineinTaxSettingsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.dineInSettingsSaveFaild')]);
            }
        }
        ///////////
        else if($request->has('saveAveragePickupTime')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $old_pickupSettings = website::where('id',$this->website_id)->pluck('averagePickupTime')->first();
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'averagePickupTime'=>$request->averagePickupTime,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                $activity = null;
                if($old_pickupSettings != $request->averagePickupTime){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.pickup.averagePickupTime',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_pickup_settings' => $old_pickupSettings,
                        'new_pickup_settings' => $request->averagePickupTime
                    ];
                }
                foodmenuFunctions::notification('settings.averagePickupTime',$activity,[
                    'averagePickupTime' => $request->averagePickupTime,
                ]);
                return response(['averagePickupTimeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaved')]);
            }else{
                return response(['averagePickupTimeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaveFaild')]);
            }
        }
        else if($request->has('savePickupPaymentMethods')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $pickupSettings = website::where('id',$this->website_id)->select(['cash_at_restaurant','card_at_restaurant'])->first();
            $old_pickup_settings = ['cash_at_restaurant'=>$pickupSettings->cash_at_restaurant,'card_at_restaurant'=>$pickupSettings->card_at_restaurant];
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'cash_at_restaurant'=>$request->cash_at_restaurant,
                'card_at_restaurant'=>$request->card_at_restaurant,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                $activity = null;
                if(
                    $old_pickup_settings['cash_at_restaurant'] != $request->cash_at_restaurant ||
                    $old_pickup_settings['card_at_restaurant'] != $request->card_at_restaurant
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.pickup.paymentMethods',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_pickup_settings' => $old_pickup_settings,
                        'new_pickup_settings' => [
                            'cash_at_restaurant' => $request->cash_at_restaurant,
                            'card_at_restaurant' => $request->card_at_restaurant,
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.pickupPaymentMethods',$activity,[
                    'cash_at_restaurant' => $request->cash_at_restaurant,
                    'card_at_restaurant' => $request->card_at_restaurant,
                ]);
                return response(['pickupPaymentMethodsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaved')]);
            }else{
                return response(['pickupPaymentMethodsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaveFaild')]);
            }
        }
        else if($request->has('savePickupMinimumCharge')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $pickupSettings = website::where('id',$this->website_id)->select(['pickupMinimumCharge','pickupMinimumChargeIncludes'])->first();
            $old_pickup_settings = ['pickupMinimumCharge'=>$pickupSettings->pickupMinimumCharge,'pickupMinimumChargeIncludes'=>$pickupSettings->pickupMinimumChargeIncludes];
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'pickupMinimumCharge'=>strip_tags($request->pickupMinimumCharge),
                'pickupMinimumChargeIncludes'=>$request->pickupMinimumChargeIncludes,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                $activity = null;
                if(
                    $old_pickup_settings['pickupMinimumCharge'] != strip_tags($request->pickupMinimumCharge) ||
                    $old_pickup_settings['pickupMinimumChargeIncludes'] != $request->pickupMinimumChargeIncludes
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.pickup.minimum_charge',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_pickup_settings' => $old_pickup_settings,
                        'new_pickup_settings' => [
                            'pickupMinimumCharge' => strip_tags($request->pickupMinimumCharge),
                            'pickupMinimumChargeIncludes' => $request->pickupMinimumChargeIncludes,
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.pickupMinimumCharge',$activity,[
                    'pickupMinimumCharge' => strip_tags($request->pickupMinimumCharge),
                    'pickupMinimumChargeIncludes' => $request->pickupMinimumChargeIncludes,
                ]);
                return response(['pickupMinimumChargeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaved')]);
            }else{
                return response(['pickupMinimumChargeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaveFaild')]);
            }
        }
        else if($request->has('savePickupTaxSettings')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $pickup_Settings = website::where('id',$this->website_id)->select(['usePickupTaxCost','pickupTaxCost','pickupTaxPercentage'])->first();
            $old_pickup_settings = [
                'usePickupTaxCost' => $pickup_Settings->usePickupTaxCost,
                'pickupTaxCost' => $pickup_Settings->pickupTaxCost,
                'pickupTaxPercentage' => $pickup_Settings->pickupTaxPercentage,
            ];
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'usePickupTaxCost'=>$request->usePickupTaxCost,
                'pickupTaxCost'=>strip_tags($request->pickupTaxCost),
                'pickupTaxPercentage'=>strip_tags($request->pickupTaxPercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                $activity = null;
                if(
                    $old_pickup_settings['usePickupTaxCost'] != $request->usePickupTaxCost ||
                    $old_pickup_settings['pickupTaxCost'] != strip_tags($request->pickupTaxCost) ||
                    $old_pickup_settings['pickupTaxPercentage'] != strip_tags($request->pickupTaxPercentage)
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.pickup.tax',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_pickup_settings' => $old_pickup_settings,
                        'new_pickup_settings' => [
                            'usePickupTaxCost' => $request->usePickupTaxCost,
                            'pickupTaxCost' => strip_tags($request->pickupTaxCost),
                            'pickupTaxPercentage' => strip_tags($request->pickupTaxPercentage),
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.pickupTaxSettings',$activity,[
                    'usePickupTaxCost' => $request->usePickupTaxCost,
                    'pickupTaxCost' => strip_tags($request->pickupTaxCost),
                    'pickupTaxPercentage' => strip_tags($request->pickupTaxPercentage),
                ]);
                return response(['pickupTaxSettingsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaved')]);
            }else{
                return response(['pickupTaxSettingsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaveFaild')]);
            }
        }
        //////////
        else if($request->has('saveDeliveryTaxSettings')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $delivery_settings = website::where('id',$this->website_id)->select(['useDeliveryTaxCost','deliveryTaxCost','deliveryTaxPercentage'])->first();
            $old_delivery_settings = [
                'useDeliveryTaxCost' => $delivery_settings->useDeliveryTaxCost,
                'deliveryTaxCost' => $delivery_settings->deliveryTaxCost,
                'deliveryTaxPercentage' => $delivery_settings->deliveryTaxPercentage,
            ];
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'useDeliveryTaxCost'=>$request->useDeliveryTaxCost,
                'deliveryTaxCost'=>strip_tags($request->deliveryTaxCost),
                'deliveryTaxPercentage'=>strip_tags($request->deliveryTaxPercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                $activity = null;
                if(
                    $old_delivery_settings['useDeliveryTaxCost'] != $request->useDeliveryTaxCost ||
                    $old_delivery_settings['deliveryTaxCost'] != strip_tags($request->deliveryTaxCost) ||
                    $old_delivery_settings['deliveryTaxPercentage'] != strip_tags($request->deliveryTaxPercentage)
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.delivery.tax',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_delivery_settings' => $old_delivery_settings,
                        'new_delivery_settings' => [
                            'useDeliveryTaxCost' => $request->useDeliveryTaxCost,
                            'deliveryTaxCost' => strip_tags($request->deliveryTaxCost),
                            'deliveryTaxPercentage' => strip_tags($request->deliveryTaxPercentage)
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.deliveryTaxSettings',$activity,[
                    'useDeliveryTaxCost' => $request->useDeliveryTaxCost,
                    'deliveryTaxCost' => strip_tags($request->deliveryTaxCost),
                    'deliveryTaxPercentage' => strip_tags($request->deliveryTaxPercentage),
                ]);
                return response(['deliveryTaxSettingsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['deliveryTaxSettingsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        else if($request->has('saveDeliveryMinimumCharge')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $delivery_settings = website::where('id',$this->website_id)->select(['deliveryMinimumCharge','deliveryMinimumChargeIncludes'])->first();
            $old_delivery_settings = [
                'deliveryMinimumCharge' => $delivery_settings->deliveryMinimumCharge,
                'deliveryMinimumChargeIncludes' => $delivery_settings->deliveryMinimumChargeIncludes,
            ];
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'deliveryMinimumCharge'=>strip_tags($request->deliveryMinimumCharge),
                'deliveryMinimumChargeIncludes'=>$request->deliveryMinimumChargeIncludes,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                $activity = null;
                if(
                    $old_delivery_settings['deliveryMinimumCharge'] != strip_tags($request->deliveryMinimumCharge) ||
                    $old_delivery_settings['deliveryMinimumChargeIncludes'] != $request->deliveryMinimumChargeIncludes
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.delivery.minimum_charge',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_delivery_settings' => $old_delivery_settings,
                        'new_delivery_settings' => [
                            'deliveryMinimumCharge' => strip_tags($request->deliveryMinimumCharge),
                            'deliveryMinimumChargeIncludes' => $request->deliveryMinimumChargeIncludes
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.deliveryMinimumCharge',$activity,[
                    'deliveryMinimumCharge' => strip_tags($request->deliveryMinimumCharge),
                    'deliveryMinimumChargeIncludes' => $request->deliveryMinimumChargeIncludes,
                ]);
                return response(['saveDeliveryMinimumChargeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['saveDeliveryMinimumChargeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        else if($request->has('saveDeliveryPaymentMethods')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $delivery_settings = website::where('id',$this->website_id)->select(['cash_on_delivery','card_on_delivery'])->first();
            $old_delivery_settings = [
                'card_on_delivery' => $delivery_settings->card_on_delivery,
                'cash_on_delivery' => $delivery_settings->cash_on_delivery,
            ];
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'cash_on_delivery'=>$request->cash_on_delivery,
                'card_on_delivery'=>$request->card_on_delivery,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                $activity = null;
                if(
                    $old_delivery_settings['card_on_delivery'] != $request->card_on_delivery ||
                    $old_delivery_settings['cash_on_delivery'] != $request->cash_on_delivery
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.delivery.paymentMethods',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_delivery_settings' => $old_delivery_settings,
                        'new_delivery_settings' => [
                            'card_on_delivery' => $request->card_on_delivery,
                            'cash_on_delivery' => $request->cash_on_delivery,
                        ]
                    ];
                }
                foodmenuFunctions::notification('settings.deliveryPaymentMethod',$activity,[
                    'cash_on_delivery' => $request->cash_on_delivery,
                    'card_on_delivery' => $request->card_on_delivery,
                ]);
                return response(['saveDeliveryPaymentMethodsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['saveDeliveryPaymentMethodsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        else if($request->has('saveAverageDeliveryTime')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $delivery_settings = website::where('id',$this->website_id)->select('averageDeliveryTime')->first();
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'averageDeliveryTime'=>$request->averageDeliveryTime,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                $activity = null;
                if($delivery_settings->averageDeliveryTime!= $request->averageDeliveryTime){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.delivery.averageDeliveryTime',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_delivery_settings' => $delivery_settings->averageDeliveryTime,
                        'new_delivery_settings' => $request->averageDeliveryTime,
                    ];
                }
                foodmenuFunctions::notification('settings.averageDeliveryTime',$activity,[
                    'averageDeliveryTime' => $request->averageDeliveryTime,
                ]);
                return response(['averageDeliveryTimeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['averageDeliveryTimeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        else if($request->has('saveDeliveryCost')){
            if(str_split($this->account->authorities)[4] == false){return;}
            $delivery_settings = website::where('id',$this->website_id)->select(['deliveryCost','showDeliveryCostChangable'])->first();
            $old_delivery_settings = ['deliveryCost' => $delivery_settings->deliveryCost,'showDeliveryCostChangable' => $delivery_settings->showDeliveryCostChangable];
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'deliveryCost'=>strip_tags($request->deliveryCost),
                'showDeliveryCostChangable'=>$request->showDeliveryCostChangable,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                $activity = null;
                if(
                    $old_delivery_settings['deliveryCost'] != strip_tags($request->deliveryCost) ||
                    $old_delivery_settings['showDeliveryCostChangable'] != $request->showDeliveryCostChangable
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'settings.delivery.deliveryCost',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'old_delivery_settings' => $old_delivery_settings,
                        'new_delivery_settings' => ['deliveryCost' => strip_tags($request->deliveryCost),'showDeliveryCostChangable'=>$request->showDeliveryCostChangable],
                    ];
                }
                foodmenuFunctions::notification('settings.deliveryCost',$activity,[
                    'deliveryCost' => $request->deliveryCost,
                    'showDeliveryCostChangable' => $request->showDeliveryCostChangable,
                ]);
                return response(['deliveryCostStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['deliveryCostStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        //////////
        else if($request->has('saveWorkingDay')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $working_hours = website::where('id',$this->website_id)->pluck('workingDays_'.$request->service)->first();
            $old_working_hours = $working_hours[$request->saveWorkingDay];
            $saveWorkingDay = website::where('id',$this->website_id)->update([
                'workingDays_'.$request->service.'->'.$request->saveWorkingDay.'->working' =>(boolean) $request->workingHours['working'],
                'workingDays_'.$request->service.'->'.$request->saveWorkingDay.'->working24' => (boolean)$request->workingHours['working24'],
                'workingDays_'.$request->service.'->'.$request->saveWorkingDay.'->from' => strip_tags($request->workingHours['from']),
                'workingDays_'.$request->service.'->'.$request->saveWorkingDay.'->to' => strip_tags($request->workingHours['to']),
                'workingDays_'.$request->service.'->'.$request->saveWorkingDay.'->discount' => strip_tags($request->workingHours['discount']),
                'workingDays_'.$request->service.'->'.$request->saveWorkingDay.'->Dfrom' => strip_tags($request->workingHours['Dfrom']),
                'workingDays_'.$request->service.'->'.$request->saveWorkingDay.'->Dto' => strip_tags($request->workingHours['Dto']),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            $activity = null;
            if(
                $old_working_hours['working'] != $request->workingHours['working'] ||
                $old_working_hours['working24'] != $request->workingHours['working24'] ||
                $old_working_hours['from'] != $request->workingHours['from'] ||
                $old_working_hours['to'] != $request->workingHours['to'] ||
                $old_working_hours['discount'] != $request->workingHours['discount'] ||
                $old_working_hours['Dfrom'] != $request->workingHours['Dfrom'] ||
                $old_working_hours['Dto'] != $request->workingHours['Dto']
            ){
                $activity = [
                    'website_id' => $this->website_id,
                    'code' => 'settings.service.workingHours',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'day' => $request->saveWorkingDay,
                    'service' => $request->service,
                    'old_working_hours' => $old_working_hours,
                    'new_working_hours' => [
                        'working' => (boolean)$request->workingHours['working'],
                        'working24' => (boolean)$request->workingHours['working24'],
                        'from' => strip_tags($request->workingHours['from']),
                        'to' => strip_tags($request->workingHours['to']),
                        'discount' => strip_tags($request->workingHours['discount']),
                        'Dfrom' => strip_tags($request->workingHours['Dfrom']),
                        'Dto' => strip_tags($request->workingHours['Dto'])
                    ]
                ];
            }
            if($saveWorkingDay){
                foodmenuFunctions::notification('settings.workingDay',$activity,[
                    'day' => $request->saveWorkingDay,
                    'service' => $request->service,
                    'workingHours' => [
                        'working' =>(boolean) $request->workingHours['working'],
                        'working24' => (boolean)$request->workingHours['working24'],
                        'from' => strip_tags($request->workingHours['from']),
                        'to' => strip_tags($request->workingHours['to']),
                        'discount' => strip_tags($request->workingHours['discount']),
                        'Dfrom' => strip_tags($request->workingHours['Dfrom']),
                        'Dto' => strip_tags($request->workingHours['Dto']),
                    ],
                ]);
                return response(['saveWorkingDayStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.workingDaySaved')]);
            }else{
                return response(['saveWorkingDayStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.workingDaySaveFail')]);
            }
        }
        else if($request->has('copyWorkingDays')){
            if(str_split($this->account->authorities)[4] == false){
                return;
            }
            $updateWorkingdays = [];
            foreach($request->copyTo as $day){
                if($request->copyHours == 1){
                    $updateWorkingdays['workingDays_'.$request->service.'->'.$day.'->working'] = (boolean) $request->workingHours['working'];
                    $updateWorkingdays['workingDays_'.$request->service.'->'.$day.'->working24'] = (boolean) $request->workingHours['working24'];
                    $updateWorkingdays['workingDays_'.$request->service.'->'.$day.'->from'] = strip_tags($request->workingHours['from']);
                    $updateWorkingdays['workingDays_'.$request->service.'->'.$day.'->to'] = strip_tags($request->workingHours['to']);
                }
                if($request->copyDiscount == 1){
                    $updateWorkingdays['workingDays_'.$request->service.'->'.$day.'->discount'] = strip_tags($request->workingHours['discount']);
                    $updateWorkingdays['workingDays_'.$request->service.'->'.$day.'->Dfrom'] = strip_tags($request->workingHours['Dfrom']);
                    $updateWorkingdays['workingDays_'.$request->service.'->'.$day.'->Dto'] = strip_tags($request->workingHours['Dto']);
                }
            }
            $updateWorkingdays['updated_at'] = Carbon::now()->timestamp;
            $saveWorkingDay = website::where('id',$this->website_id)->update($updateWorkingdays);
            if($saveWorkingDay){
                foodmenuFunctions::notification('settings.copyWorkingDays',[
                    'website_id' => $this->website_id,
                    'code' => 'settings.service.workingDays',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'service' => strip_tags($request->service)
                ],[
                    'copyTo' => $request->copyTo,
                    'service' => $request->service,
                    'copyHours' => $request->copyHours,
                    'copyDiscount' => $request->copyDiscount,
                    'workingHours' => [
                        'working' =>(boolean) $request->workingHours['working'],
                        'working24' => (boolean)$request->workingHours['working24'],
                        'from' => strip_tags($request->workingHours['from']),
                        'to' => strip_tags($request->workingHours['to']),
                        'discount' => strip_tags($request->workingHours['discount']),
                        'Dfrom' => strip_tags($request->workingHours['Dfrom']),
                        'Dto' => strip_tags($request->workingHours['Dto']),
                    ]
                ]);
                return response(['copyWorkingDaysStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.copyWorkingDaysSaved')]);
            }else{
                return response(['copyWorkingDaysStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.copyWorkingDaysSavefail')]);
            }
        }
        //////////
        else if($request->has('saveHelpTips')){
            Account::where('id',$this->account->id)->update([
                'helpTips'=>$request->saveHelpTips,
                'updated_at' => Carbon::now()->timestamp,
            ]);
        }
        //////////////////////
        else if($request->has('add_user_domain')){

            $validator = Validator::make([
                'domain' => $request->add_user_domain,
            ],[
                'domain' => 'required|regex:/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i',

            ]);

            if($validator->fails()){
                return response(['status' => '0', 'msg'=> Lang::get('cpanel/settings/responses.domain_required')]);
            }
            $domain = parse_url($request->add_user_domain, PHP_URL_HOST) ?: $request->add_user_domain;

            $add_domain = Http::withToken(env('CLOUDFLARE_KEY'))->post("https://api.cloudflare.com/client/v4/zones", [
                'name'       => $domain,
                'account'    => ['id' => env('CLOUDFLARE_ID')],
                'jump_start' => true,
            ]);

            if($add_domain['success'] == false){
                return response(['status' => '0', 'msg'=> Lang::get('cpanel/settings/responses.domain_add_fail')]);
            }
            
            $user_domainNameServers = $add_domain['result']['name_servers'];
            $update_website = website::where('id',$this->website_id)->update([
                'user_domainName' => $domain,
                'user_domainNameServers' => $user_domainNameServers,                    
                
            ]);
            if($update_website){
                return response([
                    'status' => 1,
                    'msg' => Lang::get('cpanel/settings/responses.domain_added'),
                    'user_domainName' => $domain,
                    'user_domainNameServers' => $user_domainNameServers,                    
                ]);
            }else{
                return response(['status' => 0, 'msg' => Lang::get('cpanel/settings/responses.domain_save_website_fail')]);
            }


        }
        else if($request->has('check_domain_nameservers')){
            try{
                $current_nameservers = dns_get_record($domain,DNS_NS);
            }catch (\Exception $e){
                $current_nameservers = null;
            }
            
            $response = Http::withToken(env('CLOUDFLARE_KEY'))->get("https://api.cloudflare.com/client/v4/zones", [
                'name' => 'huohuade.ch',
                'account' => ['id' => env('CLOUDFLARE_ID')],
            ]);
        }
    }
}
