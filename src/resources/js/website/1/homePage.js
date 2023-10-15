showHomePage = () => {
    setTimeout(()=>{
        navMobileClose()
        if(customersReviews.length > 0){
            $('.customersReviewsSectionTitle').removeClass('customersReviewsSectionTitle_show')
            $('.customersReviewsSectionTxt').removeClass('customersReviewsSectionTxt_show')
            let homeCustomersReview;
            try{
                homeCustomersReview = customersReviews[ Math.round((customersReviews.length - 1) * Math.random()) ];
            }catch{
                homeCustomersReview = customersReviews[0];
            }
            let homeProductReview = products.find(item => item.id == homeCustomersReview.product_id);
            $('.customersReviewsSectionTitle').text(homeProductReview.nameLang)
            $('.customersReviewsSectionTitle').attr('href',homeProductReview.link)
            $('.customersReviewsSectionTitle').attr('productId',homeProductReview.id)
            $('.customersReviewsSectionImg').attr('src',homeProductReview.imgUrl)
            $('.customersReviewsSectionDescription').text(homeProductReview.descriptionLang)
            $('.customersReviewsSectionBtn').attr('productId',homeProductReview.id)

            $('.customersReviewsSectionUserName').text( homeCustomersReview.userName ?? texts.reviews.guest)
            $('.customersReviewsSectionRating').html(drawRatingStars(homeCustomersReview.rate,null))
            $('.customersReviewsSectionReview').text(homeCustomersReview.review)
            $('.customersReviewsSectiondate').text(diffTime(homeCustomersReview.posted_at))
            ProductAvailabilityCheck(homeProductReview.id)
        }
        $('.sction2Title').removeClass('sction2Title_show')
        $('.ourStoryTxt').removeClass('ourStoryTxt_show')
        $('.sction3Title').removeClass('sction3Title_show')
        $('.infoTxt').removeClass('infoTxt_show');

        $('.topRatedSection').find('.topProductSeeMoreIcon').addClass('ic-down').removeClass('ic-up');
        $('.topRatedSection').find('.topProductSeeMoreTxt').text(texts.other.seeMore)
        $('.topRatedProductsContainer').addClass('none')

        $('.trendingSection').find('.topProductSeeMoreIcon').addClass('ic-down').removeClass('ic-up');
        $('.trendingSection').find('.topProductSeeMoreTxt').text(texts.other.seeMore)
        $('.trendingProductsContainer').addClass('none')

    },400)
}
    $('#body').on('scroll',()=>{
        if($(window).scrollTop() >= ($('.section2').offset().top) - ($(window).height() /3 )){
            $('.sction2Title').addClass('sction2Title_show')
            $('.ourStoryTxt').addClass('ourStoryTxt_show')
        }
        if($(window).scrollTop() >= ($('.section3').offset().top) - ($(window).height() / 3)){
            $('.sction3Title').addClass('sction3Title_show')
            $('.infoTxt').addClass('infoTxt_show');

        }
    })
    //////intro
    $('.section1').css('background-image',`url(${website.introImg_url})`)
    $('.homePageIntroDownicon').on('click',(e)=>{
        if($('.section2').css('display') != 'none'){
            scrollToDiv($('#body'),$('.section2'))
        }else if($('.section3').css('display') != 'none'){
            scrollToDiv($('#body'),$('.section3'))
        }else{
            scrollToDiv($('#body'),$('.section4'))
        }
    })
    ///////section2,section3
    // $('.ourStoryContainer').css('background-image',`url(${website.ourStoryImg_url})`)
    $('.ourStoryImg').prop('src',website.ourStoryImg_url)
    $('.infoImg').prop('src',website.infoImg_url)
    //////section4
    $('html,body').on('mouseenter','.homeCategoryContainer',function(e){
        // e.stopImmediatePropagation();
        $(this).find('.homeCategoryDes').addClass('homeCategoryDes_show')
        $(this).find('.homeCategoryImgBefore').addClass('homeCategoryImgBeforeHover')
    })
    $('html,body').on('mouseleave','.homeCategoryContainer',function(e){
        e.stopImmediatePropagation();
        $(this).find('.homeCategoryDes').removeClass('homeCategoryDes_show')
        $(this).find('.homeCategoryImgBefore').removeClass('homeCategoryImgBeforeHover')
    })
    // let homeCategoryClass = 'Start';
    for(const key in categories){
        // homeCategoryClass == 'Start' ? homeCategoryClass = 'End' : homeCategoryClass = 'Start';
        category = categories[key];
        $('.homeCategoriesContainer').append(
            $('<div/>',{
                class:`homeCategoryContainer `,
            }).append(
                $('<div/>',{class:'homeCategoryImgBefore'}),
                $('<div/>',{
                    class:'homeCategoryImg',
                    style:`background-image:url(${category.imgUrl})`,
                }).append(
                    $('<a/>',{
                        class:`homeCategoryTxt categoryLink`,
                        categoryId:category.id,
                        href:`/${urlLang}/${category.name}`,
                    }).append(
                        $('<div/>',{
                            class:'homeCategoryName category fs-2 font2 mB-5 taC',
                            categoryId:category.id,
                            text:category.nameLang,
                        }),
                        $('<div/>',{class:'homeCategoryDes',text:category.descriptionLang,categoryId:category.id,})
                    )
                ),


            )
        )

    }
    /////customersReviewsSection
    if(customersReviews.length > 0){
        $('#body').on('scroll',()=>{
            if($(window).scrollTop() >= ($('.customersReviewsSection').offset().top) - ($(window).height() / 3)){
                $('.customersReviewsSectionTitle').addClass('customersReviewsSectionTitle_show')
                $('.customersReviewsSectionTxt').addClass('customersReviewsSectionTxt_show')
            }
        })
    }
    ///////section5
    let topRatedProduct = website.topRatedProducts[0];
    let mostPopularProduct = website.mostPopularProducts[0];
    let trendingProduct = website.trendingProducts2[0];
    if(website.topRatedProducts.length > 0 && website.trendingProducts2.length > 0){
        if(topRatedProduct.name == trendingProduct.name && website.trendingProducts2.length > 2){
            trendingProduct = website.trendingProducts2[1]
        }else if(topRatedProduct.name == trendingProduct.name && website.topRatedProducts.length > 2){
            topRatedProduct = website.topRatedProducts[1]
        }else if(topRatedProduct.name == trendingProduct.name && website.trendingProducts2.length < 2){
            $('.trendingSection').hide();
        }
    }




    $('html,body').on('click','.topRatedProductsSeeMore',function(e){
        e.stopImmediatePropagation();
        if($(this).find('.topProductSeeMoreIcon').hasClass('ic-down')){
            $(this).find('.topProductSeeMoreIcon').removeClass('ic-down').addClass('ic-up');
            $(this).find('.topProductSeeMoreTxt').text(texts.other.seeLess)
            $('.topRatedProductsContainer').removeClass('none')
            scrollToDiv($('#body'),$('.topRatedProductsContainer'))

        }else{
            $(this).find('.topProductSeeMoreIcon').addClass('ic-down').removeClass('ic-up');
            $(this).find('.topProductSeeMoreTxt').text(texts.other.seeMore)
            $('.topRatedProductsContainer').addClass('none')
        }
    })
    if(website.topRatedProducts.length > 0){
        $('.topRatedProduct').css('background-image',`url(${topRatedProduct.imgUrl})`)
        $('.topRatedProductInfo').append(
            $('<div/>',{
                class:'column alnS jstfyS',
            }).append(
                $('<a/>',{
                    class:'font2 fs-2 productLink product topProductName',
                    text:topRatedProduct.nameLang,
                    productId:topRatedProduct.id
                }),
                $('<div/>',{
                    html:drawRatingStars(topRatedProduct.rating,topRatedProduct.ratings_sum),
                    class:'fs-105'
                }),
                $('<div/>',{
                    class:'topProductDes',
                    text:topRatedProduct.descriptionLang,
                    toolTip:topRatedProduct.descriptionLang,
                }),
                $('<button/>',{
                    text:texts.orders.addToCart,
                    class:'mY-5 addToCart alnsE',
                    productId:topRatedProduct.id,
                })
            )
        )
        ProductAvailabilityCheck(topRatedProduct.id)
    }
    for(const key in website.topRatedProducts){
        let product = website.topRatedProducts[key];
        if(product.name != topRatedProduct.name){
            drawProductCard(product,$('.topRatedProductsContainer'))
        }
    }

    $('html,body').on('click','.trendingProductSeeMore',function(e){
        e.stopImmediatePropagation();
        if($(this).find('.topProductSeeMoreIcon').hasClass('ic-down')){
            $(this).find('.topProductSeeMoreIcon').removeClass('ic-down').addClass('ic-up');
            $(this).find('.topProductSeeMoreTxt').text(texts.other.seeLess)
            $('.trendingProductsContainer').removeClass('none')
            scrollToDiv($('#body'),$('.trendingProductsContainer'))
        }else{
            $(this).find('.topProductSeeMoreIcon').addClass('ic-down').removeClass('ic-up');
            $(this).find('.topProductSeeMoreTxt').text(texts.other.seeMore)
            $('.trendingProductsContainer').addClass('none')
        }
    })
    if(website.trendingProducts2.length > 0){
        $('.trendingProduct').css('background-image',`url(${trendingProduct.imgUrl})`)
        $('.trendingProductInfo').append(
            $('<div/>',{
                class:'column alnS jstfyS',
            }).append(
                $('<a/>',{
                    class:'font2 fs-2 productLink product topProductName',
                    text:topRatedProduct.nameLang,
                    productId:trendingProduct.id
                }),
                $('<div/>',{
                    html:drawRatingStars(trendingProduct.rating,trendingProduct.ratings_sum),
                    class:'fs-105'
                }),
                $('<div/>',{
                    class:'topProductDes',
                    text:trendingProduct.descriptionLang,
                    toolTip:trendingProduct.descriptionLang,
                }),
                $('<button/>',{
                    text:texts.orders.addToCart,
                    class:'mY-5 addToCart alnsE',
                    productId:trendingProduct.id,
                })
            )
        )
        ProductAvailabilityCheck(trendingProduct.id)
    }
    for(const key in website.trendingProducts2){
        let product = website.trendingProducts2[key];
        if(product.name != trendingProduct.name){
            drawProductCard(product,$('.trendingProductsContainer'))
        }
    }

