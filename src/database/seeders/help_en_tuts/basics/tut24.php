<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut24 extends Seeder
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
        $helpTut = help_en_tut::where('id',24)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',24)->delete();
        help_en_tut::where('id',24)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>24,
            'sort' => 8,
            'title_id' => 'Control-Panel-Tools',
            'title' => 'Control Panel Tools',
            'description' => 'This article will walk you through the common features of the control panel tools such as the Input List and the Switch Button in order to be able to utilize them in the best way possible.',
            'icon' => 'ico-basics',
            'helpCat' => 'basics',
            'keyWords' => 'cpanel',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 24,
            'title' => 'About the Control Panel Tools',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">On the Control Panel, we offer you a set of tools that are used to facilitate your navigation, these tools are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Input Lists</li>
                    <li style=\"margin-bottom:.5em;\">Switch Buttons</li>
                    <li style=\"margin-bottom:.5em;\">Date Picker</li>
                    <li style=\"margin-bottom:.5em;\">Number Picker</li>
                    <li style=\"margin-bottom:.5em;\">Time Picker</li>
                    <li style=\"margin-bottom:.5em;\">Report A Bug</li>
                </ol>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 24,
            'title' => 'Input Lists',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Input lists can be found throughout the control panel. They are input fields that contain a list of elements that you can select from. This list of elements will appear once you click inside the input list field. You can simply scroll up or down through the list using the mouse scroll. Click on any particular element to select it, or navigate through the elements using the up and down keyboard arrow keys.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/29.PNG\" class=\"sectionImg-40\"/>
                <div class=\"sectionP\">You can look up any element from the input list by typing the keywords that fully or partially match that element. This will cause all the irrelevant elements to disappear. You can hit the <b>'ESC'</b> button to bring back the full list of elements without erasing the keyword.</div>

            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 24,
            'title' => 'Switch Buttons',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can use the switch buttons to activate or deactivate a particular feature/tool as shown below.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/30.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 24,
            'title' => 'Date Picker',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This tool is used to pick a certain date. When you click on it, a calendar will appear to choose a date from. You can navigate through the years and months by clicking on the left or right arrows, then simply click on any day to choose it.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/31.PNG\" class=\"sectionImg-15\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 24,
            'title' => 'Number Picker',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This is a tool for selecting a number from the available range. To add or subtract from the number, simply click on the left or right arrows.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/32.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 24,
            'title' => 'Time Picker',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">This tool is used to set a particular time. In case of setting the time to the 24-hour clock format, two number pickers will appear, one for the hours and the other one for the minutes. In the case of the 12-hour clock format, an additional number picker will appear to select the period of the day whether it’s AM or PM. Learn more about setting the time format from this <a target=\"_blank\" href=\"https://www.food-menu.net/en/help/settings/9\" >article</a>.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/33.PNG\" class=\"sectionImg-15\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 7,
            'help_en_tut_id' => 24,
            'title' => 'Report A Bug',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">If you come across any bugs while using the control panel, you can simply click on the <b>Report A Bug</b> icon, which can be found on the bottom right, as shown below. A pop-up window will appear when you click on that icon. You can use the input box inside the pop-up to describe the bug, then click on the <b>Report</b> button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/34.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
