
hideList = function(){
    $('.navElement').removeClass('navElementSelected');
    $('.navList').addClass('none');
}


$(document).on('click',function(e){
    // e.stopImmediatePropagation();
    if(
    $('#guideHintsList').is(':hover') ||
    $('#menuOrdersList').is(':hover') ||
    $('#liveChatMsgsList').is(':hover') ||
    $('#notificationsList').is(':hover') ||
    $('#menuList').is(':hover')
    ){return}
    hideList();
});
$('html,body').on('click','.navElement',function(e){
    e.stopImmediatePropagation();
    if(window.waitFor_loadWebsiteOrdersAndChats && $(this).attr('id') != 'Menu' && $(this).attr('id') != 'guideHints' ){return;}
    hideList();
    $(`#${$(this).attr('navListId')}`).removeClass('none');
    $(`#${$(this).attr('navListId')}`).css('top',$('.nav').outerHeight())
    $(this).addClass('navElementSelected');

})
