<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut7 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $upRates;
    protected $downRates;

    public function run()
    {
        $helpTut = help_en_tut::where('id',7)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',7)->delete();
        help_en_tut::where('id',7)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>7,
            'sort' => 15,
            'title_id' => 'Adjusting-the-alert-notifications',
            'title' => 'Adjusting the alert notifications',
            'description' => 'Alert notifications are a good way to keep track of important events. This article will walk you through the process of adjusting the alert notifications to best suit your preferences.',
            'icon' => 'ico-notifications',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'cpanel.deliveryMan.alert',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' => 7,
            'title' => 'What are alert notifications?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Alert notifications are alerts that notify you about some of the important events occurring on your website. They're great for personalizing your feed and for getting an immediate alert when you have a new activity update on important events. These updates always appear in your <b>notifications</b>, which can be found in the <b>navigation bar</b>.</div>
                <div class=\"sectionP\">We provide the option of receiving alerts for updates to these events because you may want to be notified of some of the events immediately. However, we understand that you may prefer not to receive certain alert notifications, which is why we provide the option to enable or disable alerts for any event in the <b>Alert Notifications</b> window.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Remember that regardless of whether you enable or disable the <b>Alert Notifications</b> buttons, you will always receive notifications for these alerts in the <b>notification list</b> in the <b>navigation bar</b>.</div>
                </div>
                <div class=\"sectionP\">To go to <b>Alert Notifications</b>, click on <b>Settings</b> in the <b>Control Panel Menu</b>, then select <a href=\"https://cpanel.food-menu.net/?tab=Control-Panel-Settings\" target=\"_blank\">Control Panel Settings</a> to open a page with several windows, including <b>Alert Notifications</b>. In the <b>Alert Notifications</b> window you're provided with several options, which are as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Alert me when a new order is placed.</li>
                    <li style=\"margin-bottom:.5em;\">Alert me when an order is delivered by a deliver person.</li>
                    <li style=\"margin-bottom:.5em;\">Alert me when a new user signs up.</li>
                    <li style=\"margin-bottom:.5em;\">Alert me when a product is reviewed.</li>
                    <li style=\"margin-bottom:.5em;\">Alert me when an order is canceled by a user.</li>
                    <li style=\"margin-bottom:.5em;\">Alert me when a user logs in.</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/23.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' => 7,
            'title' => 'New Order Alert',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >You have an option to receive an alert to notify you when a new order has been placed through switching on the <b>Alert me when a new order is placed</b> button, or you can disable this alert when you switch off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/66.PNG\" class=\"sectionImg-20\"/>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' => 7,
            'title' => 'Order Delivery Alert',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >You can receive an alert when an order is delivered by a deliver person by switching on the <b>Alert me when a deliver person delivers an order</b> button, or you can switch off the button to disable this alert.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/69.PNG\" class=\"sectionImg-20\"/>
                <div class=\"sectionP\" >To manage all delivery accounts, head to <a href=\"https://cpanel.food-menu.net/?tab=Delivery-Accounts\" target=\"_blank\">delivery accounts</a> in the <b>users</b> section of the control panel.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' => 7,
            'title' => 'New User Alert',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >You can receive an alert when a new user signs up on your website by switching on the <b>Alert me when a new user signs up</b> button. If you prefer not to see this alert, you can switch off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/70.PNG\" class=\"sectionImg-20\"/>
                <div class=\"sectionP\" >To manage all your website users, head to <a href=\"https://cpanel.food-menu.net/?tab=Manage-Users\" target=\"_blank\">manage users</a> in the <b>users</b> section of the control panel.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' => 7,
            'title' => 'Product Review Alert',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >You can get an alert when a product on your website is reviewed by switching on the <b>Alert me when a product is reviewed</b> button, or you can disable this alert by switching off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/68.PNG\" class=\"sectionImg-25\"/>
                <div class=\"sectionP\" >You can also manage all the product reviews on your website by going to <a href=\"https://cpanel.food-menu.net/?tab=Product-Reviews\" target=\"_blank\">ratings and reviews</a> in the <b>products</b> section of the control panel.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' => 7,
            'title' => 'Order Cancelation Alert',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >You have the option to receive an alert when a customer cancels an order when you switch on the <b>Alert me when an order is canceled by a user</b> button, or you can disable this alert by switching off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/67.PNG\" class=\"sectionImg-20\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>7,
            'help_en_tut_id' => 7,
            'title' => 'User Login Alert',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >When you switch on the <b>Alert me when a user logs in</b> button, you'll receive an alert when a user logs in to your website. If you prefer not to see this alert, you can switch off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/65.PNG\" class=\"sectionImg-15\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Be aware that you will not receive a notification for this alert in the <b>notification list</b>, as receiving an alert when each user logs in to your website may be inconvenient if you have got a large number of visitors.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>8,
            'help_en_tut_id' => 7,
            'title' => 'Saving alert notification changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >When you switch any button in the <b>Alert Notifications</b> to enable or disable alerts, the changes apply immediately. </div>
                <div class=\"sectionP\" >However, after switching any button, make sure to click on <b>save</b> to avoid losing the changes if the control panel page gets refreshed. You can also restore the last saved changes when you click on <b>cancel</b> in the <b>Alert Notifications</b> window.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that any changes you make to the <b>Alert notifications</b> only affect your main account. Or if you're working on a sub-account, it only affects the account you're working on.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);


    }
}
