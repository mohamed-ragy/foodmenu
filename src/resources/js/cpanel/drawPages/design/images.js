drawPage_images = function(){
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.images}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
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
            $('<div/>',{class:'w100p row wrap alnS jstfyC mT40',id:'imgs_imgsContainer'})
        )
    )
    resetStorageBar();
    getImgs().then(function(){
        for(const key in website.imgs){
            drawImg(website.imgs[key])
        }
    })
}
