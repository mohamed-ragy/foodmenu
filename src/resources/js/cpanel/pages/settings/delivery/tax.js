homeDeliveryTaxNoSaveCheck = function(){
    if(
        website_temp.useDeliveryTaxCost == website.useDeliveryTaxCost &&
        website_temp.deliveryTaxCost == website.deliveryTaxCost &&
        website_temp.deliveryTaxPercentage == website.deliveryTaxPercentage
    ){
        $('.delivery_tax_settings-noSave').addClass('none');
        return true;
    }else{
        $('.delivery_tax_settings-noSave').removeClass('none');
        return false;
    }
}
$('body').on('input change','#deliveryTaxPercent, #deliveryTaxCost',function(){
    if($(this).val() == ''){$(this).val('0.00')}
    website_temp.deliveryTaxCost = parseFloat($('#deliveryTaxCost').val());
    website_temp.deliveryTaxPercentage = parseFloat($('#deliveryTaxPercent').val());
    home_delivery_settings_unsave_check();
})
$('body').on('click','.useDeliveryTaxCost',function(e){
    website_temp.useDeliveryTaxCost = 1
    $('.useDeliveryTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.useDeliveryTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.deliveryTaxCostContainer').removeClass('none')
    $('.deliveryTaxPercentContainer').addClass('none')
    home_delivery_settings_unsave_check();
})
$('body').on('click','.useDeliveryTaxPercent',function(e){
    website_temp.useDeliveryTaxCost = 0;
    $('.useDeliveryTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.useDeliveryTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.deliveryTaxCostContainer').addClass('none')
    $('.deliveryTaxPercentContainer').removeClass('none')
    home_delivery_settings_unsave_check();
})

$('body').on('click','#deliveryTaxCancelBtn',function(e){
    website_temp.useDeliveryTaxCost = website.useDeliveryTaxCost;
    website_temp.deliveryTaxCost = website.deliveryTaxCost;
    website_temp.deliveryTaxPercentage = website.deliveryTaxPercentage;
    $('#deliveryTaxCost').val(parseFloat(website_temp.deliveryTaxCost).toFixed(2))
    $('#deliveryTaxPercent').val(parseFloat(website_temp.deliveryTaxPercentage).toFixed(2))
    if(website_temp.useDeliveryTaxCost == 1){
        $('.useDeliveryTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.useDeliveryTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.deliveryTaxCostContainer').removeClass('none')
        $('.deliveryTaxPercentContainer').addClass('none')
    }else{
        $('.useDeliveryTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.useDeliveryTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.deliveryTaxCostContainer').addClass('none')
        $('.deliveryTaxPercentContainer').removeClass('none')
    }
    home_delivery_settings_unsave_check();
})
$('body').on('click','#deliveryTaxSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#deliveryTaxSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveDeliveryTaxSettings:true,
            useDeliveryTaxCost:website_temp.useDeliveryTaxCost,
            deliveryTaxCost:website_temp.deliveryTaxCost,
            deliveryTaxPercentage:website_temp.deliveryTaxPercentage,
        },success:function(r){
            hideBtnLoading($('#deliveryTaxSaveBtn'));
            if(r.deliveryTaxSettingsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.useDeliveryTaxCost = website_temp.useDeliveryTaxCost;
                website.deliveryTaxCost = website_temp.deliveryTaxCost;
                website.deliveryTaxPercentage = website_temp.deliveryTaxPercentage;
                $('#deliveryTaxCost').val(parseFloat(website_temp.deliveryTaxCost).toFixed(2))
                $('#deliveryTaxPercent').val(parseFloat(website_temp.deliveryTaxPercentage).toFixed(2))
                home_delivery_settings_unsave_check();
            }else if(r.deliveryTaxSettingsStatus == 0){
                showAlert('error',r.msg,4000,true);
                home_delivery_settings_unsave_check();
            }
        }
    })

})
