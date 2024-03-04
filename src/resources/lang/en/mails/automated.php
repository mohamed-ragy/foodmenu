<?php
return [
    'hi'=>'Hello :name:',
    'footer' => [
        'copyRights' => '©2024 Foodmenu. All rights reserved.',
        'thisMsg1' => 'This message was sent to',
        'thisMsg2' => 'as part of your Foodmenu membership.',
        'privacypolicy' => 'Privacy Policy',
        'termsofservice' => 'Terms of Service',
        'helpCenter' => 'Help Center',
    ],
    'welcome' => [
        'subject' => 'Welcome to Foodmenu',
        'header' => <<<string
            <img src=":APP_URL:/storage/imgs/mails/automated/welcome.png" height="auto" width="300" style="margin:10px;box-shadow:var(--card-shdw)" alt="" title="">
            <div class="bold c_txt2" style="font-size: 2.3em;">Welcome to Foodmenu</div>
        string,
        'body' => <<<string
            <div style="margin:20px;font-size:1.2em;">Your Foodmenu account has been created successfully. if you haven't installed your website please click on the button below.</div>
            <div style="text-align:center;width:calc(100% - 40px);padding:20px;margin-bottom:50px;">
                <a class="btn" target="_blank" href=":CPANEL_URL:/login">Install Website</a>
            </div>
            <div style="margin:20px;font-size:1.2em;">After finishing your website installation, use the code below to verify your Foodmenu account's email address.</div>
            <div style="text-align:center;width:calc(100% - 40px);margin:20px;">
                <div style="font-size:2.3em;font-weight:bold;letter-spacing:3px;padding: 10px 20px;margin:auto;border-radius:5px;width: fit-content;border: 1px solid #dbdbdba1;">:code:</div>
            </div>
        string,
    ],
    'website_installed' => [
        'subject' => "Your restaurant's website has been installed successfully!",
        'header' => <<<string
            <img src=":APP_URL:/storage/imgs/mails/automated/websiteInstalled.png" height="auto" width="300" style="margin:10px;box-shadow:var(--card-shdw)" alt="" title="">
            <div class="bold c_txt2" style="font-size: 2.5em;margin-bottom:5px;margin-top:10px;">Congratulations</div>
            <div class="c_txt2" style="font-size: 1.8em;">Your restaurant's website has been installed successfully!</div>
        string,
        'body' => <<<string
        
        string,
    ],
    
];
