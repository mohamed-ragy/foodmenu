
placeOrderChangeType = function(){
    if(account.authorities[0] == false){return}
    let orderType = $('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType');
    window.placeOrder.discount = 0;
    $('#placeOrder-addLocation').text(texts.orders.addLocation);
    $('#placeOrder-userLocationContainer').addClass('h0 ofH')
    window.placeOrder.userLat = 0;
    window.placeOrder.userLng = 0;
    setPlaceOrderUserLocation();
    switch(orderType){
        case 'dineIn':
            $('#placeOrder-paymentMethodContainer').addClass('none');
            $('.placeOrderPaymentMethodCard[paymentMethod="cashOnDelivery"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cardOnDelivery"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cashOnPickup"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cardOnPickup"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('#placeOrder-userPhoneNumber').parent().removeClass('none');
            $('#placeOrder-userAddress').parent().addClass('none');
            $('#placeOrder-userLocation').parent().addClass('none');
            $('#placeOrder-addLocation').addClass('none');
            window.placeOrder.discount = getDiscount(website.workingDays_dinein);
            break;
        case 'delivery':
            $('#placeOrder-paymentMethodContainer').removeClass('none');
            $('.placeOrderPaymentMethodCard[paymentMethod="cashOnDelivery"]').removeClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cardOnDelivery"]').removeClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cashOnPickup"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cardOnPickup"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('#placeOrder-userPhoneNumber').parent().removeClass('none');
            $('#placeOrder-userAddress').parent().removeClass('none');
            $('#placeOrder-userLocation').parent().removeClass('none');
            $('#placeOrder-addLocation').removeClass('none');
            window.placeOrder.discount = getDiscount(website.workingDays_delivery);
            break;
        case 'pickup':
            $('#placeOrder-paymentMethodContainer').removeClass('none');
            $('.placeOrderPaymentMethodCard[paymentMethod="cashOnDelivery"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cardOnDelivery"]').addClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cashOnPickup"]').removeClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('.placeOrderPaymentMethodCard[paymentMethod="cardOnPickup"]').removeClass('none').find('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
            $('#placeOrder-userPhoneNumber').parent().removeClass('none');
            $('#placeOrder-userAddress').parent().addClass('none');
            $('#placeOrder-userLocation').parent().addClass('none');
            $('#placeOrder-addLocation').addClass('none');
            window.placeOrder.discount = getDiscount(website.workingDays_pickup);
            break;
    }
    drawPlaceOrderCheck();
}
placeOrderChangePlaceFor = function(){
    if(account.authorities[0] == false){return}
    $('#placeOrder-usersListInput').val('').attr('key',null)
    $('#placeOrder-userPhoneNumber').val('')
    $('#placeOrder-userAddress').val('')
    window.placeOrder.userLat = 0;
    window.placeOrder.userLng = 0;
    setPlaceOrderUserLocation();
    if($('.placeOrderPlaceForCard[visitor="user"]').find('.placeOrderPlaceForCheck').hasClass('ico-check1')){
        $('#placeOrder-usersListInput').parent().parent().removeClass('h0 ofH');
    }else if($('.placeOrderPlaceForCard[visitor="guest"]').find('.placeOrderPlaceForCheck').hasClass('ico-check1')){
        $('#placeOrder-usersListInput').parent().parent().addClass('h0 ofH');
    }
}
///////////////
$('.placeOrderTypeCard').on('click',function(e){
    e.stopImmediatePropagation();
    $('.placeOrderTypeCheck').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.placeOrderTypeCheck').removeClass('ico-check0').addClass('ico-check1')
    placeOrderChangeType();
})
/////////
$('.placeOrderPaymentMethodCard').on('click',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.placeOrderPaymentMethodCheck').hasClass('ico-check0')){
        $('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0')
        $(this).find('.placeOrderPaymentMethodCheck').removeClass('ico-check0').addClass('ico-check1');
    }else{
        $('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0')
    }
})
/////////
$('.placeOrderPlaceForCard').on('click',function(e){
    e.stopImmediatePropagation();
    $('.placeOrderPlaceForCheck').removeClass('ico-check1').addClass('ico-check0')
    $(this).find('.placeOrderPlaceForCheck').removeClass('ico-check0').addClass('ico-check1');
    placeOrderChangePlaceFor();
})
$('#placeOrder-usersList').on('click','.inputListElement',function(e){
    let selectedUser = window.findUser.find(item=> item.id == $(this).attr('key'));
    if(typeof(selectedUser) === 'undefined'){return;}
    $('#placeOrder-userPhoneNumber').val(selectedUser.phoneNumber)
    $('#placeOrder-userAddress').val(selectedUser.address)
    $('#placeOrder-userLocation').attr('lat',selectedUser.lat).attr('lng',selectedUser.lng);
    window.placeOrder.userLat = selectedUser.lat;
    window.placeOrder.userLng = selectedUser.lng;
    if(window.placeOrder.userLat != 0 && window.placeOrder.userLng != 0){
        $('#placeOrder-addLocation').text(texts.orders.removeLocation);
        $('#placeOrder-userLocationContainer').removeClass('h0 ofH')
    }
    if($('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType') == 'delivery'){
        setPlaceOrderUserLocation();
    }

})
$('#placeOrder-usersListInput').on('change input',function(){
    $('#placeOrder-userPhoneNumber').val('')
    $('#placeOrder-userAddress').val('')
})
/////////
