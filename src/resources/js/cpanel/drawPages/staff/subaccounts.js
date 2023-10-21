drawPage_sub_accounts = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.sub_accounts}),
                $('<span/>',{class:'ico-help help-icon',helpId:'sub_accounts'})
            ),
            $('<div/>',{class:'btnContainer mB20'}).append(
                $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'create_sub_account',text:texts.staff.createSubAccount}),
            ),
            $('<table/>',{id:'subAccountsTable',class:'w100p',autoHelp:'sub_accounts_list'})
        )
    );
    drawSubAccountsTable();
}
drawSubAccountsTable = function(){
    if(website.accounts.length == 0){
        $('#subAccountsTable').text('').append(
            $('<div/>',{class:'mT10',text:texts.staff.noSubAccounts})
        );
        return;
    }
    $('#subAccountsTable').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'fs08 tnw taC vaM w5'}),
            $('<th/>',{class:'fs08 tnw taS vaM w50p',text:texts.staff.name}),
            $('<th/>',{class:'fs08 tnw taS vaM w50p',text:texts.staff.loginName}),
            $('<th/>',{class:'fs08 tnw taS vaM none-720',text:texts.staff.lastSeen}),
            $('<th/>',{class:'fs08 tnw taE vaM '}),
        )
    )
    for(const key in website.accounts){
        let subaccount = website.accounts[key];
        if(!subaccount.is_master){
            let accountBlockedClass;
            subaccount.password_fails > 10 ? accountBlockedClass = '' : accountBlockedClass =  'none';
            $('#subAccountsTable').append(
                $('<tr/>',{class:''}).append(
                    $('<td/>',{class:'fs08 tnw taC vaM'}).append(
                        $('<span/>',{class:`subaccountOnlineIcon-${subaccount.id}`})
                    ),
                    $('<td/>',{class:'mxw0 fs08 tnw taS vaM w50p '}).append(
                        $('<a/>',{subaccount:subaccount.id,class:'ellipsis block popupPage popupId ',popupPage:'sub_account',popupId:'sub_account',text:subaccount.name})
                    ),
                    $('<td/>',{class:'fs08 tnw taS vaM mxw0 w50p pointer copyVal',copyVal:subaccount.email,tooltip:texts.cpanel.public.clickToCopy}).append(
                        $('<span/>',{class:'block ellipsis',text:subaccount.email}),
                    ),
                    $('<td/>',{class:'fs08 tnw taS vaM none-720 '}).append(
                        $('<span/>',{class:`subaccountlastSeen-${subaccount.id} `,time:subaccount.lastSeen})
                    ),
                    $('<td/>',{class:'fs08 tnw taE vaM'}).append(
                        $('<button/>',{class:`btn_table cO subAccount-unblock ${accountBlockedClass}`,subaccount:subaccount.id,tooltip:texts.staff.unblockSubAccount,tooltipTemp:texts.staff.unblockSubAccount}).append(
                            $('<div/>',{class:'ico-warning '}),
                            $('<div/>',{class:'loading_s none'})
                        ),
                        $('<button/>',{class:'btn_table subAccount-forceLogout',subaccount:subaccount.id,tooltip:texts.staff.forceLogout}).append(
                            $('<div/>',{class:'ico-logout '}),
                            $('<div/>',{class:'loading_s none'})
                        ),
                        $('<button/>',{class:'btn_table ico-settings popupPage manageSubaccountAuthoritiesBtn',popupPage:'manage_sub_account',subaccount:subaccount.id,tooltip:texts.staff.manageAuthorities}).append($('<span/>',{class:'tableRow_unsaved none'})),
                        $('<button/>',{class:'btn_table ico-password editSubaccountPassword',subaccount:subaccount.id,tooltip:texts.staff.changePassword}),
                        $('<button/>',{class:'btn_table deleteSubaccount ico-delete',subaccount:subaccount.id,tooltip:texts.cpanel.public.delete})
                    ),
                )
            )
            setSubaccountOnlineStatus(subaccount.id)
        }
    }
    sub_accounts_unsave_check();
}
drawPopupPage_sub_account = function(subaccountId){
    let subaccount = website.accounts.find(item=>item.id == subaccountId);
    let authority0Icon = subaccount.authorities.split('')[0] == 1 ? 'ico-check cG' : 'ico-no cR';
    let authority1Icon = subaccount.authorities.split('')[1] == 1 ? 'ico-check cG' : 'ico-no cR';
    let authority2Icon = subaccount.authorities.split('')[2] == 1 ? 'ico-check cG' : 'ico-no cR';
    let authority3Icon = subaccount.authorities.split('')[3] == 1 ? 'ico-check cG' : 'ico-no cR';
    let authority4Icon = subaccount.authorities.split('')[4] == 1 ? 'ico-check cG' : 'ico-no cR';
    let authority5Icon = subaccount.authorities.split('')[5] == 1 ? 'ico-check cG' : 'ico-no cR';
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.sub_account}),
        // $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').addClass('p10 mnw400').append(
        $('<div/>',{class:'row alnBL jstfyS mX10'}).append(
            $('<div/>',{class:'ico-sub_accounts',}),
            $('<div/>',{class:'fs1 mX5',text:subaccount.name})
        ),
        $('<div/>',{class:'mX5 row alnC jstfyS'}).append(
            $('<div/>',{class:`subaccountOnlineIcon-${subaccount.id}`}),
            $('<div/>',{class:`fs08 subaccountlastSeen2-${subaccount.id}`})
        ),
        $('<div/>',{class:'area mT40'}).append(
            $('<div/>',{class:'areaTitle',text:texts.staff.authorities}),
            $('<div/>',{class:'m5'}).append(
                $('<div/>',{class:'row alnC jstfyS fs09'}).append(
                    $('<span/>',{class:`${authority0Icon} mie-5`}),
                    $('<span/>',{text:texts.staff.authority0}),
                ),
                $('<div/>',{class:'row alnC jstfyS fs09'}).append(
                    $('<span/>',{class:`${authority1Icon} mie-5`}),
                    $('<span/>',{text:texts.staff.authority1}),
                ),
                $('<div/>',{class:'row alnC jstfyS fs09'}).append(
                    $('<span/>',{class:`${authority2Icon} mie-5`}),
                    $('<span/>',{text:texts.staff.authority2}),
                ),
                $('<div/>',{class:'row alnC jstfyS fs09'}).append(
                    $('<span/>',{class:`${authority3Icon} mie-5`}),
                    $('<span/>',{text:texts.staff.authority3}),
                ),
                $('<div/>',{class:'row alnC jstfyS fs09'}).append(
                    $('<span/>',{class:`${authority4Icon} mie-5`}),
                    $('<span/>',{text:texts.staff.authority4}),
                ),
                $('<div/>',{class:'row alnC jstfyS fs09'}).append(
                    $('<span/>',{class:`${authority5Icon} mie-5`}),
                    $('<span/>',{text:texts.staff.authority5}),
                ),
            )
        )
    );
    setSubaccountOnlineStatus(subaccount.id)
}
drawPopupPage_create_sub_account = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.create_sub_account}),
        $('<span/>',{class:'ico-help help-icon',helpId:'create_new_sub_account'})
    );
    $('#popupPageBody').addClass('mxw100p-40 p20').append(
        drawInputText('','ico-edit','',texts.staff.accountName,'createSubaccount_name','text',texts.staff.accountName,'100','clearVal','inputTextContainer_100p mT0','',false),
        drawInputText('','ico-password','',texts.staff.password,'createSubaccount_password','password',texts.staff.password,'100','password','inputTextContainer_100p','',false),
        drawInputText('','ico-sub_accounts','',texts.staff.loginName,'createSubaccount_loginName','text',texts.staff.loginName,'100','copy','inputTextContainer_100p','',true),
        $('<div/>',{class:'area mT40',autoHelp:'manage_permissions'}).append(
            $('<div/>',{class:'areaTitle',text:texts.staff.authorities}),
            drawSwitchBtn('',texts.staff.authority0,'createNewSubAccount_authority0','checkboxlabel_100p brdrT0 mT10',''),
            drawSwitchBtn('',texts.staff.authority1,'createNewSubAccount_authority1','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority2,'createNewSubAccount_authority2','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority3,'createNewSubAccount_authority3','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority4,'createNewSubAccount_authority4','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority5,'createNewSubAccount_authority5','checkboxlabel_100p ',''),
        ),
        $('<div/>',{class:'btnContainer mT20'}).append(
            $('<button/>',{class:'btn',id:'createSubaccountBtn'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create})
            )
        )
    )
}
drawPopupPage_manage_sub_account = function(subaccountId){
    let subaccount = website_temp.accounts.find(item=>item.id == subaccountId);
    $('#popupPageTitle').text('').append(
        $('<span/>',{class:`manageSubaccountNoSaveCheck-${subaccount.id} unsaved ico-warning mie-5 none`,tooltip:texts.cpanel.public.unsaved}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.manage_sub_account}),
        // $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 p20 w500').append(
        $('<div/>',{class:'row alnBL jstfyS mX10'}).append(
            $('<div/>',{class:'ico-sub_accounts',}),
            $('<div/>',{class:'fs1 mX5',text:subaccount.name})
        ),
        $('<div/>',{class:'mX5 row alnC jstfyS'}).append(
            $('<div/>',{class:`subaccountOnlineIcon-${subaccount.id}`}),
            $('<div/>',{class:`fs08 subaccountlastSeen2-${subaccount.id}`})
        ),
        $('<div/>',{class:'area mT40',autoHelp:'manage_permissions'}).append(
            $('<div/>',{class:'areaTitle',text:texts.staff.authorities}),
            drawSwitchBtn('',texts.staff.authority0,'manageSubAccount_authority0','checkboxlabel_100p brdrT0 mT10',''),
            drawSwitchBtn('',texts.staff.authority1,'manageSubAccount_authority1','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority2,'manageSubAccount_authority2','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority3,'manageSubAccount_authority3','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority4,'manageSubAccount_authority4','checkboxlabel_100p ',''),
            drawSwitchBtn('',texts.staff.authority5,'manageSubAccount_authority5','checkboxlabel_100p ',''),
        ),
        drawSaveCancelBtns('manageSubAccount_saveBtn','manageSubAccount_cancelBtn','mT4')
    )
    subaccount.authorities.split('')[0] == 1 ? $('#manageSubAccount_authority0').prop('checked', true) : $('#manageSubAccount_authority0').prop('checked', false);
    subaccount.authorities.split('')[1] == 1 ? $('#manageSubAccount_authority1').prop('checked', true) : $('#manageSubAccount_authority1').prop('checked', false);
    subaccount.authorities.split('')[2] == 1 ? $('#manageSubAccount_authority2').prop('checked', true) : $('#manageSubAccount_authority2').prop('checked', false);
    subaccount.authorities.split('')[3] == 1 ? $('#manageSubAccount_authority3').prop('checked', true) : $('#manageSubAccount_authority3').prop('checked', false);
    subaccount.authorities.split('')[4] == 1 ? $('#manageSubAccount_authority4').prop('checked', true) : $('#manageSubAccount_authority4').prop('checked', false);
    subaccount.authorities.split('')[5] == 1 ? $('#manageSubAccount_authority5').prop('checked', true) : $('#manageSubAccount_authority5').prop('checked', false);
    setSubaccountOnlineStatus(subaccount.id)
    sub_accounts_unsave_check();
}
