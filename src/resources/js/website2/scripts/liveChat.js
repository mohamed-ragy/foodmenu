
// let msgDate ;
let getMoreChats = true;
let noMoreChats = false;
// let prevMsgDate ;
let unseenmsgs = 0;
let unDeliveredMsgs = 0;
window.chatmsgs = [];
let msgToDelete;
let typingChecker = false;
let typingCheckerTimeout;
let tempMsgId;
getChatMsgInfo = function(msg){
    if(msg == null){
        return{
            time:'',
            icon:'',
            info:'',
            date:'',
        }
    }
    let Timeformat; let DateTimeformat; let DateFormat; let today;
    let msgTime;
    let sentAt = '';
    let deliveredAt = '';
    let seenAt = '';
    let deletedAt = '';
    let msgIconClass; let msgInfo; let msgDate;
    if(website.hour12 == true){
        hour12 = 1;
    }else{
        hour12 = 0;
    }
    Timeformat =  { hour:'numeric', minute:'numeric',hour12 :hour12};
    DateTimeformat = {  year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric',second:'numeric',hour12 :hour12,};

    msgTime = new Date((msg.sent_at));
    msgTime = msgTime.toLocaleString(lang,Timeformat);
    sentAt = new Date((msg.sent_at));
    sentAt = sentAt.toLocaleString(lang,DateTimeformat);
    msgIconClass = 'ic-msgSent msgSent';
    msgInfo = `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-msgSent msgSent"></span><span>`+texts.liveChat.msgSent+` `+sentAt+`</span></div>`;
    // if(msg.is_delivered == true){
    //     deliveredAt = new Date((msg.delivered_at).replace(/ /g,"T"));
    //     deliveredAt = deliveredAt.toLocaleString(lang,DateTimeformat);
    //     msgIconClass = 'ic-msgDelivered msgDelivered';
    //     // msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;">`+texts.liveChat.msgDelivered+` `+deliveredAt+`</div>`;
    // }
    if(msg.is_seen == true){
        seenAt = new Date((msg.seen_at));
        seenAt = seenAt.toLocaleString(lang,DateTimeformat);
        msgIconClass = 'ic-msgSeen msgSeen';
        // msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;">`+texts.liveChat.msgSeen+` `+seenAt+`</div>`;

    }
    if(msg.is_deleted == true){
        deletedAt = new Date((msg.deleted_at));
        deletedAt = deletedAt.toLocaleString(lang,DateTimeformat);
        msgIconClass = '';
        // msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;">`+texts.liveChat.msgDeleted+` `+deletedAt+`</div>`;
    }

    if(msg.is_deleted == true){
        let isDeletedAdded = false;
        if(msg.is_delivered == true){
            if(Date.parse(deletedAt) <= Date.parse(deliveredAt) ){
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-delete"></span><span>`+texts.liveChat.msgDeleted+` `+deletedAt+`</span></div>`;
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-msgDelivered msgDelivered"></span><span>`+texts.liveChat.msgDelivered+` `+deliveredAt+`</span></div>`;
                isDeletedAdded = true;
            }else{
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-msgDelivered msgDelivered"></span><span>`+texts.liveChat.msgDelivered+` `+deliveredAt+`</span></div>`;
            }
        }
        if(msg.is_seen == true){
            if(Date.parse(deletedAt) <= Date.parse(seenAt) ){
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-delete"></span><span>`+texts.liveChat.msgDeleted+` `+deletedAt+`</span></div>`;
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-msgSeen msgSeen"></span><span>`+texts.liveChat.msgSeen+` `+seenAt+`</span></div>`;
                isDeletedAdded = true;
            }else{
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-msgSeen msgSeen"></span><span>`+texts.liveChat.msgSeen+` `+seenAt+`</span></div>`;
            }
        }
        if(isDeletedAdded == false){
            msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-delete"></span><span>`+texts.liveChat.msgDeleted+` `+deletedAt+`</span></div>`;
        }
    }else{
        if(Date.parse(deliveredAt) <= Date.parse(seenAt) || seenAt == 0){
            if(msg.is_delivered == true){
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="flexRowNoWrap"><span style="margin-inline-end:.5em;" class="ic-msgDelivered msgDelivered"></span><span>`+texts.liveChat.msgDelivered+` `+deliveredAt+`</span></div>`;
            }
            if(msg.is_seen == true){
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="flexRowNoWrap"><span style="margin-inline-end:.5em;" class="ic-msgSeen msgSeen"></span><span>`+texts.liveChat.msgSeen+` `+seenAt+`</span></div>`;
            }
        }else{
            if(msg.is_seen == true){
                msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="flexRowNoWrap"><span style="margin-inline-end:.5em;" class="ic-msgSeen msgSeen"></span><span>`+texts.liveChat.msgSeen+` `+seenAt+`</span></div>`;
            }
            // if(msg.is_delivered == true){
            //     msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="flexRowNoWrap"><span style="margin-inline-end:.5em;" class="ic-msgDelivered msgDelivered"></span><span>`+texts.liveChat.msgDelivered+` `+deliveredAt+`</span></div>`;
            // }
        }
        // if(msg.is_delivered == true){
        //     msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-msgDelivered msgDelivered"></span><span>`+texts.liveChat.msgDelivered+` `+deliveredAt+`</span></div>`;
        // }
        // if(msg.is_seen == true){
        //     msgInfo = msgInfo + `<div style="margin-bottom:.1em;margin-top:.1em;" class="row alnC jstfyC"><span style="margin-inline-end:.5em;" class="ic-msgSeen msgSeen"></span><span>`+texts.liveChat.msgSeen+` `+seenAt+`</span></div>`;
        // }
    }

    // if(msg.is_seen == true){msgInfo = `<div>`+texts.liveChat.msgSent+` `+sentAt+`</div><div style="margin-bottom:.25em;margin-top:.25em;">`+deliveredAtTxt+` `+deliveredAt+`</div><div>`+texts.liveChat.msgSeen+` `+seenAt+`</div>`;}
    // else if(msg.is_delivered == true){msgInfo = `<div style="margin-bottom:.25em">`+texts.liveChat.msgSent+` `+sentAt+`</div><div>`+deliveredAtTxt+` `+deliveredAt+`</div>`;}
    // else{}

    DateFormat = { year: 'numeric', month: 'short', day: '2-digit' }
    msgDate = new Date((msg.sent_at));
    today = new Date();
    if(today.getDate() == msgDate.getDate() &&
        today.getMonth() == msgDate.getMonth() &&
        today.getYear() == msgDate.getYear() ){
            msgDate = texts.liveChat.msgToday;
    }else if ((today.getDate() - 1) == msgDate.getDate() &&
        today.getMonth() == msgDate.getMonth() &&
        today.getYear() == msgDate.getYear() ){
            msgDate = texts.liveChat.msgYesterday;
    }else{
        msgDate = msgDate.toLocaleString(lang,DateFormat);
    }
    return{
        msgDate:msgDate,
        MsgSentAt:msgTime,
        msgIconClass:msgIconClass,
        msgInfo:msgInfo,
    }
    // let msgIconClass;
    // let msgDate;
    // let sentAt;
    // let msgInfo;
    // if(website.hour12 == true){
    //     hour12 = 1;
    // }else{
    //     hour12 = 0;
    // }
    // let Timeformat =  { hour:'numeric', minute:'numeric',hour12 :hour12};
    // let DateTimeformat = {  year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric',second:'numeric',hour12 :hour12,};
    // let deliveredAt = '';
    // let deliveredAtTxt = '';
    // let MsgSentAt = new Date((msg.sent_at).replace(/ /g,"T"));
    // MsgSentAt = MsgSentAt.toLocaleString(lang,Timeformat);

    // if(msg.is_seen == true){seenAt = new Date((msg.seen_at).replace(/ /g,"T"));seenAt = seenAt.toLocaleString(lang,DateTimeformat);}
    // if(msg.is_delivered == true){deliveredAt = new Date((msg.delivered_at).replace(/ /g,"T")); deliveredAt = deliveredAt.toLocaleString(lang,DateTimeformat); deliveredAtTxt = texts.liveChat.msgDelivered}
    // sentAt = new Date((msg.sent_at).replace(/ /g,"T"));
    // sentAt = sentAt.toLocaleString(lang,DateTimeformat);

    // if(msg.is_seen == true){msgIconClass = 'ic-msgSeen msgSeen';msgInfo = `<div>`+texts.liveChat.msgSent+` `+sentAt+`</div><div style="margin-bottom:.25em;margin-top:.25em;">`+deliveredAtTxt+` `+deliveredAt+`</div><div>`+texts.liveChat.msgSeen+` `+seenAt+`</div>`;}
    // else if(msg.is_delivered == true){msgIconClass = 'ic-msgDelivered msgDelivered';msgInfo = `<div style="margin-bottom:.25em">`+texts.liveChat.msgSent+` `+sentAt+`</div><div>`+deliveredAtTxt+` `+deliveredAt+`</div>`;}
    // else{msgIconClass = 'ic-msgSent msgSent';msgInfo = `<div>`+texts.liveChat.msgSent+` `+sentAt+`</div>`;}

    // let DateFormat = { year: 'numeric', month: 'short', day: '2-digit' }
    // msgDate = new Date((msg.sent_at).replace(/ /g,"T"));
    // // msgDate = msgDate.toLocaleString(lang,DateFormat);
    // let today = new Date();

    // if(today.getDate() == msgDate.getDate() &&
    //     today.getMonth() == msgDate.getMonth() &&
    //     today.getYear() == msgDate.getYear() ){
    //         msgDate = texts.liveChat.msgToday;
    // }else if ((today.getDate() - 1) == msgDate.getDate() &&
    //     today.getMonth() == msgDate.getMonth() &&
    //     today.getYear() == msgDate.getYear() ){
    //         msgDate = texts.liveChat.msgYesterday;
    // }else{
    //     msgDate = msgDate.toLocaleString(lang,DateFormat);
    // }
    // return {
    //     msgDate:msgDate,
    //     MsgSentAt:MsgSentAt,
    //     msgIconClass:msgIconClass,
    //     msgInfo:msgInfo,
    // }
}
// msgDate:msgDate,
// MsgSentAt:MsgSentAt,
// msgIconClass:msgIconClass,
// msgInfo:msgInfo,
drawChatBodyTop = function(){
    noMoreChats = true;
    $('#liveChatBody').append(
        $('<div/>',{
            class:'liveChatBodyTop',
        }).append(
            $('<img/>',{
                class:'liveChatBodyTopImg',
                src:website.logo,
            }),
            $('<span/>',{
                class:'liveChatBodyTopRestaurantName',
                text:website.restaurantName,
            })
        )
    )
}
drawChatProduct = function(txt){
    let product = products.find(item => item.name == txt.replace('p@',''))
    if(product == null){return;}
     return`<div class="chatProductContainer">
        <a href="/`+lang+`/${product.catName}/`+product.name+`">
            <img class="chatProductImg product productLink" productId="${product.id}" productName="`+product.name+`" src="`+product.imgUrl+`" alt="" />
        </a>
        <a href="/`+lang+`/${product.catName}/`+product.name+`" class="chatProductName productLink" productId="${product.id}">`+product.nameLang+`</a>
        <div class="chatProductDes" tooltip="${product.descriptionLang}">`+product.descriptionLang+`</div>
        <div style="margin:5px;"><button  class="addToCart" productId="`+product.id+`">`+texts.orders.addToCart+`</button></div>
    </div>`
}
drawChatOrder = function(txt){
    let orderNumber = txt.replace('o@','');
    return`<div class="chatOrderContainer">
   <div class="chatOrderHead"><span>${texts.orders.orderNumber}</span> <span>`+orderNumber+`</span></div>
    <div class="w-100-10 row alnC jstfyC mY-10 mX-5" ><button  class="m-a trackOrder" orderId="`+orderNumber+`">${texts.orders.trackOrder}</button></div>
</div>`
}
drawChatMsg = function(msg,append){
    let getMsgInfo = getChatMsgInfo(msg);
    let message;
    if(msg.message.startsWith('p@')){
        message = drawChatProduct(msg.message);
    }else if(msg.message.startsWith('o@')){
        message = drawChatOrder(msg.message);
    }else{
        message = `<div class="p-5">`+msg.message+`</div>`;
    }

    if(msg.author == 1){
        if(msg.is_deleted == true){
            if(append == 'append'){
                $('#liveChatBody').append(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatUserMsgContainer',
                            msgId:msg._id,
                        }).append(
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                                    msgId:msg._id,
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
                        )
                    )
                )
            }else if(append == 'prepend'){
                $('#liveChatBody').prepend(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatUserMsgContainer',
                            msgId:msg._id,
                        }).append(
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                                    msgId:msg._id,
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
                        )
                    )
                )
            }

        }else{
            if(append == 'append'){
                $('#liveChatBody').append(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatUserMsgContainer',
                            msgId:msg._id,
                        }).append(
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                                    msgId:msg._id,
                                    tooltip:getMsgInfo.msgInfo,

                                }),
                                $('<span/>',{
                                    class:'ic-delete liveChatDeleteMsg m-2',
                                    msgId:msg._id,
                                    // message:message,
                                    tooltip:texts.liveChat.deleteMsg
                                })
                            ),

                            $('<div/>',{
                                class:'liveChatUserMsg',
                            }).append(
                                $('<div/>',{
                                    class:'liveChatUserMsgText',
                                    html:message,
                                }),
                                $('<div/>',{
                                    class:'liveChatUserMsgInfo',
                                    msgId:msg._id,
                                }).append(
                                    $('<div/>',{text:getMsgInfo.MsgSentAt,class:'mX-5'}),
                                    $('<div/>',{class:getMsgInfo.msgIconClass}),
                                )
                            ),
                        )
                    )
                )
            }else if(append == 'prepend'){
                $('#liveChatBody').prepend(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatUserMsgContainer',
                            msgId:msg._id,
                        }).append(
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                                    msgId:msg._id,
                                    tooltip:getMsgInfo.msgInfo,

                                }),
                                $('<span/>',{
                                    class:'ic-delete liveChatDeleteMsg m-2',
                                    msgId:msg._id,
                                    // message:message,
                                    tooltip:texts.liveChat.deleteMsg
                                })
                            ),

                            $('<div/>',{
                                class:'liveChatUserMsg',
                            }).append(
                                $('<div/>',{
                                    class:'liveChatUserMsgText',
                                    html:message,
                                }),
                                $('<div/>',{
                                    class:'liveChatUserMsgInfo',
                                    msgId:msg._id,
                                }).append(
                                    $('<div/>',{text:getMsgInfo.MsgSentAt,class:'mX-5'}),
                                    $('<div/>',{class:getMsgInfo.msgIconClass}),
                                )
                            ),
                        )
                    )
                )
            }

        }
    }else if(msg.author == 0){
        if(msg.is_deleted == true){
            if(append == 'append'){
                $('#liveChatBody').append(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatAccountMsgContainer',
                            msgId:msg._id,
                        }).append(
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
                                    msgId:msg._id,
                                    tooltip:getMsgInfo.msgInfo,

                                }),
                            ),
                        )
                    )
                )
            }else if(append == 'prepend'){
                $('#liveChatBody').prepend(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatAccountMsgContainer',
                            msgId:msg._id,
                        }).append(
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
                                    msgId:msg._id,
                                    tooltip:getMsgInfo.msgInfo,

                                }),
                            ),
                        )
                    )
                )
            }

        }else{
            if(append == 'append'){
                $('#liveChatBody').append(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatAccountMsgContainer',
                            msgId:msg._id,
                        }).append(
                            $('<div/>',{
                                class:'liveChatAccountMsg',
                            }).append(
                                $('<div/>',{
                                    class:'liveChatAccountMsgText',
                                    html:message,
                                }),
                                $('<div/>',{
                                    class:'liveChatAccountMsgInfo',
                                }).append(
                                    $('<div/>',{text:getMsgInfo.MsgSentAt,class:'mX-5'}),
                                )
                            ),
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoAccount  m-2',
                                    msgId:msg._id,
                                    tooltip:getMsgInfo.msgInfo,
                                }),
                            ),
                        )
                    )
                )
            }else if(append == 'prepend'){
                $('#liveChatBody').prepend(
                    $('<div/>',{
                        class:'w-100p liveChatMsgCard',
                        sent_at:msg.sent_at,
                        msgId:msg._id,
                    }).append(
                        $('<div/>',{
                            class:'liveChatAccountMsgContainer',
                            msgId:msg._id,
                        }).append(
                            $('<div/>',{
                                class:'liveChatAccountMsg',
                            }).append(
                                $('<div/>',{
                                    class:'liveChatAccountMsgText',
                                    html:message,
                                }),
                                $('<div/>',{
                                    class:'liveChatAccountMsgInfo',
                                }).append(
                                    $('<div/>',{text:getMsgInfo.MsgSentAt,class:'mX-5'}),
                                )
                            ),
                            $('<div/>',{
                                class:' liveChatMsgInfoIconsContainer vH',
                            }).append(
                                $('<span/>',{
                                    class:'ic-info liveChatMsgInfo liveChatMsgInfoAccount  m-2',
                                    msgId:msg._id,
                                    tooltip:getMsgInfo.msgInfo,
                                }),
                            ),
                        )
                    )
                )
            }

        }
    }

    if(msg.message.startsWith('p@')){
        let product = products.find(item => item.name == msg.message.replace('p@',''));
        if(product){
            ProductAvailabilityCheck(product.id);
        }
    }
    // $('#liveChatBody').children().each(function(){
    //     if($(this).text() == getMsgInfo.msgDate){$(this).remove();}
    // })
    if(append == 'append'){
        $('.liveChatDateContainer').each(function(){
            if($(this).children().first().text() ==  getMsgInfo.msgDate){$(this).remove();}
        })
        $('#liveChatBody').append(
            $('<div/>',{
                class:'liveChatDateContainer',
                msgId:msg._id,
            }).append(
                $('<div/>',{
                    text:getMsgInfo.msgDate,
                    class:'liveChatDate'
                })
            )
        )
    }
}

