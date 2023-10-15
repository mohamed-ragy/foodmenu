<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut29 extends Seeder
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
        $helpTut = help_en_tut::where('id',29)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',29)->delete();
        help_en_tut::where('id',29)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>29,
            'sort' => 6,
            'title_id' => 'Your-Products-Rating-and-Reviews',
            'title' => 'Your Products’ Rating and Reviews',
            'description' => 'Having a rating and review system helps you improve your customer experience by building trust with your visitors. Check out this article to learn how to use it.',
            'icon' => 'ico-system',
            'helpCat' => 'basics',
            'keyWords' => 'reviews',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 29,
            'title' => 'The importance of a ratings and reviews system',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A rating and review system is now a major tool to include on your website. Not only does it meet customers' expectations to be able to see others' ratings of your products, but it also engages your customers with your business by making them feel that their opinions are acknowledged and taken into account.</div>
                <div class=\"sectionP\">When designing your website's rating and review system, we made sure to make it simple to use because users should be able to rate and review your business with minimal effort for a positive customer experience.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 29,
            'title' => 'How to adjust the ratings and reviews settings',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can choose whether or not to display the rating and review feature to your website visitors by enabling or disabling it in the control panel.</div>
                <div class=\"sectionP\">To adjust the ratings and reviews settings, go to <b>Settings</b>  in the control panel side menu, then to <a href=\"https://cpanel.food-menu.net/?tab=System\" target=\"_blank\">System</a>  which will open a page with a couple of windows. </div>
                <div class=\"sectionP\" style=\"margin-bottom:0;\">In the <b>System Settings</b> window, you'll be provided with several switch buttons, including</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><a href=\"https://www.food-menu.net/en/help/settings/10#4\" target=\"_blank\">Enable product ratings and reviews</a></li>
                    <li style=\"margin-bottom:.5em;\"><a href=\"https://www.food-menu.net/en/help/settings/10#5\" target=\"_blank\">Accept Guest Reviews</a></li>
                    <li style=\"margin-bottom:.5em;\"><a href=\"https://www.food-menu.net/en/help/settings/10#6\" target=\"_blank\">Display post-purchase surveys for users</a></li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/42.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 29,
            'title' => 'The placement of the rating and reviews on your website',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A product's rating and reviews appear on the product page and product cards component; product cards appear in different places on your website. The product ratings and reviews also appear on customer review cards, which only display 5-star rated products on your home page.</div>
                <div class=\"sectionP\">Notice that the rating shown for a product is the average of all the ratings given to that product, and it gets updated every 24 hours.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">You’ll always be notified whenever a product is rated or reviewed on your website, so you can manage them by removing any rating or review that you don’t want.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
