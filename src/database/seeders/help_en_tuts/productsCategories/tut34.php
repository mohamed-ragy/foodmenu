<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut34 extends Seeder
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
        $helpTut = help_en_tut::where('id',34)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',34)->delete();
        help_en_tut::where('id',34)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>34,
            'sort' => 3,
            'title_id' => 'Product-Options',
            'title' => 'Product Options',
            'description' => 'The Foodmenu product system allows you to create different variations for your products. This article will walk you bit by bit through the process of creating product options.',
            'icon' => 'ico-orderItems',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'products',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 34,
            'title' => 'What are product options?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After you have created a product, you may want to give options to your food item, such as size or fillings. For example, if you own a pizzeria, you might want to sell your pizza in multiple sizes and with multiple toppings. Or you own a coffee shop and want to add coffee size options like small, medium, and large.</div>
                <div class=\"sectionP\">The Foodmenu product system allows you to create multiple options for your products. To reach the page where you can create and manage options and selections for your products, go to the <b>Products</b> section of the control panel menu, then select <a href='https://cpanel.food-menu.net/?page=Manage-Products' target='_blank'>Manage Products</a>. A page will open where you can find all of your created products within the categories they're categorized in.</div>
                <div class=\"sectionP\">Each product can have its own option or set of options that are exclusive to that product, and each option can have selections. Each selection can have its own price. The price you assign is for the selection value and will be added to the product’s original price. For instance, you might want to increase the price of selections with a higher value, like a <b>large</b> size.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/11.PNG\" class=\"sectionImg-40\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 34,
            'title' => 'What are the option and selection identifiers?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">An identifier is a unique name you assign to a product option or an option selection so they can be identified in the Foodmenu database; the identifier cannot be changed once it has been created and has to be in small English letters, numbers, and dashes. It does not appear to website visitors unless you haven't given your product option or option selection a name in the languages you've chosen for your website.</div>
                <div class=\"sectionP\">There cannot be two product options with the same identifiers for the same product, but the same product option identifier can exist between different products. For example, if the product is pizza, you can have an option identifier of <b>\"size\"</b>, but you cannot create another option identifier of <b>\"size\"</b> for the selected pizza product; however, you can have an option identifier of <b>\"size\"</b> for another product, say a salad.</div>
                <div class=\"sectionP\">Option selection identifiers cannot be reused within the same product option, but they can be reused in another selection for a different product option.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/productsCategories/31.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
