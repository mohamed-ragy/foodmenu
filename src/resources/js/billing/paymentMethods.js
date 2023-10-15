
drawPaymentMethods = function(){
    $('#paymentMethods').text('').append(
        $('<div/>',{text:texts.paymentMethods,class:'bold mB10 pB10 brdrBottomS w100p'}),
        $('<table/>',{id:'paymentMethodsContainer',class:'paymentMethodsContainer'}),
        $('<div/>',{class:'mT20 row alnC jstfyS pointer openPage hvr-cBlack',page:'addPaymentMethod'}).append(
            $('<span/>',{class:'ico-plus mB3 fs08 mie-5'}),
            $('<span/>',{text:texts.addPaymentMethod})
        ),

    )

    for(const key in data.paymentMethods){
        let paymentMethod = data.paymentMethods[key];
        let defaultElem = $('<span/>',{class:'setDefaultPaymentMethod hvr-cBlack ico-check0 fs08 mX10 pointer',tooltip:texts.setAsDefault});
        let deletePaymentMethodElem = $('<td/>',{class:'ico-close deletePaymentMethod',tooltip:texts.removePaymentMethod});
        let setDefaultElemClass = '';
        if(data.subscription_status == 'canceled' || data.subscription_status == 'incomplete_expired'){
            setDefaultElemClass = 'none';
        }
        if(paymentMethod.is_default){
            defaultElem = $('<span/>',{class:'defaultPaymentMethod',text:texts.default})
            deletePaymentMethodElem = $('<td/>',{class:'ico-close c-placeholder fs07',tooltip:texts.cantRemovePaymentMethod});
        }

        $('#paymentMethodsContainer').append(
            $('<tr/>',{class:'paymentMethodContainer',paymentMethod_id:paymentMethod.id}).append(
                deletePaymentMethodElem,
                $('<td/>',{class:'pX10 '}).append(
                    $('<img/>',{src:`/storage/imgs/billing_cards/${paymentMethod.brand}.png`,class:'w30'}),
                ),
                $('<td/>',{class:'pX10 ',text:'•••• '+paymentMethod.last4}),
                $('<td/>',{class:'pX10  none-720',text:`${texts.expires} ${paymentMethod.exp_month.toString().padStart(2, '0')}/${paymentMethod.exp_year}`}),
                $('<td/>',{class:setDefaultElemClass}).append(defaultElem),
            )
        )
    }

    if(Object.keys(data.paymentMethods).length == 0){
        if(data.subscription_status == 'trialing'  || data.subscription_status == 'active' || data.subscription_status == 'past_due' || data.subscription_status == 'incomplete'){
            $('#paymentMethods').append(
                $('<div/>',{class:'row alnBL jstfyS cR bold mT20'}).append(
                    $('<div/>',{class:'ico-warning mie-5'}),
                    $('<div/>',{class:'',text:texts.pleaseAddPaymentMethod})
                )
            )
        }
        // else if(data.subscription_status == 'incomplete'){
        //     $('#paymentMethods').append(
        //         $('<div/>',{class:'row alnBL jstfyS cR bold mT20'}).append(
        //             $('<div/>',{class:'ico-warning mie-5'}),
        //             $('<div/>',{class:'',text:texts.pleaseAddPaymentMethod})
        //         )
        //     )
        // }
    }
}

$('html,body').on('click','.setDefaultPaymentMethod',function(e){
    e.stopImmediatePropagation();
    if(data.subscription_status == 'canceled' || data.subscription_status == 'incomplete_expired'){return;}
    $('.setDefaultPaymentMethod').removeClass('ico-check0').addClass('loading_s vV mA');
    let paymentMethod_id = $(this).closest('.paymentMethodContainer').attr('paymentMethod_id');
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setPaymentMethodDefault:paymentMethod_id,
        },success:function(r){
            for(const key in data.paymentMethods){
                if(data.paymentMethods[key].id == paymentMethod_id){
                    data.paymentMethods[key].is_default = 1;
                }else{
                    data.paymentMethods[key].is_default = 0;
                }
            }
            drawPaymentMethods();
        }
    })
})
$('html,body').on('click','.deletePaymentMethod',function(e){
    $('#popupHeadTitle').text(texts.removePaymentMethod)
    e.stopImmediatePropagation();
    paymentMethod = data.paymentMethods.find(item=>item.id == $(this).closest('.paymentMethodContainer').attr('paymentMethod_id'))
    $('.popupPage[page="deletePaymentConfirm"]').text('').append(
        $('<div/>',{text:texts.deletePaymentConfirmMsg}),
        $('<div/>',{class:'mY20 row alnC jstfyC'}).append(
            $('<td/>',{class:'pX10'}).append(
                $('<img/>',{src:`/storage/imgs/billing_cards/${paymentMethod.brand}.png`,class:'w30'}),
            ),
            $('<td/>',{class:'pX10 ',text:'•••• '+paymentMethod.last4}),
            $('<td/>',{class:'pX10  none-720',text:`${texts.expires} ${paymentMethod.exp_month.toString().padStart(2, '0')}/${paymentMethod.exp_year}`}),
        ),
        $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cancel}),
            $('<button/>',{class:'btn btn-delete',id:'deletePaymentMethodConfirm',paymentMethod_id:paymentMethod.id}).append(
                $('<div/>',{class:'btnTxt',text:texts.delete}),
                $('<div/>',{class:'btnLoading'}),
            ),
        )
    )
    showPopup('deletePaymentConfirm')

})


$('html,body').on('click','#deletePaymentMethodConfirm',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#deletePaymentMethodConfirm'))
    let paymentMethod_id = $(this).attr('paymentMethod_id');
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deletePaymentMethod:paymentMethod_id,
        },success:function(r){
            hideBtnLoading($('#deletePaymentMethodConfirm'))
            $('.popupContainer').addClass('none')
            $('.popupPage').addClass('none')
            for(const key in data.paymentMethods){
                if(data.paymentMethods[key].id == paymentMethod_id){
                    delete data.paymentMethods[key];
                }
            }
            drawPaymentMethods();
        }
    })
})
