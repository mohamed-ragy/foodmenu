require('./placeOrder/details.js')//done
require('./placeOrder/items.js')//done
require('./placeOrder/check.js')//done
let placeOrderUserLocationMap_isDrawn = false;
let placeOrderMap;
let placeOrderMapMarker;
setPlaceOrderUserLocation = function(){
    if(!placeOrderUserLocationMap_isDrawn){
        placeOrderMap = L.map('placeOrder-userLocation').setView([0,0],2);

        const placeOrderMapIcon = L.icon({
            iconUrl: '/storage/imgs/marker-icon.png',
            iconSize:     [25, 41], // size of the icon
            iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
                ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
        }).addTo(placeOrderMap);
        placeOrderMapMarker = L.marker([0,0],{icon: placeOrderMapIcon}).addTo(placeOrderMap);
        /////////
        placeOrderMap.on('click',function(e){
            console.log(e)
            placeOrderMapMarker.setLatLng(e.latlng);
            placeOrderMap.addLayer(placeOrderMapMarker)
            window.placeOrder.userLat = e.latlng.lat;
            window.placeOrder.userLng = e.latlng.lng;

        });
        // $('#placeOrder-unsetLocation').on('click',function(){
        //     placeOrderMapMarker.setLatLng([0,0]);
        //     placeOrderMap.flyTo([0,0], 1, {
        //         animate: false,
        //         duration: 1
        //     });
        //     placeOrderMap.removeLayer(placeOrderMapMarker)
        //     window.placeOrder.userLat = 0;
        //     window.placeOrder.userLng = 0;
        // });
        placeOrderUserLocationMap_isDrawn = true;


    }
    // if($('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType') == 'delivery'){
        if(window.placeOrder.userLat == 0 && window.placeOrder.userLng == 0){
            placeOrderMapMarker.setLatLng([0,0]);
            placeOrderMap.removeLayer(placeOrderMapMarker)
            placeOrderMap.flyTo([0,0], 1, {
                animate: false,
                duration: 1
            });

        }else{
            placeOrderMapMarker.setLatLng([window.placeOrder.userLat ,window.placeOrder.userLng ]).addTo(placeOrderMap);
            setTimeout(function(){
                placeOrderMap.flyTo([window.placeOrder.userLat ,window.placeOrder.userLng ], 15, {
                    animate: true,
                    duration: 1
                });
            },100)
        }
    // }
}
getDiscount = function(times){
    let hour = getDateAndTime('now','hour24');
    let minute = getDateAndTime('now','minutes');

    if(hour == 24){hour = '00';}
    switch( getDateAndTime('now','weekday').toLowerCase()){
        case 'monday':yesterday = 'sunday';dayOfWeek = 'monday';break;
        case 'tuesday':yesterday = 'monday';dayOfWeek = 'tuesday';break;
        case 'wednesday':yesterday = 'tuesday';dayOfWeek = 'wednesday';break;
        case 'thursday':yesterday = 'wednesday';dayOfWeek = 'thursday';break;
        case 'friday':yesterday = 'thursday';dayOfWeek = 'friday';break;
        case 'saturday':yesterday = 'friday';dayOfWeek = 'saturday';break;
        case 'sunday':yesterday = 'saturday';dayOfWeek = 'sunday';break;
    }

    todayDiscount = times[dayOfWeek].discount;
    todayFrom = parseFloat(times[dayOfWeek].Dfrom);
    todayTo = parseFloat(times[dayOfWeek].Dto);
    yesterdayDiscount = times[yesterday].discount;
    yesterdayFrom = parseFloat(times[yesterday].Dfrom);
    yesterdayTo = parseFloat(times[yesterday].Dto);

    if(minute < 10){minute = '0'+minute;}
    timeNow = parseFloat(hour+'.'+minute);

    if(parseInt(todayDiscount) > 0 && todayFrom < todayTo){
        if( timeNow >= todayFrom && timeNow <= todayTo){
            return todayDiscount;
        }
    }else if(parseInt(todayDiscount) > 0 && todayFrom > todayTo){
        if(timeNow >= todayFrom){
            return todayDiscount;
        }
    }

    if(parseInt(yesterdayDiscount) > 0 && yesterdayFrom > yesterdayTo){
        if(timeNow <= yesterdayTo){
            return yesterdayDiscount;
        }
    }
    return 0;
}
placeNewOrderReset = function(){
    $('#placeOrder-orderDetails').removeClass('h0 ofH')
    $('#placeOrder-orderItems').addClass('h0 ofH')
    $('.placeOrderTab-d').addClass('placeOrderTab_selected')
    $('.placeOrderTab-i').removeClass('placeOrderTab_selected')
    $('.placeOrderTypeCheck').removeClass('ico-check1').addClass('ico-check0');
    $('.placeOrderTypeCard[orderType="dineIn"]').find('.placeOrderTypeCheck').removeClass('ico-check0').addClass('ico-check1');
    $('.placeOrderPaymentMethodCheck').removeClass('ico-check1').addClass('ico-check0');
    $('.placeOrderPlaceForCheck').removeClass('ico-check1').addClass('ico-check0')
    $('.placeOrderPlaceForCard[visitor="guest"]').find('.placeOrderPlaceForCheck').removeClass('ico-check0').addClass('ico-check1');
    $('#placeOrder-userLocationContainer').addClass('h0 ofH')
    $('#placeOrder-addLocation').text(texts.orders.addLocation);
    $('#placeOrder-notice').val('').trigger('input');
    window.placeOrder = {
        items:[],
        deliveryCost:parseFloat(website.deliveryCost),
        discount:getDiscount(website.workingDays_dinein),
        userLat:0,
        userLng:0,
    }
    placeOrderChangeType();
    placeOrderChangePlaceFor();
    drawPlaceOrderItems();
}
// placeNewOrderReset();


