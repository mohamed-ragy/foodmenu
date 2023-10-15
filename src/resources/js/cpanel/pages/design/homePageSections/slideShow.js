slideShowNoSaveCheck = function(){
    if(
        website.slideShow.interval == $('#homePageSections-slideShowInterval').text() &&
        JSON.stringify(website.slideShow.content) == JSON.stringify(website.slideShow_contentTemp)

        ){
        $('#homePageSections-slideShowNoSave').addClass('none');
    }else{
        $('#homePageSections-slideShowNoSave').removeClass('none');
    }
}
$('#homePageSections-slideShowInterval').text(website.slideShow.interval);
$('#homePageSections-slideShowIntervalD').on('click',function(){
    if(parseInt($('#homePageSections-slideShowInterval').text()) == 5){return}else{
        $('#homePageSections-slideShowInterval').text(parseInt($('#homePageSections-slideShowInterval').text()) - 1)
        slideShowNoSaveCheck();
    }
});
$('#homePageSections-slideShowIntervalU').on('click',function(){
    $('#homePageSections-slideShowInterval').text(parseInt($('#homePageSections-slideShowInterval').text()) + 1)
    slideShowNoSaveCheck();
});
///////
$('#homePageSections-slideShowAddNewImgBtn').on('click',function(){
    showPopup($('#slideShowImgAdd-popup'))
})
$('#homePageSections-slideShowImgCard').on('click',function(){
    showImgBrowser(texts.homePageSections.selectImg,'imgBrowser-slideShowImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-slideShowImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#homePageSections-slideShowImgCard').attr('imgId',imgId)
    $('#homePageSections-slideShowImgCard').attr('src',imgUrl)
    slideShowNoSaveCheck();
    showPopup($('#slideShowImgAdd-popup'))
});
$('#homePageSections-slideShowProductsList').on('click','.inputListElement',function(e){
    let imgUrl = 'imgs/cpanel/noimg.png';
    for(const key in products){
        const product = products[key];
        if(product.id == $(this).attr('key')){
            let productCatName = '';
            if(product.category_id != null){
                productCatName = categories.find(item=> item.id == product.category_id).name
            }
            $('#homePageSections-slideShowImgCard').attr('src',product.imgUrl);
            $('#homePageSections-slideShowImgCard').attr('imgId',product.img_id);
            $('#homePageSections-slideShowImgTitle-en').val(product.name_en ?? '')
            $('#homePageSections-slideShowImgTitle-fr').val(product.name_fr ?? '')
            $('#homePageSections-slideShowImgTitle-de').val(product.name_de ?? '')
            $('#homePageSections-slideShowImgTitle-it').val(product.name_it ?? '')
            $('#homePageSections-slideShowImgTitle-es').val(product.name_es ?? '')
            $('#homePageSections-slideShowImgTitle-ar').val(product.name_ar ?? '')
            $('#homePageSections-slideShowImgTitle-ru').val(product.name_ru ?? '')
            $('#homePageSections-slideShowImgTitle-ua').val(product.name_ua ?? '')
            $('#homePageSections-slideShowImgTitle-eg').val(product.name_eg ?? '')

            $('#homePageSections_slideShowImgDes_en').val(product.description_en ?? '')
            $('#homePageSections_slideShowImgDes_fr').val(product.description_fr ?? '')
            $('#homePageSections_slideShowImgDes_de').val(product.description_de ?? '')
            $('#homePageSections_slideShowImgDes_it').val(product.description_it ?? '')
            $('#homePageSections_slideShowImgDes_es').val(product.description_es ?? '')
            $('#homePageSections_slideShowImgDes_ar').val(product.description_ar ?? '')
            $('#homePageSections_slideShowImgDes_ru').val(product.description_ru ?? '')
            $('#homePageSections_slideShowImgDes_ua').val(product.description_ua ?? '')
            $('#homePageSections_slideShowImgDes_eg').val(product.description_eg ?? '')
            if(product.category_id == null){
                $('#homePageSections-slideShowImgLink-en').val(``)
                $('#homePageSections-slideShowImgLink-fr').val(``)
                $('#homePageSections-slideShowImgLink-de').val(``)
                $('#homePageSections-slideShowImgLink-it').val(``)
                $('#homePageSections-slideShowImgLink-es').val(``)
                $('#homePageSections-slideShowImgLink-ar').val(``)
                $('#homePageSections-slideShowImgLink-ru').val(``)
                $('#homePageSections-slideShowImgLink-ua').val(``)
                $('#homePageSections-slideShowImgLink-eg').val(``)
            }else{
                $('#homePageSections-slideShowImgLink-en').val(`https://${website.url}/en/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-fr').val(`https://${website.url}/fr/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-de').val(`https://${website.url}/de/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-it').val(`https://${website.url}/it/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-es').val(`https://${website.url}/es/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-ar').val(`https://${website.url}/ar/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-ru').val(`https://${website.url}/ru/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-ua').val(`https://${website.url}/ua/${productCatName}/${product.name}`)
                $('#homePageSections-slideShowImgLink-eg').val(`https://${website.url}/${website.customLang_code}/${productCatName}/${product.name}`)
            }
        }
    }
})
///////////
$('#homePageSections-slideShowImgAddBtn').on('click',function(){

    if($('#homePageSections-slideShowImgCard').attr('imgId') == null){
        showAlert('error',texts.homePageSections.slideShowNoImg,4000,true);
        $('#homePageSections-slideShowImgCard').trigger('click');
        return;
    }
    website.slideShow_contentTemp.push({
        imgId:$('#homePageSections-slideShowImgCard').attr('imgId'),
        linkNewTab:$('#homePageSections-slideShowImgLink-openNewTab').prop('checked') ? 1 : 0,
        title_en:$('#homePageSections-slideShowImgTitle-en').val(),
        link_en:$('#homePageSections-slideShowImgLink-en').val(),
        title_fr:$('#homePageSections-slideShowImgTitle-fr').val(),
        link_fr:$('#homePageSections-slideShowImgLink-fr').val(),
        title_de:$('#homePageSections-slideShowImgTitle-de').val(),
        link_de:$('#homePageSections-slideShowImgLink-de').val(),
        title_it:$('#homePageSections-slideShowImgTitle-it').val(),
        link_it:$('#homePageSections-slideShowImgLink-it').val(),
        title_es:$('#homePageSections-slideShowImgTitle-es').val(),
        link_es:$('#homePageSections-slideShowImgLink-es').val(),
        title_ar:$('#homePageSections-slideShowImgTitle-ar').val(),
        link_ar:$('#homePageSections-slideShowImgLink-ar').val(),
        title_eg:$('#homePageSections-slideShowImgTitle-eg').val(),
        link_eg:$('#homePageSections-slideShowImgLink-eg').val(),
        title_ru:$('#homePageSections-slideShowImgTitle-ru').val(),
        link_ru:$('#homePageSections-slideShowImgLink-ru').val(),
        title_ua:$('#homePageSections-slideShowImgTitle-ua').val(),
        link_ua:$('#homePageSections-slideShowImgLink-ua').val(),

        des_en:$('#homePageSections_slideShowImgDes_en').val(),
        des_fr:$('#homePageSections_slideShowImgDes_fr').val(),
        des_de:$('#homePageSections_slideShowImgDes_de').val(),
        des_it:$('#homePageSections_slideShowImgDes_it').val(),
        des_es:$('#homePageSections_slideShowImgDes_es').val(),
        des_ar:$('#homePageSections_slideShowImgDes_ar').val(),
        des_eg:$('#homePageSections_slideShowImgDes_eg').val(),
        des_ru:$('#homePageSections_slideShowImgDes_ru').val(),
        des_ua:$('#homePageSections_slideShowImgDes_ua').val(),
    });

    $('#homePageSections-slideShowProducts').val('');
    $('#homePageSections-slideShowProducts').attr('key',null)

    $('#homePageSections-slideShowImgCardId').val('')
    $('#homePageSections-slideShowImgTitle-en').val('')
    $('#homePageSections-slideShowImgLink-en').val('')
    $('#homePageSections-slideShowImgTitle-fr').val('')
    $('#homePageSections-slideShowImgLink-fr').val('')
    $('#homePageSections-slideShowImgTitle-de').val('')
    $('#homePageSections-slideShowImgLink-de').val('')
    $('#homePageSections-slideShowImgTitle-it').val('')
    $('#homePageSections-slideShowImgLink-it').val('')
    $('#homePageSections-slideShowImgTitle-es').val('')
    $('#homePageSections-slideShowImgLink-es').val('')
    $('#homePageSections-slideShowImgTitle-ar').val('')
    $('#homePageSections-slideShowImgLink-ar').val('')
    $('#homePageSections-slideShowImgTitle-eg').val('')
    $('#homePageSections-slideShowImgLink-eg').val('')
    $('#homePageSections-slideShowImgTitle-ru').val('')
    $('#homePageSections-slideShowImgLink-ru').val('')
    $('#homePageSections-slideShowImgTitle-ua').val('')
    $('#homePageSections-slideShowImgLink-ua').val('')

    $('#homePageSections_slideShowImgDes_en').val('')
    $('#homePageSections_slideShowImgDes_fr').val('')
    $('#homePageSections_slideShowImgDes_de').val('')
    $('#homePageSections_slideShowImgDes_it').val('')
    $('#homePageSections_slideShowImgDes_es').val('')
    $('#homePageSections_slideShowImgDes_ar').val('')
    $('#homePageSections_slideShowImgDes_eg').val('')
    $('#homePageSections_slideShowImgDes_ru').val('')
    $('#homePageSections_slideShowImgDes_ua').val('')

    $('#homePageSections-slideShowImgCard').attr('src','/storage/imgs/cpanel/noimg.png');
    $('#homePageSections-slideShowImgCard').attr('imgId',null);
    $('#homePageSections-slideShowImgLink-openNewTab').prop('checked',false)

    drawSlideShowImgs();
    slideShowNoSaveCheck();
    closePopup();
    scrollToDiv($('#popupPageBody'),$('#homePageSections-slideShowimgsContainer'))
})
////////////
drawSlideShowImgs = function(){
    $('#homePageSections-slideShowimgsContainer').text('');
    if(website.slideShow_contentTemp.length == 0){
        $('#homePageSections-slideShowimgsContainer').append(
            $('<div/>',{class:'m10',text:texts.homePageSections.slideShowNoContent})
        );
    }else{
        for(const key in website.slideShow_contentTemp){
            let slideShowImg = website.slideShow_contentTemp[key];
            let imgUrl = './storage/imgs/cpanel/noimg.png';
            try{
                imgUrl = `./storage/${imgs.find(item=> item.id == slideShowImg.imgId).url}`;
            }catch{

            }
            $('#homePageSections-slideShowimgsContainer').append(
                $('<div/>',{
                    class:'slideShowSelectedImgContainer',
                    slideShowImgKey:key,
                }).append(
                    $('<div/>',{
                        class:'slideShowSelectedImgHead',
                    }).append(
                        $('<span/>',{tooltip:texts.cpanel.public.swap,class:'ico-move slideShowSelectedImgMove m5 fs103'}),
                        $('<div/>',{}).append(
                            $('<span/>',{tooltip:texts.cpanel.public.edit,class:'ico-edit slideShowImgEdit m5 fs103 pointer'}),
                            $('<span/>',{tooltip:texts.cpanel.public.remove,class:'ico-close pointer deleteSlideShowImg m5 fs102'}),
                        ),
                    ),
                    $('<img/>',{src:imgUrl,class:'w100p h100p ofCover'})
                )
            )
        }
    }
}
drawSlideShowImgs();
$('#homePageSections-slideShowimgsContainer').on('click','.slideShowImgEdit',function(){
    let slideShowImg = website.slideShow_contentTemp[$(this).closest('.slideShowSelectedImgContainer').attr('slideShowImgKey')]
    let imgUrl = './storage/imgs/cpanel/noimg.png';
    try{
        imgUrl = `./storage/${imgs.find(item=> item.id == slideShowImg.imgId).url}`;
    }catch{}

    $('#homePageSections-EditslideShowImgCard').attr('imgId',slideShowImg.imgId).attr('src',imgUrl)

    $('#homePageSections-EditslideShowImgTitle-en').val(slideShowImg.title_en);
    $('#homePageSections-EditslideShowImgTitle-fr').val(slideShowImg.title_fr);
    $('#homePageSections-EditslideShowImgTitle-de').val(slideShowImg.title_de);
    $('#homePageSections-EditslideShowImgTitle-it').val(slideShowImg.title_it);
    $('#homePageSections-EditslideShowImgTitle-es').val(slideShowImg.title_es);
    $('#homePageSections-EditslideShowImgTitle-ar').val(slideShowImg.title_ar);
    $('#homePageSections-EditslideShowImgTitle-ru').val(slideShowImg.title_ru);
    $('#homePageSections-EditslideShowImgTitle-ua').val(slideShowImg.title_ua);
    $('#homePageSections-EditslideShowImgTitle-eg').val(slideShowImg.title_eg);

    $('#homePageSections_EditslideShowImgDes_en').val(slideShowImg.des_en);
    $('#homePageSections_EditslideShowImgDes_fr').val(slideShowImg.des_fr);
    $('#homePageSections_EditslideShowImgDes_de').val(slideShowImg.des_de);
    $('#homePageSections_EditslideShowImgDes_it').val(slideShowImg.des_it);
    $('#homePageSections_EditslideShowImgDes_es').val(slideShowImg.des_es);
    $('#homePageSections_EditslideShowImgDes_ar').val(slideShowImg.des_ar);
    $('#homePageSections_EditslideShowImgDes_ru').val(slideShowImg.des_ru);
    $('#homePageSections_EditslideShowImgDes_ua').val(slideShowImg.des_ua);
    $('#homePageSections_EditslideShowImgDes_eg').val(slideShowImg.des_eg);

    $('#homePageSections-EditslideShowImgLink-en').val(slideShowImg.link_en);
    $('#homePageSections-EditslideShowImgLink-fr').val(slideShowImg.link_fr);
    $('#homePageSections-EditslideShowImgLink-de').val(slideShowImg.link_de);
    $('#homePageSections-EditslideShowImgLink-it').val(slideShowImg.link_it);
    $('#homePageSections-EditslideShowImgLink-es').val(slideShowImg.link_es);
    $('#homePageSections-EditslideShowImgLink-ar').val(slideShowImg.link_ar);
    $('#homePageSections-EditslideShowImgLink-ru').val(slideShowImg.link_ru);
    $('#homePageSections-EditslideShowImgLink-ua').val(slideShowImg.link_ua);
    $('#homePageSections-EditslideShowImgLink-eg').val(slideShowImg.link_eg);

    $('#homePageSections-EditslideShowImgLink-openNewTab').prop('checked',slideShowImg.linkNewTab)
    $('#homePageSections-EditslideShowImgChange').attr('slideShowImgKey',$(this).closest('.slideShowSelectedImgContainer').attr('slideShowImgKey'))
    showPopup($('#slideShowImgEdit-popup'))
})
$('#homePageSections-EditslideShowImgCard').on('click',function(){
    showImgBrowser(texts.homePageSections.selectImg,'imgBrowser-EditslideShowImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-EditslideShowImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#homePageSections-EditslideShowImgCard').attr('imgId',imgId)
    $('#homePageSections-EditslideShowImgCard').attr('src',imgUrl)
    showPopup($('#slideShowImgEdit-popup'))
});
$('#homePageSections-EditslideShowImgChange').on('click',function(){
    let slideShowImgKey = $(this).attr('slideShowImgKey');
    website.slideShow_contentTemp[slideShowImgKey].imgId = $('#homePageSections-EditslideShowImgCard').attr('imgId');
    if($('#homePageSections-EditslideShowImgLink-openNewTab').prop('checked')){
        website.slideShow_contentTemp[slideShowImgKey].linkNewTab = 1;
    }else{
        website.slideShow_contentTemp[slideShowImgKey].linkNewTab = 0;
    }
    website.slideShow_contentTemp[slideShowImgKey].title_en = $('#homePageSections-EditslideShowImgTitle-en').val();
    website.slideShow_contentTemp[slideShowImgKey].title_fr = $('#homePageSections-EditslideShowImgTitle-fr').val();
    website.slideShow_contentTemp[slideShowImgKey].title_de = $('#homePageSections-EditslideShowImgTitle-de').val();
    website.slideShow_contentTemp[slideShowImgKey].title_it = $('#homePageSections-EditslideShowImgTitle-it').val();
    website.slideShow_contentTemp[slideShowImgKey].title_es = $('#homePageSections-EditslideShowImgTitle-es').val();
    website.slideShow_contentTemp[slideShowImgKey].title_ar = $('#homePageSections-EditslideShowImgTitle-ar').val();
    website.slideShow_contentTemp[slideShowImgKey].title_ru = $('#homePageSections-EditslideShowImgTitle-ru').val();
    website.slideShow_contentTemp[slideShowImgKey].title_ua = $('#homePageSections-EditslideShowImgTitle-ua').val();
    website.slideShow_contentTemp[slideShowImgKey].title_eg = $('#homePageSections-EditslideShowImgTitle-eg').val();

    website.slideShow_contentTemp[slideShowImgKey].des_en = $('#homePageSections_EditslideShowImgDes_en').val();
    website.slideShow_contentTemp[slideShowImgKey].des_fr = $('#homePageSections_EditslideShowImgDes_fr').val();
    website.slideShow_contentTemp[slideShowImgKey].des_de = $('#homePageSections_EditslideShowImgDes_de').val();
    website.slideShow_contentTemp[slideShowImgKey].des_it = $('#homePageSections_EditslideShowImgDes_it').val();
    website.slideShow_contentTemp[slideShowImgKey].des_es = $('#homePageSections_EditslideShowImgDes_es').val();
    website.slideShow_contentTemp[slideShowImgKey].des_ar = $('#homePageSections_EditslideShowImgDes_ar').val();
    website.slideShow_contentTemp[slideShowImgKey].des_ru = $('#homePageSections_EditslideShowImgDes_ru').val();
    website.slideShow_contentTemp[slideShowImgKey].des_ua = $('#homePageSections_EditslideShowImgDes_ua').val();
    website.slideShow_contentTemp[slideShowImgKey].des_eg = $('#homePageSections_EditslideShowImgDes_eg').val();

    website.slideShow_contentTemp[slideShowImgKey].link_en = $('#homePageSections-EditslideShowImgLink-en').val();
    website.slideShow_contentTemp[slideShowImgKey].link_fr = $('#homePageSections-EditslideShowImgLink-fr').val();
    website.slideShow_contentTemp[slideShowImgKey].link_de = $('#homePageSections-EditslideShowImgLink-de').val();
    website.slideShow_contentTemp[slideShowImgKey].link_it = $('#homePageSections-EditslideShowImgLink-it').val();
    website.slideShow_contentTemp[slideShowImgKey].link_es = $('#homePageSections-EditslideShowImgLink-es').val();
    website.slideShow_contentTemp[slideShowImgKey].link_ar = $('#homePageSections-EditslideShowImgLink-ar').val();
    website.slideShow_contentTemp[slideShowImgKey].link_ru = $('#homePageSections-EditslideShowImgLink-ru').val();
    website.slideShow_contentTemp[slideShowImgKey].link_ua = $('#homePageSections-EditslideShowImgLink-ua').val();
    website.slideShow_contentTemp[slideShowImgKey].link_eg = $('#homePageSections-EditslideShowImgLink-eg').val();
    drawSlideShowImgs();
    slideShowNoSaveCheck();
    closePopup();
    showAlert('normal',texts.homePageSections.slideShowImgInfoChanged,4000,true);
});
/////
$('#homePageSections-slideShowimgsContainer').on('click','.deleteSlideShowImg',function(e){
    e.stopImmediatePropagation();
    website.slideShow_contentTemp.splice($(this).closest('.slideShowSelectedImgContainer').attr('slideShowImgKey'), 1);
    drawSlideShowImgs();
    slideShowNoSaveCheck();
});
/////

let slideShowImgOnMove = false;
let slideShowImgOnMoveFrom;
let slideShowImgOnMoveTo;
let slideShowImgOnMoveInterval;

$('#homePageSections-slideShowimgsContainer').on('mousedown touchstart','.slideShowSelectedImgMove',function(e){
    e.stopImmediatePropagation();
    slideShowImgOnMove = true;
    slideShowImgOnMoveFrom = $(this).closest('.slideShowSelectedImgContainer');
    $(this).closest('.slideShowSelectedImgContainer').addClass('slideShowSelectedImgOnMove');
    $('#slideShowImgOnMove').html(slideShowImgOnMoveFrom.html());
    $('#slideShowImgOnMove').css('display','flex');
    if(!window.matchMedia("(pointer: coarse)").matches){
        $('#slideShowImgOnMove').css({
            'top':e.pageY,
            'left':e.pageX,
        });
    }else{
        $('#slideShowImgOnMove').css({
            'top':e.originalEvent.touches[0].pageY,
            'left':e.originalEvent.touches[0].pageX,
        });
    }
});
$('#popupPageBody').on('mousemove touchmove',function(e){
    if(slideShowImgOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        if(!window.matchMedia("(pointer: coarse)").matches){
            $('#slideShowImgOnMove').css({
                'top':e.pageY,
                'left':e.pageX,
            });
        }else{
            $('#slideShowImgOnMove').css({
                'top':e.originalEvent.touches[0].pageY,
                'left':e.originalEvent.touches[0].pageX,
            });
        }
        let pageY; let pageX;
        $('.slideShowSelectedImgContainer').removeClass('slideShowSelectedImgHighlighted')
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        $('.slideShowSelectedImgContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                $(this).addClass('slideShowSelectedImgHighlighted')
            }
        })
        clearInterval(slideShowImgOnMoveInterval)
        slideShowImgOnMoveInterval = setInterval(function(){
            if(pageY < $('#popupPageBody').offset().top + 100 && $('#homePageSections-slideShowimgsContainer').offset().top < $('#popupPageBody').offset().top + 40){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() - 5);
            }else if(pageY > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 100 && $('#homePageSections-slideShowimgsContainer').offset().top + $('#homePageSections-slideShowimgsContainer').height() > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 10){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() + 5);
            }
        },10)
    }else{
        clearInterval(slideShowImgOnMoveInterval)
    }
});

