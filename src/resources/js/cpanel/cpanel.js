require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.L = require("leaflet");
window.Cookies = require('js-cookie');
window.QRCode = require('davidshimjs-qrcodejs');


window.Echo.connector.pusher.connection.bind('connected', () => {
    window.globalChannelCheck = true;
    $.ajaxSetup({
        headers: {
            'X-Socket-Id': window.Echo.socketId(),
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content'),
        },
        error:function(jqXHR, textStatus, errorThrown){
            // console.log(jqXHR)
            if(jqXHR.status == 401){
                //Unauthorized
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 402){
                //Payment Required
                showAlert('error',jqXHR.responseJSON.message,6000,true)
            }
            else if(jqXHR.status == 403){
                //Forbidden
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 404){
                // Not Found
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 419){
                // Page Expired
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 429){
                //Too Many Requests
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 500){
                //Internal Server Error
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 503){
                //Service Unavailable
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
        }
    });
});

window.globalChannel = window.Echo.join(`globalChannel.${website.id}`);
window.cpanelChannel = window.Echo.private(`cpanelChannel.${website.id}`);


require("./objects");

require("./drawPages.js");

require("./functions");
require("./cpanel/links.js"); //(need to finsih click to take to renew event)

require("./cpanel/guideAlerts.js");// website switch need to be done -- logo and icon if it will be null after editor
require("./cpanel/notifications.js");
require("./cpanel/globalChannel.js");
require("./cpanel/liveChat.js");//done
require("./cpanel/menu");
require("./cpanel/popupPage.js");
require("./cpanel/nav");
require("./cpanel/autoHelp");

require("./tools/saveChecker.js");
require("./tools/alerts");
require("./tools/reportBug");
require("./tools/loading");
require("./tools/popup");
require("./tools/popupId.js");
require("./tools/sharePopup");//done
require("./tools/pageTabs.js");
require("./tools/popupPageTabs.js");
require("./tools/tooltip.js");



require("./pages/dashboard/home.js");
require("./pages/dashboard/activityLog.js");//need to finish the live activity log
require("./pages/dashboard/statistics.js");
require("./pages/dashboard/restaurantExpenses.js");//done
require("./pages/dashboard/financialReports.js");//done

require("./pages/security/email.js");//done
require("./pages/security/password.js");//done
require("./pages/security/phone.js");//done

require("./pages/orders/functions.js");//done
require("./pages/orders/addItem.js");//done
require("./pages/orders/placeNewOrder.js");//done
require("./pages/orders/orderHistory.js");//done
require("./pages/orders/incompleteOrders.js");//done
require("./pages/orders/orderActions.js");//done
require("./pages/orders/orderActivities.js");//done

require("./pages/products/createNewProduct.js");//done
require("./pages/products/manageProducts.js");//done
require("./pages/products/productReviews.js");//done

require("./pages/users/functions.js");//done
require("./pages/users/manageUsers.js");//done
require("./pages/users/onlineUsers.js");//done
require("./pages/users/createNewUser.js");//done

require("./pages/staff/deliveryAccounts.js");//done
require("./pages/staff/subAccounts.js");//done

require("./pages/categories/categoriesList.js");//done
require("./pages/categories/createNewCategory.js");//done

require("./pages/design/templates.js");
require("./pages/design/websiteColors");
require("./pages/design/homePageSections");
require("./pages/design/images.js");//done

require("./pages/settings/system.js");//done(need to move website switch and url to home)
require("./pages/settings/restaurantInfo.js");//done
require("./pages/settings/lang.js");//done
require("./pages/settings/cpanelSettings.js");//done
require("./pages/settings/services.js");//done
require("./pages/settings/homeDelivery.js");//done
require("./pages/settings/orderPickup.js");//done
require("./pages/settings/dineInSettings.js");//done
require("./pages/settings/promocodes.js");//done

require("./pages/support/supmitTicket.js");//done
require("./pages/support/ticketsHistory.js");//done

require("./form/inputList");//done
require("./form/inputTxt");//done
require("./form/textArea");//done
require("./form/timePicker.js");//done
require("./form/btn.js");
require("./form/checkbox.js");
require("./form/datePicker");


$('#body').height(window.innerHeight + 'px');
$(window).resize(function(){$('#body').height(window.innerHeight + 'px');});

$('#cpanelLoading').css('transition-duration','800ms');
$('#cpanelLoading').css('opacity',0);
setTimeout(()=>{
    $('#cpanelLoading').hide();
    $('#cpanelLoading').css('transition-duration','0ms');
    loadPinnedHelp();

},510)

websocketConnectCheckIntrval = setInterval(function(){
    if(window.globalChannelCheck == true){
        clearInterval(websocketConnectCheckIntrval);
        loadWebsiteOrdersAndChats();
    }
},200)

$(document).ajaxError(function myErrorHandler(event, xhr, ajaxOptions, thrownError) {
    // showAlert('error',texts.cpanel.public.connectionError,4000,true);
});

window.Echo.connector.pusher.connection.bind('state_change', (states) => {
    console.log(states)
    clearInterval(websocketConnectCheckIntrval);
    if(states.current == 'connected'){
        websocketConnectCheckIntrval = setInterval(function(){
            if(window.globalChannelCheck == true){
                clearInterval(websocketConnectCheckIntrval);
                loadWebsiteOrdersAndChats();
                // closePopup()
            }
        },200)
    }
    if(states.current == 'connecting'){
        window.globalChannelCheck == false
        $('#connectionLost-popupMsg').text(texts.cpanel.public.connectionlost2)
        showPopup('connectionLost')
        window.waitFor_loadWebsiteOrdersAndChats = true;
    }
    if(states.current == 'unavailable' || states.current == 'failed'){
        window.globalChannelCheck == false
        $('#connectionLost-popupMsg').text(texts.cpanel.public.connectionlost3)
        showPopup('connectionLost')
        window.waitFor_loadWebsiteOrdersAndChats = true;
    }
});

////////////////////////////////////////////////////

window.Cookies.set('CpanelLoginEmail',account.email, { expires: 365 })
window.Cookies.set('darkMode',settings.darkMode, { expires: 365 })



let params = new URLSearchParams(window.location.search)
// window.page.page = 'home'
let pageParam = 'home';
let pageTabParam = null;
params.get('page') != null ? pageParam = params.get('page') : null;
params.get('tab') != null ? pageTabParam = params.get('tab') : null;
let keysObj = {};
switch(pageParam){
    case 'statistics_and_analytics':
        keysObj.year1 = params.get('year1')
        keysObj.month1 = params.get('month1')
        keysObj.day1 = params.get('day1')
        keysObj.period = params.get('period')
        keysObj.compare = params.get('compare')
        keysObj.year2 = params.get('year2')
        keysObj.month2 = params.get('month2')
        keysObj.day2 = params.get('day2')
    break;
    case 'activity_log':
        keysObj.year = params.get('year') ?? new Date().getFullYear();
        keysObj.month = params.get('month') ?? parseInt(new Date().getMonth() ) + 1;
        keysObj.day = params.get('day') ?? new Date().getDate();
    break;
    case 'order_history':
        keysObj.orderHistory_page = params.get('orderHistory_page')
        keysObj.orderBy = params.get('orderBy')
        keysObj.sort = params.get('sort')
        keysObj.orderNumber = params.get('orderNumber')
        keysObj.dinedIn = params.get('dinedIn')
        keysObj.pickedUp = params.get('pickedUp')
        keysObj.delivered = params.get('delivered')
        keysObj.canceled = params.get('canceled')
        keysObj.user = params.get('user')
        keysObj.byUsers = params.get('byUsers')
        keysObj.byGuests = params.get('byGuests')
    break;
    case 'incomplete_orders':
        keysObj.order_by = params.get('order_by') ?? 'placed_at';
        keysObj.sort = params.get('sort') ?? 'desc';
    break;
    case 'manage_users':
        keysObj.user = params.get('user')
    break;
    case 'manage_products':
        keysObj.category = params.get('category')
    break;
    case 'product_reviews':
        keysObj.product = params.get('product')
        keysObj.user = params.get('user')
        keysObj.byUsers = params.get('byUsers')
        keysObj.byGuests = params.get('byGuests')
        keysObj.star1 = params.get('star1')
        keysObj.star2 = params.get('star2')
        keysObj.star3 = params.get('star3')
        keysObj.star4 = params.get('star4')
        keysObj.star5 = params.get('star5')
    break;
}
showPage(pageParam,pageTabParam,keysObj).then(()=>{
    pushHistory(false);
    params.get('tab') != null ? $(`.pageTab[tab="${params.get('tab')}"]`).trigger('click') : null;
    // closePopup();
    authorities();
    // switch(window.page.page){
    //     case 'website_colors':
    //         if(window.colorsFirstLoad == false && account.authorities[3] == true){
    //             getColors();
    //         }
    //     break;
    //     case 'templates':
    //         if(window.colorsFirstLoad == false && account.authorities[3] == true){
    //             getColors();
    //         }
    //     break;
    //     case 'promo_codes':
    //         if(window.promocodesFirstLoad == false && account.authorities[4] == true){
    //             getPromocodes();
    //         }
    //     break;
    //     case 'system':
    //         if(window.countriesAndTimezonesFirstLoad == false && account.authorities[4] == true){
    //             getCountriesTimezones();
    //         }
    //     break;
    //     case 'languages':
    //         if(window.countriesAndTimezonesFirstLoad == false && account.authorities[4] == true){
    //             getCountriesTimezones();
    //         }
    //     break;
    //     case 'phone_number':
    //         if(window.countriesAndTimezonesFirstLoad == false && account.authorities[4] == true){
    //             getCountriesTimezones();
    //         }
    //     break;
    //     case 'manage_products':
    //         if(account.authorities[1] == true){
    //             if(params.get('category') == null || params.get('category') == 'allproducts'){
    //                 $('#manageProducts-selectCategory').attr('key','allproducts').val(texts.products.allproducts)
    //                 window.page.category = 'allproducts';
    //                 drawManageProductCards('allproducts');
    //             }else if(params.get('category') == 'uncategorized'){
    //                 $('#manageProducts-selectCategory').attr('key','allproducts').val(texts.products.uncategorized)
    //                 window.page.category = 'uncategorized';
    //                 drawManageProductCards('uncategorized');
    //             }else{
    //                 $('#manageProducts-selectCategory').attr('key',params.get('category')).val(params.get('category'))
    //                 window.page.category = params.get('category');
    //                 drawManageProductCards(params.get('category'));
    //             }
    //         }else{
    //             window.page.page = 'home'
    //         }
    //     break;
    //     case 'manage_users':
    //         if(account.authorities[2] == true){
    //             if(params.get('user') != null){
    //                 window.page.user = params.get('user');
    //                 $('#manageUsers-usersInputList').attr('key',window.page.user);
    //                 $('#manageUsers-loadUserBtn').trigger('click');
    //             }
    //         }else{
    //             window.page.page = 'home'
    //         }
    //     break;
    //     case 'create_new_user':
    //         setTimeout(()=>{
    //             window.createUserMap.invalidateSize()
    //         },500)
    //     break;
    //     case 'product_reviews':
    //         if(account.authorities[1] == true){
    //             window.findReviewFilters = {
    //                 product:params.get('product') ?? 'allproducts',
    //                 userId:params.get('userId') ?? '',
    //                 userName:params.get('userName') ?? '',
    //                 users:params.get('users') ?? 1,
    //                 guests:params.get('guests') ?? 1,
    //                 star1:params.get('star1') ?? 1,
    //                 star2:params.get('star2') ?? 1,
    //                 star3:params.get('star3') ?? 1,
    //                 star4:params.get('star4') ?? 1,
    //                 star5:params.get('star5') ?? 1,
    //             }
    //             setFindReviewFilters();
    //             findReview();
    //         }else{
    //             window.page.page = 'home'
    //         }
    //     break;
    //     case 'incomplete_orders':
    //         if(account.authorities[0] == true){
    //             if(window.incompleteOrdersCheck){
    //                 if(params.get('status') == null){
    //                     window.page.status = $('.IncompleteOrderTypeElem_selected').attr('orderStatus');
    //                     new orders().incompleteOrders(window.page.status);
    //                 }else{
    //                     window.page.status = params.get('status');
    //                     new orders().incompleteOrders(window.page.status);
    //                 }
    //             }else{
    //                 let incompleteOrdersCheckFirstLoadInterval = setInterval(()=>{
    //                     if(window.incompleteOrdersCheck){
    //                         clearInterval(incompleteOrdersCheckFirstLoadInterval);
    //                         if(params.get('status') == null){
    //                             window.page.status = $('.IncompleteOrderTypeElem_selected').attr('orderStatus');
    //                             new orders().incompleteOrders(window.page.status);
    //                         }else{
    //                             window.page.status = params.get('status');
    //                             new orders().incompleteOrders(window.page.status);
    //                         }
    //                         pushHistory(false);
    //                     }
    //                 },500)
    //             }

    //         }else{
    //             window.page.page = 'home'
    //         }
    //     break;
    //     case 'order_history':
    //         if(account.authorities[0] == true){
    //             if(params.get('orderNumber') != null && params.get('orderNumber') != ''){
    //                 window.orderHistoryFilters = {
    //                     dineIn:1,
    //                     delivered:1,
    //                     pickedUp:1,
    //                     canceled:1,
    //                     users:1,
    //                     guests:1,
    //                     userName:'',
    //                     userId:'',
    //                     orderNumber:params.get('orderNumber') ,
    //                 }
    //             }else if(params.get('userId')!= null && params.get('userId') != ''){
    //                 window.orderHistoryFilters = {
    //                     dineIn:params.get('dineIn') ?? 1,
    //                     delivered:params.get('delivered') ?? 1,
    //                     pickedUp:params.get('pickedUp') ?? 1,
    //                     canceled:params.get('canceled') ?? 1,
    //                     users:0,
    //                     guests:0,
    //                     userName:params.get('userName'),
    //                     userId:params.get('userId'),
    //                     orderNumber:'',
    //                 }
    //                 setOrderHistoryFilters();
    //                 findOrders();
    //             }else{
    //                 window.orderHistoryFilters = {
    //                     dineIn:params.get('dineIn') ?? 1,
    //                     delivered:params.get('delivered') ?? 1,
    //                     pickedUp:params.get('pickedUp') ?? 1,
    //                     canceled:params.get('canceled') ?? 1,
    //                     users:params.get('users') ?? 1,
    //                     guests:params.get('guests') ?? 1,
    //                     userName:'',
    //                     userId:'',
    //                     orderNumber: '',
    //                 }
    //             }
    //             setOrderHistoryFilters();
    //             findOrders();
    //         }else{
    //             window.page.page = 'home'
    //         }

    //     break;
    //     case 'financial_reports':
    //         if(account.is_master == true){
    //             $('#financialReports-reportsContainer').text('')
    //             getfinancialReports();
    //         }
    //     break;
    //     case 'statistics_and_analytics':
    //         if(window.yesterdayStatisticsFirstLoad == false){
    //             window.yesterdayStatisticsFirstLoad = true;
    //             $('#statistics-loadStatisticsBtn').trigger('click');
    //         }
    //     break;
    //     case 'activity_Log':
    //         // if(window.activityLogFirstLoad == false){
    //         //     window.activityLogFirstLoad = true;
    //         //     $('#activityLog-datePicker-findBtn').trigger('click');
    //         // }
    //     break;

    //     default :
    //     let cpmenu = ['home','activity_log','statistics_and_analytics','restaurant_expenses','financial_reports','email_address','password','phone_number','sub_accounts','incomplete_orders','order_history','category_list','manage_products','product_reviews','create_new_user','manage_users','online_users','delivery_accounts','templates','website_colors','home_page_sections','images','system','restaurant_information','languages','control_panel_settings','home_delivery_settings','order_pickup_settings','dine_in_settings','promo_codes','submit_a_help_ticket','ticket_history','Release-Notes'];

    //     !cpmenu.includes(window.page.page) ? window.page.page = 'home' : null;
    // }
},(error)=>{
    if(error == 1){
        setTimeout(function(){
            showPopup('accessDenied');
        },1000);
    }else if(error == 2){
        pushHistory(false);
    }
});

if(params.get('popupPage') != null){
    let keysObj = {};
    switch(params.get('popupPage')){
        case 'ticket_browser':
            keysObj.ticket = params.get('ticket')
        break;
        case 'edit_language_options':
            keysObj.language = params.get('language')
        break;
        case 'edit_language_texts':
            keysObj.language = params.get('language')
        break;
        case 'working_hours':
            keysObj.day = params.get('day');
            keysObj.service = params.get('service');
        break;
        case 'manage_promo_code':
            keysObj.promocode = params.get('promocode')
        break;
        case 'user':
            keysObj.user = params.get('user')
        break;
        case 'delivery_account':
            keysObj.delivery = params.get('delivery')
        break;
        case 'sub_account':
            keysObj.subaccount = params.get('subaccount')
        break;
        case 'manage_sub_account':
            keysObj.subaccount = params.get('subaccount')
        break;
        case 'category':
            keysObj.category = params.get('category')
        break;
        case 'edit_category':
            keysObj.category = params.get('category')
        break;
        case 'product':
            keysObj.product = params.get('product')
        break;
        case 'edit_product':
            keysObj.product = params.get('product')
        break;
        case 'manage_product_options':
            keysObj.product = params.get('product')
        break;
        case 'review':
            keysObj.review = params.get('review');
        break;
        case 'order':
            keysObj.order = params.get('order')
        break;
    }
    showPopupPage(params.get('popupPage'),keysObj).then(()=>{
        // window.popupPage.popupPage = params.get('popupPage')
        // closePopup();
        authorities();
        setTimeout(function(){
            pushHistory(false);
        },200)
    },(error)=>{
        if(error == 1){
            popupPageClose(true);
            setTimeout(function(){
                showPopup('accessDenied');
                popupPageClose(true);
            },1000)
        }else if(error == 2){

        }else if(error == 3){
            popupPageClose(false);
        }
    });
    // switch(params.get('popupPage')){
    //     case 'ticket_browser':
    //         if(account.is_master == true){
    //             window.popupPage.ticket = params.get('ticket')
    //             openHelpTicket(params.get('ticket'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Restaurant-Location':
    //         if(account.authorities[4] == true){
    //             drawMap();
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Create-Promocode':
    //         if(account.authorities[4] == true){
    //             resetCreateNewPromocode();
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Edit-Promocode':
    //         if(account.authorities[4] == true){
    //             getPromocodes(function(){
    //                 window.popupPage.popupPage = params.get('popupPage')
    //                 showPopupPage(params.get('popupPage'));
    //                 window.popupPage.promocode = params.get('promocode')
    //                 $('#editPromocodeHiddenId').val(params.get('promocode'))
    //                 setEditPromocode(params.get('promocode'));
    //                 pushHistory(false);
    //             })
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Language-Text':
    //         if(account.authorities[4] == true){
    //             window.popupPage.lang = params.get('lang')
    //             getLangText(params.get('lang'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'DineIn-WorkingDays':
    //         if(account.authorities[4] == true){
    //             window.popupPage.day = params.get('day')
    //             setDineInDayWorkingHours(params.get('day'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Pickup-WorkingDays':
    //         if(account.authorities[4] == true){
    //             window.popupPage.day = params.get('day')
    //             setPickupDayWorkingHours(params.get('day'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Delivery-WorkingDays':
    //         if(account.authorities[4] == true){
    //             window.popupPage.day = params.get('day')
    //             setDeliveryDayWorkingHours(params.get('day'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Website-Intro' :
    //         if(account.authorities[3] == true){
    //             website.templateData.intro == true ? $('#Website-Intro').find('.homePageSectionCardWarning').hide() : $('#Website-Intro').find('.homePageSectionCardWarning').show()
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Website-SlideShow' :
    //         if(account.authorities[3] == true){
    //             website.templateData.slideShow == true ? $('#Website-SlideShow').find('.homePageSectionCardWarning').hide() : $('#Website-SlideShow').find('.homePageSectionCardWarning').show()
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Website-Info' :
    //         if(account.authorities[3] == true){
    //             website.templateData.info == true ? $('#Website-Info').find('.homePageSectionCardWarning').hide() : $('#Website-Info').find('.homePageSectionCardWarning').show()
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Website-OurStory' :
    //         if(account.authorities[3] == true){
    //             website.templateData.ourStory == true ? $('#Website-OurStory').find('.homePageSectionCardWarning').hide() : $('#Website-OurStory').find('.homePageSectionCardWarning').show()
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Website-Gallery' :
    //         if(account.authorities[3] == true){
    //             website.templateData.gallery == true ? $('#Website-Gallery').find('.homePageSectionCardWarning').hide() : $('#Website-Gallery').find('.homePageSectionCardWarning').show()
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Edit-Category':
    //         if(account.authorities[1] == true){
    //             window.popupPage.editcategory = params.get('editcategory')
    //             setEditCategory(params.get('editcategory'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Product':
    //         if(account.authorities[1] == true){
    //             window.popupPage.product = params.get('product');
    //             drawProductPopupPage(params.get('product'))
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Edit-Product':
    //         if(account.authorities[1] == true){
    //             window.popupPage.editproduct = params.get('editproduct')
    //             setEditProduct(params.get('editproduct'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Product-Options':
    //         if(account.authorities[1] == true){
    //             window.popupPage.editProductOptions = params.get('editProductOptions')
    //             setEditProductOptions(params.get('editProductOptions'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'User':
    //         if(account.authorities[2] == true){
    //             window.popupPage.user = params.get('user');
    //             showUserPopupPage(params.get('user'));
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Edit-Delivery-Account':
    //         if(account.authorities[2] == true){
    //             window.popupPage.deliveryAccount = params.get('deliveryAccount');
    //             setEditDeliveryAccount(window.popupPage.deliveryAccount);
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Order':
    //         if(account.authorities[0] == true){
    //             window.popupPage.order = params.get('order');
    //             new orders(window.popupPage.order).openOrder();
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }

    //     break;
    //     case 'Sub-Account':
    //         if(account.is_master == true){
    //             window.popupPage.account = params.get('account');
    //             setManageSubAccount(window.popupPage.account);
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    //     case 'Review' :
    //         if(account.authorities[1] == true){
    //             window.popupPage.review = params.get('review');
    //             drawProductReviewPage(window.popupPage.review);
    //         }else{
    //             window.popupPage.popupPage = '';
    //         }
    //     break;
    // }
}
if(params.get('previewImg') != null){
    window.previewImg.previewImg = params.get('previewImg');
    setImgPreview(params.get('previewImg'));
}
