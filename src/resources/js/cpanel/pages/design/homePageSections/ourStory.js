homePageOurStoryNoSaveCheck = function(){
    if(website.ourStory.title_en == null){website.ourStory.title_en = ''}
    if(website.ourStory.title_es == null){website.ourStory.title_es = ''}
    if(website.ourStory.title_fr == null){website.ourStory.title_fr = ''}
    if(website.ourStory.title_de == null){website.ourStory.title_de = ''}
    if(website.ourStory.title_it == null){website.ourStory.title_it = ''}
    if(website.ourStory.title_eg == null){website.ourStory.title_eg = ''}
    if(website.ourStory.title_ar == null){website.ourStory.title_ar = ''}
    if(website.ourStory.title_ru == null){website.ourStory.title_ru = ''}
    if(website.ourStory.title_ua == null){website.ourStory.title_ua = ''}
    if(website.ourStory.des_en == null){website.ourStory.des_en = ''}
    if(website.ourStory.des_es == null){website.ourStory.des_es = ''}
    if(website.ourStory.des_fr == null){website.ourStory.des_fr = ''}
    if(website.ourStory.des_de == null){website.ourStory.des_de = ''}
    if(website.ourStory.des_it == null){website.ourStory.des_it = ''}
    if(website.ourStory.des_eg == null){website.ourStory.des_eg = ''}
    if(website.ourStory.des_ar == null){website.ourStory.des_ar = ''}
    if(website.ourStory.des_ru == null){website.ourStory.des_ru = ''}
    if(website.ourStory.des_ua == null){website.ourStory.des_ua = ''}
    if(
        $('#design-ourStoryImgCard').attr('imgId') == website.ourStory.img &&
        $('#homePageSections-ourStoryTitle-en').val() == website.ourStory.title_en &&
        $('#homePageSections-ourStoryTitle-es').val() == website.ourStory.title_es &&
        $('#homePageSections-ourStoryTitle-fr').val() == website.ourStory.title_fr &&
        $('#homePageSections-ourStoryTitle-de').val() == website.ourStory.title_de &&
        $('#homePageSections-ourStoryTitle-it').val() == website.ourStory.title_it &&
        $('#homePageSections-ourStoryTitle-eg').val() == website.ourStory.title_eg &&
        $('#homePageSections-ourStoryTitle-ar').val() == website.ourStory.title_ar &&
        $('#homePageSections-ourStoryTitle-ru').val() == website.ourStory.title_ru &&
        $('#homePageSections-ourStoryTitle-ua').val() == website.ourStory.title_ua &&

        $('#homePageSections_ourStoryDes_en').val() == website.ourStory.des_en &&
        $('#homePageSections_ourStoryDes_es').val() == website.ourStory.des_es &&
        $('#homePageSections_ourStoryDes_fr').val() == website.ourStory.des_fr &&
        $('#homePageSections_ourStoryDes_de').val() == website.ourStory.des_de &&
        $('#homePageSections_ourStoryDes_it').val() == website.ourStory.des_it &&
        $('#homePageSections_ourStoryDes_eg').val() == website.ourStory.des_eg &&
        $('#homePageSections_ourStoryDes_ar').val() == website.ourStory.des_ar &&
        $('#homePageSections_ourStoryDes_ru').val() == website.ourStory.des_ru &&
        $('#homePageSections_ourStoryDes_ua').val() == website.ourStory.des_ua
    ){
        $('#homePageSections-ourStoryNoSave').addClass('none');
    }else{
        $('#homePageSections-ourStoryNoSave').removeClass('none');
    }
}
$('#design-ourStoryImgCard').on('click',function(){
    showImgBrowser(texts.homePageSections.selectImg,'imgBrowser-ourStoryImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-ourStoryImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#design-ourStoryImgCard').attr('imgId',imgId)
    $('#design-ourStoryImgCard').attr('src',imgUrl)
    homePageOurStoryNoSaveCheck();
});
$('#homePageSections-ourStoryTitle-en,#homePageSections-ourStoryTitle-es,#homePageSections-ourStoryTitle-fr,#homePageSections-ourStoryTitle-de,#homePageSections-ourStoryTitle-it,#homePageSections-ourStoryTitle-eg,#homePageSections-ourStoryTitle-ar,#homePageSections-ourStoryTitle-ru,#homePageSections-ourStoryTitle-ua').on('change input',function(){
    homePageOurStoryNoSaveCheck();
})
$('#homePageSections_ourStoryDes_en,#homePageSections_ourStoryDes_es,#homePageSections_ourStoryDes_fr,#homePageSections_ourStoryDes_de,#homePageSections_ourStoryDes_it,#homePageSections_ourStoryDes_eg,#homePageSections_ourStoryDes_ar,#homePageSections_ourStoryDes_ru,#homePageSections_ourStoryDes_ua').on('change input',function(){
    homePageOurStoryNoSaveCheck();

})


