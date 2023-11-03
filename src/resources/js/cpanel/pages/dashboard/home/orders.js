calcTodayOrdersData = function(){
    let todayOrdersData = {
        so:{orders:0,total:0,items_total:0,delivery:0,tax:0,service:0,userOrders:0,guestOrders:0,},
        co:{orders:0,total:0,items_total:0,delivery:0,tax:0,service:0,userOrders:0,guestOrders:0,},
        do:{orders:0,total:0,items_total:0,delivery:0,tax:0,userOrders:0,guestOrders:0,},
        po:{orders:0,total:0,items_total:0,tax:0,userOrders:0,guestOrders:0,},
        di:{orders:0,total:0,items_total:0,tax:0,service:0,userOrders:0,guestOrders:0,},
        products:[],
        products_ordered:[],
        products_notOrdered:[],
        deliveries:[],
    }
    if(!account.is_master){return todayOrdersData}

    for(const key in website.products){
        todayOrdersData.products.push({
            name:website.products[key].name,
            ordered:0,
            income:0,
        })
    }
    for(const key in website.deliveries){
        let delivery = website.deliveries[key];
        todayOrdersData.deliveries.push({
            id:delivery.id,
            name:delivery.deliveryName,
            orders:0,
        })
    }
    for(const key in window.todayOrders){
        let order = window.todayOrders[key];

        if(order.status != 2){
            for(const key in order.order_items){
                if(typeof(todayOrdersData.products.find(i=> i.name == order.order_items[key].productName)) === 'undefined'){
                    todayOrdersData.products.push({
                        name:order.order_items[key].productName,
                        ordered:0,
                        income:0,
                    })
                }
                let thisItemtotal = order.order_items[key].total;
                if(order.discount > 0){
                    thisItemtotal = thisItemtotal - ((thisItemtotal * order.discount) / 100)
                }
                todayOrdersData.products.find(i=> i.name == order.order_items[key].productName).ordered =  todayOrdersData.products.find(i=> i.name == order.order_items[key].productName).ordered + order.order_items[key].qty;
                todayOrdersData.products.find(i=> i.name == order.order_items[key].productName).income =  todayOrdersData.products.find(i=> i.name == order.order_items[key].productName).income + thisItemtotal;
            }
            todayOrdersData.so.orders = todayOrdersData.so.orders + 1;
            todayOrdersData.so.total = todayOrdersData.so.total + order.total;
            todayOrdersData.so.items_total = todayOrdersData.so.items_total + order.discount_itemsTotal;
            todayOrdersData.so.delivery = todayOrdersData.so.delivery + order.deliveryCost;
            todayOrdersData.so.tax = todayOrdersData.so.tax + order.tax;
            todayOrdersData.so.service = todayOrdersData.so.service + order.service;
            order.isGuest ? todayOrdersData.so.guestOrders = todayOrdersData.so.guestOrders + 1 : todayOrdersData.so.userOrders = todayOrdersData.so.userOrders + 1;
        }
        if(order.status == 2){
            todayOrdersData.co.orders = todayOrdersData.co.orders + 1;
            todayOrdersData.co.total = todayOrdersData.co.total + order.total;
            todayOrdersData.co.items_total = todayOrdersData.co.items_total + order.discount_itemsTotal;
            todayOrdersData.co.delivery = todayOrdersData.co.delivery + order.deliveryCost;
            todayOrdersData.co.tax = todayOrdersData.co.tax + order.tax;
            todayOrdersData.co.service = todayOrdersData.co.service + order.service;
            order.isGuest ? todayOrdersData.co.guestOrders = todayOrdersData.co.guestOrders + 1 : todayOrdersData.co.userOrders = todayOrdersData.co.userOrders + 1;
        }
        if(order.status == 5){
            todayOrdersData.do.orders = todayOrdersData.do.orders + 1;
            todayOrdersData.do.total = todayOrdersData.do.total + order.total;
            todayOrdersData.do.items_total = todayOrdersData.do.items_total + order.discount_itemsTotal;
            todayOrdersData.do.delivery = todayOrdersData.do.delivery + order.deliveryCost;
            todayOrdersData.do.tax = todayOrdersData.do.tax + order.tax;
            order.isGuest ? todayOrdersData.do.guestOrders = todayOrdersData.do.guestOrders + 1 : todayOrdersData.do.userOrders = todayOrdersData.do.userOrders + 1;
            if(order.delivered_by == 1 && typeof(todayOrdersData.deliveries.find(item=> item.id == order.delivered_delivery_id)) !== 'undefined'){
                todayOrdersData.deliveries.find(item=> item.id == order.delivered_delivery_id).orders = todayOrdersData.deliveries.find(item=> item.id == order.delivered_delivery_id).orders + 1;
            }
        }
        if(order.status == 6){
            todayOrdersData.po.orders = todayOrdersData.po.orders + 1;
            todayOrdersData.po.total = todayOrdersData.po.total + order.total;
            todayOrdersData.po.items_total = todayOrdersData.po.items_total + order.discount_itemsTotal;
            todayOrdersData.po.tax = todayOrdersData.po.tax + order.tax;
            order.isGuest ? todayOrdersData.po.guestOrders = todayOrdersData.po.guestOrders + 1 : todayOrdersData.po.userOrders = todayOrdersData.po.userOrders + 1;
        }
        if(order.status == 7){
            todayOrdersData.di.orders = todayOrdersData.di.orders + 1;
            todayOrdersData.di.total = todayOrdersData.di.total + order.total;
            todayOrdersData.di.items_total = todayOrdersData.di.items_total + order.discount_itemsTotal;
            todayOrdersData.di.tax = todayOrdersData.di.tax + order.tax;
            todayOrdersData.di.service = todayOrdersData.di.service + order.service;
            order.isGuest ? todayOrdersData.di.guestOrders = todayOrdersData.di.guestOrders + 1 : todayOrdersData.di.userOrders = todayOrdersData.di.userOrders + 1;
        }
    }
    for(const key in todayOrdersData.products){
        if(todayOrdersData.products[key].ordered > 0){
            todayOrdersData.products_ordered.push(todayOrdersData.products[key])
        }
        if(todayOrdersData.products[key].ordered == 0){
            todayOrdersData.products_notOrdered.push(todayOrdersData.products[key])
        }
    }
    todayOrdersData.products_ordered.sort((a,b)=>{return b.ordered - a.ordered || b.income - a.income;});
    return todayOrdersData;
}