///////////gallery
for(const key in website.galleryImgs){
    $('.galleryImgsContainer').append(
        $('<div/>',{
            class:'galleryImgContainer',
            imgSort:key,
        }).append(
            $('<img/>',{
                class:'galleryImg',
                src:website.galleryImgs[key].url
            })
        )
    )
}
let currentGalleryImg = 0;
$('.galleryFullScreenClose').on('click',function(){
    $('.galleryFullScreenImg').attr('src','');
    $('.galleryFullScreen').addClass('none');

})
$('html, body').on('click','.galleryImgContainer',function(e){
    e.stopImmediatePropagation();
    $('.galleryFullScreen').removeClass('none');
    $('.galleryFullScreenImg').attr('src',website.galleryImgs[$(this).attr('imgSort')].url);
    currentGalleryImg = parseInt($(this).attr('imgSort'));
})
$('.galleryFullScreenArrowRight').on('click',function(){
    $('.galleryFullScreenImg').animate({'opacity':0},100)
    setTimeout(function(){
        $('.galleryFullScreenImg').attr('src','');
        if(currentGalleryImg + 1 == website.galleryImgs.length){
            $('.galleryFullScreenImg').attr('src',website.galleryImgs[0].url);
            currentGalleryImg = 0;
        }else{
            $('.galleryFullScreenImg').attr('src',website.galleryImgs[currentGalleryImg+1].url);
            currentGalleryImg = currentGalleryImg + 1;
        }
        setTimeout(function(){
            $('.galleryFullScreenImg').animate({'opacity':1},300)
        },200)
    },100)
})
$('.galleryFullScreenArrowLeft').on('click',function(){
    $('.galleryFullScreenImg').animate({'opacity':0},100)
    setTimeout(function(){
        $('.galleryFullScreenImg').attr('src','');
        if(currentGalleryImg == 0){
            $('.galleryFullScreenImg').attr('src',website.galleryImgs[website.galleryImgs.length - 1].url);
            currentGalleryImg = website.galleryImgs.length - 1;
        }else{
            $('.galleryFullScreenImg').attr('src',website.galleryImgs[currentGalleryImg-1].url);
            currentGalleryImg = currentGalleryImg - 1;
        }
        setTimeout(function(){
            $('.galleryFullScreenImg').animate({'opacity':1},300)
        },200)
    },100)
})
