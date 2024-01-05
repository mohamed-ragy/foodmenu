getChatMsgs = function(type,id){
    if(typeof(window.chatMsgs[`${type}-${id}`]) === 'undefined'){
        $(`#chatWindow-${type}-${id}`).find('.liveChatLoading').addClass('vV');
        window.chatMsgs[`${type}-${id}`] = [];
        $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').attr('getMoreMsgs','0')
        $.ajax({
            url:'liveChat',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getChatMsgs:true,
                id:id,
                type:type,
            },success:function(r){
                $(`#chatWindow-${type}-${id}`).find('.liveChatLoading').removeClass('vV');
                for(const key in r.chatMsgs){
                    window.chatMsgs[`${type}-${id}`].push(r.chatMsgs[key])
                }
                window.chatMsgs[`${type}-${id}`].sort((a,b)=>{
                    return b.sent_at - a.sent_at;
                })
                drawChatMsgs(type,id,window.chatMsgs[`${type}-${id}`])
                $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').attr('getMoreMsgs','1')
            }
        }).fail(function(){
            $(`#chatWindow-${type}-${id}`).remove();
        })
    }else{
        window.chatMsgs[`${type}-${id}`].sort((a,b)=>{
            return b.sent_at - a.sent_at;
        })
        for(const key in window.chatMsgs[`${type}-${id}`]){
            drawChatMsg(type,id,window.chatMsgs[`${type}-${id}`][key],'append')
        }
    }
}
getMoreChatMsgs = function(type,id){
    $(`#chatWindow-${type}-${id}`).find('.liveChatLoading').addClass('vV');
    $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').attr('getMoreMsgs','0')
    lastMsgDate = window.chatMsgs[`${type}-${id}`][window.chatMsgs[`${type}-${id}`].length - 1].sent_at;
    lastMsgId = window.chatMsgs[`${type}-${id}`][window.chatMsgs[`${type}-${id}`].length - 1]._id;
    $.ajax({
        url:'liveChat',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getMoreChatMsgs:true,
            id:id,
            type:type,
            lastMsgDate:lastMsgDate,
            lastMsgId:lastMsgId,
        },success:function(r){
            $(`#chatWindow-${type}-${id}`).find('.liveChatLoading').removeClass('vV');
            for(const key in r.chatMsgs){
                window.chatMsgs[`${type}-${id}`].push(r.chatMsgs[key]);

            }
            window.chatMsgs[`${type}-${id}`].sort((a,b)=>{
                return b.sent_at - a.sent_at;
            })
            if(r.chatMsgs.length == 0){
                $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').attr('noMoreMsgs','1')
            }else{
                drawChatMsgs(type,id,r.chatMsgs)
            }
            $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').attr('getMoreMsgs','1')
        }
    })

}


