homePageInfoNoSaveCheck = function(){

    if(website.info.title_en == null){website.info.title_en = ''}
    if(website.info.title_es == null){website.info.title_es = ''}
    if(website.info.title_fr == null){website.info.title_fr = ''}
    if(website.info.title_de == null){website.info.title_de = ''}
    if(website.info.title_it == null){website.info.title_it = ''}
    if(website.info.title_eg == null){website.info.title_eg = ''}
    if(website.info.title_ar == null){website.info.title_ar = ''}
    if(website.info.title_ru == null){website.info.title_ru = ''}
    if(website.info.title_ua == null){website.info.title_ua = ''}
    if(website.info.des_en == null){website.info.des_en = ''}
    if(website.info.des_es == null){website.info.des_es = ''}
    if(website.info.des_fr == null){website.info.des_fr = ''}
    if(website.info.des_de == null){website.info.des_de = ''}
    if(website.info.des_it == null){website.info.des_it = ''}
    if(website.info.des_eg == null){website.info.des_eg = ''}
    if(website.info.des_ar == null){website.info.des_ar = ''}
    if(website.info.des_ru == null){website.info.des_ru = ''}
    if(website.info.des_ua == null){website.info.des_ua = ''}
    if(
        $('#design-infoImgCard').attr('imgId') == website.info.img &&
        $('#homePageSections-infoTitle-en').val() == website.info.title_en &&
        $('#homePageSections-infoTitle-es').val() == website.info.title_es &&
        $('#homePageSections-infoTitle-fr').val() == website.info.title_fr &&
        $('#homePageSections-infoTitle-de').val() == website.info.title_de &&
        $('#homePageSections-infoTitle-it').val() == website.info.title_it &&
        $('#homePageSections-infoTitle-eg').val() == website.info.title_eg &&
        $('#homePageSections-infoTitle-ar').val() == website.info.title_ar &&
        $('#homePageSections-infoTitle-ru').val() == website.info.title_ru &&
        $('#homePageSections-infoTitle-ua').val() == website.info.title_ua &&

        $('#homePageSections_infoDes_en').val() == website.info.des_en &&
        $('#homePageSections_infoDes_es').val() == website.info.des_es &&
        $('#homePageSections_infoDes_fr').val() == website.info.des_fr &&
        $('#homePageSections_infoDes_de').val() == website.info.des_de &&
        $('#homePageSections_infoDes_it').val() == website.info.des_it &&
        $('#homePageSections_infoDes_eg').val() == website.info.des_eg &&
        $('#homePageSections_infoDes_ar').val() == website.info.des_ar &&
        $('#homePageSections_infoDes_ru').val() == website.info.des_ru &&
        $('#homePageSections_infoDes_ua').val() == website.info.des_ua
    ){
        $('#homePageSections-infoNoSave').addClass('none');
    }else{
        $('#homePageSections-infoNoSave').removeClass('none');
    }
}
$('#design-infoImgCard').on('click',function(){
    showImgBrowser(texts.homePageSections.selectImg,'imgBrowser-infoImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-infoImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#design-infoImgCard').attr('imgId',imgId)
    $('#design-infoImgCard').attr('src',imgUrl)
    homePageInfoNoSaveCheck();
});
$('#homePageSections-infoTitle-en,#homePageSections-infoTitle-es,#homePageSections-infoTitle-fr,#homePageSections-infoTitle-de,#homePageSections-infoTitle-it,#homePageSections-infoTitle-eg,#homePageSections-infoTitle-ar,#homePageSections-infoTitle-ru,#homePageSections-infoTitle-ua').on('change input',function(){
    homePageInfoNoSaveCheck();
})
$('#homePageSections_infoDes_en,#homePageSections_infoDes_es,#homePageSections_infoDes_fr,#homePageSections_infoDes_de,#homePageSections_infoDes_it,#homePageSections_infoDes_eg,#homePageSections_infoDes_ar,#homePageSections_infoDes_ru,#homePageSections_infoDes_ua').on('change input',function(){
    homePageInfoNoSaveCheck();

})


