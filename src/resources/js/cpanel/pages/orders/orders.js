orders = class {
    constructor(orderId=null){
        if(account.authorities[0] == 0){
            return;
        }
        this.orderId = orderId;
    }

    incompleteOrders(orderStatus=null){
        website.incompleteOrders.sort((a,b)=>{
            return Date.parse(a.placed_at) - Date.parse(b.placed_at);
        })
        if(orderStatus == 'all'){
            $('.IncompleteOrderTypeElem').removeClass('IncompleteOrderTypeElem_selected');
            $('.IncompleteOrderTypeElem[orderStatus="all"]').addClass('IncompleteOrderTypeElem_selected')
        }else if(orderStatus == null){
            orderStatus = $('.IncompleteOrderTypeElem_selected').attr('orderStatus')
        }else{
            $('.IncompleteOrderTypeElem').removeClass('IncompleteOrderTypeElem_selected');
            $(`.IncompleteOrderTypeElem[orderStatus="${orderStatus}"]`).addClass('IncompleteOrderTypeElem_selected')
        }
        $('#orders-incompleteOrdersContainer').text('').append(
            $('<table/>',{class:'ordersListTable'}).append(
                $('<tr/>',{class:'orderRowHead'}).append(
                    $('<td/>',{text:texts.orders.order}),
                    $('<td/>',{text:texts.orders.status}),
                    $('<td/>',{text:texts.orders.items}),
                    $('<td/>',{text:texts.orders.customer}),
                    $('<td/>',{text:texts.orders.price}),
                    $('<td/>',{}),
                )
            )
        );
        let orderStatusCode;
        orderStatus == 'all' ? orderStatusCode = 'all' : null;
        orderStatus == 'pending' ? orderStatusCode = 0 : null;
        orderStatus == 'accepted' ? orderStatusCode = 1 : null;
        orderStatus == 'outForDelivery' ? orderStatusCode = 3 : null;
        orderStatus == 'readyForPickup' ? orderStatusCode = 4 : null;
        orderStatus == 'diningIn' ? orderStatusCode = 8 : null;
        let isOrdersToShow = false;
        for(const key in website.incompleteOrders){
            if(website.incompleteOrders[key].status == orderStatusCode || orderStatus == 'all'){
            isOrdersToShow = true;
            this.orderId = website.incompleteOrders[key].id;
                this.drawIncompleteOrderRow();
            }
        }

        !isOrdersToShow && orderStatus == 'all' ? $('#orders-incompleteOrdersContainer').text('').append($('<span/>',{class:'m20',text:texts.orders.noIncompleteOrders})) : null;
        !isOrdersToShow && orderStatus == 'pending' ? $('#orders-incompleteOrdersContainer').text('').append($('<span/>',{class:'m20',text:texts.orders.noPendingOrders})) : null;
        !isOrdersToShow && orderStatus == 'accepted' ? $('#orders-incompleteOrdersContainer').text('').append($('<span/>',{class:'m20',text:texts.orders.noAcceptedOrdes})) : null;
        !isOrdersToShow && orderStatus == 'outForDelivery' ? $('#orders-incompleteOrdersContainer').text('').append($('<span/>',{class:'m20',text:texts.orders.noOutForDeliveryOrders})) : null;
        !isOrdersToShow && orderStatus == 'readyForPickup' ? $('#orders-incompleteOrdersContainer').text('').append($('<span/>',{class:'m20',text:texts.orders.noReadyForPickupOrders})) : null;
        !isOrdersToShow && orderStatus == 'diningIn' ? $('#orders-incompleteOrdersContainer').text('').append($('<span/>',{class:'m20',text:texts.orders.noDiningInOrders})) : null;
        this.countIncompleteOrders();

    }


    drawIncompleteOrderRow(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}

        let orderRowData = this.orderRowData();
        let orderNoticeClass = '';
        order.notice == ''|| order.notice == null ? orderNoticeClass = 'none' : null;
        $('#orders-incompleteOrdersContainer').children().first().append(
            $('<tr/>',{class:'orderRow'}).append(
                orderRowData.number,
                orderRowData.statusTag,
                orderRowData.itemsPics,
                orderRowData.user,
                $('<td/>',{text:website.currency+parseFloat(order.total).toFixed(2),class:'c-placeholder2'}),
                $('<td/>',{class:'taE'}).append(
                    $('<div/>',{
                        class:' row alnC jstfyE'
                    }).append(
                        $('<span/>',{class:`ico-warning mX5 fs102 cO ${orderNoticeClass}`,tooltip:order.notice,}),
                        $('<span/>',{class:'ico-print pointer mie-5 fs104 c-placeholder2 order-printReceipt',orderId:order.id,tooltip:texts.orders.printReceipt}),
                        $('<span/>',{class:'ico-open pointer fs102 c-placeholder2 popupPage',popupPage:'Order',orderId:order.id,tooltip:texts.orders.viewOrder}),
                    )
                ),
            )
        )
    }
    emptyOrderHistoryTable(){
        $('#orderHistory-orderListContainer').text('').append(
            $('<table/>',{class:'ordersListTable'}).append(
                $('<tr/>',{class:'orderRowHead'}).append(
                    $('<td/>',{text:texts.orders.order}),
                    $('<td/>',{text:texts.orders.status}),
                    $('<td/>',{text:texts.orders.items}),
                    $('<td/>',{text:texts.orders.customer}),
                    $('<td/>',{text:texts.orders.price}),
                    $('<td/>',{}),
                )
            )
        );
    }

    drawOrderHistoryRow(order){
        website.orderHistory[order.id] = order;
        let orderRowData = this.orderRowData(order);
        let orderNoticeClass = '';
        order.notice == ''|| order.notice == null ? orderNoticeClass = 'none' : null;
        $('#orderHistory-orderListContainer').children().first().append(
            $('<tr/>',{class:'orderRow',placed_at:order.placed_at}).append(
                orderRowData.number,
                orderRowData.statusTag,
                orderRowData.itemsPics,
                orderRowData.user,
                $('<td/>',{text:website.currency+parseFloat(order.total).toFixed(2),class:'c-placeholder2'}),
                $('<td/>',{class:'taE'}).append(
                    $('<div/>',{
                        class:' row alnC jstfyE'
                    }).append(
                        $('<span/>',{class:`ico-warning mX5 fs102 cO ${orderNoticeClass}`,tooltip:order.notice,}),
                        $('<span/>',{class:'ico-print pointer mie-5 fs104 c-placeholder2 order-printReceipt',orderId:order.id,tooltip:texts.orders.printReceipt}),
                        $('<span/>',{class:'ico-open pointer fs102 c-placeholder2 popupPage',popupPage:'Order',orderId:order.id,tooltip:texts.orders.viewOrder}),
                    )
                ),
            )
        )
    }

    redrawChatOrder(){
        new orders(this.orderId).getOrder().then((order)=>{
            let orderData = new orders(this.orderId).orderRowData()
            $('.chatOrderContainer-'+this.orderId)
            .find('.chatOrderHead').text('').append(
                $('<div/>',{class:'row alnS jstfyS'}).append(
                    orderData.type,
                    $('<div/>',{class:'mis-5'}).append(
                        $('<div/>',{class:'fs101 bold',text:'#'+this.orderId}),
                        $('<div/>',{tooltip:orderData.dateTooltip,class:'fs09'}).append(
                            $('<span/>',{class:'diffTimeCalc',time:order.placed_at})
                        ),
                    )
                ),
                $('<span/>',{class:'ico-warning cO mis-5 cursorNormal chatOrderWarning',tooltip:texts.orders.chatOrderWorngUser}),
            )
            $('.chatOrderContainer-'+this.orderId).find('.chatOrderBody').text('').append(
                orderData.statusTag,
                $('<div/>',{class:'mT5'}),
                orderData.itemsPics,
                $('<div/>',{class:'fs101 mX5 mT3 bold',text:website.currency+parseFloat(order.total).toFixed(2)}),
                $('<div/>',{class:'mX5 w100p-10 row alnE jstfyE mT20'}).append(
                    $('<button/>',{class:'btn btn_s btn-cancel popupPage',text:texts.orders.viewOrder,popupPage:'Order',orderId:this.orderId})
                )
            )


            $('.chatOrderContainer-'+this.orderId).each(function(){
                if($(this).attr('userId') != order.user_id && order.isGuest == false){
                    $(this).find('.chatOrderWarning').removeClass('none');
                }else{
                    $(this).find('.chatOrderWarning').addClass('none');
                }
            })
        },()=>{
            $('.chatOrderContainer-'+this.orderId).find('.chatOrderBody').text('').append(
                $('<span/>',{class:'m10',text:texts.orders.wrongOrderNumber})
            )
        })
    }

    orderRowData(order=null){
        order == null ? order = website.incompleteOrders.find(item=> item.id == this.orderId): null;
        if(typeof(order) === 'undefined'){
            order = website.orderHistory[this.orderId];
        }
        if(typeof(order) === 'undefined'){return '';}
        let data = {};
        let dateTooltip = `<div class="mY5">${texts.orders.orderPlaced} (${getDateAndTime(order.placed_at)})</div>`
        order.received_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderAccepted} (${getDateAndTime(order.received_at)})</div>` : null;
        order.diningin_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderDiningIn} (${getDateAndTime(order.diningin_at)})</div>` : null;
        order.dinein_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderDineIn} (${getDateAndTime(order.dinein_at)})</div>` : null;
        order.withDelivery_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderWithDelivery} (${getDateAndTime(order.withDelivery_at)})</div>` : null;
        order.readyToPickup_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderreadyForPickup} (${getDateAndTime(order.readyToPickup_at)})</div>` : null;
        order.delivered_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderDelivered} (${getDateAndTime(order.delivered_at)})</div>` : null;
        order.pickedUp_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderPickedup} (${getDateAndTime(order.pickedUp_at)})</div>` : null;
        order.canceled_at != null ? dateTooltip = dateTooltip+`<div class="mY5">${texts.orders.orderCanceled} (${getDateAndTime(order.canceled_at)})</div>` : null;
        data.dateTooltip = dateTooltip;

        ///////
        if(order.type == 0){data.type = `<span class=" ico-delivery orderRowTypeTag  c-delivery" tooltip='${texts.orders.delivery}'></span>`}
        else if(order.type == 1){data.type = `<span class=" ico-pickup orderRowTypeTag  c-pickup" tooltip='${texts.orders.pickup}'></span>`}
        else if(order.type == 2){data.type = `<span class=" ico-dineIn orderRowTypeTag  c-dineIn" tooltip='${texts.orders.dineIn}'></span>`}
        ///////
        let userName;let userId;let userElem;let userClass;
        let userElem_orderNumber;
        order.isGuest ? userName = texts.cpanel.public.guest : userName = order.userName;
        order.isGuest ? userId = null : userId = order.user_id;
        order.isGuest ? userElem = 'div' : userElem = 'a';
        order.isGuest ? userClass = '' : userClass = 'popupPage';
        if(order.isGuest){
            data.user = `<td class="c-placeholder2 mxw100 ellipsis">${texts.cpanel.public.guest}</td>`
            userElem_orderNumber = `<div class="none block-1280 mY3 c-placeholder2 mxw100 ellipsis"><span class="ico-guest fs09"></span><span class="fs09 mX3">${texts.cpanel.public.guest}</span></div>`
        }else{
            data.user = `<td class="c-placeholder2 mxw100 ellipsis"><a class="popupPage ellipsis" popupPage="User" userId="${order.user_id}">${order.userName}</a></td>`
            userElem_orderNumber = `<div class="none block-1280 mY3 c-placeholder2 mxw100 ellipsis"><span class="ico-user fs09"></span><a class="popupPage ellipsis fs09 mX3" popupPage="User" userId="${order.user_id}">${order.userName}</a></div>`
        }
        ///////////////////
        data.number = `<td>
            <div class="row alnS jstfyS">
                ${data.type}
                <div class="mX10">
                    <div class="bold fs101">#${order.id}</div>
                    <div tooltip='${dateTooltip}' class="mY3 c-placeholder2 row alnBL jstfyS"><span class="ico-clock fs09"></span><span class="diffTimeCalc tnw fs09 mX3" time="${order.placed_at}">--</span></div>
                    ${userElem_orderNumber}
                    <div class="block-1366 none c-placeholder2 row alnBL jstfyS"></span><span class="tnw fs09">${website.currency}${parseFloat(order.total).toFixed(2)}</span></div>
                </div>
            </div>
        </td>`
        ///////
        data.withDelivery = ``;
        switch(order.status){
            case 0 :
                data.status = 'pending';
                data.statusIcon = 'ico-pending '
                data.statusTag = `<td><div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer c-placeholder2"><span class="m2 fs09 fs105-420 ico-pending"></span><span class="m2 ellipsis none-420">${texts.orders.pending}</span><span class="ico-down fs07 mis-5 none-420"></span></div></td>`
                break;
            case 1 :
                data.status = 'accepted';
                data.statusIcon = 'ico-accepted '
                data.statusTag = `<td><div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cG"><span class="m2 fs105-420 ico-accepted"></span><span class="m2 ellipsis none-420">${texts.orders.accepted}</span><span class="ico-down fs07 mis-5 none-420"></span></div></td>`
            break;
            case 2 :
                data.status = 'canceled';
                data.statusIcon = 'ico-no '
                data.statusTag = `<td><div class="orderRowStatusTag cR"><span class="m2 fs09 fs105-420 ico-no"></span><span class="m2 ellipsis none-420">${texts.orders.canceled}</span></div></td>`
            break;
            case 3 :
                data.status = 'withDelivery';
                data.statusIcon = 'ico-delivery fs102'
                data.statusTag = `<td><div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs101 fs105-420 ico-delivery"></span><span class="m2 ellipsis none-420">${texts.orders.withDelivery}</span><span class="ico-down fs07 mis-5 none-420"></span></div></td>`;
                if(order.delivery_id != null){
                    let deliveryName;
                    let deliveryMan = website.deliveries.find(item=> item.id == order.delivery_id);
                    if(typeof(deliveryMan) === 'undefined'){deliveryName = order.deliveryName}else{deliveryName = deliveryMan.deliveryName}
                    data.statusTag = `<td>
                        <div class="loading m0 none orderStatusLoading-${order.id}"></div>
                        <div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs101 fs105-420 ico-delivery"></span><span class="m2 ellipsis none-420">${texts.orders.withDelivery}</span><span class="ico-down fs07 mis-5 none-420"></span></div>
                        <div class="c-placeholder2 mT5 fs08 none-420">${texts.orders.outForDeliveryWith} <a class="popupPage" popupPage="Edit-Delivery-Account" deliveryAccount="${deliveryName}">${deliveryName.split('@')[0]}</a></div>
                    </td>`;
                }
            break;
            case 4 :
                data.status = 'readyForPickup';
                data.statusIcon = 'ico-pickup '
                data.statusTag = `<td><div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs09 fs105-420 ico-pickup"></span><span class="m2 ellipsis none-420">${texts.orders.readyForPickup}</span><span class="ico-down fs07 mis-5 none-420"></span></div></td>`
            break;
            case 5 :
                data.status = 'delivered';
                data.statusIcon = 'ico-delivery '
                data.statusTag = `<td><div class="orderRowStatusTag cG"><span class="m2 fs101 fs105-420 ico-delivery"></span><span class="m2 ellipsis none-420">${texts.orders.delivered}</span></div></td>`
            break;
            case 6 :
                data.status = 'pickedUp';
                data.statusIcon = 'ico-pickup '
                data.statusTag = `<td><div class="orderRowStatusTag cG"><span class="m2 fs09 fs105-420 ico-pickup"></span><span class="m2 ellipsis none-420">${texts.orders.pickedUp}</span></div></td>`
            break;
            case 7 :
                data.status = 'dineIn';
                data.statusIcon = 'ico-dineIn '
                data.statusTag = `<td><div class="orderRowStatusTag cG"><span class="m2 fs105-420 ico-dineIn"></span><span class="m2 ellipsis none-420">${texts.orders.dinedIn}</span></div></td>`
            break;
            case 8 :
                data.status = 'diningIn';
                data.statusIcon = 'ico-dineIn '
                data.statusTag = `<td><div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs09 fs105-420 ico-dineIn"></span><span class="m2 ellipsis none-420">${texts.orders.diningIn}</span><span class="ico-down fs07 mis-5 none-420"></span></div></td>`
            break;
        }
        //////////////////

        // if(order.order_items.length == 0){return data.itemsPics}
        data.itemsPics = `<td><div class="row alnC jstfyS">`;
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
        data.itemsPics = data.itemsPics +`</div></td>`
        return data;
    }
    showChangeStatus(elem){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $('#changeOrderStatusGiveToDelivery').hide();
        let acceptClass='';let readyForPickupClass = '';let pickedupClass = ''; let deliveredClass = ''; let withDeliveryClass = ''; let giveToDeliveryClass = ''; let diningInClass; let dineInClass = '';
        if(order.status == 0){
            readyForPickupClass = 'none';pickedupClass = 'none'; deliveredClass = 'none'; withDeliveryClass = 'none'; giveToDeliveryClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
        }else if(order.status == 1 && order.type == 0){
            acceptClass = 'none'; readyForPickupClass = 'none'; pickedupClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
        }else if(order.status == 1 && order.type == 1){
            acceptClass = 'none'; deliveredClass = 'none'; withDeliveryClass = 'none'; giveToDeliveryClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
        }else if(order.status == 1 && order.type == 2){
            acceptClass = 'none';readyForPickupClass='none';pickedupClass='none';deliveredClass='none';withDeliveryClass='none';giveToDeliveryClass='none';
        }else if(order.status == 3){
            acceptClass = 'none'; withDeliveryClass = 'none'; pickedupClass = 'none'; readyForPickupClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
        }else if(order.status == 4){
            acceptClass = 'none'; readyForPickupClass = 'none'; withDeliveryClass = 'none'; deliveredClass = 'none'; giveToDeliveryClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
        }else if(order.status == 8){
            acceptClass = 'none';readyForPickupClass='none';pickedupClass='none';deliveredClass='none';withDeliveryClass='none';giveToDeliveryClass='none'; diningInClass = 'none';
        }
        if(website.deliveries.length == 0){
            giveToDeliveryClass = 'none';
        }else if(giveToDeliveryClass != 'none'){
            $('#changeOrderStatusGiveToDelivery').text('');
            for(const key in website.deliveries){
                const delivery = website.deliveries[key];
                $('#changeOrderStatusGiveToDelivery').append(
                    $('<div/>',{class:'changeOrderStatusElem order-giveToDeliveryMan',orderId:order.id,deliveryId:delivery.id,text:delivery.deliveryName.split('@')[0]})
                )
            }
        }
        $('#changeOrderStatus').text('').append(
            $('<div/>',{orderId:order.id,class:acceptClass+' changeOrderStatusElem order-acceptOrder',text:texts.orders.acceptOrder}),
            $('<div/>',{orderId:order.id,class:diningInClass+' changeOrderStatusElem order-setDiningIn',text:texts.orders.markAsDiningin}),
            $('<div/>',{orderId:order.id,class:dineInClass+' changeOrderStatusElem order-setDineIn',text:texts.orders.markAsDinein}),
            $('<div/>',{orderId:order.id,class:readyForPickupClass+' changeOrderStatusElem order-setReadyForPickup',text:texts.orders.markAsreadyForPickup}),
            $('<div/>',{orderId:order.id,class:pickedupClass+' changeOrderStatusElem order-setPickedup',text:texts.orders.markAsPickedUp}),
            $('<div/>',{orderId:order.id,class:withDeliveryClass+' changeOrderStatusElem order-setWithDelivery',text:texts.orders.markAsWithDelivery}),
            $('<div/>',{class:giveToDeliveryClass+' changeOrderStatusElem order-giveToDelivery row alnBL jstfySB'}).append(
                $('<span/>',{text:texts.orders.giveToDelivery,class:''}),
                $('<span/>',{class:'ico-right fs07'})
            ),
            $('<div/>',{orderId:order.id,class:deliveredClass+' changeOrderStatusElem order-setDelivered',text:texts.orders.markAsDelivered}),
            $('<div/>',{orderId:order.id,class:'changeOrderStatusElem order-cancelOrder',text:texts.orders.cancelOrder}),
        )
        $('#changeOrderStatus').css({
            'display':'block',
            'left':elem.offset().left,
            'top':elem.offset().top + elem.outerHeight(),
        })
        if($('#changeOrderStatus').offset().top + $('#changeOrderStatus').outerHeight() > $(window).height()){
            $('#changeOrderStatus').css({
                'top':elem.offset().top  - $('#changeOrderStatus').outerHeight(),
            })
        }
        if($('#changeOrderStatus').offset().left + $('#changeOrderStatus').outerWidth() > $(window).width()){
            $('#changeOrderStatus').css({
                'left' : elem.offset().left - $('#changeOrderStatus').outerWidth() + elem.outerWidth(),
            })
        }
    }

    acceptOrder(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                acceptOrder:true,
                orderId:order.id,
            },success:function(r){
                if(r.receiveOrderStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status =1;
                            website.incompleteOrders[key].received_at = new Date().toISOString();
                            website.incompleteOrders[key].received_account_name = account.name;
                            website.incompleteOrders[key].received_account_id = account.id;
                            new orders().incompleteOrders();
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.receiveOrderStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    cancelOrder(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                cancelOrder:true,
                orderId:order.id,
            },success:function(r){
                if(r.cancelOrderStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 2;
                            website.incompleteOrders[key].canceled_at = new Date().toISOString();
                            website.incompleteOrders[key].canceled_by = 0;
                            website.incompleteOrders[key].canceled_account_name = account.name;
                            website.incompleteOrders[key].canceled_account_id = account.id;
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
                    showAlert('success',r.msg,4000,true)
                }else if(r.cancelOrderStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    setReadyForPickup(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                setReadyForPickup:true,
                orderId:order.id,
            },success:function(r){
                if(r.setReadyToPickupStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 4;
                            website.incompleteOrders[key].readyToPickup_at = new Date().toISOString();
                            website.incompleteOrders[key].readyToPickup_account_name = account.name;
                            website.incompleteOrders[key].readyToPickup_account_id = account.id;
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                            new orders().incompleteOrders();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.setReadyToPickupStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    setPickedup(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                setPickedup:true,
                orderId:order.id,
            },success:function(r){
                if(r.setPickedUpOrderStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 6;
                            website.incompleteOrders[key].pickedUp_at = new Date().toISOString();
                            website.incompleteOrders[key].pickedUp_account_name = account.name;
                            website.incompleteOrders[key].pickedUp_account_id = account.id;
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
                    showAlert('success',r.msg,4000,true)
                }else if(r.setPickedUpOrderStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    setWithDelivery(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                setWithDelivery:true,
                orderId:order.id,
            },success:function(r){
                if(r.setWithDeliveryStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 3;
                            website.incompleteOrders[key].withDelivery_at = new Date().toISOString();
                            website.incompleteOrders[key].withDelivery_account_name = account.name;
                            website.incompleteOrders[key].withDelivery_account_id = account.id;
                            new orders().incompleteOrders();
                            let orderId = website.incompleteOrders[key].id;
                            new orders(orderId).redrawChatOrder();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.setWithDeliveryStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    giveToDelivery(deliveryId){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        let delivery = website.deliveries.find(item=> item.id == deliveryId);
        if(typeof(order) === 'undefined' || typeof(delivery) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                giveToDelivery:true,
                orderId:order.id,
                deliveryId:delivery.id,
                deliveryName:delivery.deliveryName,
            },success:function(r){
                if(r.giveToDeliveryStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 3;
                            website.incompleteOrders[key].delivery_id = delivery.id;
                            website.incompleteOrders[key].deliveryName = delivery.deliveryName;
                            website.incompleteOrders[key].withDelivery_at = new Date().toISOString();
                            website.incompleteOrders[key].withDelivery_account_name = account.name;
                            website.incompleteOrders[key].withDelivery_account_id = account.id;
                            new orders().incompleteOrders();
                            let orderId = website.incompleteOrders[key].id;
                            new orders(orderId).redrawChatOrder();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.giveToDeliveryStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    setDelivered(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                setDelivered:true,
                orderId:order.id,
            },success:function(r){
                if(r.setDeliveredStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 5;
                            website.incompleteOrders[key].delivered_at = new Date().toISOString();
                            website.incompleteOrders[key].delivered_by = 0;
                            website.incompleteOrders[key].delivered_account_name = account.name;
                            website.incompleteOrders[key].delivered_account_id = account.id;
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
                    showAlert('success',r.msg,4000,true)
                }else if(r.setDeliveredStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    setDineIn(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                setDineIn:true,
                orderId:order.id,
            },success:function(r){
                if(r.setDineInStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 7;
                            website.incompleteOrders[key].dinein_at = new Date().toISOString();
                            website.incompleteOrders[key].dinein_account_name = account.name;
                            website.incompleteOrders[key].dinein_account_id = account.id;
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
                    showAlert('success',r.msg,4000,true)
                }else if(r.setDineInStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    setDiningIn(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderStatus-${this.orderId}`).addClass('none')
        $(`.orderStatusLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderStatusGiveToDelivery').hide();
        $('#changeOrderStatus').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                setDiningIn:true,
                orderId:order.id,
            },success:function(r){
                if(r.setDineInStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].status = 8;
                            website.incompleteOrders[key].diningin_at = new Date().toISOString();
                            website.incompleteOrders[key].diningin_account_name = account.name;
                            website.incompleteOrders[key].diningin_account_id = account.id;
                            new orders().incompleteOrders();
                            let orderId = website.incompleteOrders[key].id;
                            new orders(orderId).redrawChatOrder();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.setDineInStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    countIncompleteOrders(){
        let pendings = 0;let accepteds = 0;let withDeliverys = 0;let readyForPickups = 0;let diningIns = 0;
        for(const key in website.incompleteOrders){
            website.incompleteOrders[key].status == 0 ? pendings = pendings + 1 : null;
            website.incompleteOrders[key].status == 1 ? accepteds = accepteds + 1 : null;
            website.incompleteOrders[key].status == 3 ? withDeliverys = withDeliverys + 1 : null;
            website.incompleteOrders[key].status == 4 ? readyForPickups = readyForPickups + 1 : null;
            website.incompleteOrders[key].status == 8 ? diningIns = diningIns + 1 : null;
        }
        let incompleteOrdersSum = pendings+accepteds+withDeliverys+readyForPickups+diningIns;
        $('.pendingOrdersSum').text(pendings)
        $('.acceptedOrdersSum').text(accepteds)
        $('.withDeliveryOrdersSum').text(withDeliverys)
        $('.readyForPickupOrdersSum').text(readyForPickups)
        $('.diningInOrdersSum').text(diningIns)
        $('.incompleteOrdersSum').text(incompleteOrdersSum)

        pendings == 0 ? $('#menuOrders-pendingOrders').addClass('none') : $('#menuOrders-pendingOrders').removeClass('none');
        accepteds == 0 ? $('#menuOrders-acceptedOrders').addClass('none') : $('#menuOrders-acceptedOrders').removeClass('none');
        withDeliverys == 0 ? $('#menuOrders-withDeliveryOrders').addClass('none') : $('#menuOrders-withDeliveryOrders').removeClass('none');
        readyForPickups == 0 ? $('#menuOrders-readyForPickupOrders').addClass('none') : $('#menuOrders-readyForPickupOrders').removeClass('none');
        diningIns == 0 ? $('#menuOrders-diningInOrders').addClass('none') : $('#menuOrders-diningInOrders').removeClass('none');
        incompleteOrdersSum == 0 ? $('.navElementNum.incompleteOrdersSum').addClass('none') : $('.navElementNum.incompleteOrdersSum').removeClass('none')
        incompleteOrdersSum == 0 ? $('#noMenuOrders').removeClass('none') : $('#noMenuOrders').addClass('none')
        window.pageNotifications.orders.pending = pendings;
        window.pageNotifications.orders.accepted = accepteds;
        window.pageNotifications.orders.withDelivery = withDeliverys;
        window.pageNotifications.orders.readyToPickup = readyForPickups;
        window.pageNotifications.orders.diningIn = diningIns;
        window.pageNotifications.orders.titleAlert = '';
        cpanelTitle(false);
    }
    /////////////////////
    getOrder(){
        return new Promise((resolve, reject) => {
            let order;
            order = website.incompleteOrders.find(item=> item.id == this.orderId)
            typeof(order) === 'undefined' ? order = website.orderHistory[this.orderId] : resolve(order) ;
            if(typeof(order) === 'undefined'){
                $.ajax({
                    url:'orders',
                    type:'put',
                    data:{
                        _token:$('meta[name="csrf-token"]').attr('content'),
                        getOrder:this.orderId,
                    },success:function(r){
                        if(r.order == null){
                            reject();
                        }else{
                            website.orderHistory[r.order.id] = r.order;
                            resolve(r.order);
                        }
                    }
                })
            }else{
                resolve(order)
            }
        });
    }
    openOrder(){
        ///show order loading until promise is done
        $('#orderPage-orderDetails').text('').append(
            $('<div/>',{class:'column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3 mY20'}).append(
                $('<div/>',{class:'fs101 pY10 pX5 w100p-10 bgc-c3 bold',text:texts.orders.orderInfo}),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w100 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w150 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w100 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w200 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w150 mX5 br3'})),
            ),
            $('<div/>',{class:'column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3 mY20'}).append(
                $('<div/>',{class:'fs101 pY10 pX5 w100p-10 bgc-c3 bold',text:texts.orders.customer}),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w150 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w200 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w100 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w150 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w100 mX5 br3'})),
            ),
            $('<div/>',{class:'column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3 mY20'}).append(
                $('<div/>',{class:'fs101 pY10 pX5 w100p-10 bgc-c3 bold',text:texts.orders.orderLifecycle}),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w150 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w200 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w100 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w150 mX5 br3'})),
                $('<div/>',{class:'orderPage-orderDetailsElem_loading'}).append($('<div/>',{class:'cardLoading h5 w100 mX5 br3'})),
            )
        )
        this.getOrder()
        .then((order)=>{
            $('#orderWindowContainer').removeClass('none');
            $('#orderWindowNotFound').addClass('none');
            let popupPageCpPage = 'order_history';
            let popupPageTitle = texts.cpanel.menu.order_history;
            let popupPageTitleIcon = 'ico-order_history';
            if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
                popupPageCpPage = 'incomplete_orders';
                popupPageTitle = texts.cpanel.menu.incomplete_orders;
                popupPageTitleIcon = 'ico-orders';
                $('#orderPage-orderLifecycle').attr('autoHelp','162');
            }else{
                $('#orderPage-orderLifecycle').attr('autoHelp',null);
            }
            $('#popupPageTitle').text('')
            .attr('cpPage',popupPageCpPage)
            .append(
                $('<div/>',{class:popupPageTitleIcon}),
                $('<div/>',{class:'mX5',text:popupPageTitle}),
            )
            /////
            $('.orderPageTab-i').removeClass('orderPageTab_selected');
            $('.orderPageTab-l').removeClass('orderPageTab_selected');
            $('.orderPageTab-d').addClass('orderPageTab_selected');
            $('#orderPage-orderDetails').removeClass('h0 ofH');
            $('#orderPage-orderItems').addClass('h0 ofH');
            $('#orderPage-orderLifecycle').addClass('h0 ofH');
            $('#orderPage-windowTitle').text(`${texts.orders.order} #${order.id}`)
            this.orderId = order.id;
            this.drawOrder();
        },(error)=>{
            $('#orderWindowContainer').addClass('none');
            $('#orderWindowNotFound').removeClass('none')
        })
    }

    drawOrder(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        checkUseenNotifications([1,2,5],'order_id',this.orderId);
        if(typeof(order) === 'undefined'){
            order = website.orderHistory[this.orderId];
        }
        if(typeof(order) === 'undefined'){return;}
        let detailsAutoHelp = '';
        let customerAutoHelp = '';
        if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
            detailsAutoHelp = '160';
            customerAutoHelp = '161';
        }
        let orderData = this.getdrawOrderData();
        $('#orderPage-orderDetails').text('').append(
            $('<div/>',{class:'column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3 mY20',autoHelp:detailsAutoHelp}).append(
                $('<div/>',{class:'fs101 pY10 pX5 w100p-10 bgc-c3 bold',text:texts.orders.orderInfo}),
                $('<div/>',{class:'orderPage-orderDetailsElem'}).append(
                    $('<div/>',{text:texts.orders.orderNumber,class:'mie-50'}),
                    $('<div/>',{text:order.id,class:'taE'})
                ),
                $('<div/>',{class:'orderPage-orderDetailsElem'}).append(
                    $('<div/>',{}).append(
                        $('<div/>',{text:texts.orders.type,class:'mie-50'}),
                        orderData.typeModified,
                    ),
                    orderData.typeTag,
                ),
                $('<div/>',{class:'orderPage-orderDetailsElem'}).append(
                    $('<div/>',{text:texts.orders.status,class:'mie-50'}),
                    orderData.statusTag,
                ),
                orderData.paymentMethod,
                orderData.collectReviews,
                orderData.orderNotice,
            ),
            $('<div/>',{class:'column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3 mY20',autoHelp:customerAutoHelp}).append(
                $('<div/>',{class:'fs101 pY10 pX5 w100p-10 bgc-c3 bold',text:texts.orders.customer}),
                $('<div/>',{class:'orderPage-orderDetailsElem'}).append(
                    $('<div/>',{html:orderData.userName,class:'taE'})
                ),
                orderData.phoneNumber,
                orderData.address,
            ),
        )

        $('#orderPage-orderLifecycle').text('').append($('<div/>',{class:'w100p mY20 row wrap alnS jstfyS'}).append(orderData.lifecycle,orderData.lifecycleActions))
        $('#orderPage-orderLifecycle').find('.orderPage-orderActionsElemsContainer').find('.orderPage-orderActionElem').not('.none').find('.orderPage-orderActionElemCheck').first().removeClass('ico-check0').addClass('ico-check1')
        this.orderItems();
    }
    getdrawOrderData(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){
            order = website.orderHistory[this.orderId];
        }
        if(typeof(order) === 'undefined'){return;}
        let data = {};
        //////////info
        //status
        switch(order.status){
            case 0 :
                data.status = 'pending';
                data.statusIcon = 'ico-pending '
                data.statusTag = `<div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer c-placeholder2"><span class="m2 fs09 fs105-420 ico-pending"></span><span class="m2 ellipsis none-420">${texts.orders.pending}</span><span class="ico-down fs07 mis-5 none-420"></span></div>`
                break;
            case 1 :
                data.status = 'accepted';
                data.statusIcon = 'ico-accepted '
                data.statusTag = `<div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cG"><span class="m2 fs105-420 ico-accepted"></span><span class="m2 ellipsis none-420">${texts.orders.accepted}</span><span class="ico-down fs07 mis-5 none-420"></span></div>`
            break;
            case 2 :
                data.status = 'canceled';
                data.statusIcon = 'ico-no '
                data.statusTag = `<div class="orderRowStatusTag cR"><span class="m2 fs09 fs105-420 ico-no"></span><span class="m2 ellipsis none-420">${texts.orders.canceled}</span></div>`
            break;
            case 3 :
                data.status = 'withDelivery';
                data.statusIcon = 'ico-delivery fs102'
                data.statusTag = `<div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs101 fs105-420 ico-delivery"></span><span class="m2 ellipsis none-420">${texts.orders.withDelivery}</span><span class="ico-down fs07 mis-5 none-420"></span></div>`;
                if(order.delivery_id != null){
                    let deliveryName;
                    let deliveryMan = website.deliveries.find(item=> item.id == order.delivery_id);
                    if(typeof(deliveryMan) === 'undefined'){deliveryName = order.deliveryName}else{deliveryName = deliveryMan.deliveryName}
                    data.statusTag = `<div>
                        <div class="loading m0 none orderStatusLoading-${order.id}"></div>
                        <div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs101 fs105-420 ico-delivery"></span><span class="m2 ellipsis none-420">${texts.orders.withDelivery}</span><span class="ico-down fs07 mis-5 none-420"></span></div>
                        <div class="c-placeholder2 mT5 fs08 none-420">${texts.orders.outForDeliveryWith} <a class="popupPage" popupPage="Edit-Delivery-Account" deliveryAccount="${deliveryName}">${deliveryName.split('@')[0]}</a></div>
                    </div>`;
                }
            break;
            case 4 :
                data.status = 'readyForPickup';
                data.statusIcon = 'ico-pickup '
                data.statusTag = `<div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs09 fs105-420 ico-pickup"></span><span class="m2 ellipsis none-420">${texts.orders.readyForPickup}</span><span class="ico-down fs07 mis-5 none-420"></span></div>`
            break;
            case 5 :
                data.status = 'delivered';
                data.statusIcon = 'ico-delivery '
                data.statusTag = `<div class="orderRowStatusTag cG"><span class="m2 fs101 fs105-420 ico-delivery"></span><span class="m2 ellipsis none-420">${texts.orders.delivered}</span></div>`
            break;
            case 6 :
                data.status = 'pickedUp';
                data.statusIcon = 'ico-pickup '
                data.statusTag = `<div class="orderRowStatusTag cG"><span class="m2 fs09 fs105-420 ico-pickup"></span><span class="m2 ellipsis none-420">${texts.orders.pickedUp}</span></div>`
            break;
            case 7 :
                data.status = 'dineIn';
                data.statusIcon = 'ico-dineIn '
                data.statusTag = `<div class="orderRowStatusTag cG"><span class="m2 fs105-420 ico-dineIn"></span><span class="m2 ellipsis none-420">${texts.orders.dinedIn}</span></div>`
            break;
            case 8 :
                data.status = 'diningIn';
                data.statusIcon = 'ico-dineIn '
                data.statusTag = `<div class="loading m0 none orderStatusLoading-${order.id}"></div><div orderId="${order.id}" class="orderRowStatusTag changeOrderStatus orderStatus-${order.id} pointer cO"><span class="m2 fs09 fs105-420 ico-dineIn"></span><span class="m2 ellipsis none-420">${texts.orders.diningIn}</span><span class="ico-down fs07 mis-5 none-420"></span></div>`
            break;
        }
        //type
        if(order.type == 0){data.type = texts.orders.delivery;data.typeIcon = 'ico-delivery fs101 c-delivery'}
        else if(order.type == 1){data.type = texts.orders.pickup;data.typeIcon = 'ico-pickup c-pickup'}
        else if(order.type == 2){data.type = texts.orders.dineIn;data.typeIcon = 'ico-dineIn c-dineIn'}
        if(order.status == 0 || order.status == 1){
            data.typeTag = `
                <div class="row alnC jstfyE">
                    <div class="loading m0 none orderTypeLoading-${order.id}"></div>
                    <div orderId="${order.id}" class="orderTypeTag changeOrderType orderType-${order.id} pointer">
                        <span class="m2 fs105-420 ${data.typeIcon}"></span>
                        <span class="m2 none-420">${data.type}</span>
                        <span class="ico-down none-420 fs07 mis-5"></span>
                    </div>
                </div>
            `;
        }else{
            data.typeTag = `
            <div class="row alnC jstfyE">
                <div class="orderTypeTag">
                    <span class="m2 fs105-420 ${data.typeIcon}"></span>
                    <span class="m2 none-420">${data.type}</span>
                </div>
            </div>
        `;
        }
        data.typeModified = ``;
        if(order.typeEdit_account_id != null){
            data.typeModified = `
            <div class="fs08">
                <span>${texts.orders.modifiedBy}</span>
                <a class="popupPage" accountId="${order.typeEdit_account_id}" popupPage="Sub-Account">${order.typeEdit_account_name}</a>
            </div>
            `;
        }
        //paymentMethod
        data.paymentMethod = '';
        if(order.paymentMethod != '' && order.paymentMethod != null){
            data.paymentMethod = $('<div/>',{class:'orderPage-orderDetailsElem'}).append(
                $('<div/>',{text:texts.orders.paymentMethod,class:'mie-50'}),
                $('<div/>',{text:texts.orders[order.paymentMethod],class:'taE'})
            )
        }
        //collect reviews
        data.collectReviews = '';
        if(website.collectReviews && !order.isGuest){
            if(order.status == 5 || order.status == 6 || order.status  == 7){
                data.collectReviews = $('<div/>',{class:'orderPage-orderDetailsElem'}).append(
                    $('<div/>',{text:texts.orders.collectReviewsSeen,class:'mie-50'}),
                    $('<div/>',{text:order.collectReviewSeen ? texts.orders.seen : texts.orders.unSeen,class:'taE'})
                )
            }
        }
        //order notice
        data.orderNotice = '';
        let noticeEdited = ``;
        if(order.noticeEdit_account_id != null && order.noticeEdit_account_id != ''){
            noticeEdited = $('<div/>',{class:'fs08'}).append(
                $('<span/>',{text:texts.orders.modifiedBy,class:'mX3'}),
                $('<a/>',{class:'popupPage',accountId:order.noticeEdit_account_id,popupPage:'Sub-Account',text:order.noticeEdit_account_name})
            )
        }
        if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
            data.orderNotice = $('<div/>',{class:'orderPage-orderDetailsElem orderPage-changeOrderNoticeContainer column alnS jstfyS',orderId:order.id}).append(
                $('<div/>',{class:'mie-50'}).append(
                    $('<span/>',{text:texts.orders.orderNotice,class:'mie-5'}),
                    $('<span/>',{class:'none ico-warning cO orderPage-orderNoticeNoSave',tooltip:texts.cpanel.public.unsaved}),
                    noticeEdited
                ),
                $('<textarea/>',{maxlength:500,text:order.notice,class:'orderPage-changeOrderNotice textarea h50 fs1 brdr0 bgc-c1 br3 p5 mY5 w100p-10',placeholder:texts.orders.noticePlaceholder}),
                noticeEdited,
                $('<div/>',{class:'row alnC jstfyE w100p orderPage-changeOrderNoticeBtns none'}).append(
                    $('<button/>',{class:'btn btn_s btn-cancel orderPage-cancelChangeOrderNoticeBtn',text:texts.cpanel.public.cancel}),
                    $('<button/>',{class:'btn btn_s orderPage-changeOrderNoticeBtn'}).append(
                        $('<div/>',{class:'btnLoading_s'}),
                        $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                    )
                )
            )
        }else{
            if(order.notice != null && order.notice != ''){
                data.orderNotice = $('<div/>',{class:'orderPage-orderDetailsElem column alnS jstfyS'}).append(
                    $('<div/>',{text:texts.orders.orderNotice,class:'mie-50'}),
                    $('<div/>',{text:order.notice,class:'mxw330 mX10 mT5'}),
                    $('<div/>',{class:'mT20'}).append(
                        noticeEdited
                    )
                )
            }
        }
        /////////customer
        order.isGuest ? data.userName = `<span class="fs102">${texts.cpanel.public.guest}</span>` : data.userName = `<a class="popupPage fs102" popupPage="User" userId="${order.user_id}">${order.userName}</a>`;
        ///phoneNumber
        let phoneNumberEdited = ``;
        if(order.phoneEdit_account_id != null && order.phoneEdit_account_id != ''){
            phoneNumberEdited = $('<div/>',{class:'fs08 mT5'}).append(
                $('<span/>',{text:texts.orders.modifiedBy,class:'mX3'}),
                $('<a/>',{class:'popupPage',accountId:order.phoneEdit_account_id,popupPage:'Sub-Account',text:order.phoneEdit_account_name})
            )
        }
        if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
            data.phoneNumber = $('<div/>',{class:'orderPage-orderDetailsElem orderPage-changePhoneNumberContainer column alnS jstfyS',orderId:order.id}).append(
                $('<div/>',{class:'inputTextContainer m0 p0 w100p mxw100p bgc-c1 brdr0'}).append(
                    $('<div/>',{class:'inputTextIcon fs101 p0',tooltip:texts.orders.phoneNumber}).append($('<span/>',{class:'ico-phone_number'})),
                    $('<input/>',{class:'inputText grow2 orderPage-changePhoneNumber',placeholder:texts.orders.phoneNumber,value:order.phoneNumber}),
                    $('<span/>',{class:'ico-warning vH orderPage-changePhoneNumberNoSave cO mX5 fs103',tooltip:texts.cpanel.public.unsaved})
                ),
                phoneNumberEdited,
                $('<div/>',{class:'row alnC jstfyE w100p mT5 orderPage-changePhoneNumberBtns none'}).append(
                    $('<button/>',{class:'btn btn_s btn-cancel orderPage-cancelChangePhoneNumberBtn',text:texts.cpanel.public.cancel}),
                    $('<button/>',{class:'btn btn_s orderPage-changePhoneNumberBtn'}).append(
                        $('<div/>',{class:'btnLoading_s'}),
                        $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                    )
                )
            )
        }else{
            data.phoneNumber = $('<div/>',{class:'orderPage-orderDetailsElem column alnS jstfyS'}).append(
                    $('<div/>',{class:'row w100p alnC jstfySB'}).append(
                        $('<div/>',{text:texts.orders.phoneNumber,class:'mie-50'}),
                        $('<div/>',{html:order.phoneNumber,class:'taE'})
                    ),
                    phoneNumberEdited
                )
        }
        //////address
        data.address = ``;
        if(order.type == 0){
            let addressEdited = ``;
            if(order.addressEdit_account_id != null && order.addressEdit_account_id != ''){
                addressEdited = $('<div/>',{class:'fs08 mT5'}).append(
                    $('<span/>',{text:texts.orders.modifiedBy,class:'mX3'}),
                    $('<a/>',{class:'popupPage',accountId:order.addressEdit_account_id,popupPage:'Sub-Account',text:order.addressEdit_account_name})
                )
            }
            if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
                data.address = $('<div/>',{class:'orderPage-orderDetailsElem orderPage-changeAddressContainer column alnS jstfyS',orderId:order.id}).append(
                    $('<div/>',{class:'inputTextContainer m0 p0 w100p mxw100p bgc-c1 brdr0'}).append(
                        $('<div/>',{class:'inputTextIcon fs102 p0',tooltip:texts.orders.address}).append($('<span/>',{class:'ico-address'})),
                        $('<input/>',{class:'inputText grow2 orderPage-changeAddress',placeholder:texts.orders.address,value:order.address}),
                        $('<span/>',{class:'ico-warning vH orderPage-changeAddressNoSave cO mX5 fs103',tooltip:texts.cpanel.public.unsaved})
                    ),
                    addressEdited,
                    $('<div/>',{class:'row alnC jstfyE w100p mT5 orderPage-changeAddressBtns none'}).append(
                        $('<button/>',{class:'btn btn_s btn-cancel orderPage-cancelChangeAddressBtn',text:texts.cpanel.public.cancel}),
                        $('<button/>',{class:'btn btn_s orderPage-changeAddressBtn'}).append(
                            $('<div/>',{class:'btnLoading_s'}),
                            $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                        )
                    )
                )
            }else{
                data.address = $('<div/>',{class:'orderPage-orderDetailsElem column alnS jstfyS'}).append(
                    $('<div/>',{class:'row w100p alnC jstfySB'}).append(
                        $('<div/>',{text:texts.orders.address,class:'mie-50'}),
                        $('<div/>',{html:order.address,class:'taE'}),
                    ),
                    addressEdited
                )
            }
        }
        ////lifecycle
        data.lifecycle = $('<div/>',{class:'mB40 mX10 grow2'});
        let placedBy;
        if(order.placed_by == 0){
            placedBy = $('<a/>',{class:'popupPage',accountId:order.placed_account_id,popupPage:'Sub-Account',text:order.placed_account_name})
        }else if(order.placed_by == 1 && !order.isGuest){
            placedBy = $('<a/>',{class:'popupPage',popupPage:'User',userId:order.user_id,text:order.userName})
        }else if(order.placed_by == 1 && order.isGuest){
            placedBy = $('<span/>',{text:texts.cpanel.public.aGuest})
        }

        data.lifecycle.append(
            $('<div/>',{class:'orderLifecycleContainer'}).append(
                $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.placed_at,'onlyTime')}),
                $('<div/>',{class:'orderLifecycleLeft'}).append(
                    $('<div/>',{class:'orderLifecycleIcon ico-check c-placeholder2'}),
                    $('<div/>',{class:'orderLifecycleLine'})
                ),
                $('<div/>',{class:'orderLifecycleinfo'}).append(
                    $('<div/>',{class:'c-placeholder2 fs102',text:texts.orders.orderPlaced}),
                    $('<div/>',{class:'fs085'}).append(
                        $('<span/>',{class:'mie-3',text:texts.orders.by}),
                        placedBy,
                    ),
                    $('<div/>',{class:'fs085',text:getDateAndTime(order.placed_at,'noTime')}),
                )
            )
        )

        if(order.received_at != null && order.received_at != ''){
            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.received_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-accepted fs101 cG brdr-cG'}),
                        $('<div/>',{class:'orderLifecycleLine'})
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'fs102 cG',text:texts.orders.orderAccepted}),
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            $('<a/>',{class:'popupPage',accountId:order.received_account_id,popupPage:'Sub-Account',text:order.received_account_name}),
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.received_at,'noTime')}),
                    )
                )
            )

        }

        if(order.type == 2 && order.diningin_at != null && order.diningin_at != ''){
            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.diningin_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-dineIn fs101 cO brdr-cO'}),
                        $('<div/>',{class:'orderLifecycleLine'})
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'fs102 cO',text:texts.orders.orderDiningIn}),
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            $('<a/>',{class:'popupPage',accountId:order.diningin_account_id,popupPage:'Sub-Account',text:order.diningin_account_name}),
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.diningin_at,'noTime')}),
                    )
                )
            )
        }
        if(order.type == 2 && order.dinein_at != null && order.dinein_at != ''){
            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.dinein_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-dineIn fs101 cG brdr-cG'}),
                    ),
                    $('<div/>',{class:'column alnS jstfyS mT3'}).append(
                        $('<div/>',{class:'fs102 cG',text:texts.orders.orderDineIn}),
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            $('<a/>',{class:'popupPage',accountId:order.dinein_account_id,popupPage:'Sub-Account',text:order.dinein_account_name}),
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.dinein_at,'noTime')}),
                    )
                )
            )
        }

        if(order.type == 1 && order.readyToPickup_at != null && order.readyToPickup_at != ''){
            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.readyToPickup_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-pickup fs101 cO brdr-cO'}),
                        $('<div/>',{class:'orderLifecycleLine'})
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'fs102 cO',text:texts.orders.orderreadyForPickup}),
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            $('<a/>',{class:'popupPage',accountId:order.readyToPickup_account_id,popupPage:'Sub-Account',text:order.readyToPickup_account_name}),
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.readyToPickup_at,'noTime')}),
                    )
                )
            )
        }
        if(order.type == 1 && order.pickedUp_at != null && order.pickedUp_at != ''){
            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.pickedUp_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-pickup fs101 cG brdr-cG'}),
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'fs102 cG',text:texts.orders.orderPickedup}),
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            $('<a/>',{class:'popupPage',accountId:order.pickedUp_account_id,popupPage:'Sub-Account',text:order.pickedUp_account_name}),
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.pickedUp_at,'noTime')}),
                    )
                )
            )
        }

        if(order.type == 0 && order.withDelivery_at != null && order.withDelivery_at != ''){
            let withDeliveryWith = ``;
            if(order.delivery_id != null && order.delivery_id != ''){
                withDeliveryWith = $('<div/>',{class:'fs085'}).append(
                    $('<span/>',{class:'mie-3',text:texts.orders.outForDeliveryWith}),
                    $('<a/>',{class:'popupPage',deliveryAccount:order.deliveryName,popupPage:'Edit-Delivery-Account',text:order.deliveryName.split('@')[0]})
                )
            }

            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.withDelivery_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-delivery fs101 cO brdr-cO'}),
                        $('<div/>',{class:'orderLifecycleLine'})
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'fs102 cO',text:texts.orders.orderWithDelivery}),
                        withDeliveryWith,
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            $('<a/>',{class:'popupPage',accountId:order.withDelivery_account_id,popupPage:'Sub-Account',text:order.withDelivery_account_name}),
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.withDelivery_at,'noTime')}),
                    )
                )
            )
        }
        if(order.type == 0 && order.delivered_at != null && order.delivered_at != ''){

            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.delivered_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-delivery fs101 cG brdr-cG'}),
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'fs102 cG',text:texts.orders.orderDelivered}),
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            order.delivered_by == 0 ?
                            $('<a/>',{class:'popupPage',accountId:order.delivered_account_id,popupPage:'Sub-Account',text:order.delivered_account_name})
                            : order.delivered_by == 1 ?
                            $('<a/>',{class:'popupPage',deliveryAccount:order.delivered_delivery_id,popupPage:'Edit-Delivery-Account',text:order.delivered_delivery_name.split('@')[0]})
                            : null,
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.delivered_at,'noTime')}),
                    )
                )
            )
        }
        if(order.status == 2){
            let orderCancelBy;
            order.canceled_by == 0 ? orderCancelBy = $('<a/>',{class:'popupPage',accountId:order.canceled_account_id,popupPage:'Sub-Account',text:order.canceled_account_name}) : !order.isGuest ? orderCancelBy = $('<a/>',{class:'popupPage',userId:order.user_id,popupPage:'User',text:order.userName}) : orderCancelBy = $('<span/>',{text:texts.cpanel.public.aGuest});
            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:getDateAndTime(order.canceled_at,'onlyTime')}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-no fs101 cR brdr-cR'}),
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'fs102 cR',text:texts.orders.orderCanceled}),
                        $('<div/>',{class:'fs085'}).append(
                            $('<span/>',{class:'mie-3',text:texts.orders.by}),
                            orderCancelBy
                        ),
                        $('<div/>',{class:'fs085',text:getDateAndTime(order.canceled_at,'noTime')}),
                    )
                )
            )
        }
        data.lifecycleActions = $('<div/>',{class:'grow2 mB40 mX10'});
        if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
            let acceptClass='';let readyForPickupClass = '';let pickedupClass = ''; let deliveredClass = ''; let withDeliveryClass = ''; let giveToDeliveryClass = ''; let diningInClass; let dineInClass = '';
            if(order.status == 0){
                readyForPickupClass = 'none';pickedupClass = 'none'; deliveredClass = 'none'; withDeliveryClass = 'none'; giveToDeliveryClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
            }else if(order.status == 1 && order.type == 0){
                acceptClass = 'none'; readyForPickupClass = 'none'; pickedupClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
            }else if(order.status == 1 && order.type == 1){
                acceptClass = 'none'; deliveredClass = 'none'; withDeliveryClass = 'none'; giveToDeliveryClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
            }else if(order.status == 1 && order.type == 2){
                acceptClass = 'none';readyForPickupClass='none';pickedupClass='none';deliveredClass='none';withDeliveryClass='none';giveToDeliveryClass='none';
            }else if(order.status == 3){
                acceptClass = 'none'; withDeliveryClass = 'none'; pickedupClass = 'none'; readyForPickupClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
            }else if(order.status == 4){
                acceptClass = 'none'; readyForPickupClass = 'none'; withDeliveryClass = 'none'; deliveredClass = 'none'; giveToDeliveryClass = 'none'; dineInClass = 'none'; diningInClass = 'none';
            }else if(order.status == 8){
                acceptClass = 'none';readyForPickupClass='none';pickedupClass='none';deliveredClass='none';withDeliveryClass='none';giveToDeliveryClass='none'; diningInClass = 'none';
            }
            let giveToDeliveryElems = '';
            for(const key in website.deliveries){
                giveToDeliveryElems = giveToDeliveryElems + `
                <div class="orderPage-orderActionElem ${giveToDeliveryClass}" orderAction="giveToDelivery" deliveryId="${website.deliveries[key].id}">
                    <div class="ico-delivery_accounts cO fs102"></div>
                    <div class="mX5 grow2">${texts.orders.giveTo} ${website.deliveries[key].deliveryName.split('@')[0]}</div>
                    <div class="orderPage-orderActionElemCheck ico-check0"></div>
                </div>
                `
            }
            data.lifecycle.append(
                $('<div/>',{class:'orderLifecycleContainer'}).append(
                    $('<div/>',{class:'mY7 w70 taE',text:''}),
                    $('<div/>',{class:'orderLifecycleLeft'}).append(
                        $('<div/>',{class:'orderLifecycleIcon ico-seeMore c-placeholder brdr-placeholder fs101'}),
                    ),
                    $('<div/>',{class:'orderLifecycleinfo'}).append(
                        $('<div/>',{class:'c-placeholder2 fs102',text:texts.orders.waitingAction}),
                    )
                ),
            )

            data.lifecycleActions.append(

                $('<div/>',{class:'column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3 orderPage-orderActionsElemsContainer'}).append(
                    $('<div/>',{class:'fs101 pY10 pX5 w100p-10 bgc-c3 bold',text:texts.orders.orderActions}),

                    $('<div/>',{class:'orderPage-orderActionElem '+acceptClass,orderAction:'acceptOrder'}).append(
                        $('<div/>',{class:'ico-accepted cG'}),
                        $('<div/>',{text:texts.orders.acceptOrder,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),

                    $('<div/>',{class:'orderPage-orderActionElem '+diningInClass,orderAction:'setDiningIn'}).append(
                        $('<div/>',{class:'ico-dineIn cO'}),
                        $('<div/>',{text:texts.orders.markAsDiningin,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),
                    $('<div/>',{class:'orderPage-orderActionElem '+dineInClass,orderAction:'setDineIn'}).append(
                        $('<div/>',{class:'ico-dineIn cG'}),
                        $('<div/>',{text:texts.orders.markAsDinein,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),

                    $('<div/>',{class:'orderPage-orderActionElem '+readyForPickupClass,orderAction:'setReadyForPickup'}).append(
                        $('<div/>',{class:'ico-pickup cO'}),
                        $('<div/>',{text:texts.orders.markAsreadyForPickup,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),
                    $('<div/>',{class:'orderPage-orderActionElem '+pickedupClass,orderAction:'setPickedup'}).append(
                        $('<div/>',{class:'ico-pickup cG'}),
                        $('<div/>',{text:texts.orders.markAsPickedUp,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),

                    $('<div/>',{class:'orderPage-orderActionElem '+withDeliveryClass,orderAction:'setWithDelivery'}).append(
                        $('<div/>',{class:'ico-delivery cO'}),
                        $('<div/>',{text:texts.orders.markAsWithDelivery,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),
                    $(giveToDeliveryElems),
                    $('<div/>',{class:'orderPage-orderActionElem '+deliveredClass,orderAction:'setDelivered'}).append(
                        $('<div/>',{class:'ico-delivery cG'}),
                        $('<div/>',{text:texts.orders.markAsDelivered,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),

                    $('<div/>',{class:'orderPage-orderActionElem ',orderAction:'cancelOrder'}).append(
                        $('<div/>',{class:'ico-no cR'}),
                        $('<div/>',{text:texts.orders.cancelOrder,class:'mX5 grow2'}),
                        $('<div/>',{class:'orderPage-orderActionElemCheck ico-check0'})
                    ),
                ),
                $('<div/>',{class:'btnContainer'}).append(
                    $('<button/>',{orderId:order.id,class:'btn orderPage-takeAction'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.orders.takeAction})
                    )
                )
            )
        }
        return data;
    }
    showChangeType(elem){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        let deliveryClass = ''; let pickedupClass = ''; let dineInClass = '';
        order.type == 0 ? deliveryClass = 'none': null;
        order.type == 1 ? pickedupClass = 'none': null;
        order.type == 2 ? dineInClass = 'none' : null;
        $('#changeOrderType').text('').append(
            $('<div/>',{
                class:`${deliveryClass} order-changeOrderType`,
                orderType:0,
                orderId:order.id,
                text:texts.orders.delivery,
            }),
            $('<div/>',{
                class:`${pickedupClass} order-changeOrderType`,
                orderType:1,
                orderId:order.id,
                text:texts.orders.pickup,
            }),
            $('<div/>',{
                class:`${dineInClass} order-changeOrderType`,
                orderType:2,
                orderId:order.id,
                text:texts.orders.dineIn,
            }),
        )
        $('#changeOrderType').css({
            'display':'block',
            'left':elem.offset().left,
            'top':elem.offset().top + elem.outerHeight(),
        })
        if($('#changeOrderType').offset().left + $('#changeOrderType').outerWidth() > $(window).width()){
            $('#changeOrderType').css({
                'left' : elem.offset().left - $('#changeOrderType').outerWidth() + elem.outerWidth(),
            })
        }
    }
    changeOrderType(newType){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        $(`.orderType-${this.orderId}`).addClass('none')
        $(`.orderTypeLoading-${this.orderId}`).removeClass('none').css('visibility','visible')
        $('#changeOrderType').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeOrderType:true,
                orderId:order.id,
                newType:newType,
            },success:function(r){
                if(r.changeOrderTypeStatus == 1){
                    if(newType == 0){
                        showAlert('warning',texts.orders.changeTypeToDeliveryWarning,6000,true)
                    }
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].type = newType;
                            website.incompleteOrders[key].typeEdit_account_name = account.name;
                            website.incompleteOrders[key].typeEdit_account_id = account.id;

                            website.incompleteOrders[key].tax = r.tax;
                            website.incompleteOrders[key].taxPercent = r.taxPercent;
                            website.incompleteOrders[key].service = r.service;
                            website.incompleteOrders[key].servicePercent = r.servicePercent;
                            website.incompleteOrders[key].deliveryCost = r.deliveryCost;
                            website.incompleteOrders[key].total = r.total;
                            website.incompleteOrders[key].deliveryEdit_account_name = null;
                            website.incompleteOrders[key].deliveryEdit_account_id = null;
                            website.incompleteOrders[key].paymentMethod = null;
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                            new orders().incompleteOrders();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.changeOrderTypeStatus == 0){
                    showAlert('error',r.msg,4000,true)
                    new orders().incompleteOrders();
                }
            }
        })
    }
    changeOrderNoticeNoSaveCheck(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(order.notice != $('.orderPage-changeOrderNotice').val()){
            $('.orderPage-orderNoticeNoSave').removeClass('none');
            $('.orderPage-changeOrderNoticeBtns').removeClass('none')
        }else{
            $('.orderPage-orderNoticeNoSave').addClass('none');
            $('.orderPage-changeOrderNoticeBtns').addClass('none')
        }
    }
    changeOrderNotice(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(order.notice == $('.orderPage-changeOrderNotice').val()){return;}
        showBtnLoading($('.orderPage-changeOrderNoticeBtn'))
        let newNotice = $('.orderPage-changeOrderNotice').val();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeOrderNotice:true,
                orderId:this.orderId,
                newNotice:newNotice,
            },success:function(r){
                hideBtnLoading($('.orderPage-changeOrderNoticeBtn'))
                if(r.changeOrderNoticeStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].notice = newNotice;
                            website.incompleteOrders[key].noticeEdit_account_name = account.name;
                            website.incompleteOrders[key].noticeEdit_account_id = account.id;
                            new orders().incompleteOrders();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.changeOrderNoticeStatus == 0){
                    showAlert('error',r.msg,4000,true)
                }
            }
        })

    }
    changePhoneNumberNoSaveCheck(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(order.phoneNumber != $('.orderPage-changePhoneNumber').val()){
            $('.orderPage-changePhoneNumberNoSave').removeClass('vH');
            $('.orderPage-changePhoneNumberBtns').removeClass('none')

        }else{
            $('.orderPage-changePhoneNumberNoSave').addClass('vH');
            $('.orderPage-changePhoneNumberBtns').addClass('none')
        }
    }
    changePhoneNumber(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(order.phoneNumber == $('.orderPage-changePhoneNumber').val()){return;}

        showBtnLoading($('.orderPage-changePhoneNumberBtn'))
        let newPhoneNumber = $('.orderPage-changePhoneNumber').val();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changePhoneNumber:true,
                orderId:this.orderId,
                newPhoneNumber:newPhoneNumber,
            },success:function(r){
                hideBtnLoading($('.orderPage-changePhoneNumberBtn'))
                if(r.changePhoneNumberStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].phoneNumber = newPhoneNumber;
                            website.incompleteOrders[key].phoneEdit_account_name = account.name;
                            website.incompleteOrders[key].phoneEdit_account_id = account.id;
                            new orders().incompleteOrders();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.changePhoneNumberStatus == 0){
                    showAlert('error',r.msg,4000,true)
                }
            }
        })
    }
    changeAddressNoSaveCheck(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(order.address != $('.orderPage-changeAddress').val()){
            $('.orderPage-changeAddressNoSave').removeClass('vH');
            $('.orderPage-changeAddressBtns').removeClass('none');
        }else{
            $('.orderPage-changeAddressNoSave').addClass('vH');
            $('.orderPage-changeAddressBtns').addClass('none')
        }
    }
    changeAddress(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(order.address == $('.orderPage-changeAddress').val()){return;}

        showBtnLoading($('.orderPage-changeAddressBtn'))
        let newAddress = $('.orderPage-changeAddress').val();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeAddress:true,
                orderId:this.orderId,
                newAddress:newAddress,
            },success:function(r){
                hideBtnLoading($('.orderPage-changeAddressBtn'))
                if(r.changeAddressStatus == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == order.id){
                            website.incompleteOrders[key].address = newAddress;
                            website.incompleteOrders[key].addressEdit_account_name = account.name;
                            website.incompleteOrders[key].addressEdit_account_id = account.id;
                            new orders().incompleteOrders();
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true)
                }else if(r.changeAddressStatus == 0){
                    showAlert('error',r.msg,4000,true)
                }
            }
        })
    }

    orderItems(){
        let order = website.incompleteOrders.find(item=> item.id == this.orderId);
        if(typeof(order) === 'undefined'){
            order = website.orderHistory[this.orderId];
        }
        if(typeof(order) === 'undefined'){return;}
        $('#orderPage-orderItemsLoadingcover').addClass('none');

        $('#orderPage-deliveryCostNoSave').addClass('none').attr('tooltip',null)
        hideBtnLoading($('#orderPage-deliveryCostSaveBtn'))
        $('#orderPage-deliveryCostBtns').addClass('none');

        $('#orderPage-discountNoSave').addClass('none').attr('tooltip',null)
        hideBtnLoading($('#orderPage-discountSaveBtn'))
        $('#orderPage-discountBtns').addClass('none');

        if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
            $('#orderPage-orderItemsContainer').text('').attr('autoHelp','163')
        }else{
            $('#orderPage-orderItemsContainer').text('').attr('autoHelp',null)
        }
        $('#orderPage-orderItems_origianl').addClass('none');
        $('#orderPage-orderItems_origianlContainer').text('')
        for(const key in order.order_items){
            if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
                this.drawIncompleteOrderItem(order.order_items[key]);
                $('#orderPage-addItemBtn').removeClass('none');
                $('#orderPage-orderCheckContainer').attr('autoHelp','164')
            }else{
                this.drawCompleteOrderItem(order.order_items[key]);
                $('#orderPage-addItemBtn').addClass('none');
                $('#orderPage-orderCheckContainer').attr('autoHelp',null)
            }
        }
        if(order.order_items_original != null && order.order_items_original != ''){
            this.drawOrderOriginalItems(order.order_items_original);
            $('#orderPage-itemsLastModified').removeClass('none').text('').append(
                $('<span/>',{class:'mie-3',text:texts.orders.itemsLastModified}),
                $('<a/>',{class:'popupPage',accountId:order.itemsEdit_account_id,popupPage:'Sub-Account',text:order.itemsEdit_account_name})
            );
        }else{
            $('#orderPage-itemsLastModified').addClass('none').text('');
        }
        //draw order check
        $('#orderPage-printReceipt').attr('orderId',this.orderId)
        $('#orderPage-itemsTotal').text(parseFloat(order.itemsTotal).toFixed(2));
        $('#orderPage-discount_itemsTotal').text(parseFloat(order.discount_itemsTotal).toFixed(2));
        if(parseFloat(order.itemsTotal) > parseFloat(order.discount_itemsTotal)){
            $('#orderPage-discount_itemsTotal').removeClass('none')
            $('#orderPage-itemsTotal').addClass('lThrough')
        }else{
            $('#orderPage-discount_itemsTotal').addClass('none')
            $('#orderPage-itemsTotal').removeClass('lThrough')
        }
        if(order.discount_by == 0){
            $('#orderPage-discountBy').addClass('none').text('')
        }else if(order.discount_by == 1){
            $('#orderPage-discountBy').removeClass('none').text('').append(
                $('<span/>',{class:'mie-3',text:texts.orders.addedBy}),
                $('<a/>',{class:'popupPage',accountId:order.discount_account_id,popupPage:'Sub-Account',text:order.discount_account_name})
            )
        }else if(order.discount_by == 2){
            $('#orderPage-discountBy').removeClass('none').text('').append(
                $('<span/>',{class:'mie-3',text:texts.orders.addByScheduledDiscounts}),
            )
        }else if(order.discount_by == 3){
            $('#orderPage-discountBy').removeClass('none').text('').append(
                $('<span/>',{class:'mie-3',text:texts.orders.addByPromocode}),
                $('<a/>',{class:'popupPage',promocodeId:order.discount_promocode_id,popupPage:'Edit-Promocode',text:order.discount_promocode})
            )
        }



        parseFloat(order.tax) == 0 ? $('#orderPage-taxContainer').addClass('none') : $('#orderPage-taxContainer').removeClass('none');
        parseFloat(order.tax) > 0 ? $('#orderPage-tax').text(parseFloat(order.tax).toFixed(2)) : $('#orderPage-tax').text('');
        parseFloat(order.taxPercent) > 0 ? $('#orderPage-taxPercent').text(parseFloat(order.taxPercent).toFixed(2)+'%').removeClass('none') : $('#orderPage-taxPercent').text('').addClass('none');

        if(order.type == 2){

            parseFloat(order.service) == 0 ? $('#orderPage-serviceContainer').addClass('none') : $('#orderPage-serviceContainer').removeClass('none');
            parseFloat(order.service) > 0 ? $('#orderPage-service').text(parseFloat(order.service).toFixed(2)) : $('#orderPage-service').text('');
            parseFloat(order.servicePercent) > 0 ? $('#orderPage-servicePercent').text(parseFloat(order.servicePercent).toFixed(2)+'%').removeClass('none') : $('#orderPage-servicePercent').text('').addClass('none');
        }else{$('#orderPage-serviceContainer').addClass('none')}

        if(order.type == 0){
            if(order.status == 0 || order.status == 1 || order.status == 3 || order .status == 4 || order .status == 8){
                $('#orderPage-deliveryCost-complete').addClass('none')
                $('#orderPage-deliveryCost-incomplete').removeClass('none')
            }else{
                $('#orderPage-deliveryCost-incomplete').addClass('none')
                $('#orderPage-deliveryCost-complete').removeClass('none')
            }
            if(order.deliveryEdit_account_id == null || order.deliveryEdit_account_id == ''){
                $('#orderPage-deliveryCostEdited').addClass('none').text('')
            }else{
                $('#orderPage-deliveryCostEdited').removeClass('none').text('').append(
                    $('<span/>',{class:'mie-3',text:texts.orders.modifiedBy}),
                    $('<a/>',{class:'popupPage',accountId:order.deliveryEdit_account_id,popupPage:'Sub-Account',text:order.deliveryEdit_account_name})
                )
            }
            $('#orderPage-deliveryCost-complete').text(parseFloat(order.deliveryCost).toFixed(2))
            $('#orderPage-deliveryCostContainer').removeClass('none');
            $('#orderPage-deliveryCost').val(parseFloat(order.deliveryCost).toFixed(2))
        }else{$('#orderPage-deliveryCostContainer').addClass('none')}

        $('#orderPage-discount-complete').text(parseFloat(order.discount)+'%');
        $('#orderPage-discount').val(parseFloat(order.discount));
        if(order.status == 0 || order.status == 1 || order.status == 3 || order .status == 4 || order .status == 8){
            $('#orderPage-discount-complete').addClass('none')
            $('#orderPage-discount-incomplete').removeClass('none')
        }else{
            $('#orderPage-discount-incomplete').addClass('none')
            $('#orderPage-discount-complete').removeClass('none')
        }
        $('#orderPage-total').text(`${website.currency}${parseFloat(order.total).toFixed(2)}`)
    }

    drawCompleteOrderItem(item){
        let product = website.products.find(elem=> elem.id == item.product_id);
        let productImg;let productName;
        if(typeof(product) === 'undefined'){
            productImg = '/storage/imgs/cpanel/noimg.png';
            productName = `<span class="mie-10">${item.productName} <span class="fs08">(${texts.cpanel.public.deletedProduct})</span></span>`
        }else{
            productImg = product.thumbnail;
            productName = $('<a/>',{text:item.productName,class:'popupPage mie-10 fs102',popupPage:'Product',product:item.productName});
        }
        $('#orderPage-orderItemsContainer').append(
            $('<div/>',{
                class:'orderItemContainer',
            }).append(
                $('<div/>',{
                    class:'w100p row alnC jstfyS'
                }).append(
                    $('<img/>',{
                        class:'alnsS h50 w50 ofCover br3 mX5',
                        src:productImg,
                    }),
                    $('<div/>',{
                        class:'grow2 alnsS mX5',
                    }).append(
                        $('<div/>',{
                            class:'row alnC jstfySB w100p'
                        }).append(
                            $('<div/>').append(
                                productName,
                            ),
                            $('<div/>',{text:website.currency+parseFloat(item.total).toFixed(2),class:'bold mT3'}),
                        ),
                        $('<div/>',{text:`${texts.orders.qty}: ${item.qty}`}),
                        thisItemOptions = $('<div/>',{class:'row wrap alnC jstfyS '}),
                    ),
                ),

                item.itemNotice != null && item.notice != '' ?
                $('<div/>',{
                    class:`row  alnC jstfyS mT5`,
                    tooltip:texts.orders.specialRequest
                }).append(
                    $('<div/>',{class:'ico-info'}),
                    $('<div/>',{class:'mX5 w100p-10',text:item.itemNotice}),
                )
                : null
            )
        )
        for(const key in item.order_item_option_selections){
            let option = item.order_item_option_selections[key];
            thisItemOptions.append(
                $('<div/>',{
                    class:'row alnC jstfyC p5 mT5 mie-5 shdw2 br3 fs09 bgc-c1'
                }).append(
                    $('<div/>',{
                        text:`${option.optionName}: ${option.selectionName}`,
                    }),
                )
            )
        }
    }
    drawIncompleteOrderItem(item){
        let product = website.products.find(elem=> elem.id == item.product_id);
        let productImg;let productName;
        if(typeof(product) === 'undefined'){
            productImg = '/storage/imgs/cpanel/noimg.png';
            productName = `<span class="mie-10">${item.productName} <span class="fs08">(${texts.cpanel.public.deletedProduct})</span></span>`
        }else{
            productImg = product.thumbnail;
            productName = $('<a/>',{text:item.productName,class:'popupPage mie-10 fs102',popupPage:'Product',product:item.productName});
        }
        $('#orderPage-orderItemsContainer').append(
            $('<div/>',{
                class:'orderItemContainer',
                itemId:item._id,
                orderId:this.orderId,
            }).append(
                $('<div/>',{
                    class:'w100p row alnC jstfyS'
                }).append(
                    $('<div/>',{
                        class:'ico-close alnsC p5 br3  cR pointer orderPage-removeItem',
                        tooltip:texts.orders.removeItem,
                    }),
                    $('<img/>',{
                        class:'alnsS h50 w50 ofCover br3 mX5',
                        src:productImg,
                    }),
                    $('<div/>',{
                        class:'grow2 alnsS mX5',
                    }).append(
                        $('<div/>',{
                            class:'row alnC jstfySB w100p mB5'
                        }).append(
                            $('<div/>').append(
                                productName,
                            ),
                            $('<div/>',{text:website.currency+parseFloat(item.total).toFixed(2),class:'bold mT3'}),
                        ),
                        $('<div/>',{class:'numberPickerControls_s mY3'}).append(
                            $('<span/>',{class:'numberPickerArrow_s ico-left orderPage-itemQtyMinus'}),
                            $('<span/>',{class:'numberPickerValue_s orderPage-itemQty',itemQty:item.qty,text:`x${item.qty}`}),
                            $('<span/>',{class:'numberPickerArrow_s ico-right orderPage-itemQtyPlus'}),
                        ),
                    ),
                ),
                thisItemOptions = $('<div/>',{class:'row wrap alnC jstfyS mis-20 mY5'}),
                $('<div/>',{
                    class:`row mis-20 alnC jstfyS `,
                }).append(
                    $('<div/>',{class:'ico-info orderPage-itemNoticeIcon'}),
                    $('<input/>',{class:'mX5 unset orderPage-itemNotice w100p-10 bgc-c1 br3 pX5 pY3 mB2',value:item.itemNotice,placeholder:texts.orders.addSpecialRequest,tooltip:texts.orders.specialRequest})
                ),
                $('<div/>',{class:'row alnC jstfyS mis-20 mB5 orderPage-itemNoticeBtns none'}).append(
                    $('<button/>',{class:'btn btn-cancel btn_s orderPage-itemNoticeCancelBtn',text:texts.cpanel.public.cancel}),
                    $('<button/>',{class:'btn btn_s orderPage-itemNoticeSaveBtn'}).append(
                        $('<div/>',{text:texts.cpanel.public.save,class:'btnTxt'}),
                        $('<div/>',{class:'btnLoading_s'})
                    )
                )
            )
        )
        for(const key in item.order_item_option_selections){
            let option = item.order_item_option_selections[key];
            thisItemOptions.append(
                $('<div/>',{
                    selectionKey:key,
                    optionId:option.product_option_id,
                    class:'pointer row alnC jstfyC p5 mY5 mie-5 shdw2 br3 fs09 bgc-c1 orderPage-itemSelection'
                }).append(
                    $('<div/>',{
                        class:'mie-5',
                        text:`${option.optionName}: ${option.selectionName}`,
                    }),
                    $('<div/>',{class:'ico-down fs08 mis-5'})
                )
            )
        }
    }
    drawOrderOriginalItems(items){
        $('#orderPage-orderItems_origianl').removeClass('none');
        for(const key in items){
            let item = items[key];
            let product = website.products.find(elem=> elem.id == item.product_id);
            let productImg;let productName;
            if(typeof(product) === 'undefined'){
                productImg = '/storage/imgs/cpanel/noimg.png';
                productName = `<span class="mie-10">${item.productName} <span class="fs08">(${texts.cpanel.public.deletedProduct})</span></span>`
            }else{
                productImg = product.thumbnail;
                productName = $('<a/>',{text:item.productName,class:'popupPage mie-10 fs102',popupPage:'Product',product:item.productName});
            }
            let thisItemSelections;
            $('#orderPage-orderItems_origianlContainer').append(
                $('<div/>',{
                    class:'w100p row alnS jstfyS mY10 pY10 brdrT1 c-placeholder2',
                }).append(
                    $('<img/>',{class:'blackWhite w40 h40 ofCover br3',src:productImg}),
                    $('<div/>',{
                        class:'mX5',
                    }).append(
                        productName,
                        $('<div/>',{class:'fs09 mY2',text:`${texts.orders.qty}: ${item.qty}`}),
                        thisItemSelections = $('<div/>',{class:'row wrap alnC jstfyS w100p'}),
                    )
                )
            )
            // if(item.order_item_option_selections.length > 0){
                for(const key in item.order_item_option_selections){
                    let selection = item.order_item_option_selections[key];
                    thisItemSelections.append(
                        $('<div/>',{
                            class:'pX5 pY3 fs09 mie-5 mT5 shdw2 br3',
                            text:`${selection.optionName}: ${selection.selectionName}`
                        })
                    )
                }
            // }
        }
    }

    addItem(item){
        $('#orderPage-orderItemsLoadingcover').removeClass('none')
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                addItemToOrder:true,
                orderId:this.orderId,
                item:item,
            },success:function(r){
                $('#orderPage-orderItemsLoadingcover').addClass('none');
                if(r.addItemToOrderStat == 1){
                    for(const key in website.incompleteOrders){
                        if(this.orderId == website.incompleteOrders[key].id){
                            website.incompleteOrders[key] = r.order;
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                            new orders().incompleteOrders();
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();

                        }
                    }
                    showAlert('success',r.msg,4000,true);
                }else if(r.addItemToOrderStat == 0){
                    showAlert('error',r.msg,4000,true);
                }

            }.bind(this)
        })
    }
    removeItem(itemId){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(order.order_items.length == 1){
            showAlert('error',texts.orders.cantRemoveLastItem,4000,true);
            return;
        }
        $('#orderPage-orderItemsLoadingcover').removeClass('none');
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                removeItemFromOrder:true,
                orderId:this.orderId,
                itemId:itemId,
            },success:function(r){
                $('#orderPage-orderItemsLoadingcover').addClass('none');
                if(r.removeItemFromOrderStat == 1){
                    for(const key in website.incompleteOrders){
                        if(this.orderId == website.incompleteOrders[key].id){
                            website.incompleteOrders[key] = r.order;
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                            new orders().incompleteOrders();
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                        }
                    }
                    showAlert('success',r.msg,4000,true);
                }else if(r.removeItemFromOrderStat == 0){
                    showAlert('error',r.msg,4000,true);
                }

            }.bind(this)
        })
    }
    changeQty(itemId,action){
        $('#orderPage-orderItemsLoadingcover').removeClass('none')
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeItemQty:true,
                orderId:this.orderId,
                itemId:itemId,
                action:action,
            },success:function(r){
                $('#orderPage-orderItemsLoadingcover').addClass('none')
                if(r.changeItemQtyStat == 1){
                    for(const key in website.incompleteOrders){
                        if(this.orderId == website.incompleteOrders[key].id){
                            website.incompleteOrders[key] = r.order;
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                            new orders().incompleteOrders();
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                        }
                    }
                    showAlert('success',r.msg,4000,true);
                }else if(r.changeItemQtyStat == 0){
                    showAlert('error',r.msg,4000,true);
                }
            }.bind(this)
        })
    }
    showChangeItemSelection(itemId,optionId,elem){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        let item = order.order_items.find(i=> i._id == itemId);
        if(typeof(item) === 'undefined'){return;}
        let product = website.products.find(i=> i.id == item.product_id);
        if(typeof(product) === 'undefined'){return;}
        let option = product.product_options.find(i=> i.id == optionId);
        if(typeof(option) === 'undefined'){return;}
        $('#changeItemSelection').text('');
        for(const key in option.product_option_selections){
            selection = option.product_option_selections[key];
            $('#changeItemSelection').append(
                $('<div/>',{
                    class:'orderPage-itemSelectionChange pointer p5 hvr-bgc-c2',
                    text:selection.name,
                    selectionId:selection.id,
                    optionId:option.id,
                    itemId:itemId,
                    orderId:this.orderId,
                })
            )
        }
        $('#changeItemSelection').css({
            'display':'block',
            'left':elem.offset().left,
            'top':elem.offset().top + elem.outerHeight(),
            'min-width':elem.outerWidth(),
        })
        if($('#changeItemSelection').offset().top + $('#changeItemSelection').outerHeight() > $(window).height()){
            $('#changeItemSelection').css({
                'display':'block',
                'left':elem.offset().left,
                'top':elem.offset().top  - $('#changeItemSelection').outerHeight(),
                'min-width':elem.outerWidth(),
            })
        }
    }
    changeItemSelection(itemId,optionId,selectionId){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        let item = order.order_items.find(i=> i._id == itemId);
        if(typeof(item) === 'undefined'){return;}
        let itemOption = item.order_item_option_selections.find(i=> i.product_option_id == optionId);
        if(typeof(itemOption) === 'undefined'){return;}
        if(itemOption.product_option_selection_id == selectionId){
            $('#changeItemSelection').hide();
            return;
        }
        $('#orderPage-orderItemsLoadingcover').removeClass('none');
        $('#changeItemSelection').hide();
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeItemSelection:true,
                orderId:this.orderId,
                itemId:itemId,
                optionId:optionId,
                selectionId:selectionId,
            },success:function(r){
                $('#orderPage-orderItemsLoadingcover').addClass('none');
                if(r.changeItemSelectionStat == 1){
                    for(const key in website.incompleteOrders){
                        if(this.orderId == website.incompleteOrders[key].id){
                            website.incompleteOrders[key] = r.order;
                            if(window.popupPage.popupPage == 'Order' && window.popupPage.order == website.incompleteOrders[key].id){
                                new orders(website.incompleteOrders[key].id).drawOrder()
                            }
                            new orders().incompleteOrders();
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                        }
                    }
                    showAlert('success',r.msg,4000,true);
                }else if(r.changeItemSelectionStat == 0){
                    showAlert('error',r.msg,4000,true);
                }
            }.bind(this)
        })
    }
    itemNoticeNoSaveCheck(itemId){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        let item = order.order_items.find(i=> i._id == itemId);
        if(typeof(item) === 'undefined'){return;}
        let itemContainer = $(`.orderItemContainer[itemId="${itemId}"]`);
        item.itemNotice == null ? item.itemNotice = '' : null;
        if(item.itemNotice != itemContainer.find('.orderPage-itemNotice').val()){
            $(`.orderItemContainer[itemId="${itemId}"]`).find('.orderPage-itemNoticeBtns').removeClass('none')
            $(`.orderItemContainer[itemId="${itemId}"]`).find('.orderPage-itemNoticeIcon').removeClass('ico-info').addClass('ico-warning cO').attr('tooltip',texts.cpanel.public.unsaved)
        }else{
            $(`.orderItemContainer[itemId="${itemId}"]`).find('.orderPage-itemNoticeBtns').addClass('none')
            $(`.orderItemContainer[itemId="${itemId}"]`).find('.orderPage-itemNoticeIcon').addClass('ico-info').removeClass('ico-warning cO').attr('tooltip',null)
        }
    }
    changeItemNotice(itemId){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        let item = order.order_items.find(i=> i._id == itemId);
        if(typeof(item) === 'undefined'){return;}
        let itemContainer = $(`.orderItemContainer[itemId="${itemId}"]`);
        item.itemNotice == null ? item.itemNotice = '' : null;
        if(item.itemNotice == itemContainer.find('.orderPage-itemNotice').val()){
            $(`.orderItemContainer[itemId="${itemId}"]`).find('.orderPage-itemNoticeBtns').addClass('none')
            $(`.orderItemContainer[itemId="${itemId}"]`).find('.orderPage-itemNoticeIcon').addClass('ico-info').removeClass('ico-warning cO').attr('tooltip',null)
            return;
        }
        showBtnLoading(itemContainer.find('.orderPage-itemNoticeSaveBtn'))
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeItemNotice:true,
                orderId:this.orderId,
                itemId:itemId,
                itemNotice:itemContainer.find('.orderPage-itemNotice').val(),
            },success:function(r){
                hideBtnLoading(itemContainer.find('.orderPage-itemNoticeSaveBtn'))
                if(r.changeItemNoticeStat == 1){
                    for(const key in website.incompleteOrders){
                        if(this.orderId == website.incompleteOrders[key].id){
                            for(const key2 in website.incompleteOrders[key].order_items){
                                if(itemId == website.incompleteOrders[key].order_items[key2]._id){
                                    website.incompleteOrders[key].order_items[key2].itemNotice = itemContainer.find('.orderPage-itemNotice').val();
                                    this.itemNoticeNoSaveCheck(itemId);
                                    new orders().incompleteOrders();
                                }
                            }
                        }
                    }
                    showAlert('success',r.msg,4000,true);
                }else if(r.changeItemNoticeStat == 0){
                    showAlert('error',r.msg,4000,true);
                }
            }.bind(this)
        })

    }
    deliveryCostNoSaveCheck(){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(parseFloat(order.deliveryCost) != parseFloat($('#orderPage-deliveryCost').val())){
            $('#orderPage-deliveryCostNoSave').removeClass('none').attr('tooltip',texts.cpanel.public.unsaved)
            $('#orderPage-deliveryCostBtns').removeClass('none');
        }else{
            $('#orderPage-deliveryCostNoSave').addClass('none').attr('tooltip',null)
            $('#orderPage-deliveryCostBtns').addClass('none');
        }
    }
    changeDeliveryCost(){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(parseFloat(order.deliveryCost) == parseFloat($('#orderPage-deliveryCost').val())){
            this.deliveryCostNoSaveCheck();
            return;
        }
        showBtnLoading($('#orderPage-deliveryCostSaveBtn'))
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeDeliveryCost:true,
                orderId:this.orderId,
                deliveryCost:parseFloat($('#orderPage-deliveryCost').val()),
            },success:function(r){
                hideBtnLoading($('#orderPage-deliveryCostSaveBtn'))
                if(r.changeDeliveryCostStat == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == this.orderId){
                            website.incompleteOrders[key].deliveryCost = r.deliveryCost;
                            website.incompleteOrders[key].total = r.total;
                            website.incompleteOrders[key].deliveryEdit_account_name = account.name;
                            website.incompleteOrders[key].deliveryEdit_account_id = account.id;
                            this.orderItems();
                            new orders().incompleteOrders();
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                        }
                    }
                    showAlert('success',r.msg,4000,true);
                }else if(r.changeDeliveryCostStat == 0){
                    showAlert('error',r.msg,4000,true);
                }
            }.bind(this)
        })
    }
    discountNoSaveCheck(){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(parseInt(order.discount) != parseInt($('#orderPage-discount').val())){
            $('#orderPage-discountNoSave').removeClass('none').attr('tooltip',texts.cpanel.public.unsaved)
            $('#orderPage-discountBtns').removeClass('none');
        }else{
            $('#orderPage-discountNoSave').addClass('none').attr('tooltip',null)
            $('#orderPage-discountBtns').addClass('none');
        }
    }
    changeDiscount(){
        let order = website.incompleteOrders.find(i=> i.id == this.orderId);
        if(typeof(order) === 'undefined'){return;}
        if(parseInt(order.discount) == parseInt($('#orderPage-discount').val())){
            this.discountNoSaveCheck();
            return;
        }
        showBtnLoading($('#orderPage-discountSaveBtn'));
        $.ajax({
            url:'orders',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changeDiscount:true,
                orderId:this.orderId,
                discount:parseInt($('#orderPage-discount').val()),
            },success:function(r){
                hideBtnLoading($('#orderPage-discountSaveBtn'));
                if(r.changeDiscountStat == 1){
                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].id == this.orderId){
                            website.incompleteOrders[key].discount = r.discount;
                            website.incompleteOrders[key].discount_itemsTotal = r.discount_itemsTotal;
                            website.incompleteOrders[key].tax = r.tax;
                            website.incompleteOrders[key].service = r.service;
                            website.incompleteOrders[key].total = r.total;
                            website.incompleteOrders[key].discount_by = 1;
                            website.incompleteOrders[key].discount_promocode = null;
                            website.incompleteOrders[key].discount_promocode_id = null;
                            website.incompleteOrders[key].discount_account_name = account.name;
                            website.incompleteOrders[key].discount_account_id = account.id;
                            this.orderItems();
                            new orders().incompleteOrders();
                            new orders(website.incompleteOrders[key].id).redrawChatOrder();
                        }
                    }
                    showAlert('success',r.msg,4000,true);
                }else if(r.changeDiscountStat == 0){
                    showAlert('error',r.msg,4000,true);
                }
            }.bind(this)
        })
    }
    getReceiptTxts(){
        return new Promise((resolve,reject)=>{
            if(window.receiptTxt == null){
                $.ajax({
                    url:'settings',
                    type:'put',
                    data:{
                        _token:$('meta[name="csrf-token"]').attr('content'),
                        getLangTexts:website.receiptLanguage,

                    },success:function(response){
                        window.receiptTxt = response.websiteLangTexts.receipt;
                        resolve(window.receiptTxt);
                    }
                })
            }else{
                resolve(window.receiptTxt);
            }
        })
    }
    printReceipt(){
        this.getOrder(this.orderId).then((order)=>{
            this.getReceiptTxts().then((receiptTxt)=>{
                $('#printDiv').text('');
                let receiptDateFormate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone};
                let receiptDate;
                if(website.receiptLanguage == 'eg'){
                    receiptDate = new Date(order.placed_at).toLocaleString(website.customLang_code,receiptDateFormate);
                }else{
                    receiptDate = new Date(order.placed_at).toLocaleString(website.receiptLanguage,receiptDateFormate);
                }
                // getDateAndTime(order.placed_at)
                let receiptDirection = 'ltr';
                if(website.receiptLanguage == 'ar' || website.receiptLanguage == 'eg' && website.customLang_rtl == true){
                    receiptDirection = 'rtl';
                }
                $('#printDiv').css({
                    'width':website.printerWidth+'mm','direction':receiptDirection,
                });
                receiptCurrency = website.currencies[website.receiptLanguage];
                let receiptRestaurantName = website.domainName;
                if(website.websiteNames[website.receiptLanguage] != '' && website.websiteNames[website.receiptLanguage] != null){
                    receiptRestaurantName = website.websiteNames[website.receiptLanguage];
                }
                let receiptAddress = website.addresses[website.receiptLanguage]
                let receiptPhoneNumbers = `<div class="fs101 mX5">`;
                for(const key in website.phoneNumbers){
                    receiptPhoneNumbers = receiptPhoneNumbers + `<div>${receiptTxt.tel} ${website.phoneNumbers[key]}</div>`
                }
                receiptPhoneNumbers = receiptPhoneNumbers + `</div>`

                let orderType = ''
                if(order.type == 0){orderType = 'delivery' }
                else if(order.type == 1){orderType = 'pickup' }
                else if(order.type == 2){orderType = 'dineIn' }

                let paymentMethod = ``;
                if(order.paymentMethod != null){
                    paymentMethod = $('<div/>',{class:'w100p-10 mX5 mT2 taS fs101',text:receiptTxt[order.paymentMethod]});
                }
                let itemsContainer;
                /////
                let orderTax='';
                if(parseFloat(order.tax) > 0){
                    let taxPercentage = '';
                    if(parseFloat(order.taxPercent) > 0){
                        taxPercentage = $('<span/>',{class:'',text:' '+parseFloat(order.taxPercent).toFixed(2)+'%'})
                    }
                    orderTax = $('<div/>',{class:'w100p-10 mX5 mT5 row alnC jstfySB'}).append(
                        $('<div/>',{}).append(
                            $('<span/>',{class:'fs103',text:receiptTxt.tax}),
                            taxPercentage,
                        ),
                        $('<div/>',{class:'fs103',text:parseFloat(order.tax).toFixed(2)})
                    )
                }
                ////
                let orderService='';
                if(parseFloat(order.service) > 0){
                    let servicePercentage = '';
                    if(parseFloat(order.servicePercent) > 0){
                        servicePercentage = $('<span/>',{class:'',text:' '+parseFloat(order.servicePercent).toFixed(2)+'%'})
                    }
                    orderService = $('<div/>',{class:'w100p-10 mX5 mT5 row alnC jstfySB'}).append(
                        $('<div/>',{}).append(
                            $('<span/>',{class:'fs103',text:receiptTxt.service}),
                            servicePercentage,
                        ),
                        $('<div/>',{class:'fs103',text:parseFloat(order.service).toFixed(2)})
                    )
                }
                let deliveryCost='';
                if(parseFloat(order.deliveryCost) > 0){
                    deliveryCost = $('<div/>',{class:'w100p-10 mX5 mT5 row alnC jstfySB'}).append(
                        $('<div/>',{class:'fs103',text:receiptTxt.deliveryCost}),
                        $('<div/>',{class:'fs103',text:parseFloat(order.deliveryCost).toFixed(2)})
                    )
                }
                let discount = '';
                let itemsTotal = '';
                if(parseFloat(order.discount) > 0){
                    discount = $('<div/>',{class:'w100p-10 mX5 mT5 row alnC jstfySB'}).append(
                        $('<div/>',{class:'fs103',text:receiptTxt.discount}),
                        $('<div/>',{class:'fs103',text:parseInt(order.discount)+'%'})
                    );
                    itemsTotal = $('<div/>',{class:'w100p-10 mX5 mT5 bold row alnC jstfySB '}).append(
                        $('<div/>',{class:'fs103',text:receiptTxt.subTotal}),
                        $('<div/>',{class:'fs103 taE'}).append(
                            $('<div/>',{text:parseFloat(order.itemsTotal).toFixed(2),class:'lThrough'}),
                            $('<div/>',{text:parseFloat(order.discount_itemsTotal).toFixed(2)})
                        )
                    );
                }else{
                    itemsTotal = $('<div/>',{class:'w100p-10 mX5 mT5 bold row alnC jstfySB '}).append(
                        $('<div/>',{class:'fs103',text:receiptTxt.subTotal}),
                        $('<div/>',{class:'fs103',text:parseFloat(order.discount_itemsTotal).toFixed(2)})
                    );
                }


                let total = '';
                total = $('<div/>',{class:'w100p-10 mX5 mT5 fs104 bold row alnC jstfySB mB20'}).append(
                    $('<div/>',{class:'fs102',text:receiptTxt.total}),
                    $('<div/>',{class:'fs102',text:receiptCurrency+parseFloat(order.total).toFixed(2)})
                );
                /////
                $('#printDiv').append(
                    $('<img/>',{
                        class:'printReceiptLogo mX5',
                        src:website.logo ,
                        id:'receiptWebsiteLogoId',
                    }),
                    $('<div/>',{
                        class:'fs2 mT5 mX5',
                        text:receiptRestaurantName,
                    }),
                    $('<div/>',{
                        class:'mxw200 mXA fs101 mT10 mB5',
                        text:receiptAddress,
                    }),
                    receiptPhoneNumbers,
                    $('<div/>',{class:'w100p-10 mX5 mT10 taS fs103 bold',text:`#${order.id}`}),
                    $('<div/>',{class:'w100p-10 mX5 mT2 taS fs102 bold',text:receiptTxt[orderType]}),
                    $('<div/>',{class:'w100p-10 mX5 mT2 taS fs101',text:receiptDate}),
                    paymentMethod,
                    $('<div/>',{class:'w100p-10 mX5 mT40 mB5 row alnE jstfyS'}).append(
                        $('<div/>',{class:'printReceiptQtyW taS fs103 bold',text:receiptTxt.qty2}),
                        $('<div/>',{class:'printReceiptItemW taS fs103 bold',text:receiptTxt.item}),
                        $('<div/>',{class:'printReceiptPriceW taE fs103 bold',text:receiptTxt.price}),
                    ),
                    itemsContainer = $('<div/>',{class:'w100p-10 mX5 printReceiptItems'}),
                    discount,
                    itemsTotal,
                    // $('<div/>',{class:'w100p-10 mX5 mT5 bold row alnC jstfySB'}).append(
                    //     $('<div/>',{class:'fs104',text:receiptTxt.subTotal}),
                    //     $('<div/>',{class:'fs104',text:parseFloat(order.itemsTotal).toFixed(2)})
                    // ),
                    orderTax,
                    orderService,
                    deliveryCost,
                    total,
                    $('<div/>',{id:'receiptQrCode',class:'printReceiptQrCode'}),
                    $('<div/>',{class:'mT10 mB40',text:`https://${website.url}`}),
                    $('<div/>',{text:website.website_receiptMsgs[website.receiptLanguage],class:'fs103 bold'})
                )

                for(const key in order.order_items){
                    let item = order.order_items[key];
                    let itemName;
                    let product = website.products.find(i=> i.id == item.product_id);
                    if(typeof(product) === 'undefined'){itemName = item.productName}else{
                        if(product[`name_${website.receiptLanguage}`] != null && product[`name_${website.receiptLanguage}`] != ''){
                            itemName = product[`name_${website.receiptLanguage}`];
                        }else{
                            itemName = product.name;
                        }
                    }
                    let thisItemOptions;
                    itemsContainer.append(
                        $('<div/>',{class:'w100p-10 mX5 mY10 row alnS jstfyS'}).append(
                            $('<div/>',{class:'printReceiptQtyW taS fs103',text:item.qty}),
                            $('<div/>',{class:'printReceiptItemW taS'}).append(
                                $('<div/>',{class:'fs103',text:itemName}),
                                thisItemOptions = $('<div/>',{class:'fs09 w100p taS'})
                            ),
                            $('<div/>',{class:'printReceiptPriceW taE fs103',text:parseFloat(item.total).toFixed(2)}),
                        ),

                    )
                    for(const key2 in item.order_item_option_selections){
                        let itemSelection = item.order_item_option_selections[key2];
                        let selectionName = itemSelection.selectionName; let optionName = itemSelection.optionName;

                        if(typeof(product) !== 'undefined'){
                            let option = product.product_options.find(i=> i.id == itemSelection.product_option_id)
                            if(typeof(option) !== 'undefined'){
                                if(option[`name_${website.receiptLanguage}`] != null && option[`name_${website.receiptLanguage}`] != ''){
                                    optionName = option[`name_${website.receiptLanguage}`];
                                }
                                let selection = option.product_option_selections.find(i=> i.id == itemSelection.product_option_selection_id);
                                if(typeof(selection) !== 'undefined'){
                                    if(selection[`name_${website.receiptLanguage}`] != null && selection[`name_${website.receiptLanguage}`] != ''){
                                        selectionName = selection[`name_${website.receiptLanguage}`];
                                    }
                                }
                            }

                        }

                        thisItemOptions.append(
                            $('<div/>',{text:`${optionName}: ${selectionName}`})
                        )
                    }
                }

                var qrcode = new QRCode(document.getElementById("receiptQrCode"), {
                    text: 'https://'+website.url,
                    width: 100,
                    height: 100,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });

                if(website.logo != null){
                    $('#receiptWebsiteLogoId').on('load',function(){
                        $('#printDiv').css('left',0);
                        window.print();
                        $('#printDiv').css('left','200%');
                        $('#printDiv').html('');
                    })
                    }else{
                        $('#printDiv').css('left',0);
                        window.print();
                        $('#printDiv').css('left','200%');
                        $('#printDiv').html('');
                }
            })
        })

    }
}
///////////
