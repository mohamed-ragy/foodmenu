setHomeSearch = function(){
    $('.homeSearchResultsContainer').css({
        top:$('.homeSearchContainer').position().top,
        left:$('.homeSearchContainer').position().left,
        width:$('.homeSearchContainer').width(),
    })
}

$(window).resize(function(){
    setHomeSearch();
})
$(document).ready(function(){
    setHomeSearch();
})
$('.homeSearch').on('focus',function(e){
    showHomeSearch();
})
$('main').on('scroll',function(){
    hideHomeSearch();
})


$('html,body').on('input','.homeSearch',function(e){
    showSearchResaults($('.homeSearchResults'),$(this).val())
    $('.homeSearchLeft').find('.searchLoading').removeClass('none');
    $('.homeSearchLeft').find('.ico-search').addClass('none')
})

$('html,body').on('click','.homeOpenSearchBtn',function(e){
    e.stopImmediatePropagation();
    showHomeSearch();
})
$('html,body').on('click','.homeCloseSearchBtn',function(e){
    e.stopImmediatePropagation();
    hideHomeSearch();
})
showHomeSearch = function(){
    setHomeSearch();
    clearTimeout(window.homeSearchContainerTimeout)
    showSearchResaults($('.homeSearchResults'),$('.homeSearch').val())
    $('.homeSearchResultsContainer').removeClass('none');
    $('.homeSearchResults').scrollTop(0).removeClass('homeSearchResultsContainer_hidden');
    $('.homeSearchContainer').addClass('homeSearchContainer_focus');
    $('.homeSearchRight').children().first().text('').addClass('ico-close homeCloseSearchBtn').removeClass('homeOpenSearchBtn')
}
hideHomeSearch = function(){
    $('.homeSearchContainer').removeClass('homeSearchContainer_focus')
    $('.homeSearchResults').addClass('homeSearchResultsContainer_hidden')
    clearTimeout(window.homeSearchContainerTimeout)
    window.homeSearchContainerTimeout = setTimeout(() => {
        $('.homeSearchResultsContainer').addClass('none');
    }, 170);
    $('.homeSearchRight').children().first().text('/').removeClass('ico-close homeCloseSearchBtn').addClass('homeOpenSearchBtn')
    $('.homeSearch').val('')
    hideSearchLoading();
}
