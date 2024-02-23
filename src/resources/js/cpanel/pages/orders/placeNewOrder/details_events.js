$('html,body').on('click','.placeOrderTypeElem',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.placeOrderTypeElemCheck').hasClass('ico-check1')){return;}
    placeNewOrderChangeType($(this).attr('type'))
})

$('html,body').on('click','.placeOrderPaymentMethodElem',function(e){
    e.stopImmediatePropagation();
    resetPlaceOrder_paymentMethod();
    $(this).find('.placeOrderPaymentMethodElemCheck').addClass('ico-check1').removeClass('ico-check0')
    window.placeOrder.paymentMethod = $(this).attr('method')
})

$('html,body').on('click','.placeOrderForElem',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.placeOrderForElemCheck').hasClass('ico-check1')){return;}
    $('#placeOrder-phoneNumber').val('');
    $('#placeOrder-address').val('');
    $('#placeOrder-usersInputList').val('').attr('key',null);
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
    setPlaceOrderFor($(this).attr('type'))
})

$('html,body').on('click','#placeOrder-usersInputListList .inputListElement ',function(e){
    // e.stopImmediatePropagation();
    let user_id = $(this).attr('key');
    getUsersData([user_id]).then(function(){
        let user = website.users.find(item=>item.id == user_id);
        window.placeOrder.user_id = user.id;
        window.placeOrder.userName = user.name;
        window.placeOrder.phoneNumber = user.phoneNumber;
        window.placeOrder.address = user.address;
        $('#placeOrder-phoneNumber').val(user.phoneNumber);
        if($('.placeOrderTypeElem[type="0"]').find('.placeOrderTypeElemCheck').hasClass('ico-check1')){
            $('#placeOrder-address').val(user.address);
            if(user.lat != 0 || user.lng != 0 ||!$('#placeOrder-userLocation').hasClass('none')){
                drawPlaceOrderMap(user.lat,user.lng)
                window.placeOrder.lat = user.lat;
                window.placeOrder.lng = user.lng;

            }

        }
    })
})

$('html,body').on('click','#placeOrder-locationToggle',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('action') == 'show'){
        $(this).attr('action','hide')
        $(this).text(texts.orders.removeLocation);
        drawPlaceOrderMap(0,0);
    }else if($(this).attr('action') == 'hide'){
        $(this).attr('action','show')
        $(this).text(texts.orders.addLocation);
        window.placeOrderMapMarker.setLatLng([0,0]);
        window.placeOrderMap.removeLayer(window.placeOrderMapMarker)
        window.placeOrderMap.flyTo([0,0], 1, {
            animate: false,
            duration: 1
        });
        $('#placeOrder-userLocation').addClass('none')
        window.placeOrder.lat = '0';
        window.placeOrder.lng = '0';
    }
})

$('html,body').on('input change','#placeOrder-comment',function(e){
    window.placeOrder.notice = $(this).val()
})
$('html,body').on('input change','#placeOrder-phoneNumber',function(e){
    window.placeOrder.phoneNumber = $(this).val()
})
$('html,body').on('input change','#placeOrder-address',function(e){
    window.placeOrder.address = $(this).val()
})
