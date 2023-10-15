<?php

namespace Database\Seeders\help_en_tuts\orders;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut57 extends Seeder
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
        $helpTut = help_en_tut::where('id',57)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',57)->delete();
        help_en_tut::where('id',57)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>57,
            'sort' => 3,
            'title_id' => 'Order-Lifecycle',
            'title' => 'Order Lifecycle',
            'description' => 'Any order that gets placed goes through a lifecycle, which is a journey of order processing, preparation, and fulfillment. In this article, we’ll walk you through the order lifecycle on our ordering system.',
            'icon' => 'ico-cycle',
            'helpCat' => 'ordering-system',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 57,
            'title' => 'What is an order lifecycle?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">An order's lifecycle is the process orders go through from the initial placement step to getting completed. The stages of an order lifecycle are:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">Order Placement</li>
                    <li style=\"margin-bottom:.5em;\">Order Acceptance</li>
                    <li style=\"margin-bottom:.5em;\">Order Action</li>
                    <li style=\"margin-bottom:.5em;\">Order Completion</li>
                </ul>
                <div class=\"sectionP\">Customers can track and view the status of their orders, giving them visibility into their orders progression.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 57,
            'title' => 'Order Placement',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This is the stage at which your restaurant receives an order. An order can be placed through your website by a visitor or a guest; you can also place an order directly from the control panel.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Dine-in orders can only be placed from the control panel.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 57,
            'title' => 'Order Acceptance',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Once an order is placed through your website, its status becomes <b>Pending</b>, indicating that you need to accept it from the control panel so it can be prepared. If an order is placed from the control panel, it gets accepted right away.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 57,
            'title' => 'Order Action',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After an order is accepted, the following actions you can take from the control panel differ based on the order type whether it’s home delivery, order pickup, or dine-in. When an action is taken, it cannot be undone.</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\"><b>Order Pickup</b>: Once a pickup order is accepted, you’ll have the choice to set the order as <b>Ready for pickup</b>, <b>Picked up</b>, or <b>Canceled</b>. If you marked an order as <b>Ready for pickup</b>, the next action you can take for the order is to set it as <b>Picked up</b>, or <b>Canceled</b>.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Home Delivery</b>: After accepting a home delivery order, you can mark it as <b>Out for delivery</b>, <b>Delivered</b>, or <b>Canceled</b>. If you choose to mark it as <b>Out for delivery</b>, the next option is to mark it as delivered or canceled. If you assign the order to a (hc: delivery account), the person in charge of delivering the order should mark it as delivered from their end.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Dine-in</b>:  When you place a dine-in order, it is immediately set as <b>accepted</b>, then you can mark it as <b>Dining in</b>, <b>Dined in</b>, or <b>Canceled</b>. When you mark an order as <b>Dining in</b>, it indicates that the order is being processed. This means that your visitor(s) are currently dining at your restaurant and can continue to add items to their order. Once your visitors have finished dining, you can mark the order as <b>Dined in</b>.</li>
                </ul>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 57,
            'title' => 'Order Completion',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After an order is received by your customers, you can mark it as <b>Delivered</b>, <b>Picked up</b>, or <b>dined in</b>, indicating that the order has been <b>completed</b> successfully.</div>
                <div class=\"sectionP\">You can cancel an incomplete order at any time during the order lifecycle. When an order is canceled its status becomes <b>completed</b> but unsuccessful.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 57,
            'title' => 'Further Demonstration',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Here's an example of a home delivery order lifecycle: </div>
                <div class=\"sectionP\">A customer places an order on your website, you are notified on the control panel that an order has been placed and is awaiting action, you go to the order and mark it as <b>accepted</b>. When the order is ready, you can mark it as <b>out for delivery</b>, and once received by your customer, you mark it as <b>delivered</b>.</div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
