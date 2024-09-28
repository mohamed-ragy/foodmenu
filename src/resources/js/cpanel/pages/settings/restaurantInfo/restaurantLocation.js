
restaurantLocationNoSaveCheck = function(){
    if(
        website_temp.lat == website.lat &&
        website_temp.lng == website.lng && 
        website_temp.delivery_range == website.delivery_range
    ){
        $('.restaurantLocationNoSave').addClass('none');
        return true;
    }else{
        $('.restaurantLocationNoSave').removeClass('none');
        return false;
    }
}
drawRestaurantLocationMap = function(){
    let markerIcon = L.icon({
        iconUrl: '/storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
     });
     let drawControl = new L.Control.Draw({
        draw: {
            polygon: {
                shapeOptions: {
                    color: 'var(--green)',          // Border color
                    weight: 2,             // Border width
                    fillColor: 'var(--green)',   // Fill color
                    fillOpacity: 0.2       // Fill transparency
                }
            },
            polyline: false,  // Disable polyline (we only want polygons)
            circle: false,    // Disable circle
            rectangle: false, // Disable rectangle
            marker: false,    // Disable marker
            circlemarker:false,
        }
    });
    let websiteLocation = [parseFloat(website_temp.lat),parseFloat(website_temp.lng)];
    let LocationZoom = 15;
    if(website_temp.lng === null || website_temp.lat === null ){
        LocationZoom = 2;
        websiteLocation = [0,0]
    }
    let map = L.map('setting-restaurantLocation_map').setView(websiteLocation, LocationZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(map);

    let marker = L.marker(websiteLocation,{icon: markerIcon})
    map.addControl(drawControl);

    if(website_temp.lng !== null || website_temp.lat !== null ){
        marker.addTo(map);
    }
    let deliveryRangePolygon;
    if(website_temp.delivery_range !== null){
        deliveryRangePolygon = L.polygon(JSON.parse(website_temp.delivery_range), {
            color: 'var(--green)',           // Polygon border color
            weight: 2,             // Border width
            fillColor: 'var(--green)',  // Fill color
            fillOpacity: 0.2         // Fill opacity
        })
        map.addLayer(deliveryRangePolygon);
    }
    
    map.on(L.Draw.Event.DRAWSTART, function(event) {
        $('#setting-restaurantLocation_map')[0]._is_drawing = true;
        if(deliveryRangePolygon){
            map.removeLayer(deliveryRangePolygon)   
        }
    });
    map.on(L.Draw.Event.DRAWSTOP, function(event) {
        $('#setting-restaurantLocation_map')[0]._is_drawing = false;

    });
    map.on(L.Draw.Event.CREATED, function(event) {
        $('#setting-restaurantLocation_map')[0]._is_drawing = false;
        website_temp.delivery_range = JSON.stringify(event.layer.getLatLngs())
        deliveryRangePolygon = L.polygon(JSON.parse(website_temp.delivery_range), {
            color: 'var(--green)',           // Polygon border color
            weight: 2,             // Border width
            fillColor: 'var(--green)',  // Fill color
            fillOpacity: 0.2         // Fill opacity
        })
        map.addLayer(deliveryRangePolygon);
        $('#setting-restaurantLocation_map')[0]._deliveryRangePolygon = deliveryRangePolygon;
        restaurant_information_unsave_chack();
    });
    map.on('click',function(e){
        if($('#setting-restaurantLocation_map')[0]._is_drawing === true){return;}
        if($('.restaurantLocation_currentLocationBtn:hover').length > 0){return;}
        if($('.restaurantLocation_unsetLocationBtn:hover').length > 0){return;}

        marker.addTo(map).setLatLng(e.latlng);
        website_temp.lat = e.latlng.lat;
        website_temp.lng = e.latlng.lng;
        $('#setting-restaurantLocation_mapWindowNoSave').removeClass('none');
        restaurant_information_unsave_chack();
    })
    map.invalidateSize();

    $('#setting-restaurantLocation_map').find('.leaflet-draw-draw-polygon').text('').addClass('ico-polygon fs104').attr('title',null).attr('tooltip',texts.settings.accept_delivery_range)
    $('#setting-restaurantLocation_map').find('.leaflet-control-zoom-in').text('').addClass('ico-plus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomIn)
    $('#setting-restaurantLocation_map').find('.leaflet-control-zoom-out').text('').addClass('ico-minus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomOut)
    $('#setting-restaurantLocation_map').find('.leaflet-control-zoom-out').text('').addClass('ico-minus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomOut)
    $('#setting-restaurantLocation_map').find('.leaflet-control-zoom').append(
        $('<a/>',{
            class:'ico-gps fs106 restaurantLocation_currentLocationBtn',
            'aria-disabled':false,
            role:'button',
            tooltip:texts.settings.getCurrentLocation,
            autoHelp:'',
        }),
        $('<a/>',{
            class:'fs105 row restaurantLocation_unsetLocationBtn relative',
            'aria-disabled':false,
            role:'button',
            tooltip:texts.settings.unsetLocation,
            tooltipTemp:texts.settings.unsetLocation,
            autoHelp:'',
        }).append(
            $('<div/>',{class:'btnTxt ico-no ma'}),
            $('<div/>',{class:'btnLoading',})
        )
    )
    $('#setting-restaurantLocation_map')[0]._map = map;
    $('#setting-restaurantLocation_map')[0]._marker = marker;
    $('#setting-restaurantLocation_map')[0]._deliveryRangePolygon = deliveryRangePolygon;
}

$('body').on('click','.restaurantLocation_currentLocationBtn',function(e){
    // e.preventDefault();
    // e.stopPropagation();
    let map = $('#setting-restaurantLocation_map')[0]._map;
    let marker = $('#setting-restaurantLocation_map')[0].mar_ker;
    navigator.geolocation.getCurrentPosition(function(pos){
        map.flyTo([pos.coords.latitude,pos.coords.longitude], 15, {
            animate: true,
            duration: 1
        });
        marker.addTo(map).setLatLng([pos.coords.latitude,pos.coords.longitude]);
        website_temp.lat = pos.coords.latitude;
        website_temp.lng = pos.coords.longitude;
        restaurant_information_unsave_chack();
    });
})

$('body').on('click','.restaurantLocation_unsetLocationBtn',function(e){
    // e.preventDefault();
    // e.stopPropagation();
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    if(!coolDownChecker()){return;}
    let map = $('#setting-restaurantLocation_map')[0]._map;
    let marker = $('#setting-restaurantLocation_map')[0]._marker;
    let deliveryRangePolygon = $('#setting-restaurantLocation_map')[0]._deliveryRangePolygon;
    showBtnLoading($('.restaurantLocation_unsetLocationBtn'));
    let new_lat = null;
    let new_lng = null;
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveRestaurantLocation:true,
            lat:new_lat,
            lng:new_lng,
            delivery_range:null,
        },success:function(response){
            hideBtnLoading($('.restaurantLocation_unsetLocationBtn'));
            if(response.saveRestaurantLocationStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.lat = new_lat;
                website.lng = new_lng;
                website.delivery_range = null,
                website_temp.lat = new_lat;
                website_temp.lng = new_lng;
                website_temp.delivery_range = null,
                window.guideHints.restaurantLocation();
                map.flyTo([0, 0], 2, { animate: false, duration: 1 });
                map.removeLayer(marker);
                if(deliveryRangePolygon){
                    map.removeLayer(deliveryRangePolygon)
                }
                restaurant_information_unsave_chack();
            }else if(response.saveRestaurantLocationStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
})

$('body').on('click','#setting-restaurantLocation_cancelBtn',function(e){
    website_temp.lat = website.lat;
    website_temp.lng = website.lng;
    website_temp.delivery_range = website.delivery_range;

    let map = $('#setting-restaurantLocation_map')[0]._map;
    let marker = $('#setting-restaurantLocation_map')[0]._marker;
    let deliveryRangePolygon = $('#setting-restaurantLocation_map')[0]._deliveryRangePolygon;

    let websiteLocation = [parseFloat(website.lat),parseFloat(website.lng)];
    let LocationZoom = 15;
    if(website_temp.lng === null || website_temp.lat === null ){
        LocationZoom = 2;
        websiteLocation = [0,0]
    }
    map.flyTo(websiteLocation, LocationZoom, {
        animate: true,
        duration: 1
    });
    if(website_temp.lng !== null || website_temp.lat !== null ){
        marker.addTo(map);
        marker.setLatLng(websiteLocation);
    }else{
        map.removeLayer(marker)
    }

    if(deliveryRangePolygon){
        map.removeLayer(deliveryRangePolygon)   
    }

    if(website_temp.delivery_range !== null){
        let deliveryRangePolygon = L.polygon(JSON.parse(website_temp.delivery_range), {
            color: 'var(--green)',           // Polygon border color
            weight: 2,             // Border width
            fillColor: 'var(--green)',  // Fill color
            fillOpacity: 0.2         // Fill opacity
        })
        map.addLayer(deliveryRangePolygon);
        $('#setting-restaurantLocation_map')[0]._deliveryRangePolygon = deliveryRangePolygon;
    }
    
    restaurant_information_unsave_chack();
});

$('body').on('click','#setting-restaurantLocation_saveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#setting-restaurantLocation_saveBtn'));
    let new_lat = website_temp.lat;
    let new_lng = website_temp.lng;
    let delivery_range = website_temp.delivery_range;
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveRestaurantLocation:true,
            lat:new_lat,
            lng:new_lng,
            delivery_range:delivery_range,
        },success:function(response){
            hideBtnLoading($('#setting-restaurantLocation_saveBtn'));
            if(response.saveRestaurantLocationStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.lat = new_lat;
                website.lng = new_lng;
                website.delivery_range = delivery_range;
                website_temp.lat = new_lat;
                website_temp.lng = new_lng;
                website_temp.delivery_range = delivery_range;
                window.guideHints.restaurantLocation();
                restaurant_information_unsave_chack();
            }else if(response.saveRestaurantLocationStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
});

