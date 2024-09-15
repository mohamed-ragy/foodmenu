<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class live_chat_system_settings extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'live_chat_system_settings';// make sure that the article id is unique
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
            'title' => "Live chat system settings",
            'description' => "In this article, you will learn how to configure the function of your website's live chat feature so that it operates according to your preferences.",
            'icon' => "ico-chat",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "live_chat",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How to adjust the live chat feature?',
            'keyWords' => 'live chat',
            'html' => <<<string
            <p>
            The live chat feature serves as an efficient way of engaging with your customers and responding to their inquiries. To configure its function settings, go to <b>Settings</b> in the control panel menu, then <a>System</a>.
            </p>
            <p>A page will open with several tabs, locate and tap on <b>System settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/system_settings.png" />
            <p>You'll then find several subsections for configuring website settings, including <b>Live chat system settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/live_chat_settings.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Enable live chat',
            'keyWords' => 'enable live chat',
            'html' => <<<string
            <p>
            To enable the live chat feature on your website, switch on the <b>Enable live chat</b> button, which will display the live chat icon in the bottom right corner of your website page. Alternatively, you can switch off the button to disable the live chat feature.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/live_chat_icon.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Enable guest live chat',
            'keyWords' => 'guest chat',
            'html' => <<<string
            <p>
            When you switch on the <b>Enable guest live chat</b> button, any visitor to your website, whether registered or unregistered, can use the live chat feature and chat with you. If you want to limit the live chat to registered users only, switch off the button.
            </p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Saving changes',
            'keyWords' => '',
            'html' => <<<string
            <p>
            After making any changes to the live chat system settings, click on <b>Save</b> at the bottom of the page to avoid losing the changes, or click on <b>Cancel</b> to restore the last saved changes.
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Any changes you apply to the system settings only affect your main account, or if you're using a sub-account, the changes only apply to that account.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
