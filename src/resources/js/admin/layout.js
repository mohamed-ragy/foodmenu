require("../bootstrap");
window.Echo.connector.pusher.connection.bind('connected', () => {
    window.websocketConnectCheck = true;
    $.ajaxSetup({
        headers: {
            'X-Socket-Id': window.Echo.socketId(),
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content'),
        }
    });
    // window.Echo.join('globalChannel');
});
window.$ = require("jquery");
var $ = require('jquery');
var loadTouchEvents = require('jquery-touch-events');
const { post } = require("jquery");
loadTouchEvents($);


$(document).ready(function(){

    require("./functions.js");
    require ("./usersStatus.js");
    require ("./tickets.js")
    console.log(bugs)
    ////////////////////head////////////////////

    $('.menuItem').on('click',function(e){
        e.stopImmediatePropagation();
        toggleMenu();
    });
    $('#menuTitle').on('click',function(e){
        toggleMenu();
    });

    window.Echo.private('admins').listen('admins',function(r){
        handelAdminsChanel(r);
    })

});
