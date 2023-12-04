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
                            website.imgs.push(response.img)
                            website.imgs.sort(function(a,b){
                                return b.created_at - a.created_at;
                            })
                            if(website.imgs_storage != null){
                                website.imgs_storage = parseFloat(website.imgs_storage) + parseFloat(response.img.size);
                                resetStorageBar();
                            }

                            if(window.history.state.page == 'images'){
                                drawImg(response.img,'prepend');
                            }

                            if(window.imgBrowser.opened){
                                appendToImgBrowser(response.img,window.imgBrowser.imgBrowserClass,'prepend')
                            }

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
