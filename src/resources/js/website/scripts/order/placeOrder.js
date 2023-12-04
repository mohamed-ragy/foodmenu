window.window.userLocationMap2;
window.userLocationMap2 = L.map('placeOrder-location').setView([0,0],2);
// setInterval(function () {
        // window.userLocationMap2.invalidateSize();
    // }, 100);
const userLocationMapIcon = L.icon({
    iconUrl: '/storage/imgs/marker-icon.png',
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
        ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
}).addTo(window.userLocationMap2);
window.window.userLocationMapMarker2 = L.marker([0,0],{icon: userLocationMapIcon}).addTo(window.userLocationMap2);
window.userLocationMap2.on('click',function(e){
    window.userLocationMapMarker2.setLatLng(e.latlng);
    window.userLocationMap2.addLayer(window.userLocationMapMarker2)
});

$('#placeOrder-mylocation').on('click',function(){
    navigator.geolocation.getCurrentPosition(function(pos){
        window.userLocationMap2.flyTo([pos.coords.latitude,pos.coords.longitude], 15, {
            animate: true,
            duration: 1
        });
        window.userLocationMapMarker2.setLatLng([pos.coords.latitude,pos.coords.longitude]);
    });
    window.userLocationMap2.addLayer(window.userLocationMapMarker2)
})
$('#placeOrder-unsetLocation').on('click',function(){
    window.userLocationMap2.flyTo([0,0], 2, {
        animate: true,
        duration: 1
    });
    window.userLocationMapMarker2.setLatLng([0,0]);
    window.userLocationMap2.removeLayer(window.userLocationMapMarker2)
})

window.userLocationMapMarker2.setLatLng([0,0]);
window.userLocationMap2.removeLayer(window.userLocationMapMarker2)


