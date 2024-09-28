placeOrder_set = function(action){
    if(action == 'type'){
        $('.placeOrderTypeElemCheck').removeClass('ico-check1').addClass('ico-check0')
        $(`.placeOrderTypeElem[type="${window.placeOrder.type}"]`).find('.placeOrderTypeElemCheck').removeClass('ico-check0').addClass('ico-check1');
        if(window.placeOrder.type == '0'){
            $('.placeOrderPaymentMethodsContainer').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_on_delivery"]').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="card_on_delivery"]').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_at_restaurant"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_at_restaurant"]').addClass('none')
            $('.placeOrder-address_container').removeClass('none')
        }else if(window.placeOrder.type == '1'){
            $('.placeOrderPaymentMethodsContainer').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_at_restaurant"]').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="card_at_restaurant"]').removeClass('none')
            $('.placeOrder-address_container').addClass('none')
        }else if(window.placeOrder.type == '2'){
            $('.placeOrderPaymentMethodsContainer').addClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_at_restaurant"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_at_restaurant"]').addClass('none')
            $('.placeOrder-address_container').addClass('none')
        }
        window.placeOrder.paymentMethod = null
        $('.placeOrderPaymentMethodElemCheck').addClass('ico-check0').removeClass('ico-check1')
    }else if(action == 'place_for'){
        window.placeOrder.user_id = null;
        window.placeOrder.userName = null;
        $('#placeOrder-usersInputList').val('').attr('key',null);
        window.placeOrder.lat = null;
        window.placeOrder.lng = null;
        $('#placeOrder-userLocation')[0]._map.removeLayer($('#placeOrder-userLocation')[0]._marker)
        $('#placeOrder-userLocation')[0]._map.flyTo([0,0], 2, {animate: false,duration: 1});
        window.placeOrder.address = null
        $('#placeOrder-address').val('')
        $('#placeOrder-select_address').closest('.inputListContainer').addClass('none')
        $('#placeOrder-select_address_list').text('')
        window.placeOrder.phoneNumber = null;
        $('#placeOrder-phoneNumber').val('')
        if(window.placeOrder.isGuest == true){
            $('#placeOrder-usersInputList').closest('.inputListContainer').addClass('none')
            $('.placeOrderForElem[type="user"]').find('.placeOrderForElemCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.placeOrderForElem[type="guest"]').find('.placeOrderForElemCheck').addClass('ico-check1').removeClass('ico-check0')
        }else if(window.placeOrder.isGuest == false){
            $('#placeOrder-usersInputList').closest('.inputListContainer').removeClass('none')
            $('.placeOrderForElem[type="guest"]').find('.placeOrderForElemCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.placeOrderForElem[type="user"]').find('.placeOrderForElemCheck').addClass('ico-check1').removeClass('ico-check0')
            placeOrder_set('user');
        }
    }else if(action == 'user'){
        $('#placeOrder-usersInputList').val('').attr('key',null);
        $('#placeOrder-userLocation')[0]._map.removeLayer($('#placeOrder-userLocation')[0]._marker)
        $('#placeOrder-userLocation')[0]._map.flyTo([0,0], 2, {animate: false,duration: 1});
        $('#placeOrder-phoneNumber').val('');
        $('#placeOrder-address').val('');
        $('#placeOrder-select_address').val('').attr('key','');
        $('#placeOrder-select_address_list').text('')
        $('#placeOrder-select_address').closest('.inputListContainer').addClass('none') 
        if(window.placeOrder.user_id !== null){
            getUsersData([window.placeOrder.user_id]).then(function(){
                let user = website.users.find(item=>item.id == window.placeOrder.user_id);
                if(user){
                    window.placeOrder.userName = user.name;
                    window.placeOrder.phoneNumber = user.phoneNumber;
                    $('#placeOrder-usersInputList').val(window.placeOrder.userName).attr('key',window.placeOrder.user_id);
                    $('#placeOrder-phoneNumber').val(window.placeOrder.phoneNumber);
                    if(user.addresses.length > 0){
                        $('#placeOrder-select_address').closest('.inputListContainer').removeClass('none')
                        for(const key in user.addresses){
                            let address = user.addresses[key];
                            addToInputList($('#placeOrder-select_address_list'),`<span class="ellipsis">${address.address}</span>`,key,'')
                            if(address.is_default == '1'){
                                $('#placeOrder-address').val(address.address);
                                if(address.lat !== null && address.lng !== null){
                                    window.placeOrder.lat = parseFloat(address.lat);
                                    window.placeOrder.lng = parseFloat(address.lng);
                                    $('#placeOrder-userLocation')[0]._marker.setLatLng({lat:window.placeOrder.lat,lng:window.placeOrder.lng});
                                    $('#placeOrder-userLocation')[0]._map.addLayer($('#placeOrder-userLocation')[0]._marker)
                                    $('#placeOrder-userLocation')[0]._map.flyTo([window.placeOrder.lat,window.placeOrder.lng], 15, {animate: true,duration: 1});
                                }
                            }
                        }
                    }
                }
            })
        }
    }else if(action == 'address'){
        $('#placeOrder-userLocation')[0]._map.removeLayer($('#placeOrder-userLocation')[0]._marker)
        $('#placeOrder-userLocation')[0]._map.flyTo([0,0], 2, {animate: false,duration: 1});
        $('#placeOrder-select_address').val('').attr('key','');
        $('#placeOrder-address').val(window.placeOrder.address);
        if(window.placeOrder.lat !== null && window.placeOrder.lng !== null){
            $('#placeOrder-userLocation')[0]._marker.setLatLng({lat:window.placeOrder.lat,lng:window.placeOrder.lng});
            $('#placeOrder-userLocation')[0]._map.addLayer($('#placeOrder-userLocation')[0]._marker)
            $('#placeOrder-userLocation')[0]._map.flyTo([window.placeOrder.lat,window.placeOrder.lng], 15, {animate: true,duration: 1});
        }
    }
    drawPlaceOrderCheck();
    drawPlaceOrderItems();
}