require('./orderHistory/findEvents.js')
let getMoreOrders = true;
let noMoreOrders = false;
setOrderHistoryFilters = function(clearOrdersTable = true){
    noMoreOrders = false;
    let filters = window.orderHistoryFilters;
    window.page.dineIn = window.orderHistoryFilters.dineIn;
    window.page.delivered = window.orderHistoryFilters.delivered;
    window.page.pickedUp = window.orderHistoryFilters.pickedUp;
    window.page.canceled = window.orderHistoryFilters.canceled;
    window.page.users = window.orderHistoryFilters.users;
    window.page.guests = window.orderHistoryFilters.guests;
    window.page.userName = window.orderHistoryFilters.userName;
    window.page.userId = window.orderHistoryFilters.userId;
    window.page.orderNumber = window.orderHistoryFilters.orderNumber;

    clearOrdersTable ? new orders().emptyOrderHistoryTable() : null;
    filters.dineIn == 1 ? $('.orderHistoryFilterCheck[filter="dineIn"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    : $('.orderHistoryFilterCheck[filter="dineIn"]').children().first().removeClass('ico-check1').addClass('ico-check0');
    filters.delivered == 1 ? $('.orderHistoryFilterCheck[filter="delivered"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    : $('.orderHistoryFilterCheck[filter="delivered"]').children().first().removeClass('ico-check1').addClass('ico-check0');
    filters.pickedUp == 1 ? $('.orderHistoryFilterCheck[filter="pickedUp"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    : $('.orderHistoryFilterCheck[filter="pickedUp"]').children().first().removeClass('ico-check1').addClass('ico-check0');
    filters.canceled == 1 ? $('.orderHistoryFilterCheck[filter="canceled"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    : $('.orderHistoryFilterCheck[filter="canceled"]').children().first().removeClass('ico-check1').addClass('ico-check0');

    if(filters.userId == null || filters.userId == ''){
        filters.users == 1 ? $('.orderHistoryFilterCheck[filter="users"]').children().first().removeClass('ico-check0').addClass('ico-check1')
        : $('.orderHistoryFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0');
        filters.guests == 1 ? $('.orderHistoryFilterCheck[filter="guests"]').children().first().removeClass('ico-check0').addClass('ico-check1')
        : $('.orderHistoryFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0');
    }else{
        $('.orderHistoryMoreFiltersContainer').addClass('orderHistoryMoreFiltersContainer_expand')
        $('#orderHistoryMoreFilters').text(texts.orders.lessFilters)
        $('#orderHistory-selectUser').val(filters.userName).attr('key',filters.userId);
        $('.orderHistoryFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0');
        $('.orderHistoryFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0');
    }
    if(filters.orderNumber != null && filters.orderNumber != ''){
        $('#orderHistory-selectUser').val('').attr('key',null);
        $('.orderHistoryMoreFiltersContainer').addClass('orderHistoryMoreFiltersContainer_expand')
        $('#orderHistoryMoreFilters').text(texts.orders.lessFilters)
        $('#orderHistory-orderNumber').val(filters.orderNumber)
    }
}


findOrders = function(){
    getMoreOrders = false;
    $('#orderHistory-orderListContainer_loading').removeClass('none');
    let findOrderStatuses = [];
    let users; let guests;
    let userId = null;
    let orderNumber = null;
    window.orderHistoryFilters.dineIn == 1  ? findOrderStatuses.push(7) : null;
    window.orderHistoryFilters.delivered == 1  ? findOrderStatuses.push(5) : null;
    window.orderHistoryFilters.pickedUp == 1  ? findOrderStatuses.push(6) : null;
    window.orderHistoryFilters.canceled == 1  ? findOrderStatuses.push(2) : null;

    let findOrdersAfter = '';
    if($('#orderHistory-orderListContainer').children().first().children().length > 0){findOrdersAfter = $('#orderHistory-orderListContainer').children().first().children().last().attr('placed_at')}

    showBtnLoading($('#orderHistory-FindBtn'));
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            findOrders:true,
            findOrdersAfter:findOrdersAfter,
            findOrderStatuses:findOrderStatuses,
            users:window.orderHistoryFilters.users,
            guests:window.orderHistoryFilters.guests,
            userId:window.orderHistoryFilters.userId,
            orderNumber:window.orderHistoryFilters.orderNumber,
        },success:function(r){
            console.log(r)
            hideBtnLoading($('#orderHistory-FindBtn'));
            $('#orderHistory-orderListContainer_loading').addClass('none');
            if(r.orders.length == 0){
                noMoreOrders = true;

            }else{
                noMoreOrders = false;
                for(const key in r.orders){
                    new orders().drawOrderHistoryRow(r.orders[key]);
                }
            }
            if($('#orderHistory-orderListContainer').children().first().children().length == 1){
                $('#orderHistory-orderListContainer').addClass('none')
                $('#orderHistory-orderListNoOrders').removeClass('none');
            }else{
                $('#orderHistory-orderListContainer').removeClass('none')
                $('#orderHistory-orderListNoOrders').addClass('none');
            }

        }
    }).done(function(){
        getMoreOrders = true;
    })
}
$('#bodyPage').on('scroll',function(){
    if(window.history.state.page == 'order_history' && getMoreOrders && !noMoreOrders && window.orderHistoryFilters.orderNumber == ''){
        if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 100){
            findOrders();
        }
    }
})

$('#orderHistory-FindBtn').on('click',function(){

    $('.orderHistoryFilterCheck[filter="dineIn"]').children().first().hasClass('ico-check1') ? window.orderHistoryFilters.dineIn = 1 : window.orderHistoryFilters.dineIn = 0;
    $('.orderHistoryFilterCheck[filter="delivered"]').children().first().hasClass('ico-check1') ? window.orderHistoryFilters.delivered = 1 : window.orderHistoryFilters.delivered = 0;
    $('.orderHistoryFilterCheck[filter="pickedUp"]').children().first().hasClass('ico-check1') ? window.orderHistoryFilters.pickedUp = 1: window.orderHistoryFilters.pickedUp = 0;
    $('.orderHistoryFilterCheck[filter="canceled"]').children().first().hasClass('ico-check1') ? window.orderHistoryFilters.canceled = 1: window.orderHistoryFilters.canceled = 0;

    $('.orderHistoryFilterCheck[filter="users"]').children().first().hasClass('ico-check1') ?  window.orderHistoryFilters.users = 1 : window.orderHistoryFilters.users = 0;
    $('.orderHistoryFilterCheck[filter="guests"]').children().first().hasClass('ico-check1') ?  window.orderHistoryFilters.guests = 1 : window.orderHistoryFilters.guests = 0;
    $('#orderHistory-selectUser').attr('key') == '' ? window.orderHistoryFilters.userId = '' : window.orderHistoryFilters.userId = $('#orderHistory-selectUser').attr('key') ?? '';
    $('#orderHistory-selectUser').attr('key') == '' ? window.orderHistoryFilters.userName = '' : window.orderHistoryFilters.userName = $('#orderHistory-selectUser').val() ?? '';
    $('#orderHistory-orderNumber').val() == '' ? window.orderHistoryFilters.orderNumber = '' : window.orderHistoryFilters.orderNumber = $('#orderHistory-orderNumber').val() ?? '';
    setOrderHistoryFilters();
    pushHistory(false);
    findOrders();
})
