<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut2 extends Seeder
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
        $helpTut = help_en_tut::where('id',2)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',2)->delete();
        help_en_tut::where('id',2)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>2,
            'sort' => 3,
            'title_id' => 'Creating-a-Custom-Language-For-Your-Restaurants-Website',
            'title' => 'Creating A Custom Language For Your Restaurant’s Website',
            'description' => 'Here is your guide to creating a custom language for your website in case you want to add a language other than the ones we support.',
            'icon' => 'ico-websiteTexts',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'customLang.langTexts',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' => 2,
            'title' => 'What is a custom language?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">If want to create your website in any language other than the languages we support to target a specific audience, then the custom language option is a perfect feature for you!</div>
                <div class=\"sectionP\">On the website, the custom language's text is set in English by default, but you can modify it whenever you want.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' => 2,
            'title' => 'Custom language options',
            'html' => "<div class=\"SectionContainer\">

                <div class=\"sectionP\">Here are some details about the custom language you need to know about:</div>
                <div class=\"sectionP\">
                    <div class=\"sectionP\"><b>- Language Name</b></div>
                    <div class=\"sectionP\" style=\"margin-inline-start:1em;\" >This option will enable you to set a name for a custom language that will appear to your customers, as they should choose their preferred language from the list you offer to them on your website.</div>
                </div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/5.PNG\" class=\"sectionImg-20\"/>
                <div class=\"sectionP\">
                    <div class=\"sectionP\"><b>- Language Code</b></div>
                    <div class=\"sectionP\" style=\"margin-inline-start:1em;\" >A language code is a code that is composed of two English letters that will be used as identifiers for the custom language in the URL of your website page.</div>
                </div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/4.PNG\" class=\"sectionImg-25\"/>
                <div class=\"sectionP\">
                    <div class=\"sectionP\"><b>- Language Flag</b></div>
                    <div class=\"sectionP\" style=\"margin-inline-start:1em;\" >A flag should be added to represent its custom language.</div>
                </div>
                <div class=\"sectionP\">
                    <div class=\"sectionP\"><b>- Text Direction</b></div>
                    <div class=\"sectionP\" style=\"margin-inline-start:1em;\" >Most of the languages are written from left to right, while some others are written from right to left such as Arabic and Persian. So, you need to set the direction of the custom language to perfectly suit your website's design.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' => 2,
            'title' => 'How to set a custom language for your website?',
            'html' => "<div class=\"SectionContainer\">

                <div class=\"sectionP\">In the <b>Control Panel Menu</b>, click on <b>Settings</b>, then select <a href=\"https://cpanel.food-menu.net/?tab=Language\" target=\"_blank\">Languages</a> to open a page with several windows, including the <b>Custom Language Options</b> window.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/6.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\">From this window, you can write your custom language name in any language you would prefer from the <b>Language Name</b> Input Box.</div>
                <div class=\"sectionP\">To add a language code, go to the <b>Language Code</b> Input Box.</div>
                <div class=\"sectionP\">Then, from the Language Flag Input List, choose the country whose flag represents your custom language.</div>
                <div class=\"sectionP\">From the <b>Text direction right to left</b> switch button, you can switch on this button if your custom language is written from right to left. If it is the contrary, keep the button switched off.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">After setting your custom languages, click on the <b>Save</b> button to apply the changes you have made or the <b>Cancel</b> button to restore the last saved settings.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
