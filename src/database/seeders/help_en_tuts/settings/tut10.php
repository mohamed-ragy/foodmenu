<?php

namespace Database\Seeders\help_en_tuts\settings;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut10 extends Seeder
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
        $helpTut = help_en_tut::where('id',10)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',10)->delete();
        help_en_tut::where('id',10)->delete();
        $tutsTexts = [];

        help_en_tut::create([
            'id'=>10,
            'sort' => 10,
            'title_id' => 'Adjusting-the-System-Settings',
            'title' => 'Adjusting the System Settings',
            'description' => 'With the help of System Settings, you can freely modify some of your website’s crucial settings to what suits your restaurant’s operations.',
            'icon' => 'ico-settings',
            'helpCat' => 'system-and-settings',
            'keyWords' => 'system.homeDelivery.orderPickup.reviews.orders.liveChat.cart.receipt',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>10,
            'title' => 'What are system settings?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >The <b>System Settings</b> section allows you to adjust many of your website's system settings to meet your specific requirements.</div>
                <div class=\"sectionP\" >To go to the <b>System Settings</b>, click on <b>Settings</b> in the Control Panel Menu, then select <a href=\"https://cpanel.food-menu.net/?tab=System\" target=\"_blank\">System</a> to open a page that contains a number of windows including the <b>System Settings</b>. The system settings section is divided into a few sub-sections. In this article, we'll go through each sub-section, which are as follows:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\">Ordering System Settings</li>
                    <li style=\"margin-bottom:.5em;\">Review System Settings</li>
                    <li style=\"margin-bottom:.5em;\">Live chat system settings</li>
                    <li style=\"margin-bottom:.5em;\">Other System Settings</li>
                </ol>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>10,
            'title' => 'Ordering System Settings',
            'html' => "<div class=\"SectionContainer\">
                    <div class=\"sectionP\" style=\"margin-top:30px;\">
                        <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Enable Home Delivery</div>
                        <div class=\"sectionP\">Your website visitors will be able to place delivery orders on your website when you switch on the <b>Enable Home Delivery</b> button. If you switch off the button, they won't be given the option to place delivery orders.</div>
                    </div>
                    <div class=\"sectionP\" style=\"margin-top:30px;\">
                        <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Enable Order Pickup</div>
                        <div class=\"sectionP\">Your website visitors will be able to place pickup order on your website when you switch on the <b>Enable Order Pickup</b> button. If you switch off the button, they will not be able to place pickup orders.</div>
                    </div>
                    <div class=\"tipContainer\">
                        <div class=\"ico-lamp tutTipIcon\"></div>
                        <div class=\"tutTipText\">When a website visitor tries to place an order while both the home delivery and order pickup services are disabled, they will be informed that online ordering is not available at that time.</div>
                    </div>
                    <div class=\"sectionP\" style=\"margin-top:30px;\">
                        <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Accept Guest Orders</div>
                        <div class=\"sectionP\">You can switch on the <b>Accept Guest Orders</b> button if you want visitors who aren't signed in to your website to place orders. You can disable this option by switching off the button.</div>
                    </div>
                    <div class=\"sectionP\" style=\"margin-top:30px;\">
                        <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Accept delivery orders outside working hours</div>
                        <div class=\"sectionP\">When setting up your home delivery settings, you adjust your working hours to show your availability to your website visitors. When you switch on the <b>Accept delivery orders outside working hours</b> button, website visitors will be given the option to place delivery orders even when your service is out of working hours. They will also be notified when your home delivery service is available again.</div>
                        <div class=\"sectionP\">Or you can switch off this button to prevent your website visitors from placing orders when your delivery service is out of working hours. They will, however, get notified of your home delivery service's next available time to place an order.</div>
                    </div>
                    <div class=\"sectionP\" style=\"margin-top:30px;\">
                        <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Accept pickup orders outside working hours</div>
                        <div class=\"sectionP\">When setting up your pickup orders settings, you adjust the working hours to show your service's availability to your website visitors. When you switch on the <b>Accept pickup orders outside working hours</b> button, website visitors will be given the option to place pickup orders even when your restaurant is out of working hours. They will also be notified of the next time your pickup orders will be available.</div>
                        <div class=\"sectionP\">Or you can switch off this button to prevent your website visitors from placing orders when your pickup orders service is out of working hours. They will still get notified of your service's next availability time to place an order.</div>
                    </div>
                    <div class=\"sectionP\" style=\"margin-top:30px;\">
                        <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Allow cancelation of pending orders</div>
                        <div class=\"sectionP\">When you switch on the <b>Allow cancelation of pending orders</b> button, you give the option to your customers to cancel an order if it is still pending. Or you can disallow them to cancel a pending order by switching off this button.</div>
                    </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>10,
            'title' => 'Review System Settings',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Enable product ratings and reviews</div>
                    <div class=\"sectionP\">When you switch on the <b>Enable product ratings and reviews</b> button, your products' reviews and ratings will appear in different places on your website. If you wish to not have any ratings and reviews appear, you can switch off the button. Keep in mind that when you switch off this button, your website visitors won’t also have the option to rate and review your products.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Accept Guest Reviews</div>
                    <div class=\"sectionP\">When you switch on the <b>Accept Guest Reviews</b> button, visitors who are not signed in to your website will have the option to rate and leave a review on any of your products. If you don't want to have this option enabled, you can switch off the button, and only website visitors who are signed in will be able to rate and review your products.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Display post-purchase surveys for users</div>
                    <div class=\"sectionP\">This option is a useful tool for gathering feedback from your customers and showing them that their opinions matter. It also provides you with an insight into the level of customer satisfaction in order to help you improve it.</div>
                    <div class=\"sectionP\">When you switch on the <b>Display post-purchase surveys for users</b> button, a popup will appear to users after every order is completed successfully, asking them to rate and review their last ordered items. Or, if you wish to have this tool disabled, you can switch off the button.</div>
                </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that the popup appears only once per every successful order.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>10,
            'title' => 'Live chat system settings',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Enable Live Chat</div>
                    <div class=\"sectionP\">The Live Chat tool is an effective way to communicate with your customers and quickly respond to their queries. We provide you with the option to enable Live Chat by switching on the <b>Enable Live Chat</b> button, which will display the live chat icon in the bottom right corner of your screen. Or you can switch off the button to disable the live chat option.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Enable Guest Live Chat</div>
                    <div class=\"sectionP\">When you switch on the <b>Enable Guest Live Chat</b> button, any visitor to your website, whether logged in to your website or not, can use the live chat function and chat with you. If you switch off the button, only website users who are logged in to your website will be able to chat with you.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>10,
            'title' => 'Other system settings',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Website quick load mode</div>
                    <div class=\"sectionP\">The amount of time it takes for a website page to fully load and open for a website user is referred to as page load time. A number of factors affect a page's load time, including the website user’s internet speed and the page's content, especially if it contains media. A website page may take longer to load if the page content contains large images or files.</div>
                    <div class=\"sectionP\">When you switch on the <b>Website quick load mode</b> button, you enable your pages to open for your website visitors without displaying the loading screen; the page’s content will load as the website visitor navigates the site. Enabling this feature is not recommended because it may have a negative impact on your user experience.</div>
                    <div class=\"sectionP\">However, this button is switched off by default, and when it's switched off, a loading screen appears, and your page must finish loading before it's displayed to a user.</div>
                    <div class=\"sectionP\">It is recommended that you use images on your website that are not too large so that your page won’t take time to load. Also, using images in the WebP format is strongly advised as it uses high-quality images with a smaller file size.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Show dine-in working hours</div>
                    <div class=\"sectionP\">When you switch on the <b>Show dine-in working hours</b> button, your dine-in service’s <a href=\"https://www.food-menu.net/en/help/settings/12\" target=\"_blank\">working hours</a> that you have set appear on your website along with your other services’ working hours. </div>
                    <div class=\"sectionP\">You can switch off this button if you prefer not to inform your customers of your dine-in availability time, whether it's due to not having a dine-in service or because you are working on changing your working hours.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Display a select language message on the first visit</div>
                    <div class=\"sectionP\">When you switch on the <b>Display a select language message on the first visit</b> button, a popup message will appear to your website visitors when they visit your website for the first time. The popup message allows them to choose their preferred browsing language from the list of languages you have selected for your website.</div>
                    <div class=\"sectionP\">If you switch off the button, no popup message will appear to your website visitors, and their browsing language will be set to the website's default language until the visitor changes it.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Show scheduled discounts announcement</div>
                    <div class=\"sectionP\">When you switch on the <b>Show scheduled discounts announcement</b> button, any scheduled discount you have for the day will be displayed in the announcement bar on your website pages. If you switch off the button, the contrary will happen.</div>
                </div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that disabling this button has no effect on the validity of the discount.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Display Cookies Notification Message</div>
                    <div class=\"sectionP\">A cookies notification message is a pop-up notice that will continue to appear to your website's visitors until they close it. It informs users about the use of cookies on your website. When you switch on the <b>Display Cookies Notification Message</b> button, the cookies notification message will appear. Or, if you prefer to not have the message appear to your visitors, you can switch off the button.</div>
                    <div class=\"sectionP\">The cookies notification message is a <a href=\"https://www.food-menu.net/en/help/settings/3\" target=\"_blank\">basic text that you can edit</a> to match your policy requirements.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Cart Lifetime</div>
                    <div class=\"sectionP\">When your website's registered users add products to their cart while they're signed in, the items are saved in the database. As a result, the same data will be saved whenever they access their account from any device. However, when your non-logged-in website guests add products to their cart, the data is saved in their browser cookies. As a result, their data is saved only on the browser on which the products are being added to the cart.</div>
                    <div class=\"sectionP\">The <b>Cart Lifetime</b> number picker allows you to specify how long items can be left in the cart.</div>
                </div>
                <div class=\"tipContainer\">
                        <div class=\"ico-lamp tutTipIcon\"></div>
                        <div class=\"tutTipText\">Any modifications your website visitors make to their cart reset the cart's lifetime.</div>
                </div>
                <div class=\"sectionP\" style=\"margin-top:30px;\">
                    <div style=\"margin-bottom:5px;font-weight:bold;font-size:1.1em\">Receipt Width</div>
                    <div class=\"sectionP\">We provide you with the option of printing your order receipts through our platform in order to issue accurate information, making you needless of using an accounting program for your restaurant. We also allow you to customize the width of your receipts in millimeters to the exact width of your printer using the <b>Receipt Width</b> number picker so that you can have a smooth receipt-issuing process.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=>6,
            'help_en_tut_id' =>10,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\" >After enabling or disabling any switch button in the  <b>System Settings</b>, make sure to click on  <b>Save</b> to apply the changes to your website, or click on <b>Cancel</b> to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">It's important to note that only the main account can make changes to the System Settings, and the sub-accounts that have the authority to manage system and settings.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);

    }
}
