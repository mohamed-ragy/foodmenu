$('#security-changePasswordBtn').on('click',function(){
    showPopup($('#changePassword-popup'))
})
$('#security-changePassword-confirm').on('click',function(){
    showBtnLoading($('#security-changePassword-confirm'));
    showBtnLoading($('#security-changePasswordBtn'));
    let oldPassword = $('#security-oldPassword').val();
    let newPassword = $('#security-newPassword').val();
    let newPasswordConfirm = $('#security-newPasswordConfirm').val();
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
            hideBtnLoading($('#security-changePassword-confirm'));
            hideBtnLoading($('#security-changePasswordBtn'));
            closePopup();
            $('#security-oldPassword').val('');
            $('#security-newPassword').val('');
            $('#security-newPasswordConfirm').val('');
            if(r.changePasswordStat == 0){
                if('newPassword' in r.error){
                    showAlert('error',r.error.newPassword[0],4000,true);
                    inputTextError($('#security-newPassword'))
                }else if('newPasswordConfirm' in r.error){
                    showAlert('error',r.error.newPasswordConfirm[0],4000,true);
                    inputTextError($('#security-newPasswordConfirm'))
                }
            }else if(r.changePasswordStat == 1){
                showAlert('success',r.msg,4000,true);
            }else if(r.changePasswordStat == 2){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#security-newPassword'));
            }else if(r.changePasswordStat == 3){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#security-oldPassword'))
            }else if(r.changePasswordStat == 4){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
