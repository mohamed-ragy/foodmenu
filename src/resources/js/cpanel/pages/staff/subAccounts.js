require('./subAccounts/delete.js')//done//
require('./subAccounts/create.js')//done//
require('./subAccounts/manage.js')//done//

subaccountOnline = function(subaccountId){
    $(`.subaccountOnlineIcon-${subaccountId}`).removeClass('offline-icon').addClass('online-icon');
    $(`.subaccountlastSeen-${subaccountId}`).removeClass('diffTimeCalc').text(texts.staff.now)
    $(`.subaccountlastSeen2-${subaccountId}`).removeClass('diffTimeCalc').text(texts.cpanel.public.online)
}
subaccountOffline = function(subaccountId){
    $(`.subaccountOnlineIcon-${subaccountId}`).removeClass('online-icon').addClass('offline-icon');
    $(`.subaccountlastSeen-${subaccountId}`).text('').addClass('diffTimeCalc').attr('time',website.accounts.find(item=>item.id == subaccountId).lastSeen)
    $(`.subaccountlastSeen2-${subaccountId}`).text('').addClass('diffTimeCalc').attr('time',website.accounts.find(item=>item.id == subaccountId).lastSeen).attr('timetext',texts.staff.lastSeen)
}
setSubaccountOnlineStatus = function(subaccountId){
    let subaccountOnlineCheck = false;
    for(const key in window.online){
        if(window.online[key].type == 'account' && window.online[key].id == subaccountId){
            subaccountOnlineCheck = true;
        }
    }
    subaccountOnlineCheck ? subaccountOnline(subaccountId) : subaccountOffline(subaccountId) ;
}


$('body').on('click','.subAccount-unblock',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}

    if($(this).find('.subAccount-unblockIcon').hasClass('none')){return}
    $(this).find('.ico-warning').addClass('none');
    $(this).find('.loading_s').removeClass('none').css('visibility','visible');
    let account_id = $(this).attr('subaccount');
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            unblockSubAccount:true,
            account_id,account_id,
        },success:function(r){
            if(r.unblockSubAccountStatus == 1){
                for(const key in website.accounts){
                    if(website.accounts[key].id == account_id){
                        website.accounts[key].password_fails = 0;
                        drawSubAccountsTable();
                    }
                }
                showAlert('success',r.msg,4000,true);
                window.guideHints.subaccountsBlockCheck()
            }else if(r.unblockSubAccountStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
///////////////////////////force logout///////////////////////////////////
$('body').on('click','.subAccount-forceLogout',function(e){
    if(!coolDownChecker()){return;}
    if($(this).find('.subAccount-forceLogout').hasClass('none')){return}
    let thisElem = $(this);
    thisElem.find('.ico-logout').addClass('none');
    thisElem.find('.loading_s').removeClass('none').css('visibility','visible');
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{ _token:$('meta[name="csrf-token"]').attr('content'),forceLogout:$(this).attr('subaccount')},
        success:function(response){
            if(response.forceLogoutStatus == 1){
                thisElem.find('.ico-logout').removeClass('none');
                thisElem.find('.loading_s').addClass('none').css('visibility','hidden');
                showAlert('success',response.msg,4000,true);
            }else if(response.forceLogoutStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})

