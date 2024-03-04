drawPage_images = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'mX5 mB50'}).append(
                $('<span/>',{text:texts.design.storageSize,class:'mie-5'}),
                $('<span/>',{}).append(
                    $('<span/>',{class:'imgs-storageBar-currentStorage'}),
                    $('<span/>',{text:texts.design.mb}),
                    $('<span/>',{text:' / '}),
                    $('<span/>',{class:'imgs-storageBar-planStorage'}),
                    $('<span/>',{text:texts.design.mb}),
                ),
                $('<div/>',{class:'storageBar'}).append(
                    $('<div/>',{class:'storageBarinside'})
                )
            ),
            $('<div/>',{class:'btnContainer'}).append(
                $('<button/>',{class:'imgs-uploadImgBtn btn'}).append(
                    $('<div/>',{class:'btnTxt',text:texts.design.uploadNew}),
                    $('<div/>',{class:'btnLoading'})
                )
            ),
            $('<div/>',{class:'w100p row wrap alnSH jstfyC mT40',id:'imgs_imgsContainer'}).append(
                $('<div/>',{id:'imgs_noImgsMsg',class:'m10 none',text:texts.design.noUploads})
            ),
            drawLoadMore('imgs_loadMore','none')
        )
    )
    resetStorageBar();
    getImgs().then(function(){
        if(website.imgs.length == 0){
            $('#imgs_noImgsMsg').removeClass('none')
        }
        for(const key in website.imgs){
            drawImg(website.imgs[key])
        }
    })
}
