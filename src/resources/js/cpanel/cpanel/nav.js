$('#navTitle').children().first().attr('src',website.logoUrl)
$('#navTitle').children().eq(1).text(website.domainName.toUpperCase())
//////////////////////////////view////////////////////////
showList = function(list,nav){
    if(window.waitFor_loadWebsiteOrdersAndChats && nav.attr('id') != 'Menu' && nav.attr('id') != 'guideHints' ){return;}
    list.css('display','flex');
    list.css('top',$('.nav').outerHeight())
    nav.addClass('navElementSelected');

}
hideList = function(list,nav){
    nav.removeClass('navElementSelected');
    list.hide();
}
navList = function (list,nav,listElements){
    nav.on('click',function(e){
        e.stopPropagation();
        if($(this).hasClass('navElementSelected')){
            hideList(list,nav);
        }else{
            $('.navElement').removeClass('navElementSelected');
            $('.navList').hide();
            showList(list,nav);
        }
    });
}

$(document).on('click',function(){
    if(
    $('#guideHintsList').is(':hover') ||
    $('#menuOrdersList').is(':hover') ||
    $('#liveChatMsgsList').is(':hover') ||
    $('#notificationsList').is(':hover') ||
    $('#menuList').is(':hover')
    ){return}
    $('.navElement').removeClass('navElementSelected');
    $('.navList').hide();
});



navList($('#notificationsList'),$('#notifications'),$('.notificationContainer'));
navList($('#liveChatMsgsList'),$('#liveChatMsgs'),$('.liveChatMessageContainer'));
navList($('#menuList'),$('#Menu'),$('.menuItem'));
navList($('#menuOrdersList'),$('#menuOrders'),$('.menuOrders-element'));
navList($('#guideHintsList'),$('#guideHints'),$('.guideHintContainer'));


