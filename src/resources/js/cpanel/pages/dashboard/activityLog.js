let lastActivity_created_at = '0';
let lastActivity_id = '0';
let lastActivity = {code:'0',user_id:'0',product_id:'0',category_id:'0',delivery_id:'0',product_review_id:'0',img_id:'0',promocode_id:'0',subaccount_id:'0',order_id:'0'};
let getMoreActivities = true;
let noMoreActivites = false;
let activities_year;
let activities_month;
let activities_day;
$('body').on('click','#findActivites_btn',function(e){
    if(!coolDownChecker()){return;}
    activityLog_load();
})
activityLog_load = function(){
    lastActivity_created_at = '0';
    lastActivity_id = '0';
    lastActivity = {code:'0',user_id:'0',product_id:'0',category_id:'0',delivery_id:'0',product_review_id:'0',img_id:'0',promocode_id:'0',subaccount_id:'0',order_id:'0'};
    getMoreActivities = false;
    noMoreActivites = false;
    $('#activityLogContainer').text('');
    $('#activityLogContainer_loading').removeClass('none')
    $('#activityLog_loadMore').addClass('none')
    showBtnLoading($('#findActivites_btn'));
    activities_year = $('#datePicker-activityLog').find('.datePickerYear').attr('year');
    activities_month = $('#datePicker-activityLog').find('.datePickerMonth').attr('month');
    activities_day = $('#datePicker-activityLog').find('.datePickerSelectedDay').text();
    window.page.year = activities_year;
    window.page.month = activities_month;
    window.page.day = activities_day;
    $('.activityLogsStickyDate').text(getDate(Date.parse(new Date(activities_year,activities_month - 1,activities_day)) / 1000).date.local);
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getActivityLog:true,
            year:activities_year,
            month:activities_month,
            day:activities_day,
            lastActivity_created_at:lastActivity_created_at,
            lastActivity_id:lastActivity_id,
        },
        success:function(r){
            hideBtnLoading($('#findActivites_btn'));
            pushHistory(false)
            $('#activityLogContainer_loading').addClass('none')
            scrollToDiv($('#bodyPage'),$('#activityLogContainer'),500,20);
            window.activity_log = r.activities;
            if(r.activities.length == 0){
                noMoreActivites = true;
                $('#activityLogContainer').append(
                    $('<div/>',{class:'',text:texts.dashboard.noActivities})
                );
            }else{
                for(const key in r.activities){
                    lastActivity_created_at = r.activities[key].created_at;
                    lastActivity_id = r.activities[key]._id;
                    drawActivityLog(r.activities[key],false)

                }
                $('#activityLog_loadMore').removeClass('none')
            }
        }
    }).done(function(){
        getMoreActivities = true;
    })
}
$('#bodyPage').on('scroll',function(e){
    if('activity_log' == window.history.state.page ){
        if($('#bodyPage').scrollTop() > $('#activityLogContainer').children().eq(1).offset().top ){
            $('.activityLogsStickyDate').addClass('activityLogsStickyDate_sticky')
        }else{
            $('.activityLogsStickyDate').removeClass('activityLogsStickyDate_sticky')
        }
        if($('#activityLogContainer').children().length == 0){return}
        if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 10 ){
            activityLog_loadMore();
        }
    }

});
$('body').on('click','#activityLog_loadMore',function(e){
    activityLog_loadMore();
})
activityLog_loadMore = function(){
    if(!getMoreActivities || noMoreActivites ){return;}
    getMoreActivities = false;
    $('#activityLogContainer_loading').removeClass('none')
    $('#activityLog_loadMore').addClass('none')
    showBtnLoading($('#findActivites_btn'));
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getActivityLog:true,
            year:activities_year,
            month:activities_month,
            day:activities_day,
            lastActivity_created_at:lastActivity_created_at,
            lastActivity_id:lastActivity_id,
        },
        success:function(r){
            hideBtnLoading($('#findActivites_btn'));
            $('#activityLogContainer_loading').addClass('none')
            if(r.activities.length == 0){
                noMoreActivites = true;

            }else{
                for(const key in r.activities){
                    window.activity_log.push(r.activities[key])
                    lastActivity_created_at = r.activities[key].created_at;
                    lastActivity_id = r.activities[key]._id;
                    drawActivityLog(r.activities[key],false)

                }
                $('#activityLog_loadMore').removeClass('none')
            }
        }
    }).done(function(){
        getMoreActivities = true;
    })
}

