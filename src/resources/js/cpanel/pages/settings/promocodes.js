require('./promocodes/create.js');//done
require('./promocodes/edit.js');//done
require('./promocodes/delete.js');//done

getPromocodes = function(callback=function(){}){
    if(window.promocodesFirstLoad){
        if( Object.keys(window.promocodes).length == 0){
            $('#promocodesTable').addClass('none');
            $('#noPromocodes').removeClass('none')
        }else{
            drawPromocodes();
            callback();
        }
    }else{
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getPromocodes:true,
            },success:function(response){
                window.promocodesFirstLoad = true;
                for(const key in response.promocodes){
                    if(response.promocodes[key].is_expires){
                        let expires_at = getDate(response.promocodes[key].expires_at)
                        response.promocodes[key].day = expires_at.day_num.local
                        response.promocodes[key].month = expires_at.month_num.local
                        response.promocodes[key].year = expires_at.year.local
                    }else{
                        response.promocodes[key].day = null;
                        response.promocodes[key].month = null;
                        response.promocodes[key].year = null;
                    }

                }
                window.promocodes = JSON.parse(JSON.stringify(response.promocodes));
                window.promocodes_temp = JSON.parse(JSON.stringify(response.promocodes));
                if( Object.keys(window.promocodes).length == 0){
                    $('#promocodesTable').addClass('none');
                    $('#noPromocodes').removeClass('none');
                }else{
                    drawPromocodes();
                    callback();
                }
            }
        })
    }
}
drawPromocodes = function(){
    if( Object.keys(window.promocodes).length == 0){
        $('#promocodesTable').text('').addClass('none');
        $('#noPromocodes').removeClass('none');
        return;
    }else{
        $('#promocodesTable').text('').removeClass('none');
        $('#noPromocodes').addClass('none');
    }
    $('#promocodesTable').text('').append(
        $(`<colgroup><col span="1" style="width: 100%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"></colgroup>`),
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'tnw taS vaM',text:texts.settings.code}),
            $('<th/>',{class:'tnw taS none-720 vaM',text:texts.settings.created}),
            $('<th/>',{class:'tnw taC vaM',text:texts.settings.active}),
            $('<th/>',{class:'tnw taC vaM',text:''})
        )
    )
    for(const key in window.promocodes_temp){
        drawPromoCodeRow(window.promocodes_temp[key]);
    }
    promo_codes_unsave_check();
}
drawPromoCodeRow = function(promocode){
    $('#promocodesTable').append(
        $('<tr/>',{class:'promocodeTableRow',promocode:promocode.id,autoHelp:''}).append(
            $('<td/>',{class:'tnw vaM taS'}).append(
                $('<span/>',{class:'ico-promo_codes fs103 mie-5'}),
                $('<span/>',{class:'fs103 mis-5',text:promocode.code})
            ),
            $('<td/>',{class:'tnw vaM taS none-720'}).append($('<div/>',{text:getDate(promocode.created_at).date.local})),
            $('<td/>',{class:'tnw vaM taC'}).append(
                drawSwitchBtn('',null,null,`checkboxlabel checkboxlabel_noTxt`,`promocodeTableAvailability promocodeTableAvailability-${promocode.id}`)
            ),
            $('<td/>',{class:'tnw vaM taC'}).append(
                    $('<button/>',{promocode:promocode.code,class:'btn_table ico-settings popupPage managePromocodeBtn',popupPage:'manage_promo_code',tooltip:texts.cpanel.public.manage}).append($('<span/>',{class:'tableRow_unsaved none'})),
                    $('<button/>',{promocode:promocode.id,class:'btn_table ico-delete promocodeDeleteBtn',tooltip:texts.cpanel.public.delete}),
                ),
        )
    )
    $(`.promocodeTableAvailability-${promocode.id}`).prop('checked',promocode.is_active)
}

$('html,body').on('click','.promocodeTableAvailability',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let is_active = 0;
    if($(`.promocodeTableAvailability-${$(this).closest('.promocodeTableRow').attr('promocode')}`).prop('checked')){is_active = 1}
    let thisPromocode = window.promocodes.find(item=> item.id == $(this).closest('.promocodeTableRow').attr('promocode'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            promoCodeActive:thisPromocode.id,
            is_active:is_active,
            promocodeName:thisPromocode.name,
        },success:function(response){
            if(response.promoCodeActiveStat == 1){
                showAlert('success',response.msg,4000,true);
                for(const key in window.promocodes){
                    window.promocodes.find(item=> item.id == thisPromocode.id).is_active = is_active;
                    window.promocodes_temp.find(item=> item.id == thisPromocode.id).is_active = is_active;
                    drawPromocodes();
                }
            }else if(response.promoCodeActiveStat == 0){
                showAlert('error',response.msg,4000,true);
                drawPromocodes();

            }
        }
    })
})
