<?php

namespace App\Http\Controllers\cpanel;

use App\Events\admins;
use App\Http\Controllers\Controller;
use App\Models\ticket;
use App\Models\ticket_msg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use stdClass;

class supportController extends Controller
{
    protected $account;
    protected $website_id;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->account = Auth::guard('account')->user();
            if($this->account->is_master == false){
                return;
            }
            $this->website_id = $this->account->website_id;
            App::setlocale($this->account->language);
            return $next($request);

        });

    }
    public function support(Request $request){
        if($this->account->is_master == false){
            return;
        }
        if($request->has(['submitTicket'])){
            $ticketComments = ($request->ticketComments);
            $ticketImgs = ($request->ticketImgs);

            $submitTicket = ticket::create([
                'website_id' => $this->website_id,
                'code' => $request->ticketCode,
                'status' => 0,
                'title' => strip_tags($request->ticketTitle),
                'msg' => strip_tags($request->ticketMsg),
                'comments' => strip_tags($ticketComments),
                'imgs' => $ticketImgs,
                'language' => $request->ticketLanguage,
            ]);
            if($submitTicket){
                $ticket = ticket::where('id' ,$submitTicket->id)
                ->with(['websites'=>function($q){
                    $q->select('domainName','id','url');
                }])->first();
                $admin = new stdClass();
                $admin->ticket = $ticket;
                $admin->status = 0;
                broadcast(new admins($admin))->toOthers();
                return response(['ticket' => $ticket,'submitTicketStatus' => 1,'msg' => Lang::get('cpanel/support/responses.submitTicketSaved') ]);
            }else{
                return response(['submitTicketStatus' => 0,'msg' => Lang::get('cpanel/support/responses.submitTicketSaveFailed')]);
            }
        }
        else if ($request->has('getTickets')){
            $tickets = ticket::where('website_id',$this->website_id)
            ->take(10)->skip($request->skip)->orderBy($request->orderBy,$request->order)->get();
            $ticketsCount = ticket::where('website_id',$this->website_id)->count();

            return response(['tickets' => $tickets,'ticketsCount'=>$ticketsCount]);
        }
        else if($request->has('getTicket')){
            $ticket = ticket::where(['id'=>$request->getTicket,'website_id' => $this->website_id])
                ->with(['ticket_msgs'])->first();
            return response(['ticket' => $ticket]);
        }
        else if($request->has('sendTicketMSg')){
            $sendTicketMsg = ticket_msg::create([
                'website_id' => $this->website_id,
                'author' => 0,
                'ticket_id' => $request->ticketId,
                'msg' => strip_tags($request->msg),
            ]);
            if($sendTicketMsg){
                ticket::where(['id'=>$request->ticketId,'website_id' => $this->website_id])->update([
                    'status' => 1,
                ]);
                $admin = new stdClass();
                $admin->status = 2;
                $admin->ticket = ticket::where('id',$request->ticketId)
                    ->with(['websites'=>function($q){
                        $q->select('domainName','id','url');
                    }])->first();
                $admin->msg = $sendTicketMsg;
                broadcast(new admins($admin))->toOthers();
                return response(['ticketMsg' => $sendTicketMsg ]);
            }
        }
    }
}
