activate_plan = function(){
    $('.popupPage[page="activate_plan"]').text('');
    if(Object.keys(data.paymentMethods).length == 0){
        showPopup('paymentForm');
        $('#paymentFormTxt').text(texts.activate_plan)
        window.payment_return_url = 'activate_plan';
        $('#payment-form_loading').removeClass('none').addClass('vV')
        $('#payment-form').addClass('none')
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                activate_plan:true,
            },success:function(r){
                drawPaymentGateWay(r.client_secret);
                window.payment_return_url = 'activate_plan';
                $('#payment-form').removeClass('none');
                $('#payment-form_loading').addClass('none').removeClass('vV')
            }
        })
    }else{
        for(const key in data.paymentMethods){
            let paymentMethod = data.paymentMethods[key];
            $('.popupPage[page="activate_plan"]').append(
                $('<div/>',{class:'mY10 row alnC jstfyC pointer activate_planPayment',paymentMethod_id:paymentMethod.id}).append(
                    $('<div/>',{class:'ico-check0 pointer activate_planPaymentCheck'}),
                    $('<img/>',{src:`/storage/imgs/billing_cards/${paymentMethod.brand}.png`,class:'w30 pX20'}),
                    $('<div/>',{class:'pX20 ',text:'•••• '+paymentMethod.last4}),
                )
            )
        }
        $('.popupPage[page="activate_plan"]').append(
            $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                $('<button/>',{class:'btn activate_planBtn'}).append(
                    $('<div/>/',{class:'btnTxt',text:texts.activate_plan}),
                    $('<div/>',{class:'btnLoading'})
                )
            ),
            $('<div/>',{class:'activate_planMsg'})
        )
    }
}
$('html,body').on('click','.activate_planPayment',function(e){
    e.stopImmediatePropagation();
    $('.activate_planPaymentCheck').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.activate_planPaymentCheck').removeClass('ico-check0').addClass('ico-check1')
})
$('html,body').on('click','.activate_planBtn',function(e){
    e.stopImmediatePropagation();
    let paymentMethod_id = null;
    $('.activate_planPayment').each(function(){
        if($(this).find('.activate_planPaymentCheck').hasClass('ico-check1')){
            paymentMethod_id = $(this).attr('paymentMethod_id')
        }
    })
    if(paymentMethod_id == null){
        $('.activate_planMsg').addClass('cR').text(texts.pleaseSelectPayment);
    }else{
        $('.activate_planMsg').removeClass('cR').text('');
        showBtnLoading($('.activate_planBtn'))
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                activate_planAndPay:true,
                paymentMethod_id:paymentMethod_id,
            },success:function(r){
                // hideBtnLoading($('.activate_planBtn'))
                window.location.href = `/${lang}/payment/activate_plan?payment_intent_client_secret=${r.client_secret}`
            }

        }).fail(function(r){
            hideBtnLoading($('.activate_planBtn'))
            $('.popupClose').addClass('none')
            $('.popupPage[page="activate_plan"]').text('').append(
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
