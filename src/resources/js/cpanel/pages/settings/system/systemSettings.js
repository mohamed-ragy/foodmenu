//////////////////////////system settings///////////////////////////////
calcCartLifeTime = function(action=null){
    if(action == null){
        cartLifeTime = website_temp.cart_lifeTime;
        $('#systemSettings-cartLifeTime').attr('cartLifeTime',cartLifeTime);
    }else if(action == 'up'){
        cartLifeTime = parseInt($('#systemSettings-cartLifeTime').attr('cartLifeTime'));
        if(cartLifeTime == 1){
            cartLifeTime = 2;
        }else if(cartLifeTime > 1 && cartLifeTime <= 59){
            cartLifeTime = cartLifeTime + 1;
        }else if(cartLifeTime >= 60 && cartLifeTime < 120){
            cartLifeTime = 60 + 60;
        }else if(cartLifeTime >= 120 && cartLifeTime < 1440){
            cartLifeTime = cartLifeTime + 60;
        }else if(cartLifeTime >= 1440 && cartLifeTime < 1440 * 2){
            cartLifeTime = cartLifeTime + (60*24);
        }else if(cartLifeTime >= 1440 * 2 ){
            cartLifeTime = cartLifeTime + (60*24);
        }
    }else if(action == 'down'){
        cartLifeTime = parseInt($('#systemSettings-cartLifeTime').attr('cartLifeTime'));
        if(cartLifeTime == 1){
            // cartLifeTime = 1;
            cartLifeTime = 60;
        }else if(cartLifeTime > 1 && cartLifeTime <= 59){
            // cartLifeTime = cartLifeTime - 1;
            cartLifeTime = 60;
        }else if(cartLifeTime >= 60 && cartLifeTime < 120){
            cartLifeTime = 60 ;
        }else if(cartLifeTime >= 120 && cartLifeTime < 1440){
            cartLifeTime = cartLifeTime - 60;
        }else if(cartLifeTime >= 1440 && cartLifeTime < 1440 * 2){
            cartLifeTime = cartLifeTime - 60;
        }else if(cartLifeTime >= 1440 * 2 ){
            cartLifeTime = cartLifeTime - (60*24);
        }
    }
    $('#systemSettings-cartLifeTime').attr('cartLifeTime',cartLifeTime);
    if(cartLifeTime == 1){
        cartLifeTimeFixed = cartLifeTime;
        cartLifeTimeText = texts.cpanel.diffTime.min;
    }else if(cartLifeTime > 1 && cartLifeTime <= 59){
        cartLifeTimeFixed = cartLifeTime;
        cartLifeTimeText = texts.cpanel.diffTime.mins;
    }else if(cartLifeTime >= 60 && cartLifeTime < 120){
        cartLifeTimeFixed = 1;
        cartLifeTimeText = texts.cpanel.diffTime.hour;
    }else if(cartLifeTime >= 120 && cartLifeTime < 1440){
        cartLifeTimeFixed = cartLifeTime / 60;
        cartLifeTimeText = texts.cpanel.diffTime.hours;
    }else if(cartLifeTime >= 1440 && cartLifeTime < 1440 * 2){
        cartLifeTimeFixed = cartLifeTime / (60*24);
        cartLifeTimeText = texts.cpanel.diffTime.day;
    }else if(cartLifeTime >= 1440 * 2 ){
        cartLifeTimeFixed = cartLifeTime / (60*24);
        cartLifeTimeText = texts.cpanel.diffTime.days;
    }

    $('#systemSettings-cartLifeTime').text(Math.round(cartLifeTimeFixed));
    $('#systemSettings-cartLifeTimeText').text(cartLifeTimeText);
    return `${cartLifeTimeFixed} ${cartLifeTimeFixed}`
}
let cartLifeTimeUpInterval;
let cartLifeTimeDownInterval;
$('html,body').on('click','#systemSettings-cartLifeTimeU',function(e){
    e.stopImmediatePropagation();
    calcCartLifeTime('up');
    website_temp.cart_lifeTime = $('#systemSettings-cartLifeTime').attr('cartLifeTime');
    system_unsave_check();
})
$('html,body').on('click','#systemSettings-cartLifeTimeD',function(e){
    e.stopImmediatePropagation();
    calcCartLifeTime('down');
    website_temp.cart_lifeTime = $('#systemSettings-cartLifeTime').attr('cartLifeTime');
    system_unsave_check();
});
$('html,body').on('mousedown touchstart','#systemSettings-cartLifeTimeU',function(e){
    e.stopImmediatePropagation();
    cartLifeTimeUpInterval = setInterval(function(){
        $('#systemSettings-cartLifeTimeU').trigger('click');
    },150);
});
$('html,body').on('mouseup mouseleave touchend','#systemSettings-cartLifeTimeU',function(e){
    e.stopImmediatePropagation();
    clearInterval(cartLifeTimeUpInterval);
});
$('html,body').on('mousedown touchstart','#systemSettings-cartLifeTimeD',function(e){
    e.stopImmediatePropagation();
    cartLifeTimeDownInterval = setInterval(function(){
        $('#systemSettings-cartLifeTimeD').trigger('click');
    },150);
});
$('html,body').on('mouseup mouseleave touchend','#systemSettings-cartLifeTimeD',function(e){
    e.stopImmediatePropagation();
    clearInterval(cartLifeTimeDownInterval);
});


