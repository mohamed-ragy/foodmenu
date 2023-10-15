<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut6 extends Seeder
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
        $helpTut = help_en_tut::where('id',6)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',6)->delete();
        help_en_tut::where('id',6)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>6,
            'sort' => 14,
            'title_id' => 'Adjusting-The-Control-Settings',
            'title' => 'Adjusting The Control Settings',
            'description' => 'The Control Settings will allow you to modify some of the ways actions can be performed on the control panel, to suit your preferences.',
            'icon' => 'ico-settings',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'cpanel',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' => 6,
            'title' => 'What is Control Settings?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >The 'Control Settings' will assist you in adjusting some of the actions you take on the control panel. </div>
                <div class=\"sectionP\">To go to <b>Control Settings</b>, click on <b>Settings</b> in the <b>Control Panel Menu</b>, then select <a href=\"https://cpanel.food-menu.net/?tab=Control-Panel-Settings\" target=\"_blank\">Control Panel Settings</a> to open a page with several windows, including <b>Control Settings</b>. In the <b>Control Settings</b> window you're provided with several options, which are as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Enable Tooltip</li>
                    <li style=\"margin-bottom:.5em;\">Don't show more than one alert at a time</li>
                    <li style=\"margin-bottom:.5em;\">Click twice to confirm Actions</li>
                    <li style=\"margin-bottom:.5em;\">Enable Share Reminder</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/18.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' => 6,
            'title' => 'Tooltips',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Tooltips are text tags that guide you while moving across the control panel, they appear automatically when you hover your mouse over an item that has a Tooltip and provide you with information regarding this item.</div>
                <div class=\"sectionP\" >To enable Tooltips, switch on the <b>Enable Tooltip</b> button, or you can have them disabled when you switch off the <b>Enable Tooltip</b> button. However, it's recommended to have Tooltips enabled as they can be a great assist.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' => 6,
            'title' => 'Alerts',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Alerts are small pop-up messages that appear on the bottom right corner of your screen to notify you of a piece of information or notification. Each alert lasts for 4 seconds, and in case of an important alert it can last longer.</div>
                <div class=\"sectionP\" >You can have only one alert appear at a time when you switch on the <b>Don't show more than one alert at a time</b> button; however, the alert will be replaced by another if a different alert shows up before the preceding alert’s duration comes to an end.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/19.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\" >Alternatively, if you want more than one alert to appear at the same time, you can switch off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/20.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' => 6,
            'title' => 'Critical actions',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >On your control panel, you can enable double-clicking on confirmation buttons for some of the critical actions you may take on your account, such as accepting or canceling an order.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/22.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\" >Once this feature is enabled, the process works as follows: after the first click, the button turns orange, and the second click confirms the action. You can also cancel the first click by clicking elsewhere other than the confirmation button.</div>
                <div class=\"sectionP\" >This option can be enabled by switching on the <b>Click twice to confirm actions</b> button, or you can disable this option by switching off the button. However, it is strongly recommended to have this option enabled because the critical actions that call for double-clicking cannot be reversed.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' => 6,
            'title' => 'Share Reminder',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >The share reminder feature allows you to be reminded to share products or product categories from your website onto your social media platforms. This can be helpful to make your customers aware of more products and gain more traffic on your website.</div>
                <div class=\"sectionP\" >When you switch on the <b>Enable Share Reminders</b> switch button, you'll get a pop-up every 30 minutes with the name and image of a random product or product category, reminding you to share it. The popup window will include a <b>Share to</b> area where you can choose which social media platform to share your product on, along with a <b>Select Share Language</b> area where you can choose the language to share in.
                If you have this button switched off, you won't receive any share reminders.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/22.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\" >It should be noted that, by default, this option will be disabled. To learn more about the share tool, check out <a href=\"https://www.food-menu.net/en/help/basics/21\" target=\"_blank\">this article</a>.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Only the main account and sub-accounts with the authority to manage categories and products can see and use the button.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' => 6,
            'title' => 'Chat Window Popup',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >When you switch on the <b>Enable Chat Window Popup</b> switch button, a chat window will pop up with every incoming live chat message. At first, the chat window popup appears inactive (semi-transparent), indicating that new messages sent to you are still marked as unseen from your side. However, if you click anywhere other than the minimize and close buttons on the live chat window, the window becomes active, and the website visitor can see that you have seen their message.</div>
                <div class=\"sectionP\" >If you switch off the button, no window will pop up when you receive an incoming live chat message. You will still be notified of new messages via the navigation bar.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Please keep in mind that if you have the <b>Go Invisible</b> mode enabled, the chat window popup function will be disabled, but you will still be notified of new incoming messages via the navigation bar. </div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' => 6,
            'title' => 'Saving control settings changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >When you switch any button on or off in the <b>Control Settings</b>, the changes apply immediately; however, be sure to click on <b>save</b> after switching any button to avoid losing the changes if the control panel page got refreshed. You can also restore the last saved changes when you click on <b>cancel</b> in the <b>Control Settings</b> window.</div>
                <div class=\"tipContainer\">
                <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">It's important to note that any changes you make in the <b>Control Settings</b> only affect your main account, or if you're working on a sub-account it only affects the account you're working on.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
