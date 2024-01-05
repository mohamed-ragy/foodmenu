getOrder = function(order_id){
    return new Promise(function(resolve,reject){
        if(typeof(website.incompleteOrders.find(item=>item._id == order_id || item.id == order_id)) !== 'undefined'){
            return resolve(website.incompleteOrders.find(item=>item._id == order_id || item.id == order_id))
        }else if(typeof(website.orderHistory.find(item=>item._id == order_id || item.id == order_id)) !== 'undefined'){
            return resolve(website.orderHistory.find(item=>item._id == order_id || item.id == order_id))
        }else{
            $.ajax({
                url:'orders',
                type:'put',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    getOrder:order_id
                },success:function(r){
                    if(r.order == null){
                        return reject();
                    }
                    if(r.order != null){
                        website.orderHistory.push(r.order)
                    }
                    return resolve(r.order)
                }
            })
        }
    })
}
calcIncompleteOrders = function(){
    let incomplete = website.incompleteOrders.length;
    let pending = 0; let accepted = 0; let our_for_delivery = 0; let ready_for_pickup = 0; let dinginin = 0;
    for(const key in website.incompleteOrders){
        if(website.incompleteOrders[key].status == 0){pending++;}
        else if(website.incompleteOrders[key].status == 1){accepted++;}
        else if(website.incompleteOrders[key].status == 3){our_for_delivery++;}
        else if(website.incompleteOrders[key].status == 4){ready_for_pickup++;}
        else if(website.incompleteOrders[key].status == 8){dinginin++;}
    }
    window.pageNotifications.orders.pending = pending;
    window.pageNotifications.orders.accepted = accepted;
    window.pageNotifications.orders.withDelivery = our_for_delivery;
    window.pageNotifications.orders.readyToPickup = ready_for_pickup;
    window.pageNotifications.orders.diningIn = dinginin;
    $('.incompleteOrdersSum').text(incomplete)
    $('.pendingOrdersSum').text(pending)
    $('.acceptedOrdersSum').text(accepted)
    $('.our_for_deliveryOrdersSum').text(our_for_delivery)
    $('.ready_for_pickupOrdersSum').text(ready_for_pickup)
    $('.dingininOrdersSum').text(dinginin)
    incomplete == 0 ? $('.navElementNum.incompleteOrdersSum').addClass('none') : $('.navElementNum.incompleteOrdersSum').removeClass('none')
    pending == 0 ? $('#menuOrders-pending').addClass('none') : $('#menuOrders-pending').removeClass('none')
    accepted == 0 ? $('#menuOrders-accepted').addClass('none') : $('#menuOrders-accepted').removeClass('none')
    our_for_delivery == 0 ? $('#menuOrders-our_for_delivery').addClass('none') : $('#menuOrders-our_for_delivery').removeClass('none')
    ready_for_pickup == 0 ? $('#menuOrders-ready_for_pickup').addClass('none') : $('#menuOrders-ready_for_pickup').removeClass('none')
    dinginin == 0 ? $('#menuOrders-dinginin').addClass('none') : $('#menuOrders-dinginin').removeClass('none')

    cpanelTitle(false);
}
getDiscount = function(times){
    let hour = new Date(Date.parse(new Date().toLocaleString('en',{timeZone:website.timeZone}))).getHours();
    let minute = new Date(Date.parse(new Date().toLocaleString('en',{timeZone:website.timeZone}))).getMinutes();
    let now = new Date(Date.parse(new Date().toLocaleString('en',{timeZone:website.timeZone})));

    if(hour == 24){hour = '00';}
    switch( now.getDay()){
        case 1:yesterday = 'sunday';dayOfWeek = 'monday';break;
        case 2:yesterday = 'monday';dayOfWeek = 'tuesday';break;
        case 3:yesterday = 'tuesday';dayOfWeek = 'wednesday';break;
        case 4:yesterday = 'wednesday';dayOfWeek = 'thursday';break;
        case 5:yesterday = 'thursday';dayOfWeek = 'friday';break;
        case 6:yesterday = 'friday';dayOfWeek = 'saturday';break;
        case 0:yesterday = 'saturday';dayOfWeek = 'sunday';break;
    }

    todayDiscount = times[dayOfWeek].discount;
    todayFrom = parseFloat(times[dayOfWeek].Dfrom);
    todayTo = parseFloat(times[dayOfWeek].Dto);
    yesterdayDiscount = times[yesterday].discount;
    yesterdayFrom = parseFloat(times[yesterday].Dfrom);
    yesterdayTo = parseFloat(times[yesterday].Dto);

    if(minute < 10){minute = '0'+minute;}
    timeNow = parseFloat(hour+'.'+minute);

    if(parseInt(todayDiscount) > 0 && todayFrom < todayTo){
        if( timeNow >= todayFrom && timeNow <= todayTo){
            return todayDiscount;
        }
    }else if(parseInt(todayDiscount) > 0 && todayFrom > todayTo){
        if(timeNow >= todayFrom){
            return todayDiscount;
        }
    }

    if(parseInt(yesterdayDiscount) > 0 && yesterdayFrom > yesterdayTo){
        if(timeNow <= yesterdayTo){
            return yesterdayDiscount;
        }
    }
    return 0;
}
orderRow_data = function(order){
    let data = {};
    //date tooltip
    let dateTooltip = `<div class="mY2 fs09">${texts.orders.orderPlaced} (${getDate(order.placed_at).date_time_weekday.restaurant})</div>`
    order.accepted_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderAccepted} (${getDate(order.accepted_at).date_time_weekday.restaurant})</div>` : null;
    order.diningin_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderDiningIn} (${getDate(order.diningin_at).date_time_weekday.restaurant})</div>` : null;
    order.dinedin_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderDineIn} (${getDate(order.dinedin_at).date_time_weekday.restaurant})</div>` : null;
    order.out_for_delivery_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderWithDelivery} (${getDate(order.out_for_delivery_at).date_time_weekday.restaurant})</div>` : null;
    order.ready_for_pickup_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderreadyForPickup} (${getDate(order.ready_for_pickup_at).date_time_weekday.restaurant})</div>` : null;
    order.delivered_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderDelivered} (${getDate(order.delivered_at).date_time_weekday.restaurant})</div>` : null;
    order.pickedUp_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderPickedup} (${getDate(order.pickedUp_at).date_time_weekday.restaurant})</div>` : null;
    order.canceled_at != null ? dateTooltip = dateTooltip+`<div class="mY2 fs09">${texts.orders.orderCanceled} (${getDate(order.canceled_at).date_time_weekday.restaurant})</div>` : null;
    data.dateTooltip = dateTooltip;
    ///type
    if(order.type == 0){data.type = `<span class=" ico-delivery  fs105 c_delivery" tooltip='${texts.orders.delivery}'></span>`;data.typeTxt = texts.orders.delivery}
    else if(order.type == 1){data.type = `<span class=" ico-pickup  fs104 c_pickup" tooltip='${texts.orders.pickup}'></span>`;data.typeTxt = texts.orders.pickup}
    else if(order.type == 2){data.type = `<span class=" ico-dineIn  fs105 c_dineIn" tooltip='${texts.orders.dineIn}'></span>`;data.typeTxt = texts.orders.dineIn}
    ////////customer
    if(order.isGuest){
        data.user = `<div>${texts.cpanel.public.guest}</div>`
    }else{
        data.user = `<a class="popupPage popupId" popupPage="user" popupId="user" user="${order.user_id}">${order.userName}</a>`
    }
    //////items
    data.itemsPics = `<div class="row alnC jstfyS">`;
    let moreProdsTooltip = '<div>'
    for(const key in order.order_items){
        let item = order.order_items[key];
        let product = website.products.find(prod=> prod.id == item.product_id);
        if(typeof(product) === 'undefined'){productImg = `storage/imgs/cpanel/noimg.png`}
        else{productImg = product.thumbnail;}
        if(key == 0 || key == 1){
            data.itemsPics = data.itemsPics + `<img src="${productImg}" class="orderRowItemImg" tooltip="x${item.qty} ${item.productName}" />`
        }else{
            moreProdsTooltip = moreProdsTooltip + `<div>x${item.qty} ${item.productName}</div>`
        }
    }
    moreProdsTooltip = moreProdsTooltip + '</div>'
    if(order.order_items.length == 3){
        let item = order.order_items[2];
        let product = website.products.find(prod=> prod.id == item.product_id);
        if(typeof(product) === 'undefined'){productImg = `storage/imgs/cpanel/noimg.png`}
        data.itemsPics = data.itemsPics + `<img src="${productImg}" class="orderRowItemImg" tooltip="x${item.qty} ${item.productName}" />`
    }else if(order.order_items.length > 3){
        data.itemsPics = data.itemsPics + `<div class="orderRowItem" tooltip="${moreProdsTooltip}">+${order.order_items.length - 2}</div>`
    }
    data.itemsPics = data.itemsPics +`</div>`
    /////status
    switch(order.status){
        case 0 :
            data.status = 'pending';
            data.statusColor = 'c_white-10 ';
            data.statusIcon = 'ico-pending ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag c_white-10 pointer changeOrderStatus',order:order._id}).append(
                    $('<span/>',{class:'ico-pending fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.pending}),
                    $('<span/>',{class:'ico-down fs08 mis-10'})
                )
            )
            break;
        case 1 :
            data.status = 'accepted';
            data.statusColor = `cG ` ;
            data.statusIcon = 'ico-accepted ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag cG pointer changeOrderStatus',order:order._id}).append(
                    $('<span/>',{class:'ico-accepted fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.accepted}),
                    $('<span/>',{class:'ico-down fs08 mis-10'})
                )
            )
        break;
        case 2 :
            data.status = 'canceled';
            data.statusColor = 'cR ';
            data.statusIcon = 'ico-no ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag cR'}).append(
                    $('<span/>',{class:'ico-canceled fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.canceled}),
                )
            )
        break;
        case 3 :
            data.status = 'out_for_delivery';
            data.statusColor = 'cO ';
            data.statusIcon = 'ico-delivery ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag cO pointer changeOrderStatus',order:order._id}).append(
                    $('<span/>',{class:'ico-delivery fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.out_for_delivery}),
                    $('<span/>',{class:'ico-down fs08 mis-10'}),
                ),
                order.delivery_id != null ? $('<div/>',{class:'fs08 mY3',html:texts.orders.out_for_delivery_with.replace(':delivery:',`<a class="popupPage popupId" popupPage="delivery_account" popupId="delivery" delivery="${order.delivery_id}">${order.deliveryName}</a>`)}) : '',
            )
        break;
        case 4 :
            data.status = 'ready_for_pickup';
            data.statusColor = 'cO ';
            data.statusIcon = 'ico-pickup ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag pointer changeOrderStatus cO',order:order._id}).append(
                    $('<span/>',{class:'ico-pickup fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.ready_for_pickup}),
                    $('<span/>',{class:'ico-down fs08 mis-10'})
                )
            )
        break;
        case 5 :
            data.status = 'delivered';
            data.statusColor = 'cG ';
            data.statusIcon = 'ico-delivery ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag cG'}).append(
                    $('<span/>',{class:'ico-delivery fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.delivered}),
                )
            )
        break;
        case 6 :
            data.status = 'pickedUp';
            data.statusColor = 'cG ';
            data.statusIcon = 'ico-pickup ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag cG'}).append(
                    $('<span/>',{class:'ico-pickup fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.pickedUp}),
                )
            )
        break;
        case 7 :
            data.status = 'dinedIn';
            data.statusColor = 'cG ';
            data.statusIcon = 'ico-dineIn ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag cG'}).append(
                    $('<span/>',{class:'ico-dineIn fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.dinedIn}),
                )
            )
        break;
        case 8 :
            data.status = 'diningin';
            data.statusColor = 'cO ';
            data.statusIcon = 'ico-dineIn ';
            data.statusTag = $('<div/>',{class:'orderStatusTagContainer',order:order._id}).append(
                $('<div/>',{class:'loading none m0'}),
                $('<div/>',{class:'orderStatusTag cO pointer changeOrderStatus',order:order._id}).append(
                    $('<span/>',{class:'ico-dineIn fs09'}),
                    $('<span/>',{class:'mX5 ellipsis',text:texts.orders.diningIn}),
                    $('<span/>',{class:'ico-down fs08 mis-10'})
                )
            )
        break;
    }
    return data;
}
drawOrdersTableRow = function(order){
    let data = orderRow_data(order);
    let viewOrderTooltipTxt = texts.orders.manageOrder;
    if(order.status == 5 || order.status == 6 || order.status == 7 || order.status == 2){
        viewOrderTooltipTxt = texts.orders.viewOrder;
    }
    let orderRow = $('<tr/>',{class:'orderRow'}).append(
        $('<td/>',{class:''}).append(
            $('<a/>',{class:'fs101 bold500 mis-5 popupId popupPage',popupPage:'order',popupId:'order',order:order._id,text:`#${order.id}`})
        ),
        $('<td/>',{class:''}).append(
            data.type,
        ),
        $('<td/>',{class:'mnw100'}).append(
            $('<div/>',{class:'row alnC jstfyS'}).append(
                $('<div/>',{class:'fs1 diffTimeCalc',time:order.placed_at}).append($('<div/>',{class:'cardLoading h10 w70 br5'})),
                $('<div/>',{class:'ico-info mis-5 fs101',tooltip:data.dateTooltip})
            )
        ),
        $('<td/>',{class:''}).append(
            data.statusTag
        ),
        $('<td/>',{class:''}).append(
            data.itemsPics
        ),
        $('<td/>',{class:''}).append(
            data.user
        ),
        $('<td/>',{class:''}).append(
            $('<div/>',{class:'',text:`${website.currency}${bigFloat(order.total)}`})
        ),
        $('<td/>',{class:''}).append(
            $('<button/>',{class:'btn_table ico-open popupPage',popupPage:'order',order:order._id,tooltip:viewOrderTooltipTxt}),
            $('<button/>',{class:'btn_table ico-print fs104 printOrderReceipt',order:order._id,tooltip:texts.orders.printReceipt})
        ),
    )

    return orderRow;
}

