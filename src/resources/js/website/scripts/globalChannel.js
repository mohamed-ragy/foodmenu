// window.globalChannel.send = function(data){
//     return new Promise(function(resolve,reject){
//         let sendData = {_token:$('meta[name="csrf-token"').attr('content')};
//         for(const key in data){
//             sendData[key] = data[key];
//         }
//         $.ajax({
//             url:'/website/websiteChannel',
//             type:'post',
//             data:sendData,
//             success:function(r){
//                 resolve(r);
//                 console.log(r)
//             }
//         }).fail(function(r){
//             reject();
//         })
//     })
// }
window.globalChannel
.here(function(users){
    // for(const key in users){
    //     if(users[key].type == 'account'){
    //         if(users[key].liveChatAuthority == 1 && !users[key].isInvisible){
    //             window.onlineAccounts.push(users[key].id)
    //         }
    //     }
    // }
    // checkRestaurantOnlineStatus();
    // console.log(users)
}).joining(function(user){
    if(user.type == 'account'){
        if(user.liveChatAuthority == 1 && !user.isInvisible){
            window.onlineAccounts.push(user.id)
        }
    }
    checkRestaurantOnlineStatus();
    // console.log(user)
}).leaving(function(user){
    if(user.type == 'account'){
        for(const key in window.onlineAccounts){
            if(window.onlineAccounts[key] == user.id){
                window.onlineAccounts.splice(key,1)
            }
        }
    }
    checkRestaurantOnlineStatus();
    // console.log(user)
}).listen(`.globalChannel.${website.id}`,function(r){
    let data = r.notification;
    console.log(data)
    switch(data.code){
        case 'restaurant.online.status':
        for(const key in window.onlineAccounts){
            if(window.onlineAccounts[key] == data.account_id){
                window.onlineAccounts.splice(key,1)
            }
        }
        if(data.onlineStatus == 0){
            window.onlineAccounts.push(data.account_id)
        }
        checkRestaurantOnlineStatus();
        break;
    }
});