drawChatMsgs = function(type,id,msgs){
    for(const key in msgs){
        drawChatMsg(type,id,msgs[key],'append')
    }
}
drawDeletedMsg = function(){
    return `<div class="row alnC jstfyC m5"><span class="ico-warning mie-5 fs09"></span><span>${texts.cpanel.liveChat.deletedmsg}</span></div>`;
}
drawChatMsg = function(type,id,msg,append,msgClass=''){
    msg.message = msg.message.replace(
        /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
        '<a href="$1" target="_blank">$1</a>'
    )
    if(msg.is_deleted){
        msg.message = drawDeletedMsg();
    }
    if(msg.message.includes('o@')){
        msg.message = drawChatOrderMsg(msg.message)
    }else if(msg.message.includes('p@')){
        msg.message = drawChatProductMsg(msg.message)
    }else{
        msg.message = `<div class="m5">${msg.message}</div>`
    }

    if(msg.author == 0){
        if(append == 'append'){
            $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').append(
                drawChatMsg_account(msg,type,id)
            )
        }else if (append == 'prepend'){
            $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').prepend(
                drawChatMsg_account(msg,type,id,msgClass)
            )
        }
    }else if(msg.author == 1){
        if(append == 'append'){
            $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').append(
                drawChatMsg_user(msg,type,id)
            )
        }else if (append == 'prepend'){
            $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').prepend(
                drawChatMsg_user(msg,type,id)
            )
        }
    }
    setChatWindowLastMsgSeenStatus(type,id)
    setChatWindowBodyDates(type,id,msg,append);
}
drawChatMsg_account = function(msg,type,id,msgClass=''){

    let msgIcon = ''; let deleteMsgClass; let infoIcon;let deleteIcon;
    msg.sent_at == null ? msgIcon = $('<div/>',{class:`chatMsgSending c_white-8 fs07`,text:texts.cpanel.liveChat.msgSending}) :null;
    msg.sent_at == null ? deleteMsgClass = 'chatWindowDeleteTempMsg' : deleteMsgClass = 'chatWindowDeleteMsg' ;
    msg.sent_at == null ? infoIcon = '': infoIcon = $('<span/>',{class:'ico-info chatWindowMsgInfo mY2 fs08',tooltip:chatMsgTooltip(msg)});
    msg.is_deleted ? deleteIcon = '' : deleteIcon = $('<span/>',{class:`ico-delete pointer ${deleteMsgClass} mY2 fs08`,tooltip:texts.cpanel.liveChat.deleteMsg}) ;
    return $('<div/>',{class:`ChatWindowMsgCard ${msgClass}`,msgId:msg._id}).append(
        $('<div/>',{class:'chatWindowMsgContainer_account'}).append(
            $('<div/>',{class:'chatWindowMsgInfoIconsContainer'}).append(
                infoIcon,
                deleteIcon,
            ),
            $('<div/>',{
                class:`chatWindowMsg_account ${msg.is_deleted ? 'chatMsgContaienr_deletedChatMsg' : ''}`,
            }).append(
                $('<div/>',{
                    class:'chatWindowMsgText_account',
                    html:msg.message,
                }),
                $('<div/>',{
                    class:'chatWindowMsgInfo_account',
                }).append(
                    $('<div/>',{text:getDate(msg.sent_at).time.local,class:'fs07 mX3'}),
                    $('<div/>',{class:'fs07 '}).append(
                        $('<span/>',{text:texts.cpanel.liveChat.by,class:'mie-3'}),
                        $('<a/>',{text:website.accounts.find(item=>item.id == msg.account_id).name,class:'popupPage popupId',popupPage:'sub_account',popupId:'sub_account',subaccount:msg.account_id})
                    ),
                    msgIcon
                )
            ),
        )
    )
}
drawChatMsg_user = function(msg,type,id){
    return $('<div/>',{class:'ChatWindowMsgCard',msgId:msg._id}).append(
        $('<div/>',{class:'chatWindowMsgContainer_user'}).append(
            $('<div/>',{class:`chatWindowMsg_user ${msg.is_deleted ? 'chatMsgContaienr_deletedChatMsg' : ''}`}).append(
                $('<div/>',{class:'chatWindowMsgText_user',html:msg.message}),
                $('<div/>',{class:'chatWindowMsgInfo_user'}).append($('<div/>',{class:'fs07',text:getDate(msg.sent_at).time.local}))
            ),
            $('<div/>',{class:'chatWindowMsgInfoIconsContainer'}).append(
                $('<span/>',{class:'ico-info chatWindowMsgInfo fs08',tooltip:chatMsgTooltip(msg)})
            )

        )
    )
}
chatMsgTooltip = function(msg){
    let msgTooltip = $('<div/>',{class:''}).append(
        $('<div/>',{text:`${texts.cpanel.liveChat.sentOn} ${getDate(msg.sent_at).date_time.local}`})
    )
    if(msg.is_seen == true){
        msgTooltip.append(
            $('<div/>',{text:`${texts.cpanel.liveChat.seenOn} ${getDate(msg.seen_at).date_time.local}`})
        )
    }
    if(msg.is_deleted == true){
        msgTooltip.append(
            $('<div/>',{text:`${texts.cpanel.liveChat.deletedOn} ${getDate(msg.deleted_at).date_time.local}`}),
        )
        if(msg.author == 0){
            msgTooltip.append(
                $('<div/>',{class:''}).append(
                    $('<span/>',{text:texts.cpanel.liveChat.deletedBy,class:'mie-3'}),
                    $('<span/>',{text:website.accounts.find(item=>item.id == msg.account_id).name})
                ),
            )
        }
    }
    return msgTooltip.html();
}
setChatWindowLastMsgSeenStatus = function(type,id){
    if(typeof(window.chatMsgs[`${type}-${id}`]) === 'undefined'){return;}
    $(`#chatWindow-${type}-${id}`).find('.chatWindowSeenIcon').addClass('none')
    $(`#chatWindow-${type}-${id}`).find('.chatWindowSentIcon').addClass('none')

    const reversedKeys = Object.keys(window.chatMsgs[`${type}-${id}`]).reverse();
    reversedKeys.forEach(key => {
        let msg = window.chatMsgs[`${type}-${id}`][key];
        if(msg.author == 0 && msg.is_seen == true || msg.author == 1){
            $(`.ChatWindowMsgCard[msgId="${msg._id}"]`).before(
                $(`#chatWindow-${type}-${id}`).find('.chatWindowSeenIcon').removeClass('none')
            )
        }
        if(msg.author == 0 && msg.is_seen == false && msg.sent_at != null){
            $(`.ChatWindowMsgCard[msgId="${msg._id}"]`).before(
                $(`#chatWindow-${type}-${id}`).find('.chatWindowSentIcon').removeClass('none')
            )
        }
    });
}

