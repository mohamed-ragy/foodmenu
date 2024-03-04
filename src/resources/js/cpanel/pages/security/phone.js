setPhoneNumberPage = function(){
    if(account.phone == null){
        $('.pageTab[tab="change_my_phone_number"]').addClass('none');
        $('.phoneNumber_noSave').attr('tooltip',texts.security.noPhoneNumberTxt)
        $('#phoneVerificationContainer').text('').append(
            $('<div/>',{class:'msgBox_orange mX0 wFC'}).append(
                $('<div/>',{class:'ico-warning fs2 mB10'}),
                $('<div/>',{class:'taC',text:texts.security.noPhoneNumberTxt}),
                $('<div/>',{class:'taC',text:texts.security.noPhoneNumberTxt2})
            ),
        );
        $('#phoneNumberContainer').text('').append(
            $('<div/>',{class:'accountPhoneSelectContainer',id:'accountPhoneSelectContainer-create'}).append(
                $('<div/>',{class:'ico-phone_number accountPhoneSelectFlagIcon fs103 mX12'}),
                $('<img/>',{class:'accountPhoneSelectFlag none'}),
                $('<div/>',{class:'mis-5 fs1 w10',text:'+'}),
                $('<input/>',{class:'accountPhoneSelectCountryCode',id:'account-phoneCountryCode',type:'number'}),
                $('<input/>',{class:'accountPhoneSelectPhoneNumber',id:'account-phoneNumber',type:'number'}),
                $('<div/>',{class:'accountPhoneSelectKeysListContainer none'})
            ),
            drawInputText('','ico-phone_number','',texts.security.password,'account-phoneNumber_password','password',texts.security.password,200,'password','','',false,''),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'btn',id:'account-createPhoneBtn'}).append(
                    $('<div/>',{class:'btnTxt',text:texts.security.addPhone}),
                    $('<div/>',{class:'btnLoading'})
                )
            )
        )
    }else{
        if(account.phone_verified_at == null){
            $('#phoneVerificationContainer').text('').append(
                $('<div/>',{class:'msgBox_orange mX0 wFC'}).append(
                    $('<span/>',{class:'ico-warning fs2 mB10'}),
                    $('<span/>',{class:'taC',text:texts.security.phoneNotVerified})
                ),
            )
            $('#phoneNumberContainer').text('').append(
                drawInputText('','ico-phone_number','',texts.security.phoneNumber,'account-phone','text',texts.security.phoneNumber,200,'copy','',account.phone,true,''),
                $('<div/>',{class:'area mT40 wFC'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.security.phoneVerification}),
                    drawInputText('','ico-phone_number','',texts.security.phoneVerificationCode,'account-phoneVerificationCode','text',texts.security.phoneVerificationCode,200,'clearVal','','',false,''),
                    $('<div/>',{class:'btnContainer'}).append(
                        $('<button/>',{class:'btn btn-cancel mie-10',id:'security-resendPhoneVerifycode',text:texts.security.resendCode}),
                        $('<button/>',{class:'btn',id:'security-verifyPhone-btn'}).append(
                            $('<div/>',{class:'btnTxt',text:texts.security.verify}),
                            $('<div>',{class:'btnLoading'})
                        )
                    )
                )

            )
        }else{
            $('#phoneVerificationContainer').text('').append(
                $('<div/>',{class:'msgBox_green mX0 wFC'}).append(
                    $('<span/>',{class:'ico-success fs2 mB10'}),
                    $('<span/>',{class:'taC',text:texts.security.phoneVerified})
                ),
            )
            $('#phoneNumberContainer').text('').append(
                drawInputText('','ico-phone_number','',texts.security.phoneNumber,'account-phone','text',texts.security.phoneNumber,200,'copy','',account.phone,true,''),
            )
        }
        $('.pageTab[tab="change_my_phone_number"]').removeClass('none');
        $('.phoneNumber_noSave').attr('tooltip',texts.security.phoneNumberNoVerifyTxt);
    }
    window.guideHints.phoneRegister();
    window.guideHints.phoneVerification();
}
phoneNumberVerification_NoSave = function(){
    if(account.phone == null){
        $('.phoneNumber_noSave').removeClass('none');
        return false;
    }else{
        if(account.phone_verified_at == null){
            $('.phoneNumber_noSave').removeClass('none');
            return false;
        }else{
            $('.phoneNumber_noSave').addClass('none');
            return true;
        }
    }
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
            $('<div/>',{class:'accountPhoneSelectKeysElem accountPhoneSelectKeysElem-'+window.countries[key].code,key:window.countries[key].code}).append(
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
// ///////////
$('html,body').on('focus select click','.accountPhoneSelectCountryCode',function(e){
    e.stopImmediatePropagation();
    $('.accountPhoneSelectKeysListContainer').scrollTop(0).removeClass('none').css({
        'left':$(this).closest('.accountPhoneSelectContainer').find('.accountPhoneSelectFlag').position().left
    })
})
$('html,body').on('click',function(){
    if($('.accountPhoneSelectKeysListContainer:hover').length > 0 || $('.accountPhoneSelectCountryCode:hover').length > 0){return}
    $('.accountPhoneSelectKeysListContainer').addClass('none')
})
$('html,body').on('click','.accountPhoneSelectKeysElem',function(e){
    e.stopImmediatePropagation();
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
$('html,body').on('input change','.accountPhoneSelectCountryCode',function(e){
    e.stopImmediatePropagation();
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
///////
$('html,body').on('click','#account-createPhoneBtn',function(e){
    e.stopImmediatePropagation();
    if($('#account-phoneCountryCode').val() == '' || $('#account-phoneNumber').val() == ''){return;}
    showBtnLoading($('#account-createPhoneBtn'))
    let phoneNumber = `+${$('#account-phoneCountryCode').val()}${$('#account-phoneNumber').val()}`;
    let password = $('#account-phoneNumber_password').val();
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createPhone:phoneNumber,
            password:password,
        },success:function(r){
            hideBtnLoading($('#account-createPhoneBtn'))
            if (r.createPhoneStatus == 0){
                showAlert('error',r.errors.createPhone[0],6000,true);
            }else if (r.createPhoneStatus == 2){
                showAlert('error',r.msg,6000,true);
            }else if (r.createPhoneStatus == 1){
                showAlert('success',r.msg,6000,true);
                account.phone = phoneNumber;
                account.phone_verified_at = null;
                account.phone_verification_code_sent_at = r.now;
                setPhoneNumberPage();
            }else if(r.createPhoneStatus == 3){
                inputTextError($('#account-phoneNumber_password'))
                $('#account-phoneNumber_password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.createPhoneStatus == 5){
                $('#logoutForm').trigger('submit');
            }
        }
    })
})
//////
$('html,body').on('click','#security-verifyPhone-btn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#security-verifyPhone-btn'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyPhone:$('#account-phoneVerificationCode').val(),
        },success:function(r){
            hideBtnLoading($('#security-verifyPhone-btn'))
            if(r.phoneVerifyStats == 1){
                account.phone_verified_at = r.phone_verified_at
                setPhoneNumberPage();
                phone_number_unsave_check();
                showAlert('success',r.msg,4000,true);
                $('#account-phoneVerificationCode').val('')
            }else if(r.phoneVerifyStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});
/////////////////////////////////////////
////this interval in the difftime file///
/////////////////////////////////////////
resendPhoneVerifycodeBtnTimer = function(){
    let phone_verification_code_sent_at = account.phone_verification_code_sent_at == null ? 0 + (60*10*1000) : account.phone_verification_code_sent_at *1000 ;
    if(Date.parse(new Date()) < parseInt(phone_verification_code_sent_at) + 600000){
        $('#security-resendPhoneVerifycode').prop('disabled',true)
        let seconds_total = ((parseInt(phone_verification_code_sent_at)  + 600000) - Date.parse(new Date()))/ 1000;
        let minutes = Math.floor(seconds_total / 60);
        let seconds = seconds_total - minutes * 60;

        $('#security-resendPhoneVerifycode').text(texts.security.resendCode2.replace(':time:',`${minutes.toLocaleString(account.language, {minimumIntegerDigits: 2,useGrouping: false})}:${seconds.toLocaleString(account.language, {minimumIntegerDigits: 2,useGrouping: false})}`))
    }else{
        $('#security-resendPhoneVerifycode').prop('disabled',false)
        $('#security-resendPhoneVerifycode').text(texts.security.resendCode)
    }
}
$('html,body').on('click','#security-resendPhoneVerifycode',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#security-resendPhoneVerifycode'))
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            verifyPhoneResendCode:true,
        },success:function(r){
            hideBtnLoading($('#security-resendPhoneVerifycode'))
            if(r.verifyPhoneResendCodeStats == 1){
                account.phone_verification_code_sent_at = r.now
                resendPhoneVerifycodeBtnTimer();
                showAlert('success',r.msg,4000,true);
            }else if(r.verifyPhoneResendCodeStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});

$('html,body').on('click','#account-changePhoneBtn',function(e){
    e.stopImmediatePropagation();
    if($('#account-newPhone').val() == '' || $('#account-newPhone_password').val() == ''){return;}
    showPopup('changePhoneConfirm',function(){
        let newPhone = `+${$('#account-newPhoneCountryCode').val()}${$('#account-newPhoneNumber').val()}`;
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange mxw400'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',html:texts.security.changePhoneConfirmText.replace(':oldPhone:',`<B>${account.phone}</B>`).replace(':newPhone:',`<b>${newPhone}</b>`)})
            ),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn',id:'account-newPhoneBtn-confirm'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.yes})
                )
            )
        )
    })
});
$('html,body').on('click','#account-newPhoneBtn-confirm',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#account-newPhoneBtn-confirm'));
    showBtnLoading($('#account-newPhoneBtn'));
    let newPhone = `+${$('#account-newPhoneCountryCode').val()}${$('#account-newPhoneNumber').val()}`;
    let password = $('#account-newPhone_password').val();
    $.ajax({
        url:'security',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changePhone:true,
            newPhone:newPhone,
            password:password,
        },success:function(r){
            hideBtnLoading($('#account-newPhoneBtn-confirm'));
            hideBtnLoading($('#account-newPhoneBtn'));
            closePopup();
            if(r.newPhoneStats == 1){
                account.phone = newPhone;
                account.phone_verified_at = null;
                account.phone_verification_code_sent_at = r.now;
                phone_number_unsave_check();
                setPhoneNumberPage();
                $('#account-newPhoneNumber').val('');
                $('#account-newPhone_password').val('');
                showAlert('success',r.msg,4000,true);
            }else if(r.newPhoneStats == 0){
                showAlert('error',r.errors.newPhone[0],4000,true);
                $('#account-newPhone_password').val('');
                inputTextError($('#security-newPhone'))
            }else if(r.newPhoneStats == 2){
                $('#account-newPhone_password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.newPhoneStats == 3){
                inputTextError($('#account-newPhone_password'))
                $('#account-newPhone_password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.newPhoneStats == 4){
                $('#account-newPhone_password').val('');
                showAlert('error',r.msg,4000,true);
            }else if(r.newPhoneStats == 5){
                $('#logoutForm').trigger('submit');
            }
        }
    })
})
