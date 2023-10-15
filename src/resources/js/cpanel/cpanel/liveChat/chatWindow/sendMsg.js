sendChatMsg = function(type,id){
    if( $(`#chatWindow-${type}-${id}`).find('.chatWindowInputMsg').val() == ''){return;}
    let msgTxt = $(`#chatWindow-${type}-${id}`).find('.chatWindowInputMsg').val();
    let tempId = Date.now();
    window.sendingMsgs[tempId] = msgTxt;
    drawChatMsg(type,id,{
        _id:tempId,
        user_id:id,
        account_id:account.id,
        author:0,
        message:msgTxt,
        sent_at:null,
        seen_at:null,
        is_seen:false,
    },'prepend','ChatWindowMsgCard_animation')
    $(`#chatWindow-${type}-${id}`).find('.chatWindowInputMsg').val('');
    $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').scrollTop(0)
    $.ajax({
        url:'liveChat',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sendChatMessage:true,
            type:type,
            id:id,
            msg:msgTxt,
        },success:function(r){
            if(r.sendChatMessage == 1){
                if(type == 'user'){
                    website.users.find(item=>item.id == id).lastChat = r.msg.sent_at;
                    website.users.find(item=>item.id == id).lastMsg_id = r.msg._id;
                    website.users.find(item=>item.id == id).last_msg = JSON.parse(JSON.stringify(r.msg));
                    if(window.getFirstChatsCheck){
                        if(typeof(window.chatBoxes.users.find(item=>item.user_id == id)) === 'undefined'){
                            window.chatBoxes.users.push({
                                user_id:parseInt(id),
                                lastMsg_at:r.msg.sent_at,
                            })
                        }else{
                            window.chatBoxes.users.find(item=>item.user_id == id).lastMsg_at = r.msg.sent_at;
                        }
            
                    }
                    if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                        drawUsersChatBoxes();
                    }
                }else if(type == 'guest'){
                    website.guests.find(item=>item.id == id).lastChat = r.msg.sent_at;
                    website.guests.find(item=>item.id == id).lastMsg_id = r.msg._id;
                    website.guests.find(item=>item.id == id).last_msg = JSON.parse(JSON.stringify(r.msg));
                    if(window.getFirstChatsCheck){
                        if(typeof(window.chatBoxes.guests.find(item=>item.guest_id == id)) === 'undefined'){
                            window.chatBoxes.guests.push({
                                guest_id:parseInt(id),
                                lastMsg_at:r.msg.sent_at,
                            })
                        }else{
                            window.chatBoxes.guests.find(item=>item.guest_id == id).lastMsg_at = r.msg.sent_at;
                        }
            
                    }
                    if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
                        drawGuestsChatBoxes();
                    }
                }
                window.chatMsgs[`${type}-${id}`].unshift(JSON.parse(JSON.stringify(r.msg)))
                $(`.ChatWindowMsgCard[msgId="${tempId}"]`).remove()
                drawChatMsg(type,id,r.msg,'prepend')
                delete window.sendingMsgs[tempId];
            }else if(r.sendChatMessage == 0){
                $(`.ChatWindowMsgCard[msgId="${tempId}"]`).find('.chatMsgSending').text('').append(
                    $('<span/>',{class:'cR fs101 mie-3',text:texts.cpanel.liveChat.msgSendFail}),
                );
                $(`.ChatWindowMsgCard[msgId="${tempId}"]`).find('.chatWindowMsgInfoIconsContainer').prepend(
                    $('<span/>',{class:`ico-refresh pointer chatResendMsg mY2 fs08`,tooltip:texts.cpanel.liveChat.msgResend}),
                )
            }
        }
    }).fail(function(r){
        $(`.ChatWindowMsgCard[msgId="${tempId}"]`).find('.chatMsgSending').text('').append(
            $('<span/>',{class:'cR fs101 mie-3',text:texts.cpanel.liveChat.msgSendFail}),
        );
        $(`.ChatWindowMsgCard[msgId="${tempId}"]`).find('.chatWindowMsgInfoIconsContainer').prepend(
            $('<span/>',{class:`ico-refresh pointer chatResendMsg mY2 fs08`,tooltip:texts.cpanel.liveChat.msgResend}),
        )
    })
}
// drawTempChatMsg = function(type,id,msgTxt){
    
// }
