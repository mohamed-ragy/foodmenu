<?php

namespace App\Http\Controllers\cpanel;

use App\Events\cpanel;
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
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use App\Models\websiteText;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use stdClass;

class settingsController extends Controller
{
    protected $website_id;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->website_id = Auth::guard('account')->user()->website_id;
            App::setlocale(Auth::guard('account')->user()->language);
            return $next($request);
        });
        // Carbon::setLocale('en');
        // Responser::error(400, 'damn')
    }
    public function settings(Request $request)
    {
        if($request->has(['websiteSwitch'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            if($request->websiteSwitch == 1){
                $websiteStatus = website::where('id',$this->website_id)->pluck('subscription_status')->first();
                if($websiteStatus != 'trialing'&& $websiteStatus != 'incomplete' && $websiteStatus != 'active'){
                    return;
                }
                $switchOn =website::where('id',$this->website_id)->update(['active'=>true,'updated_at' => Carbon::now()->timestamp]);
                if($switchOn){
                    $notification = new stdClass();
                    $notification->code = 69;
                    $notification->website_id = $this->website_id;
                    $notification->websiteStatus = 1;
                    $notification->activity = activityLog::create([
                        'website_id' => $this->website_id,
                        'code' => 47,
                        'account_id' => Auth::guard('account')->user()->id,
                        'account_name' => Auth::guard('account')->user()->name,
                     ]);
                    broadcast(new cpanelNotification($notification))->toOthers();
                    return response(['websiteSwitchOnStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.switchedOn')]);
                }else{
                    return response(['websiteSwitchOnStatus'=>0 ,'msg'=>Lang::get('cpanel/settings/responses.switchOnFail')]);
                }
            }else if($request->websiteSwitch == 0){
                $switchOff =website::where('id',$this->website_id)->update(['active'=>false,'updated_at' => Carbon::now()->timestamp]);
                if($switchOff){
                    $notification = new stdClass();
                    $notification->code = 69;
                    $notification->website_id = $this->website_id;
                    $notification->websiteStatus = 2;
                    $notification->activity = activityLog::create([
                        'website_id' => $this->website_id,
                        'code' => 48,
                        'account_id' => Auth::guard('account')->user()->id,
                        'account_name' => Auth::guard('account')->user()->name,
                     ]);
                    broadcast(new cpanelNotification($notification))->toOthers();
                    return response(['websiteSwitchOffStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.switchedOff')]);
                }else{
                    return response(['websiteSwitchOffStatus'=>0 ,'msg'=>Lang::get('cpanel/settings/responses.switchedOffFail')]);
                }
            }

        }
        else if($request->has('saveSystemSettings')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
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
                    foodmenuFunctions::notification('settings.systemSettings',[
                        'website_id' => $this->website_id,
                        'code' => 60,
                        'account_id' => Auth::guard('account')->user()->id,
                        'account_name' => Auth::guard('account')->user()->name,
                    ],[
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
            if(Auth::guard('account')->user()->is_master == false){
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
                return response(['saveWebsitePrivacyPolicy' => 1,'msg'=>Lang::get('cpanel/settings/responses.privacyPolicySaved')]);
            }else{
                return response(['saveWebsitePrivacyPolicy' => 0,'msg'=>Lang::get('cpanel/settings/responses.privacyPolicySaveFaild')]);
            }
        }
        else if($request->has('deleteHistoryData')){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            if(Auth::guard('account')->user()->password_fails > 10){
                Account::where('id',Auth::guard('account')->user()->id)->update([
                    'account_unblock_code' => Str::random(100),
                    'updated_at' => Carbon::now()->timestamp,
                ]);
                foodmenuFunctions::notification('0',null,[
                    'account_id' => Auth::guard('account')->user()->id
                ]);
                return response(['deleteHistoryDataStatus' => 2]);
                ///send email with the unblock link

            }else{
                if(Hash::check($request->password, Auth::guard('account')->user()->password)){
                    order::where('website_id',$this->website_id)->delete();
                    statistics_day::where('website_id' , $this->website_id)->delete();
                    statistics_hour::where('website_id',$this->website_id)->delete();
                    statistics_month::where('website_id',$this->website_id)->delete();
                    activityLog::where('website_id',$this->website_id)->delete();
                    foodmenuFunctions::notification('reload.update',null,[]);
                    return response(['deleteHistoryDataStatus' => 1,'msg' => Lang::get('cpanel/settings/responses.dataDeleted')]);
                }else{
                    Account::where('email',Auth::guard('account')->user()->email)->increment('password_fails');
                    return response(['deleteHistoryDataStatus' => 0, 'msg' => Lang::get('cpanel/settings/responses.wrongPassword')]);
                }
            }

        }
        else if($request->has('systemFirstLoad')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            return response([
                'countries' => foodmenuFunctions::countries(),
                'timeZones' => foodmenuFunctions::timeZones(),
            ]);
        }
        else if($request->has(['saveCountry'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            if($request->saveCountry == null){return;}
            $saveCountry = website::where('id',$this->website_id)->update([
                'country_code'=>$request->saveCountry,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveCountry){
                foodmenuFunctions::notification('settings.country',[
                    'website_id' => $this->website_id,
                    'code' => 55,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'country' => $request->saveCountry,
                ]);
                return response(['saveCountryStatus' =>1,'msg'=> Lang::get('cpanel/settings/responses.countrySaved')]);
            }else{
                return response(['saveCountryStatus' =>0,'msg'=> Lang::get('cpanel/settings/responses.countrySaveFail')]);
            }
        }
        else if($request->has(['saveTimeZone'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $changeTimeZone = website::where('id',$this->website_id)->update([
                'hour12'=>$request->hour12,'timeZone'=>$request->saveTimeZone,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($changeTimeZone){
                cron_jobs::where('website_id',$this->website_id)->update(['timeZone'=>$request->saveTimeZone]);
                foodmenuFunctions::notification('settings.timeZone',[
                    'website_id' => $this->website_id,
                    'code' => 49,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'timeZone' => $request->saveTimeZone,
                    'hour12' => $request->hour12,
                ]);
                return response(['saveTimeZoneStatus' =>1,'msg'=> Lang::get('cpanel/settings/responses.timeZoneSaved')]);
            }else{
                return response(['saveTimeZoneStatus' =>0,'msg'=> Lang::get('cpanel/settings/responses.timeZoneSaveFail')]);
            }
        }
        else if($request->has(['websiteIcon'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            if($request->websiteIcon == '' || $request->websiteIcon == null){
                $template = website::where('id',$this->website_id)->pluck('template')->first();
                $iconUrl = "/storage/imgs/templates/$template/icon.webp";
            }else{
                $img = img::where(['website_id' => $this->website_id,'id'=>$request->websiteIcon])->first();
                if($img == null){
                    return response(['saveWebsiteIconStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteIconSaveFail')]);
                }
                $iconUrl = $img->url;
            }
            $saveWebsiteIcon = website::where('id',$this->website_id)
                            ->update([
                                'icon'=>$iconUrl,
                                'updated_at' => Carbon::now()->timestamp,
                             ]);
            if($saveWebsiteIcon){
                foodmenuFunctions::notification('settings.websiteIcon',[
                    'website_id' => $this->website_id,
                    'code' => 56,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'icon'=>$iconUrl,
                ]);
                return response(['saveWebsiteIconStatus' => 1,'msg'=>Lang::get('cpanel/settings/responses.websiteIconSaved')]);
            }else{
                return response(['saveWebsiteIconStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteIconSaveFail')]);
            }
        }
        else if($request->has(['websiteLogo'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            if($request->websiteLogo == '' || $request->websiteLogo == null){
                $template = website::where('id',$this->website_id)->pluck('template')->first();
                $logoUrl = "/storage/imgs/templates/$template/logo.webp";
            }else{
                $img = img::where(['website_id' => $this->website_id,'id'=>$request->websiteLogo])->first();
                if($img == null){
                    return response(['saveWebsiteLogoStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteLogoSaveFail')]);
                }
                $logoUrl = $img->url;
            }
            $saveWebsiteLogo = website::where('id',$this->website_id)
                ->update([
                    'logo'=>$logoUrl,
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveWebsiteLogo){
                foodmenuFunctions::notification('settings.websiteLogo',[
                    'website_id' => $this->website_id,
                    'code' => 57,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'logo'=>$logoUrl,
                ]);
                return response(['saveWebsiteLogoStatus' => 1,'msg'=>Lang::get('cpanel/settings/responses.websiteLogoSaved')]);
            }else{
                return response(['saveWebsiteLogoStatus' => 0,'msg'=>Lang::get('cpanel/settings/responses.websiteLogoSaveFail')]);
            }
        }
        else if($request->has(['saveWebsiteName'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
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
                foodmenuFunctions::notification('settings.websiteName',[
                    'website_id' => $this->website_id,
                    'code' => 50,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'websiteNames' => $saveWebsiteNameObj,

                ]);
                return response(['saveWebsiteName' => 1,'msg'=>Lang::get('cpanel/settings/responses.nameSaved')]);
            }else{
                return response(['saveWebsiteName' => 0,'msg'=>Lang::get('cpanel/settings/responses.nameSaveFail')]);
            }
        }
        else if($request->has(['saveWebsiteDescription'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
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
                foodmenuFunctions::notification('settings.websiteDescription',[
                    'website_id' => $this->website_id,
                    'code' => 51,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'websiteDescriptions' => $saveWebsiteDescriptionOBJ,
                ]);
                return response(['saveWebsiteDescription' => 1,'msg'=>Lang::get('cpanel/settings/responses.descriptionSaved')]);
            }else{
                return response(['saveWebsiteDescription' => 0,'msg'=>Lang::get('cpanel/settings/responses.descriptionSaveFail')]);
            }
        }
        else if($request->has('saveRestaurantEmail')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }

            $saveRestaurantEmail = website::where('id',$this->website_id)->update([
                    'restaurantEmail' => strip_tags($request->saveRestaurantEmail),
                    'updated_at' => Carbon::now()->timestamp,
                ]);
            if($saveRestaurantEmail){
                foodmenuFunctions::notification('settings.restaurantEmail',[
                    'website_id' => $this->website_id,
                    'code' => 38,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'newEmail' => $request->saveRestaurantEmail,
                ],[
                    'restaurantEmail' => strip_tags($request->saveRestaurantEmail),
                ]);
                return response(['saveRestaurantEmail'=>1,'msg'=>Lang::get('cpanel/settings/responses.restaurantEmailChanged')]);
            }else{
                return response(['saveRestaurantEmail'=>0,'msg'=>Lang::get('cpanel/settings/responses.restaurantEmailChangeFail')]);
            }
        }
        else if($request->has(['changeWebsitePhoneNumbers'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
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
                foodmenuFunctions::notification('settings.websitePhoneNumbers',[
                    'website_id' => $this->website_id,
                    'code' => 58,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'phoneNumbers' => $savePhoneNumbers,
                ]);
                return response(['changeWebsitePhoneNumber'=>1,'msg'=>Lang::get('cpanel/settings/responses.changeWebsitePhoneNumberSaved')]);
            }else{
                return response(['changeWebsitePhoneNumber'=>0,'msg'=>Lang::get('cpanel/settings/responses.changeWebsitePhoneNumberSaveFail')]);
            }
        }
        else if($request->has(['websiteAddresses'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $websiteAddressesObj = [];
            foreach($request->websiteAddresses as $key => $val){
                $websiteAddressesObj[$key] = strip_tags($val);
            }
            $changeWebsiteAddress = website::where('id',$this->website_id)->update([
                'addresses' => $websiteAddressesObj,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($changeWebsiteAddress){
                foodmenuFunctions::notification('settings.websiteAddresses',[
                    'website_id' => $this->website_id,
                    'code' => 59,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'addresses' => $websiteAddressesObj,
                ]);
                return response(['changeWebsiteAddress'=>1,'msg'=>Lang::get('cpanel/settings/responses.changeWebsiteAddressSaved')]);
            }else{
                return response(['changeWebsiteAddress'=>0,'msg'=>Lang::get('cpanel/settings/responses.changeWebsiteAddressSaveFail')]);
            }
        }
        else if($request->has('saveRestaurantLocation')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $updateRestaurantLocation = website::where('id',$this->website_id)->update([
                'lat'=>$request->lat,
                'lng' => $request->lng,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($updateRestaurantLocation){
                foodmenuFunctions::notification('settings.restaurantLocation',[
                    'website_id' => $this->website_id,
                    'code' => 63,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                ]);
                return response(['saveRestaurantLocationStatus' => 1,'msg' => Lang::get('cpanel/settings/responses.restaurantLocationSaved')]);
            }else{
                return response(['saveRestaurantLocationStatus' => 0,'msg' => Lang::get('cpanel/settings/responses.restaurantLocationSaveFaild')]);
            }
        }
        else if($request->has(['saveCurrencies'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveCurrencyObj = [];
            foreach($request->saveCurrencies as $key => $val){
                $saveCurrencyObj[$key] = strip_tags($val);
            }
            $saveCurrencies = website::where('id',$this->website_id)->update([
                'currencies' => $saveCurrencyObj,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveCurrencies){
                foodmenuFunctions::notification('settings.currencies',[
                    'website_id' => $this->website_id,
                    'code' => 54,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'currencies' => $saveCurrencyObj,
                ]);
                return response(['saveCurrencyStatus' =>1,'msg'=> Lang::get('cpanel/settings/responses.currencySaved')]);
            }else{
                return response(['saveCurrencyStatus' =>0,'msg'=> Lang::get('cpanel/settings/responses.currencySaveFail')]);
            }
        }
        else if($request->has(['saveSocailMediaLinks'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveSocailMediaLinks = website::where('id',$this->website_id)->update([
                'facebookLink'=>strip_tags($request->facebookLink),
                'twitterLink'=>strip_tags($request->twitterLink),
                'youtubeLink'=>strip_tags($request->youtubeLink),
                'linkedinLink'=>strip_tags($request->linkedinLink),
                'instagramLink'=>strip_tags($request->instagramLink),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveSocailMediaLinks){
                foodmenuFunctions::notification('settings.socailMediaLinks',[
                    'website_id' => $this->website_id,
                    'code' => 53,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveWebsiteAnnouncementsObj = [];
            foreach($request->saveWebsiteAnnouncements as $key => $val){
                $saveWebsiteAnnouncementsObj[$key] = strip_tags($val);
            }
            $saveWebsiteAnnouncements = website::where('id',$this->website_id)->update([
                'website_announcements'=> $saveWebsiteAnnouncementsObj,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsiteAnnouncements){
                foodmenuFunctions::notification('settings.websiteAnnouncements',[
                    'website_id' => $this->website_id,
                    'code' => 52,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'website_announcements' => $saveWebsiteAnnouncementsObj,
                ]);
                return response(['saveWebsiteAnnouncement' => 1,'msg'=>Lang::get('cpanel/settings/responses.announcementSaved')]);
            }else{
                return response(['saveWebsiteAnnouncement' => 0,'msg'=>Lang::get('cpanel/settings/responses.announcementSaveFail')]);
            }
        }
        else if($request->has(['saveWebsiteReceiptMsgs'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
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
                foodmenuFunctions::notification('settings.receiptMsgs',[
                    'website_id' => $this->website_id,
                    'code' => 66,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'website_receiptMsgs' => $saveWebsiteReceiptMsgsObj,
                ]);
                return response(['saveWebsiteReceiptMsgs' => 1,'msg'=>Lang::get('cpanel/settings/responses.receiptMsgSaved')]);
            }else{
                return response(['saveWebsiteReceiptMsgs' => 0,'msg'=>Lang::get('cpanel/settings/responses.receiptMsgSaveFaild')]);
            }
        }

        else if($request->has('getPromocodes')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $promocodes = promocode::where('website_id',$this->website_id)->get();
            return response(['promocodes'=>$promocodes]);
        }
        else if($request->has('promoCodeActive')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $promoCodeActive = promocode::where(['website_id' => $this->website_id,'id'=> $request->promoCodeActive])->update([
                'is_active' => $request->is_active,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($promoCodeActive){
                foodmenuFunctions::notification('settings.promoCodeActive',[
                    'website_id' => $this->website_id,
                    'code' => 40.1,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'promocode_name' => $request->promocodeName,
                    'promocode_id' => $request->promoCodeActive,
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $deletecode = promocode::where(['website_id' => $this->website_id, 'id' => $request->deletePromocode])->delete();
            if($deletecode){
                foodmenuFunctions::notification('settings.deletePromocode',[
                    'website_id' => $this->website_id,
                    'code' => 41,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'promocode_name' => $request->promocodeName,
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
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
                    'code' => 40,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $websitedata = website::where('id',$this->website_id)->select(['plan','timeZone'])->first();
            if($request->is_expires == 1){
                $expires_at = Carbon::createFromFormat('Y-m-d H:i:s', $request->year.'-'.$request->month.'-'.$request->day.' 00:00:00')->timestamp;
            }else{$expires_at = null;}

            $promocodeSave = promocode::where(['website_id'=>$this->website_id,'id'=>$request->editPromocode])->update([
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
                foodmenuFunctions::notification('settings.editPromocode',[
                    'website_id' => $this->website_id,
                    'code' => 40.1,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'promocode_name' => $request->code,
                    'promocode_id' => $request->editPromocode,
                ],[
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
            $saveViewSettings = cpanelSettings::where('account_id',Auth::guard('account')->user()->id)
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
            $saveGuideMode = cpanelSettings::where('account_id',Auth::guard('account')->user()->id)
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
            $saveControlSettings = cpanelSettings::where('account_id',Auth::guard('account')->user()->id)
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
            $saveAlertNotifications = cpanelSettings::where('account_id',Auth::guard('account')->user()->id)
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
            cpanelSettings::where('account_id',Auth::guard('account')->user()->id)->update(['muteChat'=>(int)$request->muteChat]);
        }

        else if($request->has('getLangs')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $langs = foodmenuFunctions::languages();
            return response(['langs' => $langs]);
        }
        else if($request->has('addLang')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages','plan')->first();
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
                'direction' => $addLang['direction'],
                'flag' => $addLang['flag'],
                'name' => $addLang['name'],
                'receiptDefault' => false,
                'websiteDefault' => false,
            ];
            $websiteLangs = $website->languages;
            $websiteLangs[$addLang['code']] = $newLang;
            $saveWebsite = website::where('id',$this->website_id)->update(['languages'=> $websiteLangs]);
            if($saveWebsite){
                websiteText::create(['website_id'=>$this->website_id,'lang'=>$addLang['code'],'text'=>foodmenuFunctions::defaultLanguageText($addLang['code'])]);
                foodmenuFunctions::notification('settings.installLang',[
                    'website_id' => $this->website_id,
                    'code' => 45,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'lang' => $newLang,
                ]);
                return response(['addLangStats'=>1,'msg'=>Lang::get('cpanel/settings/responses.newLangAdded'),'lang'=>$newLang]);
            }else{
                return response(['addLangStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.failedToAddLang')]);
            }
        }
        else if($request->has('setLangDefault')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $websiteLangs = $website->languages;
            foreach($websiteLangs as $key => $lang){
                $websiteLangs[$key]['websiteDefault'] = false;
                if($lang['code'] == $request->setLangDefault){
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
                    'code' => 45,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'lang' => $request->setLangDefault,
                ]);
                return response(['setLangDefaultStats'=>1,'msg'=>Lang::get('cpanel/settings/responses.setLangDefaultSaved')]);
            }else{
                return response(['setLangDefaultStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.setLangDefaultFail')]);
            }
        }
        else if($request->has('setReceiptLang')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $websiteLangs = $website->languages;
            foreach($websiteLangs as $key => $lang){
                $websiteLangs[$key]['receiptDefault'] = false;
                if($lang['code'] == $request->setReceiptLang){
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
                    'code' => 45,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'lang' => $request->setReceiptLang,
                ]);
                return response(['setReceiptLangStats'=>1,'msg'=>Lang::get('cpanel/settings/responses.setReceiptLangSaved')]);
            }else{
                return response(['setReceiptLangStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.setReceiptLangFail')]);
            }
        }
        else if($request->has('deleteLang')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            foreach($website->languages as $key => $lang){
                if($lang['code'] == $request->deleteLang){
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
                websiteText::where(['website_id'=>$this->website_id,'lang'=>$request->deleteLang])->delete();
                foodmenuFunctions::notification('settings.deleteLang',[
                    'website_id' => $this->website_id,
                    'code' => 45,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'lang' => $request->deleteLang,
                ]);

                return response(['deleteLangStats'=>1,'msg'=>Lang::get('cpanel/settings/responses.deleteLangSaved')]);
            }else{
                return response(['deleteLangStats'=>0,'msg'=>Lang::get('cpanel/settings/responses.deleteLangFail')]);
            }
        }
        else if($request->has('createCustomLang')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
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
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $websiteLangs = $website->languages;
            foreach($website->languages as $lang){
                if($lang['code'] == $request->code){
                    return response(['createCustomLangStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.customLangCodeUnique')]);
                }
            }
            $newLang = [
                'code' => strip_tags($request->code),
                'direction' => strip_tags($request->direction),
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
                websiteText::create(['website_id'=>$this->website_id,'lang'=>strip_tags($request->code),'text'=>foodmenuFunctions::defaultLanguageText($langPack)]);
                foodmenuFunctions::notification('settings.installLang',[
                    'website_id' => $this->website_id,
                    'code' => 45,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'lang' => $newLang,
                ]);
                return response(['createCustomLangStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.customLangCreated'),'lang'=>$newLang]);
            }else{
                return response(['createCustomLangStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.customLangCreateFaile')]);
            }
        }
        else if($request->has('editLangOptions')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $website = website::where('id',$this->website_id)->select('languages')->first();
            $websiteLangs = $website->languages;
            foreach($websiteLangs as $key => $lang){
                if($lang['code'] == $request->editLangOptions){
                    $websiteLangs[$key]['name'] = $request->name;
                    $websiteLangs[$key]['flag'] = $request->flag;
                    $websiteLangs[$key]['direction'] = $request->direction;
                }
            }
            $saveWebsite = website::where('id',$this->website_id)->update([
                'languages'=> $websiteLangs,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveWebsite){
                foodmenuFunctions::notification('settings.editLangOptions',[
                    'website_id' => $this->website_id,
                    'code' => 45,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'lang' => $request->editLangOptions,
                    'name' => $request->name,
                    'flag' => $request->flag,
                    'direction' => $request->direction,
                    'languages' => $websiteLangs,
                ]);
                return response(['editLangOptionsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.editLangOptionsSaved')]);
            }else{
                return response(['editLangOptionsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.editLangOptionsSaveFail')]);
            }
        }
        else if($request->has(['getLangTexts'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $texts = websiteText::where(['website_id'=>$this->website_id ,'lang'=>$request->getLangTexts])->first();
            return response($texts);
        }
        else if($request->has(['saveLangText'])){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
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
                $LangTexts['authentication'][$key] = $val;
            }
            foreach($request->saveLangText['orders'] as $key => $val){
                $LangTexts['orders'][$key] = $val;
            }
            foreach($request->saveLangText['reviews'] as $key => $val){
                $LangTexts['reviews'][$key] = $val;
            }
            foreach($request->saveLangText['liveChat'] as $key => $val){
                $LangTexts['liveChat'][$key] = $val;
            }
            foreach($request->saveLangText['receipt'] as $key => $val){
                $LangTexts['receipt'][$key] = $val;
            }
            foreach($request->saveLangText['other'] as $key => $val){
                $LangTexts['other'][$key] = $val;
            }
            $saveLanagText = websiteText::where(['website_id'=>$this->website_id,'lang'=>$request->lang])->update([
                'text' => $LangTexts,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveLanagText){
                foodmenuFunctions::notification('settings.saveLangText',[
                    'website_id' => $this->website_id,
                    'code' => 46,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveDineinSettings = website::where('id',$this->website_id)->update([
                'useDineInServiceCost'=>$request->useDineInServiceCost,
                'dineInServiceCost'=>strip_tags($request->dineInServiceCost),
                'dineInServicePercentage'=>strip_tags($request->dineInServicePercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDineinSettings){
                foodmenuFunctions::notification('settings.dineinServiceSettings',[
                    'website_id' => $this->website_id,
                    'code' => 65,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveDineinSettings = website::where('id',$this->website_id)->update([
                'useDineInTaxCost'=>$request->useDineInTaxCost,
                'dineInTaxCost'=>strip_tags($request->dineInTaxCost),
                'dineInTaxPercentage'=>strip_tags($request->dineInTaxPercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDineinSettings){
                foodmenuFunctions::notification('settings.dineinTaxSettings',[
                    'website_id' => $this->website_id,
                    'code' => 65,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'averagePickupTime'=>$request->averagePickupTime,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                foodmenuFunctions::notification('settings.averagePickupTime',[
                    'website_id' => $this->website_id,
                    'code' => 62,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'averagePickupTime' => $request->averagePickupTime,
                ]);
                return response(['averagePickupTimeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaved')]);
            }else{
                return response(['averagePickupTimeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaveFaild')]);
            }
        }
        else if($request->has('savePickupPaymentMethods')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'cashOnPickup'=>$request->cashOnPickup,
                'cardOnPickup'=>$request->cardOnPickup,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                foodmenuFunctions::notification('settings.pickupPaymentMethods',[
                    'website_id' => $this->website_id,
                    'code' => 62,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'cashOnPickup' => $request->cashOnPickup,
                    'cardOnPickup' => $request->cardOnPickup,
                ]);
                return response(['pickupPaymentMethodsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaved')]);
            }else{
                return response(['pickupPaymentMethodsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaveFaild')]);
            }
        }
        else if($request->has('savePickupMinimumCharge')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'pickupMinimumCharge'=>strip_tags($request->pickupMinimumCharge),
                'pickupMinimumChargeIncludes'=>$request->pickupMinimumChargeIncludes,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                foodmenuFunctions::notification('settings.pickupMinimumCharge',[
                    'website_id' => $this->website_id,
                    'code' => 62,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'pickupMinimumCharge' => strip_tags($request->pickupMinimumCharge),
                    'pickupMinimumChargeIncludes' => $request->pickupMinimumChargeIncludes,
                ]);
                return response(['pickupMinimumChargeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaved')]);
            }else{
                return response(['pickupMinimumChargeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.pickupSettingsSaveFaild')]);
            }
        }
        else if($request->has('savePickupTaxSettings')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $savePickupSettings = website::where('id',$this->website_id)->update([
                'usePickupTaxCost'=>$request->usePickupTaxCost,
                'pickupTaxCost'=>strip_tags($request->pickupTaxCost),
                'pickupTaxPercentage'=>strip_tags($request->pickupTaxPercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($savePickupSettings){
                foodmenuFunctions::notification('settings.pickupTaxSettings',[
                    'website_id' => $this->website_id,
                    'code' => 62,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'useDeliveryTaxCost'=>$request->useDeliveryTaxCost,
                'deliveryTaxCost'=>strip_tags($request->deliveryTaxCost),
                'deliveryTaxPercentage'=>strip_tags($request->deliveryTaxPercentage),
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                foodmenuFunctions::notification('settings.deliveryTaxSettings',[
                    'website_id' => $this->website_id,
                    'code' => 61,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'deliveryMinimumCharge'=>strip_tags($request->deliveryMinimumCharge),
                'deliveryMinimumChargeIncludes'=>$request->deliveryMinimumChargeIncludes,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                foodmenuFunctions::notification('settings.deliveryMinimumCharge',[
                    'website_id' => $this->website_id,
                    'code' => 61,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'deliveryMinimumCharge' => strip_tags($request->deliveryMinimumCharge),
                    'deliveryMinimumChargeIncludes' => $request->deliveryMinimumChargeIncludes,
                ]);
                return response(['saveDeliveryMinimumChargeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['saveDeliveryMinimumChargeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        else if($request->has('saveDeliveryPaymentMethods')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'cashOnDelivery'=>$request->cashOnDelivery,
                'cardOnDelivery'=>$request->cardOnDelivery,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                foodmenuFunctions::notification('settings.deliveryPaymentMethod',[
                    'website_id' => $this->website_id,
                    'code' => 61,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'cashOnDelivery' => $request->cashOnDelivery,
                    'cardOnDelivery' => $request->cardOnDelivery,
                ]);
                return response(['saveDeliveryPaymentMethodsStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['saveDeliveryPaymentMethodsStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        else if($request->has('saveAverageDeliveryTime')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'averageDeliveryTime'=>$request->averageDeliveryTime,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                foodmenuFunctions::notification('settings.averageDeliveryTime',[
                    'website_id' => $this->website_id,
                    'code' => 61,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
                    'averageDeliveryTime' => $request->averageDeliveryTime,
                ]);
                return response(['averageDeliveryTimeStatus'=>1,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaved')]);
            }else{
                return response(['averageDeliveryTimeStatus'=>0,'msg'=>Lang::get('cpanel/settings/responses.deliverySettingsSaveFaild')]);
            }
        }
        else if($request->has('saveDeliveryCost')){
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
            $saveDeliverySettings = website::where('id',$this->website_id)->update([
                'deliveryCost'=>strip_tags($request->deliveryCost),
                'showDeliveryCostChangable'=>$request->showDeliveryCostChangable,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($saveDeliverySettings){
                foodmenuFunctions::notification('settings.deliveryCost',[
                    'website_id' => $this->website_id,
                    'code' => 61,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
                return;
            }
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
            if($request->service == 'delivery'){$activeCode = 61;}
            else if($request->service == 'pickup'){$activeCode = 62;}
            else if($request->service == 'dinein'){$activeCode = 65;}
            if($saveWorkingDay){
                foodmenuFunctions::notification('settings.workingDay',[
                    'website_id' => $this->website_id,
                    'code' => $activeCode,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                ],[
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
            if(str_split(Auth::guard('account')->user()->authorities)[4] == false){
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
            $saveWorkingDay = website::where('id',$this->website_id)->update($updateWorkingdays);
            if($request->service == 'delivery'){$activeCode = 61;}
            else if($request->service == 'pickup'){$activeCode = 62;}
            else if($request->service == 'dinein'){$activeCode = 65;}
            if($saveWorkingDay){
                foodmenuFunctions::notification('settings.copyWorkingDays',[
                    'website_id' => $this->website_id,
                    'code' => $activeCode,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
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
            Account::where('id',Auth::guard('account')->user()->id)->update([
                'helpTips'=>$request->saveHelpTips,
                'updated_at' => Carbon::now()->timestamp,
            ]);
        }
        else if($request->has('getHelpTip')){

        }
        // else if($request->has(['cpanelLang'])){
        //     $updateCpanelLang = cpanelSettings::where('account_id', Auth::guard('account')->user()->id)
        //                         ->update(['language'=>$request->cpanelLang,'updated_at' => Carbon::now()->timestamp]);

        //     if($updateCpanelLang){
        //         Account::where('id',Auth::guard('account')->user()->id)->update(['lang' => $request->cpanelLang,'updated_at' => Carbon::now()->timestamp]);
        //         return response(['cpanelLangStatus'=>1]);
        //     }else{
        //         return response(['cpanelLangStatus'=>0,'msg'=> Lang::get('cpanel/settings/responses.cpanelLangFail')]);
        //     }
        // }
        //////////////////////

    }
}
