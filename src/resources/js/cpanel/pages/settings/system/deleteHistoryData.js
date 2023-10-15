//////////////////////delete data/////////////////////////////////
$('html,body').on('click','#deleteOrdersAndStatistics-btn',function(e){
    e.stopImmediatePropagation();
    if(!account.is_master){return;}
    if($('#deleteOrdersAndStatistics-password').val() == ''){
        inputTextError($('#deleteOrdersAndStatistics-password'))
        showAlert('error',texts.settings.passwordRequired,4000,true);
        return;
    }
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.settings.deleteDataConfirmText})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteOrdersAndStatistics-confirmBtn',class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })

});

$('html,body').on('click','#deleteOrdersAndStatistics-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!account.is_master){return;}
        if(!coolDownChecker()){return;}
        showBtnLoading($('#deleteOrdersAndStatistics-confirmBtn'))
        showBtnLoading($('#deleteOrdersAndStatistics-btn'))
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                deleteHistoryData:true,
                password:$('#deleteOrdersAndStatistics-password').val(),
            },success:function(response){
                closePopup();
                hideBtnLoading($('#deleteOrdersAndStatistics-confirmBtn'))
                hideBtnLoading($('#deleteOrdersAndStatistics-btn'))
                if(response.deleteHistoryDataStatus == 0){
                    showAlert('error',response.msg,4000,true);
                    $('#deleteOrdersAndStatistics-password').select();
                    $('#deleteOrdersAndStatistics-password').val('');
                    inputTextError($('#deleteOrdersAndStatistics-password'))
                }else if(response.deleteHistoryDataStatus == 1){
                    showAlert('success',response.msg,4000,true);
                    $('#deleteOrdersAndStatistics-password').val('');
                    ReloadForUpdatePopup();
                }else if(response.deleteHistoryDataStatus == 2){
                    $('#logoutForm').trigger('submit');
                }
            }
        })


})
