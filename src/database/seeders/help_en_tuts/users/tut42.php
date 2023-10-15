<?php

namespace Database\Seeders\help_en_tuts\users;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut42 extends Seeder
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
        $helpTut = help_en_tut::where('id',42)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',42)->delete();
        help_en_tut::where('id',42)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>42,
            'sort' => 2,
            'title_id' => 'Managing-your-website-users',
            'title' => 'Managing your website users',
            'description' => 'Managing your registered users is an important part of running a website. In this article, you will know how to find and manage your users.',
            'icon' => 'ico-manage_users',
            'helpCat' => 'website-users',
            'keyWords' => 'users',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 42,
            'title' => 'Managing Users',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">All users who register on your website are saved to your database and organized into a user list, so you can easily find and manage them. The <b>Managing users</b> feature allows you to manage all the users in different aspects, whether by keeping track of their activities, editing their user information, or chatting with them.</div>
                <div class=\"sectionP\">To locate the area where you can manage your users, go to the <b>Users</b> section of the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?tab=Manage-Users\" target=\"_blank\">Manage Users</a>.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 42,
            'title' => 'User List',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">From the <b>User List</b>, you can find any registered user by typing in their name or phone number. The input list results will be filtered to match the information you have typed and will display the matching user(s). By clicking on any user, an area will be displayed labeled with the user's name, displaying the user’s current status, icons for the user's main activities, and all the user's information.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 42,
            'title' => 'User Status',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you manage a user, you will first see the user's current status, whether online or offline. If the user is online, it'll show the type of activity the user is engaged in. If the user is offline, it will show when they were last active on your website.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 42,
            'title' => 'Activity Icons',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The links to the user's most important activities are presented as icons, which are:</div>
                    <ul>
                        <li style=\"margin-bottom:.5em;\"><b>Chat</b> <span class=\"ico-chat\"></span>: This icon enables you to view your chat history with the user selected and chat with them; when you click on it, a chat window popup will appear in the right corner of your screen.</li>
                        <li style=\"margin-bottom:.5em;\"><b>Orders</b> <span class=\"ico-orders\"></span>: This icon takes you to a page where you can find all the past orders of the selected user.</li>
                        <li style=\"margin-bottom:.5em;\"><b>Reviews</b> <span class=\"ico-star\"></span>: This icon takes you to a page where you can see all the reviews posted by the selected user.</li>
                        <li style=\"margin-bottom:.5em;\"><b>Ban User</b> <span class=\"ico-no\"></span>: This icon allows you to ban the selected user from your website. When a user is banned, they can no longer access your website using their registered credentials. It does not, however, delete their data from your database because it is used in the statistics and analytics that we generate. When you ban a user, the <b>Ban User</b> option is replaced with a <b>Remove Ban</b> option, which allows you to undo the ban.</li>
                    </ul>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 42,
            'title' => 'User Information',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, the user's primary registration information is displayed, which is the name, email, password, phone number, address, and location. You have the option to edit any of these details upon the user's request or for any particular reason. </div>
                <div class=\"sectionP\">In this area, you can find the user's primary registration information, which is the name, email address, password, phone number, address, and location. You have the option to edit any of these data upon the user's request or for any other reason. These data can be modified in their fields, which can be found in the input boxes.</div>
                <div class=\"sectionP\">After making any changes, click on the <b>Save</b> button or click on the <b>Cancel</b> button to restore the last saved settings.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that the user's registered password doesn't appear for confidentiality; however, if you wish to change it at the request of the user, enter the password in its provided input box. To keep it unchanged, leave the input box blank.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
