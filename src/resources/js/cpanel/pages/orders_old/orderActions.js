


/////
new orders().countIncompleteOrders();
$('html,body').on('click','.changeOrderStatus',function(e){
    e.stopImmediatePropagation();
    new orders($(this).attr('orderId')).showChangeStatus($(this));
})
$('html,body').on('click',function(){
    if($('.changeOrderStatus:hover').length > 0 || $('#changeOrderStatus:hover').length > 0 || $('#changeOrderStatusGiveToDelivery:hover').length > 0 ){return}
    $('#changeOrderStatus').hide();
    $('#changeOrderStatusGiveToDelivery').hide();
})
$('html,body').on('mouseover','.order-giveToDelivery',function(e){
    $('#changeOrderStatusGiveToDelivery').css({
        'display':'block',
        'left':$('#changeOrderStatus').offset().left + $('#changeOrderStatus').outerWidth(),
        'top':$(this).offset().top,
    })
    if($('#changeOrderStatusGiveToDelivery').offset().top + $('#changeOrderStatusGiveToDelivery').outerHeight() > $(window).height()){
        $('#changeOrderStatusGiveToDelivery').css({
            'height':$(window).height() - $('#changeOrderStatusGiveToDelivery').offset().top - 100,
        })
    }
    if($('#changeOrderStatusGiveToDelivery').offset().left + $('#changeOrderStatusGiveToDelivery').outerWidth() > $(window).width()){
        $('#changeOrderStatusGiveToDelivery').css({
            'left' : $('#changeOrderStatus').offset().left - $('#changeOrderStatusGiveToDelivery').outerWidth(),
        })
    }
})
$('html,body').on('mouseleave','.order-giveToDelivery, #changeOrderStatusGiveToDelivery',function(e){
    if($('#changeOrderStatusGiveToDelivery:hover').length > 0){return;}
    $('#changeOrderStatusGiveToDelivery').hide();
});
$('html,body').on('mouseleave','.changeOrderStatus, #changeOrderStatus',function(e){
    if($('#changeOrderStatus:hover').length > 0 || $('#changeOrderStatusGiveToDelivery:hover').length > 0){return;}
    $('#changeOrderStatus').hide();
});
////////////////
$('html,body').on('click','.order-acceptOrder',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).acceptOrder();
})
$('html,body').on('click','.order-cancelOrder',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).cancelOrder();
})
$('html,body').on('click','.order-setReadyForPickup',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).setReadyForPickup();
})
$('html,body').on('click','.order-setPickedup',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).setPickedup();
})
$('html,body').on('click','.order-setWithDelivery',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).setWithDelivery();
})
$('html,body').on('click','.order-giveToDeliveryMan',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).giveToDelivery($(this).attr('deliveryId'));
})
$('html,body').on('click','.order-setDelivered',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
        updateToolTip();
        return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).setDelivered();
})
$('html,body').on('click','.order-setDineIn',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
        updateToolTip();
        return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).setDineIn();
})
$('html,body').on('click','.order-setDiningIn',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.changeOrderStatusElem').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
        updateToolTip();
        return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    new orders(orderId).setDiningIn();
})
/////////
$('html,body').on('click','.changeOrderType',function(e){
    e.stopImmediatePropagation();
    new orders($(this).attr('orderId')).showChangeType($(this));
})
$('html,body').on('click',function(){
    if($('.changeOrderType:hover').length > 0 || $('#changeOrderType:hover').length > 0 ){return}
    $('#changeOrderType').hide();
})
$('html,body').on('mouseleave','.changeOrderType, #changeOrderType',function(e){
    if($('#changeOrderType:hover').length > 0){return;}
    $('#changeOrderType').hide();
});
$('html,body').on('click','.order-changeOrderType',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.order-changeOrderType').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    let orderId = $(this).attr('orderId')
    let newType = $(this).attr('orderType')
    new orders(orderId).changeOrderType(newType);
})
////////
$('html,body').on('focus click input change','.orderPage-changeOrderNotice',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderPage-changeOrderNoticeContainer').attr('orderId')).changeOrderNoticeNoSaveCheck();
})
$('html,body').on('click','.orderPage-cancelChangeOrderNoticeBtn',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderPage-changeOrderNoticeContainer').attr('orderId')).drawOrder();
})
$('html,body').on('click','.orderPage-changeOrderNoticeBtn',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    new orders($(this).closest('.orderPage-changeOrderNoticeContainer').attr('orderId')).changeOrderNotice();
})
/////////
$('html,body').on('input change focus click','.orderPage-changePhoneNumber',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderPage-changePhoneNumberContainer').attr('orderId')).changePhoneNumberNoSaveCheck();
})
$('html,body').on('click','.orderPage-cancelChangePhoneNumberBtn',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderPage-changePhoneNumberContainer').attr('orderId')).drawOrder();
})
$('html,body').on('click','.orderPage-changePhoneNumberBtn',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    new orders($(this).closest('.orderPage-changePhoneNumberContainer').attr('orderId')).changePhoneNumber();
})
///////
$('html,body').on('input change focus click','.orderPage-changeAddress',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderPage-changeAddressContainer').attr('orderId')).changeAddressNoSaveCheck();
})
$('html,body').on('click','.orderPage-cancelChangeAddressBtn',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderPage-changeAddressContainer').attr('orderId')).drawOrder();
})
$('html,body').on('click','.orderPage-changeAddressBtn',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    new orders($(this).closest('.orderPage-changeAddressContainer').attr('orderId')).changeAddress();
})
//////////////
$('html,body').on('click','.orderPage-orderActionElem',function(e){
    e.stopImmediatePropagation();
    $('.orderPage-orderActionElemCheck').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.orderPage-orderActionElemCheck').removeClass('ico-check0').addClass('ico-check1')
})
$('html,body').on('click','.orderPage-takeAction',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }

    let orderId = $(this).attr('orderId');
    let orderAction = null;
    showBtnLoading($('.orderPage-takeAction'))
    $('.orderPage-orderActionElemCheck.ico-check1').closest('.orderPage-orderActionElem').attr('orderAction') == 'giveToDelivery'
    ? new orders($(this).attr('orderId'))[$('.orderPage-orderActionElemCheck.ico-check1').closest('.orderPage-orderActionElem').attr('orderAction')]($('.orderPage-orderActionElemCheck.ico-check1').closest('.orderPage-orderActionElem').attr('deliveryId'))
    : new orders($(this).attr('orderId'))[$('.orderPage-orderActionElemCheck.ico-check1').closest('.orderPage-orderActionElem').attr('orderAction')]();

})
