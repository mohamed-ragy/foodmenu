

$('#security-verifyEmail-btn').on('click',function(){
    showBtnLoading($('#security-verifyEmail-btn'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyEmail:$('#security-verifyEmail').val(),
        },success:function(r){
            hideBtnLoading($('#security-verifyEmail-btn'))
            if(r.emailVerifyStats == 1){
                account.email_verification_code = null;
                account.email_verified_at = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                checkEmailVerification();
                showAlert('success',r.msg,4000,true);
                $('#security-verifyEmail').val('')
            }else if(r.emailVerifyStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});

$('#security-resendVerifyEmail-btn').on('click',function(){
    showBtnLoading($('#security-resendVerifyEmail-btn'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyEmailResendCode:true,
        },success:function(r){
            hideBtnLoading($('#security-resendVerifyEmail-btn'))
            if(r.verifyEmailResendCodeStats == 1){
                account.email_verification_code_sent_at = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                checkEmailVerificationResend();
                showAlert('success',r.msg,4000,true);
            }else if(r.verifyEmailResendCodeStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});

$('#security-changeEmail-btn').on('click',function(){
    $('#changeEmailPopup-email').text($('#security-changeEmail').val()+'?')
    showPopup($('#changeEmail-popup'));
});
$('#security-changeEmail-confirm').on('click',function(){
    showBtnLoading($('#security-changeEmail-btn'));
    showBtnLoading($('#security-changeEmail-confirm'));
    let newEmail = $('#security-changeEmail').val();
    let password = $('#security-changeEmail-password').val();
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeEmail:true,
            newEmail:newEmail,
            password:password,
        },success:function(r){
            hideBtnLoading($('#security-changeEmail-btn'))
            hideBtnLoading($('#security-changeEmail-confirm'))
            closePopup();
            if(r.changeEmailStats == 1){
                account.email = newEmail;
                account.email_verified_at = null;
                account.email_verification_code_sent_at = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                checkEmailVerificationResend();
                checkEmailVerification();
                $('#security-email').val(newEmail)
                $('#security-verifyEmail').val('')
                $('#security-changeEmail').val('');
                $('#security-changeEmail-password').val('');
                showAlert('success',r.msg,4000,true);
            }else if(r.changeEmailStats == 0){
                showAlert('error',r.errors.newEmail[0],4000,true);
                $('#security-changeEmail-password').val('');
                inputTextError($('#security-changeEmail'))
            }else if(r.changeEmailStats == 2){
                $('#security-changeEmail-password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.changeEmailStats == 3){
                inputTextError($('#security-changeEmail-password'))
                $('#security-changeEmail-password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.changeEmailStats == 4){
                $('#security-changeEmail-password').val('');
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})

let checkEmailVerificationFirstTime = false;
checkEmailVerification = function(){
    if(!account.is_master){return;}
    account.email_verified_at == null ? $('#security-emailVerified').addClass('none') : $('#security-emailVerified').removeClass('none')
    account.email_verified_at == null ? $('#security-emailNotVerified').removeClass('none') : $('#security-emailNotVerified').addClass('none')
    window.guideHints.emailVerification(checkEmailVerificationFirstTime);
    !checkEmailVerificationFirstTime ? checkEmailVerificationFirstTime = true : null;
}
let EmailVerificationResendTimer;
checkEmailVerificationResend = function(){
    if(!account.is_master){return;}
    $('#security-resendVerifyEmail-btn').prop('disabled',true)
    clearInterval(EmailVerificationResendTimer);
    EmailVerificationResendTimer = setInterval(function(){
        let lastVerficationSendAt_e = new Date(account.email_verification_code_sent_at).toLocaleString();
        let lastVerficationSendAtUnformated_e = Date.parse(lastVerficationSendAt_e) + 600000;
        if((Date.parse(new Date().toLocaleString('en-US', { timeZone: 'UTC' })) ) < lastVerficationSendAtUnformated_e){
            timeLeft_e = lastVerficationSendAtUnformated_e  - (Date.parse(new Date().toLocaleString('en-US', { timeZone: 'UTC' })) );
            minuts_e = (timeLeft_e / 60000);
            mins_e = ('0' + Math.floor(minuts_e).toFixed(0)).slice(-2);
            seconds_e = ('0' + Math.floor((((timeLeft_e - minuts_e)/1000)+1) %60).toFixed(0)).slice(-2);
            $('#security-resendVerifyEmail-btn').prop('disabled',true).find('.btnTxt').text(`${texts.security.resendCode2} ${mins_e}:${seconds_e}`)
        }else{
            clearInterval(EmailVerificationResendTimer);
            $('#security-resendVerifyEmail-btn').prop('disabled',false).find('.btnTxt').text(texts.security.resendCode)
        }

    },1000);
}

checkEmailVerificationResend();
checkEmailVerification();
