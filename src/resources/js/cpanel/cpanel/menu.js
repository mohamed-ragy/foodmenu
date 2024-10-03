console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
console.log(window.navigator.language)

//////drawMenu
drawMenuItemsPages = function(menuId){
    $('.sideMenu-itemsContainer').text('')
    let menuItem = window.menu.find(item=>item.name == menuId)
    $('.sideMenu-itemsContainerTitle').text(texts.cpanel.menu[menuItem.name])
    $('.side-menuItem').addClass('none');
    $(`.side-menuItem[menuCat="${menuId}"]`).removeClass('none')
    $('.sideMenu-mainItem').removeClass('sideMenu-mainItemSelected');
    $(`.sideMenu-mainItem[menuId="${menuId}"]`).addClass('sideMenu-mainItemSelected');
}
drawSideMenu = function(){
    $('#sideMenu-Container').append(
        $('<div/>',{id:'sideMenu-itemsContainer'}).append(
            $('<div/>',{class:'w100p row alnC jstfyE mB10 mT20'}).append(
                $('<div/>',{class:'sideMenu-itemsContainerTitle'}),
                $('<div/>',{
                    id:'sideMenu-toggle',
                    tooltip:`<div><span>${texts.cpanel.hotKeys.SideMenuToggle}</span> <span class="hotKeys">${texts.cpanel.hotKeys.viewIconsHotKey}</span></div>`,
                }).append($('<div/>',{class:'ico-menu'})),
            ),
        ),
        $('<div/>',{id:'sideMenu-mainContainer'}).append(
            $('<div/>',{class:'column alnC jstfyS'}).append(
                $('<img/>',{id:'sideMenu-logo',src:'./storage/logo/logo.png'}),
            ),
            $('<div/>'),
        ),
    )
    for(const key in window.menu){
        const item = window.menu[key];
        $('#menuList').append(
            $('<div/>',{class:`navMenu-elementCat ${item.authority}`}).append(
                $('<span/>',{class:`ico-${item.name}`}),
                $('<span/>',{text:texts.cpanel.menu[item.name]})
            )
        )
        if(item.position == 'top'){
            $('#sideMenu-mainContainer').children().first().append(
                $('<div/>',{
                    menuId:item.name,
                    class:`sideMenu-mainItem ${item.authority}`,
                    tooltip:texts.cpanel.menu[item.name],
                }).append(
                    $('<div/>',{class:`sideMenu-mainItem_unsaved none ${item.name}_unsaved`}),
                    $('<span/>',{class:`ico-${item.name}`})
                )
            )
        }else if(item.position == 'bottom'){
            $('#sideMenu-mainContainer').children().last().append(
                $('<div/>',{
                    menuId:item.name,
                    class:`sideMenu-mainItem ${item.authority}`,
                    tooltip:texts.cpanel.menu[item.name],
                }).append(
                    $('<div/>',{class:`sideMenu-mainItem_unsaved none ${item.name}_unsaved`}),
                    $('<span/>',{class:`ico-${item.name}`})
                )
            )
        }
        for(const key2 in item.pages){
            const pageId = item.pages[key2];
            $('#sideMenu-itemsContainer').append(
                $('<div/>',{
                    class:`cpPage side-menuItem none ${pageId.authority}`,
                    cpPage:pageId.name,
                    menuCat:item.name,
                }).append(
                    $('<div/>',{class:'ico-right sideMenu-itemArrow'}),
                    $('<div/>',{class:'row alnC jstfyC'}).append(
                        $('<div/>',{class:`sideMenu-mainItem_unsaved none ${pageId.name}_unsaved`}),
                        $('<span/>',{class:'sideMenu-itemTitle',text:texts.cpanel.menu[pageId.name]}),
                        $('<span/>',{class:`ico-${pageId.name} sideMenu-itemIcon`,tooltip:texts.cpanel.menu[pageId.name]})
                    )
                )
            );
            $('#menuList').append(
                $('<div/>',{class:`cpPage navMenu-element ${pageId.authority}`,cpPage:pageId.name}).append(
                    $('<div/>',{class:'navMenu-element-icon'}).append($('<span/>',{class:`ico-${pageId.name}`})).append(
                        $('<div/>',{class:`navMenu-mainItem_unsaved none ${pageId.name}_unsaved`}),
                    ),
                    $('<div/>',{class:'navMenu-element-body'}).append($('<span/>',{text:texts.cpanel.menu[pageId.name]}))
                ),
            )
        }
    }
    $('#sideMenu-mainContainer').children().last().append(
        $('<div/>',{
            class:'reportBug reportBug-sideMenu',
            tooltip:texts.cpanel.reportBug.reportBug
        }).append($('<span/>',{class:'ico-bug'})),
        $('<div/>',{
            class:'Logout Logout-sideMenu',
            tooltip:texts.cpanel.public.logout,
        }).append($('<span/>',{class:'ico-logout'})),
    )
    $('#menuList').append(
        $('<div/>',{class:'mT40'}),
        $('<div/>',{class:'navMenu-element reportBug'}).append(
            $('<div/>',{class:'navMenu-element-icon'}).append($('<span/>',{class:`ico-bug`})),
            $('<div/>',{class:'navMenu-element-body'}).append($('<span/>',{text:texts.cpanel.reportBug.reportBug}))
        ),
        $('<div/>',{class:'navMenu-element Logout'}).append(
            $('<div/>',{class:'navMenu-element-icon'}).append($('<span/>',{class:`ico-logout`})),
            $('<div/>',{class:'navMenu-element-body'}).append($('<span/>',{text:texts.cpanel.public.logout}))
        ),
    )
}


