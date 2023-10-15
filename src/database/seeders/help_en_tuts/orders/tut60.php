<?php

namespace Database\Seeders\help_en_tuts\orders;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut60 extends Seeder
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
        $helpTut = help_en_tut::where('id',60)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',60)->delete();
        help_en_tut::where('id',60)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>60,
            'sort' => 6,
            'title_id' => 'Making-Order-Adjustments',
            'title' => 'Making Order Adjustments',
            'description' => 'The ability to view and make adjustments to orders seamlessly can save time and improve customer satisfaction. In this article, you’ll learn how to view an order in detail and make necessary adjustments to it from the control panel.',
            'icon' => 'ico-edit',
            'helpCat' => 'ordering-system',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);


        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 60,
            'title' => 'Managing an Incomplete Order',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Efficient order management is crucial for any business, especially restaurants, where orders should typically be delivered quickly after a customer places an order.</div>
                <div class=\"sectionP\">After an order has been placed, you can view it in the control panel and make changes to it if necessary. To reach this area of the control panel, go to the <b>Orders</b> section of the control panel menu, then click on <b>Incomplete Orders</b> to open a window with the order list.</div>
                <div class=\"sectionP\">The incomplete orders list displays the orders that still require actions to be completed. To view an order in more detail, simply locate the desired order and click on the <b>View Order</b> button associated with it.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 60,
            'title' => 'Viewing an Order',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Upon clicking on the <b>View Order</b> button, a new window will open, providing you with a comprehensive view of the order. The order window is divided into three tabs: \"Order Details,\" \"Order Lifecycle,\" and \"Order Items.\"</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 60,
            'title' => 'Order Details',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The <b>Order Details</b> tab contains vital information about the order. It includes essential details such as the order number, order type, order current status, payment method if applicable, and any notes or special instructions they may have provided.</div>
                <div class=\"sectionP\">You have the ability to change the order type between home delivery, order pickup, and dine-in if the order status is in the pending or accepted stages by clicking on the drop-down box.</div>
                <div class=\"sectionP\">You can also add or modify a note in the <b>Additional Comments</b> entry box for any instructions you wish other staff members would see, such as a delivery instruction. Note that any comments you add cannot be viewed by the customer.</div>
                <div class=\"sectionP\">Below the order information, you can find an area with customer-specific details, such as their name, contact information, and delivery address, where you can make adjustments to these details by clicking on the entry box. </div>
                <div class=\"sectionP\">If you change the order type to a home delivery order from another type, you will be required to enter a delivery address in the <b>Address</b> entry box.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">After making any changes, click on the <b>Save</b> button to successfully save the changes, or click on the <b>Cancel</b> button to restore the last saved changes. Note that when changing the order status or type, the changes will take effect immediately after clicking twice on the new type or status.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 60,
            'title' => 'Order Lifecycle',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Order Lifecycle</b> tab, you can find a timeline of the order's journey, starting from when it was placed. It provides a visual representation of the order's progress through the stages it has gone through.</div>
                <div class=\"sectionP\">In this tab, you can take further actions for the order by selecting the desired action from the <b>Order Actions</b> box and clicking the <b>Take Action</b> button to successfully perform the action.</div>
                <div class=\"sectionP\">If the order type is home delivery and the status is accepted, you will either be able to mark it as <b>out for delivery</b> or assign it to a delivery person. All (hc: delivery accounts) that have been created will be displayed. If you choose to have the order marked as out for delivery, you will still be able to assign it to delivery personnel.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 60,
            'title' => 'Order Items',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Order Items</b> tab, you can view all the food items that were added to the order listed under each other in the form of rows, where you can make adjustments to each item in its respective row, such as follows:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">You can adjust the item's quantity using the number picker provided.</li>
                    <li style=\"margin-bottom:.5em;\">You can also modify the item's option from the drop-down box to the new desired option, like changing the size from small to large, for instance. </li>
                    <li style=\"margin-bottom:.5em;\">To delete an item from the order entirely, you can simply click on the <b>Remove</b> button <span class=\"ico-close\"></span>.</li>
                    <li style=\"margin-bottom:.5em;\">You can add a special instruction for each food item.</li>
                </ul>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">After adjusting an item’s quantity or option(s), the changes will reflect in the item’s total price.</div>
                </div>
                <div class=\"sectionP\">Additionally, you can add new items to the order by clicking on the <b>Add item</b> button.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 60,
            'title' => 'Order Receipt',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Once you have made all the necessary modifications to your order, the order receipt will be updated accordingly. These modifications may include significant changes like switching the order type to home delivery, resulting in the addition of delivery fees. Other changes involve modifying the number of items and adding new ones. After the receipt has been recalculated with the updated changes, you still have the flexibility to make further adjustments by modifying the discount percentage or delivery fees.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Whenever any modifications are made to the order, the system will indicate the specific sub-account responsible for these changes. This feature allows you to easily keep track of which staff members are making the modifications.</div>
                </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make modifications to any order, and sub-accounts that have the authority to manage orders.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
