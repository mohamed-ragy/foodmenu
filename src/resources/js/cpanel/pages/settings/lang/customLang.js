getCustomLangFlags = function(){
    for(const key in window.countries){
        addToInputList($('#lang-customLanguageFlag-list'),window.countries[key][account.language],window.countries[key].code)
        addToInputList($('#langOptions-langFlag-list'),window.countries[key][account.language],window.countries[key].code)
    }
    for(const key in foodMenuData.langs){
        addToInputList($('#lang-customLangTextsPack-list'),foodMenuData.langs[key].name,foodMenuData.langs[key].code)
    }
}
$('html,body').on('click','#lang-customLanguageFlag-list .inputListElement',function(){
    if($(this).attr('key') == '' ||$(this).attr('key') == null){
        $('#lang-customLanguageFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<span/>',{class:'ico-flag'})
        )
    }else{
        $('#lang-customLanguageFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<img/>',{class:'inputTextIconFlag',src:`./storage/imgs/flags/${$(this).attr('key')}.png`,alt:''})
        )
    }
})
$('html,body').on('keyup','#lang-customLanguageFlag',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('key') == '' ||$(this).attr('key') == null){
        $('#lang-customLanguageFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<span/>',{class:'ico-flag'})
        )
    }else{
        $('#lang-customLanguageFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<img/>',{class:'inputTextIconFlag',src:`./storage/imgs/flags/${$(this).attr('key')}.png`,alt:''})
        )
    }
})
$('html,body').on('click','#lang-customLanguageSaveBtn',function(e){
    e.stopImmediatePropagation();
    if($('#lang-customLanguageName').val() == ''){
        showAlert('error',texts.settings.customLangNameRequired,4000,true);
        inputTextError($('#lang-customLanguageName'))
        return;
    }
    if($('#lang-customLanguageCode').val() == ''){
        showAlert('error',texts.settings.customLangCodeRequired,4000,true);
        inputTextError($('#lang-customLanguageCode'))
        return;
    }
    if($('#lang-customLanguageFlag').attr('key') == '' || $('#lang-customLanguageFlag').attr('key') == null){
        showAlert('error',texts.settings.customLangFlagRequired,4000,true);
        inputListError($('#lang-customLanguageFlag'));
        return;
    }
    if($('#lang-customLangTextsPack').attr('key') == '' || $('#lang-customLangTextsPack').attr('key') == null){
        showAlert('error',texts.settings.customLangPackRequired,4000,true);
        inputListError($('#lang-customLangTextsPack'));
        return;
    }
    showBtnLoading($('#lang-customLanguageSaveBtn'));
    let customLang_direction;
    if($('#lang-customLangDirection').prop('checked') == true){
        customLang_direction = 'rtl';
    }else{
        customLang_direction = 'ltr';
    }
    let customLang_name = $('#lang-customLanguageName').val();
    let customLang_code = $('#lang-customLanguageCode').val();
    let customLang_flag = $('#lang-customLanguageFlag').attr('key');
    let customLang_pack = $('#lang-customLangTextsPack').attr('key');
    if(!coolDownChecker()){return;}
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createCustomLang:true,
            name:customLang_name,
            code:customLang_code,
            flag:customLang_flag,
            direction:customLang_direction,
            pack:customLang_pack,
        },success:function(r){
            hideBtnLoading($('#lang-customLanguageSaveBtn'));
            if(r.createCustomLangStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.languages[r.lang.code] = JSON.parse(JSON.stringify(r.lang));
                website_temp.languages[r.lang.code] = JSON.parse(JSON.stringify(r.lang));
                setWebsiteLangs();
                popupPageClose(true);
            }else if(r.createCustomLangStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })


})
