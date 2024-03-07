header_shdow = function(){
    $('header').addClass('header_shadow');
    $('.homeSearchContainer').addClass('none')
    $('.homeSearchResultsContainer').addClass('none')
}
header_home_intro = function(){
    $('header').removeClass('header_shadow');
    $('.homeSearchContainer').removeClass('none')
    $('.homeSearchResultsContainer').removeClass('none')
}
$('main').on('scroll',function(){
    if($('main').scrollTop() == 0 && window.history.state.page == 'home'){
        header_home_intro();
    }else{
        header_shdow();
    }
})


// $('.showNav').on('click',function(e){
//     $('nav').removeClass('nav_hidden')
// })
// $('.hideNav').on('click',function(e){
//     $('nav').addClass('nav_hidden')
// })
