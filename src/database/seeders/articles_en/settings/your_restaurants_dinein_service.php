<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class your_restaurants_dinein_service extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'your_restaurants_dinein_service';// make sure that the article id is unique
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
            'title' => "Your restaurant's dine-in service",
            'description' => "This article will walk you through the various settings you can adjust for your restaurant's dine-in service.",
            'icon' => "ico-dine_in_settings",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "dining.dine-in_service",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is the Dine-in service?',
            'keyWords' => 'dining dine-in service',
            'html' => <<<string
            <p>The dine-in service is the option of serving customers in-house at your restaurant. We provide you with the option to place dine-in orders from the control panel in order to create a unified management platform for your restaurant, meaning that all of your orders, as well as business costs and revenue generated from the orders, are saved on your Foodmenu account.</p>
            <p>You can adjust your dine-in service by going to <b>Settings</b> in the control panel menu and then clicking on <a>Dine-in settings</a>.</p>
            <p>When you open the page, you'll find a series of tabs, each with different settings for your dine-in service.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            string,
        ]);
        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Working days',
            'keyWords' => 'working days hours',
            'html' => <<<string
            <p>
            You can choose the working days and hours for your dine-in service from the provided list, which will displayed on your website to inform your customers of the times your restaurant is open for dining.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>Each day of the week is sorted in a row from which you adjust its settings from the <b>Manage</b> <span class="ico-settings"></span> button. Check out the <a>working days and hours</a> and the <a>scheduled discount</a> articles for more information on how to adjust these settings.</p>
            string,
        ]);
        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Service charge cost',
            'keyWords' => 'setting service charges cost',
            'html' => <<<string
            <p>
            The service charge is a fee you can add to cover the cost of operating your service in-house. You have two options for adding a service charge to your dine-in orders:
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>The first option is to set a fixed cost to be added to the total of the order regardless of the number of items in the order. You can enable this option by checking the <b>Fixed cost</b> button and then entering the desired cost in the input box.</p>
            <p>The second option is to set a service charge percentage to be calculated from the sum of the order items, which is subsequently added to the order total amount. To enable this option, check the <b>Percentage</b> box, then enter the desired percentage in the input box.</p>
            <p>If you prefer not to include a service charge on your dine-in orders, set the service charge percentage or cost to 0.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Tax settings',
            'keyWords' => 'taxes',
            'html' => <<<string
            <p>
            You can choose to include a tax value on your dine-in orders. The tax value added will be based on your selection of one of the following options:
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>The first option is to set a fixed cost for your tax value by checking the <b>Fixed cost</b> box and entering the value in the input box. For example, if you set your tax fixed cost to be $10, this will be the added tax cost on the order no matter the total amount.</p>
            <p>The second option is to set a tax percentage that will be calculated from the sum of the items included in the home delivery order. You can select this option by checking the <b>Percentage</b> box and then entering the tax percentage in the input box.</p>
            <p>If you prefer not to include any taxes on your dine-in order, set the tax fixed cost or percentage to 0.</p>
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
            After making any changes to the dine-in settings, click the <b>Save</b> button to apply the changes, or <b>Cancel</b> to restore the most recently saved changes.
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can make changes to the dine-in settings, and sub-accounts that have permission to manage system and settings.</span>
            </div>
            string,

        ]);
        help_en_sections::insert($sections);
    }
}
