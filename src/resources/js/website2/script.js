require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');
window.L = require("leaflet");
window.Echo.connector.pusher.connection.bind('connected', () => {
    window.websocketConnectCheck = true;
    $.ajaxSetup({
        headers: {
            'X-Socket-Id': window.Echo.socketId(),
        }
    });
    userStatusBrowsingPage();
});

let listenToUserChannelName = `guest.${user.id}`
loginCheck ? listenToUserChannelName = `user.${user.id}` : null;
window.websiteChannel = window.Echo.private(`websiteChannel.${website.id}.${listenToUserChannelName}`)
window.globalChannel = window.Echo.join(`globalChannel.${website.id}`)

require("./scripts/objects.js");
require("./scripts/texts.js");
require("./scripts/lang.js");
require("./scripts/functions.js");
require("./scripts/colors.js");
// require("./scripts/userStatus.js");
require("./scripts/diffTime.js");
require("./scripts/tooltip.js");
require("./scripts/auth.js");
require("./scripts/liveChat.js");
require("./scripts/order.js");
require("./scripts/aboutus.js");
require("./scripts/rating.js");
require("./scripts/announcement.js");
require("./scripts/category.js");
require("./scripts/product.js");
require("./scripts/pages.js");

require("./scripts/websiteChannel.js")
require("./scripts/globalChannel.js")

window.Echo.connector.pusher.connection.bind('connected', () => {
    $.ajaxSetup({
        headers: {
            'X-Socket-Id': window.Echo.socketId(),
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        }
    });
    // userStatusBrowsingPage();
});

showFirstPage = () => {
    if(routeName == 'website_home'){
        switchPage($('#home'),showHomePage())
        window.history.replaceState({'page':'home'},``, null);
        // userStatus({'status': 'user_browse_home'});
    }else if(routeName == 'website.profile'){
        if(!loginCheck){
            showPopup($('#login-popup'),$('#login-email'))
        }else{
            switchPage($('#profilepage'),showProfilePage('profile'))
            window.history.replaceState({'page':'profile'},``, null);
            document.title = user.name+' | '+website.restaurantName
        }
        // userStatus({'status': 'user_manageProfile'});
    }else if(routeName == 'website.aboutus'){
        switchPage($('#aboutus'),showAboutUsPage())
        window.history.replaceState({'page':'aboutus'},``, null);
        document.title =  texts.other.aboutUs+' | '+website.restaurantName
        drawMap();
        // window.history.replaceState({'page':'aboutus'},``, null);
        // userStatus({'status': 'user_browse_aboutus'});
    }else if(routeName == 'website.category'){
        switchPage($('#category'),showCategoryPage(pageCategoryId))
        window.history.replaceState({'page':'category','categoryId':pageCategoryId},``, null);
        // userStatus({'status': 'user_browse_category','categoryName':categories.find(item=>item.id == pageCategoryId).name,'categoryId':pageCategoryId});
    }else if(routeName == 'website.allproducts'){
        if(new URLSearchParams(window.location.search).get('tag') != null){
            switchPage($('#allProducts'),showAllproductsPage(new URLSearchParams(window.location.search).get('tag') ))
            window.history.replaceState({'page':'allProducts','iconTag':new URLSearchParams(window.location.search).get('tag') },``, null);
        }else{
            switchPage($('#allProducts'),showAllproductsPage(null))
            window.history.replaceState({'page':'allProducts','iconTag':null},``, null);
        }
    }else if(routeName == 'website.product'){
        switchPage($('#product'),showProductPage(pageProductId))
        window.history.replaceState({'page':'product','productId':pageProductId},``, null);
    }else if(routeName == 'website.privacypolicy'){
        switchPage($('#privacypolicy'))
        window.history.replaceState({'page':'privacypolicy'},``, null);
        document.title =  texts.other.privacypolicy+' | '+website.restaurantName
    }
}
$(document).ready(() =>{
    if(typeof Cookies.get('firstTime') === 'undefined'){
        Cookies.set('firstTime', 'false', { expires:365 });
        website.langPopup ? showPopup($('#language-popup')) : null;
    }
    if(['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform)
          // iPad on iOS 13 detection
          || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    ) {
        iosFix();
    }

    if(website.cookies_msg && typeof Cookies.get('cookies_msg') === 'undefined'){
        showPopup($('#cookiesMsg-popup'))
    }
    fixAllTexts();

})

$('#cookiesMsg-agreeBtn').on('click',()=>{
    Cookies.set('cookies_msg', 'true', { expires:365 });
    hidePopup();
})