placeNewOrderValidation = function(){


    ////
    if($('.placeOrderPlaceForCard[visitor="user"]').find('.placeOrderPlaceForCheck').hasClass('ico-check1')){
        if($('#placeOrder-usersListInput').attr('key') == null || $('#placeOrder-usersListInput').attr('key') == ''){
            showAlert('error',texts.orders.placeOrderErrorSelectUser,4000,true);
            $('.placeOrderTab-d').trigger('click');
            inputListError($('#placeOrder-usersListInput'))
            return false;
        }
    }
    switch($('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType')){
        case 'delivery':
            if($('#placeOrder-userPhoneNumber').val() == '' || $('#placeOrder-userPhoneNumber').val() == null){
                showAlert('error',texts.orders.placeOrderErrorPhoneNumberRequired,4000,true)
                $('.placeOrderTab-d').trigger('click');
                inputTextError($('#placeOrder-userPhoneNumber'))
                return false;
            }
            if($('#placeOrder-userAddress').val() == '' || $('#placeOrder-userAddress').val() == null){
                showAlert('error',texts.orders.placeOrderErrorAddressRequired,4000,true)
                $('.placeOrderTab-d').trigger('click');
                inputTextError($('#placeOrder-userAddress'))
                return false;
            }
            break;
        case 'pickup':
            if($('#placeOrder-userPhoneNumber').val() == '' || $('#placeOrder-userPhoneNumber').val() == null){
                showAlert('error',texts.orders.placeOrderErrorPhoneNumberRequired,4000,true)
                $('.placeOrderTab-d').trigger('click');
                inputTextError($('#placeOrder-userPhoneNumber'))
                return false;
            }
            break;
        case 'dineIn':
            if($('#placeOrder-userPhoneNumber').val() == '' || $('#placeOrder-userPhoneNumber').val() == null){
                showAlert('error',texts.orders.placeOrderErrorPhoneNumberRequired,4000,true)
                $('.placeOrderTab-d').trigger('click');
                inputTextError($('#placeOrder-userPhoneNumber'))
                return false;
            }
            break;
    }
    ///////
    if(window.placeOrder.items.length == 0){
        showAlert('error',texts.orders.placeOrderErrorNoItems,4000,true)
        return false;
    }
    return true;
}
$('.placeOrderTab').on('click',function(e){
    e.stopImmediatePropagation();
    $('.placeOrderTab').removeClass('placeOrderTab_selected');
    $(this).addClass('placeOrderTab_selected');
    if($(this).hasClass('placeOrderTab-d')){
        $('#placeOrder-orderDetails').removeClass('h0 ofH')
        $('#placeOrder-orderItems').addClass('h0 ofH')
    }else if($(this).hasClass('placeOrderTab-i')){
        $('#placeOrder-orderDetails').addClass('h0 ofH')
        $('#placeOrder-orderItems').removeClass('h0 ofH')
    }
})
$('#placeOrder-addLocation').on('click',function(){
    if($('#placeOrder-userLocationContainer').hasClass('h0 ofH')){
        $('#placeOrder-addLocation').text(texts.orders.removeLocation);
        $('#placeOrder-userLocationContainer').removeClass('h0 ofH')
    }else{
        $('#placeOrder-addLocation').text(texts.orders.addLocation);
        $('#placeOrder-userLocationContainer').addClass('h0 ofH')
        window.placeOrder.userLat = 0;
        window.placeOrder.userLng = 0;
        setPlaceOrderUserLocation();
    }
    placeOrderMap.invalidateSize();
})
///////

