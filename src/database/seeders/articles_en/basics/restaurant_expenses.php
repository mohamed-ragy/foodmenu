<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class restaurant_expenses extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'restaurant_expenses';// make sure that the article id is unique
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
            'title' => "Restaurant expenses ",
            'description' => "In this article, you’ll learn how to record all your restaurant expenses on your account to help generate concise financial reports every month.",
            'icon' => "ico-",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "restaurant_expenses",//the article keywords spreat them using . 
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Why record all your expenses',
            'keyWords' => 'restaurant fixed variable expenses ',
            'html' => <<<string
            <p>Maintaining thorough records of all expenses incurred during the month is important for monitoring your monthly financial output and identifying positive or negative trends.</p>
            <p>Our restaurant management tools include a feature that allows you to generate monthly financial reports by inputting expenses and considering customer order costs as revenue. These reports aim to give you a concise overview of your restaurant's financial performance.</p>
            <p>To record all expenses on your account, go to the <b>Dashboard</b> section of the control panel menu, then click on <a>Restaurant expenses</a>. </p>
            <p>A page will open displaying two dedicated tabs where you will be able to record fixed and variable expenses.</p>
            <img class="articleImg" src="/sto rage/imgs/help/articles/restaurant_expenses.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Monthly fixed expenses',
            'keyWords' => 'fixed expenses costs',
            'html' => <<<string
            <p>Fixed expenses are the recurring costs that you consistently pay every month, such as employee salaries and rent.</p>
            <p>In the <b>Monthly fixed expenses</b> tab, you’ll find the list of fixed expenses you have added before (if any).</p>
            <img class ="articleImg" src="/sto rage/imgs/help/articles/fixed_expense.png" /> 
            <p>To add a new fixed expense, click on the <b>Add new expense</b> button. A window will appear where you can enter the expense name and amount in their respective input boxes.</p>
            <img class="articleImg" src="/sto rage/imgs/help/articles/add_new_expense.png" />
            <p>Then this expense will instantly be reflected in the expenses list.</p>
            <img class="articleImg" src="/sto rage/imgs/help/articles/expense_list.png" />
            <p>These expenses recur each month, and unless you make changes to your fixed expenses and want to remove them, they will continue to appear automatically in your <a>financial reports</a> every month.</p>
            <p>To remove any expense, just click on the <b>Delete</b> icon <span class="ico-delete"></span> beside it in the <b>Fixed expenses list</b>.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>You can enter fixed and variable expenses into your account at any time during the month.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Current month variable expenses',
            'keyWords' => 'monthly variable costs expenses',
            'html' => <<<string
            <p>Variable expenses vary every month and depend on factors like production levels. To maintain accurate financial reports, you will have to input these variable expenses each month.</p>
            <p>In the <b>Current month variable expenses</b> tab, you will find the list of expenses within a month (if any).</p>
            <img class ="articleImg" src="/sto rage/imgs/help/articles/variable_expenses.png" />
            <p>To add your current month’s variable expenses, click on the <b>Add new expenses</b> button. A window will open where you can the expense name and amount in their entry boxes.</p>
            <img class ="articleImg" src="/sto rage/imgs/help/articles/add_new_expense.png" />
            <p>To delete any expense, click on the <b>Delete</b> icon <span class="ico-delete"></span> beside it in the list.</p>
            <p>However, these expenses are automatically cleared from the list at the beginning of each new month, but, you can always access and review these expenses in the monthly financial reports whenever you need them.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can access and record restaurant expenses.</span>
            </div>
            string,
        ]);


        help_en_sections::insert($sections);
    }
}