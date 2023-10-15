<?php

namespace Database\Seeders\help_en_tuts\statistics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut67 extends Seeder
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
        $helpTut = help_en_tut::where('id',67)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',67)->delete();
        help_en_tut::where('id',67)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>67,
            'sort' => 2,
            'title_id' => 'Analyzing-Users-Behavior',
            'title' => 'Analyzing Users Behavior',
            'description' => 'Understanding your top users’ preferences can help you grow your restaurant by tailoring your products and services to their tastes. In this article, you’ll learn how to examine your users’ behavior and preferences.',
            'icon' => 'ico-users',
            'helpCat' => 'statistics-and-analytics',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>67,
            'title' => 'Analyzing users’ behavioral patterns',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Knowing your top users and their preferences can help you create custom discounts. This personalized approach can lead to repetition of orders or visits and, as a result, positive word-of-mouth about your restaurant among their friends and family.</div>
                <div class=\"sectionP\">The statistics and analytics tool we provide gathers data on the preferences and ordering behavior of users who have registered on your website. To explore more of this tool, go to the ‘Dashboard’ section of the control panel, then the ‘Statistics and Analytics’ subsection, to open a page with an overview of the statistics and analytics section.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>67,
            'title' => 'How to generate statistics with users’ data',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you first access the statistics and analytics page, you will find a 'Statistics Period' window where you can select a timeframe to view your restaurant's performance. Choose a specific day, month, or year by checking one of the boxes, then use the date picker provided to select a specific period of time. Then, click on the 'Find' button to generate statistics. Afterward, you will see a statistical overview with different tabs to explore.</div>
                <div class=\"sectionP\">One of these tabs is the ‘Users’ tab; by clicking on it, the window will change to display graphs that are used to analyze your users’ behavior.</div>
                <div class=\"sectionP\">The behavior of users is determined by two factors: the frequency of their orders and their profitability. This is further demonstrated in the 'Income' and 'Ordered' tabs in the left sidebar of the window.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>67,
            'title' => 'Users Profitability',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">By clicking on the 'Income' tab, you will find a list of users sorted in descending order based on their profitability. The highest-income-generating users are positioned at the top of the list.</div>
                <div class=\"sectionP\">By selecting a user from the list, their behavior analysis is visually represented through various graphs. These graphs provide insights into their actions and patterns.</div>
                <div class=\"sectionP\">The first graph, a donut chart named 'Completed Orders’, displays the user's successful and canceled order count. Successful orders indicate that the user's placed orders were successfully delivered, picked up, or completed dining in. This breakdown is shown more clearly in the second donut chart. Additionally, adjacent to the donut charts, you can view the ratings provided by the user.</div>
                <div class=\"sectionP\">All of this data is analyzed for the specific time period you have chosen. At the bottom of the window, there is a bar chart that illustrates the profitability trend of the selected user. If you have selected a monthly time period, each bar on the chart represents a day.</div>
                <div class=\"sectionP\">When you hover over any bar, a box will appear displaying detailed information about the user. This information includes a breakdown of income generated from each order type as well as the user's ratings. These details correspond to the specified time period represented by the bar.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>67,
            'title' => 'Users Ordering Frequency',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Under the ‘Orders’ tab, you will find a list of users sorted in descending order based on their ordering frequency, where the users who order the most are positioned at the top of the list.</div>
                <div class=\"sectionP\">When you click on a user, a breakdown of their ordering behavior is demonstrated in the graphs displayed.</div>
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
