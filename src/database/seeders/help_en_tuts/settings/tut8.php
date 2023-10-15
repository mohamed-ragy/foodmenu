<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut8 extends Seeder
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
        $helpTut = help_en_tut::where('id',8)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',8)->delete();
        help_en_tut::where('id',8)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>8,
            'sort' => 1,
            'title_id' => 'The-Guide-Mode',
            'title' => 'The Guide Mode',
            'description' => 'New to the control panel? The Guide Mode will assist you in learning how to use the control panel’s different features with ease.',
            'icon' => 'ico-lamp',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'cpanel.guidemode',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>8,
            'title' => 'What is the Guide Mode?',
            'html' => <<<string
                <p>
                    If you are new to the Control Panel, the <b>Guide Mode</b> provides the ultimate guidance for you on how to use all the Control Panel features, so you can benefit the most from the tools provided. Once you become fully aware of how to use the Control Panel, you can disable the <b>Guide Mode</b> if that is what you will find most convenient.
                </p>
                <p>
                    To go to <b>Guide Mode Settings</b>, click on <b>Settings</b> in the Control Panel Menu, then select <a href="https://cpanel.food-menu.net/?tab=Control-Panel-Settings" target="_blank">Control Panel Settings<span class="ico-open newTabLink"></span></a> to open a page with several windows, including the <b>Guide Mode Settings</b>. In the <b>Guide Mode Settings</b> window you're provided with several options, which are as follows:
                </p>
                <ol>
                    <li>Enable Guide Mode</li>
                    <li>Enable Auto Help</li>
                    <li>Show Help Icons</li>
                    <li>Enable Guide Alerts</li>
                </ol>
            string,
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>8,
            'title' => 'How to enable the Guide Mode?',
            'html' => <<<string
                <p>
                    To enable the Guide Mode, switch on the <b>Enable Guide Mode</b> button; to disable it, switch off the button. You can also switch the Guide Mode button on or off by using the hotkey shortcut (ctrl+G). Bear in mind that the Guide Mode will be enabled by default to assist you while first navigating the control panel. If your screen width is less than 1360 pixels, the Guide Mode will be disabled automatically.
                </p>
                <p>
                    When you enable the Guide Mode, a <b>Guide Tip Area</b> will appear on the right side of the screen, displaying several tips and instructions.
                </p>
                <p>
                    There are three main tools in the Guide Mode:
                </p>
                <ol>
                    <li>Auto Help</li>
                    <li>Help Icons</li>
                    <li>Guide Alerts</li>
                </ol>
            string,
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>8,
            'title' => 'Auto Help',
            'html' => <<<string
                <p>
                    The <b>Auto Help</b> is a function in the control panel that displays tips or instructions in the <b>Guide Tip Area</b> when you hover above any object that holds a guide tip. To enable the <b>Auto Help</b> function, switch on the <b>Enable Auto Help</b> button, or you can disable it by switching off the button. You can also switch the button on or off by using the hotkey shortcut (ctrl+H).
                </p>
                <p>
                    You can temporarily disable the <b>Auto Help</b> by holding down the <b>'S'</b> key on your keyboard. This can be advantageous when you want to remain on a specific guide tip and not have other guide tips appear as you move your mouse across the page and hover above other objects randomly.
                </p>
                <div class="tipContainer tipContainer_orange">
                    <span class="ico-lamp"></span>
                    <span>Take into consideration that if you have the <b>Guide Mode</b> disabled, you won’t be able to enable the <b>Auto Help</b>.</span>
                </div>
            string,
        ]);

        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>8,
            'title' => 'Help Icons',
            'html' => <<<string
                <p>
                    <b>Help Icons</b> are the question marks at the top of each window in the control panel that provide a brief description and function of the window. When you tap on the help icon, a summary of a specific window appears in the guide tip area.
                </p>
                <p>
                    To enable the <b>Help Icons</b> to show, switch on the <b>Show Help Icons</b> button, or if you prefer to not have the help icons visible, you can switch off the button. You can also use the hotkey shortcut (ctrl+I) to switch the button on and off.
                </p>
                <div class="tipContainer tipContainer_orange">
                    <span class="ico-lamp"></span>
                    <span>Note that if you have the <b>Guide Mode</b> disabled, you won't be able to enable the <b>Help Icons</b> to show.</span>
                </div>
            string,
        ]);

        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>8,
            'title' => 'Guide Alerts',
            'html' => <<<string
                <p>
                    The <b>Guide Alerts</b> are alerts that warn you of any missing information or actions required to complete the next steps on your account or website. They assist you in filling out all the necessary data to ensure that you are current with everything. If you have the <b>Guide Alerts</b> enabled, a Guide Alert icon appears in the navigation bar at the top right of your screen. When you tap on the <b>Guide Alerts</b> icon, a drop-down menu with the alerts will appear.
                </p>
                <p>
                    To enable the Guide Alerts, switch on the <b>Enable Guide Alerts</b> button, or you can switch off the button to disable the Guide Alerts. You can also switch the button on or off by using the hotkey shortcut (ctrl+A).
                </p>
                <div class="tipContainer tipContainer_orange">
                    <span class="ico-lamp"></span>
                    <span>Note that having the <b>Guide Mode</b> disabled doesn’t switch off the <b>Guide Alerts</b>. The <b>Guide Alerts</b> have to be disabled separately.</span>
                </div>
            string,
        ]);

        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' =>8,
            'title' => 'Saving guide mode changes',
            'html' => <<<string
                <p>
                    When you enable or disable any button in the <b>Guide Mode</b>, the changes apply immediately.
                </p>
                <p>
                    However, after switching any button, make sure to click on <b>save</b> to avoid losing the changes if the control panel page gets refreshed. You can also restore the last saved changes when you click on <b>cancel</b> in the <b>Guide Mode</b> window.
                </p>
                <div class="tipContainer tipContainer_green">
                    <span class="ico-lamp"></span>
                    <span>It's important to note that any changes you make in the <b>Guide Mode</b> only affect your main account, or if you're working on a sub-account it only affects the account you're working on.</span>
                </div>
            string,
        ]);
        help_en_text::insert($tutsTexts);

    }
}
