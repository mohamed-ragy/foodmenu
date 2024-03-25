calcRating = (rating,ratings_sum) => {
    let tooltip;
    if(ratings_sum == null){
        tooltip = '';

    }
    else if(ratings_sum > 0){
        tooltip = `
        <div>
            <div>${ratings_sum} ${ratings_sum > 1 ? texts.reviews.reviews : texts.reviews.review}<div>
            <div>${texts.reviews.lastUpdate} ${diffTime('midnight')}</div>
        </div>
    `
    }
    rating = Math.round(parseFloat(rating))


    return {
        star1:rating >= 1 ? 'ic-star1' : 'ic-star0',
        star2:rating >= 2 ? 'ic-star1' : 'ic-star0',
        star3:rating >= 3 ? 'ic-star1' : 'ic-star0',
        star4:rating >= 4 ? 'ic-star1' : 'ic-star0',
        star5:rating >= 5 ? 'ic-star1' : 'ic-star0',
        tooltip:tooltip,
    }
}

drawRatingStars = (rating,ratings_sum) => {
    if(!website.productReviews){return''}
    let ratingData = calcRating(rating,ratings_sum);
    if(ratings_sum == 0){
        return '';
    }
    return `
        <span tooltip="${ratingData.tooltip}">
            <span tooltip="${ratingData.tooltip}" class="cR ${ratingData.star1}"></span>
            <span tooltip="${ratingData.tooltip}" class="cR ${ratingData.star2}"></span>
            <span tooltip="${ratingData.tooltip}" class="cR ${ratingData.star3}"></span>
            <span tooltip="${ratingData.tooltip}" class="cR ${ratingData.star4}"></span>
            <span tooltip="${ratingData.tooltip}" class="cR ${ratingData.star5}"></span>
        </span>
    `;
}

getproductReviews = (productId,getProductReviewAfter,callback = ()=>{}) => {
    let product = products.find(item => item.id == productId);
    if(!product.getReviews || product.noMoreReviews){
        // callback();
        return;
    }else{
        products.find(item => item.id == productId).getReviews = false;
        showLoading($('#productReviewsLoading'),false)
        $.ajax({
            url:'/website/reviews',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getProductReview:true,
                productId:productId,
                getProductReviewAfter:getProductReviewAfter
            },success:function(response){
                hideLoading($('#productReviewsLoading'),false)
                if(response.reviews == 0){
                    products.find(item => item.id == productId).noMoreReviews = true;
                }else{
                    for(const key in response.reviews){
                        window.reviews[productId].push(response.reviews[key]);
                    }
                    window.reviews[productId].sort(function(a,b){
                        return Date.parse(b.posted_at) - Date.parse(a.posted_at);
                    })
                }
                callback(response.reviews);
            }
        }).done(function(){
            products.find(item => item.id == productId).getReviews = true;
        })
    }
}
$('#body').on('scroll',(e)=>{
    if($('#product').hasClass('none')){return;}
    if(!website.productReviews){return;}
    if($(window).scrollTop() > parseFloat($('#productPageReviewsContainer').offset().top) + parseFloat($('#productPageReviewsContainer').height()) - ($(window).height())
        && products.find(item=> item.id == window.browsingProduct).getReviews
        && !products.find(item=> item.id == window.browsingProduct).noMoreReviews
    ){
        getproductReviews(window.browsingProduct,$('#productPageReviewsContainer').children().last().attr('posted_at'),(newReviews)=>{
            if(newReviews.length > 0){
                for(const key in newReviews){
                    drawProductPageReview(newReviews[key])
                }
            }
        })
    }
})
if(!website.productReviews){
    $('.productPageReviews').hide();
    $('.productPageReviewsTitle').hide();
}
///////////////

collectReviews = () => {
    if(website.collectReviews && website.lastCompleteOrder != null){
        for(const key in website.lastCompleteOrder.order_items){
            drawCollectReview(website.lastCompleteOrder.order_items[key].product_id)
        }
        showPopup($('#collectReviews-popup'))
    }
}

