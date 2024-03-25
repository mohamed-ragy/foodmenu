
draw_imgBrowser_loading_imgs = function(){
    for(i=1;i<6;i++){
        $('#imgBrowser_imgs_container').append(
            $('<div/>',{class:'imgsImgCard_loading w300'}).append(
                $('<div/>',{class:'cardLoading w300 h300'}),
                $('<div/>',{}).append(
                    $('<div/>',{class:'cardLoading h10 w100 br5 relative m10'}),
                    $('<div/>',{class:'cardLoading h10 w200 br5 relative m10'}),
                    $('<div/>',{class:'cardLoading h10 w200 br5 relative m10'})
                )
            )
        )
    }
}
appendToImgBrowser = function(img,append){
    let imgInfo; let imgBtns;
    let imgSize = ( (img.size/1024)/1024 ).toFixed(2);

    imgBtns = $('<div/>',{class:'imgsimgBtns'}).append(
        $('<a/>',{class:'imgsImgIcon ico-download tdNone hvr-tdNone',tooltip:texts.download,download:img.name+'.'+img.extension,href:img.url}),
        $('<div/>',{class:'imgsImgIcon ico-copy copyImageLink',img:img.id,tooltip:texts.copyLink}),
        $('<div/>',{class:'imgsImgIcon ico-delete deleteImg',img:img.id,tooltip:texts.delete}),
    )
    imgInfo = $('<div/>',{class:'w300 pY10 column alnS jstfyS fs08'}).append(
        $('<div/>',{class:'row mX5'}).append(
            $('<div/>',{class:'bold',text:`${texts.dimensions}: `}),
            $('<div/>',{class:'mX3',text:`${img.width} x ${img.height}`})
        ),
        $('<div/>',{class:'row mX5'}).append(
            $('<div/>',{class:'bold',text:`${texts.type}: `}),
            $('<div/>',{class:'mX3',text:texts.img_types[img.extension.toLowerCase()]})
        ),
        $('<div/>',{class:'row mX5'}).append(
            $('<div/>',{class:'bold',text:`${texts.size}: `}),
            $('<div/>',{class:'mX3',text:imgSize+'MB'})
        )
    )
    if(append == 'append'){
        $('#imgBrowser_imgs_container').append(
            $('<div/>',{class:`imgsImgCard`,imgId:img.id}).append(
                $('<img/>',{class:`w300 h300 ofCover mxw100p`,imgId:img.id ?? '',src:img.thumbnailUrl}),
                imgInfo,imgBtns
            )
        )
    }else if(append == 'prepend'){
        $('#imgBrowser_imgs_container').prepend(
            $('<div/>',{class:`imgsImgCard`,imgId:img.id}).append(
                $('<img/>',{class:`w300 h300 ofCover mxw100p`,imgId:img.id ?? '',src:img.thumbnailUrl}),
                imgInfo,imgBtns
            )
        )
    }
}

getImgs = function(){
    draw_imgBrowser_loading_imgs();
    if(!window.imgs_getMore || window.imgs_noMore){return;}
    window.imgs_getMore = false;
    $.ajax({
        url:'/imgs',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getImgs:true,
            skip:window.imgs.length,
        },
        success:function(r){
            if(r.imgs.length == 0){
                window.imgs_noMore = true;
                $('#imgs_loadMore').addClass('none');
            }else{
                $('#imgs_loadMore').removeClass('none');
            }
            for(const key in r.imgs){
                window.imgs.push(r.imgs[key])
                appendToImgBrowser(r.imgs[key],'append')
            }
            $('.imgsImgCard_loading').remove()
        }
    }).done(function(){window.imgs_getMore = true;})
}
//events
$('html,body').on('click','.select_img',function(e){
    e.stopImmediatePropagation();
    let key_tree = $(this).attr('key_tree');
    let key = $(this).attr('key');
    show_popup(function(){
        $('.popupTitle').text(window.texts.selectImg)
        $('.popupBody').addClass('mxw800 mxh600').text('').append(
            $('<div/>',{class:'w100p-20 row alnC jstfyE m10'}).append(
                $('<button/>',{class:'btn imgs-uploadImgBtn'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.uploadImg})
                ),
            ),
            $('<div/>',{class:'row wrap alnC jstfyC',id:'imgBrowser_imgs_container',key_tree:key_tree,key:key}),

            $('<div/>',{class:'w100p-20 row alnC jstfyE m10'}).append(
                $('<a/>',{id:'imgs_loadMore',text:texts.load_more})
            )

        )
        for(const key in window.imgs){
            appendToImgBrowser(window.imgs[key],'append')
        }
        if(window.imgs.length == 0){
            getImgs();
        }
        window.is_imgBrowser_opened = true;
    });
})
$('html,body').on('click','#imgs_loadMore',function(e){
    e.stopImmediatePropagation();
    getImgs();
})
$('html,body').on('wheel','.popupBody',function(e){
    if(window.is_imgBrowser_opened  && window.imgs_getMore && !window.imgs_noMore){
        if($('.popupBody')[0].scrollHeight - $('.popupBody').scrollTop() < $('.popupBody').innerHeight() + 300){
            getImgs();
        }
    }
})
$('html,body').on('click','.imgsImgCard',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.imgsimgBtns').is(':hover')){return;}
    let keys = $('#imgBrowser_imgs_container').attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    img_src = window.imgs.find(item=>item.id == $(this).find('img').attr('imgId')).url;
    template[$('#imgBrowser_imgs_container').attr('key')] = img_src;
    new_action();
    close_popup();
})
//
$('html,body').on('click','.imgs-uploadImgBtn',function(e){
    e.stopImmediatePropagation();
    $('#imgs-uploadImg').trigger('click');
});

