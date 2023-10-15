<?php

namespace App\Mail;

use App\Models\Account;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class welcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $account;
    public $lang;

    public function __construct($account_id,$lang)
    {
        $this->account = Account::where('id',$account_id)->first();
        $this->lang = $lang;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.foodmenu.welcomeMail')
                        ->subject(trans('mails/foodmenu/welcomeMail.title'));
    }
}
