<?php

namespace Database\Seeders\help_en_tuts\statistics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut65 extends Seeder
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
        $helpTut = help_en_tut::where('id',65)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',65)->delete();
        help_en_tut::where('id',65)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>65,
            'sort' => 2,
            'title_id' => 'Your-restaurants-orders-performance',
            'title' => 'Your restaurant’s orders performance',
            'description' => 'Gain visibility into your restaurant’s order performance and make data-driven decisions by exploring the statistics and analytics of orders. Learn more when you read this article.',
            'icon' => 'ico-orders',
            'helpCat' => 'statistics-and-analytics',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>65,
            'title' => 'Monitoring Orders Performance',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Keeping an eye on order performance is crucial for your restaurant's growth. Using our statistics and analytics tool, you can easily monitor and analyze the performance of your orders based on their status.</div>
                <div class=\"sectionP\">To use this tool, go to the ‘Dashboard’ section of the control panel, then the ‘Statistics and Analytics’ subsection, to open a page with an overview of the statistics and analytics section.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>65,
            'title' => 'How to generate orders performance analysis',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Once on the statistics and analytics page, you'll find a 'Statistics Period' window, which allows you to select the timeframe for which you want to view the performance of different aspects of your restaurant. </div>
                <div class=\"sectionP\">Whether you want to examine the statistics for a specific day, month, or year, simply check the corresponding box and choose the desired duration from the date picker provided. Finally, click on the 'Find' button to generate the relevant statistics for your selected period. </div>
                <div class=\"sectionP\">After having the statistics generated for a specified period of time, you can see a number of tabs:</div>
                <div class=\"sectionP\">One of these tabs is the ‘Orders’ tab, which allows you to fully analyze your order performance. When you click on the orders tab, you'll notice a sidebar positioned on the left side of the window:</div>
                <div class=\"sectionP\">This sidebar includes different (hc: order statuses) as clickable options, enabling you to analyze orders based on their status. </div>
                <div class=\"sectionP\">Each order status offers two distinct analysis options. The first option allows you to explore the frequency of orders included in a particular status, providing valuable information about customer demand and trends. The second option provides an analysis of income generated from orders within that specific status, helping you identify the most profitable aspects of your restaurant business. </div>
                <div class=\"sectionP\">For better understanding, when you click on 'Delivered Orders’ you will see an analysis of the number of delivered orders over the specified time period. By selecting 'Delivered Orders Income', you will be able to view a detailed analysis of the income generated during this time period.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>65,
            'title' => 'Order Frequency Analysis',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After clicking on an order status, a bar chart will appear, visually representing the performance and trends of the ordering frequency. </div>
                <div class=\"sectionP\">If you select a month as the time period, each day will be represented by a bar. By simply hovering over any bar, you can view detailed information in a box about the orders within that particular order status for the selected day.</div>
                <div class=\"sectionP\">The order details include the total number of orders placed, the breakdown of orders placed by registered users versus guest users, the subtotal for the items in each order, and the overall income generated from the order. This income includes not only the item price but also the tax, service fees, and delivery fees paid by the customer. While these fees are considered income, they also represent expenses for your restaurant, which is why they are not classified as pure profit.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>65,
            'title' => 'Order Income Analysis',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">By clicking on an order status income, a bar chart will appear, visually representing the trend of income generated during the specified period of time.</div>
                <div class=\"sectionP\">If you opt for a monthly analysis, each day will be represented as a bar on the chart. Hovering over any bar displays detailed information about the orders for the selected day. </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can browse the statistics and analytics.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
