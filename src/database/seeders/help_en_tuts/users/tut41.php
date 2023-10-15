<?php

namespace Database\Seeders\help_en_tuts\users;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut41 extends Seeder
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
        $helpTut = help_en_tut::where('id',41)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',41)->delete();
        help_en_tut::where('id',41)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>41,
            'sort' => 1,
            'title_id' => 'Creating-a-new-user',
            'title' => 'Creating a new user',
            'description' => 'In this article, we will show you how to create a new user on your website from the control panel.',
            'icon' => 'ico-create_new_user',
            'helpCat' => 'website-users',
            'keyWords' => 'users',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 41,
            'title' => 'Setting up a new user account',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Creating a new user account is easy and quick. Website visitors can register themselves as new users on your website with a few simple steps, or you can set up user accounts from your side using the control panel. You may need to do it from your end if you're assisting your customers in setting up their accounts or for any other purpose.</div>
                <div class=\"sectionP\">To locate the area where you can set up a new user account, go to the <b>Users</b> section of the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?tab=Create-New-User\" target=\"_blank\">Create New User</a>. A page will open with a window labeled <b>Create New User Account</b> which contains all the required fields you need to fill in for creating a new user.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 41,
            'title' => 'New User Required Details',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You will be able to edit this information later, but here are the items you will need to enter to create a new user.</div>
                    <ul>
                        <li style=\"margin-bottom:.5em;\"><b>Name</b>: Enter the user's name with at least 5 characters and a maximum of 20 characters.</li>
                        <li style=\"margin-bottom:.5em;\"><b>Email</b>: The customer's email address needs to be unique and has not been used before on your website.</li>
                        <li style=\"margin-bottom:.5em;\"><b>Password</b>: A password of at least 8 characters and no more than 20 characters.</li>
                        <li style=\"margin-bottom:.5em;\"><b>Phone number</b>: Entering a phone number is required to register a new user.</li>
                        <li style=\"margin-bottom:.5em;\"><b>Address</b>: Registration requires an address; this address will be used as the delivery default address; it can, however, be changed later.</li>
                        <li style=\"margin-bottom:.5em;\"><b>User Location</b>: To add a user's location to the map, zoom in on the map until you find the specific location you're looking for and drop a marker there. This will be the user's default location used for delivery orders. However, setting a user's location on the map is optional. If you want to reset this location or unset it altogether, click on the <b>Unset User Location</b> button.</li>
                    </ul>
                <div class=\"sectionP\">After filling in all the details, click on the <b>Create New User Account</b> button.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can create or edit a new user account, and sub-accounts that have the authority to manage users and delivery accounts.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
