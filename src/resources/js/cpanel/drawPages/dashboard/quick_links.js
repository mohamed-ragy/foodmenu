drawPage_quick_links  = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'row alnC jstfyC wrap'}).append(
                $('<a/>',{class:'quickLinkContainer',href:process.env.MIX_APP_URL,target:'_blank'}).append(
                    $('<img/>',{class:'w50 h50 mB10',src:`/storage/logo/logo.png`}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.fodmenuHome})
                ),
                $('<a/>',{class:'quickLinkContainer',href:`${process.env.MIX_APP_URL_HTTP}${website.url}`,target:'_blank'}).append(
                    $('<img/>',{class:'h50 mB10',src:website.logo}),
                    $('<div/>',{class:'fs101 ',text:website.domainName})
                ),
                $('<a/>',{class:'quickLinkContainer',href:process.env.MIX_HELP_CENTER_URL,target:'_blank'}).append(
                    $('<div/>',{class:'ico-support fs205 mB15 c_txt1'}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.helpCenter})
                ),
                $('<a/>',{class:'quickLinkContainer',href:process.env.MIX_BUILDER_URL,target:'_blank'}).append(
                    $('<div/>',{class:'ico-design fs205 mB15 c_txt1'}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.websiteBuilder})
                ),
                $('<a/>',{class:'quickLinkContainer',href:process.env.MIX_BILLING_CENTER_URL,target:'_blank'}).append(
                    $('<div/>',{class:'ico-billing fs203 mB20 c_txt1'}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.billingCenter})
                ),
                $('<a/>',{class:'quickLinkContainer',href:process.env.MIX_DELIVERY_HUB_URL,target:'_blank'}).append(
                    $('<div/>',{class:'ico-delivery fs203 mB15 c_txt1'}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.deliveryGate})
                ),
                $('<a/>',{class:'quickLinkContainer',href:`${process.env.MIX_APP_URL}/en/service-status`,target:'_blank'}).append(
                    $('<div/>',{class:'ico-online_users fs205 mB10 c_txt1'}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.serviceStatus})
                ),
                $('<a/>',{class:'quickLinkContainer',href:`${process.env.MIX_APP_URL}/en/contact-us`,target:'_blank'}).append(
                    $('<div/>',{class:'ico-email_address fs203 mB15 c_txt1'}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.contactus})
                ),
                $('<a/>',{class:'quickLinkContainer',href:`${process.env.MIX_APP_URL}/en/faq`,target:'_blank'}).append(
                    $('<div/>',{class:'ico-help fs203 mB15 c_txt1'}),
                    $('<div/>',{class:'fs101 ',text:texts.dashboard.faq})
                ),
            )
        )
    )
}
