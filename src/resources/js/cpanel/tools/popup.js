
$('.popupContainer').on('click',function(){
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
                $('<div/>',{class:'btnContainer'}).append(
                    $('<button/>',{class:'imgs-uploadImgBtn btn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.design.uploadNew})
                    )
                ),
                $('<div/>',{id:'imgsBrowserContainer'})
            );
        break;
        case 'addNewLang':
            $('.popupCard').addClass('popupCard-500x300')
            $('.popupTitle').text(texts.settings.addNewLang);
            $('.popupBody').addClass('m0 p0 w100p').append(
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

    }
    $('.popupContainer').removeClass('none');
    // setTimeout(function(){
        callback();
    // },320)
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
