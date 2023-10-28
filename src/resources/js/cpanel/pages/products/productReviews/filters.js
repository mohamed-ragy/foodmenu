setFindReviewsFilters = function(){
    if(window.page.product == 'allproducts'){
        $('#productReviews_selectProduct').val(texts.products.allproducts).attr('key','allproducts')
    }else{
        let productCheck = website.products.find(item=>item.name == window.page.product);
        if(typeof(productCheck) === 'undefined'){
            window.page.product = 'allproducts'
            $('#productReviews_selectProduct').val(texts.products.allproducts).attr('key','allproducts')
        }else{
            $('#productReviews_selectProduct').val(window.page.product).attr('key',window.page.product);
        }
    }
    //////
    if(window.page.byUsers == 0 && window.page.byGuests == 0 && window.page.user == ''){
        window.page.byUsers = 1;
        window.page.byGuests = 1;
    }
    if(window.page.byUsers == 1 || window.page.byGuests == 1){
        window.page.user = '';
    }
    window.page.byUsers == 1 ? $('.productReviewsBy[productReviewsBy="users"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.productReviewsBy[productReviewsBy="users"]').find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.byGuests == 1 ? $('.productReviewsBy[productReviewsBy="guests"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.productReviewsBy[productReviewsBy="guests"]').find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0');
    if(window.page.user != ''){
        $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1');
        $('.productReviews_findUserContainer').removeClass('none');
        $('#productReviews_findUser').attr('key',window.page.user);
        getUsersData([window.page.user]).then(function(){
            $('#productReviews_findUser').val(website.users.find(item=>item.id == window.page.user).name)
        })
    }else{
        $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.productReviews_findUserContainer').addClass('none');
        $('#productReviews_findUser').attr('key',null).val('');
    }
    /////
    window.page.star1 == 1 ? $('.productReviewsWith[productReviewsWith="star1"]').find('.productReviewsWithCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.productReviewsWith[productReviewsWith="star1"]').find('.productReviewsWithCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.star2 == 1 ? $('.productReviewsWith[productReviewsWith="star2"]').find('.productReviewsWithCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.productReviewsWith[productReviewsWith="star2"]').find('.productReviewsWithCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.star3 == 1 ? $('.productReviewsWith[productReviewsWith="star3"]').find('.productReviewsWithCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.productReviewsWith[productReviewsWith="star3"]').find('.productReviewsWithCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.star4 == 1 ? $('.productReviewsWith[productReviewsWith="star4"]').find('.productReviewsWithCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.productReviewsWith[productReviewsWith="star4"]').find('.productReviewsWithCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.star5 == 1 ? $('.productReviewsWith[productReviewsWith="star5"]').find('.productReviewsWithCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.productReviewsWith[productReviewsWith="star5"]').find('.productReviewsWithCheck').removeClass('ico-check1').addClass('ico-check0');

    if(
        window.page.byUsers != 1 ||
        window.page.byGuests != 1 ||
        window.page.user != '' ||
        window.page.star1 != 1 ||
        window.page.star2 != 1 ||
        window.page.star3 != 1 ||
        window.page.star4 != 1 ||
        window.page.star5 != 1
    ){
        productReveiws_showMoreFilters();
    }
}
productReveiws_showMoreFilters = function(){
    $('.reviewsMoreFiltersContainer').addClass('reviewsMoreFiltersContainer_show')
    $('.productReviewMoreFiltersSwitch').text(texts.products.lessFilters).removeClass('mT10').addClass('mT50')
}
productReveiws_hideMoreFilters = function(){
    $('.reviewsMoreFiltersContainer').removeClass('reviewsMoreFiltersContainer_show')
    $('.productReviewMoreFiltersSwitch').text(texts.products.moreFilters).removeClass('mT50').addClass('mT10')
}

$('html,body').on('click','.productReviewMoreFiltersSwitch',function(e){
    e.stopImmediatePropagation();
    if($('.reviewsMoreFiltersContainer').hasClass('reviewsMoreFiltersContainer_show')){
        productReveiws_hideMoreFilters();
    }else{
        productReveiws_showMoreFilters();
    }
})
///////////
$('html,body').on('click','.productReviewsWith',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.productReviewsWithCheck').hasClass('ico-check1')){
        let productReviewsWithCheck = 0;
        $('.productReviewsWithCheck').each(function(){
            if($(this).hasClass('ico-check0')){productReviewsWithCheck++}
        })
        if(productReviewsWithCheck != 4){
            $(this).find('.productReviewsWithCheck').removeClass('ico-check1').addClass('ico-check0');
        }
    }else{
        $(this).find('.productReviewsWithCheck').removeClass('ico-check0').addClass('ico-check1');
    }
})


$('html,body').on('click','.productReviewsBy',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('productReviewsBy') == 'users' || $(this).attr('productReviewsBy') == 'guests'){
        if($(this).find('.productReviewsByCheck').hasClass('ico-check1')){
            let productReviewsByCheck = 0;
            $('.productReviewsByCheck').each(function(){
                if($(this).hasClass('ico-check0')){productReviewsByCheck++}
            })
            if(productReviewsByCheck == 1){
                $(this).find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0');
            }
        }else{
            $(this).find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1');
        }
        $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.productReviews_findUserContainer').addClass('none');
        $('#productReviews_findUser').attr('key',null).val('');
    }else if($(this).attr('productReviewsBy') == 'user'){
        if($(this).find('.productReviewsByCheck').hasClass('ico-check1')){
            $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.productReviews_findUserContainer').addClass('none');
            $('#productReviews_findUser').attr('key',null).val('');
            $('.productReviewsBy[productReviewsBy="users"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1')
            $('.productReviewsBy[productReviewsBy="guests"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1')

        }else{
            $('.productReviewsBy').find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1')
            $('.productReviews_findUserContainer').removeClass('none');
            $('#productReviews_findUser').attr('key',null).val('');
        }

    }
})

//
