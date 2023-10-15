<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut21 extends Seeder
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
        $helpTut = help_en_tut::where('id',21)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',21)->delete();
        help_en_tut::where('id',21)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>21,
            'sort' => 12,
            'title_id' => 'The-Share-Tool',
            'title' => 'The Share Tool',
            'description' => 'The share tool allows you to promote your restaurant’s products on your social media platforms, which can lead to growth in your website audience. This guide will assist you with how to use the tool.',
            'icon' => 'ico-share',
            'helpCat' => 'basics',
            'keyWords' => 'cpanel.website',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 21,
            'title' => 'What is the share tool?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The share tool is used to share products or categories from your restaurant's website on your social media platforms. This can be an effective technique for driving traffic to your website, informing customers about new products, or promoting a specific product category. Regularly sharing your products on social media will build awareness about all the different types of products you have, which can increase the number of items included in your orders and generate leads by capturing the interest of a larger audience. The share tool also simplifies the sharing process by inserting the product description and image directly from your website into your social media posts, allowing you to share your products with just a few clicks.
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 21,
            'title' => 'How to share products?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">If you want to share a specific product, go to <b>Products</b> in the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?tab=Sort-Products\" target=\"_blank\">Manage products</a>.</div>
                <div class=\"sectionP\">To find a product, first select its category from the <b>Select Category</b> input list. After selecting a category, all of the products included in it will be displayed in cards with buttons on the right side, including the <b>Share Button</b> <span class=\"ico-share\"></span>.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/28.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that uncategorized products don't have a share button, as they cannot be shared since they aren't displayed on your website until they are categorized.</div>
                </div>
                <div class=\"sectionP\">When you click the button, a <b>Share</b> pop-up window appears, displaying the icons for the social media platforms where your product(s) can be shared. </div>
                <div class=\"sectionP\">The selected languages for your website will be displayed in the <b>Select Language</b> area, where you can select the language in which you want to share your product.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/22.PNG\" class=\"sectionImg-35\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 21,
            'title' => 'How to share a category?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">If you want to share a specific category, go to <b>Categories</b> in the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?tab=Categories-List\" target=\"_blank\">Categories List</a> to open a page that contains all your website categories. </div>
                <div class=\"sectionP\">Click the <b>Share Button</b> <span class=\"ico-share\"></span> to select the social media platform where you want to share your category, and then select the language for the text.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Only the main account can use the sharing tool and sub-accounts with the authority to manage categories and products.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 21,
            'title' => 'Share Reminder',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You have the option to receive popup reminders with random products and product categories to share by switching on the <b>Enable Share Reminder</b> switch button in the <a href=\"https://cpanel.food-menu.net/?tab=Control-Panel-Settings\" target=\"_blank\">control panel settings</a>. To learn more about this option, check out <a href=\"https://www.food-menu.net/en/help/settings/6#5\" target=\"_blank\">this article</a>.</div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
// <a href=\"https://www.food-menu.net/en/help/settings/6#5\" target=\"_blank\"></a>
