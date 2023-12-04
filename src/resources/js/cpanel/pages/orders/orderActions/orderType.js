$('html,body').on('click','.changeOrderType',function(e){
    e.stopImmediatePropagation();
    let thisElem = $(this);
    let type;
    getOrder(window.history.state.order).then((order)=>{
        type = order.type;
        $('#changeOrderType').text('')
        for(i=0;i<=2;i++){
            if(i != type){
                $('#changeOrderType').append(
                    $('<div/>',{order:order._id,class:'changeOrderTypeElem changeOrderType_action',type:i,text:texts.orders[`type_${i}`]}),
                )
            }
        }
        $('#changeOrderType').css({
            left:thisElem.offset().left,
            top:thisElem.offset().top + thisElem.outerHeight()
        }).removeClass('none')

    })

})
$('html,body').on('click',function(e){
    if($('#changeOrderType').is(':hover')){return}
    $('#changeOrderType').text('').addClass('none')
})

$('html,body').on('click','.changeOrderType_action',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderType').text('').addClass('none')
    let order_id = window.history.state.order;
    let type = $(this).attr('type');
    $('.orderTypeTagContainer').find('.loading').removeClass('none').addClass('vV')
    $('.orderTypeTagContainer').find('.orderTypeTag').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeOrderType:true,
            order_id:order_id,
            type:type,
        },success:function(r){
            if(r.changeOrderTypeStatus == 1){
                website.incompleteOrders.find(item=>item._id == order_id).type = type;
                website.incompleteOrders.find(item=>item._id == order_id).typeEdit_account_name = account.name;
                website.incompleteOrders.find(item=>item._id == order_id).typeEdit_account_id = account.id;
                website.incompleteOrders.find(item=>item._id == order_id).tax = r.tax;
                website.incompleteOrders.find(item=>item._id == order_id).taxPercent = r.taxPercent;
                website.incompleteOrders.find(item=>item._id == order_id).service = r.service;
                website.incompleteOrders.find(item=>item._id == order_id).servicePercent = r.servicePercent;
                website.incompleteOrders.find(item=>item._id == order_id).deliveryCost = r.deliveryCost;
                website.incompleteOrders.find(item=>item._id == order_id).total = r.total;
                website.incompleteOrders.find(item=>item._id == order_id).deliveryEdit_account_name = null;
                website.incompleteOrders.find(item=>item._id == order_id).deliveryEdit_account_id = null;
                website.incompleteOrders.find(item=>item._id == order_id).paymentMethod = null;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == order_id){
                    drawPopupPage_order_fillData(order_id)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.changeOrderTypeStatus == 0){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})
