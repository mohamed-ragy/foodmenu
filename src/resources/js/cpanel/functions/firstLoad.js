loadWebsiteOrdersAndChats = function(callback=()=>{}){
    $('.loading_navIconNum').removeClass('none');
    window.waitFor_loadWebsiteOrdersAndChats = true;
    window.notificationsFirstLoad = false;
    website.notifications = [];
    website.notifications_unseen = [];
    $('#notificationsListConainer').text('')
    hideList($('#notificationsList'),$('#notifications'))
    /////
    window.getFirstChatsCheck = false;
    $('#liveChatMsgsListConainer').text('')
    $('#liveChatMsgsListConainer_guests').text('')
    hideList($('#liveChatMsgsList'),$('#liveChatMsgs'))
    /////
    window.incompleteOrdersCheck = false;
    /////////
    $('.ordersHomePageInfoLoading').removeClass('none');
    $('.ordersHomePageInfoIcon').addClass('none')

    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            FirstLoad:true,
        },
        success:function(response){
            $('.loading_navIconNum').addClass('none');
            ///////////
            for(const key in response.unSeenLiveChats){
                if(response.unSeenLiveChats[key].user_id){
                    window.unSeenChats_users.push(response.unSeenLiveChats[key].user_id);
                }else if(response.unSeenLiveChats[key].guest_id){
                    window.unSeenChats_guests.push(response.unSeenLiveChats[key].guest_id)
                }
            }

            ///////////////
            for(const key in response.incompleteOrders){
                website.incompleteOrders.push(
                    response.incompleteOrders[key]
                )
            }
            calcIncompleteOrders();
            // new orders().incompleteOrders();

            window.incompleteOrdersCheck = true;
            window.todayOrders = response.todayOrders;

            $('.ordersHomePageInfoLoading').addClass('none');
            $('.ordersHomePageInfoIcon').removeClass('none')

            drawTodayHomeOrders();

            for(const key in response.notifications){
                if(!response.notifications[key].seen){
                    website.notifications_unseen.push(response.notifications[key])
                }
            }
            window.pageNotifications.notifications = response.notifications.length;
            cpanelTitle(false);
        }
    }).done(function(){
        callback();
        window.waitFor_loadWebsiteOrdersAndChats = false;
    })

}