sendChatMsg = function(){
    sendingChatMsgsLimiterCheck = sendingChatMsgsLimiterCheck + 1;
    if(sendingChatMsgsLimiterCheck >= 8){
        $('.liveChatSendingMsgCoolDown').addClass('liveChatSendingMsgCoolDown_show');
        return;
    }
    if($('#liveChatmsgInput').val() == ''){return}
    if(website.hour12 == true){
        hour12 = 1;
    }else{
        hour12 = 0;
    }
    let message = $('#liveChatmsgInput').val();
    let messageHtml = $('#liveChatmsgInput').val();
    $('#liveChatmsgInput').val('');
    let Timeformat =  { hour:'numeric', minute:'numeric',hour12 :hour12};
    let MsgSentAt = new Date();
    MsgSentAt = MsgSentAt.toLocaleString(lang,Timeformat);
    let msgIconClass = 'ic-msgSent msgSent';
    let msgInfo = `<div>`+texts.liveChat.msgSent+` `+MsgSentAt+`</div>`;
    tempMsgId = Math.round(Math.random()*100000000);
    if(messageHtml.startsWith('p@',0)){
        messageHtml = drawChatProduct(messageHtml);
    }else if(messageHtml.startsWith('o@',0)){
        messageHtml = drawChatOrder(messageHtml);
    }else{
        messageHtml = `<div class="p-5">`+messageHtml+`</div>`;
    }
    $('#liveChatBody').prepend(
        $('<div/>',{
            class:'w-100p liveChatMsgCard',
            sent_at:MsgSentAt,
            msgId:tempMsgId,
        }).append(
            $('<div/>',{
                class:'liveChatUserMsgContainer',
                msgId:tempMsgId,
            }).append(
                $('<div/>',{
                    class:' liveChatMsgInfoIconsContainer vH',
                }).append(
                    // $('<span/>',{
                    //     class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                    //     msgId:tempMsgId,
                    //     tooltip:getMsgInfo.msgInfo,

                    // }),
                    // $('<span/>',{
                    //     class:'ic-delete liveChatDeleteMsg m-2',
                    //     msgId:msg._id,
                    //     // message:msg.message,
                    //     tooltip:texts.liveChat.deleteMsg
                    // })
                ),
                $('<div/>',{
                    class:'liveChatUserMsg',
                }).append(
                    $('<div/>',{
                        class:'liveChatUserMsgText',
                        html:messageHtml,
                        message:message,
                    }),
                    $('<div/>',{
                        class:'liveChatUserMsgInfo',
                    }).append(
                        $('<div/>',{text:MsgSentAt,class:'mX-5'}),
                        $('<div/>',{class:'msgIconClass '+msgIconClass}),
                    )
                ),
            )
        )
    )
    // 'ic-msgNotSent cE'
    if(message.startsWith('p@')){
        let product = products.find(item => item.name ==    message.replace('p@',''));
        if(product){
            ProductAvailabilityCheck(product.id);
        }
    }
    $('#liveChatBody').scrollTop(0);
    $.ajax({
        url:'/website/liveChat',
        type:'post',
        data:{
            sendChatMessage:message,
            tempId:tempMsgId,
        },success:function(response){
            if(response.sendChatMessage == 1){
                console.log(response)
                chatmsgs.push(response.msg)
                console.log(chatmsgs)
                let thisMsgCard = $('.liveChatMsgCard[msgId="'+response.tempId+'"]');
                thisMsgCard.attr('sent_at',response.msg.sent_at)
                thisMsgCard.attr('msgId',response.msg._id)
                thisMsgCard.find('.liveChatUserMsgContainer').attr('msgId',response.msg._id)
                thisMsgCard.find('.liveChatMsgInfoIconsContainer').append(
                    $('<span/>',{
                        class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                        msgId:response.msg._id,
                        tooltip:getChatMsgInfo(response.msg).msgInfo,
                    }),
                    $('<span/>',{
                        class:'ic-delete liveChatDeleteMsg m-2',
                        msgId:response.msg._id,
                        tooltip:texts.liveChat.deleteMsg
                    })
                )
            }else if(response.sendChatMessage == 0){
                let thisMsgCard = $('.liveChatMsgCard[msgId="'+tempMsgId+'"]');
                thisMsgCard.find('.msgSent').removeClass('ic-msgSent msgSent').addClass('ic-msgNotSent msgNotSent')
                thisMsgCard.find('.liveChatMsgInfoIconsContainer').append(
                    $('<span/>',{
                        class:'ic-refresh liveChatResendMsg m-2',
                        message:thisMsgCard.find('.liveChatUserMsgText').attr('message'),
                        tooltip:texts.liveChat.resendMsg,
                        msgId:tempMsgId,
                    }),
                    $('<span/>',{
                        class:'ic-delete liveChatDeleteTempMsg m-2',
                        msgId:tempMsgId,
                        tooltip:texts.liveChat.deleteMsg
                    })
                )
            }
        }
    }).fail(function(){
        let thisMsgCard = $('.liveChatMsgCard[msgId="'+tempMsgId+'"]');
        thisMsgCard.find('.msgSent').removeClass('ic-msgSent msgSent').addClass('ic-msgNotSent msgNotSent')
        thisMsgCard.find('.liveChatMsgInfoIconsContainer').append(
            $('<span/>',{
                class:'ic-refresh liveChatResendMsg m-2',
                message:thisMsgCard.find('.liveChatUserMsgText').attr('message'),
                tooltip:texts.liveChat.resendMsg,
                msgId:tempMsgId,
            }),
            $('<span/>',{
                class:'ic-delete liveChatDeleteTempMsg m-2',
                msgId:tempMsgId,
                tooltip:texts.liveChat.deleteMsg
            })
        )
    })
}
// if(!loginCheck){
//     $('#liveChatIcon').on('click',function(){
//         $('.login').trigger('click');
//     });