///////////////
resetPostNewReview = (productId) => {
    $('.postReviewStars').children().removeClass('ic-star1 postReviewStar_noHover').addClass('ic-star0');
    $('.postNewReviewReview').val('');
    $('.postNewReviewResponse').text('').addClass('vH').removeClass('cE cS');
    $('.postNewReviewInput').removeClass('inputError');
}
$('html,body').on('focus','.postNewReviewReview',function(e){
    e.stopImmediatePropagation();
    userStatus({
        'status': 'user_writeReview',
        'product':products.find(item=> item.id == $('.postNewReviewBtn').attr('productId')).name
    })
})
$('html,body').on('focusout','.postNewReviewReview',function(e){
    e.stopImmediatePropagation();
    userStatusBrowsingPage();
});
$('html,body').on('click','.postNewReviewBtn',function(e){
    e.stopImmediatePropagation();
    if(!loginCheck && !website.guestReviews){
        showPopup($('#login-popup'),$('#login-email'),function(){
            $('.loginInput').removeClass('inputError')
            $('#loginFail').addClass('vH')
            $('#signupSuccess').addClass('vH')
            $('#loginWarning').text(texts.reviews.loginRequiredToReview).removeClass('vH')
        })
        return;
    }
    let container = $(this).parent();
    let reviewRate = 0;
    let productId = $(this).attr('productId');
    container.find('.postNewReviewInput').removeClass('inputError')
    // let reviewValidation = false;
    container.find('.postReviewStars').children().each(function(){
        $(this).hasClass('ic-star1') ? reviewRate = reviewRate + 1: null;
    })
    if(reviewRate == 0 ){
        container.find('.postNewReviewResponse').text(texts.reviews.reviewRateRequired).removeClass('vH cS').addClass('cE')
    }else if(container.find('.postNewReviewReview').val() == ''){
        container.find('.postNewReviewResponse').text(texts.reviews.reviewReviewRequired).removeClass('vH cS').addClass('cE')
        container.find('.postNewReviewReview').select()
        container.find('.postNewReviewReview').addClass('inputError')
    }else if(container.find('.postNewReviewReview').val() != '' && reviewRate > 0){
        container.find('.postNewReviewResponse').text('').addClass('vH').removeClass('cE');
        container.find('.postNewReviewInput').removeClass('inputError');
        showLoading($('.postNewReviewLoading'))

        $.ajax({
            url:'/website/reviews',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                postNewReview:true,
                productId:productId,
                productName:products.find(item=>item.id == productId).name,
                reviewRate:reviewRate,
                reviewReview:container.find('.postNewReviewReview').val(),
            },success:function(response){
                hideLoading($('.postNewReviewLoading'))
                if(response.postReviewStatus == 1){
                    container.find('.postNewReviewResponse').text(texts.reviews.postReviewPosted).removeClass('vH cE cS').addClass('cS');
                    if(!$('#product').hasClass('none') && window.browsingProduct == productId){
                        response.review.users = user;
                        drawProductPageReview(response.review,'prepend')
                        $('.postReviewStars').children().removeClass('ic-star1 postReviewStar_noHover').addClass('ic-star0');
                        $('.postNewReviewReview').val('');
                        $('.postNewReviewInput').removeClass('inputError');
                        scrollToDiv($('#body'),$('#productPageReviewsContainer'),500,100,function(){
                            $('.postNewReviewContainer').addClass('postNewReviewContainer_hidden')
                        })
                        window.reviews[productId].push(response.review);
                        window.reviews[productId].sort(function(a,b){
                            return Date.parse(b.posted_at) - Date.parse(a.posted_at);
                        })
                    }
                }else if(response.postReviewStatus == 0){
                    container.find('.postNewReviewResponse').text(texts.reviews.postReviewFails).removeClass('vH cE cS').addClass('cE');
                }
            }
        })
    }
})
$('html,body').on('mouseleave','.postReviewStars',function(e){
    e.stopImmediatePropagation();
    $(this).children().each(function(){
        if($(this).hasClass('ic-star0')){
            $(this).addClass('postReviewStar_noHover')
        }

    })
})
$('html,body').on('mouseover','.postReviewStar1',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar2').addClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar3').addClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar4').addClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover')
})
$('html,body').on('mouseover','.postReviewStar2',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar2').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar3').addClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar4').addClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover')
})
$('html,body').on('mouseover','.postReviewStar3',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar2').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar3').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar4').addClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover')

})
$('html,body').on('mouseover','.postReviewStar4',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar2').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar3').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar4').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover')
})
$('html,body').on('mouseover','.postReviewStar5',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar2').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar3').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar4').removeClass('postReviewStar_noHover')
    $(this).parent().find('.postReviewStar5').removeClass('postReviewStar_noHover')
})
$('html,body').on('click','.postReviewStar1',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar2').addClass('postReviewStar_noHover  ic-star0').removeClass('ic-star1')
    $(this).parent().find('.postReviewStar3').addClass('postReviewStar_noHover  ic-star0').removeClass('ic-star1')
    $(this).parent().find('.postReviewStar4').addClass('postReviewStar_noHover  ic-star0').removeClass('ic-star1')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover  ic-star0').removeClass('ic-star1')
})
$('html,body').on('click','.postReviewStar2',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar2').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar3').addClass('postReviewStar_noHover ic-star0').removeClass('ic-star1')
    $(this).parent().find('.postReviewStar4').addClass('postReviewStar_noHover ic-star0').removeClass('ic-star1')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover ic-star0').removeClass('ic-star1')
})
$('html,body').on('click','.postReviewStar3',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar2').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar3').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar4').addClass('postReviewStar_noHover ic-star0').removeClass('ic-star1')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover ic-star0').removeClass('ic-star1')

})
$('html,body').on('click','.postReviewStar4',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar2').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar3').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar4').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar5').addClass('postReviewStar_noHover ic-star0').removeClass('ic-star1')
})
$('html,body').on('click','.postReviewStar5',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.postReviewStar1').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar2').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar3').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar4').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
    $(this).parent().find('.postReviewStar5').removeClass('ic-star0 postReviewStar_noHover').addClass('ic-star1')
})
////////////collect revies
$('#collectReviews-Btn').on('click',()=>{
    showLoading($('#collectReviews-Loading'))
    $('.collectReviewsError').addClass('none')
    let collectReviewsToPost = [];
    $('.collectReviewsReviewContainer').each(function(){
        let reviewRate = 0;
        $(this).find('.postReviewStars').children().each(function(){
            $(this).hasClass('ic-star1') ? reviewRate = reviewRate + 1: null;
        })
        if(reviewRate > 0 && $(this).find('.postNewReviewReview').val() != '' ){
            collectReviewsToPost.push({
                productId:$(this).attr('productId'),
                productName:products.find(item=> item.id == $(this).attr('productId')).name,
                reviewRate:reviewRate,
                reviewReview:$(this).find('.postNewReviewReview').val(),
            })
        }
    })
    if(collectReviewsToPost.length > 0){
        $.ajax({
            url:'/website/reviews',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                postCollectReviews:collectReviewsToPost,
            },success:function(response){
                hideLoading($('#collectReviews-Loading'))
                if(response.postCollectReviewsStats == 1){
                    $('.collectReviewsTitle').addClass('none');
                    $('#collectReviews-Btn').addClass('none');
                    $('.collectReviewsContainer').text('');
                    $('.collectReviewsContainer').append(
                        drawCollectReviewsPosted()
                    );
                    for(const key in response.reviews){
                        let review = response.reviews[key];
                        if(!$('#product').hasClass('none') && window.browsingProduct == response.reviews[key].product_id){
                            window.reviews[response.reviews[key].product_id].push(review);
                            window.reviews[response.reviews[key].product_id].sort(function(a,b){
                                return Date.parse(b.posted_at) - Date.parse(a.posted_at);
                            })
                            drawProductPageReview(response.reviews[key],'prepend')
                        }
                    }
                }else if(response.postCollectReviewsStats == 0){
                    $('#collectReviews-popup').scrollTop(0)
                    $('.collectReviewsError').removeClass('none').text(texts.reviews.postReviewFails)
                }
            }
        })
    }else if(collectReviewsToPost == 0){
        hideLoading($('#collectReviews-Loading'))
        $('#collectReviews-popup').scrollTop(0)
        $('.collectReviewsError').removeClass('none').text(texts.reviews.collectReviewsReviewRequired)
    }
})
