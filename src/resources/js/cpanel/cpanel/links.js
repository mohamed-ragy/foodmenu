$('html,body').on('click','.Logout',function(){
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
    if($(this).attr('type') == 'category'){
        share('category',website.categories.find(item=> item.id == $(this).attr('itemId')))
    }else if($(this).attr('type') == 'product'){
        share('product',website.products.find(item=> item.id == $(this).attr('itemId')))
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
    let isPushHistory =  false;
    if(account.authorities[3] == true){
        let imgId = $(this).attr('imgId');
        let imgCheck = false;
        for(const key in imgs){
            if(imgs[key].id == imgId){
                imgCheck = true;
                setImgPreview(key);
                window.previewImg.previewImg = img.name;
                isPushHistory = true;
            }
        }
        if(!imgCheck){showAlert('error',texts.imgs.imgNotFound,4000,true)}
    }else{
        showPopup($('#accessDenied-popup'));
        isPushHistory = false;
    }
    if(isPushHistory){
        pushHistory();
    }


});
$('#imgs-imgPreviewNext').on('click',function(){
    if(parseInt($('.imgs-imgPreviewimg').attr('imgKey')) + 1 == imgs.length){
        setImgPreview(0);
    }else{
        setImgPreview(parseInt($('.imgs-imgPreviewimg').attr('imgKey')) + 1)
    }
    let imgName = imgs[$('.imgs-imgPreviewimg').attr('imgKey')].name;
    window.previewImg.previewImg = imgName;
    pushHistory(false);
})
$('#imgs-imgPreviewPrev').on('click',function(){
    if(parseInt($('.imgs-imgPreviewimg').attr('imgKey')) == 0){
        setImgPreview(imgs.length - 1)
    }else{
        setImgPreview(parseInt($('.imgs-imgPreviewimg').attr('imgKey')) - 1)
    }
    let imgName = imgs[$('.imgs-imgPreviewimg').attr('imgKey')].name;
    window.previewImg.previewImg = imgName;
    pushHistory(false);
})
$('#imgs-imgPreviewClose').on('click',function(){
    $('#imgs-imgPreview').addClass('none')
    window.previewImg = {};
    pushHistory();
})
////////////////////pages
$('html,body').on('click','.cpPage',function(e){
    e.stopImmediatePropagation();
    $('.navElement').removeClass('navElementSelected');
    $('.navList').hide();
    $('.closeFullScreenAutoHelp').trigger('click')
    $('#liveChatBoxMenu').addClass('none')
    let openTab = $(this).attr('openTab')
    if(typeof(openTab) === 'undefined'){openTab = null}
    let scrollToElem = $(this).attr('scrollToElem');
    let selectElem = $(this).attr('selectElem');
    let keysObj = {};
    switch($(this).attr('cpPage')){
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
        // openTab != null ? $(`.pageTab[tab="${openTab}"]`).trigger('click') : null;
        setTimeout(()=>{
            scrollToElem != null ?scrollToDiv($('#bodyPage'),$(`#`+scrollToElem)) : null;
            selectElem != null ? $('#'+selectElem).focus() : null ;
        },300)
        closePopup();
        authorities();
        popupPageClose(is_pushHistory);
        // window.history.state.page == $(this).attr('cpPage') ? pushHistory = false : pushHistory = true;
        // let isPushHistory = true;
        // switch($(this).attr('cpPage')){
        //     case 'website_colors':
        //         if(window.colorsFirstLoad == false && account.authorities[3] == true){
        //             getColors();
        //         }
        //     break;
        //     case 'templates':
        //         if(window.colorsFirstLoad == false && account.authorities[3] == true){
        //             getColors();
        //         }
        //     break;
        //     case 'promo_codes':
        //         if(window.promocodesFirstLoad == false && account.authorities[4] == true){
        //             getPromocodes();
        //         }
        //     break;
        //     case 'system':
        //         if(window.countriesAndTimezonesFirstLoad == false && account.authorities[4] == true){
        //             getCountriesTimezones();
        //         }
        //     break;
        //     case 'languages':
        //         if(window.countriesAndTimezonesFirstLoad == false && account.authorities[4] == true){
        //             getCountriesTimezones();
        //         }
        //     break;
        //     case 'phone_number':
        //         if(window.countriesAndTimezonesFirstLoad == false && account.authorities[4] == true){
        //             getCountriesTimezones();
        //         }
        //     break;
        //     case 'manage_products':
        //         if(account.authorities[1] == true){
        //             if($(this).attr('category') == null || $(this).attr('category') == 'allproducts' ){
        //                 $('#manageProducts-selectCategory').attr('key','allproducts').val(texts.products.allproducts)
        //                 window.page.category = 'allproducts';
        //                 drawManageProductCards('allproducts');
        //             }else if($(this).attr('category') == 'uncategorized'){
        //                 $('#manageProducts-selectCategory').attr('key','uncategorized').val(texts.products.uncategorized)
        //                 window.page.category = 'uncategorized';
        //                 drawManageProductCards('uncategorized');
        //             }else{
        //                 $('#manageProducts-selectCategory').attr('key',$(this).attr('category')).val($(this).attr('category'))
        //                 window.page.category = $(this).attr('category');
        //                 drawManageProductCards($(this).attr('category'));
        //             }
        //         }else{
        //             showPopup($('#accessDenied-popup'));
        //             isPushHistory = false;
        //         }

        //     break;
        //     case 'product_reviews':
        //         if(account.authorities[1] == true){
        //             if($(this).attr('product') != null || $(this).attr('product') == ''){
        //                 window.findReviewFilters = {
        //                     product:$(this).attr('product'),
        //                     userId:'',
        //                     userName:'',
        //                     users:1,
        //                     guests:1,
        //                     star1:1,
        //                     star2:1,
        //                     star3:1,
        //                     star4:1,
        //                     star5:1,
        //                 }
        //                 setFindReviewFilters();
        //                 findReview();
        //             } else if($(this).attr('userId') != null && $(this).attr('userId') != ''){
        //                 window.findReviewFilters = {
        //                     product:'allproducts',
        //                     userId:$(this).attr('userId'),
        //                     userName:$(this).attr('userName'),
        //                     users:0,
        //                     guests:0,
        //                     star1:1,
        //                     star2:1,
        //                     star3:1,
        //                     star4:1,
        //                     star5:1,
        //                 }
        //                 setFindReviewFilters();
        //                 findReview();
        //             }else{
        //                 setFindReviewFilters(false);
        //             }
        //         }else{
        //             showPopup($('#accessDenied-popup'));
        //             isPushHistory = false;
        //         }
        //     break;
        //     case 'create_new_user':
        //         setTimeout(()=>{
        //             window.createUserMap.invalidateSize()
        //         },500)
        //     break;
        //     case 'manage_users':
        //         if(account.authorities[2] == true){
        //             if($(this).attr('userId') != null){
        //                 window.page.user = $(this).attr('userId');
        //                 $('#manageUsers-usersInputList').attr('key',window.page.user);
        //                 $('#manageUsers-loadUserBtn').trigger('click');
        //             }else if($('#editUser-container').attr('userId') != null && $('#editUser-container').attr('userId') != ''){
        //                 window.page.user = $('#editUser-container').attr('userId');
        //                 $('#manageUsers-usersInputList').attr('key',window.page.user);
        //                 $('#manageUsers-loadUserBtn').trigger('click');
        //             }
        //         }else{
        //             showPopup($('#accessDenied-popup'));
        //             isPushHistory = false;
        //         }

        //     break;
        //     case 'incomplete_orders':
        //         if(account.authorities[0] == true){
        //             if($(this).attr('orderStatus') == null){
        //                 window.page.status = $('.IncompleteOrderTypeElem_selected').attr('orderStatus');
        //                 new orders().incompleteOrders(window.page.status);
        //             }else{
        //                 window.page.status = $(this).attr('orderStatus');
        //                 new orders().incompleteOrders(window.page.status);
        //             }
        //         }else{
        //             showPopup($('#accessDenied-popup'));
        //             isPushHistory = false;
        //         }
        //     break;
        //     case 'order_history':
        //         if(account.authorities[0] == true){
        //             if($(this).attr('orderNumber') != null){
        //                 window.orderHistoryFilters = {
        //                     dineIn:1,
        //                     delivered:1,
        //                     pickedUp:1,
        //                     canceled:1,
        //                     users:1,
        //                     guests:1,
        //                     userName:'',
        //                     userId:'',
        //                     orderNumber:$(this).attr('orderNumber'),
        //                 }
        //                 setOrderHistoryFilters();
        //                 findOrders();
        //             }else if($(this).attr('userId') != null){
        //                 window.orderHistoryFilters = {
        //                     dineIn:1,
        //                     delivered:1,
        //                     pickedUp:1,
        //                     canceled:1,
        //                     users:0,
        //                     guests:0,
        //                     userName:$(this).attr('userName'),
        //                     userId:$(this).attr('userId'),
        //                     orderNumber:'',
        //                 }
        //                 setOrderHistoryFilters();
        //                 findOrders();
        //             }else{
        //                 setOrderHistoryFilters(false);
        //             }

        //         }else{
        //             showPopup($('#accessDenied-popup'));
        //             isPushHistory = false;
        //         }
        //     break;
        //     case 'financial_reports':
        //         if(window.financialReportsFirstLoad == false && account.is_master == true){
        //             getfinancialReports();
        //         }
        //     break;
        //     case 'statistics_and_analytics':
        //         if(window.yesterdayStatisticsFirstLoad == false){
        //             window.yesterdayStatisticsFirstLoad = true;
        //             $('#statistics-loadStatisticsBtn').trigger('click');
        //         }
        //     break;
        //     case 'activity_log':
        //         // setTimeout(function(){
        //         //     if(window.activityLogFirstLoad == false){
        //         //         window.activityLogFirstLoad = true;
        //         //         $('#activityLog-datePicker-findBtn').trigger('click');
        //         //     }
        //         // },1000)
        //     break;
        // }
        // pushHistory();
        // the history update already called in popupClose();

        // if(isPushHistory){
        // }
    },(error)=>{
        if(error == 1){
            showPopup($('#accessDenied-popup'));
        }else if(error == 2){
            // pushHistory(false);
        }
    })

})
$('html,body').on('click','.popupPage',function(e){
    e.stopImmediatePropagation();
    $('.navElement').removeClass('navElementSelected');
    $('.navList').hide();
    $('.closeFullScreenAutoHelp').trigger('click')
    let scrollToElem = $(this).attr('scrollToElem');
    let selectElem = $(this).attr('selectElem');
    let keysObj = {};
    switch($(this).attr('popupPage')){
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
        case 'manage_product_options':
            keysObj.product = $(this).attr('product')
        break;
        case 'review':
            keysObj.review = $(this).attr('review');
        break;
    }
    showPopupPage($(this).attr('popupPage'),keysObj).then((is_pushHistory)=>{
        // window.popupPage.popupPage = $(this).attr('popupPage');
        if(scrollToElem != null){
            scrollToDiv($('#popupPageBody'),$(`#`+scrollToElem))
        }
        if(selectElem != null){
            $('#'+selectElem).focus();
        }
        pushHistory(is_pushHistory);
        closePopup();
        authorities();
    },(error)=>{
        if(error == 1){
            popupPageClose(true);
            showPopup($('#accessDenied-popup'));
        }else if(error == 2){
            // pushHistory(false);
        }else if(error == 3){
            popupPageClose(false);
        }
    })

    // switch($(this).attr('popupPage')){
    //     case 'ticket_browser':
    //         if(account.is_master == true){
    //             window.popupPage.ticket = $(this).attr('ticketId');
    //             openHelpTicket($(this).attr('ticketId'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Restaurant-Location':
    //         if(account.authorities[4] == true){
    //             drawMap();
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Create-Promocode':
    //         if(account.authorities[4] == true){
    //             resetCreateNewPromocode();
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Edit-Promocode':
    //         if(account.authorities[4] == true){
    //             window.popupPage.promocode = $(this).attr('promocodeId');
    //             $('#editPromocodeHiddenId').val($(this).attr('promocodeId'))
    //             setEditPromocode($(this).attr('promocodeId'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Language-Text':
    //         if(account.authorities[4] == true){
    //             window.popupPage.lang = $(this).attr('lang');
    //             getLangText($(this).attr('lang'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'DineIn-WorkingDays':
    //         if(account.authorities[4] == true){
    //             window.popupPage.day = $(this).attr('day');
    //             setDineInDayWorkingHours($(this).attr('day'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Pickup-WorkingDays':
    //         if(account.authorities[4] == true){
    //             window.popupPage.day = $(this).attr('day');
    //             setPickupDayWorkingHours($(this).attr('day'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Delivery-WorkingDays':
    //         if(account.authorities[4] == true){
    //             window.popupPage.day = $(this).attr('day');
    //             setDeliveryDayWorkingHours($(this).attr('day'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Website-Intro' :
    //         if(account.authorities[3] == true){
    //             website.templateData.intro == true ? $('#Website-Intro').find('.homePageSectionCardWarning').hide() : $('#Website-Intro').find('.homePageSectionCardWarning').show()
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Website-SlideShow' :
    //         if(account.authorities[3] == true){
    //             website.templateData.slideShow == true ? $('#Website-SlideShow').find('.homePageSectionCardWarning').hide() : $('#Website-SlideShow').find('.homePageSectionCardWarning').show()
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Website-Info' :
    //         if(account.authorities[3] == true){
    //             website.templateData.info == true ? $('#Website-Info').find('.homePageSectionCardWarning').hide() : $('#Website-Info').find('.homePageSectionCardWarning').show()
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Website-OurStory' :
    //         if(account.authorities[3] == true){
    //             website.templateData.ourStory == true ? $('#Website-OurStory').find('.homePageSectionCardWarning').hide() : $('#Website-OurStory').find('.homePageSectionCardWarning').show()
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Website-Gallery' :
    //         if(account.authorities[3] == true){
    //             website.templateData.gallery == true ? $('#Website-Gallery').find('.homePageSectionCardWarning').hide() : $('#Website-Gallery').find('.homePageSectionCardWarning').show()
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Edit-Category':
    //         if(account.authorities[1] == true){
    //             window.popupPage.editcategory = $(this).attr('category');
    //             setEditCategory($(this).attr('category'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Product':
    //         if(account.authorities[1] == true){
    //             window.popupPage.product = $(this).attr('product');
    //             drawProductPopupPage($(this).attr('product'))
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Edit-Product':
    //         if(account.authorities[1] == true){
    //             window.popupPage.editproduct = $(this).attr('product');
    //             setEditProduct($(this).attr('product'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Product-Options':
    //         if(account.authorities[1] == true){
    //             window.popupPage.editProductOptions = $(this).attr('product');
    //             setEditProductOptions($(this).attr('product'));
    //             if($(this).attr('action') == 'editOption'){
    //                 let productId = $(this).attr('productId')
    //                 let optionId = $(this).attr('optionId')
    //                 let selectOption = $(this).attr('selectOption')
    //                 setManageSelections(productId,optionId)
    //                 setEditProductOption(productId,optionId,function(){
    //                     $('#'+selectOption).focus();
    //                 })
    //             }else if($(this).attr('action') == 'editselection'){
    //                 let productId = $(this).attr('productId')
    //                 let optionId = $(this).attr('optionId')
    //                 let selectionId = $(this).attr('selectionId')
    //                 let selectSelection = $(this).attr('selectSelection')
    //                 setManageSelections(productId,optionId)
    //                 setEditProductSelection(productId,optionId,selectionId,function(){
    //                     $('#'+selectSelection).focus();
    //                 })

    //             }
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'User':
    //         if(account.authorities[2] == true){
    //             window.popupPage.user = $(this).attr('userId');
    //             showUserPopupPage($(this).attr('userId'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Edit-Delivery-Account':
    //         if(account.authorities[2] == true){
    //             window.popupPage.deliveryAccount = $(this).attr('deliveryAccount');
    //             setEditDeliveryAccount(window.popupPage.deliveryAccount);
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'New-Order':
    //         if(account.authorities[0] == true){
    //             drawPlaceOrderItems();
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Order':
    //         if(account.authorities[0] == true){
    //             window.popupPage.order = $(this).attr('orderId');
    //             new orders($(this).attr('orderId')).openOrder();
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Sub-Account':
    //         if(account.is_master == true){
    //             if($(this).attr('accountId') == account.id){
    //                 isPushHistory = false;
    //                 $('.cpPage[cpPage="email_address"]').trigger("click");
    //                 setTimeout(function(){
    //                     popupPageClose(false);
    //                 },500)
    //             }else{
    //                 window.popupPage.account = $(this).attr('accountId');
    //                 setManageSubAccount(window.popupPage.account);
    //             }
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    //     case 'Review' :
    //         if(account.authorities[1] == true){
    //             window.popupPage.review = $(this).attr('reviewId');
    //             drawProductReviewPage($(this).attr('reviewId'));
    //         }else{
    //             showPopup($('#accessDenied-popup'));
    //             isPushHistory = false;
    //         }
    //     break;
    // }

})
$(window).on('popstate',(e)=>{
    // if($('#'+window.history.state.page+'-page').css('display') == 'none' ){

        // window.page = {}
        let keysObj = {};
        switch(window.history.state.page){
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
                showPopup($('#accessDenied-popup'));
            }else if(error == 2){
                // pushHistory(false);
            }else if(error == 3){
                popupPageClose(false);
            }
        });
        // switch(window.history.state.page){

        //     case 'manage_products':
        //         if(window.history.state.category == null || window.history.state.category == 'allproducts' ){
        //             $('#manageProducts-selectCategory').attr('key','allproducts').val(texts.products.allproducts)
        //             window.page.category = 'allproducts';
        //             drawManageProductCards('allproducts');
        //         }else if($(this).attr('category') == 'uncategorized'){
        //             $('#manageProducts-selectCategory').attr('key','uncategorized').val(texts.products.uncategorized)
        //             window.page.category = 'uncategorized';
        //             drawManageProductCards('uncategorized');
        //         }else{
        //             $('#manageProducts-selectCategory').attr('key',window.history.state.category).val(window.history.state.category)
        //             window.page.category = window.history.state.category;
        //             drawManageProductCards(window.history.state.category);
        //         }
        //     break;
        //     case 'manage_users':
        //         if(window.history.state.user != null && window.history.state.user != ''){
        //             window.page.user = window.history.state.user;
        //             $('#manageUsers-usersInputList').attr('key',window.page.user);
        //             $('#manageUsers-loadUserBtn').trigger('click');
        //         }
        //     break;
        //     case 'create_new_user':
        //         setTimeout(()=>{
        //             window.createUserMap.invalidateSize()
        //         },500)
        //     break;
        //     case 'product_reviews':
        //         setFindReviewFilters(false);
        //     break;
        //     case 'incomplete_orders':
        //         if(account.authorities[0] == true){
        //             if(window.history.state.status == null){
        //                 window.page.status = $('.IncompleteOrderTypeElem_selected').attr('orderStatus');
        //                 new orders().incompleteOrders(window.page.status);
        //             }else{
        //                 window.page.status = window.history.state.status;
        //                 new orders().incompleteOrders(window.page.status);
        //             }
        //         }
        //     break;
        //     case 'order_history':
        //         setOrderHistoryFilters(false);
        //     break;
        // }
    // }
    if(window.history.state.popupPage != null){
        let keysObj = {};
        switch(window.history.state.popupPage){
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
            case 'manage_product_options':
                keysObj.product = window.history.state.product;
            break;
            case 'review':
                keysObj.review = window.history.state.review;
            break;
        }
        // window.popupPage = {}
        window.popupPage.popupPage = '';
        showPopupPage(window.history.state.popupPage,keysObj).then(()=>{
            closePopup();
            authorities();
            pushHistory(false);
        },(error)=>{
            if(error == 1){
                popupPageClose(true);
                showPopup($('#accessDenied-popup'));
            }else if(error == 2){
                // pushHistory(false);
            }else if(error == 3){
                popupPageClose(false);
            }
        });

        // switch(window.history.state.popupPage){
        //     case 'ticket_browser':
        //         openHelpTicket(window.history.state.ticket);
        //         window.popupPage.ticket = window.history.state.ticket;
        //     break;
        //     case 'Restaurant-Location':
        //         drawMap();
        //     break;
        //     case 'Create-Promocode':
        //         resetCreateNewPromocode();
        //     break;
        //     case 'Edit-Promocode':
        //         $('#editPromocodeHiddenId').val(window.history.state.promocode)
        //         setEditPromocode(window.history.state.promocode);
        //         window.popupPage.promocode = window.history.state.promocode;
        //     break;
        //     case 'Language-Text':
        //         getLangText(window.history.state.lang);
        //         window.popupPage.lang = window.history.state.lang;
        //     break;
        //     case 'DineIn-WorkingDays':
        //         setDineInDayWorkingHours(window.history.state.day);
        //         window.popupPage.day = window.history.state.day;
        //     break;
        //     case 'Pickup-WorkingDays':
        //         setPickupDayWorkingHours(window.history.state.day);
        //         window.popupPage.day = window.history.state.day;
        //     break;
        //     case 'Delivery-WorkingDays':
        //         setDeliveryDayWorkingHours(window.history.state.day);
        //         window.popupPage.day = window.history.state.day;
        //     break;
        //     case 'Website-Intro' :
        //         website.templateData.intro == true ? $('#Website-Intro').find('.homePageSectionCardWarning').hide() : $('#Website-Intro').find('.homePageSectionCardWarning').show()
        //     break;
        //     case 'Website-SlideShow' :
        //         website.templateData.slideShow == true ? $('#Website-SlideShow').find('.homePageSectionCardWarning').hide() : $('#Website-SlideShow').find('.homePageSectionCardWarning').show()
        //     break;
        //     case 'Website-Info' :
        //         website.templateData.info == true ? $('#Website-Info').find('.homePageSectionCardWarning').hide() : $('#Website-Info').find('.homePageSectionCardWarning').show()
        //     break;
        //     case 'Website-OurStory' :
        //         website.templateData.ourStory == true ? $('#Website-OurStory').find('.homePageSectionCardWarning').hide() : $('#Website-OurStory').find('.homePageSectionCardWarning').show()
        //     break;
        //     case 'Website-Gallery' :
        //         website.templateData.gallery == true ? $('#Website-Gallery').find('.homePageSectionCardWarning').hide() : $('#Website-Gallery').find('.homePageSectionCardWarning').show()
        //     break;
        //     case 'Edit-Category':
        //         setEditCategory(window.history.state.editcategory);
        //         window.popupPage.editcategory = window.history.state.editcategory;
        //     break;
        //     case 'Product':
        //         drawProductPopupPage(window.history.state.product)
        //         window.popupPage.product =  window.history.state.product;
        //     break;
        //     case 'Edit-Product':
        //         setEditProduct(window.history.state.editproduct);
        //         window.popupPage.editproduct = window.history.state.editproduct;
        //     break;
        //     case 'Product-Options':
        //         setEditProductOptions(window.history.state.editProductOptions)
        //         window.popupPage.editProductOptions = window.history.state.editProductOptions;
        //     break;
        //     case 'User':
        //         window.popupPage.user = window.history.state.user;
        //         showUserPopupPage(window.popupPage.user);
        //     break;
        //     case 'Edit-Delivery-Account':
        //         window.popupPage.deliveryAccount = window.history.state.deliveryAccount;
        //         setEditDeliveryAccount(window.popupPage.deliveryAccount);
        //     break;
        //     case 'New-Order':
        //         drawPlaceOrderItems();
        //     break;
        //     case 'Order':
        //         window.popupPage.order = window.history.state.order;
        //         new orders(window.popupPage.order).openOrder();
        //     break;
        //     case 'Sub-Account':
        //         window.popupPage.account = window.history.state.account;
        //         setManageSubAccount(window.popupPage.account);
        //     break;
        // }
    }else{
        popupPageClose(false);
    }
    // closePopup();


    if(history.state.previewImg == null){
        $('#imgs-imgPreview').addClass('none')
        window.previewImg = {};
    }else{
        for(const key in imgs){if(history.state.previewImg == imgs[key].name){setImgPreview(key)}}
        window.previewImg.previewImg = history.state.previewImg;
    }
});

