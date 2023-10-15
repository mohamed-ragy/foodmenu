<?php

namespace Database\Seeders\help_en_tuts\users;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut44 extends Seeder
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
        $helpTut = help_en_tut::where('id',44)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',44)->delete();
        help_en_tut::where('id',44)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>44,
            'sort' => 4,
            'title_id' => 'Types-of-website-visitors',
            'title' => 'Types of website visitors',
            'description' => 'This article will help you understand the different types of visitors to your website and how this affects the tracking of their activity and behavior.',
            'icon' => 'ico-user',
            'helpCat' => 'website-users',
            'keyWords' => 'users',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 44,
            'title' => 'Website Visitors',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A website visitor is any person who visits your website, whether they are registered or not. The two main types of visitors are users and guests. What differentiates them from one another is that a user is identified by login details, and therefore all their activities are stored on your account and tied to their profile. While a guest is someone who visits your website but is not registered to an account.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 44,
            'title' => 'Website Users',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Users are visitors who have created accounts on your website and are logged in to them at the moment of their visit. You can identify users by their registered names, while they are identified by our system through their email address, which they use to log in to their account on your end.</div>
                <div class=\"sectionP\">Users' activities are saved in your database, enabling you to</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">Track their orders and view their order history</li>
                    <li style=\"margin-bottom:.5em;\">Know their degree of profitability and frequency of ordering through statistics and analytics</li>
                    <li style=\"margin-bottom:.5em;\">Know the type of browsing activity they engage in through the activity log</li>
                    <li style=\"margin-bottom:.5em;\">Find all reviews posted by them</li>
                    <li style=\"margin-bottom:.5em;\">Live chat with them at any time</li>
                </ul>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">When a user performs an activity, it appears on your account as an action done by a defined user.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 44,
            'title' => 'Website Guests',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Guests are visitors who are not registered to an account on your website. When they visit your website, they are assigned temporary identifiers that are linked to their device browser’s cookies instead of an email address. The temporary identifiers become invalid after 7 days of inactivity on your website. When they visit your website again, they'll be assigned another identifier. Hence, tracing and assigning activities to a single guest is not possible, as their identifiers continuously change.</div>
                <div class=\"sectionP\">However, guests' activity is saved in your database and on your account, but it appears as an activity performed by an unidentified guest. Saved activities include posted reviews and ordering history. This is important for generating accurate financial reports and knowing your exact performance to make informed decisions.</div>
                <div class=\"sectionP\">You can always set some limitations for website visitors. You have the option to disallow guests from placing orders on your website by disabling  the <a href=\"https://www.food-menu.net/en/help/settings/10#2\" target=\"_blank\">Accept Guest Orders</a>. You can also disallow them from posting reviews when you disabling the <a href=\"https://www.food-menu.net/en/help/settings/10#3\" target=\"_blank\">Accept Guest Reviews</a>. Furthermore, you can disable the live chat feature for guests when you disabling the <a href=\"https://www.food-menu.net/en/help/settings/10#4\" target=\"_blank\">Enable Guest Live Chat</a>.</div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