$('#homePageSections-infoCancelBtn').on('click',function(){
    $('#design-infoImgCard').attr('src',website.infoImgUrl)
    $('#design-infoImgCard').attr('imgId',website.info.img)

    $('#homePageSections-infoTitle-en').val(website.info.title_en)
    $('#homePageSections-infoTitle-es').val(website.info.title_es)
    $('#homePageSections-infoTitle-fr').val(website.info.title_fr)
    $('#homePageSections-infoTitle-de').val(website.info.title_de)
    $('#homePageSections-infoTitle-it').val(website.info.title_it)
    $('#homePageSections-infoTitle-eg').val(website.info.title_eg)
    $('#homePageSections-infoTitle-ar').val(website.info.title_ar)
    $('#homePageSections-infoTitle-ru').val(website.info.title_ru)
    $('#homePageSections-infoTitle-ua').val(website.info.title_ua)

    $('#homePageSections_infoDes_en').val(website.info.des_en)
    $('#homePageSections_infoDes_es').val(website.info.des_es)
    $('#homePageSections_infoDes_fr').val(website.info.des_fr)
    $('#homePageSections_infoDes_de').val(website.info.des_de)
    $('#homePageSections_infoDes_it').val(website.info.des_it)
    $('#homePageSections_infoDes_eg').val(website.info.des_eg)
    $('#homePageSections_infoDes_ar').val(website.info.des_ar)
    $('#homePageSections_infoDes_ru').val(website.info.des_ru)
    $('#homePageSections_infoDes_ua').val(website.info.des_ua)
    homePageInfoNoSaveCheck();

})
$('#homePageSections-infoCancelBtn').trigger('click');

$('#homePageSections-infoSaveBtn').on('click',function(){
    showBtnLoading($('#homePageSections-infoSaveBtn'))
    let homePageInfo = {
        'img':$('#design-infoImgCard').attr('imgId'),
        'title_en':$('#homePageSections-infoTitle-en').val(),
        'title_es':$('#homePageSections-infoTitle-es').val(),
        'title_fr':$('#homePageSections-infoTitle-fr').val(),
        'title_de':$('#homePageSections-infoTitle-de').val(),
        'title_it':$('#homePageSections-infoTitle-it').val(),
        'title_eg':$('#homePageSections-infoTitle-eg').val(),
        'title_ar':$('#homePageSections-infoTitle-ar').val(),
        'title_ru':$('#homePageSections-infoTitle-ru').val(),
        'title_ua':$('#homePageSections-infoTitle-ua').val(),
        'des_en':$('#homePageSections_infoDes_en').val(),
        'des_es':$('#homePageSections_infoDes_es').val(),
        'des_fr':$('#homePageSections_infoDes_fr').val(),
        'des_de':$('#homePageSections_infoDes_de').val(),
        'des_it':$('#homePageSections_infoDes_it').val(),
        'des_eg':$('#homePageSections_infoDes_eg').val(),
        'des_ar':$('#homePageSections_infoDes_ar').val(),
        'des_ru':$('#homePageSections_infoDes_ru').val(),
        'des_ua':$('#homePageSections_infoDes_ua').val(),
    };
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveComponent:'info',
            infoImg:homePageInfo.img,
            title_en:homePageInfo.title_en,
            title_es:homePageInfo.title_es,
            title_fr:homePageInfo.title_fr,
            title_de:homePageInfo.title_de,
            title_it:homePageInfo.title_it,
            title_eg:homePageInfo.title_eg,
            title_ar:homePageInfo.title_ar,
            title_ru:homePageInfo.title_ru,
            title_ua:homePageInfo.title_ua,
            des_en:homePageInfo.des_en,
            des_es:homePageInfo.des_es,
            des_fr:homePageInfo.des_fr,
            des_de:homePageInfo.des_de,
            des_it:homePageInfo.des_it,
            des_eg:homePageInfo.des_eg,
            des_ar:homePageInfo.des_ar,
            des_ru:homePageInfo.des_ru,
            des_ua:homePageInfo.des_ua,
        },success:function(response){
            hideBtnLoading($('#homePageSections-infoSaveBtn'))
            if(response.saveComponentStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.infoImgUrl = `/storage/imgs/templates/${website.template}/info.webp`
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == website.info.img){
                        website.imgs_infoImg = imgs[k];
                        website.infoImgUrl = `/storage/${imgs[k].url}`
                    }
                })
                website.info = homePageInfo;
                homePageInfoNoSaveCheck();
                popupPageClose(true);
                window.guideHints.homePageInfo();
            }else if(response.saveComponentStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
