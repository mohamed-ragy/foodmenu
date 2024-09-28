deliveryPaymentMethodsNoSaveCheck = function(){
    if(website_temp.card_on_delivery == website.card_on_delivery && website_temp.cash_on_delivery == website.cash_on_delivery){
        $('.delivery_payment_methods-NoSave').addClass('none');
        return true;
    }else{
        $('.delivery_payment_methods-NoSave').removeClass('none');
        return false;

    }
}
$('body').on('click','.card_on_delivery',function(e){
    $('.card_on_delivery_check').hasClass('ico-check1') ? website_temp.card_on_delivery = 0 : website_temp.card_on_delivery = 1;
    website_temp.card_on_delivery ? $('.card_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : $('.card_on_delivery_check').removeClass('ico-check1').addClass('ico-check0');
    home_delivery_settings_unsave_check();
})
$('body').on('click','.cash_on_delivery',function(e){
    $('.cash_on_delivery_check').hasClass('ico-check1') ? website_temp.cash_on_delivery = 0 : website_temp.cash_on_delivery = 1;
    website_temp.cash_on_delivery ? $('.cash_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : $('.cash_on_delivery_check').removeClass('ico-check1').addClass('ico-check0');
    home_delivery_settings_unsave_check();
})
$('body').on('click','#deliveryPaymentMethodsCancelBtn',function(e){
    website_temp.cash_on_delivery = website.cash_on_delivery;
    website_temp.card_on_delivery = website.card_on_delivery;
    website_temp.cash_on_delivery ? $('.cash_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : $('.cash_on_delivery_check').removeClass('ico-check1').addClass('ico-check0');
    website_temp.card_on_delivery ? $('.card_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : $('.card_on_delivery_check').removeClass('ico-check1').addClass('ico-check0');
    home_delivery_settings_unsave_check();
})
$('body').on('click','#deliveryPaymentMethodsSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#deliveryPaymentMethodsSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveDeliveryPaymentMethods:true,
            card_on_delivery:website_temp.card_on_delivery,
            cash_on_delivery:website_temp.cash_on_delivery,
        },success:function(r){
            hideBtnLoading($('#deliveryPaymentMethodsSaveBtn'));
            if(r.saveDeliveryPaymentMethodsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.card_on_delivery = website_temp.card_on_delivery;
                website.cash_on_delivery = website_temp.cash_on_delivery;
                website_temp.card_on_delivery ? $('.card_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : $('.card_on_delivery_check').removeClass('ico-check1').addClass('ico-check0');
                website_temp.cash_on_delivery ? $('.cash_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : $('.cash_on_delivery_check').removeClass('ico-check1').addClass('ico-check0');
                home_delivery_settings_unsave_check();
            }else if(r.saveDeliveryPaymentMethodsStatus == 0){
                showAlert('error',r.msg,4000,true);
                home_delivery_settings_unsave_check();
            }
        }
    })

})
