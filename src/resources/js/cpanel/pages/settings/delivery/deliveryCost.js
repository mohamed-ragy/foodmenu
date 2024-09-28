deliveryCostNoSavecheck = function(){
    if(website_temp.deliveryCost == website.deliveryCost && website_temp.showDeliveryCostChangable == website.showDeliveryCostChangable){
        $('.deliveryFees-NoSave').addClass('none');
        return true;
    }else{
        $('.deliveryFees-NoSave').removeClass('none');
        return false;
    }
}
$('body').on('click','#deliveryCanChangeMsg',function(e){
    $(this).prop('checked') ? website_temp.showDeliveryCostChangable = 1 : website_temp.showDeliveryCostChangable = 0 ;
    home_delivery_settings_unsave_check();
});
$('body').on('input change','#deliveryCost',function(e){
    website_temp.deliveryCost = parseFloat($(this).val());
    home_delivery_settings_unsave_check();
})
$('body').on('click','#deliveryCostCancelBtn',function(e){
    website_temp.deliveryCost = website.deliveryCost;
    website_temp.showDeliveryCostChangable = website.showDeliveryCostChangable;
    $('#deliveryCost').val(parseFloat(website_temp.deliveryCost).toFixed(2));
    website_temp.showDeliveryCostChangable == 1 ? $('#deliveryCanChangeMsg').prop('checked',true) : $('#deliveryCanChangeMsg').prop('checked',false);
    home_delivery_settings_unsave_check();
})
$('body').on('click','#deliveryCostSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#deliveryCostSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveDeliveryCost:true,
            deliveryCost:website_temp.deliveryCost,
            showDeliveryCostChangable:website_temp.showDeliveryCostChangable,
        },success:function(r){
            hideBtnLoading($('#deliveryCostSaveBtn'));
            if(r.deliveryCostStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.deliveryCost = website_temp.deliveryCost;
                website.showDeliveryCostChangable = website_temp.showDeliveryCostChangable;
                $('#deliveryCost').val(parseFloat(website_temp.deliveryCost).toFixed(2));
                website_temp.showDeliveryCostChangable == 1 ? $('#deliveryCanChangeMsg').prop('checked',true) : $('#deliveryCanChangeMsg').prop('checked',false);
                home_delivery_settings_unsave_check();
            }else if(r.deliveryCostStatus == 0){
                showAlert('error',r.msg,4000,true);
                home_delivery_settings_unsave_check();
            }
        }
    })

})
