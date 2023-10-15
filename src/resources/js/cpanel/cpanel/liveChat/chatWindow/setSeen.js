setUnseenChat = function(type,id){
    let msgUnseenCheck = false;
    if(type == 'user'){
        for(const key in window.unSeenChats_users){
            if(window.unSeenChats_users[key] == id){msgUnseenCheck = true;}
        }
        msgUnseenCheck ? $(`.chatUnseen-user-${id}`).removeClass('none') : $(`.chatUnseen-user-${id}`).addClass('none');
    }else if(type == 'guest'){
        for(const key in window.unSeenChats_guests){
            if(window.unSeenChats_guests[key] == id){msgUnseenCheck = true;}
        }
        msgUnseenCheck ? $(`.chatUnseen-guest-${id}`).removeClass('none') : $(`.chatUnseen-guest-${id}`).addClass('none');
    }
    cpanelTitle(false)
}
setChatAsSeen = function(type,id){
    $.ajax({
        url:'liveChat',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            seen:true,
            id:id,
            type:type,
        },success:function(r){
            setChatAsSeen_apply(type,id);
        }
    })
}
setChatAsSeen_apply = function(type,id){
    $(`.chatUnseen-${type}-${id}`).addClass('none');
    if(type == 'user'){
        try{
            if(website.users.find(item=>item.id == id).last_msg.author == 1){
                website.users.find(item=>item.id == id).last_msg.is_seen = true;
                website.users.find(item=>item.id == id).last_msg.seen_at = parseInt(parseInt(new Date().getTime()) / 1000);
            }
        }catch{}
        for(const key in window.unSeenChats_users){
            if(window.unSeenChats_users[key] == id){
                window.unSeenChats_users.splice(key,1)
            }
        }
    }else if(type == 'guest'){
        try{
            if(website.guests.find(item=>item.id == id).last_msg.author == 1){
                website.guests.find(item=>item.id == id).last_msg.is_seen = true;
                website.guests.find(item=>item.id == id).last_msg.seen_at = parseInt(parseInt(new Date().getTime()) / 1000);
            }
        }catch{}
        for(const key in window.unSeenChats_guests){
            if(window.unSeenChats_guests[key] == id){
                window.unSeenChats_guests.splice(key,1)
            }
        }
    }
    for(const key in window.chatMsgs[`${type}-${id}`]){
        if(window.chatMsgs[`${type}-${id}`][key].is_seen == false && window.chatMsgs[`${type}-${id}`][key].author == 1){
            window.chatMsgs[`${type}-${id}`][key].is_seen = true;
            window.chatMsgs[`${type}-${id}`][key].seen_at = parseInt(parseInt(new Date().getTime()) / 1000);
            $(`#chatWindow-${type}-${id}`).find(`.ChatWindowMsgCard[msgId="${window.chatMsgs[`${type}-${id}`][key]._id}"]`).find('.chatWindowMsgInfo').attr('tooltip',chatMsgTooltip(window.chatMsgs[`${type}-${id}`][key]))
        }
    }

    cpanelTitle(false);
}
//
checkForUnseenMsgs = function(type,id){
    let unseenMsgs = false;
    for(const key in window.chatMsgs[`${type}-${id}`]){
        if(window.chatMsgs[`${type}-${id}`][key].is_seen == false && window.chatMsgs[`${type}-${id}`][key].author == 1){
            unseenMsgs = true;
        }
    }
    return unseenMsgs;
}

////
msgsSeenByUser = function(type,id,seen_at){
    for(const key in window.chatMsgs[`${type}-${id}`]){
        if(window.chatMsgs[`${type}-${id}`][key].author == 0 && window.chatMsgs[`${type}-${id}`][key].is_seen == false){
            window.chatMsgs[`${type}-${id}`][key].is_seen = true;
            window.chatMsgs[`${type}-${id}`][key].seen_at = seen_at;
            $(`#chatWindow-${type}-${id}`).find(`.ChatWindowMsgCard[msgId="${window.chatMsgs[`${type}-${id}`][key]._id}"]`).find('.chatWindowMsgInfo').attr('tooltip',chatMsgTooltip(window.chatMsgs[`${type}-${id}`][key]));
        }
    }
    if(type == 'user'){
        if(typeof(website.users.find(item=>item.id == id)) === 'undefined'){return;}
        website.users.find(item=>item.id == id).last_msg.seen_at = seen_at;
        website.users.find(item=>item.id == id).last_msg.is_seen = true;
        if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
            drawUsersChatBoxes();
        }
    }else if(type == 'guest'){
        if(typeof(website.guests.find(item=>item.id == id)) === 'undefined'){return;}
        website.guests.find(item=>item.id == id).last_msg.seen_at = seen_at;
        website.guests.find(item=>item.id == id).last_msg.is_seen = true;
        if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
            drawGuestsChatBoxes();
        }
    }

    setChatWindowLastMsgSeenStatus(type,id);

}