$('#placeOrder-cancelBtn').on('click',function(){
    popupPageClose();
    placeNewOrderReset();
})

////////

$('html,body').on('click','#placeOrder-applyScheduledDiscount',function(){
    closePopup();
    let orderType = $('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType');
    switch(orderType){
        case 'dineIn':
            if(getDiscount(website.workingDays_dinein) > 0){
                window.placeOrder.discount = getDiscount(website.workingDays_dinein);
                drawPlaceOrderCheck();
            }
            break;
        case 'delivery':
            if(getDiscount(website.workingDays_delivery) > 0){
                window.placeOrder.discount = getDiscount(website.workingDays_delivery);
                drawPlaceOrderCheck();
            }
            break;
        case 'pickup':
            if(getDiscount(website.workingDays_pickup) > 0){
                window.placeOrder.discount = getDiscount(website.workingDays_pickup);
                drawPlaceOrderCheck();
            }
            break;
    }
})
$('#placeOrder-placeBtn').on('click',function(){
    if(!placeNewOrderValidation()){return;}

    if(!$('#placeOrder-placeBtn').hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm);
        updateToolTip();
        let orderType = $('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType');
        switch(orderType){
            case 'dineIn':
                if(getDiscount(website.workingDays_dinein) > 0 && getDiscount(website.workingDays_dinein) != $('#placeOrder-discount').val()){
                    $('#scheduledDiscountAlert-popup').find('.popupBody').text('').append(
                        $('<div/>',{
                            class:'fs102'
                        }).append(
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert1}),
                            $('<span/>',{text:getDiscount(website.workingDays_dinein)+'%',class:'mX3'}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert2,class:'mie-3'}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert_dineIn}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert3}),
                        ),
                        $('<div/>',{class:'btnContainer'}).append(
                            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.no}),
                            $('<button/>',{class:'btn',text:texts.cpanel.public.yes,id:'placeOrder-applyScheduledDiscount'})
                        )
                    )
                    showPopup($('#scheduledDiscountAlert-popup'))
                }
                break;
            case 'delivery':
                if(getDiscount(website.workingDays_delivery) > 0 && getDiscount(website.workingDays_delivery) != $('#placeOrder-discount').val()){
                    $('#scheduledDiscountAlert-popup').find('.popupBody').text('').append(
                        $('<div/>',{
                            class:'fs102'
                        }).append(
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert1}),
                            $('<span/>',{text:getDiscount(website.workingDays_delivery)+'%',class:'mX3'}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert2,class:'mie-3'}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert_delivery}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert3}),
                        ),
                        $('<div/>',{class:'btnContainer'}).append(
                            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.no}),
                            $('<button/>',{class:'btn',text:texts.cpanel.public.yes,id:'placeOrder-applyScheduledDiscount'})
                        )
                    )
                    showPopup($('#scheduledDiscountAlert-popup'))
                }
                break;
            case 'pickup':
                if(getDiscount(website.workingDays_pickup) > 0 && getDiscount(website.workingDays_pickup) != $('#placeOrder-discount').val()){
                    $('#scheduledDiscountAlert-popup').find('.popupBody').text('').append(
                        $('<div/>',{
                            class:'fs102'
                        }).append(
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert1}),
                            $('<span/>',{text:getDiscount(website.workingDays_pickup)+'%',class:'mX3'}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert2,class:'mie-3'}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert_pickup}),
                            $('<span/>',{text:texts.orders.scheduledDiscountAlert3}),
                        ),
                        $('<div/>',{class:'btnContainer'}).append(
                            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.no}),
                            $('<button/>',{class:'btn',text:texts.cpanel.public.yes,id:'placeOrder-applyScheduledDiscount'})
                        )
                    )
                    showPopup($('#scheduledDiscountAlert-popup'))
                }
                break;
        }
        return;
    }
    $('#placeOrder-placeBtn').removeClass('confirm-btn')
    showBtnLoading($('#placeOrder-placeBtn'))

    let orderType;
    $('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType') == 'delivery' ? orderType = 0 : null;
    $('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType') == 'pickup' ? orderType = 1 : null;
    $('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType') == 'dineIn' ? orderType = 2 : null;
    let orderNotice = $('#placeOrder-notice').val();
    let paymentMethod = null;
    $('.placeOrderPaymentMethodCard[paymentmethod="cashOnDelivery"]').find('.placeOrderPaymentMethodCheck').hasClass('ico-check1') ? paymentMethod = 'cashOnDelivery' : null;
    $('.placeOrderPaymentMethodCard[paymentmethod="cardOnDelivery"]').find('.placeOrderPaymentMethodCheck').hasClass('ico-check1') ? paymentMethod = 'cardOnDelivery' : null;
    $('.placeOrderPaymentMethodCard[paymentmethod="cashOnPickup"]').find('.placeOrderPaymentMethodCheck').hasClass('ico-check1') ? paymentMethod = 'cashOnPickup' : null;
    $('.placeOrderPaymentMethodCard[paymentmethod="cardOnPickup"]').find('.placeOrderPaymentMethodCheck').hasClass('ico-check1') ? paymentMethod = 'cardOnPickup' : null;

    let isGuest; let user_id = null; let userName = null; let phoneNumber; let address; let lat = 0; let lng = 0;
    $('.placeOrderPlaceForCheck.ico-check1').closest('.placeOrderPlaceForCard').attr('visitor') == 'guest' ? isGuest = 1 : isGuest = 0;
    !isGuest ? user_id = $('#placeOrder-usersListInput').attr('key') : null;
    !isGuest ? userName = $('#placeOrder-usersListInput').val() : null;
    phoneNumber = $('#placeOrder-userPhoneNumber').val();
    address = $('#placeOrder-userAddress').val();
    lat = window.placeOrder.userLat;
    lng = window.placeOrder.userLng;
    // return;
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            placeNewOrder:true,
            ////
            isGuest:isGuest,
            user_id:user_id,
            userName:userName,
            phoneNumber:phoneNumber,
            address:address,
            lat:lat,
            lng:lng,
            ////
            orderType:orderType,
            orderNotice:orderNotice,
            paymentMethod:paymentMethod,
            ////
            deliveryCost:window.placeOrder.deliveryCost,
            discount:window.placeOrder.discount,
            orderItems:window.placeOrder.items,
            /////


        },success:function(r){
            hideBtnLoading($('#placeOrder-placeBtn'))
            if(r.placeOrderStat == 1){
                website.incompleteOrders.push(r.order);
                new orders().incompleteOrders();
                placeNewOrderReset();
                popupPageClose();
            }else if(r.placeOrderStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })


})
