drawPopupPage_create_category = function(){

    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.create_category}),
        $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').text('').addClass('mxw100p-40  p20').append(
        $('<div/>',{class:'column alnS jstfyS wFC alnsS mXa mY20 relative'}).append(
            $('<div/>',{text:texts.products.categoryImg,class:'c_white-8 fs08 mB3'}),
            $('<span/>',{class:'ico-edit imgCardIcon'}),
            $('<img/>',{class:'imgCard g150 w150',id:'createCategory_img',src:'./storage/imgs/cpanel/noimg.png'})
        ),
        drawInputText('','ico-edit','',texts.products.categoryIdentifier,'createCategory_categoryName','text',texts.products.categoryIdentifier,150,'clearVal','','',false),
        $('<div/>',{class:'area mY40 createCateogry_names'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.categoryNames})
        ),
        $('<div/>',{class:'area mY40 createCateogry_descriptions'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.categoryDescriptions})
        ),
        $('<div/>',{class:'btnContainer'}).append(
            $('<button/>',{class:'btn',id:'createCategoryBtn'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create})
            )
        )
    );

    for(const key in website.languages){
        let lang = website.languages[key];
        $('.createCateogry_names').append(
            drawInputText('','',lang.flag,`${texts.products.categoryName} (${lang.name})`,`createCategory_categoryName_${lang.code}`,'text',`${texts.products.categoryName} (${lang.name})`,150,'clearVal','','',false)
        );
        $('.createCateogry_descriptions').append(
            drawTextArea('','',lang.flag,`${texts.products.categoryDescription} (${lang.name})`,`createCateogry_description_${lang.code}`,200,'','')

        )
    }
}
