disableRecoverInputs = function(){
    showBtnLoading($('#recoverPasswordEmailBtn'))
    $('#recoverPasswordEmailInput').prop('disabled',true);
    showBtnLoading($('#recoverPasswordPhoneBtn'))
    $('#recoverPasswordPhoneInput').prop('disabled',true);
}
enableRecoverInputs = function(){
    hideBtnLoading($('#recoverPasswordEmailBtn'))
    $('#recoverPasswordEmailInput').prop('disabled',false);
    hideBtnLoading($('#recoverPasswordPhoneBtn'))
    $('#recoverPasswordPhoneInput').prop('disabled',false);
}


$('body').on('keypress','#recoverPasswordEmailInput',function(e){
    if(e.which == 13){
        $('#recoverPasswordEmailBtn').trigger('click');
    }
})
$('body').on('keypress','#recoverPasswordPhoneInput',function(e){
    if(e.which == 13){
        $('#recoverPasswordPhoneBtn').trigger('click');
    }
})



$('body').on('click','#recoverPasswordEmailBtn',function(e){
    disableRecoverInputs();
    window.resetPassword = 'email';
    window.resetPasswordEmail = $('#recoverPasswordEmailInput').val()
    $.ajax({
        url:'resetPassword',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            resetPasswordEmail:window.resetPasswordEmail,
        },success:function(r){
            enableRecoverInputs();
            if(r.status == 0){
                $('#msg').removeClass().addClass('cR m10').text(r.msg)
                $('#recoverPasswordEmailInput').focus();
            }else if(JSON.parse(r).status == 1){
                changeForm('forgetPassword_code')
            }else if(r.status == 2){
                changeForm('error',function(){
                    $('#msg').removeClass().addClass('cR m10').text(r.msg)
                })
            }
        }
    })
})


$('body').on('click','#recoverPasswordPhoneBtn',function(e){
    disableRecoverInputs();
    window.resetPassword = 'phone';
    window.resetPasswordPhone= $('#recoverPasswordPhoneInput').val()
    $.ajax({
        url:'resetPassword',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            resetPasswordPhone:window.resetPasswordPhone,
        },success:function(r){
            enableRecoverInputs();
            if(r.status == 0){
                $('#msg').removeClass().addClass('cR m10').text(r.msg)
            }else if(r.status == 1){
                changeForm('forgetPassword_code')
            }else if(r.status == 2){
                changeForm('error',function(){
                    $('#msg').removeClass().addClass('cR m10').text(r.msg)
                })
            }
        }
    })
})
