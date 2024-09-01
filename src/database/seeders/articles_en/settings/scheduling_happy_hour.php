<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class scheduling_happy_hour extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'scheduling_happy_hour';// make sure that the article id is unique
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
            'title' => "Scheduling happy hour",
            'description' => "This article will assist you in creating and scheduling happy hour on your website for your different services.",
            'icon' => "ico-promo_codes",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "discount.happy_hour.promo_code.promocode",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Setting up happy hour',
            'keyWords' => 'happy hour discount',
            'html' => <<<string
            <p>Happy Hour is a strategy where you offer discounts on your Food items at a certain time of the day,  making it a valuable addition to your marketing or sales approach.</p>
            <p>At Foodmenu, you can schedule happy hours on your website at any time and even create a happy hour for each of the <a>home delivery</a>, <a>order pickup</a>, and <a>dine-in</a> services separately. </p>
            <p>You can schedule happy hours through the <b>Happy hour</b> sub-section found in any of your home delivery, order pickup, and dine-in settings, by going to <b>Settings</b> in the control panel menu, and then to any of the services pages.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            string,
        ]);
        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Working days list',
            'keyWords' => 'working days availability',
            'html' => <<<string
            <p>After opening a service page, you will find a <b>Working days</b> list, with each row representing a day of the week.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>To set a happy hour on a specific day, click on the <b>Manage</b> <span class="ico-settings"></span> button, which will open a window where you can find the <b>Happy hour</b> sub-section.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Configuring happy hour settings',
            'keyWords' => 'happy hour settings',
            'html' => <<<string
            <p>
            <div>Using the <b>Discount</b> number picker, you can set the happy hour discount percentage. </div>
            <div>Then, to specify the duration of the happy hour on the selected day, use the provided <b>Starts at</b> and <b>Ends at</b> time pickers to set the discount's start and end times.</div>
            </p>
            <p>Keep in mind that when you set a happy hour for a day (i.e., Sunday), the happy hour will be scheduled for every Sunday until you unset it. If you want to unset a day's happy hour, you can modify the discount to 0%</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>You also have the option to manually change the discount value on any incomplete order from the control panel.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How will my customers be notified of happy hours?',
            'keyWords' => 'happy hour announcement',
            'html' => <<<string
            <p> When you schedule a happy hour, it will be announced across all your website pages, provided you have this <a>feature</a> enabled. The appearance of the announcement will vary based on your website's design. Additionally, the happy hour discount is automatically applied to your item prices.</p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>Setting discounts for the dine-in service through the control panel is just to announce on your website that you offer discounts when dining in-house.</span>
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
            After adjusting any of the settings, click on <b>Save</b> found at the bottom of the window, or click on <b>Cancel</b> to restore the last saved changes.
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can make changes to the happy hour settings, and sub-accounts that have permission to manage system and settings.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
