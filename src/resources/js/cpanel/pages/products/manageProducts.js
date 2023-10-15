require('./manageProducts/sort.js') //done
require('./manageProducts/delete.js') //done
require('./manageProducts/edit.js') //done
require('./manageProducts/productAvailabilty.js') //done
require('./manageProducts/editOptions.js') //done

drawProductsInputLists = function(){
    resetInputList($('#homePageSections-slideShowProductsList'));
    resetInputList($('#productReviews-selectProductList'));
    resetInputList($('#addOrderItem-productsListInput'));
    if(products.length == 0){
        $('#homePageSections-slideShowProductsList, #productReviews-selectProductList, #addOrderItem-productsList').text('').append(
            $('<div/>',{
                class:'m10',
            }).append(
                $('<span/>',{text:texts.products.noProducts}),
                $('<a/>',{class:'mX2 cpPage',cpPage:'Create-New-Product',text:texts.products.createNewProduct}),
            )
        )
    }else{
        addToInputList($('#productReviews-selectProductList'),texts.products.allProducts,'allproducts')
        for(const key in products){
            let product = products[key];
            addToInputList($('#homePageSections-slideShowProductsList'),product.name,product.id)
            addToInputList($('#productReviews-selectProductList'),product.name,product.id)
            addToInputList($('#addOrderItem-productsList'),product.name,product.id)
        }
    }

}
drawProductsInputLists();
$('#manageProducts-selectCategoryList').on('click','.inputListElement',function(){
    drawManageProductCards($(this).attr('key'));
    window.page.category = $(this).attr('key');
    pushHistory(false);
})
drawManageProductCards = function(action){
    let productToDraw = [];
    let moveProductIconClass = 'none';
    if(action == 'allproducts'){
        for(const key in products){productToDraw.push(products[key])}
        if(productToDraw.length == 0){
            $('#manageProducts-manageProductsContainer').text(texts.products.noProducts)
        }else{
            $('#manageProducts-manageProductsContainer').text('')
        }
        $('#manageProducts-manageProductsContainerTitle').text(texts.products.allProducts)
    }else if(action == 'uncategorized'){
        for(const key in products){
            if(products[key].category_id == null){productToDraw.push(products[key])}
        }
        if(productToDraw.length == 0){
            $('#manageProducts-manageProductsContainer').text(texts.products.noUnsortedProduct)
        }else{
            $('#manageProducts-manageProductsContainer').text('')
        }
        $('#manageProducts-manageProductsContainerTitle').text(texts.products.unsortProduct)
    }else{
        moveProductIconClass = '';
        for(const key in products){
            try{
                if(products[key].category_id == categories.find(item=> item.name == action).id){productToDraw.push(products[key])}
            }catch{
                window.page = {};
                window.page.page = 'manage_products';
                pushHistory(false)
                return;
            }
        }
        if(productToDraw.length == 0){
            $('#manageProducts-manageProductsContainer').text(texts.products.noProductsInCategory)
        }else{
            $('#manageProducts-manageProductsContainer').text('')
        }
        $('#manageProducts-manageProductsContainerTitle').text(action)
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
            <div>${product.ratings_sum} ${product.ratings_sum > 1 ? texts.products.reviews : texts.products.review}<div>
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
        let productRatingDiv = $('<div/>',{class:'w100p fs105 m5 cStar',tooltip:productRatingTooltip}).append(
            $('<span/>',{class:ratingStars.star1}),
            $('<span/>',{class:ratingStars.star2}),
            $('<span/>',{class:ratingStars.star3}),
            $('<span/>',{class:ratingStars.star4}),
            $('<span/>',{class:ratingStars.star5}),
        );
       if(product.availability == 1){productAvailability = true}else{productAvailability = false}
       if(product.category_id == null){hideUncategorizedClass  = 'none';showUncategorizedClass = ''}
        $('#manageProducts-manageProductsContainer').append(
            $('<div/>',{
                class:'manageProductCardContainer',
                productId:product.id,
                autoHelp:'144',
            }).append(
                $('<div/>',{
                    class:'manageProductCardMoveContainer '+moveProductIconClass,
                }).append(
                    $('<div/>',{class:'loading manageProductCardSortLoading mX3 none'}),
                    $('<div/>',{class:'ico-move manageProductCardMove mX5',productId:product.id,tooltip:texts.cpanel.public.swap}),
                ),
                $('<img/>',{src:product.imgUrl,class:'manageProductCardImg'}),
                $('<div/>',{class:'mX5 mT10 fs103 fs102-1024',text:website.currency+product.price}),
                $('<a/>',{class:'manageProductCardName popupPage',popupPage:'Product',product:product.name,text:product.name,tooltip:product.name}),
                productRatingDiv,
                $('<div/>',{class:'cO m5 '+showUncategorizedClass,}).append(
                    $('<span/>',{class:'ico-warning'}),
                    $('<span/>',{class:'mX3',text:texts.products.uncategorizedProduct}),
                ),
                $('<div/>',{
                    class:'manageProductCardIconsContainer',
                }).append(
                    $('<label/>',{
                        class:'checkboxlabel manageProductCardIcon m0 br0 '+hideUncategorizedClass,
                        tooltip:texts.products.productAvailability,
                    }).append(
                        $('<input/>',{
                            class:'manageProductCardProductAvailability checkbox',
                            type:'checkbox',
                            productId:product.id,
                            name:'checkbox',
                            checked:productAvailability,
                        }),
                        $('<span/>',{class:'m0-i'})
                    ),
                    $('<div/>',{class:'ico-star manageProductCardReviews cpPage manageProductCardIcon',cpPage:'product_reviews',product:product.name,tooltip:texts.products.productReview}),
                    $('<div/>',{class:'ico-list popupPage manageProductCardIcon',popupPage:'Product-Options',product:product.name,tooltip:texts.products.manageOptions}),
                    $('<div/>',{class:'ico-edit popupPage manageProductCardIcon',popupPage:'Edit-Product',product:product.name,tooltip:texts.cpanel.public.edit}),
                    $('<div/>',{class:'ico-share share manageProductCardIcon '+hideUncategorizedClass,type:'product',itemId:product.id,tooltip:texts.cpanel.public.share}),
                    $('<div/>',{class:'ico-delete manageProductCardDelete manageProductCardIcon',productId:product.id,tooltip:texts.cpanel.public.delete}),
                )
            )
        )
    }
}

