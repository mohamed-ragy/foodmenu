<?php

namespace Database\Seeders\help_en_tuts\orders;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut58 extends Seeder
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
        $helpTut = help_en_tut::where('id',58)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',58)->delete();
        help_en_tut::where('id',58)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>58,
            'sort' => 4,
            'title_id' => 'Placing-a-new-order',
            'title' => 'Placing a new order',
            'description' => 'In this article, we will guide you through the steps of placing a new order, ensuring that you include all the necessary information about the order.',
            'icon' => 'ico-createProduct',
            'helpCat' => 'ordering-system',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 58,
            'title' => 'How to place an order from the control panel',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Placing a new order through the control panel is a simple process that allows you to easily place an order and manage all of its details from your end. This feature is useful if you received an order over the phone or are placing a dine-in order and want to record all of your orders on your account to save their data.</div>
                <div class=\"sectionP\">To get to the control panel section where you can place a new order, go to the <b>Orders</b>  section, then click on <b>Incomplete orders</b> to open a page with a list of orders in progress.</div>
                <div class=\"sectionP\">A <b>New Order</b> button is prominently displayed at the right top of the <b>Incomplete Orders List</b> window. By clicking on it, a new window will open, made specifically for entering the details of the new order.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 58,
            'title' => 'New Order Window',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The new order window is divided into two sections: <b>Order Details</b> and <b>Order Items</b>.</div>
                <div class=\"sectionP\">You can start by filling in the <b>Order Details</b> section, which requires essential information related to the order and customer details.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 58,
            'title' => 'New Order Details',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">First, you’ll need to specify the order type, whether it’s a <b>home delivery</b>, <b>pickup</b>, or <b>dine-in</b> order.</div>
                <div class=\"sectionP\">Then you'll enter the details of whom you're placing the order for, starting with specifying if you're placing the order for a <b>Guest</b> or a <b>User</b> by checking the box next to each customer type. If you choose to place an order for a user, you can type in the user's name or phone number in the provided input box to select a user.</div>
                <div class=\"sectionP\">The remaining entry fields depend on which order type you're placing, which is as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">If you're placing a home delivery order, you can select a payment method through which the customer can pay for the order, and you'll be required to enter the customer's phone number and address. You'll also have the option to set a delivery location on the map.</li>
                    <li style=\"margin-bottom:.5em;\">If you're placing a pickup order, you'll also have the option to choose the preferred payment method for the customer, and you'll be required to enter the customer's phone number.</li>
                    <li style=\"margin-bottom:.5em;\">When the order is dine-in at your restaurant, you'll only need to add the customer's phone number.</li>
                </ol>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that if you choose a user and they already have a phone number or address saved, it'll autofill their respective entry fields, but you can still modify them.</div>
                </div>
                <div class=\"sectionP\">After filling in all the necessary details, you can add an additional comment related to the order, such as delivery instructions, which your staff members can see.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 58,
            'title' => 'New Order Items',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the order items section, you have the option to choose the specific products you wish to include in your order, along with their details. </div>
                <div class=\"sectionP\">To add food items to your order, simply click on the <b>Add Item</b> button to open a popup window that displays an input list with your saved products. From this list, you can select the desired items. Once you have selected an item, you can specify the quantity and choose any available options associated with it (if it has any). Then you can click on the <b>Add item</b> button to successfully add it to your order. You can also include a special request below each item as an additional instruction.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 58,
            'title' => 'Order Receipt',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The order receipt area displays the order payment details, which will be the receipt you can print for the customer.</div>
                <div class=\"sectionP\">Once you have added the desired products to your order, you will notice that the total cost of the items will be automatically updated in the order's subtotal. If the order type is home delivery, (hc: the delivery fees) you have set will reflect on the receipt. If it’s a dine-in order, the (hc: service fees) you have specified for this order type will apply to the receipt. Additionally, If you have set a tax cost or percentage for any order type for which you are placing an order, it will reflect in the order receipt.</div>
                <div class=\"sectionP\">Also, if there is a (hc: scheduled discount) for the selected order type at the time you place the order, it will be reflected in the receipt as a discount on your order’s subtotal.</div>
                <div class=\"sectionP\">You also have the flexibility to make further adjustments to the order. For instance, you can easily modify the delivery fees to accurately reflect the actual costs. You also have the option to apply or modify a discount percentage to the order. By having control over these variables within the <b>Order Receipt</b> area, you can ensure that the final order total aligns with any applicable discounts or fees. </div>
                <div class=\"sectionP\">Note that when any of your sub-accounts modify the discount percentage or delivery fees, it will show which account has made the modification. </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that only the main account can create or take actions on any order, and sub-accounts that have the authority to manage orders.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
