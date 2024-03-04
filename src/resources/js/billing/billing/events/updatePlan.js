$('html,body').on('click','#billedYearly',function(e){
    e.stopImmediatePropagation();
    drawPlansCards();
})
$('html,body').on('click','.updateSubscriptionBtn',function(e){
    e.stopImmediatePropagation();
    let billedYearly = $('#billedYearly').prop('checked');
    billedYearly ? billedYearly = 1 : billedYearly = 0;
    let planName = $(this).attr('planName');
    let thisBtn = $(this);
    if(
        window.website.subscription_status == 'incomplete_expired'
        ||window.website.subscription_status == 'canceled'
        ||window.website.subscription_status == 'unpaid'
        ||window.website.subscription_status == 'paused'
    ){
        showBtnLoading($('.updateSubscriptionBtn'))
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                changePlan:planName,
                billedYearly:billedYearly,
            },success:function(r){
                hideBtnLoading($('.updateSubscriptionBtn'))
                if(r.changePlanState == 1){
                    window.website.plan = r.plan_name;
                    window.website.plan_price = r.plan_price;
                    showPage('home')
                    showPopup('plan_changed');
                }else if(r.changePlanState == 0){
                    showPopup('change_plan_failed',{
                        errors:r.errors,
                        currentPlan:r.currentPlan,
                        plan_request:r.plan_request

                    });
                }
            }
        })
    }else{
        showPopup('update_subscription',{action:thisBtn.attr('action'),planName:planName,billedYearly:billedYearly});
    }
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
                window.location.href = `/${lang}/payment/update_subscription`
            }
        }
    }).fail(function(r){
        hideBtnLoading($('#updateSubscriptionBtnConfirm'));
        $('.updateSubscriptionMsg').removeClass().addClass('cR updateSubscriptionMsg w100p taE').text(r.responseJSON.message)
    })
})
