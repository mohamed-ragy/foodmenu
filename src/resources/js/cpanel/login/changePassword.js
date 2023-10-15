showChangePasswordForm = function(){
    $('.formContainer').addClass('opacity0');
    $('#changePasswordPassword').val('').prop('disabled',false).prop('type','password');
    $('#changePasswordConfirm').val('').prop('disabled',false).prop('type','password');
    $('#changePasswordPassword').closest('.inputTextContainer').find('.inputText-clearVal').removeClass('ico-hidePassword').addClass('ico-showPassword')
    $('#changePasswordConfirm').closest('.inputTextContainer').find('.inputText-clearVal').removeClass('ico-hidePassword').addClass('ico-showPassword')
    hideBtnLoading($('#changePasswordBtn'))
    setTimeout(function(){
        $('.formContainer').addClass('none');
        $('#changePasswordForm').removeClass('none');
        $('#changePasswordForm').removeClass('opacity0');
        $('#changePasswordPassword').focus();
    },500)
}

$('#changePasswordPassword, #changePasswordConfirm').on('keypress',function(e){
    if(e.which == 13){
        $('#changePasswordBtn').trigger('click');
    }
})



$('#changePasswordBtn').on('click',function(){
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
                    $('#changePasswordMsg').text(r.error.newPassword[0]).removeClass('none');
                }else if('newPasswordConfirm' in r.error){
                    $('#changePasswordMsg').text(r.error.newPasswordConfirm[0]).removeClass('none');
                }

            }else if(r.status == 2){
                showErrorMsg(r.msg);
            }else if(r.status == 1){
                $('#loginEmailinput').val(window.resetPasswordEmail)
                $('#backToLoginForm').trigger('click');
                $('#loginMsg').removeClass().addClass('cG').text(r.msg);

            }
        }
    })
})
