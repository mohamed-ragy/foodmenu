
require('./chatWindow/openChatWindow.js')//done//
require('./chatWindow/setSeen.js')//done//
require("./chatWindow/chatMsg.js");//done//
require("./chatWindow/receiveChatMsg.js");//done//
require("./chatWindow/sendMsg.js")//done//

////
closeChatWindow = function(chatWindow){
    chatWindow.addClass('none').removeClass('activeChatWindow')

}
maximizeChatWindow = function(chatWindow){
    chatWindow.find('.minMaxChatWindow').removeClass('ico-maximize').addClass('ico-minimize');
    chatWindow.find('.minMaxChatWindow').attr('tooltip',texts.cpanel.public.maximize);
    chatWindow.removeClass('chatWindow_mini')
    if(chatWindow.offset().top + chatWindow.innerHeight() > $('body').innerHeight()){
        chatWindow.css({'top':'unset','bottom':'2em'});
    }
    if(chatWindow.offset().left + chatWindow.width() > $('body').width()){
        chatWindow.css({'left':'unset','right':'1em'});
    }
    chatWindow.removeClass('activeChatWindow');
}
minimizeChatWindow = function(chatWindow){
    chatWindow.find('.minMaxChatWindow').removeClass('ico-minimize').addClass('ico-maximize');
    chatWindow.find('.minMaxChatWindow').attr('tooltip',texts.cpanel.public.minimize);
    chatWindow.addClass('chatWindow_mini')
    chatWindow.removeClass('activeChatWindow')
}
//////move window
$('html,body').on('mousedown touchstart','.chatWindowHead, .chatwindowBody',function(e){
    e.stopImmediatePropagation();
    $(this).parent().attr('onMove','true');
    $(this).parent().addClass('chatWindowOnMove');
    if(window.matchMedia("(pointer: coarse)").matches){
        $(this).parent().attr('gapX', e.originalEvent.changedTouches[0].pageX - $(this).parent().position().left);
        $(this).parent().attr('gapY', e.originalEvent.changedTouches[0].pageY - $(this).parent().position().top);
    }else{
        $(this).parent().attr('gapX', e.pageX - $(this).parent().position().left);
        $(this).parent().attr('gapY', e.pageY - $(this).parent().position().top);
    }
})
$('html,body').on('mouseup touchend','.chatWindowHead, .chatwindowBody',function(e){
    e.stopImmediatePropagation();
    $(this).parent().attr('onMove','false');
    $(this).parent().removeClass('chatWindowOnMove');

})
$('html,body').on('mousemove touchmove','.chatWindowHead, .chatwindowBody',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    if( $(this).parent().attr('onMove') == 'true' ){
        if(window.matchMedia("(pointer: coarse)").matches){
            $(this).parent().css({
                left:e.originalEvent.touches[0].pageX -  $(this).parent().attr('gapX'),
                top:e.originalEvent.touches[0].pageY -  $(this).parent().attr('gapY'),
            });
        }else{
            $(this).parent().css({
                left:e.pageX -  $(this).parent().attr('gapX'),
                top:e.pageY -  $(this).parent().attr('gapY'),
            });

        }
    }
})
//////chat window
$('html,body').on('click','.chatWindow' ,function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('chatWindow_mini')){return;}
    if($(this).find('.chatWindowHeadIconsContainer').is(':hover')){return;}

    if(!$(this).hasClass('activeChatWindow')){
        if(checkForUnseenMsgs($(this).attr('type'),$(this).attr('user')) && $(this).find('.chatwindowBody').scrollTop() == 0){
            setChatAsSeen($(this).attr('type'),$(this).attr('user'))
        }
        $('.chatWindow').removeClass('activeChatWindow');
        $(this).addClass('activeChatWindow');
    }
})
$(document).on('click',function(){
    if(!$('.action_chat:hover').length > 0){
        $('.chatWindow').removeClass('activeChatWindow');
    }
})
$('html,body').on('click','.closeChatWindowIcon' ,function(e){
    e.stopImmediatePropagation();
    closeChatWindow($(this).closest('.chatWindow'))

})
$('html,body').on('click','.minMaxChatWindow' ,function(e){
    e.stopImmediatePropagation();
    if($(this).closest('.chatWindow').find('.minMaxChatWindow').hasClass('ico-maximize')){
        maximizeChatWindow($(this).closest('.chatWindow'))
    }else if($(this).closest('.chatWindow').find('.minMaxChatWindow').hasClass('ico-minimize')){
        minimizeChatWindow($(this).closest('.chatWindow'))
    }

});

