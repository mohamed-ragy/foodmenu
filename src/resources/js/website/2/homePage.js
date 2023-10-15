showHomePage = () => {
    setTimeout(()=>{$('.topProductsCardsContainer').scrollLeft(0)},1000)
    $('.homePageIntroTxt').removeClass('homePageIntroTxt_show')
    $('.homePageIntroImg').removeClass('homePageIntroImg_show')
    setTimeout(()=>{
        navMobileClose()
        $('.homePageIntroTxt').addClass('homePageIntroTxt_show')
        $('.homePageIntroImg').addClass('homePageIntroImg_show')
        $('.infoImg').removeClass('infoImg_show')
        $('.infoTxtContainer').removeClass('infoTxtContainer_show');
        $('.ourStoryImg').removeClass('ourStoryImg_show')
        $('.ourStoryTxtContainer').removeClass('ourStoryTxtContainer_show')
        if(customersReviews.length > 0){
            $('.homeCustomersReviewsImg').removeClass('homeCustomersReviewsImg_show')
            $('.homeCustomersReviewsReview').removeClass('homeCustomersReviewsReview_show')
            let homeCustomersReview;
            try{
                homeCustomersReview = customersReviews[ Math.round((customersReviews.length - 1) * Math.random()) ];
            }catch{
                homeCustomersReview = customersReviews[0];
            }
            let homeProductReview = products.find(item => item.id == homeCustomersReview.product_id);
            $('.homeCustomersReviewsImg').attr('src',homeProductReview.imgUrl)
            $('.homeCustomersReviewsProductName').attr('productId',homeProductReview.id).text(homeProductReview.nameLang).attr('href',homeProductReview.link)
            $('.homeCustomersReviewsProductAddToCartBtn').attr('productId',homeProductReview.id)
            $('.homeCustomersReviewRating').html(drawRatingStars(homeCustomersReview.rate,null))
            $('.homeCustomersReviewReview').text(homeCustomersReview.review)
            $('.homeCustomersReviewUserName').text( homeCustomersReview.userName ?? texts.reviews.guest)
            $('.homeCustomersReviewDate').text(diffTime(homeCustomersReview.posted_at))
        }
    },400)
}

$('#body').on('scroll',()=>{
    if($(window).scrollTop() >= ($('.ourStorySection').offset().top) - ($(window).height() /2 )){
        $('.ourStoryImg').addClass('ourStoryImg_show')
        $('.ourStoryTxtContainer').addClass('ourStoryTxtContainer_show')
    }
    if($(window).scrollTop() >= ($('.infoSection').offset().top) - ($(window).height() / 3)){
        $('.infoImg').addClass('infoImg_show')
        $('.infoTxtContainer').addClass('infoTxtContainer_show');

    }
})
///////////intro
$('.homePageIntroImg').attr('src',website.introImg_url)
    $('.homePageIntroOrderNowBtn').on('click',(e)=>{
        scrollToDiv($('#body'),$('.homeCategoriesSection'))
    })
    $('.homePageIntroDiscoverMoreBtn').on('click',(e)=>{
        scrollToDiv($('#body'),$('.ourStorySection'))
    })
////////homeCategories
for(const key in categories){
    category = categories[key];
    $('.homeCategoriesContainer').append(
        $('<a/>',{
            href:`/${urlLang}/${category.name}`,
            class:'homeCategoryContainer categoryLink',
            categoryId:category.id,
        }).append(
            $('<img/>',{
                class:'homeCategoryImg',
                src:category.thumbnailUrl,
                alt:category.nameLang,
            }),
            $('<div/>',{
                class:'homeCategoryTitle',
                text:category.nameLang,
            }),
            $('<div/>',{
                class:'homeCategoryDes',
                text:category.descriptionLang,
            })
        )
    )

}

//////////productList
$('.topProductsSection').on('click','.productListArrowRight',function(e){
    e.stopImmediatePropagation();
    let thisTopProductContainer = $(this).closest('.topProductsSection').find('.topProductsCardsContainer');
    thisTopProductContainer.children().each(function(){
        if($(this).position().left + $(this).width() > thisTopProductContainer.width()){
            scrollToDivLeft(thisTopProductContainer,$(this),thisTopProductContainer.width() / 2);
            return false;
        }
    })
})
$('.topProductsCardsContainer').on('swipeleft',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.topProductsSection').find('.productListArrowRight').trigger('click');
})
$('.topProductsSection').on('click','.productListArrowLeft',function(e){
    e.stopImmediatePropagation();
    let thisTopProductContainer = $(this).closest('.topProductsSection').find('.topProductsCardsContainer');
    let scrollTo;
    thisTopProductContainer.children().each(function(){
        if($(this).position().left  < 0){
            scrollTo = $(this);
        }
    })
    try{
        scrollToDivRight(thisTopProductContainer,scrollTo,thisTopProductContainer.width() / 2);
    }catch{}
})
$('.topProductsCardsContainer').on('swiperight',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.topProductsSection').find('.productListArrowLeft').trigger('click');
})
for(const key in website.trendingProducts2){
    let product = website.trendingProducts2[key];
    drawProductCard(product,$('.trendingProductsContainer'))
}
for(const key in website.topRatedProducts){
    let product = website.topRatedProducts[key];
    drawProductCard(product,$('.topRatedProductsContainer'))
}
for(const key in website.mostPopularProducts){
    let product = website.mostPopularProducts[key];
    drawProductCard(product,$('.mostPopularProductsContainer'))
}
$('.topProductsCardsContainer').find('.productCardDes').addClass('none')
$('.topProductsCardsContainer').find('.productCardIcons').addClass('productCardIcons_productList')
$('.topProductsCardsContainer').find('.productCard').addClass('productCard_productList')
$('.topProductsCardsContainer').find('.productCardStars').addClass('productCardStars_productList')
$('.topProductsCardsContainer').find('.productCardTitle').addClass('productCardTitle_productList')
$('.topProductsCardsContainer').find('.productCardImg').addClass('productCardImg_productList')
/////////////////customersReviewsSection
if(customersReviews.length > 0){
    $('#body').on('scroll',()=>{
        if($(window).scrollTop() >= ($('.customersReviewsSection').offset().top) - ($(window).height() / 2)){
            $('.homeCustomersReviewsImg').addClass('homeCustomersReviewsImg_show')
            $('.homeCustomersReviewsReview').addClass('homeCustomersReviewsReview_show')
        }
    })
}
/////////
$('.ourStoryImg').attr('src',website.ourStoryImg_url)
$('.infoImg').attr('src',website.infoImg_url)
