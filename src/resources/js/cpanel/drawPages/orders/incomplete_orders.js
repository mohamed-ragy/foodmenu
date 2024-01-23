drawPage_incomplete_orders = function(){
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.incomplete_orders}),
                $('<span/>',{class:'ico-help help-icon',helpId:'incomplete_orders'})
            ),
            $('<div/>',{class:'btnContainer mB20'}).append(
                $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'place_new_order',text:texts.orders.place_new_order})
            ),
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'all_orders',class:'pageTab pageTab_incompleteOrders pageTab_selected alnBL',status:'all_orders'}).append(
                        $('<span/>',{class:'ico-orders fs09 mie-5'}),
                        $('<span/>',{text:texts.orders.all}),
                        $('<span/>',{text:'0',class:'mis-5 incompleteOrdersSum'}),
                    ),
                    $('<div/>',{tab:'pending',class:'pageTab pageTab_incompleteOrders alnBL',status:'pending'}).append(
                        $('<span/>',{class:'ico-msgSending fs09 mie-5'}),
                        $('<span/>',{text:texts.orders.pending}),
                        $('<span/>',{text:'0',class:'pendingOrdersSum mis-5'}),
                    ),
                    $('<div/>',{tab:'accepted',class:'pageTab pageTab_incompleteOrders alnBL',status:'accepted'}).append(
                        $('<span/>',{class:'ico-accepted fs09 mie-5'}),
                        $('<span/>',{text:texts.orders.accepted}),
                        $('<span/>',{text:'0',class:'acceptedOrdersSum mis-5'}),
                    ),
                    $('<div/>',{tab:'out_for_delivery',class:'pageTab pageTab_incompleteOrders alnBL',status:'out_for_delivery'}).append(
                        $('<span/>',{class:'ico-delivery fs09 mie-5'}),
                        $('<span/>',{text:texts.orders.out_for_delivery}),
                        $('<span/>',{text:'0',class:'our_for_deliveryOrdersSum mis-5'}),
                    ),
                    $('<div/>',{tab:'ready_for_pickup',class:'pageTab pageTab_incompleteOrders alnBL',status:'ready_for_pickup'}).append(
                        $('<span/>',{class:'ico-pickup fs09 mie-5'}),
                        $('<span/>',{text:texts.orders.ready_for_pickup}),
                        $('<span/>',{text:'0',class:'ready_for_pickupOrdersSum mis-5'}),
                    ),
                    $('<div/>',{tab:'dining_in',class:'pageTab pageTab_incompleteOrders alnBL',status:'dining_in'}).append(
                        $('<span/>',{class:'ico-dineIn fs09 mie-5'}),
                        $('<span/>',{text:texts.orders.diningIn}),
                        $('<span/>',{text:'0',class:'dingininOrdersSum mis-5'}),
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'w100p overflowX-A'}).append(
                $('<table/>',{class:'mnw800',id:'IncompleteOrdersTable',autoHelp:'incomplete_orders_list'})
            )
        )
    )
    drawIncompleteOrdersTable_loading();
    calcIncompleteOrders();
}

