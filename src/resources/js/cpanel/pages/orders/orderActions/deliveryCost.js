orderDeliveryCost_nosave = function(){
    getOrder(window.history.state.order).then((order)=>{
        if(parseFloat($('#order-deliveryCost').val()) != order.deliveryCost){
            $('.changeOrderDeliveryCostBtns').removeClass('none')
            $('.order-deliveryCostNoSave').removeClass('none')
        }else{
            $('.changeOrderDeliveryCostBtns').addClass('none')
            $('.order-deliveryCostNoSave').addClass('none')
        }
    })
}
$('body').on('click','#order-editDeliveryCost',function(e){
    $('#order-deliveryCost').select();
})
$('body').on('change input','#order-deliveryCost',function(e){
    $(this)[0].value = $(this)[0].value.replace(/[^0-9.]/g, '');
    orderDeliveryCost_nosave();
})
$('body').on('click','.cancelChangeOrderDeliveryCostBtn',function(e){
    getOrder(window.history.state.order).then((order)=>{
        $('#order-deliveryCost').val(bigFloat(order.deliveryCost))
        orderDeliveryCost_nosave();
    });
})

$('body').on('click','.changeOrderDeliveryCostBtn',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    showBtnLoading($('.changeOrderDeliveryCostBtn'))
    let order_id = window.history.state.order;
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeDeliveryCost:true,
            order_id:window.history.state.order,
            deliveryCost:$('#order-deliveryCost').val(),
        },success:function(r){
            hideBtnLoading($('.changeOrderDeliveryCostBtn'))
            if(r.changeDeliveryCostStat == 1){
                website.incompleteOrders.find(item=>item._id == order_id).deliveryCost = r.deliveryCost;
                website.incompleteOrders.find(item=>item._id == order_id).total = r.total;

                website.incompleteOrders.find(item=>item._id == order_id).deliveryEdit_account_id = account.id;
                website.incompleteOrders.find(item=>item._id == order_id).deliveryEdit_account_name = account.name;

                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.changeDeliveryCostStat == 0){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})

//
