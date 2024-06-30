<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class the_control_panels_navigation_bar extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'the_control_panels_navigation_bar';// make sure that the article id is unique
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
            'title' => "The control panel’s navigation bar",
            'description' => "The navigation bar helps you to effortlessly check key areas in your account by using the clickable buttons at the top of your pages.",
            'icon' => "ico-menu2",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "navigation_bar",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is the navigation bar?',
            'keyWords' => 'control panel navigation bar tools',
            'html' => <<<string
            <p>
            The navigation bar is a bar found at the very top of the control panel, displaying the opened section’s name and a set of important icons, including
            <ul>
                <li>Guide alerts</li>
                <li>Incomplete orders</li>
                <li>Live chat</li>
                <li>Notifications</li>
                <li>Menu</li>
            </ul>
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/navigation_bar.png" />

            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Guide alerts',
            'keyWords' => 'guide alerts mode account',
            'html' => <<<string
            <p>The Guide alerts are one of the features within the guide mode that offer guidance to users while navigating the control panel.</p>
            <p>When you tap the <b>Guide alerts</b> icon, a drop-down menu will appear with important alerts on your account or website, such as when information is missing or action is required. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/guide_alerts.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Incomplete orders',
            'keyWords' => 'incomplete orders alerts',
            'html' => <<<string
            <p>The <b>Incomplete orders</b> icon <span class="ico-orders"></span> alerts you of any orders that need your confirmation or action to be completed.</p>
            <p>When you tap the icon, a drop-down menu appears, displaying the <a>status</a> and quantity of the incomplete orders. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/incomplete_orders.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Live chat',
            'keyWords' => 'live chat',
            'html' => <<<string
            <p>
            <div>The <a>Live chat</a> icon <span class="ico-"></span> allows you to use your restaurant's live chat tool.</div>
            <div>When you tap the icon, a drop-down menu with all of your restaurant's chat exchanges appears. By clicking on a chat box, a window opens to chat with your website visitor.</div>
            </p>
            <img class=articleImg" src="/storage/imgs/help/articles/live_chat.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Notifications',
            'keyWords' => 'notifications alerts activities',
            'html' => <<<string
            <p>
            <div>The <b>Notifications</b> icon <span class="ico-"></span> is used to notify you of activities happening on your website or your account.</div>
            <div>When you tap the icon, a drop-down menu appears with all the notifications.</div>
            </p>
            <img class=articleImg" src="/storage/imgs/help/articles/notifications.png" />
            string,
        ]);


        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Menu',
            'keyWords' => 'side menu control panel',
            'html' => <<<string
            <p>
            <div>The <b>Menu</b> icon <span class="ico-"></span> is used to navigate the control panel’s many sections, when you tap the icon a drop-down menu appears with all the sections.</div>
            <div>This icon appears instead of the side menu when the width of your screen is less than 720 pixels.</div>
            </p>
            <img class=articleImg" src="/storage/imgs/help/articles/menu.png" />
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
