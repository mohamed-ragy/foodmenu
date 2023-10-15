<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut26 extends Seeder
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
        $helpTut = help_en_tut::where('id',26)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',26)->delete();
        help_en_tut::where('id',26)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>26,
            'sort' => 10,
            'title_id' => 'The-Guide-Tip-Area',
            'title' => 'The Guide Tip Area',
            'description' => 'Understanding the tools and features of the control panel is the key to utilizing them in the most efficient way. The guide tip area will assist you in understanding how to use all the tools.',
            'icon' => 'ico-link',
            'helpCat' => 'basics',
            'keyWords' => 'cpanel',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);


        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 26,
            'title' => 'What is the guide tip area?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The <b>Guide Tip Area</b> appears on the right pane of the control panel when the <b>Guide Mode</b> is activated. You can find helpful tips in the <b>Guide Tip Area</b> about the different features of the control panel. Check this <a target=\"_blank\" href=\"https://www.food-menu.net/en/help/settings/8\">article</a> for more info about the <b>Guide Mode</b>.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/36.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 26,
            'title' => 'Guide Tips',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\"><b>Guide Tips</b> are nuggets of information that appear in the <b>Guide Tip Area</b>. They provide essential tips about the different features and functions of the control panel. There are two <b>Guide Mode</b> functions that trigger the <b>Guide Tips</b>: <a target=\"_blank\" href=\"https://www.food-menu.net/en/help/settings/8#3\">Auto help</a> and <a target=\"_blank\" href=\"https://www.food-menu.net/en/help/settings/8#4\">Help Icons</a>.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/37.PNG\" class=\"sectionImg-25\"/>
                <div class=\"sectionP\">Each <b>Guide Tip</b> card has icons located on them that help you manage a guide tip easily. The icons are as follows:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\"><b>Minimize/Maximize</b>: This icon <span class=\"ico-minimize\"></span> minimizes the <b>Guide Tip</b>. Alternatively, You can maximize it by clicking on this icon <span class=\"ico-maximize\"></span>.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Close</b>: You can close a <b>Guide Tip</b> by clicking on this icon <span class=\"ico-close\"></span>. Closing a <b>Guide Tip</b> will unpin it if it was already pinned.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Full Screen</b>: This icon <span class=\"ico-fullScreen\"></span> opens the selected tip in a bigger window.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Pin/Unpin</b>: The Pin icon <span class=\"ico-pin\"></span> pins the <b>Guide Tip</b> so that it remains in the <b>Guide Tip Area</b> every time you log into your control panel account. You can click on the same icon <span class=\"ico-unbin\"></span> again to unpin the tip.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Helpful and Unhelpful</b>: These icons <span class=\"ico-thumbsUp\"></span> <span class=\"ico-thumbsDown\"></span> give you the option to assess a guide tip as helpful or unhelpful by clicking on the thumbs-up or thumbs-down icon. This helps us to constantly improve our services.</li>
                </ul>
                <div class=\"sectionP\">When you hover your mouse over an element in the control panel that has a guide tip, this guide tip will be highlighted. You can pin/unpin a highlighted Guide Tip using the keyboard shortcut (ctrl+B).</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Pinning/Unpinning a <b>Guide Tip</b> in a particular account will take place in that account only, whether it is the main account or a sub-account. This action won’t have any effect on the other accounts.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 26,
            'title' => 'Guide Tip Area Controls',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The <b>Guide Tip Area Controls</b> are located on the top right of the <b>Guide Tip Area</b>. There are four icons which are as follows:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\"><b>Minimize All</b>: You can minimize all the <b>Guide Tips</b> by clicking on this icon ( <span class=\"ico-minimize\"></span> ) or using this shortcut instead (alt+N).</li>
                    <li style=\"margin-bottom:.5em;\"><b>Maximize All</b>: You can maximize all the <b>Guide Tips</b> by clicking on this icon  ( <span class=\"ico-maximize\"></span> ) or using this shortcut instead (alt+M).</li>
                    <li style=\"margin-bottom:.5em;\"><b>Clear Unpinned Guide Tips</b>: You can clear all the unpinned <b>Guide Tips</b> by clicking on this icon ( <span class=\"ico-broom\"></span> ) or using this shortcut instead (alt+C).</li>
                    <li style=\"margin-bottom:.5em;\"><b>Clear All</b>: You can clear all the <b>Guide Tips</b> by clicking on this icon ( <span class=\"ico-delete\"></span> ) or using this shortcut instead (alt+X).</li>
                </ul>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/38.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
