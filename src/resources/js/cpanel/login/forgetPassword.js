resetForgetPasswordForm = function(){
    enableRecoverInputs();
    $('#recoverPassEmailMsg').removeClass().text('')
    $('#recoverPassPhoneMsg').removeClass().text('')
    $('#recoverPasswordEmailInput').val('');
    $('#recoverPasswordPhoneInput').val('');
    showForgetPasswordSelect();
}

showForgetPasswordSelect = function(){
    $('#forgetPasswordSelectContainer').removeClass('none');
    $('#forgetPasswordEmailContainer').addClass('opacity0');
    $('#forgetPasswordPhoneContainer').addClass('opacity0');
    setTimeout(()=>{
        $('#forgetPasswordSelectContainer').removeClass('opacity0');
        $('#forgetPasswordEmailContainer').addClass('none');
        $('#forgetPasswordPhoneContainer').addClass('none');
    },500)
}
showForgetPasswordEmail = function(){
    $('#forgetPasswordSelectContainer').addClass('opacity0');
    $('#forgetPasswordPhoneContainer').addClass('opacity0 none');
    setTimeout(()=>{
        $('#forgetPasswordEmailContainer').removeClass('none');
        $('#forgetPasswordSelectContainer').addClass('none');
        setTimeout(()=>{
            $('#forgetPasswordEmailContainer').removeClass('opacity0');
            $('#recoverPasswordEmailInput').focus();
        },100)
    },500)
}
showForgetPasswordPhone = function(){
    $('#forgetPasswordSelectContainer').addClass('opacity0');
    $('#forgetPasswordEmailContainer').addClass('opacity0 none');
    setTimeout(()=>{
        $('#forgetPasswordPhoneContainer').removeClass('none');
        $('#forgetPasswordSelectContainer').addClass('none');
        setTimeout(()=>{
            $('#forgetPasswordPhoneContainer').removeClass('opacity0');
            $('#recoverPasswordPhoneInput').focus();
        },100)
    },500)
}
$('#forgetPasswordSelectEmail').on('click',function(){
    showForgetPasswordEmail();
})
$('#forgetPasswordSelectPhone').on('click',function(){
    showForgetPasswordPhone();
})


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


$('#recoverPasswordEmailInput').on('keypress',function(e){
    if(e.which == 13){
        $('#recoverPasswordEmailBtn').trigger('click');
    }
})

$('#recoverPasswordEmailBtn').on('click',function(e){

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
                $('#recoverPassEmailMsg').removeClass().addClass('cR m10').text(r.msg)
            }else if(r.status == 1){
                showResetPasswordEnterCodeForm();
            }else if(r.status == 2){
                showErrorMsg(r.msg);
            }
        }
    })
})

$('#recoverPasswordPhoneInput').on('keypress',function(e){
    if(e.which == 13){
        $('#recoverPasswordPhoneBtn').trigger('click');
    }
})


$('#recoverPasswordPhoneBtn').on('click',function(e){
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
                $('#recoverPassPhoneMsg').removeClass().addClass('cR m10').text(r.msg)
            }else if(r.status == 1){
                showResetPasswordEnterCodeForm();
            }else if(r.status == 2){
                showErrorMsg(r.msg);
            }
        }
    })
})
