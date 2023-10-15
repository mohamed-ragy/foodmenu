<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut15 extends Seeder
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
        $helpTut = help_en_tut::where('id',15)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',15)->delete();
        help_en_tut::where('id',15)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>15,
            'sort' => 5,
            'title_id' => 'Your-Restaurants-Home-Delivery-Service',
            'title' => 'Your Restaurant’s Home Delivery Service',
            'description' => 'Operating a successful home delivery service will certainly add to your restaurant’s profitability. Check out this article to learn how to adjust its settings.',
            'icon' => 'ico-delivery',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'discount.orders.restaurant.homeDelivery',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>15,
            'title' => 'What is the home delivery service?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The home delivery service allows your customers to place orders through your website and have them delivered to their homes. Having this option while running a restaurant has become crucial in this day and age, as there is a rapid rise in the online ordering trend; so it now counts as a primary sales channel and a growing revenue stream you don't want to miss out on.</div>
                <div class=\"sectionP\">This also contributes to having all of your restaurant's data accessible from a single place, as all orders delivered are reflected on the control panel, which in turn reflects on your restaurant's expenses and revenue data. Your customers' website journeys are also saved in your account's data and analytics, which will assist you in identifying the most searched-for products and the patterns of your website users, allowing you to make better managerial decisions that will improve your performance.</div>
                <div class=\"sectionP\">Also, if you have the option of receiving orders over the phone, you can place the orders on the control panel, as well as modify any incomplete orders.</div>
                <div class=\"sectionP\">You can go to the <b>Home Delivery Settings</b> by clicking on <b>Settings</b> in the Control Panel Menu. When you open the <a href=\"https://cpanel.food-menu.net/?tab=Home-Delivery\" target=\"_blank\">Home Delivery Settings</a> page, you'll be provided with a number of options to adjust your home delivery service settings, which are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Payment Methods</li>
                    <li style=\"margin-bottom:.5em;\">Delivery Cost</li>
                    <li style=\"margin-bottom:.5em;\">Tax Cost</li>
                    <li style=\"margin-bottom:.5em;\">Minimum Charge</li>
                    <li style=\"margin-bottom:.5em;\">Average Delivery Time</li>
                    <li style=\"margin-bottom:.5em;\">Home Delivery Working Days</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 15,
            'title' => 'Payment Methods',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Payment methods are the payment options that will show to your customers when they place their orders. The following payment options are available for the home delivery service:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">Cash on delivery</li>
                    <li style=\"margin-bottom:.5em;\">Card on delivery</li>
                </ul>
                <div class=\"sectionP\">You can enable both or just one method by checking the box next to the method(s) you want your customers to use. If you select neither of the options, your customers will not be required to select a payment method while they’re placing their order.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/53.PNG\" class=\"sectionImg-35\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 15,
            'title' => 'Delivery Cost',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can choose to add delivery costs on your home delivery orders to cover the cost of your delivery means. You can enter the delivery fee you want to charge your customers in the <b>Delivery Cost</b> input box, which will be added to the total of the delivery order. You can also modify the delivery cost for any incomplete order from the control panel.</div>
                <div class=\"sectionP\">If you want to make your customers aware that the delivery cost on their orders can be changed, switch on the  <b>Inform customers that the delivery service cost can be changed</b> switch button, and they'll be informed that the delivery fees can be changed while they're placing their order.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/54.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you wish not to charge your customers any delivery fees, set the delivery cost as 0.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 15,
            'title' => 'Tax Cost',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can choose to include a tax value on your home delivery orders; the tax value added will be based on your selection of one of the following options:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The first option is to set a fixed cost for your tax value, which will be added to the total of your home delivery. For example, if you set your tax fixed cost to be $10, this will be the added tax cost on the order no matter the total amount. If you want to apply this option, switch on the <b>Fixed Cost</b> button and enter the tax value in the <b>Tax Cost</b> input box. </li>
                    <li style=\"margin-bottom:.5em;\">The second option is to set a tax percentage that will be calculated from the sum of the items included in the home delivery order. If you want to use this option, switch off the <b>Fixed Cost</b> button, and enter the tax value in percentage in the <b>Tax Percentage</b> input box.</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/55.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you prefer not to include any taxes on your home delivery orders, set the tax fixed cost or percentage to 0.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 15,
            'title' => 'Minimum Charge',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A minimum charge is the lowest amount of an order’s total allowed to place an order, which means that if a customer places an order and the total order amount is less than the minimum charge you set, they won't be allowed to place an order. Setting a minimum charge for your home delivery is a good way to ensure that the online ordering service is worthwhile for your business and is not causing you a loss. You can enter the desired minimum charge for your orders in the <b>Minimum Charge</b> input box.</div>
                <div class=\"sectionP\">When you switch on the <b>Include Tax and Delivery Cost</b> switch button, the total order's amount that is compared to the minimum charge will include the order's items, tax value, and delivery fees on the order. If you switch off the button, only the value of the order's items will be compared to the minimum charge.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/56.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you don’t wish to apply a minimum charge on your orders, set the minimum charge as 0.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 15,
            'title' => 'Average Delivery Time',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can set an average delivery time for your orders which your customers will be notified of after they place an order. This can be done using the number picker provided, which allows you to set the time to minutes or hours if needed. If you don't want to specify a delivery time, set the number picker to 0, and the customer will be notified that their order will be delivered as soon as possible.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/57.PNG\" class=\"sectionImg-35\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 7,
            'help_en_tut_id' => 15,
            'title' => 'Home Delivery Working Days?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This area allows you to choose the working days and hours for your home delivery service, which will be displayed on your website to inform customers of your restaurant’s home delivery availability time.</div>
                <div class=\"sectionP\">When you click on a day's card, you can choose whether or not it is a working day, set the working hours for that day, and schedule discounts for that day if desired. Check out the <a href=\"https://www.food-menu.net/en/help/settings/12\" target=\"_blank\">working days and hours</a> and <a href=\"https://www.food-menu.net/en/help/settings/13\" target=\"_blank\">the scheduled discount</a> articles for more information on how to adjust these settings.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/58.PNG\" class=\"sectionImg-40\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>8,
            'help_en_tut_id' =>15,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After you adjust any of the home delivery settings, make sure to click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the <b>Home Delivery Settings</b>, and the sub-accounts that have the authority to manage system and settings.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
