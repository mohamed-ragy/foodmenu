window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
require('../page_loading.js')

$.ajax({
    url:'api',
    type:'post',
    data:{
        _token:$('meta[name="csrf-token"]').attr('content'),
        getData:true,
    },success:function(r){
        window.website = r.website;
        
        hide_page_loading();
    }
})
