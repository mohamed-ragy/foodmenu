
checkEmailVerification = function(){
    if(account.email_verified_at == null){
        $('#emailVerificationArea').removeClass('none')
        $('#emailVerificationContainer').text('').append(
            $('<div/>',{class:'msgBox_orange mX0 wFC'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.security.emailNotVerifiedTxt})
            ),
        )
    }else{
        $('#emailVerificationArea').addClass('none')
        $('#emailVerificationContainer').text('').append(
            $('<div/>',{class:'msgBox_green mX0 wFC'}).append(
                $('<span/>',{class:'ico-success fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.security.emailVerified})
            ),
        )
    }
    window.guideHints.emailVerification();
    email_address_unsave_check();
}
emailVerification_NoSave = function(){
    if(account.email_verified_at == null){
        $('.emailAddress_noSave').removeClass('none')
        return false;
    }else{
        $('.emailAddress_noSave').addClass('none')
        return true;
    }
}


$('html,body').on('click','#security-verifyEmail-btn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#security-verifyEmail-btn'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyEmail:$('#account-emailVerificationCode').val(),
        },success:function(r){
            hideBtnLoading($('#security-verifyEmail-btn'))
            if(r.emailVerifyStats == 1){
                account.email_verified_at = r.email_verified_at
                checkEmailVerification();
                email_address_unsave_check();
                showAlert('success',r.msg,4000,true);
                $('#account-emailVerificationCode').val('')
            }else if(r.emailVerifyStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});
/////////////////////////////////////////
////this interval in the difftime file///
/////////////////////////////////////////
resendEmailVerifycodeBtnTimer = function(){
    let email_verification_code_sent_at = account.email_verification_code_sent_at == null ? 0 + (60*10*1000) : account.email_verification_code_sent_at *1000 ;
    if(Date.parse(new Date()) < parseInt(email_verification_code_sent_at) + 600000){
        $('#security-resendEmailVerifycode').prop('disabled',true)
        let seconds_total = ((parseInt(email_verification_code_sent_at)  + 600000) - Date.parse(new Date()))/ 1000;
        let minutes = Math.floor(seconds_total / 60);
        let seconds = seconds_total - minutes * 60;

        $('#security-resendEmailVerifycode').text(texts.security.resendCode2.replace(':time:',`${minutes.toLocaleString(account.language, {minimumIntegerDigits: 2,useGrouping: false})}:${seconds.toLocaleString(account.language, {minimumIntegerDigits: 2,useGrouping: false})}`))
    }else{
        $('#security-resendEmailVerifycode').prop('disabled',false)
        $('#security-resendEmailVerifycode').text(texts.security.resendCode)
    }
}

$('html,body').on('click','#security-resendEmailVerifycode',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#security-resendEmailVerifycode'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyEmailResendCode:true,
        },success:function(r){
            hideBtnLoading($('#security-resendEmailVerifycode'))
            if(r.verifyEmailResendCodeStats == 1){
                account.email_verification_code_sent_at = r.now
                resendEmailVerifycodeBtnTimer();
                showAlert('success',r.msg,4000,true);
            }else if(r.verifyEmailResendCodeStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});
$('html,body').on('click','#account-changeEmailBtn',function(e){
    e.stopImmediatePropagation();
    if($('#account-newEmail').val() == '' || $('#account-newEmail_password').val() == ''){return;}
    showPopup('changeEmailConfirm',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange mxw400'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',html:texts.security.changeEmailConfirmText.replace(':oldEmail:',`<B>${account.email}</B>`).replace(':newEmail:',`<b>${$('#account-newEmail').val()}</b>`)})
            ),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn',id:'account-newEmailBtn-confirm'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.yes})
                )
            )
        )
    })
});
$('html,body').on('click','#account-newEmailBtn-confirm',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#account-newEmailBtn-confirm'));
    showBtnLoading($('#account-newEmailBtn'));
    let newEmail = $('#account-newEmail').val();
    let password = $('#account-newEmail_password').val();
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeEmail:true,
            newEmail:newEmail,
            password:password,
        },success:function(r){
            hideBtnLoading($('#account-newEmailBtn-confirm'));
            hideBtnLoading($('#account-newEmailBtn'));
            closePopup();
            if(r.changeEmailStats == 1){
                account.email = newEmail;
                account.email_verified_at = null;
                account.email_verification_code_sent_at = r.now;
                email_address_unsave_check();
                checkEmailVerification();
                $('#account-email').val(newEmail)
                $('#account-emailVerificationCode').val('')
                $('#account-newEmail').val('');
                $('#account-newEmail_password').val('');
                showAlert('success',r.msg,4000,true);
                window.Cookies.set('CpanelLoginEmail',account.email, { expires: 365 })
            }else if(r.changeEmailStats == 0){
                showAlert('error',r.errors.newEmail[0],4000,true);
                $('#account-newEmail_password').val('');
                inputTextError($('#security-newEmail'))
            }else if(r.changeEmailStats == 2){
                $('#account-newEmail_password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.changeEmailStats == 3){
                inputTextError($('#account-newEmail_password'))
                $('#account-newEmail_password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.changeEmailStats == 4){
                $('#account-newEmail_password').val('');
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