placeOrderValidation = function(){
    let validate = true;
    let scrollTo = null;
    $('.placeOrderInput').removeClass('inputError');
    $('.placeOrderFail').text('a').addClass('vH');
    $('#paymentMethodContainer').removeClass('paymentMethodContainerError')
    $('#placeOrderReceiptContainerContainer').removeClass('placeOrderReceiptContainerContainerError')

    if($('#placeOrder-phoneNumber').val() == ''){
        validate = false;
        scrollTo = $('#placeOrderContactInfoContainer');
        $('#placeOrder-phoneNumber').addClass('inputError');
        $('#placeOrderFailPhoneNumber').text(texts.orders.phoneNumberValidation)
        $('#placeOrderFailPhoneNumber').removeClass('vH')
    }
    if($('#placeOrder-address').val() == '' && $('.placeOrder-orderType[orderType="delivery"]').hasClass('placeOrder-orderTypeSelected')){
        validate = false;
        scrollTo = $('#placeOrderContactInfoContainer');
        $('#placeOrder-address').addClass('inputError');
        $('#placeOrderFailAddress').text(texts.orders.addressValidation)
        $('#placeOrderFailAddress').removeClass('vH')
    }

    if($('.placeOrder-orderType[orderType="delivery"]').hasClass('placeOrder-orderTypeSelected')){
        if(website.cash_on_delivery || website.card_on_delivery){
            let paymentMethodCheck = false;
            $('.paymentMethod').each(function(){
                if($(this).hasClass('paymentMethodSelected')){
                    paymentMethodCheck = true;
                }
            });
            if(paymentMethodCheck == false){
                validate = false;
                $('#paymentMethodContainer').addClass('paymentMethodContainerError')
                if(website.cash_on_delivery && website.card_on_delivery){
                    $('#placeOrderFailPaymentMethod').text(texts.orders.paymentMethodValidation);

                }else{
                    $('#placeOrderFailPaymentMethod').text(texts.orders.paymentMethodMissing);
                }
                $('#placeOrderFailPaymentMethod').removeClass('vH')
                if(scrollTo == null){
                    scrollTo = $('#paymentMethodContainer');
                }
            }
        }
    }
    if($('.placeOrder-orderType[orderType="pickup"]').hasClass('placeOrder-orderTypeSelected')){
        if(website.cash_at_restaurant || website.card_at_restaurant){
            let paymentMethodCheck = false;
            $('.paymentMethod').each(function(){
                if($(this).hasClass('paymentMethodSelected')){
                    paymentMethodCheck = true;
                }
            });
            if(paymentMethodCheck == false){
                validate = false;
                $('#paymentMethodContainer').addClass('paymentMethodContainerError')
                if(website.cash_at_restaurant && website.card_at_restaurant){
                    $('#placeOrderFailPaymentMethod').text(texts.orders.paymentMethodValidation);

                }else{
                    $('#placeOrderFailPaymentMethod').text(texts.orders.paymentMethodMissing);
                }
                $('#placeOrderFailPaymentMethod').removeClass('vH')
                if(scrollTo == null){
                    scrollTo = $('#paymentMethodContainer');
                }
            }
        }
    }
    let orderReceipt = calcOrderReceipt();
    if(orderReceipt.minCharge == 'items'){
        validate = false;
        scrollTo = $('#placeOrderReceiptContainerContainer');
        $('#placeOrderReceiptContainerContainer').addClass('placeOrderReceiptContainerContainerError')
        $('#placeOrderFailReceipt').removeClass('vH').text(texts.orders.subtotalMinimumCharge+' '+texts.orders.orderMinimumCharge+' '+website.currency+orderReceipt.minChargeAmount+'.')
    }else if(orderReceipt.minCharge == 'total'){
        validate = false;
        scrollTo = $('#placeOrderReceiptContainerContainer');
        $('#placeOrderReceiptContainerContainer').addClass('placeOrderReceiptContainerContainerError')
        $('#placeOrderFailReceipt').removeClass('vH').text(texts.orders.totalMinimumCharge+' '+texts.orders.orderMinimumCharge+' '+website.currency+orderReceipt.minChargeAmount+'.')
    }else{
        $('#placeOrderReceiptContainerContainer').removeClass('placeOrderReceiptContainerContainerError')
        $('#placeOrderFailReceipt').addClass('vH').text('a')
    }

    if(scrollTo != null){
        $('#placeOrder-popup').animate({
            'scrollTop':scrollTo.offset().top - 25 - $('#placeOrder-popup').offset().top + $('#placeOrder-popup').scrollTop(),
        },500)
    }
    return validate;
}
placeOrderPopupReset = function(){
    placeOrderPopupResetElem();
    $('#placeOrder-phoneNumber').removeClass('inputError')
    $('#placeOrder-address').removeClass('inputError')
    $('.placeOrderFail').addClass('vH')
    $('#paymentMethodContainer').removeClass('paymentMethodContainerError')
    $('.placeOrder-orderType').removeClass('placeOrder-orderTypeSelected');
    $('#placeOrderReceiptContainerContainer').removeClass('placeOrderReceiptContainerContainerError')
    $('#placeOrder-orderNotice').val('')
    $('.paymentMethod').removeClass('paymentMethodSelected');
    $('.paymentMethod').find('.ic-check1').removeClass('ic-check1').addClass('ic-check0');
    hideLoading($('#promocode-Loading'));
    $('#promocodeCode').prop('readonly',false)
    $('#promocodeCode').val('')
    $('#promocodeApplyBtn').prop('disabled',false);
    $('#placeOrderFailPromocode').addClass('vH').text('a');
    window.promocode = null;
    $('.promocodeForm').addClass('none');
    $('.havePromocode').removeClass('none');
    $('#promocodeCode').removeClass('none')
    $('#promocodeApplyBtn').removeClass('none')
    $('.promocodeApplied').addClass('none')
    if(loginCheck){
        $('#placeOrder-phoneNumber').val(user.phoneNumber);
        $('#placeOrder-address').val(user.address)
        if(user.lat != 0 || user.lng != 0){
            window.userLocationMap2.addLayer(window.userLocationMapMarker2)
            window.userLocationMapMarker2.setLatLng([user.lat,user.lng,15]);
            window.userLocationMap2.flyTo([user.lat,user.lng], 15, {
                animate: false,
                duration: 1
            });
        }else{
            window.userLocationMapMarker2.setLatLng([0,0]);
            window.userLocationMap2.removeLayer(window.userLocationMapMarker2)
        }

    }else{
        $('#placeOrder-phoneNumber').val('')
        $('#placeOrder-address').val('')
        window.userLocationMapMarker2.setLatLng([0,0]);
        window.userLocationMap2.removeLayer(window.userLocationMapMarker2)
    }
    if(!website.useDelivery && website.usePickup){
        $('.placeOrder-orderType[orderType="delivery"]').addClass('none');
        $('.placeOrder-orderType[orderType="pickup"]').removeClass('none');
    }
    if(!website.usePickup && website.useDelivery){
        $('.placeOrder-orderType[orderType="pickup"]').addClass('none');
        $('.placeOrder-orderType[orderType="delivery"]').removeClass('none');
    }
    if(!website.useDelivery && !website.usePickup){
        noOnlineOrdering();
    }else{
        $('.placeOrder-orderType[orderType="pickup"]').removeClass('none');
        $('.placeOrder-orderType[orderType="delivery"]').removeClass('none');
    }
}
checkPromocode = function(promocode){
    let orderType = null;
    if($('.placeOrder-orderType[orderType="delivery"]').hasClass('placeOrder-orderTypeSelected')){orderType = 'delivery'}
    else if($('.placeOrder-orderType[orderType="pickup"]').hasClass('placeOrder-orderTypeSelected')){orderType = 'pickup'}
    if(orderType == 'delivery' && !promocode.is_delivery){
        $('#placeOrderFailPromocode').removeClass('vH').text(texts.orders.promocodeNoDelivery);
        return;
    }
    if(orderType == 'pickup' && !promocode.is_pickup){
        $('#placeOrderFailPromocode').removeClass('vH').text(texts.orders.promocodeNoPickup);
        return;
    }
    if(orderType == null){return;}
    if(parseFloat(calcOrderReceipt().total) < parseFloat(promocode.minimum) && parseFloat(promocode.minimum) > 0){
        $('#placeOrderFailPromocode').removeClass('vH').text(texts.orders.promocodeOrderTotalLimit+' '+website.currency+promocode.minimum+'.');
        return;
    }
    window.promocode = promocode;
    $('#promocodeCode').addClass('none')
    $('#promocodeApplyBtn').addClass('none')
    drawPromocodeApplied();
    $('.promocodeApplied').removeClass('none')
    drawPlaceOrderReceipt();
}
$('html, body').on('click','.placeOrder-orderType',function(e){
    e.stopImmediatePropagation();
    placeOrderPopupReset();
    $('.placeOrder-orderType').removeClass('placeOrder-orderTypeSelected');
    $(this).addClass('placeOrder-orderTypeSelected');
    if($(this).attr('orderType') == 'delivery' ){
        if(!website.cash_on_delivery && !website.card_on_delivery){
            $('#paymentMethodContainer').addClass('none')
        }else{
            $('#paymentMethodContainer').removeClass('none')
            if(!website.cash_on_delivery){
                $('.paymentMethod[paymentMethod="cash_on_delivery"]').addClass('none')
            }else{$('.paymentMethod[paymentMethod="cash_on_delivery"]').removeClass('none')}
            if(!website.card_on_delivery){
                $('.paymentMethod[paymentMethod="card_on_delivery"]').addClass('none')
            }else{$('.paymentMethod[paymentMethod="card_on_delivery"]').removeClass('none')}
        }
        $('.deliveryElem').removeClass('none')
        $('.pickupElem').addClass('none')
        if(checkOrderTimesAvailability(website.workingDays_delivery)){
            placeOrderPopupShowDelivery();
        }else{
            if(website.acceptDeliveryOrders24){
                placeOrderPopupShowDelivery();
                $('.placeOrderWarningContainer').removeClass('none');
                $('#placeOrderWarning').text(texts.orders.deliveryOutOfWorkingTimesCanOrder+' '+checkNextWorkingTime(website.workingDays_delivery))
            }else{
                placeOrderPopupShowDeliveryUnavailable();
                $('.placeOrderWarningContainer').removeClass('none');
                $('#placeOrderWarning').text(texts.orders.deliveryOutOfWorkingTimesCantOrder+' '+checkNextWorkingTime(website.workingDays_delivery))
            }
        }
        window.userLocationMap2.invalidateSize();
    }else if($(this).attr('orderType') == 'pickup' ){
        if(!website.cash_at_restaurant && !website.card_at_restaurant){
            $('#paymentMethodContainer').addClass('none')
        }else{
            $('#paymentMethodContainer').removeClass('none')
            if(!website.cash_at_restaurant){
                $('.paymentMethod[paymentMethod="cash_at_restaurant"]').addClass('none')
            }else{$('.paymentMethod[paymentMethod="cash_at_restaurant"]').removeClass('none')}
            if(!website.card_at_restaurant){
                $('.paymentMethod[paymentMethod="card_at_restaurant"]').addClass('none')
            }else{$('.paymentMethod[paymentMethod="card_at_restaurant"]').removeClass('none')}
        }
        $('.pickupElem').removeClass('none')
        $('.deliveryElem').addClass('none')
        if(checkOrderTimesAvailability(website.workingDays_pickup)){
            placeOrderPopupShowPickup();
        }else{
            if(website.acceptPickupOrders24){
                placeOrderPopupShowPickup();
                $('.placeOrderWarningContainer').removeClass('none');
                $('#placeOrderWarning').text(texts.orders.pickupOutOfWorkingTimesCanOrder+' '+checkNextWorkingTime(website.workingDays_pickup))
            }else{
                placeOrderPopupShowPickupUnavailable();
                $('.placeOrderWarningContainer').removeClass('none');
                $('#placeOrderWarning').text(texts.orders.pickupOutOfWorkingTimesCantOrder+' '+checkNextWorkingTime(website.workingDays_pickup))
            }
        }
    }
    drawPlaceOrderReceipt();
})
$('#placeOrder-phoneNumber').on('input change',function(){
    $('#placeOrder-phoneNumber').val($('#placeOrder-phoneNumber').val().replace( /[^\d+() -]/, '' ));
});
$('html, body').on('click','.paymentMethod',function(e){
    e.stopImmediatePropagation();
    $('.paymentMethod').find('.ic-check1').removeClass('ic-check1').addClass('ic-check0');
    $(this).find('.ic-check0').removeClass('ic-check0').addClass('ic-check1');
    $('.paymentMethod').removeClass('paymentMethodSelected');
    $(this).addClass('paymentMethodSelected')
})
$('#PlaceOrder-Btn').on('click',function(){
    placeOrderValidation();
    if(!placeOrderValidation()){return;}else{
        showLoading($('#placeOrder-Loading'))
        let paymentMethod = null;
        let orderType;
        let lat;
        let lng;
        if($('.placeOrder-orderType[orderType="delivery"]').hasClass('placeOrder-orderTypeSelected')){
            orderType = 0;
            lat = userLocationMapMarker2.getLatLng().lat;
            lng = userLocationMapMarker2.getLatLng().lng;
        }
        else if($('.placeOrder-orderType[orderType="pickup"]').hasClass('placeOrder-orderTypeSelected')){
            orderType = 1;
            lat = 0;
            lng = 0;
        }
        $('.paymentMethod').each(function(){
            if($(this).find('.paymentMethodIcoCheck').hasClass('ic-check1')){
                paymentMethod = $(this).attr('paymentMethod');
            }
        })
        let placeOrderPromocode = null;
        if(window.promocode != null){
            placeOrderPromocode = window.promocode.code;
        }
        $.ajax({
            url:'/website/order',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                placeOrder:true,
                orderItems:window.cart,
                orderType:orderType,
                phoneNumber:$('#placeOrder-phoneNumber').val(),
                address:$('#placeOrder-address').val(),
                orderNotice:$('#placeOrder-orderNotice').val(),
                paymentMethod:paymentMethod,
                lat:lat,
                lng:lng,
                promocode:placeOrderPromocode,
            },success:function(response){
                hideLoading($('#placeOrder-Loading'))
                if(response.placeOrderStat == 1){
                    // add this order to the order history
                    let orderTimes = null;
                    let AvgTimeTxt;
                    if(response.order.type == 0){
                        orderTimes = checkOrderTimesAvailability(website.workingDays_delivery);
                        AvgTimeTxt = texts.orders.deliveryOrderPlaced+' '+getAvgTimeTxt(website.averageDeliveryTime)
                    }else if(response.order.type == 1){
                        orderTimes = checkOrderTimesAvailability(website.workingDays_pickup);
                        AvgTimeTxt = texts.orders.pickupOrderPlaced+' '+getAvgTimeTxt(website.averagePickupTime)
                    }
                    if(orderTimes == true){
                        placeOrderPopupSuccess(AvgTimeTxt);
                    }else{
                        placeOrderPopupSuccess(texts.orders.orderPlacedSuccessfully);
                    }
                    window.orders[response.order.id] = response.order;
                    if(window.orderhistoryFirstLoad){
                        drawOrderHistoryCard(response.order,'prepend')
                    }
                    $('#placeOrder-trackOrderBtn').attr('orderId',response.order.id);
                    window.cart = {};
                    window.promocode = null;
                    setCart();
                }else if(response.placeOrderStat == 0){
                    placeOrderPopupFail();
                }
            }
        })
    }
})
$('.havePromocode').on('click',function(){
    $('.promocodeForm').removeClass('none');
    $('.havePromocode').addClass('none');
    $('#promocodeCode').focus();
})
$('html,body').on('click','.removePromocode',function(){
    window.promocode = null;
    drawPlaceOrderReceipt();
    $('.promocodeForm').addClass('none');
    $('.havePromocode').removeClass('none');
    $('#promocodeCode').removeClass('none')
    $('#promocodeApplyBtn').removeClass('none')
    $('.promocodeApplied').addClass('none')
})
$('#promocodeCode').on('keypress',function(e){
    if(e.which == 13){
        $('#promocodeApplyBtn').trigger('click');
    }
})
$('#promocodeApplyBtn').on('click',function(){
    if($('#promocodeCode').val() == '' || $('#promocodeCode').val() == null){
        $('#placeOrderFailPromocode').text(texts.orders.promocodeRequired).removeClass('vH');

        return;
    }
    showLoading($('#promocode-Loading'));
    $('#promocodeCode').prop('readonly',true)
    $('#promocodeApplyBtn').prop('disabled',true);
    $('#placeOrderFailPromocode').addClass('vH').text('');
    $.ajax({
        url:'/website/order',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            promocodeCheck:$('#promocodeCode').val(),
        },success:function(response){
            hideLoading($('#promocode-Loading'));
            $('#promocodeCode').prop('readonly',false);
            $('#promocodeApplyBtn').prop('disabled',false);
            if(response.promocodeCheck == 0){
                $('#placeOrderFailPromocode').removeClass('vH').text(texts.orders.promocodeNotExist);
            }else if(response.promocodeCheck == 1){
                checkPromocode(response.promocode);
            }else if(response.promocodeCheck == 2){
                $('#placeOrderFailPromocode').removeClass('vH').text(texts.orders.promocodeGuest);
            }else if(response.promocodeCheck == 3){
                $('#placeOrderFailPromocode').removeClass('vH').text(texts.orders.promocodeExpired);
            }else if(response.promocodeCheck == 4){
                $('#placeOrderFailPromocode').removeClass('vH').text(texts.orders.promocodeUsed);
            }
        }
    })
})
