<?php

namespace Database\Seeders\help_en_tuts\statistics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut63 extends Seeder
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
        $helpTut = help_en_tut::where('id',63)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',63)->delete();
        help_en_tut::where('id',63)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>63,
            'sort' => 2,
            'title_id' => 'Restaurant-Expenses',
            'title' => 'Restaurant Expenses',
            'description' => 'In this article, you’ll learn how to record all your restaurant expenses on your account to help generate concise financial reports every month.',
            'icon' => 'ico-restaurant_expenses',
            'helpCat' => 'statistics-and-analytics',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>63,
            'title' => 'Why record all your expenses',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Maintaining thorough records of all incurred expenses during the month is important to know your financial output and notice positive or negative trends for each month.</div>
                <div class=\"sectionP\">Part of our restaurant management tools enables you to generate monthly financial reports based on the expenses you enter while considering customer order costs as revenue. Financial reports generated using our services aim to give you a simple overview of your restaurant's financial performance.</div>
                <div class=\"sectionP\">To record all your expenses on your account, go to the 'Dashboard' section of the control panel menu, then click on 'Restaurant Expenses'. A page will open displaying dedicated areas to record fixed and variable expenses.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>63,
            'title' => 'Monthly Fixed Expenses ',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Fixed expenses are the recurring costs that you consistently pay every month, such as employee salaries and rent. </div>
                <div class=\"sectionP\">In the 'Monthly Fixed Expenses' window, you can add each fixed expense individually in the 'Add New Expenses' area. Simply enter the expense name and cost in their respective input boxes, and they will be instantly reflected in the 'Fixed Expenses List' area.</div>
                <div class=\"sectionP\">These expenses recur each month, and unless you have made changes to your fixed expenses and want to remove them, they will continue to appear automatically in your financial reports every month.</div>
                <div class=\"sectionP\">To remove any expense, just click on the ‘Remove’ icon beside it in the ‘Fixed Expenses List’.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>63,
            'title' => 'The month’s Variable Expenses',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Variable expenses are the ones that fluctuate from month to month and are inconsistent each month depending on your production increase or decrease, such as the cost of food ingredients, which is determined by the number of orders completed, or utility bills, such as electricity bills, and so on. To ensure accurate financial reporting, you need to input your variable expenses each month.</div>
                <div class=\"sectionP\">In the 'Current Month Variable Expenses' window, you can enter these expenses individually in the 'Add New Expenses' area. Just fill in the expense name and cost, and they will be automatically displayed in the 'Current Month Expenses List' area. </div>
                <div class=\"sectionP\">However, these expenses are automatically cleared from the list at the beginning of each new month. Rest assured, you can always access and review these expenses in the monthly financial reports whenever you need them.</div>
                <div class=\"sectionP\">If you wish to make an amendment to any expense you have entered, you can remove it first by clicking on the ‘Remove’ icon beside it in the ‘Current Month Expenses List’, then add it again.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">The flexibility of our system allows you to enter fixed and variable expenses into your account at any time during the month.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>63,
            'title' => 'In-depth View of Your Performance',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">For a more comprehensive understanding of your restaurant's overall performance, our platform provides an array of statistical and analytical features. You can look deeper into the data and gain valuable insights into the various aspects of your restaurant's operations by exploring the dedicated (hc: statistics and analytics section) of your account.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can access and record restaurant expenses.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
