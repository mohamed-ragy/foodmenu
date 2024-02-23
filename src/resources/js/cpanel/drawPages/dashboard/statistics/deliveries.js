draw_statistics_deliveries = function(){
    $('#statistics_deliveries').text('').append(
        $('<div/>',{id:'statistics_deliveries_list',class:'td200'}),
        $('<div/>',{id:'statistics_deliveries_delivery',class:'mT50 td200 opacity0 none'})
    )
    draw_statistics_deliveries_list('orders','desc');
}
draw_statistics_deliveries_list = function(order,sort){
    let top_deliveries = get_statistics_top_deliveries(window.statistics.s1.deliveries,order,sort);
    if(top_deliveries.length == 0){
        $('#statistics_deliveries_list').text('').append(
            $('<div/>',{class:'mT30',text:texts.dashboard.noData})
        );
        return;
    }
    $('#statistics_deliveries_list').text('').append(
        $('<table/>',{class:'mT30',id:'statistics_deliveries_list_table'}).append(
            $('<tr/>',{class:'trHead'}).append(
                $('<th/>',{class:'w5 taE',text:''}),
                $('<th/>',{order:'name',class:'statistics_deliveries_list_th pointer'}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.name}),
                        $('<span/>',{class:`statistics_deliveries_list_thArrow fs09 ${order == 'name' && sort == 'desc' ? 'ico-down' : order == 'name' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'orders',class:'statistics_deliveries_list_th pointer'}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.orders}),
                        $('<span/>',{class:`statistics_deliveries_list_thArrow fs09 ${order == 'orders' && sort == 'desc' ? 'ico-down' : order == 'orders' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'time',class:'statistics_deliveries_list_th pointer'}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.time}),
                        $('<span/>',{class:`statistics_deliveries_list_thArrow fs09 ${order == 'time' && sort == 'desc' ? 'ico-down' : order == 'time' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'avgPerOrder',class:'statistics_deliveries_list_th pointer'}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.avgPerOrder}),
                        $('<span/>',{class:`statistics_deliveries_list_thArrow fs09 ${order == 'avgPerOrder' && sort == 'desc' ? 'ico-down' : order == 'avgPerOrder' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
            )
        )
    )
    for(const key in top_deliveries){
        let orders_compare; let time_compare; let avg_compare;

        if(window.page.compare == 1){
            console.log(top_deliveries[key])
            if(typeof(window.statistics.s2.deliveries[top_deliveries[key].name]) === 'undefined'){
                orders_compare = $('<span/>',{class:'',html:compareNums(top_deliveries[key].orders,0,texts.dashboard.deliveriesOrders_compare.replace(':delivery:',top_deliveries[key].name.split('@')[0]),false,false)})
                time_compare = $('<span/>',{class:'',html:compareNums(top_deliveries[key].time,0,texts.dashboard.deliveriesTime_compare.replace(':delivery:',top_deliveries[key].name.split('@')[0]),false,false)})
                avg_compare = $('<span/>',{class:'',html:compareNums(top_deliveries[key].avgPerOrder,0,texts.dashboard.deliveriesAvg_compare.replace(':delivery:',top_deliveries[key].name.split('@')[0]),false,false)})
                key4 = 'undefined';
            }else{
                key4 = window.statistics.s2._id;
                orders_compare = $('<span/>',{class:'',html:compareNums(top_deliveries[key].orders,window.statistics.s2.deliveries[top_deliveries[key].name].orders,texts.dashboard.deliveriesOrders_compare.replace(':delivery:',top_deliveries[key].name.split('@')[0]),false,false)})
                time_compare = $('<span/>',{class:'',html:compareNums(top_deliveries[key].time,window.statistics.s2.deliveries[top_deliveries[key].name].time,texts.dashboard.deliveriesTime_compare.replace(':delivery:',top_deliveries[key].name.split('@')[0]),false,false)})
                avg_compare = $('<span/>',{class:'',html:compareNums(top_deliveries[key].avgPerOrder,(window.statistics.s2.deliveries[top_deliveries[key].name].time/window.statistics.s2.deliveries[top_deliveries[key].name].orders),texts.dashboard.deliveriesAvg_compare.replace(':delivery:',top_deliveries[key].name.split('@')[0]),false,false)})
            }
        }else{
            key4 = null;
        }

        $('#statistics_deliveries_list_table').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{class:'taE vaM'}).append(
                    $('<div/>',{class:'row alnC jstfyE'}).append(
                        $('<div/>',{class:'btn_table ico-info pointer statisticspopup',key1:'delivery',key2:top_deliveries[key].name,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                        $('<div/>',{class:'btn_table ico-statistics_and_analytics pointer statistics_users_list_showDelivery',delivery:top_deliveries[key].name,tooltip:texts.dashboard.moreDetails})

                    )
                ),
                $('<td/>',{class:'vaM'}).append(
                        $('<a/>',{class:'ellipsis mis-5 popupPage popupId',popupPage:'delivery_account',popupId:'delivery',delivery:top_deliveries[key].id,text:top_deliveries[key].name}),
                ),
                $('<td/>',{class:'vaM pie-30'}).append(
                    $('<span/>',{text:`${bigInt(top_deliveries[key].orders)}`}),
                    orders_compare
                ),
                $('<td/>',{class:'vaM pie-30'}).append(
                    $('<span/>',{text:`${minsToTime(top_deliveries[key].time)}`}),
                    time_compare
                ),
                $('<td/>',{class:'vaM pie-30'}).append(
                    $('<span/>',{text:`${minsToTime(top_deliveries[key].avgPerOrder)}`}),
                    avg_compare
                ),

            )
        )
    }
}
//
$('body,html').on('click','.statistics_deliveries_list_th',function(e){
    e.stopImmediatePropagation();
    let sort = 'desc';
    $(this).find('.statistics_deliveries_list_thArrow').hasClass('ico-down') ? sort = 'asc' : null;
    draw_statistics_deliveries_list($(this).attr('order'),sort)
})
$('html,body').on('click','.statistics_users_list_showDelivery',function(e){
    e.stopImmediatePropagation();
    let delivery_name = $(this).attr('delivery');
    $('#statistics_deliveries_list').addClass('opacity0');
    setTimeout(function(){
        $('#statistics_deliveries_list').addClass('none');
        $('#statistics_deliveries_delivery').removeClass('none');
        statistics_deliveries_delivery(delivery_name)
        setTimeout(function(){
            $('#statistics_deliveries_delivery').removeClass('opacity0');
        },200)
    },200)

})
$('html,body').on('click','.statistics_deliveries_list_showList',function(e){
    // e.stopImmediatePropagation();
    $('#statistics_deliveries_delivery').addClass('opacity0');
    setTimeout(function(){
        $('#statistics_deliveries_delivery').addClass('none');
        $('#statistics_deliveries_list').removeClass('none');
        setTimeout(function(){
            $('#statistics_deliveries_list').removeClass('opacity0');
        },200)
    },200)

})
//
statistics_deliveries_delivery = function(delivery_name){
    let graph_width = 600; let graph_height = 200;
    let heighestNum_orders = getGraphHighestNumber_delivery(delivery_name,'orders',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_time = getGraphHighestNumber_delivery(delivery_name,'time',window.statistics.s1_,window.statistics.s2_ ?? []);
    let delivery_s1 = window.statistics.s1.deliveries[delivery_name];
    let delivery_s2 = {id:window.statistics.s1.deliveries[delivery_name].id,orders:0,time:0,avgPerOrder:0}
    let key4 = null;
    if(window.page.compare == 1){
        if(typeof(window.statistics.s2.deliveries[delivery_name]) !== 'undefined'){
            delivery_s2 = window.statistics.s2.deliveries[delivery_name];
            key4 = window.statistics.s2._id;
        }
    }
    $('#statistics_deliveries_delivery').text('').append(
        $('<div/>',{class:'row alnBL jstfyS mB30'}).append(
            $('<span/>',{class:'statistics_deliveries_list_showList ico-left statistics_deliveriesDelivery_backBtn',tooltip:texts.cpanel.public.back}),
            $('<div/>',{class:'fs108 ico-user mie-10'}),
            $('<a/>',{text:delivery_name,class:'popupPage popupId fs101',popupPage:'delivery_account',popupId:'delivery',delivery:delivery_s1.id}),
        ),
        $('<div/>',{class:'row alnS jstfyS w100p'}).append(
            $('<div/>',{class:'grow1 '}).append(
                $('<div/>',{class:'statistics_deliveriesDeliveryElem'}).append(
                    $('<table/>',{class:'statistics_deliveriesDeliveryElem_table'}).append(
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{}),
                            $('<td/>',{class:'c_statistics1 taE'}).append($('<span/>',{text:window.statistics.date1,class:'fs08'}),),
                            window.page.compare == 1 ? $('<td/>',{class:'c_statistics2 taE'}).append($('<span/>',{text:window.statistics.date2,class:'fs08'})) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'tnw',text:texts.dashboard.orders}),
                            $('<td/>',{class:'taE tnw'}).append(
                                $('<span/>',{class:'',text:`${bigInt(delivery_s1.orders)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(delivery_s1.orders,delivery_s2.orders,texts.dashboard.deliveriesOrders_compare.replace(':delivery:',delivery_name),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'tnw taE',text:`${bigInt(delivery_s2.orders)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'tnw',text:texts.dashboard.time}),
                            $('<td/>',{class:'taE tnw'}).append(
                                $('<span/>',{class:'',text:`${minsToTime(delivery_s1.time)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(delivery_s1.time,delivery_s2.time,texts.dashboard.deliveriesTime_compare.replace(':delivery:',delivery_name),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'tnw taE',text:`${minsToTime(delivery_s2.time)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:' tnw',text:texts.dashboard.avgPerOrder}),
                            $('<td/>',{class:'taE tnw'}).append(
                                $('<span/>',{class:'',text:`${minsToTime(delivery_s1.avgPerOrder)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(delivery_s1.avgPerOrder,delivery_s2.avgPerOrder,texts.dashboard.deliveriesAvg_compare.replace(':delivery:',delivery_name),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:' tnw taE',text:`${minsToTime(delivery_s2.avgPerOrder)}`}) : null,
                        ),
                    )
                )
            ),
            $('<div/>',{class:'grow1 column alnS jstfyS mis-100 mT10 taC'}).append(
                drawStatisticsGraph('statistics_deliveries_list_deliveryGraph_orders',200,600,'orders',heighestNum_orders),
            ),
        )
    )
    fillStatisticsGraph_delivery('statistics_deliveries_list_deliveryGraph_orders',200,600,delivery_name,'orders',heighestNum_orders)
}
