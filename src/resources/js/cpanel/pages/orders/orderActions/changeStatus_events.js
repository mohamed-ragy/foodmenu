$('body').on('click','.changeOrderStatus',function(e){
    e.stopImmediatePropagation();
    let thisElem = $(this);
    changeOrderStatus($(this).attr('order'),function(){
        $('#changeOrderStatus').css({
            left:thisElem.offset().left,
            top:thisElem.offset().top + thisElem.outerHeight()
        })
    })
})
$('body').on('click',function(e){
    if($('#changeOrderStatus').is(':hover')){return}
    $('#changeOrderStatus').text('').addClass('none')
})

//

$('body').on('click','.orderAction_acceptOrder',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    acceptOrder(order_id)
})
//
$('body').on('click','.orderAction_cancelOrder',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    cancelOrder(order_id)
})
//
$('body').on('click','.orderAction_markAsreadyForPickup',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    markAsreadyForPickup(order_id)
})
//
$('body').on('click','.orderAction_markAsPickedUp',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    markAsPickedUp(order_id)
})
//
$('body').on('click','.orderAction_markAsOutForDelivery',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    markAsOutForDelivery(order_id)
})
//
$('body').on('click','.orderAction_giveToDelivery',function(e){
    $('#changeOrderStatus').text('').addClass('none');
    let order = website.incompleteOrders.find(item=>item._id == $(this).attr('order'));
    showPopup('giveOrderToDeliveryMan',function(){
        $('.popupBody').text('').append(
            $('<div/>',{class:'bold500 mB20',text:`${texts.orders.orderNumber} ${order.id}`}),
            $('<div/>',{class:'column alnS jstfyS',id:'giveOrderToDelivery_deliveriesContainer'})
        );
        if(website.deliveries.length == 0){
            $('#giveOrderToDelivery_deliveriesContainer').append(
                $('<div/>',{class:'',html:texts.orders.noDeliveryAccounts})
            )
        }
        for(const key in website.deliveries){
            let deliveryMan = website.deliveries[key];
            if(order.delivery_id != deliveryMan.id){
                $('#giveOrderToDelivery_deliveriesContainer').append(
                    $('<div/>',{class:'giveOrderToDelivery_deliveryElem'}).append(
                        $('<div/>',{text:deliveryMan.deliveryName.split('@')[0]}),
                        $('<button/>',{class:'btn fs08 p2 orderAction_giveToDelivery_confirm',order:order._id,delivery:deliveryMan.id,text:texts.orders.giveOrder})
                    )
                )
            }
        }
    })
});
$('body').on('click','.orderAction_giveToDelivery_confirm',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    let order_id = $(this).attr('order');
    let delivery_id = $(this).attr('delivery')
    closePopup();
    giveToDelivery(order_id,delivery_id)
})
//
$('body').on('click','.orderAction_markAsDelivered',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    markAsDelivered(order_id)
})
//
$('body').on('click','.orderAction_markAsDiningin',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    markAsDiningin(order_id)
})
//
$('body').on('click','.orderAction_markAsDinedin',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $('#changeOrderStatus').text('').addClass('none')
    let order_id = $(this).attr('order')
    markAsDinedin(order_id)
})
//
