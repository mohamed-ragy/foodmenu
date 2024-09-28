drawPage_manage_users=function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection ',
        }).append(
            $('<div/>',{class:'area mT40',autoHelp:'find_users'}).append(
                $('<div/>',{class:'areaTitle',text:texts.users.findUser}),
                drawInputList('','ico-users','',texts.users.findUser,'manageUsers-usersInputList',texts.users.findUserPlaceholder,250,'manageUsers-usersInputListList',false,'','findUserList','findUser'),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<div/>',{class:'btn',id:'manageUsers-loadUserBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.cpanel.public.find})
                    )
                )
            ),
            $('<div/>',{class:'mxw800',id:'editUser-container',autoHelp:'manage_users'})
        )
    )
}
drawManageUserLoading=function(){
    $('#editUser-container').text('').append(
        $('<div/>',{class:'row alnBL jstfyS mX10 mT40'}).append(
            $('<div/>',{class:'cardLoading w20 h20 br5'}),
            $('<div/>',{class:'cardLoading w150 h20 mX5 br5'})
        ),
        $('<div/>',{class:'row alnBL jstfyS mX10 mT10 mB20'}).append(
            $('<div/>',{class:'cardLoading w20 h20 br5 mX5'}),
            $('<div/>',{class:'cardLoading w20 h20 br5 mX5'}),
            $('<div/>',{class:'cardLoading w20 h20 br5 mX5'}),
            $('<div/>',{class:'cardLoading w20 h20 br5 mX5'}),
        ),
        $('<div/>',{class:'mY10 mX5 cardLoading h20 w300 br5'}),
        $('<div/>',{class:'mY10 mX5 cardLoading h20 w300 br5'}),
        $('<div/>',{class:'mY10 mX5 cardLoading h20 w300 br5'}),
        $('<div/>',{class:'mY10 mX5 cardLoading h20 w300 br5'}),
        $('<div/>',{class:'mY10 mX5 cardLoading h20 w300 br5'}),

    )
}
drawManageUser = function(userId){
    let user = website.users.find(item=>item.id == userId);
    if(typeof(user) === 'undefined'){
        showPopup_notFound(texts.users.userNotFound);
        $('#editUser-container').text('')
        return;
    }

    $('#manageUsers-usersInputList').val(user.name).attr('key',user.id)
    let userIconClass;let usericonTooltip;let blockBtnClass;
    user.isBanned ? userIconClass ='ico-userBlock cR fs102' : userIconClass = 'ico-user fs102';
    user.isBanned ? blockBtnClass = 'ico-user cG' : blockBtnClass = 'ico-userBlock cR';
    user.isBanned ? blockBtnToolTip = texts.users.removeBan : blockBtnToolTip = texts.users.banUser;
    user.isBanned ? usericonTooltip = texts.users.bannedUser : usericonTooltip = null;
    $('#editUser-container').attr('user',user.id).text('').append(
        $('<div/>',{class:'mT40'}).append(
            $('<div/>',{class:'row alnBL jstfyS mX10'}).append(
                $('<div/>',{class:userIconClass,tooltip:usericonTooltip}),
                $('<a/>',{class:'fs102 mX5 popupPage popupId',popupId:'user',popupPage:'user',user:user.id,text:user.name})
            ),
            $('<div/>',{class:'row alnC jstfyS mX10'}).append(
                $('<div/>',{class:`visitorOnlineIcon-user-${user.id}`}),
                $('<div/>',{class:`fs08 visitorActions-user-${user.id}`})
            ),
            $('<div/>',{class:'row alnS jstfyS mX5 mT5'}).append(
                $('<button/>',{class:'authority_5 ico-chat btn_icon openChatWindow',type:'user',user:user.id,tooltip:texts.users.chatWith.replace(':name:',user.name)}).append($('<span/>',{class:`chatIconUnseen none chatUnseen-user-${user.id}`})),
                $('<button/>',{class:'authority_0 ico-orders btn_icon cpPage',cpPage:'order_history',user:user.id,tooltip:texts.users.seePlacedOrders.replace(':name:',user.name)}),
                $('<button/>',{class:'authority_1 ico-product_reviews btn_icon cpPage',cpPage:'product_reviews',user:user.id,tooltip:texts.users.seeReviewPosted.replace(':name:',user.name)}),
                $('<button/>',{class:`authority_2 ${blockBtnClass} btn_icon blockUserBtn`,tooltip:blockBtnToolTip}),
            ),
            $('<div/>',{class:'wFC'}).append(
                drawInputText('','ico-email_address','',texts.users.userEmail,'editUser-email','text',texts.users.userEmail,200,'clearVal','inputTextContainer_100p mT20',user.email,false),
                $('<div/>',{class:'row alnC jstfyS'}).append(
                    drawInputText('','ico-password','',texts.users.password,'editUser-password','password',texts.users.password,200,'password','inputTextContainer_100p mY0','',false),
                    $('<div/>',{class:'ico-info mis-5 cO',tooltip:texts.users.editPassowrdNote})
                ),
                drawInputText('','ico-user','',texts.users.name,'editUser-name','text',texts.users.name,200,'clearVal','inputTextContainer_100p',user.name,false),
                drawInputText('','ico-phone_number','',texts.users.phoneNumber,'editUser-phoneNumber','text',texts.users.phoneNumber,200,'clearVal','inputTextContainer_100p',user.phoneNumber,false),

            ),
            $('<div/>',{class:'area mY30'}).append(
                $('<div/>',{class:'areaTitle',text:texts.users.addresses}),
                $('<div/>',{class:'btnContainer mT20 manageUser_add_new_address'}).append(
                    $('<button/>',{class:'btn btn-cancel',text:texts.users.add_new_address})
                ),
                $('<div/>',{id:'editUser-addresses',class:'m10 w100p-20 column alnC jstfyS'}),
            ),
            drawSaveCancelBtns('saveEditUSerBtn','cancelEditUSerBtn','mT40')
        )
    )
    setUserOnlineStatus(user.id,'user')
    setUnseenChat('user',user.id)
    drawEditUserAddresses(user);
}
drawEditUserAddresses = function (user){
    let addresses = user.addresses;
    $('#editUser-addresses').text('')
    for(const key in addresses){
        drawEditUserAddress(addresses[key])

    }
}
drawEditUserAddress = function(address){
    let manage_user_address_map;
    $('#editUser-addresses').append(
        $('<div/>',{class:'manageUser_address_container brdrT1_w3 pT30 mT30 w100p-60'}).append(
            $('<div/>',{class:'mX5 w100p-10 row alnC jstfyS'}).append(
                $('<div/>',{class:'mie-20 fs09',text:texts.users.default_address}),
                $('<div/>',{class:`manage_user_address_default ${address.is_default == '1' ? 'ico-check1' : 'ico-check0'} pointer`}),
            ),
            drawInputText('','ico-address','',texts.users.full_address,'','text',texts.users.full_address,200,'clearVal','inputTextContainer_100p',address.address,false,'manage_user_full_address'),
            $('<div/>',{class:'area mT20',autoHelp:'user_location'}).append(
                $('<div/>',{class:'areaTitle',text:texts.users.address_location}),
                manage_user_address_map = $('<div/>',{class:'manage_user_address_map m10 w100p-20 h250 zx1'}),
            ),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'btn btn-delete manage_user_remove_address',text:texts.users.removeAddress})
            )
        )
    )
    drawEditUserAddressMap(address,manage_user_address_map)
}

