showAllproductsPage = (iconTag) =>{
    $('.allProductsContainer').text('')
    $('.allProductsTagElem').removeClass('allProductsTagElem_selected')
    $('.allProductsTagElemIcon').removeClass('cS cR cE cS c1')
    if(iconTag == null){
    $('.allProductsTagElem.allProducts').addClass('allProductsTagElem_selected')
    $('.allProductsTagElemIcon.allProducts').addClass('c1')
        let allProducts = products.sort((a,b) => {
            return parseInt(a.category_id) - parseInt(b.category_id);
        })
        for(const key in allProducts){
            drawProductCard(allProducts[key],$('.allProductsContainer'))
        }
    }else if(iconTag == 'trending'){
        $('.allProductsTagElem.trending').addClass('allProductsTagElem_selected')
        $('.allProductsTagElemIcon.trending').addClass('cE')
        for(const key in website.trendingProducts2){
            drawProductCard(website.trendingProducts2[key],$('.allProductsContainer'))
        }
    }else if(iconTag == 'popular'){
        $('.allProductsTagElem.popular').addClass('allProductsTagElem_selected')
        $('.allProductsTagElemIcon.popular').addClass('cS')
        for(const key in website.mostPopularProducts){
            drawProductCard(website.mostPopularProducts[key],$('.allProductsContainer'))
        }
    }else if(iconTag == 'topRated'){
        $('.allProductsTagElem.topRated').addClass('allProductsTagElem_selected')
        $('.allProductsTagElemIcon.topRated').addClass('cR')
        for(const key in website.topRatedProducts){
            drawProductCard(website.topRatedProducts[key],$('.allProductsContainer'))
        }
    }else if(iconTag == 'new'){
        $('.allProductsTagElem.new').addClass('allProductsTagElem_selected')
        $('.allProductsTagElemIcon.new').addClass('c1')
        for(const key in products){
            if(Date.parse(new Date(products[key].created_at)) >= Date.parse(new Date()) - (10 * 86400000)){
                drawProductCard(products[key],$('.allProductsContainer'))
            }
        }
    }

}

