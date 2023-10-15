drawProductCard = (product,container) => {
    container.append(
        $('<div/>',{
            class:'productCard',
        }).append(
            $('<a/>',{
                class:'productImgContainer productLink',
                productId:product.id,
                href:`/${urlLang}/${product.catName}/${product.name}`,
            }).append(
                $('<img/>',{
                    class:'productCardImg',
                    src:product.thumbnailUrl,
                }),
            ),
            $('<a/>',{
                class:'productCardTitle productLink',
                text:product.nameLang,
                productId:product.id,
                href:`/${urlLang}/${product.catName}/${product.name}`,
            }),
            $('<div/>',{
                html:drawRatingStars(product.rating,product.ratings_sum),
                class:'productCardStars'
            }),
            $('<div/>',{
                class:'productCardIcons',
            }).append(
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.new,
                    class:`c1 productCardIcon productIcon ${productIcons(product.id).new}`,
                    iconTag:'new',
                    href:`/${urlLang}/allproducts?tag=new`
                }),
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.trending,
                    class:`cE productCardIcon productIcon ${productIcons(product.id).trending}`,
                    iconTag:'trending',
                    href:`/${urlLang}/allproducts?tag=trending`,
                }),
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.popular,
                    class:`cS productCardIcon productIcon ${productIcons(product.id).popular}`,
                    iconTag:'popular',
                    href:`/${urlLang}/allproducts?tag=popular`
                }),
                $('<a/>',{
                    productId:product.id,
                    tooltip:texts.other.topRated,
                    class:`cR productCardIcon productIcon ${productIcons(product.id).topRated}`,
                    iconTag:'topRated',
                    href:`/${urlLang}/allproducts?tag=topRated`
                }),
                $('<span/>',{productName:product.name,tooltip:texts.other.productToChat,class:'productCardIcon pointer productToChat ic-chat '}),
            ),
            $('<div/>',{
                class:'productCardDes',
                text:product.descriptionLang,
            }),
            $('<div/>',{class:'productCardPrice',productId:product.id,text:product.defaultPrice}),
            $('<button/>',{
                class:'addToCart alnsC mB-30 mT-5',
                productId:product.id,
                text:texts.orders.addToCart,
            })
        )
    )
    ProductAvailabilityCheck(product.id)
}
