newMsgFromAccount = function(type,id,msg){
    if(type == 'user'){
        if(typeof(website.users.find(item=>item.id == id)) === 'undefined'){return;}
        website.users.find(item=>item.id == id).lastChat = msg.sent_at;
        website.users.find(item=>item.id == id).lastMsg_id = msg._id;
        website.users.find(item=>item.id == id).last_msg = JSON.parse(JSON.stringify(msg));
        if(window.getFirstChatsCheck){
            if(typeof(window.chatBoxes.users.find(item=>item.user_id == id)) === 'undefined'){
                window.chatBoxes.users.push({
                    user_id:parseInt(id),
                    lastMsg_at:msg.sent_at,
                })
            }else{
                window.chatBoxes.users.find(item=>item.user_id == id).lastMsg_at = msg.sent_at;
            }

        }
        if($(`#chatWindow-${type}-${id}`).length > 0){
            window.chatMsgs[`${type}-${id}`].unshift(JSON.parse(JSON.stringify(msg)));
            drawChatMsg(type,id,msg,'prepend')
        }
        if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
            drawUsersChatBoxes();
        }
        if($(`#chatWindow-${type}-${id}`).find('.chatwindowBody').scrollTop() < 0){
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').addClass('chatWindowScrollToBottom_newMsg');
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomArrow').addClass('chatWindowScrollToBottomArrow_newMsg');
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomTxt').removeClass('none');
        }
    }else if(type == 'guest'){
        if(typeof(website.guests.find(item=>item.id == id)) === 'undefined'){return;}
        website.guests.find(item=>item.id == id).lastChat = msg.sent_at;
        website.guests.find(item=>item.id == id).lastMsg_id = msg._id;
        website.guests.find(item=>item.id == id).last_msg = JSON.parse(JSON.stringify(msg));
        if(window.getFirstChatsCheck){
            if(typeof(window.chatBoxes.guests.find(item=>item.guest_id == id)) === 'undefined'){
                window.chatBoxes.guests.push({
                    guest_id:parseInt(id),
                    lastMsg_at:msg.sent_at,
                })
            }else{
                window.chatBoxes.guests.find(item=>item.guest_id == id).lastMsg_at = msg.sent_at;
            }
        }
        if($(`#chatWindow-${type}-${id}`).length > 0){
            window.chatMsgs[`${type}-${id}`].unshift(JSON.parse(JSON.stringify(msg)))
            drawChatMsg(type,id,msg,'prepend')
        }
        if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
            drawGuestsChatBoxes();
        }
        if($(`#chatWindow-${type}-${id}`).find('.chatwindowBody').scrollTop() < 0){
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').addClass('chatWindowScrollToBottom_newMsg');
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomArrow').addClass('chatWindowScrollToBottomArrow_newMsg');
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomTxt').removeClass('none');
        }
    }
}
newMsgFromUser = function(type,id,msg){
    if(type == 'user'){
        getUsersData([id]).then(()=>{
            website.users.find(item=>item.id == id).lastChat = parseInt(parseInt(new Date().getTime())/1000);
            website.users.find(item=>item.id == id).lastMsg_id = msg._id;
            website.users.find(item=>item.id == id).last_msg = JSON.parse(JSON.stringify(msg));
            if(window.getFirstChatsCheck){
                if(typeof(window.chatBoxes.users.find(item=>item.user_id == id)) === 'undefined'){
                    window.chatBoxes.users.push({
                        user_id:parseInt(id),
                        lastMsg_at:parseInt(parseInt(new Date().getTime())/1000),
                    })
                }else{
                    window.chatBoxes.users.find(item=>item.user_id == id).lastMsg_at = parseInt(parseInt(new Date().getTime())/1000);
                }
    
            }
            if(typeof(window.unSeenChats_users[id]) === 'undefined'){
                window.unSeenChats_users.push(id)
            }
            if($(`#chatWindow-${type}-${id}`).length > 0){
                window.chatMsgs[`${type}-${id}`].unshift(JSON.parse(JSON.stringify(msg)));
                drawChatMsg(type,id,msg,'prepend')
            }
            if(settings_temp.chatPopup){
                if(settings_temp.newMsgAlert != 0){
                    $('#newChatMsgSound')[0].play();
                }
                openChatWindow(id,type)
                $(`#chatWindow-${type}-${id}`).removeClass('activeChatWindow')
            }

            setUnseenChat(type,id)
            if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                drawUsersChatBoxes();
            }
            if($(`#chatWindow-${type}-${id}`).find('.chatwindowBody').scrollTop() < 0){
                $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').addClass('chatWindowScrollToBottom_newMsg');
                $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomArrow').addClass('chatWindowScrollToBottomArrow_newMsg');
                $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomTxt').removeClass('none');
            }
        })
    }else if(type == 'guest'){
        getGuestsData([id]).then(()=>{
            website.guests.find(item=>item.id == id).lastChat = parseInt(parseInt(new Date().getTime())/1000)
            website.guests.find(item=>item.id == id).lastMsg_id = msg._id 
            website.guests.find(item=>item.id == id).last_msg = JSON.parse(JSON.stringify(msg)) 
            if(window.getFirstChatsCheck){
                if(typeof(window.chatBoxes.guests.find(item=>item.guest_id == id)) === 'undefined'){
                    window.chatBoxes.guests.push({
                        guest_id:parseInt(id),
                        lastMsg_at:parseInt(parseInt(new Date().getTime())/1000),
                    })
                }else{
                    window.chatBoxes.guests.find(item=>item.guest_id == id).lastMsg_at = parseInt(parseInt(new Date().getTime())/1000);
                }
            }
            if(typeof(window.unSeenChats_guests[id]) === 'undefined'){
                window.unSeenChats_guests.push(id)
            }
            if($(`#chatWindow-${type}-${id}`).length > 0){
                window.chatMsgs[`${type}-${id}`].unshift(JSON.parse(JSON.stringify(msg)))
                drawChatMsg(type,id,msg,'prepend')
            }

            if(settings_temp.chatPopup){
                if(settings_temp.newMsgAlert != 0){
                    $('#newChatMsgSound')[0].play();
                }
                openChatWindow(id,type)
                $(`#chatWindow-${type}-${id}`).removeClass('activeChatWindow')
            }
            setUnseenChat(type,id)
            if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
                drawGuestsChatBoxes();
            }
            if($(`#chatWindow-${type}-${id}`).find('.chatwindowBody').scrollTop() < 0){
                $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').addClass('chatWindowScrollToBottom_newMsg');
                $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomArrow').addClass('chatWindowScrollToBottomArrow_newMsg');
                $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomTxt').removeClass('none');
            }
        })
    }
}