drawEditUserAddressMap = function(address,map_element){
    let map = L.map(map_element[0]).setView([0,0],2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(map);

    let icon = L.icon({
        iconUrl: '/storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });

    let marker = L.marker([0,0],{icon: icon}).addTo(map);

    map.on('click',function(e){
        marker.setLatLng(e.latlng);
        map.addLayer(marker)
    });

    map.invalidateSize();
    map_element.find('.leaflet-control-zoom-in').text('').addClass('ico-plus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomIn)
    map_element.find('.leaflet-control-zoom-out').text('').addClass('ico-minus fs08').attr('title',null).attr('tooltip',texts.cpanel.public.zoomOut)
    map_element.find('.leaflet-control-zoom').append(
        $('<a/>',{
            class:'fs105 row editUser-unsetLocation relative',
            'aria-disabled':false,
            role:'button',
            tooltip:texts.users.userUnsetLocation,
            tooltipTemp:texts.users.userUnsetLocation,
            autoHelp:'',
        }).append(
            $('<div/>',{class:'btnTxt ico-no ma'}),
        )
    )
    if(address.lat !== null && address.lng !== null){
        marker.setLatLng([address.lat,address.lng]);
        map.addLayer(marker).setView([address.lat,address.lng],15)
    }else{
        map.removeLayer(marker).setView([0,0],1)
    }

    map_element[0]._map = map;
    map_element[0]._marker = marker;
}
