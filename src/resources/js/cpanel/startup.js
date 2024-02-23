window.websocketConnectCheckIntrval = null;
window.Echo.connector.pusher.connection.bind('state_change', (states) => {
    clearInterval(window.websocketConnectCheckIntrval);
    console.log(states.current);
    if(states.current == 'connected'){
        window.websocketServerConnected = true;
        window.websocketConnectCheckIntrval = setInterval(function(){
            if(window.globalChannelConnected == true && window.websocketServerConnected == true){
                clearInterval(window.websocketConnectCheckIntrval);
                closePopup()
                loadWebsiteOrdersAndChats();
            }
        },200)
    }
    if(states.current == 'connecting'){
        window.websocketServerConnected == false
        $('#connectionLost-popupMsg').text(texts.cpanel.public.connectionlost2)
        showPopup('connectionLost')
        window.waitFor_loadWebsiteOrdersAndChats = true;
    }
    if(states.current == 'unavailable' || states.current == 'failed'){
        window.websocketServerConnected == false
        $('#connectionLost-popupMsg').text(texts.cpanel.public.connectionlost3)
        showPopup('connectionLost')
        window.waitFor_loadWebsiteOrdersAndChats = true;
    }
});
window.Echo.connector.pusher.connection.bind('connected', () => {
    $.ajaxSetup({
        headers: {
            'X-Socket-Id': window.Echo.socketId(),
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content'),
        },
        error:function(jqXHR, textStatus, errorThrown){
            // console.log(jqXHR)
            if(jqXHR.status == 401){
                //Unauthorized
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 402){
                //Payment Required
                showAlert('error',jqXHR.responseJSON.message,6000,true)
            }
            else if(jqXHR.status == 403){
                //Forbidden
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 404){
                // Not Found
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 419){
                // Page Expired
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 429){
                //Too Many Requests
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 500){
                //Internal Server Error
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
            else if(jqXHR.status == 503){
                //Service Unavailable
                showAlert('error',texts.cpanel.public.connectionError,6000,true)
            }
        }
    });
});

startup = function(){
    process_data();

    window.globalChannel = window.Echo.join(`globalChannel.${website.id}`);
    window.cpanelChannel = window.Echo.private(`cpanelChannel.${website.id}`);
    setGlobalChannel();
    setCpanelChannel();

    $('#cpanelLoading').css('transition-duration','800ms');
    $('#cpanelLoading').css('opacity',0);
    setTimeout(()=>{
        $('#cpanelLoading').hide();
        $('#cpanelLoading').css('transition-duration','0ms');
        loadPinnedHelp();
    },510)
    showFirstPage();


}
showFirstPage = function(){

    let params = new URLSearchParams(window.location.search)
    let pageParam = 'home';
    let pageTabParam = null;
    params.get('page') != null ? pageParam = params.get('page') : null;
    params.get('tab') != null ? pageTabParam = params.get('tab') : null;
    let keysObj = {};
    switch(pageParam){
        case 'statistics_and_analytics':
            keysObj.year1 = params.get('year1')
            keysObj.month1 = params.get('month1')
            keysObj.day1 = params.get('day1')
            keysObj.period = params.get('period')
            keysObj.compare = params.get('compare')
            keysObj.year2 = params.get('year2')
            keysObj.month2 = params.get('month2')
            keysObj.day2 = params.get('day2')
        break;
        case 'activity_log':
            keysObj.year = params.get('year') ?? new Date().getFullYear();
            keysObj.month = params.get('month') ?? parseInt(new Date().getMonth() ) + 1;
            keysObj.day = params.get('day') ?? new Date().getDate();
        break;
        case 'order_history':
            keysObj.orderHistory_page = params.get('orderHistory_page')
            keysObj.orderBy = params.get('orderBy')
            keysObj.sort = params.get('sort')
            keysObj.orderNumber = params.get('orderNumber')
            keysObj.dinedIn = params.get('dinedIn')
            keysObj.pickedUp = params.get('pickedUp')
            keysObj.delivered = params.get('delivered')
            keysObj.canceled = params.get('canceled')
            keysObj.user = params.get('user')
            keysObj.byUsers = params.get('byUsers')
            keysObj.byGuests = params.get('byGuests')
        break;
        case 'incomplete_orders':
            keysObj.order_by = params.get('order_by') ?? 'placed_at';
            keysObj.sort = params.get('sort') ?? 'desc';
        break;
        case 'manage_users':
            keysObj.user = params.get('user')
        break;
        case 'manage_products':
            keysObj.category = params.get('category')
        break;
        case 'product_reviews':
            keysObj.product = params.get('product')
            keysObj.user = params.get('user')
            keysObj.byUsers = params.get('byUsers')
            keysObj.byGuests = params.get('byGuests')
            keysObj.star1 = params.get('star1')
            keysObj.star2 = params.get('star2')
            keysObj.star3 = params.get('star3')
            keysObj.star4 = params.get('star4')
            keysObj.star5 = params.get('star5')
        break;
    }
    showPage(pageParam,pageTabParam,keysObj).then(()=>{
        pushHistory(false);
        params.get('tab') != null ? $(`.pageTab[tab="${params.get('tab')}"]`).trigger('click') : null;
        authorities();
    },(error)=>{
        if(error == 1){
            setTimeout(function(){
                showPopup('accessDenied');
            },1000);
        }else if(error == 2){
            pushHistory(false);
        }
    });

    if(params.get('popupPage') != null){
        let keysObj = {};
        switch(params.get('popupPage')){
            case 'ticket_browser':
                keysObj.ticket = params.get('ticket')
            break;
            case 'edit_language_options':
                keysObj.language = params.get('language')
            break;
            case 'edit_language_texts':
                keysObj.language = params.get('language')
            break;
            case 'working_hours':
                keysObj.day = params.get('day');
                keysObj.service = params.get('service');
            break;
            case 'manage_promo_code':
                keysObj.promocode = params.get('promocode')
            break;
            case 'user':
                keysObj.user = params.get('user')
            break;
            case 'delivery_account':
                keysObj.delivery = params.get('delivery')
            break;
            case 'sub_account':
                keysObj.subaccount = params.get('subaccount')
            break;
            case 'manage_sub_account':
                keysObj.subaccount = params.get('subaccount')
            break;
            case 'category':
                keysObj.category = params.get('category')
            break;
            case 'edit_category':
                keysObj.category = params.get('category')
            break;
            case 'product':
                keysObj.product = params.get('product')
            break;
            case 'edit_product':
                keysObj.product = params.get('product')
            break;
            case 'manage_product_options':
                keysObj.product = params.get('product')
            break;
            case 'review':
                keysObj.review = params.get('review');
            break;
            case 'order':
                keysObj.order = params.get('order')
            break;
        }
        showPopupPage(params.get('popupPage'),keysObj).then(()=>{
            authorities();
            setTimeout(function(){
                pushHistory(false);
            },200)
        },(error)=>{
            if(error == 1){
                popupPageClose(true);
                setTimeout(function(){
                    showPopup('accessDenied');
                    popupPageClose(true);
                },1000)
            }else if(error == 2){

            }else if(error == 3){
                popupPageClose(false);
            }
        });
    }
    if(params.get('previewImg') != null){
        window.previewImg.previewImg = params.get('previewImg');
        setImgPreview(params.get('previewImg'));
    }
}
