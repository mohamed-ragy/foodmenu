<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut16 extends Seeder
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
        $helpTut = help_en_tut::where('id',16)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',16)->delete();
        help_en_tut::where('id',16)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>16,
            'sort' => 6,
            'title_id' => 'Your-Restaurants-Order-Pickup-Service',
            'title' => 'Your Restaurant’s Order Pickup Service',
            'description' => 'One of the services you can provide to make your restaurant more convenient is order pickup. This article will help you to know how to adjust the service’s settings.',
            'icon' => 'ico-pickup',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'discount.orders.restaurant.orderPickup',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>16,
            'title' => 'What is the order pickup service?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The order pickup service is an option that allows your customers to place orders on your website and pick them up by going to your restaurant. Including it in your delivery methods helps you to be a full-service restaurant with multiple channels through which different customers can conveniently reach you, as flexibility improves the customer experience.</div>
                <div class=\"sectionP\">On Foodmenu, we make the order pickup service easier for you by allowing you to manage the entire process from when the customer places an order to when you deliver the order to the customer and accept payment all in one place. Having all of this data in one place will also allow us to generate more accurate financial reports and better analytics on your performance.</div>
                <div class=\"sectionP\">You can go to the <b>Order Pickup Settings</b> by clicking on <b>Settings</b> in the Control Panel Menu. When you open the <a href=\"https://cpanel.food-menu.net/?tab=Order-Pickup\" target=\"_blank\">Order Pickup Settings</a> page, you'll be provided with a number of options to adjust its settings, which are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Payment Methods</li>
                    <li style=\"margin-bottom:.5em;\">Tax Cost</li>
                    <li style=\"margin-bottom:.5em;\">Minimum Charge</li>
                    <li style=\"margin-bottom:.5em;\">Average Time To Prepare an Order</li>
                    <li style=\"margin-bottom:.5em;\">Order Pickup Working Days</li>
                </ol>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 16,
            'title' => 'Payment Methods',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Payment methods are the payment options available to your customers when they place their orders. For the order pickup service, the following payment options are available for your customers to choose from: </div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">Cash at the restaurant</li>
                    <li style=\"margin-bottom:.5em;\">Credit card at the restaurant</li>
                </ul>
                <div class=\"sectionP\">You can enable both or just one method by checking the box next to the method(s) you want your customers to use. If you select neither of the options, your customers will not be required to select a payment method while they’re placing their order. </div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/60.PNG\" class=\"sectionImg-35\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 16,
            'title' => 'Tax Cost',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can add a tax value to your pickup orders, which can be done in one of the following ways:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The first way is to set a fixed cost for your tax value, which will be added to the total of your home delivery. For example, if you set your tax fixed cost to be $10, this will be the added tax cost on the order no matter the total amount. If you want to apply this option, switch on the <b>Fixed Cost</b> button and enter the tax value in the <b>Tax Cost</b> input box.</li>
                    <li style=\"margin-bottom:.5em;\">The second option is to set a tax percentage that will be calculated from the sum of the items included in the pickup order. If you want to use this option, switch off the <b>Fixed Cost</b> button, and enter the tax value in percentage in the <b>Tax Percentage</b> input box.</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/61.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you prefer not to include any taxes on your pickup orders, set the tax fixed cost or percentage to 0.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 16,
            'title' => 'Minimum Charge',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A minimum charge is the lowest amount of an order’s total allowed to place an order, which means that if a customer places an order and the total order amount is less than the minimum charge you set, they won't be allowed to place an order. You can enter the desired minimum charge for your pickup orders in the <b>Minimum Charge</b> input box. </div>
                <div class=\"sectionP\">When you switch on the <b>Include Tax</b> switch button, the total order's amount that is compared to the minimum charge will include the order's items and tax value. If you switch off the button, only the value of the order's items will be compared to the minimum charge.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/62.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you don’t wish to apply a minimum charge on your orders, set the minimum charge as 0.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 16,
            'title' => 'Average Time To Prepare an Order',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After placing a pickup order, your customers will be notified when they can come to your restaurant to pick up their order. Using the number picker provided, you can determine how long it takes for pickup orders to be ready.</div>
                <div class=\"sectionP\">If you don't want to specify a time for when your order gets ready, set the number picker to 0, and the customer will be notified that their order will be prepared as soon as possible.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/63.PNG\" class=\"sectionImg-35\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 16,
            'title' => 'Order Pickup Working Days',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, you can choose the working days and hours of your restaurant's order pickup service, which will be shown on your website to inform customers of this service's availability time.</div>
                <div class=\"sectionP\">When you click on a day's card, you can choose whether or not it is a working day, set the working hours for that day, and schedule discounts for that day if desired. Check out the <a href=\"https://www.food-menu.net/en/help/settings/12\" target=\"_blank\">working days and hours</a> and <a href=\"https://www.food-menu.net/en/help/settings/13\" target=\"_blank\">the scheduled discount</a> articles for more information on how to adjust these settings.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/64.PNG\" class=\"sectionImg-40\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>7,
            'help_en_tut_id' =>16,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After adjusting any of the order pickup settings, make sure to click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the <b>Order Pickup Settings</b>, and the sub-accounts that have the authority to manage system and settings.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
