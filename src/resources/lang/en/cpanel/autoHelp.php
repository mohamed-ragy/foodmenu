<?php
return [
    //support//
    'submit_ticket' => [
        'title' => 'Submit a help ticket',
        'content' => <<<string
        <p>- Here, you can report any issues you may be facing to our support team.</p>
        <ul>
        <li>In the <b>Ticket subject</b> input box, you only need to mention the main topic of your ticket.</li>
        <li>From the <b>Select ticket type</b> drop-down menu, you can select the type of issue you’re facing. If you didn’t find an option that fits your issue type, you can select "other".</li>
        <li>In the <b>Issue Description</b> Input Box, you can describe your issue in detail in a clear and accurate manner.</li>
        <li>In the <b>Attached images</b> Area, you can upload images or screenshots that you think will be helpful in demonstrating the issue you're facing. You can click on <b>Attach an image</b> to upload an image to the help ticket.</li>
        </ul>
        <p>- <b>Please note that sub-accounts can’t submit help tickets.</b></p>
        string,
    ],
    'ticket_history' => [
        'title' => 'Ticket history',
        'content' => <<<string
        <p>-The ticket history archives all your account’s submitted tickets. </p>
        <p>-The help tickets are sorted into a list that displays important information such as the ticket number, ticket subject, ticket status, and date of submission.</p>
        <div>Ticket statuses can be</div>
        <ol>
        <li><b>Open:</b> This indicates that we are actively working to resolve the issue.</li>
        <li><b>Awaiting your response:</b> It indicates that we have responded to your help ticket and are awaiting your response for further clarification on the issue.</li>
        <li><b>Resolved:</b> It indicates that the ticket has been resolved.</li>
        </ol>
        <p>- <b>Please note that sub-accounts cannot access the ticket history</b>.</p>
        string,
    ],
    'ticket_browser' => [
        'title' => 'Ticket browser',
        'content' => <<<string
        <p>- In the <b>Ticket browser</b>, you can see the interactions between you and our support team.</p>
        <p>- If the help ticket is still awaiting your response, you can write your reply in the input box provided, then click on the <b>Send</b> button.</p>
        string,
    ],
    //settings=>region//
    'country' => [
        'title' => 'Your restaurant\'s country',
        'content' => <<<string
        <p>- Here, you can determine the country in which your restaurant is located. You can select the country from the provided input list.</p>
        string,
    ],
    'time_zone' => [
        'title' => 'Your restaurant\'s time zone',
        'content' => <<<string
        <p>- Here, you can set the time format and time zone for both your website and Control Panel, based on your restaurant's region.</p>
        <p>- By switching on the <b>Enable 12 hours</b> button, your website and Control Panel's systems will use the 12-hour time format. If you switch off the button, the system will be set to the 24-hour time format.</p>
        <p>- You can select the time zone in which your website system will operate from the input list provided. Upon selecting the time zone, the standard time for the region you chose will be displayed above the input list.</p>
        string,
    ],
    //settings=>system settings//
    'system_settings' => [
        'title' => 'Your system settings',
        'content' => <<<string
        <p>- Here, you can adjust and manage various system settings for your website based on what works best for your preferences.</p>
        string,
    ],
    'enable_home_delivery' => [
        'title' => 'Home delivery service',
        'content' => <<<string
            <p>- Your website visitors will be able to place home delivery orders through your website when you switch on the <b>Enable home delivery service</b> button. If you switch off the button, the opposite will happen.
            </p
        string,
    ],
    'enable_order_pickup' => [
        'title' => 'Order pickup service',
        'content' => <<<string
        <p>- When you switch on the <b>Enable order pickup service</b> button, your website visitors will be able to place pickup orders through your website. The opposite will happen if you switch off the button.</p>
        string,
    ],
    'enable_guest_orders' => [
        'title' => 'Accept guest orders',
        'content' => <<<string
        <p>- By enabling the <b>Accept guest orders</b> switch button, you allow unregistered website visitors to place orders. You can also disable this feature by switching off the button and limiting placing orders to registered users only.</p>        
        string,
    ],
    'accept_delivery_orders24' => [
        'title' => 'Accept delivery orders outside your working hours',
        'content' => <<<string
        <p>- If you enable the <b>Accept delivery orders outside working hours</b> switch button, visitors to your website will be able to place delivery orders outside of the working hours <a class="cpPage" cpPage="home_delivery_settings" openTab="delivery_working_days">you have set</a>. By switching off the button, visitors can place orders only within your working hours.</p>
        string,
    ],
    'accept_pickup_orders24' => [
        'title' => 'Accept pickup orders outside your working hours',
        'content' => <<<string
        <p>- Visitors to your website will be able to place pickup orders outside of the working hours <a class="cpPage" cpPage="order_pickup_settings" openTab="pickup_working_days">you set</a> by switching on the <b>Accept pickup orders outside working hours</b> button. By switching off the button, visitors can only place orders during your working hours.</p>
        string,
    ],
    'cancel_order' => [
        'title' => 'Allow cancelation of pending orders',
        'content' => <<<string
            <p>- If you switch on the <b>Allow cancellation of pending orders</b> button, users will be able to cancel the orders they placed while they are still pending. The opposite happens when you switch off the button.</p>
        string,
    ],
    'enable_reviews' => [
        'title' => 'Enable product ratings and reviews',
        'content' => <<<string
        <p>- When you switch on the <b>Enable product ratings and reviews</b> button,  the reviews and ratings on your products will be displayed on your website, and visitors to your website will be able to review and rate your products as well. If you switch off the button, the contrary will happen.</p>
        string,
    ],
    'enable_guest_Reviews' => [
        'title' => 'Accept guest reviews switch button',
        'content' => <<<string
        <p>If you enable the <b>Accept Guest Reviews</b> switch button, visitors who are not registered on your website will be able to review and rate your products as guests. Alternatively, you can disable this feature by switching off the button.</p>
        string,
    ],
    'collect_reviews' => [
        'title' => 'Display post-purchase surveys for users',
        'content' => <<<string
        <p>- When you enable the <b>Display post-purchase surveys for users</b> switch button, a pop-up box appears after each completed order, asking users to review all of the order's items. This pop-up box will appear once for each completed order. If you switch off the button, this tool will be disabled.</p>
        string,
    ],
    'live_chat' => [
        'title' => 'Enable live chat',
        'content' => <<<string
        <p>- You can enable the live chat feature by switching on the <b>Enable live chat</b> button, which will display a live chat icon for your website visitors to contact you. When you switch off the button, the live chat feature is disabled.</p>
        string,
    ],
    'guest_live_chat' => [
        'title' => 'Enable guest live chat',
        'content' => <<<string
        <p>- By switching on the <b>Enable guest live chat</b> button, you allow any visitor to your website to chat with you via the live chat feature.</p>
        <p>- If you deactivate the button, only website visitors who are logged in will be able to chat with you.</p>
        string,
    ],
    'quick_load_mode' => [
        'title' => 'Website quick load mode',
        'content' => <<<string
        <p>- When you enable the <b>Website quick load mode</b> switch button, your pages will open for website visitors without displaying a loading screen first, and the page content will load as the visitor navigates the site.</p>
        <p>- By switching off the button, your website pages will have to finish loading the page's content first before being displayed to a user. </p>
        string,
    ],
    'show_dinein_working_hours' => [
        'title' => 'Show dine-in working hours',
        'content' => <<<string
        <p>- By enabling the <b>Show dine-in working hours</b> switch button, your dine-in working hours that <a class="cpPage" cpPage="dine_in_settings">you have set</a> will be displayed on your website. </p>
        <p>- You can switch off the button if you don't want your dine-in availability time displayed on your website. </p>
        string,
    ],
    'display_select_language_message' => [
        'title' => 'Display a select language message',
        'content' => <<<string
        <p>- When you enable the <b>Display a select language message on the first visit</b> switch button, your website visitors will see a popup message on their first visit allowing them to choose their website browsing language from the languages <a cpPage="languages" class="cpPage">you have selected</a> for your website. </p>
        <p>- If you switch off the button, no popup message will appear, and the website browsing language will be set to the default language you have set for your website.</p>
        string,
    ],
    'show_scheduled_discounts_announcement' => [
        'title' => 'Show happy hour announcemens',
        'content' => <<<string
        <p>- Enabling the <b>Show happy hour announcements</b> switch button allows your website visitors to see your happy hour announcements.</p>
        <p>- 2When you switch off the button, the contrary happens.</p>
        string,
    ],
    'display_cookies_notification_message' => [
        'title' => 'Display cookies notification message',
        'content' => <<<string
        <p>- When you switch on the <b>Display cookies notification message</b> button, the cookies notification message appears. If you turn off the button, the opposite will occur.</p>
        <p>- A cookies notification message is a pop-up notice that will remain visible to visitors to your website until they close it. It informs website visitors about the use of cookies on your site.</p>
        string,
    ],
    'cart_lifetime' => [
        'title' => 'Cart Lifetime',
        'content' => <<<string
        <p>- Using the <b>Cart lifetime</b> number picker, you can specify how long the items your customers added to their shopping carts will remain saved. When your customers make changes to their cart, the cart duration is reset.</p>
        string,
    ],
    'receipt_width' => [
        'title' => 'Receipt Width',
        'content' => <<<string
        <p>- From here, you can set the width of receipts in millimeters. It is strongly recommended that the width of receipts should be as the same as the width of your printer.</p>
        string,
    ],
    'privacy_policy' => [
        'title' => 'Website privacy policy',
        'content' => <<<string
        <p>- Here, you can add your website's privacy policy. Your website users have to agree with it before they can continue registering on your website.</p>
        <p>- In the provided input boxes, you can enter your privacy policy statement(s) in the language(s) <a class="cpPage" cpPage="languages">you've chosen</a> for your website, using the allowed HTML tags to customize your statements' layout. The privacy policy that appears will be determined by the language of your website visitors.</p>
        string,
    ],
    'delete_data' => [
        'title' => 'Delete order history, activity log, and statistics data',
        'content' => <<<string
        <p>- You can permanently delete any data related to your account's order history, activity log history, and archived statistics by clicking on the <b>Delete my data</b> button. You'll only be required to enter your main account password, and then a confirmation window will appear for you to confirm the action.</p>
        <p>- By deleting this data, you are permanently erasing them and will not be able to recover them later. <b>Please keep in mind that only the main account will be able to delete this data.</b></p>
        string,
    ],
    //settings=>restaurant information//
    'website_logo' => [
        'title' => 'Restaurant logo',
        'content' => <<<string
        <p>- You can upload and select a logo for your restaurant by clicking on the restaurant logo card. This logo will appear in various areas of your website.</p>
        <p>- <b>It is strongly recommended to use a WebP or a PNG image with a transparent background</b>.</p>

        string,
    ],
    'website_icon' => [
        'title' => 'Website icon',
        'content' => <<<string
        <p>- Here, you will be able to pick and set a favicon for your website by clicking on the icon card.</p>
        <p>- <b>It is strongly recommended that you pick an image of a square size, such as 32x32 pixels, and no larger than 180x180 pixels</b>.</p>
        string,
    ],
    'restaurant_name' => [
        'title' => 'Restaurant name',
        'content' => <<<string
        <p>- Here, you can enter your display restaurant name in the languages you chose for your website.</p>
        string,
    ],
    'restaurant_description' => [
        'title' => 'Restaurant description',
        'content' => <<<string
        <p>- Here, you can add a brief description of your restaurant in the languages you chose for your website. This description will be used as the meta description for all your website pages, except for the product and category pages. </p>
        string,
    ],
    'restaurant_email' => [
        'title' => 'Restaurant email',
        'content' => <<<string
        <p>- Here, you can enter a contact email address for your restaurant, which will appear on your website. </p>
        string,
    ],
    'restaurant_phone_numbers' => [
        'title' => 'Restaurant phone numbers',
        'content' => <<<string
        <p>- Here, you can add the contact phone numbers of your restaurant that will be displayed on your website and order receipts.</p>
        <p> You can add as many phone numbers as you wish by clicking on the <b>Add a new phone number</b> button.</p>
        string,
    ],
    'restaurant_Address' => [
        'title' => 'Restaurant address',
        'content' => <<<string
        <p>- Here , you can add your restaurant address, which will be displayed on your website and receipts, in the languages you selected for your website. </p>

        string,
    ],
    'restaurant_location' => [
        'title' => 'Restaurant location',
        'content' => <<<string
        <p>- Here, you can set your exact location on the map, which will be displayed on your website. </p>
        <p>- To set your restaurant's location, you can zoom and pan around the map until you find the location of your restaurant, click on it, and drop the pin. Or you can detect your location automatically by clicking on the <b>My current location</b> button.</p>
        <p>- You can unset your restaurant's location by clicking on the <b>Unset restaurant location</b> button.</p>
        string,
    ],
    'currency_symbols' => [
        'title' => 'Currency symbols',
        'content' => <<<string
        <p>- Here, you can add the currency symbols for the products on your website, noting that it's only a display text and doesn't impact your products' value.</p>
        <p>- In the input boxes provided, you can enter a currency symbol for each language you selected for your website.</p>
        string,
    ],
    'social_media_links' => [
        'title' => 'Social media links',
        'content' => <<<string
        <p>- Here, you can enter the URL links to your restaurant's social media accounts. The links you added will then be displayed in your website's footer as clickable icons.</p>
        string,
    ],
    'website_announcement' => [
        'title' => 'Website announcement',
        'content' => <<<string
        <p>- Here, you can create announcements to display to your website visitors in the languages you selected for your website. The announcements will be displayed based on the language of your website's visitors.</p>
        <p>- You can also use HTML tags to add a hyperlink to your announcement.</p>
        string,
    ],
    'receipt_footer_message' => [
        'title' => 'Receipt footer message',
        'content' => <<<string
        <p>- Here, you can enter your receipt footer messages, which appear at the bottom of your order receipts. You can enter the receipt messages in the languages you chose for your website in their respective input boxes. If you don't want messages on your receipt, leave the input boxes blank.</p>
        string,
    ],
    /////settings=>language
    'languages' => [
        'title' => 'Languages',
        'content' => <<<string
        <p>- Here, you can add languages that will be supported by your website, allowing your visitors to select their browsing language from what is provided.</p>
        string,
    ],
    'languages_table' => [
        'title' => 'Languages list',
        'content' => <<<string
        <p>
        <div>- All of the languages you've installed are listed in rows in the languages list. Each row displays primary information about a language as well as a few check boxes and clickable icons that allow you to manage language details and functions.</div>
        <ul>
          <li>By checking the <b>Default</b> box next to a language, you mark it as the default browsing language of your website.</li>
          <li>The <b>Receipt</b> check box allows you to mark a language as the default order receipt language.</li>
        </ul>
        </p>
        <p>- You can adjust language details by clicking on the <b>Edit language options</b> icon.</p>
        <p>- By clicking on the <b>Edit language text</b> icon, you will be able to modify the selected language's basix text.</p>
        <p>- To remove a language from your website, click on the <b>Uninstall language</b> icon. Keep in mind that if you make any modifications to a language and uninstall it, all these changes are permanently lost, even if you reinstall the language again.</p>
        string,
    ],
    'install_new_language' => [
        'title' => 'Install new language',
        'content' => <<<string
        <p>- When you click on the <b>Install new language</b> button, a pop-up window will appear with a list of languages supported by Foodmenu. You can add a language to your website by clicking on the <b>Install</b> button.</p>
        <p>- To add an unspported language, click on <b>+ Create custom language</b> that is found at the top of the list.</p>
        string,
    ],
    'create_custom_language' => [
        'title' => 'create custom language',
        'content' => <<<string
        <p>- Here, you can create custom language for your website by entering all of the language's primary details into the input boxes provided.</p>
        <p>- All of these details can be changed at any time, except for the language code.</p>
        string,
    ],
    'edit_language_option' => [
        'title' => 'Edit language options',
        'content' => <<<string
        <p>- Here you can modify a language's name, flag, and text direction. However, you will be unable to change the language code. </p>
        string,
    ],
    'edit_language_text' => [
        'title' => 'Edit language text',
        'content' => <<<string
        <p>- Here, you will find all of the website's basic text for the selected language, which you can modify using the input boxes provided. To quickly locate a specific text, use the <b>Find text</b> search bar.</p>
        string,
    ],
    'view_settings' => [
        'title' => 'View settings',
        'content' => <<<string
        <p>- Here, you can manage and change some of the control panel's appearance settings.</p>
        <p>- Note that any changes you make in the <b>View settings</b> will only affect your main account, or if you're using a sub-account, only the account you're using.</p>
        string,
    ],
    'expand_navigation_side_menu' => [
        'title' => 'Expand navigation side menu',
        'content' => <<<string
        <p>- The navigation side menu, found on the left side of the control panel, contains several buttons, each of which represents a section of the control panel.</p>
        <p>- By switching on the <b>Expand navigation side menu</b> button, the side menu will be expanded. The contrary will happen if you switch off the button.</p>
        string,
    ],
    'show_status_bar' => [
        'title' => 'Show status bar',
        'content' => <<<string
        <p>- The status bar is a horizontal window at the bottom of the control panel where alert messages appear. Any message displayed in the status bar will remain until it is replaced by another.</p>
        <p>- You can enable displaying the status bar by switching on the <b>Show Status Bar</b> button. The contrary will happen if you switch off the button.</p>
        string,
    ],
    'show_hotkey_shortcuts' => [
        'title' => 'Show hotkey shortcuts',
        'content' => <<<string
        <p>- The hotkey shortcuts are combinations of keys on the keyboard that you can click on to take faster actions on the control panel instead of using the mouse.</p>
        <p>- If you switch on the <b>Show hotkey shortcuts</b> button, the shortcuts tagline will appear on the control panel. The contrary will happen if you switch off the button. You can also have all the hotkey shortcuts appear in a pop-up window when you press <b>F1</b> on your keyboard.</p>
        <p>- Keep in mind that  you can still use the hotkeys even if you switch off the <b>Show hotkey shortcuts</b> button.</p>
        string,
    ],
    'enable_dark_mode' => [
        'title' => 'Enable dark mode',
        'content' => <<<string
        <p>- You can enable the dark mode theme in the control panel by switching on the <b>Enable dark mode</b> button. When you switch off the button, the control panel returns to the light mode theme.</p>
        string,
    ],
    'control_settings' => [
        'title' => 'Control settings',
        'content' => <<<string
        <p>- Here, you will be able to change a few control panel settings.</p>
        <p>- Note that any changes you make in the <b>Control settings</b> will only affect your main account, or if you're using a sub-account, only the account you're using.</p>
        string,
    ],
    'enable_chat_window_popup' => [
        'title' => 'Enable chat window popup',
        'content' => <<<string
        <p>- When you switch on the <b>Enable chat window popup</b> button, a chat window will pop up with every incoming live chat message. If you switch off the button, the opposite happens.</p>
        string,
    ],
    'Dont_show_more_than_one_alert' => [
        'title' => 'Don\'t show more than one alert at a time',
        'content' => <<<string
        <p>When you switch on the <b>Don't show more than one alert at a time</b>  button, only one alert will appear on your screen at a time before being replaced by a new one. Alternatively, you can enable alerts to be displayed over each other by switching off the button.</p>
        string,
    ],
    'click_twice_to_confirm_actions' => [
        'title' => 'Click twice to confirm actions',
        'content' => <<<string
        <p>- The option to double-click on buttons before confirming actions is only available for certain critical actions, such as accepting or canceling an order.</p>
        <p>- After the first click, the button turns orange. The action will then be confirmed with the second click. To cancel the first click, click anywhere outside the button to stop the action.</p>
        <p>- To enable this feature switch on the <b>Click twice to confirm actions</b> button, or switch off the button to disable the feature.</p>
        string,
    ],
    'enable_share_reminders' => [
        'title' => 'Enable share reminders',
        'content' => <<<string
        <p>- When you switch on the <b>Enable share reminder</b> button, a pop-up window will appear every 30 minutes to remind you of sharing a random product or category on your social media platforms through the control panel.</p>
        <p>- If you switch off the button, you will not receive any share reminders.</p>
        string,
    ],
    'enable_tooltips' => [
        'title' => 'Enable tooltips',
        'content' => <<<string
        <p>- By switching on the <b>Enable tooltip</b> button, tooltips will appear automatically when you hover the mouse above some items on the control panel, providing brief descriptions. Or, you can disable the tooltips feature by switching off the button.</p>
        string,
    ],
    'guide_mode' => [
        'title' => 'Guide mode',
        'content' => <<<string
        <p>- The guide mode is a useful feature for new control panel users to help them understand how to use certain tools on the control panel better.</p>
        <p>- The guide mode has three main tools:</p>
        <ol>
            <li>Auto help</li>
            <li>Help icons</li>
            <li>Guide alerts</li>
        </ol>
        <p> - Note that any changes you make in the <b>Guide mode</b> will only affect your main account, or if you're using a sub-account, only the account you're using.</p>
        string,
    ],
    'enable_the_guide_mode' => [
        'title' => 'Enable the guide mode',
        'content' => <<<string
        <p>- By switching on the <b>Enable guide mode</b> button, an area displaying guide tips will appear in an area on the right side of the control panel. You can also disable this feature by switching off the button.</p>
        string,
    ],
    'enable_auto_help' => [
        'title' => 'Enable auto help',
        'content' => <<<string
        <p>- When you enable auto-help, one of the guide mode tools, guide tips will appear in the guide mode area whenever you click or hover over any object. If you want a specific autohelp to appear first in the guide tip area, you can pin it by clicking on the <b>Pin</b> <span class="ico-pin"></span> icon.</p>
        <p>- You can switch on or off the <b>Enable auto help</b> button to enable or disable the auto help tool.</p>
        <p>- Please note that you wont't be able to enable the auto help if the guide mode is disabled.</p>
        string,
    ],
    'show_help_icons' => [
        'title' => 'Show help icons',
        'content' => <<<string
        <p>- Help icons are question marks that appear beside some tools on your account, providing you with guide tips about their functionality.</p>
        <p>- You can enable the help icons to appear when you switch on the <b>Show help icons</b> button, or you can switch off the button to disable this feature.</p>
        <p>- Keep in mind that you won't be able to enable the help icons feature if the guide mode is disabled.</p>
        string,
    ],
    'Enable_guide_alerts' => [
        'title' => 'Enable guide alerts',
        'content' => <<<string
        <p>- Guide alerts notify you of incomplete information on your account or additional actions required to have everything set. They are located in the top right corner of the screen, among the navigation bar icons.</p>
        <p>- You can enable the guide alerts by switching on the <b>Enable guide alerts</b> button, or to disable it, switch off the button.</p>
        string,
    ],
    'alert_notifications' => [
        'title' => 'Alert notifications',
        'content' => <<<string
        <p>- The alert notifications notify you of important website events, such as when a new order is placed or delivered, a product is reviewed, etc.</p>
        <p>- Here, you can enable or disable alerts for each event, but keep in mind that even if you disable some alerts, you will continue to receive notifications for any event that occurs on your website.</p>
        <p>- Note that any changes you make in the <b>Alert notifications</b> will only affect your main account, or if you're using a sub-account, only the account you're using.</p>
        string,
    ],
    'new_order_placement_alert' => [
        'title' => 'New order placement alert',
        'content' => <<<string
        <p>- By switching on the <b>Alert me when a new order is placed</b> button, you will be notified whenever a customer places an order.</p>
        string,
    ],
    'delivered_orders_alert' => [
        'title' => 'Delivered orders alert',
        'content' => <<<string
        <p>- If you switch on the <b>Alert me when an order is delivered by a delivery person</b> button, you'll receive an alert each time a delivery person successfully delivers an order through a <a class="cpPage" cpPage="delivery_accounts">delivery account</a>.</p>
        string,
    ],
    'new_user_registration_alert' => [
        'title' => 'New user registration alert',
        'content' => <<<string
        <p>- When you switch on the <b>Alert me when a new user signs up</b> button, you'll receive an alert each time a new user registers on your website.</p>
        string,
    ],
    'new_product_review_alert' => [
        'title' => 'New product review alert',
        'content' => <<<string
        <p>- If you switch on the <b>Alert me when a product is reviewed</b> button, you'll receive an alert whenever a website visitor leaves a review on any of your products.</p>
        string,
    ],
    'user_order_cancelation_alert' => [
        'title' => 'User order cancelation alert',
        'content' => <<<string
        <p>- If you switch on the <b>Alert me when an order is canceled by a user</b> button, you'll receive an alert whenever a website user cancels an order.</p>
        string,
    ],
    'user_login_alert' => [
        'title' => 'User login alert',
        'content' => <<<string
        <p>- If you switch on the <b>Alert me when a user logs in</b> button, you will be notified whenever a user logs in to your website.</p>
        string,
    ],
    'browsing_guests_alert' => [ 
        'title' => 'Browsing guests alert',
        'content' => <<<string
        <p>By switching on the <b> Alert me when a guest browses the website</b> button, you will be notified whenever an unregistered website visitor starts browsing your website. Or, you can turn off the button to disable this feature.</p>
        string,
    ],
    'delivery_cost' => [
        'title' => 'Delivery cost',
        'content' => <<<string
        <p>- Here, you can specify a fixed amount for your home delivery service cost, which will be the delivery fees paid by your customers.</p>
        <p>- However, if you want to manually adjust the delivery cost for some orders based on their delivery location, switch on the <b>Inform customers of possible cost changes</b> button.</p>
        string,
    ],
    'average_delivery_time' => [
        'title' => 'Average delivery time',
        'content' => <<<string
        <p>- Using the time picker provided, you can set a fixed duration of time as the average time it takes to deliver an order. When your customers place orders, they will be informed of the delivery time.</p>
        string,
    ],
    'payment_methods' => [
        'title' => 'Payment methods',
        'content' => <<<string
        <p>- Here,  you can select which payment methods your customers can use upon placing an order. When you select more than one method, the customer must choose between them.</p>
        <p>- If you don't select a payment method, your customers will be able to place orders without having to choose one.</p>
        string,
    ],
    'home_delivery_minimum_charge' => [
        'title' => 'Home delivery minimum charge',
        'content' => <<<string
        <p>- A minimum charge is the lowest amount of an order's total allowed before placing an order. In the provided input box, enter the value of your order's minimum charge. You can enter a value of 0 to avoid setting a minimum charge.</p>
        <p>- By switching on the <b>Include tax and delivery cost</b> button, the total order's amount that is compared to the minimum charge will include the order's items, tax amount, and delivery cost on the order. </p>
        <p>- If you switch off the button, only the order's item amount will be compared to the minimum charge you have set.</p>
        string,
    ],    
    'tax_settings' => [
        'title' => 'Tax settings',
        'content' => <<<string
        <p>- Here, you will be able to add tax costs to your orders.</p>
        <p>- You can either set a fixed tax cost on all of your orders by checking the <b>Fixed cost</b> box and entering the amount in the provided input box. </p>
        <p>-Alternatively, you can set a tax rate by checking the <b>Percentage</b> box and entering the percentage in the input box.</p>
        string,
    ],    
    'average_time_to_prepare_an_order' => [
        'title' => 'Average time to prepare an order',
        'content' => <<<string
        <p>You can set a fixed duration of time as the average time it takes to prepare a pickup order, so your customers will be informed when they place their order. The time can be set using the time picker provided.</p>
        string,
    ],  
    'order_pickup_minimum_charge' => [
        'title' => 'Order pickup minimum charge',
        'content' => <<<string
        <p>- A minimum charge is the lowest amount of an order's total allowed before placing an order. In the provided input box, enter the value of your order's minimum charge. You can enter a value of 0 to avoid setting a minimum charge.</p>
        <p>- By switching on the <b>Include tax</b> button, the total order's amount that is compared to the minimum charge will include the order's items and tax amount on the order. </p>
        <p>- If you switch off the button, only the order's item amount will be compared to the minimum charge you have set.</p>
        string,
    ],      
    'service_charge' => [
        'title' => 'Service charge',
        'content' => <<<string
        <p>- The service charge is a cost that can be added to your dine-in orders.</p>
        <p>- You can either apply a fixed cost to all orders, regardless of the order's total or items, by checking the <b>Fixed cost</b> box and entering the amount in the provided input box.</p>
        <p>- Alternatively, you can set a percentage to be calculated from the sum of the order items by checking the <b>Percentage</b> box and entering the percentage in the provided input box.</p>
        string,
    ],    
    'setting_the_working_days' => [
        ////Working days help icon
        'title' => 'Setting the working days',
        'content' => <<<string
        <p>- Here, you can specify the service's working days and manage other settings such as each day's working hours, happy hours, and more. This is used to inform your website visitors about the availability of the service.</p>
        <p>- A green icon next to a weekday indicates that it has been designated as a working day. If the icon is gray, it means that this day is not marked as a working day.</p>
       
        string,
    ],    
    'working_days_list' => [
        ///working days table
        'title' => 'Working days list',
        'content' => <<<string
        <p>- You can find each weekday listed in a row. Each row includes a day's working hours, happy hour details (if any), a manage button, and a button to copy the working day details.</p>
        <p>- When you click on the <b>Copy working day details</b> button, a popup window will appear, allowing you to copy the same working hours from the selected day to other weekdays.</p>
        string,
    ],    
    'set_as_working_day' => [
        'title' => 'Set as working day',
        'content' => <<<string
        <p>- When you switch on the <b>Set as working day</b> button, you enable the selected day to be marked as a working day. </p>
        <p>- Alternatively, if you want it to be a non-working day, switch off the button.</p>
        string,
    ],    
    'working_hours' => [
        'title' => 'Working hours',
        'content' => <<<string
        <p>- Here, you can set your service's working hours for the selected day. When you switch on the <b>24-hour availability</b> button, you let your website visitors know that the service is available for the whole day. That is, if you enable this feature, the service will be available from 0:00 to 23:59 based on the time zone you have selected.</p>
        <p>- To set a specific start and end time, use the provided <b>Starts at</b> and <b>Ends at</b> time pickers to set your working hours. If your working hours are set after midnight (in the following calendar day), you can still set the end time in the time picker as after midnight, and our system will treat it as the working hours of the day the start time was on.</p>
        string,
    ],    
    'happy_hour' => [
        'title' => 'Happy hour',
        'content' => <<<string
        <p>- Here, you can schedule a happy hour for orders on the selected day. Note that when you schedule a happy hour for a day (i.e., Sunday), the discount will be applicable every Sunday on your website until it is unset.</p>
        <p>- You can set the discount percentage using the <b>Discount</b> number picker. When the discount is set to 0%, it means no happy hour is scheduled. If you want to unset a day's scheduled discount, you can modify the discount to be 0%.</p>
        <p>- To set the start and end time of the happy hour, use the provided <b>Starts at</b> and <b>Ends at</b> time pickers. </p>
        string,
    ],    
    'promo_codes' => [
        'title' => 'Promo codes',
        'content' => <<<string
        <p>- Here, you can find a list of all the promo codes that have been created.</p>
        <p>- You will be able to create a new promo code by clicking on the <b>Create new promo code</b> button.</p>
        string,
    ],    
    'promo_codes_list' => [
        'title' => 'Promo codes list',
        'content' => <<<string
        <p>- Each promo code is listed in its own row. Each row contains:</p>
        <ul>
            <li><b>The promo code name</b> </li> 
            <li><b>Date of creation</b> </li>
            <li><b>Active button:</b> by switching it on, you enable the promo code to be activated and valid for use. When you switch off the button, the opposite occurs.</li>
            <li><b>Manage button:</b> when you click on it, a window appears with all of the promo code details that can be changed.</li>
            <li><b>Delete button:</b> when you click on it, you will be able to permanently delete the selected promo code.</li>
        </ul>         
        string,
    ],    
    'create_promo_code_basic_info' => [
        'title' => 'Create promo code info',
        'content' => <<<string
        <p>- In the <b>Code</b> input box, you can enter the promo code's identification, which your customers will enter to redeem the code. Note that you can't change it once it has been created.</p>
        <p>- You can set the promo code's discount percentage through the <b>Discount</b> number picker.</p>
        string,
    ],    

    'manage_promo_code_basic_info' => [
        'title' => 'Manage promo code info',
        'content' => <<<string
        <p>- Here, You can adjust the promo code's discount percentage through the <b>Discount</b> number picker.</p>
        <p>- You will not be able to change the identification of the promo code because it has already been created.</p>
        string,
    ],    

    'promo_code_expiration' => [
        'title' => 'Promo code expiration',
        'content' => <<<string
        <p>- If you're planning to set an expiration date for your promo code, switch on the <b>Has expiration date</b> button and select the expiration date from the date picker. Alternatively, you can leave the promo code valid indefinitely until you set an expiration date.</p>
        string,
    ],    
    'promo_code_limitations' => [
        'title' => 'Promo code limitations',
        'content' => <<<string
        <p>-  In the <b>Minimum order total</b> input box, you can enter the minimum amount of the total order value that is allowed to be used with a promo code.</p>
        <p>- In the <b>Discount value cap</b> input box, you can enter the maximum amount of discounted value allowed in promo code consumption.
        </p>
        string,
    ],    
    'promo_code_settings' => [
        'title' => 'Promo code settings',
        'content' => <<<string
        <p>- Here, you can adjust some of the promo code's usage settings through the provided switch buttons.</p>
        <p>- By switching on the <b>One-time use</b> button, you allow this promo code to be used once only for each user. Guests, on the other hand, will be unable to use one-time promo codes.</p>
        <p>- You can allow unregistered website visitors to use your promo codes by switching on the <b>Allow for guests</b> button, or switch it off to prevent guests from using your promo codes.</p>
        <p>- You can allow your website visitors to apply the promo code to home delivery orders by switching on the <b>Apply for delivery orders</b> button. When you switch off the button, the opposite happens.</p>
        <p>- By switching on the <b>Apply for pickup orders</b> button, you allow the promo code to be used on pickup orders. The opposite happens when you switch off the button.</p>
        string,
    ],    
    ///// my staff
    ///////Help icon
    'delivery_accounts' => [
        'title' => 'Delivery accounts',
        'content' => <<<string
        <p>- Here, you can create and find all your delivery accounts. Delivery accounts are accounts that you can use to assign orders to your delivery personnel.</p>
        <p>- To create a delivery account, click on the <b>Create new delivery account</b> button.</p>
        string,
    ], 
    //////Auto help   
    'delivery_account_list' => [
        'title' => 'Delivery account list',
        'content' => <<<string
        <p>- Here, you can find and manage all your delivery accounts. Each account is sorted in a row, and each row contains:
        <ul>
        <li><b>Account name</b></li>
        <li><b>Login name</b></li>
        <li><b>Last seen status</b></li>
        <li><b>Change password button:</b> You'll be able to enter a new password for the delivery account when you click on this button.</li>
        <li><b>Delete button:</b> By clicking on it, you can permanently delete the delivery account.</li>
        </ul></p>
        string,
    ],   
    //////Help icon 
    'create_delivery_account' => [
        'title' => 'Create a delivery account',
        'content' => <<<string
        <p>- Here, you can enter the basic login details of the delivery account.</p>
        <p>- In the <b>Name</b> input box, you can enter the delivery account name </p>
        <p>- In the <b>Password</b> input box, enter the login password for the delivery account.</p>
        <p>- In the <b>Login name</b> input box, enter the login name for the delivery account that is used to log in to the account. The login name is made up of the name you entered, followed by @ the identifier for your restaurant.</p>
        string,
    ], 
    ////////Help icon   
    'sub_accounts' => [
        'title' => 'Sub-Accounts',
        'content' => <<<string
        <p>- Here, you can create and find all your sub-accounts. Sub-accounts are secondary accounts to your main one that you can use for your staff.</p>
        <p>- To create a sub-account, click on the <b>Create new sub-account</b> button.</p>
        string,
    ],    
    /////////Auto help
    'sub_accounts_list' => [
        'title' => 'Sub-accounts list',
        'content' => <<<string
        <p> - Here, you can find and manage all your sub-accounts. Each account is organized in a row, and each row contains:
        <ul>
        <li><b>Account name</b></li>
        <li><b>Login name</b></li>
        <li><b>Last seen status</b></li>
        <li><b>Force logout button:</b> You can force log out the selected sub-account from any device by clicking on this button. </li>
        <li><b>Manage permissions:</b> You can change the selected account's permissions by clicking on this button.</li>
        <li><b>Change password button:</b> You'll be able to enter a new password for the sub-account when you click on this button.</li>
        <li><b>Delete button:</b> By clicking on it, you can permanently delete the delivery account.</li>
        </ul></p>
        string,
    ],    
    'create_new_sub_account' => [
        'title' => 'Create new sub-account',
        'content' => <<<string
        <p>- Here, you can enter the basic login details of the sub-account.</p>
        <p>- In the <b>Name</b> input box, you can enter the sub-account's name in English letters, underscores, and numbers only.</p>
        <p>- In the <b>Password</b> input box, enter the login password for the sub-account.</p>
        <p>- In the <b>Login name</b> input box, enter the login name for the subaccount. The login name is made up of the name you entered, followed by @ the identifier for your restaurant.</p>
        string,
    ],    
    'manage_permissions' => [
        'title' => 'Manage permissions',
        'content' => <<<string
        <p>- Here, you can manage the permissions assigned to each sub-account through the provided switch buttons. Sub-accounts can have access to some actions, but not all, as some critical actions are reserved for the main account only.</p>
        <p>- The sub-accounts can manage:
        <ul>
        <li>Orders</li>
        <li>Products and categories</li>
        <li>Users</li>
        <li>Images and website design</li>
        <li>Website system and settings</li>
        <li>Chatting with users</li>
        </ul></p>
        <p>- While actions that can be managed solely by the main account are:
        <ul>
        <li>The restaurant's expenses</li>
        <li>Financial reports</li>
        <li>The main account's email address, password, and phone number</li>
        <li>Sub-accounts</li>
        <li>Delivery accounts</li>
        <li>Billing center</li>
        <li>The deletion of order history, archived statistics data, and activity log</li>
        <li>Statistics and analytics</li>
        <li>Help tickets</li>
        <li>Website privacy policy</li>
        </ul></p>
        string,
    ],    
    'create_new_user_account' => [
        'title' => 'Create new user account',
        'content' => <<<string
        <p>- Here, you can create a new account for a website user by filling out the following user details:
        <ul>
        <li>Email address</li>
        <li>Password</li>
        <li>User name</li>
        <li>Phone number</li>
        <li>Address</li>
        </ul></p>
        string,
    ],    
    'user_location' => [
        'title' => 'User location',
        'content' => <<<string
        <p>- The location specified will be used as the default location for home delivery orders, with the user still having the option to change the location for each delivery order.</p>
        <p>- To set the user's location, you can zoom and pan around the map until you find the desired location, then click on it and drop the pin.</p>
        <p>- To reset the location, click on <b>Unset location</b> <span class="ico-no fs101"></span> and select the new location.</p>
        string,
    ],    
    'find_users' => [
        'title' => 'Find users',
        'content' => <<<string
        <p>- Here, you can find all of the users registered on your website from the provided input list.</p>
        <p>- To search for a user, type in the user's name or phone number, then the drop-down list will be filtered to match what you have entered.</p>
    
        string,
    ],
    'manage_users' => [
        'title' => 'Manage users',
        'content' => <<<string
        <p>- After selecting a user, all of their details will be displayed, allowing you modify any of the following details upon their request.
        <ul>
        <li>Email address</li>
        <li>Password</li>
        <li>User name</li>
        <li>Phone number</li>
        <li>Address</li>
        </ul></p>
        <p>-  You can also find a few icons below the user's name that you can use to manage a user and view their important actions. To disallow a user from using their account, click on the <b>Ban user</b> <span class="ico-userBlock"></span> icon.</p>
        string,
    ],    
    'online_users_and_guests' => [
        'title' => 'Online users and guests',
        'content' => <<<string
        <p>- Here, you can find and live-track all the online users and guests browsing your website through the provided list.</p>
        string,
    ],   
    'online_visitors_list' => [
        'title' => 'Online visitors list',
        'content' => <<<string
        <p>- Each row in the list represents a current website visitor who is browsing your website.</p>
        <p>- When a registered website user browses your website, their name will be displayed along with their status and a few icons where your can manage the user profile. If an unregistered website visitor browses your site, they will be assigned a temporary identifier, along with their status and the option to chat with them.</p>
        <p>- Colors are used to indicate visitor status on your website, as shown below:
        <ul>
        <li>Green indicates that a visitor is actively using your website.</li>
        <li>Orange indicates that the visitor is loading a page on your website.</li>
        <li>Red marks that the visitor has logged out or is no longer connected to your website.</li>
        </ul></p>
        string,
    ],    
    'product_categories' => [
        'title' => 'Product categories',
        'content' => <<<string
        <p>- Here, you can find and manage all of the product categories you have created on your account. To add a new product category, click on the <b>Create new category</b> button.</p>
        string,
    ],
    'categories_list' => [
        'title' => 'Categories list',
        'content' => <<<string
        <p>- Here, you can find the list of product categories you have created in the form of category cards.</p>
        <p>- Each product category is represented by a card that displays the category image, category identifier, and a few icons that help you manage the category, as shown below:
            <ul>
            <li><b>Manage products:</b> By clicking on this button, you will be taken to the products page, where you can find all the products within the selected category.</li>
            <li><b>Edit:</b> You can edit the basic product category details through this button.</li>
            <li><b>Share:</b> You can share the category page on your social media platforms through this button.</li>
            <li><b>Delete:</b> By clicking on this button, you will permanently delete the selected category, leaving all previously categorized products within it uncategorized.</li>
            </ul></p>
            <p>- The categories on your website are organized in the same order you specified here. To change their order, use the provided <b>drag and drop</b> icon.</p>
        string,
    ],
    'create_new_product_category' => [
        'title' => 'Create new product category',
        'content' => <<<string
        <p>- Here, you can fill out the basic information about your new product category.</p>
        <p>- To add a category image, click on the image card and choose an image from your account's previously added images or upload a new one.</p>
        <p>- In the <b>Category identifier</b> input box, you can enter the identifier that is used to create the URL for the category page and distinguish each category. The identifier has to be written in small English letters, numbers, underscores, or dashes only.</p>
        <p>-In the <b>Category name</b> input boxes, enter a category name for each language you've selected for your website.</p>
        <p>- A category description will be used as the meta description of the category page. In the <b>Category description</b> input boxes, you can enter a category description in each of the languages you have set for your website.</p>
        string,
    ],    
    'edit_product_category' => [
        'title' => 'Edit product category',
        'content' => <<<string
        <p>- Here, you can modify your product category details except for the product identifier, which cannot be changed once it has been created.</p>
        <p>- To change the category image, click on the image card and choose an image from your account's previously added images or upload a new one.</p>
        <p>- You can modify the category name in the different languages you've selected for your website from the <b>Category name</b> input boxes.</p>
        <p>- In the <b>Category description</b> input boxes, you can modify the category description in each of the languages you have set for your website, which is also used as the meta description for the category page.</p>
        string,
    ],    
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],    
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],    
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
    '' => [
        'title' => '',
        'content' => <<<string
        <p></p>
        string,
    ],
];
    