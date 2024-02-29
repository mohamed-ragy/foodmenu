draw_page_change_plan = function(){
    $('.page').text('').append(
        drawSwitchBtn('',texts.billedYearly,'billedYearly','checkboxlabel alnsC bgc_white-1 mT20 ','','',false,null),
        $('<div/>',{id:'plansCards',class:'mT20 row alnC jstfyC wrap w100p'}).append(
            $('<div/>',{class:'planCardContainer'})
        )
    )
    if(window.website.billingPeriod == 'year'){
        if(window.website.subscription_status == 'active' || window.website.subscription_status == 'past_due' || window.website.subscription_status == 'incomplete'){
            $('.planPerYearPrice_save').addClass('none')
        }
        $('#billedYearly').prop('checked',true);
        $('#billedYearly').closest('.checkboxlabel').addClass('none');
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
                        $('<td/>',{class:'tnw td_borderB pY5 taE bold',text:`${plan.storage}MB`}),
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
                        // $('.planCard-small').addClass('none');
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action',null).find('.btnTxt').text(texts.currentPlan).prop('disabled',true);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'standard':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        // $('.planCard-standard').addClass('none');
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'large':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        // $('.planCard-large').addClass('none');
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    break;
                    case 'premium':
                        $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        $('.planCard-large').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                        // $('.planCard-premium').addClass('none');
                        $('.planCard-premium').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    break;
                }
            }
        }else if(window.website.billingPeriod == 'year'){
            switch(window.website.plan){
                case 'small':
                    // $('.planCard-small').addClass('none');
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'standard':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    // $('.planCard-standard').addClass('none');
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'large':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    // $('.planCard-large').addClass('none');
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action','upgrade').find('.btnTxt').text(texts.upgrade);
                break;
                case 'premium':
                    $('.planCard-small').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-standard').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    $('.planCard-large').find('.updateSubscriptionBtn').attr('action','downgrade').find('.btnTxt').text(texts.downgrade);
                    // $('.planCard-premium').addClass('none');
                    $('.planCard-premium').find('.updateSubscriptionBtn').attr('action',null).text(texts.currentPlan).prop('disabled',true);
                break;
            }
        }

    }
    if($('#billedYearly').prop('checked') == true){
        if(window.website.billingPeriod == 'year'){
            if(window.website.subscription_status == 'active' || window.website.subscription_status == 'past_due' || window.website.subscription_status == 'incomplete'){
                $('.planPerYearPrice_save').addClass('none')
            }
        }else{
            $('.planPerYearPrice_save').removeClass('none');
        }
        $('.planPerMonthPrice').addClass('none');
        $('.planPerYearPrice').removeClass('none');
    }else if($('#billedYearly').prop('checked') == false){
        $('.planPerYearPrice_save').addClass('none')
        $('.planPerMonthPrice').removeClass('none');
        $('.planPerYearPrice').addClass('none');
    }
}
$('html,body').on('click','#billedYearly',function(e){
    e.stopImmediatePropagation();
    drawPlansCards();
})
