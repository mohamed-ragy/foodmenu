$('body').on('click','#createNewUserBtn',function(){
    showBtnLoading($('#createNewUserBtn'))
    $.ajax({
        url:'users',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createNewUser:true,
            email:$('#createNewUser-email').val(),
            password:$('#createNewUser-password').val(),
            name:$('#createNewUser-name').val(),
            phoneNumber:$('#createNewUser-phoneNumber').val(),
        },
        success:function(response){
        hideBtnLoading($('#createNewUserBtn'))
            if(response.createNewUserStatus == 2){
                showAlert('error',response.msg,4000,true);
                inputTextError($('#createNewUser-email'))
            }else if(response.createNewUserStatus == 3){
                showAlert('error',response.msg.email[0],4000,true);
                inputTextError($('#createNewUser-email'))
            }else if(response.createNewUserStatus == 4){
                showAlert('error',response.msg.password[0],4000,true);
                inputTextError($('#createNewUser-password'))
            }else if(response.createNewUserStatus == 5){
                showAlert('error',response.msg.name[0],4000,true);
                inputTextError($('#createNewUser-name'))
            }else if(response.createNewUserStatus == 6){
                showAlert('error',response.msg.address[0],4000,true);
                // inputTextError($('#createNewUser-address'))
            }else if(response.createNewUserStatus == 7){
                showAlert('error',response.msg.phoneNumber[0],4000,true);
                inputTextError($('#createNewUser-phoneNumber'))
            }else if(response.createNewUserStatus == 0){
                showAlert('error',response.msg,4000,true);
            }else if(response.createNewUserStatus == 1){
                showAlert('success',response.msg,4000,true);
                showPopupPage('user',{user:response.user.id});
                $('#createNewUser-email').val('');
                $('#createNewUser-password').val('');
                $('#createNewUser-name').val('');
                $('#createNewUser-phoneNumber').val('');
            }
        }
    })
})

