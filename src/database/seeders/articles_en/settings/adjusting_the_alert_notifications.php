<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class adjusting_the_alert_notifications extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'adjusting_the_alert_notifications';// make sure that the article id is unique
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
            'title' => "Adjusting the alert notifications",
            'description' => "Alert notifications are a good way to keep track of important events. This article will walk you through the process of adjusting the alert notifications to best suit your preferences.",
            'icon' => "ico-notifications",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "alert.notifications",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What are alert notifications?',
            'keyWords' => 'alert notifications',
            'html' => <<<string
            <p>
            Alert notifications are notifications that notify you of important events on your website. They're great for personalizing your feed and receiving immediate notifications when there's a new activity update on important events. These updates are always visible in your notifications, which are located in the navigation bar.
            </p>
            <p>To go to <b>Alert notifications</b>, click on <b>Settings</b> in the Control Panel Menu, then select <a>Control panel settings</a>.</p>
            <p>A page will open containing several tabs. Among these tabs, locate and tap on <b>Alert notifications</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/control_panel_settings.png" />
            <p>On the <b>Alert notifications</b> page, you will find a number of switch buttons that you can use to enable or disable alerts on your account.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/alert_notifications_page.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'New order alert',
            'keyWords' => 'new order placed alert',
            'html' => <<<string
            <p>
            You can receive an alert to notify you when a new order has been placed by switching on the <b>Alert me when a new order is placed</b> button, or you can disable this alert by switching off the button.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/new_order_alert.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Order delivery alert',
            'keyWords' => 'order delivery account alert',
            'html' => <<<string
            <p>
            By switching on the <b>Alert me when an order is delivered by a delivery person</b> button, you'll receive an alert whenever a delivery person completes delivering an order. You can switch off the button to disable this alert.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/delivered_order_alert.png" />
            <p>To manage all delivery accounts, head to <a>delivery accounts</a> in the <b>My users</b> section of the control panel.</p>
            string,
        ]);


        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'New user alert',
            'keyWords' => 'new website user alert',
            'html' => <<<string
            <p>
            You can receive an alert when a new <a>user</a> signs up on your website by switching on the <b>Alert me when a new user signs up</b> button. If you prefer not to see this alert, you can switch off the button.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/new_user_alert.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Product review alert',
            'keyWords' => 'product review alert',
            'html' => <<<string
            <p>
            You can get an alert each time a product on your website is <a>reviewed</a> by switching on the <b>Alert me when a product is reviewed</b> button, or you can disable this alert by switching off the button.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/product_review_alert.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Order cancelation alert',
            'keyWords' => 'order cancelation canceled by user alert',
            'html' => <<<string
            <p>
            You can enable receiving an alert when a customer cancels an order by switching on the <b>Alert me when an order is canceled by a user</b> button, or you can disable this alert by switching off the button.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/order_cancelation_alert.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'User login alert',
            'keyWords' => 'website user login alert',
            'html' => <<<string
            <p>
            When you switch on the <b>Alert me when a user logs in</b> button, you'll receive an alert when a registered user logs in to your website. If you prefer not to see this alert, you can switch off the button.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/user_login_alert.png" />
            <div class="tipContainer tipContainer_red">
            <span class="ico-lamp"></span>
            <span>You will not receive a notification for this alert in the notification list, as receiving an alert when each user logs in to your website may be inconvenient if you have a large number of visitors.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Browsing guest alert',
            'keyWords' => 'website visitor',
            'html' => <<<string
            <p>
            You can receive an alert when an unregistered visitor browses your website by switching on the <b>Alert me when a guest browses the website</b>. Or, you can switch off the button disable this alert.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/browsing_guest_alert.png" />
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
            However, after switching any button, make sure to click on <b>Save</b> to avoid losing the changes, or click on <b>Cancel</b> to restore the last saved changes.
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
