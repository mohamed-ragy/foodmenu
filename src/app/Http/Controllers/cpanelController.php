<?php

namespace App\Http\Controllers;

use App\Events\cpanelNotification;
use App\Events\globalChannel;
use App\Events\usersStatus;
use App\Events\websiteChannel;
use App\Models\cpanelSettings;
use App\Models\Account;
use App\Models\activityLog;
use App\Models\foodmenuFunctions;
use App\Models\liveChat;
use App\Models\notification;
use App\Models\order;
use App\Models\User;
use App\Models\website;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use stdClass;
use DateTime;
use Illuminate\Support\Str;
use App\Models\account_verifications;
use App\Models\bug;
use App\Models\financial_reports;
use App\Models\guest;
use App\Models\statistics_day;
use App\Models\statistics_hour;
use App\Models\statistics_month;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PDF;

class cpanelController extends Controller
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
        })->except(['dologin','login','resetPassword']);

        $this->middleware(function ($request, $next) {
            App::setLocale('en');
            return $next($request);
        })->only(['login','resetPassword']);

    }

    public function resetPassword(Request $request)
    {
        if($request->has('resetPasswordEmail')){
            if($request->resetPasswordEmail == '' || $request->resetPasswordEmail == null){
                return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordWrongEmail')]);
            }
            $findAccount = Account::where(['email'=>$request->resetPasswordEmail,'is_master' => true])->select('email','id')->first();
            if($findAccount){
                $emailVerificationsToday = account_verifications::where(['account_id'=> $findAccount->id ])->where('email_verification_code_sent_at','>',Carbon::now()->subday(1)->timestamp)->count();
                if($emailVerificationsToday > 10){
                    return response(['status' => 2 ,'msg' => Lang::get('cpanel/login.tooManyRequests')]);
                }
                $code = Str::random(6);
                $code = '000000';
                $applyCode = Account::where(['email'=>$request->resetPasswordEmail,'is_master' => true])->update([
                    'recover_password_code' => bcrypt($code),
                    'recover_password_code_sent_at' => Carbon::now()->timestamp,
                ]);
                if($applyCode){
                    //send email with the code
                    if(1+1==2){
                        account_verifications::create(['account_id'=> $findAccount->id,'email_verification_code_sent_at'=>Carbon::now()->timestamp ]);
                        return response(['status' => 1 ]);
                    }else{
                        return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain')]);
                    }
                }else{
                    return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain')]);
                }
            }else{
                return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordWrongEmail')]);
            }
        }else if($request->has('resetPasswordPhone')){
            if($request->resetPasswordPhone == '' || $request->resetPasswordPhone == null){
                return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordWrongPhone')]);
            }
            $findAccount = Account::where([ 'phone'=> $request->resetPasswordPhone,'is_master' => true])->select('phone','id')->first();
            if($findAccount){
                $emailVerificationsToday = account_verifications::where(['account_id'=> $findAccount->id ])->where('phone_verification_code_sent_at','>',Carbon::now()->subday(1)->timestamp)->count();
                if($emailVerificationsToday > 5){
                    return response(['status' => 2 ,'msg' => Lang::get('cpanel/login.tooManyRequests')]);
                }
                $code = Str::random(6);
                $applyCode = Account::where(['phone' => $request->resetPasswordPhone,'is_master' => true])->update([
                    'recover_password_code' => bcrypt($code),
                    'recover_password_code_sent_at' => Carbon::now()->timestamp,
                ]);
                if($applyCode){
                    if(foodmenuFunctions::sendVeryficationSMS($findAccount->phone,$code ,2)){
                        account_verifications::create(['account_id'=> $findAccount->id,'phone_verification_code_sent_at'=>Carbon::now()->timestamp ]);
                        return response(['status' => 1 ]);
                    }else{
                        return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain')]);
                    }
                }else{
                    return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain')]);
                }
            }else{
                return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordWrongPhone')]);
            }
        }else if($request->has('resetPasswordCheckCode')){

            if($request->recoverVia == 'phone'){
                $code = Account::where(['phone' => $request->resetPasswordViaPhone,'is_master' => true])->select('recover_password_code_sent_at','recover_password_code')->first();
            }else if($request->recoverVia == 'email'){
                $code = Account::where(['email' => $request->resetPasswordViaEmail,'is_master' => true])->select('recover_password_code_sent_at','recover_password_code')->first();
            }
            if($code){
                if(Hash::check($request->resetPasswordCheckCode, $code->recover_password_code ) ){
                    if($code->recover_password_code_sent_at > Carbon::now()->subMinutes(10)->timestamp){
                        return response(['status' => 1 ]);
                    }else{
                        return response(['status' => 3 ,'msg' => Lang::get('cpanel/login.codeExpired')]);
                    }
                }else{
                    return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.wrongResetPasswordCode')]);
                }
            }else{
                return response(['status' => 2 ,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain')]);
            }
        }else if($request->has('changePasswordCode')){
            if($request->recoverVia == 'phone'){
                $code = Account::where(['phone' => $request->resetPasswordViaPhone,'is_master' => true])->select('recover_password_code_sent_at','recover_password_code','id')->first();
            }else if($request->recoverVia == 'email'){
                $code = Account::where(['email' => $request->resetPasswordViaEmail,'is_master' => true])->select('recover_password_code_sent_at','recover_password_code','id')->first();
            }
            if($code){
                if(Hash::check($request->changePasswordCode, $code->recover_password_code ) ){
                    if($code->recover_password_code_sent_at > Carbon::now()->subMinutes(10)->timestamp){
                        $validate = Validator::make(['newPassword' => $request->newPassword,'newPasswordConfirm' => $request->newPasswordConfirm],[
                            'newPassword' => 'required|min:8|max:100|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPasswordConfirm',
                            'newPasswordConfirm' => 'required|min:8|max:100|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:newPassword',
                        ],[
                            'newPassword.required' => lang::get('cpanel/security/password.newPasswordRequired'),
                            'newPassword.min' => lang::get('cpanel/security/password.newPasswordMin'),
                            'newPassword.max' => lang::get('cpanel/security/password.newPasswordMax'),
                            'newPassword.regex' => lang::get('cpanel/security/password.newPasswordRegex'),
                            'newPassword.same' => lang::get('cpanel/security/password.newPasswordSame'),

                            'newPasswordConfirm.required' => lang::get('cpanel/security/password.newPasswordRequired'),
                            'newPasswordConfirm.min' => lang::get('cpanel/security/password.newPasswordMin'),
                            'newPasswordConfirm.max' => lang::get('cpanel/security/password.newPasswordMax'),
                            'newPasswordConfirm.regex' => lang::get('cpanel/security/password.newPasswordRegex'),
                            'newPasswordConfirm.same' => lang::get('cpanel/security/password.newPasswordSame'),
                        ]);
                        if ($validate->fails()) {
                            return response(['status' => 0, 'error' => $validate->errors()]);
                        }
                        else if (!$validate->fails()) {
                            if(Account::where('id',$code->id)->update(['password' => bcrypt($request->newPassword)])){
                                return response(['status' => 1 ,'msg' => Lang::get('cpanel/login.passwordChanged') ]);
                            }else{
                                return response(['status' => 2,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain') ]);
                            }
                        }
                    }else{
                        return response(['status' => 2,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain') ]);
                    }
                }else{
                    return response(['status' => 2,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain') ]);
                }
            }else{
                return response(['status' => 2,'msg' => Lang::get('cpanel/login.resetPasswordErrorTryAgain') ]);
            }
        }
    }

    public function dologin(Request $request)
    {
        if($request->has('cpLogin')){
            $account = Account::where('email',$request->email)->select('id','website_id','password_fails','account_unblock_code','is_master')->first();
            if($account){
                if($account->password_fails > 10){
                    foodmenuFunctions::notification('0',null,[
                        'account_id' => $account->id,
                    ],$account->website_id);
                    if($account->account_unblock_code == null || $account->account_unblock_code == '' ){
                        foodmenuFunctions::notification('account.blocked',null,[
                                'account_id' => $account->id,
                                'password_fails' => $account->password_fails,
                        ],$account->website_id);
                        Account::where('email',$request->email)->update(['account_unblock_code' => Str::random(100)]);
                    }else{
                        ///send email with the unblock link if master
                    }
                    if($account->is_master){
                        return response(['code' => 0, 'msg' => Lang::get('cpanel/login.accountBlocked') ]);
                    }else{
                        return response(['code' => 0, 'msg' => Lang::get('cpanel/login.accountBlocked2') ]);
                    }
                }else if (Auth::guard('account')->attempt(['email' => $request['email'] , 'password' => $request['password'] ])) {
                    Account::where('email',$request->email)->update([ 'password_fails' => 0 ]);
                    $request->session()->regenerate();
                    return response(['code' => 1 ]);
                }else{
                    Account::where('email',$request->email)->increment('password_fails');
                    return response(['code' => 0, 'msg' => Lang::get('cpanel/login.wrongusernameorpassword') ]);
                }
            }else{
                Account::where('email',$request->email)->increment('password_fails');
                return response(['code' => 0, 'msg' => Lang::get('cpanel/login.wrongusernameorpassword') ]);
            }
        }else if($request->has('unblockAccount')){
            $unblockAccount = Account::where([
                'account_unblock_code'=>$request->unblockAccount,
                'is_master' => true,
                'email' => $request->email,
                ])->update(['password_fails' => 0,'account_unblock_code'=>null]);
            if($unblockAccount){
                return response(['code'=>1,'msg'=>Lang::get('cpanel/login.accountUnblocked')]);
            }else{
                return response(['code'=>0,'msg'=>Lang::get('cpanel/login.accountUnblockWrongCode')]);
            }
        }


    }

    public function login(Request $request)
    {
        // if(isset($request['unblock'])){
        //     $unblockAccount = Account::where('account_unblock_code',$request->unblock)->update(['password_fails' => 0,'account_unblock_code'=>null]);
        //     if($unblockAccount){
                // return redirect()->route('account.login',['unblocked'=>1]);
        //     }else{
        //         return redirect()->route('account.login');
        //     }
        // }else{
            return view('cpanel.login');
        // }
    }

    public function logout(Request $request)
    {
        Auth::guard('account')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function home(Request $request)
    {
        if(Auth::guard('account')->user()->register != 2 && Auth::guard('account')->user()->is_master == true){
            return redirect()->route('foodmenu.register',['FoodMenuLang' => Cookie::get('FoodMenuLang') ?? 'en']);
        }
        if(Auth::guard('account')->user()->is_master == true){
            $website = website::where('id',Auth::guard('account')->user()->website_id)
                    ->with(['deliveries'])
                    ->withCount('paymentMethods')
                    ->with(['accounts'=>function($q){
                        $q->select('authorities','is_master','email','website_id','id','name','password_fails','lastSeen');
                    }])
                    // ->with(['financial_reports'=> function($q){
                    //     $q->select('month','year','website_id','id','created_at')->take(30)->orderBy('created_at','desc');
                    // }])
                    // ->with(['imgs'=>function($q){
                    //     $q->orderBy('created_at','desc');
                    // }])
                    ->with(['activity_logs'=>function($q){
                        $q->orderBy('created_at','desc')->limit(5);
                    }])
                    ->with(['categories'=>function($q){
                        $q->orderBy('sort','asc');
                    }])
                    ->with(['products'=> function($q){
                        $q->with(['product_options'=>function($q){
                                $q->with('product_option_selections');
                            }]);
                    }])
            ->first();
        }else{
            $website = website::where('id',Auth::guard('account')->user()->website_id)
                ->select([
                    'id','plan','active','phoneNumbers',
                    'addresses',
                    'lat','lng','url','timeZone','hour12','country_code',
                    'currencies','websiteNames','websiteDescriptions',
                    'website_announcements','website_receiptMsgs','languages','facebookLink','youtubeLink','linkedinLink','twitterLink','instagramLink','restaurantEmail','domainName','specialDomainName','trendingProducts',
                    'website_colors','useCustomColors','customColorsHexCode','icon','logo','template',
                    'intro',
                    'info',
                    'ourStory',
                    'slideShow',
                    'gallery',
                    'productReviews',
                    'guestReviews',
                    'collectReviews',
                    'guestOrders',
                    'cancelOrder',
                    'dineinWorkingHours',
                    'liveChat',
                    'guestLiveChat',
                    'discountAnnouncement',
                    'cookies_msg',
                    'fastLoading',
                    'useDelivery',
                    'langPopup',
                    'cash_on_delivery',
                    'card_on_delivery',
                    'acceptDeliveryOrders24',
                    'deliveryCost',
                    'showDeliveryCostChangable',
                    'deliveryTaxCost',
                    'deliveryTaxPercentage',
                    'useDeliveryTaxCost',
                    'deliveryMinimumCharge',
                    'deliveryMinimumChargeIncludes',
                    'workingDays_delivery',
                    'averageDeliveryTime',
                    'usePickup',
                    'cash_at_restaurant',
                    'card_at_restaurant',
                    'acceptPickupOrders24',
                    'pickupTaxCost',
                    'pickupTaxPercentage',
                    'usePickupTaxCost',
                    'pickupMinimumCharge',
                    'pickupMinimumChargeIncludes',
                    'workingDays_pickup',
                    'averagePickupTime',

                    'dineInTaxPercentage',
                    'dineInTaxCost',
                    'useDineInTaxCost',
                    'dineInServicePercentage',
                    'dineInServiceCost',
                    'useDineInServiceCost',
                    'workingDays_dinein',
                    'cart_lifeTime',
                    'printerWidth',
                    ])
                    ->with(['accounts'=>function($q){
                        $q->select('id','name','website_id');
                    }])
                    ->with(['deliveries'])

                    // ->with(['imgs'=>function($q){
                    //     $q->orderBy('created_at','desc');
                    // }])
                    ->with(['categories'=>function($q){
                        $q->orderBy('sort','asc');
                    }])
                    ->with(['products'=> function($q){
                        $q->with(['product_options'=>function($q){
                                $q->with('product_option_selections');
                            }]);
                    }])
            ->first();
        }
        $website->websiteColorsHexCode = foodmenuFunctions::websiteColors()[$website->website_colors];
        // if($website->template == 'demo'){
        //     $website->template = $request->t ?? 1;
        // }
        $website->templateData = foodmenuFunctions::templates()[$website->template];
        $account = Auth::guard('account')->user();
        $account->planName = foodmenuFunctions::plans()[$website->plan]['name'];
        $settings = cpanelSettings::where('account_id',$account->id)->first();
        $foodMenuData = collect([
            'plans' => foodmenuFunctions::plans(),
            'langs'=> foodmenuFunctions::languages(),
        ]);


        //////////

        Account::where('id',Auth::guard('account')->user()->id)->update(['lastSeen' => Carbon::now()->timestamp]);
        return view('cpanel.cpanel',[
            'website' => $website,
            'account' => $account,
            'settings' => $settings,
            'foodMenuData' => $foodMenuData,
            'texts' => collect([
                'cpanel' => Lang::get('cpanel/cpanel'),
            ]),
            'autoHelp_text' => collect(Lang::get('cpanel/autoHelp')),
        ]);
    }

    public function financialreport(Request $request)
    {
        if($this->account->is_master == false){return;}
        $report = financial_reports::where(['website_id'=>$this->website_id,'month'=>$request->month,'year'=>$request->year])
        ->with('websites:id,domainName')
        ->first();
        if(!$report){return abort(404);}

        $expenseColor = 1;
        $expensesTotal = 0;

        foreach($report->expenses as $expense){
            $expensesTotal = $expensesTotal + $expense['amount'];
            $expense['amount'] = number_format($expense['amount'],2);
            if($expenseColor == 0){
                $expenseColor = 1;
            }else{
                $expenseColor = 0;
            }
        }
        foreach($report->month_expenses as $expense){
            $expensesTotal = $expensesTotal + $expense['amount'];
            $expense['amount'] = number_format($expense['amount'],2);
            if($expenseColor == 0){
                $expenseColor = 1;
            }else{
                $expenseColor = 0;
            }
        }
        if($expenseColor == 0){
            $report->expensesTotalColor = 'c1';
            $expenseColor = 1;
        }else{
            $report->expensesTotalColor = 'c2';
            $expenseColor = 0;
        }
        $report->expensesTotal = $expensesTotal;
        if($report->total >= $report->expensesTotal){
            $report->reportTotalTxt = Lang::get('cpanel/financialReport.profits');
            $report->profits = number_format($report->total - $report->expensesTotal,2) ;
        }else{
            $report->reportTotalTxt = Lang::get('cpanel//financialReport.losses');
            $report->profits =number_format(($report->expensesTotal -  $report->total) * -1,2 );
        }

        $report->items_total = number_format($report->items_total,2);
        $report->delivery = number_format($report->delivery,2);
        $report->tax = number_format($report->tax,2);
        $report->service = number_format($report->service,2);
        $report->total = number_format($report->total,2);
        $report->expensesTotal = number_format($report->expensesTotal,2);

        $date = Carbon::createFromFormat('Y-m-d H:i:s',$request->year.'-'.$request->month.'-1 00:00:00','UTC');
        $pdf = PDF::loadView(
            'cpanel.pdf.financialReport',
            ['report' => $report,'lang'=>$request->lang,'date'=>$date->format('F Y'),'currency'=>$request->currency],
            [
                'format' => 'A4',
                'author' => 'Foodmenu',
                'subject' => '',
                'keywords' => 'foodmenu, financialReport'.$date->format('F-Y').', '.$report->websites->domainName.'', // Separate values with comma
                'creator' => 'Foodmenu',
                'display_mode' => 'fullpage'
            ]
        );
        if($request->action == 'view'){
            return $pdf->stream($report->websites->domainName.'_financial_report_'.$date->format('F_Y').'.pdf');
        }else if($request-> action == 'download'){
            return $pdf->download($report->websites->domainName.'_financial_report_'.$date->format('F_Y').'.pdf');
        }

    }

    public function notifications(Request $request)
    {
        if($request->has(['getNotifications'])){
            $notificationCodes =[];
            if(Auth::guard('account')->user()->is_master == true){
                $notificationCodes = ['orders.new_order_user','orders.delivered_by_delivery',3,4,'orders.canceled_by_user',22,74,80];
            }else{
                if(str_split(Auth::guard('account')->user()->authorities)[0] == true){
                    array_push($notificationCodes,'orders.new_order_user');
                    array_push($notificationCodes,'orders.delivered_by_delivery');
                    array_push($notificationCodes,'orders.canceled_by_user');
                }
                if(str_split(Auth::guard('account')->user()->authorities)[2] == true){
                    array_push($notificationCodes,3);
                }
                if(str_split(Auth::guard('account')->user()->authorities)[1] == true){
                    array_push($notificationCodes,4);
                    array_push($notificationCodes,22);
                }
            }


            $notifications = notification::where(['website_id' => $this->website_id,])
            ->where('created_at','<',$request->getMoreNotificationsAfter ?? Carbon::now()->timestamp)
            ->whereIn('code',$notificationCodes)
            ->orderBy('created_at','desc')
            ->take(20)->get();
            return response(['notifications' => $notifications]);
        }
        else if($request->has('notificationsSeen')){
            $markNotificationsSeen = notification::where(['website_id'=>$this->website_id])->whereIn('_id',$request->seenIds)->update(['seen'=>true]);
            if($markNotificationsSeen){
                return response(['notificationsSeenStat'=>1]);
            }
        }
        else if($request->has('lastSeen')){
            Account::where('id',Auth::guard('account')->user()->id)->update(['lastSeen' => Carbon::now()->timestamp]);
            $notification = new stdClass();
            $notification->code = 0;
            $notification->accountId = Auth::guard('account')->user()->id;
            $notification->website_id = $this->website_id;
            // broadcast(new cpanelNotification($notification))->toOthers();
        }
    }

    public function liveChat(Request $request)
    {
        if(str_split(Auth::guard('account')->user()->authorities)[5] == false){
            return;
        }

        if($request->has(['getFirstLiveChats'])){
            $liveChats_users = User::where('website_id', $this->website_id)
            ->where('lastMsg_id','!=',null)
            ->with('last_msg')
            ->orderBy('lastChat','desc')
            ->take(15)
            // ->select('id','lastChat','lastMsg_id')
            ->get();
            $liveChats_guests = guest::where('website_id', $this->website_id)
            ->where('lastMsg_id','!=',null)
            ->with('last_msg')
            ->orderBy('lastChat','desc')
            ->take(15)
            // ->select('id','lastChat','lastMsg_id')
            ->get();
            return response(['liveChats_users'=>$liveChats_users,'liveChats_guests'=>$liveChats_guests]);

        }
        else if($request->has('getMoreChat')){
            $liveChats_users = User::where('website_id', $this->website_id)
            ->where('lastMsg_id','!=',null)
            ->where('lastChat','<',$request->lastMsgDate)
            ->with('last_msg')
            ->orderBy('lastChat','desc')
            ->take(15)
            // ->select('id','lastChat','lastMsg_id')
            ->get();
            $liveChats_guests = guest::where('website_id', $this->website_id)
            ->where('lastMsg_id','!=',null)
            ->where('lastChat','<',$request->lastMsgDate)
            ->with('last_msg')
            ->orderBy('lastChat','desc')
            ->take(15)
            // ->select('id','lastChat','lastMsg_id')
            ->get();
            return response(['liveChats_users'=>$liveChats_users,'liveChats_guests'=>$liveChats_guests]);

        }
        else if($request->has('deleteChatMsgs')){
            if($request->userType == 'user'){
                $deleteUser = user::where('id',$request->deleteChatMsgs)->update(['lastChat'=>null,'lastMsg_id'=>null]);
                if($deleteUser){
                    $deleteChats = liveChat::where(['website_id'=>$this->website_id,'user_id'=> (int)$request->deleteChatMsgs])->delete();
                    if($deleteChats){
                        foodmenuFunctions::notification('liveChat.deleteAll',[],[
                            'type' => 'user',
                            'userId' => $request->deleteChatMsgs
                        ]);
                        foodmenuFunctions::notification_website('liveChat.deleteAll',$this->website_id,'user',$request->deleteChatMsgs,[]);
                        return response(['deleteChatMsgs' => 1,'msg'=>Lang::get('cpanel/cpanel.liveChat.chatmsgsDeleted')]);
                    }else{
                        return response(['deleteChatMsgs' => 0,'msg'=>Lang::get('cpanel/cpanel.liveChat.chatmsgsDeleteFail')]);
                    }
                }else{
                        return response(['deleteChatMsgs' => 0,'msg'=>Lang::get('cpanel/cpanel.liveChat.chatmsgsDeleteFail')]);
                }
            }else if($request->userType == 'guest'){
                $deleteUser = guest::where('id',$request->deleteChatMsgs)->update(['lastChat'=>null,'lastMsg_id'=>null]);
                if($deleteUser){
                    $deleteChats = liveChat::where(['website_id'=>$this->website_id,'guest_id'=> (int)$request->deleteChatMsgs])->delete();
                    if($deleteChats){
                        foodmenuFunctions::notification('liveChat.deleteAll',[],[
                            'type' => 'guest',
                            'userId' => $request->deleteChatMsgs
                        ]);
                        foodmenuFunctions::notification_website('liveChat.deleteAll',$this->website_id,'guest',$request->deleteChatMsgs,[]);
                        return response(['deleteChatMsgs' => 1,'msg'=>Lang::get('cpanel/cpanel.liveChat.chatmsgsDeleted')]);
                    }else{
                        return response(['deleteChatMsgs' => 0,'msg'=>Lang::get('cpanel/cpanel.liveChat.chatmsgsDeleteFail')]);
                    }
                }else{
                        return response(['deleteChatMsgs' => 0,'msg'=>Lang::get('cpanel/cpanel.liveChat.chatmsgsDeleteFail')]);
                }
            }
        }
        else if($request->has('seen')){
            if($request->type == 'user'){
                liveChat::where([
                    'website_id'=>$this->website_id,
                    'user_id'=>(int)$request->id,
                    'author' => 1,
                    'is_seen'=> false,
                ])
                ->update(['seen_at'=>Carbon::now()->timestamp,'is_seen'=>true]);
            }else if($request->type == 'guest'){
                liveChat::where([
                    'website_id'=>$this->website_id,
                    'guest_id'=>(int)$request->id,
                    'author' => 1,
                    'is_seen'=> false,
                ])
                ->update(['seen_at'=>Carbon::now()->timestamp,'is_seen'=>true]);
            }
            foodmenuFunctions::notification_website('liveChat.seen_by_account',$this->website_id,$request->type,$request->id,[]);
            foodmenuFunctions::notification('liveChat.seen_by_account',[],[
                'type' => $request->type,
                'id' => $request->id
            ]);
            //send to user and other accounts

        }
        else if($request->has('getChatMsgs')){
            $chatMsgs = liveChat::where([
                'website_id' => $this->website_id,
                $request->type.'_id' => (int)$request->id,
            ])->orderBy('sent_at','desc')->limit(30)->get();
            return response(['chatMsgs' => $chatMsgs]);
        }
        else if($request->has('getMoreChatMsgs')){
            $chatMsgs = liveChat::where([
                'website_id' => $this->website_id,
                $request->type.'_id' => (int)$request->id,
            ])
            ->where('sent_at','<',(int)$request->lastMsgDate)
            ->where('_id','!=',$request->lastMsgId)
            ->orderBy('sent_at','desc')->limit(30)->get();
            return response(['chatMsgs' => $chatMsgs]);
        }
        else if($request->has('typing')){
            foodmenuFunctions::notification_website('liveChat.typing',$this->website_id,$request->type,$request->id,[]);
        }
        else if($request->has(['sendChatMessage'])){
            $createChatMsg = liveChat::create([
                'website_id' => $this->website_id,
                $request->type.'_id' => (int)$request->id,
                'account_id' => Auth::guard('account')->user()->id,
                'author' =>  0,
                'message' => strip_tags($request->msg),
                'sent_at' => Carbon::now()->timestamp,
                'seen_at' => null,
                'deleted_at' => null,
                'is_seen'=>false,
                'is_deleted' =>false,
            ]);
            if($createChatMsg){
                if($request->type == 'user'){
                    User::where('id',$request->id)->update(['lastChat' => carbon::now()->timestamp,'lastMsg_id' => $createChatMsg->_id]);
                }else if($request->type == 'guest'){
                    guest::where('id',$request->id)->update(['lastChat' => carbon::now()->timestamp,'lastMsg_id' => $createChatMsg->_id]);
                }
                //send to user and other accounts
                foodmenuFunctions::notification('liveChat.new_msg_by_account',[],[
                    'type' => $request->type,
                    'id' => $request->id,
                    'msg' => $createChatMsg,
                ]);
                foodmenuFunctions::notification_website('liveChat.new_msg_by_account',$this->website_id,$request->type,$request->id,['msg'=>$createChatMsg]);
                return response(['sendChatMessage' => 1,'msg' => $createChatMsg]);
            }else{
                return response(['sendChatMessage' => 0]);
            }
        }
        // else if($request->has(['getLiveChats'])){
        //     if(Auth::guard('account')->user()->isInvisible == false){
        //         liveChat::where([
        //             'website_id'=>$this->website_id,
        //             'is_delivered'=> false,
        //             'author' => 1,
        //         ])
        //         ->update(['is_delivered'=>true, 'delivered_at'=> new UTCDateTime()]);
        //         $user = new stdClass();
        //         $user->id = 0;
        //         $user->website_id = $this->website_id;
        //         $user->code = 3;
        //         $user->now =  carbon::now();
        //         $user->userType = 'user';
        //         broadcast(new usersStatus($user))->toOthers();
        //     }
        //     if($request->getChatsFor == 'users'){
        //         $liveChats = User::where('website_id', $this->website_id)
        //         ->where('lastMsg_id','!=',null)
        //         ->where('id','!=',$request->lastChatUserId)
        //         ->where('lastChat','<',$request->getMoreLiveChatMsgsAfter)
        //         ->with('last_msg')
        //         ->orderBy('lastChat','desc')
        //         ->take(15)
        //         ->select('name','id','lastChat','lastMsg_id','lastSeen')
        //         ->get();
        //     }else if($request->getChatsFor == 'guests'){
        //         $liveChats = guest::where('website_id', $this->website_id)
        //         ->where('lastMsg_id','!=',null)
        //         ->where('id','!=',$request->lastChatUserId)
        //         ->where('lastChat','<',$request->getMoreLiveChatMsgsAfter)
        //         ->with('last_msg')
        //         ->orderBy('lastChat','desc')
        //         ->take(15)
        //         ->select('name','id','lastChat','lastMsg_id','lastSeen')
        //         ->get();
        //     }
        //     return response(['liveChats' => $liveChats]);
        // }

        // else if($request->has(['getChatMessages'])){
        //     if($request->userType == 'guest'){
        //         if($request->getMoreChatMessagesBefore == ''){
        //             $chatMessages = liveChat::where([
        //                 'website_id' => $this->website_id,
        //                 'guest_id' => (int)$request->user_id,
        //             ])->orderBy('sent_at','desc')->limit(30)->get();
        //         }else{
        //             $chatMessages = liveChat::where([
        //                 'website_id' => $this->website_id,
        //                 'guest_id' => (int)$request->user_id,
        //             ])
        //             ->where('sent_at','<',new DateTime($request->getMoreChatMessagesBefore))
        //             // ->where('_id','!=',$request->lastMsgId)
        //             ->orderBy('sent_at','desc')->limit(30)->get();
        //         }
        //     }else if($request->userType == 'user'){
        //         if($request->getMoreChatMessagesBefore == ''){
        //             $chatMessages = liveChat::where([
        //                 'website_id' => $this->website_id,
        //                 'user_id' => (int)$request->user_id,
        //             ])->orderBy('sent_at','desc')->limit(30)->get();
        //         }else{
        //             $chatMessages = liveChat::where([
        //                 'website_id' => $this->website_id,
        //                 'user_id' => (int)$request->user_id,
        //             ])
        //             ->where('sent_at','<',new DateTime($request->getMoreChatMessagesBefore))
        //             // ->where('_id','!=',$request->lastMsgId)
        //             ->orderBy('sent_at','desc')->limit(30)->get();
        //         }
        //     }

        //     return response(['chatMessages' => $chatMessages]);
        // }
        else if($request->has(['deleteChatMsg'])){
            $deleteMsg = liveChat::where(['_id'=>$request->msgId,'author' => 0,'website_id'=>$this->website_id])->first()
            ->update(['is_deleted'=>true,'deleted_at'=> Carbon::now()->timestamp,'message'=> '--','deleted_by'=>Auth::guard('account')->user()->id]);
            if($deleteMsg){
                foodmenuFunctions::notification('liveChat.msg_deleted_by_account',[],[
                    'msgId' => $request->msgId,
                    'id' => $request->id,
                    'type' => $request->type,
                    'deleted_by' => Auth::guard('account')->user()->id,
                    'now' => Carbon::now()->timestamp
                ]);
                foodmenuFunctions::notification_website('liveChat.msg_deleted_by_account',$this->website_id,$request->type,$request->id,[
                    'msgId' => $request->msgId,
                    'now' => Carbon::now()->timestamp,

                ]);
                // $user = new stdClass();
                // $user->id =$request->userId;
                // $user->website_id = $this->website_id;
                // $user->code = 1;
                // $user->msgId = $request->deleteChatMessage;
                // $user->now =  carbon::now();
                // $user->userType = $request->userType;
                // broadcast(new usersStatus($user))->toOthers();

                // $notification = new stdClass();
                // $notification->userId = $request->userId;
                // $notification->msgId = $request->deleteChatMessage;
                // $notification->userType = $request->userType;
                // $notification->website_id = $this->website_id;
                // $notification->now =  carbon::now();
                // $notification->code = 83;
                // broadcast(new cpanelNotification($notification))->toOthers();

                return response(['deleteChatMessage' => 1,'now' => Carbon::now()->timestamp]);
            }else{
                return response(['deleteChatMessage' => 0]);
            }
        }
    }

    public function dashboard(Request $request)
    {
        if($request->has('FirstLoad')){
            //////////
            if(str_split(Auth::guard('account')->user()->authorities)[0] == false){
                $incompleteOrders = [];
            }else{
                $incompleteOrders = order::where([
                    'website_id'=> $this->website_id,
                ])
                ->whereIn('status',[0,1,3,4,8])
                ->with('order_items')
                ->get();
            }
            ////////
            $unSeenLiveChats = [];
            if(str_split(Auth::guard('account')->user()->authorities)[5]){
                $unSeenLiveChats = liveChat::where(['website_id'=>$this->website_id,'is_seen'=>false,'author'=>1])->get(['user_id','guest_id']);
            }
            foodmenuFunctions::notification('0',null,[
                'account_id' => Auth::guard('account')->user()->id,
            ],Auth::guard('account')->user()->website_id);
            /////////////
            $notificationCodes = [];
            // $todayOrders = [];
            if(Auth::guard('account')->user()->is_master == true){
                $timezone =website::where('id',$this->website_id)->pluck('timeZone')->first();
                $notificationCodes = ['orders.new_order_user','orders.delivered_by_delivery',3,4,'orders.canceled_by_user',74,80];
                // $todayOrders = order::where('placed_at','>',Carbon::today($timezone))->whereIn('status',[2,5,6,7])->orderBy('placed_at','asc')->get();


                $todayOrders = order::where(function($q) use ($timezone){
                    $q->where('dinedin_at','>',Carbon::today($timezone));
                })->orWhere(function($q) use ($timezone){
                    $q->where('delivered_at','>',Carbon::today($timezone));
                })->orWhere(function($q) use ($timezone){
                    $q->where('pickedUp_at','>',Carbon::today($timezone));
                })->orWhere(function($q) use ($timezone){
                    $q->where('canceled_at','>',Carbon::today($timezone));
                })
                ->where(['website_id'=>$this->website_id])
                ->whereIn('status',[2,5,6,7])->orderBy('placed_at','asc')->get();


            }else{
                $todayOrders = [];
                if(str_split(Auth::guard('account')->user()->authorities)[0] == true){
                    array_push($notificationCodes,'orders.new_order_user');
                    array_push($notificationCodes,'orders.delivered_by_delivery');
                    array_push($notificationCodes,'orders.canceled_by_user');
                }
                if(str_split(Auth::guard('account')->user()->authorities)[2] == true){
                    array_push($notificationCodes,3);
                }
                if(str_split(Auth::guard('account')->user()->authorities)[1] == true){
                    array_push($notificationCodes,4);
                }
            }
            $notifications = notification::where(['website_id'=>$this->website_id,'seen'=>false])->whereIn('code',$notificationCodes)->count();

            return response([
                'notifications' => $notifications,
                'unSeenLiveChats' => $unSeenLiveChats,
                'incompleteOrders' =>$incompleteOrders,
                'todayOrders' => $todayOrders,
            ]);
        }
        else if($request->has('getActivityLog')){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $timezone =website::where('id',$this->website_id)->pluck('timeZone')->first();
            if($request->getMoreActivities == ''){
            $start = Carbon::createFromFormat('Y-m-d H:i:s',$request->year.'-'.$request->month.'-'.$request->day.' 00:00:00',$timezone)->setTimezone('UTC');
            $end = Carbon::createFromFormat('Y-m-d H:i:s',$request->year.'-'.$request->month.'-'.$request->day.' 23:59:59',$timezone)->setTimezone('UTC');
                $activities = activityLog::where('website_id',$this->website_id)
                ->whereBetween('created_at',[$start,$end])
                ->orderBy('created_at','desc')
                ->take(30)
                ->get();
            }else{
                $end = new DateTime($request->getMoreActivities);
                $start = Carbon::createFromFormat('Y-m-d H:i:s',$request->year.'-'.$request->month.'-'.$request->day.' 00:00:00',$timezone)->setTimezone('UTC');
                $activities = activityLog::where('website_id',$this->website_id)
                ->whereBetween('created_at',[$start,$end])
                ->where('_id','!=',$request->lastActivityId)
                ->orderBy('created_at','desc')
                ->take(30)
                ->get();
            }

                return response(['activities' => $activities]);
        }
        else if($request->has('deleteActivityLog')){
            if(Auth::guard('account')->user()->is_master == false){
                return;
            }
            $deleteActivity = activityLog::where(['website_id'=>$this->website_id,'_id'=>$request->deleteActivityLog])->delete();
            if($deleteActivity){
                return response(['deleteActivityLogStat' => 1, 'msg' => Lang::get('cpanel/dashboard/activityLog.activityLogDeleted')]);
            }else{
                return response(['deleteActivityLogStat' => 0, 'msg' => Lang::get('cpanel/dashboard/activityLog.activityLogDeleteFail')]);
            }
        }
        /////////
        else if($request->has('loadStatistics')){
            if($request->period == 'day'){
                if($request->compare == 0){
                    $statistics_hours = statistics_hour::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day1,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->orderBy('hour','asc')->get();
                    $statistics_day = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day1,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->get();
                    return response([
                        'period'=>'day',
                        'compare'=>0,
                        'day1' => $request->day1,
                        'month1' => $request->month1,
                        'year1' => $request->year1,
                        'statistics1_hours'=>$statistics_hours,
                        'statistics1_day'=>$statistics_day
                    ]);
                }else if($request->compare == 1){
                    $statistics_hours = statistics_hour::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day1,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->orderBy('hour','asc')->get();
                    $statistics2_hours = statistics_hour::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day2,
                        'month' => (int)$request->month2,
                        'year' => (int)$request->year2,
                    ])->orderBy('hour','asc')->get();
                    $statistics_day = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day1,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->get();
                    $statistics2_day = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day2,
                        'month' => (int)$request->month2,
                        'year' => (int)$request->year2,
                    ])->get();
                    return response([
                        'period'=>'day',
                        'compare'=>1,
                        'day1' => $request->day1,
                        'month1' => $request->month1,
                        'year1' => $request->year1,
                        'day2' => $request->day2,
                        'month2' => $request->month2,
                        'year2' => $request->year2,
                        'statistics1_hours'=>$statistics_hours,
                        'statistics1_day'=>$statistics_day,
                        'statistics2_hours'=>$statistics2_hours,
                        'statistics2_day'=>$statistics2_day
                    ]);
                }
            }else if($request->period == 'month'){
                if($request->compare == 0){
                    $statistics_days = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->orderBy('day','asc')->get();
                    $statistics_month = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->get();
                    return response([
                        'period'=>'month',
                        'compare'=>0,
                        'month1' => $request->month1,
                        'year1' => $request->year1,
                        'statistics1_days'=>$statistics_days,
                        'statistics1_month'=>$statistics_month
                    ]);
                }else if($request->compare == 1){
                    $statistics_days = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->orderBy('day','asc')->get();
                    $statistics_month = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->get();
                    $statistics2_days = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month2,
                        'year' => (int)$request->year2,
                    ])->orderBy('day','asc')->get();
                    $statistics2_month = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month2,
                        'year' => (int)$request->year2,
                    ])->get();
                    return response([
                        'period'=>'month',
                        'compare'=>1,
                        'month1' => $request->month1,
                        'year1' => $request->year1,
                        'month2' => $request->month2,
                        'year2' => $request->year2,
                        'statistics1_days'=>$statistics_days,
                        'statistics1_month'=>$statistics_month,
                        'statistics2_days'=>$statistics2_days,
                        'statistics2_month'=>$statistics2_month
                    ]);
                }
            }else if($request->period == 'year'){
                if($request->compare == 0){
                    $statistics_months = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'year' => (int)$request->year1,
                    ])->orderBy('month','asc')->get();
                    return response([
                        'period'=>'year',
                        'compare'=>0,
                        'year1' => $request->year1,
                        'statistics1_months'=>$statistics_months
                    ]);
                }else if($request->compare == 1){
                    $statistics_months = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'year' => (int)$request->year1,
                    ])->orderBy('month','asc')->get();
                    $statistics2_months = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'year' => (int)$request->year2,
                    ])->orderBy('month','asc')->get();
                    return response([
                        'period'=>'year',
                        'compare'=>1,
                        'year1' => $request->year1,
                        'year2' => $request->year2,
                        'statistics1_months'=>$statistics_months,
                        'statistics2_months'=>$statistics2_months
                    ]);
                }
            }
        }
        //////////
        else if($request->has('addNewExpenses_fixed')){
            if($this->account->is_master == false){return;}
            $validation = Validator::make(['name'=>strip_tags($request->name),'amount'=>strip_tags($request->amount)],
            [
                'name' => 'required|max:40',
                'amount' => 'required|max:40',
            ],[
                'name.required' => Lang::get('cpanel/dashboard/responses.expenseNameRequired'),
                'name.max' => Lang::get('cpanel/dashboard/responses.expensesNameMax'),
                'amount.required' => Lang::get('cpanel/dashboard/responses.expenseAmountRequired'),
                'amount.max' => Lang::get('cpanel/dashboard/responses.expenseAmountMax'),
            ]);
            if($validation->fails()){
                return response(['addNewExpenses_fixedStatus' => 0,'errors' => $validation->errors()]);
            }else{
                $expenses = website::where('id',$this->website_id)->pluck('expenses')->first();
                array_push($expenses,[
                    'id' => count($expenses) + 1,
                    'name'=>strip_tags($request->name),
                    'amount'=>strip_tags($request->amount)
                ]);
                $updateExpenses = website::where('id',$this->website_id)->update([
                    'expenses' => $expenses,
                ]);
                if($updateExpenses){
                    return response(['addNewExpenses_fixedStatus' => 1,'msg'=> Lang::get('cpanel/dashboard/responses.addExpensesadded')]);
                }else{
                    return response(['addNewExpenses_fixedStatus' => 2 ,'msg'=> Lang::get('cpanel/dashboard/responses.addExpensesFail')]);
                }
            }
        }
        else if($request->has('delete_expense_fixed')){
            if($this->account->is_master == false){return;}

            $expenses = website::where('id',$this->website_id)->pluck('expenses')->first();
            $expenses_new = [];
            $expense_id = 0;
            foreach($expenses as $expense){
                if($expense['id'] != $request->expense_id){
                    $expense_id++;
                    array_push($expenses_new,['id' => $expense_id,'name'=>$expense['name'],'amount'=>$expense['amount']]);
                }
            }
            $updateFixedExpenses = website::where('id',$this->website_id)->update(['expenses'=>$expenses_new]);
            if($updateFixedExpenses){
                return response(['delete_expense_fixedStatus' => 1,'msg' => Lang::get('cpanel/dashboard/responses.expensesDeleted')]);
            }else{
                return response(['delete_expense_fixedStatus' => 0,'msg' => Lang::get('cpanel/dashboard/responses.expensesDeleteFail')]);
            }
        }
        else if($request->has('addNewExpenses_current')){
            if($this->account->is_master == false){return;}
            $validation = Validator::make(['name'=>strip_tags($request->name),'amount'=>strip_tags($request->amount)],
            [
                'name' => 'required|max:40',
                'amount' => 'required|max:40',
            ],[
                'name.required' => Lang::get('cpanel/dashboard/responses.expenseNameRequired'),
                'name.max' => Lang::get('cpanel/dashboard/responses.expensesNameMax'),
                'amount.required' => Lang::get('cpanel/dashboard/responses.expenseAmountRequired'),
                'amount.max' => Lang::get('cpanel/dashboard/responses.expenseAmountMax'),
            ]);
            if($validation->fails()){
                return response(['addNewExpenses_currentStatus' => 0,'errors' => $validation->errors()]);
            }else{
                $expenses = website::where('id',$this->website_id)->pluck('month_expenses')->first();
                array_push($expenses,[
                    'id' => count($expenses) + 1,
                    'name'=>strip_tags($request->name),
                    'amount'=>strip_tags($request->amount)
                ]);
                $updateExpenses = website::where('id',$this->website_id)->update([
                    'month_expenses' => $expenses,
                ]);
                if($updateExpenses){
                    return response(['addNewExpenses_currentStatus' => 1,'msg'=> Lang::get('cpanel/dashboard/responses.addExpensesadded')]);
                }else{
                    return response(['addNewExpenses_currentStatus' => 2 ,'msg'=> Lang::get('cpanel/dashboard/responses.addExpensesFail')]);
                }
            }
        }
        else if($request->has('delete_expense_current')){
            if($this->account->is_master == false){return;}

            $expenses = website::where('id',$this->website_id)->pluck('month_expenses')->first();
            $expenses_new = [];
            $expense_id = 0;
            foreach($expenses as $expense){
                if($expense['id'] != $request->expense_id){
                    $expense_id++;
                    array_push($expenses_new,['id' => $expense_id,'name'=>$expense['name'],'amount'=>$expense['amount']]);
                }
            }
            $updateFixedExpenses = website::where('id',$this->website_id)->update(['month_expenses'=>$expenses_new]);
            if($updateFixedExpenses){
                return response(['delete_expense_currentStatus' => 1,'msg' => Lang::get('cpanel/dashboard/responses.expensesDeleted')]);
            }else{
                return response(['delete_expense_currentStatus' => 0,'msg' => Lang::get('cpanel/dashboard/responses.expensesDeleteFail')]);
            }
        }
        /////
        else if($request->has('getFinancialReports')){
            if($this->account->is_master == false){return;}
            $reports = financial_reports::where(['website_id' => $this->website_id])
            ->skip($request->skip)->take(10)->orderBy('created_at','desc')->select('id','created_at','year','month')->get();
            $count = financial_reports::where(['website_id' => $this->website_id])->count();
            return response(['reports' => $reports, 'count' => $count]);
        }
        else if($request->has('deleteFinancialReport')){
            if($this->account->is_master == false){return;}
            $deleteReport = financial_reports::where(['id'=>$request->report_id,'website_id'=>$this->website_id])->delete();
            if($deleteReport){
                return response(['deleteFinancialReportStatus' => 1,'msg'=>Lang::get('cpanel/dashboard/responses.deleteReportDeleted')]);
            }else{
                return response(['deleteFinancialReportStatus' => 0,'msg'=>Lang::get('cpanel/dashboard/responses.deleteReportFaild')]);
            }
        }
        ////
        else if($request->has('reportBug')){
            $reportBug = bug::create([
                'website_id'=>$this->website_id,
                'msg' => strip_tags($request->reportBug),
            ]);
            if($reportBug){
                return response(['reportBugStatus'=>1,'msg'=>Lang::get('cpanel/cpanel.reportBug.reportBugReported')]);
            }else{
                return response(['reportBugStatus'=>1,'msg'=>Lang::get('cpanel/cpanel.reportBug.reportBugFaild')]);
            }
        }
    }

    public function globalChannel(Request $request){
        if($request->has('invisible')){
            if($request->invisible == 1){
                $invisible = true;
            }else if($request->invisible == 0){
                $invisible = false;
            }
            Account::where('id',Auth::guard('account')->user()->id)->update(['isInvisible'=> $invisible]);
            $notification = new stdClass();
            $notification->code = 'restaurant.online.status';
            $notification->account_id = Auth::guard('account')->user()->id;
            $notification->website_id = $this->website_id;
            $notification->onlineStatus = $request->invisible;
            broadcast(new globalChannel($notification))->toOthers();
        }
    }



}
