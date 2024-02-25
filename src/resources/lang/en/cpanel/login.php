<?php
return [
    'title'=>'Control Panel - Login - Foodmenu',
    'text' => [
        'login' => 'Login',
        'email'=> 'Email address',
        'password' => 'password',
        'forgetPassword' => 'Forgot password?',
        'cpanel' => ['public' => 'clear'],
        'dontHaveAccount' => 'Don\'t have an account? <a href="'.env('APP_URL').'/en/register">Sign up</a>.',
        'recoverPasswordEmail' => 'Reset your password via email address.',
        'recoverPasswordSMS' => 'Reset your password via SMS.',
        'backToLogin' => 'Back to login form',
        'recoverPasswordEmailBtn' => 'Send the reset code via email',
        'recoverPasswordPhoneBtn' => 'Send the reset code aia SMS',
        'enterResetEmailMsg' => 'Please enter the email address you have used to register your Foodmenu account.',
        'enterResetPhoneMsg' => 'Please enter the phone number you have registered to your Foodmenu account.',
        'phoneNumber' => 'Phone number',
        'enterTheCode' => 'Please enter the code sent to you.',
        'confirm' => 'Confirm',
        'newPassword' => 'New password',
        'newPasswordConfirm' => 'Confirm new password',
        'changePassword' => ' Change password',
    ],
    'solutions' => [
        '0' => [
            'title' => 'Free hosting',
            'description' => 'Go live with your restaurant right away. We’ll host your website for free on our own servers. All websites hosted by Foodmenu are SSL certified and fully secured.',
        ],
        '1' => [
            'title' => 'Live chat',
            'description' => 'Connect with your customers in real-time. Offer them support during your working hours, or don’t; you have complete control over it all using our built-in live chat feature.',
        ],
        '2' => [
            'title' => 'Fully integrated',
            'description' => 'Your website is fully integrated with your restaurant management panel. From online orders to user data, all is instantaneously reflected on the control panel to give you an all-round view of your operations.',
        ],
        '3' => [
            'title' => 'Management control panel',
            'description' => 'Keep close tabs on your restaurant daily operations using the control panel. Know what’s happening on your website and get live updates on your income and orders from the dashboard. ',
        ],
        '4' => [
            'title' => 'Sub-accounts',
            'description' => 'Create different sub-accounts for your staff to segregate their tasks for better management. Assign each sub-account different permissions relevant to their duties.',
        ],
        '5' => [
            'title' => 'Menu management',
            'description' => 'Flexibly update your menu items at any time. Add or remove products, update prices, and modify item details; have all these changes reflected immediately on your website.',
        ],
        '6' => [
            'title' => 'Increase website Traffic',
            'description' => 'Gain more traffic to your website by sharing your products on your social media platforms in the language you communicate in with your audience. All without leaving the Foodmenu account.',
        ],
        '7' => [
            'title' => 'Create promotions',
            'description' => 'With a built-in system for generating promo codes, you will be able to create your own promo codes and customize their usage.',
        ],
        '8' => [
            'title' => 'Create promotions',
            'description' => 'In for a happy hour? You can schedule discounts for specified hours on different days of the week to drive more sales.',
        ],
        '9' => [
            'title' => 'Operate your website on your own terms',
            'description' => 'Adjust and re-adjust your website settings easily, choose the working hours of your services, and enable or disable different features whenever.',
        ],
        '10' => [
            'title' => 'Order management',
            'description' => 'Fully manage orders from a single place. Receive order notifications on your account as soon as orders are placed. Update order statuses and modify order items. Fulfill orders and quickly print receipts.',
        ],
        '11' => [
            'title' => 'Agile delivery system',
            'description' => 'Create individual accounts for your delivery personnel and digitally assign them orders to deliver. Track their delivery status and analyze their performance. ',
        ],
        '12' => [
            'title' => 'Agile delivery system',
            'description' => 'Using technology ensures better experience for everyone, with on-time delivery and minimal errors.',
        ],
        '13' => [
            'title' => 'Earn all your revenue',
            'description' => 'Our online ordering tool is 100% commission-free. Don’t give up a percentage of your revenue and get back all your earnings.',
        ],
        '14' => [
            'title' => 'Delivery methods',
            'description' => 'Enable different delivery services and let your customers choose their pick from one of the services. Customize working hours, costs, and discounts for each service.',
        ],
        '15' => [
            'title' => 'Statistics and analytics tool',
            'description' => 'Know how your restaurant is performing on a daily, monthly, or yearly basis using our dedicated tool. Take a deep-dive look into your customers ordering behavior, peak hours, and preferred delivery services.',
        ],
        '16' => [
            'title' => 'Discover what your customers truly want',
            'description' => 'By examining your most frequently ordered products and their variants, you can better know your customer preferences to create new tastes that match theirs.',
        ],

    ],
    'wrongusernameorpassword' => 'Wrong email or password',
    'accountBlocked' => "Your account has been temporarily blocked, as a wrong password has been entered several times. To unblock your account, click on the link sent to your registered email address. If you're having trouble unblocking your account, please contact support@food-menu.net for assistance.",
    'accountBlocked2' => 'This account has been temporarily blocked, as a wrong password has been entered several times. Please contact your account administrator to unblock your account.',
    'accountUnblockWrongCode' => 'Wrong link!',
    'accountUnblocked' => 'Your account has been unblocked successfully! You can now log in.',
    'resetPasswordWrongEmail' => 'Wrong email address',
    'resetPasswordWrongPhone' => 'Wrong phone number',
    'resetPasswordErrorTryAgain' => 'Unknown error occurred! Please reload the page and try again.',
    'tooManyRequests' => 'Too many requests! Please try again later.',
    'wrongResetPasswordCode' => 'Wrong code!',
    'codeExpired' => 'Expired code!',
    'passwordChanged' => 'The password has been changed successfully.',
];
