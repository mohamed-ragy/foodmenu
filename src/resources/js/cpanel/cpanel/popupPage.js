$(window).resize(function(){
    $('#popupPage').css('max-width',$(window).width() - ( $('#helpWindow').width() + 30))
})
popupPageClose = function(push=true){
    setTimeout(()=>{cpanelTitle(false)},300)
    $('#windowsCover_popupPage').hide();
    $('#popupPage').css({'right':'unset','left':'-110%'});
    $('#helpWindow').removeClass('helpWindow_popupPage')
    $('#popupPage').find('.pageWrapper').hide();
    window.popupPage = {};
    if(push){
        pushHistory(true)
    }else{pushHistory(false)}
}
$('#popupPageClose').on('click',function(){coolDownChecker
    popupPageClose(true);
});

showPopupPage = function(popupPage,keysObj){
    return new Promise(function(resolve, reject){
        setTimeout(()=>{cpanelTitle(false)},300)
        if(popupPage == null || popupPage == ''){reject(3);return;}
        if(popupPage == window.popupPage.popupPage){reject(2);return;}
        if($('#popupPage').css('right') == '0px' || $('#popupPage').css('left') == '0px'){
            $('#popupPage').css({'right':'unset','left':'-110%'});
            $('#helpWindow').removeClass('helpWindow_popupPage')
            $('#popupPage').find('.pageWrapper').hide();
            setTimeout(function(){
                showPopupPage(popupPage,keysObj).then(function(){
                    pushHistory(true)
                });
            },250);
            reject(4);
            return
        }
        $('#helpWindow').addClass('helpWindow_popupPage')
        $('#popupPageTitle').text('')
        $('#popupPageBody').removeClass().text('')
        $('#windowsCover_popupPage').show();

        window.popupPage = {};
        window.popupPage.popupPage = popupPage;
        switch(popupPage){
            case 'todays_income':
                if(account.is_master == false){reject(1);return;}
                drawPopupPage_todays_income();
                resolve(3);
            break;
            case 'products_sold_today':
                if(account.is_master == false){reject(1);return;}
                drawPopupPage_products_sold_today();
                resolve(3);
            break;
            case 'order':
                if(account.authorities[0] == false){reject(1);return;}
                window.popupPage.order = keysObj.order;
                drawPopupPage_order(keysObj.order);
                resolve(3);
            break;
            case 'place_new_order':
                if(account.authorities[0] == false){reject(1);return;}
                drawPopupPage_place_new_order();
                resolve(3);
            break;
            case 'review':
                window.popupPage.review = keysObj.review;
                drawPopupPage_review(window.popupPage.review);
                resolve(3);
            break;
            case 'manage_product_variants':
                if(account.authorities[1] == false){reject(1);return;}
                if(typeof(website.products.find(item=>item.name == keysObj.product)) !== 'undefined'){
                    window.popupPage.product = keysObj.product;
                    drawPopupPage_manage_product_variants(keysObj.product);
                    resolve(true);
                    break;
                }else{
                    popupPageClose(false);
                    showPopup_notFound(texts.products.productNotFound)
                    reject(3)
                    return;
                }
                resolve(true);
                break;
            case 'edit_product':
                if(account.authorities[1] == false){reject(1);return;}
                if(typeof(website.products.find(item=>item.name == keysObj.product)) !== 'undefined'){
                    window.popupPage.product = keysObj.product;
                    drawPopupPage_edit_product(keysObj.product);
                    resolve(true);
                    break;
                }else{
                    popupPageClose(false);
                    showPopup_notFound(texts.products.productNotFound)
                    reject(3)
                    return;
                }
                resolve(true);
                break;
            case 'product':
                if(typeof(website.products.find(item=>item.name == keysObj.product)) !== 'undefined'){
                    window.popupPage.product = keysObj.product;
                    drawPopupPage_product(keysObj.product);
                    resolve(true);
                    break;
                }else{
                    popupPageClose(false);
                    showPopup_notFound(texts.products.productNotFound)
                    reject(3)
                    return;
                }
                resolve(true);
            break;
            case 'create_product':
                if(account.authorities[1] == false){reject(1);return;}
                drawPopupPage_create_product();
                resolve(true);
            break;
            case 'edit_category':
                if(account.authorities[1] == false){reject(1);return;}
                if(typeof(website.categories.find(item=>item.name == keysObj.category)) !== 'undefined'){
                    window.popupPage.category = keysObj.category;
                    drawPopupPage_edit_category(keysObj.category);
                    resolve(true);
                    break;
                }else{
                    showPopup_notFound(texts.products.categoryNotFound)
                    reject(3)
                    return;
                    reject(3)
                }
            break;
            case 'category':
                if(typeof(website.categories.find(item=>item.name == keysObj.category)) !== 'undefined'){
                    window.popupPage.category = keysObj.category;
                    drawPopupPage_category(keysObj.category)
                    resolve(true)
                }else{
                    showPopup_notFound(texts.products.categoryNotFound)
                    reject(3)
                    return;
                }
                break;
            case 'create_category':
                if(account.authorities[1] == false){reject(1);return;}
                drawPopupPage_create_category();
                resolve(true);
                break;
            case 'user':
                window.popupPage.user = keysObj.user;
                drawPopupPage_user_loading(keysObj.user);
                resolve(true);
            break;
            case 'create_custom_language':
                if(account.authorities[4] == false){reject(1);return;}
                if(Object.keys(website.languages).length >= plans[website.plan].websiteLangs){
                    showAlert('warning',texts.settings.planLangLimitError,15000,true);
                    closePopup();
                    reject(3);
                }
                drawPopupPage_create_custom_language();
                resolve(true);
            break;
            case 'edit_language_options':
                if(account.authorities[4] == false){reject(1);return;}
                let langOptiosCheck = false;
                for(const key in website_temp.languages){
                    if(website_temp.languages[key].code == keysObj.language){
                        langOptiosCheck = true;
                        window.popupPage.language = keysObj.language;
                        drawPopupPage_edit_language_options(website_temp.languages[key]);
                        resolve(true);
                    }
                }
                if(!langOptiosCheck){
                    showPopup_notFound(texts.settings.langNotFound)
                    reject(3);
                    return;
                }
            break;
            case 'edit_language_texts':
                if(account.authorities[4] == false){reject(1);return;}
                let langTxtsCheck = false;
                for(const key in website.languages){
                    if(website.languages[key].code == keysObj.language){
                        langTxtsCheck = true;
                        window.popupPage.language = keysObj.language;
                        drawPopupPage_edit_language_texts(window.popupPage.language);
                        resolve(true);
                    }
                }
                if(!langTxtsCheck){reject(3);return;}
            break;
            case 'working_hours':
                if(account.authorities[4] == false){reject(1);return;}
                if(!['allWeekDays','sunday','monday','tuesday','wednesday','thursday','friday','saturday'].includes(keysObj.day)){reject(3);return;}
                if(!['delivery','pickup','dinein'].includes(keysObj.service)){reject(3);return;}
                window.popupPage.day = keysObj.day;
                window.popupPage.service = keysObj.service;
                drawPopupPage_working_days(keysObj.service,keysObj.day);
                resolve(true);
            break;
            case 'create_promo_code':
                if(account.authorities[4] == false){reject(1);return;}
                drawPopupPage_create_promo_code();
                resolve(true);
            break;
            case 'manage_promo_code':
                if(account.authorities[4] == false){reject(1);return;}
                drawPopupPage_manage_promo_code_loading();
                getPromocodes(function(){
                    let editPromocodeCheck = null;
                    for(const key in window.promocodes_temp){
                        if(window.promocodes_temp[key].code == keysObj.promocode){
                            editPromocodeCheck = window.promocodes_temp[key];
                            window.popupPage.promocode = window.promocodes_temp[key].code;

                        }
                    }
                    if(editPromocodeCheck == null){
                        showPopup_notFound(texts.settings.promocodeNotFound)
                        reject(3);return;
                    }else{
                        drawPopupPage_manage_promo_code(editPromocodeCheck);
                        resolve(true);
                    }
                })

            break;
            case 'create_delivery_account':
                if(account.is_master == false){reject(1);return;}
                drawPopupPage_create_delivery_account();
                resolve(true);
            break;
            case 'create_sub_account':
                if(account.is_master == false){reject(1);return;}
                drawPopupPage_create_sub_account();
                resolve(true);
            break;
            case 'sub_account':
                if(typeof(website.accounts.find(item=>item.id == keysObj.subaccount)) !== 'undefined'){
                    window.popupPage.subaccount = keysObj.subaccount;
                    drawPopupPage_sub_account(window.popupPage.subaccount);
                    resolve(true)
                }else{
                    showPopup_notFound(texts.staff.subaccountNotFound)
                    reject(3)
                    return;
                }
            break;
            case 'manage_sub_account':
                if(account.is_master == false){reject(1);return;}
                if(typeof(website.accounts.find(item=>item.id == keysObj.subaccount)) !== 'undefined'){
                    window.popupPage.subaccount = keysObj.subaccount;
                    drawPopupPage_manage_sub_account(window.popupPage.subaccount);
                    resolve(true)
                }else{
                    showPopup_notFound(texts.staff.subaccountNotFound)
                    reject(3)
                    return;
                }
            break;
            case 'delivery_account':
                if(typeof(website.deliveries.find(item=>item.id == keysObj.delivery)) !== 'undefined'){
                    window.popupPage.delivery = keysObj.delivery;
                    drawPopupPage_delivery_account(window.popupPage.delivery);
                    resolve(true)
                }else{
                    showPopup_notFound(texts.staff.deliveryNotFound)
                    reject(3)
                    return;
                }
            break;
            case 'ticket_browser':
                if(account.is_master == false){reject(1);return;}
                drawPopupPage_ticket_browser(keysObj.ticket);
                window.popupPage.ticket = keysObj.ticket;
                resolve(true);
            break;
            default:
                reject(1);
            break;
        }


        $('#popupPage').css('max-width',$(window).width() - ( $('#helpWindow').width() + 30))
        // closePopup();
        setTimeout(function(){
            fixpopupPageTabsArrows();
            resolve();
        },300)
        $('#popupPageBody').scrollTop(0)
        $('#popupPage').css({'left':'0'});
    });
}

$('#windowsCover_popupPage').on('click',function(e){
    if($('#helpWindow:hover').length > 0){return;}
    if($('#popupPage:hover').length == 0 ){
        $('#popupPageClose').trigger('click');
    }
});
