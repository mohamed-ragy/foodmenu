$('html, body').on('mouseover','.navUser, .navUserMenu',() => {
    $('.navUserMenu').removeClass('none');
    if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
        $('.navUserMenu').css({
            top:($('.navUser').position().top) + $('.navUser').outerHeight(),
            left:($('.navUser').position().left)
        })
    }else{
        $('.navUserMenu').css({
            top:($('.navUser').position().top) + $('.navUser').outerHeight(),
            left:($('.navUser').position().left) + ($('.navUser').outerWidth()) - ($('.navUserMenu').outerWidth())
        })
    }

})
$('html, body').on('mouseleave','.navUser, .navUserMenu',() => {
    $('.navUserMenu').addClass('none')

});


$('html, body').on('mouseover','.navFoodmenu, .navFoodmenuMenu',() => {
    $('.navFoodmenuMenu').removeClass('none');
    if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
        $('.navFoodmenuMenu').css({
            top:($('.navFoodmenu').position().top) + $('.navFoodmenu').outerHeight(),
            left:($('.navFoodmenu').position().left)
        })
    }else{
        $('.navFoodmenuMenu').css({
            top:($('.navFoodmenu').position().top) + $('.navFoodmenu').outerHeight(),
            left:($('.navFoodmenu').position().left) + ($('.navFoodmenu').outerWidth()) - ($('.navFoodmenuMenu').outerWidth())
        })
    }
})
$('html, body').on('mouseleave','.navFoodmenu, .navFoodmenuMenu',() => {
    $('.navFoodmenuMenu').addClass('none')

});

navMobileOpen = () => {
    $('.navMobileBody').addClass('navMobileBody_show');
    if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
        $('.navMobile').removeClass('ic-menu').addClass('ic-menuOpen navMobileOpend_rtl')
    }else{
        $('.navMobile').removeClass('ic-menu').addClass('ic-menuOpen navMobileOpend')
    }
}
navMobileClose = () => {
    $('.navMobileBody').removeClass('navMobileBody_show')
    if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
        $('.navMobile').removeClass('ic-menuOpen navMobileOpend_rtl').addClass('ic-menu')
    }else{
        $('.navMobile').removeClass('ic-menuOpen navMobileOpend').addClass('ic-menu')
    }
}
$('html,boy').on('click','.navMobile',function(e){
    e.stopImmediatePropagation();
    !$('.navMobileBody').hasClass('navMobileBody_show') ? navMobileOpen() : navMobileClose()
})



$('html, body').on('click','.mobileNavUser',(e) => {
    e.stopImmediatePropagation();
    $('.mobileNavBodyUserMenu').hasClass('mobileNavBodyElemGroup_show') ? $('.mobileNavBodyUserMenu').removeClass('mobileNavBodyElemGroup_show') : $('.mobileNavBodyUserMenu').addClass('mobileNavBodyElemGroup_show')
    $('.mobileNavBodyCategoriesMenu').removeClass('mobileNavBodyElemGroup_show')
})

$('html, body').on('click','.mobileNavCategories',(e) => {
    e.stopImmediatePropagation();
    $('.mobileNavBodyCategoriesMenu').hasClass('mobileNavBodyElemGroup_show') ? $('.mobileNavBodyCategoriesMenu').removeClass('mobileNavBodyElemGroup_show') : $('.mobileNavBodyCategoriesMenu').addClass('mobileNavBodyElemGroup_show')
    $('.mobileNavBodyUserMenu').removeClass('mobileNavBodyElemGroup_show')
})
