<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;

class foodmenu_customer_support extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'foodmenu_customer_support';// make sure that the article id is unique
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $domain = env('APP_DOMAIN');
        $old_article_id = help_en_articles::where('title_id',$title_id)->pluck('id')->first();
        help_en_articles::where('id',$old_article_id)->delete();
        help_en_sections::where('article_id',$old_article_id)->delete();

        $sections = [];

        $article = help_en_articles::create([
            'sort' => 1,
            'title_id' => $title_id,
            'title' => "Foodmenu's customer support",
            'description' => 'Our team is here to address any issues you may encounter with your account through help tickets. Read this guide to learn how to successfully submit a help ticket.',
            'icon' => 'ico-ticket',
            'category' => 'basics',
            'keyWords' => 'support.issue',
            'rating' => 0,
        ]);

        $sort = 0;

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is the customer support offered by Foodmenu?',
            'keyWords' => 'resolve issue submit help ticket support customer problem',
            'html' => <<<string
                <p>
                    We offer you quick customer support through our specialist team, who are ready to promptly resolve any issues you encounter. This is done by submitting a help ticket for our team to resolve.
                </p>
                <p>
                    To get to the page where you can submit a help ticket, go to the control panel menu and select <b>Support</b>. A few subsections will appear, including <a href="{$cpanel}/?page=submit_a_help_ticket" target="_blank"><b>Submit a help ticket<span class="ico-open newTabLink"></span></b></a>. When you click on it, a page will open where you can submit tickets.
                </p>
                <div class="tipContainer tipContainer_green">
                    <span class="ico-lamp"></span>
                    <span>You can always reach us at support@{$domain} for further assistance.</span>
                </div>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How to submit a help ticket?',
            'keyWords' => 'help ticket subject type history',
            'html' => <<<string
                <img class="articleImg" src="/storage/imgs/help/articles/submit_help_ticket.png" />
                <ul>
                    <li>
                        In the <b>Ticket subject</b> input box, you can enter a short subject that accurately describes your issue, without needing to go into detail.
                    </li>
                    <li>
                        In the <b>Select ticket type</b> input list, you can specify the type of issue you're facing by choosing from the different options provided in the list. You can select "other" if the list doesn't include any options for the issue type you are dealing with.
                    </li>
                    <li>
                        In the <b>Issue description</b> input box, you can describe your problem in detail with a maximum of 1000 characters.
                    </li>
                    <li>
                        In the <b>Attached images</b> area, you can better demonstrate your issue through images or screenshots. To attach an image to the help ticket, click on <b>Attach an image</b> to upload the image(s), up to a maximum of four images. Note that each image's size shouldn't be larger than 1MB.
                    </li>
                </ul>
                <div class="tipContainer tipContainer_orange">
                    <span class="ico-lamp"></span>
                    <span>If you wish to attach several images or upload an image larger than 1MB, you can send them to <b>support@{$domain}</b>, with the ticket number as the email subject.</span>
                </div>
                <p>
                    After filling out all the help ticket's details, click on the <b>Submit ticket</b> button. All the tickets that have been submitted can be found in the <a page="article" cat="basics" article="your-accounts-help-tickets" class="openPage" tooltip="article" href="{$helpCenter}/en/articles/basics/your-accounts-help-tickets"><b>Ticket history</b></a>.
                </p>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
