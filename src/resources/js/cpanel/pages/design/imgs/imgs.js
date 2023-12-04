drawImg = function(img,append='append'){
    let planStorage = window.plans[website.plan].storage
    let imgSize = ( (img.size/1024)/1024 ).toFixed(2);
    let imgSizePercent = ( imgSize / planStorage * 100).toFixed(2);
    let elem = $('<div/>',{
        class:'imgsImgCard',
        imgId:img.id,
    }).append(
        $('<img/>',{class:'w300 h300 ofCover mxw100p',src:img.thumbnailUrl,}),
        $('<div/>',{
            class:'w300 fs09 mB10',
        }).append(
            $('<div/>',{class:'mX5 row',tooltip:img.name+'.'+img.extension,}).append(
                $('<span/>',{class:'bold mie-3',text:texts.design.imgName+':'}),
                $('<span/>',{class:'ellipsis',text:img.name+'.'+img.extension})
            ),
            $('<div/>',{class:'mX5'}).append(
                $('<span/>',{class:'bold mie-3',text:texts.design.imgType+':'}),
                $('<span/>',{text:texts.design[img.extension.toLowerCase()]})
            ),
            $('<div/>',{class:'mX5',}).append(
                $('<span/>',{class:'bold mie-3',text:texts.design.dimensions+':'}),
                $('<span/>',{text:img.width+' x '+img.height})
            ),
            $('<div/>',{class:'mX5'}).append(
                $('<span/>',{class:'bold mie-3',text:texts.design.imgSize+':'}),
                $('<span/>',{text:imgSize+texts.design.mb+' ('+imgSizePercent+'%)'})
            ),
            $('<div/>',{class:'mX5',tooltip:getDateAndTime(img.created_at)
            }).append(
                $('<span/>',{class:'bold mie-3',text:texts.design.uploadedAt+':'}),
                $('<span/>',{class:'diffTimeCalc',time:img.created_at})
            ),
        ),
        $('<div/>',{
            class:'imgsimgBtns',
        }).append(
            $('<div/>',{class:'imgsImgIcon ico-showPassword previewImg',img:img.id,tooltip:texts.cpanel.public.preview}),
            $('<a/>',{class:'imgsImgIcon ico-download tdNone hvr-tdNone',tooltip:texts.cpanel.public.download,download:img.name+'.'+img.extension,href:img.url}),
            $('<div/>',{class:'imgsImgIcon ico-copy copyImageLink',img:img.id,tooltip:texts.cpanel.public.copyLink}),
            $('<div/>',{class:'imgsImgIcon ico-delete deleteImg',img:img.id,tooltip:texts.cpanel.public.delete}),
        )
    );
    append == 'append' ? $('#imgs_imgsContainer').append(elem) : append = 'prepend' ?  $('#imgs_imgsContainer').prepend(elem) : null;
}


