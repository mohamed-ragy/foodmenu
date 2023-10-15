checkPhoneNumberFirstTime = false;
checkPhoneNumber = function(){
    if(!account.is_master){return;}
    if(account.phone == '' || account.phone == null){
        $('#security-addPhoneContainer').removeClass('none');
        $('#security-phoneContainer').addClass('none')
    }else{
        $('#security-addPhoneContainer').addClass('none');
        $('#security-phoneContainer').removeClass('none')
    }
    window.guideHints.phoneRegister(checkPhoneNumberFirstTime);
    window.guideHints.phoneVerification(checkPhoneNumberFirstTime);
    !checkPhoneNumberFirstTime ? checkPhoneNumberFirstTime = true : null;
}
getBrowserDialCode = function(){
    let browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let browserDialCode;
    for(const key in window.cityToTz){
        if(browserTimeZone.split('/')[1] == key){
            for(const key2 in window.countries){
                if(window.countries[key2].en == window.cityToTz[key]){
                    browserDialCode = window.countries[key2].dialCode;
                }
            }
        }
    }
    $('.accountPhoneSelectKeysListContainer').text('');
    for(const key in window.countries){
        $('.accountPhoneSelectKeysListContainer').append(
            $('<div/>',{class:'row alnC jstfySB p5 pointer hvr-bg2 accountPhoneSelectKeysElem accountPhoneSelectKeysElem-'+window.countries[key].code,key:window.countries[key].code}).append(
                $('<img/>',{class:'w20 h20 br50p ofCover',src:`./storage/imgs/flags/${window.countries[key].code}.png`}),
                $('<div/>',{class:'mis-5',text:window.countries[key].dialCode})
            )
        )
        if(browserDialCode == window.countries[key].dialCode){
            $('.accountPhoneSelectContainer').find('.accountPhoneSelectCountryCode').val(window.countries[key].dialCode.replace('+',''))
            $('.accountPhoneSelectContainer').find('.accountPhoneSelectFlag').removeClass('none').attr('src',`./storage/imgs/flags/${window.countries[key].code}.png`)
            $('.accountPhoneSelectContainer').find('.accountPhoneSelectFlagIcon').addClass('none')
        }
    }
}
checkPhoneVerificationFirstTime = false;

