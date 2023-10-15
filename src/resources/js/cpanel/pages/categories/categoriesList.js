require('./categoriesList/edit.js'); //done
require('./categoriesList/sort.js');//done
require('./categoriesList/delete.js');//done

drawCategoryList = function(){
    resetInputList($('#manageProducts-selectCategoryList'));
    $('#categoriesList-categoriesListContainer').text('');
    if(categories.length == 0){

        $('#categoriesList-categoriesListContainer').append(
            $('<div/>',{
                class:'mY10 fs101',
            }).append(
                $('<span/>',{text:texts.categories.noCategoriesCreated}),
                $('<a/>',{class:'mX2 popupPage',popupPage:'Create-Category',text:texts.categories.createNewCategory}),
            )
        );

        // $('#manageProducts-selectCategoryList, #createNewProduct-productCategoryList').text('').append(
        //     $('<div/>',{
        //         class:'m10',
        //     }).append(
        //         $('<span/>',{text:texts.categories.noCategoriesCreated}),
        //         $('<a/>',{class:'mX2 cpPage',cpPage:'Create-New-Category',text:texts.categories.createNewCategory}),
        //     )
        // );
        // return
    }
    addToInputList($('#manageProducts-selectCategoryList'),texts.products.unsortProduct,'uncategorized')
    addToInputList($('#manageProducts-selectCategoryList'),texts.products.allProducts,'allproducts')
    addToInputList($('#createNewProduct-productCategoryList'),texts.products.unsortProduct,'uncategorized')
    addToInputList($('#editProduct-productCategoryList'),texts.products.unsortProduct,'uncategorized')
    for(const key in categories){
        let category = categories[key];
        addToInputList($('#manageProducts-selectCategoryList'),category.name,category.name)
        addToInputList($('#createNewProduct-productCategoryList'),category.name,category.name)
        addToInputList($('#editProduct-productCategoryList'),category.name,category.name)
        $('#categoriesList-categoriesListContainer').append(
            $('<div/>',{
                class:'categoryCardContainer',
                categoryId:category.id,
                autoHelp:127,
            }).append(
                $('<div/>',{
                    class:'categoryCardMoveContainer'
                }).append(
                    $('<div/>',{class:'loading categoryCardSortLoading mX3 none'}),
                    $('<div/>',{class:'ico-move categoryCardMove mX5',categoryId:category.id,tooltip:texts.cpanel.public.swap}),
                ),
                $('<img/>',{src:category.imgUrl_thumbnail,class:'categoryCardImg'}),
                $('<div/>',{class:'categoryCardName',text:category.name,tooltip:category.name}),
                $('<div/>',{
                    class:'categoryCardIconsContainer',
                }).append(
                    $('<div/>',{class:'ico-manage_products cpPage categoryCardIcon',cpPage:'manage_products',category:category.name,tooltip:texts.cpanel.menu.manage_products}),
                    $('<div/>',{class:'ico-edit popupPage categoryCardIcon',popupPage:'Edit-Category',category:category.name,tooltip:texts.cpanel.public.edit}),
                    $('<div/>',{class:'ico-share share categoryCardIcon',type:'category',itemId:category.id,tooltip:texts.cpanel.public.share}),
                    $('<div/>',{class:'ico-delete categoryCardDelete categoryCardIcon',categoryId:category.id,tooltip:texts.cpanel.public.delete}),
                )
            )
        )
    }
}
drawCategoryList();
