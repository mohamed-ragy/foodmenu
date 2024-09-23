checkUseenNotifications = function(codes,notificationKey,val){
    let seenIds = [];
    for(const key in website.notifications_unseen){
        if(codes.includes(website.notifications_unseen[key].code) && website.notifications_unseen[key][notificationKey] == val){
            seenIds.push(website.notifications_unseen[key]._id)
        }
    }
    if(seenIds.length > 0){
        $.ajax({
            url:'notifications',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                notificationsSeen:true,
                seenIds:seenIds,
            },success:function(r){
                if(r.notificationsSeenStat == 1){
                    for(const key in website.notifications){
                        if(seenIds.includes(website.notifications[key]._id)){
                            website.notifications[key].seen = true;
                        }
                    }
                    for(const key in seenIds){
                        for(const key2 in website.notifications_unseen){
                            if(website.notifications_unseen[key2] == seenIds[key]){website.notifications_unseen.splice(key2,1)}
                        }
                        $(`.notificationContainer[notification=${seenIds[key]}]`).removeClass('notificationContainer_unseen').find('.unSeenNotificationDot').addClass('none');
                        window.pageNotifications.notifications = window.pageNotifications.notifications - 1;
                        cpanelTitle(false);
                    }
                }
            }
        })
    }
}
drawNotification = function(notification,append){
    $('.notificationContainer_loading').remove();
    let thisNotification;
    let containerClass = '';
    let icon = '';
    let notificationsMsg = '';
    let unseenDotClass = 'vH';
    let attrs = {};
    let cpPage = null;
    let popupPage = null;
    let user = texts.cpanel.public.aGuest;
    notification.user_id != null ? user = `<span>${notification.userName}</span>` : null;
    switch(notification.code){
        case 'orders.new_order_user':
            icon = 'ico-orders';
            containerClass = 'popupPage';
            popupPage = 'order';
            attrs.order = notification.order_id;
            notificationsMsg = texts.cpanel.notifications.newOrder_msg.replace(':order:',`#${notification.order_number}`).replace(':user:',user);
        break;
        case 'orders.delivered_by_delivery':
            icon = 'ico-delivery_accounts';
            containerClass = 'popupPage';
            popupPage = 'order';
            attrs.order = notification.order_id;
            notificationsMsg = texts.cpanel.notifications.orderDelivered_msg.replace(':order:',`#${notification.order_number}`).replace(':delivery:',notification.deliveryName.split('@')[0]);
        break;
        case 'orders.canceled_by_user':
            icon = 'ico-no';
            containerClass = 'popupPage';
            popupPage = 'order';
            attrs.order = notification.order_id;
            notification.user_id != null ? user = notification.userName : null;
            notificationsMsg = texts.cpanel.notifications.orderCanceled_msg.replace(':order:',`#${notification.order_number}`).replace(':user:',user);
        break;
        case 'user.signup':
            icon = 'ico-user';
            containerClass = 'popupPage';
            popupPage = 'user';
            attrs.user = notification.user_id;
            notificationsMsg = texts.cpanel.notifications.newUser_msg.replace(':user:',notification.userName)
        break;
        case 'review.posted':
            icon = 'ico-product_reviews';
            containerClass = 'popupPage';
            popupPage = 'review';
            attrs.review = notification.product_review_id;
            notificationsMsg = texts.cpanel.notifications.newReview_msg.replace(':user:',user).replace(':product:',`<span>${notification.productName}</span>`).replace(':review:',`<span>${texts.cpanel.notifications.review}</span>`)
        break;
        case 'review.posted_survey':
            icon = 'ico-product_reviews'
            containerClass = 'cpPage';
            cpPage = 'product_reviews';
            attrs.user = notification.user_id;
            if(notification.reviewsSum > 1){
                notificationsMsg = texts.cpanel.notifications.collectReviews_msg.replace(':user:',notification.userName).replace(':txt:',texts.cpanel.notifications.reviews.replace(':reviewsSum:',notification.reviewsSum));
            }else if(notification.reviewsSum == 1){
                notificationsMsg = texts.cpanel.notifications.collectReviews_msg.replace(':user:',notification.userName).replace(':txt:',texts.cpanel.notifications.review);
            }
        break;
        case 'system.ticket_reply':
            icon = 'ico-support';
            containerClass = 'popupPage';
            popupPage = 'ticket_browser';
            attrs.ticket = notification.ticket_id;
            notificationsMsg = texts.cpanel.notifications.helpTicket_msg.replace(':ticket:',notification.ticket_id)
        break;
        case 'system.financial_report':
            icon = 'ico-money';
            containerClass = 'open_financial_report';
            attrs.report = notification.financialReport_id;
            attrs.year = notification.year;
            attrs.month = notification.month;
            let reportDate = getDate(Date.parse(new Date(notification.year,notification.month,0)) / 1000);
            notificationsMsg = texts.cpanel.notifications.financialReport_msg.replace(':date:',`<B>${reportDate.month_short.restaurant} ${reportDate.year.restaurant}</B>`)
        break;
        case 'system.subaccount_blocked':
            icon = 'ico-warning cO';
            containerClass = 'cpPage';
            cpPage = 'sub_accounts'
            attrs.scrollToElem = `subaccount_table_row_${notification.subaccount_id}`;
            attrs.selectElem = `subaccount_table_row_${notification.subaccount_id}`;
            notificationsMsg = texts.cpanel.notifications.subaccountBlocked_msg.replace(':subaccount:',`<span>  ${notification.subaccount_name}</span>`)
        break;
        case 'system.statistics_day.created':
            icon = 'ico-statistics_and_analytics';
            containerClass = 'cpPage';
            cpPage = 'statistics_and_analytics'
            attrs.day1 = notification.day;
            attrs.month1 = notification.month;
            attrs.year1 = notification.year;
            notificationsMsg = texts.cpanel.notifications.statistics_day_created_msg.replace(':date:',`<span>${getDate(Date.parse(new Date(notification.year,notification.month - 1,notification.day,10,10)) / 1000).date.restaurant}</span>`)
        break;

    }
    !notification.seen ? unseenDotClass = '' : 'none';
    !notification.seen ? containerClass = `${containerClass} notificationContainer_unseen` : null;
    thisNotification = $('<div/>',{
        notification:notification._id,
        class:`notificationContainer ${containerClass}`,
        popupPage:popupPage,
        cpPage:cpPage,
    }).append(
                $('<div/>',{class:`notificationIcon ${icon}`}),
                $('<div/>',{class:'notificationBody'}).append(
                    $('<div/>',{class:'mB10 fs085',html:notificationsMsg}),
                    $('<div/>',{class:'c_white-10 fs07 alnsE diffTimeCalc',time:notification.created_at})
                ),
                $('<div/>',{class:`${unseenDotClass} unSeenNotificationDot`})
    )
    append == 'append' ? $('#notificationsListConainer').append(thisNotification) :append == 'prepend' ? $('#notificationsListConainer').prepend(thisNotification) : null ;
    for(const key in attrs){thisNotification.attr(key,attrs[key])}

}

let getMoreNotificationsCheck = true;
let noMoreNotifications = false;

