<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut32 extends Seeder
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
        $helpTut = help_en_tut::where('id',32)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',32)->delete();
        help_en_tut::where('id',32)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>32,
            'sort' => 6,
            'title_id' => 'What-is-a-product-category',
            'title' => 'What is a product category?',
            'description' => 'Categorizing your products improves the browsing experience of your customers. This article will provide you with an overview of its significance.',
            'icon' => 'ico-category_list',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'categories',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 32,
            'title' => 'Your products category',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Product categories are used to group similar products so that they can be displayed together on your website. Categorizing your products not only hints at a good website organization, but also facilitates your customers' shopping experience, as categories act like signs that prompt customers to find what they're looking for.</div>
                <div class=\"sectionP\">On top of this, uncategorized products don't get displayed on your website, so they should be categorized in order to be displayed. Product categorization also enhances your customer experience, which is especially important for you as a restaurant because your products have to be classified into at least a few main groups, such as main dishes, desserts, and drinks.</div>
                <div class=\"sectionP\">Your product categories can be found in different places on your website. Each category has its own page that appears when a website visitor clicks on it. Using the control panel you’ll be able to <a href=\"https://www.food-menu.net/en/help/products-categories/30\" target=\"_blank\">create</a> and <a href=\"https://www.food-menu.net/en/help/products-categories/31\" target=\"_blank\">modify</a> any product category at any time.</div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