////////////////////home page menu events

$('body').on('click','.navMenu-element',function(){
    hideList();
})

showPage = function(pageId,tab,keysObj){
    return new Promise(function(resolve, reject){
        let pushHistory = true;
        if(pageId == window.page.page){pushHistory = false;}else{
            $('#bodyPage').find('#pageWrapper').css({'opacity':0,'transform':'translateX(20px)'});
            setTimeout(function(){
                $('#bodyPage').find('#pageWrapper').css({'opacity':1,'transform':'translateX(0px)'});
            },400)
        }
        setTimeout(function(){
            window.page = {};
            window.page.page = pageId;
            switch(pageId){
                case 'home':
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.home}),
                        ),
                    )
                    drawPage_home();
                    resolve(pushHistory);
                break;
                case 'statistics_and_analytics':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.statistics_and_analytics}),
                        ),
                    )
                    let yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1)
                    window.page.year1 = keysObj.year1 ?? yesterday.getFullYear();
                    window.page.month1 = keysObj.month1 ?? parseInt(yesterday.getMonth() ) + 1;
                    window.page.day1 = keysObj.day1 ?? yesterday.getDate();
                    window.page.period = keysObj.period ?? 'day';
                    window.page.compare = keysObj.compare ?? '0';
                    window.page.year2 = keysObj.year2 ?? yesterday.getFullYear();
                    window.page.month2 = keysObj.month2 ?? parseInt(yesterday.getMonth() ) + 1;
                    window.page.day2 = keysObj.day2 ?? yesterday.getDate();
                    drawPage_statistics_and_analytics();
                    resolve(pushHistory);
                break;
                case 'activity_log':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.activity_log}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'activity_log'})
                        ),
                    )
                    window.page.year = keysObj.year ?? new Date().getFullYear();
                    window.page.month = keysObj.month ?? parseInt(new Date().getMonth() ) + 1;
                    window.page.day = keysObj.day ?? new Date().getDate();
                    drawPage_activity_log();
                    resolve(pushHistory);
                break;
                case 'financial_reports':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.financial_reports}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'financial_reports'})
                        ),
                    )
                    drawPage_financial_reports();
                    resolve(pushHistory);
                break;
                case 'restaurant_expenses':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.restaurant_expenses}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'restaurant_expenses'})
                        ),
                    )
                    drawPage_restaurant_expenses();
                    resolve(pushHistory);
                break;
                case 'quick_links':
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.quick_links}),
                        ),
                    )
                    drawPage_quick_links();
                    resolve(pushHistory);
                break;
                case 'order_history':
                    if(account.authorities[0] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.order_history}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'order_history'})
                        ),
                    )
                    window.page.orderHistory_page = keysObj.orderHistory_page ?? '1';
                    window.page.orderBy = keysObj.orderBy ?? 'placed_at';
                    window.page.sort = keysObj.sort ?? 'desc';
                    window.page.orderNumber = keysObj.orderNumber ?? '';
                    window.page.dinedIn = keysObj.dinedIn ?? '1';
                    window.page.pickedUp = keysObj.pickedUp ?? '1';
                    window.page.delivered = keysObj.delivered ?? '1';
                    window.page.canceled = keysObj.canceled ?? '1';
                    window.page.user = keysObj.user ?? '';
                    window.page.byUsers = keysObj.byUsers ?? '1';
                    window.page.byGuests = keysObj.byGuests ?? '1';
                    drawPage_order_history();
                    resolve(pushHistory);
                break;
                case 'incomplete_orders':
                    if(account.authorities[0] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.incomplete_orders}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'incomplete_orders'})
                        ),
                    )
                    tab == null ? tab = 'all_orders' : null;
                    drawPage_incomplete_orders();
                    window.page.sort = keysObj.sort;
                    window.page.order_by = keysObj.order_by;
                    drawIncompleteOrdersTable(tab ?? 'all_orders',window.page.order_by,window.page.sort);
                    resolve(pushHistory);
                break;
                case 'images':
                    if(account.authorities[3] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.images}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'images'})
                        ),
                    )
                    drawPage_images();
                    resolve(pushHistory);
                break;
                case 'product_reviews':
                    if(account.authorities[1] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.product_reviews}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'product_rating_and_reviews'})
                        ),
                    )
                    window.page.product = keysObj.product ?? 'allproducts';
                    window.page.user = keysObj.user ?? '';
                    window.page.byUsers = keysObj.byUsers ?? '1';
                    window.page.byGuests = keysObj.byGuests ?? '1';
                    window.page.star1 = keysObj.star1 ?? '1';
                    window.page.star2 = keysObj.star2 ?? '1';
                    window.page.star3 = keysObj.star3 ?? '1';
                    window.page.star4 = keysObj.star4 ?? '1';
                    window.page.star5 = keysObj.star5 ?? '1';
                    draw_product_reviews();
                    resolve(pushHistory);
                break;
                case 'manage_products':
                    if(account.authorities[1] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'productsListNoSave ico-warning unsaved none mie-5 mis-5 fs1 '}),
                            $('<span/>',{text:texts.cpanel.menu.manage_products}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'manage_products'})
                        ),
                    )
                    window.page.category = keysObj.category;
                    if(typeof(window.page.category) === 'undefined' || window.page.category == null){window.page.category = 'allproducts'}
                    drawPage_manage_products();
                    resolve(pushHistory);
                break;
                case 'category_list':
                    if(account.authorities[1] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'categoryListNoSave ico-warning unsaved none mie-5 mis-5 fs1 '}),
                            $('<span/>',{text:texts.cpanel.menu.category_list}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'product_categories'})
                        ),
                    )
                    drawPage_category_list();
                    resolve(pushHistory);
                break;
                case 'create_new_user':
                    if(account.authorities[2] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.create_new_user}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'create_new_user_account'})
                        ),
                    )
                    drawPage_create_new_user();
                    resolve(pushHistory);
                break;
                case 'manage_users':
                    if(account.authorities[2] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.manage_users}),
                        ),
                    )
                    drawPage_manage_users();
                    if(typeof(keysObj.user) !== 'undefined' && keysObj.user != null){
                        drawManageUserLoading();
                        window.page.user = keysObj.user;
                        getUsersData([window.page.user]).then(function(){
                            drawManageUser(window.page.user);
                        })
                    }
                    resolve(pushHistory);
                break;
                case 'online_users':
                    if(account.authorities[2] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.online_users}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'online_users_and_guests'})
                        ),
                    )
                    drawPage_online_users();
                    resolve(pushHistory);
                break;
                case 'delivery_accounts':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.delivery_accounts}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'delivery_accounts'})
                        ),
                    )
                    drawPage_delivery_accounts();
                    resolve(pushHistory);
                break;
                case 'sub_accounts':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.sub_accounts}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'sub_accounts'})
                        ),
                    )
                    drawPage_sub_accounts();
                    resolve(pushHistory);
                break;
                case 'system':
                    if(account.authorities[4] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.system}),
                        ),
                    )
                    drawPage_system();
                    resolve(pushHistory);
                break;
                case 'restaurant_information':
                    if(account.authorities[4] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.restaurant_information}),
                        ),
                    )
                    drawPage_restaurant_information();
                    resolve(pushHistory);
                break;
                case 'languages':
                    if(account.authorities[4] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websiteLangsNoSave ico-warning unsaved none mie-5 mis-5 fs1 '}),
                            $('<span/>',{text:texts.cpanel.menu.languages}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'languages'})
                        ),
                    )
                    drawPage_languages();
                    resolve(pushHistory);
                break;
                case 'control_panel_settings':
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.control_panel_settings}),
                        ),
                    )
                    drawPage_control_panel_settings();
                    resolve(pushHistory);
                break;
                case 'home_delivery_settings':
                    if(account.authorities[4] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.home_delivery_settings}),
                            ),
                    )
                    drawPage_home_delivery_settings();
                    resolve(pushHistory);
                break;
                case 'order_pickup_settings':
                    if(account.authorities[4] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.order_pickup_settings}),
                            ),
                    )
                    drawPage_order_pickup_settings();
                    resolve(pushHistory);
                break;
                case 'dine_in_settings':
                    if(account.authorities[4] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.dine_in_settings}),
                            ),
                    )
                    dine_in_settings_settings();
                    resolve(pushHistory);
                break;
                case 'promo_codes':
                    if(account.authorities[4] == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.promo_codes}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'promo_codes'})
                        ),
                    )
                    drawPage_promo_codes();
                    resolve(pushHistory);
                break;
                case 'email_address':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.email_address}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'your_account_email_address'})
                        ),
                    )
                    drawPage_email_address();
                    resolve(pushHistory);
                break;
                case 'password':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.password}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'changing_your_password'})
                        ),
                    )
                    drawPage_password();
                    resolve(pushHistory);
                break;
                case 'phone_number':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.phone_number}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'your_account_phone_number'})
                        ),
                    )
                    drawPage_phone_number();
                    resolve(pushHistory);
                break;
                case 'ticket_history':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.ticket_history}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'submit_ticket'})
                        ),
                    )
                    drawPage_ticket_history();
                    resolve(pushHistory);
                break;
                case 'submit_a_help_ticket':
                    if(account.is_master == false){reject(1);return;}
                    clear_cpPage(pageId,pushHistory);
                    $('#navTitle').text('').append(
                        $('<div/>',{class:'row alnBL jstfyS bold600'}).append(
                            $('<span/>',{text:texts.cpanel.menu.submit_a_help_ticket}),
                            $('<span/>',{class:'ico-help help-icon',helpId:'ticket_history'})
                        ),
                    )
                    drawPage_submit_a_help_ticket();
                    if(keysObj.ticket_code){
                        $('#support-submitTicket-ticketCodeList').find(`.inputListElement[key="${keysObj.ticket_code}"]`).trigger('click')
                    }
                    if(keysObj.ticket_title){
                        $('#support-submitTicket-ticketTitle').val(keysObj.ticket_title)
                    }
                    if(keysObj.ticket_desciption){
                        $('#support_submitTicket_ticketDescription').text(keysObj.ticket_desciption)
                    }
                    resolve(pushHistory);
                break;
                default:
                    resolve(pushHistory);
                break;
            }
        },200)

        setTimeout(function(){
            helpIconsToggle(!settings_temp.guideMode ? false : settings_temp.helpIcons);
            fixPageTabsArrows();
            for(const key in window.menu){
                for(const key2 in window.menu[key].pages){
                    if(window.menu[key].pages[key2].name == pageId){
                        if(tab != null){
                            $(`.pageTab[tab="${tab}"]`).trigger('click');
                        }else if(window.menu[key].pages[key2].lastTab != null){
                            $(`.pageTab[tab="${window.menu[key].pages[key2].lastTab}"]`).trigger('click');
                        }
                    }
                }
            }
        },400)
        // closePopup();
        authorities();
    })
}

