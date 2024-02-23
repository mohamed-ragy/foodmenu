$('html,body').on('keypress','#resetPasswordCode',function(e){
    e.stopImmediatePropagation();
    if(e.which == 13){
        $('#resetPasswordCodeBtn').trigger('click');
    }
})


$('html,body').on('click','#resetPasswordCodeBtn',function(e){
    e.stopImmediatePropagation();
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
                    changeForm('error',function(){
                        $('#msg').removeClass().addClass('cR m10').text(r.msg)
                    })
                }else{
                    hideBtnLoading($('#resetPasswordCodeBtn'))
                    $('#resetPasswordCode').prop('disabled',false).focus();
                    $('#msg').removeClass().addClass('cR m10').text(r.msg)
                }
            }else if(r.status == 2){
                changeForm('error',function(){
                    $('#msg').removeClass().addClass('cR m10').text(r.msg)
                })
            }else if(r.status == 3){
                changeForm('error',function(){
                    $('#msg').removeClass().addClass('cR m10').text(r.msg)
                })
            }else if(r.status == 1){
                changeForm('changePassword')
            }
        }
    })

})


