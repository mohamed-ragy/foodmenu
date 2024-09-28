pickupMinimumChargeNoSaveCheck = function(){
    if(
        website_temp.pickupMinimumChargeIncludes == website.pickupMinimumChargeIncludes &&
        website_temp.pickupMinimumCharge == website.pickupMinimumCharge
    ){
        $('.pickup_minimum_charge-NoSave').addClass('none');
        return true;
    }else{
        $('.pickup_minimum_charge-NoSave').removeClass('none');
        return false;
    }
}
$('body').on('click','#pickupMinimumChargeIncludes',function(e){
    $(this).prop('checked') == true ? website_temp.pickupMinimumChargeIncludes = 1 : website_temp.pickupMinimumChargeIncludes = 0 ;
    order_pickup_settings_unsave_check();
});
$('body').on('input change','#pickupMinimumCharge',function(e){
    $(this).val() == '' ? $(this).val('0.00') : null ;
    website_temp.pickupMinimumCharge = parseFloat($(this).val())
    order_pickup_settings_unsave_check();
})
$('body').on('click','#pickupMinimumChargeCancelBtn',function(e){
    website_temp.pickupMinimumChargeIncludes = website.pickupMinimumChargeIncludes;
    website_temp.pickupMinimumCharge = website.pickupMinimumCharge;
    $('#pickupMinimumCharge').val(parseFloat(website_temp.pickupMinimumCharge).toFixed(2));
    website_temp.pickupMinimumChargeIncludes == 1 ? $('#pickupMinimumChargeIncludes').prop('checked',true) : $('#pickupMinimumChargeIncludes').prop('checked',false) ;
    order_pickup_settings_unsave_check();
})
$('body').on('click','#pickupMinimumChargeSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#pickupMinimumChargeSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            savePickupMinimumCharge:true,
            pickupMinimumCharge:website_temp.pickupMinimumCharge,
            pickupMinimumChargeIncludes:website_temp.pickupMinimumChargeIncludes,
        },success:function(r){
            hideBtnLoading($('#pickupMinimumChargeSaveBtn'));
            if(r.pickupMinimumChargeStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.pickupMinimumCharge = website_temp.pickupMinimumCharge;
                website.pickupMinimumChargeIncludes = website_temp.pickupMinimumChargeIncludes;
                $('#pickupMinimumCharge').val(parseFloat(website_temp.pickupMinimumCharge).toFixed(2));
                order_pickup_settings_unsave_check();
            }else if(r.pickupMinimumChargeStatus == 0){
                showAlert('error',r.msg,4000,true);
                order_pickup_settings_unsave_check();
            }
        }
    })
});