let printerWidthUpInterval;
let printerWidthDownInterval;
$('html,body').on('click','#systemSettings-printerWidthU',function(e){
    e.stopImmediatePropagation();
    if($('#systemSettings-printerWidth').text() > 499){return}
    $('#systemSettings-printerWidth').text(parseInt($('#systemSettings-printerWidth').text()) + 1);
    website_temp.printerWidth = $('#systemSettings-printerWidth').text();
    system_unsave_check();
})
$('html,body').on('click','#systemSettings-printerWidthD',function(e){
    e.stopImmediatePropagation();
    if($('#systemSettings-printerWidth').text() < 41){return}
    $('#systemSettings-printerWidth').text(parseInt($('#systemSettings-printerWidth').text()) - 1);
    website_temp.printerWidth = $('#systemSettings-printerWidth').text();
    system_unsave_check();
})
$('html,body').on('mousedown touchstart','#systemSettings-printerWidthU',function(e){
    e.stopImmediatePropagation();
    printerWidthUpInterval = setInterval(function(){
        $('#systemSettings-printerWidthU').trigger('click');
    },150);
});
$('html,body').on('mouseup mouseleave touchend','#systemSettings-printerWidthU',function(e){
    e.stopImmediatePropagation();
    clearInterval(printerWidthUpInterval);
});
$('html,body').on('mousedown touchstart','#systemSettings-printerWidthD',function(e){
    e.stopImmediatePropagation();
    printerWidthDownInterval = setInterval(function(){
        $('#systemSettings-printerWidthD').trigger('click');
    },150);
});
$('html,body').on('mouseup mouseleave touchend','#systemSettings-printerWidthD',function(e){
    e.stopImmediatePropagation();
    clearInterval(printerWidthDownInterval);
});




$('html,body').on('click',`#systemSettings-productReviews,
#systemSettings-guestReviews,
#systemSettings-collectReviews,
#systemSettings-guestOrders,
#systemSettings-acceptPickupOrders24,
#systemSettings-acceptDeliveryOrders24,
#systemSettings-discountAnnouncement,
#systemSettings-cancelOrder,
#systemSettings-dineinWorkingHours,
#systemSettings-liveChat,
#systemSettings-guestLiveChat,
#systemSettings-cookiesMsg,
#systemSettings-useDelivery,
#systemSettings-usePickup,
#systemSettings-langPopup,
#systemSettings-fastLoading
`,function(e){
    e.stopImmediatePropagation();
    website_temp.usePickup = $('#systemSettings-usePickup').prop('checked');
    website_temp.useDelivery = $('#systemSettings-useDelivery').prop('checked');
    website_temp.productReviews = $('#systemSettings-productReviews').prop('checked');
    website_temp.guestReviews = $('#systemSettings-guestReviews').prop('checked');
    website_temp.collectReviews = $('#systemSettings-collectReviews').prop('checked');
    website_temp.guestOrders = $('#systemSettings-guestOrders').prop('checked');
    website_temp.acceptPickupOrders24 = $('#systemSettings-acceptPickupOrders24').prop('checked');
    website_temp.acceptDeliveryOrders24 = $('#systemSettings-acceptDeliveryOrders24').prop('checked');
    website_temp.discountAnnouncement = $('#systemSettings-discountAnnouncement').prop('checked');
    website_temp.cancelOrder = $('#systemSettings-cancelOrder').prop('checked');
    website_temp.dineinWorkingHours = $('#systemSettings-dineinWorkingHours').prop('checked');
    website_temp.liveChat = $('#systemSettings-liveChat').prop('checked');
    website_temp.guestLiveChat = $('#systemSettings-guestLiveChat').prop('checked');
    website_temp.cookies_msg = $('#systemSettings-cookiesMsg').prop('checked');
    website_temp.cart_lifeTime = $('#systemSettings-cartLifeTime').attr('cartLifeTime');
    website_temp.langPopup = $('#systemSettings-langPopup').prop('checked');
    website_temp.fastLoading = $('#systemSettings-fastLoading').prop('checked');
    system_unsave_check();
});

