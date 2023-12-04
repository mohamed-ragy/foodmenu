restaurantLocationNoSaveCheck = function(){
    if(
        website_temp.lat == website.lat &&
        website_temp.lng == website.lng
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
    let websiteLocation = [parseFloat(website_temp.lat),parseFloat(website_temp.lng)];
    let LocationZoom = 18;
    if(website_temp.lng == '0' && website_temp.lat == '0' ){
        LocationZoom = 2;
    }
    window.restaurantLocationMap = L.map('setting-restaurantLocation_map').setView(websiteLocation, LocationZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(window.restaurantLocationMap);
    window.websiteLocationMarker = L.marker(websiteLocation,{icon: markerIcon})

    if(website_temp.lng != '0' && website_temp.lat != '0' ){
        window.websiteLocationMarker.addTo(window.restaurantLocationMap);
    }

    window.restaurantLocationMap.on('click',function(e){
        if($('.restaurantLocation_currentLocationBtn:hover').length > 0){return;}
        if($('.restaurantLocation_unsetLocationBtn:hover').length > 0){return;}
        window.websiteLocationMarker.addTo(window.restaurantLocationMap).setLatLng(e.latlng);
        website_temp.lat = e.latlng.lat;
        website_temp.lng = e.latlng.lng;
        $('#setting-restaurantLocation_mapWindowNoSave').removeClass('none');
        restaurant_information_unsave_chack();
    })
    window.restaurantLocationMap.invalidateSize();

    $('#setting-restaurantLocation_map').find('.leaflet-control-zoom-in').text('').addClass('ico-plus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomIn)
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
}

$('html,body').on('click','.restaurantLocation_currentLocationBtn',function(e){
    // e.preventDefault();
    // e.stopPropagation();
    e.stopImmediatePropagation();
    navigator.geolocation.getCurrentPosition(function(pos){
        window.restaurantLocationMap.flyTo([pos.coords.latitude,pos.coords.longitude], 15, {
            animate: true,
            duration: 1
        });
        window.websiteLocationMarker.addTo(window.restaurantLocationMap).setLatLng([pos.coords.latitude,pos.coords.longitude]);
        website_temp.lat = pos.coords.latitude;
        website_temp.lng = pos.coords.longitude;
        restaurant_information_unsave_chack();
    });
})

$('html,body').on('click','.restaurantLocation_unsetLocationBtn',function(e){
    // e.preventDefault();
    // e.stopPropagation();
    e.stopImmediatePropagation();
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    if(!coolDownChecker()){return;}
    showBtnLoading($('.restaurantLocation_unsetLocationBtn'));
    let new_lat = 0;
    let new_lng = 0;
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveRestaurantLocation:true,
            lat:new_lat,
            lng:new_lng,
        },success:function(response){
            hideBtnLoading($('.restaurantLocation_unsetLocationBtn'));
            if(response.saveRestaurantLocationStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.lat = new_lat;
                website.lng = new_lng;
                website_temp.lat = new_lat;
                website_temp.lng = new_lng;
                window.restaurantLocationMap.removeLayer(websiteLocationMarker)
                window.guideHints.restaurantLocation();
                window.restaurantLocationMap.flyTo([0,0], 2, {
                    animate: false,
                    duration: 0
                });
                restaurant_information_unsave_chack();
            }else if(response.saveRestaurantLocationStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
})

$('html,body').on('click','#setting-restaurantLocation_cancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.lat = website.lat;
    website_temp.lng = website.lng;
    let websiteLocation = [parseFloat(website.lat),parseFloat(website.lng)];
    let LocationZoom = 15;
    if(website_temp.lng == '0' && website_temp.lat == '0' ){
        LocationZoom = 2;
    }
    window.restaurantLocationMap.flyTo([parseFloat(website_temp.lat),parseFloat(website_temp.lng)], LocationZoom, {
        animate: true,
        duration: 1
    });
    if(website_temp.lng != '0' && website_temp.lat != '0' ){
        window.websiteLocationMarker.addTo(window.restaurantLocationMap);
        window.websiteLocationMarker.setLatLng(websiteLocation);
    }else{
        window.restaurantLocationMap.removeLayer(window.websiteLocationMarker)
    }
    restaurant_information_unsave_chack();
});

$('html,body').on('click','#setting-restaurantLocation_saveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#setting-restaurantLocation_saveBtn'));
    let new_lat = websiteLocationMarker.getLatLng().lat
    let new_lng = websiteLocationMarker.getLatLng().lng
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveRestaurantLocation:true,
            lat:new_lat,
            lng:new_lng,
        },success:function(response){
            hideBtnLoading($('#setting-restaurantLocation_saveBtn'));
            if(response.saveRestaurantLocationStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.lat = new_lat;
                website.lng = new_lng;
                website_temp.lat = new_lat;
                website_temp.lng = new_lng;
                window.guideHints.restaurantLocation();
                restaurant_information_unsave_chack();
            }else if(response.saveRestaurantLocationStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
});

