$('html,body').on('click','.headMobileNavIcon',function(e){
    e.stopImmediatePropagation();
    $('.headMobileNavIcon').removeClass('headMobileNavIcon ico-menu2').addClass('MobileNavIconClose ico-close')
    $('header').addClass('header_notHome')
    $('.mobileNav').removeClass('mobileNav_hidden')
})
$('html,body').on('click','.MobileNavIconClose',function(e){
    e.stopImmediatePropagation();
    hidemobileNav();
})

hidemobileNav = function(){
    $('.MobileNavIconClose').addClass('headMobileNavIcon ico-menu2').removeClass('MobileNavIconClose ico-close')
    if(window.history.state.page == 'home' && $('main').scrollTop() == 0){
        $('header').removeClass('header_notHome')
    }
    $('.mobileNav').addClass('mobileNav_hidden')
    hideMobileNavSearch();
}
$('main').on('scroll',function(){
    if(window.history.state.page == 'home' && $('main').scrollTop() == 0){
        $('header').removeClass('header_notHome header_shadow')
    }
});
