///////////edit promocode
editPromocodeNoSaveCheck = function(){
    let promocodesSaveCheck = true;
    for(const key in window.promocodes){
        let promocode1 = window.promocodes[key];
        for(const key2 in window.promocodes_temp){
            let promocode2 = window.promocodes_temp[key2];
            if(promocode1.id == promocode2.id){
                if(
                    promocode1.discount == promocode2.discount &&
                    promocode1.is_expires == promocode2.is_expires &&
                    promocode1.day == promocode2.day &&
                    promocode1.month == promocode2.month &&
                    promocode1.year == promocode2.year &&
                    parseFloat(promocode1.cap) == parseFloat(promocode2.cap) &&
                    parseFloat(promocode1.minimum) == parseFloat(promocode2.minimum) &&
                    promocode1.is_oneUse == promocode2.is_oneUse &&
                    promocode1.is_delivery == promocode2.is_delivery &&
                    promocode1.is_pickup == promocode2.is_pickup &&
                    promocode1.is_guest == promocode2.is_guest
                ){
                    $(`.editPromocodeNoSave-${promocode1.id}`).addClass('none')
                }else{
                    promocodesSaveCheck = false;
                    $(`.editPromocodeNoSave-${promocode1.id}`).removeClass('none')
                }
            }
        }
    }
    if(promocodesSaveCheck){
        $('.editPromocodeNoSave').addClass('none')
        return true;
    }else{
        $('.editPromocodeNoSave').removeClass('none')
        return false;
    }
}

let editpromocodeDiscountUpInterval = null;
let editpromocodeDiscountDownInterval = null;
$('body').on('click','#editPromocode-discountU',function(e){
    if($('#editPromocode-discount').text() >= 100){return;}
    $('#editPromocode-discount').text(parseInt($('#editPromocode-discount').text()) + 1);
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).discount = $('#editPromocode-discount').text();
    promo_codes_unsave_check();
})
$('body').on('mousedown','#editPromocode-discountU',function(e){
    editpromocodeDiscountUpInterval = setInterval(function(){
        if($('#editPromocode-discount').text() == 100){clearInterval(editpromocodeDiscountUpInterval);return;}
        $('#editPromocode-discount').text(parseInt($('#editPromocode-discount').text()) + 1);
    },150)
}).on('mouseleave mouseup',function(){
    clearInterval(editpromocodeDiscountUpInterval)
})
$('body').on('click','#editPromocode-discountD',function(e){
    if($('#editPromocode-discount').text() <= 1){return;}
    $('#editPromocode-discount').text(parseInt($('#editPromocode-discount').text()) - 1);
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).discount = $('#editPromocode-discount').text();
    promo_codes_unsave_check();
})
$('body').on('mousedown','#editPromocode-discountD',function(e){
    editpromocodeDiscountDownInterval = setInterval(function(){
    if($('#editPromocode-discount').text() == 1){clearInterval(editpromocodeDiscountDownInterval);return;}
        $('#editPromocode-discount').text(parseInt($('#editPromocode-discount').text()) - 1);
    },150)
}).on('mouseleave mouseup',function(){
    clearInterval(editpromocodeDiscountDownInterval)
})

$('body').on('click change','#editPromocode-isExpire',function(e){
    if($(this).prop('checked') == true){
        $('#datePicker-editPromocodesContainer').parent().removeClass('none')
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).year = $('#datePicker-editPromocodes').find('.datePickerYear').attr('year');
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).month = $('#datePicker-editPromocodes').find('.datePickerMonth').attr('month');
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).day = $('#datePicker-editPromocodes').find('.datePickerSelectedDay').text();
    }else{
        $('#datePicker-editPromocodesContainer').parent().addClass('none')
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).year = null;
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).month = null;
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).day = null;
    }
    $(this).prop('checked') == true ? window.promocodes_temp.find(item=>item.code == window.history.state.promocode).is_expires = true : window.promocodes_temp.find(item=>item.code == window.history.state.promocode).is_expires = false;
    promo_codes_unsave_check();
})
$('body').on('click','.datePickerDay_editPromocode',function(e){
    if(window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).is_expires == true){
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).year = $('#datePicker-editPromocodes').find('.datePickerYear').attr('year');
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).month = $('#datePicker-editPromocodes').find('.datePickerMonth').attr('month');
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).day = $('#datePicker-editPromocodes').find('.datePickerSelectedDay').text();
    }else{
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).year = null;
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).month = null;
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).day = null;
    }

    promo_codes_unsave_check();
})

$('body').on('change input','#editPromocode-minimum',function(e){
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).minimum = $('#editPromocode-minimum').val();
    promo_codes_unsave_check();
})
$('body').on('change input','#editPromocode-cap',function(e){
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).cap = $('#editPromocode-cap').val();
    promo_codes_unsave_check();
})


$('body').on('click','#editPromocode-isOneUse',function(e){
    if($('#editPromocode-isGuest').prop('checked') == true && $('#editPromocode-isOneUse').prop('checked') == true){
        $('#editPromocode-isGuest').prop('checked',false)
    }
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).is_oneUse = $('#editPromocode-isOneUse').prop('checked');
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).is_guest = $('#editPromocode-isGuest').prop('checked');
    promo_codes_unsave_check();
})
$('body').on('click','#editPromocode-isGuest',function(e){
    if($('#editPromocode-isGuest').prop('checked') == true && $('#editPromocode-isOneUse').prop('checked') == true){
        showAlert('error',texts.settings.promocodeGuestNo,4000,true);
        setTimeout(function(){
            $('#editPromocode-isGuest').prop('checked',false)
            window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).is_guest = $('#editPromocode-isGuest').prop('checked');
            promo_codes_unsave_check();

        },150)
    }else{
        window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).is_guest = $('#editPromocode-isGuest').prop('checked');
        promo_codes_unsave_check();
    }
});


