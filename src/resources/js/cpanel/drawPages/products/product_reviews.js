draw_product_reviews = function(){
    window.getProductReviewsSkip = 0;
    window.noMoreProductReviews = false;
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.product_reviews}),
                $('<span/>',{class:'ico-help help-icon',helpId:'product_rating_and_reviews'})
            ),
            $('<div/>',{class:'w100p mT40'}).append(
                $('<div/>',{class:'fs08 mB5',text:texts.products.reviewsOn}),
                drawInputList('','ico-products','',texts.products.findProduct,'productReviews_selectProduct',texts.products.findProduct,200,'productReviews_selectProductList',false,'mY0 mX10 zx10','',''),
                $('<div/>',{class:'reviewsMoreFiltersContainer'}).append(

                    $('<div/>',{class:'fs08 mT20 mB5',text:texts.products.reviewsBy}),
                    $('<div/>',{class:'row wrap alnC jstfyS'}).append(
                        $('<div/>',{productReviewsBy:'users',class:'productReviewsBy pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsByCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.cpanel.public.users}),
                        ),
                        $('<div/>',{productReviewsBy:'guests',class:'productReviewsBy pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsByCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.cpanel.public.guests}),
                        ),
                        $('<div/>',{productReviewsBy:'user',class:'productReviewsBy pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsByCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.cpanel.public.user}),
                        ),
                    ),
                    $('<div/>',{class:'productReviews_findUserContainer none'}).append(
                        drawInputList('','ico-users','',texts.users.findUser,'productReviews_findUser',texts.users.findUserPlaceholder,250,'productReviews_findUserList',false,'mX10','findUserList','findUser'),
                    ),

                    $('<div/>',{class:'fs08 mT20 mB5',text:texts.products.reviewsWith}),
                    $('<div/>',{class:'row wrap alnC jstfyS'}).append(
                        $('<div/>',{productReviewsWith:'star1',class:'productReviewsWith pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsWithCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.products.Star1Reviews}),
                        ),
                        $('<div/>',{productReviewsWith:'star2',class:'productReviewsWith pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsWithCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.products.Star2Reviews}),
                        ),
                        $('<div/>',{productReviewsWith:'star3',class:'productReviewsWith pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsWithCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.products.Star3Reviews}),
                        ),
                        $('<div/>',{productReviewsWith:'star4',class:'productReviewsWith pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsWithCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.products.Star4Reviews}),
                        ),
                        $('<div/>',{productReviewsWith:'star5',class:'productReviewsWith pointer mX20'}).append(
                            $('<span/>',{class:'productReviewsWithCheck ico-check0 mie-5 fs08'}),
                            $('<span/>',{class:'fs09',text:texts.products.Star5Reviews}),
                        ),
                    ),
                ),
                $('<a/>',{class:'productReviewMoreFiltersSwitch mT10 block fs08',text:texts.products.moreFilters}),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<button/>',{class:'btn',id:'productReviews_findReviewsBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.products.findReviews})
                    )
                )
            ),
            $('<div/>',{class:'mY40 pageSection_brdrB'}),
            $('<div/>',{id:'productReviewsContainer'}),
            $('<div/>',{id:'productReviewsContainer_loading',class:'none'}).append(
                drawProductReviewCardLoading(),
                drawProductReviewCardLoading(),
                drawProductReviewCardLoading(),
                drawProductReviewCardLoading(),
            ),
        )
    );

    addToInputList($('#productReviews_selectProductList'),texts.products.allproducts,'allproducts');
    for(const key in website.products){
        addToInputList($('#productReviews_selectProductList'),website.products[key].name,website.products[key].name)
    }
    setFindReviewsFilters();
    getProductReviews();
}
drawProductReviewCardLoading = function(){
    return $('<div/>',{class:'productReviewContainer'}).append(
        $('<div/>',{class:'row alnC jstfyS mB5'}).append(
            $('<div/>',{class:'cardLoading h40 w40 mie-5 br5'}),
                $('<div/>',{class:''}).append(
                    $('<div/>',{class:'cardLoading h10 mB5 w150 br5'}),
                    $('<div/>',{class:'cardLoading h15 mT5 w100 br5'}),
                )
        ),
        $('<div/>',{class:'cardLoading h10 w300 mT20 br5 mX10'}),
        $('<div/>',{class:'cardLoading h10 w250 mT5 br5 mX10'}),
        $('<div/>',{class:'cardLoading h10 w350 mT5 mB20 br5 mX10'}),
        $('<div/>',{class:'fs09 column alnE jstfyE'}).append(
            $('<div/>',{class:'cardLoading h10 mB5 w100 br5'}),
            $('<div/>',{class:'cardLoading h10 mB5 w100 br5'}),

        )
    )
}
drawPopupPage_review = function(reviewId){
    $('#popupPageTitle').text('').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.review}),
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 p20').append(
        $('<div/>',{id:'poupPageReviewContainer'}).append(
            drawProductReviewCardLoading()
        )
    );
    if(typeof(window.product_reviews.find(item=>item.id == reviewId)) === 'undefined'){
        $.ajax({
            url:'products',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getReview:reviewId,
            },success:function(r){
                checkUseenNotifications(['review.posted'],'product_review_id',reviewId)
                if(r.review == null){
                    popupPageClose(false);
                    showPopup_notFound(texts.products.reviewNotFound)
                }else{
                    $('#poupPageReviewContainer').text('').append(
                        drawProductReview(r.review,false)
                    )
                }
            }
        })
    }else{
        checkUseenNotifications(['review.posted'],'product_review_id',reviewId)
        $('#poupPageReviewContainer').text('').append(
            drawProductReview(window.product_reviews.find(item=>item.id == reviewId),false)
        )
    }

}
