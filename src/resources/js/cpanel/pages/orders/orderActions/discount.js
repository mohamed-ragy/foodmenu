$('html,body').on('click','#order-discountD',function(e){
    e.stopImmediatePropagation();
    if(parseInt($('#order-discount').text()) == 0){return}
    $('#order-discount').text(parseInt($('#order-discount').text())  - 1);
    orderDiscount_nosave();
})
$('html,body').on('click','#order-discountU',function(e){
    e.stopImmediatePropagation();
    if(parseInt($('#order-discount').text()) == 100){return}
    $('#order-discount').text(parseInt($('#order-discount').text())  + 1);
    orderDiscount_nosave();
})

orderDiscount_nosave = function(){
    getOrder(window.history.state.order).then((order)=>{
        if(parseInt($('#order-discount').text()) != order.discount){
            $('.changeOrderDiscountBtns').removeClass('none')
            $('.order-discountNoSave').removeClass('none')
        }else{
            $('.changeOrderDiscountBtns').addClass('none')
            $('.order-discountNoSave').addClass('none')
        }
    })
}

$('html,body').on('click','.cancelChangeOrderDiscountBtn',function(e){
    e.stopImmediatePropagation();
    getOrder(window.history.state.order).then((order)=>{
        $('#order-discount').text(order.discount)
        orderDiscount_nosave();
    });
})

$('html,body').on('click','.changeOrderDiscountBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    showBtnLoading($('.changeOrderDiscountBtn'))
    let order_id = window.history.state.order;
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeDiscount:true,
            order_id:window.history.state.order,
            discount:$('#order-discount').text(),
        },success:function(r){
            hideBtnLoading($('.changeOrderDiscountBtn'))
            if(r.changeDiscountStat == 1){
                website.incompleteOrders.find(item=>item._id == order_id).discount = r.discount;
                website.incompleteOrders.find(item=>item._id == order_id).discount_itemsTotal = r.discount_itemsTotal;
                website.incompleteOrders.find(item=>item._id == order_id).tax = r.tax;
                website.incompleteOrders.find(item=>item._id == order_id).service = r.service;
                website.incompleteOrders.find(item=>item._id == order_id).total = r.total;
                website.incompleteOrders.find(item=>item._id == order_id).discount_by = 1;
                website.incompleteOrders.find(item=>item._id == order_id).discount_promocode = null;
                website.incompleteOrders.find(item=>item._id == order_id).discount_promocode_id = null;
                website.incompleteOrders.find(item=>item._id == order_id).discount_account_id = account.id;
                website.incompleteOrders.find(item=>item._id == order_id).discount_account_name = account.name;

                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.changeDiscountStat == 0){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})

//