setChatWindowBodyDates =function(type,id,msg,append){
    let msgDate;
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if(msg.sent_at == null){
        msgDate = texts.cpanel.liveChat.msgToday;
    }else{
        msgDate = getDate(msg.sent_at).date.local;
    }
    if(
        new Date(msg.sent_at * 1000).getDate() == new Date().getDate() &&
        new Date(msg.sent_at * 1000).getMonth() == new Date().getMonth() &&
        new Date(msg.sent_at * 1000).getFullYear() == new Date().getFullYear()
    ){msgDate = texts.cpanel.liveChat.msgToday}else if(
        new Date(msg.sent_at * 1000).getDate() == yesterday.getDate() &&
        new Date(msg.sent_at * 1000).getMonth() == yesterday.getMonth() &&
        new Date(msg.sent_at * 1000).getFullYear() == yesterday.getFullYear()
    ){msgDate = texts.cpanel.liveChat.msgYesterday}
    if(append == 'append'){
    $(`#chatWindow-${type}-${id}`).find(`.chatWindowDateContainer[date="${msgDate}"]`).remove()
        $(`#chatWindow-${type}-${id}`).find('.chatwindowBody').append(
            $('<div/>',{class:'chatWindowDateContainer',date:msgDate}).append(
                $('<div/>',{
                    text:msgDate,
                    class:'chatWindowDate',
                })
            )
        )
    }else if(append == 'prepend'){
        if( $(`#chatWindow-${type}-${id}`).find(`.chatWindowDateContainer[date="${msgDate}"]`).length == 0){
            $(`#chatWindow-${type}-${id}`).find(`.ChatWindowMsgCard[msgId="${msg._id}"]`).after(
                $('<div/>',{class:'chatWindowDateContainer',date:msgDate}).append(
                    $('<div/>',{
                        text:msgDate,
                        class:'chatWindowDate',
                    })
                )
            )
        }
    }
}



drawChatOrderMsg =function(txt){
    let orderNumber = txt.replace('o@','');
    let elem =  $('<div/>',{userId:this.userId,class:`chatOrderContainer chatOrderContainer-${orderNumber}`}).append(
        $('<div/>',{class:'chatOrderBody'}).append(
            $('<div/>',{class:'cardLoading br10 h10 w50 mX5 mY3'}),
            $('<div/>',{class:'cardLoading br10 h10 w150 mX5 mY3'}),
            $('<div/>',{class:'cardLoading br10 h10 w50 mX5 mY3'}),
            $('<div/>',{class:'cardLoading br10 h10 w100 mX5 mY3'}),
        )
    )
    getOrder(orderNumber).then(function(order){
        order_data = orderRow_data(order);
        $(`.chatOrderContainer-${orderNumber}`).text('').append(
            $('<a/>',{order:order._id,popupPage:'order',class:'popupPage bold500 mB2 fs101',text:`${texts.orders.order} #${order.id}`}),
            $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.orderPlaced}: `}),
                $('<div/>',{class:'fs09 diffTimeCalc',time:order.placed_at,})
            ),
            $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.type}: `}),
                $('<div/>',{class:'fs09',text:order_data.typeTxt})
            ),
            $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.status}: `}),
                $('<div/>',{class:`${order_data.statusColor} fs09`,text:texts.orders[order_data.status]})
            ),
            $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.customer}: `}),
                $('<div/>',{class:'fs09',html:order_data.user})
            ),
            $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.price}: `}),
                $('<div/>',{class:'fs09',text:`${website.currency}${parseFloat(order.total).toFixed(2)}`})
            ),
        )
    })
    return elem;

}


drawChatProductMsg = function(txt){
    let productName = txt.replace('p@','');
    let img = '/storage/imgs/noimg.png';
    for(const key in website.products){
        if(website.products[key].name == productName){
            img = website.products[key].thumbnail;
        }
    }
     return`<div class="chatProductContainer">
        <img class="chatProductImg popupPage" popupPage="Product" product="`+productName+`" src="`+img+`" alt="" />
        <a class="chatProductTxt popupPage popupId" popupId="product" popupPage="product" product="`+productName+`">`+productName+`</a>
    </div>`
}