// }else{
checkRestaurantOnlineStatus = function(){
    if(window.onlineAccounts.length == 0 ){
        $('#liveChatOnline').addClass('none');
        $('#liveChatOffline').removeClass('none');
    }else if(window.onlineAccounts.length > 0){
        $('#liveChatOnline').removeClass('none');
        $('#liveChatOffline').addClass('none');
    }
}

//1=>msgdeleted (from both)
//2=>newmsg from user
//3=>msg delivered by cpanel if user_id = 0 => all delivered
//4=>chat seen by cpanel
//5=>msgDelivered by user
//6=>msgSeen by user
//7=>chat deleted by cpanel
//8=>newmsg from cpanel
//9=>guest chats deleted by the system -- lesa ma3mlthash
//10=>user banned
//11=>product avaialbility and price changed  always(user_id =0)
//12=>product availability changted always(user_id = 0)
//13=>productDeleted always(user_id = 0);
//14=>productOptionDeleted always(user_id = 0);
//15=> edit productselection always(user_id = 0);
//20=> delete product selection always (user_id = 0);
//21=> default selection changed always (user_id = 0);

//16=>orderUpdated
//17=>orderplaced by cp

//18 =>new review(not made yet)
//19 =>new reviews(not made yet)
//22 => review deleted

//23 => order status changed
//24 => order type changed
//25 => order phoneNumber changed
//26 => order address changed
//27 => order delivery cost changed
//28 order discount changed
// CpanelAccounts = {};
// let listenToChannelAs;
// if(loginCheck){
//     listenToChannelAs = user.id;
// }else{
//  listenToChannelAs = 'guest_'+user.id
// }

