
let promocodeDiscountUpInterval = null;
let promocodeDiscountDownInterval = null;
$('html,body').on('click','#createPromocode-discountU',function(e){
    e.stopImmediatePropagation();
    if($('#createPromocode-discount').text() >= 100){return;}
    $('#createPromocode-discount').text(parseInt($('#createPromocode-discount').text()) + 1);
})
$('html,body').on('mousedown','#createPromocode-discountU',function(e){
    e.stopImmediatePropagation();
    promocodeDiscountUpInterval = setInterval(function(){
        if($('#createPromocode-discount').text() == 100){clearInterval(promocodeDiscountUpInterval);return;}
        $('#createPromocode-discount').text(parseInt($('#createPromocode-discount').text()) + 1);
    },150)
}).on('mouseleave mouseup',function(){
    clearInterval(promocodeDiscountUpInterval)
})
$('html,body').on('click','#createPromocode-discountD',function(e){
    e.stopImmediatePropagation();
    if($('#createPromocode-discount').text() <= 1){return;}
    $('#createPromocode-discount').text(parseInt($('#createPromocode-discount').text()) - 1);
})
$('html,body').on('mousedown','#createPromocode-discountD',function(e){
    e.stopImmediatePropagation();
    promocodeDiscountDownInterval = setInterval(function(){
    if($('#createPromocode-discount').text() == 1){clearInterval(promocodeDiscountDownInterval);return;}
        $('#createPromocode-discount').text(parseInt($('#createPromocode-discount').text()) - 1);
    },150)
}).on('mouseleave mouseup',function(){
    clearInterval(promocodeDiscountDownInterval)
})



$('html,body').on('click change','#createPromocode-isExpire',function(e){
    e.stopImmediatePropagation();
    if($(this).prop('checked') == true){
        $('#datePicker-promocodesContainer').parent().removeClass('none')
    }else{
        $('#datePicker-promocodesContainer').parent().addClass('none')
    }
})
$('html,body').on('click','#createPromocode-isOneUse',function(e){
    e.stopImmediatePropagation();
    if($('#createPromocode-isGuest').prop('checked') == true && $('#createPromocode-isOneUse').prop('checked') == true){
        $('#createPromocode-isGuest').prop('checked',false)
    }
})
$('html,body').on('click','#createPromocode-isGuest',function(e){
    e.stopImmediatePropagation();
    if($('#createPromocode-isGuest').prop('checked') == true && $('#createPromocode-isOneUse').prop('checked') == true){
        showAlert('error',texts.settings.promocodeGuestNo,4000,true);
        setTimeout(function(){
            $('#createPromocode-isGuest').prop('checked',false)
        },150)
    }
});



$('html,body').on('click','#createPromocode-createBtn',function(e){
    e.stopImmediatePropagation();
    if(account.authorities[4] == 0){return;}
    if(!coolDownChecker()){return;}
    if(plans[website.plan].promocodes <= Object.keys(window.promocodes).length ){
        showAlert('warning',texts.settings.promocodeLimitError,10000,true);
        return;
    }
    if($('#createPromocode-codeInput').val() == ''){
        showAlert('error',texts.settings.codeRequired,4000,true)
        inputTextError($('#createPromocode-codeInput'))
        return;
    }
    let is_expires=0;let is_oneUse=0;let is_delivery=0;let is_pickup=0;let is_guest=0;
    let year = $('#datePicker-promocodes').find('.datePickerYear').attr('year');
    let month = $('#datePicker-promocodes').find('.datePickerMonth').attr('month');
    let day = $('#datePicker-promocodes').find('.datePickerSelectedDay').text();
    if($('#createPromocode-isExpire').prop('checked') == true){is_expires = 1}
    if($('#createPromocode-isOneUse').prop('checked') == true){is_oneUse = 1}
    if($('#createPromocode-isDelivery').prop('checked') == true){is_delivery = 1}
    if($('#createPromocode-isPickup').prop('checked') == true){is_pickup = 1}
    if($('#createPromocode-isGuest').prop('checked') == true){is_guest = 1}
    if($('#createPromocode-minimum').val() == '' || $('#createPromocode-minimum').val() == null){
        $('#createPromocode-minimum').val(0)
    }
    if($('#createPromocode-cap').val() == '' || $('#createPromocode-cap').val() == null){
        $('#createPromocode-cap').val(0)
    }

    showBtnLoading($('#createPromocode-createBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createNewPromocode:$('#createPromocode-codeInput').val(),
            discount:$('#createPromocode-discount').text(),
            is_expires:is_expires,
            year:year,
            month:month,
            day:day,
            minimum:$('#createPromocode-minimum').val(),
            cap:$('#createPromocode-cap').val(),
            is_oneUse:is_oneUse,
            is_delivery:is_delivery,
            is_pickup:is_pickup,
            is_guest:is_guest,
        },success:function(response){
            hideBtnLoading($('#createPromocode-createBtn'))
            if(response.createNewPromocodeStat == 1){
                showAlert('success',response.msg,4000,true)
                if(response.promocode.is_expires == true){
                    response.promocode.day = parseInt(new Date(response.promocode.expires_at).getDate());
                    response.promocode.month = parseInt(new Date(response.promocode.expires_at).getMonth()) + 1;
                    response.promocode.year = parseInt(new Date(response.promocode.expires_at).getFullYear());
                }else{
                    response.promocode.day = null;
                    response.promocode.month = null;
                    response.promocode.year = null;
                }
                window.promocodes.push(JSON.parse(JSON.stringify(response.promocode)))
                window.promocodes_temp.push(JSON.parse(JSON.stringify(response.promocode)))
                drawPromocodes();
                popupPageClose(true);
            }else if(response.createNewPromocodeStat == 0){
                showAlert('error',response.msg,4000,true);
            }else if(response.createNewPromocodeStat == 2){
                showAlert('warning',texts.settings.promocodeLimitError,10000,true);
            }else if(response.createNewPromocodeStat == 3){
                showAlert('error',response.msg,4000,true);
                inputTextError($('#createPromocode-codeInput'))
            }
        }
    })
})


