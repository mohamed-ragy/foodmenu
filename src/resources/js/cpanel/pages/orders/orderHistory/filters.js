setOrderHistoryFilters = function(){
    $('#orderHistory-orderNumber').val(window.page.orderNumber)
    //
    if(window.page.byUsers == 0 && window.page.byGuests == 0 && window.page.user == ''){
        window.page.byUsers = 1;
        window.page.byGuests = 1;
    }
    if(window.page.user != '' && window.page.user != null){
        window.page.byUsers = 0;
        window.page.byGuests = 0;
    }
    window.page.byUsers == 1 ? $('.orderHistoryFor[orderHistoryFor="users"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.orderHistoryFor[orderHistoryFor="users"]').find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.byGuests == 1 ? $('.orderHistoryFor[orderHistoryFor="guests"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.orderHistoryFor[orderHistoryFor="guests"]').find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0');
    if(window.page.user != ''){
        $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1');
        $('.orderHistoryFor_findUserContainer').removeClass('none');
        $('#orderHistoryFor_findUser').attr('key',window.page.user);
        getUsersData([window.page.user]).then(function(){
            $('#orderHistoryFor_findUser').val(website.users.find(item=>item.id == window.page.user).name)
        })
    }else{
        $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.orderHistoryFor_findUserContainer').addClass('none');
        $('#orderHistoryFor_findUser').attr('key',null).val('');
    }
    //
    window.page.dinedIn == 1 ? $('.orderHistoryStatusBy[orderHistoryStatusBy="dinedIn"]').find('.orderHistoryStatusByCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.orderHistoryStatusBy[orderHistoryStatusBy="dinedIn"]').find('.orderHistoryStatusByCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.pickedUp == 1 ? $('.orderHistoryStatusBy[orderHistoryStatusBy="pickedUp"]').find('.orderHistoryStatusByCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.orderHistoryStatusBy[orderHistoryStatusBy="pickedUp"]').find('.orderHistoryStatusByCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.delivered == 1 ? $('.orderHistoryStatusBy[orderHistoryStatusBy="delivered"]').find('.orderHistoryStatusByCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.orderHistoryStatusBy[orderHistoryStatusBy="delivered"]').find('.orderHistoryStatusByCheck').removeClass('ico-check1').addClass('ico-check0');
    window.page.canceled == 1 ? $('.orderHistoryStatusBy[orderHistoryStatusBy="canceled"]').find('.orderHistoryStatusByCheck').removeClass('ico-check0').addClass('ico-check1') :
    $('.orderHistoryStatusBy[orderHistoryStatusBy="canceled"]').find('.orderHistoryStatusByCheck').removeClass('ico-check1').addClass('ico-check0');

    if(
        window.page.byUsers != 1 ||
        window.page.byGuests != 1 ||
        window.page.user != '' ||
        window.page.dinedIn != 1 ||
        window.page.pickedUp != 1 ||
        window.page.delivered != 1 ||
        window.page.canceled != 1
    ){
        orderHistory_showMoreFilters();
    }
}
orderHistory_showMoreFilters = function(){
    $('.orderHistoryFiltersContainer').addClass('orderHistoryFiltersContainer_show')
    $('.orderHistoryMoreFiltersSwitch').text(texts.orders.lessFilters).removeClass('mT10').addClass('mT50')
}
orderHistory_hideMoreFilters = function(){
    $('.orderHistoryFiltersContainer').removeClass('orderHistoryFiltersContainer_show')
    $('.orderHistoryMoreFiltersSwitch').text(texts.orders.moreFilters).removeClass('mT50').addClass('mT10')
}
$('html,body').on('click','.orderHistoryMoreFiltersSwitch',function(e){
    e.stopImmediatePropagation();
    if($('.orderHistoryFiltersContainer').hasClass('orderHistoryFiltersContainer_show')){
        orderHistory_hideMoreFilters();
    }else{
        orderHistory_showMoreFilters();
    }
})
//
$('html,body').on('click','.orderHistoryStatusBy',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.orderHistoryStatusByCheck').hasClass('ico-check1')){
        let orderHistoryStatusByCheck = 0;
        $('.orderHistoryStatusByCheck').each(function(){
            if($(this).hasClass('ico-check1')){orderHistoryStatusByCheck++}
        })
        if(orderHistoryStatusByCheck > 1){
            $(this).find('.orderHistoryStatusByCheck').removeClass('ico-check1').addClass('ico-check0');
        }
    }else{
        $(this).find('.orderHistoryStatusByCheck').removeClass('ico-check0').addClass('ico-check1');
    }
})
$('html,body').on('click','.orderHistoryFor',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('orderHistoryFor') == 'users' || $(this).attr('orderHistoryFor') == 'guests'){
        if($(this).find('.orderHistoryForCheck').hasClass('ico-check1')){
            let orderHistoryForCheck = 0;
            $('.orderHistoryForCheck').each(function(){
                if($(this).hasClass('ico-check0')){orderHistoryForCheck++}
            })
            if(orderHistoryForCheck == 1){
                $(this).find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0');
            }
        }else{
            $(this).find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1');
        }
        $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.orderHistoryFor_findUserContainer').addClass('none');
        $('#orderHistoryFor_findUser').attr('key',null).val('');
    }else if($(this).attr('orderHistoryFor') == 'user'){
        if($(this).find('.orderHistoryForCheck').hasClass('ico-check1')){
            $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.orderHistoryFor_findUserContainer').addClass('none');
            $('#orderHistoryFor_findUser').attr('key',null).val('');
            $('.orderHistoryFor[orderHistoryFor="users"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1')
            $('.orderHistoryFor[orderHistoryFor="guests"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1')

        }else{
            $('.orderHistoryFor').find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1')
            $('.orderHistoryFor_findUserContainer').removeClass('none');
            $('#orderHistoryFor_findUser').attr('key',null).val('');
        }

    }
})
//
