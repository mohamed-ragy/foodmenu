

//
$('body').on('click','#langOptions-langFlag-list .inputListElement',function(){
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
$('body').on('keyup','#langOptions-langFlag',function(e){
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
$('body').on('change input','#langOptions-langName',function(e){
    website_temp.languages[window.editLangOptionsCode].name = $(this).val()
    languages_unsave_check();
})


$('body').on('click','#langOptions-cancelBtn',function(e){
    website_temp.languages = JSON.parse(JSON.stringify(website.languages));
    popupPageClose(true);
    languages_unsave_check();
})

$('body').on('click','#langOptions-saveBtn',function(e){
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
        },success:function(r){
            hideBtnLoading($('#langOptions-langFlag'));
            if(r.editLangOptionsStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.languages[window.editLangOptionsCode].code = website_temp.languages[window.editLangOptionsCode].code
                website.languages[window.editLangOptionsCode].name = website_temp.languages[window.editLangOptionsCode].name
                website.languages[window.editLangOptionsCode].flag = website_temp.languages[window.editLangOptionsCode].flag
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
