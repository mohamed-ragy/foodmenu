<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut1 extends Seeder
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
        $helpTut = help_en_tut::where('id',1)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',1)->delete();
        help_en_tut::where('id',1)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>1,
            'sort' => 2,
            'title_id' => 'Configuring-Your-Restaurants-Website-In-Different-Languages',
            'title' => 'Configuring Your Restaurant’s Website In Different Languages',
            'description' => 'To reach many customers of different languages, you need to know how to set up your multi-language website.',
            'icon' => 'ico-languages',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'customLang.websiteLangs.receipt',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' => 1,
            'title' => 'Why do you need to have a multi-language website?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Targetting your customers in their preferred language is very important, as it enables you to increase your website's traffic, grow your business, and make your content available in every possible language.</div>
                <div class=\"sectionP\">We provide you with an option to set more than one language for your website to reach as many customers as possible.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Your subscription plan will determine the number of languages available to you.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' => 1,
            'title' => 'Supported Languages',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can select which languages your customers prefer to use to easily browse your website, which is available in the following languages:</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/1.PNG\" class=\"sectionImg-30\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you'd like to use a language other than the ones we support, you can create your own custom language.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' => 1,
            'title' => 'Default Website Language',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The default language is the language that your website initially uses with customers that visit it for the first time and have not chosen one of the languages you set for them yet. It serves as the starting point until your customers change it.</div>
                <div class=\"sectionP\">When your customers choose a language, it will be saved in their browser cookies to be used every time they browse your website.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' => 1,
            'title' => 'Receipt Language',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">We offer you an option to choose one of the languages you have already set in the Control Panel to print your receipts and meet your customers' needs.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' => 1,
            'title' => 'How to set your website languages?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Control Panel Menu</b>, click on <b>Settings</b>, then select <a href=\"https://cpanel.food-menu.net/?tab=Language\" target=\"_blank\">Languages</a> to open a page with several windows, including the <b>Website Languages window</b>.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/3.PNG\" class=\"sectionImg-30\"/>
                <div class=\"sectionP\"><B>In this window, you will find three areas:</B></div>
                <div class=\"sectionP\">
                    <div class=\"sectionP\"><b>1- Select Website Languages</b></div>
                    <div class=\"sectionP\" style=\"margin-inline-start:1em;\" >In this area, you can add as many languages as you want, based on what you have set in your subscription plan.  By clicking on any language card, you can select or deselect a language.</div>
                </div>
                <div class=\"sectionP\">
                    <div class=\"sectionP\"><b>2- Set Default Website Language</b></div>
                    <div class=\"sectionP\" style=\"margin-inline-start:1em;\" >You can set this language by clicking on any default language card.</div>
                </div>
                <div class=\"sectionP\">
                    <div class=\"sectionP\"><b>3- Set Receipt Language</b></div>
                    <div class=\"sectionP\" style=\"margin-inline-start:1em;\" >You can choose this language by clicking on any receipt language card.</div>
                </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">After setting your website language Options, click on the <b>Save</b> button to apply the changes you have made or the <b>Cancel</b> button to restore the last saved settings.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
