<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut9 extends Seeder
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
        $helpTut = help_en_tut::where('id',9)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',9)->delete();
        help_en_tut::where('id',9)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>9,
            'sort' => 16,
            'title_id' => 'Time-Zone-and-Country',
            'title' => 'Time Zone and Country',
            'description' => 'Setting up the correct time zone and country settings is essential to ensure that your restaurant’s working hours and location are correctly configured.',
            'icon' => 'ico-earth',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'system.timeZone.country',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>9,
            'title' => 'The importance of setting the right time zone',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >A time zone is the standard time for a particular geographical area. When you select your time zone on the control panel, it should be the same as where your restaurant is located, as this will determine your restaurant's working hours for home delivery service, order pickup service, and dine-in service. The time zone you select also indicates the timing of the analytics and statistics we generate for your restaurant. Be aware that changing the time zone settings multiple times can affect the data analytics accuracy.</div>
                <div class=\"sectionP\" >To go to the <b>Time Zone</b> settings, click on <b>Settings</b> in the Control Panel Menu, then select <a href=\"https://cpanel.food-menu.net/?tab=System\" target=\"_blank\">System</a> to open a page with several windows, including the <b>Time Zone</b> window.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/29.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>9,
            'title' => 'How to set up your restaurant’s time zone?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >In the <b>Time Zone</b> window, you're provided with a time zone input list in which you can search for your restaurant's geographic region; the selected time zone will reflect on both your website and the control panel.</div>
                <div class=\"sectionP\" >You can select the preferred time format from the <b>Enable 12 Hours</b> switch button; when you switch on the button the system will follow the 12-hour format, and if you switch off the button the system will follow the 24-hour format.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">When you select a time zone and format, they get displayed in the <b>Time Zone</b> window to ensure that you have set the correct time.</div>
                </div>
                <div class=\"sectionP\" >After adjusting your restaurant's time zone and format, make sure to click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved time zone settings.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>9,
            'title' => 'Setting your restaurant’s country',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >In the same section where you set the time zone, you'll find a <b>Country</b> window beside the time zone window to set the country settings.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/30.PNG\" class=\"sectionImg-25\"/>
                <div class=\"sectionP\" >In the <b>Country</b> window, choose the country in which your restaurant is located, and the flag of that country will be displayed.</div>
                <div class=\"sectionP\" >After selecting the country, click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">It's important to note that only the main account can make changes to the <b>Time Zone and Country</b> settings, and sub-accounts that have the authority to Manage system and settings.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
