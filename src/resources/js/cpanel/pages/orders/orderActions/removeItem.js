$('body').on('click','.order-deleteItem',function(e){
    if(website.incompleteOrders.find(i=>i._id == window.history.state.order).order_items.length <= 1){
        showAlert('error',texts.orders.cantRemoveLastItem,4000,true);
        return;
    }
    if($(this).hasClass('loading_s')){return;}
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $(this).removeClass('ico-close').addClass('loading_s vV notAllowed')
    let item_id = $(this).closest('.order-item').attr('item');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            removeItemFromOrder:true,
            order_id:window.history.state.order,
            item_id:item_id,
        },success:function(r){
            if(r.removeItemFromOrderStat == 1){
                for(const key in website.incompleteOrders.find(i=>i._id == window.history.state.order).order_items){
                    if(website.incompleteOrders.find(i=>i._id == window.history.state.order).order_items[key]._id == item_id){
                        website.incompleteOrders.find(i=>i._id == window.history.state.order).order_items.splice(key,1)
                    }
                }
                website.incompleteOrders.find(i=>i._id == window.history.state.order).itemsTotal = r.itemsTotal;
                website.incompleteOrders.find(i=>i._id == window.history.state.order).discount_itemsTotal = r.discount_itemsTotal;
                website.incompleteOrders.find(i=>i._id == window.history.state.order).tax = r.tax;
                website.incompleteOrders.find(i=>i._id == window.history.state.order).service = r.service;
                website.incompleteOrders.find(i=>i._id == window.history.state.order).total = r.total;
                website.incompleteOrders.find(i=>i._id == window.history.state.order).itemsEdit_account_name = account.name;
                website.incompleteOrders.find(i=>i._id == window.history.state.order).itemsEdit_account_id = account.id;
                website.incompleteOrders.find(i=>i._id == window.history.state.order).order_items_original = r.order_items_original;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == window.history.state.order){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.removeItemFromOrderStat == 0){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})
