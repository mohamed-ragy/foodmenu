<?php

namespace App\Http\Controllers;

use App\Events\globalChannel;
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
use Illuminate\Support\Str;
use App\Models\account_verifications;
use App\Models\bug;
use App\Models\financial_reports;
use App\Models\guest;
use App\Models\help_en_articles;
use App\Models\statistics_day;
use App\Models\statistics_hour;
use App\Models\statistics_month;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PDF;
use Illuminate\Support\Facades\Mail;
use App\Mail\automatedEmails;
use App\Models\cloudflare;
use App\Models\cron_jobs;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class cpanelController extends Controller
{
    protected $website_id;
    protected $account;
    public function __construct()
    {

        $this->middleware(function ($request, $next) {
            // $jobs = cron_jobs::where('type','2')->get();
            // foreach($jobs as $job){
            //     $website = website::where('id',$job->website_id)->select(['user_domainName','user_domainName_data'])->first();
            //     $cloudflare = new cloudflare($website->user_domainName_data['id']);
            //     $cloudflare->delete_current_cert($job->website_id);
            // }
            // $cloudflare = new cloudflare("cf4b05fd2ef23569b42342835f58f8e5");
            // dd($cloudflare->delete_current_cert());
            // dd(cron_jobs::where('website_id',2)->get());
            if(!Auth::guard('account')->check()){
                return redirect()->route('account.login',$request->all());
            }
            $this->account = Auth::guard('account')->user();
            $this->website_id = $this->account->website_id;
            App::setlocale($this->account->language);
            return $next($request);
        })->except(['dologin','login','resetPassword']);

        $this->middleware(function ($request, $next) {
            if(Auth::guard('account')->check()){
                return redirect()->route('cpanel');
            }
            App::setLocale('en');
            return $next($request);
        })->only(['login','resetPassword','dologin']);

    }

    public function resetPassword(Request $request)
    {
        if($request->has('resetPasswordEmail')){
            if($request->resetPasswordEmail == '' || $request->resetPasswordEmail == null){
                return response(['status' => 0 ,'msg' => Lang::get('cpanel/login.resetPasswordWrongEmail')]);
            }
            $findAccount = Account::where(['email'=>$request->resetPasswordEmail,'is_master' => true])->select('email','id','name','language')->first();
            if($findAccount){
                $emailVerificationsToday = account_verifications::where(['account_id'=> $findAccount->id ])->where('email_verification_code_sent_at','>',Carbon::now()->subday(1)->timestamp)->count();
                if($emailVerificationsToday > 10){
                    return response(['status' => 2 ,'msg' => Lang::get('cpanel/login.tooManyRequests')]);
                }
                $code = Str::random(6);
                $applyCode = Account::where(['email'=>$request->resetPasswordEmail,'is_master' => true])->update([
                    'recover_password_code' => bcrypt($code),
                    'recover_password_code_sent_at' => Carbon::now()->timestamp,
                ]);
                if($applyCode){
                    $email_content = Lang::get('mails/automated.reset_password_email');
                    $email_content['body'] = str_replace(':code:',$code,$email_content['body']);
                    $email_content['body'] = str_replace(':email:',$findAccount->email,$email_content['body']);
                    $data = [
                        'account_name' => $findAccount->name,
                        'account_email' => $findAccount->email,
                        'lang' => $findAccount->language,
                        'content' => $email_content,
                    ];
                    Mail::to($findAccount->email)->send(new automatedEmails($data));
                    return response()->json(['status' => 1 ]);
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
            $findAccount = Account::where([ 'phone'=> $request->resetPasswordPhone,'is_master' => true])->where('phone_verified_at','!=',null)->select('phone','id')->first();
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
                            'newPassword.required' => lang::get('cpanel/security/responses.newPasswordRequired'),
                            'newPassword.min' => lang::get('cpanel/security/responses.newPasswordMin'),
                            'newPassword.max' => lang::get('cpanel/security/responses.newPasswordMax'),
                            'newPassword.regex' => lang::get('cpanel/security/responses.newPasswordRegex'),
                            'newPassword.same' => lang::get('cpanel/security/responses.newPasswordSame'),

                            'newPasswordConfirm.required' => lang::get('cpanel/security/responses.newPasswordRequired'),
                            'newPasswordConfirm.min' => lang::get('cpanel/security/responses.newPasswordMin'),
                            'newPasswordConfirm.max' => lang::get('cpanel/security/responses.newPasswordMax'),
                            'newPasswordConfirm.regex' => lang::get('cpanel/security/responses.newPasswordRegex'),
                            'newPasswordConfirm.same' => lang::get('cpanel/security/responses.newPasswordSame'),
                        ]);
                        if ($validate->fails()) {
                            return response(['status' => 0, 'error' => $validate->errors()]);
                        }else if (!$validate->fails()) {
                            if(Account::where('id',$code->id)->update(['password' => bcrypt($request->newPassword)])){
                                //send email password changed
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

            $account = Account::where('email',$request->email)->select('id','name','website_id','password_fails','account_unblock_code','is_master')->first();
            if($account){
                if($account->password_fails > 10){
                    foodmenuFunctions::notification('0',null,[
                        'account_id' => $account->id,
                    ],$account->website_id);
                    if($account->account_unblock_code == null || $account->account_unblock_code == ''){
                        if($account->is_master){
                            Account::where('email',$request->email)->update(['account_unblock_code' => Str::random(100)]);
                            ///send email with the unblock link if master
                        }else{
                            $notification = notification::create([
                                'website_id' => $account->website_id,
                                'code' => 'system.subaccount_blocked',
                                'seen' => false,
                                'subaccount_id' => $account->id,
                                'subaccount_name' => $account->name,
                            ]);
                            foodmenuFunctions::notification('system.subaccount_blocked',null,[
                                'notification' => $notification,
                                'password_fails' => $account->password_fails,
                            ],$account->website_id);
                        }
                    }
                    if($account->is_master){
                        return response(['code' => 0, 'msg' => Lang::get('cpanel/login.accountBlocked') ]);
                    }else{
                        return response(['code' => 0, 'msg' => Lang::get('cpanel/login.accountBlocked2') ]);
                    }
                }else if (Auth::guard('account')->attempt(['email' => $request['email'] , 'password' => $request['password'] ],false)) {
                    Account::where('email',$request->email)->update([ 'password_fails' => 0 ]);
                    $request->session()->regenerate();
                    // Auth::guard('account')->logoutOtherDevices($request['password']);
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
        $solutions = Lang::get('cpanel/login.solutions');
        if($request->x != null){
            $rand = $request->x;
        }else{
            $rand = array_rand($solutions);
        }

        $solution = $solutions[$rand];
        return view('cpanel.login',['solution'=>$solution,'img' => $rand]);
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
        Account::where('id',Auth::guard('account')->user()->id)->update(['lastSeen' => Carbon::now()->timestamp]);
        return view('cpanel.cpanel');
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
            ['report' => $report,'lang'=>$request->lang,'date'=>$date->format('F Y'),'currency'=>$request->currency_symbol],
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
            if($this->account->is_master == true){
                $notificationCodes = ['system.domain.active','system.subaccount_blocked','orders.new_order_user','orders.delivered_by_delivery','orders.canceled_by_user','user.signup','review.posted','review.posted_survey','system.ticket_reply','system.financial_report','system.statistics_day.created'];
            }else{
                if(str_split($this->account->authorities)[0] == true){
                    array_push($notificationCodes,'orders.new_order_user');
                    array_push($notificationCodes,'orders.delivered_by_delivery');
                    array_push($notificationCodes,'orders.canceled_by_user');
                }
                if(str_split($this->account->authorities)[2] == true){
                    array_push($notificationCodes,'user.signup');
                }
                if(str_split($this->account->authorities)[1] == true){
                    array_push($notificationCodes,'review.posted');
                    array_push($notificationCodes,'review.posted_survey');
                }
            }
            $notifications = notification::where(['website_id' => $this->website_id,])
            ->where('created_at','<=',(int)$request->lastNotification_created_at)
            ->where('_id','!=',$request->lastNotification_id)
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
            foodmenuFunctions::notification('0',null,[
                'account_id' => Auth::guard('account')->user()->id,
            ],$this->website_id);
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
            ->get();
            $liveChats_guests = guest::where('website_id', $this->website_id)
            ->where('lastMsg_id','!=',null)
            ->with('last_msg')
            ->orderBy('lastChat','desc')
            ->take(15)
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
            ->get();
            $liveChats_guests = guest::where('website_id', $this->website_id)
            ->where('lastMsg_id','!=',null)
            ->where('lastChat','<',$request->lastMsgDate)
            ->with('last_msg')
            ->orderBy('lastChat','desc')
            ->take(15)
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
                return response(['deleteChatMessage' => 1,'now' => Carbon::now()->timestamp]);
            }else{
                return response(['deleteChatMessage' => 0]);
            }
        }
    }

    public function dashboard(Request $request)
    {
        if($request->has('firstLoad')){
            if($this->account->is_master == true){
                $website = website::where('id',$this->account->website_id)->select([
                    'id','plan','subscription_status',
                    'active','url','domainName','user_domainName',
                    'lat','lng','delivery_range',
                    'timeZone',
                    'hour12',
                    'country_code',
                    'restaurantEmail',
                    'phoneNumbers',
                    'addresses',
                    'currencies',
                    'websiteNames',
                    'websiteDescriptions',
                    'website_announcements',
                    'website_receiptMsgs',
                    'website_privacyPolicy',

                    'languages',

                    'facebookLink','youtubeLink','linkedinLink','twitterLink','instagramLink',

                    'expenses',
                    'month_expenses',

                    'icon','logo','icon_id','logo_id','metaImg','metaImg_id',

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
                    'langPopup',
                    'printerWidth',
                    'cart_lifeTime',
                    'fastLoading',

                    'useDelivery',
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
                    'averageDeliveryTime',
                    'workingDays_delivery',

                    'usePickup',
                    'cash_at_restaurant',
                    'card_at_restaurant',
                    'acceptPickupOrders24',
                    'pickupTaxCost',
                    'pickupTaxPercentage',
                    'usePickupTaxCost',
                    'pickupMinimumCharge',
                    'pickupMinimumChargeIncludes',
                    'averagePickupTime',
                    'workingDays_pickup',

                    'dineInTaxPercentage',
                    'dineInTaxCost',
                    'useDineInTaxCost',
                    'dineInServicePercentage',
                    'dineInServiceCost',
                    'useDineInServiceCost',
                    'workingDays_dinein',
                ])
                ->with(['deliveries'])
                ->withCount('paymentMethods')
                ->with(['accounts'=>function($q){
                    $q->select('authorities','is_master','email','website_id','id','name','password_fails','lastSeen');
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
                        'id','plan','subscription_status',
                        'active',
                        'url',
                        'domainName',
                        'user_domainName',
                        'lat','lng','delivery_range',
                        'timeZone',
                        'hour12',
                        'country_code',
                        'restaurantEmail',
                        'phoneNumbers',
                        'addresses',
                        'currencies',
                        'websiteNames',
                        'websiteDescriptions',
                        'website_announcements',
                        'website_receiptMsgs',
                        'website_privacyPolicy',

                        'languages',
                        'facebookLink','youtubeLink','linkedinLink','twitterLink','instagramLink',
                        'icon','logo','icon_id','logo_id','metaImg','metaImg_id',
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
                        'langPopup',
                        'printerWidth',
                        'cart_lifeTime',
                        'fastLoading',

                        'useDelivery',
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
                        'averageDeliveryTime',
                        'workingDays_delivery',

                        'usePickup',
                        'cash_at_restaurant',
                        'card_at_restaurant',
                        'acceptPickupOrders24',
                        'pickupTaxCost',
                        'pickupTaxPercentage',
                        'usePickupTaxCost',
                        'pickupMinimumCharge',
                        'pickupMinimumChargeIncludes',
                        'averagePickupTime',
                        'workingDays_pickup',

                        'dineInTaxPercentage',
                        'dineInTaxCost',
                        'useDineInTaxCost',
                        'dineInServicePercentage',
                        'dineInServiceCost',
                        'useDineInServiceCost',
                        'workingDays_dinein',
                    ])
                    ->with(['accounts'=>function($q){
                        $q->select('id','name','website_id');
                    }])
                    ->with(['deliveries'])

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
            // $website->websiteColorsHexCode = foodmenuFunctions::websiteColors()[$website->website_colors];
            // $website->templateData = foodmenuFunctions::templates()[$website->template];
            // $account = Auth::guard('account')->user();
            $this->account->planName = foodmenuFunctions::plans()[$website->plan]['name'];
            $settings = cpanelSettings::where('account_id',$this->account->id)->first();
            $foodMenuData = collect([
                'plans' => foodmenuFunctions::plans(),
                'langs'=> foodmenuFunctions::languages(),
            ]);
            if($this->account->language == 'en'){
                $help_articles = help_en_articles::inRandomOrder()->limit(6)->get();
            }
            $website->help_articles = $help_articles;
            return response([
                'website' => $website,
                'account' => $this->account,
                'settings' => $settings,
                'foodMenuData' => $foodMenuData,
                'autoHelp_text' => Lang::get('cpanel/autoHelp'),
                'texts' => [
                    'cpanel' => Lang::get('cpanel/cpanel'),
                    'support' => Lang::get('cpanel/support/texts'),
                    'settings' => Lang::get('cpanel/settings/texts'),
                    'users' => Lang::get('cpanel/users/texts'),
                    'staff' => Lang::get('cpanel/staff/texts'),
                    'products' => Lang::get('cpanel/products/texts'),
                    'design' => Lang::get('cpanel/design/texts'),
                    'orders' => Lang::get('cpanel/orders/texts'),
                    'security' => Lang::get('cpanel/security/texts'),
                    'dashboard' => Lang::get('cpanel/dashboard/texts'),
                    'activity_log' => Lang::get('cpanel/dashboard/activity_log'),
                ]
            ]);
        }
        else if($request->has('getData')){
            //////////
            if(str_split($this->account->authorities)[0] == false){
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
            if(str_split($this->account->authorities)[5]){
                $unSeenLiveChats = liveChat::where(['website_id'=>$this->website_id,'is_seen'=>false,'author'=>1])->get(['user_id','guest_id']);
            }
            foodmenuFunctions::notification('0',null,[
                'account_id' => $this->account->id,
            ],$this->account->website_id);
            /////////////
            $notificationCodes = [];
            $last_activites = [];
            if($this->account->is_master == true){
                $timezone =website::where('id',$this->website_id)->pluck('timeZone')->first();
                $notificationCodes = ['system.domain.active','system.subaccount_blocked','orders.new_order_user','orders.delivered_by_delivery','orders.canceled_by_user','user.signup','review.posted','review.posted_survey','system.ticket_reply','system.financial_report','system.statistics_day.created'];
                $todayOrders = order::where(function($q) use ($timezone){
                    $q->where('dinedin_at','>',Carbon::today($timezone)->timestamp);
                })->orWhere(function($q) use ($timezone){
                    $q->where('delivered_at','>',Carbon::today($timezone)->timestamp);
                })->orWhere(function($q) use ($timezone){
                    $q->where('pickedUp_at','>',Carbon::today($timezone)->timestamp);
                })->orWhere(function($q) use ($timezone){
                    $q->where('canceled_at','>',Carbon::today($timezone)->timestamp);
                })
                ->where(['website_id'=>$this->website_id])
                ->whereIn('status',[2,5,6,7])->orderBy('placed_at','asc')->get();
                //

                $last_activites = activityLog::where([
                    'website_id' => $this->website_id
                ])->orderBy('created_at','desc')->limit(5)->get();;

            }else{
                if(str_split($this->account->authorities)[0] == true){
                    array_push($notificationCodes,'orders.new_order_user');
                    array_push($notificationCodes,'orders.delivered_by_delivery');
                    array_push($notificationCodes,'orders.canceled_by_user');
                }
                if(str_split($this->account->authorities)[2] == true){
                    array_push($notificationCodes,'user.signup');
                }
                if(str_split($this->account->authorities)[1] == true){
                    array_push($notificationCodes,'review.posted');
                    array_push($notificationCodes,'review.posted_survey');
                }
                $todayOrders = [];
            }
            $notifications = notification::where(['website_id'=>$this->website_id,'seen'=>false])->whereIn('code',$notificationCodes)->get();
            ////
            return response([
                'notifications' => $notifications,
                'unSeenLiveChats' => $unSeenLiveChats,
                'incompleteOrders' =>$incompleteOrders,
                'todayOrders' => $todayOrders,
                'last_activites' => $last_activites,
            ]);
        }
        else if($request->has('getActivityLog')){
            if($this->account->is_master == false){return;}
            $timezone =website::where('id',$this->website_id)->pluck('timeZone')->first();
            if($request->lastActivity_created_at == '0'){
            $start = Carbon::createFromFormat('Y-m-d H:i:s',$request->year.'-'.$request->month.'-'.$request->day.' 00:00:00',$timezone)->setTimezone('UTC')->timestamp;
            $end = Carbon::createFromFormat('Y-m-d H:i:s',$request->year.'-'.$request->month.'-'.$request->day.' 23:59:59',$timezone)->setTimezone('UTC')->timestamp;
                $activities = activityLog::where('website_id',$this->website_id)
                ->whereBetween('created_at',[$start,$end])
                ->orderBy('created_at','desc')
                ->take(30)
                ->get();
            }else{
                $end = (int)$request->lastActivity_created_at - 1;
                $start = Carbon::createFromFormat('Y-m-d H:i:s',$request->year.'-'.$request->month.'-'.$request->day.' 00:00:00',$timezone)->setTimezone('UTC')->timestamp;
                $activities = activityLog::where('website_id',$this->website_id)
                ->whereBetween('created_at',[$start,$end])
                ->where('_id','!=',$request->lastActivity_id)
                ->orderBy('created_at','desc')
                ->take(30)
                ->get();
            }

                return response(['activities' => $activities]);
        }
        else if($request->has('deleteActivityLog')){
            if($this->account->is_master == false){return;}
            $deleteActivity = activityLog::where(['website_id'=>$this->website_id,'_id'=>$request->activity_id])->delete();
            if($deleteActivity){
                return response(['deleteActivityLogStat' => 1, 'msg' => Lang::get('cpanel/dashboard/activityLog.activityLogDeleted')]);
            }else{
                return response(['deleteActivityLogStat' => 0, 'msg' => Lang::get('cpanel/dashboard/activityLog.activityLogDeleteFail')]);
            }
        }
        /////////
        else if($request->has('load_statistics')){
            if($request->period == 'day'){
                if($request->compare == 0){
                    $statistics1_hours = statistics_hour::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day1,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->orderBy('hour','asc')->get();
                    $statistics1_day = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day1,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->first();
                    return response([
                        'statistics1'=>$statistics1_day,
                        'statistics1_'=>$statistics1_hours,
                    ]);
                }else if($request->compare == 1){
                    $statistics1_hours = statistics_hour::where([
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
                    $statistics1_day = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day1,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->first();
                    $statistics2_day = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'day' => (int)$request->day2,
                        'month' => (int)$request->month2,
                        'year' => (int)$request->year2,
                    ])->first();
                    return response([
                        'statistics1'=>$statistics1_day,
                        'statistics1_'=>$statistics1_hours,
                        'statistics2'=>$statistics2_day,
                        'statistics2_'=>$statistics2_hours,
                    ]);
                }
            }else if($request->period == 'month'){
                if($request->compare == 0){
                    $statistics1_days = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->orderBy('day','asc')->get();
                    $statistics1_month = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->first();
                    return response([
                        'statistics1'=>$statistics1_month,
                        'statistics1_'=>$statistics1_days,
                    ]);
                }else if($request->compare == 1){
                    $statistics1_days = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->orderBy('day','asc')->get();
                    $statistics1_month = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month1,
                        'year' => (int)$request->year1,
                    ])->first();
                    $statistics2_days = statistics_day::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month2,
                        'year' => (int)$request->year2,
                    ])->orderBy('day','asc')->get();
                    $statistics2_month = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'month' => (int)$request->month2,
                        'year' => (int)$request->year2,
                    ])->first();
                    return response([
                        'statistics1'=>$statistics1_month,
                        'statistics1_'=>$statistics1_days,
                        'statistics2'=>$statistics2_month,
                        'statistics2_'=>$statistics2_days,
                    ]);
                }
            }else if($request->period == 'year'){
                if($request->compare == 0){
                    $statistics1_months = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'year' => (int)$request->year1,
                    ])->orderBy('month','asc')->get();
                    if($statistics1_months->count() == 0){$statistics1_months = null;}
                    return response([
                        'statistics1'=>$statistics1_months
                    ]);
                }else if($request->compare == 1){
                    $statistics1_months = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'year' => (int)$request->year1,
                    ])->orderBy('month','asc')->get();
                    $statistics2_months = statistics_month::where([
                        'website_id'=>$this->website_id,
                        'year' => (int)$request->year2,
                    ])->orderBy('month','asc')->get();
                    if($statistics1_months->count() == 0){$statistics1_months = null;}
                    if($statistics2_months->count() == 0){$statistics2_months = null;}
                    return response([
                        'statistics1'=>$statistics1_months,
                        'statistics2'=>$statistics2_months
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
