
globalUnsaveChecker_navMenu = function(){
    let checker = true;
    $('.navMenu-mainItem_unsaved').each(function(){
        if(!$(this).hasClass('none')){
            checker = false;
        }
    })
    !checker ? $('.navMenu-unsaved').removeClass('none') : $('.navMenu-unsaved').addClass('none') ;
}

require('./saveChecker/security.js');//done//
require('./saveChecker/settings.js');//done//
require('./saveChecker/mystaff.js');//done//
require('./saveChecker/products.js');//done//
