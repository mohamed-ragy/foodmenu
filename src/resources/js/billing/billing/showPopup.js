showPopup = function(popup,key){
    popup != 'login' ? $('#popupHeadTitle').text(texts[popup]) : null;
    $('.popupContainer').removeClass('none');
    $('.popupBody').removeClass('none');
    $('.payment_gateway').addClass('none')
    $('.popupClose').removeClass('none');
    switch(popup){
        case 'login':
            $('.popupClose').addClass('none');

        break;
        case 'refund':

        break;
        case 'cancel_subscription':
            $('.popupBody').text('').append(
                    $('<div/>',{class:'fs102 bold',text:texts.cancelSubscriptionPopupTxt2}), 
                    $('<ul/>',{class:'mT5'}).append(
                        $('<li/>',{text:texts.cancelSubscriptionPopupTxt3}),
                        $('<li/>',{text:texts.cancelSubscriptionPopupTxt4}),
                        $('<li/>',{text:texts.cancelSubscriptionPopupTxt5}),
                    ),
                    $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                        $('<button/>',{class:'btn btn-delete mie-10 openPopup',popup:'cancel_subscription_confirm',text:texts.cancel_subscription}),
                        $('<button/>',{class:'btn btn-cancel popupClose',text:texts.keepMySubscription})
                    ),
            )
        break;
        case 'cancel_subscription_confirm':
            $('.popupBody').text('').append(
                $('<div/>',{class:'mxw400 taC',text:texts.cancelSubscriptionPopupTxt6}),
                $('<div/>',{class:'inputTextContainer w100p'}).append(
                    $('<div/>',{class:'inputTextIcon'}).append($('<span/>',{class:'ico-password'})),
                    $('<input/>',{class:'inputText',type:'password',id:'cancel_subscription_password',placeholder:texts.password})
                ),
                $('<button/>',{class:'btn btn-delete mie-10 btn w100p pY5 mB10',id:'cancel_subscription_btn'}).append(
                    $('<div/>',{class:'btnTxt',text:texts.cancel_subscription}),
                    $('<div/>',{class:'btnLoading'})
                ),
                $('<div/>',{class:'cancelSubscriptionMessage taC w100p'})
            )
            
        break;
        case 'activate_plan':
            if(Object.keys(window.website.paymentMethods).length == 0){
                $('.popupBody').addClass('none');
                $('.payment_gateway').removeClass('none')
                $('#payment-form_loading').removeClass('none').addClass('vV')
                $('#payment-form').addClass('none')
                $('#paymentFormTxt').text(texts.pay)
                window.payment_return_url = 'activate_plan';
                $.ajax({
                    url:'/api',
                    type:'post',
                    data:{
                        _token:$('meta[name="csrf-token"]').attr('content'),
                        activate_plan:true,
                    },success:function(r){
                        drawPaymentGateWay(r.client_secret);
                        $('#payment-form').removeClass('none');
                        $('#payment-form_loading').addClass('none').removeClass('vV')
                    }
                })
            }else{
                $('.popupBody').text('');
                for(const key in window.website.paymentMethods){
                    let paymentMethod = window.website.paymentMethods[key];
                    $('.popupBody').append(
                        $('<div/>',{class:'mY10 row alnC jstfyC pointer activate_planPayment',paymentMethod_id:paymentMethod.id}).append(
                            $('<div/>',{class:'ico-check0 pointer activate_planPaymentCheck'}),
                            $('<img/>',{src:`/storage/imgs/billing_cards/${paymentMethod.brand}.png`,class:'w30 pX20'}),
                            $('<div/>',{class:'pX20 ',text:'•••• '+paymentMethod.last4}),
                        )
                    )
                }
                $('.popupBody').append(
                    $('<div/>',{class:'row alnC jstfyE w100p mT40 mB10'}).append(
                        $('<button/>',{class:'btn activate_planBtn'}).append(
                            $('<div/>/',{class:'btnTxt',text:texts.activate_plan}),
                            $('<div/>',{class:'btnLoading'})
                        )
                    ),
                    $('<div/>',{class:'activate_planMsg'})
                )
            }
        break;
        case 'retry_plan_payment':
            if(window.website.subscription_status != 'past_due' && window.website.subscription_status != 'incomplete'){return;}
            if(Object.keys(window.website.paymentMethods).length == 0){
                $('.popupBody').addClass('none');
                $('.payment_gateway').removeClass('none')
                $('#payment-form_loading').removeClass('none').addClass('vV')
                $('#payment-form').addClass('none')
                $('#paymentFormTxt').text(texts.pay)
                window.payment_return_url = 'activate_plan';
                $.ajax({
                    url:'/api',
                    type:'post',
                    data:{
                        _token:$('meta[name="csrf-token"]').attr('content'),
                        getLastInvoice:true,
                    },success:function(r){
                        drawPaymentGateWay(r.lastInvoice.payment_intent.client_secret);
                        $('#payment-form').removeClass('none');
                        $('#payment-form_loading').addClass('none').removeClass('vV')
                    }
                })
        
            }else{
                $('.popupClose').addClass('none');
                $('.popupBody').text('').append(
                    $('<div/>',{class:'loading_L vV mB20 retry_plan_payment_loading'}),
                    $('<div/>',{class:'retry_plan_payment_msg'}),
                )
                $.ajax({
                    url:'/api',
                    type:'post',
                    data:{
                        _token:$('meta[name="csrf-token"]').attr('content'),
                        retryPlanPayment:true,
                    },success:function(r){
                        $('.retry_plan_payment_loading').addClass('none')
                        if(r.retryPlanPaymentStatus == 1){
                            window.location.href = `/${lang}/payment/retry_plan_payment?payment_intent_client_secret=${r.payment_intent.client_secret}`
                        }
                    }
                }).fail(function(r){
                    $('.retry_plan_payment_loading').addClass('none')
                    $('.retry_plan_payment_msg').addClass('cR').text(r.responseJSON.message)
                    $('.popupBody').append(
                        $('<div/>',{class:'row alnC jstfyE w100p mT20'}).append(
                            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.gotit})
                        )
                    )
                })
            }
        break;
        case 'add_payment_method':
            $('.popupBody').addClass('none');
            $('.payment_gateway').removeClass('none')
            $('#payment-form_loading').removeClass('none').addClass('vV')
            $('#payment-form').addClass('none')
            $('#paymentFormTxt').text(texts.confirm)
            window.payment_return_url = 'add_payment_method';
            $.ajax({
                url:'/api',
                type:'post',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    createPaymentIntent:true,
                },success:function(r){
                    drawPaymentGateWay(r.client_secret);
                    $('#payment-form').removeClass('none');
                    $('#payment-form_loading').addClass('none').removeClass('vV')
                }
            })
        break;
        case 'delete_payment_method':
            let paymentMethod = window.website.paymentMethods.find(item=>item.id == key);
            $('.popupBody').text('').append(
                $('<div/>',{text:texts.deletePaymentConfirmMsg}),
                $('<div/>',{class:'mY20 row alnC jstfyC'}).append(
                    $('<td/>',{class:'pX10'}).append(
                        $('<img/>',{src:`/storage/imgs/billing_cards/${paymentMethod.brand}.png`,class:'w30'}),
                    ),
                    $('<td/>',{class:'pX10 ',text:'•••• '+paymentMethod.last4}),
                    $('<td/>',{class:'pX10  none-720',text:`${texts.expires} ${paymentMethod.exp_month.toString().padStart(2, '0')}/${paymentMethod.exp_year}`}),
                ),
                $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                    $('<button/>',{class:'btn btn-cancel popupClose mie-10',text:texts.cancel}),
                    $('<button/>',{class:'btn btn-delete',id:'delete_payment_method_confirm',paymentMethod_id:paymentMethod.id}).append(
                        $('<div/>',{class:'btnTxt',text:texts.delete}),
                        $('<div/>',{class:'btnLoading'}),
                    ),
                )
            )
        break;
    }
}

closePopup = function(){
    $('.popupContainer').addClass('none')
    $('#popupHeadTitle').text('')
    $('.popupBody').text('')
}
$('html,body').on('click','.popupClose',function(e){
    e.stopImmediatePropagation();
    closePopup();
})
$('html,body').on('click','.openPopup',function(e){
    e.stopImmediatePropagation();
    showPopup($(this).attr('popup'),$(this).attr('key'))
})