systemSettingsNoSaveCheck = function(){
    if(!account.authorities[4]){return true;}
    if( website_temp.usePickup == website.usePickup &&
        website_temp.useDelivery == website.useDelivery &&
        website_temp.productReviews == website.productReviews &&
        website_temp.guestReviews == website.guestReviews &&
        website_temp.collectReviews == website.collectReviews &&
        website_temp.guestOrders == website.guestOrders &&
        website_temp.acceptPickupOrders24 == website.acceptPickupOrders24 &&
        website_temp.acceptDeliveryOrders24 == website.acceptDeliveryOrders24 &&
        website_temp.discountAnnouncement == website.discountAnnouncement &&
        website_temp.cancelOrder == website.cancelOrder &&
        website_temp.dineinWorkingHours == website.dineinWorkingHours &&
        website_temp.liveChat == website.liveChat &&
        website_temp.guestLiveChat == website.guestLiveChat &&
        website_temp.cookies_msg == website.cookies_msg &&
        website_temp.langPopup == website.langPopup &&
        website_temp.fastLoading == website.fastLoading &&
        website_temp.cart_lifeTime == website.cart_lifeTime &&
        website_temp.printerWidth == website.printerWidth

    ){
        $('.systemSettings-noSave').addClass('none');
        return true;
    }else{
        $('.systemSettings-noSave').removeClass('none');
        return false;
    }
}

$('html,body').on('click','#systemSettingsCancelBtn',function(e){
    e.stopImmediatePropagation();
    if(!account.authorities[4]){return;}
    website_temp.usePickup = website.usePickup;
    website_temp.useDelivery = website.useDelivery;
    website_temp.productReviews = website.productReviews;
    website_temp.guestReviews = website.guestReviews;
    website_temp.collectReviews = website.collectReviews;
    website_temp.guestOrders = website.guestOrders;
    website_temp.acceptPickupOrders24 = website.acceptPickupOrders24;
    website_temp.acceptDeliveryOrders24 = website.acceptDeliveryOrders24;
    website_temp.discountAnnouncement = website.discountAnnouncement;
    website_temp.cancelOrder = website.cancelOrder;
    website_temp.dineinWorkingHours = website.dineinWorkingHours;
    website_temp.liveChat = website.liveChat;
    website_temp.guestLiveChat = website.guestLiveChat;
    website_temp.cookies_msg = website.cookies_msg;
    website_temp.cart_lifeTime = website.cart_lifeTime;
    website_temp.langPopup = website.langPopup;
    website_temp.fastLoading = website.fastLoading;
    website_temp.printerWidth = website.printerWidth;

    $('#systemSettings-usePickup').prop('checked',website.usePickup);
    $('#systemSettings-useDelivery').prop('checked',website.useDelivery);
    $('#systemSettings-productReviews').prop('checked',website.productReviews);
    $('#systemSettings-guestReviews').prop('checked',website.guestReviews);
    $('#systemSettings-collectReviews').prop('checked',website.collectReviews);
    $('#systemSettings-guestOrders').prop('checked',website.guestOrders);
    $('#systemSettings-acceptPickupOrders24').prop('checked',website.acceptPickupOrders24);
    $('#systemSettings-acceptDeliveryOrders24').prop('checked',website.acceptDeliveryOrders24);
    $('#systemSettings-discountAnnouncement').prop('checked',website.discountAnnouncement);
    $('#systemSettings-cancelOrder').prop('checked',website.cancelOrder);
    $('#systemSettings-dineinWorkingHours').prop('checked',website.dineinWorkingHours);
    $('#systemSettings-liveChat').prop('checked',website.liveChat);
    $('#systemSettings-guestLiveChat').prop('checked',website.guestLiveChat);
    $('#systemSettings-cookiesMsg').prop('checked',website.cookies_msg);
    $('#systemSettings-langPopup').prop('checked',website.langPopup);
    $('#systemSettings-fastLoading').prop('checked',website.fastLoading);
    $('#systemSettings-cartLifeTime').attr('cartLifeTime',website.cart_lifeTime);
    calcCartLifeTime();
    $('#systemSettings-printerWidth').text(website.printerWidth);
    system_unsave_check();
});

