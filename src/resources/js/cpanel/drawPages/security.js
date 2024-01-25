drawPage_email_address = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection ',
        }).append(
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'my_email_address',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{tooltip:texts.security.emailNotVerified,class:'emailAddress_noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.security.emailAddress})
                    ),
                    $('<div/>',{tab:'change_my_email_address',class:'pageTab'}).append(
                        $('<span/>',{text:texts.security.changeEmail})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'my_email_address'}).append(
                $('<div/>',{class:'wFC column alnC jstfyC'}).append(
                    $('<div/>',{id:'emailVerificationContainer',class:'mxw350'}),
                    drawInputText('','ico-login','',texts.security.emailAddress,'account-email','text',texts.security.emailAddress,200,'copy','',account.email,true,''),
                    $('<div/>',{class:'none area mT40 wFC',id:'emailVerificationArea'}).append(
                        $('<div/>',{class:'areaTitle',text:texts.security.emailVerification}),
                        drawInputText('','ico-email_address','',texts.security.emailVerificationCode,'account-emailVerificationCode','text',texts.security.emailVerificationCode,200,'clearVal','','',false,''),
                        $('<div/>',{class:'btnContainer'}).append(
                            $('<button/>',{class:'btn btn-cancel mie-10',id:'security-resendEmailVerifycode',text:texts.security.resendCode}),
                            $('<button/>',{class:'btn',id:'security-verifyEmail-btn'}).append(
                                $('<div/>',{class:'btnTxt',text:texts.security.verify}),
                                $('<div>',{class:'btnLoading'})
                            )
                        )
                    )
                )
            ),
            $('<div/>',{class:'pageTabContainer',tab:'change_my_email_address'}).append(
                $('<div/>',{class:'wFC'}).append(
                    drawInputText('','ico-email_address','',texts.security.newEmail,'account-newEmail','text',texts.security.newEmail,200,'clearVal','','',false,''),
                    drawInputText('','ico-password','',texts.security.password,'account-newEmail_password','password',texts.security.password,200,'password','','',false,''),
                    $('<div/>',{class:'btnContainer'}).append(
                        $('<button/>',{class:'btn',id:'account-changeEmailBtn',text:texts.security.changeMyEmail})
                    )
                )
            ),
        )
    )
    resendEmailVerifycodeBtnTimer();
    email_address_unsave_check();
    checkEmailVerification();
}
drawPage_password = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'area wFC mT40'}).append(
                $('<div/>',{class:'areaTitle',text:texts.security.changePassword}),
                drawInputText('','ico-password','',texts.security.currentpassword,'account-current_password','password',texts.security.currentpassword,200,'password','','',false,''),
                drawInputText('','ico-password','',texts.security.newPassword,'account-new_password','password',texts.security.newPassword,200,'password','mT40','',false,''),
                drawInputText('','ico-password','',texts.security.newPasswordConfirm,'account-new_password_confirm','password',texts.security.newPasswordConfirm,200,'password','','',false,''),
                $('<div/>',{class:'btnContainer'}).append(
                    $('<button/>',{class:'btn',id:'account-changePassword_btn',text:texts.security.changePassword})
                )
            )
        )
    )
}
drawPage_phone_number = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'my_phone_number',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{tooltip:texts.security.noPhoneNumberTxt,class:'phoneNumber_noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.security.phoneNumber})
                    ),
                    $('<div/>',{tab:'change_my_phone_number',class:'pageTab'}).append(
                        $('<span/>',{text:texts.security.changePhone})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'my_phone_number'}).append(
                $('<div/>',{class:'wFC column alnC jstfyC'}).append(
                    $('<div/>',{id:'phoneVerificationContainer',class:'mxw500'}),
                    $('<div/>',{id:'phoneNumberContainer',class:'column alnS jstfyS w100p'})
                )
            ),
            $('<div/>',{class:'pageTabContainer',tab:'change_my_phone_number'}).append(
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'accountPhoneSelectContainer',id:'accountPhoneSelectContainer-change'}).append(
                        $('<div/>',{class:'ico-phone_number accountPhoneSelectFlagIcon fs103 mX12'}),
                        $('<img/>',{class:'accountPhoneSelectFlag none'}),
                        $('<div/>',{class:'mis-5 fs1 w10',text:'+'}),
                        $('<input/>',{class:'accountPhoneSelectCountryCode',id:'account-newPhoneCountryCode',type:'number'}),
                        $('<input/>',{class:'accountPhoneSelectPhoneNumber',id:'account-newPhoneNumber',type:'number'}),
                        $('<div/>',{class:'accountPhoneSelectKeysListContainer none'})
                    ),
                    drawInputText('','ico-password','',texts.security.password,'account-newPhone_password','password',texts.security.password,200,'password','','',false,''),
                    $('<div/>',{class:'btnContainer'}).append(
                        $('<button/>',{class:'btn',id:'account-changePhoneBtn',text:texts.security.changeMyPhone})
                    )
                )
            )
        )
    )
    setPhoneNumberPage();
    phone_number_unsave_check();
    resendPhoneVerifycodeBtnTimer();
    getCountriesTimezones();
}
