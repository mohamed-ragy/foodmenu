$('html,body').on('click','.popupPageTab_order_activites',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    draw_orderActivities_loading();
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getOrderActivities:true,
            order_id:window.history.state.order
        },success:function(r){
            getOrder(window.history.state.order).then((order)=>{
                order.activities = r.activities;
            });
            drawOrderActivities(r.activities);
        }
    })
})
//
$('html,body').on('click','.order-seeChanges-orderNotice',function(e){
    e.stopImmediatePropagation();
    let activity_id = $(this).attr('activity');
    getOrder(window.history.state.order).then((order)=>{
        let activity = order.activities.find(i=>i._id == activity_id);
        let date = getDate(activity.created_at).date_time_weekday.restaurant;
        showPopup('orderChanges',function(){
        $('.popupTitle').text(texts.orders.orderHashNumber.replace(':order:',activity.order_number));
            $('.popupBody').addClass('popupCard-400').append(
                $('<div/>',{class:'mB30'}).append(
                    $('<div/>',{class:'fs09',html:texts.orders['order.update.notice'].replace(':account:',`<a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.account_id}">${activity.account_name}</a>`)}),
                    $('<div/>',{class:'fs08 c_white-10',text:date})
                ),
                $('<div/>',{class:'area mnh100'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.from}),
                    $('<div/>',{class:'fs09 cR',text:activity.old_orderNotice})
                ),
                $('<div/>',{class:'area mnh100'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.to}),
                    $('<div/>',{class:'fs09 cB',text:activity.new_orderNotice})
                )
            )
        })
    })
})
$('html,body').on('click','.order-seeChanges-address',function(e){
    e.stopImmediatePropagation();
    let activity_id = $(this).attr('activity');
    getOrder(window.history.state.order).then((order)=>{
        let activity = order.activities.find(i=>i._id == activity_id);
        let date = getDate(activity.created_at).date_time_weekday.restaurant;
        showPopup('orderChanges',function(){
        $('.popupTitle').text(texts.orders.orderHashNumber.replace(':order:',activity.order_number));
            $('.popupBody').addClass('popupCard-400').append(
                $('<div/>',{class:'mB30'}).append(
                    $('<div/>',{class:'fs09',html:texts.orders['order.update.address'].replace(':account:',`<a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.account_id}">${activity.account_name}</a>`)}),
                    $('<div/>',{class:'fs08 c_white-10',text:date})
                ),
                $('<div/>',{class:'area mnh50'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.from}),
                    $('<div/>',{class:'fs09 cR',text:activity.old_address})
                ),
                $('<div/>',{class:'area mnh50'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.to}),
                    $('<div/>',{class:'fs09 cB',text:activity.new_address})
                )
            )
        })
    })
})
$('html,body').on('click','.order-seeChanges-itemNotice',function(e){
    e.stopImmediatePropagation();
    let activity_id = $(this).attr('activity');
    getOrder(window.history.state.order).then((order)=>{
        let activity = order.activities.find(i=>i._id == activity_id);
        let date = getDate(activity.created_at).date_time_weekday.restaurant;
        showPopup('orderChanges',function(){
        $('.popupTitle').text(texts.orders.orderHashNumber.replace(':order:',activity.order_number));
            $('.popupBody').addClass('popupCard-400').append(
                $('<div/>',{class:'mB30'}).append(
                    $('<div/>',{class:'fs09',html:texts.orders['order.update.itemNotice'].replace(':account:',`<a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.account_id}">${activity.account_name}</a>`).replace(':product:',`<a class="popupPage popupId" product="${activity.product_name}" popupPage="product" popupId="product">${activity.product_name}</a>`)}),
                    $('<div/>',{class:'fs08 c_white-10',text:date})
                ),
                $('<div/>',{class:'area mnh100'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.from}),
                    $('<div/>',{class:'fs09 cR',text:activity.old_itemNotice})
                ),
                $('<div/>',{class:'area mnh100'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.to}),
                    $('<div/>',{class:'fs09 cB',text:activity.new_itemNotice})
                )
            )
        })
    })
})
