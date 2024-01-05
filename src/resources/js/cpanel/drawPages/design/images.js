drawPage_images = function(){
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.images}),
                $('<span/>',{class:'ico-help help-icon',helpId:'images'})
            ),
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
            $('<div/>',{class:'w100p row wrap alnSH jstfyC mT40',id:'imgs_imgsContainer'}),
            drawLoadMore('imgs_loadMore','none')
        )
    )
    resetStorageBar();
    getImgs().then(function(){
        if(website.imgs.length == 0){
            $('#imgs_imgsContainer').append(
                $('<div/>',{class:'m10',text:texts.design.noUploads})
            )
        }
        for(const key in website.imgs){
            drawImg(website.imgs[key])
        }
    })
}
