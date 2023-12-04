$('#orderHistoryMoreFilters').on('click',function(){
    if($('.orderHistoryMoreFiltersContainer').hasClass('orderHistoryMoreFiltersContainer_expand')){
        $('.orderHistoryMoreFiltersContainer').removeClass('orderHistoryMoreFiltersContainer_expand')
        $('#orderHistoryMoreFilters').text(texts.orders.moreFilters)
    }else{
        $('.orderHistoryMoreFiltersContainer').addClass('orderHistoryMoreFiltersContainer_expand')
        $('#orderHistoryMoreFilters').text(texts.orders.lessFilters)
    }
})
////////
$('#orderHistory-selectUser').on('change input focusout focus',function(){
    setTimeout(function(){
        $('#orderHistory-orderNumber').val('');
        if($('#orderHistory-selectUser').val() == '' || $('#orderHistory-selectUser').val() == null){
            $('.orderHistoryFilterCheck[filter="users"]').children().first().removeClass('ico-check0').addClass('ico-check1')
            $('.reviewsFilterCheck[filter="guests"]').children().first().removeClass('ico-check0').addClass('ico-check1')
        }else{
            $('.orderHistoryFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0')
            $('.orderHistoryFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0')

        }
    },500)
})
$('#orderHistory-selectUserList').on('click','.inputListElement',function(){
    $('#orderHistory-orderNumber').val('');
    $('.orderHistoryFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0')
    $('.orderHistoryFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0')
})

$('.orderHistoryFilterCheck[filter="users"], .orderHistoryFilterCheck[filter="guests"]').on('click',function(){
    $('#orderHistory-selectUser').val('').attr('key',null)
    $('#orderHistory-orderNumber').val('');
    if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0')
        if(
            $('.orderHistoryFilterCheck[filter="users"]').children().first().hasClass('ico-check0') &&
            $('.orderHistoryFilterCheck[filter="guests"]').children().first().hasClass('ico-check0')
        ){
            $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
        }
    }else{
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
    }
})
$('.orderHistoryFilterCheck[filter="dineIn"], .orderHistoryFilterCheck[filter="delivered"], .orderHistoryFilterCheck[filter="pickedUp"], .orderHistoryFilterCheck[filter="canceled"]').on('click',function(){
    if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0')
        if(
            $('.orderHistoryFilterCheck[filter="dineIn"]').children().first().hasClass('ico-check0') &&
            $('.orderHistoryFilterCheck[filter="delivered"]').children().first().hasClass('ico-check0') &&
            $('.orderHistoryFilterCheck[filter="pickedUp"]').children().first().hasClass('ico-check0') &&
            $('.orderHistoryFilterCheck[filter="canceled"]').children().first().hasClass('ico-check0')
        ){
            $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
        }
    }else{
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
    }
    $('#orderHistory-orderNumber').val('');
})
$('#orderHistory-orderNumber').on('change input',function(){
    $('#orderHistory-selectUser').val('').attr('key',null)
    $('.orderHistoryFilterCheck[filter="dineIn"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    $('.orderHistoryFilterCheck[filter="delivered"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    $('.orderHistoryFilterCheck[filter="pickedUp"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    $('.orderHistoryFilterCheck[filter="canceled"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    $('.orderHistoryFilterCheck[filter="users"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    $('.orderHistoryFilterCheck[filter="guests"]').children().first().removeClass('ico-check0').addClass('ico-check1')

})
