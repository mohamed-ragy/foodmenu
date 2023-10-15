let onlineAdminsNumber = 0;
let onlineUsersNumber = 0;
let onlineCpanelsNumber = 0;
let onlineDeliveriesNumber = 0;
let onlineGuestsNumber = 0;

calcOnlineUsers = function(user,action){
    if(user.type == 'admin'){
        if(action == 'join'){
            onlineAdminsNumber = onlineAdminsNumber + 1;
        }else if(action  = 'leave'){
            onlineAdminsNumber = onlineAdminsNumber - 1;
        }
        $('.onlineAdminsNumber').text(onlineAdminsNumber);
    }
    if(user.type == 'cpanel'){
        if(action == 'join'){
            onlineCpanelsNumber = onlineCpanelsNumber + 1;
        }else if(action  = 'leave'){
            onlineCpanelsNumber = onlineCpanelsNumber - 1;
        }
        $('.onlineCpanelsNumber').text(onlineCpanelsNumber);
    }
    if(user.type == 'delivery'){
        if(action == 'join'){
            onlineDeliveriesNumber = onlineDeliveriesNumber + 1;
        }else if(action  = 'leave'){
            onlineDeliveriesNumber = onlineDeliveriesNumber - 1;
        }
        $('.onlineDeliveriesNumber').text(onlineDeliveriesNumber);
    }
    if(user.type == 'user'){
        if(action == 'join'){
            onlineUsersNumber = onlineUsersNumber + 1;
        }else if(action  = 'leave'){
            onlineUsersNumber = onlineUsersNumber - 1;
        }
        $('.onlineUsersNumber').text(onlineUsersNumber);
    }
    if(user.type == 'guest'){
        if(action == 'join'){
            onlineGuestsNumber = onlineGuestsNumber + 1;
        }else if(action  = 'leave'){
            onlineGuestsNumber = onlineGuestsNumber - 1;
        }
        $('.onlineGuestsNumber').text(onlineGuestsNumber);
    }
}


window.Echo.join('globalChannel')
.here(function(r){
    for(const key in r){
        const user = r[key];
        calcOnlineUsers(user,'join');
    }
})
.joining(function(user){
    calcOnlineUsers(user,'join');
})
.leaving(function(user){
    calcOnlineUsers(user,'leave');
})
.listen('globalEvent',function(r){
    handelGlobalChanel(r);
});
