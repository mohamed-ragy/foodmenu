let titleAlertInterval;
cpanelTitle = function(titleAlert){
    window.unSeenChats_users = [...new Set(window.unSeenChats_users)];
    window.unSeenChats_guests = [...new Set(window.unSeenChats_guests)];
    window.pageNotifications.chat.users = window.unSeenChats_users.length;
    window.pageNotifications.chat.guests = window.unSeenChats_guests.length;
    window.pageNotifications.chat.users > 0 ? $('.liveChatTabIconUnseen').removeClass('none') : $('.liveChatTabIconUnseen').addClass('none');
    window.pageNotifications.chat.guests > 0 ? $('.liveChatTabIconUnseen_guests').removeClass('none') : $('.liveChatTabIconUnseen_guests').addClass('none');
    // window.pageNotifications.orders set in the calcIncompleteOrders function the orders functions file
    $('.liveChatMsgsNumber').text(parseInt(window.pageNotifications.chat.users) + parseInt(window.pageNotifications.chat.guests))
    parseInt(window.pageNotifications.chat.guests) + parseInt( window.pageNotifications.chat.users) > 0 ? $('.liveChatMsgsNumber').removeClass('none') : $('.liveChatMsgsNumber').addClass('none');

    window.pageNotifications.notifications > 0 ? $('#notificationsNumber').removeClass('none') : $('#notificationsNumber').addClass('none') ;
    $('#notificationsNumber').text(window.pageNotifications.notifications)

    let titleNumber = parseInt(window.pageNotifications.chat.guests) +
                        parseInt(window.pageNotifications.chat.users) +
                        parseInt(window.pageNotifications.notifications) +
                        parseInt(window.pageNotifications.orders.pending) +
                        parseInt(window.pageNotifications.orders.accepted) +
                        parseInt(window.pageNotifications.orders.withDelivery) +
                        parseInt(window.pageNotifications.orders.readyToPickup) +
                        parseInt(window.pageNotifications.orders.diningIn);


    let title;
    let titleNumberTxt = '';
    titleNumber > 0 ? titleNumberTxt = `(${titleNumber})`:null;

    try{
        if(typeof(window.history.state.popupPage) !== 'undefined' ){
            title = `${titleNumberTxt} ${texts.cpanel.menu[window.history.state.popupPage]} | ${texts.cpanel.public.cpanel}`;
        }else{
            title = `${titleNumberTxt} ${texts.cpanel.menu[window.history.state.page]} | ${texts.cpanel.public.cpanel}`;
        }
    }catch{
        title = `${texts.cpanel.public.cpanel}`;
    }
    if(titleAlert && document.hidden){
        clearInterval(titleAlertInterval)
        let titleMsgSwitch = 0;
        $('title').text(`${window.pageNotifications.titleAlert}`)
        titleAlertInterval = setInterval(() => {
            if(titleMsgSwitch == 0){
                titleMsgSwitch = 1;
                $('title').text(title);
            }else{
                titleMsgSwitch = 0;
                $('title').text(`${window.pageNotifications.titleAlert}`)
            }
        }, 1500);
    }else{
        $('title').text(title);
    }
}


$(window).focus(function(){
    clearInterval(titleAlertInterval);
    setTimeout(() => {
        cpanelTitle();
    }, 1500);
})
