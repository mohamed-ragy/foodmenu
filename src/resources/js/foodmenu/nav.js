$(window).on('scroll',function(){
    if($(window).scrollTop() == 0){
        $('header').removeClass('header_shadow');
    }else{
        $('header').addClass('header_shadow');
    }
})
$('.showNav').on('click',function(e){
    $('nav').removeClass('nav_hidden')
})
$('.hideNav').on('click',function(e){
    $('nav').addClass('nav_hidden')
})