drawIncompleteOrdersTable_loading = function(){
    $('#IncompleteOrdersTable').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<td/>',{text:'#'}),
            $('<td/>',{text:texts.orders.type}),
            $('<td/>',{text:texts.orders.placed}),
            $('<td/>',{text:texts.orders.status}),
            $('<td/>',{text:texts.orders.items}),
            $('<td/>',{text:texts.orders.customer}),
            $('<td/>',{text:texts.orders.price}),
            $('<td/>',{}),
        )
    )
    for(i=0;i<=8;i++){
        $('#IncompleteOrdersTable').append(
            $('<tr/>',{class:'trHead'}).append(
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w400 w150-720'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
            )
        )
    }
}
drawIncompleteOrdersTable = function(status_name,order_by,sort){
    if(window.waitFor_loadWebsiteOrdersAndChats){setTimeout(()=>{drawIncompleteOrdersTable(status_name,order_by,sort);},500);return;}
    let status = status_name == 'all_orders' ? 'all_orders' : status_name == 'pending' ? '0' : status_name == 'accepted' ? '1' : status_name == 'out_for_delivery' ? '3' : status_name == 'ready_for_pickup' ? '4' : status_name == 'dining_in' ? '8' : null;
    let orders = [];
    let incompleteOrdersTR_placed_at;let incompleteOrdersTR_status;let incompleteOrdersTR_items;let incompleteOrdersTR_customer;let incompleteOrdersTR_price;let incompleteOrdersTR_id; let incompleteOrdersTR_type;
    for(const key in website.incompleteOrders){
        let order = website.incompleteOrders[key];
        if(order.status == status || status == 'all_orders'){
            orders.push(order)
        }
    }
    if(order_by == 'id'){
        incompleteOrdersTR_id = sort == 'desc' ? 'ico-down' : sort == 'asc' ? 'ico-up' : null;
        if(sort == 'asc'){
            orders.sort((a,b)=>{
                return a.id - b.id;
            })
        }else if(sort == 'desc'){
            orders.sort((a,b)=>{
                return b.id - a.id;
            })
        }
    }
    if(order_by == 'type'){
        incompleteOrdersTR_type = sort == 'desc' ? 'ico-down' : sort == 'asc' ? 'ico-up' : null;
        if(sort == 'asc'){
            orders.sort((a,b)=>{
                return a.type - b.type;
            })
        }else if(sort == 'desc'){
            orders.sort((a,b)=>{
                return b.type - a.type;
            })
        }
    }
    if(order_by == 'placed_at'){
        incompleteOrdersTR_placed_at = sort == 'desc' ? 'ico-down' : sort == 'asc' ? 'ico-up' : null;
        if(sort == 'asc'){
            orders.sort((a,b)=>{
                return a.placed_at - b.placed_at;
            })
        }else if(sort == 'desc'){
            orders.sort((a,b)=>{
                return b.placed_at - a.placed_at;
            })
        }
    }
    if(order_by == 'status'){
        incompleteOrdersTR_status  = sort == 'desc' ? 'ico-down' : sort == 'asc' ? 'ico-up' : null;
        if(sort == 'asc'){
            orders.sort((a,b)=>{
                return a.status - b.status;
            })
        }else if(sort == 'desc'){
            orders.sort((a,b)=>{
                return b.status - a.status;
            })
        }
    }
    if(order_by == 'items'){
        incompleteOrdersTR_items  = sort == 'desc' ? 'ico-down' : sort == 'asc' ? 'ico-up' : null;
        if(sort == 'asc'){
            orders.sort((a,b)=>{
                return a.order_items.length - b.order_items.length;
            })
        }else if(sort == 'desc'){
            orders.sort((a,b)=>{
                return b.order_items.length - a.order_items.length;
            })
        }
    }
    if(order_by == 'customer'){
        incompleteOrdersTR_customer  = sort == 'desc' ? 'ico-down' : sort == 'asc' ? 'ico-up' : null;
        if(sort == 'asc'){
            orders.sort((a,b)=>{
                let nameA = a.userName != null ? a.userName.toLowerCase() : 'zz';
                let nameB = b.userName != null ? b.userName.toLowerCase() : 'zz';
                return nameA.localeCompare(nameB);
            })
        }else if(sort == 'desc'){
            orders.sort((a,b)=>{
                let nameA = a.userName != null ? a.userName.toLowerCase() : 'zz';
                let nameB = b.userName != null ? b.userName.toLowerCase() : 'zz';
                return nameB.localeCompare(nameA);
            })
        }
    }
    if(order_by == 'price'){
        incompleteOrdersTR_price  = sort == 'desc' ? 'ico-down' : sort == 'asc' ? 'ico-up' : null;
        if(sort == 'asc'){
            orders.sort((a,b)=>{
                return parseFloat(a.total) - parseFloat(b.total);
            })
        }else if(sort == 'desc'){
            orders.sort((a,b)=>{
                return parseFloat(b.total) - parseFloat(a.total);
            })
        }
    }
    $('#IncompleteOrdersTable').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'incompleteOrdersTR m0',order_by:'id'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.order,class:'mie-10'}),
                    $('<span/>',{class:`incompleteOrdersTRArrow fs08 ${incompleteOrdersTR_id}`})
                )
            ),
            $('<th/>',{class:'incompleteOrdersTR m0',order_by:'type'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.type,class:'mie-10'}),
                    $('<span/>',{class:`incompleteOrdersTRArrow fs08 ${incompleteOrdersTR_type}`})
                )
            ),
            $('<th/>',{class:'incompleteOrdersTR m0',order_by:'placed_at'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.placed,class:'mie-10'}),
                    $('<span/>',{class:`incompleteOrdersTRArrow fs08 ${incompleteOrdersTR_placed_at}`})
                )
            ),
            $('<th/>',{class:'incompleteOrdersTR m0',order_by:'status'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.status,class:'mie-10'}),
                    $('<span/>',{class:`incompleteOrdersTRArrow fs08 ${incompleteOrdersTR_status}`})
                )
            ),
            $('<th/>',{class:'incompleteOrdersTR m0',order_by:'items'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.items,class:'mie-10'}),
                    $('<span/>',{class:`incompleteOrdersTRArrow fs08 ${incompleteOrdersTR_items}`})
                )
            ),
            $('<th/>',{class:'incompleteOrdersTR m0',order_by:'customer'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.customer,class:'mie-10'}),
                    $('<span/>',{class:`incompleteOrdersTRArrow fs08 ${incompleteOrdersTR_customer}`})
                )
            ),
            $('<th/>',{class:'incompleteOrdersTR m0',order_by:'price'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.price,class:'mie-10'}),
                    $('<span/>',{class:`incompleteOrdersTRArrow fs08 ${incompleteOrdersTR_price}`})
                )
            ),
            $('<td/>',{}),
        )
    )
    if( orders.length == 0 ){
        $('#IncompleteOrdersTable').text('').append(
            $('<div/>',{class:'m10',text:texts.orders.noOrders})
        )
        return;
    }
    for(const key in orders){
        $('#IncompleteOrdersTable').append(
            drawOrdersTableRow(orders[key])
        )
    }

    calcIncompleteOrders();

}