$('#homePageSections-ourStoryCancelBtn').on('click',function(){
    $('#design-ourStoryImgCard').attr('src',website.ourStoryImgUrl)
    $('#design-ourStoryImgCard').attr('imgId',website.ourStory.img)

    $('#homePageSections-ourStoryTitle-en').val(website.ourStory.title_en)
    $('#homePageSections-ourStoryTitle-es').val(website.ourStory.title_es)
    $('#homePageSections-ourStoryTitle-fr').val(website.ourStory.title_fr)
    $('#homePageSections-ourStoryTitle-de').val(website.ourStory.title_de)
    $('#homePageSections-ourStoryTitle-it').val(website.ourStory.title_it)
    $('#homePageSections-ourStoryTitle-eg').val(website.ourStory.title_eg)
    $('#homePageSections-ourStoryTitle-ar').val(website.ourStory.title_ar)
    $('#homePageSections-ourStoryTitle-ru').val(website.ourStory.title_ru)
    $('#homePageSections-ourStoryTitle-ua').val(website.ourStory.title_ua)

    $('#homePageSections_ourStoryDes_en').val(website.ourStory.des_en)
    $('#homePageSections_ourStoryDes_es').val(website.ourStory.des_es)
    $('#homePageSections_ourStoryDes_fr').val(website.ourStory.des_fr)
    $('#homePageSections_ourStoryDes_de').val(website.ourStory.des_de)
    $('#homePageSections_ourStoryDes_it').val(website.ourStory.des_it)
    $('#homePageSections_ourStoryDes_eg').val(website.ourStory.des_eg)
    $('#homePageSections_ourStoryDes_ar').val(website.ourStory.des_ar)
    $('#homePageSections_ourStoryDes_ru').val(website.ourStory.des_ru)
    $('#homePageSections_ourStoryDes_ua').val(website.ourStory.des_ua)
    homePageOurStoryNoSaveCheck();

})
$('#homePageSections-ourStoryCancelBtn').trigger('click');

$('#homePageSections-ourStorySaveBtn').on('click',function(){
    showBtnLoading($('#homePageSections-ourStorySaveBtn'))
    let homePageOurStory = {
        'img':$('#design-ourStoryImgCard').attr('imgId'),
        'title_en':$('#homePageSections-ourStoryTitle-en').val(),
        'title_es':$('#homePageSections-ourStoryTitle-es').val(),
        'title_fr':$('#homePageSections-ourStoryTitle-fr').val(),
        'title_de':$('#homePageSections-ourStoryTitle-de').val(),
        'title_it':$('#homePageSections-ourStoryTitle-it').val(),
        'title_eg':$('#homePageSections-ourStoryTitle-eg').val(),
        'title_ar':$('#homePageSections-ourStoryTitle-ar').val(),
        'title_ru':$('#homePageSections-ourStoryTitle-ru').val(),
        'title_ua':$('#homePageSections-ourStoryTitle-ua').val(),
        'des_en':$('#homePageSections_ourStoryDes_en').val(),
        'des_es':$('#homePageSections_ourStoryDes_es').val(),
        'des_fr':$('#homePageSections_ourStoryDes_fr').val(),
        'des_de':$('#homePageSections_ourStoryDes_de').val(),
        'des_it':$('#homePageSections_ourStoryDes_it').val(),
        'des_eg':$('#homePageSections_ourStoryDes_eg').val(),
        'des_ar':$('#homePageSections_ourStoryDes_ar').val(),
        'des_ru':$('#homePageSections_ourStoryDes_ru').val(),
        'des_ua':$('#homePageSections_ourStoryDes_ua').val(),
    };
    let ourStoryImgId;
    if($('#design-ourStoryImgCard').attr('imgId')== '' || $('#design-ourStoryImgCard').attr('imgId') == null){
        ourStoryImgId = null;
    }else{
        ourStoryImgId  = $('#design-ourStoryImgCard').attr('imgId');
    }
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveComponent:'ourStory',
            ourStoryImg:homePageOurStory.img,
            title_en:homePageOurStory.title_en,
            title_es:homePageOurStory.title_es,
            title_fr:homePageOurStory.title_fr,
            title_de:homePageOurStory.title_de,
            title_it:homePageOurStory.title_it,
            title_eg:homePageOurStory.title_eg,
            title_ar:homePageOurStory.title_ar,
            title_ru:homePageOurStory.title_ru,
            title_ua:homePageOurStory.title_ua,
            des_en:homePageOurStory.des_en,
            des_es:homePageOurStory.des_es,
            des_fr:homePageOurStory.des_fr,
            des_de:homePageOurStory.des_de,
            des_it:homePageOurStory.des_it,
            des_eg:homePageOurStory.des_eg,
            des_ar:homePageOurStory.des_ar,
            des_ru:homePageOurStory.des_ru,
            des_ua:homePageOurStory.des_ua,
        },success:function(response){
            hideBtnLoading($('#homePageSections-ourStorySaveBtn'))
            if(response.saveComponentStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.ourStoryImgUrl = `/storage/imgs/templates/${website.template}/ourStory.webp`
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == website.ourStory.img){
                        website.imgs_ourStoryImg = imgs[k];
                        website.ourStoryImgUrl = `/storage/${imgs[k].url}`
                    }
                })
                website.ourStory = homePageOurStory;
                homePageOurStoryNoSaveCheck();
                popupPageClose(true);
                window.guideHints.homePageOurStory();
            }else if(response.saveComponentStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
