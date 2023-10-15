<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut13 extends Seeder
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
        $helpTut = help_en_tut::where('id',13)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',13)->delete();
        help_en_tut::where('id',13)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>13,
            'sort' => 9,
            'title_id' => 'Scheduling-Discounts',
            'title' => 'Scheduling Discounts',
            'description' => 'This article will assist you in creating and scheduling discounts on your different services in the most customizable way.',
            'icon' => 'ico-billing',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'discount.orders.restaurant.orderPickup.homeDelivery.dinein',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>13,
            'title' => 'Setting Up Discounts',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Offering discounts is an effective way to encourage sales for your business. With the advantage of quickly attracting new customers or even keeping existing customers loyal to your brand, it's always a good idea to include it in your marketing or sales strategy. At Foodmenu, we provide you with the option of scheduling discounts on your website for a specified period of time and the ability to set discounts for each service separately. You also have the option to manually change the discount value on any incomplete order on your website from the control panel.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">It’s worth noting that to manually add or modify a discount on any incomplete order you have to be using the main account or a sub-account that has the authority to <b>Manage Orders</b>.</div>
                </div>
                <div class=\"sectionP\">The <b>Scheduled Discounts</b> is a sub-section found in each service's settings, which can be reached by going to <b>Settings</b> in the control panel menu.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/43.PNG\" class=\"sectionImg-15\"/>
                <div class=\"sectionP\">When you go to a service's settings page, you will find an area labeled <b>Working Days</b> which displays all days of the week in the form of cards.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>13,
            'title' => 'Weekday cards',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Each weekday is represented by a clickable card that displays the working hours and scheduled discount for that day. When you click on any card, a window appears with a couple of fields where you can modify the selected day's scheduled discount, availability, and working hours.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>13,
            'title' => 'Scheduling a Discount',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the opened window, you can find an area labeled <b>Scheduled Discount</b>, where you can adjust the discount settings.</div>
                <div class=\"sectionP\">You're first provided with a <b>Discount</b> number picker, which is used to enter the desired discount percentage. When the discount is set to 0%, no discount is scheduled. </div>
                <div class=\"sectionP\">Then, to specify the duration of the scheduled discount on the selected day, use the provided <b>Starts at</b> and <b>Ends at</b> time pickers to set the scheduled discount's start and end times.</div>
                <div class=\"sectionP\">You are also given the option to copy all the settings you have just set to another day of the week or to all weekdays using the <b>Copy scheduled discount settings to</b> input list option. Choose a day from the input list for which you want to copy the scheduled discount settings. Then, click on the <b>Copy</b> button to successfully copy the settings to another day.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that when you schedule a discount for a day (i.e., Sunday), the discount will be scheduled for every Sunday until it is unset. If you want to unset a day's scheduled discount, you can modify the discount to be 0%</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>13,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After adjusting any of the settings, click on the <b>Keep Changes</b> button found at the bottom of the window. Then, after the window gets closed, click on the <b>Save</b> button to apply the changes to your website, or click on <b>Cancel</b> to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the <b>Scheduled Discount</b> settings, and the sub-accounts that have the authority to Manage system and settings.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>13,
            'title' => 'How will my customers be notified of discounts?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you schedule a discount, it is communicated to your customers as <b>happy hour</b> on your website. They appear as announcements on all your website pages in the announcement bar if you have this option enabled from <a href=\"https://www.food-menu.net/en/help/settings/10#10\" target=\"_blank\">Show scheduled discounts announcement</a>. It will also appear in the working hours section of your “About Us” page on your website, informing your customers of the <b>happy hour</b> day and time.</div>
            </div>
            ",
        ]);



        help_en_text::insert($tutsTexts);
    }
}
