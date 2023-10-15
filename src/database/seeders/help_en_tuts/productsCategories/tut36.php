<?php

namespace Database\Seeders\help_en_tuts\productsCategories;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut36 extends Seeder
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
        $helpTut = help_en_tut::where('id',36)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',36)->delete();
        help_en_tut::where('id',36)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>36,
            'sort' => 4,
            'title_id' => 'Managing-your-product-options',
            'title' => 'Managing your product options',
            'description' => 'This article will guide you through the steps of modifying an existing product’s options.',
            'icon' => 'ico-orderItems',
            'helpCat' => 'products-and-categories',
            'keyWords' => 'products',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 36,
            'title' => 'Managing Product Options',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Product options are different variants of a product that allow you to offer different buying options for a product. For example, if your product is \"salad\", you can provide a \"size\" option and add different selections for the product option, such as \"regular\" or \"large\".</div>
                <div class=\"sectionP\">To reach the page where you can manage options and selections for your products, go to the <b>Products</b> section of the control panel menu, then select <a href='https://cpanel.food-menu.net/?page=Manage-Products' target='_blank'>Manage Products</a>. A page will open where you can find all of your created products within the categories they're categorized in.</div>
                <div class=\"sectionP\">Each product is presented as a card containing a number of buttons, one of which is the <b>Manage Options</b> button <span class=\"ico-list\"></span>; by clicking on this button, a window will appear displaying all of the product options that have been created for the selected product (if any) as well as the option to create a new product option.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 36,
            'title' => 'Creating a new product option',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can create a new product option by clicking the <b>Create New Option</b> button in the <b>Manage Products</b> window. When you click on this button, a popup window with entry fields appears, which you need to fill in order to successfully create the new option.</div>
                <div class=\"sectionP\">The required fields are the option identifier and the names of the options in the different selected languages of your website. The option identifier is a unique identifier that the system uses to recognize each option within the same product. An option identifier has to be in small English letters, numbers, or dashes.  After filling in all the required fields, make sure to click on the <b>Create</b> button.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that an option identifier can be used only once for each product; however, the same option identifier can exist between more than one product. For example, the option identifier \"size\" can be used for different products.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 36,
            'title' => 'Product Option Card',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After successfully creating a new product option, it will appear as a card in the list of options created for the selected product. You can reorder the list of options by dragging and dropping the icon <span class=\"ico-move\"></span> found next to the option identifier on each product card. This order will be the same as the one used on your website.</div>
                <div class=\"sectionP\">Each option card contains two buttons, which are the  <b>Delete</b> <span class=\"ico-delete\"></span> and <b>Manage</b> <span class=\"ico-settings\"></span> buttons:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">The <b>Delete</b> button <span class=\"ico-delete\"></span> allows you to permanently delete the selected product option.</li>
                    <li style=\"margin-bottom:.5em;\">The  <b>Manage</b> <span class=\"ico-settings\"></span> option gives you the option to edit the selected product option and add selections to it. By clicking on this button, an area with the selected product option card appears. On the card, you can find an <b>Edit</b> button <span class='ico-edit'></span> that is used to edit the details of the selected option. In this area, you will be provided with the option to create selections for the product option or modify the existing selections (if any).</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 36,
            'title' => 'Creating a product option selection',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Selections are the different variants of the product options; for example, if you choose the option \"size\", you can set the selections as \"large\", \"medium\", and \"small\". </div>
                <div class=\"sectionP\">You can create a selection or more for the selected product option by clicking on the <b>Create New Selection</b> button. When you click on the button, a popup window with entry fields appears, which you must fill out in order to successfully create the new selection.</div>
                <div class=\"sectionP\">The required fields are the selection identifier, selection price, and the names of the selections in the different languages of your website. The selection identifier is a unique identifier that the system uses to recognize each selection within the same product option. A selection identifier has to be in small English letters, numbers, or dashes. The selection price is the cost of the selection, which is added to the original price of the product when a customer chooses it.</div>
                <div class=\"sectionP\">After filling in all the required fields, make sure to click on the <b>Create</b> button.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that a selection identifier can be used only once for each product option; however, the same selection identifier can exist between more than one product option.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 36,
            'title' => 'Managing a product option selection',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After successfully creating an option selection, it will appear as a card below the product option card. The order of the option selections displayed is the same as the one used on your website. To rearrange the selection order, use the <b>Drag and Drop</b> icon <span class='ico-move'></span> located next to the selection identifier.</div>
                <div class=\"sectionP\">On each selection card, you can find two buttons for managing the selection and a check box for making the selection the default one for the selected product option.</div>
                <div class=\"sectionP\">When you make a selection the default, it means that when a customer adds the currently selected product to their cart, this selection will be the one used for the product. This also means that the total price of the product will be the original product price plus the price of the default selection(s).</div>
                <div class=\"sectionP\">The other two buttons found on the selection card are the <b>Edit</b> and <b>Delete</b> buttons:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">When you click on the <b>Edit</b> button <span class=\"ico-edit\"></span>, a popup window will appear where you can change the price and the name of the selection.</li>
                    <li style=\"margin-bottom:.5em;\">By clicking on the <b>Delete</b> button <span class=\"ico-delete\"></span>, you'll be able to permanently delete the selection.</li>
                </ol>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can create or edit product options, and sub-accounts that have the authority to manage categories and products.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
