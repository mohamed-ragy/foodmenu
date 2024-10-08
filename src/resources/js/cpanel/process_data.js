window.menu = [
    {
        name:'dashboard',
        authority:'',
        position:'top',
        pages:[
            {name:'home',authority:'',lastTab:null},
            {name:'activity_log',authority:'authority_master',lastTab:null},
            {name:'statistics_and_analytics',authority:'authority_master',lastTab:null},
            {name:'restaurant_expenses',authority:'authority_master',lastTab:null},
            {name:'financial_reports',authority:'authority_master',lastTab:null},
            {name:'quick_links',authority:'',lastTab:null},
        ]
    },
    {
        name:'orders',
        authority:'authority_0',
        position:'top',
        pages:[
            {name:'incomplete_orders',authority:'authority_0',lastTab:null},
            {name:'order_history',authority:'authority_0',lastTab:null},
        ],
    },
    {
        name:'products',
        authority:'authority_1',
        position:'top',
        pages:[
            {name:'category_list',authority:'authority_1',lastTab:null},
            {name:'manage_products',authority:'authority_1',lastTab:null},
            {name:'product_reviews',authority:'authority_1',lastTab:null},
        ],
    },
    {
        name:'users',
        authority:'authority_2',
        position:'top',
        pages:[
            {name:'create_new_user',authority:'authority_2',lastTab:null},
            {name:'manage_users',authority:'authority_2',lastTab:null},
            {name:'online_users',authority:'authority_2',lastTab:null},
        ],
    },
    {
        name:'my_staff',
        authority:'authority_master',
        position:'top',
        pages:[
            {name:'sub_accounts',authority:'authority_master',lastTab:null},
            {name:'delivery_accounts',authority:'authority_master',lastTab:null},
        ],
    },
    {
        name:'design',
        authority:'authority_3',
        position:'top',
        pages:[
            {name:'templates',authority:'authority_3',lastTab:null},
            {name:'website_colors',authority:'authority_3',lastTab:null},
            {name:'home_page_sections',authority:'authority_3',lastTab:null},
            {name:'images',authority:'authority_3',lastTab:null},
        ],
    },
    {
        name:'settings',
        authority:'',
        position:'bottom',
        pages:[
            {name:'system',authority:'authority_4',lastTab:null},
            {name:'restaurant_information',authority:'authority_4',lastTab:null},
            {name:'languages',authority:'authority_4',lastTab:null},
            {name:'control_panel_settings',authority:'',lastTab:null},
            {name:'home_delivery_settings',authority:'authority_4',lastTab:null},
            {name:'order_pickup_settings',authority:'authority_4',lastTab:null},
            {name:'dine_in_settings',authority:'authority_4',lastTab:null},
            {name:'promo_codes',authority:'authority_4',lastTab:null},
        ],
    },

    {
        name:'security',
        authority:'authority_master',
        position:'bottom',
        pages:[
            {name:'email_address',authority:'authority_master',lastTab:null},
            {name:'password',authority:'authority_master',lastTab:null},
            {name:'phone_number',authority:'authority_master',lastTab:null},
        ],
    },
    {
        name:'support',
        authority:'authority_master',
        position:'bottom',
        pages:[
            {name:'submit_a_help_ticket',authority:'authority_master',lastTab:null},
            {name:'ticket_history',authority:'authority_master',lastTab:null},
        ],
    }
];
process_data = function(){
    account.helpTips == null ? account.helpTips = [] : null;
    account.authorities = account.authorities.split('')
    website.guests = [];
    website.users = [];
    website.todayOrders = [];
    website.orderHistory = [];
    website.incompleteOrders = [];
    website.notifications = [];
    website.notifications_unseen = [];
    website.imgs = [];
    website.imgs_storage = null;
    ///
    window.globalChannelConnected = false;
    window.website_temp = JSON.parse(JSON.stringify(website));
    window.settings_temp = JSON.parse(JSON.stringify(settings));
    window.langTxts = [];
    window.langTxts_temp = [];
    window.promocodes = [];
    window.promocodes_temp = [];
    window.online = [];
    window.unSeenChats_users = [];
    window.unSeenChats_guests = [];
    window.chatBoxes = {users:[],guests:[]}
    window.chatMsgs = {}
    window.usersTypingTimeouts = [];
    window.sendingMsgs = {};
    window.getMoreChats_users = true;
    window.getMoreChats_guests = true;
    window.noMoreChats_users = false;
    window.noMoreChats_guests = false;
    window.getProductReviewsSkip = 0;
    window.getMoreProductsReviews = true;
    window.noMoreProductReviews = false;
    window.product_reviews = [];
    window.activity_log = [];
    window.statistics = [];
    window.guideAlertsOBJ = [];
    window.receiptTxt = null;
    window.placeOrder = {
        isGuest:false,
        user_id:null,
        userName:null,
        phoneNumber:null,
        address:null,
        lat:null,
        lng:null,
        type:'2',
        notice:'',
        paymentMethod:null,
        items:[],
        deliveryCost:parseFloat(website.deliveryCost),
        discount:0,
    }
    window.pageNotifications = {
        titleAlert:'',
        notifications:0,
        chat:{
            users:0,
            guests:0,
        },
        orders:{
            pending:0,
            accepted:0,
            withDelivery:0,
            readyToPickup:0,
            diningIn:0,
        },
    }
    window.imgs_getMore = true;
    window.imgs_noMore = false;
    window.imgBrowser = {opened:false,title:'',imgBrowserClass:'',pexels_search_results:[],pexels_search_page:1}
    window.share = {item:null,type:null}
    window.plans = foodMenuData.plans;
    ////////////
    window.page = {}
    window.popupPage = {}
    window.previewImg = {}
    //////

    ///////
    window.promocodesFirstLoad = false;
    window.countriesAndTimezonesFirstLoad = false;
    window.notificationsFirstLoad = false;
    window.getFirstChatsCheck = false;
    window.incompleteOrdersCheck = false;
    window.waitFor_loadWebsiteOrdersAndChats = true;
    window.toolTipDisabledCheck = false;
    ///
    if(settings_temp.tooltip == false){
        window.toolTipDisabledCheck = true;
    }
    for(const key in website.workingDays_delivery){
        website.workingDays_delivery[key]['working'] == true ? website.workingDays_delivery[key]['working'] = 1 : website.workingDays_delivery[key]['working'] == false ? website.workingDays_delivery[key]['working'] = 0 : null;
        website.workingDays_delivery[key]['working24'] == true ? website.workingDays_delivery[key]['working24'] = 1 : website.workingDays_delivery[key]['working24'] == false ? website.workingDays_delivery[key]['working24'] = 0 : null;
    }
    for(const key in website.workingDays_pickup){
        website.workingDays_pickup[key]['working'] == true ? website.workingDays_pickup[key]['working'] = 1 : website.workingDays_pickup[key]['working'] == false ? website.workingDays_pickup[key]['working'] = 0 : null;
        website.workingDays_pickup[key]['working24'] == true ? website.workingDays_pickup[key]['working24'] = 1 : website.workingDays_pickup[key]['working24'] == false ? website.workingDays_pickup[key]['working24'] = 0 : null;
    }
    for(const key in website.workingDays_dinein){
        website.workingDays_dinein[key]['working'] == true ? website.workingDays_dinein[key]['working'] = 1 : website.workingDays_dinein[key]['working'] == false ? website.workingDays_dinein[key]['working'] = 0 : null;
        website.workingDays_dinein[key]['working24'] == true ? website.workingDays_dinein[key]['working24'] = 1 : website.workingDays_dinein[key]['working24'] == false ? website.workingDays_dinein[key]['working24'] = 0 : null;
    }
    for(const key in website.languages){
        if(website.languages[key].receiptDefault){
            website.currency = website.currencies[website.languages[key].code];
        }
    }
    for(const key in account.helpTips){
        account.helpTips[key].is_pined == '1' ? account.helpTips[key].is_pined = 1 : account.helpTips[key].is_pined == '0' ? account.helpTips[key].is_pined = 0 : null;
        account.helpTips[key].rateUp == '1' ? account.helpTips[key].rateUp = 1 : account.helpTips[key].rateUp == '0' ? account.helpTips[key].rateUp = 0 : null;
        account.helpTips[key].rateDown == '1' ? account.helpTips[key].rateDown = 1 : account.helpTips[key].rateDown == '0' ? account.helpTips[key].rateDown = 0 : null;
        account.helpTips[key].min == '1' ? account.helpTips[key].min = 1 : account.helpTips[key].min == '0' ? account.helpTips[key].min = 0 : null;
    }
    window.Cookies.set('CpanelLoginEmail',account.email, { expires: 365 })
    window.Cookies.set('darkMode',settings.darkMode, { expires: 365 })

    ///

    //
    window.guideHints = new guideHintsClass();
    window.guideHints.all();

    $('#statusBar').text(`${website.domainName.charAt(0).toUpperCase()}${website.domainName.slice(1)} ${texts.cpanel.public.cpanel}`)

    $('#LiveChat-goInvisible').prop('checked',account.isInvisible);
    if(settings.muteChat == 1){
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').addClass('ico-check1').removeClass('ico-check0')
    }else{
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').removeClass('ico-check1').addClass('ico-check0')
    }
    $('#LiveChat-chatPopup').prop('checked',settings_temp.chatPopup);
    drawSideMenu();

    if(website.subscription_status != 'trialing' && website.subscription_status != 'past_due' && website.subscription_status != 'active'){
        $('.paymentFailAnn').removeClass('none').addClass('paymentFailAnn_red');
        $('#paymentFailAnnTxt').text(texts.cpanel.public.siteoffpaymentFail)
    }else if(website.payment_methods_count < 1 && (website.subscription_end_period * 1000 ) < Date.parse(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)) ){
        let nextRenew = new Date(website.subscription_end_period * 1000);
        nextRenew = nextRenew.toLocaleString(account.language,{ month: 'long', day: 'numeric',year:'numeric'})
        $('.paymentFailAnn').removeClass('none').addClass('paymentFailAnn_orange');
        $('#paymentFailAnnTxt').text(`${texts.cpanel.public.renewSoonNoPaymentMethod1} ${nextRenew}. ${texts.cpanel.public.renewSoonNoPaymentMethod2}`)
    }else if( website.subscription_status == 'past_due' ){
        $('.paymentFailAnn').removeClass('none').addClass('paymentFailAnn_orange');
        $('#paymentFailAnnTxt').text(`${texts.cpanel.public.renewFailSiteOffSoon}`)
    }
    if(!account.is_master){$('.paymentFailAnn').hide();}

    drawDownloadQrcode();
    email_address_unsave_check();
    phone_number_unsave_check();
    loadViewSettings();
    loadGuideModeSettings();
    diffTimeInterval();
    timePickerAMPMRest();
}
