<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class adjusting_your_restaurants_working_hours extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'adjusting_your_restaurants_working_hours';// make sure that the article id is unique
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
            'title' => "Adjusting your restaurant's working hours",
            'description' => "This guide will assist you in setting the operating hours of your restaurant and customizing further settings.",
            'icon' => "ico-clock",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "working_hours",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => "How can I manage my restaurant's working days?",
            'keyWords' => 'working hours days',
            'html' => <<<string
            <p>
            Using the control panel, you can easily set up your restaurant's working days and hours, ensuring that your availability is clearly communicated to your website visitors.
            </p>
            <p>You can set individual operating schedules for each of your restaurant's services— <a>home delivery</a>, <a>order pickup</a>, and <a>dine-in</a>. To configure the working days and hours for each service, simply go to to <b>Settings</b> in the control panel menu and then to a service page.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>After opening any service page, you will find a series of tabs, each containing adjustable settings. Within the <b>Working days</b> tab, you'll find a list that allows you to set and adjust working days and hours.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            string,
        ]);
        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Working days list',
            'keyWords' => 'weekdays working days',
            'html' => <<<string
            <p>You can find the weekdays sorted in the provided list, with each row representing a day where you can manage each day's availability and other settings.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>The row for each day displays the working hours, <a>happy hour</a> details, discount amount in the happy hour, and two action buttons.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>When clicking on the <b>Manage</b> <span class="ico-settings"></span> button, a window will appear where you can adjust the working hours and happy hour settings.</p>
            <p>The <b>Copy working day details</b> <span class="ico-copy"></span>button allows you to duplicate the selected day's customized settings to apply them to other days of the week. This feature is especially handy if your weekdays generally follow the same schedule.</p>
            <img class="articleImg" src="/storage/imgs/help/copy_working_days/.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Adjusting the working days',
            'keyWords' => 'working days',
            'html' => <<<string
            <p>After clicking on the <b>Manage</b> <span class="ico-settings"></span> button, you can start configuring your working day and hours.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>To mark a day as a working one on your website, switch on the <b>Set as working day</b> button. If you switch off the button, the day is marked as a non-working day.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Adjusting the working hours',
            'keyWords' => 'working hours opening time',
            'html' => <<<string
            <p>You can make your service available throughout the day by switching on the <b>24-hour availability</b> button. This means that ordering will be available from 0:00 to 23:59 based on the <a>time zone</a> you've selected. If you switch off the button, the service will be available only during the hours you specify.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>Using the time pickers provided, you can set the start and end times for the selected working day. If your service extends past midnight into the next calendar day, you can still set the desired end time, and our system will correctly interpret it as part of the working hours for that day.</p>
            string,

        ]);

        help_en_sections::insert($sections);
    }
}
