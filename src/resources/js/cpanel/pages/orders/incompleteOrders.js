$('html,body').on('click','.pageTab_incompleteOrders',function(e){
    e.stopImmediatePropagation();
    drawIncompleteOrdersTable($(this).attr('status'),window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc')
})
$('html,body').on('click','.incompleteOrdersTR',function(e){
    e.stopImmediatePropagation();
    window.page.order_by = $(this).attr('order_by');
    let sort = 'desc';
    if($(this).find('.incompleteOrdersTRArrow').hasClass('ico-down')){sort = 'asc'}
    window.page.sort = sort;
    pushHistory(false)
    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',$(this).attr('order_by'),sort);
})
///
