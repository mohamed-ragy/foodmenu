<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut25 extends Seeder
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
        $helpTut = help_en_tut::where('id',25)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',25)->delete();
        help_en_tut::where('id',25)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>25,
            'sort' => 1,
            'title_id' => 'Your-Restaurants-Website-Domain-Name',
            'title' => 'Your Restaurant’s Website Domain Name',
            'description' => 'Your website’s domain name is an essential part of your website. This article will show you how to set up your domain name and what your options are based on your subscription plan.',
            'icon' => 'ico-link',
            'helpCat' => 'basics',
            'keyWords' => 'website',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 25,
            'title' => 'What is a domain name',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A domain name is your website's unique address that appears in the URL bar, or the address that users type in to visit your website. It is usually made up of the name of your restaurant and an extension. When you subscribe to the premium plan, Foodmenu gives you the option of having your own domain name. On the other plans, you will have your website as a subdomain.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 25,
            'title' => 'Your Free Subdomain',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you sign up for a Foodmenu account, you will immediately get a subdomain for your restaurant's website that's a part of our <b>food-menu.net</b> domain name. Below are a couple of examples of how your website URL will look like:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">pizza.food-menu.net</li>
                    <li style=\"margin-bottom:.5em;\">burger.food-menu.net</li>
                    <li style=\"margin-bottom:.5em;\">seafood.food-menu.net</li>
                </ul>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 25,
            'title' => 'Get a full-fledged domain name',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can get a separate domain name for your restaurant's website when you subscribe to our premium plan. Below are a few examples of how your website URL will look when you get your own domain name:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">www.yourRestaurantName.com</li>
                    <li style=\"margin-bottom:.5em;\">www.yourRestaurantName.net</li>
                    <li style=\"margin-bottom:.5em;\">www.yourRestaurantName.io</li>
                    <li style=\"margin-bottom:.5em;\">www.yourRestaurantName.app</li>
                    <li style=\"margin-bottom:.5em;\">www.yourRestaurantName.shop</li>
                </ul>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 25,
            'title' => 'QR Code',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">We provide a QR code for your restaurant's website. Anyone can use this QR code to be redirected to your website homepage. You can download it as an image and use it however you like. You can find and download your website's QR code in the <b>Website Domain Name</b> window.</div>
                <div class=\"sectionP\">To go to the <b>Website Domain Name</b>, click on <b>Settings</b> in the Control Panel Menu, then select <a href=\"https://cpanel.food-menu.net/?tab=System\" target=\"_blank\">System</a> to open a page with several windows, including the <b>Website Domain Name</b>. In the <b>Website Domain Name</b> window, you're provided with your website's URL and its corresponding QR code.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/35.PNG\" class=\"sectionImg-25\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">When you print any of your customer’s orders receipt, your website URL and QR code will be included.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
