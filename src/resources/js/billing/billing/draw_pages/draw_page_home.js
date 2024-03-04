draw_page_home = function(){
    $('.page').text('').append(
        $('<div/>',{class:'w100p',id:'current_plan'}),
        $('<div/>',{class:'w100p mY100',id:'payment_methods'}),
        $('<div/>',{class:'w100p',id:'invoices'}),
    )
    draw_current_plan();
    draw_payment_methods();
    draw_invoices();
}

draw_current_plan = function(){
    let nextRenew = new Date(window.website.subscription_end_period * 1000);
    nextRenew = nextRenew.toLocaleString(window.lang,{ month: 'long', day: 'numeric',year:'numeric'});
    $('#current_plan').append(
        $('<div/>',{text:texts.currentPlan,class:'bold mB10 brdrBottomS pB10 w100p'}),
        $('<div/>',{class:'mT10 row alnC jstfyS'}).append(
            $('<span/>',{class:'fs104 bold',text:texts[`plan-${window.website.plan}`]}),
            $('<span/>',{class:`planStatusBage planStatusBage_${window.website.subscription_status}`,text:texts[window.website.subscription_status]})
        ),
        $('<div/>',{class:'fs104',text:`$${window.website.plan_price}.00 ${window.website.billingPeriod == 'year' ? texts.perYear : window.website.billingPeriod == 'month' ?  texts.perMonth : null}`}),
    )
    if(window.website.subscription_status == 'trialing'  || window.website.subscription_status == 'active'){
        $('#current_plan').append(
            $('<div/>',{class:'fs09',text:`${texts.renewOn} ${nextRenew}`}),
            $('<span/>',{class:'pointer fs08 c_white-10 openPopup hvr_c_txt1 openPage',page:'change_plan',}).append(
                $('<span/>',{class:'',text:texts.changePlan})
            ),
            $('<span/>',{class:'mX5 c_white-10',text:'|'}),
            $('<span/>',{class:'pointer fs08 c_white-10 openPopup hvr_c_txt1 openPopup',popup:'cancel_subscription',}).append(
                $('<span/>',{class:'',text:texts.cancel_subscription})
            ),
        )
    }else if(window.website.subscription_status == 'incomplete_expired'
        || window.website.subscription_status == 'canceled'
        || window.website.subscription_status == 'unpaid'
        || window.website.subscription_status == 'paused'
    ){
        $('#current_plan').append(
            $('<span/>',{class:'pointer fs08 c_white-10 openPopup hvr_c_txt1 openPage',page:'change_plan',}).append(
                $('<span/>',{class:'',text:texts.changePlan})
            ),
            $('<button/>',{text:texts.activate_plan,class:'btn updatePlanBtn openPopup',popup:'activate_plan'}),
        )
    }else if(window.website.subscription_status == 'past_due'){
        $('#current_plan').append(
            $('<button/>',{class:'btn updatePlanBtn openPopup',popup:'retry_plan_payment'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.retry_plan_payment})
            ),
        )
    }else if(window.website.subscription_status == 'incomplete'){
        $('#current_plan').append(
            $('<button/>',{class:'btn updatePlanBtn openPopup',popup:'retry_plan_payment'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.retry_plan_payment})
            ),
        )
    }
}
draw_payment_methods = function(){
    $('#payment_methods').text('').append(
        $('<div/>',{text:texts.paymentMethods,class:'bold mB10 pB10 brdrBottomS w100p'}),
        $('<table/>',{id:'payment_methods_container',class:'paymentMethodsContainer'}),
        $('<div/>',{class:'m10 pointer fs09 c_white-10 openPopup hvr_c_txt1 openPopup',popup:'add_payment_method',}).append(
            $('<span/>',{class:'ico-plus fs07 pie-5'}),
            $('<span/>',{class:'',text:texts.add_payment_method})
        ),

    );

    if(Object.keys(window.website.paymentMethods).length == 0){
        if(window.website.subscription_status == 'trialing'  || window.website.subscription_status == 'active' || window.website.subscription_status == 'past_due' || window.website.subscription_status == 'incomplete'){
            $('#payment_methods_container').append(
                $('<div/>',{class:'msgBox_orange'}).append(
                    $('<div/>',{class:'ico-warning fs205 mB10'}),
                    $('<div/>',{class:'',text:texts.pleaseAddPaymentMethod})
                )
            )
        }
    }

    for(const key in window.website.paymentMethods){
        let paymentMethod = window.website.paymentMethods[key];
        let defaultElem = $('<span/>',{class:'set_Default_payment_method ico-check0 fs08 mX10 pointer',tooltip:texts.setAsDefault});
        let deletePaymentMethodElem = $('<td/>',{}).append(
            $('<div/>',{class:'ico-close delete_payment_method pointer fs07 openPopup',popup:'delete_payment_method',key:paymentMethod.id,tooltip:texts.delete_payment_method})
        );
        let setDefaultElemClass = '';
        if(window.website.subscription_status == 'canceled' || window.website.subscription_status == 'incomplete_expired'){
            setDefaultElemClass = 'none';
        }
        if(paymentMethod.is_default){
            defaultElem = $('<span/>',{class:'pY1 pX8 mX5 bgc_white-3 fs07 br5',text:texts.default})
            deletePaymentMethodElem = $('<td/>',{class:'ico-close c_white-5 fs07 p5',tooltip:texts.cantRemovePaymentMethod});
        }

        $('#payment_methods_container').append(
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
}
draw_invoices = function(){
    $('#invoices').text('').append(
        $('<div/>',{text:texts.invoiceHistory,class:'bold mB10 pB10 brdrBottomS w100p'}),
        $('<table/>',{id:'invoicesContainer',class:'invoicesContainer '}),
        $('<div/>',{class:'m10 pointer fs09 c_white-10 loadMoreInvoices hvr_c_txt1'}).append(
            $('<div/>',{class:''}).append(
                $('<span/>',{class:'ico-down fs08 pie-7'}),
                $('<span/>',{class:'',text:texts.loadMore}),
            ),
            $('<div/>',{class:'loading mX20 mY10 none vV'}),
        ),
    );
    for(const key in window.website.lastInvoices){
        let invoice = window.website.lastInvoices[key];
        drawInvoice(invoice);


    }

    if(window.website.lastInvoices.length < window.website.invoices_count){
        $('.loadMoreInvoices').removeClass('none')
    }else{
        $('.loadMoreInvoices').addClass('none')
    }
}

drawInvoice = function(invoice){
    let invoice_created_at = new Date(invoice.created_at)
    let invoiceStatus = '';
    switch(invoice.status){
        case 'draft':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_gray',text:texts[invoice.status]});
        break;
        case 'open':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_orange',text:texts[invoice.status]});
        break;
        case 'paid':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_green',text:texts[invoice.status]});
        break;
        case 'void':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_red',text:texts[invoice.status]});
        break;
        case 'uncollectible':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_red',text:texts[invoice.status]});
        break;
    }
    invoice_created_at = new Date(invoice.created* 1000).toLocaleString(lang,{year:'numeric', month: 'short', day: 'numeric'});
    $('#invoicesContainer').append(
        $('<tr/>',{class:'invoiceContainer',created:invoice.created}).append(
            $('<td/>',{class:'pY10 pX10 ellipsis',text:invoice_created_at}),
            $('<td/>',{class:'pY10 pX10',text:`$${parseFloat(invoice.amount_due/100).toFixed(2)}`}),
            $('<td/>',{class:'pY10 pX10'}).append(invoiceStatus),
            $('<td/>',{class:'pY10 pX10'}).append(
                $('<a/>',{class:'ico-open hvr-tdNone c_txt1 pointer',href:`/${lang}/invoice/${invoice.id}`,target:'_blank'})
            ),
        ),
    )
}
