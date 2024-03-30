
$('html,body').on('click','.popupContainer',function(e){
    // e.stopImmediatePropagation();
    if(
        $('.popupCard:hover').length > 0
        || $('.popupCard').attr('popup') == 'connectionLost'
        || $('.popupCard').attr('popup') == 'updateRefreshRequired'
        || $('.popupCard').attr('popup') == 'loginDetected'
    ){return;}
    closePopup();
})
////////////
$('html,body').on('click','.popupClose',function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    $('.popupContainer').addClass('none');
})
closePopup = function(){
    $('.popupContainer').addClass('none');
    window.imgBrowser.opened = false;
    window.imgBrowser.title = '';
    window.imgBrowser.imgBrowserClass = '';
}

showPopup =function(popup,callback=()=>{}){

    closePopup();
    $('.popupContainer').text('').append(
        $('<div/>',{class:'popupCard',popup:popup}).append(
            $('<div/>',{class:'popupHead'}).append(
                $('<div/>',{class:'popupTitle'}),
                $('<span/>',{class:'popupClose popupCloseStyle ico-close',tooltip:texts.cpanel.public.close})
            ),
            $('<div/>',{class:'popupBody'}),
        )
    )
    switch(popup){
        case 'logout':
            $('.popupTitle').text(texts.cpanel.public.logout);
            $('.popupBody').append(
                $('<div/>',{text:texts.cpanel.public.confirmLogout}),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<button/>',{class:'btn btn-cancel popupClose mX5',text:texts.cpanel.public.cancel}),
                    $('<button/>',{class:'btn',id:'logout-btn',text:texts.cpanel.public.yes}),
                )
            )
        break;
        case 'reportBug':
            $('.popupCard').addClass('popupCard-400')
            $('.popupTitle').text(texts.cpanel.reportBug.reportBug);
            $('.popupBody').append(
                drawTextArea('','ico-description','',texts.cpanel.reportBug.describeBug,'reportBugMsg','1000',''),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<button/>',{class:'btn',id:'reportBugBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.cpanel.reportBug.report})
                    )
                )
            );
        break;
        case 'cpanelHelp':
            $('.popupCard').addClass('popupCard-800x800')
            $('.popupTitle').text(texts.cpanel.hotKeys.allHotkeys);
            $('.popupBody').append(
                $('<div/>',{id:'f1_shortcutsContainer'}).append(
                    $('<div/>',{class:'f1_shortcutsContainer'}).append(
                        $('<div/>',{class:'f1_shortCutsTitle',text:texts.cpanel.hotKeys.general}),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.allHotkeys,'<span class="f1_shortcutKeys">F1</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.closePopups,'<span class="f1_shortcutKeys">Esc</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.logout,'<span class="f1_shortcutKeys">Shift</span>+<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">L</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.clearAlerts,'<span class="f1_shortcutKeys">Alt</span>+<span class="f1_shortcutKeys">A</span>'),
                    ),
                    $('<div/>',{class:'f1_shortcutsContainer'}).append(
                        $('<div/>',{class:'f1_shortCutsTitle',text:texts.cpanel.hotKeys.view}),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.SideMenuToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">M</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.statusBarToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">S</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.hotkeysToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">K</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.darkModeToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">D</span>'),
                    ),
                    $('<div/>',{class:'f1_shortcutsContainer'}).append(
                        $('<div/>',{class:'f1_shortCutsTitle',text:texts.cpanel.hotKeys.guideMode}),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.guideModeToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">G</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.helpIconsToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">I</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.autoHelpToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">H</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.autoHelpHold,`<span class="mX5">${texts.cpanel.hotKeys.hold}</span><span class="f1_shortcutKeys">S</span>`),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.guideHintsToggle,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">A</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.binUnbinAutoHelp,'<span class="f1_shortcutKeys">Ctrl</span>+<span class="f1_shortcutKeys">B</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.minAllAutoHelp,'<span class="f1_shortcutKeys">Alt</span>+<span class="f1_shortcutKeys">N</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.maxAllAutoHelp,'<span class="f1_shortcutKeys">Alt</span>+<span class="f1_shortcutKeys">M</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.clearUnpunnedAutohelp,'<span class="f1_shortcutKeys">Alt</span>+<span class="f1_shortcutKeys">C</span>'),
                        drawf1Popup_shortcut(texts.cpanel.hotKeys.clearAllAutohelp,'<span class="f1_shortcutKeys">Alt</span>+<span class="f1_shortcutKeys">X</span>'),

                    ),
                )

            )
        break;
        case 'connectionLost':
            $('.popupTitle').text(texts.cpanel.public.connectionlost1);
            $('.popupClose').removeClass();
            $('.popupBody').append(
                $('<div/>',{class:'mY10',id:'connectionLost-popupMsg',text:texts.cpanel.public.connectionlost2}),
            )
        break;
        case 'updateRefreshRequired':
            $('.popupTitle').text(texts.cpanel.public.pageRefreshRequired);
            $('.popupClose').removeClass();
            $('.popupBody').append(
                $('<div/>',{id:'updateRefreshRequiredContainer',class:'mY10',text:`${texts.cpanel.public.pageRefreshRequired2} 10 ${texts.cpanel.public.pageRefreshRequired3}`}),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<button/>',{class:'btn reloadCpanel',text:texts.cpanel.public.reloadNow})
                )
            )
        break;
        case 'loginDetected':
            $('.popupTitle').text(texts.cpanel.public.loginDetected);
            $('.popupClose').removeClass();
            $('.popupBody').append(
                $('<div/>',{class:'mY10',text:texts.cpanel.public.loginDetected1}),
            )
        break;
        case 'delete-popup':
            $('.popupTitle').text(texts.cpanel.public.confirmDelete);
        break;
        case 'imgBrowser':
            $('.popupCard').addClass('popupCard-800x800')
            $('.popupBody').append(
                $('<div/>',{class:'row alnC jstfyS mX20 mT10 mB20'}).append(
                    $('<div/>',{key:'storage',class:'img_browser_tab img_browser_tab_selected',text:texts.design.myLibrary}),
                    $('<div/>',{key:'pexels',class:'img_browser_tab',text:texts.design.freeImgs}),
                ),
                $('<div/>',{class:'img_browser_tab_container',key:'storage'}).append(
                    $('<div/>',{class:'btnContainer'}).append(
                        $('<button/>',{class:'imgs-uploadImgBtn btn mie-10'}).append(
                            $('<div/>',{class:'btnLoading'}),
                            $('<div/>',{class:'btnTxt',text:texts.design.uploadNew})
                        )
                    ),
                    $('<div/>',{id:'imgsBrowserContainer'}),
                    drawLoadMore('imgBrowser_loadMore','none'),
                    $('<div>',{id:'imgBrowserNoImgs',class:'ma taC none',text:texts.design.noUploads}),
                ),
                $('<div/>',{class:'img_browser_tab_container none',key:'pexels'}).append(
                    $('<div/>',{class:'pexels_search_container'}).append(
                        $('<div/>',{class:'ico-search pexels_search_icon'}),
                        $('<input/>',{class:'pexels_search mie-5',id:'pexels_search',placeholder:texts.design.pexels_search_placeholder}),
                    ),
                    $('<div/>',{class:'row alnS jstfySB'}).append(
                        $('<a/>',{href:'https://www.pexels.com',target:'_blank',class:'wFC mY5 mX15 row alnC jstfyS'}).append(
                            $('<img/>',{class:'br3 h20 w20 ofCover imgPL mie-5',src:'https://images.pexels.com/lib/api/pexels.png'}),
                            $('<div/>',{class:'fs08 c_white-11',text:'Photos provided by Pexels'})
                        ),
                        $('<div/>',{class:'column alnE jstfyS mX5'}).append(
                            $('<div/>',{class:'row wrap alnC jstfyC'}).append(
                                drawInputList('','ico-image','','','pexels_search_size',texts.design.size,100,'pexels_search_size_list',false,'mX5','','w100'),
                                drawInputList('','ico-image','','','pexels_search_orientation',texts.design.orientation,100,'pexels_search_orientation_list',false,'mX5','','w100'),
                            ),
                            $('<button/>',{class:'btn mY0 mX5',id:'imgBrowser_pexels_search_btn'}).append(
                                $('<div/>',{class:'btnLoading'}),
                                $('<div/>',{class:'btnTxt',text:texts.cpanel.public.search}),
                            ),
                        )
                    ),
                    $('<div/>',{id:'imgsBrowserContainer_pexels',class:'row alnC jstfyC wrap mT20'}),
                    $('<div/>',{class:'row alnC jstfyC'}).append(
                        $('<div/>',{class:'imgBrowser_pexels_pagination none'}).append(
                            $('<div/>',{class:'imgBrowser_pexels_pagination_prev ico-left'}),
                            $('<div/>',{class:'imgBrowser_pexels_pagination_page_num',text:''}),
                            $('<div/>',{class:'imgBrowser_pexels_pagination_next ico-right'}),
                        )
                    )
                )
            );
            addToInputList($('#pexels_search_size_list'),texts.design.allSizes,'')
            addToInputList($('#pexels_search_size_list'),texts.design.large,'large')
            addToInputList($('#pexels_search_size_list'),texts.design.medium,'medium')
            addToInputList($('#pexels_search_size_list'),texts.design.small,'small')

            addToInputList($('#pexels_search_orientation_list'),texts.design.allOrientations,'')
            addToInputList($('#pexels_search_orientation_list'),texts.design.landscape,'landscape')
            addToInputList($('#pexels_search_orientation_list'),texts.design.portrait,'portrait')
            addToInputList($('#pexels_search_orientation_list'),texts.design.square,'square')

        break;
        case 'addNewLang':
            $('.popupCard').addClass('popupCard-500x300')
            $('.popupTitle').text(texts.settings.addNewLang);
            $('.popupBody').addClass('w100p').append(
                $('<div/>',{class:'addNewLangList w100p mB20'})
            );
        break;
        case 'copyWorkingDay':
            $('.popupCard').addClass('popupCard-400');
        break;
        case 'changeDeliveryAccountPassword':
            $('.popupTitle').text(texts.staff.changeDeliveryPassword);
        break;
        case 'changeSubaccountPassword':
            $('.popupTitle').text(texts.staff.changeSubaccountPassword);
        break;
        case 'createNewProductOption':
            $('.popupTitle').text(texts.products.addOption);
        break;
        case 'editProductOption':
            $('.popupTitle').text(texts.products.editOption);
        break;
        case 'createNewProductSelection':
            $('.popupTitle').text(texts.products.addOptionSelection);
        break;
        case 'editProductSelection':
            $('.popupTitle').text(texts.products.editSelection);
        break;
        case 'error-popup':
            $('.popupCard').addClass('popupCard-400')
            $('.popupTitle').text(texts.cpanel.public.error);
        break;
        case 'accessDenied':
            $('.popupTitle').text(texts.cpanel.public.accessDenied);
            $('.popupBody').append(
                $('<div/>',{text:texts.cpanel.public.accessDenied2})
            )
        break;
        case 'share-popup':
            $('.popupTitle').text(texts.cpanel.public.share);
        break;
        case 'addItem':
            $('.popupTitle').text(texts.orders.addOrderItem);
        break;
        case 'giveOrderToDeliveryMan':
            $('.popupTitle').text(texts.orders.giveOrderToDelivery);
        break;
        case 'orderChanges':
            //
        break
        case 'changeEmailConfirm':
            $('.popupTitle').text(texts.security.changeEmail);
        break;
        case 'changePasswordConfirm':
            $('.popupTitle').text(texts.security.changePassword);
        break;
        case 'changePhoneConfirm':
            $('.popupTitle').text(texts.security.changePhone);
        break;
        case 'addNewExpenses':
            //
        break;
        case 'deleteExpenses':
            //
        break;
        case 'activityLog-seeChanges':
            //
        break;
        case 'statistics_select_period':
            $('.popupTitle').text(texts.cpanel.menu.statistics_and_analytics);
        break;
        case 'statistics':
            $('.popupTitle').text(texts.cpanel.menu.statistics_and_analytics);
        break;
    }
    $('.popupContainer').removeClass('none');
    callback();
}
////////draw functions
drawf1Popup_shortcut = function(text,keys){
    return $('<div/>',{class:'f1_shortcutContainer'}).append(
        $('<div/>',{class:'f1_shortcutTitle',text:text}),
        $('<div/>',{class:'f1_shortcutKeysContainer'}).append(
            keys
        )
    )
}
//
showPopup_notFound = function(txt){
    $('.popupContainer').removeClass('none');
    showPopup('error-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_red'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:txt})
            ),
            $('<div/>',{class:'btnContainer mT30'}).append($('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.gotIt}))
        )},
    )
}
//
