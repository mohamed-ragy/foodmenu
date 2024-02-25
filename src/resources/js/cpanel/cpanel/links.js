$('html,body').on('click','.reportBug',function(e){
    e.stopImmediatePropagation();
    showPopup('reportBug');
})
$('html,body').on('click','.Logout',function(e){
    e.stopImmediatePropagation();
    showPopup('logout');
})
$('html,body').on('click','#logout-btn',function(e){
    e.stopImmediatePropagation();
    $('#logoutForm').trigger('submit');
})
$('html,body').on('click','.reloadCpanel',function(e){
    e.stopImmediatePropagation();
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
})

$('html,body').on('click','.hideParent',function(e){
    e.stopImmediatePropagation();
    $(this).parent().addClass('none')
})
$('html,body').on('click','.hideParent2',function(e){
    e.stopImmediatePropagation();
    $(this).parent().parent().addClass('none')
})
$('html,body').on('click','.hideParent3',function(e){
    e.stopImmediatePropagation();
    $(this).parent().parent().parent().addClass('none')
});
$('html,body').on('click','.share',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('type') == 'category'){
        window.share.item = website.categories.find(item=> item.id == $(this).attr('itemId'));
        window.share.type = 'category';
        share()
    }else if($(this).attr('type') == 'product'){
        window.share.item = website.products.find(item=> item.id == $(this).attr('itemId'));
        window.share.type = 'product';
        share()
    }
})
$('html,body').on('click','.copyVal',function(e){
    e.stopImmediatePropagation();
    navigator.clipboard.writeText($(this).attr('copyVal'))
    showAlert('normal',texts.cpanel.public.valueCopied,4000,true)
})
/////////
$('html,body').on('click','.previewImg',function(e){
    e.stopImmediatePropagation();
    window.previewImg.previewImg = $(this).attr('img');
    pushHistory(true)
    setImgPreview($(this).attr('img'));
});
$('#imgs-imgPreviewClose').on('click',function(){
    $('#imgs-imgPreview').addClass('none')
    window.previewImg = {};
    pushHistory(true);
})
////////////////////pages
$('html,body').on('click','.cpPage',function(e){
    e.stopImmediatePropagation();
    $('.navElement').removeClass('navElementSelected');
    hideList();
    $('.closeFullScreenAutoHelp').trigger('click')
    $('#liveChatBoxMenu').addClass('none')
    let openTab = $(this).attr('openTab')
    if(typeof(openTab) === 'undefined'){openTab = null}
    let scrollToElem = $(this).attr('scrollToElem');
    let selectElem = $(this).attr('selectElem');
    let keysObj = {};
    switch($(this).attr('cpPage')){
        case 'statistics_and_analytics':
            keysObj.year1 = $(this).attr('year1')
            keysObj.month1 = $(this).attr('month1')
            keysObj.day1 = $(this).attr('day1')
            keysObj.period = $(this).attr('period')
            keysObj.compare = $(this).attr('compare')
            keysObj.year2 = $(this).attr('year2')
            keysObj.month2 = $(this).attr('month2')
            keysObj.day2 = $(this).attr('day2')
        break;
        case 'activity_log':
            keysObj.year = $(this).attr('year') ?? new Date().getFullYear();
            keysObj.month = $(this).attr('month') ?? parseInt(new Date().getMonth() ) + 1;
            keysObj.day = $(this).attr('day') ?? new Date().getDate();
        break;
        case 'order_history':
            keysObj.orderHistory_page = '1'
            keysObj.orderBy = 'placed_at'
            keysObj.sort = 'desc'
            keysObj.orderNumber = window.history.state.orderNumber;
            keysObj.dinedIn = window.history.state.dinedIn;
            keysObj.pickedUp = window.history.state.pickedUp;
            keysObj.delivered = window.history.state.delivered;
            keysObj.canceled = window.history.state.canceled;
            keysObj.user = $(this).attr('user');
            keysObj.byUsers = window.history.state.byUsers;
            keysObj.byGuests = window.history.state.byGuests;
        break;
        case 'incomplete_orders':
            keysObj.order_by = $(this).attr('order_by') ?? 'placed_at';
            keysObj.sort = $(this).attr('sort_by') ?? 'desc';
        break;
        case 'manage_users':
            keysObj.user = $(this).attr('user')
        break;
        case 'manage_products':
            keysObj.category = $(this).attr('category')
        break;
        case 'product_reviews':
            keysObj.product = $(this).attr('product');
            keysObj.user = $(this).attr('user');
            keysObj.byUsers = window.history.state.byUsers;
            keysObj.byGuests = window.history.state.byGuests;
            keysObj.star1 = window.history.state.star1;
            keysObj.star2 = window.history.state.star2;
            keysObj.star3 = window.history.state.star3;
            keysObj.star4 = window.history.state.star4;
            keysObj.star5 = window.history.state.star5;
        break;
    }
    showPage($(this).attr('cpPage'),openTab,keysObj).then((is_pushHistory)=>{
        openTab != null ? $(`.pageTab[tab="${openTab}"]`).trigger('click') : null;
        setTimeout(()=>{
            scrollToElem != null ?scrollToDiv($('#bodyPage'),$(`#`+scrollToElem)) : null;
            selectElem != null ? $('#'+selectElem).focus() : null ;
            highlightElem($('#'+selectElem))
        },300)
        closePopup();
        authorities();
        popupPageClose(is_pushHistory);
    },(error)=>{
        if(error == 1){
            showPopup('accessDenied');
        }else if(error == 2){
            // pushHistory(false);
        }
    })

})
$('html,body').on('click','.popupPage',function(e){
    e.stopImmediatePropagation();
    $('.navElement').removeClass('navElementSelected');
    hideList();
    $('.closeFullScreenAutoHelp').trigger('click')
    let scrollToElem = $(this).attr('scrollToElem');
    let selectElem = $(this).attr('selectElem');
    let keysObj = {};
    switch($(this).attr('popupPage')){
        case 'order':
            keysObj.order = $(this).attr('order')
        break;
        case 'ticket_browser':
            keysObj.ticket = $(this).attr('ticket')
        break;
        case 'edit_language_options':
            keysObj.language = $(this).attr('lang');
        break;
        case 'edit_language_texts':
            keysObj.language = $(this).attr('lang');
        break;
        case 'working_hours':
            keysObj.day = $(this).attr('day');
            keysObj.service = $(this).attr('service');
        break;
        case 'manage_promo_code':
            keysObj.promocode = $(this).attr('promocode');
        break;
        case 'user':
            keysObj.user = $(this).attr('user');
        break;
        case 'delivery_account':
            keysObj.delivery = $(this).attr('delivery');
        break;
        case 'sub_account':
            keysObj.subaccount = $(this).attr('subaccount')
        break;
        case 'manage_sub_account':
            keysObj.subaccount = $(this).attr('subaccount')
        break;
        case 'category':
            keysObj.category = $(this).attr('category')
        break;
        case 'edit_category':
            keysObj.category = $(this).attr('category')
        break;
        case 'product':
            keysObj.product = $(this).attr('product')
        break;
        case 'edit_product':
            keysObj.product = $(this).attr('product')
        break;
        case 'manage_product_variants':
            keysObj.product = $(this).attr('product')
        break;
        case 'review':
            keysObj.review = $(this).attr('review');
        break;
    }
    showPopupPage($(this).attr('popupPage'),keysObj).then((is_pushHistory)=>{
        setTimeout(()=>{
            scrollToElem != null ? scrollToDiv($('#popupPageBody'),$(`#`+scrollToElem)) : null;
            selectElem != null ? $('#'+selectElem).focus() : null ;
            highlightElem($('#'+selectElem))
        },300)
        pushHistory(is_pushHistory);
        closePopup();
        authorities();
    },(error)=>{
        if(error == 1){
            popupPageClose(true);
            showPopup('accessDenied');
        }else if(error == 2){
            // pushHistory(false);
        }else if(error == 3){
            popupPageClose(false);
        }
    })

})
$(window).on('popstate',(e)=>{
    console.log(window.history.state.previewImg)
    if(typeof(window.history.state.previewImg) !== 'undefined'){
        window.previewImg.previewImg = history.state.previewImg;
        setImgPreview(history.state.previewImg)
    }else{
        $('#imgs-imgPreview').addClass('none')
        window.previewImg = {};
    }
    let keysObj = {};
    switch(window.history.state.page){
        case 'statistics_and_analytics':
            keysObj.year1 = window.history.state.year1
            keysObj.month1 = window.history.state.month1
            keysObj.day1 = window.history.state.day1
            keysObj.period = window.history.state.period
            keysObj.compare = window.history.state.compare
            keysObj.year2 = window.history.state.year2
            keysObj.month2 = window.history.state.month2
            keysObj.day2 = window.history.state.day2
        break;
        case 'activity_log':
            keysObj.year = window.history.state.year ?? new Date().getFullYear();
            keysObj.month = window.history.state.month ?? parseInt(new Date().getMonth() ) + 1;
            keysObj.day = window.history.state.day ?? new Date().getDate();
        break;
        case 'order_history':
            keysObj.orderHistory_page = window.history.state.orderHistory_page;
            keysObj.orderBy = window.history.state.orderBy;
            keysObj.sort = window.history.state.sort;
            keysObj.orderNumber = window.history.state.orderNumber;
            keysObj.dinedIn = window.history.state.dinedIn;
            keysObj.pickedUp = window.history.state.pickedUp;
            keysObj.delivered = window.history.state.delivered;
            keysObj.canceled = window.history.state.canceled;
            keysObj.user = window.history.state.user;
            keysObj.byUsers = window.history.state.byUsers;
            keysObj.byGuests = window.history.state.byGuests;
        break;
        case 'incomplete_orders':
            keysObj.order_by = window.history.state.order_by ?? 'placed_at';
            keysObj.sort = window.history.state.sort ?? 'desc';
        break;
        case 'manage_users':
            keysObj.user = window.history.state.user;
        break;
        case 'manage_products':
            keysObj.category = window.history.state.category;
        break;
        case 'product_reviews':
            keysObj.product = window.history.state.product;
            keysObj.user = window.history.state.user;
            keysObj.byUsers = window.history.state.byUsers;
            keysObj.byGuests = window.history.state.byGuests;
            keysObj.star1 = window.history.state.star1;
            keysObj.star2 = window.history.state.star2;
            keysObj.star3 = window.history.state.star3;
            keysObj.star4 = window.history.state.star4;
            keysObj.star5 = window.history.state.star5;
        break;
    }
    window.page.page = '';
    showPage(window.history.state.page,history.state.page.tab,keysObj).then(()=>{
        closePopup();
        authorities();
        pushHistory(false);
    },(error)=>{
        if(error == 1){
            showPopup('accessDenied');
        }else if(error == 2){
            // pushHistory(false);
        }else if(error == 3){
            popupPageClose(false);
        }
    });

    if(window.history.state.popupPage != null){
        let keysObj = {};
        switch(window.history.state.popupPage){
            case 'order':
                keysObj.order = window.history.state.order;
            break;
            case 'ticket_browser':
                keysObj.ticket = window.history.state.ticket
            break;
            case 'edit_language_options':
                keysObj.language = window.history.state.language
            break;
            case 'edit_language_texts':
                keysObj.language = window.history.state.language
            break;
            case 'working_hours':
                keysObj.day = window.history.state.day;
                keysObj.service = window.history.state.service;
            break;
            case 'manage_promo_code':
                keysObj.promocode = window.history.state.promocode;
            break;
            case 'user':
                keysObj.user = window.history.state.user;
            break;
            case 'delivery_account':
                keysObj.delivery = window.history.state.delivery;
            break;
            case 'sub_account':
                keysObj.subaccount = window.history.state.subaccount;
            break;
            case 'manage_sub_account':
                keysObj.subaccount = window.history.state.subaccount;
            break;
            case 'category':
                keysObj.category = window.history.state.category;
            break;
            case 'edit_category':
                keysObj.category = window.history.state.category;
            break;
            case 'product':
                keysObj.product = window.history.state.product;
            break;
            case 'edit_product':
                keysObj.product = window.history.state.product;
            break;
            case 'manage_product_variants':
                keysObj.product = window.history.state.product;
            break;
            case 'review':
                keysObj.review = window.history.state.review;
            break;
        }
        window.popupPage.popupPage = '';
        showPopupPage(window.history.state.popupPage,keysObj).then(()=>{
            closePopup();
            authorities();
            pushHistory(false);
        },(error)=>{
            if(error == 1){
                popupPageClose(true);
                showPopup('accessDenied');
            }else if(error == 2){
                // pushHistory(false);
            }else if(error == 3){
                popupPageClose(false);
            }
        });
    }else{
        popupPageClose(false);
    }

});
