pickupTaxNoSaveCheck = function(){
    if(
        website_temp.usePickupTaxCost == website.usePickupTaxCost &&
        website_temp.pickupTaxCost == website.pickupTaxCost &&
        website_temp.pickupTaxPercentage == website.pickupTaxPercentage
    ){
        $('.pickup_tax_settings-noSave').addClass('none');
        return true;
    }else{
        $('.pickup_tax_settings-noSave').removeClass('none');
        return false;
    }
}
$('html,body').on('input change','#pickupTaxPercent, #pickupTaxCost',function(){
    if($(this).val() == ''){$(this).val('0.00')}
    website_temp.pickupTaxCost = parseFloat($('#pickupTaxCost').val());
    website_temp.pickupTaxPercentage = parseFloat($('#pickupTaxPercent').val());
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','.usePickupTaxCost',function(e){
    e.stopImmediatePropagation();
    website_temp.usePickupTaxCost = 1
    $('.usePickupTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.usePickupTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.pickupTaxCostContainer').removeClass('none')
    $('.pickupTaxPercentContainer').addClass('none')
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','.usePickupTaxPercent',function(e){
    e.stopImmediatePropagation();
    website_temp.usePickupTaxCost = 0;
    $('.usePickupTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.usePickupTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.pickupTaxCostContainer').addClass('none')
    $('.pickupTaxPercentContainer').removeClass('none')
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','#pickupTaxCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.usePickupTaxCost = website.usePickupTaxCost;
    website_temp.pickupTaxCost = website.pickupTaxCost;
    website_temp.pickupTaxPercentage = website.pickupTaxPercentage;
    $('#pickupTaxCost').val(parseFloat(website_temp.pickupTaxCost).toFixed(2))
    $('#pickupTaxPercent').val(parseFloat(website_temp.pickupTaxPercentage).toFixed(2))
    if(website_temp.usePickupTaxCost == 1){
        $('.usePickupTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.usePickupTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.pickupTaxCostContainer').removeClass('none')
        $('.pickupTaxPercentContainer').addClass('none')
    }else{
        $('.usePickupTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.usePickupTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.pickupTaxCostContainer').addClass('none')
        $('.pickupTaxPercentContainer').removeClass('none')
    }
    order_pickup_settings_unsave_check();
})
$('html,body').on('click','#pickupTaxSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#pickupTaxSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            savePickupTaxSettings:true,
            usePickupTaxCost:website_temp.usePickupTaxCost,
            pickupTaxCost:website_temp.pickupTaxCost,
            pickupTaxPercentage:website_temp.pickupTaxPercentage,
        },success:function(r){
            hideBtnLoading($('#pickupTaxSaveBtn'));
            if(r.pickupTaxSettingsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.usePickupTaxCost = website_temp.usePickupTaxCost;
                website.pickupTaxCost = website_temp.pickupTaxCost;
                website.pickupTaxPercentage = website_temp.pickupTaxPercentage;
                $('#pickupTaxCost').val(parseFloat(website_temp.pickupTaxCost).toFixed(2))
                $('#pickupTaxPercent').val(parseFloat(website_temp.pickupTaxPercentage).toFixed(2))
                order_pickup_settings_unsave_check();
            }else if(r.pickupTaxSettingsStatus == 0){
                showAlert('error',r.msg,4000,true);
                order_pickup_settings_unsave_check();
            }
        }
    })

})