$('body').on('click','#editPromocode-isDelivery',function(e){
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).is_delivery = $('#editPromocode-isDelivery').prop('checked');
    promo_codes_unsave_check();
});
$('body').on('click','#editPromocode-isPickup',function(e){
    window.promocodes_temp.find(item=>item.code == window.popupPage.promocode).is_pickup = $('#editPromocode-isPickup').prop('checked');
    promo_codes_unsave_check();
});

$('body').on('click','#editPromocode_cancelBtn',function(e){
    for(const key in window.promocodes){
        if(window.promocodes[key].code == window.popupPage.promocode){
            for(const key2 in window.promocodes_temp){
                if(window.promocodes[key].id == window.promocodes_temp[key2].id){
                    window.promocodes_temp[key2] = JSON.parse(JSON.stringify(window.promocodes[key]))
                    drawPopupPage_manage_promo_code(window.promocodes_temp[key2]);
                }
            }
        }
    }
    promo_codes_unsave_check();
})
$('body').on('click','#editPromocode_saveBtn',function(e){
    if(account.authorities[4] == 0){return;}
    if(!coolDownChecker()){return;}
    let edit_promocode = window.promocodes_temp.find(item=> item.code == window.popupPage.promocode);
    if(typeof(edit_promocode) === 'undefined'){return;}
    edit_promocode.is_expires == 1 ? edit_promocode.is_expires = 1 : edit_promocode.is_expires == 0 ? edit_promocode.is_expires = 0 : null;
    edit_promocode.is_oneUse == 1 ? edit_promocode.is_oneUse = 1 : edit_promocode.is_oneUse == 0 ? edit_promocode.is_oneUse = 0 : null;
    edit_promocode.is_delivery == 1 ? edit_promocode.is_delivery = 1 : edit_promocode.is_delivery == 0 ? edit_promocode.is_delivery = 0 : null;
    edit_promocode.is_pickup == 1 ? edit_promocode.is_pickup = 1 : edit_promocode.is_pickup == 0 ? edit_promocode.is_pickup = 0 : null;
    edit_promocode.is_guest == 1 ? edit_promocode.is_guest = 1 : edit_promocode.is_guest == 0 ? edit_promocode.is_guest = 0 : null;
    edit_promocode.cap == '' ? edit_promocode.cap = 0 : null ;
    edit_promocode.minimum == '' ? edit_promocode.minimum = 0 : null ;
    if($('#editPromocode-minimum').val() == '' || $('#editPromocode-minimum').val() == null){
        $('#editPromocode-minimum').val('0.00')
    }else{
        $('#editPromocode-minimum').val(parseFloat($('#editPromocode-minimum').val()).toFixed(2))
    }
    if($('#editPromocode-cap').val() == '' || $('#editPromocode-cap').val() == null){
        $('#editPromocode-cap').val('0.00')
    }else{
        $('#editPromocode-cap').val(parseFloat($('#editPromocode-cap').val()).toFixed(2))
    }
    showBtnLoading($('#editPromocode_saveBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editPromocode:edit_promocode.id,
            code:edit_promocode.code,
            discount:edit_promocode.discount,
            is_expires:edit_promocode.is_expires,
            year:edit_promocode.year,
            month:edit_promocode.month,
            day:edit_promocode.day,
            minimum:edit_promocode.minimum,
            cap:edit_promocode.cap,
            is_oneUse:edit_promocode.is_oneUse,
            is_delivery:edit_promocode.is_delivery,
            is_pickup:edit_promocode.is_pickup,
            is_guest:edit_promocode.is_guest,
        },success:function(response){
            hideBtnLoading($('#editPromocode_saveBtn'))
            if(response.editPromocodeStat == 1){
                showAlert('success',response.msg,4000,true);
                for(const key in window.promocodes){
                    if(window.promocodes[key].id == edit_promocode.id){
                        window.promocodes[key].discount = edit_promocode.discount
                        window.promocodes[key].is_expires = edit_promocode.is_expires
                        window.promocodes[key].year = edit_promocode.year
                        window.promocodes[key].month = edit_promocode.month
                        window.promocodes[key].day = edit_promocode.day
                        window.promocodes[key].minimum = edit_promocode.minimum
                        window.promocodes[key].cap = edit_promocode.cap
                        window.promocodes[key].is_oneUse = edit_promocode.is_oneUse
                        window.promocodes[key].is_delivery = edit_promocode.is_delivery
                        window.promocodes[key].is_pickup = edit_promocode.is_pickup
                        window.promocodes[key].is_guest = edit_promocode.is_guest
                    }
                }
                for(const key in window.promocodes_temp){
                    if(window.promocodes_temp[key].id == edit_promocode.id){
                        window.promocodes_temp[key].discount = edit_promocode.discount
                        window.promocodes_temp[key].is_expires = edit_promocode.is_expires
                        window.promocodes_temp[key].year = edit_promocode.year
                        window.promocodes_temp[key].month = edit_promocode.month
                        window.promocodes_temp[key].day = edit_promocode.day
                        window.promocodes_temp[key].minimum = edit_promocode.minimum
                        window.promocodes_temp[key].cap = edit_promocode.cap
                        window.promocodes_temp[key].is_oneUse = edit_promocode.is_oneUse
                        window.promocodes_temp[key].is_delivery = edit_promocode.is_delivery
                        window.promocodes_temp[key].is_pickup = edit_promocode.is_pickup
                        window.promocodes_temp[key].is_guest = edit_promocode.is_guest
                    }
                }
                popupPageClose(true);
                drawPromocodes();
            }else if(response.editPromocodeStat == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
});
