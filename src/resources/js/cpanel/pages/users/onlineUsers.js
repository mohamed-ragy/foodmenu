onlineUser = function(userId,userType){
    let onlineUser = window.online.find(item=>item.id == userId && item.type == userType);
    if(onlineUser.is_pending){
        $(`.visitorOnlineIcon-${userType}-${userId}`).removeClass('offline-icon online-icon').addClass('onlineO-icon')
    }else{
        $(`.visitorOnlineIcon-${userType}-${userId}`).removeClass('offline-icon onlineO-icon').addClass('online-icon')
    }
    $(`.visitorActions-${userType}-${userId}`).text(onlineUser.lastActivity)
}
offlineUser = function(userId,userType){
    $(`.visitorOnlineIcon-${userType}-${userId}`).removeClass('online-icon onlineO-icon').addClass('offline-icon')
    let offlineUser = website.users.find(item=>item.id == userId)
    if(userType == 'user' && typeof(offlineUser) !== 'undefined'){
        $(`.visitorActions-${userType}-${userId}`).text('').append($('<span/>',{class:'diffTimeCalc',timeText:texts.users.userLastSeen,time:offlineUser.lastSeen}));
    }else if(userType == 'guest' || typeof(offlineUser) === 'undefined'){
        if(typeof(website.guests.find(item=>item.id == userId)) === 'undefined'){
            $(`.visitorActions-${userType}-${userId}`).text(texts.users.user_offline)
        }else{
            $(`.visitorActions-${userType}-${userId}`).text('').append($('<span/>',{class:'diffTimeCalc',timeText:texts.users.userLastSeen,time:website.guests.find(item=>item.id == userId).lastSeen}));
        }
    }
}

setUserOnlineStatus = function(userId,userType){
    let isOnline = false;
    if(typeof(window.online.find(item=>item.id == userId && item.type == userType)) !== 'undefined'){
        isOnline = true;
    }
    isOnline ? onlineUser(userId,userType) : offlineUser(userId,userType) ;
}

chandelUserActivity=function(n){
    let activity = texts.users[n.activity.status];
    switch(n.activity.status){
        case 'user_browse_category':
            let category = categories.find(item=>item.name == n.activity.category);
            if(typeof(category) === 'undefined'){
                activity = texts.users.user_online;
            }else{
                activity = texts.users.user_browse_category.replace(':category:',`<a class="popupPage popupId" popupId="category" popupPage="category" category="${category.name}">${category.name}</a>`)
            }
            break;
        case 'user_browse_product':
            let user_browse_product_product = products.find(item=>item.name == n.activity.product);
            if(typeof(user_browse_product_product) === 'undefined'){
                activity = texts.users.user_online;
            }else{
                activity = texts.users.user_browse_product.replace(':product:',`<a class="popupPage popupId" popupId="product" popupPage="product" product="${user_browse_product_product.name}">${user_browse_product_product.name}</a>`)
            }
            break;
        case 'user_trackOrder':
            activity = texts.users.user_trackOrder.replace(':order:',`<a class="popupPage popupId" popupId="order"  popupPage="order" order="${n.activity.order}">#${n.activity.order}</a>`)
            break;
        case 'user_writeReview':
            let user_writeReview_product = products.find(item=>item.name == n.activity.product);
            if(typeof(user_writeReview_product) === 'undefined'){
                activity = texts.users.user_online;
            }else{
                activity = texts.users.user_writeReview.replace(':product:',`<a class="popupPage popupId" popupPage="product" popupId="product" product="${user_writeReview_product.name}">${user_writeReview_product.name}</a>`)
            }
            break;
        case 'user_addItemToCart':
            let user_addItemToCart_product = products.find(item=>item.name == n.activity.product);
            if(typeof(user_addItemToCart_product) === 'undefined'){
                activity = texts.users.user_online;
            }else{
                activity = texts.users.user_addItemToCart.replace(':product:',`<a class="popupPage popupId" popupId="product" popupPage="product" product="${user_addItemToCart_product.name}">${user_addItemToCart_product.name}</a>`)
            }
            break;
    }
    $(`.visitorActions-${n.type}-${n.id}`).html(activity).attr('tooltip',activity)
}
    