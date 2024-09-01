<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class adjusting_the_control_settings extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'adjusting_the_control_settings';// make sure that the article id is unique
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
            'title' => "Adjusting the control settings",
            'description' => "The control settings will allow you to modify some of the ways actions can be performed on the control panel, to suit your preferences.",
            'icon' => "ico-settings",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "control_panel_settings",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What are the control settings?',
            'keyWords' => 'control panel settings',
            'html' => <<<string
            <p> The <b>Control settings</b> will assist you in adjusting some of the actions you take on the control panel. To reach this section of the control panel, go to <b>Settings</b> in the Control Panel Menu, then select <a>Control panel settings</a>.</p>
            <p>A page will open showing several tabs, locate and tap on <b>Control settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/control_panel_settings.png" />
            <p>In this section of the control panel settings, you will be able to adjust a few actions taken on your account by enabling or disabling these buttons.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/control_settings.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Tooltips',
            'keyWords' => 'tooltips',
            'html' => <<<string
            <p>
            Tooltips are text tags that guide you while moving across the control panel, they appear automatically when you hover your mouse over an item that has a tooltip and provide you with information regarding this item.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/control_settings.png" />
            <p>
            To enable Tooltips, switch on the <b>Enable tooltip</b> button, or you can have them disabled by switching off the button.
            </p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Alerts',
            'keyWords' => 'alerts',
            'html' => <<<string
            <p>
            Alerts are small pop-up messages that appear on the bottom right corner of your screen to notify you of a message or notification.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/alerts.png" />
            <p>
            You can have only one alert appear at a time when you switch on the <b>Don't show more than one alert at a time</b> button, and another will replace the alert if a different alert appears before the preceding alert's duration expires.
            </p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>Alternatively, if you want more than one alert to appear at the same time, you can switch off the button.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Critical actions',
            'keyWords' => 'critical actions',
            'html' => <<<string
            <p>You have the option to enable double-click functionality for some of the critical actions on the control panel, such as accepting or canceling an order.</p>
            <p>To enable this feature, switch on the <b>Click twice to confirm actions</b> button, or you can disable this option by switching off the button. </p>
            <p>Once this feature is enabled, the process works as follows: after the first click, the button turns orange, and the second click confirms the action. You can also cancel the first click by clicking elsewhere other than the confirmation button.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/criticalactions.gif" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Share reminder',
            'keyWords' => 'social media share reminder',
            'html' => <<<string
            <p>The share reminder feature prompts you to share products or product categories from your website on your social media platforms.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/share_reminder.png" />
            <p>When you switch on the <b>Enable share reminders</b> button, you'll get a pop-up every 30 minutes of a random product or product category on your account, reminding you to share it. </p>
            <p>The popup window will allow you to select the social media platform to which you will share your product, along with selecting the language to share in. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/sharereminder_popup.png" />
            <p>
            <div>When you have this button switched off, you won't receive any share reminders.</div>
            <div>By default, this option will be disabled. To learn more about the share tool, check out this <a>article</a>.</div>
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Only the main account and sub-accounts with permission to manage categories and products can use this feature.</span>
            </div>
            string,
        ]);
        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Chat window popup',
            'keyWords' => 'live chat window popup',
            'html' => <<<string
            <p>When you switch on the <b>Enable chat window popup</b> button, the popup chat window will appear with each incoming live chat message.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/chat_popup.gif" />
            <p>If you switch off the button, no window will pop up when you receive an incoming live chat message. You will still be notified of new messages via the navigation bar.</p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span> keep in mind that if you have the <b>Go invisible</b> mode enabled, the chat window popup function will be disabled.</span>
            </div>
            string,
        ]);
        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Saving changes',
            'keyWords' => '',
            'html' => <<<string
            <p>
            After making any changes to the control panel settings, click on <b>Save</b>, or click on <b>Cancel</b> to restore the last saved changes.
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span> Any changes you apply only affect your main account, or if you're using a sub-account, the changes only apply to that account.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
