<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut5 extends Seeder
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
        $helpTut = help_en_tut::where('id',5)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',5)->delete();
        help_en_tut::where('id',5)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>5,
            'sort' => 13,
            'title_id' => 'Adjusting-The-Control-Panel-View',
            'title' => 'Adjusting The Control Panel View',
            'description' => 'The view settings is a useful tool for customizing your control panel view based on your preferences, so that you can feel comfortable while managing your account.',
            'icon' => 'ico-showPassword',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'cpanel',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' => 5,
            'title' => 'What is View Settings?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >To display the Control Panel in any way you prefer, the View Settings is a perfect tool for you to adjust how it looks.</div>
                <div class=\"sectionP\">To go to View Settings, click on <b>Settings</b> in the <b>Control Panel Menu</b>, then select <a href=\"https://cpanel.food-menu.net/?tab=Control-Panel-Settings\" target=\"_blank\">Control Panel Settings</a> to open a page with several windows, including <b>View Settings</b> window. In the <b>View Settings</b> window, you are provided with several options, which are as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Enable Big Side Menu</li>
                    <li style=\"margin-bottom:.5em;\">Show Status Bar</li>
                    <li style=\"margin-bottom:.5em;\">Show Hotkey Shortcuts</li>
                    <li style=\"margin-bottom:.5em;\">Enable Dark Mode</li>
                </ol>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/12.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' => 5,
            'title' => 'Side Menu',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >The Side Menu, found on the left side of the Control Panel, contains several buttons, each of which represents a section in the Control Panel.</div>
                <div class=\"sectionP\">If the width of your screen is less than 720 pixels, the Side Menu will disappear, and a button will be displayed with the navigation bar icons. If you click on that button a drop-down menu with every section of the Control Panel will appear.</div>
                <div class=\"sectionP\" >If you switch off the <b>Enable Big Side Menu</b> button, the Side Menu's width will be minimized to save space for the page's content. The contrary will happen if you switch off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/13.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\" >You can also switch on or off the <b>Enable Big Side Menu</b> button using the hotkey (ctrl+M).</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">You won't be able to switch on the Enable Big Side Menu button if the screen width is less than 1024 pixels.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' => 5,
            'title' => 'Status Bar',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >The status bar is a horizontal bar that appears at the bottom of the control panel that displays the message in any alert. Every message will continue to appear in the status bar until it is replaced by another.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/15.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\" >In <b>view settings</b> you can choose whether you want the status bar to be visible or not through the <b>Show Status Bar</b> button. If you switch on the button the bar will appear, and the contrary will happen if you switch off the button.</div>
                <div class=\"sectionP\" >You can also switch the <b>Show Status Bar</b> button on or off through the hotkey shortcut (ctrl+S).</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' => 5,
            'title' => 'Hotkey Shortcuts',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Hotkey shortcuts are key combinations on your computer's keyboard that you can use to perform control panel actions. Using hotkey shortcuts instead of the mouse can be a great time saver and a faster way to complete an action.</div>
                <div class=\"sectionP\" >Some control panel actions can be performed using the keyboard shortcuts; the shortcut for each action will appear as a small text beside actions on the control panel.</div>
                <div class=\"sectionP\" >However, the <b>Show Hotkey Shortcuts</b> button allows you to control the visibility of the shortcut text. The Shortcuts will appear if you switch on the <b>Show Hotkey Shortcuts</b> button. If you switch off the button, the contrary will happen.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/16.PNG\" class=\"sectionImg-25\"/>
                <div class=\"sectionP\" >This can be done more effortlessly by using the hotkey (ctrl+K) to switch the <b>Show Hotkey Shortcuts button</b> on and off. You can also have all the hotkey shortcuts appear in a pop-up window when you press <b>'F1'</b> on your keyboard.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Please keep in mind that you can still use the hotkey shortcuts even if you switch off the <b>Show Hotkey Shortcuts</b> button.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' => 5,
            'title' => 'Dark Mode',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >In the control panel, you also have the option to enable the dark mode. It can be a great way to help extend battery life, and some people find the dark mode to be more comfortable and help them focus more on their tasks.</div>
                <div class=\"sectionP\" >The <b>Enable Dark Mode</b> button controls the theme of your screen; if you switch on the button, the dark mode will be enabled, or you can disable it when you switch off the button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/17.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\" >You can also use the hotkey shortcut (ctrl+D) to switch the <b>Enable Dark Mode</b> button on and off.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' => 5,
            'title' => 'Saving view settings changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Once you switch on or off any button the changes apply immediately, but be aware to click on <b>save</b> after switching any button to avoid losing the changes if the control panel page got refreshed. You can also restore the last saved changes when you click on <b>cancel</b> in the <b>view settings</b> window.</div>
                <div class=\"tipContainer\">
                <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">It's important to note that any changes you make in the <b>View Settings</b> only affect your main account, or if you're working on a sub-account it only affects the account you're working on.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
