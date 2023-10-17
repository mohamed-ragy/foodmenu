drawLoadingChatBoxes = function(){
    $('#chatBoxesContainer_loading').text('')
    for(i=0;i<=10;i++){
        $('#chatBoxesContainer_loading').append(
            $('<div/>',{class:'liveChatBox_loading'}).append(
                $('<div/>',{class:'row alnC jstfyS w100p m5'}).append(
                    $('<div/>',{class:'cardLoading h10 w10 br50p'}),
                    $('<div/>',{class:'cardLoading h5 w100 mX5 br10'}),
                ),
                $('<div/>',{class:'cardLoading h5 w250 mX20 mY10 br10'}),
            )
        )
    }

}
drawUsersChatBoxes = function(){
    $('#chatBoxesContainer').text('')
    $('#chatBoxesContainer_loading').text('')
    $('.usersGuestsChat').removeClass('usersGuestsChat_selected')
    $('#showUsersChatBoxes').addClass('usersGuestsChat_selected')
    if(window.chatBoxes.users.length == 0){
        $('#chatBoxesContainer').append(
            $('<div/>',{class:'fs08 m10',text:texts.cpanel.liveChat.noLiveChatMsgs})
        );
        return;
    }
    window.chatBoxes.users.sort(function(a,b){
        return b.lastMsg_at - a.lastMsg_at;
    })
    for(const key in window.chatBoxes.users){
        drawChatBox('user',window.chatBoxes.users[key])
    }
}
drawGuestsChatBoxes = function(){
    $('#chatBoxesContainer').text('')
    $('#chatBoxesContainer_loading').text('')
    $('.usersGuestsChat').removeClass('usersGuestsChat_selected')
    $('#showGuestsChatBoxes').addClass('usersGuestsChat_selected')
    if(window.chatBoxes.guests.length == 0){
        $('#chatBoxesContainer').append(
            $('<div/>',{class:'fs08 m10',text:texts.cpanel.liveChat.noLiveChatMsgs})
        );
        return;
    }
    window.chatBoxes.guests.sort(function(a,b){
        return b.lastMsg_at - a.lastMsg_at;
    })
    for(const key in window.chatBoxes.guests){
        drawChatBox('guest',window.chatBoxes.guests[key])
    }
}
drawChatBox = function(type,chatBox){
    let user;//this var can be user or guest (its name dosen't mean it's value should be a user)
    let msgIcon ='';
    let liveChatBoxUnseenClass = 'none';
    if(type == 'user'){
        user = website.users.find(item=>item.id == chatBox.user_id);
    }else if(type == 'guest'){
        user = website.guests.find(item=>item.id == chatBox.guest_id);
    }
    if(user.last_msg.author == 0){
        user.last_msg.is_seen ?  msgIcon = $('<div/>',{class:`ico-msg_seen fs07 mie-2`,tooltip:`<div><span class="mie-3">${texts.cpanel.liveChat.seenOn}</span><span>${getDate(user.last_msg.seen_at).date_time.local}</span></div>`}) : msgIcon = $('<div/>',{class:`ico-msg_sent fs07 mie-2`,tooltip:`<div><span class="mie-3">${texts.cpanel.liveChat.sentOn}</span><span>${getDate(user.last_msg.sent_at).date_time.local}</span></div>`});
    }
    if(user.last_msg.author == 1){
        user.last_msg.is_seen ? liveChatBoxUnseenClass = 'none' : liveChatBoxUnseenClass = '';
    }
    if(user.last_msg.message.includes('o@')){
        user.last_msg.message = texts.cpanel.liveChat.chatBoxOrder.replace(':order:',user.last_msg.message.split('@')[1])
    }else if(user.last_msg.message.includes('p@')){
        user.last_msg.message = user.last_msg.message.split('@')[1]
    }
    if(user.last_msg.is_deleted == true){
        user.last_msg.message = texts.cpanel.liveChat.deletedmsg
    }
    $('#chatBoxesContainer').append(
        $('<div/>',{class:'liveChatBoxContainer openChatWindow',type:type,user:user.id}).append(
            $('<div/>',{type:type,user:user.id,class:'liveChatBoxSeeMore ico-seeMore'}),
            $('<div/>',{class:'liveChatBoxBody'}).append(
                $('<div/>',{class:'row alnC jstfyS w100p'}).append(
                    $('<div/>',{class:`visitorOnlineIcon-${type}-${user.id}`}),
                    $('<div/>',{class:'fs09 bold500',text:user.name})
                ),
                $('<div/>',{class:'liveChatBoxLastMsgContainer'}).append(
                    msgIcon,
                    $('<div/>',{class:'liveChatBoxMsg',html:user.last_msg.message})
                ),
                $('<div/>',{class:'fs07 alnsE c_white-8 diffTimeCalc',time:user.last_msg.sent_at})
            ),
            $('<div/>',{class:`liveChatBoxUnseen chatUnseen-${type}-${user.id} ${liveChatBoxUnseenClass}`})
        )
    )
    setUserOnlineStatus(user.id,type)
}
/////events
$('#showUsersChatBoxes').on('click',function(e){
    e.stopImmediatePropagation();
    if(window.getFirstChatsCheck == false){return;}
    drawUsersChatBoxes();
})
$('#showGuestsChatBoxes').on('click',function(e){
    e.stopImmediatePropagation();
    if(window.getFirstChatsCheck == false){return;}
    drawGuestsChatBoxes();
})
//
$('html,body').on('click','.liveChatBoxSeeMore',function(e){
    e.stopImmediatePropagation();
    let user;let type = $(this).attr('type');
    if(type == 'user'){
        user = website.users.find(item=>item.id == $(this).attr('user'));
        $('#liveChatBoxMenu').removeClass('none').text('').append(
            $('<div/>',{
                class:'cpPage liveChatBoxMenuItem',
                user:user.id,
                cpPage:'manage_users',
            }).append(
                $('<div/>',{class:'ico-settings liveChatBoxMenuItemIcon'}),
                $('<div/>',{text:texts.users.manageUserProfile.replace(':name:',user.name)})
            ),
            $('<div/>',{
                class:'cpPage liveChatBoxMenuItem',
                cpPage:'product_reviews',
                user:user.id,
            }).append(
                $('<div/>',{class:'ico-product_reviews liveChatBoxMenuItemIcon'}),
                $('<div/>',{text:texts.users.seeReviewPosted.replace(':name:',user.name)})
            ),
            $('<div/>',{
                class:'cpPage liveChatBoxMenuItem',
                cpPage:'order_history',
                user:user.id,
            }).append(
                $('<div/>',{class:'ico-orders liveChatBoxMenuItemIcon'}),
                $('<div/>',{text:texts.users.seePlacedOrders.replace(':name:',user.name)})
            ),
            $('<div/>',{
                class:'deletAllChats liveChatBoxMenuItem',
                user:user.id,
                type:'user',
            }).append(
                $('<div/>',{class:'ico-delete liveChatBoxMenuItemIcon'}),
                $('<div/>',{text:texts.cpanel.liveChat.deleteAllChats.replace(':name:',user.name)})
            )
        ).css({
            'top':$(this).offset().top,
            'left':($(this).offset().left + $(this).width() - $('#liveChatBoxMenu').width()),
        })
    }else if(type == 'guest'){
        user = website.guests.find(item=>item.id == $(this).attr('user'));
        $('#liveChatBoxMenu').removeClass('none').text('').append(
            $('<div/>',{
                class:'deletAllChats liveChatBoxMenuItem',
                user:user.id,
                type:'guest',
            }).append(
                $('<div/>',{class:'ico-delete liveChatBoxMenuItemIcon'}),
                $('<div/>',{text:texts.cpanel.liveChat.deleteAllChats.replace(':name:',user.name)})
            )
        ).css({
            'top':$(this).offset().top,
            'left':($(this).offset().left + $(this).width() - $('#liveChatBoxMenu').width()),
        })
    }

})
$('html,body').on('mouseleave','#liveChatBoxMenu',function(e){
    e.stopImmediatePropagation();
    if(!$('#liveChatBoxMenu').is(':hover')){
        $('#liveChatBoxMenu').addClass('none')
    }
});
$('html,body').on('click','.liveChatBoxMenuItem',function(e){
    $('#liveChatBoxMenu').addClass('none')

});
$('body').on('click','.deletAllChats',function(e){
    e.stopImmediatePropagation();
    let type = $(this).attr('type');
    let user;
    type == 'user' ? user = website.users.find(item=>item.id == $(this).attr('user')) :
    type == 'guest' ? user = website.guests.find(item=>item.id == $(this).attr('user')) : null;
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.cpanel.liveChat.deleteAllChatsConfirmMsg.replace(':name:',user.name)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteAllChats-confirmBtn',user:user.id,type:type,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#deleteAllChats-confirmBtn',function(){
    let userId = $(this).attr('user');
    let type = $(this).attr('type');
    showBtnLoading($('#deleteAllChats-confirmBtn'));
    $.ajax({
        url:'liveChat',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr("content"),
            deleteChatMsgs:userId,
            userType:type,
        },success:function(response){
            hideBtnLoading($('#deleteAllChats-confirmBtn'))
            if(response.deleteChatMsgs == 1){
                if(type == 'user'){
                    website.users.find(item=>item.id == userId).last_msg = null;
                    website.users.find(item=>item.id == userId).lastMsg_id = null;
                    for(const key in window.chatBoxes.users){
                        if(window.chatBoxes.users[key].user_id == userId){
                            window.chatBoxes.users.splice(key,1)
                        }
                    }
                    for(const key in window.unSeenChats_users){
                        if(window.unSeenChats_users[key] == userId){
                            window.unSeenChats_users.splice(key,1)
                        }
                    }
                    if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                        drawUsersChatBoxes();
                    }
                }else if(type == 'guest'){
                    website.guests.find(item=>item.id == userId).last_msg = null;
                    website.guests.find(item=>item.id == userId).lastMsg_id = null;
                    for(const key in window.chatBoxes.guests){
                        if(window.chatBoxes.guests[key].guest_id == userId){
                            window.chatBoxes.guests.splice(key,1)
                        }
                    }
                    for(const key in window.unSeenChats_guests){
                        if(window.unSeenChats_guests[key] == userId){
                            window.unSeenChats_guests.splice(key,1)
                        }
                    }
                    if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
                        drawGuestsChatBoxes();
                    }
                }
                delete window.chatMsgs[`${type}-${userId}`]
                $(`#chatWindow-${type}-${userId}`).remove();
                $(`.chatUnseen-${type}-${userId}`).addClass('none');
                cpanelTitle(false)
                closePopup();
                showAlert('success',response.msg,4000,true);
            }else if(response.deleteChatMsgs == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
//


$('#liveChatMsgsList').on('scroll',function(e){
    e.stopImmediatePropagation();
    if(!window.getFirstChatsCheck){return;}
    let type = $('#showUsersChatBoxes').hasClass('usersGuestsChat_selected') ? type = 'user' : $('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected') ? type = 'guest' : null;
    if(type == 'user' && window.noMoreChats_users){return;}
    if(type == 'user' && !window.getMoreChats_users){return;}
    if(type == 'guest' && window.noMoreChats_guests){return;}
    if(type == 'guest' && !window.getMoreChats_guests){return;}
    let lastMsgDate;
    if($('#liveChatMsgsList')[0].scrollHeight - $('#liveChatMsgsList').scrollTop() < $('#liveChatMsgsList').innerHeight() + 50){
        drawLoadingChatBoxes();
        if(type == 'user'){
            window.getMoreChats_users = false;
            lastMsgDate = window.chatBoxes.users[window.chatBoxes.users.length - 1];
        }else if(type == 'guest'){
            window.getMoreChats_guests = false
            lastMsgDate = window.chatBoxes.guests[window.chatBoxes.guests.length - 1];
        }
        $.ajax({
            url:'liveChat',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getMoreChat:type,
                lastMsgDate:lastMsgDate.lastMsg_at,
            },success:function(r){
                $('#chatBoxesContainer_loading').text('')
                r.liveChats_users.length == 0 ? window.noMoreChats_users = true : null;
                r.liveChats_guests.length == 0 ? window.noMoreChats_guests = true : null;
                for(const key in r.liveChats_users){
                    if(typeof(website.users.find(item=>item.id == r.liveChats_users[key].id)) === 'undefined'){
                        website.users.push(r.liveChats_users[key]);
                    }
                    r.liveChats_users.sort(function(a,b){
                        return b.last_msg.sent_at - a.last_msg.sent_at;
                    })
                    window.chatBoxes.users.push({
                        user_id:parseInt(r.liveChats_users[key].id),
                        lastMsg_at:r.liveChats_users[key].last_msg.sent_at,
                    });
                    drawChatBox(type,{
                        user_id:parseInt(r.liveChats_users[key].id),
                        lastMsg_at:r.liveChats_users[key].last_msg.sent_at,
                    })
                }

                type == 'user' ? window.getMoreChats_users = true : type == 'guest' ? window.getMoreChats_guests = true : null;


            }
        })
    }
});
