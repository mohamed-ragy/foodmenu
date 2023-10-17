langsOptionsNoSaveCheck = function(){
    let langsNoSaveCheck = true;
    for(const key in website.languages){
        let lang = website.languages[key];
        for(const key2 in website_temp.languages){
            let lang2 = website_temp.languages[key2];
            if(lang.code == lang2.code){
                if(lang.flag == lang2.flag && lang.name == lang2.name && lang.direction == lang2.direction){
                    $(`.websiteLangsTableRowBtn_settings[lang="${lang.code}"]`).find('.tableRow_unsaved').addClass('none')
                }else{
                    $(`.websiteLangsTableRowBtn_settings[lang="${lang.code}"]`).find('.tableRow_unsaved').removeClass('none')
                    langsNoSaveCheck = false;
                }
            }
        }
    }
    if(langsNoSaveCheck){
        $('.websiteLangsNoSave').addClass('none');
        return true;
    }else{
        $('.websiteLangsNoSave').removeClass('none');
        return false;
    }
}

setWebsiteLangs = function(){
    $('#websiteLanguagesTable').text('').append(
        $(`<colgroup><col span="1" style="width: 1%;"><col span="1" style="width: 100%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"></colgroup>`),
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'tnw',text:texts.settings.flag,class:'none-420'}),
            $('<th/>',{class:'tnw',text:texts.settings.name}),
            $('<th/>',{class:'tnw none-720',text:texts.settings.code}),
            $('<th/>',{class:'tnw none-720',text:texts.settings.textDirection}),
            $('<th/>',{class:'tnw taC',text:texts.settings.default}),
            $('<th/>',{class:'tnw taC',text:texts.settings.receipt}),
            $('<th/>',{class:'tnw taC',}),
        )
    )
    for(const key in website.languages){
        let lang = website.languages[key];
        let defaultClass = 'ico-check0';
        let receiptClass = 'ico-check0';
        lang.websiteDefault ? defaultClass = 'ico-check1' : null;
        lang.receiptDefault ? receiptClass = 'ico-check1' : null;
        $('#websiteLanguagesTable').append(
            $('<tr/>',{class:'websiteLangsTableRow'}).append(
                $('<td/>',{class:'vaM tnw none-420'}).append($('<img/>',{class:'h20 br5 ',src:`./storage/imgs/flags/${lang.flag}.png`})),
                $('<td/>',{class:'vaM fs09 tnw',text:lang.name}),
                $('<td/>',{class:'vaM taC fs09 tnw none-720',text:lang.code}),
                $('<td/>',{class:'vaM fs08 tnw none-720',text:texts.settings[`lang_${lang.direction}`]}),
                $('<td/>',{class:'taC tnw vaM'}).append($('<span/>',{lang:lang.code,class:`setLangDefault ${defaultClass} fs101 pointer`,tooltip:texts.settings.setAsWebsiteDefault,}),$('<div/>',{class:'setLangDefault_loading loading_s none'})),
                $('<td/>',{class:'taC tnw vaM'}).append($('<span/>',{lang:lang.code,class:`setReceiptLang ${receiptClass} fs101 pointer`,tooltip:texts.settings.setAsReceiptLang,}),$('<div/>',{class:'setReceiptLang_loading loading_s none'})),
                $('<td/>',{class:'taC tnw vaM'}).append(
                    $('<div/>',{class:'row alnC jstfyC'}).append(
                        $('<button/>',{lang:lang.code,class:'btn_table websiteLangsTableRowBtn_settings ico-settings popupPage',popupPage:'edit_language_options',tooltip:texts.settings.EditLangOptions}).append($('<span/>',{class:'tableRow_unsaved none'})),
                        $('<button/>',{lang:lang.code,class:'btn_table websiteLangsTableRowBtn_edit ico-edit popupPage',popupPage:'edit_language_texts',tooltip:texts.settings.EditLangText}).append($('<span/>',{class:'tableRow_unsaved none'})),
                        $('<button/>',{lang:lang.code,class:'btn_table deleteLang ico-delete',tooltip:texts.settings.removeLanguage}),
                    )
                ),
            )
        )
    }
    languages_unsave_check();
}

