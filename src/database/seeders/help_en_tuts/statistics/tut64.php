<?php

namespace Database\Seeders\help_en_tuts\statistics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut64 extends Seeder
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
        $helpTut = help_en_tut::where('id',64)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',64)->delete();
        help_en_tut::where('id',64)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>64,
            'sort' => 2,
            'title_id' => 'The-importance-of-statistics-and-analytics',
            'title' => 'The importance of statistics and analytics',
            'description' => 'Analyzing your performance will help you drive your business toward growth. In this article, we’ll look at how statistics and analytics can reveal popular food items, customer behavior patterns, areas for improvement, and more.',
            'icon' => 'ico-statistics_and_analytics',
            'helpCat' => 'statistics-and-analytics',
            'keyWords' => '',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>64,
            'title' => 'Why business analysis is important for your restaurant ',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">\"Data is king\". You've probably heard this before; it's a timeless phrase that still holds true. When it comes to moving your business forward, you should make informed decisions based on data and actual figures rather than relying on intuition. </div>
                <div class=\"sectionP\">Your past performance data should be collected and analyzed precisely to help you gain valuable insights and uncover hidden patterns and trends that may have otherwise gone unnoticed.</div>
                <div class=\"sectionP\">At Foodmenu, we provide you with a statistics and analytics tool that will give you an in-depth view of the performance of your restaurant. Here are some insights that our analytics features will provide you with to help you grow your business:</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>64,
            'title' => 'Understanding your customer behavior and preferences',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Analyzing your customers' ordering data will help you better understand their preferences and needs, this can be done by knowing:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><b>Products with the highest demand</b></li>
                        <div class=\"sectionP\">Our statistics tool shows you the most frequently ordered products, so you can learn about your customers' favorite food items and preferences. </div>
                        <div class=\"sectionP\">For example, you can learn which food categories your customers are interested in based on their orders, and you can use this information to develop more food items that will appeal to them.</div>
                    <li style=\"margin-bottom:.5em;\"><b>Most profitable products</b></li>
                        <div class=\"sectionP\">Knowing which products have generated the most revenue allows you to know which products to advertise most on your marketing channels and place them in high-traffic areas, whether on your website or on display at your restaurant.</div>
                    <li style=\"margin-bottom:.5em;\"><b>Determine the most likeable product option</b></li>
                        <div class=\"sectionP\">Understanding your customers' preferences goes beyond knowing their favorite products. It is important to understand the specific choices they prefer for each product. For instance, size and toppings serve as common examples of options for food items. By identifying cheese chili toppings as the most preferred option for sandwiches and fries, you can consider incorporating this option into more products.</div>
                        <div class=\"sectionP\">Similarly, if you uncover that the large size is the most popular option among your products, you can use this insight to make a slight adjustment in the profit margin associated with this option.</div>
                    <li style=\"margin-bottom:.5em;\"><b>The preferred food serving method</b></li>
                        <div class=\"sectionP\">Using our tools, you can find out the number of orders completed for each of the home delivery, order pickup, and dine-in serving methods during a specific time period. This gives you an opportunity to develop more products or services that match your customers’ preferences.</div>
                        <div class=\"sectionP\">For instance, if you have a large number of dine-in orders, you can focus on improving your dining experience and offering exclusive in-house dishes.</div>
                </ol>
                <div class=\"sectionP\">By thoroughly understanding your customer preferences using all the above-mentioned insights, you can use this knowledge to maximize your profit through a re-pricing strategy. For example, You can increase the profit margin on your most demanded products to increase revenue growth. </div>
                <div class=\"sectionP\">However, you'll also need to consider the product cost and competition while raising profit margins to avoid raising prices more than necessary.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>64,
            'title' => 'Identify areas for development',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Analyzing data allows you to gain insights into product development opportunities. By understanding which food items have the lowest order volume, you can look into ways to improve them to better suit your customers' tastes, such as by potentially adding a few tweaks to the product or by offering discounts. Additionally, analyzing customer ratings and reviews provides valuable feedback on your products, enabling you to identify areas for improvement and refine your offerings accordingly.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>64,
            'title' => 'Food Inventory Management',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Knowing which food items are frequently ordered allows you to ensure a consistent supply and avoid shortages. This knowledge allows you to accurately estimate the required quantity of food ingredients needed over a specific time period, ensuring that these popular items are always in stock and available to customers. On the contrary, understanding which food items are ordered the least allows you to be more cautious when acquiring their ingredients, preventing food waste and saving money that would otherwise be wasted on the excess stock.</div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
