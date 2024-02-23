
$('html,body').on('keypress','#changePasswordPassword, #changePasswordConfirm',function(e){
    e.stopImmediatePropagation();
    if(e.which == 13){
        $('#changePasswordBtn').trigger('click');
    }
})



$('html,body').on('click','#changePasswordBtn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#changePasswordBtn'));
    $('#changePasswordPassword').prop('disabled',true);
    $('#changePasswordConfirm').prop('disabled',true);
    $.ajax({
        url:'resetPassword',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changePasswordCode:window.resetPasswordCode,
            recoverVia:window.resetPassword,
            resetPasswordViaEmail:window.resetPasswordEmail,
            resetPasswordViaPhone:window.resetPasswordPhone,
            newPassword:$('#changePasswordPassword').val(),
            newPasswordConfirm:$('#changePasswordConfirm').val(),
        },success:function(r){
            hideBtnLoading($('#changePasswordBtn'));
            $('#changePasswordPassword').prop('disabled',false);
            $('#changePasswordConfirm').prop('disabled',false);
            if(r.status == 0){
                if('newPassword' in r.error){
                        $('#msg').removeClass().addClass('cR m10').text(r.error.newPassword[0])
                    }else if('newPasswordConfirm' in r.error){
                        $('#msg').removeClass().addClass('cR m10').text(r.error.newPasswordConfirm[0])
                }

            }else if(r.status == 2){
                changeForm('error',function(){
                    $('#msg').removeClass().addClass('cR m10').text(r.msg)
                })
            }else if(r.status == 1){
                changeForm('login',function(){
                    $('#loginEmailinput').val(window.resetPasswordEmail)
                    $('#msg').removeClass().addClass('cG').text(r.msg);

                })
            }
        }
    })
})
