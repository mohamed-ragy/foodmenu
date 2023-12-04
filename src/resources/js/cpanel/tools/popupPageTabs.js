$('html,body').on('click','.popupPageTab',function(e){
    // e.stopImmediatePropagation();
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

$('html,body').on('click','.popupPageTabArrowLeft',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.popupPageTabs').find('.popupPageTab_selected').prev().trigger('click');

})

$('html,body').on('click','.popupPageTabArrowRight',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.popupPageTabs').find('.popupPageTab_selected').next().trigger('click');

})
