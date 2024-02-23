require("./liveChat/liveChatOptions.js");//done//
require("./liveChat/chatBoxes.js");//done//
require("./liveChat/chatWindow.js");//done//


$('#liveChatMsgs').on('click',function(){
    if(window.waitFor_loadWebsiteOrdersAndChats){return;}
    if(window.getFirstChatsCheck == false){
        drawLoadingChatBoxes();
        getChats().then(()=>{
            drawGuestsChatBoxes();
            drawUsersChatBoxes();
        });
    }
})
getChats = function(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:'liveChat',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getFirstLiveChats:true,
            },success:function(r){
                r.liveChats_users.length == 0 ? window.noMoreChats_users = true : null;
                r.liveChats_guests.length == 0 ? window.noMoreChats_guests = true : null;
                for(const key in r.liveChats_users){
                    if(typeof(website.users.find(item=>item.id == r.liveChats_users[key].id)) === 'undefined'){
                        website.users.push(r.liveChats_users[key]);
                    }

                    if(typeof(window.chatBoxes.users.find(item=>item.user_id == r.liveChats_users[key].id)) === 'undefined'){
                        window.chatBoxes.users.push({
                            user_id:parseInt(r.liveChats_users[key].id),
                            lastMsg_at:r.liveChats_users[key].last_msg.sent_at,
                        })
                    }else{
                        window.chatBoxes.users.find(item=>item.user_id == r.liveChats_users[key].id).lastMsg_at = r.liveChats_users[key].last_msg.sent_at;
                    }
                }
                for(const key in r.liveChats_guests){
                    if(typeof(website.guests.find(item=>item.id == r.liveChats_guests[key].id)) === 'undefined'){
                        website.guests.push(r.liveChats_guests[key]);
                    }

                    if(typeof(window.chatBoxes.guests.find(item=>item.guest_id == r.liveChats_guests[key].id)) === 'undefined'){
                        window.chatBoxes.guests.push({
                            guest_id:parseInt(r.liveChats_guests[key].id),
                            lastMsg_at:r.liveChats_guests[key].last_msg.sent_at,
                        })
                    }else{
                        window.chatBoxes.guests.find(item=>item.guest_id == r.liveChats_guests[key].id).lastMsg_at = r.liveChats_guests[key].last_msg.sent_at;
                    }
                }
                window.getFirstChatsCheck = true;
                resolve();
            }
        })
    })

}

///////////////////////
