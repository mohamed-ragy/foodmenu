$('html,body').on('click','.openChatWindow',function(e){
    e.stopImmediatePropagation();
    openChatWindow($(this).attr('user'),$(this).attr('type'));
})
openChatWindow = function(id,type){
    if(type == 'guest' && website.guestLiveChat == false){
        showAlert('error',texts.cpanel.liveChat.guestLiveChatDiabled,4000,true)
        return;
    }
    drawLoadingChatWindow(id,type);
}
drawLoadingChatWindow = function(id,type){
    if($(`#chatWindow-${type}-${id}`).length > 0){$(`#chatWindow-${type}-${id}`).removeClass('none');return;}
    let guestHideClass ='';
    type == 'guest' ? guestHideClass = 'none' : guestHideClass = '';
    $('body').append(
        $('<div/>',{class:'chatWindow',id:`chatWindow-${type}-${id}`,onMove:'false',type:type,user:id}).append(
            $('<div/>',{class:'chatWindowHead'}).append(
                $('<div/>',{class:`chatIconUnseen chatUnseen-${type}-${id}`}),
                $('<div/>',{class:'column alnS jstfyS'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-30'}).append(
                        $('<div/>',{class:`chatWindowUsersOnlineIcon visitorOnlineIcon-${type}-${id}`}),
                        $('<div/>',{class:'chatWindowUserName'})
                    ),
                    $('<div/>',{class:`chatWindowUserActions visitorActions-${type}-${id}`}) 
                ),
                $('<div/>',{class:'chatWindowHeadIconsContainer'}).append(
                    $('<span/>',{class:'minMaxChatWindow fs08 pointer mX5 ico-minimize',tooltip:texts.cpanel.public.minimize}),
                    $('<span/>',{class:'closeChatWindowIcon fs08 pointer mX5 ico-close',tooltip:texts.cpanel.public.close})
                )
            ),
            $('<div/>',{class:'chatwindowBody',getMoreMsgs:'1',noMoreMsgs:'0'}).append(
                $('<div/>',{class:'chatWindowStatusIcon none chatWindowSeenIcon ico-msg_seen',tooltip:texts.cpanel.liveChat.msgSeen}),
                $('<div/>',{class:'chatWindowStatusIcon none chatWindowSentIcon ico-msg_sent',tooltip:texts.cpanel.liveChat.msgSent}),
                // $('<div/>',{class:'chatWindowStatusIcon none chatWindowSendingIcon ico-msg_sending',tooltip:texts.cpanel.liveChat.msgSending}),
            ),
            $('<div/>',{class:'chatWindowFooter'}).append(
                $('<div/>',{class:`${guestHideClass} authority_0 chatWindowUserIcon ico-orders cpPage`,cpPage:'order_history',user:id}),
                $('<div/>',{class:`${guestHideClass} authority_1 chatWindowUserIcon ico-product_reviews cpPage`,cpPage:'product_reviews',user:id}),
                $('<div/>',{class:`${guestHideClass} authority_2 chatWindowUserIcon ico-settings cpPage`,cpPage:'manage_users',user:id}),
                $('<div/>',{class:`chatWindowUserIcon chatShareProduct ico-products`,user:id,tooltip:texts.cpanel.liveChat.shareProduct}),
                $('<input/>',{type:'text',class:'chatWindowInputMsg',readOnly:true,placeholder:texts.cpanel.liveChat.typeChatMsg,maxlength:200}),
                $('<div/>',{class:'chatWindowUserIcon chatWindowSendBtn ico-send',tooltip:texts.cpanel.liveChat.msgSend})
            ),
            $('<div/>',{class:'chatWindowFixedDate'}),
            $('<div/>',{class:'chatWindowScrollToBottom'}).append(
                $('<span/>',{class:'ico-down chatWindowScrollToBottomArrow'}),
                $('<span/>',{class:'none mX5 chatWindowScrollToBottomTxt',text:texts.cpanel.liveChat.newMsg})
            ),
            $('<div/>',{class:'chatWindowTyping',}).append(
                $('<div/>',{class:'chatWindowTypingDot',style:'animation-delay: .2s;'}),
                $('<div/>',{class:'chatWindowTypingDot',style:'animation-delay: .3s;'}),
                $('<div/>',{class:'chatWindowTypingDot',style:'animation-delay: .4s;'}),
            ),
            $('<div/>',{class:'chatWindowShareProductContainer'}),
            $('<div/>',{class:'loading liveChatLoading'})
        ),
    )
    $(`#chatWindow-${type}-${id}`).css({
        top:'unset',
        left:'unset',
        right:(($('.chatWindow').length) * 10)+'px',
        bottom:(($('.chatWindow').length) * 20 )+'px',
    })
    authorities();
    if(type == 'user'){
        getUsersData([id]).then(function(){
            let user = website.users.find(item=>item.id == id);
            setChatWindow(id,type)
        })
    }else if(type == 'guest'){
        getGuestsData([id]).then(function(){
            let guest = website.guests.find(item=>item.id == id);
            setChatWindow(id,type)
        })
    }
}
setChatWindow = function(id,type){
    let user;
    type == 'user' ? user = website.users.find(item=>item.id == id) :
    type == 'guest' ? user = website.guests.find(item=>item.id == id) : null;
    $(`#chatWindow-${type}-${id}`).find('.chatWindowUserName').text(user.name).attr('tooltip',user.name)
    $(`#chatWindow-${type}-${id}`).find('.chatWindowFooter').find('.ico-orders').attr('tooltip',texts.users.seePlacedOrders.replace(':name:',user.name))
    $(`#chatWindow-${type}-${id}`).find('.chatWindowFooter').find('.ico-product_reviews').attr('tooltip',texts.users.seeReviewPosted.replace(':name:',user.name))
    $(`#chatWindow-${type}-${id}`).find('.chatWindowFooter').find('.ico-settings').attr('tooltip',texts.users.manageUserProfile.replace(':name:',user.name))

    $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').on('scroll',function(e){
        // e.stopImmediatePropagation();
        if((($(this).scrollTop() - $(this)[0].offsetHeight )* - 1 ) > ($(this)[0].scrollHeight - 100) && $(this).attr('getMoreMsgs') == '1' && $(this).attr('noMoreMsgs') == '0'){
            getMoreChatMsgs(type,id);
        }
        if($(this).scrollTop() == 0 || $(this).scrollTop() == 1){
            $(this).scrollTop(0);
            if(checkForUnseenMsgs(type,id)){
                setChatAsSeen(type,id)
            }
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').removeClass('chatWindowScrollToBottom_newMsg');
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomArrow').removeClass('chatWindowScrollToBottomArrow_newMsg');
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottomTxt').addClass('none');
            $(`#chatWindow-${type}-${id}`).find('.chatWindowFixedDate').removeClass('chatWindowFixedDate_show')
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').removeClass('chatWindowScrollToBottom_show')

        }else if((($(this).scrollTop() - $(this)[0].offsetHeight ) * - 1 ) + 20 > ($(this)[0].scrollHeight ) ){
            $(`#chatWindow-${type}-${id}`).find('.chatWindowFixedDate').removeClass('chatWindowFixedDate_show')
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').addClass('chatWindowScrollToBottom_show')
        }else{
            $(`#chatWindow-${type}-${id}`).find('.chatWindowFixedDate').addClass('chatWindowFixedDate_show')
            $(`#chatWindow-${type}-${id}`).find('.chatWindowScrollToBottom').addClass('chatWindowScrollToBottom_show')
        }

        $(this).children().each(function(){
            if($(this).hasClass('ChatWindowMsgCard') && $(this).position().top > 0 && $(this).position().top < $(this).outerHeight()){
                let thisMsg = window.chatMsgs[`${type}-${id}`].find(item=>item._id == $(this).attr('msgId'))
                $(`#chatWindow-${type}-${id}`).find('.chatWindowFixedDate').text(getDate(thisMsg.sent_at).date.local)
            }

        });

    })
    $(`#chatWindow-${type}-${id}`).find('.chatWindowInputMsg').prop('readOnly',false).focus()
    getChatMsgs(type,id);
    setUnseenChat(type,id)
    setUserOnlineStatus(id,type)
}
