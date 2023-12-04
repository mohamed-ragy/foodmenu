placeOrder_load = function(){
    placeNewOrderChangeType(window.placeOrder.type,false);
    $(`.placeOrderPaymentMethodElem[method="${window.placeOrder.paymentMethod}"]`).find('.placeOrderPaymentMethodElemCheck').addClass('ico-check1').removeClass('ico-check0');
    setPlaceOrderFor(window.placeOrder.isGuest ? 'guest' : 'user',false);
    $('#placeOrder-usersInputList').val(window.placeOrder.userName).attr('key',window.placeOrder.user_id);
    $('#placeOrder-phoneNumber').val(window.placeOrder.phoneNumber);
    $('#placeOrder-address').val(window.placeOrder.address);
    if(window.placeOrder.lat != 0 || window.placeOrder.lng != 0){
        drawPlaceOrderMap(window.placeOrder.lat,window.placeOrder.lng)
    }
    $('#placeOrder-comment').val(window.placeOrder.notice);
    drawPlaceOrderItems();
}

