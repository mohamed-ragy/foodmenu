$('body').on('input change','#createDeliveryAccount_name',function(e){
    $(this).val() == '' || $(this).val() == null ? $('#createDeliveryAccount_loginName').val(''):
    $('#createDeliveryAccount_loginName').val(`${$(this).val()}@${website.domainName}`);
})

$('body').on('click','#createNewDeliveryAccountBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#createNewDeliveryAccountBtn'));
    let deliveryName = $('#createDeliveryAccount_name').val();
    let password = $('#createDeliveryAccount_password').val();
    $.ajax({
        url:'mystaff',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createNewDeliveryAccount:true,
            deliveryName:deliveryName,
            password:password,
        },success:function(response){
            hideBtnLoading($('#createNewDeliveryAccountBtn'))
            if(response.createNewDeliveryAccountStatus == 0){
                showAlert('error',response.msg,4000,true);
                inputTextError($('#createDeliveryAccount_name'))
            }else if(response.createNewDeliveryAccountStatus == 2){
                showAlert('error',response.msg,4000,true);
                inputTextError($('#createDeliveryAccount_password'))
            }else if(response.createNewDeliveryAccountStatus == 3){
                showAlert('error',response.msg,4000,true);
                inputTextError($('#createDeliveryAccount_name'))
            }else if(response.createNewDeliveryAccountStatus == 4){
                showAlert('error',response.msg,4000,true);
            }else if(response.createNewDeliveryAccountStatus == 5){
                showAlert('error',response.msg.deliveryName[0],4000,true);
                inputTextError($('#createDeliveryAccount_name'))
            }else if(response.createNewDeliveryAccountStatus == 6){
                showAlert('warning',response.msg,10000,true);
            }else if(response.createNewDeliveryAccountStatus == 1){
                showAlert('success',response.msg,4000,true);
                $('#createDeliveryAccount_name').val('');
                $('#createDeliveryAccount_loginName').val('');
                $('#createDeliveryAccount_password').val('');
                popupPageClose(true);
                website.deliveries.push(response.deliveryAccount)
                website_temp.deliveries.push(response.deliveryAccount)
                drawDeliveryAccountsTable();
            }
        }
    });

});
