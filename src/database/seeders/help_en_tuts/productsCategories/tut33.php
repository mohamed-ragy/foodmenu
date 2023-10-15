<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut33 extends Seeder
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
        $helpTut = help_en_tut::where('id',33)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',33)->delete();
        help_en_tut::where('id',33)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>33,
            'sort' => 5,
            'title_id' => 'Managing-Your-Product-Reviews',
            'title' => 'Managing Your Product Reviews',
            'description' => 'Enabling ratings and reviews has become essential in a customer-centric business world. However, you should know how to manage them considerately. Check out this article to learn more.',
            'icon' => 'ico-product_reviews',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'reviews.categories',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 33,
            'title' => 'Why are ratings and reviews important?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Ratings and reviews are the ultimate forms of feedback you want to receive for your products; they reveal what your customers like and what you can improve. Customers look for them first when buying a product because it assists them in making more informed purchasing decisions.</div>
                <div class=\"sectionP\">Since they are absolutely influential, low ratings and spammy reviews can harm your products and thus your sales, which is why we provide you with a tool to manage all your products' ratings and reviews. This tool is also beneficial for developing your products, as you can search for reviews on specific products and note the common issues your users face.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">You will receive notifications as soon as a website visitor leaves a review or rates any of your products, allowing you to view and manage the reviews immediately.</div>
                </div>

            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 33,
            'title' => 'How to find and manage your product reviews',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you open the page, you'll find a <b>Find Reviews</b> section where you can search for reviews on any product you have created.</div>
                <div class=\"sectionP\">You can use the <b>Reviews on</b> input list to find all reviews left on a specific product on your website by selecting the product name from the list. You'll also see another option on the list called <b>All products</b>, which will allow you to view all reviews created on all products in your account.</div>
                <div class=\"sectionP\">Additionally, you can click on the <b>More Filters</b> button to be presented with additional options from which to narrow your search for reviews. By clicking on the button, you'll view the <b>Reviews by</b> and <b>Reviews with</b> areas.</div>
                <div class=\"sectionP\">In the <b>Reviews by</b> area, you can filter the reviews based on whether they were made by a user or a guest by checking the box next to the desired website visitor type, or you can check both boxes to find reviews made by all website visitors. Instead, you can search for reviews made by a specific user by entering the user's name or phone number into the search box to quickly locate the user.</div>
                <div class=\"sectionP\">In the <b>Reviews with</b> area, you can filter reviews based on the product's star ratings.</div>
                <div class=\"sectionP\">After narrowing your search, click on the <b>Find</b> button to see customer reviews in the form of cards.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 33,
            'title' => 'Reviews Cards',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Each review is displayed on a card, and the review cards are sorted from most recent to oldest. On a review card, you can view the added review, the review star rating, the review posting date, and details about the reviewed product.</div>
                <div class=\"sectionP\">You're also provided with a <b>Delete</b> button, which allows you to permanently delete the review from your website.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 33,
            'title' => 'Reviews Notifications',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When a website visitor rates or reviews a product, you are immediately notified via the control panel notification icon <span class=\"ico-notifications\"></span> in the navigation bar. Or, if you have the <a href=\"https://www.food-menu.net/en/help/settings/7#5\" target=\"_blank\">product review alert</a> enabled, you will receive an alert notification at the bottom right of your control panel screen when a product on your website receives a review.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can manage the product ratings and reviews, and sub-accounts that have the authority to manage categories and products.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
