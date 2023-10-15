<?php

namespace Database\Seeders\help_en_tuts\orders;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut56 extends Seeder
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
        $helpTut = help_en_tut::where('id',56)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',56)->delete();
        help_en_tut::where('id',56)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>56,
            'sort' => 2,
            'title_id' => 'Your-restaurants-ordering-system',
            'title' => 'Your restaurant’s ordering system',
            'description' => 'Foodmenu’s integrated ordering system allows you to manage all aspects of your ordering operations from a single place. In this article, you’ll learn the main terms of your restaurant’s ordering system.',
            'icon' => 'ico-orders',
            'helpCat' => 'ordering-system',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 56,
            'title' => 'What is an ordering system?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Every successful restaurant has a well-run ordering system because it is the core of their business. An ordering system is responsible for processing all orders, tracking them, and maintaining accurate data on all order details.</div>
                <div class=\"sectionP\">Our ordering system is an integral part of the restaurant management tools we provide you with. Having all your restaurant orders recorded on your account allows you to generate accurate financial reports and precise statistics and analytics of your performance. Your customers' purchase data can also show you consumer preferences that may affect what new food items you can add to your menu. With all these tools at your disposal, you'll have a greater understanding of how your customer base is performing, allowing you to make smarter decisions for your business.</div>
                <div class=\"sectionP\">A well-designed food ordering system is also going to limit the mistakes and inconsistencies that cause customer dissatisfaction. In this article, we’re going to demonstrate how the Foodmenu ordering system works.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 56,
            'title' => 'Order Types',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To start with, you have three different order types enabled on your account, which are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><a href=\"https://www.food-menu.net/en/help/settings/15\" target=\"_blank\">Home Delivery Orders:</a> These are the orders that get delivered to your customers’ doorsteps.</li>
                    <li style=\"margin-bottom:.5em;\"><a href=\"https://www.food-menu.net/en/help/settings/16\" target=\"_blank\">Pickup Order:</a> These are the orders that your customers go and pick up from your restaurant.</li>
                    <li style=\"margin-bottom:.5em;\"><a href=\"https://www.food-menu.net/en/help/settings/14\" target=\"_blank\">Dine-in Orders:</a> These are orders placed for your customers to eat at your restaurant.</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 56,
            'title' => 'Order Statuses',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you place an order from the control panel or a customer places an order through the website, it is assigned a status. On your account, order statuses are categorized as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><b>Pending</b>: These are orders placed by customers through your website and are awaiting you to accept them.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Accepted</b>: These are orders that were pending before you <a hc>marked them as accepted</a> in the control panel, or orders that you <a hc>placed directly</a> from the control panel.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Ready for pickup</b>: These are pickup orders that have been accepted and <a hc>marked as ready for pickup</a> by you via the control panel.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Out for delivery</b>: These are home delivery orders that have been accepted and <a hc>marked as out for delivery</a> by you via the control panel.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Dining in</b>: These are orders that have been placed for customers who come to dine at your restaurant and <a hc>are marked as dining in</a> by you through the control panel.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Delivered</b>: These are orders that have been delivered and received successfully by your customers.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Picked up</b>: These are orders that have been picked up from your restaurant successfully by your customers.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Dined in</b>: These are dine-in orders that have been successfully completed.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Canceled</b>: These are orders that have been placed but got canceled by you from the control panel, or by a customer if you <a hc>allow for customers’ cancelation</a>.</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 56,
            'title' => 'Incomplete Orders',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Incomplete orders are orders that have been placed but await further actions to be completed. Their data is not archived in your restaurant's statistics and analytics. To notify you of orders that have yet to be completed, there is a <a hc>Incomplete Orders</a> icon in the navigation bar, which is specifically placed to alert you of incomplete orders awaiting action.</div>
                <div class=\"sectionP\">Orders statuses that count as incomplete are:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\"><b>Pending</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Accepted</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Ready for pickup</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Out for delivery</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Dining in</b></li>
                </ul>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 56,
            'title' => 'Complete Orders',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Complete orders are those that require no further action and are saved in your orders' history. Their data is used to generate <a hc>statistics and analytics</a> to provide insight into your restaurant's performance.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can access and view the restaurant’s statistics and analytics.</div>
                </div>
                <div class=\"sectionP\">You have the option to (hc:delete your completed order history) from the system section of the control panel. However, this is not recommended because order history allows you to gain insight into your customers' ordering patterns and preferences.</div>
                <div class=\"sectionP\">Order statuses that count as complete are classified between successful and unsuccessful orders.</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\"><b>Successful</b>: These are orders that have been marked as delivered, picked up, or dined in successfully.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Unsuccessful</b>: These are orders that have been canceled at any stage of the <a hc>order's life cycle</a>.</li>
                </ul>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