// userStatusChannel
// .here(function(users){
//     for(const key in users){
//         if(user.isAccount == true && user.liveChatAuthority == 1 && user.offline == false){
//             CpanelAccounts[user.account] = 0;
//         }
//     }
//     checkCpanelOnlineStatus();
//     userStatusChannel
//     .whisper('chat',{code:4,user:user.id})
// })
// .joining(function(user){
//     if(user.isAccount == true && user.liveChatAuthority == 1 && user.offline == false){
//         CpanelAccounts[user.account] = 0;
//         checkCpanelOnlineStatus();
//     }
// })
// .leaving(function(user){
//     if(user.isAccount == true && user.liveChatAuthority == 1){
//         CpanelAccounts[user.account] = 1;
//         checkCpanelOnlineStatus();
//     }
// })
// .listen('.usersStatus.0',function(e){
//     if(e.user.code == 3){
//         $('.liveChatUserMsgContainer').each(function(){
//             for(const key in chatmsgs){
//                 if($(this).attr('msgId') == chatmsgs[key]._id && chatmsgs[key].is_delivered == false){
//                     chatmsgs[key].delivered_at = e.user.now;
//                     chatmsgs[key].is_delivered = true;
//                     let getMsgInfo = getChatMsgInfo(chatmsgs[key]);
//                     $(this).find('.liveChatMsgInfoUser').attr('tooltip',getMsgInfo.msgInfo)
//                     $(this).find('.liveChatUserMsgInfo').children().eq(0).text(getMsgInfo.sentAt)
//                     $(this).find('.liveChatUserMsgInfo').children().eq(1).removeClass().addClass(getMsgInfo.msgIconClass)
//                 }
//             }
//         })
//     }else if(e.user.code == 11){
//         for(const key in products){
//             if(products[key].id == e.user.productId){
//                 products[key].availability = e.user.productAvailability;
//                 products[key].price = e.user.productPrice;
//                 let productDefaultPrice = parseFloat(products[key].price);
//                 for(const key2 in products[key].product_options){
//                     for(const key3 in products[key].product_options[key2].product_option_selections){
//                         if(products[key].product_options[key2].product_option_selections[key3].isDefault == true){
//                             productDefaultPrice = productDefaultPrice + parseFloat(products[key].product_options[key2].product_option_selections[key3].price)
//                         }
//                     }
//                 }
//                 products[key].defaultPrice = productDefaultPrice;
//                 $('.productPagePrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 $('.productCardPrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 ProductAvailabilityCheck(products[key].id);
//                 drawCart();
//             }
//         }
//     }else if(e.user.code == 12){
//         for(const key in products){
//             if(products[key].id == e.user.productId){
//                 products[key].availability = e.user.productAvailability;
//                 ProductAvailabilityCheck(products[key].id);
//                 drawCart();
//             }
//         }
//     }else if(e.user.code == 13){
//         for(const key in products){
//             if(products[key].id == e.user.productId){
//                 products.splice(key,1);
//             }
//             for(const key in window.cart){
//                 if(window.cart[key].productId == e.user.productId){
//                     delete window.cart[key];
//                     setCart();
//                 }
//             }
//         }
//     }else if(e.user.code == 14){
//         for(const key in products){
//             if(products[key].id == e.user.product_id){
//                 let product = products[key];
//                 for(const key2 in products[key].product_options){
//                     if(products[key].product_options[key2].id == e.user.option_id){
//                         products[key].product_options.splice(key2,1);
//                     }
//                 }
//                 let productDefaultPrice = parseFloat(products[key].price);
//                 for(const key2 in products[key].product_options){
//                     for(const key3 in products[key].product_options[key2].product_option_selections){
//                         if(products[key].product_options[key2].product_option_selections[key3].isDefault == true){
//                             productDefaultPrice = productDefaultPrice + parseFloat(products[key].product_options[key2].product_option_selections[key3].price)
//                         }
//                     }
//                 }
//                 products[key].defaultPrice = productDefaultPrice;
//                 $('.productPagePrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 $('.productCardPrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 for(const key in window.cart){
//                     if(window.cart[key].productId == e.user.product_id){
//                         for(const key2 in window.cart[key].itemOptions){
//                             if(window.cart[key].itemOptions[key2].optionId == e.user.option_id){
//                                 window.cart[key].itemOptions.splice(key2,1);
//                                 setCart();
//                             }
//                         }
//                     }
//                 }
//                 drawCart();
//             }
//         }
//     }else if(e.user.code == 20){
//         for(const key in products){
//             if(products[key].id == e.user.product_id){
//                 let product = products[key];
//                 for(const key2 in products[key].product_options){
//                     if(products[key].product_options[key2].id == e.user.option_id){
//                         for(const key3 in products[key].product_options[key2].product_option_selections){
//                             if(products[key].product_options[key2].product_option_selections[key3].id == e.user.selection_id){
//                                 products[key].product_options[key2].product_option_selections.splice(key3,1);
//                             }
//                         }
//                     }
//                 }
//                 let productDefaultPrice = parseFloat(products[key].price);
//                 for(const key2 in products[key].product_options){
//                     for(const key3 in products[key].product_options[key2].product_option_selections){
//                         if(products[key].product_options[key2].product_option_selections[key3].isDefault == true){
//                             productDefaultPrice = productDefaultPrice + parseFloat(products[key].product_options[key2].product_option_selections[key3].price)
//                         }
//                     }
//                 }
//                 products[key].defaultPrice = productDefaultPrice;
//                 $('.productPagePrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 $('.productCardPrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))

