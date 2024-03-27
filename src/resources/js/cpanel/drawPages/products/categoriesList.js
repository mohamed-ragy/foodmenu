drawPage_category_list = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'btnContainer mB40'}).append(
                $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'create_category',text:texts.products.createCategory})
            ),
            $('<div/>',{class:'categoriesListContainer w100p row wrap alnS jstfyC',autoHelp:'categories_list'})
        )
    )
    drawCategoryList();
}
drawCategoryList = function(){
    $('.categoriesListContainer').text('')
    if(website.categories.length == 0){
        $('.categoriesListContainer').append(
            $('<div/>',{
                class:'m10 fs1 taS w100p-20',
            }).append(
                $('<span/>',{text:texts.products.noCategoriesCreated}),
            )
        );
    }else{
        for(const key in website.categories){
            let category = website.categories[key];
            $('.categoriesListContainer').append(
                $('<div/>',{
                    class:'categoryCardContainer',
                    category:category.id,
                    autoHelp:'',
                }).append(
                    $('<div/>',{
                        class:'categoryCardMoveContainer'
                    }).append(
                        $('<div/>',{class:'categoryCardMove ico-move fs09 zx10 cursorMove m2',tooltip:texts.cpanel.public.swap}),
                    ),
                    $('<img/>',{src:category.img,class:'h150 w100p ofCover pointer_events_none'}),
                    $('<a/>',{class:'popupId popupPage fs1 fs09-1024 mX5 mY10 w100p-10 ellipsis bold500',popupId:'category',popupPage:'category',category:category.name,text:category.name}),
                    $('<div/>',{
                        class:'row alnC jstfySB w100p brdrT1',
                    }).append(
                        $('<div/>',{class:'ico-manage_products cpPage categoryCardIcon',cpPage:'manage_products',category:category.name,tooltip:texts.cpanel.menu.manage_products}),
                        $('<div/>',{class:'ico-edit popupPage categoryCardIcon relative',popupPage:'edit_category',category:category.name,tooltip:texts.cpanel.public.edit}).append($('<span/>',{class:`editCategoryNoSave_${category.name} button_unsaved none`})),
                        $('<div/>',{class:'ico-share share categoryCardIcon',type:'category',itemId:category.id,tooltip:texts.cpanel.public.share}),
                        $('<div/>',{class:'ico-delete categoryCardDelete categoryCardIcon',category:category.id,tooltip:texts.cpanel.public.delete}),
                    )
                )
            )
        }
    }
    category_list_unsave_check();
}
drawPopupPage_category = function(categroyName){
    let category = website.categories.find(item=>item.name == categroyName)
    let catProductsSum = 0;
    for(const key in website.products){
        if(website.products[key].category_id == category.id){
            catProductsSum++;
        }
    }
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.category}),
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 p20').append(
        $('<img/>',{src:category.img,class:'h150 w250 ofCover br5'}),
        $('<div/>',{class:'fs102 bold500',text:category.name}),
        $('<div/>',{class:'authority_1 fs08',text:texts.products.created.replace(':date:',getDate(category.created_at).date.local)}),
        $('<div/>',{class:'authority_1 fs08',text:texts.products.containsProducts.replace(':num:',catProductsSum)}),
        $('<ol/>',{class:'categoryPopupPageProducts m0 pis-25'})
    )
    for(const key in website.products){
        if(website.products[key].category_id == category.id){
            $('.categoryPopupPageProducts').append(
                $('<li/>',{class:'fs08'}).append(
                    $('<a/>',{class:'popupPage popupId',product:website.products[key].name,popupPage:'product',popupId:'product',text:website.products[key].name})
                )
            )
        }
    }
}
drawPopupPage_edit_category = function(categroyName){
    let category = website_temp.categories.find(item=>item.name == categroyName)
    $('#popupPageTitle').text('').append(
        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:`editCategoryNoSave_${category.name} ico-warning unsaved none mie-5 mis-5 fs1 `}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.edit_category}),
        $('<span/>',{class:'ico-help help-icon',helpId:'edit_product_category'})
    );
    $('#popupPageBody').text('').addClass('mxw100p-40  p20').append(
        $('<div/>',{class:'column alnS jstfyS wFC alnsS mXa mY20 relative',id:'editCategory_img_container'}).append(
            $('<div/>',{text:texts.products.categoryImg,class:'c_white-8 fs08 mB3'}),
            $('<span/>',{class:'ico-edit imgCardIcon'}),
            $('<img/>',{class:'imgCard g150 w150',imgId:category.img_id ?? '',id:'editCategory_img',src:category.img})
        ),
        drawInputText('','ico-edit','',texts.products.categoryIdentifier,'editCategory_categoryName','text',texts.products.categoryIdentifier,150,'copy','',category.name,true),
        $('<div/>',{class:'area mY40 editCategory_names'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.categoryNames})
        ),
        $('<div/>',{class:'area mY40 editCategory_descriptions'}).append(
            $('<div/>',{class:'areaTitle',text:texts.products.categoryDescriptions})
        ),
        drawSaveCancelBtns('editCategory_saveBtn','editCategory_cancelBtn','mT40',category.id)

    );
    for(const key in website.languages){
        let lang = website.languages[key];
        $('.editCategory_names').append(
            drawInputText('','',lang.flag,`${texts.products.categoryName} (${lang.name})`,`editCategory_categoryName_${lang.code}`,'text',`${texts.products.categoryName} (${lang.name})`,150,'clearVal','',category.names[lang.code],false,'editCategoryNamesInputText')
        );
        $('.editCategory_descriptions').append(
            drawTextArea('','',lang.flag,`${texts.products.categoryDescription} (${lang.name})`,`editCateogry_description_${lang.code}`,200,'',category.descriptions[lang.code],'editCateogryDescriptionsTextarea')

        )
    }
    category_list_unsave_check();
}
//
