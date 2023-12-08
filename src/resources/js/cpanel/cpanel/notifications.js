checkUseenNotifications = function(codes,notificationKey,val){
    let seenIds = [];
    for(const key in window.notifications){
        if(!window.notifications[key].seen && codes.includes(window.notifications[key].code) && window.notifications[key][notificationKey] == val){
            seenIds.push(window.notifications[key]._id)
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
                    for(const key in window.notifications){
                        if(seenIds.includes(window.notifications[key]._id)){
                            window.notifications[key].seen = true;
                        }
                    }
                    for(const key in seenIds){
                        $(`.notificationContainer[notificationId=${seenIds[key]}]`).removeClass('notificationContainer_unseen').find('.unSeenNotificationDot').addClass('none');
                        window.pageNotifications.notifications = window.pageNotifications.notifications - 1;
                        cpanelTitle(false);
                    }
                }
            }
        })
    }
}
drawNotification = function(notification,append,alert=false){
    // need to remove the cpaneltitle from here and add in the switch
    $('#noNotifications').addClass('none');

    window.notifications.push(notification)
    let thisNotification;
    let icon = '';
    let containerClass = '';
    let cpPage = null;
    let popupPage = null;
    let attrs = {};
    let unseenDotClass = 'vH';
    let notificationsMsg = '';
    let user = texts.cpanel.notifications.aGuest;
    switch(notification.code){
        case 'orders.new_order_user':
            icon = 'ico-orders';
            containerClass = 'popupPage';
            popupPage = 'Order';
            attrs.orderid = notification.order_id;
            notification.user_id != null ? user = notification.userName : null;
            notificationsMsg = `${texts.cpanel.notifications.order} #${notification.order_number} ${texts.cpanel.notifications.newOrder2} ${user}.`;
            if(alert){
                // window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                // window.pageNotifications.titleAlert = texts.cpanel.notifications.newOrderPlaced;
                // cpanelTitle(true);
                if(settings_temp.NewOrderAlerts == true){
                    showAlert('normal',notificationsMsg,4000,true);
                }
            }
        break;
        case 'orders.delivered_by_delivery':
            icon = 'ico-delivery_accounts';
            containerClass = 'popupPage';
            popupPage = 'Order';
            attrs.orderid = notification.order_id;
            // notification.user_id != null ? user = notification.userName : null;
            notificationsMsg = `${texts.cpanel.notifications.order} #${notification.order_id} ${texts.cpanel.notifications.delivered} ${notification.deliveryName.split('@')[0]}.`;
            if(alert){
                window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                window.pageNotifications.titleAlert = texts.cpanel.notifications.delivered1;
                cpanelTitle(true);
                if(settings_temp.DeliveredOrderAlerts == true){
                    showAlert('normal',notificationsMsg,4000,true);
                }
            }
        break;
        case 'orders.canceled_by_user':
            console.log(notification)
            icon = 'ico-no';
            containerClass = 'popupPage';
            popupPage = 'Order';
            attrs.orderid = notification.order_id;
            notification.user_id != null ? user = notification.userName : null;
            notificationsMsg = `${texts.cpanel.notifications.order} #${notification.order_number} ${texts.cpanel.notifications.orderCanceled2} ${user}.`;
            if(alert){
                window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                window.pageNotifications.titleAlert = texts.cpanel.notifications.orderCanceled;
                cpanelTitle(true);
                if(settings_temp.CanceledOrderAlerts == true){
                    showAlert('normal',notificationsMsg,4000,true);
                }
            }
        break;
        case 3:
            icon = 'ico-user';
            containerClass = 'popupPage';
            popupPage = 'User';
            attrs.userId = notification.user_id;
            notificationsMsg = `${texts.cpanel.notifications.newUser1} ${notification.userName} ${texts.cpanel.notifications.newUser2}`;
            if(alert){
                window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                window.pageNotifications.titleAlert = texts.cpanel.notifications.newUser;
                cpanelTitle(true);
                if(settings_temp.NewUserAlerts == true){
                    showAlert('normal',notificationsMsg,4000,true);
                }
            }

        break;
        case 4:
            icon = 'ico-product_reviews';
            containerClass = 'popupPage';
            popupPage = 'review';
            attrs.review = notification.product_review_id;
            notification.user_id != null ? user = notification.userName : null;
            notificationsMsg = `${texts.cpanel.notifications.newReview1} ${notification.productName} ${texts.cpanel.notifications.newReview2} ${user}.`;
            if(alert){
                window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                window.pageNotifications.titleAlert = texts.cpanel.notifications.newReview;
                cpanelTitle(true);
                if(settings_temp.NewReviewAlerts == true){
                    showAlert('normal',notificationsMsg,4000,true);
                }
            }
        break;
        case 22:
            icon = 'ico-product_reviews'
            containerClass = 'cpPage';
            cpPage = 'product_reviews';
            attrs.userId = notification.user_id;
            attrs.userName = notification.userName;
            if(notification.reviewsSum > 1){
                notificationsMsg = `${texts.cpanel.notifications.collectReviews3} ${texts.cpanel.notifications.collectReviews22} ${notification.userName} ${texts.cpanel.notifications.collectReviews4}`;
                if(alert){
                    window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                    window.pageNotifications.titleAlert = texts.cpanel.notifications.newReview22;
                    cpanelTitle(true);
                    if(settings_temp.NewReviewAlerts == true){
                        showAlert('normal',notificationsMsg,4000,true);
                    }
                }
            }else{
                notificationsMsg = `${texts.cpanel.notifications.collectReviews1} ${texts.cpanel.notifications.collectReviews2} ${notification.userName} ${texts.cpanel.notifications.collectReviews4}`;
                if(alert){
                    window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                    window.pageNotifications.titleAlert = texts.cpanel.notifications.newReview;
                    cpanelTitle(true);
                    if(settings_temp.NewReviewAlerts == true){
                        showAlert('normal',notificationsMsg,4000,true);
                    }
                }
            }
        break;
        case 74:
            icon = 'ico-ticket';
            containerClass = 'popupPage';
            popupPage = 'ticket_browser';
            attrs.ticketid = notification.ticket_id;
            notificationsMsg = `${texts.cpanel.notifications.ticketMSg1} #${notification.ticket_id}.`;
            if(alert){
                window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                window.pageNotifications.titleAlert = texts.cpanel.notifications.ticketMSg;
                cpanelTitle(true);
                showAlert('normal',notificationsMsg,4000,true);
            }
        break;
        case 80:
            icon = 'ico-financial_reports';
            containerClass = 'viewFinancialReportClass';
            attrs.month = notification.month;
            attrs.year = notification.year;
            attrs.reportId = notification.financialReport_id;
            let reportDate = getDate(Date.parse(new Date(notification.year,notification.month,0)) / 1000);
            notificationsMsg =`${texts.cpanel.notifications.financialReport1} ${reportDate.month_short.restaurant} ${reportDate.year.restaurant} ${texts.cpanel.notifications.financialReport2}`
            if(alert){
                window.pageNotifications.notifications = window.pageNotifications.notifications + 1;
                window.pageNotifications.titleAlert = texts.cpanel.notifications.financialReport;
                cpanelTitle(true);
                showAlert('normal',notificationsMsg,4000,true);
                $('#financialReports-noReports').addClass('none');
            }
        break;

    }
    !notification.seen ? unseenDotClass = '' : null;
    !notification.seen ? containerClass = `${containerClass} notificationContainer_unseen` : null;
    if(append == 'append'){
        $('#notificationsListConainer').append(
            thisNotification = $('<div/>',{
                class:`notificationContainer ${containerClass}`,
                popupPage:popupPage,
                cpPage:cpPage,
                notificationId:notification._id,
                created_at:notification.created_at
            }).append(
                $('<div/>',{class:`notificationIcon ${icon}`}),
                $('<div/>',{class:'notificationBody'}).append(
                    $('<div/>',{class:'mB10 fs101',text:notificationsMsg}),
                    $('<div/>',{class:'c-placeholder2 fs09 alnsE diffTimeCalc',time:notification.created_at})
                ),
                $('<div/>',{class:`${unseenDotClass} unSeenNotificationDot`})

            )
        )
    }else if(append == 'prepend'){
        $('#notificationsListConainer').prepend(
            thisNotification = $('<div/>',{
                class:`notificationContainer ${containerClass}`,
                popupPage:popupPage,
                cpPage:cpPage,
                notificationId:notification._id,
                created_at:notification.created_at
            }).append(
                $('<div/>',{class:`notificationIcon ${icon}`}),
                $('<div/>',{class:'notificationBody'}).append(
                    $('<div/>',{class:'mB10 fs101',text:notificationsMsg}),
                    $('<div/>',{class:'c-placeholder2 fs09 alnsE diffTimeCalc',time:notification.created_at})
                ),
                $('<div/>',{class:`${unseenDotClass} unSeenNotificationDot`})

            )
        )
    }

    for(const key in attrs){
        thisNotification.attr(key,attrs[key])
    }

}

