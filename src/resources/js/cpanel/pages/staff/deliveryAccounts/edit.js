$('body').on('click','.editDeliveryAccountPassword',function(e){
    let deliveryAccountId = $(this).attr('delivery');
    let deliveryAccount = website.deliveries.find(item=> item.id == deliveryAccountId);
    showPopup('changeDeliveryAccountPassword',function(){
        $('.popupBody').append(
            $('<div/>',{text:deliveryAccount.deliveryName,class:'bold500 mT10'}),
            drawInputText('','ico-password','',texts.staff.newPassword,'changeDeliveryAccountPassword_password','password',texts.staff.newPassword,100,'password','inputTextContainer_100p','',false),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'btn',id:'changeDeliveryAccountPasswordBtn',delivery:deliveryAccount.id}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.confirm})
                )
            )
        )
    })
})
$('body').on('click','#changeDeliveryAccountPasswordBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#changeDeliveryAccountPasswordBtn'))
    let deliveryId = $(this).attr('delivery');
    let password = $('#changeDeliveryAccountPassword_password').val();
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeDeliveryPassword:deliveryId,
            password:password,
        },success:function(r){
            hideBtnLoading($('#changeDeliveryAccountPasswordBtn'))
            if(r.changeDeliveryPasswordStats == 1){
                showAlert('success',r.msg,4000,true);
                closePopup();
            }else if(r.changeDeliveryPasswordStats == 0){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#changeDeliveryAccountPassword_password'))
            }else if(r.changeDeliveryPasswordStats == 2){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