homeStatistics_so = function(data){
    return ` <div class="statisticsInfoContainer">
            <div class="row alnS jstfyS w100p">
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.successfulOrders}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.orderedByUsers}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.orderedByGuests}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.itemsTotal}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.tax}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.service}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.deliveryCost}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.totalIncome}</div>
                </div>
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.orders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${bigInt(data.userOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.guestOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.items_total)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.tax)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.service)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.delivery)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.total)}</div>
                </div>
            </div>
        </div>`;
}
homeStatistics_co = function(data){
    return ` <div class="statisticsInfoContainer">
            <div class="row alnS jstfyS w100p">
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.canceledOrders}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.orderedByUsers}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.orderedByGuests}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.itemsTotal}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.tax}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.service}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.deliveryCost}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.total}</div>
                </div>
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.orders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${bigInt(data.userOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.guestOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.items_total)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.tax)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.service)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.delivery)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.total)}</div>
                </div>
            </div>
        </div>`;
}
homeStatistics_do = function(data){
    return ` <div class="statisticsInfoContainer">
            <div class="row alnS jstfyS w100p">
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.deliveryOrders}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.orderedByUsers}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.orderedByGuests}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.itemsTotal}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.tax}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.deliveryCost}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.totalIncome}</div>
                </div>
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.orders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${bigInt(data.userOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.guestOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.items_total)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.tax)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.delivery)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.total)}</div>
                </div>
            </div>
        </div>`;
}
homeStatistics_po = function(data){
    return ` <div class="statisticsInfoContainer">
            <div class="row alnS jstfyS w100p">
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.pickupOrders}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.orderedByUsers}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.orderedByGuests}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.itemsTotal}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.tax}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.totalIncome}</div>
                </div>
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.orders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${bigInt(data.userOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.guestOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.items_total)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.tax)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.total)}</div>
                </div>
            </div>
        </div>`;
}
homeStatistics_di = function(data){
    return ` <div class="statisticsInfoContainer">
            <div class="row alnS jstfyS w100p">
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.dineInOrders}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.orderedByUsers}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.orderedByGuests}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.itemsTotal}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.tax}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3">${texts.statistics.service}</div>
                    <div class="h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1">${texts.statistics.totalIncome}</div>
                </div>
                <div class="column alnS jstfyS grow1">
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.orders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${bigInt(data.userOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${bigInt(data.guestOrders)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.items_total)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.tax)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c3">${website.currency+bigFloat(data.service)}</div>
                    <div class="h15 row alnC jstfyE w100p-10 p5 bgc-c1">${website.currency+bigFloat(data.total)}</div>
                </div>
            </div>
        </div>`;
}
drawTodayHomeOrders = function(){
    if(!account.is_master){
        drawTodayHomeProducts();
        return;
    }
    let todayOrdersData = calcTodayOrdersData();
    $('#home-todaySuccessfullOrders').find('.homePrograssBarInfo').attr('toolTip',homeStatistics_so(todayOrdersData.so))
    $('#home-todaySuccessfullOrders').find('.homePrograssBarInside').css('width',`${(todayOrdersData.so.orders / (todayOrdersData.so.orders + todayOrdersData.co.orders)) * 100}%`)
    $('#home-todayCanceledOrders').find('.homePrograssBarInfo').attr('toolTip',homeStatistics_co(todayOrdersData.co))
    $('#home-todayCanceledOrders').find('.homePrograssBarInside').css('width',`${(todayOrdersData.co.orders / (todayOrdersData.so.orders + todayOrdersData.co.orders)) * 100}%`)

    $('#home-todayDeliveredOrders').find('.homePrograssBarInfo').attr('toolTip',homeStatistics_do(todayOrdersData.do))
    $('#home-todayDeliveredOrders').find('.homePrograssBarInside').css('width',`${(todayOrdersData.do.orders / todayOrdersData.so.orders ) * 100}%`)

    $('#home-todayPickupedOrders').find('.homePrograssBarInfo').attr('toolTip',homeStatistics_po(todayOrdersData.po))
    $('#home-todayPickupedOrders').find('.homePrograssBarInside').css('width',`${(todayOrdersData.po.orders / todayOrdersData.so.orders ) * 100}%`)

    $('#home-todayDinedOrders').find('.homePrograssBarInfo').attr('toolTip',homeStatistics_di(todayOrdersData.di))
    $('#home-todayDinedOrders').find('.homePrograssBarInside').css('width',`${(todayOrdersData.di.orders / todayOrdersData.so.orders ) * 100}%`)
    // $('#home-todayCanceledOrders').text(todayOrdersData.co.orders)

    counter($('#home-todayIncome'),todayOrdersData.so.total,'homeTodayIncom',website.currency,2)
    counter($('#home-todayDeliveryuIncome'),todayOrdersData.do.total,'todayDeliveryuIncome',website.currency,2)
    counter($('#home-todayPickupuIncome'),todayOrdersData.po.total,'todayPickupuIncome',website.currency,2)
    counter($('#home-todayDineInIncome'),todayOrdersData.di.total,'todayDineInIncome',website.currency,2)

    drawTodayHomeProducts();
    setDeliverisHomeOrders();
}
setDeliverisHomeOrders = function(){
    if(account.authorities[2] == 0){return;}
    let todayOrdersData = calcTodayOrdersData();
    for(const key in todayOrdersData.deliveries){
        let text2 = texts.home.ordersToday;
        let delivery = todayOrdersData.deliveries[key];
        delivery.orders == 1 ? text2 = texts.home.orderToday : null;
        $(`.deliveryAccountCard_live[deliveryId="${delivery.id}"]`).find('.home-deliveryOrders').text(`${texts.home.delivered} ${delivery.orders} ${text2}`)

    }
}

