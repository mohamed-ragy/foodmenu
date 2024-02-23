require('./orderHistory/filters.js')//done//
require('./orderHistory/tableEvents.js')//done//

//
getOrderHistory = function(){
    $('#orderHistoryTable').text('')
    showBtnLoading($('#orderHistory_findOrdersBtn'))
    drawOrderHistoryTable_loading()
    $('.orderHistoryNext').addClass('orderHistoryArrow_dump')
    $('.orderHistoryPrev').addClass('orderHistoryArrow_dump')
    $('.orderHistoryCountContainer').text('')
    let orderHistoryTRArrow_id = '';
    let orderHistoryTRArrow_type = '';
    let orderHistoryTRArrow_placed_at = '';
    let orderHistoryTRArrow_status = '';
    let orderHistoryTRArrow_customer = '';
    let orderHistoryTRArrow_Price = '';
    if(window.history.state.orderBy == 'id'){window.history.state.sort == 'desc' ? orderHistoryTRArrow_id = 'ico-down' : window.history.state.sort == 'asc' ? orderHistoryTRArrow_id = 'ico-up' : null;}
    if(window.history.state.orderBy == 'type'){window.history.state.sort == 'desc' ? orderHistoryTRArrow_type = 'ico-down' : window.history.state.sort == 'asc' ? orderHistoryTRArrow_type = 'ico-up' : null;}
    if(window.history.state.orderBy == 'placed_at'){window.history.state.sort == 'desc' ? orderHistoryTRArrow_placed_at = 'ico-down' : window.history.state.sort == 'asc' ? orderHistoryTRArrow_placed_at = 'ico-up' : null;}
    if(window.history.state.orderBy == 'status'){window.history.state.sort == 'desc' ? orderHistoryTRArrow_status = 'ico-down' : window.history.state.sort == 'asc' ? orderHistoryTRArrow_status = 'ico-up' : null;}
    if(window.history.state.orderBy == 'customer'){window.history.state.sort == 'desc' ? orderHistoryTRArrow_customer = 'ico-down' : window.history.state.sort == 'asc' ? orderHistoryTRArrow_customer = 'ico-up' : null;}
    if(window.history.state.orderBy == 'price'){window.history.state.sort == 'desc' ? orderHistoryTRArrow_Price = 'ico-down' : window.history.state.sort == 'asc' ? orderHistoryTRArrow_Price = 'ico-up' : null;}
    $('#orderHistoryTable').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'orderHistoryTR m0',order_by:'id'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.order,class:'mie-10'}),
                    $('<span/>',{class:`orderHistoryTRArrow fs08 ${orderHistoryTRArrow_id}`})
                )
            ),
            $('<th/>',{class:'orderHistoryTR m0',order_by:'type'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.type,class:'mie-10'}),
                    $('<span/>',{class:`orderHistoryTRArrow fs08 ${orderHistoryTRArrow_type}`})
                )
            ),
            $('<th/>',{class:'orderHistoryTR m0',order_by:'placed_at'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.placed,class:'mie-10'}),
                    $('<span/>',{class:`orderHistoryTRArrow fs08 ${orderHistoryTRArrow_placed_at}`})
                )
            ),
            $('<th/>',{class:'orderHistoryTR m0',order_by:'status'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.status,class:'mie-10'}),
                    $('<span/>',{class:`orderHistoryTRArrow fs08 ${orderHistoryTRArrow_status}`})
                )
            ),
            $('<th/>',{class:' m0',}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.items,class:'mie-10'}),
                    // $('<span/>',{class:`orderHistoryTRArrow fs08 ${orderHistoryTRArrow_items}`})
                )
            ),
            $('<th/>',{class:'orderHistoryTR m0',order_by:'customer'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.customer,class:'mie-10'}),
                    $('<span/>',{class:`orderHistoryTRArrow fs08 ${orderHistoryTRArrow_customer}`})
                )
            ),
            $('<th/>',{class:'orderHistoryTR m0',order_by:'price'}).append(
                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                    $('<span/>',{text:texts.orders.price,class:'mie-10'}),
                    $('<span/>',{class:`orderHistoryTRArrow fs08 ${orderHistoryTRArrow_Price}`})
                )
            ),
            $('<td/>',{}),
        )
    )

    let skip = (window.history.state.orderHistory_page - 1) * 10;
    let statuses = [];
    window.history.state.dinedIn == 1 ? statuses.push(7) : null;
    window.history.state.pickedUp == 1 ? statuses.push(6) : null;
    window.history.state.delivered == 1 ? statuses.push(5) : null;
    window.history.state.canceled == 1 ? statuses.push(2) : null;
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            findOrders:true,
            skip:skip,
            sort:window.history.state.sort,
            orderBy:window.history.state.orderBy,
            orderNumber:window.history.state.orderNumber,
            statuses:statuses,
            byUsers:window.history.state.byUsers,
            byGuests:window.history.state.byGuests,
            user:window.history.state.user,
        },success:function(r){
            hideBtnLoading($('#orderHistory_findOrdersBtn'))
            if(r.orders.length == 0){
                $('#orderHistoryTableArrowsContainer').addClass('none')
                $('#orderHistoryTable').text('').append(
                    $('<div/>',{class:'m10',text:texts.orders.noOrders})
                )
            }else{

                $('#orderHistoryTableArrowsContainer').removeClass('none')
                $('.orderHistoryCountContainer').text('').text(`${skip + 1}-${skip + r.orders.length} ${texts.cpanel.public.of} ${r.count}`);
                window.history.state.orderHistory_page == 1 ? $('.orderHistoryPrev').addClass('orderHistoryArrow_dump') : $('.orderHistoryPrev').removeClass('orderHistoryArrow_dump');
                (skip + r.orders.length) >=  r.count ? $('.orderHistoryNext').addClass('orderHistoryArrow_dump') : $('.orderHistoryNext').removeClass('orderHistoryArrow_dump');

                for(const key in r.orders){
                    if(typeof(website.orderHistory.find(item=>item._id == r.orders[key]._id)) === 'undefined'){
                        website.orderHistory.push(r.orders[key])
                    }
                    $('#orderHistoryTable').append(drawOrdersTableRow(r.orders[key]))
                }
            }
            }

    })
}
//
