


$('body').on('click','#settings-websiteIconCard',function(e){
    showImgBrowser(texts.settings.selectIcon,'imgBrowser-icon');
});
$('body').on('click','.imgBrowser-icon',function(e){
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


$('body').on('click','#settings-websiteLogoCard',function(e){
    showImgBrowser(texts.settings.selectLogo,'imgBrowser-logo');
});
$('body').on('click','.imgBrowser-logo',function(e){
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


$('body').on('click','#settings-websiteMetaImgCard',function(e){
    showImgBrowser(texts.settings.selectMetaImg,'imgBrowser-metaImg');
});
$('body').on('click','.imgBrowser-metaImg',function(e){
    if(!coolDownChecker()){return;}
    showLoading($('#settings-websiteMetaImgLoading'))
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            websiteMetaImg:imgId,

        },
        success:function(response){
            hideLoading($('#settings-websiteMetaImgLoading'))
            if(response.saveWebsiteMetaImgStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.metaImg = imgUrl;
                website.metaImg_id = imgId;
                $('#settings-websiteMetaImgImg').attr('src',imgUrl)
                window.guideHints.websiteMetaImg();
            }else if(response.saveWebsiteMetaImgStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
});
