<?php
return [
    'title'=>'Control Panel - Login - Foodmenu',
    'text' =>[
        'login' => 'Login',
        'email'=> 'Email Address',
        'password' => 'password',
        'forgetPassword' => 'Forgot Password?',
        'cpanel' => ['public' => 'clear'],
        'dontHaveAccount' => 'Don\'t have an account? <a href="'.env('APP_URL').'/en/register">Sign up</a>.',
        'recoverPasswordEmail' => 'Reset your password using your email address.',
        'recoverPasswordSMS' => 'Reset your password via SMS on mobile phone.',
        'backToLogin' => 'Back to login form',
        'recoverPasswordEmailBtn' => 'Send the Reset Code Via Email',
        'recoverPasswordPhoneBtn' => 'Send the Reset Code Via SMS',
        'enterResetEmailMsg' => 'Please enter the email address you have used to register your foodmenu account.',
        'enterResetPhoneMsg' => 'Please enter the phone number you have registered to your foodmenu account.',
        'phoneNumber' => 'Phone Number',
        'enterTheCode' => 'Please enter the code we have sent to you.',
        'confirm' => 'Confirm',
        'newPassword' => 'New Password',
        'newPasswordConfirm' => 'Confirm New Password',
        'changePassword' => ' Change Password',
    ],
    'solutions' => [
        '0' => [
            'title' => 'Free Hosting',
            'description' => 'Go live with your restaurant right away. We’ll host your website for free on our own servers. All websites hosted by Foodmenu are SSL certified and fully secured.',
        ],
        '1' => [
            'title' => 'Live Chat',
            'description' => 'Connect with your customers in real-time. Offer them support during your working hours, or don’t; you have complete control over it all using our built-in live chat feature.',
        ],
        '2' => [
            'title' => 'Fully Integrated',
            'description' => 'Your website is fully integrated with your restaurant management panel. From online orders to user data, all is instantaneously reflected on the control panel to give you an all-round view of your operations.',
        ],
        '3' => [
            'title' => 'Management Control Panel',
            'description' => 'Keep close tabs on your restaurant daily operations using the control panel. Know what’s happening on your website and get live updates on your income and orders from the dashboard. ',
        ],
        '4' => [
            'title' => 'Sub-accounts',
            'description' => 'Create different sub-accounts for your staff to segregate their tasks for better management. Assign each sub-account different permissions relevant to their duties.',
        ],
        '5' => [
            'title' => 'Menu Management',
            'description' => 'Flexibly update your menu items at any time. Add or remove products, update prices, and modify item details; have all these changes reflected immediately on your website.',
        ],
        '6' => [
            'title' => 'Increase Website Traffic',
            'description' => 'Gain more traffic to your website by sharing your products on your social media platforms in the language you communicate in with your audience. All without leaving the Foodmenu account.',
        ],
        '7' => [
            'title' => 'Create Promotions',
            'description' => 'With a built-in system for generating promo codes, you will be able to create your own promo codes and customize their usage.',
        ],
        '8' => [
            'title' => 'Create Promotions',
            'description' => 'In for a happy hour? You can schedule discounts for specified hours on different days of the week to drive more sales.',
        ],
        '9' => [
            'title' => 'Operate Your Website on Your Own Terms',
            'description' => 'Adjust and re-adjust your website settings easily, choose the working hours of your services, and enable or disable different features whenever.',
        ],
        '10' => [
            'title' => 'Order Management',
            'description' => 'Fully manage orders from a single place. Receive order notifications on your account as soon as orders are placed. Update order statuses and modify order items. Fulfill orders and quickly print receipts.',
        ],
        '11' => [
            'title' => 'Agile Delivery System',
            'description' => 'Create individual accounts for your delivery personnel and digitally assign them orders to deliver. Track their delivery status and analyze their performance. ',
        ],
        '12' => [
            'title' => 'Agile Delivery System',
            'description' => 'Using technology ensures better experience for everyone, with on-time delivery and minimal errors.',
        ],
        '13' => [
            'title' => 'Earn All Your Revenue',
            'description' => 'Our online ordering tool is 100% commission-free. Don’t give up a percentage of your revenue and get back all your earnings.',
        ],
        '14' => [
            'title' => 'Delivery Methods',
            'description' => 'Enable different delivery services and let your customers choose their pick from one of the services. Customize working hours, costs, and discounts for each service.',
        ],
        '15' => [
            'title' => 'Statistics and Analytics Tool',
            'description' => 'Know how your restaurant is performing on a daily, monthly, or yearly basis using our dedicated tool. Take a deep-dive look into your customers ordering behavior, peak hours, and preferred delivery services.',
        ],
        '16' => [
            'title' => 'Discover what your customers truly want',
            'description' => 'By examining your most frequently ordered products and their variants, you can better know your customer preferences to create new tastes that match theirs.',
        ],

    ],
    'wrongusernameorpassword' => 'Wrong email or password',
    'accountBlocked' => 'This account has been temporarily blocked, as a wrong password has been entered several times. We have sent a link to your registered email address to unblock your account. If you are facing difficulties unblock your account please contact us on support@food-menu.net.',
    'accountBlocked2' => 'This account has been temporarily blocked, as a wrong password has been entered several times. Please contact your account administrator to unblock your account.',
    'accountUnblockWrongCode' => 'Wrong link!',
    'accountUnblocked' => 'Your account has been unblocked successfully; you can now log in.',
    'resetPasswordWrongEmail' => 'Wrong Email Address',
    'resetPasswordWrongPhone' => 'Wrong Phone Number',
    'resetPasswordErrorTryAgain' => 'Unknown Error Occurred! Please reload the page and try again.',
    'tooManyRequests' => 'Too many requests! Please try again later.',
    'wrongResetPasswordCode' => 'Wrong Code!',
    'codeExpired' => 'Expired Code!',
    'passwordChanged' => 'The password has been changed successfully.',
];
