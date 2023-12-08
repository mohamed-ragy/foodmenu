drawPage_email_address = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.email_address}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
            ),

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
    checkEmailVerification();
}
drawPage_password = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.password}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
            ),
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