//                 for(const key in window.cart){
//                     if(window.cart[key].productId == e.user.product_id){
//                         for(const key2 in window.cart[key].itemOptions){
//                             if(window.cart[key].itemOptions[key2].selectionId == e.user.selection_id){
//                                 window.cart[key].itemOptions.splice(key2,1);
//                                 setCart();
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }else if(e.user.code == 21){
//         for(const key in products){
//             if(products[key].id == e.user.product_id){
//                 let product = products[key];
//                 for(const key2 in products[key].product_options){
//                     if(products[key].product_options[key2].id == e.user.option_id){
//                         for(const key3 in products[key].product_options[key2].product_option_selections){
//                             if(products[key].product_options[key2].product_option_selections[key3].id == e.user.selection_id){
//                                 if(e.user.isDefault == 1){
//                                     products[key].product_options[key2].product_option_selections[key3].isDefault = true;
//                                 }else if(e.user.isDefault == 0){
//                                     products[key].product_options[key2].product_option_selections[key3].isDefault = false;
//                                 }
//                             }else{
//                                 products[key].product_options[key2].product_option_selections[key3].isDefault = false;
//                             }
//                         }
//                     }
//                 }
//                 let productDefaultPrice = parseFloat(products[key].price);
//                 for(const key2 in products[key].product_options){
//                     for(const key3 in products[key].product_options[key2].product_option_selections){
//                         if(products[key].product_options[key2].product_option_selections[key3].isDefault == true){
//                             productDefaultPrice = productDefaultPrice + parseFloat(products[key].product_options[key2].product_option_selections[key3].price)
//                         }
//                     }
//                 }
//                 products[key].defaultPrice = productDefaultPrice;
//                 $('.productPagePrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 $('.productCardPrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//             }
//         }
//     }else if(e.user.code == 15){
//         for(const key in products){
//             if(products[key].id == e.user.product_id){
//                 for(const key2 in products[key].product_options){
//                     if(products[key].product_options[key2].id == e.user.option_id){
//                         for(const key3 in products[key].product_options[key2].product_option_selections){
//                             if(products[key].product_options[key2].product_option_selections[key3].name == e.user.selection_name){
//                                 products[key].product_options[key2].product_option_selections[key3].price = e.user.price;
//                             }
//                         }
//                     }
//                 }
//                 let productDefaultPrice = parseFloat(products[key].price);
//                 for(const key2 in products[key].product_options){
//                     for(const key3 in products[key].product_options[key2].product_option_selections){
//                         if(products[key].product_options[key2].product_option_selections[key3].isDefault == true){
//                             productDefaultPrice = productDefaultPrice + parseFloat(products[key].product_options[key2].product_option_selections[key3].price)
//                         }
//                     }
//                 }
//                 products[key].defaultPrice = productDefaultPrice;
//                 $('.productPagePrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 $('.productCardPrice[productId="'+products[key].id+'"]').text(website.currency+parseFloat(products[key].defaultPrice).toFixed(2))
//                 drawCart();
//             }
//         }

//     }else if(e.user.code == 22){
//         for(const key in window.reviews[e.user.product_id]){
//             if(window.reviews[e.user.product_id][key].id == e.user.reviewId){
//                 window.reviews[e.user.product_id].splice(key,1)
//             }
//         }
//         $('.productReviewContainer[reviewId="'+e.user.reviewId+'"]').remove();
//     }else if(e.user.code == 23){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].status = e.user.status;
//             setOrderStatus(e.user.orderId,e.user.status)
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 24){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].type = e.user.type;
//             window.orders[e.user.orderId].tax = e.user.tax;
//             window.orders[e.user.orderId].taxPercent = e.user.taxPercent;
//             window.orders[e.user.orderId].service = e.user.service;
//             window.orders[e.user.orderId].servicePercent = e.user.servicePercent;
//             window.orders[e.user.orderId].deliveryCost = e.user.deliveryCost;
//             window.orders[e.user.orderId].total = e.user.total;
//             window.orders[e.user.orderId].deliveryEdit_account_name = null;
//             window.orders[e.user.orderId].deliveryEdit_account_id = null;
//             window.orders[e.user.orderId].paymentMethod = null;
//             setOrderStatus(e.user.orderId,e.user.status)
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 25){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].phoneNumber = e.user.phoneNumber;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 26){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].address = e.user.address;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 27){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].deliveryCost = e.user.deliveryCost;
//             window.orders[e.user.orderId].total = e.user.total;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 28){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].discount = e.user.discount;
//             window.orders[e.user.orderId].discount_itemsTotal = e.user.discount_itemsTotal;
//             window.orders[e.user.orderId].tax = e.user.tax;
//             window.orders[e.user.orderId].service = e.user.service;
//             window.orders[e.user.orderId].total = e.user.total;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 16){
//         setOrderStatus(e.user.order.id,e.user.order.status)
//         if(e.user.order.id in window.orders){
//             window.orders[e.user.order.id] = e.user.order;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }
// })
// .listen('.usersStatus.'+listenToChannelAs,function(e){

//     if(e.user.code == 1){
//         let msgId = e.user.msgId;
//         for(const key in chatmsgs){
//             if(msgId == chatmsgs[key]._id){

//                 chatmsgs[key].message = 'Deleted Message';
//                 chatmsgs[key].is_deleted = true;
//                 chatmsgs[key].deleted_at = e.user.now;
//                 let getMsgInfo = getChatMsgInfo(chatmsgs[key]);
//                 if(chatmsgs[key].author == 0){
//                     $('.liveChatAccountMsgContainer[msgId="'+msgId+'"').text('')
//                     $('.liveChatAccountMsgContainer[msgId="'+msgId+'"').append(
//                         $('<div/>',{
//                             class:'liveChatDeletedMsg',
//                         }).append(
//                             $('<span/>',{
//                                 class:'ic-warning mX-5',
//                             }),
//                             $('<span/>',{text:texts.liveChat.deletedmsg,class:'fs-09'})
//                         ),
//                         $('<div/>',{
//                             class:' liveChatMsgInfoIconsContainer vH',
//                         }).append(
//                             $('<span/>',{
//                                 class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
//                                 msgId:msgId,
//                                 tooltip:getMsgInfo.msgInfo,

//                             }),
//                         ),
//                     )
//                 }else if(chatmsgs[key].author == 1){
//                     $('.liveChatUserMsgContainer[msgId="'+msgId+'"').text('')
//                     $('.liveChatUserMsgContainer[msgId="'+msgId+'"').append(
//                         $('<div/>',{
//                             class:' liveChatMsgInfoIconsContainer vH',
//                         }).append(
//                             $('<span/>',{
//                                 class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
//                                 msgId:msgId,
//                                 tooltip:getMsgInfo.msgInfo,

//                             }),
//                         ),
//                         $('<div/>',{
//                             class:'liveChatDeletedMsg',
//                         }).append(
//                             $('<span/>',{
//                                 class:'ic-warning mX-5',
//                             }),
//                             $('<span/>',{text:texts.liveChat.deletedmsg,class:'fs-09'})
//                         )
//                     );

