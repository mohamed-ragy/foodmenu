<?php

namespace Database\Seeders\help_en_tuts\statistics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut69 extends Seeder
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
        $helpTut = help_en_tut::where('id',69)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',69)->delete();
        help_en_tut::where('id',69)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>69,
            'sort' => 2,
            'title_id' => 'Comparing-Growth-Over-Time',
            'title' => 'Comparing Growth Over Time',
            'description' => 'To determine your restaurant’s growth, you need to compare your current performance to the past. Using our tool, you’ll be able to make comparisons in different durations. Read this article to learn more.',
            'icon' => 'ico-statistics_and_analytics',
            'helpCat' => 'statistics-and-analytics',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>69,
            'title' => 'The importance of evaluating performance over time',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To assess the performance of your business, it's important to compare it with its past performance. What you may initially deem as good performance can actually indicate a decline when viewed in the context of previous results, and conversely, what may seem like a decline can actually signify progress. Evaluating your business's performance should primarily be based on its growth rate over time, considering that growth is subjective and varies for each business.</div>
                <div class=\"sectionP\">With our statistics and analytics tool, you have the ability to compare various aspects of your restaurant's performance across different time periods of your choosing. To reach this area of the control panel, go to the ‘Dashboard’ section of the control panel, then the ‘Statistics and Analytics’ subsection, to open a page with an overview of the statistics and analytics section.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>69,
            'title' => 'Conducting Comparisons',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Upon reaching the statistics page, you will find a 'Statistics Period' window located at the top of the page. This window allows you to conduct the necessary comparisons.</div>
                <div class=\"sectionP\">First, you must decide whether you wish to compare a day with another day, a month with another month, or a year with another year. These options are presented as checkboxes and you can select the desired option by checking the box next to it as shown below:</div>
                <div class=\"sectionP\">Let's take the example of comparing month-to-month for this article.</div>
                <div class=\"sectionP\">After checking the 'Month' box, you will be able to choose the desired month from the date picker provided. Once you have made your selection, check the 'Compare' box. This action will reveal another date picker, allowing you to select the month you wish to compare the previously selected month with.</div>
                <div class=\"sectionP\">Keep in mind that the initially chosen month is the one being evaluated in terms of its performance relative to the secondly selected month. For instance, if you selected May as the first month and June as the second month, as shown in the below image, the comparison is between May and June, with the primary emphasis on assessing May's performance.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>69,
            'title' => 'Assessing performance over time',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Once you have chosen the desired timeframe for comparison, click on the 'Find' button to generate the necessary statistics as shown in the window below.</div>
                <div class=\"sectionP\">The tabs located at the top of the window represent various aspects of your restaurant's performance that can be analyzed.</div>
                <div class=\"sectionP\">The tabs are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The overview tab</li>
                    <li style=\"margin-bottom:.5em;\">The orders tab</li>
                    <li style=\"margin-bottom:.5em;\">The products tab</li>
                    <li style=\"margin-bottom:.5em;\">The users tab</li>
                    <li style=\"margin-bottom:.5em;\">The deliveries tab</li>
                </ol>
                <div class=\"sectionP\">By clicking on any of the tabs, you can dig deeper into the performance of different aspects of your restaurant. Keep in mind that the numbers displayed are for the month of May as the primary focus is on it in this comparison.</div>
                <div class=\"sectionP\">Each aspect is illustrated in bar charts, with each bar representing a specific day. Hovering over any bar will reveal a box with detailed performance information for May and June. The box also includes upward and downward indicators, which compare the performance of May to June.</div>
                <div class=\"sectionP\">The green upward indicator determines an improvement in May's performance compared to June, while the red downward indicator signifies a decline in performance. </div>
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
