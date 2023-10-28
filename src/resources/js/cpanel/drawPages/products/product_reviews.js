draw_product_reviews = function(){
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.product_reviews}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
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
                $('<div/>',{class:'cardLoading h20 w200'})
            ),
        )
    );

    addToInputList($('#productReviews_selectProductList'),texts.products.allproducts,'allproducts');
    for(const key in website.products){
        addToInputList($('#productReviews_selectProductList'),website.products[key].name,website.products[key].name)
    }
    setFindReviewsFilters();
}
