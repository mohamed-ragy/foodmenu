$('#reviewsMoreFilters').on('click',function(){
    if($('.reviewsMoreFiltersContainer').hasClass('reviewsMoreFiltersContainer_expand')){
        $('.reviewsMoreFiltersContainer').removeClass('reviewsMoreFiltersContainer_expand')
        $('#reviewsMoreFilters').text(texts.products.moreFilters)
    }else{
        $('.reviewsMoreFiltersContainer').addClass('reviewsMoreFiltersContainer_expand')
        $('#reviewsMoreFilters').text(texts.products.lessFilters)
    }
})

$('#productReviews-selectProduct').val(texts.products.allproducts).attr('key','allproducts')

$('#productReviews-selectUser').on('change input focusout focus',function(){
    setTimeout(function(){
        if($('#productReviews-selectUser').val() == '' || $('#productReviews-selectUser').val() == null){
            $('.reviewsFilterCheck[filter="users"]').children().first().removeClass('ico-check0').addClass('ico-check1')
            $('.reviewsFilterCheck[filter="guests"]').children().first().removeClass('ico-check0').addClass('ico-check1')
        }else{
            $('.reviewsFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0')
            $('.reviewsFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0')

        }
    },500)
})
$('#productReviews-selectUserList').on('click','.inputListElement',function(){
    $('.reviewsFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0')
    $('.reviewsFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0')
})
$('.reviewsFilterCheck[filter="users"], .reviewsFilterCheck[filter="guests"]').on('click',function(){
    $('#productReviews-selectUser').val('').attr('key',null)
})
$('.reviewsFilterCheck[filter="users"], .reviewsFilterCheck[filter="guests"]').on('click',function(){
    if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0')
        if(
            $('.reviewsFilterCheck[filter="users"]').children().first().hasClass('ico-check0') &&
            $('.reviewsFilterCheck[filter="guests"]').children().first().hasClass('ico-check0')
        ){
            $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
        }
    }else{
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
    }
})

$('.reviewsFilterCheck[filter="1star"], .reviewsFilterCheck[filter="2star"], .reviewsFilterCheck[filter="3star"], .reviewsFilterCheck[filter="4star"], .reviewsFilterCheck[filter="5star"]').on('click',function(){
    if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0')
        if(
            $('.reviewsFilterCheck[filter="1star"]').children().first().hasClass('ico-check0') &&
            $('.reviewsFilterCheck[filter="2star"]').children().first().hasClass('ico-check0') &&
            $('.reviewsFilterCheck[filter="3star"]').children().first().hasClass('ico-check0') &&
            $('.reviewsFilterCheck[filter="4star"]').children().first().hasClass('ico-check0') &&
            $('.reviewsFilterCheck[filter="5star"]').children().first().hasClass('ico-check0')
        ){
            $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
        }
    }else{
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1')
    }
})

