<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut28 extends Seeder
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
        $helpTut = help_en_tut::where('id',28)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',28)->delete();
        help_en_tut::where('id',28)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>28,
            'sort' => 2,
            'title_id' => 'Your-Website-Structure',
            'title' => 'Your Website Structure',
            'description' => 'A well-structured website is essential for a successful online business. This article will show you the structure we use when you create a website using Foodmenu.',
            'icon' => 'ico-system',
            'helpCat' => 'basics',
            'keyWords' => 'website',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 28,
            'title' => 'What is a website structure',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The structure of a website determines how your website's content is organized and presented to your website visitors and is key to a good user experience. The degree of your website's usability can make or break your users' experience, which is why we took it into account when designing the structure of your website to make it user-friendly and usable to the greatest extent.</div>
                <div class=\"sectionP\">We also implement the silo structure in the websites' architecture for better web indexing. A website's silo structure groups and interlinks related pages through structure or linking, which is useful for ranking and relevance in search engines.(add img for googl seo score)</div>
                <div class=\"sectionP\">As our purpose is to assist you in launching your website effortlessly, we provide you with a ready-to-use website that is categorized proficiently.</div>
                <div class=\"sectionP\">Your website’s content is displayed in pages and popup windows, the main pages of your website are:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">The homepage</li>
                    <li style=\"margin-bottom:.5em;\">Category pages</li>
                    <li style=\"margin-bottom:.5em;\">Product pages</li>
                    <li style=\"margin-bottom:.5em;\">All-product page</li>
                    <li style=\"margin-bottom:.5em;\">Privacy policy page</li>
                    <li style=\"margin-bottom:.5em;\">User profile page</li>
                    <li style=\"margin-bottom:.5em;\">About us page</li>
                </ul>
                <div class=\"sectionP\">All your website pages include a header and a footer; the content in between is what distinguishes one page from another. The content displayed on these pages is determined by the layout you chose for your website pages and the components you chose to include. This also applies to the header and footer, as their designs and the content they contain are customizable.</div>
                <div class=\"sectionP\">The header contains a set of important links, and it shifts to a mobile navigation bar if your screen width is less than 1040 pixels.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/40.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\">The footer also includes important links such as your contact info.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/41.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\">Your website also includes a live chat element which appears as an icon in the bottom right corner of your screen if you <a href=\"https://www.food-menu.net/en/help/settings/10#12\" target=\"_blank\">enable</a> it. </div>
            </div>
            ",
        ]);
        // array_push($tutsTexts,[
        //     'sort'=> 2,
        //     'help_en_tut_id' => 28,
        //     'title' => 'Your website’s pages',
        //     'html' => "<div class=\"SectionContainer\">
        //         <ol>
        //             <li style=\"margin-bottom:.5em;\"><b>The Homepage</b>: Your homepage components and layout are determined by the theme you have applied to our website, which is fully customizable for you to arrange it however you want.</li>
        //             <li style=\"margin-bottom:.5em;\"><b>Product pages</b>: Your product pages get displayed when a user clicks on a product in any part of your website. The page contains all details about the selected product, and its layout is based on your chosen theme.</li>
        //             <li style=\"margin-bottom:.5em;\"><b>Categories pages</b>: Your categories pages appear when a user clicks on a category; the category page displays the products included in the selected category, arranged in the order you specify in the form of product cards.</li>
        //             <li style=\"margin-bottom:.5em;\"><b>All-product page</b>: The all-product page contains all the categorized and uncategorized products you have created for your website in the form of product cards.</li>
        //             <li style=\"margin-bottom:.5em;\"><b>Privacy policy page</b>: The privacy policy page appears when your website visitor is signing up for an account, or when they click on the privacy policy link in the footer. It is important to note that the privacy policy won’t appear if a visitor is browsing in a language to which you have not added a privacy policy from the languages you have set for your website. </li>
        //         </ol>
        //     </div>
        //     ",
        // ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 28,
            'title' => 'Your website’s popup windows',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The popup window is a small window that appears when a user clicks on a link or an icon that has the popup function.</div>
                <div class=\"sectionP\" style=\"margin-bottom:0;\">The popup windows included in your website structure are:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\"><b>Browsing language</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>User signup</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>User login</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Forget password</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Cart</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Add to cart</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Place order</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Track order</b></li>
                    <li style=\"margin-bottom:.5em;\"><b>Post-purchase survey</b></li>
                </ul>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 28,
            'title' => 'Your website pages’ URLs',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" style=\"margin-bottom:0;\">A website URL is a unique address we assign to your pages and is used to locate your website on the internet. Each page of your website pages has its own URL which consists of basic main parts:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The protocol (https://)</li>
                    <li style=\"margin-bottom:.5em;\"><a href=\"https://www.food-menu.net/en/help/basics/25\" target=\"_blank\">The domain name</a></li>
                    <li style=\"margin-bottom:.5em;\">The browsing language code (such as “en” for English)</li>
                    <li style=\"margin-bottom:.5em;\">The browsed page</li>
                </ol>
                <div class=\"sectionP\" style=\"margin-bottom:0;\">For each page the URL is as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><b>The homepage</b>: https://<i><u>restaurantIdentifier</i></u>.food-menu.net/en/home</li>
                    <li style=\"margin-bottom:.5em;\"><b>Product pages</b>: https://<i><u>restaurantIdentifier</i></u>.food-menu.net/en/<i><u>categoryIdentifier</i></u>/<i><u>productIdentifier</i></u></li>
                    <li style=\"margin-bottom:.5em;\"><b>Categories pages</b>: https://<i><u>restaurantIdentifier</i></u>.food-menu.net/en/<i><u>categoryIdentifier</i></u></li>
                    <li style=\"margin-bottom:.5em;\"><b>All-product page</b>: https://<i><u>restaurantIdentifier</i></u>.food-menu.net/en/allproducts</li>
                    <li style=\"margin-bottom:.5em;\"><b>Privacy policy page</b>: https://<i><u>restaurantIdentifier</i></u>.food-menu.net/en/privacypolicy</li>
                    <li style=\"margin-bottom:.5em;\"><b>User profile page</b>: https://<i><u>restaurantIdentifier</i></u>.food-menu.net/en/profile</li>
                    <li style=\"margin-bottom:.5em;\"><b>About us page</b>: https://<i><u>restaurantIdentifier</i></u>.food-menu.net/en/aboutus</li>

                </ol>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
