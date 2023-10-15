homePageIntroNoSaveCheck = function(){
    if(website.intro.title_en == null){website.intro.title_en = ''}
    if(website.intro.title_es == null){website.intro.title_es = ''}
    if(website.intro.title_fr == null){website.intro.title_fr = ''}
    if(website.intro.title_de == null){website.intro.title_de = ''}
    if(website.intro.title_it == null){website.intro.title_it = ''}
    if(website.intro.title_eg == null){website.intro.title_eg = ''}
    if(website.intro.title_ar == null){website.intro.title_ar = ''}
    if(website.intro.title_ru == null){website.intro.title_ru = ''}
    if(website.intro.title_ua == null){website.intro.title_ua = ''}
    if(website.intro.des_en == null){website.intro.des_en = ''}
    if(website.intro.des_es == null){website.intro.des_es = ''}
    if(website.intro.des_fr == null){website.intro.des_fr = ''}
    if(website.intro.des_de == null){website.intro.des_de = ''}
    if(website.intro.des_it == null){website.intro.des_it = ''}
    if(website.intro.des_eg == null){website.intro.des_eg = ''}
    if(website.intro.des_ar == null){website.intro.des_ar = ''}
    if(website.intro.des_ru == null){website.intro.des_ru = ''}
    if(website.intro.des_ua == null){website.intro.des_ua = ''}
    if(
        $('#design-introImgCard').attr('imgId') == website.intro.img &&
        $('#homePageSections-introTitle-en').val() == website.intro.title_en &&
        $('#homePageSections-introTitle-es').val() == website.intro.title_es &&
        $('#homePageSections-introTitle-fr').val() == website.intro.title_fr &&
        $('#homePageSections-introTitle-de').val() == website.intro.title_de &&
        $('#homePageSections-introTitle-it').val() == website.intro.title_it &&
        $('#homePageSections-introTitle-eg').val() == website.intro.title_eg &&
        $('#homePageSections-introTitle-ar').val() == website.intro.title_ar &&
        $('#homePageSections-introTitle-ru').val() == website.intro.title_ru &&
        $('#homePageSections-introTitle-ua').val() == website.intro.title_ua &&
        $('#homePageSections_introDes_en').val() == website.intro.des_en &&
        $('#homePageSections_introDes_es').val() == website.intro.des_es &&
        $('#homePageSections_introDes_fr').val() == website.intro.des_fr &&
        $('#homePageSections_introDes_de').val() == website.intro.des_de &&
        $('#homePageSections_introDes_it').val() == website.intro.des_it &&
        $('#homePageSections_introDes_eg').val() == website.intro.des_eg &&
        $('#homePageSections_introDes_ar').val() == website.intro.des_ar &&
        $('#homePageSections_introDes_ru').val() == website.intro.des_ru &&
        $('#homePageSections_introDes_ua').val() == website.intro.des_ua
    ){
        $('#homePageSections-introNoSave').addClass('none');
    }else{
        $('#homePageSections-introNoSave').removeClass('none');
    }
}
$('#design-introImgCard').on('click',function(){
    showImgBrowser(texts.homePageSections.selectImg,'imgBrowser-introImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-introImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#design-introImgCard').attr('imgId',imgId)
    $('#design-introImgCard').attr('src',imgUrl)
    homePageIntroNoSaveCheck();
});
$('#homePageSections-introTitle-en,#homePageSections-introTitle-es,#homePageSections-introTitle-fr,#homePageSections-introTitle-de,#homePageSections-introTitle-it,#homePageSections-introTitle-eg,#homePageSections-introTitle-ar,#homePageSections-introTitle-ru,#homePageSections-introTitle-ua').on('change input',function(){
    homePageIntroNoSaveCheck();
})
$('#homePageSections_introDes_en,#homePageSections_introDes_es,#homePageSections_introDes_fr,#homePageSections_introDes_de,#homePageSections_introDes_it,#homePageSections_introDes_eg,#homePageSections_introDes_ar,#homePageSections_introDes_ru,#homePageSections_introDes_ua').on('change input',function(){
    homePageIntroNoSaveCheck();

})


