$('body').on('click','#orderHistory_findOrdersBtn',function(e){
    //
    window.page.orderHistory_page = 1;
    window.page.orderNumber = $('#orderHistory-orderNumber').val()
    //
    if( $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').hasClass('ico-check1')){
        if($('#orderHistoryFor_findUser').attr('key') == null || $('#orderHistoryFor_findUser').attr('key') == ''){
            $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.orderHistoryFor_findUserContainer').addClass('none');
            $('#orderHistoryFor_findUser').attr('key',null).val('');
            $('.orderHistoryFor[orderHistoryFor="users"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1')
            $('.orderHistoryFor[orderHistoryFor="guests"]').find('.orderHistoryForCheck').removeClass('ico-check0').addClass('ico-check1')
        }
    }
    $('.orderHistoryFor[orderHistoryFor="users"]').find('.orderHistoryForCheck').hasClass('ico-check1') ? window.page.byUsers = 1 : window.page.byUsers = 0;
    $('.orderHistoryFor[orderHistoryFor="guests"]').find('.orderHistoryForCheck').hasClass('ico-check1') ? window.page.byGuests = 1 : window.page.byGuests = 0;
    $('.orderHistoryFor[orderHistoryFor="user"]').find('.orderHistoryForCheck').hasClass('ico-check1') ? window.page.user = $('#orderHistoryFor_findUser').attr('key') : window.page.user = '';
    //
    $('.orderHistoryStatusBy[orderHistoryStatusBy="dinedIn"]').find('.orderHistoryStatusByCheck').hasClass('ico-check1') ? window.page.dinedIn = 1 : window.page.dinedIn = 0;
    $('.orderHistoryStatusBy[orderHistoryStatusBy="pickedUp"]').find('.orderHistoryStatusByCheck').hasClass('ico-check1') ? window.page.pickedUp = 1 : window.page.pickedUp = 0;
    $('.orderHistoryStatusBy[orderHistoryStatusBy="delivered"]').find('.orderHistoryStatusByCheck').hasClass('ico-check1') ? window.page.delivered = 1 : window.page.delivered = 0;
    $('.orderHistoryStatusBy[orderHistoryStatusBy="canceled"]').find('.orderHistoryStatusByCheck').hasClass('ico-check1') ? window.page.canceled = 1 : window.page.canceled = 0;
    //
    pushHistory(false);
    getOrderHistory();
})
$('body').on('click','.orderHistoryTR',function(e){
    window.page.orderBy = $(this).attr('order_by');
    window.page.sort = 'desc';
    if($(this).find('.orderHistoryTRArrow').hasClass('ico-down')){
        window.page.sort = 'asc';
    }
    pushHistory(false);
    getOrderHistory()
})
$('body').on('click','.orderHistoryNext',function(e){
    if($(this).hasClass('orderHistoryArrow_dump')){return;}
    window.page.orderHistory_page = parseInt(window.page.orderHistory_page) + 1;
    pushHistory(false)
    getOrderHistory()
})
$('body').on('click','.orderHistoryPrev',function(e){
    if($(this).hasClass('orderHistoryArrow_dump')){return;}
    window.page.orderHistory_page = parseInt(window.page.orderHistory_page) - 1;
    pushHistory(false)
    getOrderHistory()
})
