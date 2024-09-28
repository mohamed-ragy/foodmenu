deliveryMinimumChargeNoSaveCheck = function(){
    if(
        website_temp.deliveryMinimumChargeIncludes == website.deliveryMinimumChargeIncludes &&
        website_temp.deliveryMinimumCharge == website.deliveryMinimumCharge
    ){
        $('.delivery_minimum_charge-NoSave').addClass('none');
        return true;
    }else{
        $('.delivery_minimum_charge-NoSave').removeClass('none');
        return false;
    }
}
$('body').on('click','#deliveryMinimumChargeIncludes',function(e){
    $(this).prop('checked') == true ? website_temp.deliveryMinimumChargeIncludes = 1 : website_temp.deliveryMinimumChargeIncludes = 0 ;
    home_delivery_settings_unsave_check();
});
$('body').on('input change','#deliveryMinimumCharge',function(e){
    $(this).val() == '' ? $(this).val('0.00') : null ;
    website_temp.deliveryMinimumCharge = parseFloat($(this).val())
    home_delivery_settings_unsave_check();
})
$('body').on('click','#deliveryMinimumChargeCancelBtn',function(e){
    website_temp.deliveryMinimumChargeIncludes = website.deliveryMinimumChargeIncludes;
    website_temp.deliveryMinimumCharge = website.deliveryMinimumCharge;
    $('#deliveryMinimumCharge').val(parseFloat(website_temp.deliveryMinimumCharge).toFixed(2));
    website_temp.deliveryMinimumChargeIncludes == 1 ? $('#deliveryMinimumChargeIncludes').prop('checked',true) : $('#deliveryMinimumChargeIncludes').prop('checked',false) ;
    home_delivery_settings_unsave_check();
})
$('body').on('click','#deliveryMinimumChargeSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#deliveryMinimumChargeSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveDeliveryMinimumCharge:true,
            deliveryMinimumCharge:website_temp.deliveryMinimumCharge,
            deliveryMinimumChargeIncludes:website_temp.deliveryMinimumChargeIncludes,
        },success:function(r){
            hideBtnLoading($('#deliveryMinimumChargeSaveBtn'));
            if(r.saveDeliveryMinimumChargeStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.deliveryMinimumCharge = website_temp.deliveryMinimumCharge;
                website.deliveryMinimumChargeIncludes = website_temp.deliveryMinimumChargeIncludes;
                $('#deliveryMinimumCharge').val(parseFloat(website_temp.deliveryMinimumCharge).toFixed(2));
                home_delivery_settings_unsave_check();
            }else if(r.saveDeliveryMinimumChargeStatus == 0){
                showAlert('error',r.msg,4000,true);
                home_delivery_settings_unsave_check();
            }
        }
    })
});
