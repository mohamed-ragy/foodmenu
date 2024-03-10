require("../bootstrap");
window.$ = require("jquery");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.L = require("leaflet");
window.Cookies = require('js-cookie');

require("../cpanel/tools/loading.js")

window.globalChannel = window.Echo.join(`globalChannel.${account.website_id}`);
$('#deliveryName').text(account.deliveryName)
window.Cookies.set('deliveryLoginEmail',account.deliveryName, { expires: 365 })
require('./getOrders.js')
require('./drawOrder.js')
require('./map.js')
window.currency = '';
for(const key in settings.languages){
    if(settings.languages[key].websiteDefault == 1){
        console.log(settings.languages[key].code)
        window.currency = settings.currencies[settings.languages[key].code];
    }
}
getOrders();

