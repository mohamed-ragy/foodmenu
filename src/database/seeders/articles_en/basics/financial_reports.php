<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class financial_reports extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'financial_reports';// make sure that the article id is unique
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $domain = env('APP_DOMAIN');
        $old_article_id = help_en_articles::where('title_id',$title_id)->pluck('id')->first();
        help_en_articles::where('id',$old_article_id)->delete();
        help_en_sections::where('article_id',$old_article_id)->delete();

        $sections = [];

        $article = help_en_articles::create([
            'sort' => 0,//change this to the number of the article sort
            'title_id' => $title_id,
            'title' => "Financial reports",
            'description' => "In this article, we explore how you can generate monthly financial reports using our tools to provide valuable insights into your business’s financial health.",
            'icon' => "ico-financial_reports",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "financial",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Importance of financial reports',
            'keyWords' => 'restaurant finances financial records reports',
            'html' => <<<string
            <p>With Foodmenu management tools, you can easily generate monthly financial reports. These reports give you a quick snapshot of your financial performance, allowing you to track your financial progress and growth.</p>
            <p>To access the financial reports generated on your account, go to the <b>Dashboard</b> section of the control panel menu, then click on <a>Financial reports</a>.</p>
            string,
        ]);

                //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Monthly financial reports',
            'keyWords' => 'monthlyfinances financial records reports',
            'html' => <<<string
            <p>On the financial reports page, you can see and access all the generated reports. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/financial_reports.png" />
            <p>
            <div>Each report is presented in its row and features three icons for actions you can perform:</div>
            <div>
            <ul>
            <li><b>Download PDF file <span class="ico-pdf"></span>:</b> This option lets you download the report to your device.</li>
            <li><b>View PDF file <span class="ico-download"></span>:</b> If you prefer to view the report without downloading, this icon opens it in a new tab for immediate viewing.</li>
            <li><b>Delete <span class="ico-delete"></span>:</b> If you no longer need a particular report, you can permanently remove it from your account by selecting this option.</li>
            </ul>
            </div>
            </p>
            string,
        ]);


        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How do the financial reports get generated?',
            'keyWords' => 'restaurant costs financial reports',
            'html' => <<<string
            <p>Our tools use the account information you provide to make detailed financial reports. The revenue calculations are based on the sales and performance of the products and services you offer.</p>
            <p>The expense data is derived directly from the restaurant-specific costs you specify in your account. This ensures the financial reports we generate accurately reflect the operational expenses incurred by your business.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Your data is secured',
            'keyWords' => 'data security',
            'html' => <<<string
            <p>
            The financial reports are confidential and are for the sole and exclusive use of the restaurant's owner. They cannot be accessed through sub-accounts. Therefore, no additional copies of each report are available, as it is generated specifically for you each time you request it.
            </p>

            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can view and access financial reports.</span>
            </div>

            string,
        ]);


        help_en_sections::insert($sections);
    }
}
