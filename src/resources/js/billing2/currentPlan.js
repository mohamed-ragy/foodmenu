drawCurrentPlan = function(){
    let nextRenew = new Date(data.subscription_end_period * 1000);
    nextRenew = nextRenew.toLocaleString(lang,{ month: 'long', day: 'numeric',year:'numeric'})
    $('#newRenewDate').text(nextRenew)
    $('#currentPlan').text('').append(
        $('<div/>',{text:texts.currentPlan,class:'bold mB10 pB10 brdrBottomS w100p'}),
        $('<div/>',{class:'mT10 row alnC jstfyS'}).append(
            $('<span/>',{class:'fs104 bold',text:texts[`plan-${data.currentPlan}`]}),
            $('<span/>',{class:`planStatusBage planStatusBage_${data.subscription_status}`,text:texts[data.subscription_status]})
        ),
        $('<div/>',{class:'fs104',text:`$${data.currentPlanPrice}.00 ${data.billingPeriod == 'year' ? texts.perYear : data.billingPeriod == 'month' ?  texts.perMonth : null}`}),
    )


    if(data.subscription_status == 'trialing'  || data.subscription_status == 'active'){
        $('#currentPlan').append(
            $('<div/>',{class:'fs09',text:`${texts.renewOn} ${nextRenew}`}),
            // $('<button/>',{text:texts.changePlan,class:'btn updatePlanBtn openPage',page:'updatePlan'}),
            $('<a/>',{text:texts.changePlan,class:'pointer underline fs08  c-placeholder2 openPage',page:'updatePlan'}),
            $('<span/>',{class:'mX5 c-placeholder2',text:'|'}),
            $('<a/>',{text:texts.cancel_subscription,class:'pointer underline fs08 c-placeholder2 openPage',page:'cancelSubscription'}),
        )
    }else if(data.subscription_status == 'incomplete_expired'
        || data.subscription_status == 'canceled'
        || data.subscription_status == 'unpaid'
        || data.subscription_status == 'paused'
    ){
        $('#currentPlan').append(
            $('<a/>',{text:texts.changePlan,class:'pointer underline fs08 mX5 c-placeholder2 openPage',page:'updatePlan'}),
            $('<button/>',{text:texts.activate_plan,class:'btn updatePlanBtn openPage',page:'activate_plan'}),
        )
    }
    else if(data.subscription_status == 'past_due'){
        $('#currentPlan').append(
            $('<button/>',{class:'btn updatePlanBtn retryPlanPayment'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.retryPlanPayment})
            ),
            $('<div/>',{class:'retryPlanPaymentMessage'}),
        )
    }
    else if(data.subscription_status == 'incomplete'){
        $('#currentPlan').append(
            $('<button/>',{class:'btn updatePlanBtn retryPlanPayment'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.retryPlanPayment})
            ),
            $('<div/>',{class:'retryPlanPaymentMessage'}),
        )
    }

}

$('html,body').on('click','.retryPlanPayment',function(e){
    e.stopImmediatePropagation();
    if(data.subscription_status != 'past_due' && data.subscription_status != 'incomplete'){return;}
    if(Object.keys(data.paymentMethods).length == 0){
        // $('.retryPlanPaymentMessage').addClass('cR').text(texts.cantretryNoPayment)
        // return;
        showPopup('paymentForm');
        $('#paymentFormTxt').text(texts.pay)
        $('#popupHeadTitle').text(texts.retryPlanPayment)
        window.payment_return_url = 'activate_plan';
        $('#payment-form_loading').removeClass('none').addClass('vV')
        $('#payment-form').addClass('none')
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
        showBtnLoading($('.retryPlanPayment'))
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                retryPlanPayment:true,
            },success:function(r){
                // hideBtnLoading($('.retryPlanPayment'))
                if(r.retryPlanPaymentStatus == 1){
                    window.location.href = `/${lang}/payment/retryPlanPayment?payment_intent_client_secret=${r.payment_intent.client_secret}`
                }
            }
        }).fail(function(r){
            hideBtnLoading($('.retryPlanPayment'))
            $('.retryPlanPaymentMessage').addClass('cR').text(r.responseJSON.message)
        })
    }

})
