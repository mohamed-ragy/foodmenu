
require('./productReviews/findEvents.js');//done
require('./productReviews/delete.js');//done
let getMoreReviews = true;
let noMoreReviews = false;
setFindReviewFilters = function(clearReviews=true){
    noMoreReviews = false;
    clearReviews ? $('#productReviews-reviewsContainer').text('') : null;

    window.page.product = window.findReviewFilters.product;
    window.page.userId = window.findReviewFilters.userId;
    window.page.userName = window.findReviewFilters.userName;
    window.page.users = window.findReviewFilters.users;
    window.page.guests = window.findReviewFilters.guests;
    window.page.star1 = window.findReviewFilters.star1;
    window.page.star2 = window.findReviewFilters.star2;
    window.page.star3 = window.findReviewFilters.star3;
    window.page.star4 = window.findReviewFilters.star4;
    window.page.star5 = window.findReviewFilters.star5;

    window.history.product = window.page.product;
    window.history.userId = window.page.userId;
    window.history.userName = window.page.userName;
    window.history.users = window.page.users;
    window.history.guests = window.page.guests;
    window.history.star1 = window.page.star1;
    window.history.star2 = window.page.star2;
    window.history.star3 = window.page.star3;
    window.history.star4 = window.page.star4;
    window.history.star5 = window.page.star5;
    if(window.findReviewFilters.product == 'allproducts'){
        $('#productReviews-selectProduct').val(texts.products.allProducts).attr('key','allproducts');
    }else{
        try{
            $('#productReviews-selectProduct').val(window.findReviewFilters.product).attr('key',website.products.find(item=> item.name == window.findReviewFilters.product).id);
        }catch{
            $('#productReviews-selectProduct').val(texts.products.allProducts).attr('key','allproducts');
        }
    }
    if(window.findReviewFilters.star1 == 1){
        $('.reviewsFilterCheck[filter="1star"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    }else{
        $('.reviewsFilterCheck[filter="1star"]').children().first().removeClass('ico-check1').addClass('ico-check0')
    }
    if(window.findReviewFilters.star2 == 1){
        $('.reviewsFilterCheck[filter="2star"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    }else{
        $('.reviewsFilterCheck[filter="2star"]').children().first().removeClass('ico-check1').addClass('ico-check0')
    }
    if(window.findReviewFilters.star3 == 1){
        $('.reviewsFilterCheck[filter="3star"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    }else{
        $('.reviewsFilterCheck[filter="3star"]').children().first().removeClass('ico-check1').addClass('ico-check0')
    }
    if(window.findReviewFilters.star4 == 1){
        $('.reviewsFilterCheck[filter="4star"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    }else{
        $('.reviewsFilterCheck[filter="4star"]').children().first().removeClass('ico-check1').addClass('ico-check0')
    }
    if(window.findReviewFilters.star5 == 1){
        $('.reviewsFilterCheck[filter="5star"]').children().first().removeClass('ico-check0').addClass('ico-check1')
    }else{
        $('.reviewsFilterCheck[filter="5star"]').children().first().removeClass('ico-check1').addClass('ico-check0')
    }
    if(window.findReviewFilters.userId == null || window.findReviewFilters.userId == ''){
        $('#productReviews-selectUser').val('').attr('key',null);
        if(window.findReviewFilters.users == 1 ){
            $('.reviewsFilterCheck[filter="users"]').children().first().removeClass('ico-check0').addClass('ico-check1')
        }else{
            $('.reviewsFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0')
        }
        if(window.findReviewFilters.guests == 1 ){
            $('.reviewsFilterCheck[filter="guests"]').children().first().removeClass('ico-check0').addClass('ico-check1')
        }else{
            $('.reviewsFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0')
        }
    }else{
        $('#productReviews-selectUser').val(window.findReviewFilters.userName).attr('key',window.findReviewFilters.userId);
        window.findReviewFilters.users == 1 ? $('.reviewsFilterCheck[filter="users"]').children().first().addClass('ico-check1').removeClass('ico-check0') :
        $('.reviewsFilterCheck[filter="users"]').children().first().removeClass('ico-check1').addClass('ico-check0');

        $('#productReviews-selectUser').val(window.findReviewFilters.userName).attr('key',window.findReviewFilters.userId);
        window.findReviewFilters.guests == 1 ? $('.reviewsFilterCheck[filter="guests"]').children().first().addClass('ico-check1').removeClass('ico-check0') :
        $('.reviewsFilterCheck[filter="guests"]').children().first().removeClass('ico-check1').addClass('ico-check0');

    }

    if(
        window.findReviewFilters.userId != '' ||
        window.findReviewFilters.users == 0 ||
        window.findReviewFilters.guests == 0||
        window.findReviewFilters.star1 == 0 ||
        window.findReviewFilters.star2 == 0 ||
        window.findReviewFilters.star3 == 0 ||
        window.findReviewFilters.star4 == 0 ||
        window.findReviewFilters.star5 == 0
    ){
        if(!$('.reviewsMoreFiltersContainer').hasClass('reviewsMoreFiltersContainer_expand')){
            $('.reviewsMoreFiltersContainer').addClass('reviewsMoreFiltersContainer_expand')
            $('#reviewsMoreFilters').text(texts.products.lessFilters)
        }
    }
}

findReview = function(){
    getMoreReviews = false;

    let byRating = [];
    window.findReviewFilters.star1 == 1 ? byRating.push(1) : null;
    window.findReviewFilters.star2 == 1 ? byRating.push(2) : null;
    window.findReviewFilters.star3 == 1 ? byRating.push(3) : null;
    window.findReviewFilters.star4 == 1 ? byRating.push(4) : null;
    window.findReviewFilters.star5 == 1 ? byRating.push(5) : null;

    let findReviewsAfter = '';
    if($('#productReviews-reviewsContainer').children().length > 0){findReviewsAfter = $('#productReviews-reviewsContainer').children().last().attr('posted_at')}

    showBtnLoading($('#productReviews-findReviewsBtn'));
    $('.productReviews-reviewsContainer_loading').removeClass('none')
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            findReview:true,
            findReviewsAfter:findReviewsAfter,
            byProduct:window.findReviewFilters.product,
            byUser:window.findReviewFilters.userId,
            byUsers:window.findReviewFilters.users,
            byGuests:window.findReviewFilters.guests,
            byRating:byRating,
        },success:function(r){
            checkUseenNotifications([22],'user_id',window.findReviewFilters.userId)

            hideBtnLoading($('#productReviews-findReviewsBtn'))
            $('.productReviews-reviewsContainer_loading').addClass('none');
            if(r.reviews.length == 0){
                noMoreReviews = true;
                if($('#productReviews-reviewsContainer').children().length == 0){
                    $('#productReviews-reviewsContainer').append(
                        $('<div/>',{
                            class:'m20',text:texts.products.noReviews
                        })
                    )
                }
            }else{
                noMoreReviews = false;
                for(const key in r.reviews){
                    drawProductReview(r.reviews[key])
                }
            }
        }
    }).done(function(){
        getMoreReviews = true;
    })


}
drawProductReview = function(review){
    checkUseenNotifications([4],'product_review_id',review.id)

    let reviewStars = $('<div/>',{class:'row alnC jstfyC mX20 mB10 fs103'});
    for(i=1;i<=review.rate;i++){
        reviewStars.append(
            $('<div/>',{class:'ico-star cStar'})
        )
    }
    let userDiv = $('<div/>',{class:'row alnC jstfyC alnsE'})
    if(review.user_id == null){
        userDiv.append(
            $('<div/>',{text:texts.cpanel.public.guest,class:'fs101'})
        )
    }else{
        userDiv.append(
            $('<a/>',{popupPage:'User',userId:review.user_id,text:review.users.name,class:'fs101 popupPage'})
        )
    }
    $('#productReviews-reviewsContainer').append(
        $('<div/>',{
            class:'productReviewContainer',
            posted_at:review.posted_at,
            reviewId:review.id,
            autoHelp:'147',
        }).append(
            $('<div/>',{
                class:'row alnC jstfyC mB5',
            }).append(
                $('<img/>',{class:'br50p h20 w20 ofCover',src:website.products.find(item=> item.name == review.product_name).imgUrl_thumbnail ?? '/storage/imgs/cpanel/noimg.png'}),
                $('<a/>',{class:'mX5 fs102 popupPage',popupPage:'Product',product:review.product_name,text:review.product_name})
            ),
            reviewStars,
            $('<div/>',{class:'w100p-20 mX10 mB10',text:review.review}),
            userDiv,
            $('<div/>',{class:'diffTimeCalc alnsE',time:review.posted_at}),
            $('<button/>',{class:'btn btn-delete deleteReview',text:texts.cpanel.public.delete,reviewId:review.id})
        )
    )
}
drawProductReviewPage = function(reviewId){
    checkUseenNotifications([4],'product_review_id',reviewId)
    $('#productReviewPageContainter').text('').append(
        $('<div/>',{
            class:'productReviewContainer',
        }).append(
            $('<div/>',{
                class:'row alnC jstfyC mB10',
            }).append(
                $('<div/>',{class:'br50p h20 w20 cardLoading'}),
                $('<div/>',{class:'mX5 w150 h10br3 cardLoading'})
            ),
            $('<div/>',{class:'m5 w250 h5 br3 cardLoading'}),
            $('<div/>',{class:'m5 w150 h5 br3 cardLoading'}),
            $('<div/>',{class:'m5 w250 h5 br3 cardLoading'}),
            $('<div/>',{class:'m5 w200 h5 br3 cardLoading'}),
        )
    )

    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getReview:reviewId,
        },success:function(r){
            if(r.review == null){
                $('#productReviewPageContainter').text('').append(
                    $('<div/>',{class:'m10',text:texts.products.reviewNotFound})
                );
            }else{
                let review = r.review;
                let reviewStars = $('<div/>',{class:'row alnC jstfyC mX20 mB10 fs103'});
                for(i=1;i<=review.rate;i++){
                    reviewStars.append(
                        $('<div/>',{class:'ico-star cStar'})
                    )
                }
                let userDiv = $('<div/>',{class:'row alnC jstfyC alnsE'})
                if(review.user_id == null){
                    userDiv.append(
                        $('<div/>',{text:texts.cpanel.public.guest,class:'fs101'})
                    )
                }else{
                    userDiv.append(
                        $('<a/>',{popupPage:'User',userId:review.user_id,text:review.users.name,class:'fs101 popupPage'})
                    )
                }
                $('#productReviewPageContainter').text('').append(
                    $('<div/>',{
                        class:'productReviewContainer',
                    }).append(
                        $('<div/>',{
                            class:'row alnC jstfyC mB5',
                        }).append(
                            $('<img/>',{class:'br50p h20 w20 ofCover',src:website.products.find(item=> item.name == review.product_name).imgUrl_thumbnail ?? '/storage/imgs/cpanel/noimg.png'}),
                            $('<a/>',{class:'mX5 fs102 popupPage',popupPage:'Product',product:review.product_name,text:review.product_name})
                        ),
                        reviewStars,
                        $('<div/>',{class:'w100p-20 mX10 mB10',text:review.review}),
                        userDiv,
                        $('<div/>',{class:'diffTimeCalc alnsE',time:review.posted_at}),
                    )

                );
            }
        }
    })
}

