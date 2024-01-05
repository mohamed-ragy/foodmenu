manageSubaccount_unsavedCheck = function(){
    let subaccountsNoSaveCheck = true;
    for(const key in website.accounts){
        if(website.accounts[key].authorities !== website_temp.accounts[key].authorities){
            subaccountsNoSaveCheck = false;
            $(`.manageSubaccountAuthoritiesBtn[subaccount="${website.accounts[key].id}"]`).find('.tableRow_unsaved').removeClass('none')
            $(`.manageSubaccountNoSaveCheck-${website.accounts[key].id}`).removeClass('none')
        }else{
            $(`.manageSubaccountAuthoritiesBtn[subaccount="${website.accounts[key].id}"]`).find('.tableRow_unsaved').addClass('none')
            $(`.manageSubaccountNoSaveCheck-${website.accounts[key].id}`).addClass('none')
        }
    }
    return subaccountsNoSaveCheck;
}

$('html,body').on('click',`#manageSubAccount_authority0,#manageSubAccount_authority1,#manageSubAccount_authority2,#manageSubAccount_authority3,#manageSubAccount_authority4,#manageSubAccount_authority5`,function(e){
    e.stopImmediatePropagation();
    let authorities = ''
    let authority0 = $('#manageSubAccount_authority0').prop('checked') ? '1' : '0';
    let authority1 = $('#manageSubAccount_authority1').prop('checked') ? '1' : '0';
    let authority2 = $('#manageSubAccount_authority2').prop('checked') ? '1' : '0';
    let authority3 = $('#manageSubAccount_authority3').prop('checked') ? '1' : '0';
    let authority4 = $('#manageSubAccount_authority4').prop('checked') ? '1' : '0';
    let authority5 = $('#manageSubAccount_authority5').prop('checked') ? '1' : '0';
    authorities = `${authority0}${authority1}${authority2}${authority3}${authority4}${authority5}`
    website_temp.accounts.find(item=>item.id == window.history.state.subaccount).authorities = authorities;
    sub_accounts_unsave_check();
})
$('html,body').on('click','#manageSubAccount_cancelBtn',function(e){
    e.stopImmediatePropagation();
    for(const key in website.accounts){
        website_temp.accounts[key].authorities = website.accounts[key].authorities;
        if(website.accounts[key].id == window.history.state.subaccount){
            website.accounts[key].authorities.split('')[0] == 1 ? $('#manageSubAccount_authority0').prop('checked', true) : $('#manageSubAccount_authority0').prop('checked', false);
            website.accounts[key].authorities.split('')[1] == 1 ? $('#manageSubAccount_authority1').prop('checked', true) : $('#manageSubAccount_authority1').prop('checked', false);
            website.accounts[key].authorities.split('')[2] == 1 ? $('#manageSubAccount_authority2').prop('checked', true) : $('#manageSubAccount_authority2').prop('checked', false);
            website.accounts[key].authorities.split('')[3] == 1 ? $('#manageSubAccount_authority3').prop('checked', true) : $('#manageSubAccount_authority3').prop('checked', false);
            website.accounts[key].authorities.split('')[4] == 1 ? $('#manageSubAccount_authority4').prop('checked', true) : $('#manageSubAccount_authority4').prop('checked', false);
            website.accounts[key].authorities.split('')[5] == 1 ? $('#manageSubAccount_authority5').prop('checked', true) : $('#manageSubAccount_authority5').prop('checked', false);
        }
    }
    sub_accounts_unsave_check();
});
$('html,body').on('click','#manageSubAccount_saveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#manageSubAccount_saveBtn'));
    let subaccount = website_temp.accounts.find(item=>item.id == window.history.state.subaccount);
    let authority0 = subaccount.authorities.split('')[0];
    let authority1 = subaccount.authorities.split('')[1];
    let authority2 = subaccount.authorities.split('')[2];
    let authority3 = subaccount.authorities.split('')[3];
    let authority4 = subaccount.authorities.split('')[4];
    let authority5 = subaccount.authorities.split('')[5];
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            ChangeSubAccountAuthorities:true,
            accountId:subaccount.id,
            subaccountName:subaccount.name,
            authority0:authority0,
            authority1:authority1,
            authority2:authority2,
            authority3:authority3,
            authority4:authority4,
            authority5:authority5,
        },success:function(response){
            hideBtnLoading($('#manageSubAccount_saveBtn'));
            if(response.ChangeSubAccountAuthoritiesStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.accounts.find(item=>item.id == window.history.state.subaccount).authorities = website_temp.accounts.find(item=>item.id == window.history.state.subaccount).authorities;
                sub_accounts_unsave_check();
                popupPageClose(true);
            }else if(response.ChangeSubAccountAuthoritiesStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
})

/////
$('html,body').on('click','.editSubaccountPassword',function(e){
    e.stopImmediatePropagation();
    let subaccountId = $(this).attr('subaccount');
    let subaccount = website.accounts.find(item=> item.id == subaccountId);
    if(typeof(subaccount) === 'undefined'){return;}
    showPopup('changeSubaccountPassword',function(){
        $('.popupBody').append(
            $('<div/>',{text:subaccount.name,class:'bold500 mT10'}),
            drawInputText('','ico-password','',texts.staff.newPassword,'changeSubaccountPassword_password','password',texts.staff.newPassword,100,'password','inputTextContainer_100p','',false),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'btn',id:'changeSubaccountPasswordBtn',subaccount:subaccount.id}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.confirm})
                )
            )
        )
    })
})
$('html,body').on('click','#changeSubaccountPasswordBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#changeSubaccountPasswordBtn'))
    let subaccountId = $(this).attr('subaccount');
    let subaccount = website.accounts.find(item=> item.id == subaccountId);
    if(typeof(subaccount) === 'undefined'){return;}
    let password = $('#changeSubaccountPassword_password').val();
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            updateSubAccountPassword:subaccount.id,
            subaccountName:subaccount.name,
            password:password,
        },success:function(response){
            hideBtnLoading($('#changeSubaccountPasswordBtn'))
            if(response.updateSubAccountPasswordStatus == 0){
                showAlert('error',response.error.password[0],4000,true);
                inputTextError($('#changeSubaccountPassword_password'));
             }else if(response.updateSubAccountPasswordStatus == 1){
                showAlert('success',response.msg,4000,true);
                closePopup();
            }else if(response.updateSubAccountPasswordStatus == 2){
                showAlert('error',response.msg,4000,true);
             }
        }
    })
})
