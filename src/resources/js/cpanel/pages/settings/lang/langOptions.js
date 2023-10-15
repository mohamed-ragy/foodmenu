

//
$('html,body').on('click','#langOptions-langFlag-list .inputListElement',function(){
    if($(this).attr('key') == '' || $(this).attr('key') == null){
        $('#langOptions-langFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<span/>',{class:'ico-flag'})
        )
    }else{
        $('#langOptions-langFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<img/>',{class:'inputTextIconFlag',src:`./storage/imgs/flags/${$(this).attr('key')}.png`,alt:''})
        )
    }
    website_temp.languages[window.editLangOptionsCode].flag = $(this).attr('key')
    languages_unsave_check();
})
$('html,body').on('keyup','#langOptions-langFlag',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('key') == '' || $(this).attr('key') == null){
        $('#langOptions-langFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<span/>',{class:'ico-flag'})
        )
    }else{
        $('#langOptions-langFlag').closest('.inputListContainer').find('.inputListIcon').text('').append(
            $('<img/>',{class:'inputTextIconFlag',src:`./storage/imgs/flags/${$(this).attr('key')}.png`,alt:''})
        )
    }
    website_temp.languages[window.editLangOptionsCode].flag = $(this).attr('key')
    languages_unsave_check();
});
$('html,body').on('change input','#langOptions-langName',function(e){
    e.stopImmediatePropagation();
    website_temp.languages[window.editLangOptionsCode].name = $(this).val()
    languages_unsave_check();
})
$('html,body').on('click','#langOptions-langDirection',function(e){
    e.stopImmediatePropagation();
    $(this).prop('checked') ? website_temp.languages[window.editLangOptionsCode].direction = 'rtl' : website_temp.languages[window.editLangOptionsCode].direction = 'ltr' ;
    languages_unsave_check();
})
$('html,body').on('click','#langOptions-cancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.languages = JSON.parse(JSON.stringify(website.languages));
    popupPageClose(true);
    languages_unsave_check();
})

$('html,body').on('click','#langOptions-saveBtn',function(e){
    e.stopImmediatePropagation();
    if($('#langOptions-langName').val() == ''){
        showAlert('error',texts.settings.customLangNameRequired,4000,true);
        inputTextError($('#langOptions-langName'))
        return;
    }

    if($('#langOptions-langFlag').attr('key') == ''){
        showAlert('error',texts.settings.customLangFlagRequired,4000,true);
        inputListError($('#langOptions-langFlag'));
        return;
    }
    if(!coolDownChecker()){return;}
    showBtnLoading($('#langOptions-saveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editLangOptions:website_temp.languages[window.editLangOptionsCode].code,
            name:website_temp.languages[window.editLangOptionsCode].name,
            flag:website_temp.languages[window.editLangOptionsCode].flag,
            direction:website_temp.languages[window.editLangOptionsCode].direction,
        },success:function(r){
            hideBtnLoading($('#langOptions-langFlag'));
            if(r.editLangOptionsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.languages[window.editLangOptionsCode].code = website_temp.languages[window.editLangOptionsCode].code
                website.languages[window.editLangOptionsCode].name = website_temp.languages[window.editLangOptionsCode].name
                website.languages[window.editLangOptionsCode].flag = website_temp.languages[window.editLangOptionsCode].flag
                website.languages[window.editLangOptionsCode].direction = website_temp.languages[window.editLangOptionsCode].direction
                window.editLangOptionsCode = null;
                setWebsiteLangs();
                popupPageClose(true);
                languages_unsave_check();
            }else if(r.editLangOptionsStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
