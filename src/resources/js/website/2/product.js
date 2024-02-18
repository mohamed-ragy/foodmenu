showProductPage = (productId) => {
    resetPostNewReview(productId);
    window.browsingProduct = productId;
    let product = products.find(item=> item.id == productId);
    $('#body').animate({'opacity':0},200);
    $('.productPageImg').removeClass('productPageImg_show')
    $('.productPageTxt').removeClass('productPageTxt_show')
    setTimeout(()=>{
        setTimeout(()=>{
            $('.productPageImg').addClass('productPageImg_show')
            $('.productPageTxt').addClass('productPageTxt_show')
        },600)
        $('.productPageTitle').text(product.nameLang)
        $('.productPageDes').text(product.descriptionLang)
        $('.productPageAddToCart').attr('productId',product.id)
        $('.productPagePrice').attr('productId',product.id).text(product.defaultPrice)
        $('.productPageImg').attr('src',product.imgUrl)
        $('.productPageIcons').text('')
        $('.productPageIcons').append(
            $('<span/>',{
                productName:product.name,
                tooltip:texts.other.productToChat,
                class:'fs-05 mX-2 productToChat ic-chat pointer'
            }),
            $('<a/>',{
                productId:product.id,
                tooltip:texts.other.new,
                class:`c1 productIcon a-unset fs-05 mX-2  ${productIcons(product.id).new}`,
                iconTag:'new',
                href:`/${lang}/allproducts?tag=new`
            }),
            $('<a/>',{
                productId:product.id,
                tooltip:texts.other.trending,
                class:`cE productIcon a-unset fs-05 mX-2  ${productIcons(product.id).trending}`,
                iconTag:'trending',
                href:`/${lang}/allproducts?tag=trending`,
            }),
            $('<a/>',{
                productId:product.id,
                tooltip:texts.other.popular,
                class:`cS productIcon a-unset fs-05 mX-2  ${productIcons(product.id).popular}`,
                iconTag:'popular',
                href:`/${lang}/allproducts?tag=popular`
            }),
            $('<a/>',{
                productId:product.id,
                tooltip:texts.other.topRated,
                class:`cR productIcon a-unset fs-05 mX-2  ${productIcons(product.id).topRated}`,
                iconTag:'topRated',
                href:`/${lang}/allproducts?tag=topRated`
            }),
        ),
        $('.productPageRating').html(drawRatingStars(product.rating,product.ratings_sum))
        let productPageMoreProducts = [];
        for(const key in products){
            if(products[key].category_id == product.category_id && products[key].id != product.id){
                productPageMoreProducts.push(products[key]);
            }
        }
        $('.productPageMoreProducts').text('')
        if(productPageMoreProducts.length > 0){
            $('.productPageMoreProducts').append(
                $('<div/>',{text:texts.other.moreProducts,class:'fs-2 font2'}),
                $('<div/>',{class:'productPageMoreProductsContainer w-100p row wrap alnC jstfyC'})
            )
            for(const key in productPageMoreProducts){
                drawProductCard(productPageMoreProducts[key],$('.productPageMoreProductsContainer'))
            }
        }
        ProductAvailabilityCheck(productId)

        if(website.productReviews){
            $('#product').find('.postNewReviewBtn').attr('productId',productId)
            $('#productPageReviewsContainer').text('')
            if(window.reviews[productId].length > 0){
                for(const key in window.reviews[productId]){
                    drawProductPageReview(window.reviews[productId][key])
                }
            }else{
                getproductReviews(productId,null,(newReviews)=>{
                    if(Object.keys(window.reviews[productId]).length == 0){
                        $('.productPageNoReviews').removeClass('none')
                    }else{
                        $('.productPageNoReviews').addClass('none')
                        if(newReviews.length > 0){
                            for(const key in newReviews){
                                drawProductPageReview(newReviews[key])
                            }
                        }
                    }
                })
            }
        }

    },400)

}

