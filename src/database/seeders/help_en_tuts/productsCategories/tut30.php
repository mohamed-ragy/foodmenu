<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut30 extends Seeder
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
        $helpTut = help_en_tut::where('id',30)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',30)->delete();
        help_en_tut::where('id',30)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>30,
            'sort' => 7,
            'title_id' => 'Creating-a-Product-Category',
            'title' => 'Creating a Product Category',
            'description' => 'This article will walk you through the process of creating a new product category for your website.',
            'icon' => 'ico-createCategory',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'categories',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 30,
            'title' => 'How to create a new product category?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Categories enable you to organize your products based on similar features so that you can present related products coherently for your users.</div>
                <div class=\"sectionP\">To reach the page where you can create a new category for your website, go to the <b>Categories</b> section of the control panel menu, then <b>Category List</b> to open the intended page. After opening the page, you'll first be provided with a <a href=\"https://cpanel.food-menu.net/?page=Categories-List&popupPage=Create-Category\" target=\"_blank\">Create New Category</a> button that enables you to create a new product category on your website. By clicking on the button, a window will open displaying a number of areas where you can fill in the new product category's details. These areas are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Category Identifier</li>
                    <li style=\"margin-bottom:.5em;\">Category Image</li>
                    <li style=\"margin-bottom:.5em;\">Category Names</li>
                    <li style=\"margin-bottom:.5em;\">Category Descriptions</li>
                </ol>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 30,
            'title' => 'Category Identifier',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To create a new category, you have to start by assigning the category an identifier name. The category identifier is used to uniquely identify the category and distinguish it from other categories or elements on your website. It is also used to generate the category page's URL for your website.</div>
                <div class=\"sectionP\">The identifier has to be written in small English letters, numbers, or dashes.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/3.PNG\" class=\"sectionImg-30\"/>
                <div class=\"sectionP\">Note that the category identifier usually doesn't appear on your website. However, if you don't add a name for the category or if the visitor is browsing in a language for which you didn’t add a name, the category identifier will appear.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 30,
            'title' => 'Category Image',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Category Image</b> area, you can assign the category an image to be used on the website by clicking on the image card; after doing so, a popup will appear displaying the option to upload a new image or assign your category an image that you have previously added to your account.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/4.PNG\" class=\"sectionImg-30\"/>
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
            'help_en_tut_id' => 30,
            'title' => 'Category Names',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Category names</b> area, you'll be provided with an area to give your category a display name in the selected languages you have added to your website. For each language, you'll be provided with an input box to write the name.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/5.PNG\" class=\"sectionImg-30\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 30,
            'title' => 'Category Descriptions',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This area provides you with input boxes where you enter the description for your product category in the languages you have set for your website. A category description will be used as the meta description for the category page and may appear on different parts of your website depending on your website template.</div>
                <div class=\"sectionP\">If you don't include a category description in one of your website's selected languages and a user browses in that language, the category description placement will be left blank on your website, and your restaurant description will be used as the category meta description.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 30,
            'title' => 'The Final Step',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Click on the <b>Create</b> button to save your new category. After creating the category, it will immediately appear on your website and be added to the <a href=\"https://www.food-menu.net/en/help/products-categories/31\" target=\"_blank\">categories list</a> in the control panel.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can create a new category and sub-accounts that have the authority to manage products and categories.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
