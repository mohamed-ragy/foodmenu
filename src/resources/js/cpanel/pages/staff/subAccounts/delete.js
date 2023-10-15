$('html,body').on('click','.deleteSubaccount',function(e){
    e.stopImmediatePropagation();
    let subaccountId = $(this).attr('subaccount');
    let subaccount = website.accounts.find(item=> item.id == subaccountId);
    if(typeof(subaccount) === 'undefined'){return;}
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.staff.subaccountDeleteConfirmMsg.replace(':name:',subaccount.name)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteSubaccount-confirmBtn',subaccount:subaccount.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
});
$('html,body').on('click','#deleteSubaccount-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let subaccountId = $(this).attr('subaccount');
    let subaccount = website.accounts.find(item=> item.id == subaccountId);
    if(typeof(subaccount) === 'undefined'){return;}
    showBtnLoading($('#deleteSubaccount-confirmBtn'))
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteSubAccount:subaccount.id,
            subaccountName:subaccount.name,
        },
        success:function(response){
            hideBtnLoading($('#deleteSubaccount-confirmBtn'))
            if(response.deleteSubAccountStatus == 0){
                showAlert('error',response.msg,4000,true);
            }else if(response.deleteSubAccountStatus == 1){
                showAlert('success',response.msg,4000,true);
                for(const key in website.deliveries){
                    if(website.accounts[key].id == subaccount.id){
                        website.accounts.splice(key,1);
                        website_temp.accounts.splice(key,1);
                    }
                }
                drawSubAccountsTable();
                closePopup();
            }
        }
    })
})
