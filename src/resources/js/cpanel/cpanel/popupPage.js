$(window).resize(function(){
    $('#popupPage').css('max-width',$(window).width() - ( $('#helpWindow').width() + 30))
})
popupPageClose = function(push=true){
    setTimeout(()=>{cpanelTitle(false)},300)
    $('#windowsCover_popupPage').hide();
    $('#popupPage').css({'right':'unset','left':'-110%'});
    $('#helpWindow').removeClass('helpWindow_popupPage')
    $('#popupPage').find('.pageWrapper').hide();
    delete window.page.tab;
    window.popupPage = {};
    if(push){
        pushHistory(true)
    }else{pushHistory(false)}
}
$('#popupPageClose').on('click',function(){
    popupPageClose(true);
});

showPopupPage = function(popupPage,keysObj){
    return new Promise(function(resolve, reject){
        setTimeout(()=>{cpanelTitle(false)},300)
        if(popupPage == null || popupPage == ''){reject(3);return;}
        if(popupPage == window.popupPage.popupPage){reject(2);return;}
        // if($('#'+popupPage).css('display') != 'none' && $('#'+popupPage).closest('.pageWrapper').css('display') != 'none'){return;}
        if($('#popupPage').css('right') == '0px' || $('#popupPage').css('left') == '0px'){
            // popupPageClose(true);
            $('#popupPage').css({'right':'unset','left':'-110%'});
            $('#helpWindow').removeClass('helpWindow_popupPage')
            $('#popupPage').find('.pageWrapper').hide();
            setTimeout(function(){
                showPopupPage(popupPage);
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
            case 'edit_category':
                if(typeof(website.categories.find(item=>item.name == keysObj.category)) !== 'undefined'){
                    window.popupPage.category = keysObj.category;
                    drawPopupPage_edit_category(keysObj.category);
                    resolve(true);
                    break;
                }else{
                    reject(3)
                }
            case 'category':
                if(typeof(website.categories.find(item=>item.name == keysObj.category)) !== 'undefined'){
                    window.popupPage.category = keysObj.category;
                    drawPopupPage_category(keysObj.category)
                    resolve(true)
                }else{
                    reject(3)
                }
                break;
            case 'create_category':
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
                if(!langOptiosCheck){reject(3);return;}
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
                drawPopupPage_create_promo_code();
                resolve(true);
            break;
            case 'manage_promo_code':
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
                        reject(3);return;
                    }else{
                        drawPopupPage_manage_promo_code(editPromocodeCheck);
                        resolve(true);
                    }
                })

            break;
            case 'create_delivery_account':
                drawPopupPage_create_delivery_account();
                resolve(true);
            break;
            case 'create_sub_account':
                drawPopupPage_create_sub_account();
                resolve(true);
            break;
            case 'sub_account':
                if(typeof(website.accounts.find(item=>item.id == keysObj.subaccount)) !== 'undefined'){
                    window.popupPage.subaccount = keysObj.subaccount;
                    drawPopupPage_sub_account(window.popupPage.subaccount);
                    resolve(true)
                }else{
                    reject(3)
                }
            break;
            case 'manage_sub_account':
                if(account.is_master == false){reject(1);return;}
                if(typeof(website.accounts.find(item=>item.id == keysObj.subaccount)) !== 'undefined'){
                    window.popupPage.subaccount = keysObj.subaccount;
                    drawPopupPage_manage_sub_account(window.popupPage.subaccount);
                    resolve(true)
                }else{
                    reject(3)
                }
            break;
            case 'delivery_account':
                if(typeof(website.deliveries.find(item=>item.id == keysObj.delivery)) !== 'undefined'){
                    window.popupPage.delivery = keysObj.delivery;
                    drawPopupPage_delivery_account(window.popupPage.delivery);
                    resolve(true)
                }else{
                    reject(3)
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
        setTimeout(function(){
            fixPageTabsArrows();
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
