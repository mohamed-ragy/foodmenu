drawPage_languages = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websiteLangsNoSave ico-warning unsaved none mie-5 mis-5 fs1 '}),
                $('<span/>',{text:texts.cpanel.menu.languages}),
                $('<span/>',{class:'ico-help help-icon',helpId:'languages'})
            ),
            $('<div/>',{class:'btnContainer mB20'}).append(
                $('<button/>',{class:'btn btn-cancel',id:'langs-addNewLang',text:texts.settings.addNewLang,autoHelp:'install_new_language'}),
            ),
            $('<div/>',{class:'w100p overflowX-A'}).append(
                $('<table/>',{id:'websiteLanguagesTable',class:'',autoHelp:'languages_table'}),
            )
        ),

    )


    setWebsiteLangs();
}
drawPopupPage_create_custom_language = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.create_custom_language}),
        $('<span/>',{class:'ico-help help-icon',helpId:'create_custom_language'})
    );
    $('#popupPageBody').addClass('mxw100p-40 p20').append(
        drawInputText('','ico-title','',texts.settings.customLangName,'lang-customLanguageName','text',texts.settings.customLangName,50,'clearVal','nmX0 w100p mT0',''),
        drawInputText('','ico-langCode','',texts.settings.customLangCode,'lang-customLanguageCode','text',texts.settings.customLangCode,2,'clearVal','nmX0 w100p',''),
        drawInputList('','ico-flag','',texts.settings.customLangFlag,'lang-customLanguageFlag',texts.settings.customLangFlag,250,'lang-customLanguageFlag-list',true,'zx10'),
        drawInputList('','ico-languages','',texts.settings.textsPack,'lang-customLangTextsPack',texts.settings.textsPack,250,'lang-customLangTextsPack-list',false,'zx5'),
        $('<div/>',{class:'mT30 area',}).append(
            $('<div/>',{class:'fs09 areaTitle',text:texts.settings.textDirection}),
            $('<div/>',{class:'column alnC jstfyC'}).append(
                $('<div/>',{class:'checkboxlabel_100p createCustomLang-direction fs09',direction:'ltr',}).append(
                    $('<div/>',{class:'',text:texts.settings.lang_ltr}),
                    $('<div/>',{class:`createCustomLang-directionCheck ico-check1`})
                ),
                $('<div/>',{class:'checkboxlabel_100p createCustomLang-direction fs09',direction:'rtl',}).append(
                    $('<div/>',{class:'',text:texts.settings.lang_rtl}),
                    $('<div/>',{class:`createCustomLang-directionCheck ico-check0`})
                ),
            )
        ),
        $('<div/>',{class:'btnContainer mT40'}).append(
            $('<button/>',{class:'btn',id:'lang-customLanguageSaveBtn'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create})
            )
        )


    );

    getCountriesTimezones();
}
drawPopupPage_edit_language_options = function(lang){
    window.editLangOptionsCode = lang.code;
    $('#popupPageTitle').append(
        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:`websiteLangsNoSave-${lang.code} ico-warning unsaved none mie-5 mis-5 fs1 `}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.edit_language_options}),
        $('<span/>',{class:'ico-help help-icon',helpId:'edit_language_option'})
    );
    $('#popupPageBody').addClass('mxw100p-40 p20').append(
        drawInputText('','ico-langCode','',texts.settings.customLangCode,'langOptions-langCode','text',texts.settings.customLangCode,2,'copy','nmX0 w100p mT0',lang.code,true),
        drawInputText('','ico-title','',texts.settings.customLangName,'langOptions-langName','text',texts.settings.customLangName,50,'clearVal','nmX0 w100p',lang.name),
        drawInputList('','ico-flag','',texts.settings.customLangFlag,'langOptions-langFlag',texts.settings.customLangFlag,250,'langOptions-langFlag-list',true,'zx10'),
        $('<div/>',{class:'mT30 area',}).append(
            $('<div/>',{class:'fs09 areaTitle',text:texts.settings.textDirection}),
            $('<div/>',{class:'column alnC jstfyC'}).append(
                $('<div/>',{class:'checkboxlabel_100p langOptions-direction fs09',direction:'ltr',}).append(
                    $('<div/>',{class:'',text:texts.settings.lang_ltr}),
                    $('<div/>',{class:`langOptions-directionCheck ${lang.direction == 'ltr' ? 'ico-check1' : 'ico-check0'}`})
                ),
                $('<div/>',{class:'checkboxlabel_100p langOptions-direction fs09',direction:'rtl',}).append(
                    $('<div/>',{class:'',text:texts.settings.lang_rtl}),
                    $('<div/>',{class:`langOptions-directionCheck ${lang.direction == 'rtl' ? 'ico-check1' : 'ico-check0'}`})
                ),
            )
        ),
        drawSaveCancelBtns('langOptions-saveBtn','langOptions-cancelBtn','mT40')
    )
    lang.direction == 'rtl' ? $('#langOptions-langDirection').prop('checked',true) : null;
    getCountriesTimezones(function(){
        $('#langOptions-langFlag-list').children().each(function(){
            if($(this).attr('key') == lang.flag){$(this).trigger('click')}
        })
    });

}
drawPopupPage_edit_language_texts = function(lang){
    $('#popupPageTitle').append(
        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websiteLangTxtsNoSave ico-warning unsaved none mie-5 mis-5 fs1 '}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.edit_language_texts}),
        $('<span/>',{class:'ico-help help-icon',helpId:'edit_language_text'})
    );
    $('#popupPageBody').addClass('w800 mxw100p-40 p20').append(
        $('<div/>',{class:'w100p '}).append(
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-40 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-60 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-40 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-60 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-40 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-60 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-40 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-60 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-40 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-60 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-40 mxw100p'}),
            $('<div/>',{class:'mY10 cardLoading h10br5 w100p-60 mxw100p'}),
        )
    )
    getLangText(lang)
}
