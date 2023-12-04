$('html,body').on('click','#order-addItemBtn',function(e){
    e.stopImmediatePropagation();
    getOrder(window.history.state.order).then((order)=>{
        showAddOrderItemPopup(order._id);
    })
})

addItemToOrder = function(){
    let product = website.products.find(item => item.id == $('#addItemProductList').attr('key'));
    let qty = parseInt($('#addOrderItem-qty').text());
    let selections = [];
    $('.addItem-selectionCheck.ico-check1').each(function(){
        let option = product.product_options.find(item=>item.id == $(this).attr('option'));
        let selection = option.product_option_selections.find(item=>item.id == $(this).attr('selection'))
        selections.push({
            product_option_id:option.id,
            product_option_selection_id:selection.id,
        })
    });
    $('#order-itemsContainer').append(
        $('<div/>',{class:'order-item'}).append(
            $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                    $('<div/>',{class:'none-720 w40 h40 cardLoading ofCover br5 mie-5'}),
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'bold fs09 cardLoading h10 w100 br3'}),
                    ),
                ),
                $('<div/>',{class:'h10 w50 br5 cardLoading'}),
            )
        )
    )
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            addItemToOrder:true,
            order_id:window.history.state.order,
            item:{
                product_id:product.id,
                qty:qty,
                order_item_option_selections:selections,
                itemNotice:$('#addOrderItem-itemNotice').val()
            }
        },success:function(r){
            if(r.addItemToOrderStat == 1){
                website.incompleteOrders.find(item=>item._id == window.history.state.order).order_items.push(r.item);
                website.incompleteOrders.find(item=>item._id == window.history.state.order).itemsTotal = r.itemsTotal;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).discount_itemsTotal = r.discount_itemsTotal;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).tax = r.tax;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).service = r.service;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).total = r.total;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).itemsEdit_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).itemsEdit_account_id = account.id;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).order_items_original = r.order_items_original;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == window.history.state.order){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
                showAlert('success',r.msg,4000,true)
                console.log(website.incompleteOrders.find(item=>item._id == window.history.state.order))
            }else if(r.addItemToOrderStat == 0){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
}
