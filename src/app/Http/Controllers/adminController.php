<?php

namespace App\Http\Controllers;

use App\Events\admins;
use App\Models\admins_logs;
use App\Models\bug;
use App\Models\foodmenuFunctions;
use App\Models\notification;
use App\Models\ticket;
use App\Models\ticket_msg;
use App\Models\website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use stdClass;

class adminController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {


            return $next($request);
        });
    }
    public function login(){
        return view('admin.login');
    }
    public function dologin(Request $request){

        if(Auth::guard('admin')->attempt(['adminName'=>$request['adminName'],'password'=>$request['password']])){
            // admins_logs::create(['admin_id'=> Auth::guard('admin')->user()->id,'code'=> 1, ]);
            $request->session()->regenerate();
            return redirect()->route('admin.home');
        }else{
            return redirect()->route('admin.login',['error'=>1]);
        }
    }
    public function logout(Request $request){
        // admins_logs::create(['admin_id'=> Auth::guard('admin')->user()->id,'code'=> 0, ]);
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('admin.login');
    }
    public function home(Request $request){
        $newTickets = ticket::where('status' , 0)->orderBy('created_at', 'desc')
        ->with(['websites'=>function($q){
            $q->select('domainName','id','url');
        }])
        ->get();

        $openTickets = ticket::where('status' , 1)->orderBy('updated_at', 'desc')
        ->with(['websites'=>function($q){
            $q->select('domainName','id','url');
        }])
        ->get();

        $pendingTickets = ticket::where('status' , 2)->orderBy('updated_at', 'desc')
        ->with(['websites'=>function($q){
            $q->select('domainName','id','url');
        }])
        ->get();

        $solvedTickets = ticket::where('status' , 3)->orderBy('updated_at', 'desc')
        ->with(['websites'=>function($q){
            $q->select('domainName','id','url');
        }])
        ->limit(20)
        ->get();
        $closedTickets = ticket::where('status' , 4)->orderBy('updated_at', 'desc')
        ->with(['websites'=>function($q){
            $q->select('domainName','id','url');
        }])
        ->limit(20)
        ->get();
        $bugs = bug::where('isSolved',false)->get();
        return view('admin.home',[
            'newTickets' => $newTickets,
            'openTickets' => $openTickets,
            'pendingTickets' => $pendingTickets,
            'solvedTickets' => $solvedTickets,
            'closedTickets' => $closedTickets,
            'bugs' => $bugs,
        ]);
    }
    public function getInfo(Request $request){
        if($request->has('getTicket')){
            $ticket = ticket::where('id',$request->getTicket)
                ->with('websites')
                ->with(['ticket_msgs' => function($q){
                    $q->with('admins:adminName,id');
                }])
                ->get();
            return response(['ticket' => $ticket]);
        }
        else if($request->has('postTicketMsg')){
            $postTicketMsg = ticket_msg::create([
                'website_id'=>$request->websiteId,
                'admin_id'=> Auth::guard('admin')->user()->id,
                'author'=> 1,
                'ticket_id' => $request->postTicketMsg,
                'msg' => $request->msg,
            ]);
            $postTicketMsg->admins->adminName = Auth::guard('admin')->user()->adminName;
            if($postTicketMsg){
                ticket::where('id',$request->postTicketMsg)->update(['status' => 2]);
                $notification = notification::create([
                    'code' => 'system.ticket_reply',
                    'seen' => false,
                    'ticket_id' => (int)$request->postTicketMsg,
                    'website_id' => (int)$request->websiteId,
                ]);

                foodmenuFunctions::notification('system.ticket_reply',null,[
                    'notification' => $notification,
                    'reply' => $postTicketMsg,
                ],$request->websiteId);

                $admin = new stdClass();
                $admin->status = 1;
                $admin->msg = $postTicketMsg;
                $admin->ticket = ticket::where('id',$request->postTicketMsg)
                    ->with(['websites'=>function($q){
                        $q->select('domainName','id','url');
                    }])->first();
                $admin->domainName = website::where('id',$request->websiteId)->pluck('domainName')->first();
                broadcast(new admins($admin));
                // return response(['msg' => $postTicketMsg]);
            }
        }
        else if($request->has('ticketSolved')){
            ticket::where('id',$request->ticketSolved)->update(['status'=>3]);
            $admin = new stdClass();
            $admin->status = 3;
            $admin->ticket = ticket::where('id',$request->ticketSolved)
                ->with(['websites'=>function($q){
                    $q->select('domainName','id','url');
                }])->first();
            broadcast(new admins($admin));

            foodmenuFunctions::notification('system.ticket_solved',null,[
                'ticket_id' => $request->ticketSolved,
            ],$request->websiteId);
        }
        else if($request->has('ticketClosed')){
            ticket::where('id',$request->ticketClosed)->update(['status'=>4]);
            $admin = new stdClass();
            $admin->status = 3;
            $admin->ticket = ticket::where('id',$request->ticketClosed)
                ->with(['websites'=>function($q){
                    $q->select('domainName','id','url');
                }])->first();
            broadcast(new admins($admin));
            foodmenuFunctions::notification('system.ticket_solved',null,[
                'ticket_id' => $request->ticketClosed,
            ],$request->websiteId);
        }
    }
}
