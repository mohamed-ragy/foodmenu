
globalUnsaveChecker_navMenu = function(){
    let checker = true;
    $('.navMenu-mainItem_unsaved').each(function(){
        if(!$(this).hasClass('none')){
            checker = false;
        }
    })
    !checker ? $('.navMenu-unsaved').removeClass('none') : $('.navMenu-unsaved').addClass('none') ;
}

require('./saveChecker/settings.js');
require('./saveChecker/mystaff.js');
require('./saveChecker/products.js');