$('html,body').on('change','#imgs-uploadImg',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('.imgs-uploadImgBtn'))
    img = $('#imgs-uploadImg').prop('files')[0];
    if(img){
        if(img.type == 'image/png' || img.type == 'image/jpeg' || img.type == 'image/gif' || img.type == 'image/bmp'|| img.type == 'image/webp'){
            if(img.size < ( 1024*1024*10 ) ){
                data = new FormData($('#imgs-uploadImgForm')[0]);
                data.append('_token', $('meta[name="csrf-token"]').attr('content'));
                $.ajax({
                    url: '/imgs',
                    type: 'POST',
                    data:data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success:function(response){
                        $('#imgs-uploadImg').val('');
                        hideBtnLoading($('.imgs-uploadImgBtn'))
                        if(response.imgUpladStatus == 0){
                            showAlert('error',response.error,4000,true);
                        }else if(response.imgUpladStatus == 1){
                            window.imgs.push(response.img)
                            window.imgs.sort(function(a,b){
                                return b.created_at - a.created_at;
                            })
                            appendToImgBrowser(response.img,'prepend')
                            showAlert('success',response.msg,6000,true);
                        }else if(response.imgUpladStatus == 2){
                            showAlert('error',response.msg,6000,true);
                            $('#imgs-uploadImg').val('');
                        }
                    }
                });
            }else{
                showAlert('error',texts.design.imgTooBig,4000,true);
                $('#imgs-uploadImg').val('');
                hideBtnLoading($('.imgs-uploadImgBtn'))
            }
        }else{
            showAlert('error',texts.design.imgWrongType,6000,true);
            $('#imgs-uploadImg').val('');
            hideBtnLoading($('.imgs-uploadImgBtn'))
        }

    }
});
//
$('html,body').on('click','.copyImageLink',function(e){
    e.stopImmediatePropagation();
    let imgUrl = window.imgs.find(item=>item.id == $(this).attr('img')).url
    navigator.clipboard.writeText(`https://${website.url}${imgUrl}`).then(function(){
        showAlert('normal',texts.design.copyed,4000,true);
    });
});
//
$('html,body').on('click','.deleteImg',function(e){
    e.stopImmediatePropagation();
     let img = window.imgs.find(item=> item.id == $(this).attr('img'));
     $('.popupContainer').append(
        $('<div/>',{class:'popupCard2'}).append(
            $('<div/>',{class:'popupHead'}).append(
                $('<div/>',{class:'popupTitle'}),
                $('<div/>',{class:'popupCloseStyle popup2Close ico-close'}),
            ),
            $('<div/>',{class:'popupBody'}).append(
                $('<div/>',{class:'msgBox_orange'}).append(
                    $('<span/>',{class:'fs103 taC bold',text:texts.imgDeleteConfirm,}),
                    $('<img/>',{src:img.thumbnailUrl,class:'deleteImgConfirmImg'}),
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfyE m10'}).append(
                    $('<button/>',{class:'btn btn-cancel popup2Close mie-5',text:texts.cancel}),
                    $('<button/>',{id:'deleteImage-confirmBtn',img:img.id,class:'btn btn-delete'}).append(
                        $('<span/>',{class:'btnTxt',text:texts.delete}),
                        $('<span/>',{class:'btnLoading'})
                    )
                )
            )
        )
    )

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
                for(const key in window.imgs){
                    if(window.imgs[key].id == imgId){
                        window.imgs.splice(key,1);
                    }
                }
                $(`.imgsImgCard[imgId="${imgId}"]`).remove();
                $('.popup2Close').trigger('click');
            }else if(response.deleteImgStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
})
