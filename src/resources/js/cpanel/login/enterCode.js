showResetPasswordEnterCodeForm = function(){
    window.resetPasswordCode = null
    $('#forgetPasswordContainer').addClass('opacity0');
    $('#resetPasswordCode').val('');
    hideBtnLoading($('#resetPasswordCodeBtn'))
    $('#resetPasswordCode').prop('disabled',false)
    $('#resetPasswordEnterCodeMsg').text('').addClass('none');
    setTimeout(()=>{
        resetForgetPasswordForm();
        $('#forgetPasswordContainer').addClass('none');
        $('#resetPasswordEnterCodeForm').removeClass('none');
        $('#resetPasswordEnterCodeForm').removeClass('opacity0');
        $('#resetPasswordCode').focus();
    },500)
}

$('#resetPasswordCode').on('keypress',function(e){
    if(e.which == 13){
        $('#resetPasswordCodeBtn').trigger('click');
    }
})


$('#resetPasswordCodeBtn').on('click',function(e){
    showBtnLoading($('#resetPasswordCodeBtn'))
    $('#resetPasswordCode').prop('disabled',true);
    window.resetPasswordCode = $('#resetPasswordCode').val()
    $.ajax({
        url:'resetPassword',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            resetPasswordCheckCode:window.resetPasswordCode,
            recoverVia:window.resetPassword,
            resetPasswordViaEmail:window.resetPasswordEmail,
            resetPasswordViaPhone:window.resetPasswordPhone,
        },success:function(r){
            if(r.status == 0){
                window.resetCodeFails = window.resetCodeFails + 1;
                if(window.resetCodeFails > 3){
                    showErrorMsg(r.msg);
                }else{
                    hideBtnLoading($('#resetPasswordCodeBtn'))
                    $('#resetPasswordCode').prop('disabled',false);
                    $('#resetPasswordEnterCodeMsg').text(r.msg).removeClass('none');
                }
            }else if(r.status == 2){
                showErrorMsg(r.msg);
            }else if(r.status == 3){
                showErrorMsg(r.msg);
            }else if(r.status == 1){
                showChangePasswordForm();
            }
        }
    })

})


// window.resetPassword = null;
// window.resetPasswordEmail = null;
// window.resetPasswordPhone = null;
