

category_list_unsave_check = function(){
    editCategoriesNoSaveCheck();
    if(
        editCategoriesNoSaveCheck()
    ){
        $('.category_list_unsaved').addClass('none');
    }else{
        $('.category_list_unsaved').removeClass('none');
    }
    products_unsave_check();
}

manage_products_unsave_check = function(){
    editProductsNoSaveCheck();
    if(
        editProductsNoSaveCheck()
    ){
        $('.manage_products_unsaved').addClass('none');
    }else{
        $('.manage_products_unsaved').removeClass('none');
    }
    products_unsave_check();
}


products_unsave_check = function(){
    if(
        $('.category_list_unsaved').hasClass('none') &&
        $('.manage_products_unsaved').hasClass('none')
    ){
        $('.products_unsaved').addClass('none');
    }else{
        $('.products_unsaved').removeClass('none');
    }
    globalUnsaveChecker_navMenu();
}
