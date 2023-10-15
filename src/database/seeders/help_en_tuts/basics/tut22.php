<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut22 extends Seeder
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
        $helpTut = help_en_tut::where('id',22)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',22)->delete();
        help_en_tut::where('id',22)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>22,
            'sort' => 11,
            'title_id' => 'The-Activity-Log',
            'title' => 'The Activity Log',
            'description' => 'The activity log allows you to view all activities taking place on your account and website. Check out this guide to learn how to use it.',
            'icon' => 'ico-activity_log',
            'helpCat' => 'basics',
            'keyWords' => 'cpanel.website',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 22,
            'title' => 'The Activity Log',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The activity log records all actions performed on your website or account as they occur, allowing you to keep track of all activities over a specific time period. It's a useful tool for your protection because you'll be able to see any data misuse by employees or ensure that your staff is adhering to their tasks.</div>
                <div class=\"sectionP\">Keeping track of and analyzing your website's users' activity can also provide you with insight into their search and purchasing patterns, allowing you to determine where you can improve your service(s).</div>
                <div class=\"sectionP\">To access your activity record, go to <b>Dashboard</b> in the control panel menu, which will open a few sub-sections, including the <a href=\"https://cpanel.food-menu.net/?tab=Activity-Log\" target=\"_blank\">Activity Log</a>.</div>
                <div class=\"sectionP\">After clicking on the <b>Activity Log</b>, you'll be provided with a window where you can find all the live activities carried out.</div>
                <div class=\"sectionP\">If you want to view the activities of a particular day, you can select the desired day from the date picker provided, then click on the <b>Find Activities</b> button.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/25.PNG\" class=\"sectionImg-35\"/>
                <div class=\"sectionP\">Each activity record gets displayed in a separate row, showing the date of that activity in the selected date and a <b>Remove</b> icon <span class=\"ico-close\"></span> that allows you to permanently delete the activity record.</div>
                <div class=\"sectionP\">When an activity is performed on the control panel, it will show which sub-account has carried out this activity.  This way, you can keep track of all actions on your account.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Only the main account can view and access the activity log.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
