
sub_accounts_unsave_check = function(){
    manageSubaccount_unsavedCheck()
    if(
        manageSubaccount_unsavedCheck()
    ){
        $('.sub_accounts_unsaved').addClass('none');
    }else{
        $('.sub_accounts_unsaved').removeClass('none');
    }
    my_staff_unsave_check();
}
my_staff_unsave_check = function(){
    if(
        $('.sub_accounts_unsaved').hasClass('none')
    ){
        $('.my_staff_unsaved').addClass('none');
    }else{
        $('.my_staff_unsaved').removeClass('none');
    }
    globalUnsaveChecker_navMenu();
}
