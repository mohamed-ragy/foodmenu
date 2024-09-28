$('body').on('click','.popupPageTab',function(e){
    $(this).closest('.popupPageTabs').find('.popupPageTab').removeClass('popupPageTab_selected');
    $(this).addClass('popupPageTab_selected');

    $(`.popupPageTabContainer[tab="${$(this).attr('tab')}"]`).parent().find('.popupPageTabContainer').removeClass('popupPageTabContainer_selected');
    $(`.popupPageTabContainer[tab="${$(this).attr('tab')}"]`).addClass('popupPageTabContainer_selected');

    $(this).closest('.popupPageTabs').find('.popupPageTabContainer').scrollLeft($(this).offset().left)
    $(this).closest('.popupPageTabs').find('.popupPageTabsContainer').animate({
        'scrollLeft':$(this).offset().left - 40 - $(this).closest('.popupPageTabs').find('.popupPageTabsContainer').offset().left + $(this).closest('.popupPageTabs').find('.popupPageTabsContainer').scrollLeft(),
    },300,'swing');
})

fixpopupPageTabsArrows = function(){
    $('.popupPageTabsContainer').each(function(key,val){
        if(val.offsetWidth >= val.scrollWidth){
            $(this).closest('.popupPageTabs').find('.popupPageTabArrow').addClass('none');
        }else{
            $(this).closest('.popupPageTabs').find('.popupPageTabArrow').removeClass('none');
        }
})

}
$(window).resize(function(){
    fixpopupPageTabsArrows();
})

$('body').on('click','.popupPageTabArrowLeft',function(e){
    $(this).closest('.popupPageTabs').find('.popupPageTab_selected').prev().trigger('click');

})

$('body').on('click','.popupPageTabArrowRight',function(e){
    $(this).closest('.popupPageTabs').find('.popupPageTab_selected').next().trigger('click');

})
