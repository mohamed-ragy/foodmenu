$('body').on('click','.placeOrderTypeElem',function(e){
    if($(this).find('.placeOrderTypeElemCheck').hasClass('ico-check1')){return;}
    window.placeOrder.type = $(this).attr('type');
    placeOrder_set('type');
})

$('body').on('click','.placeOrderPaymentMethodElem',function(e){
    $('.placeOrderPaymentMethodElemCheck').addClass('ico-check0').removeClass('ico-check1')
    $(this).find('.placeOrderPaymentMethodElemCheck').addClass('ico-check1').removeClass('ico-check0')
    window.placeOrder.paymentMethod = $(this).attr('method')
})

$('body').on('click','.placeOrderForElem',function(e){
    if($(this).find('.placeOrderForElemCheck').hasClass('ico-check1')){return;}
    let place_for = $(this).attr('type');
    if(place_for == 'user'){
        window.placeOrder.isGuest = false;
    }else if(place_for == 'guest'){
        window.placeOrder.isGuest = true;
    }
    placeOrder_set('place_for');
})
$('body').on('click','#placeOrder-usersInputListList .inputListElement ',function(e){
    let user_id = $(this).attr('key');
    window.placeOrder.user_id = user_id;
    placeOrder_set('user')

})
$('body').on('click','#placeOrder-select_address_list .inputListElement',function(e){
    let user = website.users.find(item=>item.id == window.placeOrder.user_id);
    $('#placeOrder-select_address_list').hide()
    if(user){
        let selected_address = user.addresses[$(this).attr('key')];
        if(selected_address){
            window.placeOrder.address = selected_address.address;
            if(selected_address.lat !== null && selected_address.lng !== null){
                window.placeOrder.lat = selected_address.lat;
                window.placeOrder.lng = selected_address.lng;
            }else{
                window.placeOrder.lat = null;
                window.placeOrder.lng = null;
            }
            placeOrder_set('address')
        }
    }
})
$('body').on('click','.placeOrder-unsetLocation',function(e){
    window.placeOrder.lat = null;
    window.placeOrder.lng = null;
    $('#placeOrder-userLocation')[0]._map.removeLayer($('#placeOrder-userLocation')[0]._marker)
    $('#placeOrder-userLocation')[0]._map.flyTo([0,0], 2, {animate: false,duration: 1});
})
$('body').on('input change','#placeOrder-comment',function(e){
    window.placeOrder.notice = $(this).val()
})
$('body').on('input change','#placeOrder-phoneNumber',function(e){
    window.placeOrder.phoneNumber = $(this).val()
})
$('body').on('input change','#placeOrder-address',function(e){
    window.placeOrder.address = $(this).val()
})
