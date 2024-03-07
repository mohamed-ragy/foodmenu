///////general events
$(document).on('keyup',function(e){
    e.stopImmediatePropagation();
    if(e.which == 191 || e.which == 111){
        if($(window).width() > 550 && !$('header').hasClass('header_notHome') && !$('header').hasClass('header_shadow')){
            $('.homeSearch').focus();
        }else if($(window).width() < 1025){
            $('.mobileNav').removeClass('mobileNav_hidden');
            $('.mobileNavSearch').focus();
        }else{
            $('.headerSearch').focus();
        }
    }else if(e.which == 27){
        hideHomeSearch();
        hideHeaderSearch();
        hideMobileNavSearch();
        hidemobileNav();
    }
})
$(document).on('click',function(){
    if($('.homeSearchContainer:hover').length <= 0 && $('.homeSearchResultsContainer:hover').length <= 0){
        hideHomeSearch();
    }
    if($('.headerSearchContainer:hover').length <= 0 && $('.headerSearchResultsContainer:hover').length <= 0){
        hideHeaderSearch();
    }
    if($('.mobileNavSearchContainer:hover').length <= 0 && $('.mobileNavSearchResultsContainer:hover').length <= 0){
        hideMobileNavSearch();
    }
})

