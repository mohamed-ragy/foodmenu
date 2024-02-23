
require('./productReviews/delete.js');//done//
require('./productReviews/filters.js');//done//


/////
$('html,body').on('click','#productReviews_findReviewsBtn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#productReviews_findReviewsBtn'))
    window.noMoreProductReviews = false;
    window.getProductReviewsSkip = 0;
    $('#productReviewsContainer').text('')
    $('#productReviews_selectProduct').attr('key') == null || $('#productReviews_selectProduct').attr('key') == '' ? $('#productReviews_selectProduct').attr('key','allproducts').val(texts.products.allproducts):null;
    $('#productReviews_selectProduct').attr('key') == null || $('#productReviews_selectProduct').attr('key') == '' ? window.page.product = 'allproduct' : window.page.product = $('#productReviews_selectProduct').attr('key');

    if( $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').hasClass('ico-check1')){
        if($('#productReviews_findUser').attr('key') == null || $('#productReviews_findUser').attr('key') == ''){
            $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').removeClass('ico-check1').addClass('ico-check0')
            $('.productReviews_findUserContainer').addClass('none');
            $('#productReviews_findUser').attr('key',null).val('');
            $('.productReviewsBy[productReviewsBy="users"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1')
            $('.productReviewsBy[productReviewsBy="guests"]').find('.productReviewsByCheck').removeClass('ico-check0').addClass('ico-check1')
        }
    }
    $('.productReviewsBy[productReviewsBy="users"]').find('.productReviewsByCheck').hasClass('ico-check1') ? window.page.byUsers = 1 : window.page.byUsers = 0;
    $('.productReviewsBy[productReviewsBy="guests"]').find('.productReviewsByCheck').hasClass('ico-check1') ? window.page.byGuests = 1 : window.page.byGuests = 0;
    $('.productReviewsBy[productReviewsBy="user"]').find('.productReviewsByCheck').hasClass('ico-check1') ? window.page.user = $('#productReviews_findUser').attr('key') : window.page.user = '';


    $('.productReviewsWith[productReviewsWith="star1"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? window.page.star1 = 1 : window.page.star1 = 0;
    $('.productReviewsWith[productReviewsWith="star2"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? window.page.star2 = 1 : window.page.star2 = 0;
    $('.productReviewsWith[productReviewsWith="star3"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? window.page.star3 = 1 : window.page.star3 = 0;
    $('.productReviewsWith[productReviewsWith="star4"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? window.page.star4 = 1 : window.page.star4 = 0;
    $('.productReviewsWith[productReviewsWith="star5"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? window.page.star5 = 1 : window.page.star5 = 0;

    pushHistory(false);

    getProductReviews();


})
getProductReviews = function(){
    $('#productReviewsContainer_loading').removeClass('none')
    let byRating = [];
    $('.productReviewsWith[productReviewsWith="star1"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? byRating.push('1') : null;
    $('.productReviewsWith[productReviewsWith="star2"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? byRating.push('2') : null;
    $('.productReviewsWith[productReviewsWith="star3"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? byRating.push('3') : null;
    $('.productReviewsWith[productReviewsWith="star4"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? byRating.push('4') : null;
    $('.productReviewsWith[productReviewsWith="star5"]').find('.productReviewsWithCheck').hasClass('ico-check1') ? byRating.push('5') : null;
    window.getMoreProductsReviews = false;
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            findReviews:true,
            byProduct:$('#productReviews_selectProduct').attr('key'),
            byUser:$('#productReviews_findUser').attr('key'),
            byUsers:$('.productReviewsBy[productReviewsBy="users"]').find('.productReviewsByCheck').hasClass('ico-check1') ? 1 : 0,
            byGuests:$('.productReviewsBy[productReviewsBy="guests"]').find('.productReviewsByCheck').hasClass('ico-check1') ? 1 : 0,
            byRating:byRating,
            skip:window.getProductReviewsSkip,
        },success:function(r){
            if(window.page.user != ''){
                checkUseenNotifications(['review.posted_survey'],'user_id',window.page.user)
            }
            window.getProductReviewsSkip = r.reviews.length + window.getProductReviewsSkip;
            $('#productReviewsContainer_loading').addClass('none')
            hideBtnLoading($('#productReviews_findReviewsBtn'));
            if(r.reviews == 0 ){
                window.noMoreProductReviews = true;
            }
            for(const key in r.reviews){
                $('#productReviewsContainer').append(
                    drawProductReview(r.reviews[key],true)
                )
            }
            if($('#productReviewsContainer').children().length == 0){
                $('#productReviewsContainer').text(texts.products.noReviews)
            }


        }
    }).done(function(){
        window.getMoreProductsReviews = true;
    })
}
drawProductReview = function(review,deleteIcon){
    if(review == null){popupPageClose(false);return;}
    checkUseenNotifications(['review.posted'],'product_review_id',review.id)
    let reviewCheck = window.product_reviews.find(item=>item.id == review.id);
    if(typeof(reviewCheck) === 'undefined'){
        window.product_reviews.push(review);
    }
    let productImg = './storage/imgs/cpanel/noimg.png';
    let product = website.products.find(item=>item.name == review.product_name);
    if(typeof(product) !== 'undefined'){
        productImg = product.thumbnail
    }

    let reviewStars = $('<div/>',{class:'row alnC jstfyS'});
    for(i=1;i<=review.rate;i++){
        reviewStars.append(
            $('<div/>',{class:'ico-star cStar'})
        )
    }
    for(i=(5-review.rate);i>=1;i--){
        reviewStars.append(
            $('<div/>',{class:'ico-starEmpty cStar'})
        )
    }

    let reviewUser;
    if(review.user_id == null){
        reviewUser = $('<div/>',{class:'',text:texts.cpanel.public.guest})
    }else{
        reviewUser = $('<a/>',{class:'popupId popupPage',user:review.user_id,popupId:'user',popupPage:'user',text:review.userName})
    }

    return $('<div/>',{class:'productReviewContainer',review:review.id}).append(
        deleteIcon ? $('<div/>',{class:'btn_icon ico-delete deleteProductReview',tooltip:texts.cpanel.public.delete}) : '',
        $('<div/>',{class:'row alnC jstfyS mB5'}).append(
            $('<img/>',{class:'w40 h40 ofCover br5 mie-5',src:productImg,}),
            $('<div/>',{class:''}).append(
                $('<a/>',{class:'popupId popupPage',popupPage:'product',popupId:'product',product:review.product_name,text:review.product_name}),
                reviewStars
            )
        ),
        $('<div/>',{class:'taS mY20 ',text:review.review}),
        $('<div/>',{class:'fs09 column alnE jstfyE'}).append(
            reviewUser,
            $('<div/>',{class:'',text:getDate(review.posted_at).date_time.local})
        )
    )
}


$('#bodyPage').on('scroll',function(){
    if(window.history.state.page == 'product_reviews' && window.getMoreProductsReviews && !window.window.noMoreProductReviews){
        if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 100){
            getProductReviews();
        }
    }
})


