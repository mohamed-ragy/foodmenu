<?php

namespace Database\Seeders\help_en_tuts\orders;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut61 extends Seeder
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
        $helpTut = help_en_tut::where('id',61)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',61)->delete();
        help_en_tut::where('id',61)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>61,
            'sort' => 7,
            'title_id' => 'Orders-History',
            'title' => 'Orders History',
            'description' => 'The control panel’s order history section is specifically designed to provide you with an overview of all your completed orders. In this article, we’ll show you how to easily find orders.',
            'icon' => 'ico-order_history',
            'helpCat' => 'ordering-system',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 61,
            'title' => 'Completed Orders History',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Maintaining a record of all your completed orders is important for both you and your customers. It allows you to review past purchases and find a specific order for different purposes, such as verifying an order's billing details.</div>
                <div class=\"sectionP\">To reach the area of the control panel where you can find all your completed orders, go to the <b>Orders</b> section of the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?page=Order-History\" target=\"_blank\">Order History</a>. A window will open displaying a couple of filters that will help you locate the specific orders you wish to find more easily.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 61,
            'title' => 'Using Filters to Narrow Down Your Search',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Once you're in the order history window, you will notice a search filter. When you click on <b>More filters</b> you will find more filters that can help you refine your search results. These filters include:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\"><b>Order Status</b>: Using this filter, you can filter orders based on their type and status. To select an order status, check the box next to it. For example, you can choose to display only \"Delivered\" orders, or you can include \"Picked Up\" and \"Dined-In\" orders as well.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Placed For</b>: This filter allows you to specify the customer type for the orders you want to search. You can choose to filter by \"Users,\" \"Guests,\" or both. If you're looking for orders placed by a specific user, you can enter their name or phone number in the search box to locate them, which will automatically uncheck the \"Users\" and \"Guests\" boxes.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Order Number</b>: If you know the specific order number you're looking for, you can simply enter it into the Order Number entry box. This will help you quickly locate that particular order in your history.</li>
                </ul>
                <div class=\"sectionP\">After adjusting the desired filters, click on the <b>Find</b> button to initiate the search. The system will process your query and display a list of orders that match your search criteria.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 61,
            'title' => 'Orders List',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Each order is presented in a separate row, presenting the order's essential information for easy reference allowing you to quickly scan through your order history and access their key information with ease. These rows typically include details such as the order number, order status, order price, and two main buttons. These two buttons are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><b>Print Receipt</b>: This button gives you quick access to print the order’s receipt, which will be printed according to the (hc: receipt width adjustments) you have made.</li>
                    <li style=\"margin-bottom:.5em;\"><b>View Order</b>: By clicking on this button, a window will open displaying the order in detail such as the order and customer-specific information, the order lifecycle, and the order items.</li>
                </ol>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that only the main account can view and find the order history, and sub-accounts that have the authority to manage orders.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
