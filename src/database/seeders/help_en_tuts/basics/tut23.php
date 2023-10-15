<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut23 extends Seeder
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
        $helpTut = help_en_tut::where('id',23)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',23)->delete();
        help_en_tut::where('id',23)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>23,
            'sort' => 9,
            'title_id' => 'The-Control-Panels-Navigation-Bar',
            'title' => 'The Control Panel’s Navigation Bar',
            'description' => 'The navigation bar helps you to effortlessly check key areas in your account by using the clickable buttons at the top of your pages.',
            'icon' => 'ico-header',
            'helpCat' => 'basics',
            'keyWords' => 'cpanel',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 23,
            'title' => 'What is the Navigation Bar?',
            'html' => "<div class=\"SectionContainer\">
                <div style=\"margin-bottom:0;\" class=\"sectionP\">The navigation bar is a bar found at the very top of the control panel, displaying the opened section’s name and a set of important icons, including:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Guide Alerts</li>
                    <li style=\"margin-bottom:.5em;\">Incomplete Orders</li>
                    <li style=\"margin-bottom:.5em;\">Live Chat</li>
                    <li style=\"margin-bottom:.5em;\">Notifications</li>
                    <li style=\"margin-bottom:.5em;\">Menu</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/26.PNG\" class=\"sectionImg-40\"/>
                <div style=\"margin-bottom:0;\" class=\"sectionP\"></div>

            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 23,
            'title' => 'Navigation Bar Icons',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you tap the <a href=\"https://www.food-menu.net/en/help/settings/8#5\" target=\"_black\">Guide Alerts</a> icon <span class=\"ico-warning\"></span>, a drop-down menu will appear with important alerts for critical actions on your account or website, such as when information is missing or action is required. The Guide Alerts are one of the guide mode tools that provide guidance while using the control panel, and having it enabled will ensure that all of your account and website information is updated and accurate.</div>
                <div class=\"sectionP\">The <b>Incomplete Orders</b> icon <span class=\"ico-orders\"></span> alerts you of any orders that need your confirmation to be completed. When you tap the icon, a drop-down menu with the volume and status of the orders appears. Incomplete order statuses are classified as: pending, accepted, ready for pickup, out for delivery, and dining in. It's highly useful because it draws your attention to your restaurant orders, making the delivery process faster for your customers.</div>
                <div class=\"sectionP\">The <a href=\"https://www.food-menu.net/en/help/basics/19\" target=\"_black\">Live Chat</a> icon <span class=\"ico-chat\"></span> is provided to use your restaurant's live chat tool. When you tap the icon, a drop-down menu with all of your restaurant's chat history appears, and by clicking on a chat card a window opens to chat with your website visitor.</div>
                <div class=\"sectionP\">The <b>Notifications</b> icon <span class=\"ico-notifications\"></span> is used to notify you of activities happening on your website or your account. When you tap the icon, a drop-down menu appears with all the notifications. </div>
                <div class=\"sectionP\">The <b>Menu</b> icon <span class=\"ico-menu1\"></span> is used to navigate the control panel’s many sections, when you tap the icon a drop-down menu appears with all the sections. This icon appears as an alternative to the sidebar when your screen’s width is less than 720 pixels.</div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
