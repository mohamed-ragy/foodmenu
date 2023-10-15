<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut19 extends Seeder
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
        $helpTut = help_en_tut::where('id',19)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $foodmenu = env('APP_URL');

        help_en_text::where('help_en_tut_id',19)->delete();
        help_en_tut::where('id',19)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>19,
            'sort' => 4,
            'title_id' => 'Employing-Live-Chat-on-Your-Website',
            'title' => 'Employing Live Chat on Your Website',
            'description' => 'In today’s world, live chat has become a valuable tool for any website. This article will show you how to use it for your restaurant.',
            'icon' => 'ico-chat',
            'helpCat' => 'basics',
            'keyWords' => 'liveChat.cpanel.website',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 19,
            'title' => 'Live Chat',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Your website visitors can communicate with you directly through your website using the <b>Live Chat</b> option. Enabling live chat will benefit both your website visitors and your staff. Your staff will be able to multitask and respond quickly to customer queries. </div>
                <div class=\"sectionP\">What's more, live chat is more convenient than phone calls for your website visitors, as they can continue the conversation while browsing your website without having to switch between windows. The live chat function can be enabled or disabled from the <a href=\"\" target=\"_blank\">enable live chat</a> switch button, which can be found in <a href=\"\" target=\"_blank\">system settings</a>.</div>
                    <div class=\"sectionP\">To use the live chat function, click on the live chat icon <span class=\"ico-chat\"></span> in the control panel's navigation bar. When you click on it, a drop-down chat list appears. The chat list displays all of the chat history between you and your website visitors.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 19,
            'title' => 'Chat List',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">All chat exchanges between you and your website visitors are displayed in the chat list, which is divided into two sections: <b>Users</b> and <b>Guests</b>. Whereas users are visitors to your website who are logged in to their accounts, and guests are visitors who are not logged in to an account on your website. The number of unseen messages is displayed as an icon next to each section. In the chat list, each conversation with a website visitor is represented by a chat box. When you click on one of the chat boxes, the live chat window appears, displaying the chat exchange.</div>
                <div class=\"sectionP\">When you hover over any chat box, a three-dot menu icon appears; by clicking on it, you'll have a <b>Delete</b> option, which allows you to permanently delete the chat exchange between you and the website visitor.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">A chat exchange with a guest is permanently deleted after 7 days of the guest’s inactivity.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 19,
            'title' => 'Live Chat Options',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">At the top of the chat list, you will find a three-dot menu icon; when you click on it, a few live chat options appear, which are the <b>mute</b>, <b>go invisible</b>, and <b>chat window popup</b> options.</div>
                <div class=\"sectionP\">When you check the mute box, you will not receive any incoming message tones when a new message arrives. If you uncheck the box, incoming message tones will be unmuted. You will be able to choose your preferred tone from the <a href=\"\" target=\"_blank\">control panel settings</a>.</div>
                <div class=\"sectionP\">The <b>Go Invisible</b> switch button allows you to control your restaurant's availability status in the view of your website visitors. If you want to hide your availability from your website visitors while you're online, switch on the <b>Go Invisible</b> switch button, and your restaurant's live chat will appear offline. However, when you switch off the button, your current status is displayed.</div>
                <div class=\"sectionP\">When your main account or one of your sub-accounts switches on the <b>Go Invisible</b> switch button, it only applies to that account and not to all your restaurant accounts. So, in order for your restaurant to appear offline, all accounts with the authority to chat with users must either be offline or have the <b>Go Invisible</b> switch button enabled. When a visitor sends you a message while you are unavailable, the message is marked as sent but not delivered.</div>
                <div class=\"sectionP\">When you switch on the <a href=\"\"_blank\">Enable Chat Window Popup</a> switch button, the chat window will pop up with every incoming live chat message. At first, the chat window popup is inactive, indicating that new messages sent to you are still marked as unseen from your side. However, if you click anywhere on the live chat window other than the minimize and close buttons, the window becomes active, and the website visitor can see that you have seen their message.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you have the <b>Go Invisible</b> mode enabled and click on an inactive chat window popup, it will become active, and any messages sent by a website visitor will be marked as seen from your end while you remain offline.</div>
                </div>
                <div class=\"sectionP\">If you switch off the <a href=\"\" target=\"_blank\">Enable Chat Window Popup</a> button, no window will pop up when you receive an incoming live chat message. You will still be notified of new messages via the navigation bar.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Please keep in mind that if you enable <b>Go Invisible</b>, the chat window popup function will be disabled, but you will still be notified of new incoming messages via the navigation bar.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 19,
            'title' => 'Live Chat Window',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The live chat window is where you can chat and see the messages between you and a website visitor. It includes a few tools that help with managing communication between you and your website visitors.</div>
                <div class=\"sectionP\">At the top of the chat window, the visitor's name is displayed along with their activity status, which shows the type of activity the visitor is engaged in if they're online.
                If they're offline, it will show when they were last seen. The following icons and options are provided in the chat window when you’re chatting with a user to assist you in quickly finding the user's profile and activities:</div>
                <ol>
                <li style=\"margin-bottom:.5em;\">The view orders placed by this user icon <span class=\"ico-orders\"></span</li>
                <li style=\"margin-bottom:.5em;\">The view reviews posted by this user icon <span class=\"ico-star\"></span</li>
                    <li style=\"margin-bottom:.5em;\">The manage profile icon <span class=\"ico-settings\"></span></li>
                    <li style=\"margin-bottom:.5em;\">The share a product with this user icon <span class=\"ico-products\"></span</li>
                </ol>
                <div class=\"sectionP\">The <b>share a product</b> option is especially helpful because it acts as a shortcut to quickly find a product if a customer's inquiry is about a specific product. You can share and send a product by using the shortcut \"p@product identifer\" instead of clicking the <b>share a product</b> icon.</div>
                <div class=\"sectionP\">There’s also an additional option called <b>share order</b> which is available to users who have placed an order. Customers can also use this option through a button provided in the <b>(hc:order tracker)</b> of orders they have placed, allowing them to quickly address any concerns they may have about placed orders. You can also share and send an order while you’re chatting with a user by using the shortcut \"o@order number\" to quickly fetch an order and share it with the user.</div>
                <div class=\"sectionP\">Each message in the chat window has an info icon <span class=\"ico-info\"></span> that displays message details, and a remove icon <span class=\"ico-delete\"></span> that allows you to permanently delete a message.</div>
            </div>
            ",
        ]);
        // array_push($tutsTexts,[
        //     'sort'=> 4,
        //     'help_en_tut_id' => 19,
        //     'title' => 'Your availability Status',
        //     'html' => "<div class=\"SectionContainer\">
        //         <div class=\"sectionP\">If your main account or one of the subaccounts with the authority to chat with users is online, your website visitors will see that your restaurant's live chat is online. If none of your accounts are online, your restaurant's live chat will appear to visitors as offline.</div>
        //     </div>
        //     ",
        // ]);
        // array_push($tutsTexts,[
        //     'sort'=> 5,
        //     'help_en_tut_id' => 19,
        //     'title' => 'Go Invisible Mode',
        //     'html' => "<div class=\"SectionContainer\">
        //         <div class=\"sectionP\">If you want to hide your availability from your website visitors while you're online, switch on the <b>Go Invisible</b> button, and your restaurant's live chat will appear offline.</div>
        //         <div class=\"sectionP\">When an account switches on the button, it only applies to that account and not to all your restaurant accounts. So, for your restaurant to appear offline, all your accounts that have the authority to chat with users have to be either actually offline or have the <b>Go Invisible</b> switch button enabled. When your visitors send a message while you’re offline, the message will be marked as sent but not delivered.</div>
        //     </div>
        //     ",
        // ]);
        // array_push($tutsTexts,[
        //     'sort'=> 4,
        //     'help_en_tut_id' => 19,
        //     'title' => 'Chat Window Popup',
        //     'html' => "<div class=\"SectionContainer\">
        //         <div class=\"sectionP\">When you switch on the <a href=\"{$http}://www.{$url}/en/help/settings/6#6\" target=\"_blank\">Enable Chat Window Popup</a> switch button, a chat window will pop up with every incoming live chat message. At first, the chat window popup appears inactive (semi-transparent), indicating that new messages sent to you are still marked as unseen from your side. However, if you click anywhere on the live chat window other than the minimize and close buttons, the window becomes active, and the website visitor can see that you have seen their message.</div>
        //         <div class=\"tipContainer\">
        //             <div class=\"ico-lamp tutTipIcon\"></div>
        //             <div class=\"tutTipText\">If you have the <b>Go Invisible</b> mode enabled and click on an inactive chat window popup, it will become active, and any messages sent by a website visitor will be marked as seen from your end while you remain offline.</div>
        //         </div>
        //         <div class=\"sectionP\">If you switch off the <a href=\"{$http}://www.{$url}/en/help/settings/6#6\" target=\"_blank\">Enable Chat Window Popup</a> button, no window will pop up when you receive an incoming live chat message. You will still be notified of new messages via the navigation bar.</div>
        //         <div class=\"tipContainer\">
        //             <div class=\"ico-lamp tutTipIcon\"></div>
        //             <div class=\"tutTipText\">Please keep in mind that if you enable <b>Go Invisible</b>, the chat window popup function will be disabled, but you will still be notified of new incoming messages via the navigation bar.</div>
        //         </div>
        //     </div>
        //     ",
        // ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 19,
            'title' => 'How will your customers use the live chat?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The live chat icon will appear to your website visitors in the bottom right corner of the screen. When they click on it, the live chat window appears, showing your restaurant's name, your active status, the chat history, and the input box where they can write their inquiry in.</div>
                <div class=\"sectionP\">You have the option to prevent guests (visitors who aren’t logged in to an account on your website) from chatting with you by switching off the <a href=\"\" target=\"_blank\">enable guest live chat button</a>.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">If you have the Live Chat function disabled from your account’s system, the chat icon won't appear for any of your website visitors.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);

    }
}
