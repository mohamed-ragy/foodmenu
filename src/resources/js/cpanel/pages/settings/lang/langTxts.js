getLangText = function(lang,refresh=false){
    if(typeof(window.langTxts[lang]) === 'undefined' || refresh){
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getLangTexts:lang,
            },success:function(r){
                window.langTxts[r.lang] = JSON.parse(JSON.stringify(r.text));
                window.langTxts_temp[r.lang] = JSON.parse(JSON.stringify(r.text));
                drawLangsTexts(r.lang);
                languages_unsave_check();
            }
        })
    }else{
        drawLangsTexts(lang);
        languages_unsave_check();
    }

}
drawLangsTexts = function(langCode){
    let langObj = website.languages[langCode];
    let langTxt = window.langTxts_temp[langCode];
    $('#popupPageTitle').text('').append(
        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:`websiteLangTxtsNoSave-${langObj.code} ico-warning unsaved none mie-5 mis-5 fs1 `}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.edit_language_texts}),
        $('<span/>',{class:'ico-help help-icon',helpId:'edit_language_text'})
    );
    $('#popupPageBody').addClass('relative').text('').append(
        $('<div/>',{class:'row alnC jstfyS mX10'}).append(
            $('<img/>',{class:'w25 h25 shdw2 ofCover br50p mie-5',src:`./storage/imgs/flags/${langObj.flag}.png`}),
            $('<div/>',{class:'fs101 bold600',text:langObj.name})
        ),
        drawSaveCancelBtns('langTxts-editLangTextSaveBtn','langTxts-editLangTextCancelBtn','mB40 sticky t0 zx10',langObj.code),
        $('<div/>',{class:'inputSearchContainer'}).append(
            $('<input/>',{class:'inputSearch',placeholder:texts.settings.findText,type:'text',id:'lang-editLangTextFindInput'}),
            $('<div/>',{class:'inputSearchIcon ico-search'})
        ),
        $('<div/>',{class:'area mT40',id:'editLangTxt-authentication'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.authentication}),
        ),
        $('<div/>',{class:'area mT40',id:'editLangTxt-orders'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.orders}),
        ),
        $('<div/>',{class:'area mT40',id:'editLangTxt-reviews'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.reviews}),
        ),
        $('<div/>',{class:'area mT40',id:'editLangTxt-liveChat'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.liveChat}),
        ),
        $('<div/>',{class:'area mT40',id:'editLangTxt-other'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.other}),
        ),
        $('<div/>',{class:'area mT40',id:'editLangTxt-receipt'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.receipt}),
        ),
    )
    for(const key in langTxt.authentication){
        $('<textarea/>',{
            class:'editLangTextInput textarea',
            text:langTxt.authentication[key],
            placeholder:langTxt.authentication[key],
            textKey:key,
            textCatKey:'authentication',
            lang:langObj.code,
            autoHelp:'',
        }).appendTo('#editLangTxt-authentication');
    }
    for(const key in langTxt.orders){
        $('<textarea/>',{
            class:'editLangTextInput textarea',
            text:langTxt.orders[key],
            placeholder:langTxt.orders[key],
            textKey:key,
            textCatKey:'orders',
            lang:langObj.code,
            autoHelp:'',
        }).appendTo('#editLangTxt-orders');
    }
    for(const key in langTxt.reviews){
        $('<textarea/>',{
            class:'editLangTextInput textarea',
            text:langTxt.reviews[key],
            placeholder:langTxt.reviews[key],
            textKey:key,
            textCatKey:'reviews',
            lang:langObj.code,
            autoHelp:'',
        }).appendTo('#editLangTxt-reviews');
    }
    for(const key in langTxt.liveChat){
        $('<textarea/>',{
            class:'editLangTextInput textarea',
            text:langTxt.liveChat[key],
            placeholder:langTxt.liveChat[key],
            textKey:key,
            textCatKey:'liveChat',
            lang:langObj.code,
            autoHelp:'',
        }).appendTo('#editLangTxt-liveChat');
    }
    for(const key in langTxt.other){
        $('<textarea/>',{
            class:'editLangTextInput textarea',
            text:langTxt.other[key],
            placeholder:langTxt.other[key],
            textKey:key,
            textCatKey:'other',
            lang:langObj.code,
            autoHelp:'',
        }).appendTo('#editLangTxt-other');
    }
    for(const key in langTxt.receipt){
        $('<textarea/>',{
            class:'editLangTextInput textarea',
            text:langTxt.receipt[key],
            placeholder:langTxt.receipt[key],
            textKey:key,
            textCatKey:'receipt',
            lang:langObj.code,
            autoHelp:'',
        }).appendTo('#editLangTxt-receipt');
    }
    languages_unsave_check();
}
langsTxtsNoSaveCheck = function(){
    let langtxtsCheck = true;
    for(const key in window.langTxts){
        let texts = window.langTxts[key];
        for(const key2 in window.langTxts_temp){
            let texts2 = window.langTxts_temp;
            if(key == key2){
                if(JSON.stringify(window.langTxts[key]) == JSON.stringify(window.langTxts_temp[key])){
                    $(`.websiteLangsTableRowBtn_edit[lang="${key}"]`).find('.tableRow_unsaved').addClass('none')
                    $(`.websiteLangTxtsNoSave-${key}`).addClass('none')
                }else{
                    $(`.websiteLangsTableRowBtn_edit[lang="${key}"]`).find('.tableRow_unsaved').removeClass('none')
                    $(`.websiteLangTxtsNoSave-${key}`).removeClass('none')
                    langtxtsCheck = false;
                }
            }
        }
    }
    if(langtxtsCheck){
        return true;
    }else{
        return false;
    }
}
$('html,body').on('input change','.editLangTextInput',function(e){
    e.stopImmediatePropagation();
    window.langTxts_temp[$(this).attr('lang')][$(this).attr('textCatKey')][$(this).attr('textKey')] = $(this).val();
    $(this).removeClass('editLangTextInput_error');
    languages_unsave_check();
});

