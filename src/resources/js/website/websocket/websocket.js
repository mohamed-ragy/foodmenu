
window.Echo.connector.pusher.connection.bind('connected', () => {
    window.is_websocket_conected = true;
    $.ajaxSetup({
        headers: {
            'X-Socket-Id': window.Echo.socketId(),
            'X-Csrf-Token':$('meta[name="csrf-token"]').attr('content'),
            'X-Website-Id':website_id,
        },
        type:'POST',
    });
});

window.websiteChannel = window.Echo.private(`websiteChannel.${website_id}.${auth.type}.${auth.id}`)
window.globalChannel = window.Echo.join(`globalChannel.${website_id}`)
window.globalChannel
.here(function(users){
    console.log(users)
    for(const key in users){
        if(users[key].type == 'account'){
            if(users[key].liveChatAuthority == 1 && users[key].isInvisible == 0){
                window.onlineAccounts.push(users[key].id)
            }
        }
    }
    checkRestaurantOnlineStatus();
    // console.log(users)
}).joining(function(user){
    if(user.type == 'account'){
        if(user.liveChatAuthority == 1 && user.isInvisible == 0){
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
        case 'product.delete':

        break;
        case 'product.availability':

        break;
        case 'product.edit':

        break;
        case 'option.delete':

        break;
        case 'selection.edit':

        break;
        case 'selection.delete':

        break;
        case 'review.delete':

        break;
    }
});
