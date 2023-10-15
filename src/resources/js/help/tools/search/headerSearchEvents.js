$('.headerSearch').on('focus',function(e){
    showHeadSearch();
})
$('html,body').on('input','.headerSearch',function(e){
    showSearchResaults($('.headerSearchResults'),$(this).val())
    $('.headerSearchLeft').find('.searchLoading').removeClass('none');
    $('.headerSearchLeft').find('.ico-search').addClass('none')
})

$('html,body').on('click','.headerOpenSearchBtn',function(e){
    e.stopImmediatePropagation();
    showHeadSearch();
})
$('html,body').on('click','.headerCloseSearchBtn',function(e){
    e.stopImmediatePropagation();
    hideHeaderSearch();
})
showHeadSearch = function(){
    $('.headerSearchContainer').addClass('headerSearchContainer_focus')
    $('.headerSearchResultsContainer').removeClass('headerSearchResultsContainer_hidden');
    $('.headerSearchResults').scrollTop(0)
    showSearchResaults($('.headerSearchResults'),$('.headerSearch').val())
    $('.headerSearchRight').children().first().text('').addClass('ico-close headerCloseSearchBtn').removeClass('headerOpenSearchBtn')

}

hideHeaderSearch = function(){
    $('.headerSearchContainer').removeClass('headerSearchContainer_focus')
    $('.headerSearchResultsContainer').addClass('headerSearchResultsContainer_hidden');
    $('.headerSearchRight').children().first().text('/').removeClass('ico-close headerCloseSearchBtn').addClass('headerOpenSearchBtn')
    $('.headerSearch').val('')
    hideSearchLoading();
}
