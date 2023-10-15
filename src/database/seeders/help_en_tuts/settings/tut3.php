<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut3 extends Seeder
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
        $helpTut = help_en_tut::where('id',3)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',3)->delete();
        help_en_tut::where('id',3)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>3,
            'sort' => 4,
            'title_id' => 'Edit-Your-Restaurants-Website-Texts',
            'title' => 'Edit Your Restaurant’s Website Texts',
            'description' => 'After reading this article, you will get to know how to modify your website’s texts for each language.',
            'icon' => 'ico-edit',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'customLang.langTexts',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' => 3,
            'title' => 'What are language texts?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">These are the texts that will be displayed to your website's visitors in their preferred language.</div>
                <div class=\"sectionP\">Language texts consist of two types, which are basic texts and information texts. Information texts usually give names and descriptions for everything related to your restaurant from its address to its products and categories. These texts are set from different places in the Control Panel based on the items they refer to.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/7.PNG\" class=\"sectionImg-30\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' => 3,
            'title' => 'Basic Texts',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can find basic texts, which are texts other than the ones used in information texts, everywhere on the website. A basic text can be used in more than one place on the website. To customize them easily, these texts are classified into five categories, which are:</div>
                <div class=\"sectionP\">- <b>Authentication</b> which focuses on everything related to your website's login, signup, email address, and password.</div>
                <div class=\"sectionP\">- <b>Orders</b> which focuses on everything related to visitors' orders, including types of orders, the order receipt, and the order number.</div>
                <div class=\"sectionP\">- <b>Reviews</b> whose texts highlight everything related to products' reviews and ratings.</div>
                <div class=\"sectionP\">- <b>Live Chat</b> whose texts are displayed on the live chat window on your website.</div>
                <div class=\"sectionP\">- <b>Others</b> which includes some sentences that do not belong to a certain category.</div>
                <div class=\"sectionP\">- <b>Receipt</b> contains all the text included in an order's receipt that is generated for customers.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' => 3,
            'title' => 'A website with customizable texts',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Every language we support has a default text. To help you meet your business needs and build your own website using different varieties, we provide you with a tool through which you can modify the default texts of each language.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">The custom language is set in English by default, but you can translate it to any other language you prefer.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' => 3,
            'title' => 'How to set language texts for your website?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Control Panel Menu</b>, click on <b>Settings</b>, then select <a href=\"https://cpanel.food-menu.net/?tab=Language\" target=\"_blank\">Languages</a> to open a page with several windows, including the <b>Language Texts</b> window.</div>
                <div class=\"sectionP\">In this window, you will find that each language is represented by a language card.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/8.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\">After pressing on any card, the <b>Edit Language Texts</b> window will appear for you to modify the language basic texts from their input box.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">You cannot modify information texts from the <b>Language Texts</b> window, as they are set from different places in the Control Panel based on the items they refer to.</div>
                </div>
                <div class=\"sectionP\">You can find the default text of the selected language in the placeholder of the text input box after erasing the written text.</div>
                <div class=\"sectionP\">In this window, there is also the <b>Find Text</b> input box, through which you can search for a certain text.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/9.PNG\" class=\"sectionImg-50\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">To apply all the changes to your website, click on the <b>Save</b> button. If you click on the <b>Cancel</b> button, you will be able to restore the last saved texts.</div>
                </div>

            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' => 3,
            'title' => 'Reset Default Language Texts',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">If you're not satisfied with the modification you have made and need to resume the default texts, you can click on the <b>Reset Default Texts</b> button and then on the <b>YES</b> button to confirm the action.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/10.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
