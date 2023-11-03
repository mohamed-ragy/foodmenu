appendImgToImgBrowser = function(imgId,imgName,imgUrl,imgBrowserClass,a){
    if(a == 'a'){
        let img = imgs.find(item=> item.id == imgId);
        imgDimenstionsElem = $('<div/>',{class:'row mX5'}).append(
            $('<div/>',{class:'bold',text:texts.imgs.dimensions+':'}),
            $('<div/>',{class:'mX3',text:img.width+' x '+img.height})
        )
    }else{
        imgDimenstionsElem = '';
    }
    $('#imgsBrowserContainer').append(
        $('<div/>',{
            class:'imgsImgCard-imgBrowser ',
            imgId:imgId,
        }).append(
            $('<img/>',{
                imgId:imgId,
                src:imgUrl,
                class:'imgBrowserCardImg imgsimg '+imgBrowserClass,
            }),
            // $('<'+a+'/>',{
            //     class:'mX5 mY2 row previewImg',
            //     imgId:imgId,
            //     tooltip:imgName,
            // }).append(
            //     $('<span/>',{class:'bold',text:texts.imgs.imgName+':'}),
            //     $('<span/>',{class:'mX3 imgsImgName',text:imgName})
            // ),
            $('<div/>',{
                class:'column w100p mY5'
            }).append(
                $('<'+a+'/>',{text:imgName,class:'mX5 imgsImgName previewImg',imgId:imgId,tooltip:imgName}),
                imgDimenstionsElem
            )
        )
    )
}

showImgBrowser = function(title,imgBrowserClass){
    showPopup('imgBrowser',function(){
        $('.popupTitle').text(title)
        if(imgs.length == 0){
            $('#imgBrowserNoImgs').removeClass('none')
        }
        if(imgBrowserClass == 'imgBrowser-icon'){
            appendImgToImgBrowser('',texts.settings.templateIcon,'/storage/imgs/templates/'+website.template+'/icon.webp',imgBrowserClass,'span');
        }else if(imgBrowserClass == 'imgBrowser-logo'){
            appendImgToImgBrowser('',texts.settings.templateLogo,'/storage/imgs/templates/'+website.template+'/logo.webp',imgBrowserClass,'span');
        }else if(imgBrowserClass == 'imgBrowser-introImg'){
            appendImgToImgBrowser('template',texts.homePageSections.templateIntroImg,'/storage/imgs/templates/'+website.template+'/intro.webp',imgBrowserClass,'span');
        }else if(imgBrowserClass == 'imgBrowser-infoImg'){
            appendImgToImgBrowser('template',texts.homePageSections.templateInfoImg,'/storage/imgs/templates/'+website.template+'/info.webp',imgBrowserClass,'span');
        }else if(imgBrowserClass == 'imgBrowser-ourStoryImg'){
            appendImgToImgBrowser('template',texts.homePageSections.templateOurStoryImg,'/storage/imgs/templates/'+website.template+'/ourStory.webp',imgBrowserClass,'span');
        }else{
            appendImgToImgBrowser('',texts.imgs.noimg,'storage/imgs/cpanel/noimg.png',imgBrowserClass,'span');
        }
        for(const key in imgs){
            let img = imgs[key];
            appendImgToImgBrowser(img.id,img.name,img.thumbnailUrl,imgBrowserClass,'a');
        }
        window.imgBrowser.opened = true;
        window.imgBrowser.title = title;
        window.imgBrowser.imgBrowserClass = imgBrowserClass;
    })

}
