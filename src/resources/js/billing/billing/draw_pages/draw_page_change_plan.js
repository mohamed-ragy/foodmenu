draw_page_change_plan = function(){
    $('.page').text('').append(
        $('<div/>',{class:'pointer fs08 c_white-10 openPopup hvr_c_txt1 openPage',page:'home',}).append(
            $('<span/>',{class:'ico-left fs09 pie-3'}),
            $('<span/>',{class:'fs103',text:texts.back})
        ),
        drawSwitchBtn('',texts.billedYearly,'billedYearly','checkboxlabel alnsC bgc_white-1 mT20 ','','',false,null),
        $('<div/>',{id:'plansCards',class:'mT20 row alnC jstfyC wrap w100p'}).append(
            $('<div/>',{class:'planCardContainer'})
        )
    )
    if(window.website.billingPeriod == 'year'){
        if(window.website.subscription_status == 'active' || window.website.subscription_status == 'past_due' || window.website.subscription_status == 'incomplete'){
            $('.planPerYearPrice_save').addClass('none')
            $('#billedYearly').closest('.checkboxlabel').addClass('none');
        }
        $('#billedYearly').prop('checked',true);
    }else if(window.website.billingPeriod == 'month'){
        $('#billedYearly').prop('checked',false);
    }
    drawPlansCards();
}
drawPlansCards = function(){
    $('#plansCards').text('')
    for(const key in window.plans){
        let plan = window.plans[key];
        $('#plansCards').append(
            $('<div/>',{class:`planCardContainer planCard-${plan.name}`}).append(
                $('<div/>',{class:`ico-plan-${plan.name} plan-color fs5 cG mT30 mB10`}),
                $('<div/>',{class:'inter fs105 mT10 bold500 cG plan-color ',text:texts[`plan-${plan.name}`]}),
                $('<div/>',{class:'inter fs2 mT10 bold600 planPerMonthPrice',text:`$${plan.monthlyCost}.00`}),
                $('<div/>',{class:'inter fs2 mT10 bold600 planPerYearPrice',text:`$${plan.yearlyCost}.00`}),
                $('<div/>',{class:'mT0 bold500 fs102 planPerMonthPrice',text:texts.perMonth}),
                $('<div/>',{class:'mT0 bold500 fs102 planPerYearPrice',text:texts.perYear}),
                $('<div/>',{class:'inter fs105 mT10 bold600 planPerYearPrice_save plan-color cO',text:`${texts.saveMonry} $${((plan.monthlyCost * 12) - plan.yearlyCost)}`}),
                $('<table/>',{class:'w100p mT30 fs09'}).append(
                    // $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                    //     $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.initialSetup}),
                    //     $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:'$0'}),
                    // ),
                    // $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                    //     $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.commissionPerOrder}),
                    //     $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:'$0'}),
                    // ),
                    // $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                    //     $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.orderPerDay}),
                    //     $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:texts.unlimited}),
                    // ),
                    // $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                    //     $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.users}),
                    //     $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:texts.unlimited}),
                    // ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.categories}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:plan.categories}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.products}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:plan.products}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.productOptions}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:plan.categories}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.websiteLangs}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:plan.websiteLangs}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.promocodes}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:plan.promocodes}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.subAccounts}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:plan.subAccounts}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.deliveryAccounts}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:plan.deliveryAccounts}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw td_borderB pY5 taS',text:texts.storage}),
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:`${plan.storage} MB`}),
                    ),

                    $('<tr/>',{style:'border-bottom:1px solid black;'}).append(
                        $('<td/>',{class:'tnw pY5 taS',text:texts.domainName}),
                        $('<td/>',{class:'tnw pY5 taE bold',text:plan.specialDomainName  == 1 ? texts.restaurantDotCom : plan.specialDomainName  == 0 ? texts.subDomain : '' }),
                    ),
                ),
                $('<div/>',{class:'w100p'}).append(
                    $('<button/>',{class:'btn w100p fs101 pY5 mT20 updateSubscriptionBtn tnw',text:'',planName:plan.name,text:''}).append(
                        $('<div/>',{class:'btnTxt'}),
                        $('<div/>',{class:'btnLoading'})
                    )
                ),
            )
        )
    }
    setUpdatePlans();
}
setUpdatePlans = function(){
    if(window.website.subscription_status == 'incomplete_expired'
        || window.website.subscription_status == 'canceled'
        || window.website.subscription_status == 'unpaid'
        || window.website.subscription_status == 'trialing'
    ){
        $('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan)
    }else if(window.website.subscription_status == 'active' || window.website.subscription_status == 'past_due' || window.website.subscription_status == 'incomplete'){
        if(window.website.billingPeriod == 'month'){
            if($('#billedYearly').prop('checked') == 1){
                $('.planCard-small').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
                $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
                $('.planCard-large').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
                $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','selectPlan').find('.btnTxt').text(texts.selectPlan);
            }else{
                switch(window.website.plan){
                    case 'small':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action',null).find('.btnTxt').text(texts.currentPlan).prop('disabled',true);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'standard':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'large':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'premium':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    break;
                }
            }
        }else if(window.website.billingPeriod == 'year'){
            switch(window.website.plan){
                case 'small':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'standard':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'large':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'premium':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                break;
            }
        }

    }

    if($('#billedYearly').prop('checked') == true){
        $('.planPerMonthPrice').addClass('none');
        $('.planPerYearPrice').removeClass('none');
        if(window.website.billingPeriod == 'year'){
            if(window.website.subscription_status == 'active' || window.website.subscription_status == 'past_due' || window.website.subscription_status == 'incomplete'){
                $('.planPerYearPrice_save').addClass('none')
            }else{
                $('.planPerYearPrice_save').removeClass('none');
            }
        }
    }else if($('#billedYearly').prop('checked') == false){
        $('.planPerYearPrice_save').addClass('none')
        $('.planPerYearPrice').addClass('none');
        $('.planPerMonthPrice').removeClass('none');
    }
}
draw_Change_plan_failed = function(key){
    for(const key2 in key.errors){
        switch(key2){
            case 'subAccounts':
                let subAccountsTxt = texts.downgradeFail_subaccount;
                subAccountsTxt = subAccountsTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                subAccountsTxt = subAccountsTxt.replace(':max:',`${key.errors[key2].plan_request}`)
                subAccountsTxt = subAccountsTxt.replace(':created:',`${key.errors[key2].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:subAccountsTxt})
                )
            break;
            case 'categories':
                let categoriesTxt = texts.downgradeFail_categories;
                categoriesTxt = categoriesTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                categoriesTxt = categoriesTxt.replace(':max:',`${key.errors[key2].plan_request}`)
                categoriesTxt = categoriesTxt.replace(':created:',`${key.errors[key2].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:categoriesTxt})
                )
            break;
            case 'products':
                let productsTxt = texts.downgradeFail_products;
                productsTxt = productsTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                productsTxt = productsTxt.replace(':max:',`${key.errors[key2].plan_request}`)
                productsTxt = productsTxt.replace(':created:',`${key.errors[key2].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:productsTxt})
                )
            break;
            case 'productOptions':
                let productOptionsTxt;
                if(key.errors[key2].productOptions_products <= 1){
                    productOptionsTxt = texts.downgradeFail_productOptions2;
                }else{
                    productOptionsTxt = texts.downgradeFail_productOptions1;
                }
                productOptionsTxt = productOptionsTxt.replace(':created:',`${key.errors[key2].productOptions_products}`)
                productOptionsTxt = productOptionsTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                productOptionsTxt = productOptionsTxt.replace(':max:',`${key.errors[key2].plan_request}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:productOptionsTxt})
                )
            break;
            case 'specialDomainName':
                let specialDomainNameTxt = texts.downgradeFail_specialDomainName;
                specialDomainNameTxt = specialDomainNameTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)

                $('#downgradeReasonsList').append(
                    $('<li/>',{html:specialDomainNameTxt})
                )
            break;
            case 'storage':
                let storageTxt = texts.downgradeFail_storage;
                storageTxt = storageTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                storageTxt = storageTxt.replace(':max:',`${key.errors[key2].plan_request.toFixed(2)}`)
                storageTxt = storageTxt.replace(':created:',`${key.errors[key2].current.toFixed(2)}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:storageTxt})
                )
            break;
            case 'deliveryAccounts':
                let deliveryAccountsTxt = texts.downgradeFail_deliveryAccounts;
                deliveryAccountsTxt = deliveryAccountsTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                deliveryAccountsTxt = deliveryAccountsTxt.replace(':max:',`${key.errors[key2].plan_request}`)
                deliveryAccountsTxt = deliveryAccountsTxt.replace(':created:',`${key.errors[key2].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:deliveryAccountsTxt})
                )
            break;
            case 'websiteLangs':
                let websiteLangsTxt = texts.downgradeFail_websiteLangs;
                websiteLangsTxt = websiteLangsTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                websiteLangsTxt = websiteLangsTxt.replace(':max:',`${key.errors[key2].plan_request}`)
                websiteLangsTxt = websiteLangsTxt.replace(':created:',`${key.errors[key2].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:websiteLangsTxt})
                )
            break;
            case 'promocodes':
                let promocodesTxt = texts.downgradeFail_promocodes;
                promocodesTxt = promocodesTxt.replace(':plan:',`${texts[`plan-${key.plan_request}`]}`)
                promocodesTxt = promocodesTxt.replace(':max:',`${key.errors[key2].plan_request}`)
                promocodesTxt = promocodesTxt.replace(':created:',`${key.errors[key2].current}`)
                $('#downgradeReasonsList').append(
                    $('<li/>',{html:promocodesTxt})
                )
            break;
        }
    }
}
draw_calc_update_subscription = function(planName,billedYearly,action){
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
                r.action = action;
                r.planName = planName;
                showPopup('calc_update_subscription',r)
            }else if(r.actionValid == 0){
                showPopup('change_plan_failed',{
                    errors:r.errors,
                    currentPlan:r.currentPlan,
                    plan_request:r.plan_request

                });
            }else if(r.actionValid == 2){
                $('.popupBody').text('').append(
                    $('<div/>',{text:texts.updateSubscriptionLastInvoiceNotPaid}),
                    $('<div/>',{class:'row alnC jstfyE mT20'}).append(
                        $('<button/>',{class:'btn btn-cancel popupClose',text:texts.gotit})
                    )
                )
            }
        }
    })
}