checkDeleteImg = function(imgId){
    let img = website.imgs.find(item=> item.id == imgId);
    let deleteLinkElem;
    let deleteValidation = true;
    if(imgId == website.logo_id){
        deleteLinkElem = `<a class="cpPage" cpPage="restaurant_information">${texts.design.deleteFailLogo}</a>`
        deleteValidation = false
    }else if (imgId == website.icon_id){
        deleteLinkElem = `<a class="cpPage" cpPage="restaurant_information">${texts.design.deleteFailIcon}</a>`
        deleteValidation = false
    }
    for(const key in website.products){
        if(website.products[key].img_id == imgId){
            deleteLinkElem = `<a class="popupPage popupId" popupPage="edit_product" popupId="product" product="${website.products[key].name}">${website.products[key].name}</a>`
            deleteValidation = false;
        }
    }
    for(const key in website.categories){
        if(website.categories[key].img_id == imgId){
            deleteLinkElem = `<a class="popupPage popupId" popupPage="edit_category" popupId="category" category="${website.categories[key].name}">${website.categories[key].name}</a>`
            deleteValidation = false;
        }
    }
    // else if(imgId == website.intro.img){
    //     deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailIntro,class:'popupPage mX5',popupPage:'Website-Intro'});
    //     deleteValidation = false
    // }
    // else if(imgId == website.info.img){
    //     deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailInfo,class:'popupPage mX5',popupPage:'Website-Info'});
    //     deleteValidation = false
    // }
    // else if(imgId == website.ourStory.img){
    //     deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailOurStory,class:'popupPage mX5',popupPage:'Website-OurStory'});
    //     deleteValidation = false
    // }
    // let galleryCheck = website.gallery.split('.');
    // for(const key in galleryCheck){
    //     if(imgId == galleryCheck[key]){
    //         deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailGallery,class:'popupPage mX5',popupPage:'Website-Gallery'});
    //         deleteValidation = false;
    //     }
    // }
    // let slideShowCheck = website.slideShowImgs.split('.');
    // for(const key in slideShowCheck){
    //     if(imgId == slideShowCheck[key]){
    //         deleteLinkElem = $('<a/>',{text:texts.imgs.deleteFailslideShow,class:'popupPage mX5',popupPage:'Website-SlideShow'});
    //         deleteValidation = false;
    //     }
    // }

    if(!deleteValidation){
        showPopup('error-popup',function(){
            $('.popupBody').append(
                $('<div/>',{class:'msgBox_red'}).append(
                    $('<span/>',{class:'ico-warning fs2 mB10'}),
                    $('<span/>',{class:'taC',html:texts.design.deleteFailImgInUse.replace(':name:',deleteLinkElem)})
                ),
                $('<div/>',{
                    class:'btnContainer ',
                }).append(
                    $('<button/>',{class:'m20 btn btn-cancel popupClose',text:texts.cpanel.public.gotIt}),
                )
            )
        })
        return false;
    }else{return true;}
}
$('html,body').on('click','.deleteImg',function(e){
    e.stopImmediatePropagation();
    if(!checkDeleteImg($(this).attr('img'))){return;}
    let img = website.imgs.find(item=> item.id == $(this).attr('img'));
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'fs103 taC bold',text:texts.design.imgDeleteConfirm,}),
                $('<img/>',{src:img.thumbnailUrl,class:'deleteImgConfirmImg'}),
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteImage-confirmBtn',img:img.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#deleteImage-confirmBtn',function(e){
    e.stopImmediatePropagation();
    let imgId = $(this).attr('img');
    showBtnLoading($('#deleteImage-confirmBtn'))
    $.ajax({
        url: '/imgs',
        type: 'post',
        data:{
            _token : $('meta[name="csrf-token"]').attr("content"),
            deleteImg:true,
            imgId:imgId,
        },
        success:function(response){
            hideBtnLoading($('#deleteImage-confirmBtn'))
            if(response.deleteImgStatus == 1){
                showAlert('success',response.msg,4000,true);
                for(const key in website.imgs){
                    if(website.imgs[key].id == imgId){
                        website.imgs_storage = parseFloat(website.imgs_storage) - parseFloat(website.imgs[key].size);
                        resetStorageBar();
                        website.imgs.splice(key,1);
                        $(`.imgsImgCard[imgId="${imgId}"]`).remove();
                        $(`.imgsImgCard-imgBrowser[imgId="${imgId}"]`).remove();
                    }
                }
                closePopup();
                if(website.imgs.length < 10){
                    getImgs(true).then(function(imgs){
                        if(window.history.state.page == 'images'){
                            for(const key in imgs){
                                drawImg(imgs[key],'append')
                            }
                        }
                        if(window.imgBrowser.opened){
                            appendToImgBrowser(imgs[key],window.imgBrowser.imgBrowserClass,'append')
                        }
                    })
                }
            }else if(response.deleteImgStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
})

$('html,body').on('click','.copyImageLink',function(e){
    e.stopImmediatePropagation();
    let imgUrl = $('.imgs-imgPreviewimg').attr('src');
    navigator.clipboard.writeText(`https://${website.url}${imgUrl}`).then(function(){
        showAlert('normal',texts.design.copyed,4000,true);
    });
});

setImgPreview = function(img_id){
    if(account.authorities[3] == false){
        $('#imgs-imgPreview').addClass('none')
        window.previewImg = {};
        pushHistory(false);
        showPopup('accessDenied');
        return;
    }
    $('#imgs-imgPreview').removeClass('none')
    $('.imgPreviewLoading').removeClass('none');
    $('.imgs-imgPreviewimg').addClass('none');
    $('.imgs-imgPreveiwBtnsLeft').addClass('vH')
    getImg(img_id).then(function(img){
        $('.imgPreviewLoading').addClass('none');
        $('.imgs-imgPreviewimg').removeClass('none');
        $('.imgs-imgPreveiwBtnsLeft').removeClass('vH')
        let planStorage = window.plans[website.plan].storage
        let imgSize = ( (img.size/1024)/1024 ).toFixed(2);
        let imgSizePercent = ( imgSize / planStorage * 100).toFixed(2);
        let thisImgInfo = `<div class="column alnS jstfyS">
            <div><span class="bold">${texts.design.imgName}:</span><span class="mX3">${img.name}.${img.extension}</span></div>
            <div><span class="bold">${texts.design.imgType}:</span><span class="mX3">${texts.design[img.extension.toLowerCase()]}</span></div>
            <div><span class="bold">${texts.design.dimensions}:</span><span class="mX3">${img.width} x ${img.height}</span></div>
            <div><span class="bold">${texts.design.imgSize}:</span><span class="mX3">${imgSize}${texts.design.mb} (${imgSizePercent}%)</span></div>
            <div><span class="bold">${texts.design.uploadedAt}:</span><span class="diffTimeCalc" time=${img.created_at}></span></div>
        </div>`
        $('.imgs-imgPreviewInfo').attr('tooltip',thisImgInfo);
        $('.imgs-imgPreviewimg').attr('src',img.url)
        $('#imgs-imgPreview').find('.imgs-imgPreviewDownload').attr('download',img.name+'.'+img.extension).attr('href',img.url);
        $('.imgs-imgPreviewimg').css('cursor','grab');
        $('.imgs-imgPreviewimg').css('transform','scale(1)')
        $('.imgs-imgPreviewimg').attr('zoomLvl',1)
        $('#imgs-imgPreviewZoomIn').removeClass('imgs-imgPreviewBtn_dump')
        $('#imgs-imgPreviewZoomOut').removeClass('imgs-imgPreviewBtn_dump')

    });
}

///preview img and close preview in links file

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
