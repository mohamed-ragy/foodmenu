<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut14 extends Seeder
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
        $helpTut = help_en_tut::where('id',14)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',14)->delete();
        help_en_tut::where('id',14)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>14,
            'sort' => 7,
            'title_id' => 'Your-Restaurants-Dine-In-Service',
            'title' => 'Your Restaurant’s Dine-In Service',
            'description' => 'This article will walk you through the various settings you can adjust for your restaurant’s dine-in service.',
            'icon' => 'ico-dineIn',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'discount.orders.restaurant.dinein',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>14,
            'title' => 'What is the Dine-in service?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The dine-In service is the option of serving customers at your restaurant. We provide you with the option to place and adjust the dine-In orders' settings from the control panel to create a unified management platform for your restaurant, which will have many positive impacts on your business from cost reduction to increased transparency in your internal operations.</div>
                <div class=\"sectionP\">A unified management platform for your restaurant means that all of the orders you complete for your restaurant, as well as your business costs and profit generated from the orders, are saved on your account on Foodmenu, which provides you with a single platform from which you can access all of your business data. This also relieves you of the need to have an outside accounting program to sort your financial statements, as we offer the service of generating financial reports based on the data you enter regarding your costs and profit. We also generate analytics for your restaurants' performance based on your data which can help you make better managerial decisions. Please keep in mind that all of this information is secure and confidential unless you are the one accessing it.</div>
                <div class=\"sectionP\">You can go to the <b>Dine-In Settings</b> by clicking on <b>Settings</b> in the Control Panel Menu. When you click on it, the <a href=\"https://cpanel.food-menu.net/?tab=Dine-In\" target=\"_blank\">Dine-In Settings</a> page will open, showing a number of options to adjust your dine-in settings which are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Tax Cost</li>
                    <li style=\"margin-bottom:.5em;\">Service Charge Percentage</li>
                    <li style=\"margin-bottom:.5em;\">Dine-In working day</li>
                </ol>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>14,
            'title' => 'Tax Cost',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can add a tax value to your dine-in orders. This can be done in two different ways: </div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The first way is to set a fixed cost for your tax value, which will be added to the total of your dine-in orders. For example, if you set your tax fixed cost to be $10, this will be the added tax cost on the order no matter the total amount. If you want to apply this option switch on the <b>Fixed Cost</b> button and enter the tax value in the <b>Tax Cost</b> input box.</li>
                    <li style=\"margin-bottom:.5em;\">The second option is to set a tax percentage that will be calculated from the sum of the items included in the dine-in order. If you want to use this option, switch off the <b>Fixed Cost</b> button, and enter the tax value in percentage in the <b>Tax Percentage</b> input box.</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/49.PNG\" class=\"sectionImg-30\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you wish not to include any taxes on your dine-in orders, set the tax fixed cost or percentage to 0.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>14,
            'title' => 'Service Charge Cost',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The service charge is a fee you can add to cover the cost of operating your service in-house. You have two options for adding a service charge to your dine-in orders: </div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The first option is to set a fixed cost to be added to the total of the order regardless of the number of items in the order. You can enable this option when you switch on the <b>Fixed Cost</b> button. Then, you can enter the service cost in the <b>Service Charge Cost</b> input box. </li>
                    <li style=\"margin-bottom:.5em;\">The second option is to set a service charge percentage to be calculated from the sum of the order items to be added to the total amount of the order. To enable this option, switch off the <b>Fixed Cost</b> button, and enter the desired service percentage in the <b>Service Charge Percentage</b> input box.</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/50.PNG\" class=\"sectionImg-30\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you prefer not to include a service charge on your dine-in orders, set the service charge percentage or cost to 0.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>14,
            'title' => 'Dine-In Working Days',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, you get to choose the working days and hours for your dine-in service, which will be displayed on your website to inform your customers of your restaurant's dine-in availability time.</div>
                <div class=\"sectionP\">By clicking on each day's card, you can choose whether or not it is a working day, set the working hours for that day, and schedule discounts for that day if desired. Check out these articles for more information on how to adjust <a href=\"https://www.food-menu.net/en/help/settings/12\" target=\"_blank\">the working days and hours</a> settings and <a href=\"https://www.food-menu.net/en/help/settings/13\" target=\"_blank\">the scheduled discount</a> settings.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/51.PNG\" class=\"sectionImg-40\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that this does not interfere with your other services' availability days and hours.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>14,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After making any changes to the dine-in settings, click the <b>Save</b> button to apply the changes, or <b>Cancel</b> to restore the most recently saved changes. </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the <b>Dine-In Settings</b>, and the sub-accounts that have the authority to manage system and settings.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);

    }
}