//                 }
//             }
//         }
//     }else if(e.user.code == 8){
//         $('#newChatMsgSound').prop('muted',false);
//         $('#newChatMsgSound')[0].play();
//         drawChatMsg(e.user.msg,'prepend');
//         $('.liveChatTyping').removeClass('liveChatTyping_show')
//         chatmsgs.push(e.user.msg);
//         if($('.liveChatContainer').hasClass('none')){
//             $('.liveChatIconNumber').addClass('chatIconNewMsg')
//         }
//         if(e.user.msg.author == 0){
//             $.ajax({
//                 url:'/website/liveChat',
//                 type:'post',
//                 data:{_token:$('meta[name="csrf-token"]').attr('content'),setAsDelivered:true}
//                 ,success:function(response){
//                     unDeliveredMsgs = 0;
//                     for(const key in chatmsgs){
//                         if(e.user.msg._id == chatmsgs[key]._id){
//                             chatmsgs[key].delivered_at = response.user.now;
//                             chatmsgs[key].is_delivered = true;
//                             $('.liveChatAccountMsgContainer[msgId="'+chatmsgs[key]._id+'"]').find('.liveChatMsgInfoAccount').attr('tooltip',getChatMsgInfo(chatmsgs[key]).msgInfo)
//                         }
//                     }
//                     if(!$('.liveChatContainer').hasClass('none') && !document.hidden){
//                         $.ajax({
//                             url:'/website/liveChat',
//                             type:'post',
//                             data:{_token:$('meta[name="csrf-token"]').attr('content'),setAsSeen:true},
//                             success:function(response){
//                                 unseenmsgs = 0;
//                                 for(const key in chatmsgs){
//                                     if(e.user.msg._id == chatmsgs[key]._id){
//                                         chatmsgs[key].seen_at = response.user.now;
//                                         chatmsgs[key].is_seen = true;
//                                         $('.liveChatAccountMsgContainer[msgId="'+chatmsgs[key]._id+'"]').find('.liveChatMsgInfoAccount').attr('tooltip',getChatMsgInfo(chatmsgs[key]).msgInfo)
//                                     }
//                                 }
//                             }
//                         })
//                     }else{
//                         unseenmsgs = unseenmsgs + 1;
//                         $('.liveChatIconNumber').text(unseenmsgs);
//                         $('.liveChatIconNumber').removeClass('none');

//                     }

//                 }
//             });
//         }

//     }else if(e.user.code == 3){
//         $('.liveChatUserMsgContainer').each(function(){
//             for(const key in chatmsgs){
//                 if(chatmsgs[key].is_delivered == false && chatmsgs[key].author == 1 && $(this).attr('msgId') == chatmsgs[key]._id){
//                     chatmsgs[key].delivered_at = e.user.now;
//                     chatmsgs[key].is_delivered = true;
//                     let getMsgInfo = getChatMsgInfo(chatmsgs[key]);
//                     $(this).find('.liveChatMsgInfoUser').attr('tooltip',getMsgInfo.msgInfo)
//                     $(this).find('.liveChatUserMsgInfo').children().eq(0).text(getMsgInfo.sentAt)
//                     $(this).find('.liveChatUserMsgInfo').children().eq(1).removeClass().addClass(getMsgInfo.msgIconClass)
//                 }
//             }
//         })
//     }else if(e.user.code == 4){
//         $('.liveChatUserMsgContainer').each(function(){
//             let thisliveChatUserMsgContainer = $(this);
//             for(const key in chatmsgs){
//                 if(chatmsgs[key].is_seen == false && chatmsgs[key].author == 1 && chatmsgs[key]._id == thisliveChatUserMsgContainer.attr('msgId')){
//                     chatmsgs[key].seen_at = e.user.now;
//                     chatmsgs[key].is_seen = true;
//                     let getMsgInfo = getChatMsgInfo(chatmsgs[key]);
//                     thisliveChatUserMsgContainer.find('.liveChatMsgInfoUser').attr('tooltip',getMsgInfo.msgInfo)
//                     thisliveChatUserMsgContainer.find('.liveChatUserMsgInfo').children().eq(0).text(getMsgInfo.sentAt)
//                     thisliveChatUserMsgContainer.find('.liveChatUserMsgInfo').children().eq(1).removeClass().addClass(getMsgInfo.msgIconClass)
//                 }
//             }
//         })
//     }else if(e.user.code == 7){
//         $('.liveChatUserMsgContainer').remove();
//         $('.liveChatAccountMsgContainer').remove();
//         $('.liveChatDateContainer').remove();
//         chatmsgs = [];
//     }else if(e.user.code == 23){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].status = e.user.status;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 24){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].type = e.user.type;
//             window.orders[e.user.orderId].tax = e.user.tax;
//             window.orders[e.user.orderId].taxPercent = e.user.taxPercent;
//             window.orders[e.user.orderId].service = e.user.service;
//             window.orders[e.user.orderId].servicePercent = e.user.servicePercent;
//             window.orders[e.user.orderId].deliveryCost = e.user.deliveryCost;
//             window.orders[e.user.orderId].total = e.user.total;
//             window.orders[e.user.orderId].deliveryEdit_account_name = null;
//             window.orders[e.user.orderId].deliveryEdit_account_id = null;
//             window.orders[e.user.orderId].paymentMethod = null;
//             setOrderStatus(e.user.orderId,e.user.status)
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 25){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].phoneNumber = e.user.phoneNumber;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 26){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].address = e.user.address;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 27){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].deliveryCost = e.user.deliveryCost;
//             window.orders[e.user.orderId].total = e.user.total;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 28){
//         if(e.user.orderId in window.orders){
//             window.orders[e.user.orderId].discount = e.user.discount;
//             window.orders[e.user.orderId].discount_itemsTotal = e.user.discount_itemsTotal;
//             window.orders[e.user.orderId].tax = e.user.tax;
//             window.orders[e.user.orderId].service = e.user.service;
//             window.orders[e.user.orderId].total = e.user.total;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 16){
//         setOrderStatus(e.user.order.id,e.user.order.status)
//         if(e.user.order.id in window.orders){
//             window.orders[e.user.order.id] = e.user.order;
//             $('#trackOrderBtn').trigger('click');
//         }
//     }else if(e.user.code == 17){
//         window.orders[e.user.order.id] = e.user.order;
//         drawOrderHistoryCard(e.user.order,'prepend');
//     }
//     // else if(e.user.code == 5){
//     //     $('.liveChatMsgInfoAccount').each(function(){
//     //         if($(this).attr('is_delivered') == 'false' || $(this).attr('is_delivered') == false){
//     //             $(this).attr('is_delivered','true')
//     //             $(this).attr('delivered_at',e.user.now)
//     //             if(website.hour12 == true){hour12 = 1;}else{hour12 = 0;}
//     //             Timeformat =  { hour:'numeric', minute:'numeric',hour12 :hour12};
//     //             DateTimeformat = {  year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric',second:'numeric',hour12 :hour12,};
//     //             MsgSentAt = new Date(($(this).attr('sent_at')).replace(/ /g,"T"));
//     //             MsgSentAt = MsgSentAt.toLocaleString(lang,Timeformat);
//     //             deliveredAt = new Date( $(this).attr('delivered_at'));
//     //             deliveredAt = deliveredAt.toLocaleString(lang,DateTimeformat);
//     //             sentAt = new Date(($(this).attr('sent_at')).replace(/ /g,"T"));
//     //             sentAt = sentAt.toLocaleString(lang,DateTimeformat);
//     //             msgInfo = `<div style="margin-bottom:.25em">`+texts.liveChat.msgSent+` `+sentAt+`</div><div>`+texts.liveChat.msgDelivered+` `+deliveredAt+`</div>`;
//     //             $(this).attr('msgInfo',msgInfo)
//     //             // $(this).parent().parent().find('.ic-msgSent').removeClass('ic-msgSent').addClass('ic-msgDelivered');
//     //         }
//     //     })
//     // }else if(e.user.code == 6){
//     //     $('#chatIconNumber_'+websiteComponents.liveChatCard).text('');
//     //     $('#chatIconNumber_'+websiteComponents.liveChatCard).addClass('none);
//     //     $('.liveChatMsgInfoAccount').each(function(){
//     //         if($(this).attr('is_seen') == 'false' || $(this).attr('is_seen') == false){
//     //             $(this).attr('is_seen','true')
//     //             $(this).attr('seen_at',e.user.now)
//     //             if(website.hour12 == true){hour12 = 1;}else{hour12 = 0;}
//     //             Timeformat =  { hour:'numeric', minute:'numeric',hour12 :hour12};
//     //             DateTimeformat = {  year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric',second:'numeric',hour12 :hour12,};
//     //             MsgSentAt = new Date(($(this).attr('sent_at')).replace(/ /g,"T"));
//     //             MsgSentAt = MsgSentAt.toLocaleString(lang,Timeformat);
//     //             deliveredAt = new Date( $(this).attr('delivered_at'));
//     //             deliveredAt = deliveredAt.toLocaleString(lang,DateTimeformat);
//     //             sentAt = new Date(($(this).attr('sent_at')).replace(/ /g,"T"));
//     //             sentAt = sentAt.toLocaleString(lang,DateTimeformat);
//     //             seenAt = new Date(($(this).attr('seen_at')).replace(/ /g,"T"));
//     //             seenAt = seenAt.toLocaleString(lang,DateTimeformat);
//     //             msgInfo = `<div>`+texts.liveChat.msgSent+` `+sentAt+`</div><div style="margin-bottom:.25em;margin-top:.25em;">`+texts.liveChat.msgDelivered+` `+deliveredAt+`</div><div>`+texts.liveChat.msgSeen+` `+seenAt+`</div>`;
//     //             $(this).attr('msgInfo',msgInfo)
//     //             // $(this).parent().parent().find('.ic-msgSent').removeClass('ic-msgSent').addClass('ic-msgSeen');
//     //             // $(this).parent().parent().find('.ic-msgDelivered').removeClass('ic-msgDelivered').addClass('ic-msgSeen');
//     //         }
//     //     });
//     // }