$('html,body').on('click','.setLangDefault',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('ico-check1')){return;}
    if(!coolDownChecker()){return;}
    let lang = $(this).attr('lang');
    $('.setLangDefault').addClass('none');
    $('.setLangDefault_loading').addClass('vV').removeClass('none');
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token: $('meta[name="csrf-token"]').attr("content"),
            setLangDefault:lang,
        },success:function(r){
            $('.setLangDefault').removeClass('none');
            $('.setLangDefault_loading').removeClass('vV').addClass('none');
            if(r.setLangDefaultStats == 1){
                showAlert('success',r.msg,4000,true);
                for(const key in website.languages){
                    website.languages[key].websiteDefault = 0;
                    lang == website.languages[key].code ? website.languages[key].websiteDefault = 1 : null ;
                }
                for(const key in website_temp.languages){
                    website_temp.languages[key].websiteDefault = 0;
                    lang == website_temp.languages[key].code ? website_temp.languages[key].websiteDefault = 1 : null ;
                }
                setWebsiteLangs();
                closePopup();
            }
            else if(r.setLangDefaultStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
$('html,body').on('click','.setReceiptLang',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('ico-check1')){return;}
    if(!coolDownChecker()){return;}
    let lang = $(this).attr('lang');
    $('.setReceiptLang').addClass('none');
    $('.setReceiptLang_loading').addClass('vV').removeClass('none');
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token: $('meta[name="csrf-token"]').attr("content"),
            setReceiptLang:lang,
        },success:function(r){
            $('.setReceiptLang').removeClass('none');
            $('.setReceiptLang_loading').removeClass('vV').addClass('none');
            if(r.setReceiptLangStats == 1){
                showAlert('success',r.msg,4000,true);
                for(const key in website.languages){
                    website.languages[key].receiptDefault = 0;
                    lang == website.languages[key].code ? website.languages[key].receiptDefault = 1 : null ;
                }
                for(const key in website_temp.languages){
                    website_temp.languages[key].receiptDefault = 0;
                    lang == website_temp.languages[key].code ? website_temp.languages[key].receiptDefault = 1 : null ;
                }
                setWebsiteLangs();
                closePopup();
            }
            else if(r.setReceiptLangStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
});
$('html,body').on('click','.deleteLang',function(e){
    e.stopImmediatePropagation();
    let lang = null;
    for(const key in website.languages){
        if($(this).attr('lang') == website.languages[key].code){
            lang = website.languages[key]
        }
    }
    if(lang.websiteDefault == true){
        showAlert('error',texts.settings.websiteLangErrorUnselectDefault,4000,true);
        return;
    }
    if(lang.receiptDefault == true){
        showAlert('error',texts.settings.websiteLangErrorUnselectReceipt,4000,true);
        return;
    }
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.settings.deleteLangConfirmBtn.replace(':lang:',lang.name)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteLang-confirmBtn',lang:lang.code,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#deleteLang-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let lang = $(this).attr('lang');
    showBtnLoading($('#deleteLang-confirmBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token: $('meta[name="csrf-token"]').attr("content"),
            deleteLang:lang,
        },success:function(r){
            hideBtnLoading($('#deleteLang-confirmBtn'));
            if(r.deleteLangStats == 1){
                showAlert('success',r.msg,4000,true);
                delete website.languages[lang]
                delete website_temp.languages[lang]
                setWebsiteLangs();
                closePopup();
            }
            else if(r.deleteLangStats == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
$('html,body').on('click','#langs-addNewLang',function(e){
    e.stopImmediatePropagation();
    showPopup('addNewLang',function(){
        $('.addNewLangList').append(
            $('<div/>',{class:' mB10 pX10 w100p-20 row alnC jstfyE'}).append(
                $('<div/>',{class:'popupPage pointer c_white-8 mT10',popupPage:'create_custom_language'}).append(
                    $('<span/>',{class:'ico-plus fs08 mie-5'}),
                    $('<span/>',{text:texts.settings.createCustomLang,class:'fs09'})
                )

            )
        );
        for(const key in foodMenuData.langs){
            let btnActive = false;
            lang = foodMenuData.langs[key];
            for(const key2 in website.languages){
                if(website.languages[key2].code == lang.code){
                    btnActive = true;
                }
            }
            $('.addNewLangList').append(
                $('<div/>',{class:'addNewLangElem'}).append(
                    $('<div/>',{class:'row alnC jstfyS grow2'}).append(
                        $('<img/>',{class:'h20 br5 mie-5',src:`./storage/imgs/flags/${lang.flag}.png`}),
                        $('<span/>',{text:`${lang.name} (${lang.code})`,class:'fs09'})
                    ),
                    $('<button/>',{disabled:btnActive,lang:lang.code,class:'addNewLangBtn fs08 btn btn_s'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.settings.install})
                    )
                )
            )
        }

    })
})
$('html,body').on('click','.addNewLangBtn',function(e){
    e.stopImmediatePropagation();
    if(Object.keys(website.languages).length >= plans[website.plan].websiteLangs){
        showAlert('warning',texts.settings.planLangLimitError,15000,true);
        return;
    }
    if(!coolDownChecker()){return;}
    showBtnLoading($('.addNewLangBtn'))
    let lang = null;
    for(const key in foodMenuData.langs){
        if(foodMenuData.langs[key].code == $(this).attr('lang')){
            lang = foodMenuData.langs[key];
        }
    }
    if(lang != null){
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token: $('meta[name="csrf-token"]').attr("content"),
                addLang:lang.code,
            },success:function(r){
                hideBtnLoading($('.addNewLangBtn'))
                if(r.addLangStats == 1){
                    showAlert('success',r.msg,4000,true);
                    website.languages[r.lang.code] = JSON.parse(JSON.stringify(r.lang));
                    website_temp.languages[r.lang.code] = JSON.parse(JSON.stringify(r.lang));
                    setWebsiteLangs();
                    closePopup();
                }
                else if(r.addLangStats == 0){
                    showAlert('error',r.msg,4000,true);
                }
            }
        })
    }

})