let getMoreNotificationsCheck = true;
let noMoreNotifications = false;
$('#notifications').on('click',function(){
    if(window.waitFor_loadWebsiteOrdersAndChats){return;}
    if(!window.notificationsFirstLoad){
        $('#notificationsListConainer').text('')
        getNotifications();
    }
})
$('#notificationsList').on('scroll',function(e){
    e.stopImmediatePropagation();
    if($('#notificationsList')[0].scrollHeight - $('#notificationsList').scrollTop() < $('#notificationsList').innerHeight() + 1){
        getNotifications(true);
    }
});
getNotifications = function(){
    if(!window.notificationsFirstLoad){
        getMoreNotificationsCheck = true;
        noMoreNotifications = false;
    }
    if(!getMoreNotificationsCheck || noMoreNotifications){return;}
    getMoreNotificationsCheck = false;
    $('#notificationsListConainer_loading').removeClass('none')
    let getMoreNotificationsAfter = $('#notificationsListConainer').children().last().attr('created_at');
    $.ajax({
        url:'notifications',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getNotifications:true,
            getMoreNotificationsAfter:getMoreNotificationsAfter,
        },
        success:function(response){
            if(response.notifications.length == 0){noMoreNotifications = true;}
            $('#notificationsListConainer_loading').addClass('none')
            window.notificationsFirstLoad = true;
            for(const key in response.notifications){
                const notification = response.notifications[key];
                drawNotification(notification,'append');
            }
            if($('#notificationsListConainer').children().length == 0 && noMoreNotifications == true){
                $('#noNotifications').removeClass('none');
            }

        }
    }).done(function(){
        getMoreNotificationsCheck = true;
        if(!noMoreNotifications && $('#notificationsList').height() >= $('#notificationsListConainer').height()){
            getNotifications();
        }
    })

}

window.cpanelChannel.listen(`cpanelChannel`,function(r){
    console.log(r)
    if('activity' in r.notification){drawActivityLog(r.notification.activity,true,'prepend')}
    handelCpanelChannel(r.notification.notification,r.notification.code)
})

