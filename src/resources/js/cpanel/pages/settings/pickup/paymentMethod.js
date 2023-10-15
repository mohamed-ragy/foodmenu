pickupPaymentMethodsNoSaveCheck = function(){
    if(website_temp.cardOnPickup == website.cardOnPickup && website_temp.cashOnPickup == website.cashOnPickup){
        $('.pickup_payment_methods-NoSave').addClass('none');
        return true;
    }else{
        $('.pickup_payment_methods-NoSave').removeClass('none');
        return false;
    }
}
$('html,body').on('click','.cardOnPickup',function(e){
    e.stopImmediatePropagation();
    $('.cardOnPickupCheck').hasClass('ico-check1') ? website_temp.cardOnPickup = 0 : website_temp.cardOnPickup = 1;
    website_temp.cardOnPickup ? $('.cardOnPickupCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cardOnPickupCheck').removeClass('ico-check1').addClass('ico-check0');
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','.cashOnPickup',function(e){
    e.stopImmediatePropagation();
    $('.cashOnPickupCheck').hasClass('ico-check1') ? website_temp.cashOnPickup = 0 : website_temp.cashOnPickup = 1;
    website_temp.cashOnPickup ? $('.cashOnPickupCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cashOnPickupCheck').removeClass('ico-check1').addClass('ico-check0');
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','#pickupPaymentMethodsCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.cashOnPickup = website.cashOnPickup;
    website_temp.cashOnPickup ? $('.cashOnPickupCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cashOnPickupCheck').removeClass('ico-check1').addClass('ico-check0');
    website_temp.cardOnPickup = website.cardOnPickup;
    website_temp.cardOnPickup ? $('.cardOnPickupCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cardOnPickupCheck').removeClass('ico-check1').addClass('ico-check0');
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
            cardOnPickup:website_temp.cardOnPickup,
            cashOnPickup:website_temp.cashOnPickup,
        },success:function(r){
            hideBtnLoading($('#pickupPaymentMethodsSaveBtn'));
            if(r.pickupPaymentMethodsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.cardOnPickup = website_temp.cardOnPickup;
                website.cashOnPickup = website_temp.cashOnPickup;
                website_temp.cardOnPickup ? $('.cardOnPickupCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cardOnPickupCheck').removeClass('ico-check1').addClass('ico-check0');
                website_temp.cashOnPickup ? $('.cashOnPickupCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cashOnPickupCheck').removeClass('ico-check1').addClass('ico-check0');
                order_pickup_settings_unsave_check();
            }else if(r.pickupPaymentMethodsStatus == 0){
                showAlert('error',r.msg,4000,true);
                order_pickup_settings_unsave_check();
            }
        }
    })

})
