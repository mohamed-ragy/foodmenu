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
                window.location.href = `/${lang}/payment/activate_plan?payment_intent_client_secret=${r.client_secret}`
            }

        }).fail(function(r){
            hideBtnLoading($('.activate_planBtn'))
            $('.popupClose').addClass('none')
            $('.popupBody').text('').append(
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
