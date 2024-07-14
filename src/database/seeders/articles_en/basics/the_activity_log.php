<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class the_activity_log extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'the_activity_log';// make sure that the article id is unique
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
            'title' => "The activity log",
            'description' => "The activity log allows you to view all activities taking place on your account and website. Check out this guide to learn how to use it.",
            'icon' => "ico-",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "activity_log.website_activity",//the article keywords spreat them using . 
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'The activity log',
            'keyWords' => 'Activity log website account',
            'html' => <<<string
            <p>The activity log is a record of actions on your website or account. It helps you track activities, detect data misuse, and ensure staff adherence. It is also helpful for understanding your website's users. You can learn about their search and buying habits by looking at their actions and behavior.</p>
            string,
        ]);

        
        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How to view the activity log?',
            'keyWords' => 'activity log',
            'html' => <<<string
            <p>To access your activity record, go to the <b>Dashboard</b> section in the control panel menu, then to <a>Activity log</a>. After opening the intended page, you'll be provided with a window where you can find all the live activities carried out.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/activity_log.png" />
            <p>If you want to view the activities of a particular day, you can select the day from the date picker provided, then click on <b>Find</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/date_picker.png" />
            <p>Each activity record gets displayed in a separate row, showing the date of that activity in the selected date and a <b>Delete</b> button <span class="ico-delete></span> that allows you to permanently delete the activity record.</p>
            <p>When an activity is performed on the control panel, it will show which sub-account has carried out this activity. This way, you can keep track of all actions on your account.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/action_by_account.png" />
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Only the main account can view and access the activity log.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