handelCpanelChannel = function(n,code){
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
    console.log(code)
    switch(code){
        case '0':
            if(n.account_id == account.id){
                $('#logoutForm').trigger('submit');
            }
            break;
        case 'account.blocked':
            let subaccount = website.accounts.find(i=> i.id == n.account_id);
            if(typeof(subaccount) !== 'undefined'){
                subaccount.password_fails = n.password_fails;
                drawSubAccountsTable();
            }
        break;
        case 'reload.update':
            ReloadForUpdate();
        break;
        case 'reload.update.account':
            if(account.id == n.account_id){
                ReloadForUpdatePopup();
            }
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
            // clearTimeout(window.usersTypingTimeouts[`${n.type}-${n.id}`]);
            newMsgFromAccount(n.type,n.id,n.msg)
            // $(`#chatWindow-${n.type}-${n.id}`).find('.chatWindowTyping').removeClass('chatWindowTyping_show');
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
            // website.iconUrl = n.iconUrl;
            // window.guideHints.websiteIcon();
            break;
        case 'settings.websiteLogo':
            $('#settings-websiteLogoImg').attr('src',n.logo);
            website.logo = n.logo
            website.logo_id = n.logo_id;
            // website.logoUrl = n.logoUrl;
            // window.guideHints.websiteLogo();
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
        case 'user.ban' :
            if(typeof(website.users.find(item=>item.id == n.userId)) !== 'undefined'){
                n.isBan == 1 ? website.users.find(item=>item.id == n.userId).isBanned = 1 : n.isBan == 0 ? website.users.find(item=>item.id == n.userId).isBanned = 0 : null;
            }
            if(window.history.state.page == 'manage_users' && window.history.state.user == n.userId){
                drawManageUser(n.userId);
            }
            break;
        case 'user.edited':
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
            window.guideHints.categories(website.categories);
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
            window.guideHints.categories(website.categories);
            break;
        case 'category.edit':
            for(const key in website.categories){
                if(website.categories[key].id == n.category.id){
                    website.categories[key] = JSON.parse(JSON.stringify(n.category));
                }
            }
            for(const key in website_temp.categories){
                if(website_temp.categories[key].id == n.category.id){
                    website_temp.categories[key] = JSON.parse(JSON.stringify(n.category));
                }
            }
            drawCategoryList();
            if(window.history.state.popupPage == 'edit_category' && window.history.state.category == n.category.name){
                drawPopupPage_edit_category(n.category.name)
            }
            window.guideHints.categories(website.categories);
            break;
        case 'product.create':
            website.products.push(JSON.parse(JSON.stringify(n.product)));
            website_temp.products.push(JSON.parse(JSON.stringify(n.product)));
            if(window.history.state.category != null && window.history.state.page == 'manage_products' ){
                drawManageProductCards(window.history.state.category);
            }
            window.guideHints.products(website.products);
            break;
        case 'product.delete':
            for(const key in website.products){
                product = website.products[key];
                if(product.id == n.product_id){
                    website.products.splice(key,1);
                }
            }
            for(const key in website_temp.products){
                product = website_temp.products[key];
                if(product.id == n.product_id){
                    website_temp.products.splice(key,1);
                }
            }
            if(window.history.state.category != null && window.history.state.page == 'manage_products' ){
                drawManageProductCards(window.history.state.category);
            }
            window.guideHints.products(website.products);
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
            window.guideHints.products(website.products);
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
            window.guideHints.products(website.products);
            manage_products_unsave_check();
            break;
        case 'option.sort':
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.toId).sort = n.toSort;
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.fromId).sort = n.fromSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.fromId).sort = n.fromSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.toId).sort = n.toSort;
            if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_options(window.history.state.product)
            }
            break;
        case 'option.create':
            website.products.find(item=>item.id == n.product_id).product_options.push(JSON.parse(JSON.stringify(n.option)));
            website_temp.products.find(item=>item.id == n.product_id).product_options.push(JSON.parse(JSON.stringify(n.option)));
            window.guideHints.products(website.products);
            if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_options(window.history.state.product)
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
            window.guideHints.products(website.products);
            if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_options(window.history.state.product)
            }
            break;
        case 'option.edit':
            for(const key in website.languages){
                const lang = website.languages[key];
                website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).names[lang.code] = n.names[lang.code];
                website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).names[lang.code] = n.names[lang.code];
            }
            if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_options(window.history.state.product)
            }
            window.guideHints.products(website.products);
            break;
        case 'selection.set_default':
            for(const key in website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections){
                website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections[key].isDefault = 0;
            }
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).isDefault = 1;
            if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_options(window.history.state.product)
            }
            break;
        case 'selection.sort':
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.fromId).sort = n.fromSort;
            website.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.toId).sort = n.toSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.fromId).sort = n.fromSort;
            website_temp.products.find(item=>item.name == n.product_name).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.toId).sort = n.toSort;
            if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_options(window.history.state.product)
            }
            break;
        case 'selection.create':
            website.products.find(item=>item.id == n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.push(JSON.parse(JSON.stringify(n.selection)))
            website_temp.products.find(item=>item.id == n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.push(JSON.parse(JSON.stringify(n.selection)))
            window.guideHints.products(website.products);
            if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == n.product_name){
                drawPopupPage_manage_product_options(window.history.state.product)
            }
            break;
        case 'selection.edit':
            website.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).price = n.price;
            website.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).names = n.names;
            website_temp.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).price = n.price;
            website_temp.products.find(item=>item.id==n.product_id).product_options.find(item=>item.id == n.option_id).product_option_selections.find(item=>item.id == n.selection_id).names = n.names;
            window.guideHints.products(website.products);
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
                                    if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == website.products[key].name){
                                        drawPopupPage_manage_product_options(window.history.state.product)
                                    }
                                    window.guideHints.products(website.products);
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
            website.incompleteOrders.push(n.order);
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
            }
            calcIncompleteOrders();
            window.pageNotifications.titleAlert = texts.cpanel.notifications.newOrderPlaced;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend',true);
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
            console.log(n)
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 2;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_at = n.canceled_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_by = 0;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_account_name = n.canceled_account_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_account_id = n.canceled_account_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.orderHistory.push(website.incompleteOrders[key])
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
        break;
        case 'orders.canceled_by_user':
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 2;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_at = n.canceled_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).canceled_by = 1;
            // website.incompleteOrders.find(item=>item._id == n.order_id).canceled_account_name = n.canceled_account_name;
            // website.incompleteOrders.find(item=>item._id == n.order_id).canceled_account_id = n.canceled_account_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.orderHistory.push(website.incompleteOrders[key])
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
                    website.orderHistory.push(website.incompleteOrders[key])
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
                    website.orderHistory.push(website.incompleteOrders[key])
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
        break;
        case 'orders.delivered_by_delivery':
            console.log(n)
            website.incompleteOrders.find(item=>item._id == n.order_id).status = 5;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_at = n.delivered_at;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_by = 1;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_delivery_name = n.delivered_delivery_name;
            website.incompleteOrders.find(item=>item._id == n.order_id).delivered_delivery_id = n.delivered_delivery_id;
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key]._id == n.order_id){
                    website.orderHistory.push(website.incompleteOrders[key])
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
            window.pageNotifications.titleAlert = texts.cpanel.notifications.delivered1;
            cpanelTitle(true);
            drawNotification(n.notification,'prepend',true);
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
                    website.orderHistory.push(website.incompleteOrders[key])
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
    }


}
let n =[];
    if(n.code == 0.2){
        ReloadForUpdate();
    }else if(n.code == 0.3){
        let account = website.accounts.find(i=> i.id == n.account_id);
        if(typeof(account) !== 'undefined'){
            account.password_fails = n.password_fails;
            drawSubAccounts();
        }
    }else if(n.code == 0){
        if(n.accountId == account.id){
            // setTimeout(function(){
            //     showPopup('loginDetected');
            //     setTimeout(function(){
            //         $('#logoutForm').trigger('submit');
            //     },5000)
            // },5000)
        }
    }else if(n.code == 1 && account.authorities[0] == 1){
        website.incompleteOrders.push(n.order);
        new orders().incompleteOrders();
        drawNotification(n,'prepend',true);
    }else if(n.code == 1.5 && account.authorities[2] == 1){
        for(const key in website.users){
            if(website.users[key].id == n.user_id){
                website.users[key].cart = n.cart;
                website.users[key].cart_lastUpdate = n.cart_lastUpdate;
                if(window.history.state.popupPage == 'User' && window.history.state.user == n.user_id){
                    // showUserPopupPage(n.user_id);

                }
            }
        }
    }else if(n.code == 2 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.order_id){
                website.incompleteOrders[key].status = 5;
                website.incompleteOrders[key].delivered_at = n.delivered_at;
                website.incompleteOrders[key].delivered_by = n.delivered_by;
                website.incompleteOrders[key].delivery_id = n.delivery_id;
                website.incompleteOrders[key].deliveryName = n.deliveryName;
                if(account.is_master == true){
                    todayOrders.push(website.incompleteOrders[key])
                    drawTodayHomeOrders()
                }
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                let orderId = website.incompleteOrders[key].id;
                website.incompleteOrders.splice(key,1)
                new orders(orderId).redrawChatOrder();
                new orders().incompleteOrders();
            }
        }
        drawNotification(n,'prepend',true);
    }else if(n.code == 3 && account.authorities[2] == 1){
        website.users.push(n.user);
        drawNotification(n,'prepend',true);
    }else if(n.code == 4 && account.authorities[1] == 1){
        drawNotification(n,'prepend',true);
        $('#manageUsers-usersInputList').trigger('input');
    }else if(n.code == 5 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.order.id){
                website.incompleteOrders[key] = n.order;
                if(account.is_master == true){
                    todayOrders.push(website.incompleteOrders[key])
                    drawTodayHomeOrders()
                }
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                let orderId = website.incompleteOrders[key].id;
                website.incompleteOrders.splice(key,1);
                new orders(orderId).redrawChatOrder();
            }
        }
        new orders().incompleteOrders();
        drawNotification(n,'prepend',true);
        // if(settings_temp.CanceledOrderAlerts  == true && account.authorities[0] == 1){
        //     showAlert('normal',texts.cpanel.notifications.orderCanceled1+n.order_id+' '+texts.cpanel.notifications.orderCanceled2+' '+notificationUserName+'.',20000,true);
        // }

        // window.pageNotifications.titleAlert = texts.cpanel.notifications.orderCanceled;
        // cpanelTitle(true);
    }else if(n.code == 6.5 && account.authorities[0] == 1){
        for(const key in website.orderHistory){
            if(website.orderHistory[key].id == n.order_id){
                website.orderHistory[key].collectReviewSeen = 1;
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.orderHistory[key].id){
                    new orders(website.orderHistory[key].id).drawOrder()
                }
            }
        }

    }else if(n.code == 6.6  && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 7;
                website.incompleteOrders[key].dinedin_at = n.dinedin_at;
                website.incompleteOrders[key].dinedin_account_name = n.dinedin_account_name;
                website.incompleteOrders[key].dinedin_account_id = n.dinedin_account_id;
                if(account.is_master == true){
                    todayOrders.push(website.incompleteOrders[key])
                    drawTodayHomeOrders()
                }
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                let orderId = website.incompleteOrders[key].id;
                website.incompleteOrders.splice(key,1)
                new orders(orderId).redrawChatOrder();
                new orders().incompleteOrders();
            }
        }
    }else if(n.code == 6.7 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 8;
                website.incompleteOrders[key].diningin_at = n.diningin_at;
                website.incompleteOrders[key].diningin_account_name = n.diningin_account_name;
                website.incompleteOrders[key].diningin_account_id = n.diningin_account_id;
                new orders().incompleteOrders();
                let orderId = website.incompleteOrders[key].id;
                new orders(orderId).redrawChatOrder();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
            }
        }
    }else if(n.code == 7.1 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].type = n.newType;
                website.incompleteOrders[key].typeEdit_account_name = n.typeEdit_account_name;
                website.incompleteOrders[key].typeEdit_account_id = n.typeEdit_account_id;
                website.incompleteOrders[key].tax = n.tax;
                website.incompleteOrders[key].taxPercent = n.taxPercent;
                website.incompleteOrders[key].service = n.service;
                website.incompleteOrders[key].servicePercent = n.servicePercent;
                website.incompleteOrders[key].deliveryCost = n.deliveryCost;
                website.incompleteOrders[key].total = n.total;
                website.incompleteOrders[key].deliveryEdit_account_name = null;
                website.incompleteOrders[key].deliveryEdit_account_id = null;
                website.incompleteOrders[key].paymentMethod = null;
                new orders().incompleteOrders();
                new orders(website.incompleteOrders[key].id).redrawChatOrder();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
            }
        }
    }else if(n.code == 7.2 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].notice = n.newNotice;
                website.incompleteOrders[key].noticeEdit_account_name = n.noticeEdit_account_name;
                website.incompleteOrders[key].noticeEdit_account_id = n.noticeEdit_account_id;
                new orders().incompleteOrders();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
            }
        }
    }else if(n.code == 7.3 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].phoneNumber = n.newPhoneNumber;
                website.incompleteOrders[key].phoneEdit_account_name = n.phoneEdit_account_name;
                website.incompleteOrders[key].phoneEdit_account_id = n.phoneEdit_account_id;
                new orders().incompleteOrders();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder();
                }
            }
        }
    }else if(n.code == 7.4 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].address = n.newAddress;
                website.incompleteOrders[key].addressEdit_account_name = n.addressEdit_account_name;
                website.incompleteOrders[key].addressEdit_account_id = n.addressEdit_account_id;
                new orders().incompleteOrders();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder();
                }
            }
        }
    }else if(n.code == 8 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 2;
                website.incompleteOrders[key].canceled_by = n.canceled_by;
                website.incompleteOrders[key].canceled_at = n.canceled_at;
                website.incompleteOrders[key].canceled_account_name = n.canceled_account_name;
                website.incompleteOrders[key].canceled_account_id = n.canceled_account_id;
                if(account.is_master == true){
                    todayOrders.push(website.incompleteOrders[key])
                    drawTodayHomeOrders()
                }
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                let orderId = website.incompleteOrders[key].id;
                website.incompleteOrders.splice(key,1)
                new orders(orderId).redrawChatOrder();
                new orders().incompleteOrders();
            }
        }

    }else if(n.code == 9 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 3;
                website.incompleteOrders[key].out_for_delivery_at = n.out_for_delivery_at;
                website.incompleteOrders[key].out_for_delivery_account_name = n.out_for_delivery_account_name;
                website.incompleteOrders[key].out_for_delivery_account_id = n.out_for_delivery_account_id;
                new orders().incompleteOrders();
                let orderId = website.incompleteOrders[key].id;
                new orders(orderId).redrawChatOrder();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
            }
        }
    }else if(n.code == 9.1 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 3;
                website.incompleteOrders[key].delivery_id = n.delivery_id;
                website.incompleteOrders[key].deliveryName = n.deliveryName;
                website.incompleteOrders[key].out_for_delivery_at = n.out_for_delivery_at;
                website.incompleteOrders[key].out_for_delivery_account_name = n.out_for_delivery_account_name;
                website.incompleteOrders[key].out_for_delivery_account_id = n.out_for_delivery_account_id;
                new orders().incompleteOrders();
                let orderId = website.incompleteOrders[key].id;
                new orders(orderId).redrawChatOrder();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
            }
        }
    }else if(n.code == 10 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 5;
                website.incompleteOrders[key].delivered_at = n.delivered_at;
                website.incompleteOrders[key].delivered_by = n.delivered_by;
                website.incompleteOrders[key].delivered_account_name = n.delivered_account_name;
                website.incompleteOrders[key].delivered_account_id = n.delivered_account_id;
                if(account.is_master == true){
                    todayOrders.push(website.incompleteOrders[key])
                    drawTodayHomeOrders()
                }
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                let orderId = website.incompleteOrders[key].id;
                website.incompleteOrders.splice(key,1)
                new orders(orderId).redrawChatOrder();
                new orders().incompleteOrders();
            }
        }
    }else if(n.code == 11 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 4;
                website.incompleteOrders[key].ready_for_pickup_at = n.ready_for_pickup_at;
                website.incompleteOrders[key].ready_for_pickup_account_name = n.ready_for_pickup_account_name;
                website.incompleteOrders[key].ready_for_pickup_account_id = n.ready_for_pickup_account_id;
                new orders(website.incompleteOrders[key].id).redrawChatOrder();
                new orders().incompleteOrders();
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
            }
        }
    }else if(n.code == 12 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].status = 6;
                website.incompleteOrders[key].pickedUp_at = n.pickedUp_at;
                website.incompleteOrders[key].pickedUp_account_name = n.pickedUp_account_name;
                website.incompleteOrders[key].pickedUp_account_id = n.pickedUp_account_id;
                if(account.is_master == true){
                    todayOrders.push(website.incompleteOrders[key])
                    drawTodayHomeOrders()
                }
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                let orderId = website.incompleteOrders[key].id;
                website.incompleteOrders.splice(key,1)
                new orders(orderId).redrawChatOrder();
                new orders().incompleteOrders();
            }
        }
    }else if(n.code == 13 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.order.id){
                website.incompleteOrders[key] = n.order;
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                new orders(website.incompleteOrders[key].id).redrawChatOrder();
                new orders().incompleteOrders();
            }
        }
    }else if(n.code == 13.1 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                for(const key2 in website.incompleteOrders[key].order_items){
                    if(website.incompleteOrders[key].order_items[key2]._id == n.itemId){
                        website.incompleteOrders[key].order_items[key2].itemNotice = n.itemNotice;
                        if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                            new orders(website.incompleteOrders[key].id).drawOrder()
                        }
                        new orders().incompleteOrders();
                    }
                }
            }
        }
    }else if(n.code == 13.2 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].deliveryCost = n.deliveryCost;
                website.incompleteOrders[key].total = n.total;
                website.incompleteOrders[key].deliveryEdit_account_name = n.deliveryEdit_account_name;
                website.incompleteOrders[key].deliveryEdit_account_id = n.deliveryEdit_account_id;
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                new orders().incompleteOrders();
                new orders(website.incompleteOrders[key].id).redrawChatOrder();
            }
        }
    }else if(n.code == 13.3 && account.authorities[0] == 1){
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].id == n.orderId){
                website.incompleteOrders[key].discount = n.discount;
                website.incompleteOrders[key].discount_itemsTotal = n.discount_itemsTotal;
                website.incompleteOrders[key].tax = n.tax;
                website.incompleteOrders[key].service = n.service;
                website.incompleteOrders[key].total = n.total;
                website.incompleteOrders[key].discount_by = 1;
                website.incompleteOrders[key].discount_promocode = null;
                website.incompleteOrders[key].discount_promocode_id = null;
                website.incompleteOrders[key].discount_account_name = n.discount_account_name;
                website.incompleteOrders[key].discount_account_id = n.discount_account_id;
                if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                    new orders(website.incompleteOrders[key].id).drawOrder()
                }
                new orders().incompleteOrders();
                new orders(website.incompleteOrders[key].id).redrawChatOrder();
            }
        }
    }else if(n.code == 14.4 && account.authorities[1] == 1){
        n.category.imgUrl = '/storage/imgs/cpanel/noimg.png';
        n.category.imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
        Object.keys(imgs).some(function(k) {
            if(imgs[k].id == n.category.img_id){
                n.category.imgs = imgs[k];
                n.category.imgUrl = '/storage/'+imgs[k].url;
                n.category.imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
            }
        });
        for(const key in website.categories){
            if(website.categories[key].id == n.category.id){
                website.categories[key] = n.category;

            }
        }
        drawCategoryList();
        $("#editCategory-editCategoryCancelBtn").trigger('click');
        window.guideHints.categories(website.categories);
    }else if(n.code == 17 && account.authorities[1] == 1){
        n.product.imgUrl = '/storage/imgs/cpanel/noimg.png';
        n.product.imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
        Object.keys(imgs).some(function(k) {
            if(imgs[k].id == n.product.img_id){
                n.product.imgs = imgs[k];
                n.product.imgUrl = '/storage/'+imgs[k].url;
                n.product.imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
            }
        });
        for(const key in website.products){
            if(website.products[key].id == n.product.id){
                website.products[key] = n.product;
            }
        }
        if(window.history.state.page == 'manage_products'){
            if(window.history.state.category != null){
                drawManageProductCards(window.history.state.category)
            }
        }
        window.guideHints.products(website.products);
        drawTodayHomeProducts();
    }else if(n.code == 22 && account.authorities[1] == 1){
        drawNotification(n,'prepend',true);
    }else if(n.code == 23 && account.authorities[3] == 1){
        website.template = n.template.id;
        website.templateData = n.template;
        drawCurrentTemplate(website.templateData)
        website.website_colors = n.template.colors;
        $('.colorCard').each(function(){
            if($(this).attr('colorId') == website.website_colors){
                $(this).trigger('click');
            }
        });
        website.useCustomColors = false;
        $('#websiteColors-useCustomColors').prop('checked',false);

        let websiteLogo;let websiteIcon;
        if(website.logo == null){
            websiteLogo = 'imgs/templates/'+website.template+'/logo.webp';
        }else{
            websiteLogo = website.logo;
        }
        $('#settings-websiteLogoImg').attr('src','/storage/'+websiteLogo);
        if(website.icon == null){
            websiteIcon = 'imgs/templates/'+website.template+'/icon.webp';
        }else{
            websiteIcon = website.icon;
        }
        $('#settings-websiteIconImg').attr('src','/storage/'+websiteIcon);


        $('#homePageSections-introCancelBtn').trigger('click');
        $('#design-homePageSections-infoCancelBtn').trigger('click');
        $('#design-homePageSections-ourStoryCancelBtn').trigger('click');
        window.guideHints.gallery();
        window.guideHints.homePageIntro();
        if(website.logo == null){
            websiteLogo = 'imgs/templates/'+website.template+'/logo.webp';
        }else{
            websiteLogo = website.logo;
        }
        $('#settings-websiteLogoImg').attr('src','/storage/'+websiteLogo);
        if(website.icon == null){
            websiteIcon = 'imgs/templates/'+website.template+'/icon.webp';
        }else{
            websiteIcon = website.icon;
        }
        $('#settings-websiteIconImg').attr('src','/storage/'+websiteIcon);
    }else if(n.code == 26 && account.authorities[1] == 1){
        for(const key in website.products){
            if(website.products[key].id == n.product_id){
                for(const key2 in website.products[key].product_options){
                    if(website.products[key].product_options[key2].id == n.option_id){
                        website.products[key].product_options.splice(key2,1);
                        window.guideHints.products(website.products);
                        if(window.history.state.popupPage == 'Product-Options' && window.history.state.editProductOptions == website.products[key].name){
                            setEditProductOptions(website.products[key].name)
                            closePopup();
                        }
                    }
                }
            }
        }
    }else if(n.code == 29 && account.authorities[3] == 1){
        if(n.useCustomColors == true){
            website.useCustomColors = true;
        }else{
            website.useCustomColors = false;
        }
        website.customColors.color1 = n.color1;
        website.customColors.color2 = n.color2;
        website.customColors.color3 = n.color3;
        website.customColors.color4 = n.color4;
        website.customColors.color5 = n.color5;
        website.customColors.colorError = n.colorError;
        website.customColors.colorSuccess = n.colorSuccess;
        website.customColors.colorWarning = n.colorWarning;
        website.customColors.colorStar = n.colorStar;
        $('#websiteColors-customColorCancelBtn').trigger('click');
    }else if(n.code == 30 && account.authorities[3] == 1){
        if(window.colorsFirstLoad){
            website.website_colors = n.websiteColor;
            $('#websiteColors-colorCancelBtn').trigger('click');
        }

    }else if(n.code == 36){
        website.payment_methods_count = n.paymentmethodsCount;
        window.guideHints.subscriptionCheck();
    }else if(n.code == 45 && account.authorities[3] == 1){
        website.slideShow = JSON.parse(JSON.stringify(n.slideShow))
        website.slideShow_contentTemp = JSON.parse(JSON.stringify(website.slideShow.content));
        window.guideHints.slideShow();
        $('#homePageSections-slideShowCancelBtn').trigger('click');
    }else if(n.code == 50 && account.authorities[3] == 1){
        website.gallery = n.gallery;
        window.guideHints.gallery();
        $('#homePageSections-galleryCancelBtn').trigger('click');
    }else if(n.code == 52 && account.authorities[3] == 1){
        website.intro.img = n.introImg;
        website.introImgUrl = `/storage/imgs/templates/${website.template}/intro.webp`
        Object.keys(imgs).some(function(k) {
            if(imgs[k].id == website.intro.img){
                website.imgs_introImg = imgs[k];
                website.introImgUrl = `/storage/${imgs[k].url}`
            }
        })
        website.intro.title_en = n.title_en;
        website.intro.title_es = n.title_es;
        website.intro.title_fr = n.title_fr;
        website.intro.title_de = n.title_de;
        website.intro.title_it = n.title_it;
        website.intro.title_eg = n.title_eg;
        website.intro.title_ar = n.title_ar;
        website.intro.title_ru = n.title_ru;
        website.intro.title_ua = n.title_ua;
        website.intro.des_en = n.des_en;
        website.intro.des_es = n.des_es;
        website.intro.des_fr = n.des_fr;
        website.intro.des_de = n.des_de;
        website.intro.des_it = n.des_it;
        website.intro.des_eg = n.des_eg;
        website.intro.des_ar = n.des_ar;
        website.intro.des_ru = n.des_ru;
        website.intro.des_ua = n.des_ua;
        $('#homePageSections-introCancelBtn').trigger('click');
        homePageIntroNoSaveCheck();
        window.guideHints.homePageIntro();
    }else if(n.code == 53 && account.authorities[3] == 1){
        website.info.img = n.infoImg;
        website.infoImgUrl = `/storage/imgs/templates/${website.template}/info.webp`
        Object.keys(imgs).some(function(k) {
            if(imgs[k].id == website.info.img){
                website.imgs_infoImg = imgs[k];
                website.infoImgUrl = `/storage/${imgs[k].url}`
            }
        })
        website.info.title_en = n.title_en;
        website.info.title_es = n.title_es;
        website.info.title_fr = n.title_fr;
        website.info.title_de = n.title_de;
        website.info.title_it = n.title_it;
        website.info.title_eg = n.title_eg;
        website.info.title_ar = n.title_ar;
        website.info.title_ru = n.title_ru;
        website.info.title_ua = n.title_ua;
        website.info.des_en = n.des_en;
        website.info.des_es = n.des_es;
        website.info.des_fr = n.des_fr;
        website.info.des_de = n.des_de;
        website.info.des_it = n.des_it;
        website.info.des_eg = n.des_eg;
        website.info.des_ar = n.des_ar;
        website.info.des_ru = n.des_ru;
        website.info.des_ua = n.des_ua;
        $('#homePageSections-infoCancelBtn').trigger('click');
        homePageInfoNoSaveCheck();
        window.guideHints.homePageInfo();
    }else if(n.code == 54 && account.authorities[3] == 1){
        website.ourStory.img = n.ourStoryImg;
        website.ourStoryImgUrl = `/storage/imgs/templates/${website.template}/ourStory.webp`
        Object.keys(imgs).some(function(k) {
            if(imgs[k].id == website.ourStory.img){
                website.imgs_ourStoryImg = imgs[k];
                website.ourStoryImgUrl = `/storage/${imgs[k].url}`
            }
        })
        website.ourStory.title_en = n.title_en;
        website.ourStory.title_es = n.title_es;
        website.ourStory.title_fr = n.title_fr;
        website.ourStory.title_de = n.title_de;
        website.ourStory.title_it = n.title_it;
        website.ourStory.title_eg = n.title_eg;
        website.ourStory.title_ar = n.title_ar;
        website.ourStory.title_ru = n.title_ru;
        website.ourStory.title_ua = n.title_ua;
        website.ourStory.des_en = n.des_en;
        website.ourStory.des_es = n.des_es;
        website.ourStory.des_fr = n.des_fr;
        website.ourStory.des_de = n.des_de;
        website.ourStory.des_it = n.des_it;
        website.ourStory.des_eg = n.des_eg;
        website.ourStory.des_ar = n.des_ar;
        website.ourStory.des_ru = n.des_ru;
        website.ourStory.des_ua = n.des_ua;
        $('#homePageSections-ourStoryCancelBtn').trigger('click');
        homePageOurStoryNoSaveCheck();
        window.guideHints.homePageOurStory();
    }else if(n.code == 55){
        // if(account.is_master == true){
            window.Echo.leave('cpanelNotification.'+website.id);
            ReloadForUpdate();
        // }
    }else if(n.code == 69 && account.authorities[4] == 1){
        setTimeout(function(){
            if(n.websiteStatus == 1){
                website.active = true;
                window.guideHints.websiteSwitch();
                checkWebsiteStatus();
            }else if(n.websiteStatus == 2){
                website.active = false;
                window.guideHints.websiteSwitch();
                checkWebsiteStatus();
            }
        },1000);
    }else if(n.code == 74 && account.is_master == 1){
        if(account.is_master == 1){
            $('.ticketStatus-'+n.msg.ticket_id).text(texts.support.ticketPending)
            $('.ticketStatus-'+n.msg.ticket_id).addClass('ticketStatusTag_pending')
            if(window.history.state.popupPage == 'ticket_browser' && window.history.state.ticket == n.msg.ticket_id){
                appendNewTicketMsg(n.msg,'append');
                $('#popupPageBody').animate({
                    scrollTop:$('#popupPageBody').height() + $('#popupPageBody')[0].scrollHeight,
                },500)
            }
            drawNotification(n,'prepend',true);
        }
    }else if(n.code == 75 && account.is_master == 1){
        if(account.is_master == 1){
            $('.ticketStatus-'+n.ticketId).text(texts.support.ticketSolved)
            $('.ticketStatus-'+n.ticketId).removeClass('ticketStatusTag_pending').addClass('ticketStatusTag_solved')
            if(window.history.state.popupPage == 'ticket_browser' && window.history.state.ticket == n.ticketId){
                $('#ticketBrowserInputContainer').text('');
            }
        }

    }else if(n.code == 76 && account.authorities[4] == 1){
        website.customLang_name = n.customLang_name;
        website.customLang_code = n.customLang_code;
        website.customLang_flag = n.customLang_flag;
        if(n.customLang_rtl == 1){
            website.customLang_rtl = true;
        }else{
            website.customLang_rtl = false;
        }
        $('#lang-customLanguageCancelBtn').trigger('click');
        if(website.customLang_code != ''){
            $('#langs-websiteLangsContainer').find('.langCard[lang="eg"]').removeClass('none');
        }else{
            $('#langs-websiteLangsContainer').find('.langCard[lang="eg"]').addClass('none');
        }

    }else if(n.code == 80 && account.is_master == 1){
        report = {
            id:n.financialReport_id,
            month:n.month,
            year:n.year,
            created_at:n.created_at,
        }
        appendFinancialReport(report,'prepend');
        drawNotification(n,'prepend',true)
    }else if(n.code == 81 && account.authorities[5] == 1){
        let userId = n.userId;
        n.userType == 'guest' ? userId = 'guest_'+n.userId : null;
        if(userId in liveChats){
            liveChats[userId].msgs[n.msg._id] = n.msg;
            liveChats[userId].lastMsg = n.msg;
            new chatWindow(userId).drawMsg(n.msg,'prepend')
        }
    }else if(n.code == 82 && account.authorities[5] == 1){
        let userId = n.userId;
        n.userType == 'guest' ? userId = 'guest_'+n.userId : null;
        unSeenChats(userId,'out');
        if(userId in liveChats){
            delete liveChats[userId];
            $('#liveChatMessageContainer-'+userId).remove();
            $('#chatWindow-'+userId).remove();
            $('#confirmDelete-Popup').css('display','none');
        }
    }else if(n.code == 83 && account.authorities[5] == 1){
        let userId = n.userId;
        n.userType == 'guest' ? userId = 'guest_'+n.userId : null;
        if(userId in liveChats){
            new chatWindow(userId).deleteMsg(n.msgId,n.now)
        }
    }




