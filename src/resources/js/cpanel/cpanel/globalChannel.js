window.globalChannel.send = function(data){
    return new Promise(function(resolve,reject){
        let sendData = {_token:$('meta[name="csrf-token"').attr('content')};
        for(const key in data){
            sendData[key] = data[key];
        }
        $.ajax({
            url:'globalChannel',
            type:'put',
            data:sendData,
            success:function(r){
                console.log(r)
                resolve(r);
            }
        }).fail(function(r){
            reject();
        })
    })
}
window.globalChannel
.here(function(users){
    console.log(users)
    window.globalChannelConnected = true;
    window.online = [];
    for(const key in users){
        let user = users[key];
        window.online.push({
            id:user.id,
            name:user.name,
            type:user.type,
            lastSeen:parseInt(parseInt(new Date().getTime()) / 1000),
            lastActivity:texts.users.user_online,
            is_pending:false,
        });
        user.type == 'user' || user.type == 'guest' ? onlineUser(user.id,user.type) : null ;
        drawOnlineUsersTable();
        user.type == 'delivery' ? deliveryManOnline(user.id) : null;
        if(account.is_master){
            user.type == 'account' ? subaccountOnline(user.id) : null;
        }
        // console.log(window.online)
    }
    drawHomeOnlineVisitors();

}).joining(function(user){
    let isUserFound = false;
    for(const key in window.online){
        if(window.online[key].type == 'user' || window.online[key].type == 'guest'){
            if(window.online[key].id == user.id && user.type == window.online[key].type){
                isUserFound = true;
                window.online[key].is_pending = false;
                window.online[key].lastSeen = parseInt(parseInt(new Date().getTime()) / 1000);
            }
        }
    }
    if(!isUserFound){
        window.online.push({
            id:user.id,
            name:user.name,
            type:user.type,
            lastSeen:parseInt(parseInt(new Date().getTime()) / 1000),
            lastActivity:texts.users.user_online,
            is_pending:false,
        });
        settings_temp.onlineUserAlert && user.type == 'user' ? showAlert('normal',texts.users.userOnline.replace(':name:',`<span><a class="popupPage popupId" popupPage="user" popupId="user" user="${user.id}">${user.name}</a></span>`),4000,true) : null;
        settings_temp.onlineGuestAlert && user.type == 'guest' ? showAlert('normal',texts.users.guestOnline.replace(':name:',user.name),4000,true) : null;
        user.type == 'user' || user.type == 'guest' ? onlineUser(user.id,user.type) : null ;
    }else{
        window.online.find(item=>item.id == user.id).is_pending = false;
        window.online.find(item=>item.id == user.id).lastSeen = parseInt(parseInt(new Date().getTime()) / 1000);
    }
    if(user.type == 'delivery'){
        website.deliveries.find(item=>item.id == user.id).lastSeen = parseInt(parseInt(new Date().getTime()) / 1000);
        deliveryManOnline(user.id)
    }
    if(user.type == 'account' && account.is_master == true){
        website.accounts.find(item=>item.id == user.id).lastSeen = parseInt(parseInt(new Date().getTime()) / 1000);
        subaccountOnline(user.id)
    }
    drawOnlineUsersTable();
    drawHomeOnlineVisitors();

    // if(account.isInvisible == 0){
    //     window.globalChannel.send({invisible:account.isInvisible})
    // }
}).leaving(function(user){
    // console.log(user)
    if(user.type == 'user' || user.type == 'guest'){
        window.online.find(item=>item.id == user.id && item.type == user.type).lastSeen = parseInt(parseInt(new Date().getTime()) / 1000)
        window.online.find(item=>item.id == user.id && item.type == user.type).is_pending = true;
        $(`.visitorOnlineIcon-${user.type}-${user.id}`).removeClass('offline-icon online-icon').addClass('onlineO-icon')
    }
    // else{
        for(const key in window.online){
            if(window.online[key].type == user.type && window.online[key].id == user.id){
                window.online.splice(key,1)
            }
        }
    // }
    if(user.type == 'delivery'){
        website.deliveries.find(item=>item.id == user.id).lastSeen = parseInt(parseInt(new Date().getTime()) / 1000);
        deliveryManOffline(user.id)
    }
    if(user.type == 'account' && account.is_master == true){
        website.accounts.find(item=>item.id == user.id).lastSeen = parseInt(parseInt(new Date().getTime()) / 1000);
        subaccountOffline(user.id)
    }
    drawHomeOnlineVisitors();
}).listen(`.globalChannel.${website.id}`,function(r){
    let data = r.notification;
    // console.log(data)
    switch(data.code){

    }
});
setInterval(() => {
    for(const key in window.online){
        if(window.online[key].type == 'user' || window.online[key].type == 'guest'){
            if(window.online[key].is_pending && window.online[key].lastSeen < (parseInt(parseInt(new Date().getTime()) / 1000) - 5)){
                if(window.online[key].type == 'user' && typeof(website.users.find(item=>item.id == window.online[key].id)) !== 'undefined'){
                    website.users.find(item=>item.id == window.online[key].id).lastSeen = parseInt(parseInt(new Date().getTime()) / 1000)
                }
                window.online[key].type == 'user' || window.online[key].type == 'guest' ? offlineUser(window.online[key].id,window.online[key].type) : null ;
                window.online.splice(key,1)
                drawOnlineUsersTable();
                drawHomeOnlineVisitors();
            }
        }
    }
}, 1000);