// $(window).on('popstate',(e)=>{
//     if($('#'+window.history.state.page+'-page').css('display') == 'none' ){
//         window.page = {}
//         showPage(window.history.state.page);
//         window.page.page = window.history.state.page;
//         switch(window.history.state.page){
//             case 'manage_products':
//                 if(window.history.state.category == null || window.history.state.category == 'allproducts' ){
//                     $('#manageProducts-selectCategory').attr('key','allproducts').val(texts.products.allproducts)
//                     window.page.category = 'allproducts';
//                     drawManageProductCards('allproducts');
//                 }else if($(this).attr('category') == 'uncategorized'){
//                     $('#manageProducts-selectCategory').attr('key','uncategorized').val(texts.products.uncategorized)
//                     window.page.category = 'uncategorized';
//                     drawManageProductCards('uncategorized');
//                 }else{
//                     $('#manageProducts-selectCategory').attr('key',window.history.state.category).val(window.history.state.category)
//                     window.page.category = window.history.state.category;
//                     drawManageProductCards(window.history.state.category);
//                 }
//             break;
//             case 'manage_users':
//                 if(window.history.state.user != null && window.history.state.user != ''){
//                     window.page.user = window.history.state.user;
//                     $('#manageUsers-usersInputList').attr('key',window.page.user);
//                     $('#manageUsers-loadUserBtn').trigger('click');
//                 }
//             break;
//             case 'create_new_user':
//                 setTimeout(()=>{
//                     window.createUserMap.invalidateSize()
//                 },500)
//             break;
//             case 'product_reviews':
//                 setFindReviewFilters(false);
//             break;
//             case 'incomplete_orders':
//                 if(account.authorities[0] == true){
//                     if(window.history.state.status == null){
//                         window.page.status = $('.IncompleteOrderTypeElem_selected').attr('orderStatus');
//                         new orders().incompleteOrders(window.page.status);
//                     }else{
//                         window.page.status = window.history.state.status;
//                         new orders().incompleteOrders(window.page.status);
//                     }
//                 }
//             break;
//             case 'order_history':
//                 setOrderHistoryFilters(false);
//             break;
//         }
//     }
//     if(history.state.previewImg == null){
//         $('#imgs-imgPreview').addClass('none')
//         window.previewImg = {};
//     }else{
//         for(const key in imgs){if(history.state.previewImg == imgs[key].name){setImgPreview(key)}}
//         window.previewImg.previewImg = history.state.previewImg;
//     }
//     if(window.history.state.popupPage != null){
//         window.popupPage = {};
//         showPopupPage(window.history.state.popupPage);
//         window.popupPage.popupPage = window.history.state.popupPage;
//         switch(window.history.state.popupPage){
//             case 'ticket_browser':
//                 openHelpTicket(window.history.state.ticket);
//                 window.popupPage.ticket = window.history.state.ticket;
//             break;
//             case 'Restaurant-Location':
//                 drawMap();
//             break;
//             case 'Create-Promocode':
//                 resetCreateNewPromocode();
//             break;
//             case 'Edit-Promocode':
//                 $('#editPromocodeHiddenId').val(window.history.state.promocode)
//                 setEditPromocode(window.history.state.promocode);
//                 window.popupPage.promocode = window.history.state.promocode;
//             break;
//             case 'Language-Text':
//                 getLangText(window.history.state.lang);
//                 window.popupPage.lang = window.history.state.lang;
//             break;
//             case 'DineIn-WorkingDays':
//                 setDineInDayWorkingHours(window.history.state.day);
//                 window.popupPage.day = window.history.state.day;
//             break;
//             case 'Pickup-WorkingDays':
//                 setPickupDayWorkingHours(window.history.state.day);
//                 window.popupPage.day = window.history.state.day;
//             break;
//             case 'Delivery-WorkingDays':
//                 setDeliveryDayWorkingHours(window.history.state.day);
//                 window.popupPage.day = window.history.state.day;
//             break;
//             case 'Website-Intro' :
//                 website.templateData.intro == true ? $('#Website-Intro').find('.homePageSectionCardWarning').hide() : $('#Website-Intro').find('.homePageSectionCardWarning').show()
//             break;
//             case 'Website-SlideShow' :
//                 website.templateData.slideShow == true ? $('#Website-SlideShow').find('.homePageSectionCardWarning').hide() : $('#Website-SlideShow').find('.homePageSectionCardWarning').show()
//             break;
//             case 'Website-Info' :
//                 website.templateData.info == true ? $('#Website-Info').find('.homePageSectionCardWarning').hide() : $('#Website-Info').find('.homePageSectionCardWarning').show()
//             break;
//             case 'Website-OurStory' :
//                 website.templateData.ourStory == true ? $('#Website-OurStory').find('.homePageSectionCardWarning').hide() : $('#Website-OurStory').find('.homePageSectionCardWarning').show()
//             break;
//             case 'Website-Gallery' :
//                 website.templateData.gallery == true ? $('#Website-Gallery').find('.homePageSectionCardWarning').hide() : $('#Website-Gallery').find('.homePageSectionCardWarning').show()
//             break;
//             case 'Edit-Category':
//                 setEditCategory(window.history.state.editcategory);
//                 window.popupPage.editcategory = window.history.state.editcategory;
//             break;
//             case 'Product':
//                 drawProductPopupPage(window.history.state.product)
//                 window.popupPage.product =  window.history.state.product;
//             break;
//             case 'Edit-Product':
//                 setEditProduct(window.history.state.editproduct);
//                 window.popupPage.editproduct = window.history.state.editproduct;
//             break;
//             case 'Product-Options':
//                 setEditProductOptions(window.history.state.editProductOptions)
//                 window.popupPage.editProductOptions = window.history.state.editProductOptions;
//             break;
//             case 'User':
//                 window.popupPage.user = window.history.state.user;
//                 showUserPopupPage(window.popupPage.user);
//             break;
//             case 'Edit-Delivery-Account':
//                 window.popupPage.deliveryAccount = window.history.state.deliveryAccount;
//                 setEditDeliveryAccount(window.popupPage.deliveryAccount);
//             break;
//             case 'New-Order':
//                 drawPlaceOrderItems();
//             break;
//             case 'Order':
//                 window.popupPage.order = window.history.state.order;
//                 new orders(window.popupPage.order).openOrder();
//             break;
//             case 'Sub-Account':
//                 window.popupPage.account = window.history.state.account;
//                 setManageSubAccount(window.popupPage.account);
//             break;
//         }
//     }else{
//         popupPageClose(false);
//     }
//     closePopup();
//     authorities();
// });
