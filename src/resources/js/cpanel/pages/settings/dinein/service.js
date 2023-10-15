dineinServiceNoSaveCheck = function(){
    if(
        website_temp.useDineInServiceCost == website.useDineInServiceCost &&
        website_temp.dineInServiceCost == website.dineInServiceCost &&
        website_temp.dineInServicePercentage == website.dineInServicePercentage
    ){
        $('.dinein_service_charge_settings-noSave').addClass('none');
        return true;
    }else{
        $('.dinein_service_charge_settings-noSave').removeClass('none');
        return false;
    }
}
$('html,body').on('input change','#dineinServicePercent, #dineinServiceCost',function(){
    if($(this).val() == ''){$(this).val('0.00')}
    website_temp.dineInServiceCost = parseFloat($('#dineinServiceCost').val());
    website_temp.dineInServicePercentage = parseFloat($('#dineinServicePercent').val());
    dine_in_settings_unsave_check();
})
$('html,body').on('click','.useDineinServiceCost',function(e){
    e.stopImmediatePropagation();
    website_temp.useDineInServiceCost = 1
    $('.useDineinServiceCostCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.useDineinServicePercentCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.dineinServiceCostContainer').removeClass('none')
    $('.dineinServicePercentContainer').addClass('none')
    dine_in_settings_unsave_check();
})
$('html,body').on('click','.useDineinServicePercent',function(e){
    e.stopImmediatePropagation();
    website_temp.useDineInServiceCost = 0;
    $('.useDineinServiceCostCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.useDineinServicePercentCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.dineinServiceCostContainer').addClass('none')
    $('.dineinServicePercentContainer').removeClass('none')
    dine_in_settings_unsave_check();
})
$('html,body').on('click','#dineinServiceCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.useDineInServiceCost = website.useDineInServiceCost;
    website_temp.dineInServiceCost = website.dineInServiceCost;
    website_temp.dineInServicePercentage = website.dineInServicePercentage;
    $('#dineinServiceCost').val(parseFloat(website_temp.dineInServiceCost).toFixed(2))
    $('#dineinServicePercent').val(parseFloat(website_temp.dineInServicePercentage).toFixed(2))
    if(website_temp.useDineInServiceCost == 1){
        $('.useDineinServiceCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.useDineinServicePercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.dineinServiceCostContainer').removeClass('none')
        $('.dineinServicePercentContainer').addClass('none')
    }else{
        $('.useDineinServiceCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.useDineinServicePercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.dineinServiceCostContainer').addClass('none')
        $('.dineinServicePercentContainer').removeClass('none')
    }
    dine_in_settings_unsave_check();
})
$('html,body').on('click','#dineinServiceSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#dineinServiceSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveDineinServiceSettings:true,
            useDineInServiceCost:website_temp.useDineInServiceCost,
            dineInServiceCost:website_temp.dineInServiceCost,
            dineInServicePercentage:website_temp.dineInServicePercentage,
        },success:function(r){
            hideBtnLoading($('#dineinServiceSaveBtn'));
            if(r.dineinServiceSettingsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.useDineInServiceCost = website_temp.useDineInServiceCost;
                website.dineInServiceCost = website_temp.dineInServiceCost;
                website.dineInServicePercentage = website_temp.dineInServicePercentage;
                $('#dineinServiceCost').val(parseFloat(website_temp.dineInServiceCost).toFixed(2))
                $('#dineinServicePercent').val(parseFloat(website_temp.dineInServicePercentage).toFixed(2))
                dine_in_settings_unsave_check();
            }else if(r.dineinServiceSettingsStatus == 0){
                showAlert('error',r.msg,4000,true);
                dine_in_settings_unsave_check();
            }
        }
    })

})
