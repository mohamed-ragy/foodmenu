


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
            iconUrl:imgUrl,
        },
        success:function(response){
            hideLoading($('#settings-websiteIconLoading'))
            if(response.saveWebsiteIconStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.icon = imgId;
                website.iconUrl = imgUrl;
                $('#settings-websiteIconImg').attr('src',imgUrl)
                if(website.icon == ''){website.icon = null}
                // window.guideHints.websiteIcon();
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
            logoUrl:imgUrl,

        },
        success:function(response){
            hideLoading($('#settings-websiteLogoLoading'))
            if(response.saveWebsiteLogoStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.logo = imgId;
                website.logoUrl = imgUrl;
                $('#settings-websiteLogoImg').attr('src',imgUrl)
                if(website.logo == ''){website.logo = null}
                // window.guideHints.websiteLogo();
                $('#navTitle').children().first().attr('src',website.logoUrl)
            }else if(response.saveWebsiteLogoStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
});
