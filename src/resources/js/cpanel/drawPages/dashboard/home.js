drawPage_home = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'mxw1200 ma'}).append(
                draw_helloSection(),
                draw_todaysPerformanceSection(),
                draw_websiteSection(),
                draw_liveActivity(),
                draw_help_articles(),
            )
        )
    )
    drawHomeOnlineVisitors();
    drawTodayHomeOrders();
    checkWebsiteStatus();
    drawWebsiteQRCode();
    drawInfoSection();
    for(const key in window.last_activites){
        drawActivityLog(window.last_activites[key],true)
    }
    $('#download-website-qrcode').attr('href',$('#website_QRcodeDownload').find('img').attr('src'))
    $('#download-website-qrcode').attr('download',website.domainName+'-QRcode.png');

    for(const key in website.help_articles){
        let article = website.help_articles[key]
        $('#home_help_articles').append(
            $('<a/>',{
                class:'catArticleContainer',
                href:`${process.env.MIX_HELP_CENTER_URL}/${account.language}/articles/${article.helpCat}/${article.title_id}`,
                target:'_blank',
            }).append(
                $('<div/>',{style:``,class:`${article.icon} cG catArticleContainerIcon`}).append(
                    $('<div/>',{class:'catArticleContainerIcon_after'}),
                    $('<div/>',{class:`${article.icon} catArticleContainerIcon2`})
                ),
                $('<div/>',{class:'taS bold cG mB5',text:article.title}),
                $('<div/>',{class:'fs08 taS',text:article.description})
            )
        )
    }
}
drawPopupPage_products_sold_today = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.products_sold_today}),
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 w500 p20').append(
        $('<table/>',{class:'',id:'products_sold_today_table'})
    )
    drawTodayHomeOrders();

}
drawPopupPage_todays_income = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.todays_income}),
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 w500 p20').append(
        $('<table/>',{class:'',id:'todays_income_table'})
    )
    drawTodayHomeOrders();
}

