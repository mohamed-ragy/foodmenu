<?php

namespace Database\Seeders\help_en_tuts\users;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut45 extends Seeder
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
        $helpTut = help_en_tut::where('id',45)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',45)->delete();
        help_en_tut::where('id',45)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>45,
            'sort' => 5,
            'title_id' => 'How-a-user-manages-their-profile-on-your-website',
            'title' => 'How a user manages their profile on your website',
            'description' => 'We give your users an easy way to manage their profiles on your website by adding some profile management features. Learn more when you read this article.',
            'icon' => 'ico-user',
            'helpCat' => 'website-users',
            'keyWords' => 'users',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 45,
            'title' => 'Users Profile',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When running a business, you want to make it as convenient as possible for your users to navigate your website and find what they need. It should be easy for your users to find all their information and maintain their profiles. Hence, we include an entire section on your website where users can fully manage their profiles.</div>
                <div class=\"sectionP\">The managing profile section includes the following:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">My profile</li>
                    <li style=\"margin-bottom:.5em;\">Change My Email</li>
                    <li style=\"margin-bottom:.5em;\">Change My Password</li>
                    <li style=\"margin-bottom:.5em;\">Orders History</li>
                </ul>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 45,
            'title' => 'My Profile',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>My Profile</b> area, the user is provided with the personal information they have entered when signing up for an account on your website. They can edit all the information they have set up through this subsection, which is:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">Name</li>
                    <li style=\"margin-bottom:.5em;\">Phone Number</li>
                    <li style=\"margin-bottom:.5em;\">Address</li>
                    <li style=\"margin-bottom:.5em;\">Location</li>
                </ul>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">After a user modifies any of their details, they should click on the <b>Save</b> button to save the changes.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 45,
            'title' => 'Change My Email',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, the user can edit the email address they use to log in to their account.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 45,
            'title' => 'Change My Password',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Through this area, the user can set a new password for their registered account. </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If a registered user attempts to log in but has forgotten their password, they should click on the <b>forgot password</b> link. Then, they must enter the valid email address with which they are registered in order to receive an email containing a link to create a new password to recover their account.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 45,
            'title' => 'Orders History',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Through the order history, users will be able to see a list of all orders they have placed and their details, including the time it was placed, the order number, and the order status. Clicking on any of these orders will show all the details, including the order info receiving method, user delivery address and contact information, order receipt, and order items.</div>
                <div class=\"sectionP\">By clicking on the <b>Order Again</b> button, users can add the selected order items, with their (options), to their cart.</div>
                <div class=\"sectionP\">Users can also track any of their orders by entering the order number in the entry box provided; after entering the order number, they should click on the <b>Find My Order</b> button.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that the user has to be registered with the same account that was used to place the order to able to find and track their order.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