drawProductPopupPage = function(productName){
    $('#productWindowContainer').removeClass('none');
    $('#productWindowNotFound').addClass('none')
    product = products.find(item=> item.name == productName);
    if (typeof(product) === "undefined"){
        // popupPageClose(false);
        $('#productWindowContainer').addClass('none');
        $('#productWindowNotFound').removeClass('none')
        return;
    }
    $('#productPage-img').attr('src',product.imgUrl)
    $('#productPage-title').text(product.name)
    $('#productPage-price').text(website.currency+product.price)
    let productRating = Math.round(parseFloat(product.rating));
    let productRatingTooltip = `
    <div>
        <div>${product.ratings_sum} ${product.ratings_sum > 1 ? texts.products.reviews : texts.products.review}<div>
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
    $('#productPage-stars').attr('tooltip',productRatingTooltip).text('').append(
        $('<span/>',{class:ratingStars.star1}),
        $('<span/>',{class:ratingStars.star2}),
        $('<span/>',{class:ratingStars.star3}),
        $('<span/>',{class:ratingStars.star4}),
        $('<span/>',{class:ratingStars.star5}),
    );
    if(product.category_id == null || product.category_id == ''){
        $('#prductPage-category').parent().addClass('none');
        $('#productPage-unsorted').removeClass('none')
    }else{
        $('#prductPage-category').parent().removeClass('none')
        $('#prductPage-category').attr('category',categories.find(item=> item.id == product.category_id).name).text(categories.find(item=> item.id == product.category_id).name)
        $('#productPage-unsorted').addClass('none')
    }
    if(product.ordered_sum == 1){
        $('#productPage-ordered').text('1 '+texts.products.time)
    }else{
        $('#productPage-ordered').text(product.ordered_sum+' '+texts.products.times)
    }
    $('#productPage-created').text('')
    $('#productPage-created').addClass('diffTimeCalc').attr('time',product.created_at)
    $('#productPage-editOptions').attr('product',product.name)
    $('#productPage-editProduct').attr('product',product.name)
    $('#productPage-ordered').attr('tooltip',`<div>${texts.products.lastUpdate} ${diffTime('midnight')}</div>`)
}
