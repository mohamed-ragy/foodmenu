getImgs = function(){
    draw_imgBrowser_loading_imgs('storage');
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
                appendToImgBrowser_storage(r.imgs[key],'append')
            }
            $('.imgsImgCard_loading').remove()
        }
    }).done(function(){window.imgs_getMore = true;})
}
appendToImgBrowser_storage = function(img,append){
    // if(img.type == 'storage'){
        let imgInfo; let imgBtns; let photographer_elem = '';
        let imgSize = ( (img.size/1024)/1024 ).toFixed(2);
        if(img.type == 'pexels'){
            photographer_elem = $('<div/>',{class:'row mX5 fs08'}).append(
                $('<span/>',{html:`This image was taken by <a href="${img.photographer_url}" target="_blank">${img.photographer}</a> on Pexels.`})
            )
        }
        imgBtns = $('<div/>',{class:'imgsimgBtns'}).append(
            $('<a/>',{class:'imgsImgIcon ico-download tdNone hvr-tdNone',tooltip:texts.download,download:img.name+'.'+img.extension,href:img.url}),
            $('<div/>',{class:'imgsImgIcon ico-copy copyImageLink',img:img.id,tooltip:texts.copyLink}),
            $('<div/>',{class:'imgsImgIcon ico-delete deleteImg',img:img.id,tooltip:texts.delete}),
        )
        imgInfo = $('<div/>',{class:'w300 pB10 column alnS jstfyS fs08'}).append(
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
            $('#imgBrowser_imgs_container_storage').append(
                $('<div/>',{class:`imgsImgCard`,type:img.type,imgId:img.id}).append(
                    $('<img/>',{class:`w300 h300 ofContain mxw100p`,imgId:img.id ?? '',src:img.thumbnail_url}),
                    photographer_elem,
                    imgInfo,
                    imgBtns
                )
            )
        }else if(append == 'prepend'){
            $('#imgBrowser_imgs_container_storage').prepend(
                $('<div/>',{class:`imgsImgCard`,type:img.type,imgId:img.id}).append(
                    $('<img/>',{class:`w300 h300 ofContain mxw100p`,imgId:img.id ?? '',src:img.thumbnail_url}),
                    photographer_elem,
                    imgInfo,
                    imgBtns
                )
            )
        }
    // }
    // else if(img.type == 'pexels'){
        // container = $('#imgBrowser_imgs_container_pexels')
// }

}

//events

$('body').on('click','#imgs_loadMore',function(e){
    //e.stopImmediatePropagation();
    getImgs();
})
$('body').on('wheel','.popupBody',function(e){
    if(window.is_imgBrowser_opened  && window.imgs_getMore && !window.imgs_noMore && $('.tab[tab="img_browser_user_storage"]').hasClass('tab_selected')){
        if($('.popupBody')[0].scrollHeight - $('.popupBody').scrollTop() < $('.popupBody').innerHeight() + 300){
            getImgs();
        }
    }
})
//
$('body').on('click','.imgs-uploadImgBtn',function(e){
    //e.stopImmediatePropagation();
    $('#imgs-uploadImg').trigger('click');
});

$('body').on('change','#imgs-uploadImg',function(e){
    //e.stopImmediatePropagation();
    showBtnLoading($('.imgs-uploadImgBtn'))
    img = $('#imgs-uploadImg').prop('files')[0];
    if(img){
        if(img.type == 'image/png' || img.type == 'image/jpeg' || img.type == 'image/gif' || img.type == 'image/bmp'|| img.type == 'image/webp'){
            if(img.size < ( 1024*1024*10 ) ){
                data = new FormData($('#imgs-uploadImgForm')[0]);
                data.append('_token', $('meta[name="csrf-token"]').attr('content'));
                $.ajax({
                    url: '/imgs',
                    type: 'post',
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
                            appendToImgBrowser_storage(response.img,'prepend')
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

