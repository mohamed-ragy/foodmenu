<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut17 extends Seeder
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
        $helpTut = help_en_tut::where('id',17)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }

        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $domain = env('APP_DOMAIN');
        help_en_text::where('help_en_tut_id',17)->delete();
        help_en_tut::where('id',17)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>17,
            'sort' => 13,
            'title_id' => 'Foodmenus-Customer-Support',
            'title' => 'Foodmenu’s Customer Support',
            'description' => 'Our team is here to address any issues you may encounter with your account through help tickets. Read this guide to learn how to successfully submit a help ticket.',
            'icon' => 'ico-ticket',
            'helpCat' => 'basics',
            'keyWords' => 'support',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>17,
            'title' => 'What is the customer support offered by Foodmenu?',
            'keyWords' => 'support help ticket report issue problem',
            'html' => <<<string
                <p>
                    We offer you quick customer support through our specialist team, who are ready to promptly resolve any issues you encounter. This is done by submitting a help ticket for our team to resolve.
                </p>
                <p>
                    To get to the page where you can submit a help ticket, go to the control panel menu and select <b>Support</b>. A few subsections will appear, including <a href="{$cpanel}/?page=submit_a_help_ticket" target="_blank"><b>Submit a Help Ticket<span class="ico-open newTabLink"></span></b></a>. When you click on it, a page will open in which you can submit a help ticket.
                </p>
                <div class="tipContainer tipContainer_green">
                    <span class="ico-lamp"></span>
                    <span>You can always reach us at support@{$domain} for further assistance.</span>
                </div>
            string,
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>17,
            'title' => 'How to submit a help ticket?',
            'keyWords' => 'support help ticket report issue problem',
            'html' => <<<string
                <img class="articleImg" src="/storage/imgs/help/articles/submit_help_ticket.png" />
                <p>
                    In the <b>Ticket subject</b> input box, you can enter a short subject that accurately describes your issue, but you do not need to go into detail here.
                </p>
                <p>
                    In the <b>Select ticket type</b> input list, you can specify the type of issue you're facing by choosing from the different options provided in the list. You can select "other" if there are no options for the issue type you are dealing with on the list.
                </p>
                <p>
                    In the <b>Issue description</b> input box, You can describe your problem in detail with a maximum character of 1000 characters.
                </p>
                <p>
                    In the <b>Attached images</b> area, you can better demonstrate your issue through images or screenshots. To attach an image to the help ticket, click on <b>Attach an image</b> to upload the image(s), up to a maximum of four images. Note that each image's size shouldn't be larger than 1MB.
                </p>
                <div class="tipContainer tipContainer_orange">
                    <span class="ico-lamp"></span>
                    <span>If you wish to attach several images or upload an image larger than 1MB, you can send them to our help email <b>support@{$domain}</b>, with the ticket number as the email subject.</span>
                </div>
                <p>
                    After filling out all the help ticket's details, click on the <b>Submit ticket</b> button. All the tickets that have been submitted can be found in the <a page="article" cat="basics" article="Your-Accounts-Help-Tickets" class="openPage" tooltip="article" href="{$helpCenter}/en/articles/basics/Your-Accounts-Help-Tickets"><b>Ticket History</b></a>.
                </p>
            string,
        ]);
        help_en_text::insert($tutsTexts);

    }
}
