$('html,body').on('mouseenter','.productCard',function(e){
    e.stopImmediatePropagation();
    $(this).find('.productCardBefore').addClass('productCardBeforeHover')
    $(this).find('.productCardDes').addClass('productCardDes_show')
})
$('html,body').on('mouseleave','.productCard',function(e){
    e.stopImmediatePropagation();
    $(this).find('.productCardBefore').removeClass('productCardBeforeHover')
    $(this).find('.productCardDes').removeClass('productCardDes_show')
})
drawProductCard = (product,container) => {
    container.append(
        $('<div/>',{
            class:'productCard',
            style:`background-image:url(${product.imgUrl})`,
        }).append(
            $('<div/>',{class:'productCardBefore'}),
            $('<div/>',{
                class:'productCardIcons',
            }).append(
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.new,
                    class:`c1 productCardIcon productIcon ${productIcons(product.id).new}`,
                    iconTag:'new',
                    href:`/${lang}/allproducts?tag=new`
                }),
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.trending,
                    class:`cE productCardIcon productIcon ${productIcons(product.id).trending}`,
                    iconTag:'trending',
                    href:`/${lang}/allproducts?tag=trending`,
                }),
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.popular,
                    class:`cS productCardIcon productIcon ${productIcons(product.id).popular}`,
                    iconTag:'popular',
                    href:`/${lang}/allproducts?tag=popular`
                }),
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.topRated,
                    class:`cR productCardIcon productIcon ${productIcons(product.id).topRated}`,
                    iconTag:'topRated',
                    href:`/${lang}/allproducts?tag=topRated`
                }),
                $('<span/>',{productName:product.name,tooltip:texts.other.productToChat,class:'productCardIcon pointer productToChat ic-chat '}),
            ),
            $('<div/>',{
                class:'productCardInfo'
            }).append(
                $('<div/>',{
                    class:'row alnC jstfySB w-100p',
                }).append(
                    $('<a>',{
                        class:'product productLink productCardName',
                        href:`/${lang}/${product.catName}/${product.name}`,
                        productId:product.id,
                        text:product.nameLang,
                    }),
                ),
                $('<div/>',{
                    html:drawRatingStars(product.rating,product.ratings_sum),
                    class:'fs-105'
                }),
                $('<div/>',{
                    class:'productCardDes',
                    text:product.descriptionLang,
                    tooltip:product.descriptionLang,
                }),
                $('<div/>',{text:product.defaultPrice,productId:product.id,class:'productCardPrice alnsE fs-102 mT-10'}),
                $('<button/>',{
                    class:'addToCart alnsE ',
                    text:texts.orders.addToCart,
                    productId:product.id,
                })
            )
        )
    )
    ProductAvailabilityCheck(product.id)
}
