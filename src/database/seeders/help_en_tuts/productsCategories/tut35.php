<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut35 extends Seeder
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
        $helpTut = help_en_tut::where('id',35)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',35)->delete();
        help_en_tut::where('id',35)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>35,
            'sort' => 1,
            'title_id' => 'Creating-a-New-Product',
            'title' => 'Creating a New Product',
            'description' => 'This article will walk you through the process of creating new products on your account.',
            'icon' => 'ico-createProduct',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'products.categories',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 35,
            'title' => 'How to create a new product?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After you have finished setting up your website, you will want to create products for your restaurant, or whenever you want, you can add a new product to your website. To set up a new product and all its details, go to the Products section of the control panel menu, then <b>Manage Products</b> to open the intended page.</div>
                <div class=\"sectionP\">When you first open the page, you'll find a <a href=\"https://cpanel.food-menu.net/?page=Manage-Products&category=allproducts&popupPage=Create-Product\" target=\"_blank\">Create New Product</a> button, which allows you to create a new product on our account. By clicking on the button, a window will appear with a number of areas where you can create and adjust the new product details, including:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Product Information</li>
                    <li style=\"margin-bottom:.5em;\">Product Image</li>
                    <li style=\"margin-bottom:.5em;\">Product Names</li>
                    <li style=\"margin-bottom:.5em;\">Product Descriptions</li>
                </ol>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 35,
            'title' => 'Product Information',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, you'll find three entry boxes where you can enter the main details about your product.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/15.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\">In the <b>Product identifier</b> input box, you can set a unique identifier for your new product in small English letters, numbers, and dashes. It should be noted that once created, it cannot be changed.</div>
                <div class=\"sectionP\">In the <b>Product price</b> input box, you can set the original price for your product and change it at any time.</div>
                <div class=\"sectionP\">The <b>Find category</b> input list allows you to categorize your product in one of the <a href=\"https://www.food-menu.net/en/help/products-categories/32\" target=\"_blank\">categories</a> you have set for your website. If you don't select a category for your product, it'll remain uncategorized until you put it in one of the categories. Noting that uncategorized products don't appear on your website. They are, however, saved on your account, so you can categorize them whenever you want.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 35,
            'title' => 'Product Image',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, you can assign your new product an image to be used on the website.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/16.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\">To select an image, click on the image card. A popup will appear, giving you the option to upload a new image or assign an image that you have previously uploaded to your account.</div>
                <div class=\"sectionP\">It is strongly advised to use an image that is square-sized and not one that is large in size to avoid slowing down your website speed. Also, avoid using images that are too small or of poor quality in order to avoid pixelation. An image with a WebP format is strongly recommended for use; however, multiple image formats are supported, including PNG, JPEG, GIF, WebP, and BMP.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that some templates support images with transparent backgrounds, while others support images with non-transparent backgrounds. Make sure the image you're uploading is the correct image type for the template you've chosen.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 35,
            'title' => 'Product Names',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, you can set the display names of your products, which will appear to your website visitors in different places on your website including the title of the product page.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/17.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\">You're provided with an input box for each language you have selected for your website. If a website visitor browses in a language for which no product name has been added, the product identifier will appear instead.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 35,
            'title' => 'Product Descriptions',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This area provides you with input boxes where you can set the description of your product in the selected languages of your website, which will appear in different places on your website, including the meta description of the product page.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/18.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\">The product description placements on your website will be left blank if you don’t set product descriptions or if a website visitor is browsing in a language for which you haven't added a description.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 35,
            'title' => 'The Final Step',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Make sure to click on the <b>Create</b> button after setting up the new product details. Once the new product has been created, it will be displayed on your website.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can create new products, and sub-accounts that have the authority to manage categories and products.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
