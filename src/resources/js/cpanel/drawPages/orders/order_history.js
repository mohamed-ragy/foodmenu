drawPage_order_history = function(){
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.order_history}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
            ),
            $('<div/>',{class:'w100p mT40'}).append(
                $('<div/>',{class:'fs08 mT20 mB5',text:texts.orders.orderNumber}),
                $('<div/>',{class:'row wrap alnC jstfyS'}).append(
                    drawInputText('','ico-hashtag','',texts.orders.orderNumber,'orderHistory-orderNumber','number',texts.orders.orderNumber,200,'clearVal','','',false,'')
                ),
                $('<div/>',{class:'orderHistoryFiltersContainer'}).append(
                    $('<div/>',{class:'fs08 mT20 mB5',text:texts.orders.orderStatus}),
                    $('<div/>',{class:'row wrap alnC jstfyS'}).append(
                        $('<div/>',{orderHistoryStatusBy:'dinedIn',class:'orderHistoryStatusBy pointer mX20'}).append(
                            $('<span/>',{class:'orderHistoryStatusByCheck ico-check1 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.orders.dinedIn}),
                        ),
                        $('<div/>',{orderHistoryStatusBy:'pickedUp',class:'orderHistoryStatusBy pointer mX20'}).append(
                            $('<span/>',{class:'orderHistoryStatusByCheck ico-check1 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.orders.pickedUp}),
                        ),
                        $('<div/>',{orderHistoryStatusBy:'delivered',class:'orderHistoryStatusBy pointer mX20'}).append(
                            $('<span/>',{class:'orderHistoryStatusByCheck ico-check1 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.orders.delivered}),
                        ),
                        $('<div/>',{orderHistoryStatusBy:'canceled',class:'orderHistoryStatusBy pointer mX20'}).append(
                            $('<span/>',{class:'orderHistoryStatusByCheck ico-check1 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.orders.canceled}),
                        ),
                    ),
                    $('<div/>',{class:'fs08 mT20 mB5',text:texts.orders.placedFor}),
                    $('<div/>',{class:'row wrap alnC jstfyS'}).append(
                        $('<div/>',{orderHistoryFor:'users',class:'orderHistoryFor pointer mX20'}).append(
                            $('<span/>',{class:'orderHistoryForCheck ico-check1 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.cpanel.public.users}),
                        ),
                        $('<div/>',{orderHistoryFor:'guests',class:'orderHistoryFor pointer mX20'}).append(
                            $('<span/>',{class:'orderHistoryForCheck ico-check1 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.cpanel.public.guests}),
                        ),
                        $('<div/>',{orderHistoryFor:'user',class:'orderHistoryFor pointer mX20'}).append(
                            $('<span/>',{class:'orderHistoryForCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.cpanel.public.user}),
                        ),
                    ),
                    $('<div/>',{class:'orderHistoryFor_findUserContainer none'}).append(
                        drawInputList('','ico-users','',texts.users.findUser,'orderHistoryFor_findUser',texts.users.findUserPlaceholder,250,'orderHistoryFor_findUserList',false,'mX10','findUserList','findUser'),
                    ),
                ),
                $('<a/>',{class:'orderHistoryMoreFiltersSwitch mT10 block fs08',text:texts.products.moreFilters}),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<button/>',{class:'btn',id:'orderHistory_findOrdersBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.orders.findOrders})
                    )
                ),
                $('<div/>',{class:'w100p mT50 mB10 row alnC jstfyE',id:'orderHistoryTableArrowsContainer'}).append(
                    $('<div/>',{class:'orderHistoryCountContainer'}),
                    $('<div/>',{class:'orderHistoryPrev orderHistoryArrow_dump ico-left',tooltip:texts.cpanel.public.previous}),
                    $('<div/>',{class:'orderHistoryNext orderHistoryArrow_dump ico-right',tooltip:texts.cpanel.public.next}),
                ),
                $('<div/>',{class:'w100p overflowX-A'}).append(
                    $('<table/>',{class:'mnw800',id:'orderHistoryTable'})
                )
            ),
        )
    )
    setOrderHistoryFilters();
    pushHistory(false)
    getOrderHistory();
}

drawOrderHistoryTable_loading = function(){
    $('#orderHistoryTable').text('').append(
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
        $('#orderHistoryTable').append(
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