$('html,body').on('click','#langTxts-editLangTextCancelBtn',function(){
    window.langTxts_temp[window.popupPage.language] = JSON.parse(JSON.stringify(window.langTxts[window.popupPage.language]))
    getLangText()
    popupPageClose(true);
    languages_unsave_check();
})
let savelangText = {};
$('html,body').on('click','#langTxts-editLangTextSaveBtn',function(e){
    e.stopImmediatePropagation();
    let editLangSave = $(this).attr('key')
    let editTextsValidaion = true;
    $('.editLangTextInput').each(function(){
        if($(this).val() == ''){
            $(this).addClass('editLangTextInput_error')
            editTextsValidaion = false;
            scrollToDiv($('#popupPageBody'),$(this))
            $(this).select();
        }
    })
    if(!editTextsValidaion){
        showAlert('error',texts.settings.langTextEditEmpty,4000,true);
        return;
    }
    if(!coolDownChecker()){return;}
    showBtnLoading($('#langTxts-editLangTextSaveBtn'))
    savelangText = {
        authentication:{},
        orders:{},
        reviews:{},
        other:{},
        liveChat:{},
        receipt:{},
    };
    $('#editLangTxt-authentication').find('.editLangTextInput').each(function(){
        savelangText.authentication[$(this).attr('textKey')] = $(this).val();
    });
    $('#editLangTxt-orders').find('.editLangTextInput').each(function(){
        savelangText.orders[$(this).attr('textKey')] = $(this).val();
    });
    $('#editLangTxt-reviews').find('.editLangTextInput').each(function(){
        savelangText.reviews[$(this).attr('textKey')] = $(this).val();
    });
    $('#editLangTxt-liveChat').find('.editLangTextInput').each(function(){
        savelangText.other[$(this).attr('textKey')] = $(this).val();
    });
    $('#editLangTxt-other').find('.editLangTextInput').each(function(){
        savelangText.liveChat[$(this).attr('textKey')] = $(this).val();
    });
    $('#editLangTxt-receipt').find('.editLangTextInput').each(function(){
        savelangText.receipt[$(this).attr('textKey')] = $(this).val();
    });
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveLangText:savelangText,
            lang:editLangSave
        },
        success:function(response){
            hideBtnLoading($('#langTxts-editLangTextSaveBtn'))
            if(response.saveLangTextStatus == 1){
                window.langTxts[window.popupPage.language] = JSON.parse(JSON.stringify(window.langTxts_temp[window.popupPage.language]))
                window.receiptTxt = null;
                showAlert('success',response.msg,4000,true);
                popupPageClose(true);
                languages_unsave_check();
            }else if(response.saveLangTextStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})

$('html,body').on('input change','#lang-editLangTextFindInput',function(e){
    e.stopImmediatePropagation();
    findText = $('#lang-editLangTextFindInput').val();
    $('.editLangTextInput').each(function(){
        if($(this).val().toLowerCase().includes(findText.toLowerCase())){
            $(this).removeClass('none');
        }else{
            $(this).addClass('none');
        }
    })
    if($('#editLangTxt-authentication').find('.none').length == $('#editLangTxt-authentication').children().length - 1){
        $('#editLangTxt-authentication').addClass('none');
    }else{
        $('#editLangTxt-authentication').removeClass('none');
    }
    if($('#editLangTxt-orders').find('.none').length == $('#editLangTxt-orders').children().length - 1){
        $('#editLangTxt-orders').addClass('none');
    }else{
        $('#editLangTxt-orders').removeClass('none');
    }
    if($('#editLangTxt-reviews').find('.none').length == $('#editLangTxt-reviews').children().length - 1){
        $('#editLangTxt-reviews').addClass('none');
    }else{
        $('#editLangTxt-reviews').removeClass('none');
    }
    if($('#editLangTxt-liveChat').find('.none').length == $('#editLangTxt-liveChat').children().length - 1){
        $('#editLangTxt-liveChat').addClass('none');
    }else{
        $('#editLangTxt-liveChat').removeClass('none');
    }
    if($('#editLangTxt-other').find('.none').length == $('#editLangTxt-other').children().length - 1){
        $('#editLangTxt-other').addClass('none');
    }else{
        $('#editLangTxt-other').removeClass('none');
    }
    if($('#editLangTxt-receipt').find('.none').length == $('#editLangTxt-receipt').children().length - 1){
        $('#editLangTxt-receipt').addClass('none');
    }else{
        $('#editLangTxt-receipt').removeClass('none');
    }
})
