let findUserInputListTimeout;
$('html,body').on('input','.findUser',function(e){
    e.stopImmediatePropagation();
    clearTimeout(findUserInputListTimeout);
    let thisFindUserInput = $(this);
    resetInputList(thisFindUserInput.parent().find('.listContainer'))
    if(thisFindUserInput.val() == '' || thisFindUserInput.val() == null){
        thisFindUserInput.parent().find('.listContainer').text('');
        for(const key in window.findUser){
            addToInputList(thisFindUserInput.parent().find('.listContainer'),window.findUser[key].name,window.findUser[key].id)
        }
        return;
    }
    findUserInputListTimeout = setTimeout(function(){
        $.ajax({
            url:'users',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                findUser:thisFindUserInput.val(),
            },success:function(r){
                thisFindUserInput.parent().find('.listContainer').text('');
                if(r.users.length == 0){
                    thisFindUserInput.parent().find('.listContainer').append($('<div/>',{class:'m10 fs085',text:texts.users.noUsers}))
                }
                for(const key in r.users){
                    window.findUser = r.users;
                    addToInputList(thisFindUserInput.parent().find('.listContainer'),r.users[key].name,r.users[key].id)
                }
            }
        })
    },1000)
})

getUsersData = function(usersIds){
    return new Promise(function(resolve,reject){
        let usersIds2 = [];
        let showUserPopupPageInterval;
        for(const key in usersIds){
            if(typeof(website.users.find(item=>item.id == usersIds[key])) === 'undefined'){
                checkUseenNotifications(['user.signup'],'user_id',usersIds[key])
                usersIds2.push(usersIds[key])
            }
        }
        if(usersIds2.length == 0 ){
            resolve();
            return;
        }
        if(!window.websocketServerConnected){
            showUserPopupPageInterval = setInterval(() => {
                if(window.websocketServerConnected){
                    clearInterval(showUserPopupPageInterval);
                    $.ajax({
                        url:'users',
                        type:'put',
                        data:{
                            _token:$('meta[name="csrf-token"]').attr('content'),
                            getUsers:true,
                            userIds:usersIds2,
                        },success:function(r){
                            for(const key in r.users){
                                website.users.push(r.users[key])
                            }
                            resolve();
                        }
                    }).fail(function(){
                        reject();
                        return;
                    })
                }
            }, 1000);
        }else{
            $.ajax({
                url:'users',
                type:'put',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    getUsers:true,
                    userIds:usersIds2,
                },success:function(r){
                    for(const key in r.users){
                        website.users.push(r.users[key])
                    }
                    resolve();
                }
            }).fail(function(){
                reject();
                return;
            })
        }
    })
}
getGuestsData = function(guestsIds){
    return new Promise(function(resolve,reject){
        let guestsIds2 = [];
        for(const key in guestsIds){
            if(typeof(website.guests.find(item=>item.id == guestsIds[key])) === 'undefined'){
                guestsIds2.push(guestsIds[key])
            }
        }
        if(guestsIds2.length == 0 ){
            resolve();
            return;
        }
        $.ajax({
            url:'users',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getGuests:true,
                guestsIds:guestsIds2,
            },success:function(r){
                for(const key in r.guests){
                    website.guests.push(r.guests[key])
                }
                resolve();
            }
        }).fail(function(){
            reject();
            return;
        })
    })
}
//////////////////////////////////////////////
/////////////////////////////////////////////
