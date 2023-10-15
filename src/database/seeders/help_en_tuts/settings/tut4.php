<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut4 extends Seeder
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
        $helpTut = help_en_tut::where('id',4)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',4)->delete();
        help_en_tut::where('id',4)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>4,
            'sort' => 12,
            'title_id' => 'Modifying-Your-Control-Panel-Language',
            'title' => 'Modifying Your Control Panel Language',
            'description' => 'In this article, you will learn how to change the Control Panel language',
            'icon' => 'ico-languages',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'cpanel',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' => 4,
            'title' => 'Control Panel Language',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >To help you use the Control Panel easily, we provide you with an option to change the language of the Control Panel to any of your preferred languages.</div>
                <div class=\"sectionP\">We offer you the Control Panel Language in both Arabic and English. But we are planning to add more languages in the future. So we will notify you of any updates.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' => 4,
            'title' => 'How should you set Control Panel Languages?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Control Panel Menu</b>, click on <b>Settings</b>, then select <a href=\"https://cpanel.food-menu.net/?tab=Language\" target=\"_blank\">Languages</a> to open a page with several windows. You need to scroll down the page to find the <b>Control Panel Language</b> window.</div>
                <div class=\"sectionP\">You can set the Control Panel language by clicking on the Control Panel language card.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/11.PNG\" class=\"sectionImg-50\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Once you click on any language card, the changes will be saved automatically and the Control Panel will reload with the language you picked.</div>
                </div>

            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
