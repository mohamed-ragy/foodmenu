
hideList = function(){
    $('.navElement').removeClass('navElementSelected');
    $('.navList').addClass('none');
}


$('body').on('click',function(e){
    if($('.navElement:hover').length > 0){return} 
    if($('.navList:hover').length > 0){return} 
    hideList();
});
$('body').on('click','.navElement',function(e){
    if(window.waitFor_loadWebsiteOrdersAndChats && $(this).attr('id') != 'Menu' && $(this).attr('id') != 'guideHints' ){return;}
    hideList();
    $(`#${$(this).attr('navListId')}`).removeClass('none');
    $(`#${$(this).attr('navListId')}`).css('top',$('.nav').outerHeight())
    $(this).addClass('navElementSelected');

})