drawActivityLog = function(activity,is_live){
    let activity_icon;let activity_body = texts.activity_log[activity.code];let activity_group = false; let activity_elem;

    activity_body = activity_body.replace(':account:',`<span><a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.account_id}">${activity.account_name}</a></span>`)
    activity_body = activity_body.replace(':category:',`<span><a class="popupPage popupId" popupPage="category" popupId="category" category="${activity.category_name}">${activity.category_name}</a></span>`)
    activity_body = activity_body.replace(':img:',`<span><a class="previewImg" img="${activity.img_id}">${activity.img_name}</a></span>`)
    if(activity.delivery_name){
        activity_body = activity_body.replace(':delivery:',`<span><a class="popupPage popupId" popupPage="delivery_account" popupId="delivery" delivery="${activity.delivery_id}">${activity.delivery_name.split('@')[0]}</a></span>`)
    }
    activity_body = activity_body.replace(':product:',`<span><a class="popupPage popupId" popupPage="product" popupId="product" product="${activity.product_name}">${activity.product_name}</a></span>`)
    activity_body = activity_body.replace(':subaccount:',`<span><a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.subaccount_id}">${activity.subaccount_name}</a></span>`)
    activity_body = activity_body.replace(':order:',`<span><a class="popupPage popupId" popupPage="order" popupId="order" order="${activity.order_id}">#${activity.order_number}</a></span>`)
    activity_body = activity_body.replace(':old_type:',`<b>${texts.orders[`type_${activity.old_type}`]}</b>`)
    activity_body = activity_body.replace(':new_type:',`<b>${texts.orders[`type_${activity.new_type}`]}</b>`)
    activity_body = activity_body.replace(':old_discount:',`<b>${activity.old_discount}%</b>`)
    activity_body = activity_body.replace(':new_discount:',`<b>${activity.new_discount}%</b>`)
    activity_body = activity_body.replace(':old_deliveryCost:',`<b>${website.currency}${activity.old_deliveryCost}</b>`)
    activity_body = activity_body.replace(':new_deliveryCost:',`<b>${website.currency}${activity.new_deliveryCost}</b>`)
    activity_body = activity_body.replace(':old_qty:',`<b>${activity.old_qty}</b>`)
    activity_body = activity_body.replace(':new_qty:',`<b>${activity.new_qty}</b>`)
    activity_body = activity_body.replace(':old_qty:',`<b>${activity.old_qty}</b>`)
    activity_body = activity_body.replace(':new_qty:',`<b>${activity.new_qty}</b>`)

    activity_body = activity_body.replace(':availability:',`<b>${texts.dashboard[`availability-${activity.availability}`]}</b>`)

    activity_body = activity_body.replace(':old_selection:',`<b>${activity.old_selection}</b>`)
    activity_body = activity_body.replace(':new_selection:',`<b>${activity.new_selection}</b>`)

    activity_body = activity_body.replace(':option:',`<a class="productOptionEdit_activityLog" option="${activity.option_id}" product="${activity.product_name}">${activity.option_name}</a>`)
    activity_body = activity_body.replace(':selection:',`<a class="productOptionSelectionEdit_activityLog" selection="${activity.selection_id}" option="${activity.option_id}" product="${activity.product_name}">${activity.selection_name}</a>`)

    if(activity.reviewsSum != null){
        activity_body = activity_body.replace(':reviews_sum:',`<span>${activity.reviewsSum}</span>`)
        activity_body = activity_body.replace(':review:',`<a class="cpPage" cpPage="product_reviews" user="${activity.user_id}">${activity.reviewsSum > 1 ? texts.dashboard.reviews : texts.dashboard.review}</a>`)
    }else{
        activity_body = activity_body.replace(':review:',`<a class="popupPage popupId" popupPage="review" popupId="review" review="${activity.product_review_id}">${texts.dashboard.review}</a>`)
    }
    if(activity.user_id != null){
        activity_body = activity_body.replace(':user:',`<span><a class="popupPage popupId" popupPage="user" popupId="user" user="${activity.user_id}">${activity.user_name}</a></span>`)
    }else{
        activity_body = activity_body.replace(':user:',`<span>${texts.cpanel.public.aGuest}</span>`)
    }
    activity_body = activity_body.replace(':promocode:',`<span><a class="popupPage" popupPage="manage_promo_code" promocode="${activity.promocode_name}">${activity.promocode_name}</a></span>`)
    activity_body = activity_body.replace(':activity_status:',`<b>${activity.is_active == 1 ? texts.dashboard.activated : texts.dashboard.deactivated }</b>`)

    activity_body = activity_body.replace(':old_phone:',`<b>${activity.old_phone}</b>`)
    activity_body = activity_body.replace(':new_phone:',`<b>${activity.new_phone}</b>`)
    activity_body = activity_body.replace(':old_email:',`<b>${activity.old_email}</b>`)
    activity_body = activity_body.replace(':new_email:',`<b>${activity.new_email}</b>`)
    activity_body = activity_body.replace(':old_country:',`<b>${activity.old_country}</b>`)
    activity_body = activity_body.replace(':new_country:',`<b>${activity.new_country}</b>`)
    activity_body = activity_body.replace(':old_timeZone:',`<b>${activity.old_timeZone}</b>`)
    activity_body = activity_body.replace(':new_timeZone:',`<b>${activity.new_timeZone}</b>`)
    activity_body = activity_body.replace(':lang:',`<a class="popupPage" lang="${activity.lang_code}" popupPage="edit_language_options">${activity.lang_name}</a>`)
    activity_body = activity_body.replace(':langTxt:',`<a class="popupPage" lang="${activity.lang_code}" popupPage="edit_language_texts">${activity.lang_name}</a>`)

    activity_body = activity_body.replace(':day:',texts.cpanel.public[activity.day])
    activity_body = activity_body.replace(':day_attr:',activity.day)
    activity_body = activity_body.replace(':service_attr:',activity.service)
    activity_body = activity_body.replace(':service_name_workingHours:',texts.dashboard[`service_name_workingHours_${activity.service}`])
    activity_body = activity_body.replace(':service_name:',texts.dashboard[`service_name_${activity.service}`])

    activity.code.split('.')[1] == 'promocode' && lastActivity.code.split('.')[1] == 'promocode' && activity.promocode_id == lastActivity.promocode_id ? activity_group = true : null;
    activity.code.split('.')[1] == 'restaurant_info' && lastActivity.code.split('.')[1] == 'restaurant_info'? activity_group = true : null;
    activity.code.split('.')[1] == 'country' && lastActivity.code.split('.')[1] == 'country'? activity_group = true : null;
    activity.code.split('.')[1] == 'timeZone' && lastActivity.code.split('.')[1] == 'timeZone'? activity_group = true : null;
    activity.code.split('.')[1] == 'logo_icon' && lastActivity.code.split('.')[1] == 'logo_icon'? activity_group = true : null;
    activity.code.split('.')[1] == 'website_status' && lastActivity.code.split('.')[1] == 'website_status'? activity_group = true : null;
    activity.code.split('.')[0] == 'security' && lastActivity.code.split('.')[0] == 'security'? activity_group = true : null;
    activity.code.split('.')[0] == 'order' && lastActivity.code.split('.')[0] == 'order' && activity.order_id == lastActivity.order_id ? activity_group = true : null;
    activity.code.split('.')[0] == 'category' && lastActivity.code.split('.')[0] == 'category' && activity.category_id == lastActivity.category_id ? activity_group = true : null;
    activity.code.split('.')[0] == 'img' && lastActivity.code.split('.')[0] == 'img' && activity.img_id == lastActivity.img_id ? activity_group = true : null;
    activity.code.split('.')[0] == 'delivery' && lastActivity.code.split('.')[0] == 'delivery' && activity.delivery_id == lastActivity.delivery_id ? activity_group = true : null;
    activity.code.split('.')[0] == 'subaccount' && lastActivity.code.split('.')[0] == 'subaccount' && activity.subaccount_id == lastActivity.subaccount_id ? activity_group = true : null;
    activity.code.split('.')[0] == 'product' && lastActivity.code.split('.')[0] == 'product' && activity.product_id == lastActivity.product_id ? activity_group = true : null;
    activity.code.split('.')[1] == 'language' && lastActivity.code.split('.')[1] == 'language'  ? activity_group = true : null;
    activity.code.split('.')[1] == 'dinein' && lastActivity.code.split('.')[1] == 'dinein'  ? activity_group = true : null;
    activity.code.split('.')[1] == 'pickup' && lastActivity.code.split('.')[1] == 'pickup'  ? activity_group = true : null;
    activity.code.split('.')[1] == 'delivery' && lastActivity.code.split('.')[1] == 'delivery'  ? activity_group = true : null;
    activity.code.split('.')[0] == 'user' && lastActivity.code.split('.')[0] == 'user'  ? activity_group = true : null;

    let show_seeChanges = false;
    switch (activity.code) {
        case 'category.created': activity_icon = 'ico-category_list cG';break;
        case 'category.deleted': activity_icon = 'ico-category_list cR';break;
        case 'category.edited': activity_icon = 'ico-category_list cO'; show_seeChanges = true;break;

        case 'img.uploaded': activity_icon = 'ico-images cG';break;
        case 'img.deleted': activity_icon = 'ico-images cR';break;

        case 'delivery.created': activity_icon = 'ico-delivery_accounts cG';break;
        case 'delivery.deleted': activity_icon = 'ico-delivery_accounts cR';break;
        case 'delivery.password_edited': activity_icon = 'ico-delivery_accounts cO';break;

        case 'subaccount.unblocked': activity_icon = 'ico-sub_accounts cG';break;
        case 'subaccount.created': activity_icon = 'ico-sub_accounts cG';break;
        case 'subaccount.deleted': activity_icon = 'ico-sub_accounts cR';break;
        case 'subaccount.password_changed': activity_icon = 'ico-sub_accounts cO';break;
        case 'subaccount.authorities_changed': activity_icon = 'ico-sub_accounts cO';show_seeChanges = true;break;

        case 'order.new_order_by_account': activity_icon = 'ico-orders cG';break;
        case 'order.new_order_by_user': activity_icon = 'ico-orders cG';break;
        case 'order.accepted': activity_icon = 'ico-accepted cG';break;
        case 'order.canceled_by_account': activity_icon = 'ico-canceled cR';break;
        case 'order.canceled_by_user': activity_icon = 'ico-canceled cR';break;
        case 'order.ready_for_pickup': activity_icon = 'ico-pickup cO'; break;
        case 'order.picked_up': activity_icon = 'ico-pickup cG'; break;
        case 'order.out_for_delivery': activity_icon = 'ico-delivery cO'; break;
        case 'order.to_delivery_man': activity_icon = 'ico-delivery cO'; break;
        case 'order.delivered_by_account': activity_icon = 'ico-delivery cG'; break;
        case 'order.delivered_by_delivery': activity_icon = 'ico-delivery cG'; break;
        case 'order.diningin': activity_icon = 'ico-dineIn cO'; break;
        case 'order.dinedin': activity_icon = 'ico-dineIn cG'; break;
        case 'order.update.notice': activity_icon = 'ico-description cO';show_seeChanges = true;break;
        case 'order.update.phoneNumber': activity_icon = 'ico-phone_number cO';show_seeChanges = true;break;
        case 'order.update.address': activity_icon = 'ico-address cO';show_seeChanges = true;break;
        case 'order.update.type': activity_icon = 'ico-orders cO';break;
        case 'order.update.discount': activity_icon = 'ico-percent cO';break;
        case 'order.update.deliveryCost': activity_icon = 'ico-delivery cO';break;
        case 'order.update.addItem': activity_icon = 'ico-orders cG';break;
        case 'order.update.removeItem': activity_icon = 'ico-orders cR';break;
        case 'order.update.itemNotice': activity_icon = 'ico-edit cO';show_seeChanges = true;break;
        case 'order.update.qty': activity_icon = 'ico-orders cO';break;
        case 'order.update.selection': activity_icon = 'ico-orders cO';break;

        case 'product.created': activity_icon = 'ico-products cG';break;
        case 'product.deleted':activity_icon = 'ico-products cR';break;
        case 'product.availability':activity_icon = 'ico-products cO';break;
        case 'product.edited': activity_icon = 'ico-products cO';show_seeChanges = true;break;
        case 'product.option.created': activity_icon = 'ico-products cG';break;
        case 'product.option.deleted': activity_icon = 'ico-products cR';break;
        case 'product.option.edited': activity_icon = 'ico-products cO';show_seeChanges = true;break;
        case 'product.selection.set_default': activity_icon = 'ico-products cO';break;
        case 'product.selection.create': activity_icon = 'ico-products cG';break;
        case 'product.selection.deleted': activity_icon = 'ico-products cR';break;
        case 'product.selection.edited': activity_icon = 'ico-products cO';show_seeChanges = true;break;

        case 'review.posted': activity_icon = 'ico-product_reviews cG';break;
        case 'review.posted_survey': activity_icon = 'ico-product_reviews cG';break;
        case 'review.deleted': activity_icon = 'ico-product_reviews cR';break;

        case 'security.email.verified': activity_icon = 'ico-security cG';break;
        case 'security.email.changed': activity_icon = 'ico-security cO';break;
        case 'security.phone.created': activity_icon = 'ico-security cG';break;
        case 'security.phone.verified': activity_icon = 'ico-security cG';break;
        case 'security.phone.changed': activity_icon = 'ico-security cO';break;
        case 'security.password.changed': activity_icon = 'ico-security cO';break;

        case 'settings.website_status.online': activity_icon = 'ico-power cG';break;
        case 'settings.website_status.offline': activity_icon = 'ico-power cR';break;

        case 'settings.system_settings': activity_icon = 'ico-settings cO';show_seeChanges = true;break;
        case 'settings.website_privacyPolicy': activity_icon = 'ico-description cO';break;
        case 'settings.country': activity_icon = 'ico-flag cO';break;
        case 'settings.timeZone': activity_icon = 'ico-clock cO';break;
        case 'settings.logo_icon.icon': activity_icon = 'ico-image cO';show_seeChanges = true;break;
        case 'settings.logo_icon.logo': activity_icon = 'ico-image cO';show_seeChanges = true;break;
        case 'settings.logo_icon.metaImg': activity_icon = 'ico-image cO';show_seeChanges = true;break;
        case 'settings.restaurant_info.restaurant_names': activity_icon = 'ico-shop cO'; show_seeChanges = true; break;
        case 'settings.restaurant_info.restaurant_descriptions': activity_icon = 'ico-description cO'; show_seeChanges = true; break;
        case 'settings.restaurant_info.restaurant_email': activity_icon = 'ico-email_address cO'; break;
        case 'settings.restaurant_info.restaurant_phone_numbers': activity_icon = 'ico-phone_number cO';show_seeChanges=true; break;
        case 'settings.restaurant_info.restaurant_address': activity_icon = 'ico-location cO';show_seeChanges=true; break;
        case 'settings.restaurant_info.restaurant_location': activity_icon = 'ico-gps cO';break;
        case 'settings.restaurant_info.currency_symbol': activity_icon = 'ico-money cO';show_seeChanges=true; break;
        case 'settings.restaurant_info.social_media_links': activity_icon = 'ico-share cO';show_seeChanges=true; break;
        case 'settings.restaurant_info.website_announcement': activity_icon = 'ico-announcement cO';show_seeChanges=true; break;
        case 'settings.restaurant_info.receipt_footer_message': activity_icon = 'ico-description cO';show_seeChanges=true; break;
        case 'settings.promocode.activity_status': activity_icon = 'ico-promo_codes cO';show_seeChanges=false; break;
        case 'settings.promocode.deleted': activity_icon = 'ico-promo_codes cR';show_seeChanges=false; break;
        case 'settings.promocode.created': activity_icon = 'ico-promo_codes cG';show_seeChanges=false; break;
        case 'settings.promocode.edit': activity_icon = 'ico-promo_codes cO';show_seeChanges=true; break;
        case 'settings.language.installed': activity_icon = 'ico-languages cG';show_seeChanges=false; break;
        case 'settings.language.website_default': activity_icon = 'ico-languages cO';break;
        case 'settings.language.receipt_default': activity_icon = 'ico-languages cO';break;
        case 'settings.language.deleted': activity_icon = 'ico-languages cR';break;1
        case 'settings.language.custom_installed': activity_icon = 'ico-languages cG';show_seeChanges=false; break;
        case 'settings.language.edit_options': activity_icon = 'ico-languages cO';show_seeChanges=true; break;
        case 'settings.language.edit_texts': activity_icon = 'ico-languages cO';show_seeChanges=true; break;
        case 'settings.dinein.service': activity_icon = 'ico-dineIn cO';show_seeChanges=true; break;
        case 'settings.dinein.tax': activity_icon = 'ico-dineIn cO';show_seeChanges=true; break;
        case 'settings.pickup.averagePickupTime': activity_icon = 'ico-pickup';show_seeChanges=true;break;
        case 'settings.pickup.paymentMethods': activity_icon = 'ico-pickup';show_seeChanges=true;break;
        case 'settings.pickup.minimum_charge': activity_icon = 'ico-pickup';show_seeChanges=true;break;
        case 'settings.pickup.tax': activity_icon = 'ico-pickup';show_seeChanges=true;break;
        case 'settings.delivery.tax': activity_icon = 'ico-delivery';show_seeChanges=true;break;
        case 'settings.delivery.minimum_charge': activity_icon = 'ico-delivery';show_seeChanges=true;break;
        case 'settings.delivery.paymentMethods': activity_icon = 'ico-delivery';show_seeChanges=true;break;
        case 'settings.delivery.averageDeliveryTime': activity_icon = 'ico-delivery';show_seeChanges=true;break;
        case 'settings.delivery.deliveryCost': activity_icon = 'ico-delivery';show_seeChanges=true;break;

        case 'settings.service.workingHours': activity_icon = `ico-${activity.service.replace('dinein','dineIn')}`;show_seeChanges=true;break;
        case 'settings.service.workingDays': activity_icon = `ico-${activity.service.replace('dinein','dineIn')}`;show_seeChanges=false;break;

        case 'user.created': activity_icon = 'ico-user';break;
        case 'user.edited_by_account': activity_icon = 'ico-user';show_seeChanges=true;break;
        case 'user.banned': activity_icon = 'ico-user';break;
        case 'user.ban_removed': activity_icon = 'ico-user';break;
        case 'user.signed_up': activity_icon = 'ico-user';break;
        case 'user.edited_by_user': activity_icon = 'ico-user';show_seeChanges=true;break;
        case 'user.email_changed': activity_icon = 'ico-user';show_seeChanges=true;break;
        case 'user.password_changed': activity_icon = 'ico-user';show_seeChanges=false;break;

        case 'website.installed': activity_icon = 'ico-templates';break;
        default: break;
    }
    lastActivity = activity;

    activity_elem = $('<div/>',{class:`${is_live ? 'activityContainer_live' : 'activityContainer'}`,activity:activity._id}).append(
        $('<div/>',{
            class:activity_icon+' fs105 m10',
        }),
        $('<div/>',{
            class:'grow2 fs09 mY5 mie-10'
        }).append(
            $('<div/>',{class:'',html:activity_body}),
        ),
        $('<div/>',{class:'column alnE jstfySB alnsSH'}).append(
            $('<div/>',{class:'row alnC jstfyE mnh20'}).append(
                $('<div/>',{class:`${!show_seeChanges ? 'none' : ''}  ico-showPassword seeChanges_activityLog fs1`,tooltip:texts.dashboard.seeChanges,activity:activity._id}),
                $('<div/>',{class:`${is_live ? 'none' : ''} ico-close deleteActivityLog fs08`,tooltip:texts.cpanel.public.delete}),
            ),
            $('<div/>',{
                text:getDate(activity.created_at).time.restaurant,
                class:'tnw fs07 taE m5 mT10',
            }),
        )
    )

    if(is_live){
        if($('.liveActivityLogContainer').children().length >= 5){
            $('#liveActivityLogContainer').children().last().addClass('liveActivityAnimation_exit')
            setTimeout(function(){
                $('.liveActivityLogContainer').find('.liveActivityAnimation_exit').remove();
            },500)
        }
        $('.liveActivityLogContainer').prepend(activity_elem)
    }else{
        if(activity_group){
            $('.activityGroupContainer').last().append(activity_elem)
            activity_elem.addClass('activityContainer_hidden')
            let activities_group_sum = $('.activityGroupContainer').last().children().length - 2;
            $('.activityGroupContainer').last().find('.activityGroupSeemore').removeClass('none').text('').append(
                $('<span/>',{text:activities_group_sum == 1 ? texts.dashboard.moreRelatedActivity.replace(':sum:',activities_group_sum) : texts.dashboard.moreRelatedActivitys.replace(':sum:',activities_group_sum)}),$('<span/>',{class:'ico-down fs09 mis-5'})
            )
        }else{
            $('#activityLogContainer').append(
                $('<div/>',{class:'activityGroupContainer'}).append(
                    activity_elem,
                    $('<a/>',{class:'activityGroupSeemore none'})
                ),
            )
        }
    }
}

