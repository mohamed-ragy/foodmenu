loadWebsiteOrdersAndChats = function(callback=()=>{}){
    $('.loading_navIconNum').removeClass('none');
    hideList();

    window.waitFor_loadWebsiteOrdersAndChats = true;
    window.notificationsFirstLoad = false;
    website.notifications = [];
    website.notifications_unseen = [];

    $('#notificationsListConainer').text('')
    /////
    window.unSeenChats_users = [];
    window.unSeenChats_guests = [];
    window.chatBoxes = {users:[],guests:[]}
    window.chatMsgs = {}
    window.getFirstChatsCheck = false;

    window.getMoreChats_users = true;
    window.getMoreChats_guests = true;
    window.noMoreChats_users = false;
    window.noMoreChats_guests = false;
    website.users = [];
    website.guests = [];
    $('#liveChatMsgsListConainer').text('')
    $('#liveChatMsgsListConainer_guests').text('')
    $('.chatWindow').remove();
    /////
    window.incompleteOrdersCheck = false;
    website.incompleteOrders = [];
    try{
        if(window.history.state.page == 'incomplete_orders'){
            drawIncompleteOrdersTable_loading();
        }
    }catch{}
    /////////

    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getData:true,
        },
        success:function(response){
            $('.loading_navIconNum').addClass('none');
            ///////////
            response.last_activites.sort((a,b)=>{return a.created_at - b.created_at})
            window.last_activites = response.last_activites;
            for(const key in window.last_activites){
                drawActivityLog(window.last_activites[key],true)
            }
            //
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

            window.incompleteOrdersCheck = true;
            website.todayOrders = response.todayOrders;
            if(window.history.state.page == 'incomplete_orders'){
                drawIncompleteOrdersTable('all_orders','placed_at','desc');
            }
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

