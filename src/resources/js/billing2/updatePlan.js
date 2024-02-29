setUpdatePlans = function(){
    $('.planCard').removeClass('none');
    if(data.subscription_status == 'incomplete_expired'
        || data.subscription_status == 'canceled'
        || data.subscription_status == 'unpaid'
        || data.subscription_status == 'trialing'
    ){
        $('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan)
    }else if(data.subscription_status == 'active' || data.subscription_status == 'past_due' || data.subscription_status == 'incomplete'){
        if(data.billingPeriod == 'month'){
            if($('#billedYearly').prop('checked')){
                $('.planCard-small').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
                $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
                $('.planCard-large').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
                $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
            }else{
                switch(data.currentPlan){
                    case 'small':
                        $('.planCard-small').addClass('none');
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'standard':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').addClass('none');
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'large':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-large').addClass('none');
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'premium':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-premium').addClass('none');
                    break;
                }
            }
        }else if(data.billingPeriod == 'year'){
            switch(data.currentPlan){
                case 'small':
                    $('.planCard-small').addClass('none');
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'standard':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').addClass('none');
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'large':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-large').addClass('none');
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'premium':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-premium').addClass('none');
                break;
            }
        }
    }

}
for(const key in data.plans){
    const plan = data.plans[key];
    let productOptionsTxt; let websiteLangsTxt; let promocodeTxt; let subAccountsTxt;
    let deliveryAccountsTxt; let specialDomainNameTxt; let selectedPlanIcoCheck;

    plan.productOptions == 1 ? productOptionsTxt = plansTxt.productOption : productOptionsTxt = plansTxt.productOptions;
    plan.websiteLangs == 1 ? websiteLangsTxt = plansTxt.websiteLang : websiteLangsTxt = plansTxt.websiteLangs;
    plan.promocodes == 1 ? promocodeTxt = plansTxt.promocode : promocodeTxt = plansTxt.promocodes;
    plan.subAccounts == 1 ? subAccountsTxt = plansTxt.subAccount : subAccountsTxt = plansTxt.subAccounts;
    plan.deliveryAccounts == 1 ? deliveryAccountsTxt = plansTxt.deliveryAccount : deliveryAccountsTxt = plansTxt.deliveryAccounts;
    plan.specialDomainName ? specialDomainNameTxt = plansTxt.restaurantDotCom : specialDomainNameTxt = plansTxt.subdomain;
    plan.name == data.currentPlan ? selectedPlanIcoCheck = 'ico-check1' : selectedPlanIcoCheck = 'ico-check0';

    $('.plansCards').append(
        $('<div/>',{
            class:`planCard planCard-${plan.name}`,
            key:plan.name,
        }).append(
            // $('<div/>',{class:`${selectedPlanIcoCheck} planCardCheck`}),
            $('<div/>',{class:'planCardHead '}).append(
                $('<div/>',{class:'bold fs103',text:plansTxt[plan.name]}),
                $('<div/>',{class:'bold fs103 planPerMonthPrice',text:`$${plan.monthlyCost}${plansTxt.perMonth}`}),
                $('<div/>',{class:'bold fs103 none planPerYearPrice',html:`$${plan.yearlyCost}${plansTxt.perYear} `}),
                $('<div/>',{class:'none planPerYearPrice_save cO bold',text:`${plansTxt.saveMonry} $${((plan.monthlyCost * 12) - plan.yearlyCost)}`})
                // $('<div/>',{class:'cO bold',text:'2 months Free Triel (Beta verison)'})
            ),
            $('<div/>',{class:'column alnS jstfyS p10 fs09 taS'}).append(
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-products fs101 mT-4 planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.products} ${plansTxt.products}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-categories planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.categories} ${plansTxt.categories}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-list fs085 planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.productOptions} ${productOptionsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-languages planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.websiteLangs} ${websiteLangsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-promo_codes planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.promocodes} ${promocodeTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-sub_accounts planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.subAccounts} ${subAccountsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-delivery_accounts planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.deliveryAccounts} ${deliveryAccountsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-images planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.storage}${plansTxt.storage}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-link planCardItemsIcon'}),
                    $('<div/>',{text:`${specialDomainNameTxt}`})
                ),
            ),
            $('<button/>',{class:'btn w100p-20 alnsC updateSubscriptionBtn tnw',planName:plan.name}).append(
                $('<div/>',{class:'btnTxt'}),
                $('<div/>',{class:'btnLoading'})
            )
        )
    )
}
if(data.billingPeriod == 'year'){
    $('#billedYearly').prop('checked',true);
    $('.planPerMonthPrice').addClass('none');
    $('.planPerYearPrice').removeClass('none');
    if(data.subscription_status == 'active' || data.subscription_status == 'past_due' || data.subscription_status == 'incomplete'){
        $('#billedYearly').closest('.checkboxlabel').addClass('none');
    }else{
        $('.planPerYearPrice_save').removeClass('none');
        $('#billedYearly').on('click',function(){
            if($('#billedYearly').prop('checked')){
                $('.planPerMonthPrice').addClass('none');
                $('.planPerYearPrice').removeClass('none');
                $('.planPerYearPrice_save').removeClass('none');
            }else{
                $('.planPerMonthPrice').removeClass('none');
                $('.planPerYearPrice').addClass('none');
                $('.planPerYearPrice_save').addClass('none');
            }
            setUpdatePlans();
        });
    }
}else if(data.billingPeriod == 'month'){
    $('#billedYearly').prop('checked',false);
    $('.planPerMonthPrice').removeClass('none');
    $('.planPerYearPrice').addClass('none');
    $('#billedYearly').on('click',function(){
        if($('#billedYearly').prop('checked')){
            $('.planPerMonthPrice').addClass('none');
            $('.planPerYearPrice').removeClass('none');
            $('.planPerYearPrice_save').removeClass('none');
        }else{
            $('.planPerMonthPrice').removeClass('none');
            $('.planPerYearPrice').addClass('none');
            $('.planPerYearPrice_save').addClass('none');
        }
        setUpdatePlans();
    });
}
drawDowngradeFailReasons = function(errors,currentPlan,plan_request){
    let downgradeFail = texts.downgradeFail1;
    if(Object.keys(errors).length > 1 ){
        downgradeFail = texts.downgradeFail2;
    }
    $('.popupPage[page="updateSubscription"]').text('').append(
        $('<div/>',{class:'fs101',html:`${downgradeFail}`}),
        $('<ul/>',{class:'mxw700 fs09',id:'downgradeReasonsList'}),
        $('<div/>',{class:'btnContainer'}).append(
            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.gotit})
        )
    )
    for(const key in errors){
        switch(key){
            case 'subAccounts':
                let subAccountsTxt = texts.downgradeFail_subaccount;
                subAccountsTxt = subAccountsTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                subAccountsTxt = subAccountsTxt.replace('*max*',`${errors[key].plan_request}`)
                subAccountsTxt = subAccountsTxt.replace('*created*',`${errors[key].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:subAccountsTxt})
                )
            break;
            case 'categories':
                let categoriesTxt = texts.downgradeFail_categories;
                categoriesTxt = categoriesTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                categoriesTxt = categoriesTxt.replace('*max*',`${errors[key].plan_request}`)
                categoriesTxt = categoriesTxt.replace('*created*',`${errors[key].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:categoriesTxt})
                )
            break;
            case 'products':
                let productsTxt = texts.downgradeFail_products;
                productsTxt = productsTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                productsTxt = productsTxt.replace('*max*',`${errors[key].plan_request}`)
                productsTxt = productsTxt.replace('*created*',`${errors[key].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:productsTxt})
                )
            break;
            case 'productOptions':
                let productOptionsTxt;
                if(errors[key].productOptions_products <= 1){
                    productOptionsTxt = texts.downgradeFail_productOptions2;
                }else{
                    productOptionsTxt = texts.downgradeFail_productOptions1;
                    productOptionsTxt = productOptionsTxt.replace('*created*',`${errors[key].productOptions_products}`)
                }
                productOptionsTxt = productOptionsTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                productOptionsTxt = productOptionsTxt.replace('*max*',`${errors[key].plan_request}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:productOptionsTxt})
                )
            break;
            case 'specialDomainName':
                let specialDomainNameTxt = texts.downgradeFail_specialDomainName;
                specialDomainNameTxt = specialDomainNameTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)

                $('#downgradeReasonsList').append(
                    $('<li/>',{html:specialDomainNameTxt})
                )
            break;
            case 'storage':
                let storageTxt = texts.downgradeFail_storage;
                storageTxt = storageTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                storageTxt = storageTxt.replace('*max*',`${errors[key].plan_request.toFixed(2)}`)
                storageTxt = storageTxt.replace('*created*',`${errors[key].current.toFixed(2)}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:storageTxt})
                )
            break;
            case 'deliveryAccounts':
                let deliveryAccountsTxt = texts.downgradeFail_deliveryAccounts;
                deliveryAccountsTxt = deliveryAccountsTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                deliveryAccountsTxt = deliveryAccountsTxt.replace('*max*',`${errors[key].plan_request}`)
                deliveryAccountsTxt = deliveryAccountsTxt.replace('*created*',`${errors[key].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:deliveryAccountsTxt})
                )
            break;
            case 'websiteLangs':
                let websiteLangsTxt = texts.downgradeFail_websiteLangs;
                websiteLangsTxt = websiteLangsTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                websiteLangsTxt = websiteLangsTxt.replace('*max*',`${errors[key].plan_request}`)
                websiteLangsTxt = websiteLangsTxt.replace('*created*',`${errors[key].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:websiteLangsTxt})
                )
            break;
            case 'promocodes':
                let promocodesTxt = texts.downgradeFail_promocodes;
                promocodesTxt = promocodesTxt.replace('*plan*',`${texts[`plan-${plan_request}`]}`)
                promocodesTxt = promocodesTxt.replace('*max*',`${errors[key].plan_request}`)
                promocodesTxt = promocodesTxt.replace('*created*',`${errors[key].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:promocodesTxt})
                )
            break;
        }
    }
}
$('html,body').on('click','.updateSubscriptionBtn',function(e){
    e.stopImmediatePropagation();
    let billedYearly = $('#billedYearly').prop('checked');
    billedYearly ? billedYearly = 1 : billedYearly = 0;
    let planName = $(this).attr('planName');
    let thisBtn = $(this);
    if(
        data.subscription_status == 'incomplete_expired'
        ||data.subscription_status == 'canceled'
        ||data.subscription_status == 'unpaid'
        ||data.subscription_status == 'paused'
    ){
        showBtnLoading(thisBtn)
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changePlan:planName,
                billedYearly:billedYearly,
            },success:function(r){
                hideBtnLoading(thisBtn)
                if(r.changePlanState == 1){
                    // window.location.reload();
                    data.currentPlan = r.plan_request;
                    data.currentPlanPrice = r.currentPlanPrice;
                    drawCurrentPlan();
                    showPage('home')
                    showPopup('updateSubscription');
                    $('#popupHeadTitle').text(texts.planChanged);
                    $('.popupPage[page="updateSubscription"]').text('').append(
                        $('<div/>',{class:'m10 fs101',text:texts.planChangedMsg}),
                        $('<div/>',{class:'btnContainer'}).append(
                            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.gotit})
                        )
                    )

                }else if(r.changePlanState == 0){
                    showPopup('updateSubscription');
                    $('#popupHeadTitle').text(texts.error)
                    drawDowngradeFailReasons(r.errors,r.currentPlan,r.plan_request);
                }
            }
        })
        return;
    }
    showPopup('updateSubscription');
    if(Object.keys(data.paymentMethods).length < 1){
        $('.popupPage[page="updateSubscription"]').text('').append(
            $('<div/>',{text:texts.cantUpdatePlanNoPayment}),
            $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cancel}),
                $('<button/>',{class:'btn openPage',page:'addPaymentMethod',text:texts.add_payment_method})
            )
        )
        $('#popupHeadTitle').text(texts.error)
        return;
    }
    $('.popupPage[page="updateSubscription"]').text('').append(
        $('<div/>',{class:'loading_L vV'})
    )
    thisBtn.attr('action') == 'upgrade' ? $('#popupHeadTitle').text(texts.upgradePlan) :
    thisBtn.attr('action') == 'downgrade' ? $('#popupHeadTitle').text(texts.downgradePlan) :
    thisBtn.attr('action') == 'selectPlan' ? $('#popupHeadTitle').text(texts.selectPlan) : null;
    ;
    let btnTxt = texts.changePlan;
    $(this).attr('action') == 'upgrade' ? btnTxt = texts.upgrade :
    $(this).attr('action') == 'downgrade' ? btnTxt = texts.downgrade :
    thisBtn.attr('action') == 'selectPlan' ? btnTxt = texts.selectPlan : null;
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            calcUpdateSubscription:true,
            plan:planName,
            billedYearly:billedYearly,
        },success:function(r){
            if(r.actionValid == 1){
                if(r.invoice.ending_balance < 0){r.invoice.ending_balance = r.invoice.ending_balance * -1}
                if(r.invoice.starting_balance < 0){r.invoice.starting_balance = r.invoice.starting_balance * -1}
                let updatePlanTxt = texts.updatePlanTxt1;
                if(data.subscription_status == 'trialing'){updatePlanTxt = texts.updatePlanTxt2}
                $('.popupPage[page="updateSubscription"]').text('').append(
                    $('<div/>',{class:'mxw700',text:updatePlanTxt}),
                    $('<table/>',{class:'upgradeInvoice fs08 w100p mxw500 mXA mT20 shdw2 br5'}).append(
                        $('<tr/>',{class:'w100p'}).append(
                            $('<td/>',{class:'bold taS pX10 ',text:texts.invoice.description}),
                            $('<td/>',{class:'bold taE pX10 ',text:texts.invoice.amount}),
                        )
                    ),
                    $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                        $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cancel}),
                        $('<button/>',{class:'btn',id:'updateSubscriptionBtnConfirm',planName:planName}).append(
                            $('<div/>',{class:'btnTxt',text:btnTxt}),
                            $('<div/>',{class:'btnLoading'})
                        ),
                    ),
                    $('<div/>',{class:'updateSubscriptionMsg w100p taE'})
                )
                for(const key in r.invoice.lines.data){
                    let item = r.invoice.lines.data[key];
                    $('.upgradeInvoice').append(
                        $('<tr/>',{class:'w100p '}).append(
                            $('<td/>',{class:'taS pX10 ',text:item.description}),
                            $('<td/>',{class:'taE pX10 ',text:'$'+(item.amount/100).toFixed(2)}),
                        )
                    )
                }
                $('.upgradeInvoice').append(
                    $('<tr/>',{class:'w100p '}).append(
                        $('<td/>',{class:'taS pX10 bold',text:texts.invoice.total}),
                        $('<td/>',{class:'taE pX10 bold',text:'$'+(r.invoice.total/100).toFixed(2)}),
                    )
                )
                $('.upgradeInvoice').append(
                    $('<tr/>',{class:'w100p'}).append(
                        $('<td/>',{class:'taS pX10 ',text:''}),
                        $('<td/>',{class:'taE pX10 ',text:''}).append(
                            $('<div/>',{class:'w100p row alnS jstfySB brdrT1 mT10'}).append(
                                $('<div/>',{text:texts.invoice.amountDue,class:'bold tnw mie-5'}),
                                $('<div/>',{text:'$'+(r.invoice.amount_due/100).toFixed(2),class:'bold mis-5'}),
                            )
                        ),
                    ),
                    $('<tr/>',{class:'w100p'}).append(
                        $('<td/>',{class:'taS pX10 ',text:''}),
                        $('<td/>',{class:'taE pX10 ',text:''}).append(
                            $('<div/>',{class:'w100p row alnS jstfySB'}).append(
                                $('<div/>',{text:texts.invoice.startingBalance,class:'bold tnw mie-5'}),
                                $('<div/>',{text:'$'+(r.invoice.starting_balance/100).toFixed(2),class:'bold mis-5'}),
                            )
                        ),
                    ),
                    $('<tr/>',{class:'w100p'}).append(
                        $('<td/>',{class:'taS pX10 ',text:''}),
                        $('<td/>',{class:'taE pX10 ',text:''}).append(
                            $('<div/>',{class:'w100p row alnS jstfySB'}).append(
                                $('<div/>',{text:texts.invoice.endingBalance,class:'bold tnw mie-5'}),
                                $('<div/>',{text:'$'+(r.invoice.ending_balance/100).toFixed(2),class:'bold mis-5'}),
                            )
                        ),
                    ),
                )
            }else if(r.actionValid == 0){
                drawDowngradeFailReasons(r.errors,r.currentPlan,r.plan_request);
            }else if(r.actionValid == 2){
                $('.popupPage[page="updateSubscription"]').text('').append(
                    $('<div/>',{text:texts.updateSubscriptionLastInvoiceNotPaid})
                )
            }

        }
    })
})
$('html,body').on('click','#updateSubscriptionBtnConfirm',function(e){
    showBtnLoading($('#updateSubscriptionBtnConfirm'));
    let planName = $(this).attr('planName');
    let billedYearly = $('#billedYearly').prop('checked');
    billedYearly ? billedYearly = 1 : billedYearly = 0;
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            updateSubscription:true,
            planName:planName,
            billedYearly:billedYearly,
        },success:function(r){
            if(r.updateSubscriptionStatus == 1){
                window.location.href = `/${lang}/payment/updateSubscription`
            }
        }
    }).fail(function(r){
        hideBtnLoading($('#updateSubscriptionBtnConfirm'));
        $('.updateSubscriptionMsg').removeClass().addClass('cR updateSubscriptionMsg w100p taE').text(r.responseJSON.message)
    })
})
