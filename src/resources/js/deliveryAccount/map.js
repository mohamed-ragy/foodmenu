    $(document).on('click','.showMapBtn',function(e){
        e.stopImmediatePropagation();
        $('#mapContainer').css('display','flex');
        mapMarker.setLatLng([$(this).attr('lat'),$(this).attr('lng')]);
        window.map.flyTo([$(this).attr('lat'),$(this).attr('lng')], 15, {
            animate: false,
            duration: 0
        });
            window.map.invalidateSize();
    });
    $('#mapClose').on('click',function(){
        $('#mapContainer').hide();
    });
    window.map = L.map('map').setView([0,0],2);
    const mapIcon = L.icon({
        iconUrl: '/storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(window.map);
    let mapMarker = L.marker([0,0],{icon: mapIcon}).addTo(window.map);
