let deliveryPopupIdInterval;
$('html,body').on('mouseenter','.popupId',function(e){
    e.stopImmediatePropagation();
    let thisPopupIdElem = $(this);
    switch($(this).attr('popupId')){
        case 'review':
            $('#popupId').text('').append(
                $('<div/>',{id:'popupIdReviewContainer',class:'p10 mxw300'}).append(
                    $('<div/>',{class:'cardLoading h10 mB5 w200 br5'}),
                    $('<div/>',{class:'cardLoading h10 mB5 w200 br5'}),
                    $('<div/>',{class:'cardLoading h10 mB5 w200 br5'}),
                )
            )
            if(typeof(window.product_reviews.find(item=>item.id == $(this).attr('review'))) === 'undefined'){
                $.ajax({
                    url:'products',
                    type:'put',
                    data:{
                        _token:$('meta[name="csrf-token"]').attr('content'),
                        getReview:$(this).attr('review'),
                    },success:function(r){
                        if(r.review != null){
                            $('#popupIdReviewContainer').text(r.review.review)
                        }else{
                            $('#popupId').text('').addClass('none')
                        }
                    }
                })
            }else{
                $('#popupIdReviewContainer').text('').append(
                    window.product_reviews.find(item=>item.id == $(this).attr('review')).review
                )
                // checkUseenNotifications([4],'product_review_id',window.product_reviews.find(item=>item.id == $(this).attr('review')).id)
            }
            showPopupId(thisPopupIdElem)
        break;
        case 'product':
            // if(!account.authorities[0]){return;}
            let product = website.products.find(item=>item.name == $(this).attr('product'));
            if(typeof(product) === 'undefined'){return;}
            let productRating = Math.round(parseFloat(product.rating));
            let ratingStars = {
                star1:productRating >= 1 ? 'ico-star' : 'ico-starEmpty',
                star2:productRating >= 2 ? 'ico-star' : 'ico-starEmpty',
                star3:productRating >= 3 ? 'ico-star' : 'ico-starEmpty',
                star4:productRating >= 4 ? 'ico-star' : 'ico-starEmpty',
                star5:productRating >= 5 ? 'ico-star' : 'ico-starEmpty',
            }
            $('#popupId').text('').append(
                $('<div/>',{class:'popupIdClose ico-close'}),
                $('<div/>',{class:'mB10'}).append(
                    $('<img/>',{class:'w100p h50 mnw200 ofCover',src:product.thumbnail}),
                    $('<div/>',{class:'pX5 fs103',text:product.name}),
                    $('<div/>',{class:'pX5 fs09 mB10',text:product.category_id === null ? texts.products.uncategorizedProduct : website.categories.find(item=>item.id == product.category_id).name}),
                    $('<div/>',{class:'mX5 row alnC jstyS mB5 pointer cpPage',cpPage:'product_reviews',product:product.name}).append(
                        $('<span/>',{class:`cStar fs102 ${ratingStars.star1}`}),
                        $('<span/>',{class:`cStar fs102 ${ratingStars.star2}`}),
                        $('<span/>',{class:`cStar fs102 ${ratingStars.star3}`}),
                        $('<span/>',{class:`cStar fs102 ${ratingStars.star4}`}),
                        $('<span/>',{class:`cStar fs102 ${ratingStars.star5}`}),
                    ),
                    $('<div/>',{class:'authority_1 pX5 fs09',text:texts.products.created.replace(':date:',getDate(product.created_at).date.local)}),
                    $('<div/>',{class:'pX5 fs09 authority_master',text:product.ordered_sum == 1 ? texts.products.productOrderedTime.replace(':sum:',product.ordered_sum) : texts.products.productOrderedTimes.replace(':sum:',product.ordered_sum)}),
                    $('<div/>',{class:'pX5 fs09 authority_master',text:product.ratings_sum == 1 ? texts.products.poductReviewedTime.replace(':sum:',product.ratings_sum) : texts.products.poductReviewedTimes.replace(':sum:',product.ratings_sum)}),
                    $('<div/>',{class:'authority_1 row alnC jstfyE mis-20 mT10 mie-5'}).append(
                        $('<button/>',{class:'btn_icon popupPage',popupPage:'edit_product',product:product.name,text:texts.cpanel.public.edit}),
                        $('<button/>',{class:'btn_icon popupPage',popupPage:'manage_product_options',product:product.name,text:texts.products.manageOptions}),
                    )
                )
            )
            showPopupId(thisPopupIdElem)
        break;
        case 'category':
            let category = website.categories.find(item=>item.name == $(this).attr('category'));
            if(typeof(category) === 'undefined'){return;}
            let catProductsSum = 0;
            for(const key in website.products){
                if(website.products[key].category_id == category.id){
                    catProductsSum++;
                }
            }
            $('#popupId').text('').append(
                $('<div/>',{class:'popupIdClose ico-close'}),
                $('<div/>',{class:'mB10'}).append(
                    $('<img/>',{class:'w100p h50 mnw200 ofCover',src:category.thumbnail}),
                    $('<div/>',{class:'pX5 fs103',text:category.name}),
                    $('<div/>',{class:'authority_1 pX5 fs09',text:texts.products.created.replace(':date:',getDate(category.created_at).date.local)}),
                    $('<div/>',{class:'authority_1 pX5 fs09',text:texts.products.containsProducts.replace(':num:',catProductsSum)}),
                    $('<div/>',{class:'authority_1 row alnC jstfyE mis-20 mT10 mie-5'}).append(
                        $('<button/>',{class:'btn_icon popupPage',popupPage:'edit_category',category:category.name,text:texts.cpanel.public.edit}),
                        $('<button/>',{class:'btn_icon cpPage',cpPage:'manage_products',category:category.name,text:texts.cpanel.menu.manage_products}),
                    )
                )
            )
            showPopupId(thisPopupIdElem)
        break;
        case 'user':
            getUsersData([$(this).attr('user')]).then(()=>{
                let user = website.users.find(item=>item.id == $(this).attr('user'));
                let userIconClass;let usericonTooltip;
                user.isBanned ? userIconClass ='ico-userBlock cR' : userIconClass = 'ico-user';
                user.isBanned ? usericonTooltip = texts.users.bannedUser : usericonTooltip = null;
                $('#popupId').text('').append(
                    $('<div/>',{class:'popupIdClose ico-close'}),
                    $('<div/>',{class:'m5 mnw150 row alnS justfyS mie-25'}).append(
                        $('<div/>',{class:`${userIconClass} userIdIcon mie-2 fs101`,tooltip:usericonTooltip}),
                        $('<div/>',{}).append(
                            $('<div/>',{class:'fs101 mX5',text:user.name}),
                            $('<div/>',{class:'row alnC jstfyS mie-30'}).append(
                                $('<div/>',{class:`visitorOnlineIcon-user-${user.id}`}),
                                $('<div/>',{class:`fs08 visitorActions-user-${user.id}`})
                            ),
                            $('<div/>',{class:'row alnS jstfyS mT5'}).append(
                                $('<button/>',{class:'authority_5 ico-chat btn_icon openChatWindow',type:'user',user:user.id,tooltip:texts.users.chatWith.replace(':name:',user.name)}).append($('<span/>',{class:`chatIconUnseen none chatUnseen-user-${user.id}`})),
                                $('<button/>',{class:'authority_0 ico-orders btn_icon cpPage',cpPage:'order_history',user:user.id,tooltip:texts.users.seePlacedOrders.replace(':name:',user.name)}),
                                $('<button/>',{class:'authority_1 ico-product_reviews btn_icon cpPage',cpPage:'product_reviews',user:user.id,tooltip:texts.users.seeReviewPosted.replace(':name:',user.name)}),
                                $('<button/>',{class:'authority_2 ico-settings btn_icon cpPage',cpPage:'manage_users',user:user.id,tooltip:texts.users.manageUserProfile.replace(':name:',user.name)}),
                            ),
                        )

                    ),
                )
                setUserOnlineStatus(user.id,'user')
                setUnseenChat('user',user.id)
                authorities();
                showPopupId(thisPopupIdElem)
            });
        break;
        case 'delivery':
            $('#popupId').text('').append(
                $('<div/>',{class:'popupIdClose ico-close'}),
                $('<div/>',{class:'mX5 mY10 mnw150 row alnS justfyS mie-25'}).append(
                    $('<div/>',{class:'row alnS jstfyS'}).append(
                        $('<div/>',{class:'cardLoading br50p w30 h30 mie-5'}),
                        $('<div/>',{}).append(
                            $('<div/>',{class:'cardLoading br5 h10 mT5 w100'}),
                            $('<div/>',{class:'cardLoading br5 h10 mT5 w150'}),
                        )
                    )
                )
            )
            deliveryPopupIdInterval = setInterval(()=>{
                if(!window.waitFor_loadWebsiteOrdersAndChats){
                    clearInterval(deliveryPopupIdInterval);
                    let delivery = website.deliveries.find(item=>item.id == $(this).attr('delivery'));
                    if(typeof(delivery) === 'undefined'){return;}
                    let deliveryOrdersCounter = 0;
                    let deliveryManOrdersNowTxt = texts.staff.deliveryManOrderNow;

                    for(const key in website.incompleteOrders){
                        if(website.incompleteOrders[key].delivery_id == delivery.id){
                            deliveryOrdersCounter = deliveryOrdersCounter + 1;
                        }
                    }
                    deliveryOrdersCounter == 1 ? deliveryManOrdersNowTxt = texts.staff.deliveryManOrderNow : deliveryManOrdersNowTxt = texts.staff.deliveryManOrdersNow ;
                    $('#popupId').text('').append(
                        $('<div/>',{class:'popupIdClose ico-close'}),
                        $('<div/>',{class:'m5 mnw150 row alnS justfyS'}).append(
                            $('<div/>',{class:'ico-delivery_accounts userIdIcon fs102'}),
                            $('<div/>',{}).append(
                                $('<div/>',{class:'fs101 mX5',text:delivery.deliveryName.split('@')[0]}),
                                $('<div/>',{class:'row alnC jstfyS mie-30'}).append(
                                    $('<div/>',{class:`deliveryOnlineIcon-${delivery.id}`}),
                                    $('<div/>',{class:`fs08 deliverylastSeen2-${delivery.id}`})
                                ),
                                $('<div/>',{class:'fs08 mie-30 mis-5',text:deliveryManOrdersNowTxt.replace(':num:',deliveryOrdersCounter)})
                            )
                        )
                    )
                    setDeliveryManOnlineStatus(delivery.id)
                    showPopupId(thisPopupIdElem)
                }
            },100)

        break;
        case 'order':
            $('#popupId').text('').append(
                // $('<div/>',{class:'bold500 fs101',text:`${texts.orders.order} #${$(this).attr('order')}`}),
                $('<div/>',{class:'chatOrderBody p10'}).append(
                    $('<div/>',{class:'cardLoading br10 h10 w50 mX5 mY3'}),
                    $('<div/>',{class:'cardLoading br10 h10 w150 mX5 mY3'}),
                    $('<div/>',{class:'cardLoading br10 h10 w50 mX5 mY3'}),
                    $('<div/>',{class:'cardLoading br10 h10 w100 mX5 mY3'}),
                )
            )
            showPopupId(thisPopupIdElem)
            getOrder($(this).attr('order')).then(function(order){
                order_data = orderRow_data(order);
                $('#popupId').text('').append(
                    $('<div/>',{class:'p10'}).append(
                        $('<div/>',{class:'bold500 mB2 fs101',text:`${texts.orders.order} #${order.id}`}),
                        $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                            $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.orderPlaced}: `}),
                            $('<div/>',{class:'fs09 diffTimeCalc',time:order.placed_at,})
                        ),
                        $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                            $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.type}: `}),
                            $('<div/>',{class:'fs09',text:order_data.typeTxt})
                        ),
                        $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                            $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.status}: `}),
                            $('<div/>',{class:`${order_data.statusColor} fs09`,text:texts.orders[order_data.status]})
                        ),
                        $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                            $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.customer}: `}),
                            $('<div/>',{class:'fs09',html:order_data.user})
                        ),
                        $('<div/>',{class:'m1 row alnC jstfyS'}).append(
                            $('<div/>',{class:`fs09 mie-5`,text:`${texts.orders.price}: `}),
                            $('<div/>',{class:'fs09',text:`${website.currency}${parseFloat(order.total).toFixed(2)}`})
                        ),
                    )
                )
            })

        break;
        case 'sub_account':
            let subaccount = website.accounts.find(item=>item.id == $(this).attr('subaccount'));
            if(typeof(subaccount) === 'undefined'){return;}

            $('#popupId').text('').append(
                $('<div/>',{class:'popupIdClose ico-close'}),
                $('<div/>',{class:'m5 mnw150 row alnS justfyS mie-25'}).append(
                    $('<div/>',{class:`ico-sub_accounts userIdIcon mie-2 fs101`}),
                    $('<div/>',{}).append(
                        $('<div/>',{class:'fs101 mX5',text:subaccount.name}),
                        $('<div/>',{class:'row alnC jstfyS mie-30'}).append(
                            $('<div/>',{class:`subaccountOnlineIcon-${subaccount.id}`}),
                            $('<div/>',{class:`fs08 subaccountlastSeen2-${subaccount.id}`})
                        ),

                    ),
                ),
            );
            setSubaccountOnlineStatus(subaccount.id)
            showPopupId(thisPopupIdElem)
        break;
    }
    // setTimeout(()=>{
    //     if(thisPopupIdElem.is(':hover')){
    //         $('#popupId').removeClass('none').css({
    //             'top':$(this).offset().top - $('#popupId').outerHeight(),
    //             'left':$(this).offset().left
    //         })
    //         if(parseFloat($('#popupId').offset().left) + parseFloat($('#popupId').width()) > $(window).width()){
    //             $('#popupId').removeClass('none').css({
    //                 'top':$(this).offset().top - $('#popupId').outerHeight(),
    //                 'left':$(window).width() - $('#popupId').width() - 10,
    //             })
    //         }
    //     }
    // },500)

})

showPopupId = function(thisPopupIdElem){
    authorities();
    setTimeout(()=>{
        if(thisPopupIdElem.is(':hover')){
            $('#popupId').removeClass('none').css({
                'top':thisPopupIdElem.offset().top - $('#popupId').outerHeight(),
                'left':thisPopupIdElem.offset().left
            })
            if(parseFloat($('#popupId').offset().left) + parseFloat($('#popupId').width()) > $(window).width()){
                $('#popupId').removeClass('none').css({
                    'left':$(window).width() - $('#popupId').width() - 10,
                })
            }
            if(parseFloat($('#popupId').offset().top) < 0){
                $('#popupId').removeClass('none').css({
                    'top':0
                })
            }

        }
    },500)



}
$('html,body').on('mousemove',function(e){
    if($('.popupId:hover').length == 0 && $('#popupId:hover').length == 0){
        $('#popupId').addClass('none')
        clearInterval(deliveryPopupIdInterval);
    }
});
$('html,body').on('click','.popupIdClose',function(e){
    e.stopImmediatePropagation();
    clearInterval(deliveryPopupIdInterval);
    $('#popupId').text('').addClass('none')
})
