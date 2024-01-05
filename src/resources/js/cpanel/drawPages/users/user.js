drawPopupPage_user_loading = function(userId){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.user}),
    );
    $('#popupPageBody').addClass('w400 mxw100p-40 p20').append(
        $('<div/>',{class:'row alnC jstfyS mX5 mB10'}).append(
            $('<div/>',{class:'br50p cardLoading h20 w20'}),
            $('<div/>',{class:'mX5 cardLoading h10w70 br10'}),
        ),
        $('<div/>',{class:'row wrap alnS jstfyS w100p-20 pX10'}).append(
            $('<div/>',{class:'br3 cardLoading h20 w20 mX5'}),
            $('<div/>',{class:'br3 cardLoading h20 w20 mX5'}),
            $('<div/>',{class:'br3 cardLoading h20 w20 mX5'}),
            $('<div/>',{class:'br3 cardLoading h20 w20 mX5'}),
        ),
        $('<div/>',{class:'area column alnS jstfyS'}).append(
            $('<div/>',{class:'mX5 mY5 cardLoading h10w100 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w150 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w100 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w200 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w50 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w50 br10'}),
        ),
        $('<div/>',{class:'area column alnS jstfyS'}).append(
            $('<div/>',{class:'mX5 mY5 cardLoading h10w100p-10 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w100p-10 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w100p-10 br10'}),
            $('<div/>',{class:'mX5 mY5 cardLoading h10w100p-10 br10'}),
        )
    )
    getUsersData([userId]).then(function(){
        drawPopupPage_user(website.users.find(item=> item.id == userId));
    })
}

drawPopupPage_user =function(user){
    if(typeof user === 'undefined'){
        showPopup_notFound(texts.users.userNotFound)
        popupPageClose(false);
        return;
    }
    let userIconClass;let usericonTooltip;
    user.isBanned ? userIconClass ='ico-userBlock cR fs1' : userIconClass = 'ico-user fs1';
    user.isBanned ? usericonTooltip = texts.users.bannedUser : usericonTooltip = null;
    $('#popupPageBody').text('').addClass('mxw100p-40 p20').append(
        $('<div/>',{class:'column alnS jstfyS'}).append(
            $('<div/>',{class:'row alnBL jstfyS mX10'}).append(
                $('<div/>',{class:userIconClass,tooltip:usericonTooltip}),
                $('<div/>',{class:'fs1 mX5',text:user.name})
            ),
            $('<div/>',{class:'mX5 row alnC jstfyS'}).append(
                $('<div/>',{class:`visitorOnlineIcon-user-${user.id}`}),
                $('<div/>',{class:`fs08 visitorActions-user-${user.id}`})
            ),
            $('<div/>',{class:'row alnS jstfyS mX5 mT5'}).append(
                $('<button/>',{class:'authority_5 ico-chat btn_icon openChatWindow',type:'user',user:user.id,tooltip:texts.users.chatWith.replace(':name:',user.name)}).append($('<span/>',{class:`chatIconUnseen none chatUnseen-user-${user.id}`})),
                $('<button/>',{class:'authority_0 ico-orders btn_icon cpPage',cpPage:'order_history',user:user.id,tooltip:texts.users.seePlacedOrders.replace(':name:',user.name)}),
                $('<button/>',{class:'authority_1 ico-product_reviews btn_icon cpPage',cpPage:'product_reviews',user:user.id,tooltip:texts.users.seeReviewPosted.replace(':name:',user.name)}),
                $('<button/>',{class:'authority_2 ico-settings btn_icon cpPage',cpPage:'manage_users',user:user.id,tooltip:texts.users.manageUserProfile.replace(':name:',user.name)}),
            ),
            $('<div/>',{class:'area column alnS jstfyS mT40'}).append(
                $('<div/>',{class:'areaTitle',text:texts.users.userInfo}),
                $('<div/>',{class:'fs085 mT10 row alnBL jstfyS'}).append(
                    $('<span/>',{class:'ico-email_address mie-5',tooltip:texts.users.userEmail}),
                    $('<span/>',{text:user.email})
                ),
                $('<div/>',{class:'fs085 mT10 row alnBL jstfyS'}).append(
                    $('<span/>',{class:'ico-phone_number mie-5',tooltip:texts.users.userPhoneNumber}),
                    $('<span/>',{text:user.phoneNumber})
                ),
                $('<div/>',{class:'fs085 mT10 row alnBL jstfyS'}).append(
                    $('<span/>',{class:'ico-address mie-5',tooltip:texts.users.userAddress}),
                    $('<span/>',{text:user.address})
                ),
                $('<div/>',{class:'fs085 mT10 row alnBL jstfyS'}).append(
                    $('<span/>',{class:'ico-user mie-5',tooltip:texts.users.userSignedUp}),
                    $('<span/>',{text:`${texts.users.userSince} ${getDate(user.created_at).date.local}`})
                ),
            ),
            $('<div/>',{class:'area mT20 pT20'}).append(
                $('<div/>',{class:'areaTitle',text:texts.users.userCart}),
                $('<div/>',{class:`userPageCart-${user.id}`})
            )
        )

    )
    drawUserPageCart(user.id)
    setUserOnlineStatus(user.id,'user')
    setUnseenChat('user',user.id)
}

drawUserPageCart = function(userId){
    let user = website.users.find(item=>item.id == userId);
    let userCart = JSON.parse(user.cart);
    $(`.userPageCart-${userId}`).text('')
    if(Object.keys(userCart).length == 0){
        $(`.userPageCart-${userId}`).append(
            $('<div/>',{
                class:'m10 fs085',
                text:texts.users.useCartEmpty.replace(':name:',user.name),
            })
        )
    }else{
        for(const key in userCart){
            let cartItem = userCart[key];
            let product = website.products.find(item=> item.id == cartItem.productId)
            if(typeof(product) !== 'undefined'){
                $(`.userPageCart-${userId}`).append(
                    $('<div/>',{
                        class:'row alnC jstfyS mX5'
                    }).append(
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{text:cartItem.qty+'x'}),
                            $('<a/>',{class:'popupPage popupId mX5',popupId:'product',popupPage:'product',product:product.name,text:product.name})
                        )
                    )
                )
            }
        }
        $(`.userPageCart-${userId}`).append(
            $('<div/>',{
                class:'fs07 c_white-8 w100p taE mT10',
                text:texts.users.cartLastUpdate+' '+diffTime(user.cart_lastUpdate)
            })
        )
    }
}
