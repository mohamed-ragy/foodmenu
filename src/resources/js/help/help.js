window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');

require('../page_loading.js')
require('./tools/tooltip.js')

require('./process_data.js')

require('./tools/header.js')
require('./tools/mobileNav.js')
require('./tools/nav.js')

require('./open_page.js')
require('./draw_pages/draw_page_home.js')
require('./draw_pages/draw_page_article.js')
require('./draw_pages/draw_page_category.js')

require('./tools/search.js')



$.ajax({
    url:'/api',
    type:'post',
    data:{
        _token:$('meta[name="csrf-token"]').attr('content'),
        getData:true,
    },success:function(r){
        process_data(r);
    }
})
// Cookies.set('visitedArticles','[]');
