<?php

namespace Database\Seeders\help_en_tuts\statistics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut68 extends Seeder
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
        $helpTut = help_en_tut::where('id',68)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',68)->delete();
        help_en_tut::where('id',68)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>68,
            'sort' => 2,
            'title_id' => 'Delivery-Personnel-Performance',
            'title' => 'Delivery Personnel Performance',
            'description' => 'This article explores how to analyze your order delivery personnel performance, which is key to the success of your restaurant, especially if delivery is a significant part of your operations.',
            'icon' => 'ico-delivery_accounts',
            'helpCat' => 'statistics-and-analytics',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>68,
            'title' => 'Analyzing your order delivery performance',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The success of your restaurant largely depends on how well your delivery service performs, especially if delivering orders is a regular part of your operations.</div>
                <div class=\"sectionP\">At Foodmenu, we make the delivery process easier by offering a platform where you can create individual (hc: delivery accounts) for your delivery personnel. This gives them a sense of responsibility and ownership, encouraging them to deliver orders on time while maintaining high quality for your customers' (hc: online ordering) experience.</div>
                <div class=\"sectionP\">A dedicated section in our statistics and analytics tool has been created for analyzing the performance of your deliveries. This feature uses data from your delivery accounts to provide you with useful insights. </div>
                <div class=\"sectionP\">To access this page, go to the ‘Dashboard’ section of the control panel, then the ‘Statistics and Analytics’ subsection, to open a page with an overview of the statistics and analytics section.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>68,
            'title' => 'How to generate an analysis for a specific duration',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Once on the statistics and analytics page, you'll find a 'Statistics Period' window, which allows you to select the timeframe for which you want to view the performance analysis.</div>
                <div class=\"sectionP\">To examine the statistics for a specific day, month, or year, simply check the corresponding box and select the desired duration from the date picker provided. Finally, click on the 'Find' button to generate the relevant statistics.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>68,
            'title' => 'Deliveries Tab',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After generating the statistics, you can see a number of tabs:</div>
                <div class=\"sectionP\">One of the tabs is the ‘Deliveries’ tab which is used to analyze your order delivery performance. When you click on the ‘Deliveries’ tab, you'll notice a sidebar positioned on the left side of the window:</div>
                <div class=\"sectionP\">The sidebar consists of all your delivery accounts as clickable options, arranged in descending order based on the number of orders done by each account. This allows you to thoroughly assess the performance of each delivery account/person. Upon selecting a delivery account, you will be presented with a bar chart graph illustrating the performance of that specific account.</div>
                <div class=\"sectionP\">Each bar represents a day if you had chosen the time period to be a month. Or if you select the time period to be a specific day, then each bar will represent one hour. When you hover over a bar, a box will appear with detailed info about the selected delivery person's completed orders count, total delivery time, and average time per order. This information applies to the timeframe you've selected, whether it's a day or an hour.</div>
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
