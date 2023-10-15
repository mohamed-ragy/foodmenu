
drawImgs = function(){
    $('#imgs-imgsContainer').text('').removeClass('mY20');
    if(imgs.length == 0){$('#imgs-imgsContainer').text(texts.imgs.noUploads).addClass('mY20')}
    for(const key in imgs){
        let img = imgs[key]
        let planStorage = window.plans[website.plan].storage
        let imgSize = ( (img.size/1024)/1024 ).toFixed(2);
        let imgSizePercent = ( imgSize / planStorage * 100).toFixed(2);
        $('#imgs-imgsContainer').append(
            $('<div/>',{
                class:'imgsImgCard',
                imgId:img.id,
            }).append(
                $('<img/>',{
                    class:'imgsimg',
                    src:'./storage/'+img.thumbnailUrl,
                }),
                $('<div/>',{
                    class:'imgsImgInfo',
                }).append(
                    $('<div/>',{
                        class:'mX5 mY2 row',
                        tooltip:img.name+'.'+img.extension,
                    }).append(
                        $('<span/>',{class:'bold',text:texts.imgs.imgName+':'}),
                        $('<span/>',{class:'mX3 imgsImgName',text:img.name+'.'+img.extension})
                    ),
                    $('<div/>',{
                        class:'mX5 mY2',
                    }).append(
                        $('<span/>',{class:'bold',text:texts.imgs.imgType+':'}),
                        $('<span/>',{class:'mX3',text:texts.imgs[img.extension.toLowerCase()]})
                    ),
                    $('<div/>',{
                        class:'mX5 mY2',
                    }).append(
                        $('<span/>',{class:'bold',text:texts.imgs.dimensions+':'}),
                        $('<span/>',{class:'mX3',text:img.width+' x '+img.height})
                    ),
                    $('<div/>',{
                        class:'mX5 mY2',
                    }).append(
                        $('<span/>',{class:'bold',text:texts.imgs.imgSize+':'}),
                        $('<span/>',{class:'mX3',text:imgSize+texts.imgs.mb+' ('+imgSizePercent+'%)'})
                    ),
                    $('<div/>',{
                        class:'mX5 mY2',
                        tooltip:getDateAndTime(img.created_at)
                    }).append(
                        $('<span/>',{class:'bold',text:texts.imgs.uploadedAt+':'}),
                        $('<span/>',{class:'mX3 diffTimeCalc',time:img.created_at})
                    ),
                ),
                $('<div/>',{
                    class:'imgsimgBtns',
                }).append(
                    $('<button/>',{imgId:img.id,class:'btn previewImg',text:texts.cpanel.public.preview}),
                    $('<a/>',{class:'btn mY5 tdNone hvr-tdNone',text:texts.cpanel.public.download,download:img.name+'.'+img.extension,href:'./storage/'+img.url}),
                    $('<button/>',{imgId:img.id,class:'btn copyImageLink',text:texts.cpanel.public.copyLink}),
                    $('<button/>',{imgId:img.id,class:'btn btn-delete deleteImg',text:texts.cpanel.public.delete}),
                )
            )
        )
    }
}

