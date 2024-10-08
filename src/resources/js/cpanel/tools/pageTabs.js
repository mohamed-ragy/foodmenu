$('body').on('click','.pageTab',function(e){
    for(const key in window.menu){
        for(const key2 in window.menu[key].pages){
            if(window.menu[key].pages[key2].name == window.history.state.page){
                window.menu[key].pages[key2].lastTab = $(this).attr('tab')
            }
        }
    }
    $(this).closest('.pageTabs').find('.pageTab').removeClass('pageTab_selected');
    $(this).addClass('pageTab_selected');

    $(`.pageTabContainer[tab="${$(this).attr('tab')}"]`).parent().find('.pageTabContainer').removeClass('pageTabContainer_selected');
    $(`.pageTabContainer[tab="${$(this).attr('tab')}"]`).addClass('pageTabContainer_selected');

    $(this).closest('.pageTabs').find('.pageTabContainer').scrollLeft($(this).offset().left)
    $(this).closest('.pageTabs').find('.pageTabsContainer').animate({
        'scrollLeft':$(this).offset().left - 40 - $(this).closest('.pageTabs').find('.pageTabsContainer').offset().left + $(this).closest('.pageTabs').find('.pageTabsContainer').scrollLeft(),
    },300,'swing');

    window.page.tab = $(this).attr('tab');
    setTimeout(function(){
        pushHistory(false);
    },400)
})

fixPageTabsArrows = function(){
    $('.pageTabsContainer').each(function(key,val){
        if(val.offsetWidth >= val.scrollWidth){
            $(this).closest('.pageTabs').find('.pageTabArrow').addClass('none');
        }else{
            $(this).closest('.pageTabs').find('.pageTabArrow').removeClass('none');
        }
})

}
$(window).resize(function(){
    fixPageTabsArrows();
})

$('body').on('click','.pageTabArrowLeft',function(e){
    $(this).closest('.pageTabs').find('.pageTab_selected').prev().trigger('click');

})

$('body').on('click','.pageTabArrowRight',function(e){
    $(this).closest('.pageTabs').find('.pageTab_selected').next().trigger('click');

})