$('html,body').on('click','#systemSettingsSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#systemSettingsSaveBtn'))
    let useDelivery;let usePickup;let productReviews;let guestReviews;let collectReviews;let guestOrders;let acceptPickupOrders24;let acceptDeliveryOrders24;let discountAnnouncement;let cancelOrder;let dineinWorkingHours;let liveChat;let guestLiveChat;let cookiesMsg;let langPopup;let fastLoading;
    if($('#systemSettings-useDelivery').prop('checked') == true){useDelivery = 1;}else{useDelivery = 0;}
    if($('#systemSettings-usePickup').prop('checked') == true){usePickup = 1;}else{usePickup = 0;}
    if($('#systemSettings-productReviews').prop('checked')){productReviews = 1}else{ productReviews = 0}
    if($('#systemSettings-guestReviews').prop('checked')){guestReviews = 1}else{ guestReviews = 0}
    if($('#systemSettings-collectReviews').prop('checked')){collectReviews = 1}else{ collectReviews = 0}
    if($('#systemSettings-guestOrders').prop('checked')){guestOrders = 1}else{ guestOrders = 0}
    if($('#systemSettings-acceptPickupOrders24').prop('checked')){acceptPickupOrders24 = 1}else{ acceptPickupOrders24 = 0}
    if($('#systemSettings-acceptDeliveryOrders24').prop('checked')){acceptDeliveryOrders24 = 1}else{ acceptDeliveryOrders24 = 0}
    if($('#systemSettings-discountAnnouncement').prop('checked')){discountAnnouncement = 1}else{ discountAnnouncement = 0}
    if($('#systemSettings-cancelOrder').prop('checked')){cancelOrder = 1}else{ cancelOrder = 0}
    if($('#systemSettings-dineinWorkingHours').prop('checked')){dineinWorkingHours = 1}else{ dineinWorkingHours = 0}
    if($('#systemSettings-liveChat').prop('checked')){liveChat = 1}else{ liveChat = 0}
    if($('#systemSettings-guestLiveChat').prop('checked')){guestLiveChat = 1}else{ guestLiveChat = 0}
    if($('#systemSettings-cookiesMsg').prop('checked')){cookiesMsg = 1}else{ cookiesMsg = 0}
    if($('#systemSettings-langPopup').prop('checked')){langPopup = 1}else{ langPopup = 0}
    if($('#systemSettings-fastLoading').prop('checked')){fastLoading = 1}else{ fastLoading = 0}
    let cart_lifeTime = $('#systemSettings-cartLifeTime').attr('cartLifeTime');
    let printerWidth =$('#systemSettings-printerWidth').text();
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveSystemSettings:true,
            useDelivery:useDelivery,
            usePickup:usePickup,
            productReviews:productReviews,
            guestReviews:guestReviews,
            collectReviews:collectReviews,
            guestOrders:guestOrders,
            acceptPickupOrders24:acceptPickupOrders24,
            acceptDeliveryOrders24:acceptDeliveryOrders24,
            discountAnnouncement:discountAnnouncement,
            cancelOrder:cancelOrder,
            dineinWorkingHours:dineinWorkingHours,
            liveChat:liveChat,
            guestLiveChat:guestLiveChat,
            cookies_msg:cookiesMsg,
            langPopup:langPopup,
            fastLoading:fastLoading,
            cart_lifeTime:cart_lifeTime,
            printerWidth:printerWidth,
        },
        success:function(response){
            hideBtnLoading($('#systemSettingsSaveBtn'))
            if(response.saveSystemSettingsStatus == 1){
                showAlert('success',response.msg,4000,true);

                website.useDelivery = useDelivery;
                website.usePickup = usePickup;
                website.productReviews = productReviews;
                website.guestReviews = guestReviews;
                website.collectReviews = collectReviews;
                website.guestOrders = guestOrders;
                website.acceptPickupOrders24 = acceptPickupOrders24;
                website.acceptDeliveryOrders24 = acceptDeliveryOrders24;
                website.discountAnnouncement = discountAnnouncement;
                website.cancelOrder = cancelOrder;
                website.dineinWorkingHours = dineinWorkingHours;
                website.liveChat = liveChat;
                website.guestLiveChat = guestLiveChat;
                website.cookies_msg = cookiesMsg;
                website.langPopup = langPopup;
                website.fastLoading = fastLoading;
                website.cart_lifeTime = cart_lifeTime;
                website.printerWidth = printerWidth;
                website_temp.usePickup = website.usePickup;
                website_temp.useDelivery = website.useDelivery;
                website_temp.productReviews = website.productReviews;
                website_temp.guestReviews = website.guestReviews;
                website_temp.collectReviews = website.collectReviews;
                website_temp.guestOrders = website.guestOrders;
                website_temp.acceptPickupOrders24 = website.acceptPickupOrders24;
                website_temp.acceptDeliveryOrders24 = website.acceptDeliveryOrders24;
                website_temp.discountAnnouncement = website.discountAnnouncement;
                website_temp.cancelOrder = website.cancelOrder;
                website_temp.dineinWorkingHours = website.dineinWorkingHours;
                website_temp.liveChat = website.liveChat;
                website_temp.guestLiveChat = website.guestLiveChat;
                website_temp.cookies_msg = website.cookies_msg;
                website_temp.cart_lifeTime = website.cart_lifeTime;
                website_temp.langPopup = website.langPopup;
                website_temp.fastLoading = website.fastLoading;
                website_temp.printerWidth = website.printerWidth;
                system_unsave_check();
            }else if(response.saveSystemSettingsStatus == 0){
                showAlert('error',response.msg,4000,true);

            }

        }
    })
})