clear_cpPage = function(pageId,pushHistory){
    if(pushHistory == true){
        $('#bodyPage').find('#pageWrapper').css({'opacity':0,'transform':'translateX(-20px)'});
    }
    $('#navTitle').text('')
    $('#pageWrapper').removeClass().text('')
    cpanelTitle(false);
    if(pageId == 'statistics_and_analytics' || pageId == 'home'){
        guideModeToggle(false,false)
    }else{
        guideModeToggle(settings_temp.guideMode)
    }

    $(`.sideMenu-mainItem[menuId="${$(`.side-menuItem[cpPage="${pageId}"]`).attr('menucat')}"]`).trigger('click')
    $('.side-menuItem').removeClass('side-menuItemSelected');
    $(`.side-menuItem[cpPage="${pageId}"]`).addClass('side-menuItemSelected');
    $('.sideMenu-itemArrow').css('visibility','hidden');
    $('.side-menuItem[cpPage="'+pageId+'"]').find('.sideMenu-itemArrow').css('visibility','visible');

}
$('body').on('click','.sideMenu-mainItem',function(e){
    drawMenuItemsPages($(this).attr('menuId'))
});

$('body').on('click','#sideMenu-toggle',function(e){
    if(settings_temp.bigSideMenu){
        settings_temp.bigSideMenu = false;
    }else if(!settings_temp.bigSideMenu){
        settings_temp.bigSideMenu = true
    }
    sideMenuIconsToggle(settings_temp.bigSideMenu);
})

/////////////////////////nav menu events///////////////////////
$('body').on('input change','#menuListSearch',function(){
    $('.navMenu-element').css('display','flex');
    $('.navMenu-elementCat').css('display','flex');
    if($(this).val() == '' ){
        $('.navMenu-element_billing').css('display','flex');
        $('.navMenu-element').css('display','flex');
        $('.navMenu-elementCat').css('display','flex');
    }else{
        $('.navMenu-element').each(function(){
            if(!$(this).text().toLowerCase().includes($('#menuListSearch').val().toLowerCase())){
                $(this).hide();
            }
        });
        $('.navMenu-element_billing').each(function(){
            if(!$(this).text().toLowerCase().includes($('#menuListSearch').val().toLowerCase())){
                $(this).hide();
            }
        });
        $('.navMenu-elementCat').css('display','none');
    }
})



