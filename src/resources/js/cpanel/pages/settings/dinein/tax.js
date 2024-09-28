dineinTaxNoSaveCheck = function(){
    if(
        website_temp.useDineInTaxCost == website.useDineInTaxCost &&
        website_temp.dineInTaxCost == website.dineInTaxCost &&
        website_temp.dineInTaxPercentage == website.dineInTaxPercentage
    ){
        $('.dinein_tax_settings-noSave').addClass('none');
        return true;
    }else{
        $('.dinein_tax_settings-noSave').removeClass('none');
        return false;
    }
}
$('body').on('input change','#dineinTaxPercent, #dineinTaxCost',function(){
    if($(this).val() == ''){$(this).val('0.00')}
    website_temp.dineInTaxCost = parseFloat($('#dineinTaxCost').val());
    website_temp.dineInTaxPercentage = parseFloat($('#dineinTaxPercent').val());
    dine_in_settings_unsave_check();
})
$('body').on('click','.useDineinTaxCost',function(e){
    website_temp.useDineInTaxCost = 1
    $('.useDineinTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.useDineinTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.dineinTaxCostContainer').removeClass('none')
    $('.dineinTaxPercentContainer').addClass('none')
    dine_in_settings_unsave_check();
})
$('body').on('click','.useDineinTaxPercent',function(e){
    website_temp.useDineInTaxCost = 0;
    $('.useDineinTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.useDineinTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.dineinTaxCostContainer').addClass('none')
    $('.dineinTaxPercentContainer').removeClass('none')
    dine_in_settings_unsave_check();
})
$('body').on('click','#dineinTaxCancelBtn',function(e){
    website_temp.useDineInTaxCost = website.useDineInTaxCost;
    website_temp.dineInTaxCost = website.dineInTaxCost;
    website_temp.dineInTaxPercentage = website.dineInTaxPercentage;
    $('#dineinTaxCost').val(parseFloat(website_temp.dineInTaxCost).toFixed(2))
    $('#dineinTaxPercent').val(parseFloat(website_temp.dineInTaxPercentage).toFixed(2))
    if(website_temp.useDineInTaxCost == 1){
        $('.useDineinTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.useDineinTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.dineinTaxCostContainer').removeClass('none')
        $('.dineinTaxPercentContainer').addClass('none')
    }else{
        $('.useDineinTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.useDineinTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.dineinTaxCostContainer').addClass('none')
        $('.dineinTaxPercentContainer').removeClass('none')
    }
    dine_in_settings_unsave_check();
})
$('body').on('click','#dineinTaxSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#dineinTaxSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveDineinTaxSettings:true,
            useDineInTaxCost:website_temp.useDineInTaxCost,
            dineInTaxCost:website_temp.dineInTaxCost,
            dineInTaxPercentage:website_temp.dineInTaxPercentage,
        },success:function(r){
            hideBtnLoading($('#dineinTaxSaveBtn'));
            if(r.dineinTaxSettingsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.useDineInTaxCost = website_temp.useDineInTaxCost;
                website.dineInTaxCost = website_temp.dineInTaxCost;
                website.dineInTaxPercentage = website_temp.dineInTaxPercentage;
                $('#dineinTaxCost').val(parseFloat(website_temp.dineInTaxCost).toFixed(2))
                $('#dineinTaxPercent').val(parseFloat(website_temp.dineInTaxPercentage).toFixed(2))
                dine_in_settings_unsave_check();
            }else if(r.dineinTaxSettingsStatus == 0){
                showAlert('error',r.msg,4000,true);
                dine_in_settings_unsave_check();
            }
        }
    })

})
