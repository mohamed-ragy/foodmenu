showCategoryPage = (categoryId) => {
    let category = categories.find(item=> item.id == categoryId);
    window.browsingCategory = categoryId;
    setTimeout(()=>{
        navMobileClose()
        $('.categoryPageTitle').text(category.nameLang)
        $('.categoryPageDes').text(category.descriptionLang)
        let categoryProducts = [];
        for(const key in products){
            let product = products[key];
            if(product.category_id == category.id){
                categoryProducts.push(product);
            }
        }
        $('.categoryProductsContainer').text('');
        for(const key in categoryProducts){
            drawProductCard(categoryProducts[key],$('.categoryProductsContainer'))
        }
    },400)
}
