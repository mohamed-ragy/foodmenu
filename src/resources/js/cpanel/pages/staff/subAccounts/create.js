$('html,body').on('input change','#createSubaccount_name',function(e){
    e.stopImmediatePropagation();
    $(this).val() == '' || $(this).val() == null ? $('#createSubaccount_loginName').val(''):
    $('#createSubaccount_loginName').val(`${$(this).val()}@${website.domainName}`);
})

$('html,body').on('click','#createSubaccountBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let authority0;let authority1;let authority2;let authority3;let authority4;let authority5;
    $('#createNewSubAccount_authority0').prop('checked') ? authority0 = '1' : authority0 = '0';
    $('#createNewSubAccount_authority1').prop('checked') ? authority1 = '1' : authority1 = '0';
    $('#createNewSubAccount_authority2').prop('checked') ? authority2 = '1' : authority2 = '0';
    $('#createNewSubAccount_authority3').prop('checked') ? authority3 = '1' : authority3 = '0';
    $('#createNewSubAccount_authority4').prop('checked') ? authority4 = '1' : authority4 = '0';
    $('#createNewSubAccount_authority5').prop('checked') ? authority5 = '1' : authority5 = '0';
    let authorities = authority0 + authority1 + authority2 + authority3 + authority4 + authority5;
    if(authorities == '000000'){showAlert('error',texts.staff.noAuthoritiesSelected,4000,true);return;}
    let email = $('#createSubaccount_loginName').val();
    let password = $('#createSubaccount_password').val();
    let name = $('#createSubaccount_name').val();
    showBtnLoading($('#createSubaccountBtn'))
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            newSubAccount:true,
            email:email,
            password:password,
            name:name,
            authority0:authority0,
            authority1:authority1,
            authority2:authority2,
            authority3:authority3,
            authority4:authority4,
            authority5:authority5,
        },success:function(response){
            hideBtnLoading($('#createSubaccountBtn'))
            if(response.newSubAccountStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.accounts.push(JSON.parse(JSON.stringify(response.subaccount)));
                website_temp.accounts.push(JSON.parse(JSON.stringify(response.subaccount)));
                drawSubAccountsTable();
                //////
                $('#createSubaccount_loginName').val('');
                $('#createSubaccount_name').val('');
                $('#createSubaccount_password').val('');
                $('#createNewSubAccount_authority0').prop('checked',false);
                $('#createNewSubAccount_authority1').prop('checked',false);
                $('#createNewSubAccount_authority2').prop('checked',false);
                $('#createNewSubAccount_authority3').prop('checked',false);
                $('#createNewSubAccount_authority4').prop('checked',false);
                $('#createNewSubAccount_authority5').prop('checked',false);
                popupPageClose(true)
            }else if(response.newSubAccountStatus  == 0){
                if('email' in response.errors){
                    showAlert('error',response.errors.email[0],4000,true);
                    inputTextError($('#createSubaccount_name'))
                }else if('name' in response.errors){
                    showAlert('error',response.errors.name[0],4000,true);
                    inputTextError($('#createSubaccount_name'))
                }else if('password' in response.errors){
                    showAlert('error',response.errors.password[0],4000,true);
                    inputTextError($('#createSubaccount_password'))
                }
            }else if(response.newSubAccountStatus == 2){
                showAlert('warning',response.msg,10000,true);
            }else if(response.newSubAccountStatus == 3){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
