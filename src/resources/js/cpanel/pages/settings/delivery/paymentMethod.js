deliveryPaymentMethodsNoSaveCheck = function(){
    if(website_temp.cardOnDelivery == website.cardOnDelivery && website_temp.cashOnDelivery == website.cashOnDelivery){
        $('.delivery_payment_methods-NoSave').addClass('none');
        return true;
    }else{
        $('.delivery_payment_methods-NoSave').removeClass('none');
        return false;

    }
}
$('html,body').on('click','.cardOnDelivery',function(e){
    e.stopImmediatePropagation();
    $('.cardOnDeliveryCheck').hasClass('ico-check1') ? website_temp.cardOnDelivery = 0 : website_temp.cardOnDelivery = 1;
    website_temp.cardOnDelivery ? $('.cardOnDeliveryCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cardOnDeliveryCheck').removeClass('ico-check1').addClass('ico-check0');
    home_delivery_settings_unsave_check();
})
$('html,body').on('click','.cashOnDelivery',function(e){
    e.stopImmediatePropagation();
    $('.cashOnDeliveryCheck').hasClass('ico-check1') ? website_temp.cashOnDelivery = 0 : website_temp.cashOnDelivery = 1;
    website_temp.cashOnDelivery ? $('.cashOnDeliveryCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cashOnDeliveryCheck').removeClass('ico-check1').addClass('ico-check0');
    home_delivery_settings_unsave_check();
})
$('html,body').on('click','#deliveryPaymentMethodsCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.cashOnDelivery = website.cashOnDelivery;
    website_temp.cardOnDelivery = website.cardOnDelivery;
    website_temp.cardOnDelivery ? $('.cardOnDeliveryCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cardOnDeliveryCheck').removeClass('ico-check1').addClass('ico-check0');
    website_temp.cashOnDelivery ? $('.cashOnDeliveryCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cashOnDeliveryCheck').removeClass('ico-check1').addClass('ico-check0');
    home_delivery_settings_unsave_check();
})
$('html,body').on('click','#deliveryPaymentMethodsSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#deliveryPaymentMethodsSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveDeliveryPaymentMethods:true,
            cardOnDelivery:website_temp.cardOnDelivery,
            cashOnDelivery:website_temp.cashOnDelivery,
        },success:function(r){
            hideBtnLoading($('#deliveryPaymentMethodsSaveBtn'));
            if(r.saveDeliveryPaymentMethodsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.cardOnDelivery = website_temp.cardOnDelivery;
                website.cashOnDelivery = website_temp.cashOnDelivery;
                website_temp.cardOnDelivery ? $('.cardOnDeliveryCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cardOnDeliveryCheck').removeClass('ico-check1').addClass('ico-check0');
                website_temp.cashOnDelivery ? $('.cashOnDeliveryCheck').removeClass('ico-check0').addClass('ico-check1') : $('.cashOnDeliveryCheck').removeClass('ico-check1').addClass('ico-check0');
                home_delivery_settings_unsave_check();
            }else if(r.saveDeliveryPaymentMethodsStatus == 0){
                showAlert('error',r.msg,4000,true);
                home_delivery_settings_unsave_check();
            }
        }
    })

})