$('#popupPageBody').on('mouseup touchend','.slideShowSelectedImgContainer',function(e){
    clearInterval(slideShowImgOnMoveInterval)
    if(slideShowImgOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        let pageY; let pageX;
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.changedTouches[0].pageY;
            pageX = e.changedTouches[0].pageX;
        }
        $('.slideShowSelectedImgContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                slideShowImgOnMoveTo = $(this);
                let tempSlideShowImgKey = website.slideShow_contentTemp[slideShowImgOnMoveTo.attr('slideShowImgKey')]
                website.slideShow_contentTemp[slideShowImgOnMoveTo.attr('slideShowImgKey')] = website.slideShow_contentTemp[slideShowImgOnMoveFrom.attr('slideShowImgKey')]
                website.slideShow_contentTemp[slideShowImgOnMoveFrom.attr('slideShowImgKey')] = tempSlideShowImgKey;
                drawSlideShowImgs();
                slideShowNoSaveCheck();
            }
        })
        $('.slideShowSelectedImgContainer').removeClass('slideShowSelectedImgOnMove');
        $('#slideShowImgOnMove').hide();
        $('.slideShowSelectedImgContainer').removeClass('slideShowSelectedImgHighlighted');
        slideShowImgOnMove = false;
    }
});
// $('html,body').on('mouseup touchend',function(e){
//     $('.slideShowSelectedImgContainer').removeClass('slideShowSelectedImgOnMove');
//     $('#slideShowImgOnMove').hide();
//     $('.slideShowSelectedImgContainer').removeClass('slideShowSelectedImgHighlighted');
//     slideShowImgOnMove = false;
//     slideShowNoSaveCheck();
// });

////////////

$('#homePageSections-slideShowCancelBtn').on('click',function(){
    website.slideShow_contentTemp = JSON.parse(JSON.stringify(website.slideShow.content))
    drawSlideShowImgs();
    $('#homePageSections-slideShowInterval').text(website.slideShow.interval);
    slideShowNoSaveCheck();
});

$('#homePageSections-slideShowSaveBtn').on('click',function(){
    showBtnLoading($('#homePageSections-slideShowSaveBtn'))
    let tempSlideShowInterval = $('#homePageSections-slideShowInterval').text();
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveComponent:'slideShow',
            content:website.slideShow_contentTemp,
            interval:tempSlideShowInterval,
        },
        success:function(response){
            hideBtnLoading($('#homePageSections-slideShowSaveBtn'))
            if(response.saveComponentStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.slideShow.interval = tempSlideShowInterval;
                website.slideShow.content = JSON.parse(JSON.stringify(website.slideShow_contentTemp));
                slideShowNoSaveCheck();
                window.guideHints.slideShow();
                popupPageClose ();
            }else if(response.saveComponentStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    });
});
