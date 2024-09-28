
drawPlaceOrderMap = function(){
    map = L.map('placeOrder-userLocation').setView([0,0],2);
    let icon = L.icon({
        iconUrl: '/storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(map);
    let marker = L.marker([0,0],{icon: icon});
    map.on('click',function(e){
        marker.setLatLng(e.latlng);
        map.addLayer(marker)
        window.placeOrder.lat = e.latlng.lat;
        window.placeOrder.lng = e.latlng.lng;
    });

    $('#placeOrder-userLocation').find('.leaflet-control-zoom-in').text('').addClass('ico-plus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomIn)
    $('#placeOrder-userLocation').find('.leaflet-control-zoom-out').text('').addClass('ico-minus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomOut)
    $('#placeOrder-userLocation').find('.leaflet-control-zoom').append(
        $('<a/>',{
            class:'fs105 row placeOrder-unsetLocation relative',
            'aria-disabled':false,
            role:'button',
            tooltip:texts.orders.removeLocation,
            tooltipTemp:texts.orders.removeLocation,
            autoHelp:'',
        }).append(
            $('<div/>',{class:'btnTxt ico-no ma'}),
        )
    )
    $('#placeOrder-userLocation')[0]._map = map;
    $('#placeOrder-userLocation')[0]._marker = marker;
}