checkPhoneVerification = function(){
    if(!account.is_master){return;}
    account.phone_verified_at == null ? $('#security-phoneVerified').addClass('none') : $('#security-phoneVerified').removeClass('none')
    account.phone_verified_at == null ? $('#security-phoneNotVerified').removeClass('none') : $('#security-phoneNotVerified').addClass('none')
    window.guideHints.phoneVerification(checkPhoneVerificationFirstTime);
    !checkPhoneVerificationFirstTime ? checkPhoneVerificationFirstTime = true : null;
}
let PhoneVerificationResendTimer;
checkPhoneVerificationResend = function(){
    if(!account.is_master){return;}
    $('#security-resendVerifyPhone-btn').prop('disabled',true)
    clearInterval(PhoneVerificationResendTimer);
    PhoneVerificationResendTimer = setInterval(function(){
        let lastVerficationSendAt_e = new Date(account.phone_verification_code_sent_at).toLocaleString();
        let lastVerficationSendAtUnformated_e = Date.parse(lastVerficationSendAt_e) + 600000;
        if((Date.parse(new Date().toLocaleString('en-US', { timeZone: 'UTC' })) ) < lastVerficationSendAtUnformated_e){
            timeLeft_e = lastVerficationSendAtUnformated_e  - (Date.parse(new Date().toLocaleString('en-US', { timeZone: 'UTC' })) );
            minuts_e = (timeLeft_e / 60000);
            mins_e = ('0' + Math.floor(minuts_e).toFixed(0)).slice(-2);
            seconds_e = ('0' + Math.floor((((timeLeft_e - minuts_e)/1000)+1) %60).toFixed(0)).slice(-2);
            $('#security-resendVerifyPhone-btn').prop('disabled',true).find('.btnTxt').text(`${texts.security.resendCode2} ${mins_e}:${seconds_e}`)
        }else{
            clearInterval(PhoneVerificationResendTimer);
            $('#security-resendVerifyPhone-btn').prop('disabled',false).find('.btnTxt').text(texts.security.resendCode)
        }

    },1000);
}
///////////
$('.accountPhoneSelectCountryCode').on('focus select click',function(){
    $('.accountPhoneSelectKeysListContainer').scrollTop(0).removeClass('none').css({
        'left':$(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlag').position().left
    })
})
$('html,body').on('click',function(){
    if($('.accountPhoneSelectKeysListContainer:hover').length > 0 || $('.accountPhoneSelectCountryCode:hover').length > 0){return}
    $('.accountPhoneSelectKeysListContainer').addClass('none')
})
$('html,body').on('click','.accountPhoneSelectKeysElem',function(){
    $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlag').addClass('none').attr('src',null)
    $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlagIcon').removeClass('none');
    for(const key in window.countries){
        if(window.countries[key].code == $(this).attr('key')){
            $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlagIcon').addClass('none');
            $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlag').removeClass('none').attr('src',`./storage/imgs/flags/${window.countries[key].code}.png`)
            $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectCountryCode').val(window.countries[key].dialCode.replace('+',''))
            $('.accountPhoneSelectKeysListContainer').addClass('none')
        }
    }
})
$('.accountPhoneSelectCountryCode').on('input change',function(){
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
    let codeVal = null;
    $('.accountPhoneSelectKeysElem').addClass('none');
    for(const key in window.countries){
        if(window.countries[key].dialCode.includes($(this).val())){
           $(`.accountPhoneSelectKeysElem-${window.countries[key].code}`).removeClass('none')
        }
        if(window.countries[key].dialCode == `+${$(this).val()}`){
            codeVal  = `./storage/imgs/flags/${window.countries[key].code}.png`;
        }
    }
    if(codeVal == null){
        $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlag').addClass('none').attr('src',null)
        $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlagIcon').removeClass('none');
    }else{
        $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlag').removeClass('none').attr('src',codeVal)
        $(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlagIcon').addClass('none');
    }
})
$('#security-createPhone-btn').on('click',function(){
    $('#security-createPhone-PhoneNumber').text(`+${$('#accountPhoneSelectContainer-create').find('.accountPhoneSelectCountryCode').val()}${$('#accountPhoneSelectContainer-create').find('.accountPhoneSelectPhoneNumber').val()}`)
    showPopup($('#createPhone-popup'))
})
$('#security-createPhone-confirm').on('click',function(){
    if($('#accountPhoneSelectContainer-create').find('.accountPhoneSelectCountryCode').val() == ''){
        showAlert('error',texts.security.phoneRequired,4000,true)
        closePopup();
        $('#accountPhoneSelectContainer-create').find('.accountPhoneSelectCountryCode').select();
        return;
    }
    if($('#accountPhoneSelectContainer-create').find('.accountPhoneSelectPhoneNumber').val() == ''){
        showAlert('error',texts.security.phoneRequired,4000,true)
        closePopup();
        $('#accountPhoneSelectContainer-create').find('.accountPhoneSelectPhoneNumber').select();
        return;
    }
    showBtnLoading($('#security-createPhone-btn'))
    showBtnLoading($('#security-createPhone-confirm'))
    let phoneNumber = `+${$('#accountPhoneSelectContainer-create').find('.accountPhoneSelectCountryCode').val()}${$('#accountPhoneSelectContainer-create').find('.accountPhoneSelectPhoneNumber').val()}`;
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createPhone:phoneNumber,
        },success:function(r){
            hideBtnLoading($('#security-createPhone-btn'))
            hideBtnLoading($('#security-createPhone-confirm'))
            closePopup();
            if (r.createPhoneStatus == 0){
                showAlert('error',r.errors.createPhone[0],6000,true);
                $('#accountPhoneSelectContainer-create').find('.accountPhoneSelectPhoneNumber').select();
            }else if (r.createPhoneStatus == 2){
                showAlert('error',r.msg,6000,true);
            }else if (r.createPhoneStatus == 1){
                showAlert('success',r.msg,6000,true);
                account.phone = phoneNumber;
                account.phone_verified_at = null;
                account.phone_verification_code_sent_at = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                checkPhoneNumber();
                $('#security-phone').val(phoneNumber)
            }
        }
    })
})
//////////////////////////
$('#security-resendVerifyPhone-btn').on('click',function(){
    showBtnLoading($('#security-resendVerifyPhone-btn'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyPhoneResendCode:true,
        },success:function(r){
            hideBtnLoading($('#security-resendVerifyPhone-btn'))
            if(r.verifyPhoneResendCodeStats == 1){
                account.phone_verification_code_sent_at = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                checkPhoneVerificationResend();
                showAlert('success',r.msg,4000,true);
            }else if(r.verifyPhoneResendCodeStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});
$('#security-verifyPhone-btn').on('click',function(){
    showBtnLoading($('#security-verifyPhone-btn'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyPhone:$('#security-verifyPhone').val(),
        },success:function(r){
            hideBtnLoading($('#security-verifyPhone-btn'))
            if(r.phoneVerifyStats == 1){
                account.phone_verification_code = null;
                account.phone_verified_at = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                checkPhoneVerification();
                showAlert('success',r.msg,4000,true);
                $('#security-verifyPhone').val('')
            }else if(r.phoneVerifyStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});
/////////////////////////
$('#security-changePhone-btn').on('click',function(){
    $('#changePhonePopup-phone').text(`+${$('#accountPhoneSelectContainer-change').find('.accountPhoneSelectCountryCode').val()}${$('#accountPhoneSelectContainer-change').find('.accountPhoneSelectPhoneNumber').val()}?`)
    showPopup($('#changePhone-popup'));
});
$('#security-changePhone-confirm').on('click',function(){
    showBtnLoading($('#security-changePhone-btn'));
    showBtnLoading($('#security-changePhone-confirm'));
    let newPhone = `+${$('#accountPhoneSelectContainer-change').find('.accountPhoneSelectCountryCode').val()}${$('#accountPhoneSelectContainer-change').find('.accountPhoneSelectPhoneNumber').val()}`;
    let password = $('#security-changePhone-password').val();
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changePhone:true,
            newPhone:newPhone,
            password:password,
        },success:function(r){
            hideBtnLoading($('#security-changePhone-btn'))
            hideBtnLoading($('#security-changePhone-confirm'))
            closePopup();
            if(r.newPhoneStats == 1){
                account.phone = newPhone;
                account.phone_verified_at = null;
                account.phone_verification_code_sent_at = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                checkPhoneVerificationResend();
                checkPhoneVerification();
                $('#security-phone').val(newPhone)
                $('#security-verifyPhone').val('')
                $('#accountPhoneSelectContainer-change').find('.accountPhoneSelectPhoneNumber').val('');
                $('#security-changePhone-password').val('');
                showAlert('success',r.msg,4000,true);
            }else if(r.newPhoneStats == 0){
                showAlert('error',r.errors.newPhone[0],4000,true);
                $('#security-changePhone-password').val('');
                inputTextError($('#accountPhoneSelectContainer-change').find('.accountPhoneSelectPhoneNumber'))
            }else if(r.newPhoneStats == 2){
                $('#security-changePhone-password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.newPhoneStats == 3){
                inputTextError($('#security-changePhone-password'))
                $('#security-changePhone-password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.newPhoneStats == 4){
                $('#security-changePhone-password').val('');
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})

////////////////////////////////
checkPhoneNumber();
checkPhoneVerification();
checkPhoneVerificationResend();
