drawPage_manage_products = function(){
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'productsListNoSave ico-warning unsaved none mie-5 mis-5 fs1 '}),
                $('<span/>',{text:texts.cpanel.menu.manage_products}),
            ),
            $('<div/>',{class:'btnContainer mB20'}).append(
                $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'create_product',text:texts.products.createNewProduct})
            ),
            $('<div/>',{class:'wFC ma'}).append(
                drawInputList('','ico-categories','',texts.products.selectCategory,'manageProducts-selectCategory',texts.products.selectCategory,200,'manageProducts-selectCategoryList',false,'zx30','',''),
            ),
            $('<div/>',{class:'mY40 pageSection_brdrB'}),
            $('<div/>',{class:'productsListContainer w100p row wrap alnS jstfyC'})
        )
    )

    addToInputList($('#manageProducts-selectCategoryList'),texts.products.uncategorized,'uncategorized')
    addToInputList($('#manageProducts-selectCategoryList'),texts.products.allproducts,'allproducts')
    for(const key in website.categories){
        let category = website.categories[key];
        addToInputList($('#manageProducts-selectCategoryList'),category.name,category.name)
    }
    if(window.page.category == 'uncategorized'){

    }
    $('#manageProducts-selectCategory').attr('key',window.page.category)
    $('#manageProducts-selectCategory').val(window.page.category == 'uncategorized' ? texts.products.uncategorized : window.page.category == 'allproducts' ? texts.products.allproducts : window.page.category)
    drawManageProductCards(window.page.category);
    manage_products_unsave_check();
}
drawManageProductCards = function(action){
    let productToDraw = [];
    let moveProductIconClass = 'none';
    if(action == 'allproducts'){
        for(const key in website.products){productToDraw.push(website.products[key])}
        if(productToDraw.length == 0){
            $('.productsListContainer').text(texts.products.noProducts)
        }else{
            $('.productsListContainer').text('')
        }
    }else if(action == 'uncategorized'){
        for(const key in website.products){
            if(website.products[key].category_id == null){productToDraw.push(website.products[key])}
        }
        if(productToDraw.length == 0){
            $('.productsListContainer').text(texts.products.noUnsortedProduct)
        }else{
            $('.productsListContainer').text('')
        }
    }else{
        moveProductIconClass = '';
        for(const key in website.products){
            try{
                if(website.products[key].category_id == website.categories.find(item=> item.name == action).id){productToDraw.push(website.products[key])}
            }catch{
                window.page = {};
                window.page.page = 'manage_products';
                pushHistory(false)
                return;
            }
        }
        if(productToDraw.length == 0){
            $('.productsListContainer').text(texts.products.noProductsInCategory)
        }else{
            $('.productsListContainer').text('')
        }
    }
    productToDraw.sort((a,b)=>{
        return parseInt(a.sort) - parseInt(b.sort)
    })
    for(const key in productToDraw){
        let product = productToDraw[key];
        let productAvailability = false;
        let showUncategorizedClass = 'none';
        let hideUncategorizedClass = '';
        let productRating = Math.round(parseFloat(product.rating));
        let productRatingTooltip = `
        <div>
            <div>${product.ratings_sum} ${product.ratings_sum ==  1 ? texts.products.review : texts.products.reviews}<div>
            <div>${texts.products.lastUpdate} ${diffTime('midnight')}</div>
        </div>
        `
        let ratingStars = {
            star1:productRating >= 1 ? 'ico-star' : 'ico-starEmpty',
            star2:productRating >= 2 ? 'ico-star' : 'ico-starEmpty',
            star3:productRating >= 3 ? 'ico-star' : 'ico-starEmpty',
            star4:productRating >= 4 ? 'ico-star' : 'ico-starEmpty',
            star5:productRating >= 5 ? 'ico-star' : 'ico-starEmpty',
        }
        let productRatingDiv = $('<div/>',{class:'w100p fs1 mX5 cStar',tooltip:productRatingTooltip}).append(
            $('<span/>',{class:ratingStars.star1}),
            $('<span/>',{class:ratingStars.star2}),
            $('<span/>',{class:ratingStars.star3}),
            $('<span/>',{class:ratingStars.star4}),
            $('<span/>',{class:ratingStars.star5}),
        );
       if(product.availability == 1){productAvailability = true}else{productAvailability = false}
       if(product.category_id == null){hideUncategorizedClass  = 'none';showUncategorizedClass = ''}

        $('.productsListContainer').append(
            $('<div/>',{
                class:'manageProductCardContainer',
                product:product.id,
                autoHelp:'',
            }).append(
                $('<div/>',{
                    class:`manageProductCardMoveContainer ${moveProductIconClass}`,
                }).append(
                    $('<div/>',{class:'manageProductCardMove ico-move fs09 zx10 cursorMove m2',tooltip:texts.cpanel.public.swap}),
                ),
                $('<img/>',{src:product.imgUrl,class:'h150 w100p mB10 ofCover pointer_events_none'}),
                $('<a/>',{class:'popupId popupPage fs1 fs09-1024 mX5 w100p-10 ellipsis bold500',popupId:'product',popupPage:'product',product:product.name,text:product.name}),
                $('<div/>',{class:'mX5 fs1 fs09-1024',text:website.currency+product.price}),
                productRatingDiv,
                $('<div/>',{class:`${showUncategorizedClass} cO mX5 fs08`}).append(
                    $('<span/>',{class:'ico-warning'}),
                    $('<span/>',{class:'mX3 ',text:texts.products.uncategorizedProduct}),
                ),
                $('<div/>',{
                    class:'row alnC jstfySB w100p brdrT1',
                }).append(
                    drawSwitchBtn('',null,'',`checkboxlabel manageProductCardIcon m0 br0 ${hideUncategorizedClass}`,'manageProductCardProductAvailability',texts.products.productAvailability,productAvailability,product.id),
                    $('<div/>',{class:'ico-product_reviews cpPage manageProductCardIcon',cpPage:'product_reviews',product:product.name,tooltip:texts.products.reviews}),
                    $('<div/>',{class:'ico-list popupPage manageProductCardIcon',popupPage:'manage_product_options',product:product.name,tooltip:texts.products.manageOptions}),
                    $('<div/>',{class:'ico-edit popupPage manageProductCardIcon',popupPage:'edit_product',product:product.name,tooltip:texts.products.editProduct}).append($('<span/>',{class:`editProductNoSave_${product.name} button_unsaved none`})),
                    $('<div/>',{class:`ico-share share manageProductCardIcon ${hideUncategorizedClass}`,type:'product',itemId:product.id,tooltip:texts.cpanel.public.share}),
                    $('<div/>',{class:'ico-delete manageProductCardDelete manageProductCardIcon',product:product.id,tooltip:texts.cpanel.public.delete}),
                ),
            )
        )
    }
    manage_products_unsave_check();

}
drawPopupPage_product = function(product_name){
    let product = website.products.find(item=>item.name == product_name);
    let productRating = Math.round(parseFloat(product.rating));
    let productRatingTooltip = `
    <div>
        <div>${product.ratings_sum} ${product.ratings_sum == 1 ? texts.products.review : texts.products.reviews}<div>
        <div>${texts.products.lastUpdate} ${diffTime('midnight')}</div>
    </div>
    `;
    let ratingStars = {
        star1:productRating >= 1 ? 'ico-star' : 'ico-starEmpty',
        star2:productRating >= 2 ? 'ico-star' : 'ico-starEmpty',
        star3:productRating >= 3 ? 'ico-star' : 'ico-starEmpty',
        star4:productRating >= 4 ? 'ico-star' : 'ico-starEmpty',
        star5:productRating >= 5 ? 'ico-star' : 'ico-starEmpty',
    }
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.product}),
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 p20').append(
        $('<img/>',{src:product.imgUrl,class:'h150 w250 ofCover br5'}),
        $('<div/>',{}).append(
            $('<span/>',{class:`ico-warning cO fs08 mie-3 ${product.category_id != null ? 'none' : ''}`,tooltip:texts.products.uncategorizedProduct}),
            $('<span/>',{class:'fs102 bold500',text:product.name}),
        ),
        $('<div/>',{class:'fs09 mB10',text:`${product.category_id === null ? texts.products.uncategorizedProduct : website.categories.find(item=>item.id == product.category_id).name}`}),
        $('<div/>',{tooltip:productRatingTooltip,class:'fs101 cStar row alnC jstfyS pointer cpPage',cpPage:'product_reviews',product:product.name}).append(
            $('<span/>',{class:ratingStars.star1}),
            $('<span/>',{class:ratingStars.star2}),
            $('<span/>',{class:ratingStars.star3}),
            $('<span/>',{class:ratingStars.star4}),
            $('<span/>',{class:ratingStars.star5}),
        ),
        $('<div/>',{class:'mY3 fs1 bold500',text:website.currency+product.price}),
        $('<div/>',{class:'authority_1 fs09',text:texts.products.created.replace(':date:',getDate(product.created_at).date.local)}),
        $('<div/>',{class:'fs09 authority_master',text:product.ordered_sum == 1 ? texts.products.productOrderedTime.replace(':sum:',product.ordered_sum) : texts.products.productOrderedTimes.replace(':sum:',product.ordered_sum)}),
        $('<div/>',{class:'fs09 authority_master',text:product.ratings_sum == 1 ? texts.products.poductReviewedTime.replace(':sum:',product.ratings_sum) : texts.products.poductReviewedTimes.replace(':sum:',product.ratings_sum)}),
        $('<div/>',{class:'btnContainer mT20 authority_1'}).append(
            $('<button/>',{class:'btn mie-5  btn-cancel popupPage',popupPage:'manage_product_options',product:product.name,text:texts.products.manageOptions}),
            $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'edit_product',product:product.name,text:texts.products.editProduct}),
        )
    )
}

//
