window.orderhistoryFirstLoad = false;
window.loadMoreOrderHistory = true;
window.noMoreOrderHistory = false;
loadOrderHitory = function(){
    if(!loadMoreOrderHistory || noMoreOrderHistory){return;}
    showLoading($('#ordersHistory-Loading'),false)
    loadMoreOrderHistory = false;
    let getMoreOrdersAfter = null;
    let lastOrderId = null;
    if(orderhistoryFirstLoad){
        getMoreOrdersAfter = $('#orderHistoryContainer').children().last().attr('placedAt');
        lastOrderId = $('#orderHistoryContainer').children().last().attr('orderId');
    }
    $.ajax({
        url:'/website/order',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getOrderHistory:true,
            getMoreOrdersAfter:getMoreOrdersAfter,
            lastOrderId:lastOrderId,
        },success:function(response){
            orderhistoryFirstLoad = true;
            hideLoading($('#ordersHistory-Loading'),false);
            if(response.orders.length == 0){
                noMoreOrderHistory = true;
            }else{
                $('#noOrderHistory').addClass('none')
                for(const key in response.orders){
                    window.orders[response.orders[key].id] = response.orders[key];
                    drawOrderHistoryCard(response.orders[key]);
                }
            }
            if(Object.keys(window.orders).length == 0){
                $('#noOrderHistory').removeClass('none')
            }
        }
    }).done(function(){
        loadMoreOrderHistory = true;
    })

}
$('#body').on('scroll',function(){
    if($('#orderHistoryContainer').offset().top + $('#orderHistoryContainer').height() < $('#body').scrollTop()
        && !$('#profilepage').hasClass('none')
        && !$('#profilePage-ordersHistory').hasClass('none')
    ){
        loadOrderHitory();
    }

})
$('html, body').on('click','.orderHistory',function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    navMobileClose()
    hidePopup();
    var status = {
        'status': 'user_checkOrderHistory',
    }
    userStatus(status);
    if($('#profilepage').hasClass('none')){
        switchPage($('#profilepage'),showProfilePage('orderHistory'))
        window.history.pushState({'page':'profile'},``, `https://${website.url}/${lang}/profile`);
        document.title =  user.name+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])
    }else{
        showProfilePage('orderHistory')
        currentPage();
    }

    // showPopup($('#ordersHistory-popup'),null,function(){
        if(orderhistoryFirstLoad == false){
            loadOrderHitory();
        }
    // })
})
