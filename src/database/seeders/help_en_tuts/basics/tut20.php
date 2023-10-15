<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut20 extends Seeder
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
        $helpTut = help_en_tut::where('id',20)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        $http = env('APP_URL_HTTP');
        $url = env('APP_URL');
        help_en_text::where('help_en_tut_id',20)->delete();
        help_en_tut::where('id',20)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>20,
            'sort' => 7,
            'title_id' => 'Control-Panel-Home',
            'title' => 'Control Panel Home',
            'description' => 'The homepage of the control panel will assist you in monitoring different aspects of your restaurant’s performance from a single place.',
            'icon' => 'ico-home',
            'helpCat' => 'basics',
            'keyWords' => 'cpanel',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 20,
            'title' => 'The Homepage',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Your account's homepage displays insights into your website and account activities in different sections, giving you a quick overview of your restaurant.</div>
                <div class=\"sectionP\">To go your homepage, go to <b>Dashboard</b> in the control panel menu, then click on <a href=\"{$http}://cpanel.{$url}/?tab=Home\" target=\"_blank\">Home</a>.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 20,
            'title' => 'Control panel home windows',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you open your homepage, you'll see several windows, including: </div>
                <div class=\"sectionP\">A tip window where we give you valuable tips for your business and how to use the control panel to make it easier to navigate.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/13.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\">A window where you can have an overview of the status and volume of your incomplete orders.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/14.PNG\" class=\"sectionImg-50\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">This window only appears to the main account and sub-accounts that have the authority to manage orders.</div>
                </div>
                <div class=\"sectionP\">A <b>Share Me</b> window in which random products from your website are displayed on a card with buttons to share them on a social media channel in the language of your choice. The products displayed change every one minute. <a href=\"{$http}://www.{$url}/en/help/basics/21\" target=\"_blank\">Sharing your products</a> on your social media pages can increase traffic to your website and help people discover your products.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/15.PNG\" class=\"sectionImg-25\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">This window only appears to the main account and sub-accounts that have the authority to manage categories and products.</div>
                </div>
                <div class=\"sectionP\">The <b>What Is Happening Now</b> window displays the <a href=\"{$http}://www.{$url}/en/help/basics/22\" target=\"_blank\">activity log</a> of both your website and control panel account(s) so you can remain current with all activities taking place.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/16.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">The <b>What Is Happening Now</b> window is only visible to the main account.</div>
                </div>
                <div class=\"sectionP\">The <b>Plan Usage</b> window displays how much you have used up from the plan to which you are subscribed, in order to remain aware of how much storage space you have remaining.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/17.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">The <b>Plan Usage</b> window only appears to the main account.</div>
                </div>
                <div class=\"sectionP\">The <b>Service Status</b> window displays the active status of the services and website as online or offline. You can also see who is currently browsing your website in the <b>Current Website Visitors</b>, where your visitors are classified into <b>Users</b> or <b>Guests</b>.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/18.PNG\" class=\"sectionImg-35\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that the <b>Current Website Visitors</b> area only appears to the main account and sub-accounts that have the authority to manage users and delivery accounts.</div>
                </div>
                <div class=\"sectionP\">The <b>Today's Live Income</b> window will give you a quick overview of your restaurant's orders and the income you have generated from them.</div>
                <div class=\"sectionP\">The three circle graphs provided show details of all orders completed today; the first circle graph shows how many orders were successful or canceled today; the second circle graph demonstrates how much each service accounts for in today's orders. The third circle graph demonstrates how much income is generated from each service.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/19.PNG\" class=\"sectionImg-40\"/>
                <div class=\"sectionP\">When you hover above any segment of a circle graph, details will show regarding the order or income segment making up this part.</div>
                <div class=\"sectionP\">The graph shown below illustrates the time and value of orders placed today. The line on the time axis of the graph is divided into the hours of the day. When you hover above any hour, details will show regarding income made in that time.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/20.PNG\" class=\"sectionImg-50\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that the <b>Today's Live Income</b> window is only visible to the main account.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
