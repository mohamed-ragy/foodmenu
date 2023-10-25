drawPopupPage_create_product = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.create_product}),
        $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').text('').addClass('mxw100p-40  p20').append(
        $('<div/>',{class:'column alnS jstfyS wFC alnsS mXa mY20 relative'}).append(
            $('<div/>',{text:texts.products.productImg,class:'c_white-8 fs08 mB3'}),
            $('<span/>',{class:'ico-edit imgCardIcon'}),
            $('<img/>',{class:'imgCard g150 w150',id:'createProduct_img',src:'./storage/imgs/cpanel/noimg.png'})
        ),
        drawInputText('','ico-edit','',texts.products.productIdentifier,'createProduct_productName','text',texts.products.productIdentifier,150,'clearVal','','',false),
        drawInputText('','ico-money','',texts.products.productPrice,'createProduct_productPrice','number',texts.products.productPrice,150,'clearVal','','',false),
        drawInputList('','ico-category_list','',texts.products.productCategory,'createProduct_productCategory',texts.products.findCategory,150,'createProduct_productCategoryList',false,'','',''),
        $('<div/>',{class:'area mY40 createProduct_names'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.productNames})
        ),
        $('<div/>',{class:'area mY40 createProduct_descriptions'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.productDescriptions})
        ),
        $('<div/>',{class:'btnContainer'}).append(
            $('<button/>',{class:'btn',id:'createProductBtn'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create})
            )
        )
    )

    addToInputList($('#createProduct_productCategoryList'),texts.products.uncategorized,'uncategorized')
    for(const key in website.categories){
        addToInputList($('#createProduct_productCategoryList'),website.categories[key].name,website.categories[key].name)
    }
    for(const key in website.languages){
        let lang = website.languages[key];
        $('.createProduct_names').append(
            drawInputText('','',lang.flag,`${texts.products.productName} (${lang.name})`,`createProduct_productName_${lang.code}`,'text',`${texts.products.productName} (${lang.name})`,150,'clearVal','','',false)
        );
        $('.createProduct_descriptions').append(
            drawTextArea('','',lang.flag,`${texts.products.productDescription} (${lang.name})`,`createproduct_description_${lang.code}`,200,'','')

        )
    }
}

//
