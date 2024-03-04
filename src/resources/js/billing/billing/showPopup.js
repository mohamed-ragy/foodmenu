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
            $('.popupBody').text('').append(
                $('<div/>',{class:'',html:texts.refundConfirmMsg.replace(':balance:',(parseFloat(window.website.balance/100).toFixed(2)))}),
                $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                    $('<button/>',{class:'btn btn-cancel mie-10 popupClose',text:texts.cancel}),
                    $('<button/>',{class:'btn',id:'refundConfirm'}).append(
                        $('<div/>',{class:'btnTxt',text:texts.refund}),
                        $('<div/>',{class:'btnLoading'})
                    )
                )
            )
        break;
        case 'calc_update_subscription':
            key.action == 'upgrade' ? $('#popupHeadTitle').text(texts.upgrade) :
            key.action == 'downgrade' ? $('#popupHeadTitle').text(texts.downgrade) :
            key.action == 'selectPlan' ? $('#popupHeadTitle').text(texts.calc_update_subscription) : null;
            let btnTxt = texts.confirm;
            key.action == 'upgrade' ?  btnTxt = texts.upgrade :
            key.action == 'downgrade' ?  btnTxt = texts.downgrade :
            key.action == 'selectPlan' ?  btnTxt = texts.confirm : null;

            if(key.invoice.ending_balance < 0){key.invoice.ending_balance = key.invoice.ending_balance * -1}
            if(key.invoice.starting_balance < 0){key.invoice.starting_balance = key.invoice.starting_balance * -1}
            let updatePlanTxt = texts.updatePlanTxt1;
            if(window.website.subscription_status == 'trialing'){updatePlanTxt = texts.updatePlanTxt2}
            $('.popupBody').text('').append(
                $('<div/>',{class:'mxw700',text:updatePlanTxt}),
                $('<table/>',{class:'upgradeInvoice fs08 w100p mxw500 mXa mT20 br5'}).append(
                    $('<tr/>',{class:'w100p'}).append(
                        $('<td/>',{class:'bold taS pie-10 pY3 brdrB2',text:texts.invoice.description}),
                        $('<td/>',{class:'bold taE pis-10 pY3 brdrB2',text:texts.invoice.amount}),
                    )
                ),
                $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                    $('<button/>',{class:'btn btn-cancel popupClose mie-10',text:texts.cancel}),
                    $('<button/>',{class:'btn',id:'updateSubscriptionBtnConfirm',planName:key.planName}).append(
                        $('<div/>',{class:'btnTxt',text:btnTxt}),
                        $('<div/>',{class:'btnLoading'})
                    ),
                ),
                $('<div/>',{class:'updateSubscriptionMsg w100p taE'})
            )
            for(const key2 in key.invoice.lines.data){
                let item = key.invoice.lines.data[key2];
                $('.upgradeInvoice').append(
                    $('<tr/>',{class:'w100p '}).append(
                        $('<td/>',{class:'taS pie-10 pY3',text:item.description}),
                        $('<td/>',{class:'taE pis-10 pY3',text:'$'+(item.amount/100).toFixed(2)}),
                    )
                )
            }
            $('.upgradeInvoice').append(
                $('<tr/>',{class:'w100p '}).append(
                    $('<td/>',{class:'taS pY3 bold',text:texts.invoice.total}),
                    $('<td/>',{class:'taE pY3 bold',text:'$'+(key.invoice.total/100).toFixed(2)}),
                )
            )
            $('.upgradeInvoice').append(
                $('<tr/>',{class:'w100p'}).append(
                    $('<td/>',{class:'taS pie-10 ',text:''}),
                    $('<td/>',{class:'taE pis-10 ',text:''}).append(
                        $('<div/>',{class:'w100p row alnS jstfySB brdrT1 mT10'}).append(
                            $('<div/>',{text:texts.invoice.amountDue,class:'bold tnw mie-5'}),
                            $('<div/>',{text:'$'+(key.invoice.amount_due/100).toFixed(2),class:'bold mis-5'}),
                        )
                    ),
                ),
                $('<tr/>',{class:'w100p'}).append(
                    $('<td/>',{class:'taS pie-10 ',text:''}),
                    $('<td/>',{class:'taE pis-10 ',text:''}).append(
                        $('<div/>',{class:'w100p row alnS jstfySB'}).append(
                            $('<div/>',{text:texts.invoice.startingBalance,class:'bold tnw mie-5'}),
                            $('<div/>',{text:'$'+(key.invoice.starting_balance/100).toFixed(2),class:'bold mis-5'}),
                        )
                    ),
                ),
                $('<tr/>',{class:'w100p'}).append(
                    $('<td/>',{class:'taS pie-10 ',text:''}),
                    $('<td/>',{class:'taE pis-10 ',text:''}).append(
                        $('<div/>',{class:'w100p row alnS jstfySB'}).append(
                            $('<div/>',{text:texts.invoice.endingBalance,class:'bold tnw mie-5'}),
                            $('<div/>',{text:'$'+(key.invoice.ending_balance/100).toFixed(2),class:'bold mis-5'}),
                        )
                    ),
                ),
            )
        break;
        case 'update_subscription':

            if(Object.keys(window.website.paymentMethods).length < 1){
                $('.popupBody').text('').append(
                    $('<div/>',{text:texts.cantUpdatePlanNoPayment}),
                    $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                        $('<button/>',{class:'btn btn-cancel popupClose mie-10',text:texts.gotit}),
                        $('<button/>',{class:'btn openPopup',popup:'add_payment_method',text:texts.add_payment_method})
                    )
                )
                $('#popupHeadTitle').text(texts.error)
            }else{
                key.action == 'upgrade' ? $('#popupHeadTitle').text(texts.upgradePlan) :
                key.action == 'downgrade' ? $('#popupHeadTitle').text(texts.downgradePlan) :
                key.action == 'selectPlan' ? $('#popupHeadTitle').text(texts.selectPlan) : null;
                let btnTxt = texts.changePlan;
                key.action == 'upgrade' ? btnTxt = texts.upgrade :
                key.action == 'downgrade' ? btnTxt = texts.downgrade :
                key.action== 'selectPlan' ? btnTxt = texts.selectPlan : null;
                
                $('.popupBody').text('').append(
                    $('<div/>',{class:'loading_L vV'})
                )

                draw_calc_update_subscription(key.planName,key.billedYearly,key.action)
            }
        break;
        case 'plan_changed':
            $('.popupBody').text('').append(
                $('<div/>',{class:'msgBox_green'}).append(
                    $('<div/>',{class:'ico-success cG fs205 mB20'}),
                    $('<div/>',{text:texts.planChangedMsg})
                ),
                $('<div/>',{class:'row alnC jstfyE'}).append(
                    $('<button/>',{class:'btn openPopup',popup:'activate_plan',text:texts.activate_plan}),
                )
            )
        break;
        case 'change_plan_failed':
            let downgradeFail = texts.downgradeFail1;
            if(Object.keys(key.errors).length > 1 ){
                downgradeFail = texts.downgradeFail2;
            }
            $('.popupBody').text('').append(
                $('<div/>',{class:'fs101',html:`${downgradeFail}`}),
                $('<ul/>',{class:'mxw700 fs09',id:'downgradeReasonsList'}),
                $('<div/>',{class:'row alnC jstfyE mT20'}).append(
                    $('<button/>',{class:'btn btn-cancel popupClose',text:texts.gotit})
                )
            )
            draw_Change_plan_failed(key)

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
