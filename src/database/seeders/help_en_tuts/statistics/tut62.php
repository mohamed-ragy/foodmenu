<?php

namespace Database\Seeders\help_en_tuts\statistics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut62 extends Seeder
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
        $helpTut = help_en_tut::where('id',62)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',62)->delete();
        help_en_tut::where('id',62)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>62,
            'sort' => 1,
            'title_id' => 'Financial-Reports',
            'title' => 'Financial Reports',
            'description' => 'In this article, we explore how you can generate monthly financial reports using our tools to provide valuable insights into your business’s financial health.',
            'icon' => 'ico-financial_reports',
            'helpCat' => 'statistics-and-analytics',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>62,
            'title' => 'Importance of Financial Reports',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To thrive as a business, it is essential for restaurant owners and managers to have a clear understanding of their financial performance. Looking into monthly financial reports is a fundamental practice that enables you to maintain financial stability and make informed decisions.</div>
                <div class=\"sectionP\">At Foodmenu, our restaurant management tools allow you to generate monthly financial reports based on data from your account and performance. The financial reports we generate are designed to be simple and straightforward, aiming to give you a snapshot of your financial performance rather than an (hc: in-depth analysis).</div>
                <div class=\"sectionP\">To access all financial reports generated on your account, go to the <b>Dashboard</b> section of the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?page=Financial-Reports\" target=\"_blank\">Financial Reports</a>.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>62,
            'title' => 'Monthly Financial Reports',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">On the <b>Financial Reports</b> page, you have the ability to view and access all the reports that have been generated. Each report is displayed in its own row and provides three icons for different actions you can take:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><b>Download PDF file <span class=\"ico-download\"></span>:</b> This option allows you to download the report to your device.</li>
                    <li style=\"margin-bottom:.5em;\"><b>View PDF file <span class=\"ico-pdf\"></span>:</b> If you prefer to view the report without downloading it, this icon opens it in a new tab for immediate viewing.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Delete <span class=\"ico-delete\"></span>:</b> If you no longer need a particular report, you can permanently remove it from your account by selecting this option.</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>62,
            'title' => 'How do the financial reports get generated?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Our tools gather data from various sources to create these reports. The revenue stream is based on your order performance by tracking sold products and delivery/service costs. The expenses are incorporated from data (hc: you specify) on your account, such as overhead costs (rent, utilities, etc.), food ingredients, packaging, and payroll expenses.</div>
                <div class=\"sectionP\">This approach ensures that your financial reports capture both revenue and expense aspects while maintaining accurate figures as they're captured from the data you specify.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>62,
            'title' => 'Your Data Is Secured',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The financial reports are confidential and are for the sole and exclusive use of the restaurant's owner. They cannot be accessed through sub-accounts. Therefore, no additional copies of each report are available, as it is generated specifically for you each time you request it.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can view and access financial reports.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
