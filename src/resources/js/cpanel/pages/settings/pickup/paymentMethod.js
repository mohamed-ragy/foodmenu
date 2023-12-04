pickupPaymentMethodsNoSaveCheck = function(){
    if(website_temp.card_at_restaurant == website.card_at_restaurant && website_temp.cash_at_restaurant == website.cash_at_restaurant){
        $('.pickup_payment_methods-NoSave').addClass('none');
        return true;
    }else{
        $('.pickup_payment_methods-NoSave').removeClass('none');
        return false;
    }
}
$('html,body').on('click','.card_at_restaurant',function(e){
    e.stopImmediatePropagation();
    $('.card_at_restaurant_check').hasClass('ico-check1') ? website_temp.card_at_restaurant = 0 : website_temp.card_at_restaurant = 1;
    website_temp.card_at_restaurant ? $('.card_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : $('.card_at_restaurant_check').removeClass('ico-check1').addClass('ico-check0');
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','.cash_at_restaurant',function(e){
    e.stopImmediatePropagation();
    $('.cash_at_restaurant_check').hasClass('ico-check1') ? website_temp.cash_at_restaurant = 0 : website_temp.cash_at_restaurant = 1;
    website_temp.cash_at_restaurant ? $('.cash_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : $('.cash_at_restaurant_check').removeClass('ico-check1').addClass('ico-check0');
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','#pickupPaymentMethodsCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.cash_at_restaurant = website.cash_at_restaurant;
    website_temp.cash_at_restaurant ? $('.cash_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : $('.cash_at_restaurant_check').removeClass('ico-check1').addClass('ico-check0');
    website_temp.card_at_restaurant = website.card_at_restaurant;
    website_temp.card_at_restaurant ? $('.card_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : $('.card_at_restaurant_check').removeClass('ico-check1').addClass('ico-check0');
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','#pickupPaymentMethodsSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#pickupPaymentMethodsSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            savePickupPaymentMethods:true,
            card_at_restaurant:website_temp.card_at_restaurant,
            cash_at_restaurant:website_temp.cash_at_restaurant,
        },success:function(r){
            hideBtnLoading($('#pickupPaymentMethodsSaveBtn'));
            if(r.pickupPaymentMethodsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.card_at_restaurant = website_temp.card_at_restaurant;
                website.cash_at_restaurant = website_temp.cash_at_restaurant;
                website_temp.card_at_restaurant ? $('.card_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : $('.card_at_restaurant_check').removeClass('ico-check1').addClass('ico-check0');
                website_temp.cash_at_restaurant ? $('.cash_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : $('.cash_at_restaurant_check').removeClass('ico-check1').addClass('ico-check0');
                order_pickup_settings_unsave_check();
            }else if(r.pickupPaymentMethodsStatus == 0){
                showAlert('error',r.msg,4000,true);
                order_pickup_settings_unsave_check();
            }
        }
    })

})