$('html,body').on('click','.chatWindowScrollToBottom',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.chatWindow').find('.chatwindowBody').animate({'scrollTop':'0'},500);
})
//input
let typingChecker = false;
let typingCheckerTimeout;
$('html,body').on('input','.chatWindowInputMsg',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.chatWindow').addClass('activeChatWindow')
    if($(this).closest('.chatWindow').scrollTop() == 0){
        if(checkForUnseenMsgs($(this).closest('.chatWindow').attr('type'),$(this).closest('.chatWindow').attr('user')) && $(this).closest('.chatWindow').find('.chatwindowBody').scrollTop() == 0){
            setChatAsSeen($(this).closest('.chatWindow').attr('type'),$(this).closest('.chatWindow').attr('user'))
        }
    }
    if(typingChecker == false){
        clearTimeout(typingCheckerTimeout);
        typingChecker = true;
        $.ajax({
            url:'liveChat',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                typing:true,
                type:$(this).closest('.chatWindow').attr('type'),
                id:$(this).closest('.chatWindow').attr('user'),
            }
        })
        typingCheckerTimeout = setTimeout(function(){
            typingChecker = false;
        },3000);
    }
});
///send msg
$('html,body').on('keypress','.chatWindowInputMsg',function(e){
    e.stopImmediatePropagation();
    if(e.which == 13) {
        clearTimeout(typingCheckerTimeout);
        typingChecker = false;
        if(!coolDownChecker()){return}
        sendChatMsg($(this).closest('.chatWindow').attr('type'),$(this).closest('.chatWindow').attr('user'));
    }
})
$('html,body').on('click','.chatWindowSendBtn',function(e){
    e.stopImmediatePropagation();
    clearTimeout(typingCheckerTimeout);
    typingChecker = false;
    if(!coolDownChecker()){return}
    sendChatMsg($(this).closest('.chatWindow').attr('type'),$(this).closest('.chatWindow').attr('user'));
})
$('html,body').on('click','.chatResendMsg',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.chatWindow').find('.chatWindowInputMsg').val(window.sendingMsgs[$(this).closest('.ChatWindowMsgCard').attr('msgId')])
    delete window.sendingMsgs[$(this).closest('.ChatWindowMsgCard').attr('msgId')];
    sendChatMsg($(this).closest('.chatWindow').attr('type'),$(this).closest('.chatWindow').attr('user'));
    $(this).closest('.ChatWindowMsgCard').remove();
})
//delete msg
$('html,body').on('click','.chatWindowDeleteTempMsg',function(e){
    e.stopImmediatePropagation();
    delete window.sendingMsgs[$(this).closest('.ChatWindowMsgCard').attr('msgId')];
    $(this).closest('.ChatWindowMsgCard').remove();
})
$('html,body').on('click','.chatWindowDeleteMsg',function(e){
    e.stopImmediatePropagation();
    let msgId = $(this).closest('.ChatWindowMsgCard').attr('msgId');
    let id = $(this).closest('.chatWindow').attr('user');
    let type = $(this).closest('.chatWindow').attr('type');
    let msgElem = $(this).closest('.ChatWindowMsgCard').find('.chatWindowMsgContainer_account').html();
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'fs101',text:texts.cpanel.liveChat.deleteChatConfirm}),
            $('<div/>',{class:'mT20'}).append(
                msgElem
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteChatMsg-confirmBtn',msgId:msgId,userId:id,type:type,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#deleteChatMsg-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return}
    showBtnLoading($('#deleteChatMsg-confirmBtn'))
    let msgId = $(this).attr('msgId');
    let id = $(this).attr('userId');
    let type = $(this).attr('type');
    $.ajax({
        url:'liveChat',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteChatMsg:true,
            msgId:msgId,
            type:type,
            id:id,
        },success:function(r){
            hideBtnLoading($('#deleteChatMsg-confirmBtn'))
            if(r.deleteChatMessage == 1){
                showAlert('success',texts.cpanel.liveChat.deleteChatMsgDeleted,4000,true);
                for(const key in window.chatMsgs[`${type}-${id}`]){
                    if(window.chatMsgs[`${type}-${id}`][key]._id == msgId){
                        window.chatMsgs[`${type}-${id}`][key].deleted_at = r.now;
                        window.chatMsgs[`${type}-${id}`][key].is_deleted = true;
                        window.chatMsgs[`${type}-${id}`][key].deleted_by = account.id;
                        window.chatMsgs[`${type}-${id}`][key].message = '--';
                    }
                }
                if(type == 'user'){
                    if(website.users.find(item=>item.id == id).lastMsg_id == msgId){
                        website.users.find(item=>item.id == id).last_msg.deleted_at = r.now;
                        website.users.find(item=>item.id == id).last_msg.is_deleted = true;
                        website.users.find(item=>item.id == id).last_msg.deleted_by = account.id;
                        website.users.find(item=>item.id == id).last_msg.message = '--';
                        if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                            drawUsersChatBoxes();
                        }
                    }
                }
                if(type == 'guest'){
                    if(website.guests.find(item=>item.id == id).lastMsg_id == msgId){
                        website.guests.find(item=>item.id == id).last_msg.deleted_at = r.now;
                        website.guests.find(item=>item.id == id).last_msg.is_deleted = true;
                        website.guests.find(item=>item.id == id).last_msg.deleted_by = account.id;
                        website.guests.find(item=>item.id == id).last_msg.message = '--';
                        if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
                            drawGuestsChatBoxes();
                        }
                    }
                }
                $(`.ChatWindowMsgCard[msgId="${msgId}"]`).find('.chatWindowMsgText_account').text('').html(drawDeletedMsg());
                $(`.ChatWindowMsgCard[msgId="${msgId}"]`).find('.chatWindowDeleteMsg').remove();
                $(`.ChatWindowMsgCard[msgId="${msgId}"]`).find('.chatWindowMsgInfo').attr('tooltip',chatMsgTooltip(window.chatMsgs[`${type}-${id}`].find(item=>item._id == msgId)))


                closePopup();
            }else if(r.deleteChatMessage == 0){
                showAlert('error',texts.cpanel.liveChat.deleteChatMsgFail,4000,true);
            }

        }
    })
})
//share product
$('html,body').on('click','.chatShareProductClose',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.chatWindow').find('.chatWindowShareProductContainer').removeClass('chatWindowShareProductContainer_show')
})
$('html,body').on('input change','.chatWindowShareProductInput',function(e){
    e.stopImmediatePropagation();
    let thisVal = $(this).val();
    if(thisVal == ''){
        $(this).closest('.chatWindow').find('.chatShareProductProduct').removeClass('none')
    }else{
        $(this).closest('.chatWindow').find('.chatShareProductProduct').addClass('none')
        $(this).closest('.chatWindow').find('.chatShareProductProduct').each(function(){
            if($(this).attr('productName').toLowerCase().includes(thisVal.toLowerCase())){
                $(this).removeClass('none')
            }
        })

    }
})
$('html,body').on('click','.chatShareProduct',function(e){
    e.stopImmediatePropagation();

    if($(this).closest('.chatWindow').find('.chatWindowShareProductContainer').hasClass('chatWindowShareProductContainer_show')){
        $(this).closest('.chatWindow').find('.chatWindowShareProductContainer').removeClass('chatWindowShareProductContainer_show')

    }else{
        $(this).closest('.chatWindow').find('.chatWindowShareProductContainer').addClass('chatWindowShareProductContainer_show');
        $(this).closest('.chatWindow').find('.chatWindowShareProductContainer').text('')
        $(this).closest('.chatWindow').find('.chatWindowShareProductContainer').append(
            $('<div/>',{class:'chatShareproductHead'}).append(
                $('<div/>',{
                    class:'inputSearchContainer mX5 mY0 w100p-10'
                }).append(
                    $('<input/>',{
                        class:'inputSearch chatWindowShareProductInput',
                        placeholder:texts.cpanel.public.search,
                    }),
                    $('<div/>',{class:'inputSearchIcon chatWindowShareProductInputIcon '}).append(
                        $('<div/>',{class:'inputSearchIconIcon mY0 ico-search'})
                    )
                ),
                $('<div/>',{class:'ico-down action-chatShareProduct chatShareProductClose'}),
            )


        )
        if(website.products.length == 0){
            $(this).closest('.chatWindow').find('.chatWindowShareProductContainer').append(
                $('<div/>',{
                    class:'taC',
                    text:texts.products.noProducts,
                })
            )
        }
        for(const key in website.products){
            let product = website.products[key];
            $(this).closest('.chatWindow').find('.chatWindowShareProductContainer').append(
                $('<div/>',{
                    class:'chatShareProductProduct',
                    productName:product.name,
                }).append(
                    $('<img/>',{
                        class:'chatShareProductImg',
                        alt:'',
                        src:product.img,
                    }),
                    $('<div/>',{class:'chatShareProductName'}).append(

                        $('<a/>',{
                            text:product.name,
                            product:product.name,
                            class:' popupPage popupId wFC',
                            popupPage:'product',
                            popupId:'product',
                        }),
                    ),
                    $('<div/>',{
                        class:'ico-send pointer fs1 action-chatShareProductSend',
                        tooltip:texts.cpanel.liveChat.msgSend,
                        product:product.name,
                    })
                )
            )
        }
    }
})
$('html,body').on('click','.action-chatShareProductSend',function(e){
    e.stopImmediatePropagation();
    let productName = $(this).attr('product');
    let chatWindow = $(this).closest('.chatWindow');
    chatWindow.find('.chatWindowShareProductContainer').removeClass('chatWindowShareProductContainer_show')
    setTimeout(function(){
        chatWindow.find('.chatWindowInputMsg').val('p@'+productName)
        chatWindow.find('.chatWindowSendBtn').trigger('click');
    },250)
})