$('#homePageSections-introCancelBtn').on('click',function(){
    $('#design-introImgCard').attr('src',website.introImgUrl)
    $('#design-introImgCard').attr('imgId',website.intro.img)

    $('#homePageSections-introTitle-en').val(website.intro.title_en)
    $('#homePageSections-introTitle-es').val(website.intro.title_es)
    $('#homePageSections-introTitle-fr').val(website.intro.title_fr)
    $('#homePageSections-introTitle-de').val(website.intro.title_de)
    $('#homePageSections-introTitle-it').val(website.intro.title_it)
    $('#homePageSections-introTitle-eg').val(website.intro.title_eg)
    $('#homePageSections-introTitle-ar').val(website.intro.title_ar)
    $('#homePageSections-introTitle-ru').val(website.intro.title_ru)
    $('#homePageSections-introTitle-ua').val(website.intro.title_ua)

    $('#homePageSections_introDes_en').val(website.intro.des_en)
    $('#homePageSections_introDes_es').val(website.intro.des_es)
    $('#homePageSections_introDes_fr').val(website.intro.des_fr)
    $('#homePageSections_introDes_de').val(website.intro.des_de)
    $('#homePageSections_introDes_it').val(website.intro.des_it)
    $('#homePageSections_introDes_eg').val(website.intro.des_eg)
    $('#homePageSections_introDes_ar').val(website.intro.des_ar)
    $('#homePageSections_introDes_ru').val(website.intro.des_ru)
    $('#homePageSections_introDes_ua').val(website.intro.des_ua)
    homePageIntroNoSaveCheck();

})
$('#homePageSections-introCancelBtn').trigger('click');

$('#homePageSections-introSaveBtn').on('click',function(){
    showBtnLoading($('#homePageSections-introSaveBtn'))
    let homePageIntro = {
        'img':$('#design-introImgCard').attr('imgId'),
        'title_en':$('#homePageSections-introTitle-en').val(),
        'title_es':$('#homePageSections-introTitle-es').val(),
        'title_fr':$('#homePageSections-introTitle-fr').val(),
        'title_de':$('#homePageSections-introTitle-de').val(),
        'title_it':$('#homePageSections-introTitle-it').val(),
        'title_eg':$('#homePageSections-introTitle-eg').val(),
        'title_ar':$('#homePageSections-introTitle-ar').val(),
        'title_ru':$('#homePageSections-introTitle-ru').val(),
        'title_ua':$('#homePageSections-introTitle-ua').val(),
        'des_en':$('#homePageSections_introDes_en').val(),
        'des_es':$('#homePageSections_introDes_es').val(),
        'des_fr':$('#homePageSections_introDes_fr').val(),
        'des_de':$('#homePageSections_introDes_de').val(),
        'des_it':$('#homePageSections_introDes_it').val(),
        'des_eg':$('#homePageSections_introDes_eg').val(),
        'des_ar':$('#homePageSections_introDes_ar').val(),
        'des_ru':$('#homePageSections_introDes_ru').val(),
        'des_ua':$('#homePageSections_introDes_ua').val(),
    };
    // let introImgId;
    // if($('#design-introImgCard').attr('imgId')== '' || $('#design-introImgCard').attr('imgId') == null){
    //     introImgId = null;
    // }else{
        // introImgId  = $('#design-introImgCard').attr('imgId');
    // }
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveComponent:'intro',
            introImg:homePageIntro.img,
            title_en:homePageIntro.title_en,
            title_es:homePageIntro.title_es,
            title_fr:homePageIntro.title_fr,
            title_de:homePageIntro.title_de,
            title_it:homePageIntro.title_it,
            title_eg:homePageIntro.title_eg,
            title_ar:homePageIntro.title_ar,
            title_ru:homePageIntro.title_ru,
            title_ua:homePageIntro.title_ua,
            des_en:homePageIntro.des_en,
            des_es:homePageIntro.des_es,
            des_fr:homePageIntro.des_fr,
            des_de:homePageIntro.des_de,
            des_it:homePageIntro.des_it,
            des_eg:homePageIntro.des_eg,
            des_ar:homePageIntro.des_ar,
            des_ru:homePageIntro.des_ru,
            des_ua:homePageIntro.des_ua,
        },success:function(response){
            hideBtnLoading($('#homePageSections-introSaveBtn'))
            if(response.saveComponentStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.introImgUrl = `/storage/imgs/templates/${website.template}/intro.webp`
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == website.intro.img){
                        website.imgs_introImg = imgs[k];
                        website.introImgUrl = `/storage/${imgs[k].url}`
                    }
                })
                website.intro = homePageIntro;
                homePageIntroNoSaveCheck();
                popupPageClose(true);
                window.guideHints.homePageIntro();
            }else if(response.saveComponentStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
