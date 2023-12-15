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
        $('<div/>').append(
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
    $('<a/>',{
        menuId:'billing',
        href:process.env.MIX_BILLING_CENTER_URL,
        target:'_blank',
        class:'sideMenu-mainItem_billing authority_master',
        tooltip:texts.cpanel.menu.billing,
    }).append($('<span/>',{class:'ico-billing'})),
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
    $('<a/>',{
        class:`navMenu-element_billing navMenu-element authority_master`,
        href:process.env.MIX_BILLING_CENTER_URL,
        target:'_blank',
    }).append(
        $('<div/>',{class:'navMenu-element-icon'}).append($('<span/>',{class:`ico-billing`})),
        $('<div/>',{class:'navMenu-element-body'}).append($('<span/>',{text:texts.cpanel.menu.billing}))
    ),
    $('<div/>',{class:'navMenu-element reportBug'}).append(
        $('<div/>',{class:'navMenu-element-icon'}).append($('<span/>',{class:`ico-bug`})),
        $('<div/>',{class:'navMenu-element-body'}).append($('<span/>',{text:texts.cpanel.reportBug.reportBug}))
    ),
    $('<div/>',{class:'navMenu-element Logout'}).append(
        $('<div/>',{class:'navMenu-element-icon'}).append($('<span/>',{class:`ico-logout`})),
        $('<div/>',{class:'navMenu-element-body'}).append($('<span/>',{text:texts.cpanel.public.logout}))
    ),
)

////////////////////home page menu events

$('html,body').on('click','.navMenu-element',function(){
    hideList($('#menuList'),$('#Menu'))
})

