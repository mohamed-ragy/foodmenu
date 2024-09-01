<?php
//starting from here
namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class ordering_system_settings extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'ordering_system_settings';// make sure that the article id is unique
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
            'title' => "Ordering system settings",
            'description' => "This article will walk you through the process of adjusting your online ordering system settings to match your operational capacity and availability times for a seamless experience. ",
            'icon' => "ico-orders",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "online_ordering.ordering_system",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Configuring your ordering system settings',
            'keyWords' => 'online ordering',
            'html' => <<<string
            <p>Configure the settings of your ordering system to meet the operational requirements of your restaurant. To access the <b>Ordering system settings</b> section, go to <b>Settings</b> in the control panel menu, then <a>System</a>.</p>
            <p>A page will open containing several tabs. Among these tabs, locate and tap on <b>System settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/settings_page_tabs.png" />
            <p>You'll then find several subsections for configuring website settings, including <b>Ordering system settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/ordering_system_settings.png" />

            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Enabling delivery orders',
            'keyWords' => 'home delivery orders',
            'html' => <<<string
            <p>
            Your website visitors will be able to place <a>home delivery orders</a> through your website when you switch on the <b>Enable home delivery</b> button. If you switch off the button, they won't be able to use this service.
            </p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Enabling pickup orders',
            'keyWords' => 'order pickup orders',
            'html' => <<<string
            <p>
            When you switch on the <b>Enable order pickup</b> button, your website visitors will be able to place <a>pickup orders</a> on your website. Or, you can prevent them from using this service by switching off the button.
            </p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>When a website visitor attempts to place an order while both home delivery and order pickup are disabled, they will be informed that online ordering is currently unavailable.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Accept orders outside working hours',
            'keyWords' => 'working hours',
            'html' => <<<string
            <p>You can allow visitors to your website to place orders outside of the <a>working hours</a> you have set for your services.  </p>
            <p>
            <div>To enable this option for home delivery orders, switch on the <b>Accept delivery orders outside working hours</b> button.</div>
            <div>You can also enable this option for pickup orders by switching on the <b>Accept pickup orders outside working hours</b> button.</div>
            </p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>Disabling either or both of the service buttons will restrict order placement to the specified working hours, and visitors to your website will be notified of the next available time for your services.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Allow cancelation of pending orders',
            'keyWords' => 'order cancelation',
            'html' => <<<string
            <p>
            <div>When you switch on the <b>Allow cancelation of pending orders</b> button, your customers will be able to cancel orders that are still pending (not yet accepted). </div>
            <div>You can, however, prevent them from canceling a pending order by switching off this button.</div>
            </p>
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
            <p>After making any changes to the ordering system settings, click on <b>Save</b> at the bottom of the page to avoid losing the changes, or click on <b>Cancel</b> to restore the last saved changes.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Any changes you apply to the system settings only affect your main account, or if you're using a sub-account, the changes only apply to that account.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
