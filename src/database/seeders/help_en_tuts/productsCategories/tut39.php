<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut39 extends Seeder
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
        $helpTut = help_en_tut::where('id',39)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',39)->delete();
        help_en_tut::where('id',39)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>39,
            'sort' => 9,
            'title_id' => 'Your-product-special-categories',
            'title' => 'Your product special categories',
            'description' => 'Special categories are used to group your top products into categories, making them stand out on your website and highly visible to your website visitors.',
            'icon' => 'ico-categories',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'categories.products',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 39,
            'title' => 'What are the special product categories?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">We group the top products on your website into special categories based on their popularity, ratings, and more. This is to highlight your top products by creating badges on their products’ cards.</div>
                <div class=\"sectionP\">In some of the templates, these categories are displayed on your homepage, making your top products always front and center on your website. Our system recategorizes your products every 24 hours based on the <a href=\"https://www.food-menu.net/en/help/settings/9#2\" target=\"_blank\">time zone</a> you have set.</div>
                <div class=\"sectionP\">These special categories are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Trending Products</li>
                    <li style=\"margin-bottom:.5em;\">Top-rated Products</li>
                    <li style=\"margin-bottom:.5em;\">Most Popular Products</li>
                    <li style=\"margin-bottom:.5em;\">New products</li>
                </ol>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 39,
            'title' => 'The mechanism: How products are grouped into these special categories?',
            'html' => "<div class=\"SectionContainer\">
                <div style=\"margin-inline-start:10px;margin-top:10px;\" class=\"sectionP\"><b>Trending Products</b>: These are the products that have been ordered the most in the last 10 days.</div>
                <div style=\"margin-inline-start:10px;\" class=\"sectionP\"><b>Top-rated Products</b>: These are the products that have been top-rated most of all time.</div>
                <div style=\"margin-inline-start:10px;\" class=\"sectionP\"><b>Most popular products</b>: These are the most frequently ordered products of all time.</div>
                <div style=\"margin-inline-start:10px;\" class=\"sectionP\"><b>New products</b>: These are the products that have been recently created in the last 10 days.</div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
