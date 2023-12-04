resetPlaceOrder = function(){
    resetPlaceOrder_details();
    resetPlaceOrder_items();
}
//
resetPlaceOrder_details = function(){
    window.placeOrder.type = 2;
    $('.placeOrderTypeElemCheck').removeClass('ico-check1').addClass('ico-check0')
    $(`.placeOrderTypeElem[type="2"]`).find('.placeOrderTypeElemCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.placeOrderPaymentMethodElemCheck').removeClass('ico-check1').addClass('ico-check0')
    //
    resetPlaceOrder_paymentMethod();
    //
    resetPlaceOrder_placeFor();
    //
    window.placeOrder.notice = '';
    $('#placeOrder-comment').val('')
    //

}
resetPlaceOrder_paymentMethod = function(){
    window.placeOrder.paymentMethod = null;
    $('.placeOrderPaymentMethodElemCheck').addClass('ico-check0').removeClass('ico-check1')
}
resetPlaceOrder_placeFor = function(){
    window.placeOrder.isGuest = false;
    window.placeOrder.user_id = null;
    window.placeOrder.userName = null;
    $('#placeOrder-usersInputList').closest('.inputListContainer').removeClass('none');
    $('#placeOrder-usersInputList').val('').attr('key',null)
    $('.placeOrderForElem[type="user"]').find('.placeOrderForElemCheck').removeClass('ico-check0').addClass('ico-check1')
    $('.placeOrderForElem[type="guest"]').find('.placeOrderForElemCheck').addClass('ico-check0').removeClass('ico-check1')
    //
    window.placeOrder.phoneNumber = '';
    $('#placeOrder-phoneNumber').val('');
    //
    window.placeOrder.address = '';
    $('#placeOrder-address').val('')
    //
    window.placeOrder.lat = '0';
    window.placeOrder.lng = '0';
    $('#placeOrder-locationToggle').attr('action','show')
    $('#placeOrder-locationToggle').text(texts.orders.addLocation);
    if(!$('#placeOrder-userLocation').hasClass('none')){
        window.placeOrderMapMarker.setLatLng([0,0]);
        window.placeOrderMap.removeLayer(window.placeOrderMapMarker)
        window.placeOrderMap.flyTo([0,0], 1, {
            animate: false,
            duration: 1
        });
        $('#placeOrder-userLocation').addClass('none')
    }
}
//
resetPlaceOrder_items = function(){
    window.placeOrder.discount = 0;
    window.placeOrder.deliveryCost = parseFloat(website.deliveryCost);
}
//
