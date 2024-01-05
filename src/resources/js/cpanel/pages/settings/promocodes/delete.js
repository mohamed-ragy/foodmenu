$('html,body').on('click','.promocodeDeleteBtn',function(e){
    e.stopImmediatePropagation();
    let promocode = window.promocodes.find(item=> item.id == $(this).attr('promocode'));
    if(typeof(promocode) === 'undefined'){return;}
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.settings.deletePromocodeConfirmMsg.replace(':promocode:',promocode.code)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deletePromocode-confirmBtn',promocode:promocode.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#deletePromocode-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return}
    let promocode = window.promocodes.find(item=> item.id == $(this).attr('promocode'));
    if(typeof(promocode) === 'undefined'){return;}
    showBtnLoading($('#deletePromocode-confirmBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deletePromocode:promocode.id,
            promocode:promocode.code,
        },success:function(response){
            hideBtnLoading($('#deletePromocode-confirmBtn'));
            if(response.deletePromocodestats == 1){
                for(const key in window.promocodes){
                    if(window.promocodes[key].id == promocode.id){
                        window.promocodes.splice(key,1)
                    }
                }
                for(const key in window.promocodes_temp){
                    if(window.promocodes_temp[key].id == promocode.id){
                        window.promocodes_temp.splice(key,1)
                    }
                }
                drawPromocodes();
                closePopup();
                showAlert('success',response.msg,4000,true);
            }else if(response.deletePromocodestats == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
