<?php

namespace Database\Seeders\help_en_tuts\orders;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut59 extends Seeder
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
        $helpTut = help_en_tut::where('id',59)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',59)->delete();
        help_en_tut::where('id',59)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>59,
            'sort' => 5,
            'title_id' => 'Incomplete-Orders',
            'title' => 'Incomplete Orders',
            'description' => 'Any new order requires additional steps and action to be taken. In this article, you’ll learn how to manage incomplete orders on the control panel.',
            'icon' => 'ico-orders',
            'helpCat' => 'ordering-system',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 59,
            'title' => 'What are incomplete orders ',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When a customer places an order through your website or you place it from the control panel, it is marked as an incomplete order, which you can easily access and monitor in a section dedicated to incomplete orders. This section provides a convenient way to view and manage all orders that need further action to be completed. Orders are classified as incomplete when they require additional steps or processes before they can be considered complete. By having a dedicated area to track these orders, you can ensure efficient handling and timely completion, resulting in a smooth experience for both you and your customers.</div>
                <div class=\"sectionP\">To reach the incomplete order section, go to the <b>Orders</b> section of the control panel menu, then click on <b>Incomplete Orders</b> to open a window with the orders list.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 59,
            'title' => 'Incomplete Orders List',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Within this window, you will find a list of orders arranged in rows, sorted in chronological order from the oldest to the most recent. Each row represents a distinct incomplete order and provides essential information about it.</div>
                <div class=\"sectionP\">In each order row, you will find main details that provide a quick overview of the order. These details include the order number, placement date, the current status of the order, the items included in the order, the order price, and two main buttons.</div>
                <div class=\"sectionP\">To keep track of the progress of each order, its status is clearly displayed in the form of pending, accepted, out for delivery, ready for pickup, or dining in. If you need to update the status of an order, you can easily do so through the status drop-down menu. Simply click on the status, and a list of available status options will appear. To change the status, select the desired option by (hc: clicking on it twice), thereby confirming the action.</div>
                <div class=\"sectionP\">On the right side of every order row, you can find two significant buttons, which are <b>Print receipt</b> <span class=\"ico-print\"></span> and <b>View order</b> <span class=\"ico-open\"></span>. </div>
                <div class=\"sectionP\">By clicking on the <b>Print receipt</b> button, you gain the ability to easily generate and print the receipt for the selected order. You can easily adjust the receipt width to fit your printer size from the (hc: system settings).</div>
                <div class=\"sectionP\">When you click on the <b>View order</b> button, you can view all the order details. This button also provides the option to (hc: make necessary modifications) or adjustments to the order if required.</div>
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
