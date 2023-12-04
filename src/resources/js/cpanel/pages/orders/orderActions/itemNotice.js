$('html,body').on('click','.order-editItemNotice',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.order-itemNoticeContainer').find('.order-itemNotice').select();
})

$('html,body').on('change','.order-itemNotice',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let item_id = $(this).closest('.order-item').attr('item');
    let itemNotice = $(this).val();
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeItemNotice:true,
            order_id:window.history.state.order,
            item_id:item_id,
            itemNotice:itemNotice,
        },success:function(r){
            if(r.changeItemNoticeStat == 1){
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == item_id).itemNotice = itemNotice;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == window.history.state.order){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.changeItemNoticeStat == 0){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})