drawImgs();
checkDeleteImg = function(imgId){
    let img = imgs.find(item=> item.id == imgId);
    let deleteLinkElem;
    let deleteValidation = true;
    if(imgId == website.logo){
        deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailLogo,class:'cpPage mX5',cpPage:'restaurant_information'});
        deleteValidation = false
    }else if (imgId == website.icon){
        deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailIcon,class:'cpPage mX5',cpPage:'restaurant_information'});
        deleteValidation = false
    }else if(imgId == website.intro.img){
        deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailIntro,class:'popupPage mX5',popupPage:'Website-Intro'});
        deleteValidation = false
    }else if(imgId == website.info.img){
        deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailInfo,class:'popupPage mX5',popupPage:'Website-Info'});
        deleteValidation = false
    }else if(imgId == website.ourStory.img){
        deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailOurStory,class:'popupPage mX5',popupPage:'Website-OurStory'});
        deleteValidation = false
    }
    let galleryCheck = website.gallery.split('.');
    for(const key in galleryCheck){
        if(imgId == galleryCheck[key]){
            deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailGallery,class:'popupPage mX5',popupPage:'Website-Gallery'});
            deleteValidation = false;
        }
    }
    let slideShowCheck = website.slideShowImgs.split('.');
    for(const key in slideShowCheck){
        if(imgId == slideShowCheck[key]){
            deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailslideShow,class:'popupPage mX5',popupPage:'Website-SlideShow'});
            deleteValidation = false;
        }
    }
    for(const key in products){
        if(products[key].img_id == imgId){
                deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailProduct+' '+products[key].name+'.',class:'popupPage mX5',popupPage:'Edit-Product',product:products[key].name});
                deleteValidation = false;
        }
    }
    for(const key in categories){
        if(categories[key].img_id == imgId){
                deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailCategory+' '+categories[key].name+'.',class:'popupPage mX5',popupPage:'Edit-Category',Category:categories[key].name});
                deleteValidation = false;
        }
    }
    if(!deleteValidation){
        $('#delete-popup').find('.popupBody').text('').append(
            $('<div/>',{
                class:'m20 column alnC jstfyC',
            }).append(
                $('<span/>',{class:'ico-warning fs2 cO m10'}),
                $('<span/>',{class:'fs103 taC bold'}).append(
                    $('<span/>',{text:texts.imgs.deleteFailImgInUse}),
                    deleteLinkElem,
                ),
                $('<img/>',{src:'./storage/'+img.url,class:'deleteImgConfirmImg'}),
            ),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{disabled:true,class:'btn'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
        showPopup($('#delete-popup'))
        return false;
    }else{return true;}
}
$('html,body').on('click','.copyImageLink',function(e){
    e.stopImmediatePropagation();
    let imgId = $(this).attr('imgId');
    let imgUrl = imgs.find(item=> item.id == imgId).url;
    navigator.clipboard.writeText('https://'+website.url+'/storage/'+imgUrl).then(function(){
        showAlert('normal',texts.imgs.copyed,4000,true);
    });
});
$('html,body').on('click','.deleteImg',function(e){
    e.stopImmediatePropagation();
    let imgId = $(this).attr('imgId');
    if(!checkDeleteImg(imgId)){return;}
    let img = imgs.find(item=> item.id == imgId);
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{
            class:'m20 column alnC jstfyC',
        }).append(
            $('<span/>',{class:'fs103 taC bold',text:texts.imgs.imgDeleteConfirm,}),
            $('<img/>',{src:'./storage/'+img.url,class:'deleteImgConfirmImg'}),
        ),
        $('<div/>',{
            class:'btnContainer',
        }).append(
            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
            $('<button/>',{id:'deleteImage-confirmBtn',imgId:imgId,class:'btn btn-delete'}).append(
                $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                $('<span/>',{class:'btnLoading'})
            )
        )
    )
    showPopup($('#delete-popup'))
})
$('html,body').on('click','#deleteImage-confirmBtn',function(){
    let imgId = $(this).attr('imgId');
    showBtnLoading($('#deleteImage-confirmBtn'))
    $.ajax({
        url: '/imgs',
        type: 'post',
        data:{
            deleteImg:true,
            imgId:imgId,
            _token : $('meta[name="csrf-token"]').attr("content"),
        },
        success:function(response){
            hideBtnLoading($('#deleteImage-confirmBtn'))
            if(response.deleteImgStatus == 1){
                showAlert('success',response.msg,4000,true);
                window.imgs = response.imgs;
                drawImgs();
                resetStorageBar();
                closePopup();
            }else if(response.deleteImgStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
})
setImgPreview = function(key){
    img = imgs[key];
    let planStorage = window.plans[website.plan].storage
    let imgSize = ( (img.size/1024)/1024 ).toFixed(2);
    let imgSizePercent = ( imgSize / planStorage * 100).toFixed(2);
    let thisImgInfo = `<div class="column alnS jstfyS">
        <div><span class="bold">${texts.imgs.imgName}:</span><span class="mX3">${img.name}.${img.extension}</span></div>
        <div><span class="bold">${texts.imgs.imgType}:</span><span class="mX3">${texts.imgs[img.extension.toLowerCase()]}</span></div>
        <div><span class="bold">${texts.imgs.dimensions}:</span><span class="mX3">${img.width} x ${img.height}</span></div>
        <div><span class="bold">${texts.imgs.imgSize}:</span><span class="mX3">${imgSize}${texts.imgs.mb} (${imgSizePercent}%)</span></div>
        <div><span class="bold">${texts.imgs.uploadedAt}:</span><span class="diffTimeCalc" time=${img.created_at}></span></div>
    </div>`
    $('.imgs-imgPreviewInfo').attr('tooltip',thisImgInfo)
    $('.imgs-imgPreviewimg').attr('src','./storage/'+img.url)
    $('.imgs-imgPreviewimg').attr('imgKey',key)
    $('#imgs-imgPreview').find('.copyImageLink').attr('imgId',img.id);
    $('#imgs-imgPreview').find('.imgs-imgPreviewDownload').attr('download',img.name+'.'+img.extension).attr('href','./storage/'+img.url);
    $('.imgs-imgPreviewimg').css('cursor','grab');
    $('.imgs-imgPreviewimg').css('transform','scale(1)')
    $('.imgs-imgPreviewimg').attr('zoomLvl',1)
    $('#imgs-imgPreviewZoomIn').removeClass('imgs-imgPreviewBtn_dump')
    $('#imgs-imgPreviewZoomOut').removeClass('imgs-imgPreviewBtn_dump')
    $('#imgs-imgPreview').removeClass('none')
}

///preview img and close preview and arows events in links file

$('#imgs-imgPreviewZoomIn').on('click',function(e){
    e.stopImmediatePropagation();
    let currentZoomLvl = $('.imgs-imgPreviewimg').attr('zoomLvl');
    if(currentZoomLvl < 2){
        if(currentZoomLvl > 1){
            $('.imgs-imgPreviewimg').css('transform','scale('+(parseFloat(currentZoomLvl) + .4).toFixed(1) +')')
            $('.imgs-imgPreviewimg').attr('zoomLvl',(parseFloat(currentZoomLvl) + .4).toFixed(1))
        }else{
            $('.imgs-imgPreviewimg').css('transform','scale('+(parseFloat(currentZoomLvl) + .4).toFixed(1) +')')
            $('.imgs-imgPreviewimg').attr('zoomLvl',(parseFloat(currentZoomLvl) + .4).toFixed(1))

        }
    }
    if($('.imgs-imgPreviewimg').attr('zoomLvl') >= 1){
        $('.imgs-imgPreviewimg').css('cursor','grab');
    }else{
        $('.imgs-imgPreviewimg').css('cursor','auto');
    }
    if($('.imgs-imgPreviewimg').attr('zoomLvl') >= 2){
        $('#imgs-imgPreviewZoomIn').addClass('imgs-imgPreviewBtn_dump')
        $('#imgs-imgPreviewZoomOut').removeClass('imgs-imgPreviewBtn_dump')
    }else if($('.imgs-imgPreviewimg').attr('zoomLvl') <= .4){
        $('#imgs-imgPreviewZoomIn').removeClass('imgs-imgPreviewBtn_dump')
        $('#imgs-imgPreviewZoomOut').addClass('imgs-imgPreviewBtn_dump')
    }else{
        $('#imgs-imgPreviewZoomIn').removeClass('imgs-imgPreviewBtn_dump')
        $('#imgs-imgPreviewZoomOut').removeClass('imgs-imgPreviewBtn_dump')
    }
})


$('#imgs-imgPreviewZoomOut').on('click',function(e){
    e.stopImmediatePropagation();
    let currentZoomLvl = $('.imgs-imgPreviewimg').attr('zoomLvl');
    if(currentZoomLvl > .4){
        if(currentZoomLvl > 1){
            $('.imgs-imgPreviewimg').css('transform','scale('+(parseFloat(currentZoomLvl) - .4).toFixed(1) +')')
            $('.imgs-imgPreviewimg').attr('zoomLvl',(parseFloat(currentZoomLvl) - .4).toFixed(1))
        }else{
            $('.imgs-imgPreviewimg').css('transform','scale('+(parseFloat(currentZoomLvl) - .4).toFixed(1) +')')
            $('.imgs-imgPreviewimg').attr('zoomLvl',(parseFloat(currentZoomLvl) - .4).toFixed(1))

        }
    }
    if($('.imgs-imgPreviewimg').attr('zoomLvl') >= 1){
        $('.imgs-imgPreviewimg').css('cursor','grab');
    }else{
        $('.imgs-imgPreviewimg').css('cursor','auto');
    }

    if($('.imgs-imgPreviewimg').attr('zoomLvl') >= 2){
        $('#imgs-imgPreviewZoomIn').addClass('imgs-imgPreviewBtn_dump')
        $('#imgs-imgPreviewZoomOut').removeClass('imgs-imgPreviewBtn_dump')
    }else if($('.imgs-imgPreviewimg').attr('zoomLvl') <= .4){
        $('#imgs-imgPreviewZoomIn').removeClass('imgs-imgPreviewBtn_dump')
        $('#imgs-imgPreviewZoomOut').addClass('imgs-imgPreviewBtn_dump')
    }else{
        $('#imgs-imgPreviewZoomIn').removeClass('imgs-imgPreviewBtn_dump')
        $('#imgs-imgPreviewZoomOut').removeClass('imgs-imgPreviewBtn_dump')
    }
})

let imgPreviewInPan = false;
let imgPreviewInPanX = 0;
let imgPreviewInPanY = 0;
let imgPreviewInPanX2 = 50;
let imgPreviewInPanY2 = 50;
$('.imgs-imgPreviewimg').on('mousedown touchstart',function(e){
    imgPreviewInPan = true;
    $('.imgs-imgPreviewimg').addClass('imgs-imgPreviewimg_onPan')
    if(!window.matchMedia("(pointer: coarse)").matches){
        imgPreviewInPanX = (e.pageX / ($(window).width()) * 100)
        imgPreviewInPanY = (e.pageY / ($(window).height()) * 100)

        imgPreviewInPanX2 = ((e.pageX / ($(window).width())) * 100) - (imgPreviewInPanX );
        imgPreviewInPanY2 = ((e.pageY / ($(window).height())) * 100) - (imgPreviewInPanY );
    }else{
        imgPreviewInPanX = (e.originalEvent.touches[0].pageX / ($(window).width()) * 100)
        imgPreviewInPanY = (e.originalEvent.touches[0].pageY / ($(window).height()) * 100)

        imgPreviewInPanX2 = ((e.originalEvent.touches[0].pageX / ($(window).width())) * 100) - (imgPreviewInPanX );
        imgPreviewInPanY2 = ((e.originalEvent.touches[0].pageY / ($(window).height())) * 100) - (imgPreviewInPanY );
    }

    $('.imgs-imgPreviewimg').css('transform',`scale(${$('.imgs-imgPreviewimg').attr('zoomLvl')}) translateX(${imgPreviewInPanX2}%) translateY(${imgPreviewInPanY2}%)`);

    if($('.imgs-imgPreviewimg').attr('zoomLvl') >= 1){
        $('.imgs-imgPreviewimg').css('cursor','grabbing')
    }
})
$('html,body').on('mouseup touchend',function(){
    if($('.imgs-imgPreviewimg').attr('zoomLvl') >= 1){
        $('.imgs-imgPreviewimg').css('cursor','grab')
    }
    $('.imgs-imgPreviewimg').css('transform',`scale(${$('.imgs-imgPreviewimg').attr('zoomLvl')})`);
    imgPreviewInPan = false;
    $('.imgs-imgPreviewimg').removeClass('imgs-imgPreviewimg_onPan')
})
$('html,body').on('mousemove touchmove',function(e){
    if(imgPreviewInPan){
        if($('.imgs-imgPreviewimg').attr('zoomLvl') >= 1){
            $('.imgs-imgPreviewimg').css('cursor','grabbing');
            if(!window.matchMedia("(pointer: coarse)").matches){
                e.preventDefault();
                imgPreviewInPanX2 = ((e.pageX / ($(window).width())) * 100) - (imgPreviewInPanX );
                imgPreviewInPanY2 = ((e.pageY / ($(window).height())) * 100) - (imgPreviewInPanY );
            }else{
                imgPreviewInPanX2 = ((e.targetTouches[0].pageX / ($(window).width())) * 100) - (imgPreviewInPanX );
                imgPreviewInPanY2 = ((e.targetTouches[0].pageY / ($(window).height())) * 100) - (imgPreviewInPanY );

            }
            // imgPreviewInPanX2 = ((e.pageX / ($(window).width())) * 100) - (imgPreviewInPanX );
            // imgPreviewInPanY2 = ((e.pageY / ($(window).height())) * 100) - (imgPreviewInPanY );
            $('.imgs-imgPreviewimg').css('transform',`scale(${$('.imgs-imgPreviewimg').attr('zoomLvl')}) translateX(${imgPreviewInPanX2}%) translateY(${imgPreviewInPanY2}%)`);
        }

    }
})