//     else if(e.user.code == 10){
//         $('.logout').trigger('click');
//     }
// })
// .listenForWhisper('chat',function(e){
//     if(e.code == 2){
//         if(loginCheck && e.user == user.id){
//             $('.liveChatTyping').addClass('liveChatTyping_show')
//         }else if( !loginCheck && e.user == 'guest_'+user.id){
//             $('.liveChatTyping').addClass('liveChatTyping_show')
//         }
//     }
//     else if(e.code == 3){
//         $('.liveChatTyping').removeClass('liveChatTyping_show')
//     }
//     else if(e.code == 4){
//         CpanelAccounts[e.accountId] = e.offline;
//         checkCpanelOnlineStatus();
//     }
// })
// .listenForWhisper('ping',function(e){
//     if(loginCheck){
//         userStatusChannel.whisper('pong',{type:'user',user:{id:user.id,name:user.name}})
//     }else{
//         userStatusChannel.whisper('pong',{type:'guest',user:{id:user.id}})
//     }
// });

$.ajax({
    url:'/website/liveChat',
    type:'post',
    data:{_token:$('meta[name="csrf-token"]').attr('content'),getChats:true},
    success:function(response){

        $('#newChatMsgSound').prop('muted',true);
        chatmsgs = response.getChats;
        for(const key in chatmsgs ){
            chatMsg = chatmsgs[key];
            drawChatMsg(chatMsg,'append');
            if(chatMsg.is_delivered == false && chatMsg.author == 0){
                unDeliveredMsgs = unDeliveredMsgs + 1;
            }
            if(chatMsg.is_seen == false && chatMsg.author == 0){
                unseenmsgs = unseenmsgs + 1;
            }
        }
        if(unseenmsgs > 0 ){
            $('.liveChatIconNumber').addClass('chatIconNewMsg')
            $('.liveChatIconNumber').text(unseenmsgs);
            $('.liveChatIconNumber').removeClass('none');
        }else{
            $('.liveChatIconNumber').addClass('none');
        }
        if(Object.keys(chatmsgs).length < 30){
            drawChatBodyTop();
        }
        if(unDeliveredMsgs > 0 ){
            $.ajax({
                url:'/website/liveChat',
                type:'post',
                data:{_token:$('meta[name="csrf-token"]').attr('content'),setAsDelivered:true},
                success:function(response){
                    $('.liveChatMsgInfoAccount').each(function(){
                        for(const key in chatmsgs){
                            if($(this).attr('msgId') == chatmsgs[key]._id && chatmsgs[key].is_delivered == false){
                                chatmsgs[key].delivered_at = response.user.now;
                                chatmsgs[key].is_delivered = true;
                                $(this).attr('tooltip',getChatMsgInfo(chatmsgs[key]).msgInfo)
                            }
                        }
                    })
                }
            })
        }
    }
})


