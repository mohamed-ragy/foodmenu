$('body').on('click','.order-qtyMins',function(e){
    if(!$(this).hasClass('ico-left')){return;}
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    let item_id = $(this).closest('.order-item').attr('item');
    $(this).removeClass('ico-left').addClass('notAllowed').append($('<div/>',{class:'loading_s vV'}));
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeItemQty:true,
            order_id:window.history.state.order,
            item_id:item_id,
            action:'minus',
        },success:function(r){
            if(r.changeItemQtyStat == 1){
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == item_id).total = r.item_total;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == item_id).qty = r.item_qty;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsTotal = r.itemsTotal;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).discount_itemsTotal = r.discount_itemsTotal;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).tax = r.tax;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).service = r.service;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).total = r.total;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsEdit_account_name = account.name;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsEdit_account_id = account.id;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items_original = r.order_items_original;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == window.history.state.order){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.changeItemQtyStat == 1){
                showAlert('error',r.msg,4000,true)
            }
        }
    });
});
$('body').on('click','.order-qtyPlus',function(e){
    if(!$(this).hasClass('ico-right')){return;}
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    let item_id = $(this).closest('.order-item').attr('item');
    $(this).removeClass('ico-right').addClass('notAllowed').append($('<div/>',{class:'loading_s vV'}));
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeItemQty:true,
            order_id:window.history.state.order,
            item_id:item_id,
            action:'plus',
        },success:function(r){
            if(r.changeItemQtyStat == 1){
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == item_id).total = r.item_total;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == item_id).qty = r.item_qty;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsTotal = r.itemsTotal;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).discount_itemsTotal = r.discount_itemsTotal;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).tax = r.tax;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).service = r.service;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).total = r.total;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsEdit_account_name = account.name;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsEdit_account_id = account.id;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items_original = r.order_items_original;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == window.history.state.order){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.changeItemQtyStat == 1){
                showAlert('error',r.msg,4000,true)
            }
        }
    });
});
