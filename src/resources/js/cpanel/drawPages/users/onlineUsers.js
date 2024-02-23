drawPage_online_users = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<table/>',{id:'onlineUsersTable',class:'w100p',autoHelp:'online_visitors_list'})
        )
    )
    drawOnlineUsersTable();
}

drawOnlineUsersTable = function(){
    $('#onlineUsersTable').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'fs08 tnw taC vaM w5'}),
            $('<th/>',{class:'fs08 tnw taS vaM',text:texts.users.userName}),
            $('<th/>',{class:'fs08 tnw taS vaM w100p none-420',text:texts.users.status}),
            $('<th/>',{class:'fs08 tnw taE vaM'}),
        )
    )
    let onlineUsersGuestsCounter = 0;

    for(const key in online){
        // console.log(online[key])
        if(online[key].type == 'user' || online[key].type == 'guest'){
            onlineUsersGuestsCounter++;
            let hideGuestBtns = '';
            let userNameElem = $('<div/>',{text:online[key].name});
            online[key].type == 'user' ? userNameElem = $('<a/>',{class:'popupPage popupId',user:online[key].id,popupPage:'user',popupId:'user',text:online[key].name}) : null;
            online[key].type == 'guest' ? hideGuestBtns = 'none' : null;
            $('#onlineUsersTable').append(
                $('<tr/>',{class:''}).append(
                    $('<td/>',{class:'fs08 tnw taC vaM'}).append(
                        $('<span/>',{class:`visitorOnlineIcon-${online[key].type}-${online[key].id}`})
                    ),
                    $('<td/>',{class:'fs08 tnw taS vaM',}).append(
                        userNameElem
                    ),
                    $('<td/>',{class:`mxw0 none-420 fs08 tnw taS vaM`}).append(
                        $('<div/>',{class:`ellipsis visitorActions-${online[key].type}-${online[key].id} w100p`})
                    ),
                    $('<td/>',{class:'fs08 tnw taE vaM'}).append(
                        $('<button/>',{class:'btn_table authority_5 ico-chat openChatWindow',user:online[key].id,type:online[key].type,tooltip:texts.users.chatWith.replace(':name:',online[key].name)}).append($('<span/>',{class:`t6 l6 chatIconUnseen none chatUnseen-${online[key].type}-${online[key].id}`})),
                        $('<button/>',{class:`${hideGuestBtns} btn_table ico-orders authority_0 cpPage`,cpPage:'order_history',user:online[key].id,tooltip:texts.users.seePlacedOrders.replace(':name:',online[key].name)}),
                        $('<button/>',{class:`${hideGuestBtns} btn_table ico-product_reviews authority_1 cpPage`,cpPage:'product_reviews',user:online[key].id,tooltip:texts.users.seeReviewPosted.replace(':name:',online[key].name)}),
                        $('<button/>',{class:`${hideGuestBtns} btn_table ico-settings authority_2 cpPage`,cpPage:'manage_users',user:online[key].id,tooltip:texts.users.manageUserProfile.replace(':name:',online[key].name)}),
                    ),

                )
            )
            setUserOnlineStatus(online[key].id,online[key].type)
            setUnseenChat(online[key].type,online[key].id)
        }
    }
    if(onlineUsersGuestsCounter == 0 && window.websocketServerConnected == true){
        $('#onlineUsersTable').text('').append(
            $('<div/>',{class:'m10 fs09',text:texts.users.noOnlineUsers})
        )
    }
}