drawProductPageReview = (review,append='append') => {
    let reviewUserName = texts.reviews.guest;
    review.user_id != null ? reviewUserName = review.users.name : reviewUserName = texts.reviews.guest;
    if(append == 'append'){
        $('#productPageReviewsContainer').append(
            $('<div/>',{
                posted_at:review.posted_at,
                class:'productReviewContainer',
                reviewId:review.id,
            }).append(
                $('<div/>',{
                    class:'row alnC jstfyS',
                }).append(
                    $('<div/>',{class:'ic-user productPageReviewUserIcon'}),
                    $('<div/>',{}).append(
                        $('<div/>',{html:drawRatingStars(review.rate,null)}),
                        $('<div/>',{text:diffTime(review.posted_at),class:' fs-07'}),
                    )
                ),
                $('<div/>',{class:'alnsC taC fs-09 mT-20'}).append(
                    $('<span/>',{class:'ic-quote-left fs-08 mX-5'}),
                    $('<span/>',{text:review.review}),
                    $('<span/>',{class:'ic-quote-right fs-08 mX-5'}),

                ),
                $('<div/>',{text:reviewUserName,class:'mT-15 alnsE'}),
            )
        )
    }else if(append == 'prepend'){
        $('#productPageReviewsContainer').prepend(
            $('<div/>',{
                posted_at:review.posted_at,
                class:'productReviewContainer',
                reviewId:review.id,
            }).append(
                $('<div/>',{
                    class:'row alnC jstfyS',
                }).append(
                    $('<div/>',{class:'ic-user productPageReviewUserIcon'}),
                    $('<div/>',{}).append(
                        $('<div/>',{html:drawRatingStars(review.rate,null)}),
                        $('<div/>',{text:diffTime(review.posted_at),class:' fs-07'}),
                    )
                ),
                $('<div/>',{class:'alnsC taC fs-09 mT-20'}).append(
                    $('<span/>',{class:'ic-quote-left fs-08 mX-5'}),
                    $('<span/>',{text:review.review}),
                    $('<span/>',{class:'ic-quote-right fs-08 mX-5'}),

                ),
                $('<div/>',{text:reviewUserName,class:'mT-15 alnsE'}),
            )
        )
    }

}

let productPageLastScroll = 0;
$('#body').on('scroll',()=>{
    if($('#product').hasClass('none')){return;}
        if($('#productPageReviewsContainer').offset().top < 0){
            if($('#body').scrollTop() > productPageLastScroll){
                $('.postNewReviewContainer').addClass('postNewReviewContainer_hidden')
            }else{
                $('.postNewReviewContainer').removeClass('postNewReviewContainer_hidden')
            }
        }else{
            $('.postNewReviewContainer').removeClass('postNewReviewContainer_hidden')
        }
    productPageLastScroll = $('#body').scrollTop();
})
/////////////
drawCollectReview = (productId)=>{
    let product = null;
    product = products.find(item=> item.id == productId);
    if(product == null){return;}
    $('.collectReviewsContainer').append(
        $('<div/>',{
            class:'collectReviewsReviewContainer',
            productId:productId,
        }).append(
            $('<img/>',{src:product.imgUrl,class:'collectReviewsReviewImg'}),
            $('<div/>',{
                class:'collectReviewsReviewInputs',
            }).append(
                $('<div/>',{text:product.nameLang,class:'font2 mT-5 fs-105'}),
                $('<div/>',{class:'postReviewStars row alnC jstfyC fs-102 pointer'}).append(
                    $('<div/>',{class:'postReviewStar1 postReviewStar postReviewStar_noHover cR ic-star0'}),
                    $('<div/>',{class:'postReviewStar2 postReviewStar postReviewStar_noHover cR ic-star0'}),
                    $('<div/>',{class:'postReviewStar3 postReviewStar postReviewStar_noHover cR ic-star0'}),
                    $('<div/>',{class:'postReviewStar4 postReviewStar postReviewStar_noHover cR ic-star0'}),
                    $('<div/>',{class:'postReviewStar5 postReviewStar postReviewStar_noHover cR ic-star0'}),
                ),
                $('<textarea/>',{
                    class:'mY-5 w-100-20 postNewReviewReview',
                    placeholder:texts.reviews.enterYourReview,
                    rows:6,
                })
            )
        )
    )
}
drawCollectReviewsPosted = () =>{
    setTimeout(()=>{$('.collectReviewsPosted').addClass('collectReviewsPosted_show')},200)
    return $('<div/>',{class:' collectReviewsPosted',text:texts.reviews.collectReviewsPosted})

}
