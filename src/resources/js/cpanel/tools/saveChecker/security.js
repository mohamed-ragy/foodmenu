email_address_unsave_check = function(){
    if(
        emailVerification_NoSave()
    ){
        $('.email_address_unsaved').addClass('none');
    }else{
        $('.email_address_unsaved').removeClass('none');
    }
    security_unsave_check();
}
phone_number_unsave_check = function(){
    if(
        phoneNumberVerification_NoSave()
    ){
        $('.phone_number_unsaved').addClass('none');
    }else{
        $('.phone_number_unsaved').removeClass('none');
    }
    security_unsave_check();
}

//
security_unsave_check = function(){
    if(
        $('.email_address_unsaved').hasClass('none')
    ){
        $('.security_unsaved').addClass('none');
    }else{
        $('.security_unsaved').removeClass('none');
    }
    globalUnsaveChecker_navMenu();
}

//