drawTodayHomeProducts = function(){
    let todayOrdersData = calcTodayOrdersData();
    if(todayOrdersData.products_ordered.length ==  0){
        $('#home-productsOrderedWindows').addClass('none');
        $('#home-shareYourProductsWindow').removeClass('none')
        drawHomeShareYoutProducts();
    }else{
        $('#home-productsOrderedWindows').removeClass('none');
        $('#home-shareYourProductsWindow').addClass('none');
        drawTodayOrderedProducts();
        drawTodayNotOrderedProducts();

    }
}

drawHomeShareYoutProducts = function(){
    if(account.authorities[1] == 0){return;}
    $('#home-shareYourProductsContainer').text('');
    if(website.products.length == 0){
        $('#home-shareYourProductsContainer').append(
            $('<div/>',{class:'m10 fs102'}).append(
                $('<span>',{class:'mie-3',text:texts.home.noProducts1}),
                $('<a/>',{class:'popupPage',popupPage:'Create-Product',text:texts.home.noProducts2})
            )
        )
    }else{
        for(const key in website.products){
            let product = website.products[key];
            $('#home-shareYourProductsContainer').append(
                $('<div/>',{class:'homeShareProduct '}).append(
                    $('<img/>',{class:'w200 h100 br3 ofCover',src:product.thumbnail}),
                    $('<div/>',{class:'w100p-10 pY5 fs101 row alnC jstfySB'}).append(
                        $('<a/>',{text:product.name,class:'mX5 ellipsis w60p popupPage',popupPage:'Product',product:product.name}),
                        $('<span/>',{class:'ico-share share pointer',tooltip:texts.cpanel.public.share,type:'product',itemId:product.id}),
                    )
                )
            )
        }
    }
}
drawTodayOrderedProducts=function(){
    if(!account.is_master){return;}
    let todayOrdersData = calcTodayOrdersData();
    $('.home-productsOrderedTable').find('tbody').text('').append(
        $('<tr/>',{class:'home-productsOrderedTable_TR bgc-c3 sticky t0'}).append(

            $('<th/>',{class:'taS p3 pX5',text:texts.home.product}),
            $('<th/>',{class:'taE p3 pX5',text:texts.home.ordered}),
            $('<th/>',{class:'taE p3 pX5',text:texts.home.income}),
        )
    )
    for(const key in todayOrdersData.products_ordered){
        $('.home-productsOrderedTable').find('tbody').append(
            $('<tr/>',{class:'home-productsOrderedTable_TR'}).append(
                $('<td/>',{class:'taS p3 pX5 mxw200 ellipsis'}).append(
                    $('<a/>',{class:'w100p ellipsis popupPage',popupPage:'Product',product:todayOrdersData.products_ordered[key].name,text:todayOrdersData.products_ordered[key].name})
                ),
                $('<td/>',{class:'taE p3 pX5',text:todayOrdersData.products_ordered[key].ordered}),
                $('<td/>',{class:'taE p3 pX5',text:website.currency+parseFloat(todayOrdersData.products_ordered[key].income).toFixed(2)}),
            )
        )
    }
}
drawTodayNotOrderedProducts = function(){
    if(!account.is_master){return;}
    let todayOrdersData = calcTodayOrdersData();
    $('.home-productsNotOrderedContainer').text('');
    if(todayOrdersData.products_notOrdered.length == 0){
        $('.home-productsNotOrderedContainer').append(
            $('<div/>',{class:'column alnC jstfyC'}).append(
                $('<div/>',{class:'ico-success fs3 cG'}),
                $('<div/>',{class:'m10 fs103',text:texts.home.noNotOrderedProducts})
            )
        )
    }else{
        for(const key in todayOrdersData.products_notOrdered){
            let product = website.products.find(item=> item.name == todayOrdersData.products_notOrdered[key].name);
            if(typeof(product) !== 'undefined'){
                $('.home-productsNotOrderedContainer').append(
                    $('<div/>',{class:'homeShareProduct '}).append(
                        $('<img/>',{class:'w200 h100 br3 ofCover',src:product.thumbnail}),
                        $('<div/>',{class:'w100p-10 pY5 fs101 row alnC jstfySB'}).append(
                            $('<a/>',{text:product.name,class:'mX5 ellipsis w60p popupPage',popupPage:'Product',product:product.name}),
                            $('<span/>',{class:'ico-share share pointer',tooltip:texts.cpanel.public.share,type:'product',itemId:product.id}),
                        )
                    )
                )
            }
        }
    }
}
