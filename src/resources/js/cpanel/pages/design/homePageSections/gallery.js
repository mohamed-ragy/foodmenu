let websiteGalleryTemp = website.gallery;
$('#design-addToGalleryImgCard').on('click',function(){
    showImgBrowser(texts.homePageSections.selectImg,'imgBrowser-addToGallery');
});
$('#imgBrowser-popup').on('click','.imgBrowser-addToGallery',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#design-addToGalleryImgCard').attr('imgId',imgId)
    $('#design-addToGalleryImgCard').attr('src',imgUrl)
});
$('#design-galleryAddBtn').on('click',function(){
    if($('#design-addToGalleryImgCard').attr('imgId') == null || $('#design-addToGalleryImgCard').attr('imgId') == '' ){return;}
        if(websiteGalleryTemp == ''){
            websiteGalleryTemp = $('#design-addToGalleryImgCard').attr('imgId');
        }else{
            websiteGalleryTemp = websiteGalleryTemp+'.'+$('#design-addToGalleryImgCard').attr('imgId');
        }
        $('#design-addToGalleryImgCard').attr('imgId',null);
        $('#design-addToGalleryImgCard').attr('src','./storage/imgs/cpanel/noimg.png')
        drawGallery();
})

galleryNoSaveCheck = function(){
    if(website.gallery != websiteGalleryTemp){
        $('#homePageSections-galleryNoSave').removeClass('none');
    }else{
        $('#homePageSections-galleryNoSave').addClass('none');
    }
}
drawGallery = function(){
    $('#design-galleryImgs').text('');
    if(websiteGalleryTemp.length == 0){
        $('#design-galleryImgs').append(
            $('<div/>',{
                text:texts.homePageSections.galleryNoImgs,
                class:'m10'
            })
            )
    }else{
        let websiteGalleryDraw = websiteGalleryTemp.split('.');
        for(const key in websiteGalleryDraw){
            let imgUrl = 'imgs/cpanel/noimg.png';
            for(const key2 in imgs){
                if(imgs[key2].id == websiteGalleryDraw[key]){
                    imgUrl = imgs[key2].url;
                }
            }
            $('#design-galleryImgs').append(
                $('<div/>',{
                    class:'gallerySelectedImgContainer',
                    galleryImgId:websiteGalleryDraw[key],
                }).append(
                    $('<div/>',{
                        class:'gallerySelectedImgHead',
                    }).append(
                        $('<span/>',{tooltip:texts.cpanel.public.swap,class:'ico-move gallerySelectedImgMove m5 fs103'}),
                        $('<span/>',{tooltip:texts.cpanel.public.remove,class:'ico-close pointer deleteGalleryImg m5 fs102'}),
                    ),
                    $('<img/>',{src:'storage/'+imgUrl,class:'w100p h100p ofCover'})
                )
            )
        }

    }
    galleryNoSaveCheck();
}
drawGallery();

$('#design-galleryImgs').on('click','.deleteGalleryImg',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.gallerySelectedImgContainer').remove();
    websiteGalleryTemp = '';
    $('.gallerySelectedImgContainer').each(function(){
        if(websiteGalleryTemp == ''){websiteGalleryTemp = $(this).attr('galleryImgId')}else{
            websiteGalleryTemp = websiteGalleryTemp+'.'+$(this).attr('galleryImgId')
        }
    })
    drawGallery();
})
/////////////////////////////


$('#homePageSections-galleryCancelBtn').on('click',function(){
    websiteGalleryTemp = website.gallery;
    drawGallery();
    galleryNoSaveCheck();
})

$('#homePageSections-gallerySaveBtn').on('click',function(){
    showBtnLoading($('#homePageSections-gallerySaveBtn'))
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveComponent:'gallery',
            gallery:websiteGalleryTemp,
        },
        success:function(response){
            hideBtnLoading($('#homePageSections-gallerySaveBtn'))
            if(response.saveComponentStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.gallery = websiteGalleryTemp;
                galleryNoSaveCheck();
                window.guideHints.gallery();
                popupPageClose ();
                galleryNoSaveCheck();
            }else if(response.saveComponentStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    });
})


let galleryImgOnMove = false;
let galleryImgOnMoveFrom;
let galleryImgOnMoveTo;
let galleryImgOnMoveInterval;
$('#design-galleryImgs').on('mousedown touchstart','.gallerySelectedImgMove',function(e){
    e.stopImmediatePropagation();
    galleryImgOnMove = true;
    galleryImgOnMoveFrom = $(this).closest('.gallerySelectedImgContainer');
    $(this).closest('.gallerySelectedImgContainer').addClass('gallerySelectedImgOnMove');
    $('#galleryImgOnMove').html(galleryImgOnMoveFrom.html());
    $('#galleryImgOnMove').css('display','flex');
    if(!window.matchMedia("(pointer: coarse)").matches){
        $('#galleryImgOnMove').css({
            'top':e.pageY,
            'left':e.pageX,
        });
    }else{
        $('#galleryImgOnMove').css({
            'top':e.originalEvent.touches[0].pageY,
            'left':e.originalEvent.touches[0].pageX,
        });
    }
});

$('#popupPageBody').on('mousemove touchmove',function(e){
    if(galleryImgOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        let pageY; let pageX;
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        if(!window.matchMedia("(pointer: coarse)").matches){
            $('#galleryImgOnMove').css({
                'top':e.pageY,
                'left':e.pageX,
            });
        }else{
            $('#galleryImgOnMove').css({
                'top':e.originalEvent.touches[0].pageY,
                'left':e.originalEvent.touches[0].pageX,
            });
        }
        $('.gallerySelectedImgContainer').removeClass('gallerySelectedImgHighlighted')
        $('.gallerySelectedImgContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                $(this).addClass('gallerySelectedImgHighlighted')
            }
        });

        clearInterval(galleryImgOnMoveInterval)
        galleryImgOnMoveInterval = setInterval(function(){
            if(pageY < $('#popupPageBody').offset().top + 100 && $('#design-galleryImgs').offset().top < $('#popupPageBody').offset().top + 40){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() - 5);
            }else if(pageY > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 100 && $('#design-galleryImgs').offset().top + $('#design-galleryImgs').height() > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 10){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() + 5);
            }
        },10)
    }else{
        clearInterval(galleryImgOnMoveInterval)
    }
});

$('#popupPageBody').on('mouseup touchend',function(e){
    clearInterval(galleryImgOnMoveInterval)
    if(galleryImgOnMove){
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
        $('.gallerySelectedImgContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                galleryImgOnMoveTo = $(this);
                let tempGalleryImgId = galleryImgOnMoveTo.attr('galleryImgId');
                galleryImgOnMoveTo.attr('galleryImgId',galleryImgOnMoveFrom.attr('galleryImgId'))
                galleryImgOnMoveFrom.attr('galleryImgId',tempGalleryImgId)
                websiteGalleryTemp = '';
                $('.gallerySelectedImgContainer').each(function(){
                    if(websiteGalleryTemp == ''){websiteGalleryTemp = $(this).attr('galleryImgId')}else{
                        websiteGalleryTemp = websiteGalleryTemp+'.'+$(this).attr('galleryImgId')
                    }
                })
                drawGallery();
                galleryNoSaveCheck();
            }
        })
        $('.gallerySelectedImgContainer').removeClass('gallerySelectedImgOnMove');
        $('#galleryImgOnMove').hide();
        $('.gallerySelectedImgContainer').removeClass('gallerySelectedImgHighlighted');
        galleryImgOnMove = false;
    }

});