$('#bodyPage').on('scroll',function(){
    if(window.history.state.page == 'product_reviews' && getMoreReviews && !noMoreReviews){
        if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 100){
            findReview();
        }
    }
})

$('#productReviews-findReviewsBtn').on('click',function(){

    let byProduct = website.products.find(item=> item.id == $('#productReviews-selectProduct').attr('key'));
    if(typeof(byProduct) == 'undefined'){
        window.findReviewFilters.product = 'allproducts';
    $('#productReviews-selectProduct').val(texts.products.allProducts).attr('key','allproducts')
    }else{window.findReviewFilters.product = byProduct.name}

    window.findReviewFilters.userId = $('#productReviews-selectUser').attr('key') ?? '';
    window.findReviewFilters.userName = $('#productReviews-selectUser').val() ?? '';

    $('.reviewsFilterCheck[filter="users"]').children().first().hasClass('ico-check1') ? window.findReviewFilters.users = 1 : window.findReviewFilters.users = 0;
    $('.reviewsFilterCheck[filter="guests"]').children().first().hasClass('ico-check1') ? window.findReviewFilters.guests = 1 : window.findReviewFilters.guests = 0;

    $('.reviewsFilterCheck[filter="1star"]').children().first().hasClass('ico-check1') ? window.findReviewFilters.star1 = 1 : window.findReviewFilters.star1 = 0 ;
    $('.reviewsFilterCheck[filter="2star"]').children().first().hasClass('ico-check1') ? window.findReviewFilters.star2 = 1 : window.findReviewFilters.star2 = 0 ;
    $('.reviewsFilterCheck[filter="3star"]').children().first().hasClass('ico-check1') ? window.findReviewFilters.star3 = 1 : window.findReviewFilters.star3 = 0 ;
    $('.reviewsFilterCheck[filter="4star"]').children().first().hasClass('ico-check1') ? window.findReviewFilters.star4 = 1 : window.findReviewFilters.star4 = 0 ;
    $('.reviewsFilterCheck[filter="5star"]').children().first().hasClass('ico-check1') ? window.findReviewFilters.star5 = 1 : window.findReviewFilters.star5 = 0 ;
    setFindReviewFilters();
    pushHistory(false);
    findReview();
})
