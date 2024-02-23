require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.L = require("leaflet");
window.Cookies = require('js-cookie');
window.QRCode = require('davidshimjs-qrcodejs');




require("./process_data.js");//done//
require("./startup.js");//done//

require("./drawPages.js");//done//

require("./functions");//done//

require("./cpanel/links.js");//done//
require("./cpanel/guideAlerts.js");//done//
require("./cpanel/notifications.js");//done//
require("./cpanel/globalChannel.js");//done//
require("./cpanel/liveChat.js");//done//
require("./cpanel/menu");//done//
require("./cpanel/popupPage.js");//done
require("./cpanel/nav");//done//
require("./cpanel/autoHelp");//done

require("./tools/saveChecker.js");//done//
require("./tools/alerts");//done//
require("./tools/reportBug");//done//
require("./tools/loading");//done//
require("./tools/popup");//done//
require("./tools/popupId.js");//done//
require("./tools/sharePopup");//done//
require("./tools/pageTabs.js");//done//
require("./tools/popupPageTabs.js");//done//
require("./tools/tooltip.js");//done//

require("./pages.js");//done//

require("./tools/form/inputList.js");//done//
require("./tools/form/inputTxt.js");//done//
require("./tools/form/textArea.js");//done//
require("./tools/form/timePicker.js");//done//
require("./tools/form/btn.js");//done//
require("./tools/form/checkbox.js");//done//
require("./tools/form/datePicker.js");//done//

$.ajax({
    url:'dashboard',
    type:'put',
    data:{_token:$('meta[name="csrf-token"]').attr('content'),firstLoad:true},
    success:function(r){
        window.account = r.account;
        window.website = r.website;
        window.settings = r.settings;
        window.foodMenuData = r.foodMenuData;
        window.autoHelp_text = r.autoHelp_text;
        window.texts = r.texts;
        startup();
    }
})
setInterval(function(){
    $.ajax({
        url:'notifications',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            lastSeen:true,
        }
    });
},60000 * 5);
