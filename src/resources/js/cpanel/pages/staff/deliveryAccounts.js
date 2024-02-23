
require('./deliveryAccounts/create.js')//done//
require('./deliveryAccounts/edit.js')//done//
require('./deliveryAccounts/delete.js')//done//

deliveryManOnline = function(deliveryId){
    $(`.deliveryOnlineIcon-${deliveryId}`).removeClass('offline-icon').addClass('online-icon');
    $(`.deliverylastSeen-${deliveryId}`).removeClass('diffTimeCalc').text(texts.staff.now)
    $(`.deliverylastSeen2-${deliveryId}`).removeClass('diffTimeCalc').text(texts.cpanel.public.online)
}
deliveryManOffline = function(deliveryId){
    $(`.deliveryOnlineIcon-${deliveryId}`).removeClass('online-icon').addClass('offline-icon');
    $(`.deliverylastSeen-${deliveryId}`).text('').addClass('diffTimeCalc').attr('time',website.deliveries.find(item=>item.id == deliveryId).lastSeen)
    $(`.deliverylastSeen2-${deliveryId}`).text('').addClass('diffTimeCalc').attr('time',website.deliveries.find(item=>item.id == deliveryId).lastSeen).attr('timetext',texts.staff.lastSeen)
}
setDeliveryManOnlineStatus = function(deliveryId){
    let deliveryOnlineCheck = false;
    for(const key in window.online){
        if(window.online[key].type == 'delivery' && window.online[key].id == deliveryId){
            deliveryOnlineCheck = true;
        }
    }
    deliveryOnlineCheck ? deliveryManOnline(deliveryId) : deliveryManOffline(deliveryId) ;
}
