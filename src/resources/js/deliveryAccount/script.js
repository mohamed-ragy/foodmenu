require("../bootstrap");
window.$ = require("jquery");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.L = require("leaflet");
window.Cookies = require('js-cookie');

    require("../cpanel/tools/loading.js")

    ///////////////////////////IMPORTANT NOTICE///////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    ////// add 1 min heart beat to update delivery last seen /////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    window.globalChannel = window.Echo.join(`globalChannel.${account.website_id}`);
    $('#deliveryName').text(account.deliveryName)
    window.Cookies.set('deliveryLoginEmail',account.deliveryName, { expires: 365 })
    require('./getOrders.js')
    require('./drawOrder.js')
    require('./map.js')
        window.currency = settings.currencies[settings.defaultLanguage]
    getOrders();

})
