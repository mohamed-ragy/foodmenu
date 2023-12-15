$('html,body').on('click','#account-changePassword_btn',function(e){
    e.stopImmediatePropagation();
    if($('#account-current_password').val() == '' || $('#account-new_password').val() == '' || $('#account-new_password_confirm').val() == ''){return;}
    showPopup('changePasswordConfirm',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange mxw400'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',html:texts.security.newPasswordConfirmText})
            ),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn',id:'account-newPassword-confirm'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.yes})
                )
            )
        )
    })
})
$('html,body').on('click','#account-newPassword-confirm',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#account-changePassword_btn'));
    showBtnLoading($('#account-newPassword-confirm'));
    let oldPassword = $('#account-current_password').val();
    let newPassword = $('#account-new_password').val();
    let newPasswordConfirm = $('#account-new_password_confirm').val();
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changePassword:true,
            oldPassword:oldPassword,
            newPassword:newPassword,
            newPasswordConfirm:newPasswordConfirm,
        },success:function(r){
            hideBtnLoading($('#account-changePassword_btn'));
            hideBtnLoading($('#account-newPassword-confirm'));
            closePopup();
            $('#account-current_password').val('');
            $('#account-new_password').val('');
            $('#account-new_password_confirm').val('');
            if(r.changePasswordStat == 0){
                if('newPassword' in r.error){
                    showAlert('error',r.error.newPassword[0],4000,true);
                    inputTextError($('#account-new_password'))
                }else if('newPasswordConfirm' in r.error){
                    showAlert('error',r.error.newPasswordConfirm[0],4000,true);
                    inputTextError($('#account-new_password_confirm'))
                }
            }else if(r.changePasswordStat == 1){
                showAlert('success',r.msg,4000,true);
            }else if(r.changePasswordStat == 2){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#account-new_password'));
            }else if(r.changePasswordStat == 3){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#account-current_password'))
            }else if(r.changePasswordStat == 4){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
