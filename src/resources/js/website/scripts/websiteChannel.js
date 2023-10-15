let listenToUserChannelName = `guest.${user.id}`
loginCheck ? listenToUserChannelName = `user.${user.id}` : null;
let listenForTypingTimeout;
window.websiteChannel.listen('websiteChannel',function(r){
    // console.log(r.notification)
    let n = r.notification.notification;
    console.log(n)
    switch(r.notification.code){
        case 'liveChat.msg_deleted_by_account':
            let msgId = n.msgId;
            for(const key in chatmsgs){
                if(msgId == chatmsgs[key]._id){

                    chatmsgs[key].message = 'Deleted Message';
                    chatmsgs[key].is_deleted = true;
                    chatmsgs[key].deleted_at = n.now;
                    let getMsgInfo = getChatMsgInfo(chatmsgs[key]);
                    if(chatmsgs[key].author == 0){
                        $('.liveChatAccountMsgContainer[msgId="'+msgId+'"').text('')
                        $('.liveChatAccountMsgContainer[msgId="'+msgId+'"').append(
                            $('<div/>',{
                                class:'liveChatDeletedMsg',
                            }).append(
                                $('<span/>',{
                                    class:'ic-warning mX-5',
                                }),
                                $('<span/>',{text:texts.liveChat.deletedmsg,class:'fs-09'})
                            ),
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                                    msgId:msgId,
                                    tooltip:getMsgInfo.msgInfo,

                                }),
                            ),
                        )
                    }else if(chatmsgs[key].author == 1){
                        $('.liveChatUserMsgContainer[msgId="'+msgId+'"').text('')
                        $('.liveChatUserMsgContainer[msgId="'+msgId+'"').append(
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                                    msgId:msgId,
                                    tooltip:getMsgInfo.msgInfo,

                                }),
                            ),
                            $('<div/>',{
                                class:'liveChatDeletedMsg',
                            }).append(
                                $('<span/>',{
                                    class:'ic-warning mX-5',
                                }),
                                $('<span/>',{text:texts.liveChat.deletedmsg,class:'fs-09'})
                            )
                        );

                    }
                }
            }
        break;
        case 'liveChat.new_msg_by_account':
            $('#newChatMsgSound').prop('muted',false);
            $('#newChatMsgSound')[0].play();
            drawChatMsg(n.msg,'prepend');
            $('.liveChatTyping').removeClass('liveChatTyping_show')
            chatmsgs.push(n.msg);
            if($('.liveChatContainer').hasClass('none')){
                $('.liveChatIconNumber').addClass('chatIconNewMsg')
            }
        break;
        case 'liveChat.msg_by_account':
            clearTimeout(listenForTypingTimeout)
            $('.liveChatTyping').removeClass('liveChatTyping_show');
        break;
        case 'liveChat.typing':
            clearTimeout(listenForTypingTimeout)
            listenForTypingTimeout = setTimeout(function(){
                $('.liveChatTyping').removeClass('liveChatTyping_show')
            },3000)
            $('.liveChatTyping').addClass('liveChatTyping_show')
        break;
        case 'liveChat.seen_by_account':
            $('.liveChatUserMsgContainer').each(function(){
                let thisliveChatUserMsgContainer = $(this);
                for(const key in chatmsgs){
                    if(chatmsgs[key].is_seen == false && chatmsgs[key].author == 1 && chatmsgs[key]._id == thisliveChatUserMsgContainer.attr('msgId')){
                        chatmsgs[key].seen_at = parseInt(parseInt(new Date().getTime()) / 1000);
                        chatmsgs[key].is_seen = true;
                        let getMsgInfo = getChatMsgInfo(chatmsgs[key]);
                        thisliveChatUserMsgContainer.find('.liveChatMsgInfoUser').attr('tooltip',getMsgInfo.msgInfo)
                        thisliveChatUserMsgContainer.find('.liveChatUserMsgInfo').children().eq(0).text(getMsgInfo.sentAt)
                        thisliveChatUserMsgContainer.find('.liveChatUserMsgInfo').children().eq(1).removeClass().addClass(getMsgInfo.msgIconClass)
                    }
                }
            })
        break;
        case 'liveChat.deleteAll':
            $('.liveChatUserMsgContainer').remove();
            $('.liveChatAccountMsgContainer').remove();
            $('.liveChatDateContainer').remove();
            chatmsgs = [];
        break;
        case 'user.logout':
            $('.logout').trigger('click');
        break;
        case 'user.reload':
            window.location.reload();
        break;
    }
})
