<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class employing_live_chat_on_your_website extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'employing_live_chat_on_your_website';// make sure that the article id is unique
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $domain = env('APP_DOMAIN');
        $old_article_id = help_en_articles::where('title_id',$title_id)->pluck('id')->first();
        help_en_articles::where('id',$old_article_id)->delete();
        help_en_sections::where('article_id',$old_article_id)->delete();

        $sections = [];

        $article = help_en_articles::create([
            'sort' => 0,//change this to the number of the article sort
            'title_id' => $title_id,
            'title' => "Employing live chat on your website",
            'description' => "Live chat is the most convenient way to engage with website visitors. This article will guide you through using it for your restaurant.",
            'icon' => "ico-chat",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "live_chat",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Live chat',
            'keyWords' => 'live chat customer support.',
            'html' => <<<string
            <p>Visitors to your website can chat with you directly using live chat. It's a great way for your staff to handle customer questions quickly and efficiently. </p>
            <p>
            <div>It is convenient for visitors because they can continue to browse your site while chatting without having to switch windows.</div>
            <div>To use the live chat tool, click on the live chat icon <span class="ico-"></span> in the control panel's navigation bar.</div>
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/live_chat.png" />
            <p>Upon clicking on it, a drop-down chat list appears. The chat list displays all of the chat history between you and your website visitors.</p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Chat list',
            'keyWords' => 'user guest chat list',
            'html' => <<<string
            <p>The chat list divides conversations with website visitors into two sections: Users and Guests. Users are logged-in visitors, whereas Guests are those who have not logged in.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/chat_list.png" />
            <div class="tipContainer tipContainer_green">
                <span class="ico-lamp"></span>
                <span>A chat box represents each conversation in the list.</span>
            </div>
            <p>When you hover over a chat box, a three-dot menu icon will appear. Upon clicking on it, you'll be provided with options for different actions with the visitor you’re conversing with.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/chat_menu.png" />
            <p>By clicking on a chat box, the live chat window opens, displaying the chat exchange.</p>
            <div class="tipContainer tipContainer_orange">
                <span class="ico-lamp"></span>
                <span>A chat exchange with a guest is permanently deleted after 7 days of the guest’s inactivity.</span>
            </div>
            <img class="articleImg" src="/storage/imgs/help/articles/chat_window.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Live chat menu',
            'keyWords' => 'live chat go invisible',
            'html' => <<<string
            <p>At the top of the chat list, you will find a three-dot menu icon.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/chat_menu.png" />
            <p>
            <div>Upon clicking on it, a couple of live chat options will get displayed, as follows:</div>
            <ul>
            <li><b>Mute:</b> Checking the mute box will silence notification sounds for new messages. Unchecking it will restore the sound of incoming messages. You can set your preferred message tone in the <a>control panel settings</a>.</li>
            <li>
            <div><b>Go Invisible:</b> Use the <b>Go invisible</b> switch to control your restaurant's availability to website visitors. When turned on, your live chat appears offline, hiding your availability. Turning it off displays your current status. </div>
            <div>This setting applies only to the account using it. To appear offline, all accounts with chat permissions must either be offline or have this switch enabled.</div>
            </li>
            <div class="tipContainer tipContainer_orange">
                <span class="ico-lamp"></span>
                <span>Messages received while offline are marked as sent but not delivered.</span>
            </div>
            <li>
            <div><b>Chat window popup:</b> Activating the <b>Enable chat window popup</b> button causes the chat window to pop up for each new live chat message. The popup starts as inactive, showing unseen messages. Clicking anywhere on the window, except the minimize and close buttons, activates it, indicating you’ve seen the message.</div>
            <div>Disabling this button stops the pop-ups, but new message notifications will still appear in the navigation bar.</div>
            </li>
            </ul>
            </p>
            <div class="tipContainer tipContainer_green">
                <span class="ico-lamp"></span>
                <span>Keep in mind that enabling the <b>Go invisible</b> mode disables the chat window popup function, but you will still receive notifications of new messages via the navigation bar.</span>
            </div>
            string,
        ]);


        help_en_sections::insert($sections);
    }
}
