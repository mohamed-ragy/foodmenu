placeNewOrderChangeType = function(type,reset=true){
    if(reset){
        resetPlaceOrder_details();
    }
    $('.placeOrderTypeElemCheck').removeClass('ico-check1').addClass('ico-check0')
    $(`.placeOrderTypeElem[type="${type}"]`).find('.placeOrderTypeElemCheck').removeClass('ico-check0').addClass('ico-check1')
    window.placeOrder.type = type;
    switch (type) {
        case '0':
            $('#placeOrder-locationToggle').removeClass('none').text(texts.orders.addLocation)
            $('#placeOrder-address').closest('.inputTextContainer').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_on_delivery"]').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="card_on_delivery"]').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_at_restaurant"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_at_restaurant"]').addClass('none')
            $('.placeOrderPaymentMethodsContainer').removeClass('none')
        break;
        case '1':
            $('#placeOrder-locationToggle').addClass('none').text(texts.orders.removeLocation)
            $('#placeOrder-address').closest('.inputTextContainer').addClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_at_restaurant"]').removeClass('none')
            $('.placeOrderPaymentMethodElem[method="card_at_restaurant"]').removeClass('none')
            $('.placeOrderPaymentMethodsContainer').removeClass('none')
        break;
        case '2':
            $('#placeOrder-locationToggle').addClass('none').text(texts.orders.removeLocation)
            $('#placeOrder-address').closest('.inputTextContainer').addClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_on_delivery"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="cash_at_restaurant"]').addClass('none')
            $('.placeOrderPaymentMethodElem[method="card_at_restaurant"]').addClass('none')
            $('.placeOrderPaymentMethodsContainer').addClass('none')
        break;
        default:
        break;
    }
    drawPlaceOrderCheck();
}
setPlaceOrderFor = function(type,reset=true){
    reset ? resetPlaceOrder_placeFor() : null;
    if(type == 'guest'){
        window.placeOrder.isGuest = 1;
        $('#placeOrder-usersInputList').closest('.inputListContainer').addClass('none');
        $('.placeOrderForElem[type="user"]').find('.placeOrderForElemCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.placeOrderForElem[type="guest"]').find('.placeOrderForElemCheck').addClass('ico-check1').removeClass('ico-check0')
    }else if(type == 'user'){
        window.placeOrder.isGuest = 0;
        $('#placeOrder-usersInputList').closest('.inputListContainer').removeClass('none');
        $('.placeOrderForElem[type="user"]').find('.placeOrderForElemCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.placeOrderForElem[type="guest"]').find('.placeOrderForElemCheck').addClass('ico-check0').removeClass('ico-check1')
    }
}
drawPlaceOrderMap = function(lat,lng){
    if($('#placeOrder-userLocation').hasClass('none')){
        $('#placeOrder-userLocation').removeClass('none')
        $('#placeOrder-locationToggle').attr('action','hide')
        $('#placeOrder-locationToggle').text(texts.orders.removeLocation);
        try{
            window.placeOrderMap = L.map('placeOrder-userLocation').setView([0,0],2);
        }catch{}
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
        }).addTo(window.placeOrderMap);
        window.placeOrderMapMarker = L.marker([0,0],{icon: placeOrderMapIcon}).addTo(window.placeOrderMap);
        window.placeOrderMap.on('click',function(e){
            window.placeOrderMapMarker.setLatLng(e.latlng);
            window.placeOrderMap.addLayer(window.placeOrderMapMarker)
            window.placeOrder.lat = e.latlng.lat;
            window.placeOrder.lng = e.latlng.lng;
        });
        $('#placeOrder-userLocation').find('.leaflet-control-zoom-in').text('').addClass('ico-plus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomIn)
        $('#placeOrder-userLocation').find('.leaflet-control-zoom-out').text('').addClass('ico-minus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomOut)
    }

    if(lat == 0 && lng == 0){
        window.placeOrderMapMarker.setLatLng([0,0]);
        window.placeOrderMap.removeLayer(window.placeOrderMapMarker)
        window.placeOrderMap.flyTo([0,0], 1, {
            animate: false,
            duration: 1
        });
        window.placeOrder.lat = '0';
        window.placeOrder.lng = '0';
    }else{
        window.placeOrderMapMarker.setLatLng([lat ,lng ]).addTo(window.placeOrderMap);
        setTimeout(function(){
            window.placeOrderMap.flyTo([lat ,lng ], 15, {
                animate: true,
                duration: 1
            });
        },100)
        window.placeOrder.lat = lat;
        window.placeOrder.lng = lng;
    }

}

//