////////////events
    $(window).focus(function(){
        if(unseenmsgs > 0 && !$('.liveChatContainer').hasClass('none')){
            $.ajax({
                url:'/website/liveChat',
                type:'post',
                data:{_token:$('meta[name="csrf-token"]').attr('content'),setAsSeen:true},
                success:function(response){
                    $('.liveChatMsgInfoAccount').each(function(){
                        for(const key in chatmsgs){
                            if($(this).attr('msgId') == chatmsgs[key]._id && chatmsgs[key].is_seen == false){
                                chatmsgs[key].seen_at = response.seen_at;
                                chatmsgs[key].is_seen = true;
                                $(this).attr('tooltip',getChatMsgInfo(chatmsgs[key]).msgInfo)
                            }
                        }
                        unseenmsgs = 0;
                    })
                    $('.liveChatIconNumber').text('')
                    $('.liveChatIconNumber').addClass('none');
                }
            });
        }
    })
    $('#liveChatIcon').on('click',function(){
        $('.liveChatIconNumber').removeClass('chatIconNewMsg')
        if(!website.guestLiveChat && !loginCheck){
            showPopup($('#login-popup'),$('#login-email'),function(){
                $('.loginInput').removeClass('inputError')
                $('#loginFail').addClass('vH')
                $('#signupSuccess').addClass('vH')
                $('#loginWarning').text(texts.liveChat.loginToChat).removeClass('vH')
            })
            return;
        }
        showLiveChatWindow();
        if(unseenmsgs > 0){
            $.ajax({
                url:'/website/liveChat',
                type:'post',
                data:{_token:$('meta[name="csrf-token"]').attr('content'),setAsSeen:true},
                success:function(response){
                    $('.liveChatMsgInfoAccount').each(function(){
                        for(const key in chatmsgs){
                            if($(this).attr('msgId') == chatmsgs[key]._id && chatmsgs[key].is_seen == false){
                                chatmsgs[key].seen_at = response.seen_at;
                                chatmsgs[key].is_seen = true;
                                $(this).attr('tooltip',getChatMsgInfo(chatmsgs[key]).msgInfo)
                            }
                        }
                        unseenmsgs = 0;
                    })
                    $('.liveChatIconNumber').text('')
                    $('.liveChatIconNumber').addClass('none');
                }
            });
        }
    });
    $('#liveCloseChat').on('click',function(){
        hideLiveChatWindow();
    })
    $('#liveChatmsgInput').on('keypress',function(e){
        if(e.which == 13){
            e.preventDefault();
            if($('#liveChatmsgInput').val() != ''){
                sendChatMsg();
            }
        }
    })
    $('#liveChatmsgBtn').on('click',function(){
        if($('#liveChatmsgInput').val() != ''){
            sendChatMsg();
        }
    })
    $('#liveChatBody').on('scroll',function(){
        $('.liveChatMsgCard').each(function(){
            if($(this).position().top > 0 && $(this).position().top < $(this).outerHeight()){
                for(const key in chatmsgs){
                    if($(this).attr('msgId') == chatmsgs[key]._id){
                        $('.liveChatFixedDate').text(getChatMsgInfo(chatmsgs[key]).msgDate)

                    }
                }
            }

        })
        if($(this).scrollTop() == 0 || $(this).scrollTop() > -5){
            $('.liveChatFixedDate').removeClass('liveChatFixedDate_show');
            $('.liveChatScrollToTop').removeClass('liveChatScrollToTop_show');
        }else if((($(this).scrollTop() - $(this)[0].offsetHeight ) * - 1 ) + 20 > ($(this)[0].scrollHeight ) ){
            $('.liveChatFixedDate').removeClass('liveChatFixedDate_show');
            $('.liveChatScrollToTop').addClass('liveChatScrollToTop_show');
        }else{
            $('.liveChatFixedDate').addClass('liveChatFixedDate_show');
            $('.liveChatScrollToTop').addClass('liveChatScrollToTop_show');
        }

        if((($(this).scrollTop() - $(this)[0].offsetHeight )* - 1 ) > ($(this)[0].scrollHeight - 100) && getMoreChats == true && noMoreChats == false){
            $('#liveChatLoading').removeClass('none')
            getMoreChats = false;
            let lastMSg;
            for(const key in chatmsgs){
                if($('#liveChatBody').children().last().attr('msgId') == chatmsgs[key]._id){
                    lastMSg = chatmsgs[key];
                }
            }
            $.ajax({
                url:'/website/liveChat',
                type:'post',
                data:{
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    getMoreChatMsgs:lastMSg.sent_at,
                    lastMsgId:lastMSg._id,
                },
                success:function(response){
                    $('#liveChatLoading').addClass('none')
                    for(const key in response ){
                        chatmsgs.push(response[key])
                        drawChatMsg(response[key],'append');
                    }
                    if(Object.keys(response).length == 0){
                        noMoreChats = true;
                        if( $('.liveChatBodyTop').length == 0){
                            drawChatBodyTop();
                        }
                    }
                }
            }).done(function(){
                getMoreChats = true;
            })
        }
    })

    $('.liveChatScrollToTop').on('click',function(){
        $('#liveChatBody').animate({scrollTop:0},500);
    });

    $('#liveChatBody').on('mouseover','.liveChatUserMsgContainer',function(e){
        e.stopImmediatePropagation();
        $(this).find('.liveChatMsgInfoIconsContainer').removeClass('vH');
    })
    $('#liveChatBody').on('mouseleave','.liveChatUserMsgContainer',function(e){
        e.stopImmediatePropagation();
        $(this).find('.liveChatMsgInfoIconsContainer').addClass('vH');
    })
    $('#liveChatBody').on('mouseover','.liveChatAccountMsgContainer',function(e){
        e.stopImmediatePropagation();
        $(this).find('.liveChatMsgInfoIconsContainer').removeClass('vH');
    })
    $('#liveChatBody').on('mouseleave','.liveChatAccountMsgContainer',function(e){
        e.stopImmediatePropagation();
        $(this).find('.liveChatMsgInfoIconsContainer').addClass('vH');
    })

    $('#liveChatBody').on('click','.liveChatDeleteMsg',function(e){
        e.stopImmediatePropagation();
        let message;
        for(const key in chatmsgs){
            if($(this).attr('msgId') == chatmsgs[key]._id){
                msgToDelete = chatmsgs[key];
            }
        }
        if(msgToDelete.message.startsWith('p@')){
            message = drawChatProduct(msgToDelete.message);
        }else if(msgToDelete.message.startsWith('o@')){
            message = drawChatOrder(msgToDelete.message);
        }else{
            message = `<div class="p-5">`+msgToDelete.message+`</div>`;
        }

        $('#deleteChatMsg-popup').find('.liveChatUserMsgText').html(message)
        $('#deleteChatMsg-popup').find('.liveChatUserMsgInfo').children().first().text(getChatMsgInfo(msgToDelete).MsgSentAt)
        $('#deleteChatMsg-popup').find('.liveChatUserMsgInfo').children().eq(1).addClass(getChatMsgInfo(msgToDelete).msgIconClass)
        showPopup($('#deleteChatMsg-popup'))
    })
    $('#deleteChatMsg-cancel').on('click',function(){
        msgToDelete = null;
        hidePopup();
    })
    $('#deleteChatMsg-delete').on('click',function(){
        showLoading($('#deleteChatMsg-Loading'))
        $.ajax({
            url:'/website/liveChat',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                deleteChatMessage:msgToDelete._id,
            },
            success:function(response){
                hideLoading($('#deleteChatMsg-Loading'))
                // $('.liveChatMsgCard').each(function(){
                    for(const key in chatmsgs){
                        if(chatmsgs[key]._id == msgToDelete._id){
                            chatmsgs[key].message = 'Deleted message';
                            chatmsgs[key].is_deleted = true;
                            chatmsgs[key].deleted_at = response.now;
                            let getMsgInfo = getChatMsgInfo(chatmsgs[key]);
                            // if($(this).attr('msgId') == msgToDelete._id){
                                $('.liveChatUserMsgContainer[msgId="'+chatmsgs[key]._id +'"').text('')
                                $('.liveChatUserMsgContainer[msgId="'+chatmsgs[key]._id +'"').append(
                                    $('<div/>',{
                                        class:'liveChatUserMsgContainer',
                                        msgId:chatmsgs[key]._id  ,
                                    }).append(
                                        $('<div/>',{
                                            class:' liveChatMsgInfoIconsContainer',
                                        }).append(
                                            $('<span/>',{
                                                class:'ic-info liveChatMsgInfo liveChatMsgInfoUser m-2',
                                                msgId:chatmsgs[key]._id,
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
                                    )
                                );
                            // }
                        }
                        hidePopup();
                    }

                // });
                msgToDelete = null;
            }
        })
    })



    $('#liveChatBody').on('click','.liveChatDeleteTempMsg',function(e){
        $('.liveChatMsgCard[msgId="'+$(this).attr('msgId')+'"]').remove();
    })
    $('#liveChatBody').on('click','.liveChatResendMsg',function(e){
        $('#liveChatmsgInput').val($(this).attr('message'));
        $('.liveChatMsgCard[msgId="'+$(this).attr('msgId')+'"]').remove();
        sendChatMsg();
    });
    sendingChatMsgsLimiterCheck = 0;
    setInterval(function(){
        sendingChatMsgsLimiterCheck = 0;
        $('.liveChatSendingMsgCoolDown').removeClass('liveChatSendingMsgCoolDown_show');
    },30000)


    $('#liveChatCardSendBtn').on('click',function(){
        e.stopImmediatePropagation();
        sendChatMsg();
        clearTimeout(typingCheckerTimeout);
        typingChecker = false;
        // userStatusChannel
        // .whisper('chat',{code:3,user:user.id})
    })
    $('#liveChatInputText').on('keypress',function(e){
        e.stopImmediatePropagation();
        if(e.which == 13) {
            sendChatMsg();
            clearTimeout(typingCheckerTimeout);
            typingChecker = false;
            // userStatusChannel
            // .whisper('chat',{code:3,user:user.id})
        }
    })
    $('#liveChatmsgInput').on('input',function(e){
        e.stopImmediatePropagation();
        if(typingChecker == false){
            clearTimeout(typingCheckerTimeout);
            typingChecker = true;
            $.ajax({
                url:'/website/liveChat',
                type:'post',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    typing:true,
                }
            })
            typingCheckerTimeout = setTimeout(function(){
                typingChecker = false;
            },3000);
        }
        // if(typingChecker == false){
        //     if(loginCheck){
        //         clearTimeout(typingCheckerTimeout);
        //         // userStatusChannel
        //         // .whisper('chat',{code:2,user:user.id})
        //         typingChecker = true;
                // typingCheckerTimeout = setTimeout(function(){
                //     // userStatusChannel
                //     // .whisper('chat',{code:3,user:user.id})
                //     typingChecker = false;
                // },3000);
        //     }else{
        //         clearTimeout(typingCheckerTimeout);
        //         // userStatusChannel
        //         // .whisper('chat',{code:2,user:'guest_'+user.id})
        //         typingChecker = true;
        //         typingCheckerTimeout = setTimeout(function(){
        //             // userStatusChannel
        //             // .whisper('chat',{code:3,user:'guest_'+user.id})
        //             typingChecker = false;
        //         },3000);
        //     }

        // }
    });
// }


