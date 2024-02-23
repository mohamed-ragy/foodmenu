draw_statistics_overview = function(){
    $('#statistics_overview').append(
        $('<div/>',{class:'w100p pT40 pB20',id:'statistics_overview_Head'}),
        $('<div/>',{class:'w100p pY40 brdrB1_w3 row alnS jstfyS'}).append(
            $('<div/>',{class:'w50p-40 pX20 brdrR1_w3',id:'statistics_overview_orders'}),
            $('<div/>',{class:'w50p-40 pX20',id:'statistics_overview_orders_income'}),
        ),
        $('<div/>',{class:'w100p pY40 brdrB1_w3 row alnS jstfyS'}).append(
            $('<div/>',{class:'w50p-40 pX20 brdrR1_w3',id:'statistics_overview_topProducts'}),
            $('<div/>',{class:'w50p-40 pX20',id:'statistics_overview_top_users'}),
        )
    )

    window.page.compare == 1 ? draw_statistics_overview_head_compare() : draw_statistics_overview_head();
    window.page.compare == 1 ? draw_statistics_overview_dounts_compare() : draw_statistics_overview_dounts();
    draw_statistics_overview_ordersGraph();
    draw_statistics_overview_topProducts();
    draw_statistics_overview_topUsers();
}
//
draw_statistics_overview_head = function(){

    let totalIncome = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-money fs101 mT3 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${website.currency}${bigInt(window.statistics.s1.so.total)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3',text:texts.dashboard.totalIncome})
    );

    let ordersPlaced = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-orders fs101 mT3 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1_orders)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3',text:texts.dashboard.ordersPlaced})
    );

    let successfullOrders = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-accepted cG fs1 mT4 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1.so.orders)} (${window.statistics.s1_so_percent}%)</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'so',key3:window.statistics.s1._id,key4:null,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:'',text:texts.dashboard.successfulOrders})
        )
    );

    let canceledorders = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-no cR fs101 mT4 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(window.statistics.s1.co.orders)} (${window.statistics.s1_co_percent}%)</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-5'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'co',key3:window.statistics.s1._id,key4:null,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:'',text:texts.dashboard.canceledorders})
        )
    );

    let solidProducts = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-products fs101 mT3 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(Object.keys(window.statistics.s1.products).length)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3',text:texts.dashboard.solidProducts})
    );

    let interactedUsers = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-users fs101 mT3 mie-5'}),
            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(Object.keys(window.statistics.s1.users).length)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3',text:texts.dashboard.interactedUsers})
    );

    $('#statistics_overview_Head').append(
        $('<div/>',{class:'row alnC jstfySB w100p'}).append(
            totalIncome,
            ordersPlaced,
            successfullOrders,
            canceledorders,
            solidProducts,
            interactedUsers
        )
    )

}
draw_statistics_overview_head_compare = function(){
    let totalIncome1 = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-money fs101 mT3 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${website.currency}${bigInt(window.statistics.s1.so.total)}</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.so.total,window.statistics.s2.so.total,texts.dashboard.totalIncome_compare,false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3 tnw',text:texts.dashboard.totalIncome})
    );
    let ordersPlaced1 = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-orders fs101 mT3 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1_orders)}</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1_orders,window.statistics.s2_orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.ordersPlaced.toLowerCase()),false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3 tnw',text:texts.dashboard.ordersPlaced})
    );
    let successfullOrders1 = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-accepted cG fs1 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1.so.orders)} (${window.statistics.s1_so_percent}%)</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.so.orders,window.statistics.s2.so.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.successfulOrders.toLowerCase()),false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'so',key3:window.statistics.s1._id,key4:window.statistics.s2._id,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:' tnw',text:texts.dashboard.successfulOrders})
        )
    );
    let canceledorders1 = $('<div/>',{class:'statistics_overviewHeadElem'}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-no cR fs101 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(window.statistics.s1.co.orders)} (${window.statistics.s1_co_percent}%)</span> <span class="fs08 mis-5">${compareNums(window.statistics.s1.co.orders,window.statistics.s2.co.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.canceledorders.toLowerCase()),true,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3'}).append(
            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'orders',key2:'co',key3:window.statistics.s1._id,key4:window.statistics.s2._id,key5:window.statistics.date1,key6:window.statistics.date2}),
            $('<span/>',{class:' tnw',text:texts.dashboard.canceledorders})
        )
    );
    let solidProducts1 = $('<div/>',{class:'statistics_overviewHeadElem '}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-products fs101 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(Object.keys(window.statistics.s1.products).length)}</span> <span class="fs08 mis-5">${compareNums(Object.keys(window.statistics.s1.products).length,Object.keys(window.statistics.s2.products).length,texts.dashboard.numberOfproducts_compare,false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3 tnw',text:texts.dashboard.solidProducts})
    );
    let interactedUsers1 = $('<div/>',{class:'statistics_overviewHeadElem '}).append(
        $('<div/>',{class:'row alnS jstfyS tnw'}).append(
            $('<div/>',{class:'ico-products fs101 mT4 mie-5'}),
            $('<div/>',{class:'row alnC',html:`<span class="bold fs102">${bigInt(Object.keys(window.statistics.s1.users).length)}</span> <span class="fs08 mis-5">${compareNums(Object.keys(window.statistics.s1.users).length,Object.keys(window.statistics.s2.users).length,texts.dashboard.numberOfusers_compare,false,false)}</span>`}),
        ),
        $('<div/>',{class:'c_white-10 mis-3 tnw',text:texts.dashboard.interactedUsers})
    );
    $('#statistics_overview_Head').append(
            $('<div/>',{class:'row wrap alnC jstfySB w100p'}).append(
                totalIncome1,
                ordersPlaced1,
                successfullOrders1,
                canceledorders1,
                solidProducts1,
                interactedUsers1
            ),
    )
}
//
draw_statistics_overview_dounts = function(){
    $('#statistics_overview_orders').append(
        $('<div/>',{class:'bold fs103 mB20',text:texts.dashboard.successfulOrders}),
        $('<div/>',{class:'row wrap alnC jstfyS'}).append(
            $('<div/>',{id:'overview_servicesDount'}),
            $('<div/>',{class:'mis-20'}).append(
                $('<div/>',{class:'row alnC jstfySB'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_delivery w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.deliveredOrders}`}),
                    ),
                    $('<div/>',{class:'fs09 bold',text:`${bigInt(window.statistics.s1.do.orders)} (${window.statistics.s1_do_percent}%)`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_pickup w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.pickedupOrders}`}),
                    ),
                    $('<div/>',{class:'fs09 bold',text:`${bigInt(window.statistics.s1.po.orders)} (${window.statistics.s1_po_percent}%)`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_dineIn w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.dinedinOrders}`}),
                    ),
                    $('<div/>',{class:'fs09 bold',text:`${bigInt(window.statistics.s1.di.orders)} (${window.statistics.s1_di_percent}%)`})
                ),
            )
        )
    )

    $('#statistics_overview_orders_income').append(
        $('<div/>',{class:'bold fs103 mB20',text:texts.dashboard.successfulOrdersIncome}),
        $('<div/>',{class:'row wrap alnC jstfyS'}).append(
            $('<div/>',{id:'overview_servicesIncomeDount'}),
            $('<div/>',{class:'mis-20'}).append(
                $('<div/>',{class:'row alnC jstfySB'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_delivery w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.deliveredOrdersIncome}`}),
                    ),
                    $('<div/>',{class:'fs09 bold',text:`${website.currency}${bigFloat(window.statistics.s1.do.total)}`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_pickup w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.pickedupOrdersIncome}`}),
                    ),
                    $('<div/>',{class:'fs09 bold',text:`${website.currency}${bigFloat(window.statistics.s1.po.total)}`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_dineIn w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.dinedinOrdersIncome}`}),
                    ),
                    $('<div/>',{class:'fs09 bold',text:`${website.currency}${bigFloat(window.statistics.s1.di.total)}`})
                ),
            )
        )
    )

    servicesDonut($('#overview_servicesIncomeDount'),window.statistics.s1.do.total,window.statistics.s1.po.total,window.statistics.s1.di.total)
    servicesDonut($('#overview_servicesDount'),window.statistics.s1.do.orders,window.statistics.s1.po.orders,window.statistics.s1.di.orders)
}
draw_statistics_overview_dounts_compare = function(){
    $('#statistics_overview_orders').append(
        $('<div/>',{class:'bold fs103 mB20',text:texts.dashboard.successfulOrders}),
        $('<div/>',{class:'row wrap alnC jstfyS'}).append(
            $('<div/>',{id:'overview_servicesDount'}),
            $('<div/>',{class:'mis-20'}).append(
                $('<div/>',{class:'row alnC jstfySB'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_delivery w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.deliveredOrders}`}),
                    ),
                    $('<div/>',{class:'fs09 bold row alnC',html:`${bigInt(window.statistics.s1.do.orders)} (${window.statistics.s1_do_percent}%) <span class="fs08 mis-3">${compareNums(window.statistics.s1.do.orders,window.statistics.s2.do.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.deliveredOrders.toLowerCase()),false,false)}</span>`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_pickup w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.pickedupOrders}`}),
                    ),
                    $('<div/>',{class:'fs09 bold row alnC',html:`${bigInt(window.statistics.s1.po.orders)} (${window.statistics.s1_po_percent}%) <span class="fs08 mis-3">${compareNums(window.statistics.s1.po.orders,window.statistics.s2.po.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.pickedupOrders.toLowerCase()),false,false)}</span>`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_dineIn w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.dinedinOrders}`}),
                    ),
                    $('<div/>',{class:'fs09 bold row alnC',html:`${bigInt(window.statistics.s1.di.orders)} (${window.statistics.s1_di_percent}%) <span class="fs08 mis-3">${compareNums(window.statistics.s1.di.orders,window.statistics.s2.di.orders,texts.dashboard.numberOfOrders_compare.replace(':orders:',texts.dashboard.dinedinOrders.toLowerCase()),false,false)}</span>`})
                ),
            )
        ),
    )
    $('#statistics_overview_orders_income').append(
        $('<div/>',{class:'bold fs103 mB20',text:texts.dashboard.successfulOrdersIncome}),
        $('<div/>',{class:'row wrap alnC jstfyS'}).append(
            $('<div/>',{id:'overview_servicesIncomeDount'}),
            $('<div/>',{class:'mis-20'}).append(
                $('<div/>',{class:'row alnC jstfySB'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_delivery w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.deliveredOrdersIncome}`}),
                    ),
                    $('<div/>',{class:'fs09 bold row alnC',html:`${website.currency}${bigFloat(window.statistics.s1.do.total)} <span class="fs08 mis-3">${compareNums(window.statistics.s1.do.total,window.statistics.s2.do.total,texts.dashboard.incomeFromOrders_compare.replace(':orders:',texts.dashboard.deliveredOrders.toLowerCase()),false,false)}</span>`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_pickup w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.pickedupOrdersIncome}`}),
                    ),
                    $('<div/>',{class:'fs09 bold row alnC',html:`${website.currency}${bigFloat(window.statistics.s1.po.total)} <span class="fs08 mis-3">${compareNums(window.statistics.s1.po.total,window.statistics.s2.po.total,texts.dashboard.incomeFromOrders_compare.replace(':orders:',texts.dashboard.pickedupOrders.toLowerCase()),false,false)}</span>`})
                ),
                $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'bgc_dineIn w10 h10 br50p mie-10'}),
                        $('<div/>',{class:'fs09 mie-20',text:`${texts.dashboard.dinedinOrdersIncome}`}),
                    ),
                    $('<div/>',{class:'fs09 bold row alnC',html:`${website.currency}${bigFloat(window.statistics.s1.di.total)} <span class="fs08 mis-3">${compareNums(window.statistics.s1.di.total,window.statistics.s2.di.total,texts.dashboard.incomeFromOrders_compare.replace(':orders:',texts.dashboard.dinedinOrders.toLowerCase()),false,false)}</span>`})
                ),
            )
        ),
    )

    servicesDonut($('#overview_servicesDount'),window.statistics.s1.do.orders,window.statistics.s1.po.orders,window.statistics.s1.di.orders)
    servicesDonut($('#overview_servicesIncomeDount'),window.statistics.s1.do.total,window.statistics.s1.po.total,window.statistics.s1.di.total)

    servicesDonut($('#overview_servicesDount2'),window.statistics.s2.do.orders,window.statistics.s2.po.orders,window.statistics.s2.di.orders)
    servicesDonut($('#overview_servicesIncomeDount2'),window.statistics.s2.do.total,window.statistics.s2.po.total,window.statistics.s2.di.total)

}
//

draw_statistics_overview_ordersGraph = function(){
    $('#overview_ordersGraph').remove();
    $('#overview_ordersIncomeGraph').remove();
    let graph_width = 600; let graph_height = 200;
    //
    $('#statistics_overview_orders').append(
        $('<div/>',{id:'overview_ordersGraph',class:'pT50 taC'}).append(
            drawStatisticsGraph('overviewStatisticsOrdersGraph',graph_height,graph_width,'orders',getGraphHighestNumber_orders('orders','so',window.statistics.s1_,window.statistics.s2_ ?? []))
        ),
    )
    $('#statistics_overview_orders_income').append(
        $('<div/>',{id:'overview_ordersIncomeGraph',class:'pT50 taC'}).append(
            drawStatisticsGraph('overviewStatisticsIncomeGraph',graph_height,graph_width,'income',getGraphHighestNumber_orders('income','so',window.statistics.s1_,window.statistics.s2_ ?? []))
        ),
    )
    fillStatisticsGraph_orders('overviewStatisticsOrdersGraph',graph_height,graph_width,'so','orders',getGraphHighestNumber_orders('orders','so',window.statistics.s1_,window.statistics.s2_ ?? []))
    fillStatisticsGraph_orders('overviewStatisticsIncomeGraph',graph_height,graph_width,'so','total',getGraphHighestNumber_orders('income','so',window.statistics.s1_,window.statistics.s2_ ?? []))
}
//
draw_statistics_overview_topProducts = function(){
    let top_products_s1 = get_statistics_top_products(window.statistics.s1.products,'total','desc');
    if(top_products_s1.length == 0 ){return;}
    $('#statistics_overview_topProducts').append(
        $('<div/>',{class:'bold fs103 mB20',text:texts.dashboard.topProducts}),
        $('<div/>',{id:'statistics_overview_topProducts_list',class:'row wrap alnC jstfyC'})
    )

    for(const key in top_products_s1){
        if(key < 8){
            let key4;
            let product_img = '/storage/imgs/cpanel/noimg.png';
            if(typeof(website.products.find(item=>item.name == top_products_s1[key].name)) !== 'undefined'){product_img = website.products.find(item=>item.name == top_products_s1[key].name).thumbnail}
            let ordered_compare = ''; let total_compare = '';
            if(window.page.compare == 1){
                if(typeof(window.statistics.s2.products[top_products_s1[key].name]) === 'undefined'){
                    ordered_compare = $('<span/>',{class:'',html:compareNums(top_products_s1[key].sum,0,texts.dashboard.productOrdered_compare.replace(':product:',top_products_s1[key].name),false,false)})
                    total_compare = $('<span/>',{class:'',html:compareNums(top_products_s1[key].total,0,texts.dashboard.productTotal_compare.replace(':product:',top_products_s1[key].name),false,false)})
                    key4 = 'undefined';
                }else{
                    key4 = window.statistics.s2._id;
                    ordered_compare = $('<span/>',{class:'',html:compareNums(top_products_s1[key].sum,window.statistics.s2.products[top_products_s1[key].name].sum,texts.dashboard.productOrdered_compare.replace(':product:',top_products_s1[key].name),false,false)})
                    total_compare = $('<span/>',{class:'',html:compareNums(top_products_s1[key].total,window.statistics.s2.products[top_products_s1[key].name].total,texts.dashboard.productTotal_compare.replace(':product:',top_products_s1[key].name),false,false)})
                }
            }else{
                key4 = null;
            }

            $('#statistics_overview_topProducts_list').append(
                $('<div/>',{class:'m20 column alnC jstfyC w100'}).append(
                    $('<img/>',{class:'w80 h80 br50p ofCover statisticspopup pointer',src:product_img,key1:'product',key2:top_products_s1[key].name,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                    $('<a/>',{class:'inline ellipsis w100 fs09 mT5 taC mis-5 popupPage popupId',popupPage:'product',popupId:'product',product:top_products_s1[key].name,text:top_products_s1[key].name}),
                )
            )
        }
    }
}

draw_statistics_overview_topUsers = function(){
    let top_users_s1 = get_statistics_top_users(window.statistics.s1.users,'so_total','desc');
    if(top_users_s1.length == 0){return;}
    $('#statistics_overview_top_users').append(
        $('<div/>',{class:'bold fs103 mB20',text:texts.dashboard.topUsers}),
        $('<div/>',{id:'statistics_overview_topUsers_table_list',class:'row wrap alnC jstfyC'})

    )
    for(const key in top_users_s1){
        if(key < 12){
            let key4;
            let orders_compare = ''; let total_compare = '';
            if(window.page.compare == 1){
                if(typeof(window.statistics.s2.users[top_users_s1[key].id]) === 'undefined'){
                    orders_compare = $('<span/>',{class:'',html:compareNums(top_users_s1[key].so,0,texts.dashboard.userOrders_compare.replace(':user:',top_users_s1[key].name),false,false)})
                    total_compare = $('<span/>',{class:'',html:compareNums(top_users_s1[key].so_total,0,texts.dashboard.userTotal_compare.replace(':user:',top_users_s1[key].name),false,false)})
                    key4 = 'undefined';
                }else{
                    key4 = window.statistics.s2._id;
                    orders_compare = $('<span/>',{class:'',html:compareNums(top_users_s1[key].so,window.statistics.s2.users[top_users_s1[key].id].so,texts.dashboard.userOrders_compare.replace(':user:',top_users_s1[key].name),false,false)})
                    total_compare = $('<span/>',{class:'',html:compareNums(top_users_s1[key].so_total,window.statistics.s2.users[top_users_s1[key].id].so_total,texts.dashboard.userTotal_compare.replace(':user:',top_users_s1[key].name),false,false)})
                }
            }else{
                key4 = null;
            }
            $('#statistics_overview_topUsers_table_list').append(
                $('<div/>',{class:'m20 column alnC jstfyC w100'}).append(
                    $('<span/>',{class:'ico-user fs2 statisticspopup pointer',key1:'user',key2:top_users_s1[key].id,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : null}),
                    $('<a/>',{class:'inline ellipsis w100 fs09 mT5 taC mis-5 popupPage popupId',popupPage:'user',popupId:'user',user:top_users_s1[key].id,text:top_users_s1[key].name}),
                )
            )
        }
    }
}
