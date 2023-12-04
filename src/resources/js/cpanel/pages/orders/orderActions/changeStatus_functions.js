changeOrderStatus = function(order_id,callback=()=>{}){
    let order = website.incompleteOrders.find(item=>item._id == order_id);
    if(typeof(order) === 'undefined'){return;}
    if(order.status == 2 || order.status == 5 || order.status == 6 || order.status == 7){return;}
    console.log(order);
    if(order.status == 0){
        $('#changeOrderStatus').text('').removeClass('none').append(
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_acceptOrder',text:texts.orders.acceptOrder}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_cancelOrder',text:texts.orders.cancelOrder}),
        )
    }else if(order.status == 1 && order.type == 1){
        $('#changeOrderStatus').text('').removeClass('none').append(
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsreadyForPickup',text:texts.orders.markAsreadyForPickup}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsPickedUp',text:texts.orders.markAsPickedUp}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_cancelOrder',text:texts.orders.cancelOrder}),
        )
    }else if(order.status == 4 && order.type == 1){
        $('#changeOrderStatus').text('').removeClass('none').append(
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsPickedUp',text:texts.orders.markAsPickedUp}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_cancelOrder',text:texts.orders.cancelOrder}),
        )
    }else if(order.status == 1 && order.type == 0){
        $('#changeOrderStatus').text('').removeClass('none').append(
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsOutForDelivery',text:texts.orders.markAsOutForDelivery}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_giveToDelivery',text:texts.orders.giveToDelivery}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsDelivered',text:texts.orders.markAsDelivered}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_cancelOrder',text:texts.orders.cancelOrder}),
        )
    }else if(order.status == 3){
        $('#changeOrderStatus').text('').removeClass('none').append(
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_giveToDelivery',text:texts.orders.giveToDelivery}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsDelivered',text:texts.orders.markAsDelivered}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_cancelOrder',text:texts.orders.cancelOrder}),
        )
    }else if(order.status == 1 && order.type == 2){
        $('#changeOrderStatus').text('').removeClass('none').append(
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsDiningin',text:texts.orders.markAsDiningin}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsDinedin',text:texts.orders.markAsDinedin}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_cancelOrder',text:texts.orders.cancelOrder}),
        )
    }else if(order.status == 8){
        $('#changeOrderStatus').text('').removeClass('none').append(
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_markAsDinedin',text:texts.orders.markAsDinedin}),
            $('<div/>',{order:order._id,class:'changeOrderStatusElem orderAction_cancelOrder',text:texts.orders.cancelOrder}),
        )
    }else{
        $('#changeOrderStatus').text('').addClass('none')
        return;
    }
    callback();

}
//////
acceptOrder = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            acceptOrder:true,
            order_id:order_id,
        },success:function(r){
            if(r.acceptOrderState == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 1;
                website.incompleteOrders.find(item=>item._id == order_id).accepted_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).accepted_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).accepted_account_id = account.id;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.acceptOrderState == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }

                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
//
cancelOrder = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            cancelOrder:true,
            order_id:order_id,
        },success:function(r){
            if(r.cancelOrderState == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 2;
                website.incompleteOrders.find(item=>item._id == order_id).canceled_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).canceled_by = 0;
                website.incompleteOrders.find(item=>item._id == order_id).canceled_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).canceled_account_id = account.id;
                for(const key in website.incompleteOrders){
                    if(website.incompleteOrders[key]._id == order_id){
                        website.orderHistory.push(website.incompleteOrders[key])
                        website.incompleteOrders.splice(key,1)
                    }
                }
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.cancelOrderState == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
//
markAsreadyForPickup = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            markAsreadyForPickup:true,
            order_id:order_id,
        },success:function(r){
            if(r.markAsreadyForPickupState == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 4;
                website.incompleteOrders.find(item=>item._id == order_id).ready_for_pickup_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).ready_for_pickup_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).ready_for_pickup_account_id = account.id;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.markAsreadyForPickupState == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
//
markAsPickedUp = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setPickedup:true,
            order_id:order_id,
        },success:function(r){
            if(r.setPickedUpOrderStatus == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 6;
                website.incompleteOrders.find(item=>item._id == order_id).pickedUp_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).pickedUp_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).pickedUp_account_id = account.id;
                for(const key in website.incompleteOrders){
                    if(website.incompleteOrders[key]._id == order_id){
                        website.orderHistory.push(website.incompleteOrders[key])
                        website.incompleteOrders.splice(key,1)
                    }
                }
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.setPickedUpOrderStatus == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
//
markAsOutForDelivery = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            markAsOutForDelivery:true,
            order_id:order_id,
        },success:function(r){
            if(r.markAsOutForDeliveryStatus == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 3;
                website.incompleteOrders.find(item=>item._id == order_id).out_for_delivery_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).out_for_delivery_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).out_for_delivery_account_id = account.id;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.markAsOutForDeliveryStatus == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
giveToDelivery = function(order_id,delivery_id){
    let delivery = website.deliveries.find(item=>item.id == delivery_id);
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            giveToDelivery:true,
            order_id:order_id,
            delivery_id:delivery_id,
        },success:function(r){
            if(r.giveToDeliveryStatus == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 3;
                website.incompleteOrders.find(item=>item._id == order_id).out_for_delivery_at = r.out_for_delivery_at;
                website.incompleteOrders.find(item=>item._id == order_id).delivery_id = delivery.id;
                website.incompleteOrders.find(item=>item._id == order_id).deliveryName = delivery.deliveryName;
                website.incompleteOrders.find(item=>item._id == order_id).out_for_delivery_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).out_for_delivery_account_id = account.id;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.giveToDeliveryStatus == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })

}
//
markAsDelivered = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setDelivered:true,
            order_id:order_id,
        },success:function(r){
            if(r.setDeliveredStatus == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 5;
                website.incompleteOrders.find(item=>item._id == order_id).delivered_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).delivered_by = 0;
                website.incompleteOrders.find(item=>item._id == order_id).delivered_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).delivered_account_id = account.id;
                for(const key in website.incompleteOrders){
                    if(website.incompleteOrders[key]._id == order_id){
                        website.orderHistory.push(website.incompleteOrders[key])
                        website.incompleteOrders.splice(key,1)
                    }
                }
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.setDeliveredStatus == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
//
markAsDiningin = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setDiningIn:true,
            order_id:order_id,
        },success:function(r){
            if(r.setDiningInStatus == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 8;
                website.incompleteOrders.find(item=>item._id == order_id).diningin_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).diningin_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).diningin_account_id = account.id;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.setDiningInStatus == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
//
markAsDinedin = function(order_id){
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.loading').removeClass('none').addClass('vV')
    $(`.orderStatusTagContainer[order="${order_id}"]`).find('.orderStatusTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setDinedIn:true,
            order_id:order_id,
        },success:function(r){
            if(r.setDinedInStatus == 1){
                website.incompleteOrders.find(item=>item._id == order_id).status = 7;
                website.incompleteOrders.find(item=>item._id == order_id).dinedin_at = r.now;
                website.incompleteOrders.find(item=>item._id == order_id).dinedin_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).dinedin_account_id = account.id;
                for(const key in website.incompleteOrders){
                    if(website.incompleteOrders[key]._id == order_id){
                        website.orderHistory.push(website.incompleteOrders[key])
                        website.incompleteOrders.splice(key,1)
                    }
                }
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                calcIncompleteOrders();
                showAlert('success',r.msg,4000,true)
            }else if(r.setDinedInStatus == 0){
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
//
