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


$('html,body').on('keypress','#recoverPasswordEmailInput',function(e){
    e.stopImmediatePropagation();
    if(e.which == 13){
        $('#recoverPasswordEmailBtn').trigger('click');
    }
})
$('html,body').on('keypress','#recoverPasswordPhoneInput',function(e){
    e.stopImmediatePropagation();
    if(e.which == 13){
        $('#recoverPasswordPhoneBtn').trigger('click');
    }
})



$('html,body').on('click','#recoverPasswordEmailBtn',function(e){
    e.stopImmediatePropagation();
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


$('html,body').on('click','#recoverPasswordPhoneBtn',function(e){
    e.stopImmediatePropagation();
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
