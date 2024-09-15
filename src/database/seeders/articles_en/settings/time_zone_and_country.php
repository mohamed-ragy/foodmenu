<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class time_zone_and_country extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'time_zone_and_country';// make sure that the article id is unique
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
            'title' => "Time zone and country",
            'description' => "Setting up the correct time zone and country settings is essential to ensure that your restaurant's working hours and location are correctly configured.",
            'icon' => "ico-langCode",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "time_zone.country",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Region time zone',
            'keyWords' => 'restaurant region time zone',
            'html' => <<<string
            <p>A time zone is the standard time for a particular geographical area. When selecting your time zone, it should be the same as where your restaurant is located, as it will set the working hours for your home delivery, order pickup, and dine-in services.</p>
            <p>To adjust your time zone on the control panel, go to <b>Settings</b> in the control panel menu, then select <a>System</a>.</p>
            <p>A page will open with several tabs, including the <b>Region</b> tab, which will open first by default. On this page, you'll be able to adjust your restaurant country and time zone.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/system_settings.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Selecting the country',
            'keyWords' => 'country',
            'html' => <<<string
            <p>In the <b>Country</b> section, you can use the provided input list to select the country in which your restaurant is located. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/region_settings_country.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => "How to set up your restaurant's time zone?",
            'keyWords' => 'changing time zone',
            'html' => <<<string
            <p>In the <b>Time zone</b> section, you will be able to see the time zone and format you set displayed in a window to ensure that you are setting the correct time.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/region_settings_timezone.png" />
            <p>The <b>Enable 12 hours clock format</b> switch button allows you to adjust the time format. When you switch on the button, the system will follow the 12-hour format, and if you switch off the button the system will use the 24-hour format.</p>
            <p>Then, using the time zone input list, search for your restaurant's geographic region; the time zone you select will be reflected on both your website and the control panel.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Frequent time zone changes may impact data accuracy.</span>
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
            <p>After adjusting your restaurant's country and time zone, make sure to click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can make changes to the time zone and country settings, and sub-accounts that have permission to manage system and settings.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
