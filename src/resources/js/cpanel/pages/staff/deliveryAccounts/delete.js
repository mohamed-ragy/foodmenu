


$('html,body').on('click','.deleteDeliveryPerson',function(e){
    e.stopImmediatePropagation();
    let deliveryAccountId = $(this).attr('delivery');
    let deliveryAccount = website.deliveries.find(item=> item.id == deliveryAccountId);
    if(typeof(deliveryAccount) === 'undefined'){return;}
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.staff.deliveryAccountDeleteConfirmMsg.replace(':name:',deliveryAccount.deliveryName.split('@')[0])})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteDeliveryAccount-confirmBtn',delivery:deliveryAccount.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
});
$('html,body').on('click','#deleteDeliveryAccount-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let deliveryAccountId = $(this).attr('delivery');
    let deliveryAccount = website.deliveries.find(item=> item.id == deliveryAccountId);
    if(typeof(deliveryAccount) === 'undefined'){return;}
    showBtnLoading($('#deleteDeliveryAccount-confirmBtn'))
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteDeliveryAccount:deliveryAccountId,
            deliveryName:deliveryAccount.deliveryName,
        },
        success:function(response){
            hideBtnLoading($('#deleteDeliveryAccount-confirmBtn'))
            if(response.deleteDeliveryAccountStatus == 0){
                showAlert('error',response.msg,4000,true);
            }else if(response.deleteDeliveryAccountStatus == 1){
                showAlert('success',response.msg,4000,true);
                for(const key in website.deliveries){
                    if(website.deliveries[key].id == deliveryAccountId){
                        website.deliveries.splice(key,1);
                        website_temp.deliveries.splice(key,1);
                    }
                }
                drawDeliveryAccountsTable();
                closePopup();
            }
        }
    })
})
