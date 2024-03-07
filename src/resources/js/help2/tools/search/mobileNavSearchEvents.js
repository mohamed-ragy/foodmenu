$('.mobileNavSearch').on('focus',function(e){
    showMobileNavSearch();
})
$('html,body').on('input','.mobileNavSearch',function(e){
    showSearchResaults($('.mobileNavSearchResults'),$(this).val())
    $('.mobileNavSearchLeft').find('.searchLoading').removeClass('none');
    $('.mobileNavSearchLeft').find('.ico-search').addClass('none')
})

$('html,body').on('click','.mobileNavOpenSearchBtn',function(e){
    e.stopImmediatePropagation();
    showMobileNavSearch();
})
$('html,body').on('click','.mobileNavCloseSearchBtn',function(e){
    e.stopImmediatePropagation();
    hideMobileNavSearch();
})
showMobileNavSearch = function(){
    $('.mobileNavSearchContainer').addClass('mobileNavSearchContainer_focus')
    $('.mobileNavSearchResultsContainer').removeClass('mobileNavSearchResultsContainer_hidden');
    $('.mobileNavSearchResults').scrollTop(0)
    showSearchResaults($('.mobileNavSearchResults'),$('.mobileNavSearch').val())
    $('.mobileNavSearchRight').children().first().addClass('ico-up mobileNavCloseSearchBtn').removeClass('mobileNavOpenSearchBtn ico-down')
}
hideMobileNavSearch = function(){
    $('.mobileNavSearchContainer').removeClass('mobileNavSearchContainer_focus')
    $('.mobileNavSearchResultsContainer').addClass('mobileNavSearchResultsContainer_hidden');
    $('.mobileNavSearch').val('')
    hideSearchLoading();
    $('.mobileNavSearchRight').children().first().removeClass('ico-up mobileNavCloseSearchBtn').addClass('mobileNavOpenSearchBtn ico-down')
}
