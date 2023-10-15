activatePlan = function(){
    $('.popupPage[page="activatePlan"]').text('');
    if(Object.keys(data.paymentMethods).length == 0){
        showPopup('paymentForm');
        $('#paymentFormTxt').text(texts.activatePlan)
        window.payment_return_url = 'activatePlan';
        $('#payment-form_loading').removeClass('none').addClass('vV')
        $('#payment-form').addClass('none')
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                activatePlan:true,
            },success:function(r){
                drawPaymentGateWay(r.client_secret);
                window.payment_return_url = 'activatePlan';
                $('#payment-form').removeClass('none');
                $('#payment-form_loading').addClass('none').removeClass('vV')
            }
        })
    }else{
        for(const key in data.paymentMethods){
            let paymentMethod = data.paymentMethods[key];
            $('.popupPage[page="activatePlan"]').append(
                $('<div/>',{class:'mY10 row alnC jstfyC pointer activatePlanPayment',paymentMethod_id:paymentMethod.id}).append(
                    $('<div/>',{class:'ico-check0 pointer activatePlanPaymentCheck'}),
                    $('<img/>',{src:`/storage/imgs/billing_cards/${paymentMethod.brand}.png`,class:'w30 pX20'}),
                    $('<div/>',{class:'pX20 ',text:'•••• '+paymentMethod.last4}),
                )
            )
        }
        $('.popupPage[page="activatePlan"]').append(
            $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                $('<button/>',{class:'btn activatePlanBtn'}).append(
                    $('<div/>/',{class:'btnTxt',text:texts.activatePlan}),
                    $('<div/>',{class:'btnLoading'})
                )
            ),
            $('<div/>',{class:'activatePlanMsg'})
        )
    }
}
$('html,body').on('click','.activatePlanPayment',function(e){
    e.stopImmediatePropagation();
    $('.activatePlanPaymentCheck').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.activatePlanPaymentCheck').removeClass('ico-check0').addClass('ico-check1')
})
$('html,body').on('click','.activatePlanBtn',function(e){
    e.stopImmediatePropagation();
    let paymentMethod_id = null;
    $('.activatePlanPayment').each(function(){
        if($(this).find('.activatePlanPaymentCheck').hasClass('ico-check1')){
            paymentMethod_id = $(this).attr('paymentMethod_id')
        }
    })
    if(paymentMethod_id == null){
        $('.activatePlanMsg').addClass('cR').text(texts.pleaseSelectPayment);
    }else{
        $('.activatePlanMsg').removeClass('cR').text('');
        showBtnLoading($('.activatePlanBtn'))
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                activatePlanAndPay:true,
                paymentMethod_id:paymentMethod_id,
            },success:function(r){
                // hideBtnLoading($('.activatePlanBtn'))
                window.location.href = `/${lang}/payment/activatePlan?payment_intent_client_secret=${r.client_secret}`
            }

        }).fail(function(r){
            hideBtnLoading($('.activatePlanBtn'))
            $('.popupClose').addClass('none')
            $('.popupPage[page="activatePlan"]').text('').append(
                $('<div/>',{
                    class:'cR',
                    text:r.responseJSON.message
                })
            )
            setTimeout(function(){
                window.location.reload();
            },3000)
        })
    }

})
