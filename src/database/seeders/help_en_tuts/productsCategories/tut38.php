<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut38 extends Seeder
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
        $helpTut = help_en_tut::where('id',38)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',38)->delete();
        help_en_tut::where('id',38)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>38,
            'sort' => 2,
            'title_id' => 'Managing-products',
            'title' => 'Managing products',
            'description' => 'After creating your products, you can modify and manage them at any time through their categories. When you read this article, you will learn more about how to do it.',
            'icon' => 'ico-manage_products',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'products.categories',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 38,
            'title' => 'Managing products through their categories',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A category contains a collective set of products that have the same classification of the type of food. After creating your products and categorizing them, you may still need to look into each product category to make some changes to products within it. You can do so on the control panel by going to the <b>Products</b> section in the control panel menu, then selecting <a href=\"https://cpanel.food-menu.net/?page=Manage-Products\" target=\"_blank\">Manage Products</a> where a page will open with two areas.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 38,
            'title' => 'Selecting a Category',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Select Category</b> area, you're provided with an input list where you can search for all the product categories you've created on your account. When you click on the input list, a list of all product categories that have been created appears. In addition, there are two other options in the list: <b>uncategorized products</b> and <b>all products</b>, which can be useful if you want to look into all the uncategorized products or get an overview of all of the products on your account.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 38,
            'title' => 'Product Cards',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After selecting a category, the products within it will be displayed as cards, which are used to manage each product. Product cards within a category are organized in the same way that products on your website are organized within their respective categories. At the top of each product card, you can find a <b>Drag and Drop</b> icon <span class=\"ico-move\"></span> that allows you to rearrange the order of products within a category.</div>
                <div class=\"sectionP\">Each product card displays the product image, product identifier, price, and a number of buttons that allow you to effortlessly manage the selected product. These buttons are:</div>
                <ol>
                    <li>
                        <div class=\"sectionP\"><B>Product Availability</b></div>
                        <div class=\"sectionP\">The <b>Product Availability</b> switch button allows you to mark your product as available or unavailable on your website. When you switch on the button, your website visitors will view the selected product as available and will be able to add it to their shopping cart. When you switch off the button, the product will continue to show on your website but will be marked as unavailable, and visitors won't be able to add it to their shopping carts.</div>
                        <div class=\"tipContainer\">
                            <div class=\"ico-lamp tutTipIcon\"></div>
                            <div class=\"tutTipText\">If you mark a product as unavailable after it has already been added to the shopping cart(s), customers will be notified that the product is no longer available when they open their cart(s).</div>
                        </div>
                    </li>
                    <li>
                        <div class=\"sectionP\"><b>Reviews <span class=\"ico-star\"></span></b></div>
                        <div class=\"sectionP\">When you click on the <b>Reviews</b> button, you'll be directed to the <a href='https://www.food-menu.net/en/help/products-categories/33' target='_blank'>Rating and Reviews</a> page, where you can find and manage the reviews for the selected product.</div>
                    </li>
                    <li>
                        <div class=\"sectionP\"><b>Manage Options <span class='ico-list'></span></b></div>
                        <div class=\"sectionP\">You can manage the <a href='https://www.food-menu.net/en/help/products-categories/34' target='_blank'>product options</a> for the selected product by clicking on the <b>Manage Options</b> button. When you click on this button, a window appears where you can create and modify the product's options.</div>
                    </li>
                    <li>
                        <div class=\"sectionP\"><b>Edit <span class='ico-edit'></span></b></div>
                        <div class=\"sectionP\">When you click on the <b>Edit</b> button, a window with all of the product's main details appears, from which you can change any of the details.</div>
                    </li>
                    <li>
                        <div class=\"sectionP\"><b>Share <span class='ico-share'></span></b></div>
                        <div class=\"sectionP\">By clicking on the <a href='https://www.food-menu.net/en/help/basics/21' target='_blank'>Share</a> button, a window appears where you can share the selected product on the social media platform of your choice and in the language you specify.</div>
                    </li>
                    <li>
                        <div class=\"sectionP\"><b>Delete <span class='ico-delete'></span></b></div>
                        <div class=\"sectionP\">When you click on the <b>Delete</b> button, you can permanently delete the selected product from your website.</div>
                    </li>
                </ol>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can adjust and manage products, and sub-accounts that have the authority to manage categories and products.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
