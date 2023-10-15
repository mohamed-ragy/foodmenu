let deliveryPopupIdInterval;
$('html,body').on('mouseenter','.popupId',function(e){
    e.stopImmediatePropagation();
    let thisPopupIdElem = $(this);
    switch($(this).attr('popupId')){
        case 'product':
            // if(!account.authorities[0]){return;}
            let product = products.find(item=>item.name == $(this).attr('product'));
            let rating = Math.round(parseFloat(product.rating));
            let ratingStars = {};
            rating>=1 ? ratingStars['star1'] = 'ico-star' : 'ico-starEmpty';
            rating>=2 ? ratingStars['star2'] = 'ico-star' : 'ico-starEmpty';
            rating>=3 ? ratingStars['star3'] = 'ico-star' : 'ico-starEmpty';
            rating>=4 ? ratingStars['star4'] = 'ico-star' : 'ico-starEmpty';
            rating>=5 ? ratingStars['star5'] = 'ico-star' : 'ico-starEmpty';
            $('#popupId').text('').append(
                $('<div/>',{class:'popupIdClose ico-close'}),
                $('<div/>',{class:'mB10'}).append(
                    $('<img/>',{class:'w100p h50 mnw200 ofCover',src:product.imgUrl}),
                    $('<div/>',{class:'pX5 fs103',text:product.name}),
                    $('<div/>',{class:'mX5 row alnC jstyS mB5'}).append(
                        $('<div/>',{class:`cStar fs102 ${ratingStars.star1}`}),
                        $('<div/>',{class:`cStar fs102 ${ratingStars.star2}`}),
                        $('<div/>',{class:`cStar fs102 ${ratingStars.star3}`}),
                        $('<div/>',{class:`cStar fs102 ${ratingStars.star4}`}),
                        $('<div/>',{class:`cStar fs102 ${ratingStars.star5}`}),
                    ),
                    $('<div/>',{class:'authority_1 pX5 fs09',text:texts.products.productCreated.replace(':date:',getDate(product.created_at).date.local)}),
                    $('<div/>',{class:'pX5 fs09 authority_master',text:texts.products.productOrdered.replace(':sum:',product.ordered_sum)}),
                    $('<div/>',{class:'pX5 fs09 authority_master',text:texts.products.poductReviewed.replace(':sum:',product.ratings_sum)}),
                    $('<div/>',{class:'authority_1 row alnC jstfyE mis-20 mT10 mie-5'}).append(
                        $('<button/>',{class:'btn_icon popupPage',popupPage:'edit_product',product:product.name,text:texts.products.editProduct}),
                        $('<button/>',{class:'btn_icon popupPage',popupPage:'manage_product_options',product:product.name,text:texts.products.manageOptions}),
                    )
                )
            )
        break;
        case 'category':
            $('#popupId').addClass('p10').text('ba3ddeeen')
            // need to be done
            // the attr is category
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
                }
            },100)

        break;
        case 'order':
            $('#popupId').addClass('p10').text('ba3ddeeen')
            // need to be done
            // the attr is order
        break;
        case 'sub_account':
            let subaccount = website.accounts.find(item=>item.id == $(this).attr('subaccount'));

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
        break;
    }
    authorities();
    setTimeout(()=>{
        if(thisPopupIdElem.is(':hover')){
            $('#popupId').removeClass('none').css({
                'top':$(this).offset().top - $('#popupId').outerHeight(),
                'left':$(this).offset().left
            })
            if(parseFloat($('#popupId').offset().left) + parseFloat($('#popupId').width()) > $(window).width()){
                $('#popupId').removeClass('none').css({
                    'top':$(this).offset().top - $('#popupId').outerHeight(),
                    'left':$(window).width() - $('#popupId').width() - 10,
                })
            }
        }
    },500)

})
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
