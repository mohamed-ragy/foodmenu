<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut11 extends Seeder
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
        $helpTut = help_en_tut::where('id',11)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',11)->delete();
        help_en_tut::where('id',11)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>11,
            'sort' => 11,
            'title_id' => 'Your-restaurant-main-information',
            'title' => 'Your restaurant main information',
            'description' => 'This article will serve as a comprehensive guide on how to fill in all the necessary information about your restaurant.',
            'icon' => 'ico-restaurant_information',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'restaurant.receipt.websiteDesign',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>11,
            'title' => 'Managing your restaurant information',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >If you are new to Foodmenu and are setting up or updating your restaurant's information, this article will walk you through the process of setting up the necessary information and knowing where this info gets placed on your website.</div>
                <div class=\"sectionP\" >To go to the <b>Restaurant Information</b>, click on <b>Settings</b> in the Control Panel Menu, then select <a href=\"https://cpanel.food-menu.net/?tab=restaurant_information\" target=\"_blank\">Restaurant Information</a> to open the Restaurant Information page which includes several windows as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Logo and Icon</li>
                    <li style=\"margin-bottom:.5em;\">Restaurant Email</li>
                    <li style=\"margin-bottom:.5em;\">Restaurant Name</li>
                    <li style=\"margin-bottom:.5em;\">Currency Symbols</li>
                    <li style=\"margin-bottom:.5em;\">Restaurant Phone Numbers</li>
                    <li style=\"margin-bottom:.5em;\">Social Media Links</li>
                    <li style=\"margin-bottom:.5em;\">Restaurant Description</li>
                    <li style=\"margin-bottom:.5em;\">Restaurant Address</li>
                    <li style=\"margin-bottom:.5em;\">Website Announcement</li>
                    <li style=\"margin-bottom:.5em;\">Receipt Footer Message</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>11,
            'title' => 'Logo and Icon',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Your restaurant's logo is a form of your brand identity that distinguishes you from your competitors, hence why it is displayed in different places on your website and on your receipt. Your website icon, which is the favicon, should also reflect your restaurant's identity as it appears on browser taps when someone opens your website or when they bookmark one of your website pages. You can select the desired restaurant logo and website icon from their respective areas in the <b>Logo and Icon</b> window, and you can also change them at any time.</div>
                <div class=\"sectionP\">To add a <b>Website Icon</b>, tap on the website icon card, which will open an image browser window where you can upload or select an image for the icon. Remember to select an image that is square in size, such as 32x32 pixels, and no larger than 180x180 pixels.</div>
                <div class=\"sectionP\">To add a <b>Restaurant logo</b>, tap on the restaurant logo card, which will open an image browser window where you can upload or select an image for the logo. It is recommended for the image format to be WebP or PNG with a transparent background.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/33.PNG\" class=\"sectionImg-25\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">It is important to note that when using an image on your website, it shouldn’t be too small to avoid unclear images as it affects the website’s interface, or too large to affect the website’s loading time.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>11,
            'title' => 'Restaurant Email',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Your restaurant's email address is part of your contact information on your website; it appears in the “Contact Us” area and may also appear on other parts of your website depending on the website template you have chosen. It's important to include it, so your customers can reach and contact you. You can enter your email address in the input box provided.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>11,
            'title' => 'Restaurant Name',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Your restaurant's name appears on various parts of your website depending on the website theme you have chosen. You can enter the name of your restaurant in the languages you selected for your website in the input boxes provided, and the name will appear based on the browsing language of the website visitor. If you leave a restaurant name input box in a specific language blank, the restaurant identifier will be used instead for that language.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/35.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>11,
            'title' => 'Currency Symbols',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >You can enter the currency symbols that can be used for your restaurant in the provided input boxes, and the currency symbol will appear alongside the prices of the items. Each of the languages you chose for your website will have an input box, and the currency symbol displayed will be determined by the browsing language of the website's visitors.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/36.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' =>11,
            'title' => 'Restaurant Phone Numbers',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Your restaurant's phone numbers are included in the contact information that appears on different parts of your website, such as the <b>About Us</b> window, as well as on your receipts. To add a new phone number, click on the <b>Add a New Phone Number</b> button and enter the number in the input box provided. You can also add as many phone numbers as you like.</div>
                <div class=\"sectionP\" >If you want to remove any phone numbers you've previously added, click on the <span class=\"ico-delete\"></span> icon.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/34.PNG\" class=\"sectionImg-25\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>7,
            'help_en_tut_id' =>11,
            'title' => 'Social Media Links',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Including social media links on your website is essential not only for driving followers to your social media pages but also for providing your customers with a seamless experience where they can find you across multiple platforms. You can enter your social media links in the input boxes provided for the main social media platforms. Simply make sure that the links you enter start with <b>https://</b>. The social media links you add will appear in the form of social media icons in different parts of your website.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/41.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>8,
            'help_en_tut_id' =>11,
            'title' => 'Restaurant Description',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Your restaurant description should be a brief summary of your website content and offerings that presents your restaurant in a positive light as it's used as the meta description for all your website pages except the product page. Having a good meta description can increase the click-through rate on your website pages, which in turn can increase the ranking of your website on the Google results page. You can enter the restaurant description in the languages you selected for your website. Each language has an input box with a character limit of 150 characters.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/37.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>9,
            'help_en_tut_id' =>11,
            'title' => 'Restaurant Address',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >Your restaurant's address appears on various parts of your website and on the orders' receipts. You can enter the restaurant's address in the languages you have selected for your website in their respective input boxes, and the address reflected will depend on the website visitors' browsing language.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/38.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\" >You have the option to set your restaurant's location on the map by clicking on the <b>Restaurant Location</b> button, which will open a window where you can either select your location manually by zooming and panning around the map until you find your location, or by detecting your current location automatically by clicking on the <b>My Current Location</b> button. </div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/39.PNG\" class=\"sectionImg-50\"/>
                <div class=\"sectionP\" >Keep in mind that your internet connection and GPS satellites may affect the accuracy of your location so make sure that the location detected matches your restaurant location. In case you change your mind and don't want your restaurant's location to be set on the map, simply click on the <b>Unset Restaurant Location</b> button.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>10,
            'help_en_tut_id' =>11,
            'title' => 'Website Announcement',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Website announcements appear in the announcement bar, which is one of your website’s components. You can enter your website announcements in the languages you selected for your website. Each of the languages will have an input box, and the website announcement displayed will be based on the browsing language of your website's visitors.</div>
                <div class=\"sectionP\">You are also allowed to use the HTML &lt;a&gt; tag to hyperlink to a page in your announcement bar.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/40.PNG\" class=\"sectionImg-50\"/>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">The announcement bar disappears when there isn't any announcement to be displayed.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>11,
            'help_en_tut_id' =>11,
            'title' => 'Receipt Footer Message',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >We provide you with the option to add a message to the bottom of your printable order receipts, which can be a great way to get a message across to your customers. You can enter the message in the languages you selected for your website in their respective input boxes with a character limit of 250 characters for each. If you wish to not include a message in your receipts, you can leave the input boxes blank.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/settings/42.PNG\" class=\"sectionImg-50\"/>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>12,
            'help_en_tut_id' =>11,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >After adjusting any settings in the <b>Restaurant Information</b> windows, make sure to click on the <b>Save</b> button for each window to apply the changes to your website, or click on Cancel to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the <b>Restaurant Information</b>, and the sub-accounts that have the authority to Manage system and settings.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