$('#notificationsList').on('scroll',function(e){
    e.stopImmediatePropagation();
    if($('#notificationsList')[0].scrollHeight - $('#notificationsList').scrollTop() < $('#notificationsList').innerHeight() + 1){
        getNotifications();
    }
});
/////
$('#notifications').on('click',function(e){
    // e.stopImmediatePropagation();
    if(window.waitFor_loadWebsiteOrdersAndChats){return;}
    if(!window.notificationsFirstLoad){
        $('#notificationsListConainer').text('')
        getNotifications();
    }
})
drawNotifications_loading = function(){
    for(i=0;i<5;i++){
        $('#notificationsListConainer').append(
            $('<div/>',{class:'notificationContainer_loading'}).append(
                $('<div/>',{class:'cardLoading h30 w30 br50p'}),
                $('<div/>',{class:'cardLoading h10 w200 mX10 br10'}),
            )
        )
    }
}
getNotifications = function(){
    if(!window.notificationsFirstLoad){
        getMoreNotificationsCheck = true;
        noMoreNotifications = false;
    }
    if(!getMoreNotificationsCheck || noMoreNotifications){return;}
    getMoreNotificationsCheck = false;
    drawNotifications_loading();
    let lastNotification_id = 0;
    let lastNotification_created_at = Date.parse(new Date()) / 1000;
    if(website.notifications.length > 0){
        lastNotification_id = website.notifications[website.notifications.length - 1]._id;
        lastNotification_created_at = website.notifications[website.notifications.length - 1].created_at;
    }
    $.ajax({
        url:'notifications',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getNotifications:true,
            lastNotification_id:lastNotification_id,
            lastNotification_created_at:lastNotification_created_at,
        },
        success:function(r){
            window.notificationsFirstLoad = true;
            if(r.notifications.length == 0){noMoreNotifications = true;$('.notificationContainer_loading').remove();}
            if(r.notifications.length == 0 && website.notifications == 0){
                $('#notificationsListConainer').text('').append($('<div/>',{class:'notificationContainer_loading fs085 mX10 w100p-20',text:texts.cpanel.notifications.noNotifications}))
            }
            for(const key in r.notifications){
                website.notifications.push(r.notifications[key])
                const notification = r.notifications[key];
                drawNotification(r.notifications[key],'append');
            }
        }
    }).done(function(){
        getMoreNotificationsCheck = true;
    })

}
setCpanelChannel = function(){
    window.cpanelChannel.listen(`cpanelChannel`,function(r){
        if('activity' in r.notification){drawActivityLog(r.notification.activity,true,'prepend')}
        handelCpanelChannel(r.notification.notification,r.notification.code)
    })
}
handelCpanelChannel = function(n,code){
    if(code.split('.')[0] == 'system' && account.is_master != 1){return;}
    if(code.split('.')[0] == 'settings' && account.authorities[4] != 1){return;}
    if(code.split('.')[0] == 'user' && account.authorities[2] != 1){return;}
    if(code.split('.')[0] == 'liveChat' && account.authorities[5] != 1){return;}
    if(code.split('.')[0] == 'category' && account.authorities[1] != 1){return;}
    if(code.split('.')[0] == 'product' && account.authorities[1] != 1){return;}
    if(code.split('.')[0] == 'option' && account.authorities[1] != 1){return;}
    if(code.split('.')[0] == 'selection' && account.authorities[1] != 1){return;}
    if(code.split('.')[0] == 'review' && account.authorities[1] != 1){return;}
    if(code.split('.')[0] == 'img' && account.authorities[3] != 1){return;}
    if(code.split('.')[0] == 'orders' && account.authorities[0] != 1){return;}
    let notificationsMsg = '';
    console.log(n)
    switch(code){
        case '0':
            if(n.account_id == account.id){
                // showPopup('loginDetected');
                // setTimeout(function(){
                //     $('#logoutForm').trigger('submit');
                // },5000)
            }
        break;
        case '00':
            //reload after 10 sec
            ReloadForUpdatePopup();
        break;
        case '000':
            $('#logoutForm').trigger('submit');
        break;
        case 'reload.update':
            //reload after 2 min
            ReloadForUpdate();
        break;
        case 'reload.update.account':
            //reload after 10 sec
            if(account.id == n.account_id){
                ReloadForUpdatePopup();
            }
        break;
        case 'website.offline':
            website.active = false;
            checkWebsiteStatus();
            window.guideHints.websiteSwitch();
        break;
        case 'website.online':
            website.active = true;
            checkWebsiteStatus();
            window.guideHints.websiteSwitch();
        break;

        /////system
        case 'system.subaccount_blocked':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.subaccountBlocked_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            notificationsMsg = texts.cpanel.notifications.subaccountBlocked_msg.replace(':subaccount:',`<span><a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${n.notification.subaccount_id}">${n.notification.subaccount_name}</a></span>`)
            showAlert('normal',notificationsMsg,4000,true);

            let subaccount = website.accounts.find(i=> i.id == n.notification.subaccount_id);
            if(typeof(subaccount) !== 'undefined'){
                subaccount.password_fails = n.password_fails;
                drawSubAccountsTable();
            }
            website.notifications_unseen.push(n.notification)
            window.guideHints.subaccountsBlockCheck()
        break;
        case 'system.paymentMethod_update':
            website.payment_methods_count = n.paymentmethodsCount;
            window.guideHints.subscriptionCheck();
        break;
        case 'system.financial_report':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.financialReport_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            let reportDate = getDate(Date.parse(new Date(n.notification.year,n.notification.month,0)) / 1000);
            notificationsMsg = texts.cpanel.notifications.financialReport_msg.replace(':date:',`<span><a class="open_financial_report" year="${n.notification.year}" month="${n.notification.month}" report="${n.notification.financialReport_id}">${reportDate.month_short.restaurant} ${reportDate.year.restaurant}</a></span>`)
            showAlert('normal',notificationsMsg,4000,true);
            if(window.history.state.page == 'financial_reports'){
                getFinancialReports(1)
            }
            website.notifications_unseen.push(n.notification)
        break;
        case 'system.ticket_reply':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.helpTicket_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            notificationsMsg = texts.cpanel.notifications.helpTicket_msg.replace(':ticket:',`<span><a class="popupPage" popupPage="ticket_browser" ticket="${n.notification.ticket_id}">${n.notification.ticket_id}</a></span>`)
            showAlert('normal',notificationsMsg,4000,true);
            $(`.ticketStatus-${n.notification.ticket_id}`).text(texts.support.ticketPending).addClass('ticketStatusTag_pending')
            if(window.history.state.popupPage == 'ticket_browser' && window.history.state.ticket == n.notification.ticket_id){
                appendNewTicketMsg(n.reply,'append');
                scrollToDiv($('#popupPageBody'),$('#ticketBrowserInputContainer'))
            }
            website.notifications_unseen.push(n.notification)
        break;
        case 'system.ticket_solved':
            $(`.ticketStatus-${n.ticket_id}`).text(texts.support.ticketSolved).removeClass('ticketStatusTag_pending').addClass('ticketStatusTag_solved')
            if(window.history.state.popupPage == 'ticket_browser' && window.history.state.ticket == n.ticket_id){
                $('#ticketBrowserInputContainer').text('');
            }
        break;
        case 'system.statistics_day.created':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.statistics_day_created_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            notificationsMsg = texts.cpanel.notifications.statistics_day_created_msg.replace(':date:',`<span><a class="cpPage" cpPage="statistics_and_analytics" day1="${n.notification.day}" month1="${n.notification.month}" year1="${n.notification.year}">${getDate(Date.parse(new Date(n.notification.year,n.notification.month - 1,n.notification.day,10,10)) / 1000).date.restaurant}</a></span>`)
            showAlert('normal',notificationsMsg,4000,true);
            website.notifications_unseen.push(n.notification)
        break;
        /////live chat
        case 'liveChat.typing':
            clearTimeout(window.usersTypingTimeouts[`${n.type}-${n.id}`]);
            $(`#chatWindow-${n.type}-${n.id}`).find('.chatWindowTyping').addClass('chatWindowTyping_show');
            window.usersTypingTimeouts[`${n.type}-${n.id}`] = setTimeout(function(){
                $(`#chatWindow-${n.type}-${n.id}`).find('.chatWindowTyping').removeClass('chatWindowTyping_show');
            },3000)
        break;
        case 'liveChat.new_msg_by_user':
            clearTimeout(window.usersTypingTimeouts[`${n.type}-${n.id}`]);
            newMsgFromUser(n.type,n.id,n.msg)
            $(`#chatWindow-${n.type}-${n.id}`).find('.chatWindowTyping').removeClass('chatWindowTyping_show');
            window.pageNotifications.titleAlert = texts.cpanel.liveChat.newMsgTitleAlert
            cpanelTitle(true);
        break;
        case 'liveChat.new_msg_by_account':
            newMsgFromAccount(n.type,n.id,n.msg)
        break;
        case 'liveChat.seen_by_account':
            setChatAsSeen_apply(n.type,n.id);
        break;
        case 'liveChat.seen_by_user':
            msgsSeenByUser(n.type,n.id,n.seen_at)
        break;
        case 'liveChat.msg_deleted_by_user':
            if(typeof(window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId)) !== 'undefined'){
                window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId).is_deleted = true;
                window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId).deleted_at = n.now;
                window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId).message = '--';
            }
            $(`#chatWindow-${n.type}-${n.id}`).find(`.ChatWindowMsgCard[msgId="${n.msgId}"]`).find('.chatWindowMsgText_user').text('').html(drawDeletedMsg())
            $(`#chatWindow-${n.type}-${n.id}`).find(`.ChatWindowMsgCard[msgId="${n.msgId}"]`).find('.chatWindowMsgInfo').attr('tooltip',chatMsgTooltip(window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId)))
            if(typeof(website.users.find(item=>item.id == n.id)) !== 'undefined'){
                if(website.users.find(item=>item.id == n.id).lastMsg_id == n.msgId){
                    website.users.find(item=>item.id == n.id).last_msg.is_deleted = true;
                    website.users.find(item=>item.id == n.id).last_msg.deleted_at = n.now;
                    website.users.find(item=>item.id == n.id).last_msg.message = '--';
                }
            }
            if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                drawUsersChatBoxes();
            }
            if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
                drawGuestsChatBoxes();
            }
        break;
        case 'liveChat.msg_deleted_by_account':
            if(typeof(window.chatMsgs[`${n.type}-${n.id}`]) === 'undefined'){return;}
            if(typeof(window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId)) !== 'undefined'){
                window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId).is_deleted = true;
                window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId).deleted_at = n.now;
                window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId).deleted_by = n.deleted_by;
                window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId).message = '--';
            }
            if(n.type == 'user'){
                if(typeof(website.users.find(item=>item.id == n.id)) !== 'undefined'){
                    if(website.users.find(item=>item.id == n.id).lastMsg_id == n.msgId){
                        website.users.find(item=>item.id == n.id).last_msg.is_deleted = true;
                        website.users.find(item=>item.id == n.id).last_msg.deleted_at = n.now;
                        website.users.find(item=>item.id == n.id).last_msg.deleted_by = n.deleted_by;
                        website.users.find(item=>item.id == n.id).last_msg.message = '--';
                    }
                }

                if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                    drawUsersChatBoxes();
                }
            }
            if(n.type == 'guest'){
                if(website.guests.find(item=>item.id == n.id).lastMsg_id == n.msgId){
                    website.guests.find(item=>item.id == n.id).last_msg.deleted_at = n.now;
                    website.guests.find(item=>item.id == n.id).last_msg.is_deleted = true;
                    website.guests.find(item=>item.id == n.id).last_msg.deleted_by = n.deleted_by;
                    website.guests.find(item=>item.id == n.id).last_msg.message = '--';
                    if($('#showGuestsChatBoxes').hasClass('usersGuestsChat_selected')){
                        drawGuestsChatBoxes();
                    }
                }
            }
            $(`#chatWindow-${n.type}-${n.id}`).find(`.ChatWindowMsgCard[msgId="${n.msgId}"]`).find('.chatWindowMsgText_account').text('').html(drawDeletedMsg())
            $(`#chatWindow-${n.type}-${n.id}`).find(`.ChatWindowMsgCard[msgId="${n.msgId}"]`).find('.chatWindowDeleteMsg').remove();
            $(`#chatWindow-${n.type}-${n.id}`).find(`.ChatWindowMsgCard[msgId="${n.msgId}"]`).find('.chatWindowMsgInfo').attr('tooltip',chatMsgTooltip(window.chatMsgs[`${n.type}-${n.id}`].find(item=>item._id == n.msgId)))
        break;
        case 'liveChat.deleteAll':
            if(window.getFirstChatsCheck){
                if(n.type == 'user'){
                    website.users.find(item=>item.id == n.userId).last_msg = null;
                    website.users.find(item=>item.id == n.userId).lastMsg_id = null;
                    for(const key in window.chatBoxes.users){
                        if(window.chatBoxes.users[key].user_id == n.userId){
                            window.chatBoxes.users.splice(key,1)
                        }
                    }
                    for(const key in window.unSeenChats_users){
                        if(window.unSeenChats_users[key] == n.userId){
                            window.unSeenChats_users.splice(key,1)
                        }
                    }
                    drawUsersChatBoxes();
                }else if(n.type == 'guest'){
                    website.guests.find(item=>item.id == n.userId).last_msg = null;
                    website.guests.find(item=>item.id == n.userId).lastMsg_id = null;
                    for(const key in window.chatBoxes.guests){
                        if(window.chatBoxes.guests[key].guest_id == n.userId){
                            window.chatBoxes.guests.splice(key,1)
                        }
                    }
                    for(const key in window.unSeenChats_guests){
                        if(window.unSeenChats_guests[key] == n.userId){
                            window.unSeenChats_guests.splice(key,1)
                        }
                    }
                    drawGuestsChatBoxes();
                }
                delete window.chatMsgs[`${n.type}-${n.userId}`]
                $(`#chatWindow-${n.type}-${n.userId}`).remove();
                $(`.chatUnseen-${n.type}-${n.userId}`).addClass('none');
                cpanelTitle(false)
            }
        break;
        /////settings
        case 'settings.country':
            website.country_code = n.country;
            website_temp.country_code = n.country;
            $('#system-countryCancelBtn').trigger('click');
            $('#system-countryFlag').attr('src','storage/imgs/flags/'+website.country_code +'.png');
            break;
        case 'settings.systemSettings':
            if(n.useDelivery == 1){website.useDelivery = true;website_temp.useDelivery = true}else{website.useDelivery = false;website_temp.useDelivery = false}
            if(n.usePickup == 1){website.usePickup = true;website_temp.usePickup = true}else{website.usePickup = false;website_temp.usePickup = false}
            if(n.productReviews == 1){website.productReviews = true;website_temp.productReviews = true}else{website.productReviews = false;website_temp.productReviews = false}
            if(n.guestReviews == 1){website.guestReviews = true;website_temp.guestReviews = true}else{website.guestReviews = false;website_temp.guestReviews = false}
            if(n.collectReviews == 1){website.collectReviews = true;website_temp.collectReviews = true}else{website.collectReviews = false;website_temp.collectReviews = false}
            if(n.guestOrders == 1){website.guestOrders = true;website_temp.guestOrders = true}else{website.guestOrders = false;website_temp.guestOrders = false}
            if(n.acceptPickupOrders24 == 1){website.acceptPickupOrders24 = true;website_temp.acceptPickupOrders24 = true}else{website.acceptPickupOrders24 = false;website_temp.acceptPickupOrders24 = false}
            if(n.acceptDeliveryOrders24 == 1){website.acceptDeliveryOrders24 = true;website_temp.acceptDeliveryOrders24 = true}else{website.acceptDeliveryOrders24 = false;website_temp.acceptDeliveryOrders24 = false}
            if(n.discountAnnouncement == 1){website.discountAnnouncement = true;website_temp.discountAnnouncement = true}else{website.discountAnnouncement = false;website_temp.discountAnnouncement = false}
            if(n.cancelOrder == 1){website.cancelOrder = true;website_temp.cancelOrder = true}else{website.cancelOrder = false;website_temp.cancelOrder = false}
            if(n.dineinWorkingHours == 1){website.dineinWorkingHours = true;website_temp.dineinWorkingHours = true}else{website.dineinWorkingHours = false;website_temp.dineinWorkingHours = false}
            if(n.liveChat == 1){website.liveChat = true;website_temp.liveChat = true}else{website.liveChat = false;website_temp.liveChat = false}
            if(n.guestLiveChat == 1){website.guestLiveChat = true;website_temp.guestLiveChat = true}else{website.guestLiveChat = false;website_temp.guestLiveChat = false}
            if(n.cookies_msg == 1){website.cookies_msg = true;website_temp.cookies_msg = true}else{website.cookies_msg = false;website_temp.cookies_msg = false}
            if(n.langPopup == 1){website.langPopup = true;website_temp.langPopup = true}else{website.langPopup = false;website_temp.langPopup = false}
            if(n.fastLoading == 1){website.fastLoading = true;website_temp.fastLoading = true}else{website.fastLoading = false;website_temp.fastLoading = false}
            website.printerWidth = n.printerWidth;
            website_temp.printerWidth = n.printerWidth;
            website.cart_lifeTime = n.cart_lifeTime;
            website_temp.cart_lifeTime = n.cart_lifeTime;
            if(window.history.state.page == 'system'){
                calcCartLifeTime();
                $('#systemSettingsCancelBtn').trigger('click');
            }
            break;
        case 'settings.timeZone':
            website.timeZone = n.timeZone;
            website_temp.timeZone = n.timeZone;
            if(n.hour12 == 1){website.hour12 = true;website_temp.hour12 = true}else{website.hour12 = false;website_temp.hour12 = false}
            $('#system-timeZoneCancelBtn').trigger('click');
            break;
        case 'settings.websiteIcon':
            $('#settings-websiteIconImg').attr('src',n.icon);
            website.icon = n.icon;
            website.icon_id = n.icon_id;
            window.guideHints.websiteIcon();
            break;
        case 'settings.websiteLogo':
            $('#settings-websiteLogoImg').attr('src',n.logo);
            website.logo = n.logo
            website.logo_id = n.logo_id;
            window.guideHints.websiteLogo();
            break;
        case 'settings.websiteMetaImg':
            $('#settings-websiteMetaImgImg').attr('src',n.metaImg);
            website.metaImg = n.metaImg
            website.metaImg_id = n.metaImg_id;
            window.guideHints.websiteMetaImg();
            break;
        case 'settings.websiteName':
            website.websiteNames = n.websiteNames;
            website_temp.websiteNames = n.websiteNames;
            $('#setting-restaurantName-CancelBtn').trigger('click');
            window.guideHints.websiteNames();
            break;
        case 'settings.restaurantEmail':
            website.restaurantEmail = n.restaurantEmail;
            website_temp.restaurantEmail = n.restaurantEmail;
            $('#settings-restaurantEmailCancelBtn').trigger('click')
            window.guideHints.restaurantEmail();
            break;
        case 'settings.websiteDescription':
            website.websiteDescriptions = n.websiteDescriptions;
            website_temp.websiteDescriptions = n.websiteDescriptions;
            $('#settings-websiteDescriptionCancelBtn').trigger('click');
            window.guideHints.websiteDescriptions();
        break;
        case 'settings.websitePhoneNumbers':
            website.phoneNumbers = n.phoneNumbers;
            website_temp.phoneNumbers = n.phoneNumbers;
            $('#setting-phoneNumberCancelBtn').trigger('click');
            window.guideHints.websitePhoneNumbers();
        break;
        case 'settings.websiteAddresses':
            website.addresses = n.addresses;
            website_temp.addresses = n.addresses;
            $('#setting-websiteAddressCancelBtn').trigger('click');
            window.guideHints.websiteAddressess();
        break;
        case 'settings.restaurantLocation':
            website.lat = n.lat;
            website.lng = n.lng;
            website_temp.lat = n.lat;
            website_temp.lng = n.lng;
            setTimeout(function(){
                $('#setting-restaurantLocation_cancelBtn').trigger('click');
                window.guideHints.restaurantLocation()
            },2000)
        break;
        case 'settings.currencies':
            website.currencies = n.currencies;
            website_temp.currencies = n.currencies;
            $('#settings-currencyCancelBtn').trigger('click');
            window.guideHints.websiteCurrencies();
        break;
        case 'settings.socailMediaLinks':
            website.facebookLink = n.facebookLink;
            website.twitterLink = n.twitterLink;
            website.youtubeLink = n.youtubeLink;
            website.linkedinLink = n.linkedinLink;
            website.instagramLink = n.instagramLink;
            website_temp.facebookLink = n.facebookLink;
            website_temp.twitterLink = n.twitterLink;
            website_temp.youtubeLink = n.youtubeLink;
            website_temp.linkedinLink = n.linkedinLink;
            website_temp.instagramLink = n.instagramLink;
            $('#settings-socialMediaLinksCancelBtn').trigger('click');
        break;
        case 'settings.websiteAnnouncements':
            website.website_announcements = n.website_announcements;
            website_temp.website_announcements = n.website_announcements;
            $('#settings-websiteAnnouncementCancelBtn').trigger('click');
            window.guideHints.websiteAnnouncements();
        break;
        case 'settings.receiptMsgs':
            website.website_receiptMsgs = n.website_receiptMsgs;
            website_temp.website_receiptMsgs = n.website_receiptMsgs;
            $('#settings-receiptMsgCancelBtn').trigger('click');
            window.guideHints.websiteReceiptMsgs();
        break;
        case 'settings.promoCodeActive':
            n.is_active == 1 ? window.promocodes.find(item=> item.id == n.codeId).is_active = true :
            n.is_active == 0 ? window.promocodes.find(item=> item.id == n.codeId).is_active = false : null;
            n.is_active == 1 ? window.promocodes_temp.find(item=> item.id == n.codeId).is_active = true :
            n.is_active == 0 ? window.promocodes_temp.find(item=> item.id == n.codeId).is_active = false : null;
            drawPromocodes();
        break;
        case 'settings.deletePromocode':
            for(const key in window.promocodes){
                if(window.promocodes[key].id == n.codeId){
                    window.promocodes.splice(key,1)
                }
            }
            for(const key in window.promocodes_temp){
                if(window.promocodes_temp[key].id == n.codeId){
                    window.promocodes_temp.splice(key,1)
                }
            }
            drawPromocodes();
            if(window.history.state.popupPage == 'manage_promo_code' && window.history.state.promocode == n.codeId){
                popupPageClose(true);
            }
        break;
        case 'settings.createPromocode':
            if(n.promocode.is_expires == true){
                n.promocode.day = new Date(n.promocode.expires_at).getDate();
                n.promocode.month = parseInt(new Date(n.promocode.expires_at).getMonth() + 1);
                n.promocode.year = new Date(n.promocode.expires_at).getFullYear();
            }else{
                n.promocode.day = null;
                n.promocode.month = null;
                n.promocode.year = null;
            }
            window.promocodes.push(JSON.parse(JSON.stringify(n.promocode)))
            window.promocodes_temp.push(JSON.parse(JSON.stringify(n.promocode)))
            drawPromocodes();
        break;
        case 'settings.editPromocode':
            if(n.is_expires == true){
                n.day = parseInt(new Date(n.expires_at).getDate());
                n.month = parseInt(new Date(n.expires_at).getMonth()) + 1;
                n.year = parseInt(new Date(n.expires_at).getFullYear());
            }else{
                n.day = null;
                n.month = null;
                n.year = null;
            }
            for(const key in window.promocodes){
                if(window.promocodes[key].id == n.codeId){
                    window.promocodes[key].discount = n.discount;
                    window.promocodes[key].is_expires = n.is_expires;
                    window.promocodes[key].expires_at = n.expires_at;
                    let expires_at = getDate(n.expires_at)
                    window.promocodes[key].day = expires_at.day_num.local
                    window.promocodes[key].month = expires_at.month_num.local
                    window.promocodes[key].year = expires_at.year.local
                    window.promocodes[key].minimum = n.minimum;
                    window.promocodes[key].cap = n.cap;
                    window.promocodes[key].is_oneUse = n.is_oneUse;
                    window.promocodes[key].is_delivery = n.is_delivery;
                    window.promocodes[key].is_pickup = n.is_pickup;
                    window.promocodes[key].is_guest = n.is_guest;
                }
            }
            for(const key in window.promocodes_temp){
                if(window.promocodes_temp[key].id == n.codeId){
                    window.promocodes_temp[key].discount = n.discount;
                    window.promocodes_temp[key].is_expires = n.is_expires;
                    window.promocodes_temp[key].expires_at = n.expires_at;
                    let expires_at = getDate(n.expires_at)
                    window.promocodes_temp[key].day = expires_at.day_num.local
                    window.promocodes_temp[key].month = expires_at.month_num.local
                    window.promocodes_temp[key].year = expires_at.year.local
                    window.promocodes_temp[key].minimum = n.minimum;
                    window.promocodes_temp[key].cap = n.cap;
                    window.promocodes_temp[key].is_oneUse = n.is_oneUse;
                    window.promocodes_temp[key].is_delivery = n.is_delivery;
                    window.promocodes_temp[key].is_pickup = n.is_pickup;
                    window.promocodes_temp[key].is_guest = n.is_guest;
                }
            }
            if(window.history.state.popupPage == 'manage_promo_code' && window.history.state.promocode == n.codeCode){
                $('#editPromocode_cancelBtn').trigger('click');
            }
            drawPromocodes();
        break;
        case 'settings.installLang':
            website.languages[n.lang.code] = JSON.parse(JSON.stringify(n.lang));
            website_temp.languages[n.lang.code] = JSON.parse(JSON.stringify(n.lang));
            setWebsiteLangs();
            window.guideHints.all();
        break;
        case 'settings.defaultLang':
            for(const key in website.languages){
                website.languages[key].websiteDefault = 0;
                n.lang == website.languages[key].code ? website.languages[key].websiteDefault = 1 : null ;
            }
            for(const key in website_temp.languages){
                website_temp.languages[key].websiteDefault = 0;
                n.lang == website_temp.languages[key].code ? website_temp.languages[key].websiteDefault = 1 : null ;
            }
            setWebsiteLangs();
        break;
        case 'settings.receiptLang':
            for(const key in website.languages){
                website.languages[key].receiptDefault = 0;
                n.lang == website.languages[key].code ? website.languages[key].receiptDefault = 1 : null ;
            }
            for(const key in website_temp.languages){
                website_temp.languages[key].receiptDefault = 0;
                n.lang == website_temp.languages[key].code ? website_temp.languages[key].receiptDefault = 1 : null ;
            }
            setWebsiteLangs();
            window.guideHints.websiteReceiptMsgs();
        break;
        case 'settings.deleteLang':
            delete website.languages[n.lang]
            delete website_temp.languages[n.lang]
            setWebsiteLangs();
            window.guideHints.all();
        break;
        case 'settings.editLangOptions':
            website.languages[n.lang].name = n.name
            website.languages[n.lang].flag = n.flag
            website.languages[n.lang].direction = n.direction
            website_temp.languages[n.lang].name = n.name
            website_temp.languages[n.lang].flag = n.flag
            website_temp.languages[n.lang].direction = n.direction
            setWebsiteLangs();
            if(window.history.state.popupPage == 'edit_language_options' && window.history.state.language == n.lang){
                $('#langOptions-cancelBtn').trigger('click');
            }
        break;
        case 'settings.saveLangText':
            if(window.history.state.popupPage == 'edit_language_texts' && window.history.state.language == n.lang){
                getLangText(n.lang,true)
            }else {
                delete window.langTxts[n.lang]
            }
        break;
        case 'settings.dineinServiceSettings':
            n.useDineInServiceCost == 1 ? website.useDineInServiceCost  = 1 : website.useDineInServiceCost  = 0;
            website.dineInServiceCost = n.dineInServiceCost;
            website.dineInServicePercentage = n.dineInServicePercentage;
            n.useDineInServiceCost == 1 ? website_temp.useDineInServiceCost  = 1 : website_temp.useDineInServiceCost  = 0;
            website_temp.dineInServiceCost = n.dineInServiceCost;
            website_temp.dineInServicePercentage = n.dineInServicePercentage;
            $('#dineinServiceCancelBtn').trigger('click');
        break;
        case 'settings.dineinTaxSettings':
            n.useDineInTaxCost == 1 ? website.useDineInTaxCost  = 1 : website.useDineInTaxCost  = 0;
            website.dineInTaxCost = n.dineInTaxCost;
            website.dineInTaxPercentage = n.dineInTaxPercentage;
            n.useDineInTaxCost == 1 ? website_temp.useDineInTaxCost  = 1 : website_temp.useDineInTaxCost  = 0;
            website_temp.dineInTaxCost = n.dineInTaxCost;
            website_temp.dineInTaxPercentage = n.dineInTaxPercentage;
            $('#dineinTaxCancelBtn').trigger('click');
        break;
        case 'settings.averagePickupTime':
            website.averagePickupTime = n.averagePickupTime;
            website_temp.averagePickupTime = n.averagePickupTime;
            resetPickupAvgTime();
            $('#avgPickupTimeCancelBtn').trigger('click');
        break;
        case 'settings.pickupPaymentMethods':
            n.cash_at_restaurant == 1 ? website.cash_at_restaurant = 1 : website.cash_at_restaurant = 0;
            n.cash_at_restaurant == 1 ? website_temp.cash_at_restaurant = 1 : website_temp.cash_at_restaurant = 0;
            n.card_at_restaurant == 1 ? website.card_at_restaurant = 1 : website.card_at_restaurant = 0;
            n.card_at_restaurant == 1 ? website_temp.card_at_restaurant = 1 : website_temp.card_at_restaurant = 0;
            $('#pickupPaymentMethodsCancelBtn').trigger('click');
        break;
        case 'settings.pickupMinimumCharge':
            website.pickupMinimumCharge = n.pickupMinimumCharge;
            n.pickupMinimumChargeIncludes == 1 ? website.pickupMinimumChargeIncludes  = 1 : website.pickupMinimumChargeIncludes  = 0;
            website_temp.pickupMinimumCharge = n.pickupMinimumCharge;
            n.pickupMinimumChargeIncludes == 1 ? website_temp.pickupMinimumChargeIncludes  = 1 : website_temp.pickupMinimumChargeIncludes  = 0;
            $('#pickupMinimumChargeCancelBtn').trigger('click');
        break;
        case 'settings.pickupTaxSettings':
            n.usePickupTaxCost == 1 ? website.usePickupTaxCost  = 1 : website.usePickupTaxCost  = 0;
            website.pickupTaxCost = n.pickupTaxCost;
            website.pickupTaxPercentage = n.pickupTaxPercentage;
            n.usePickupTaxCost == 1 ? website_temp.usePickupTaxCost  = 1 : website_temp.usePickupTaxCost  = 0;
            website_temp.pickupTaxCost = n.pickupTaxCost;
            website_temp.pickupTaxPercentage = n.pickupTaxPercentage;
            $('#pickupTaxCancelBtn').trigger('click');
        break;
        case 'settings.deliveryTaxSettings':
            n.useDeliveryTaxCost == 1 ? website.useDeliveryTaxCost  = 1 : website.useDeliveryTaxCost  = 0;
            website.deliveryTaxCost = n.deliveryTaxCost;
            website.deliveryTaxPercentage = n.deliveryTaxPercentage;
            n.useDeliveryTaxCost == 1 ? website_temp.useDeliveryTaxCost  = 1 : website_temp.useDeliveryTaxCost  = 0;
            website_temp.deliveryTaxCost = n.deliveryTaxCost;
            website_temp.deliveryTaxPercentage = n.deliveryTaxPercentage;
            $('#deliveryTaxCancelBtn').trigger('click');
        break;
        case 'settings.deliveryMinimumCharge':
            website.deliveryMinimumCharge = n.deliveryMinimumCharge;
            n.deliveryMinimumChargeIncludes == 1 ? website.deliveryMinimumChargeIncludes  = 1 : website.deliveryMinimumChargeIncludes  = 0;
            website_temp.deliveryMinimumCharge = n.deliveryMinimumCharge;
            n.deliveryMinimumChargeIncludes == 1 ? website_temp.deliveryMinimumChargeIncludes  = 1 : website_temp.deliveryMinimumChargeIncludes  = 0;
            $('#deliveryMinimumChargeCancelBtn').trigger('click');
        break;
        case 'settings.deliveryPaymentMethod':
            n.card_on_delivery == 1 ? website.card_on_delivery = 1 : website.card_on_delivery = 0;
            n.cash_on_delivery == 1 ? website.cash_on_delivery = 1 : website.cash_on_delivery = 0;
            n.card_on_delivery == 1 ? website_temp.card_on_delivery = 1 : website_temp.card_on_delivery = 0;
            n.cash_on_delivery == 1 ? website_temp.cash_on_delivery = 1 : website_temp.cash_on_delivery = 0;
            $('#deliveryPaymentMethodsCancelBtn').trigger('click');
        break;
        case 'settings.averageDeliveryTime':
            website.averageDeliveryTime = n.averageDeliveryTime;
            website_temp.averageDeliveryTime = n.averageDeliveryTime;
            resetDeliverAvgTime();
            $('#avgDeliveryTimeCancelBtn').trigger('click');
        break;
        case 'settings.deliveryCost':
            website.deliveryCost = n.deliveryCost;
            n.showDeliveryCostChangable == 1 ? website.showDeliveryCostChangable  = 1 : website.showDeliveryCostChangable  = 0;
            website_temp.deliveryCost = n.deliveryCost;
            n.showDeliveryCostChangable == 1 ? website_temp.showDeliveryCostChangable  = 1 : website_temp.showDeliveryCostChangable  = 0;
            $('#deliveryCostCancelBtn').trigger('click');
        break;
        case 'settings.workingDay':
            website[`workingDays_${n.service}`][n.day] = JSON.parse(JSON.stringify(n.workingHours))
            website_temp[`workingDays_${n.service}`][n.day] = JSON.parse(JSON.stringify(n.workingHours))
            if(
                window.history.state.page == 'home_delivery_settings' && n.service == 'delivery' ||
                window.history.state.page == 'order_pickup_settings' && n.service == 'pickup' ||
                window.history.state.page == 'dine_in_settings' && n.service == 'dinein'
            ){
                drawWorkingDaysTable(n.service)
            }
            if(window.history.state.popupPage == 'working_hours' && window.history.state.day == n.day && window.history.state.service == n.service){
                drawPopupPage_working_days(n.service,n.day)
            }
        break;
        case 'settings.copyWorkingDays':
            for(const key in n.copyTo){
                let dayName = n.copyTo[key];
                if(n.copyHours == 1){
                    website[`workingDays_${n.service}`][dayName].working = n.workingHours.working;
                    website[`workingDays_${n.service}`][dayName].working24 = n.workingHours.working24;
                    website[`workingDays_${n.service}`][dayName].from = n.workingHours.from;
                    website[`workingDays_${n.service}`][dayName].to = n.workingHours.to;
                    website_temp[`workingDays_${n.service}`][dayName].working = n.workingHours.working;
                    website_temp[`workingDays_${n.service}`][dayName].working24 = n.workingHours.working24;
                    website_temp[`workingDays_${n.service}`][dayName].from = n.workingHours.from;
                    website_temp[`workingDays_${n.service}`][dayName].to = n.workingHours.to;
                }
                if(n.copyDiscount == 1){
                    website_temp[`workingDays_${n.service}`][dayName].discount = n.workingHours.discount;
                    website_temp[`workingDays_${n.service}`][dayName].Dfrom = n.workingHours.Dfrom;
                    website_temp[`workingDays_${n.service}`][dayName].Dto = n.workingHours.Dto;
                    website[`workingDays_${n.service}`][dayName].discount = n.workingHours.discount;
                    website[`workingDays_${n.service}`][dayName].Dfrom = n.workingHours.Dfrom;
                    website[`workingDays_${n.service}`][dayName].Dto = n.workingHours.Dto;
                }
                drawWorkingDaysTable(n.service)

            }
        break;
        ////users
        case 'user.signup':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.newUser_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            notificationsMsg = texts.cpanel.notifications.newUser_msg.replace(':user:',`<span><a class="popupPage popupId" popupPage="user" popupId="user" user="${n.notification.user_id}">${n.notification.userName}</a></span>`)
            showAlert('normal',notificationsMsg,4000,true);
            website.notifications_unseen.push(n.notification)
        break;
        case 'user.created_by_cpanel':
            //for activity only
        break;
        case 'user.ban' :
            if(typeof(website.users.find(item=>item.id == n.userId)) !== 'undefined'){
                n.isBan == 1 ? website.users.find(item=>item.id == n.userId).isBanned = 1 : n.isBan == 0 ? website.users.find(item=>item.id == n.userId).isBanned = 0 : null;
            }
            if(window.history.state.page == 'manage_users' && window.history.state.user == n.userId){
                drawManageUser(n.userId);
            }
            break;
        case 'user.edited_by_account':
            for(const key in website.users){
                if(website.users[key].id == n.user_id){
                    website.users[key].email = n.email;
                    website.users[key].name = n.name;
                    website.users[key].phoneNumber = n.phoneNumber;
                    website.users[key].address = n.address;
                    website.users[key].lat = n.lat;
                    website.users[key].lng = n.lng;
                    if(window.history.state.page == 'manage_users' && window.history.state.user == n.user_id){
                        drawManageUser(n.user_id)
                    }
                    $(`#chatWindow-user-${n.user_id}`).find('.chatWindowUserName').text(website.users[key].name).attr('tooltip',website.users[key].name)
                    if($('#showUsersChatBoxes').hasClass('usersGuestsChat_selected')){
                        drawUsersChatBoxes();
                    }
                }
            }
            break;
        case 'user.activity':
            chandelUserActivity(n)
        break;
        case 'user.edited_by_user':
            if(typeof(website.users.find(item=>item.id == n.user_id)) !== 'undefined'){
                website.users.find(item=>item.id == n.user_id).name = n.name;
                website.users.find(item=>item.id == n.user_id).phoneNumber = n.phoneNumber;
                website.users.find(item=>item.id == n.user_id).address = n.address;
                website.users.find(item=>item.id == n.user_id).lat = n.lat;
                website.users.find(item=>item.id == n.user_id).lng = n.lng;
            }
        break;
        case 'user.email_changed_by_user':
            if(typeof(website.users.find(item=>item.id == n.user_id)) !== 'undefined'){
                website.users.find(item=>item.id == n.user_id).email = n.email;
            }
        break;
        case 'user.password_changed_by_user':
            //for activity only
        break;
        case 'user.cart_update':
            if(typeof(website.users.find(item=>item.id == n.user_id)) !== 'undefined'){
                website.users.find(item=>item.id == n.user_id).cart = n.user_newCart;
                website.users.find(item=>item.id == n.user_id).cart_lastUpdate = n.now;
                if(window.history.state.popupPage == 'user' && window.history.state.user == n.user_id){
                    drawUserPageCart(n.user_id)
                }
            }
            break;
        //products
        case 'category.sort':
            website.categories.find(item=> item.id == n.fromId).sort = n.fromSort;
            website.categories.find(item=> item.id == n.toId).sort = n.toSort;
            website.categories.sort((a,b)=>{
                return parseInt(a.sort) - parseInt(b.sort)
            })
            website_temp.categories.find(item=> item.id == n.fromId).sort = n.fromSort;
            website_temp.categories.find(item=> item.id == n.toId).sort = n.toSort;
            website_temp.categories.sort((a,b)=>{
                return parseInt(a.sort) - parseInt(b.sort)
            })
            drawCategoryList();
            break;
        case 'category.create':
            website.categories.push(JSON.parse(JSON.stringify(n.category)))
            website_temp.categories.push(JSON.parse(JSON.stringify(n.category)))
            drawCategoryList();
            window.guideHints.categories();
            break;
        case 'category.delete':
            for(const key in website.categories){
                category = website.categories[key];
                if(n.category_id == category.id){
                    website.categories.splice(key,1)
                }
            }
            for(const key in website_temp.categories){
                category = website_temp.categories[key];
                if(n.category_id == category.id){
                    website_temp.categories.splice(key,1)
                }
            }
            for(const key in website.products){
                if(website.products[key].category_id == n.category_id){
                    website.products[key].category_id = null;
                }
            }
            for(const key in website_temp.products){
                if(website_temp.products[key].category_id == n.category_id){
                    website_temp.products[key].category_id = null;
                }
            }
            drawCategoryList();
            window.guideHints.categories();
            break;
        case 'category.edit':
            website.categories.find(item=>item.id == n.category_id).img_id = n.img_id;
            website.categories.find(item=>item.id == n.category_id).img = n.img;
            website.categories.find(item=>item.id == n.category_id).names = n.names;
            website.categories.find(item=>item.id == n.category_id).descriptions = n.descriptions;

            website_temp.categories.find(item=>item.id == n.category_id).img_id = n.img_id;
            website_temp.categories.find(item=>item.id == n.category_id).img = n.img;
            website_temp.categories.find(item=>item.id == n.category_id).names = n.names;
            website_temp.categories.find(item=>item.id == n.category_id).descriptions = n.descriptions;
            drawCategoryList();
            if(window.history.state.popupPage == 'edit_category' && window.history.state.category == n.category.name){
                drawPopupPage_edit_category(n.category.name)
            }
            window.guideHints.categories();
            break;
        case 'product.create':
            website.products.push(JSON.parse(JSON.stringify(n.product)));
            website_temp.products.push(JSON.parse(JSON.stringify(n.product)));
            if(window.history.state.category != null && window.history.state.page == 'manage_products' ){
                drawManageProductCards(window.history.state.category);
            }
            window.guideHints.products();
            break;
        case 'product.deleted':
            for(const key in website.products){
                if(website.products[key].id == n.product_id){
                    website.products.splice(key,1);
                }
            }
            for(const key in website_temp.products){
                if(website_temp.products[key].id == n.product_id){
                    website_temp.products.splice(key,1);
                }
            }
            if(window.history.state.category != null && window.history.state.page == 'manage_products' ){
                drawManageProductCards(window.history.state.category);
            }
            window.guideHints.products();
            manage_products_unsave_check();
            break;
        case 'product.availability':
            for(const key in website.products){
                if(website.products[key].id == n.product_id){
                    website.products[key].availability = n.availability
                }
            }
            for(const key in website_temp.products){
                if(website_temp.products[key].id == n.product_id){
                    website_temp.products[key].availability = n.availability
                }
            }
            if(window.history.state.category != null && window.history.state.page == 'manage_products' ){
                drawManageProductCards(window.history.state.category);
            }
            window.guideHints.products();
            manage_products_unsave_check();
            break;
        case 'product.sort':
            website.products.find(item=> item.id == n.fromId).sort = n.fromSort;
            website.products.find(item=> item.id == n.toId).sort = n.toSort;
            website.products.sort((a,b)=>{
                return parseInt(a.sort) - parseInt(b.sort)
            })
            website_temp.products.find(item=> item.id == n.fromId).sort = n.fromSort;
            website_temp.products.find(item=> item.id == n.toId).sort = n.toSort;
            website_temp.products.sort((a,b)=>{
                return parseInt(a.sort) - parseInt(b.sort)
            })
            if(window.history.state.page == 'manage_products' && window.history.state.category != null){
                drawManageProductCards(window.history.state.category)
            }
            break;
        case 'product.edit':
            n.product.product_options = JSON.parse(JSON.stringify(website.products.find(item=>item.id == n.product.id).product_options))
            for(const key in website.products){
                if(website.products[key].id == n.product.id){
                    website.products[key] = JSON.parse(JSON.stringify(n.product));
                }
            }
            for(const key in website_temp.products){
                if(website_temp.products[key].id == n.product.id){
                    website_temp.products[key] = JSON.parse(JSON.stringify(n.product));
                }
            }
            if(window.history.state.page == 'manage_products' && window.history.state.category != null){
                drawManageProductCards(window.history.state.category)
            }
            if(window.history.state.popupPage == 'edit_product' && window.history.state.product == n.product.name){
                drawPopupPage_edit_product(n.product.name)
            }
            window.guideHints.products();
            manage_products_unsave_check();
            break;
        case 'option.sort':
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.toId).sort = n.toSort;
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.fromId).sort = n.fromSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.fromId).sort = n.fromSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.toId).sort = n.toSort;
            if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_variants(window.history.state.product)
            }
            break;
        case 'option.create':
            website.products.find(item=>item.id == n.product_id).product_options.push(JSON.parse(JSON.stringify(n.option)));
            website_temp.products.find(item=>item.id == n.product_id).product_options.push(JSON.parse(JSON.stringify(n.option)));
            window.guideHints.products();
            if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_variants(window.history.state.product)
            }
            break;
        case 'option.delete':
            for(const key in website.products){
                if(website.products[key].id == n.product_id){
                    for(const key2 in website.products[key].product_options){
                        if(website.products[key].product_options[key2].id == n.option_id){
                            website.products[key].product_options.splice(key2,1);
                        }
                    }
                }
            }
            for(const key in website_temp.products){
                if(website_temp.products[key].id == n.product_id){
                    for(const key2 in website_temp.products[key].product_options){
                        if(website_temp.products[key].product_options[key2].id == n.option_id){
                            website_temp.products[key].product_options.splice(key2,1);
                        }
                    }
                }
            }
            window.guideHints.products();
            if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_variants(window.history.state.product)
            }
            break;
        case 'option.edit':
            for(const key in website.languages){
                const lang = website.languages[key];
                website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).names[lang.code] = n.names[lang.code];
                website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).names[lang.code] = n.names[lang.code];
            }
            if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_variants(window.history.state.product)
            }
            window.guideHints.products();
            break;
        case 'selection.set_default':
            for(const key in website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections){
                website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections[key].isDefault = 0;
            }
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).isDefault = 1;
            if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_variants(window.history.state.product)
            }
            break;
        case 'selection.sort':
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.fromId).sort = n.fromSort;
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.toId).sort = n.toSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.fromId).sort = n.fromSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.toId).sort = n.toSort;
            if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_variants(window.history.state.product)
            }
            break;
        case 'selection.create':
            website.products.find(item=>item.id == n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.push(JSON.parse(JSON.stringify(n.selection)))
            website_temp.products.find(item=>item.id == n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.push(JSON.parse(JSON.stringify(n.selection)))
            window.guideHints.products();
            if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_variants(window.history.state.product)
            }
            break;
        case 'selection.edit':
            website.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).price = n.price;
            website.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).names = n.names;
            website_temp.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).price = n.price;
            website_temp.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).names = n.names;
            window.guideHints.products();
            break;
        case 'selection.delete':
            for(const key in website.products){
                if(website.products[key].id == n.product_id){
                    for(const key2 in website.products[key].product_options){
                        if(website.products[key].product_options[key2].id == n.option_id){
                            for(const key3 in website.products[key].product_options[key2].product_option_selections){
                                if(website.products[key].product_options[key2].product_option_selections[key3].id == n.selection_id){
                                    website.products[key].product_options[key2].product_option_selections.splice(key3,1);
                                    closePopup();
                                    if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == website.products[key].name){
                                        drawPopupPage_manage_product_variants(window.history.state.product)
                                    }
                                    window.guideHints.products();
                                }
                            }
                        }
                    }
                }
            }
            for(const key in website_temp.products){
                if(website_temp.products[key].id == n.product_id){
                    for(const key2 in website_temp.products[key].product_options){
                        if(website_temp.products[key].product_options[key2].id == n.option_id){
                            for(const key3 in website_temp.products[key].product_options[key2].product_option_selections){
                                if(website_temp.products[key].product_options[key2].product_option_selections[key3].id == n.selection_id){
                                    website_temp.products[key].product_options[key2].product_option_selections.splice(key3,1);
                                }
                            }
                        }
                    }
                }
            }
            break;
        case 'review.delete':
            checkUseenNotifications([4],'product_review_id',n.review_id)
            $('.productReviewContainer[review="'+n.review_id+'"').remove();
        break;
        case 'review.posted':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.newReview_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            let review_user = texts.cpanel.notifications.aGuest;
            n.notification.user_id != null ? review_user = `<span><a class="popupPage popupId" popupPage="user" popupId="user" user="${n.notification.user_id}" >${n.notification.userName}</a></span>` : null;
            notificationsMsg = texts.cpanel.notifications.newReview_msg.replace(':user:',review_user).replace(':product:',`<span><a class="popupPage popupId" popupPage="product" popupId="product" product="${n.notification.productName}">${n.notification.productName}</a></span>`).replace(':review:',`<span><a class="popupPage popupId" popupPage="review" popupId="review" review="${n.notification.product_review_id}">${texts.cpanel.notifications.review}</a></span>`)
            showAlert('normal',notificationsMsg,4000,true);
            website.notifications_unseen.push(n.notification)
        break;
        case 'review.posted_survey':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.collectReviews_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            if(n.notification.reviewsSum > 1){
                notificationsMsg = texts.cpanel.notifications.collectReviews_msg.replace(':txt:',`<span><a class="cpPage" cpPage="product_reviews" user="${n.notification.user_id}">${texts.cpanel.notifications.reviews.replace(':reviewsSum:',n.notification.reviewsSum)}</a></span>`);
            }else if(n.notification.reviewsSum == 1){
                notificationsMsg = texts.cpanel.notifications.collectReviews_msg.replace(':txt:',`<span><a class="cpPage" cpPage="product_reviews" user="${n.notification.user_id}">${texts.cpanel.notifications.review}</a></span>`);
            }
            notificationsMsg = notificationsMsg.replace(':user:',`<span><a class="popupPage popupId" popupId="user" popupPage="user" user="${n.notification.user_id}">${n.notification.userName}</a></span>`);
            showAlert('normal',notificationsMsg,4000,true);
            website.notifications_unseen.push(n.notification)
        break;
        //design
        case 'img.upload':
            website.imgs.push(n.img)
            website.imgs.sort(function(a,b){
                return b.created_at - a.created_at;
            })
            if(website.imgs_storage != null){
                website.imgs_storage = parseFloat(website.imgs_storage) + parseFloat(n.img.size);
                resetStorageBar();
            }
            if(window.history.state.page == 'images'){
                drawImg(n.img,'prepend');
            }
            if(window.imgBrowser.opened){
                appendToImgBrowser(n.img,window.imgBrowser.imgBrowserClass,'prepend')
            }
        break;
        case 'img.delete':
            for(const key in website.imgs){
                if(website.imgs[key].id == n.img_id){
                    website.imgs_storage = parseFloat(website.imgs_storage) - parseFloat(website.imgs[key].size);
                    resetStorageBar();
                    website.imgs.splice(key,1);
                    $(`.imgsImgCard[imgId="${n.img_id}"]`).remove();
                    $(`.imgsImgCard-imgBrowser[imgId="${n.img_id}"]`).remove();
                }
            }
            if(website.imgs.length < 10){
                getImgs(true).then(function(imgs){
                    if(window.history.state.page == 'images'){
                        for(const key in imgs){
                            drawImg(imgs[key],'append')
                        }
                    }
                    if(window.imgBrowser.opened){
                        appendToImgBrowser(imgs[key],window.imgBrowser.imgBrowserClass,'append')
                    }
                })
            }
        break;
        //orders
        case 'orders.new_order_user':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.newOrder_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            website.incompleteOrders.push(n.order);
            calcIncompleteOrders();
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            let newOrder_user = texts.cpanel.notifications.aGuest;
            n.notification.user_id != null ? newOrder_user = `<span><a class="popupPage popupId" popupPage="user" popupId="user" user="${n.notification.user_id}" >${n.notification.userName}</a></span>` : null;
            notificationsMsg = texts.cpanel.notifications.newOrder_msg.replace(':order:',`<span><a class="popupId popupPage" popupPage="order" popupId="order" order="${n.notification.order_id}">#${n.notification.order_number}</a></span>`).replace(':user:',newOrder_user);
            showAlert('normal',notificationsMsg,4000,true);
            website.notifications_unseen.push(n.notification)
        break;
        case 'orders.new_order_account':
            website.incompleteOrders.push(n.order);
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            calcIncompleteOrders();
        break;
        case 'orders.accepted':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 1;
            website.incompleteOrders.find(item=>item._id == n.order_id).accepted_at = n.accepted_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).accepted_account_name = n.accepted_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).accepted_account_id = n.accepted_account_id;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
        break;
        case 'orders.canceled_by_account':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 2;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_at = n.canceled_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_by = 0;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_account_name = n.canceled_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_account_id = n.canceled_account_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.todayOrders.push(website.incompleteOrders[key])
                    website.incompleteOrders.splice(key,1)
                }
            }
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
            drawTodayHomeOrders();
        break;
        case 'orders.canceled_by_user':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.orderCanceled_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 2;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_at = n.canceled_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_by = 1;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.todayOrders.push(website.incompleteOrders[key])
                    website.incompleteOrders.splice(key,1)
                }
            }
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
            drawTodayHomeOrders();
            let canceledOrder_user = texts.cpanel.notifications.aGuest;
            n.notification.user_id != null ? canceledOrder_user = `<span><a class="popupPage popupId" popupPage="user" popupId="user" user="${n.notification.user_id}" >${n.notification.userName}</a></span>` : null;
            notificationsMsg = texts.cpanel.notifications.orderCanceled_msg.replace(':order:',`<span><a class="popupId popupPage" popupPage="order" popupId="order" order="${n.notification.order_id}">#${n.notification.order_number}</a></span>`).replace(':user:',canceledOrder_user);
            showAlert('normal',notificationsMsg,4000,true);
            website.notifications_unseen.push(n.notification)
        break;
        case 'orders.ready_for_pickup':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 4;
            website.incompleteOrders.find(item=>item._id == n.order_id).ready_for_pickup_at = n.ready_for_pickup_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).ready_for_pickup_account_name = n.ready_for_pickup_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).ready_for_pickup_account_id = n.ready_for_pickup_account_id;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
        break;
        case 'orders.picked_up':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 6;
            website.incompleteOrders.find(item=>item._id == n.order_id).pickedUp_at = n.pickedUp_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).pickedUp_account_name = n.pickedUp_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).pickedUp_account_id = n.pickedUp_account_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.todayOrders.push(website.incompleteOrders[key])
                    website.incompleteOrders.splice(key,1)
                }
            }
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
            drawTodayHomeOrders();
        break;
        case 'orders.out_for_delivery':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 3;
            website.incompleteOrders.find(item=>item._id == n.order_id).out_for_delivery_at = n.out_for_delivery_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).out_for_delivery_account_name = n.out_for_delivery_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).out_for_delivery_account_id = n.out_for_delivery_account_id;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
        break;
        case 'orders.to_delivery_man':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 3;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivery_id = n.delivery_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).deliveryName = n.delivery_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).out_for_delivery_at = n.out_for_delivery_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).out_for_delivery_account_name = n.out_for_delivery_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).out_for_delivery_account_id = n.out_for_delivery_account_id;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
        break;
        case 'orders.delivered_by_account':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 5;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_at = n.delivered_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_by = 0;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_account_name = n.delivered_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_account_id = n.delivered_account_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.todayOrders.push(website.incompleteOrders[key])
                    website.incompleteOrders.splice(key,1)
                }
            }
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
            drawTodayHomeOrders();
        break;
        case 'orders.delivered_by_delivery':
            window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
            window.pageNotifications.titleAlert = texts.cpanel.notifications.orderDelivered_title;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend');
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 5;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_at = n.delivered_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_by = 1;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_delivery_name = n.delivered_delivery_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_delivery_id = n.delivered_delivery_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.todayOrders.push(website.incompleteOrders[key])
                    website.incompleteOrders.splice(key,1)
                }
            }
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
            drawTodayHomeOrders();
            notificationsMsg = texts.cpanel.notifications.orderDelivered_msg.replace(':order:',`<span><a class="popupId popupPage" popupPage="order" popupId="order" order="${n.notification.order_id}">#${n.notification.order_number}</a></span>`).replace(':delivery:',`<span><a class="popupPage popupId" popupPage="delivery_account" popupId="delivery" delivery="${n.notification.delivery_id}">${n.notification.deliveryName.split('@')[0]}</a></span>`);
            showAlert('normal',notificationsMsg,4000,true);
            website.notifications_unseen.push(n.notification)
        break;
        case 'orders.diningin':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 8;
            website.incompleteOrders.find(item=>item._id == n.order_id).diningin_at = n.diningin_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).diningin_account_name = n.diningin_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).diningin_account_id = n.diningin_account_id;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
        break;
        case 'orders.dinedin':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 7;
            website.incompleteOrders.find(item=>item._id == n.order_id).dinedin_at = n.dinedin_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).dinedin_account_name = n.dinedin_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).dinedin_account_id = n.dinedin_account_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.todayOrders.push(website.incompleteOrders[key])
                    website.incompleteOrders.splice(key,1)
                }
            }
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
            calcIncompleteOrders();
            drawTodayHomeOrders();
        break;
        case 'orders.update.notice':
            website.incompleteOrders.find(item=>item._id == n.order_id).notice = n.notice;
            website.incompleteOrders.find(item=>item._id == n.order_id).noticeEdit_account_id = n.noticeEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).noticeEdit_account_name = n.noticeEdit_account_name;
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.phoneNumber':
            website.incompleteOrders.find(item=>item._id == n.order_id).phoneNumber = n.phoneNumber;
            website.incompleteOrders.find(item=>item._id == n.order_id).phoneEdit_account_id = n.phoneEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).phoneEdit_account_name = n.phoneEdit_account_name;
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.address':
            website.incompleteOrders.find(item=>item._id == n.order_id).address = n.address;
            website.incompleteOrders.find(item=>item._id == n.order_id).addressEdit_account_id = n.addressEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).addressEdit_account_name = n.addressEdit_account_name;
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.type':
            website.incompleteOrders.find(item=>item._id == n.order_id).type = n.type;
            website.incompleteOrders.find(item=>item._id == n.order_id).typeEdit_account_name = n.typeEdit_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).typeEdit_account_id = n.typeEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).tax = n.tax;
            website.incompleteOrders.find(item=>item._id == n.order_id).taxPercent = n.taxPercent;
            website.incompleteOrders.find(item=>item._id == n.order_id).service = n.service;
            website.incompleteOrders.find(item=>item._id == n.order_id).servicePercent = n.servicePercent;
            website.incompleteOrders.find(item=>item._id == n.order_id).deliveryCost = n.deliveryCost;
            website.incompleteOrders.find(item=>item._id == n.order_id).total = n.total;
            website.incompleteOrders.find(item=>item._id == n.order_id).deliveryEdit_account_name = null;
            website.incompleteOrders.find(item=>item._id == n.order_id).deliveryEdit_account_id = null;
            website.incompleteOrders.find(item=>item._id == n.order_id).paymentMethod = null;

            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.discount':
            website.incompleteOrders.find(item=>item._id == n.order_id).discount = n.discount;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_itemsTotal = n.discount_itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).tax = n.tax;
            website.incompleteOrders.find(item=>item._id == n.order_id).service = n.service;
            website.incompleteOrders.find(item=>item._id == n.order_id).total = n.total;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_by = n.discount_by;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_promocode = n.discount_promocode;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_promocode_id = n.discount_promocode_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_account_id = n.discount_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_account_name = n.discount_account_name;

            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.deliveryCost':
            website.incompleteOrders.find(item=>item._id == n.order_id).deliveryCost = n.deliveryCost;
            website.incompleteOrders.find(item=>item._id == n.order_id).total = n.total;
            website.incompleteOrders.find(item=>item._id == n.order_id).deliveryEdit_account_name = n.deliveryEdit_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).deliveryEdit_account_id = n.deliveryEdit_account_id;

            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.addItem':
            website.incompleteOrders.find(item=>item._id == n.order_id).order_items.push(n.item)
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsTotal = n.itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_itemsTotal = n.discount_itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).tax = n.tax;
            website.incompleteOrders.find(item=>item._id == n.order_id).service = n.service;
            website.incompleteOrders.find(item=>item._id == n.order_id).total = n.total;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_name = n.itemsEdit_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_id = n.itemsEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).order_items_original = n.order_items_original;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.removeItem':
            for(const key in website.incompleteOrders.find(i=>i._id == n.order_id).order_items){
                if(website.incompleteOrders.find(i=>i._id == n.order_id).order_items[key]._id == n.item_id){
                    website.incompleteOrders.find(i=>i._id == n.order_id).order_items.splice(key,1)
                }
            }
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsTotal = n.itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_itemsTotal = n.discount_itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).tax = n.tax;
            website.incompleteOrders.find(item=>item._id == n.order_id).service = n.service;
            website.incompleteOrders.find(item=>item._id == n.order_id).total = n.total;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_name = n.itemsEdit_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_id = n.itemsEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).order_items_original = n.order_items_original;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.itemNotice':
            website.incompleteOrders.find(o=>o._id == n.order_id).order_items.find(i=>i._id == n.item_id).itemNotice = n.itemNotice;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.qty':
            website.incompleteOrders.find(o=>o._id == n.order_id).order_items.find(i=>i._id == n.item_id).total = n.item_total;
            website.incompleteOrders.find(o=>o._id == n.order_id).order_items.find(i=>i._id == n.item_id).qty = n.item_qty;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsTotal = n.itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_itemsTotal = n.discount_itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).tax = n.tax;
            website.incompleteOrders.find(item=>item._id == n.order_id).service = n.service;
            website.incompleteOrders.find(item=>item._id == n.order_id).total = n.total;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_name = n.itemsEdit_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_id = n.itemsEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).order_items_original = n.order_items_original;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.update.selection':
            console.log(n)
            website.incompleteOrders.find(o=>o._id == n.order_id).order_items.find(i=>i._id == n.item_id).total = n.item_total;
            website.incompleteOrders.find(o=>o._id == n.order_id).order_items.find(i=>i._id == n.item_id).order_item_option_selections = n.item_order_item_option_selections;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsTotal = n.itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).discount_itemsTotal = n.discount_itemsTotal;
            website.incompleteOrders.find(item=>item._id == n.order_id).tax = n.tax;
            website.incompleteOrders.find(item=>item._id == n.order_id).service = n.service;
            website.incompleteOrders.find(item=>item._id == n.order_id).total = n.total;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_name = n.itemsEdit_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).itemsEdit_account_id = n.itemsEdit_account_id;
            website.incompleteOrders.find(item=>item._id == n.order_id).order_items_original = n.order_items_original;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
        case 'orders.collectReviewSeen':
            if(window.history.state.popupPage == 'order' && window.history.state.order == n.order_id){
                website.orderHistory.find(item=>item._id == n.order_id).collectReviewSeen = true;
                console.log(website.orderHistory.find(item=>item._id == n.order_id))
                drawPopupPage_order_fillData(n.order_id)
            }
        break;
    }


}
