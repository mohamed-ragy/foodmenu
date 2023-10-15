drawPage_create_new_user = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.create_new_user}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
            ),
            $('<div/>',{class:'wFC'}).append(
                drawInputText('','ico-email_address','',texts.users.email,'createNewUser-email','text',texts.users.email,'100','clearVal','inputTextContainer_100p','',false),
                drawInputText('','ico-password','',texts.users.password,'createNewUser-password','password',texts.users.password,'100','password','inputTextContainer_100p','',false),
                drawInputText('','ico-user','',texts.users.name,'createNewUser-name','text',texts.users.name,'100','clearVal','inputTextContainer_100p','',false),
                drawInputText('','ico-phone_number','',texts.users.phoneNumber,'createNewUser-phoneNumber','text',texts.users.phoneNumber,'100','clearVal','inputTextContainer_100p','',false),
            ),
            drawInputText('','ico-address','',texts.users.address,'createNewUser-address','text',texts.users.address,'100','clearVal','inputTextContainer_100p','',false),
            $('<div/>',{class:'area mT20'}).append(
                $('<div/>',{class:'areaTitle',text:texts.users.userLocation}),
                $('<div/>',{class:'m10 w100p-20 h250 zx1',id:'createNewUser-Location'})
            ),
            $('<div/>',{class:'btnContainer mT40'}).append(
                $('<button/>',{class:'btn',id:'createNewUserBtn'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create})
                )
            )
        )
    )
    drawCreateNewUserMap();
}
drawCreateNewUserMap = function(){
    window.createUserMap = L.map('createNewUser-Location').setView([0,0],2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(window.createUserMap);

    window.createUserMapIcon = L.icon({
        iconUrl: '/storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });
    window.createUserMapMarker = L.marker([0,0],{icon: window.createUserMapIcon}).addTo(window.createUserMap);
    window.createUserMap.on('click',function(e){
        window.createUserMapMarker.setLatLng(e.latlng);
        window.createUserMap.addLayer(window.createUserMapMarker)
    });
    window.createUserMap.removeLayer(window.createUserMapMarker)
    window.createUserMap.invalidateSize();
    $('#createNewUser-Location').find('.leaflet-control-zoom-in').text('').addClass('ico-plus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomIn)
    $('#createNewUser-Location').find('.leaflet-control-zoom-out').text('').addClass('ico-minus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomOut)
    $('#createNewUser-Location').find('.leaflet-control-zoom').append(
        $('<a/>',{
            class:'fs105 row createNewUser-unsetLocation relative',
            'aria-disabled':false,
            role:'button',
            tooltip:texts.settings.unsetLocation,
            tooltipTemp:texts.settings.unsetLocation,
            autoHelp:'',
        }).append(
            $('<div/>',{class:'btnTxt ico-no mA'}),
            $('<div/>',{class:'btnLoading',})
        )
    )
}