showPage = function(pageId,tab,keysObj){
    return new Promise(function(resolve, reject){
        //
        $(`.sideMenu-mainItem[menuId="${$(`.side-menuItem[cpPage="${pageId}"]`).attr('menucat')}"]`).trigger('click')
        $('.side-menuItem').removeClass('side-menuItemSelected');
        $(`.side-menuItem[cpPage="${pageId}"]`).addClass('side-menuItemSelected');
        $('.sideMenu-itemArrow').css('visibility','hidden');
        $('.side-menuItem[cpPage="'+pageId+'"]').find('.sideMenu-itemArrow').css('visibility','visible');

        // console.log(window.history.state.page)
        let pushHistory = true;
        if(pageId == window.page.page){pushHistory = false;}else{
            $('#bodyPage').find('#pageWrapper').css({'opacity':0});
        }

        setTimeout(()=>{
            $('#pageWrapper').removeClass().text('')
            window.page = {};
            window.page.page = pageId;
            switch(pageId){
                case 'financial_reports':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_financial_reports();
                    resolve(pushHistory);
                break;
                case 'restaurant_expenses':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_restaurant_expenses();
                    resolve(pushHistory);
                break;
                case 'order_history':
                    if(account.authorities[0] == false){reject(1);return;}
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
                    tab == null ? tab = 'all_orders' : null;
                    drawPage_incomplete_orders();
                    window.page.sort = keysObj.sort;
                    window.page.order_by = keysObj.order_by;
                    drawIncompleteOrdersTable(tab ?? 'all_orders',window.page.order_by,window.page.sort);
                    resolve(pushHistory);
                break;
                case 'images':
                    if(account.authorities[3] == false){reject(1);return;}
                    drawPage_images();
                    resolve(pushHistory);
                break;
                case 'product_reviews':
                    if(account.authorities[1] == false){reject(1);return;}
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
                    window.page.category = keysObj.category;
                    if(typeof(window.page.category) === 'undefined' || window.page.category == null){window.page.category = 'allproducts'}
                    drawPage_manage_products();
                    resolve(pushHistory);
                break;
                case 'category_list':
                    if(account.authorities[1] == false){reject(1);return;}
                    drawPage_category_list();
                    resolve(pushHistory);
                break;
                case 'create_new_user':
                    if(account.authorities[2] == false){reject(1);return;}
                    drawPage_create_new_user();
                    resolve(pushHistory);
                break;
                case 'manage_users':
                    if(account.authorities[2] == false){reject(1);return;}
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
                    drawPage_online_users();
                    resolve(pushHistory);
                break;
                case 'delivery_accounts':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_delivery_accounts();
                    resolve(pushHistory);
                break;
                case 'sub_accounts':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_sub_accounts();
                    resolve(pushHistory);
                break;
                case 'system':
                    if(account.authorities[4] == false){reject(1);return;}
                    drawPage_system();
                    resolve(pushHistory);
                break;
                case 'restaurant_information':
                    if(account.authorities[4] == false){reject(1);return;}
                    drawPage_restaurant_information();
                    resolve(pushHistory);
                break;
                case 'languages':
                    if(account.authorities[4] == false){reject(1);return;}
                    drawPage_languages();
                    resolve(pushHistory);
                break;
                case 'control_panel_settings':
                    drawPage_control_panel_settings();
                    resolve(pushHistory);
                break;
                case 'home_delivery_settings':
                    if(account.authorities[4] == false){reject(1);return;}
                    drawPage_home_delivery_settings();
                    resolve(pushHistory);
                break;
                case 'order_pickup_settings':
                    if(account.authorities[4] == false){reject(1);return;}
                    drawPage_order_pickup_settings();
                    resolve(pushHistory);
                break;
                case 'dine_in_settings':
                    if(account.authorities[4] == false){reject(1);return;}
                    dine_in_settings_settings();
                    resolve(pushHistory);
                break;
                case 'promo_codes':
                    if(account.authorities[4] == false){reject(1);return;}
                    drawPage_promo_codes();
                    resolve(pushHistory);
                break;
                case 'email_address':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_email_address();
                    resolve(pushHistory);
                break;
                case 'password':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_password();
                    resolve(pushHistory);
                break;
                case 'phone_number':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_phone_number();
                    resolve(pushHistory);
                break;
                case 'ticket_history':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_ticket_history();
                    resolve(pushHistory);
                break;
                case 'submit_a_help_ticket':
                    if(account.is_master == false){reject(1);return;}
                    drawPage_submit_a_help_ticket();
                    resolve(pushHistory);
                break;
                default:
                    resolve(pushHistory);
                break;
            }
        },200)
        setTimeout(()=>{
            cpanelTitle(false);
        },200)
        setTimeout(function(){
            $('#bodyPage').find('#pageWrapper').css({'opacity':1});
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
        closePopup();
        authorities();
        // if($('#'+pageId+'-page').css('display') == 'none'){
        //     $('#bodyPage').find('.pageWrapper').css({'opacity':0});
        //     setTimeout(function(){
        //         $('#bodyPage').find('.pageWrapper').css('display','none');
        //         $('#'+pageId+'-page').css({'display':'block'});
        //         if(pageId == 'statistics_and_analytics'){
        //             guideModeToggle(false,false)
        //         }else{
        //             guideModeToggle(settings_temp.guideMode)
        //         }
        //     },200);
        //     setTimeout(function(){
        //         $('#'+pageId+'-page').css({'opacity':1});
        //         // resolve();
        //     },400);
        // }else{
        //     // resolve();
        // }




        // reject(1)

    })
}

$('html,body').on('click','.sideMenu-mainItem',function(e){
    e.stopImmediatePropagation();
    drawMenuItemsPages($(this).attr('menuId'))
});

$('html,body').on('click','#sideMenu-toggle',function(e){
    e.stopImmediatePropagation();
    if(settings_temp.bigSideMenu){
        settings_temp.bigSideMenu = false;
    }else if(!settings_temp.bigSideMenu){
        settings_temp.bigSideMenu = true
    }
    sideMenuIconsToggle(settings_temp.bigSideMenu);
})

/////////////////////////nav menu events///////////////////////
$('html,body').on('input change','#menuListSearch',function(){
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



