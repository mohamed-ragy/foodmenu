drawPopupPage_edit_product = function(product_name){
    let product = website_temp.products.find(item=>item.name == product_name);
    $('#popupPageTitle').text('').append(
        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:`editProductNoSave_${product.name} ico-warning unsaved none mie-5 mis-5 fs1 `}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.edit_product}),
        $('<span/>',{class:'ico-help help-icon',helpId:'edit_product'})
    );
    $('#popupPageBody').text('').addClass('mxw100p-40  p20').append(
        $('<div/>',{class:'btnContainer'}).append(
            $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'manage_product_options',product:product.name,text:texts.products.manageOptions}),
        ),
        $('<div/>',{class:'column alnS jstfyS wFC alnsS mXa mY20 relative',id:'editProduct_img_container'}).append(
            $('<div/>',{text:texts.products.productImg,class:'c_white-8 fs08 mB3'}),
            $('<span/>',{class:'ico-edit imgCardIcon'}),
            $('<img/>',{class:'imgCard g150 w150',id:'editProduct_img',src:product.thumbnail})
        ),
        drawInputText('','ico-edit','',texts.products.productIdentifier,'editProduct_productName','text',texts.products.productIdentifier,150,'copy','',product.name,true),
        drawInputText('','ico-money','',texts.products.productPrice,'editProduct_productPrice','number',texts.products.productPrice,150,'clearVal','',product.price,false),
        drawInputList('','ico-category_list','',texts.products.productCategory,'editProduct_productCategory',texts.products.findCategory,150,'editProduct_productCategoryList',false,'','',''),
        $('<div/>',{id:'editProduct_productAvailability_container'}).append(
            drawSwitchBtn('',texts.products.productAvailability,'editProduct_productAvailability','checkboxlabel_100p mT40 ','','',product.availability==1?true:false,null),
        ),
        $('<div/>',{class:'area mY40 editProduct_names'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.productName})
        ),
        $('<div/>',{class:'area mY40 editProduct_descriptions'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.productDescription})
        ),
        drawSaveCancelBtns('editProduct_save','editProduct_cancel','mT40')
    )

    addToInputList($('#editProduct_productCategoryList'),texts.products.uncategorized,'uncategorized')
    $('#editProduct_productCategory').val(texts.products.uncategorized).attr('key','uncategorized')
    for(const key in website.categories){
        addToInputList($('#editProduct_productCategoryList'),website.categories[key].name,website.categories[key].name)
        if(product.category_id == website.categories[key].id){
            $('#editProduct_productCategory').val(website.categories[key].name).attr('key',website.categories[key].name)
        }
    }
    for(const key in website.languages){
        let lang = website.languages[key];
        $('.editProduct_names').append(
            drawInputText('','',lang.flag,`${texts.products.productName} (${lang.name})`,`editProduct_productName_${lang.code}`,'text',`${texts.products.productName} (${lang.name})`,150,'clearVal','',product.names[lang.code],false,'editProductNamesInputText')
        );
        $('.editProduct_descriptions').append(
            drawTextArea('','',lang.flag,`${texts.products.productDescription} (${lang.name})`,`editproduct_description_${lang.code}`,200,'',product.descriptions[lang.code],'editProductDescriptionsTextarea')

        )
    }
    manage_products_unsave_check();
}
