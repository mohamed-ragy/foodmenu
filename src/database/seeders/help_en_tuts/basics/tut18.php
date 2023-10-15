<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut18 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $upRates;
    protected $downRates;


    public function run()
    {
        $helpTut = help_en_tut::where('id',18)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        help_en_text::where('help_en_tut_id',18)->delete();
        help_en_tut::where('id',18)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>18,
            'sort' => 14,
            'title_id' => 'Your-Accounts-Help-Tickets',
            'title' => 'Your Account’s Help Tickets',
            'description' => 'Check out this article to learn how to keep track of status changes for your support tickets in the ticket history.',
            'icon' => 'ico-ticket_history',
            'helpCat' => 'basics',
            'keyWords' => 'support',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>18,
            'title' => 'The Ticket History',
            'keyWords' => 'support help ticket report issue problem',
            'html' => <<<string
                <p>
                All your submitted tickets are archived in the ticket history. To reach this part of the control panel, click on <b>Support</b> in the control panel menu, where a few subsections will appear, including <a href="{$cpanel}/?page=ticket_history" target="_blank"><b>Ticket History</b></a>. When you click on it, a page will open showing all the help tickets.</p>
                <p>
                <div>Each ticket is sorted into a row, which displays the ticket's key details. The details include<div>
                <ul>
                <li>Ticket number</li>
                <li>Subject</li>
                <li>Status</li>
                <li>Submission date</li>
                </ul>
                </p>
                <p>The tickets are organized in reverse chronological order by default, making it easy to find recently added tickets.</p>
                <img class="articleImg" src="/storage/imgs/help/articles/ticket_history.png" />
                <p>By clicking on any ticket row, a ticket browser window will open, allowing you to view the full details of the ticket and respond to our support team if a help ticket is still open or awaiting your response.</p>
            string,
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>18,
            'title' => 'Tickets Status',
            'keyWords' => 'support help ticket report issue problem',
            'html' => <<<string
                <p>
                <p>Any submitted help ticket gets a status assigned to it. The statuses are classified as follows:</p>
                <ol>
                <li><b>Open:</b> When a help ticket is marked as open, it means that we are actively working to resolve your problem as soon as possible.</li>
                <li><b>Awaiting your response:</b> When a help ticket is marked as such, it means we have replied to your issue and are asking for more information or more details about the issue in order to fully resolve it.</li>
                <li><b>Resolved:</b> If a help ticket is marked as resolved, it means your problem has been resolved and the ticket has been closed.</li>
                </ol>
                </p>
            string,
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>18,
            'title' => 'Ticket Browser',
            'keyWords' => 'support help ticket report issue problem',
            'html' => <<<string
            <p>
            By clicking on any help ticket's row, the <b>Ticket browser</b> window will open. You can see the interactions for the help ticket so far in this window
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/ticket_browser.png" />
            <p>
            You'll also see a <b>Reply</b> input box where you can write a response to us on the help ticket if the status is <b>open</b> or <b>awaiting your response</b>. The maximum length of a response is 1000 characters. After you've written your response, click on the <b>send</b> button to send it to us.
            </p>
            string,
        ]);
        help_en_text::insert($tutsTexts);

    }
}
