<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class your_product_reviews extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'your_product_reviews';// make sure that the article id is unique
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
            'title' => "Your product reviews",
            'description' => "Having a rating and review system helps you improve your customer experience by building trust with your visitors. Check out this article to learn how to use it.",
            'icon' => "ico-product_reviews",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "product_reviews",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'The importance of a rating and review system',
            'keyWords' => 'rating reviews products',
            'html' => <<<string
            <p>Including a product rating and review feature on your website engages your customers with your business, making them feel valued. This builds trust and conveys that their feedback is valuable to you.</p>
            string,
        ]);

            //
            $sort++;
            array_push($sections,[
                'sort'=>$sort,
                'article_id' => $article->id,
                'title' => 'How to adjust the rating and review settings',
                'keyWords' => 'rating review settings adjust',
                'html' => <<<string
                <p>In the control panel, you can enable or disable the rating and review feature for your website visitors. To change the ratings and reviews settings, go to <b>Settings</b> in the control panel menu and then <a>System</a>. </p>
                <p>A page will open with a few windows where you can adjust the desired settings.</p>
                <img class="articleImg" src="/storage/imgs/help/articles/system_settings.png" />
                <p>
                <div>In the <b>System settings</b> window, you'll be provided with several switch buttons, including</div>
                <ul>
                <li>Enable product ratings and reviews</li>
                <li>Accept guest reviews</li>
                <li>Display post-purchase surveys for users</li>
                </ul>
                </p>
                string,
            ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'The placement of the ratings and reviews on your website',
            'keyWords' => 'website product rating reviews',
            'html' => <<<string
            <p>Product ratings and reviews are displayed on the product page. Furthermore, products with 5-star ratings can get featured on your home page depending on the website template you have chosen. It's worth noting that the displayed rating for each product is an average of all the ratings received and is updated every 24 hours.</p>
            <div class="tipContainer tipContainer_green">
                <span class="ico-lamp"></span>
                <span>You'll always be notified whenever a product is rated or reviewed on your website, so you can manage them by removing any rating or review that you don't want.</span>
            </div>
            string,
        ]);
        help_en_sections::insert($sections);
    }
}
