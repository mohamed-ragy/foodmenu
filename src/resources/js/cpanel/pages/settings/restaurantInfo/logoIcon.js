


$('html,body').on('click','#settings-websiteIconCard',function(e){
    e.stopImmediatePropagation();
    showImgBrowser(texts.settings.selectIcon,'imgBrowser-icon');
});
$('html,body').on('click','.imgBrowser-icon',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showLoading($('#settings-websiteIconLoading'))
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            websiteIcon:imgId,
        },
        success:function(response){
            hideLoading($('#settings-websiteIconLoading'))
            if(response.saveWebsiteIconStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.icon = imgUrl;
                website.icon_id = imgId;
                $('#settings-websiteIconImg').attr('src',imgUrl)
                window.guideHints.websiteIcon();
            }else if(response.saveWebsiteIconStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
});


$('html,body').on('click','#settings-websiteLogoCard',function(e){
    e.stopImmediatePropagation();
    showImgBrowser(texts.settings.selectLogo,'imgBrowser-logo');
});
$('html,body').on('click','.imgBrowser-logo',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showLoading($('#settings-websiteLogoLoading'))
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            websiteLogo:imgId,

        },
        success:function(response){
            hideLoading($('#settings-websiteLogoLoading'))
            if(response.saveWebsiteLogoStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.logo = imgUrl;
                website.logo_id = imgId;
                $('#settings-websiteLogoImg').attr('src',imgUrl)
                window.guideHints.websiteLogo();
                $('#navTitle').children().first().attr('src',imgUrl)
            }else if(response.saveWebsiteLogoStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
});
