<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use App\Models\Account;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;

use Illuminate\Queue\SerializesModels;

class automatedEmails extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $data;
    public function __construct($data)
    {
        $data['content'] = str_replace(':CPANEL_URL:',env('CPANEL_URL'),$data['content']);
        $data['content'] = str_replace(':APP_URL:',env('APP_URL'),$data['content']);
        $data['content'] = str_replace(':lang:',$data['lang'],$data['content']);
        
        $this->data = $data;

    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            from: new Address('noreply@food-menu.net', 'Foodmenu'),
            subject: $this->data['content']['subject'],
            to: $this->data['account_email']
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'mails.foodmenu.automated',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