//
draw_helloSection = function(){
    let text;
    let img;
    if(texts.cpanel.welcome.ann_important != ''){
        text = texts.cpanel.welcome.ann_important;
        img = 'ann_important.png';
    }else if(website.created_at > (Date.parse(new Date()) / 1000) - 172800){
        text = texts.cpanel.welcome.new;
        img = 'new.png';
    }else if(website.categories.length == 0 || website.products.length == 0){
        text = texts.cpanel.welcome.new;
        img = 'new.png';
    }else{
        text = texts.cpanel.welcome.blog;
        img = 'blog.png';
    }

    return $('<div/>',{class:'brdrB2 pB40'}).append(
        $('<div/>',{class:'home_ordersPerformanceBarContainer'}).append(
            $('<div/>',{class:'row wrap-720 alnS jstfyE w100p'}).append(
                $('<div/>',{class:'grow1'}).append(
                    $('<div/>',{class:'fs104 bold',text:texts.dashboard.welcomeMsg.replace(':name:',account.name)}),
                    $('<div/>',{class:'m10 ',html:text}),
                ),
                $('<img/>',{class:'alnsE  h200',src:`./storage/imgs/cpanel/welcome/${img}`})
            )
        )

    )
}
draw_todaysPerformanceSection = function(){
    return $('<div/>',{class:'brdrB2 pB40'}).append(
        $('<div/>',{class:'mX5 fs102 mT40 bold mY10',text:texts.dashboard.todaysPerformance}),
        $('<div/>',{class:'row wrap alnC jstfyC'}).append(
            $('<div/>',{class:'homeRevenueCard popupPage',popupPage:'todays_income'}).append(
                $('<div/>',{class:'bold fs09',text:texts.dashboard.todayIncome}),
                $('<div/>',{class:'h_so_total fs09 cardLoading br5 h10 m5 w50',text:'0'}),
                $('<div/>',{class:'cGtxt ico-money fs405 homeRevenueCard_icon2'}),
                $('<div/>',{class:'cGtxt ico-money fs2 homeRevenueCard_icon1'}),
            ),
            $('<div/>',{class:'homeRevenueCard popupPage',popupPage:'products_sold_today'}).append(
                $('<div/>',{class:'bold fs09',text:texts.dashboard.productsSoldToday}),
                $('<div/>',{class:'h_products_solid fs09 cardLoading br5 h10 m5 w50',text:'0'}),
                $('<div/>',{class:'cGtxt ico-products fs405 homeRevenueCard_icon2'}),
                $('<div/>',{class:'cGtxt ico-products fs2 homeRevenueCard_icon1'}),
            ),
            // $('<div/>',{class:'homeRevenueCard bgc_G_90 cGtxt cpPage pointer',cpPage:'online_users'}).append(
            //     $('<div/>',{class:'bold fs09',text:texts.dashboard.currentVisitors}),
            //     $('<div/>',{class:'h_online_visitors fs09 cardLoading br5 h10 m5 w50',text:'0'}),
            //     $('<div/>',{class:'cGtxt ico-users fs405 homeRevenueCard_icon2'}),
            //     $('<div/>',{class:'cGtxt ico-users fs2 homeRevenueCard_icon1'}),
            // ),
        ),
        $('<div/>',{class:'row wrap alnSH jstfyS'}).append(
            $('<div/>',{class:'home_ordersPerformanceBarContainer'}).append(
                $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                    $('<div/>',{class:'bold alnsS fs09',text:texts.dashboard.successfulOrders}),
                    $('<div/>',{text:'',class:'mX5 fs09 c_white-10 successfulOrders_ordersPerformanceVal'}),
                ),
                $('<div/>',{class:'ordersPerformanceBar'}).append($('<div/>',{class:'successfulOrders_ordersPerformanceBar ordersPerformanceBar_fill bgc_G'})),
                $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                    $('<div/>',{class:'bold alnsS fs09',text:texts.dashboard.canceledorders}),
                    $('<div/>',{text:'',class:'mX5 fs09 c_white-10 canceledOrders_ordersPerformanceVal'}),
                ),
                $('<div/>',{class:'ordersPerformanceBar'}).append($('<div/>',{class:'canceledOrders_ordersPerformanceBar ordersPerformanceBar_fill bgc_R'})),
            ),
            $('<div/>',{class:'home_ordersPerformanceBarContainer'}).append(
                $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                    $('<div/>',{class:'bold alnsS fs09',text:texts.dashboard.deliveredOrders}),
                    $('<div/>',{text:'',class:'mX5 fs09 c_white-10 deliveredOrders_ordersPerformanceVal'}),
                ),
                $('<div/>',{class:'ordersPerformanceBar'}).append($('<div/>',{class:'deliveredOrders_ordersPerformanceBar ordersPerformanceBar_fill bgc_delivery'})),
                $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                    $('<div/>',{class:'bold alnsS fs09',text:texts.dashboard.pickedupOrders}),
                    $('<div/>',{text:'',class:'mX5 fs09 c_white-10 pickedupOrders_ordersPerformanceVal'}),
                ),
                $('<div/>',{class:'ordersPerformanceBar'}).append($('<div/>',{class:'pickedupOrders_ordersPerformanceBar ordersPerformanceBar_fill bgc_pickup'})),
                $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                    $('<div/>',{class:'bold alnsS fs09',text:texts.dashboard.dinedinOrders}),
                    $('<div/>',{text:'',class:'mX5 fs09 c_white-10 dinedinOrders_ordersPerformanceVal'}),
                ),
                $('<div/>',{class:'ordersPerformanceBar'}).append($('<div/>',{class:'dinedinOrders_ordersPerformanceBar ordersPerformanceBar_fill bgc_dineIn'})),
            ),
        ),

    )
}
draw_websiteSection = function(){
    return $('<div/>',{class:'brdrB2 pB40'}).append(
        $('<div/>',{class:'mX5 fs102 bold mY10 mT40',text:texts.dashboard.websitetitle.replace(':name:',`${website.domainName.charAt(0).toUpperCase()}${website.domainName.slice(1)}`)}),

        $('<div/>',{class:'row wrap alnC jstfyC'}).append(
            $('<div/>',{class:'alnsS'}).append(
                $('<div/>',{class:'home_websiteSwitchContainer'}).append(
                    $('<div/>',{class:'bold alnsS',text:texts.dashboard.websiteUrl}),
                    $('<a/>',{class:'bold alnsS',text:`${process.env.MIX_APP_URL_HTTP}${website.url}`,href:`${process.env.MIX_APP_URL_HTTP}${website.url}`,target:'_blank'}),
                    $('<div/>',{class:'cG-40 ico-link fs405 homeRevenueCard_icon2'}),
                    $('<div/>',{class:'cG-40 ico-link fs2 homeRevenueCard_icon1'}),
                ),
                $('<div/>',{class:'row wrap alnS jstfyC'}).append(
                    $('<div/>',{class:'home_websiteSwitchContainer alnsS'}).append(
                        $('<div/>',{class:'bold alnsS mB25',text:texts.dashboard.websiteStatus}),
                        $('<div/>',{class:'websiteStatus column alnC jstfyC'}).append(
                            $('<div/>',{class:'ico-online websiteStatusIcon'}),
                            $('<div/>',{class:'websiteStatusTxt',text:''}),
                            $('<div/>',{id:'websiteSwitchLoading',class:'websiteSwitchLoading loading mB10',}),
                        ),
                        drawSwitchBtn('',texts.dashboard.websiteSwitch,'system-websiteSwitch','checkboxlabel_100p brdrT0 authority_master','',texts.dashboard.websiteSwitch,website.active,null),
                    ),
                    $('<div/>',{class:'home_websiteSwitchContainer p10 alnsSH  pointer cpPage',cpPage:'online_users'}).append(
                        $('<div/>',{class:'alnsS bold fs09',text:texts.dashboard.currentVisitors}),
                        $('<div/>',{class:'alnsS h_online_visitors fs09 cardLoading br5 h10 m5 w50',text:'0'}),
                        $('<div/>',{class:'alnsS bold fs09 mT30',text:texts.dashboard.currentUsers}),
                        $('<div/>',{class:'alnsS h_online_users fs09 cardLoading br5 h10 m5 w50',text:'0'}),
                        $('<div/>',{class:'alnsS bold fs09 mT30',text:texts.dashboard.currentGuests}),
                        $('<div/>',{class:'alnsS h_online_guests fs09 cardLoading br5 h10 m5 w50',text:'0'}),
                        $('<div/>',{class:'cG-40 ico-users fs505 homeRevenueCard_icon2'}),
                        $('<div/>',{class:'cG-40 ico-users fs305 homeRevenueCard_icon1'}),
                    ),
                )

            ),
            $('<div/>',{class:'home_websiteSwitchContainer'}).append(
                $('<div/>',{class:'bold alnsS mB25',text:texts.dashboard.qrcode}),
                $('<div/>',{class:'column alnsC alnC jstfyC'}).append(
                    $('<div/>',{id:'website_QRcode'}),
                    $('<a/>',{id:'download-website-qrcode',class:'btn m10 alsS tdNone',text:texts.dashboard.downloadqr})
                )
            ),
        ),
    )
}
draw_liveActivity = function(){
    return $('<div/>',{class:' pB40 authority_master'}).append(
        $('<div/>',{class:'mX5 fs102 mT40 bold mY10',text:texts.dashboard.whatsHappening}),
        $('<div/>',{class:'liveActivityLogContainer'})
    )
}
draw_help_articles = function(){
    return $('<div/>',{class:'brdrB2 pB40'}).append(
        $('<div/>',{class:'mX5 fs102 mT40 bold mY10',text:texts.dashboard.help_articles}),
        $('<div/>',{id:'home_help_articles',class:'row wrap alnSH jstfyC'})
    )
}
