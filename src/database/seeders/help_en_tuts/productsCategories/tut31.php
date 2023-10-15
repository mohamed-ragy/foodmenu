<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut31 extends Seeder
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
        $helpTut = help_en_tut::where('id',31)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',31)->delete();
        help_en_tut::where('id',31)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>31,
            'sort' => 8,
            'title_id' => 'Your-product-categories-list',
            'title' => 'Your product categories list',
            'description' => 'Your restaurant’s product categories are organized in a list that you can manage and modify. This article will walk you through the steps of doing so.',
            'icon' => 'ico-category_list',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'categories',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 31,
            'title' => 'What is a Category List?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The category list groups all the product categories you have created in one place where you can quickly access and manage them. To reach your category list, go to the <b>Categories</b> page of the control panel menu, then <a href=\"https://cpanel.food-menu.net/?page=Categories-List\" target=\"_blank\">Category List</a>.</div>
                <div class=\"sectionP\">After you open the page, you will see all of your product categories displayed in the form of cards. Each product category card contains a number of icons for managing the category, which are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The Drag and Drop icon <span class=\"ico-move\"></span></li>
                    <li style=\"margin-bottom:.5em;\">The Manage Products button <span class=\"ico-manage_products\"></span></li>
                    <li style=\"margin-bottom:.5em;\">The Edit button <span class=\"ico-edit\"></span></li>
                    <li style=\"margin-bottom:.5em;\">The Share button <span class=\"ico-share\"></span></li>
                    <li style=\"margin-bottom:.5em;\">The Delete button <span class=\"ico-delete\"></span></li>
                </ol>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 31,
            'title' => 'The Drag and Drop Icon',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This icon allows you to rearrange the order in which your product categories appear on your website. Press and hold the drag and drop icon to drag a category card, then drop it in the place that fits the order you want.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 31,
            'title' => 'The Manage Products button',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you click on this button, you'll be directed to the <a href=\"https://www.food-menu.net/en/help/products-categories/38\" target=\"_blank\">Manage Products</a> page in the <b>Products</b> section of the control panel menu, where you can view and manage all products within a selected product category.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 31,
            'title' => 'The Edit button',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This button allows you to edit the product category details; when you click on it, a window appears with the main details of the selected category, including the category identifier, image, name, and description. You can change or modify any of the details except for the category identifier, which is unchangeable.</div>
                <div class=\"sectionP\">After modifying anything in the selected category details, click on the <b>Save</b> button to apply the changes, or click on <b>Cancel</b> to restore the last saved changes.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 31,
            'title' => 'The Share button',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This button enables you to <a href=\"https://www.food-menu.net/en/help/basics/21\" target=\"_blank\">share</a> the selected category on your social media platforms; when you click on the button, a popup appears displaying the social media platforms you can choose to share your category on and the language in which you want to share your category.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 31,
            'title' => 'The Delete button',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This button enables you to permanently delete the selected category from your account and website. When you delete a category, all the products within it become uncategorized and are no longer displayed on your website until they are recategorized.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can adjust and manage product categories and sub-accounts that have the authority to manage products and categories.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
