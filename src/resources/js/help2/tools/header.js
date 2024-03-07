if($('main').scrollTop() == 0){
    $('header').removeClass('header_shadow');
    $('.homeSearchContainer').removeClass('none')
}else{
    $('header').addClass('header_shadow');
    $('.homeSearchContainer').addClass('none')
}
$('main').on('scroll',function(){
    if($('main').scrollTop() == 0){
        $('header').removeClass('header_shadow');
        $('.homeSearchContainer').removeClass('none')
        $('.homeSearchResultsContainer').removeClass('none')
    }else{
        $('header').addClass('header_shadow');
        $('.homeSearchContainer').addClass('none')
        $('.homeSearchResultsContainer').addClass('none')
    }
})
// $('.showNav').on('click',function(e){
//     $('nav').removeClass('nav_hidden')
// })
// $('.hideNav').on('click',function(e){
//     $('nav').addClass('nav_hidden')
// })
