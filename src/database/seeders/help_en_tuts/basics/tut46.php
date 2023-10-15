<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut46 extends Seeder
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
        $helpTut = help_en_tut::where('id',46)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',46)->delete();
        help_en_tut::where('id',46)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>46,
            'sort' => 5,
            'title_id' => 'Delivery-Accounts',
            'title' => 'Delivery Accounts',
            'description' => 'The Delivery Accounts service is a valuable restaurant management tool that allows you to fully manage your orders’ delivery digitally and from a single place.',
            'icon' => 'ico-delivery_accounts',
            'helpCat' => 'basics',
            'keyWords' => 'delivery',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>46,
            'title' => 'What are delivery accounts?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">If you own a restaurant, there is a good chance that you have many delivery orders daily, which can increase the number of order mistakes or delays due to a lack of organization. This can have an impact on customer satisfaction, especially if they have to wait for their order for a long period of time. With this in mind, we've developed a service that will help you organize your deliveries: <b>Delivery Accounts</b>.</div>
                <div class=\"sectionP\">Delivery accounts are accounts that we specifically designate for your restaurant's delivery personnel. The idea behind it is that you will be able to assign each delivery person a number of specified orders on their accounts. They will receive the delivery information on their account, making them responsible for the orders' delivery. You will then be able to keep track of all of your deliveries and avoid delivery issues.</div>
                <div class=\"sectionP\">To create a delivery account, go to the <b>Users</b> section of the control panel menu, then click on <a href=\"https://cpanel.food-menu.net/?tab=Delivery-Accounts\" target=\"_blank\">Delivery Accounts</a>. A page will open, showing an area labeled <b>Create Delivery Account</b>, and a list of delivery accounts if you already have some created.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>46,
            'title' => 'How are delivery accounts created?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Create Delivery Accounts</b> area, you can create an account by entering the account login credentials in the provided input boxes, which will be used by delivery personnel to log into their accounts.</div>
                <div class=\"sectionP\">You can enter the delivery person's name in the <b>Delivery Name</b> input box, which must be in letters and numbers only. The delivery account login name will be the delivery name you entered, followed by @ the identifier of your restaurant. For example, if you enter the name ray as the delivery name, the delivery log-in name will be <b>ray@restaurantidentifier</b>.</div>
                <div class=\"sectionP\">In the <b>Password</b> input box, you can set the account password that the delivery person will use to log in.</div>
                <div class=\"sectionP\">After filling in the new account’s log-in details, click on the <b>Create New Delivery Account</b> button.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>46,
            'title' => 'Managing Delivery Accounts',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">On the <b>Delivery Accounts</b> page, you can find a list of all delivery accounts created in the form of cards and two main buttons on each card, which are the <b>Edit</b> and the <b>Delete</b> buttons.</div>
                <div class=\"sectionP\">When you click on the <b>Edit</b> button, a popup appears showing input boxes where you can modify the selected delivery account’s log-in name and password. </div>
                <div class=\"sectionP\">After modifying the delivery name, make sure to click on the <b>Save</b> button, or click on the <b>Cancel</b> button to restore the last saved name. After making changes to the password, click on the <b>Change Password</b> button.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>46,
            'title' => 'How to assign delivery orders',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">From the control panel's <a href=\"https://cpanel.food-menu.net/?tab=Received-Orders\" target=\"_blank\">Accepted Orders</a> page, you can (assign orders) to delivery personnel. When an order's delivery method is home delivery, it will include the option <b>Give to deliver person</b>. By clicking on this option, you will be able to select which delivery person you want to assign the order to.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>46,
            'title' => 'How can the delivery personnel access their accounts?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To go to the web page made specifically for delivery accounts, go to <a href=\"https://delivery.food-menu.net\" target=\"_blank\">https://delivery.food-menu.net</a>. After logging in successfully, the delivery person can find all delivery orders assigned to them. </div>
                <div class=\"sectionP\">Each order displays the order number as well as the customer's information, which includes their name, phone number, address, and payment method. If a customer has entered a location on the map in addition to their address, it will also appear.</div>
                <div class=\"sectionP\">After the delivery person completes an order delivery successfully, they should mark the order as delivered in their account by clicking on the <b>Delivered</b> button. When an order is marked as delivered, you will receive a notification and an <a href=\"https://www.food-menu.net/en/help/settings/7#3\" target=\"_blank\">alert</a> with this update.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can create or edit a delivery account, and sub-accounts that have the authority to manage users and delivery accounts.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
