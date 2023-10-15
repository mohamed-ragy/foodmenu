<?php

namespace Database\Seeders\help_en_tuts\users;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut43 extends Seeder
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
        $helpTut = help_en_tut::where('id',43)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',43)->delete();
        help_en_tut::where('id',43)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>43,
            'sort' => 3,
            'title_id' => 'Tracking-Online-Website-Visitors',
            'title' => 'Tracking Online Website Visitors',
            'description' => 'Monitoring your website visitors’ activities will help you better understand your customers’ behaviors and provide insight into how to improve your website’s performance.',
            'icon' => 'ico-online_users',
            'helpCat' => 'website-users',
            'keyWords' => 'users',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 43,
            'title' => 'Website Users and Guests',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">From the control panel, you can track and easily locate all online visitors to your website. </div>
                <div class=\"sectionP\">To start with, your website visitors are classified into <b>users</b> and <b>guests</b>. Users are website visitors who are registered and logged in to accounts on your website, which makes them identifiable on your end and allows you to find all their main activities. Guests are unregistered website visitors who aren't logged in to accounts on your website, making them unidentifiable in case you want to track their activities. Guests, on the other hand, are given temporary identifiers so you can keep track of their active status and chat with them while they have their identifier.</div>
                <div class=\"sectionP\">Tracking online users and guests is particularly useful for determining what type of activity your visitors usually engage in and gives you perspective on which parts of your website get the most attention. To go to the area of the control panel where you can track your visitors, go to the <b>Users</b> section of the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?tab=Online-Users\" target=\"_blank\">Online Users And Guests</a> to open the intended page.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 43,
            'title' => 'Online Visitors',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Online Users and Guests</b> window, you can first find the number of online website visitors.</div>
                <div class=\"sectionP\">Each online website visitor is represented by a card, which shows whether the visitor is a user or a guest, as well as their name. An icon is placed next to each visitor's name, indicating their active status through the use of colors.</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">The green color implies that the visitor is online and actively browsing your website.</li>
                    <li style=\"margin-bottom:.5em;\">The red color implies the visitor is offline and disconnected from your website.</li>
                    <li style=\"margin-bottom:.5em;\">The yellow color implies the visitor is loading a page on your website.</li>
                </ul>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 43,
            'title' => 'Users Online Card',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When a registered user navigates your website, their online card displays their name, active status, current browsing activity, and four icons at the bottom of the card to assist you in managing this user.</div>
                <ol>
                <li style=\"margin-bottom:.5em;\">The chat icon <span class=\"ico-chat\"></span> enables you to chat with the selected user.</li>
                <li style=\"margin-bottom:.5em;\">The orders icon <span class=\"ico-orders\"></span> directs you to a page where you can find the order history of the selected user.</li>
                <li style=\"margin-bottom:.5em;\">The reviews icon <span class=\"ico-star\"></span> takes you to a page where you can see all reviews posted by the selected user.</li>
                    <li style=\"margin-bottom:.5em;\">The manage profile icon <span class=\"ico-settings\"></span> allows you to manage the user's profile.</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 43,
            'title' => 'Guests Online Card',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When a guest is online and navigating your website, their online card displays their temporary identifier, active status, current browsing activity, and only a chat icon <span class=\"ico-chat\"></span> that allows you to chat with the selected guest.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can view online users and guests, and sub-accounts that have the authority to <b>manage users and delivery accounts</b>.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
