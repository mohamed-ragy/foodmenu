<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut12 extends Seeder
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
        $helpTut = help_en_tut::where('id',12)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',12)->delete();
        help_en_tut::where('id',12)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>12,
            'sort' => 8,
            'title_id' => 'Adjusting-your-restaurants-working-hours',
            'title' => 'Adjusting your restaurant’s working hours',
            'description' => 'This guide will assist you in customizing the working hours of your restaurant to your availability times, allowing your operations to run smoothly.',
            'icon' => 'ico-clock',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'workingTimes.orders.restaurant.orderPickup.homeDelivery.dinein',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>12,
            'title' => 'How can I manage my restaurant’s working days?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Setting up your restaurant's working days and hours is tied to your restaurant's availability time for your customers, and not your staff's working hours.</div>
                <div class=\"sectionP\">Each of your services will have its own set of working days and hours, allowing you to freely customize the availability of each service. These services are: </div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Home delivery service</li>
                    <li style=\"margin-bottom:.5em;\">Order pickup service</li>
                    <li style=\"margin-bottom:.5em;\">Dine-in service</li>
                </ol>
                <div class=\"sectionP\">To reach any of the services' settings, go to the Control Panel Menu and select <b>Settings</b>.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/43.PNG\" class=\"sectionImg-15\"/>
                <div class=\"sectionP\">When you go to a service's settings page, you will find an area labeled <b>Working Days</b> which displays all days of the week in the form of cards.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>12,
            'title' => 'Weekday cards',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Each weekday is represented by a clickable card that displays the working hours and scheduled discount for that day. When you click on any card, a window appears with a couple of fields where you can modify the selected day's availability, working hours, and <a href=\"https://www.food-menu.net/en/help/settings/13\" target=\"_blank\">schedule a discount</a>.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>12,
            'title' => 'Adjusting the day’s availability',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the opened window, you will first be provided with a <b>Set as Working Day</b> switch button. When you switch on the button, you mark this day as a working day for visitors on your website; if you switch off the button, the day is marked as a non-working day for your visitors, and the card for the day becomes dimmed to indicate that it is not a working day.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>12,
            'title' => 'Adjusting the working hours',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you switch on the <b>24-hour availability</b> switch button, you can adjust your service to be available throughout the day. This means that ordering will be available for the selected service from 0:00 to 23:59 based on the time zone you've chosen. If you switch off the button, the service will only be available during the hours you specify.</div>
                <div class=\"sectionP\">To set a specific start and end time for the day, use the time pickers provided to set your preferred working hours. If your service ends after midnight, as in the next calendar day, you can still set the end time in the time picker to after midnight, and our system will treat it as working hours of the day the start time was on.</div>
                <div class=\"sectionP\">You can copy the working hours you just set to another day of the week or to all weekdays using the <b>Copy working hours to</b> input list. Choose a day from the input list for which you want to copy the working hours. Then, click on the <b>Copy</b> button to successfully copy the working hours to another day.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>12,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After adjusting any of the settings, click on the <b>Keep Changes</b> button found at the bottom of the window. Then, after the window gets closed, click on the <b>Save</b> button to apply the changes to your website, or click on <b>Cancel</b> to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the services' working hours, and the sub-accounts that have the authority to Manage system and settings.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' =>12,
            'title' => 'Orders and Working Hours',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Each of your services' working hours will be displayed in the <b>About Us</b> section of your website to inform your customers of your availability times. However, you can place an order at any time through the control panel. When it comes to the dine-in service, the working hours determine the starting and closing hours of your physical restaurant. As for the home delivery and order pickup services, they are the delivery methods that the customer chooses between when placing an order on your website.</div>
                <div class=\"sectionP\">When a customer places an order outside any of the services' working hours, they're provided with two options: either they receive a message informing them that the service is unavailable at the moment and notify them of the next available time, or they can place the order and be informed that your restaurant will pick up their order at the service's next available time. You got to determine which option will appear to your customers for each service from the <a href=\"https://www.food-menu.net/en/help/settings/10#8\" target=\"_blank\">Accept delivery orders outside working hours</a> and <a href=\"https://www.food-menu.net/en/help/settings/10#9\" target=\"_blank\">Accept pickup orders outside working hours</a>.</div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
