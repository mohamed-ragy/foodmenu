
appendToImgBrowser = function(img,imgBrowserClass,append){
    let imgInfo;
    if(img.id == null){
        imgInfo = $('<div/>',{class:'w200 pB10 column alnS jstfyS fs08'}).append(
            $('<div/>',{text:img.name,class:'ellipsis'})
        )
    }else{
        imgInfo = $('<div/>',{class:'w200 pB10 column alnS jstfyS fs08'}).append(
            $('<div/>',{class:'w200 ellipsis'}).append(
                $('<a/>',{text:img.name,class:'mX5 previewImg',img:img.id,tooltip:img.name}),
            ),
            $('<div/>',{class:'row mX5'}).append(
                $('<div/>',{class:'bold',text:`${texts.design.dimensions}: `}),
                $('<div/>',{class:'mX3',text:`${img.width} x ${img.height}`})
            )
        )
    }
    if(append == 'append'){
        $('#imgsBrowserContainer').append(
            $('<div/>',{class:`imgsImgCard-imgBrowser`}).append(
                $('<img/>',{class:`${imgBrowserClass} w200 h200 ofCover mxw100p`,imgId:img.id ?? '',src:img.thumbnailUrl}),
                imgInfo
            )
        )
    }else if(append == 'prepend'){
        $('#imgsBrowserContainer').prepend(
            $('<div/>',{class:`imgsImgCard-imgBrowser`}).append(
                $('<img/>',{class:`${imgBrowserClass} w200 h200 ofCover mxw100p`,imgId:img.id ?? '',src:img.thumbnailUrl}),
                imgInfo
            )
        )
    }

}

showImgBrowser = function(title,imgBrowserClass,append='append'){
    showPopup('imgBrowser',function(){
        let img = {id:null,name:'',url:'',thumbnailUrl:''};
        $('.popupTitle').text(title)
        if(imgBrowserClass == 'imgBrowser-icon'){
            img.name = texts.settings.templateIcon;
            img.url ='/storage/imgs/templates/'+website.template+'/icon.webp';
            img.thumbnailUrl ='/storage/imgs/templates/'+website.template+'/icon.webp';
            appendToImgBrowser(img,imgBrowserClass,'append')
            // appendImgToImgBrowser('',texts.settings.templateIcon,'/storage/imgs/templates/'+website.template+'/icon.webp',imgBrowserClass,'span');
        }else if(imgBrowserClass == 'imgBrowser-logo'){
            img.name = texts.settings.templateLogo;
            img.url ='/storage/imgs/templates/'+website.template+'/logo.webp';
            img.thumbnailUrl ='/storage/imgs/templates/'+website.template+'/logo.webp';
            appendToImgBrowser(img,imgBrowserClass,'append')
            // appendImgToImgBrowser('',texts.settings.templateLogo,'/storage/imgs/templates/'+website.template+'/logo.webp',imgBrowserClass,'span');
        }

        // else if(imgBrowserClass == 'imgBrowser-introImg'){
        //     appendImgToImgBrowser('template',texts.homePageSections.templateIntroImg,'/storage/imgs/templates/'+website.template+'/intro.webp',imgBrowserClass,'span');
        // }else if(imgBrowserClass == 'imgBrowser-infoImg'){
        //     appendImgToImgBrowser('template',texts.homePageSections.templateInfoImg,'/storage/imgs/templates/'+website.template+'/info.webp',imgBrowserClass,'span');
        // }else if(imgBrowserClass == 'imgBrowser-ourStoryImg'){
        //     appendImgToImgBrowser('template',texts.homePageSections.templateOurStoryImg,'/storage/imgs/templates/'+website.template+'/ourStory.webp',imgBrowserClass,'span');
        // }

        else{
            img.name = texts.design.noimg;
            img.url ='storage/imgs/cpanel/noimg.png';
            img.thumbnailUrl ='storage/imgs/cpanel/noimg.png';
            appendToImgBrowser(img,imgBrowserClass,'append')
        }
        getImgs().then(function(){
            for(const key in website.imgs){
                let img = website.imgs[key];
                appendToImgBrowser(img,imgBrowserClass,'append')
            }
            if(website.imgs.length == 0){
                $('#imgBrowserNoImgs').removeClass('none')
            }else{
                $('#imgBrowserNoImgs').addClass('none')
            }
        });
        window.imgBrowser.opened = true;
        window.imgBrowser.title = title;
        window.imgBrowser.imgBrowserClass = imgBrowserClass;
    })

}

$('html,body').on('wheel','.popupBody',function(e){
    if(window.imgBrowser.opened  && window.imgs_getMore && !window.imgs_noMore){
        if($('.popupBody')[0].scrollHeight - $('.popupBody').scrollTop() < $('.popupBody').innerHeight() + 300){
            getImgs(true).then(function(imgs){
                for(const key in imgs){
                    appendToImgBrowser(imgs[key],window.imgBrowser.imgBrowserClass,'append')
                }
            });
        }
    }
})

$('html,body').on('click','#imgBrowser_loadMore',function(e){
    e.stopImmediatePropagation();
    scrollToDiv($('.popupBody'),$('#imgsBrowserContainer').children().last())
    getImgs(true).then(function(imgs){
        for(const key in imgs){
            appendToImgBrowser(imgs[key],window.imgBrowser.imgBrowserClass,'append')
        }
    });
})
