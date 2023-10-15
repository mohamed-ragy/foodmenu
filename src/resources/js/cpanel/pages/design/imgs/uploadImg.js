$('.imgs-uploadImgBtn').on('click',function(){
    $('#imgs-uploadImg').trigger('click');
});

$('#imgs-uploadImg').on('change',function(e){
    showBtnLoading($('.imgs-uploadImgBtn'))
    $('#imgBrowser-uploadNewImgLoading').css('visibility','visible');
    $('#imgBrowser-uploadNewImgBtn').attr('disabled',true);
    img = $('#imgs-uploadImg').prop('files')[0];
    if(img){
        if(img.type == 'image/png' || img.type == 'image/jpeg' || img.type == 'image/gif' || img.type == 'image/bmp'|| img.type == 'image/webp'){
            if(img.size < ( 1024*1024*10 ) ){
                data = new FormData($('#imgs-uploadImgForm')[0]);
                    $.ajax({
                        url: '/imgs',
                        type: 'POST',
                        data:data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success:function(response){
                            hideBtnLoading($('.imgs-uploadImgBtn'))
                            if(response.imgUpladStatus == 0){
                                showAlert('error',response.error,4000,true);
                                $('#imgs-uploadImg').val('');
                            }else if(response.imgUpladStatus == 1){
                                imgs = response.imgs;
                                drawImgs();
                                showAlert('success',response.msg,6000,true);
                                $('#imgs-uploadImg').val('');
                                resetStorageBar();
                                if(window.imgBrowser.opened){
                                    let imgBrowserTitle = imgBrowser.title;
                                    let imgBrowserClass = imgBrowser.imgBrowserClass;
                                    closePopup();
                                    showImgBrowser(imgBrowserTitle,imgBrowserClass)
                                }
                            }else if(response.imgUpladStatus == 2){
                                showAlert('error',response.msg,6000,true);
                                $('#imgs-uploadImg').val('');
                            }
                        }
                    });
            }else{
                showAlert('error',texts.imgs.imgTooBig,4000,true);
                $('#imgs-uploadImg').val('');
                hideBtnLoading($('.imgs-uploadImgBtn'))
            }
        }else{
            showAlert('error',texts.imgs.imgWrongType,6000,true);
            $('#imgs-uploadImg').val('');
            hideBtnLoading($('.imgs-uploadImgBtn'))
        }

    }
});