//
$('body').on('click','.activityGroupSeemore',function(e){
    $(this).text('').addClass('none');
    $(this).closest('.activityGroupContainer').children().removeClass('activityContainer_hidden')
})
//
$('body').on('click','.deleteActivityLog',function(e){
    let activity_elem = $(this).closest('.activityContainer').html()
    let activity_id = $(this).closest('.activityContainer').attr('activity');
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.dashboard.deleteActivityTxt})
            ),
            $('<div/>',{class:'activityContainer'}).append(
                activity_elem
            ),
            $('<div/>',{class:'btnContainer mT40'}).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn btn-delete',id:'deleteActivityLog-confirmBtn',activity:activity_id}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                )
            )
        )
    })
})
$('body').on('click','#deleteActivityLog-confirmBtn',function(e){
    if(!coolDownChecker()){return;}
    let activity_id = $(this).attr('activity');
    showBtnLoading($('#deleteActivityLog-confirmBtn'));
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteActivityLog:true,
            activity_id:activity_id,
        },success:function(r){
            hideBtnLoading($('#deleteActivityLog-confirmBtn'));
            if(r.deleteActivityLogStat == 1){
                showAlert('success',r.msg,4000,true)
                $(`.activityContainer[activity="${activity_id}"]`).remove();
                closePopup();
            }else if(r.deleteActivityLogStat == 0){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})
//
$('body').on('click','.seeChanges_activityLog',function(e){
    let activity = window.activity_log.find(item=>item._id == $(this).attr('activity'));
    if(typeof(activity) == 'undefined'){
        activity = window.last_activites.find(item=>item._id == $(this).attr('activity'));
    }
    seeChanges_activityLog(activity)
})
seeChanges_activityLog = function(activity){
    console.log(activity)
    let poupTitle = '';
    let from = $('<div/>',{class:'mis-10'}); let to = $('<div/>',{class:'mis-10'});
    let activityTxt = texts.activity_log[activity.code]
    if(activity.user_id != null){
        activityTxt = activityTxt.replace(':user:',`<span><a class="popupPage popupId" popupPage="user" popupId="user" user="${activity.user_id}">${activity.user_name}</a></span>`)
    }else{
        activityTxt = activityTxt.replace(':user:',`<span>${texts.cpanel.public.aGuest}</span>`)
    }
    activityTxt = activityTxt.replace(':account:',`<span><a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.account_id}">${activity.account_name}</a></span>`)
    activityTxt = activityTxt.replace(':category:',`<span><a class="popupPage popupId" popupPage="category" popupId="category" category="${activity.category_name}">${activity.category_name}</a></span>`)
    activityTxt = activityTxt.replace(':order:',`<span><a class="popupPage popupId" popupPage="order" popupId="order" order="${activity.order_id}">#${activity.order_number}</a></span>`)
    activityTxt = activityTxt.replace(':product:',`<span><a class="popupPage popupId" popupPage="product" popupId="product" product="${activity.product_name}">${activity.product_name}</a></span>`)
    activityTxt = activityTxt.replace(':option:',`<a class="productOptionEdit_activityLog" option="${activity.option_id}" product="${activity.product_name}">${activity.option_name}</a>`)
    activityTxt = activityTxt.replace(':selection:',`<b>${activity.selection_name}</b>`)
    activityTxt = activityTxt.replace(':promocode:',`<span><a class="popupPage" popupPage="manage_promo_code" promocode="${activity.promocode_name}">${activity.promocode_name}</a></span>`)
    activityTxt = activityTxt.replace(':lang:',`<a class="popupPage" lang="${activity.lang_code}" popupPage="edit_language_options">${activity.lang_name}</a>`)
    activityTxt = activityTxt.replace(':subaccount:',`<span><a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.subaccount_id}">${activity.subaccount_name}</a></span>`)
    activityTxt = activityTxt.replace(':day:',texts.cpanel.public[activity.day])
    activityTxt = activityTxt.replace(':day_attr:',activity.day)
    activityTxt = activityTxt.replace(':service_attr:',activity.service)
    activityTxt = activityTxt.replace(':service_name_workingHours:',texts.dashboard[`service_name_workingHours_${activity.service}`])
    activityTxt = activityTxt.replace(':service_name:',texts.dashboard[`service_name_${activity.service}`])

    switch(activity.code){
        case 'category.edited':
            if(activity.old_img != activity.new_img){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'fs08 c_white-10',text:texts.dashboard.img}),
                        $('<img/>',{class:'h75 w75 ofCover br3',src:activity.old_img})
                    )
                ),
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'fs08 c_white-10',text:texts.dashboard.img}),
                        $('<img/>',{class:'h75 w75 ofCover br3',src:activity.new_img})
                    )
                )
            }
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
            for(const key in activity.new_descriptions){
                if(activity.new_descriptions[key] != activity.old_descriptions[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.descriptionLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_descriptions[key]}),
                        )
                    )
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.descriptionLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_descriptions[key]}),
                        )
                    )
                }
            }
        break;
        case 'subaccount.authorities_changed':
            let old_authorities = activity.old_authorities.split('');
            let new_authorities = activity.new_authorities.split('');
            for(const key in old_authorities){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${old_authorities[key] == 1 ? 'fs07 ico-check cG' : 'fs08 ico-no  cR'}`}),
                        $('<span/>',{class:'fs08',text:texts.staff[`authority${key}`]})
                    )
                )
            }
            for(const key in new_authorities){
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${new_authorities[key] == 1 ? 'fs07 ico-check cG' : 'fs08 ico-no  cR'}`}),
                        $('<span/>',{class:'fs08',text:texts.staff[`authority${key}`]})
                    )
                )
            }
        break;
        case 'order.update.notice':
            from.append(
                $('<div/>',{class:'fs08',text:activity.old_orderNotice}),
            )
            to.append(
                $('<div/>',{class:'fs08',text:activity.new_orderNotice}),
            )
        break;
        case 'order.update.phoneNumber':
            from.append(
                $('<div/>',{class:'fs08',text:activity.old_phoneNumber}),
            )
            to.append(
                $('<div/>',{class:'fs08',text:activity.new_phoneNumber}),
            )
        break;
        case 'order.update.address':
            from.append(
                $('<div/>',{class:'fs08',text:activity.old_address}),
            )
            to.append(
                $('<div/>',{class:'fs08',text:activity.new_address}),
            )
        break;
        case 'order.update.itemNotice':
            from.append(
                $('<div/>',{class:'fs08',text:activity.old_itemNotice}),
            )
            to.append(
                $('<div/>',{class:'fs08',text:activity.new_itemNotice}),
            )
        break;
        case 'product.edited':
            if(activity.old_img != activity.new_img){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'fs08 c_white-10',text:texts.dashboard.img}),
                        $('<img/>',{class:'h75 w75 ofCover br3',src:activity.old_img})
                    )
                ),
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'fs08 c_white-10',text:texts.dashboard.img}),
                        $('<img/>',{class:'h75 w75 ofCover br3',src:activity.new_img})
                    )
                )
            }
            if(activity.old_category != activity.new_category){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.category}),
                        $('<span/>',{class:'',text:activity.old_category == '0' ? texts.dashboard.uncategorized : activity.old_category}),
                        )
                ),
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.category}),
                        $('<span/>',{class:'',text:activity.new_category == '0' ? texts.dashboard.uncategorized : activity.new_category}),
                    )
                )
            }
            if(activity.old_price != activity.new_price){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.price}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.old_price}`}),
                        )
                ),
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.price}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.new_price}`}),
                    )
                )
            }
            if(activity.old_availability != activity.new_availability){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.availability}),
                        $('<span/>',{class:'',text:texts.dashboard[`availability-${activity.old_availability}`]}),
                        )
                ),
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.availability}),
                        $('<span/>',{class:'',text:texts.dashboard[`availability-${activity.new_availability}`]}),
                    )
                )
            }
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
            for(const key in activity.new_descriptions){
                if(activity.new_descriptions[key] != activity.old_descriptions[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.descriptionLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_descriptions[key]}),
                        )
                    )
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.descriptionLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_descriptions[key]}),
                        )
                    )
                }
            }
        break;
        case 'product.option.edited':
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'product.selection.edited':
            if(activity.old_price != activity.new_price){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.price}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.old_price}`}),
                        )
                ),
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.price}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.new_price}`}),
                    )
                )
            }
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.system_settings':
            for(const key in activity.old_system_settings){
                if(activity.old_system_settings[key] != activity.new_system_settings[key]){
                    if(key == 'cart_lifeTime'){
                        let thisCartLifeTime = activity.old_system_settings[key];
                        let cartLifeTimeFixed; let cartLifeTimeText;
                        if(thisCartLifeTime == 1){
                            cartLifeTimeFixed = thisCartLifeTime;
                            cartLifeTimeText = texts.cpanel.diffTime.min;
                        }else if(thisCartLifeTime > 1 && thisCartLifeTime <= 59){
                            cartLifeTimeFixed = thisCartLifeTime;
                            cartLifeTimeText = texts.cpanel.diffTime.mins;
                        }else if(thisCartLifeTime >= 60 && thisCartLifeTime < 120){
                            cartLifeTimeFixed = 1;
                            cartLifeTimeText = texts.cpanel.diffTime.hour;
                        }else if(thisCartLifeTime >= 120 && thisCartLifeTime < 1440){
                            cartLifeTimeFixed = thisCartLifeTime / 60;
                            cartLifeTimeText = texts.cpanel.diffTime.hours;
                        }else if(thisCartLifeTime >= 1440 && thisCartLifeTime < 1440 * 2){
                            cartLifeTimeFixed = thisCartLifeTime / (60*24);
                            cartLifeTimeText = texts.cpanel.diffTime.day;
                        }else if(thisCartLifeTime >= 1440 * 2 ){
                            cartLifeTimeFixed = thisCartLifeTime / (60*24);
                            cartLifeTimeText = texts.cpanel.diffTime.days;
                        }

                        let thisCartLifeTime2 = activity.new_system_settings[key];
                        let cartLifeTimeFixed2; let cartLifeTimeText2;
                        if(thisCartLifeTime2 == 1){
                            cartLifeTimeFixed2 = thisCartLifeTime2;
                            cartLifeTimeText2 = texts.cpanel.diffTime.min;
                        }else if(thisCartLifeTime2 > 1 && thisCartLifeTime2 <= 59){
                            cartLifeTimeFixed2 = thisCartLifeTime2;
                            cartLifeTimeText2 = texts.cpanel.diffTime.mins;
                        }else if(thisCartLifeTime2 >= 60 && thisCartLifeTime2 < 120){
                            cartLifeTimeFixed2 = 1;
                            cartLifeTimeText2 = texts.cpanel.diffTime.hour;
                        }else if(thisCartLifeTime2 >= 120 && thisCartLifeTime2 < 1440){
                            cartLifeTimeFixed2 = thisCartLifeTime2 / 60;
                            cartLifeTimeText2 = texts.cpanel.diffTime.hours;
                        }else if(thisCartLifeTime2 >= 1440 && thisCartLifeTime2 < 1440 * 2){
                            cartLifeTimeFixed2 = thisCartLifeTime2 / (60*24);
                            cartLifeTimeText2 = texts.cpanel.diffTime.day;
                        }else if(thisCartLifeTime2 >= 1440 * 2 ){
                            cartLifeTimeFixed2 = thisCartLifeTime2 / (60*24);
                            cartLifeTimeText2 = texts.cpanel.diffTime.days;
                        }
                        from.append(
                            $('<div/>',{class:''}).append(
                                $('<span/>',{class:'fs08 c_white-10 mie-3',html:texts.settings[key]}),
                                $('<span/>',{class:'fs09',text:`${cartLifeTimeFixed} ${cartLifeTimeText}`})
                            )
                        )
                        to.append(
                            $('<div/>',{class:''}).append(
                                $('<span/>',{class:'fs08 c_white-10 mie-3',html:texts.settings[key]}),
                                $('<span/>',{class:'fs09',text:`${cartLifeTimeFixed2} ${cartLifeTimeText2}`})
                            )
                        )
                    }else if(key == 'printerWidth'){
                        from.append(
                            $('<div/>',{class:''}).append(
                                $('<span/>',{class:'fs08 c_white-10 mie-3',html:texts.settings[key]}),
                                $('<span/>',{class:'fs09',text:`${activity.old_system_settings[key]} mm`})
                            )
                        )
                        to.append(
                            $('<div/>',{class:''}).append(
                                $('<span/>',{class:'fs08 c_white-10 mie-3',html:texts.settings[key]}),
                                $('<span/>',{class:'fs09',text:`${activity.new_system_settings[key]} mm`})
                            )
                        )
                    }else{
                        from.append(
                            $('<div/>',{class:''}).append(
                                $('<span/>',{class:`mie-5 ${activity.old_system_settings[key] == 1 ? 'fs07 ico-check cG' : 'fs08 ico-no  cR'}`}),
                                $('<span/>',{class:'fs08',html:texts.settings[key]})
                            )
                        )
                        to.append(
                            $('<div/>',{class:''}).append(
                                $('<span/>',{class:`mie-5 ${activity.new_system_settings[key] == 1 ? 'fs07 ico-check cG' : 'fs08 ico-no  cR'}`}),
                                $('<span/>',{class:'fs08',html:texts.settings[key]})
                            )
                        )
                    }
                }
            }
        break;
        case 'settings.logo_icon.icon':
            from.append(
                $('<div/>',{class:''}).append(
                    $('<img/>',{class:'h75 w75 ofCover br3',src:activity.old_icon})
                )
            ),
            to.append(
                $('<div/>',{class:''}).append(
                    $('<img/>',{class:'h75 w75 ofCover br3',src:activity.new_icon})
                )
            )
        break;
        case 'settings.logo_icon.logo':
            from.append(
                $('<div/>',{class:''}).append(
                    $('<img/>',{class:'h75 w75 ofCover br3',src:activity.old_logo})
                )
            ),
            to.append(
                $('<div/>',{class:''}).append(
                    $('<img/>',{class:'h75 w75 ofCover br3',src:activity.new_logo})
                )
            )
        break;
        case 'settings.logo_icon.metaImg':
            from.append(
                $('<div/>',{class:''}).append(
                    $('<img/>',{class:'h75 w75 ofCover br3',src:activity.old_metaImg})
                )
            ),
            to.append(
                $('<div/>',{class:''}).append(
                    $('<img/>',{class:'h75 w75 ofCover br3',src:activity.new_metaImg})
                )
            )
        break;
        case 'settings.restaurant_info.restaurant_names':
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.nameLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.restaurant_info.restaurant_descriptions':
            for(const key in activity.new_descriptions){
                if(activity.new_descriptions[key] != activity.old_descriptions[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.descriptionLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_descriptions[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.descriptionLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_descriptions[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.restaurant_info.restaurant_phone_numbers':
            for(const key in activity.old_phone){
                from.append(
                    $('<div/>',{class:'fs08',text:activity.old_phone[key]})
                )
            }
            for(const key in activity.new_phone){
                to.append(
                    $('<div/>',{class:'fs08',text:activity.new_phone[key]})
                )
            }
        break;
        case 'settings.restaurant_info.restaurant_address':
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.addressLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.addressLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.restaurant_info.currency_symbol':
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.currencyLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.currencyLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.restaurant_info.social_media_links':
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings[key]}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings[key]}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.restaurant_info.website_announcement':
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.announcementLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    ),
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.announcementLang.replace(':lang:',key)}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.restaurant_info.receipt_footer_message':
            for(const key in activity.new_names){
                if(activity.new_names[key] != activity.old_names[key]){
                    from.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:`${key}:`}),
                            $('<span/>',{class:'',text:activity.old_names[key]}),
                        )
                    )
                    to.append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:`${key}:`}),
                            $('<span/>',{class:'',text:activity.new_names[key]}),
                        )
                    )
                }
            }
        break;
        case 'settings.promocode.edit':
            if(activity.old_promocode.discount != activity.new_promocode.discount){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.discount}),
                        $('<span/>',{class:'',text:`${activity.old_promocode.discount}%`})
                    )
                )
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.discount}),
                        $('<span/>',{class:'',text:`${activity.new_promocode.discount}%`})
                    )
                )
            }
            if(activity.old_promocode.is_expires != activity.new_promocode.is_expires || activity.old_promocode.expires_at != activity.new_promocode.expires_at){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:`${activity.old_promocode.is_expires == 1 ? '' : 'ico-no cR mie-5'}`,text:activity.old_promocode.is_expires == 1 ? getDate(activity.old_promocode.expires_at).date.restaurant : ''}),
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.expiryDate}),
                    )
                )
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:`${activity.new_promocode.is_expires == 1 ? '' : 'ico-no cR mie-5'}`,text:activity.new_promocode.is_expires == 1 ? getDate(activity.new_promocode.expires_at).date.restaurant : ''}),
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.expiryDate}),
                    )
                )
            }
            if(activity.old_promocode.minimum != activity.new_promocode.minimum){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.minimumOrder}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.old_promocode.minimum}`})
                    )
                )
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.minimumOrder}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.new_promocode.minimum}`})
                    )
                )
            }
            if(activity.old_promocode.cap != activity.new_promocode.cap){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.discountCap}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.old_promocode.cap}`})
                    )
                )
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.discountCap}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.new_promocode.cap}`})
                    )
                )
            }
            if(activity.old_promocode.is_oneUse != activity.new_promocode.is_oneUse){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.old_promocode.is_oneUse == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_oneUse}),
                    )
                )
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.new_promocode.is_oneUse == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_oneUse}),
                    )
                )
            }
            if(activity.old_promocode.is_guest != activity.new_promocode.is_guest){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.old_promocode.is_guest == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_guest}),
                    )
                )
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.new_promocode.is_guest == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_guest}),
                    )
                )
            }
            if(activity.old_promocode.is_delivery != activity.new_promocode.is_delivery){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.old_promocode.is_delivery == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_delivery}),
                    )
                )
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.new_promocode.is_delivery == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_delivery}),
                    )
                )
            }
            if(activity.old_promocode.is_pickup != activity.new_promocode.is_pickup){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.old_promocode.is_pickup == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_pickup}),
                    )
                )
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`${activity.new_promocode.is_pickup == 1 ? 'fs07 ico-check cG mie-5' : 'fs08 ico-no cR mie-5'}`}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.is_pickup}),
                    )
                )
            }
        break;
        case 'settings.language.edit_options':
            if(activity.old_lang.flag != activity.new_lang.flag){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.langFlag}),
                        $('<img/>',{class:'w30 br3',src:`/storage/imgs/flags/${activity.old_lang.flag}.png`})
                    )
                )
                to.append(
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.langFlag}),
                        $('<img/>',{class:'w30 br3',src:`/storage/imgs/flags/${activity.new_lang.flag}.png`})
                    )
                )
            }
            if(activity.old_lang.name != activity.new_lang.name){
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:' c_white-10 mie-3',text:texts.dashboard.langName}),
                        $('<span/>',{class:'',text:activity.old_lang.name})
                    )
                )
                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:' c_white-10 mie-3',text:texts.dashboard.langName}),
                        $('<span/>',{class:'',text:activity.new_lang.name})
                    )
                )
            }
        break;
        case 'settings.dinein.service':
            if(
                activity.old_dinein_settings.useDineInServiceCost != activity.new_dinein_settings.useDineInServiceCost ||
                activity.old_dinein_settings.dineInServiceCost != activity.new_dinein_settings.dineInServiceCost ||
                activity.old_dinein_settings.dineInServicePercentage != activity.new_dinein_settings.dineInServicePercentage
            ){
                if(activity.old_dinein_settings.useDineInServiceCost == 1){
                    from.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.old_dinein_settings.dineInServiceCost}`})
                    )
                }else{
                    from.append(
                        $('<div/>',{class:'fs08',text:`${activity.old_dinein_settings.dineInServicePercentage}%`})
                    )
                }

                if(activity.new_dinein_settings.useDineInServiceCost == 1){
                    to.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.new_dinein_settings.dineInServiceCost}`})
                    )
                }else{
                    to.append(
                        $('<div/>',{class:'fs08',text:`${activity.new_dinein_settings.dineInServicePercentage}%`})
                    )
                }
            }
        break;
        case 'settings.dinein.tax':
            if(
                activity.old_dinein_settings.useDineInTaxCost != activity.new_dinein_settings.useDineInTaxCost ||
                activity.old_dinein_settings.dineInTaxCost != activity.new_dinein_settings.dineInTaxCost ||
                activity.old_dinein_settings.dineInTaxPercentage != activity.new_dinein_settings.dineInTaxPercentage
            ){
                if(activity.old_dinein_settings.useDineInTaxCost == 1){
                    from.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.old_dinein_settings.dineInTaxCost}`})
                    )
                }else{
                    from.append(
                        $('<div/>',{class:'fs08',text:`${activity.old_dinein_settings.dineInTaxPercentage}%`})
                    )
                }

                if(activity.new_dinein_settings.useDineInTaxCost == 1){
                    to.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.new_dinein_settings.dineInTaxCost}`})
                    )
                }else{
                    to.append(
                        $('<div/>',{class:'fs08',text:`${activity.new_dinein_settings.dineInTaxPercentage}%`})
                    )
                }
            }
        break;
        case 'settings.pickup.averagePickupTime':
            let old_avgTime; let new_avgTime;
            if(activity.old_pickup_settings == 0){old_avgTime = texts.cpanel.public.asSoonAsPossible;
            }else if(activity.old_pickup_settings == 1){old_avgTime = `${activity.old_pickup_settings} ${texts.cpanel.diffTime.min}`;
            }else if(activity.old_pickup_settings > 1 && activity.old_pickup_settings < 60){old_avgTime = `${activity.old_pickup_settings} ${texts.cpanel.diffTime.mins}`;
            }else if(activity.old_pickup_settings == 60){old_avgTime = `${parseInt(activity.old_pickup_settings)/60} ${texts.cpanel.diffTime.hour}`;
            }else if(activity.old_pickup_settings > 60 && activity.old_pickup_settings < 1440){old_avgTime = `${parseInt(activity.old_pickup_settings)/60} ${texts.cpanel.diffTime.hours}`;
            }else if(activity.old_pickup_settings == 1440){old_avgTime = `${parseInt(activity.old_pickup_settings)/1440} ${texts.cpanel.diffTime.day}`;
            }else if(activity.old_pickup_settings > 1440){old_avgTime = `${parseInt(activity.old_pickup_settings)/1440} ${texts.cpanel.diffTime.days}`;}
            from.append(
                $('<div/>',{class:'fs08',text:old_avgTime})
            )

            if(activity.new_pickup_settings == 0){new_avgTime = texts.cpanel.public.asSoonAsPossible;
            }else if(activity.new_pickup_settings == 1){new_avgTime = `${activity.new_pickup_settings} ${texts.cpanel.diffTime.min}`;
            }else if(activity.new_pickup_settings > 1 && activity.new_pickup_settings < 60){new_avgTime = `${activity.new_pickup_settings} ${texts.cpanel.diffTime.mins}`;
            }else if(activity.new_pickup_settings == 60){new_avgTime = `${parseInt(activity.new_pickup_settings)/60} ${texts.cpanel.diffTime.hour}`;
            }else if(activity.new_pickup_settings > 60 && activity.new_pickup_settings < 1440){new_avgTime = `${parseInt(activity.new_pickup_settings)/60} ${texts.cpanel.diffTime.hours}`;
            }else if(activity.new_pickup_settings == 1440){new_avgTime = `${parseInt(activity.new_pickup_settings)/1440} ${texts.cpanel.diffTime.day}`;
            }else if(activity.new_pickup_settings > 1440){new_avgTime = `${parseInt(activity.new_pickup_settings)/1440} ${texts.cpanel.diffTime.days}`;}
            to.append(
                $('<div/>',{class:'fs08',text:new_avgTime})
            )

        break;
        case 'settings.pickup.paymentMethods':
                for(const key in activity.old_pickup_settings){
                    from.append(
                        $('<div/>',{class:''}).append(
                            $('<span/>',{class:`mie-5 ${activity.old_pickup_settings[key] == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                            $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings[key]}),
                        )
                    )

                    to.append(
                        $('<div/>',{class:''}).append(
                            $('<span/>',{class:`mie-5 ${activity.new_pickup_settings[key] == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                            $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings[key]}),
                        )
                    )
                }
        break;
        case 'settings.pickup.minimum_charge':
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.pickupMinimumCharge}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.old_pickup_settings.pickupMinimumCharge}`}),
                    ),
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${activity.old_pickup_settings.pickupMinimumChargeIncludes == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.pickupMinimumChargeIncludes}),
                    )
                )

                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.pickupMinimumCharge}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.new_pickup_settings.pickupMinimumCharge}`}),
                    ),
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${activity.new_pickup_settings.pickupMinimumChargeIncludes == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.pickupMinimumChargeIncludes}),
                    )
                )
        break;
        case 'settings.pickup.tax':
            if(
                activity.old_pickup_settings.usePickupTaxCost != activity.new_pickup_settings.usePickupTaxCost ||
                activity.old_pickup_settings.pickupTaxCost != activity.new_pickup_settings.pickupTaxCost ||
                activity.old_pickup_settings.pickupTaxPercentage != activity.new_pickup_settings.pickupTaxPercentage
            ){
                if(activity.old_pickup_settings.usePickupTaxCost == 1){
                    from.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.old_pickup_settings.pickupTaxCost}`})
                    )
                }else{
                    from.append(
                        $('<div/>',{class:'fs08',text:`${activity.old_pickup_settings.pickupTaxPercentage}%`})
                    )
                }

                if(activity.new_pickup_settings.usePickupTaxCost == 1){
                    to.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.new_pickup_settings.pickupTaxCost}`})
                    )
                }else{
                    to.append(
                        $('<div/>',{class:'fs08',text:`${activity.new_pickup_settings.pickupTaxPercentage}%`})
                    )
                }
            }
        break;
        case 'settings.delivery.tax':
            if(
                activity.old_delivery_settings.useDeliveryTaxCost != activity.new_delivery_settings.useDeliveryTaxCost ||
                activity.old_delivery_settings.deliveryTaxCost != activity.new_delivery_settings.deliveryTaxCost ||
                activity.old_delivery_settings.deliveryTaxPercentage != activity.new_delivery_settings.deliveryTaxPercentage
            ){
                if(activity.old_delivery_settings.useDeliveryTaxCost == 1){
                    from.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.old_delivery_settings.deliveryTaxCost}`})
                    )
                }else{
                    from.append(
                        $('<div/>',{class:'fs08',text:`${activity.old_delivery_settings.deliveryTaxPercentage}%`})
                    )
                }

                if(activity.new_delivery_settings.useDeliveryTaxCost == 1){
                    to.append(
                        $('<div/>',{class:'fs08',text:`${website.currency}${activity.new_delivery_settings.deliveryTaxCost}`})
                    )
                }else{
                    to.append(
                        $('<div/>',{class:'fs08',text:`${activity.new_delivery_settings.deliveryTaxPercentage}%`})
                    )
                }
            }
        break;
        case 'settings.delivery.minimum_charge':
                from.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.deliveryMinimumCharge}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.old_delivery_settings.deliveryMinimumCharge}`}),
                    ),
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${activity.old_delivery_settings.deliveryMinimumChargeIncludes == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.deliveryMinimumChargeIncludes}),
                    )
                )

                to.append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.deliveryMinimumCharge}),
                        $('<span/>',{class:'',text:`${website.currency}${activity.new_delivery_settings.deliveryMinimumCharge}`}),
                    ),
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${activity.new_delivery_settings.deliveryMinimumChargeIncludes == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.deliveryMinimumChargeIncludes}),
                    )
                )
        break;
        case 'settings.delivery.paymentMethods':
            for(const key in activity.old_delivery_settings){
                from.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${activity.old_delivery_settings[key] == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings[key]}),
                    )
                )

                to.append(
                    $('<div/>',{class:''}).append(
                        $('<span/>',{class:`mie-5 ${activity.new_delivery_settings[key] == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                        $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings[key]}),
                    )
                )
            }
    break;
        case 'settings.delivery.averageDeliveryTime':
            let old_avgTime2; let new_avgTime2;
            if(activity.old_delivery_settings == 0){old_avgTime2 = texts.cpanel.public.asSoonAsPossible;
            }else if(activity.old_delivery_settings == 1){old_avgTime2 = `${activity.old_delivery_settings} ${texts.cpanel.diffTime.min}`;
            }else if(activity.old_delivery_settings > 1 && activity.old_delivery_settings < 60){old_avgTime2 = `${activity.old_delivery_settings} ${texts.cpanel.diffTime.mins}`;
            }else if(activity.old_delivery_settings == 60){old_avgTime2 = `${parseInt(activity.old_delivery_settings)/60} ${texts.cpanel.diffTime.hour}`;
            }else if(activity.old_delivery_settings > 60 && activity.old_delivery_settings < 1440){old_avgTime2 = `${parseInt(activity.old_delivery_settings)/60} ${texts.cpanel.diffTime.hours}`;
            }else if(activity.old_delivery_settings == 1440){old_avgTime2 = `${parseInt(activity.old_delivery_settings)/1440} ${texts.cpanel.diffTime.day}`;
            }else if(activity.old_delivery_settings > 1440){old_avgTime2 = `${parseInt(activity.old_delivery_settings)/1440} ${texts.cpanel.diffTime.days}`;}
            from.append(
                $('<div/>',{class:'fs08',text:old_avgTime2})
            )

            if(activity.new_delivery_settings == 0){new_avgTime2 = texts.cpanel.public.asSoonAsPossible;
            }else if(activity.new_delivery_settings == 1){new_avgTime2 = `${activity.new_delivery_settings} ${texts.cpanel.diffTime.min}`;
            }else if(activity.new_delivery_settings > 1 && activity.new_delivery_settings < 60){new_avgTime2 = `${activity.new_delivery_settings} ${texts.cpanel.diffTime.mins}`;
            }else if(activity.new_delivery_settings == 60){new_avgTime2 = `${parseInt(activity.new_delivery_settings)/60} ${texts.cpanel.diffTime.hour}`;
            }else if(activity.new_delivery_settings > 60 && activity.new_delivery_settings < 1440){new_avgTime2 = `${parseInt(activity.new_delivery_settings)/60} ${texts.cpanel.diffTime.hours}`;
            }else if(activity.new_delivery_settings == 1440){new_avgTime2 = `${parseInt(activity.new_delivery_settings)/1440} ${texts.cpanel.diffTime.day}`;
            }else if(activity.new_delivery_settings > 1440){new_avgTime2 = `${parseInt(activity.new_delivery_settings)/1440} ${texts.cpanel.diffTime.days}`;}
            to.append(
                $('<div/>',{class:'fs08',text:new_avgTime2})
            )

        break;
        case 'settings.delivery.deliveryCost':
            from.append(
                $('<div/>',{class:'fs08'}).append(
                    $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.deliveryCost}),
                    $('<span/>',{class:'',text:`${website.currency}${activity.old_delivery_settings.deliveryCost}`}),
                ),
                $('<div/>',{class:''}).append(
                    $('<span/>',{class:`mie-5 ${activity.old_delivery_settings.showDeliveryCostChangable == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                    $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.deliveryCanChangeMsg}),
                )
            )

            to.append(
                $('<div/>',{class:'fs08'}).append(
                    $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.deliveryCost}),
                    $('<span/>',{class:'',text:`${website.currency}${activity.new_delivery_settings.deliveryCost}`}),
                ),
                $('<div/>',{class:''}).append(
                    $('<span/>',{class:`mie-5 ${activity.new_delivery_settings.showDeliveryCostChangable == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                    $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.deliveryCanChangeMsg}),
                )
            )
        break;
        case 'settings.service.workingHours':
            let workingHours_from_from = floatToTime(activity.old_working_hours.from.split('.')[0],activity.old_working_hours.from.split('.')[1])
            let workingHours_from_to = floatToTime(activity.old_working_hours.to.split('.')[0],activity.old_working_hours.to.split('.')[1])
            let workingHours_to_from = floatToTime(activity.new_working_hours.from.split('.')[0],activity.new_working_hours.from.split('.')[1])
            let workingHours_to_to = floatToTime(activity.new_working_hours.to.split('.')[0],activity.new_working_hours.to.split('.')[1])

            let workingHours_from_fromD = floatToTime(activity.old_working_hours.Dfrom.split('.')[0],activity.old_working_hours.Dfrom.split('.')[1])
            let workingHours_from_toD = floatToTime(activity.old_working_hours.Dto.split('.')[0],activity.old_working_hours.Dto.split('.')[1])
            let workingHours_to_fromD = floatToTime(activity.new_working_hours.Dfrom.split('.')[0],activity.new_working_hours.Dfrom.split('.')[1])
            let workingHours_to_toD = floatToTime(activity.new_working_hours.Dto.split('.')[0],activity.new_working_hours.Dto.split('.')[1])

            from.append(
                $('<div/>',{class:''}).append(
                    $('<span/>',{class:`mie-5 ${activity.old_working_hours.working == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                    $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.WorkingDay}),
                ),
            )
            if(activity.old_working_hours.working){
                if(activity.old_working_hours.working24 == 1){
                    from.append(
                        $('<div/>',{class:`fs08`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.workingHours}),
                            $('<span/>',{class:'',text:texts.settings.working24Hours}),
                        ),
                    )
                }else{
                    from.append(
                        $('<div/>',{class:`fs08`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.workingHours}),
                            $('<span/>',{class:'',text:`${workingHours_from_from[0]}:${workingHours_from_from[1]} ${workingHours_from_from[2]} ~ ${workingHours_from_to[0]}:${workingHours_from_to[1]} ${workingHours_from_to[2]}`}),
                        ),
                    )
                }
                if(activity.old_working_hours.discount > 0){
                    from.append(
                        $('<div/>',{class:`fs08`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.happyHour}),
                            $('<span/>',{class:'',text:`${workingHours_from_fromD[0]}:${workingHours_from_fromD[1]} ${workingHours_from_fromD[2]} ~ ${workingHours_from_toD[0]}:${workingHours_from_toD[1]} ${workingHours_from_toD[2]} (${activity.old_working_hours.discount}% ${texts.settings.discount})`}),
                        ),
                    )
                }else{
                    from.append(
                        $('<div/>',{class:''}).append(
                            $('<span/>',{class:`mie-5 ico-no cR fs08`,}),
                            $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.happyHour}),
                        ),
                    )
                }
            }

            to.append(
                $('<div/>',{class:''}).append(
                    $('<span/>',{class:`mie-5 ${activity.new_working_hours.working == 1 ? 'ico-check cG fs07' : 'ico-no cR fs08'}`,}),
                    $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.dashboard.WorkingDay}),
                ),
            )
            if(activity.new_working_hours.working){
                if(activity.new_working_hours.working24 == 1){
                    to.append(
                        $('<div/>',{class:`fs08`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.workingHours}),
                            $('<span/>',{class:'',text:texts.settings.working24Hours}),
                        ),
                    )
                }else{
                    to.append(
                        $('<div/>',{class:`fs08 ${activity.new_working_hours.working == 0 ? 'none' : ''}`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.workingHours}),
                            $('<span/>',{class:'',text:`${workingHours_to_from[0]}:${workingHours_to_from[1]} ${workingHours_to_from[2]} ~ ${workingHours_to_to[0]}:${workingHours_to_to[1]} ${workingHours_to_to[2]}`}),
                        ),
                    )
                }
                if(activity.new_working_hours.discount > 0){
                    to.append(
                        $('<div/>',{class:`fs08`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.settings.happyHour}),
                            $('<span/>',{class:'',text:`${workingHours_to_fromD[0]}:${workingHours_to_fromD[1]} ${workingHours_to_fromD[2]} ~ ${workingHours_to_toD[0]}:${workingHours_to_toD[1]} ${workingHours_to_toD[2]} (${activity.new_working_hours.discount}% ${texts.settings.discount})`}),
                        ),
                    )
                }else{
                    to.append(
                        $('<div/>',{class:''}).append(
                            $('<span/>',{class:`mie-5 ico-no cR fs08`,}),
                            $('<span/>',{class:'fs08 c_white-10 mie-3',text:texts.settings.happyHour}),
                        ),
                    )
                }
            }
        break;
        case 'user.edited_by_account':
            for(const key in activity.old_user){
                if(activity.old_user[key] != activity.new_user[key]){
                    if(key == 'addresses'){
                        let from_addresses = $('<div/>')
                        let from_addresses_obj = activity.old_user.addresses;
                        if(from_addresses_obj.length == 0){
                            from_addresses.append($('<div/>',{text:texts.dashboard.user_no_addresses}))
                        }
                        for(const key in from_addresses_obj){
                            let address = from_addresses_obj[key]
                            from_addresses.append(
                                $('<ul/>',{class:'mY0'}).append( 
                                    $('<li/>',{class:'m5'}).append(
                                        $('<div/>',{class:'bold600',text:`${texts.dashboard.user_address} ${parseInt(key) + 1}`}),
                                        address.is_default == '1' ? $('<div/>',{class:'mis-3',text:texts.dashboard.user_address_default}):'',
                                        $('<div/>',{class:'mis-3'}).append(
                                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.user_full_address}),
                                            $('<span/>',{text:address.address})
                                        ),
                                        address.lat !== null ? $('<div/>',{class:'mis-3'}).append(
                                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.user_lat}),
                                            $('<span/>',{text:address.lat})
                                        ) : '',
                                        address.lng !== null ? $('<div/>',{class:'mis-3'}).append(
                                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.user_lng}),
                                            $('<span/>',{text:address.lng})
                                        ) : '',
                                    )
                                )
                            )
                        }
                        from.append(
                            $('<div/>',{class:`fs08`}).append(
                                $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard[`user_${key}`]}),
                                from_addresses
                            ),
                        )
                        let to_addresses = $('<div/>')
                        let to_addresses_obj = activity.new_user.addresses;
                        if(to_addresses_obj.length == 0){
                            to_addresses.append($('<div/>',{text:texts.dashboard.user_no_addresses}))
                        }
                        for(const key in to_addresses_obj){
                            let address = to_addresses_obj[key]
                            to_addresses.append(
                                $('<ul/>',{class:'mY0'}).append(
                                    $('<li/>',{class:'m5'}).append(
                                        $('<div/>',{class:'bold600',text:`${texts.dashboard.user_address} ${parseInt(key) + 1}`}),
                                        address.is_default == '1' ? $('<div/>',{class:'mis-3',text:texts.dashboard.user_address_default}):'',
                                        $('<div/>',{class:'mis-3'}).append(
                                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.user_full_address}),
                                            $('<span/>',{text:address.address})
                                        ),
                                        address.lat !== null ? $('<div/>',{class:'mis-3'}).append(
                                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.user_lat}),
                                            $('<span/>',{text:address.lat})
                                        ) : '',
                                        address.lng !== null ? $('<div/>',{class:'mis-3'}).append(
                                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard.user_lng}),
                                            $('<span/>',{text:address.lng})
                                        ) : '',
                                    )
                                )
                            )
                        }
                        to.append(
                            $('<div/>',{class:`fs08`}).append(
                                $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard[`user_${key}`]}),
                                to_addresses
                            ),
                        )
                    }else{
                        from.append(
                            $('<div/>',{class:`fs08`}).append(
                                $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard[`user_${key}`]}),
                                $('<span/>',{class:'',text:activity.old_user[key]}),
                            ),
                        )
                        to.append(
                            $('<div/>',{class:`fs08`}).append(
                                $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard[`user_${key}`]}),
                                $('<span/>',{class:'',text:activity.new_user[key]}),
                            ),
                        )
                    }

                }
            }
            if(activity.new_user.password_changed == 1){
                to.append(
                    $('<span/>',{class:`mie-5 ico-warning cO fs08`}),
                    $('<span/>',{class:'fs08 mie-3',text:texts.dashboard.user_password_changed}),
                )
            }
        break;
        case 'user.edited_by_user':
            for(const key in activity.old_user){
                if(activity.old_user[key] != activity.new_user[key]){
                    from.append(
                        $('<div/>',{class:`fs08`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard[`user_${key}`]}),
                            $('<span/>',{class:'',text:activity.old_user[key]}),
                        ),
                    )
                    to.append(
                        $('<div/>',{class:`fs08`}).append(
                            $('<span/>',{class:'c_white-10 mie-3',text:texts.dashboard[`user_${key}`]}),
                            $('<span/>',{class:'',text:activity.new_user[key]}),
                        ),
                    )
                }
            }
        break;
        case 'user.email_changed':
            from.append(
                $('<div/>',{class:`fs08`}).append(
                    $('<span/>',{class:'',text:activity.old_user}),
                ),
            )
            to.append(
                $('<div/>',{class:`fs08`}).append(
                    $('<span/>',{class:'',text:activity.new_user}),
                ),
            )
        break;

    }

    showPopup('activityLog-seeChanges',function(){
        $('.popupTitle').text(texts.cpanel.menu.activity_log)
        $('.popupBody').addClass('mxw600').text('').append(
            $('<div/>',{class:'mT10 mX10',html:activityTxt}),
            $('<div/>',{class:'fs09 c_white-10 mX10',text:getDate(activity.created_at).date_time_weekday.restaurant}),
            $('<div/>',{class:'area  mT30 pT20'}).append(
                $('<div/>',{class:'areaTitle',text:texts.cpanel.public.from}),
                from
            ),
            $('<div/>',{class:'area  mT30 pT20'}).append(
                $('<div/>',{class:'areaTitle',text:texts.cpanel.public.to}),
                to
            ),
        )
    })
}
//
