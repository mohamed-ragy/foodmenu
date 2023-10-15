$('html,body').on('click','#manageUsers-loadUserBtn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#manageUsers-loadUserBtn'))
    drawManageUserLoading();
    if($('#manageUsers-usersInputList').attr('key') == null || $('#manageUsers-usersInputList').attr('key') == ''){
        inputListError($('#manageUsers-usersInputList'))
        showAlert('error',texts.users.selectManageUser,4000,true);
        hideBtnLoading($('#manageUsers-loadUserBtn'))
        return;
    }
    let userId = $('#manageUsers-usersInputList').attr('key');
    getUsersData([userId]).then(()=>{
        hideBtnLoading($('#manageUsers-loadUserBtn'))
        drawManageUser(userId);
        window.page.user = userId;
        pushHistory(false);
    })
})
$('html,body').on('click','.blockUserBtn',function(e){
    e.stopImmediatePropagation();
    let user = website.users.find(item=>item.id == window.history.state.user);
    let confirmMsgElem;let popupTitle;let banAction;
    if(!user.isBanned){
        confirmMsgElem = $('<div/>',{class:'msgBox_orange'}).append(
            $('<span/>',{class:'ico-warning fs2 mB10'}),
            $('<span/>',{class:'taC',text:texts.users.blockConfirmMsg.replace(':name:',user.name)})
        );
        popupTitle = texts.users.banUser;
        banAction = 'ban'
    }else{
        confirmMsgElem = $('<div/>',{class:'',text:texts.users.unblockConfirmMsg.replace(':name:',user.name)})
        popupTitle = texts.users.removeBan;
        banAction = 'unban'
    }

    showPopup('',function(){
        $('.popupTitle').text(popupTitle);
        $('.popupBody').append(
            confirmMsgElem,
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'banUser-confirmBtn',user:user.id,action:banAction,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.yes}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
});

$('html,body').on('click','#banUser-confirmBtn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#banUser-confirmBtn'))
    let action;
    $(this).attr('action') == 'ban' ? action = 1 : $(this).attr('action') == 'unban' ? action = 0 : null;
    let userId = $(this).attr('user');
    
    $.ajax({
        url:'users',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            banUser:userId,
            userName:website.users.find(item=>item.id == userId).name,
            action:action,
        },success:function(r){
            hideBtnLoading($('#banUser-confirmBtn'))
            if(r.banUserState == 1){
                showAlert('success',r.msg,4000,true);
                website.users.find(item=>item.id == userId).isBanned = action
                drawManageUser(userId);
                closePopup();
            }else if(r.banUserState == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
$('html,body').on('click','.editUser-unsetLocation',function(){
    window.editUserMapMarker.setLatLng([0,0]);
    window.editUserMap.flyTo([0,0], 2, {
        animate: false,
        duration: 1
    });
    window.editUserMap.removeLayer(window.editUserMapMarker)
});
$('html,body').on('click','#cancelEditUSerBtn',function(e){
    e.stopImmediatePropagation();
    drawManageUser(window.history.state.user)
})
$('html,body').on('click','#saveEditUSerBtn',function(e){
    e.stopImmediatePropagation();
    user = website.users.find(item=> item.id == $('#editUser-container').attr('user'));
    if(typeof(user) === 'undefined'){return;}
    showBtnLoading($('#editUser-saveBtn'))
    let email = $('#editUser-email').val();
    let password = $('#editUser-password').val();
    let name = $('#editUser-name').val();
    let phoneNumber = $('#editUser-phoneNumber').val();
    let address = $('#editUser-address').val();
    let lat = window.editUserMapMarker.getLatLng().lat;
    let lng = window.editUserMapMarker.getLatLng().lng;
    let changePassword;
    password == '' ? changePassword = 0 : changePassword = 1;
    $.ajax({
        url:'users',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editUser:true,
            userId:user.id,
            email:email,
            password:password,
            changePassword:changePassword,
            name:name,
            phoneNumber:phoneNumber,
            address:address,
            lat:lat,
            lng:lng,
        },success:function(r){
            hideBtnLoading($('#editUser-saveBtn'))
            if(r.editUserStatus == 0){
                showAlert('error',r.msg,4000,true)
            }else if(r.editUserStatus == 1){
                showAlert('success',r.msg,4000,true)
                for(const key in website.users){
                    if(website.users[key].id == user.id){
                        website.users[key].email = email;
                        website.users[key].name = name;
                        website.users[key].phoneNumber = phoneNumber;
                        website.users[key].address = address;
                        website.users[key].lat = lat;
                        website.users[key].lng = lng;
                        if(window.history.state.page == 'manage_users' && window.history.state.user == user.id){
                            drawManageUser(user.id)
                        }
                        $(`#chatWindow-user-${website.users[key].id}`).find('.chatWindowUserName').text(website.users[key].name).attr('tooltip',website.users[key].name)
                        if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                            drawUsersChatBoxes();
                        }
                    }
                }
            }else if(r.editUserStatus == 2){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#editUser-email'))
            }else if(r.editUserStatus == 3){
                showAlert('error',r.msg.email[0],4000,true);
                inputTextError($('#editUser-email'))
            }else if(r.editUserStatus == 4){
                showAlert('error',r.msg.password[0],4000,true);
                inputTextError($('#editUser-password'))
            }else if(r.editUserStatus == 5){
                showAlert('error',r.msg.name[0],4000,true);
                inputTextError($('#editUser-name'))
            }else if(r.editUserStatus == 6){
                showAlert('error',r.msg.address[0],4000,true);
                inputTextError($('#editUser-address'))
            }else if(r.editUserStatus == 7){
                showAlert('error',r.msg.phoneNumber[0],4000,true);
                inputTextError($('#editUser-phoneNumber'))
            }
        }
    })
})
