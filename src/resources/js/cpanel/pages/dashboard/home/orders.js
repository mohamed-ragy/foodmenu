calcTodayOrdersData = function(){
    let todayOrdersData = {
        so:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        do:{orders:0,items_total:0,delivery:0,tax:0,total:0,guestOrders:0,userOrders:0,},
        po:{orders:0,items_total:0,tax:0,total:0,guestOrders:0,userOrders:0,},
        co:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        di:{orders:0,items_total:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        products:[],
        solid_products:0,
    }
    if(!account.is_master){return todayOrdersData}

    for(const key in website.todayOrders){
        let order = website.todayOrders[key];

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
            todayOrdersData.solid_products = todayOrdersData.solid_products + todayOrdersData.products[key].ordered
        }
    }
    todayOrdersData.products.sort((a,b)=>{return b.ordered - a.ordered || b.income - a.income;});
    return todayOrdersData;
}
drawHomeOnlineVisitors = function(){
    if(account.authorities[2] == 0){
        $('.h_online_visitors').removeClass('cardLoading br5 h10 m5 w50')
        $('.h_online_guests').removeClass('cardLoading br5 h10 m5 w50')
        $('.h_online_users').removeClass('cardLoading br5 h10 m5 w50')
        $('.h_online_visitors').text(texts.cpanel.public.na)
        $('.h_online_guests').text(texts.cpanel.public.na)
        $('.h_online_users').text(texts.cpanel.public.na)
        return;
    }
    let users = 0; let guests = 0; let x = 0;
    for(const key in window.online){
        if(window.online[key].type == 'user' || window.online[key].type == 'guest'){
            x++;
        }
        if(window.online[key].type == 'user'){
            users++;
        }
        if(window.online[key].type == 'guest'){
            guests++;
        }
    }
    $('.h_online_visitors').removeClass('cardLoading br5 h10 m5 w50')
    counter($('.h_online_visitors'),x,'h_online_visitors','',0)

    $('.h_online_users').removeClass('cardLoading br5 h10 m5 w50')
    counter($('.h_online_users'),users,'h_online_users','',0)

    $('.h_online_guests').removeClass('cardLoading br5 h10 m5 w50')
    counter($('.h_online_guests'),guests,'h_online_guests','',0)
}
drawTodayHomeOrders = function(){
    if(!account.is_master){
        $('.h_so_total').removeClass('cardLoading br5 h10 m5 w50')
        $('.h_products_solid').removeClass('cardLoading br5 h10 m5 w50')
        $('.h_so_total').text(texts.cpanel.public.na)
        $('.h_products_solid').text(texts.cpanel.public.na)
        $('.successfulOrders_ordersPerformanceVal').text(texts.cpanel.public.na)
        $('.canceledOrders_ordersPerformanceVal').text(texts.cpanel.public.na)
        $('.deliveredOrders_ordersPerformanceVal').text(texts.cpanel.public.na)
        $('.pickedupOrders_ordersPerformanceVal').text(texts.cpanel.public.na)
        $('.dinedinOrders_ordersPerformanceVal').text(texts.cpanel.public.na)
        return;
    }
    let todayOrdersData = calcTodayOrdersData();
    $('.h_so_total').removeClass('cardLoading br5 h10 m5 w50')
    counter($('.h_so_total'),todayOrdersData.so.total,'h_so_total',website.currency,2)


    $('.h_products_solid').removeClass('cardLoading br5 h10 m5 w50')
    counter($('.h_products_solid'),todayOrdersData.solid_products,'h_products_solid','',0)

    let so_percent = 0; let co_percent = 0; let do_percent = 0; let po_percent = 0; let di_percent = 0;
    if(todayOrdersData.so.orders + todayOrdersData.co.orders > 0){
        so_percent = (todayOrdersData.so.orders / (todayOrdersData.so.orders + todayOrdersData.co.orders)) * 100;
        co_percent = (todayOrdersData.co.orders / (todayOrdersData.so.orders + todayOrdersData.co.orders)) * 100;
    }
    if(todayOrdersData.so.orders > 0){
        do_percent = (todayOrdersData.do.orders / todayOrdersData.so.orders ) * 100;
        po_percent = (todayOrdersData.po.orders / todayOrdersData.so.orders ) * 100;
        di_percent = (todayOrdersData.di.orders / todayOrdersData.so.orders ) * 100;

    }
    $('.successfulOrders_ordersPerformanceVal').text(`${BigInt(todayOrdersData.so.orders)} ${texts.dashboard.orders} (${bigFloat(so_percent)}%)`)
    $('.successfulOrders_ordersPerformanceBar').css('width',`${so_percent}%`)
    $('.canceledOrders_ordersPerformanceVal').text(`${BigInt(todayOrdersData.co.orders)} ${texts.dashboard.orders} (${bigFloat(co_percent)}%)`)
    $('.canceledOrders_ordersPerformanceBar').css('width',`${co_percent}%`)
    $('.deliveredOrders_ordersPerformanceVal').text(`${BigInt(todayOrdersData.do.orders)} ${texts.dashboard.orders} (${bigFloat(do_percent)}%)`)
    $('.deliveredOrders_ordersPerformanceBar').css('width',`${do_percent}%`)
    $('.pickedupOrders_ordersPerformanceVal').text(`${BigInt(todayOrdersData.po.orders)} ${texts.dashboard.orders} (${bigFloat(po_percent)}%)`)
    $('.pickedupOrders_ordersPerformanceBar').css('width',`${di_percent}%`)
    $('.dinedinOrders_ordersPerformanceVal').text(`${BigInt(todayOrdersData.di.orders)} ${texts.dashboard.orders} (${bigFloat(di_percent)}%)`)
    $('.dinedinOrders_ordersPerformanceBar').css('width',`${di_percent}%`)


    $('#products_sold_today_table').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'taS',text:texts.dashboard.name}),
            $('<th/>',{class:'taE',text:texts.dashboard.sold}),
            $('<th/>',{class:'taE',text:texts.dashboard.income}),
        )
    )
    $('#todays_income_table').text('').append(

        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS bold',text:texts.dashboard.successfulOrders}),
            $('<td/>',{class:'pY5 taE',text:todayOrdersData.so.orders}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.itemsTotal}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.so.items_total)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.deliveryCost}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.so.delivery)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.tax}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.so.tax)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.service}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.so.service)}`}),
        ),
        $('<tr/>',{class:'bold'}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.total}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.so.total)}`}),
        ),

        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'taS'}),
            $('<th/>',{class:'taE'}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pT10 pB5 taS bold',text:texts.dashboard.deliveredOrders}),
            $('<td/>',{class:'pT10 pB5 taE',text:todayOrdersData.do.orders}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.itemsTotal}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.do.items_total)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.deliveryCost}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.do.delivery)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.tax}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.do.tax)}`}),
        ),
        $('<tr/>',{class:'bold'}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.total}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.do.total)}`}),
        ),

        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'taS'}),
            $('<th/>',{class:'taE'}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pT10 pB5 taS bold',text:texts.dashboard.pickedupOrders}),
            $('<td/>',{class:'pT10 pB5 taE',text:todayOrdersData.po.orders}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.itemsTotal}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.po.items_total)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.tax}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.po.tax)}`}),
        ),
        $('<tr/>',{class:'bold'}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.total}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.po.total)}`}),
        ),

        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'taS'}),
            $('<th/>',{class:'taE'}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pT10 pB5 taS bold',text:texts.dashboard.dinedinOrders}),
            $('<td/>',{class:'pT10 pB5 taE',text:todayOrdersData.di.orders}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.itemsTotal}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.di.items_total)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.tax}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.di.tax)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.service}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.di.service)}`}),
        ),
        $('<tr/>',{class:'bold'}).append(
            $('<td/>',{class:'pY5 taS pis-15',text:texts.dashboard.total}),
            $('<td/>',{class:'pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.di.total)}`}),
        ),

        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'taS'}),
            $('<th/>',{class:'taE'}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'cR pT10 pB5 taS bold',text:texts.dashboard.canceledorders}),
            $('<td/>',{class:'cR pT10 pB5 taE',text:todayOrdersData.co.orders}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'cR pY5 taS pis-15',text:texts.dashboard.itemsTotal}),
            $('<td/>',{class:'cR pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.co.items_total)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'cR pY5 taS pis-15',text:texts.dashboard.deliveryCost}),
            $('<td/>',{class:'cR pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.co.delivery)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'cR pY5 taS pis-15',text:texts.dashboard.tax}),
            $('<td/>',{class:'cR pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.co.tax)}`}),
        ),
        $('<tr/>',{class:''}).append(
            $('<td/>',{class:'cR pY5 taS pis-15',text:texts.dashboard.service}),
            $('<td/>',{class:'cR pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.co.service)}`}),
        ),
        $('<tr/>',{class:'bold'}).append(
            $('<td/>',{class:'cR pY5 taS pis-15',text:texts.dashboard.total}),
            $('<td/>',{class:'cR pY5 taE',text:`${website.currency}${bigFloat(todayOrdersData.co.total)}`}),
        ),

    )


    if(todayOrdersData.products.length == 0){
        $('#products_sold_today_table').text(texts.dashboard.noData)
    }

    for(const key in todayOrdersData.products){
        let product = todayOrdersData.products[key];
        $('#products_sold_today_table').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{class:'taS'}).append(
                    $('<a/>',{class:'popupPage popupId',popupPage:'product',popupId:'product',product:product.name,text:product.name})
                ),
                $('<td/>',{class:'taE',text:product.ordered}),
                $('<td/>',{class:'taE',text:`${website.currency}${bigFloat(product.income)}`})
            )
        )
    }

}
