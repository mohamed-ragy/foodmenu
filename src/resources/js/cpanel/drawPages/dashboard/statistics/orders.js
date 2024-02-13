draw_statistics_orders = function(){
    let graph_width = 600; let graph_height = 200;

    let orders_highestNum; let income_highestNum;
    let orders_highestNum_so = getGraphHighestNumber_orders('orders','so',window.statistics.s1_,window.statistics.s2_ ?? []);
    let income_highestNum_so = getGraphHighestNumber_orders('income','so',window.statistics.s1_,window.statistics.s2_ ?? []);

    let orders_highestNum_co = getGraphHighestNumber_orders('orders','co',window.statistics.s1_,window.statistics.s2_ ?? []);
    let income_highestNum_co = getGraphHighestNumber_orders('income','co',window.statistics.s1_,window.statistics.s2_ ?? []);

    orders_highestNum_so > orders_highestNum_co ? orders_highestNum = orders_highestNum_so : orders_highestNum = orders_highestNum_co;
    income_highestNum_so > income_highestNum_co ? income_highestNum = income_highestNum_so : income_highestNum = income_highestNum_co;

    $('#statistics_orders').text('').append(
        $('<div/>',{class:'mT40 mB20',id:'statistics_orders_head'}),
        $('<div/>',{class:'mT100'}).append(
            $('<div/>',{class:'w100p row alnC jstfyC'}).append(
                $('<div/>',{class:'mie-100 taC'}).append(
                    $('<div/>',{class:'taS mis-50 mB20 fs102 bold statistics_orders_ordersGraph_title',text:texts.dashboard.successfulOrders}),
                    drawStatisticsGraph('statistics_orders_ordersGraph',graph_height,graph_width,'orders',orders_highestNum)
                ),
                $('<div/>',{class:'taC'}).append(
                    $('<div/>',{class:'taS mis-50 mB20 fs102 bold statistics_orders_incomeGraph_title',text:texts.dashboard.successfulOrdersIncome}),
                    drawStatisticsGraph('statistics_orders_incomeGraph',graph_height,graph_width,'income',income_highestNum)
                ),
            )
        )
    )
    window.page.compare == 1 ? draw_statistics_orders_head_compare() : draw_statistics_orders_head();
    fill_statistics_orders('successful')
}
//
fill_statistics_orders = function(key){
    let graph_width = 600; let graph_height = 200;

    let orders_highestNum; let income_highestNum;
    let orders_highestNum_so = getGraphHighestNumber_orders('orders','so',window.statistics.s1_,window.statistics.s2_ ?? []);
    let income_highestNum_so = getGraphHighestNumber_orders('income','so',window.statistics.s1_,window.statistics.s2_ ?? []);

    let orders_highestNum_co = getGraphHighestNumber_orders('orders','co',window.statistics.s1_,window.statistics.s2_ ?? []);
    let income_highestNum_co = getGraphHighestNumber_orders('income','co',window.statistics.s1_,window.statistics.s2_ ?? []);

    orders_highestNum_so > orders_highestNum_co ? orders_highestNum = orders_highestNum_so : orders_highestNum = orders_highestNum_co;
    income_highestNum_so > income_highestNum_co ? income_highestNum = income_highestNum_so : income_highestNum = income_highestNum_co;

    switch(key){
        case 'successful':
            $('.statistics_orders_ordersGraph_title').text(texts.dashboard.successfulOrders)
            $('.statistics_orders_incomeGraph_title').text(texts.dashboard.successfulOrdersIncome)
            fillStatisticsGraph_orders('statistics_orders_ordersGraph',graph_height,graph_width,'so','orders',orders_highestNum)
            fillStatisticsGraph_orders('statistics_orders_incomeGraph',graph_height,graph_width,'so','total',income_highestNum)
        break;
        case 'delivered':
            $('.statistics_orders_ordersGraph_title').text(texts.dashboard.deliveredOrders)
            $('.statistics_orders_incomeGraph_title').text(texts.dashboard.deliveredOrdersIncome)
            fillStatisticsGraph_orders('statistics_orders_ordersGraph',graph_height,graph_width,'do','orders',orders_highestNum)
            fillStatisticsGraph_orders('statistics_orders_incomeGraph',graph_height,graph_width,'do','total',income_highestNum)
        break;
        case 'pickedup':
            $('.statistics_orders_ordersGraph_title').text(texts.dashboard.pickedupOrders)
            $('.statistics_orders_incomeGraph_title').text(texts.dashboard.pickedupOrdersIncome)
            fillStatisticsGraph_orders('statistics_orders_ordersGraph',graph_height,graph_width,'po','orders',orders_highestNum)
            fillStatisticsGraph_orders('statistics_orders_incomeGraph',graph_height,graph_width,'po','total',income_highestNum)
        break;
        case 'dinedin':
            $('.statistics_orders_ordersGraph_title').text(texts.dashboard.dinedinOrders)
            $('.statistics_orders_incomeGraph_title').text(texts.dashboard.dinedinOrdersIncome)
            fillStatisticsGraph_orders('statistics_orders_ordersGraph',graph_height,graph_width,'di','orders',orders_highestNum)
            fillStatisticsGraph_orders('statistics_orders_incomeGraph',graph_height,graph_width,'di','total',income_highestNum)
        break;
        case 'canceled':
            $('.statistics_orders_ordersGraph_title').text(texts.dashboard.canceledorders)
            $('.statistics_orders_incomeGraph_title').text(texts.dashboard.canceledOrdersLoss)
            fillStatisticsGraph_orders('statistics_orders_ordersGraph',graph_height,graph_width,'co','orders',orders_highestNum)
            fillStatisticsGraph_orders('statistics_orders_incomeGraph',graph_height,graph_width,'co','total',income_highestNum)
        break;
    }
}
$('html,body').on('click','.statistics_ordersHeadElem',function(e){
    e.stopImmediatePropagation();
    $('.statistics_ordersHeadElem').removeClass('statistics_ordersHeadElem_selected');
    $(this).addClass('statistics_ordersHeadElem_selected')

    fill_statistics_orders($(this).attr('key'))
})
//
draw_statistics_orders_head = function(){
    let successfullOrders = $('<div/>',{class:'statistics_ordersHeadElem statistics_ordersHeadElem_selected',key:'successful'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-accepted cG fs1 mT4 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1.so.orders)} (${window.statistics.s1_so_percent}%)</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'so',key3:window.statistics.s1._id,key4:null,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:'',text:texts.dashboard.successfulOrders})
        )
    );
    let canceledorders = $('<div/>',{class:'statistics_ordersHeadElem',key:'canceled'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-no cR fs101 mT4 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1.co.orders)} (${window.statistics.s1_co_percent}%)</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-5'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'co',key3:window.statistics.s1._id,key4:null,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:'',text:texts.dashboard.canceledorders})
        )
    );
    let deliveredOrders = $('<div/>',{class:'statistics_ordersHeadElem',key:'delivered'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-delivery c_delivery fs101 mT4 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1.do.orders)} (${window.statistics.s1_do_percent}%)</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'do',key3:window.statistics.s1._id,key4:null,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:'',text:texts.dashboard.deliveredOrders})
        )
    );

    let pickedupOrders = $('<div/>',{class:'statistics_ordersHeadElem',key:'pickedup'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-pickup c_pickup fs1 mT4 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1.po.orders)} (${window.statistics.s1_po_percent}%)</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'po',key3:window.statistics.s1._id,key4:null,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:'',text:texts.dashboard.pickedupOrders})
        )
    );

    let dinedinOrders = $('<div/>',{class:'statistics_ordersHeadElem',key:'dinedin'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-dineIn c_dineIn fs1 mT4 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1.di.orders)} (${window.statistics.s1_di_percent}%)</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'di',key3:window.statistics.s1._id,key4:null,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:'',text:texts.dashboard.dinedinOrders})
        )
    );

    $('#statistics_orders_head').append(
        $('<div/>',{class:'row alnC jstfyS w100p'}).append(
            successfullOrders,
            deliveredOrders,
            pickedupOrders,
            dinedinOrders,
            canceledorders,
        ),

    )
}
draw_statistics_orders_head_compare = function(){
    let successfullOrders1 = $('<div/>',{class:'statistics_ordersHeadElem statistics_ordersHeadElem_selected',key:'successful'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-accepted cG fs1 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1.so.orders)} (${window.statistics.s1_so_percent}%)</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.so.orders,window.statistics.s2.so.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.successfulOrders.toLowerCase()),false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'so',key3:window.statistics.s1._id,key4:window.statistics.s2._id,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:' tnw',text:texts.dashboard.successfulOrders})
        )
    );
    let canceledorders1 = $('<div/>',{class:'statistics_ordersHeadElem',key:'canceled'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-no cR fs101 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1.co.orders)} (${window.statistics.s1_co_percent}%)</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.co.orders,window.statistics.s2.co.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.canceledorders.toLowerCase()),true,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'co',key3:window.statistics.s1._id,key4:window.statistics.s2._id,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:' tnw',text:texts.dashboard.canceledorders})
        )
    );
    let deliveredOrders = $('<div/>',{class:'statistics_ordersHeadElem',key:'delivered'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-delivery c_delivery fs1 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1.do.orders)} (${window.statistics.s1_do_percent}%)</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.do.orders,window.statistics.s2.do.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.deliveredOrders.toLowerCase()),false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'do',key3:window.statistics.s1._id,key4:window.statistics.s2._id,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:' tnw',text:texts.dashboard.deliveredOrders})
        )
    );
    let pickedupOrders = $('<div/>',{class:'statistics_ordersHeadElem',key:'pickedup'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-pickup c_pickup fs1 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1.po.orders)} (${window.statistics.s1_po_percent}%)</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.po.orders,window.statistics.s2.po.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.pickedupOrders.toLowerCase()),false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'po',key3:window.statistics.s1._id,key4:window.statistics.s2._id,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:' tnw',text:texts.dashboard.pickedupOrders})
        )
    );
    let dinedinOrders = $('<div/>',{class:'statistics_ordersHeadElem',key:'dinedin'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-dineIn c_dineIn fs1 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1.di.orders)} (${window.statistics.s1_di_percent}%)</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.di.orders,window.statistics.s2.di.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.dinedinOrders.toLowerCase()),false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'di',key3:window.statistics.s1._id,key4:window.statistics.s2._id,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:' tnw',text:texts.dashboard.dinedinOrders})
        )
    );
    $('#statistics_orders_head').append(
        $('<div/>',{class:'row alnC jstfyS w100p'}).append(
            successfullOrders1,
            deliveredOrders,
            pickedupOrders,
            dinedinOrders,
            canceledorders1,
        ),
    )
}
//
