


$(window).on('popstate',(e)=>{
    if(window.history.state.page == 'home'){
        switchPage($('#home'),showHomePage())
        userStatus({'status': 'user_browse_home'});
    }else if(window.history.state.page == 'profile'){
        switchPage($('#profilepage'),showProfilePage('profile'))
    }else if(window.history.state.page == 'aboutus'){
        switchPage($('#aboutus'),showAboutUsPage())
        userStatus({'status': 'user_browse_aboutus'});
        drawMap();
    }else if(window.history.state.page == 'category'){
        switchPage($('#category'),showCategoryPage(window.history.state.categoryId))
        let category = categories.find(item=> item.id == window.history.state.categoryId);
        userStatus({'status': 'user_browse_category','category':category.name});
    }else if(window.history.state.page == 'allProducts'){
        switchPage($('#allProducts'),showAllproductsPage(window.history.state.iconTag))
        userStatus({'status': 'user_browse_allproducts'});
    }else if(window.history.state.page == 'product'){
        switchPage($('#product'),showProductPage(window.history.state.productId))
        let product = products.find(item=> item.id == window.history.state.productId);
        userStatus({'status': 'user_browse_product','product':product.name});
    }else if(window.history.state.page == 'privacypolicy'){
        switchPage($('#privacypolicy'))
        userStatus({'status': 'user_browse_privacyPolicy'});
    }
})

///profile page event trrigers in auth and order history
$('html,body').on('click','.home',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    if($('#home').hasClass('none')){
        switchPage($('#home'),showHomePage())
        window.history.pushState({'page':'home'},``, `https://${website.url}/${urlLang}/home`);
        document.title = website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])

    }else{
        currentPage();
    }
    userStatus({'status': 'user_browse_home'});
})


$('html,body').on('click','.aboutus',(e) =>{
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    if($('#aboutus').hasClass('none')){
        switchPage($('#aboutus'),showAboutUsPage())
        window.history.pushState({'page':'home'},``, `https://${website.url}/${urlLang}/aboutus`);
        document.title = texts.other.aboutUs+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])
        drawMap();
    }else{
        currentPage();
    }
    userStatus({'status': 'user_browse_aboutus'});

})


$('html,body').on('click','.categoryLink',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    if(window.browsingCategory != $(this).attr('categoryId') || $('#category').hasClass('none')){
        switchPage($('#category'),showCategoryPage($(this).attr('categoryId')))
        let category = categories.find(item=> item.id == $(this).attr('categoryId'));
        window.history.pushState({'page':'category','categoryId':category.id},``, `https://${website.url}/${urlLang}/${category.name}`);
        document.title = category.nameLang+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',category.descriptionLang)
        userStatus({'status': 'user_browse_category','category':category.name});
    }else{
        currentPage();
    }
})


$('html,body').on('click','.allProducts',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    if(!$(this).hasClass('allProductsTagElem_selected') ){
        window.history.pushState({'page':'allProducts','iconTag':null},``, `https://${website.url}/${urlLang}/allproducts`);
        document.title = texts.other.allProducts+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])

    }
    if($('#allProducts').hasClass('none') ){
        switchPage($('#allProducts'),function(){
            showAllproductsPage(null);
        })
    }else{
        showAllproductsPage(null);
        currentPage();
    }
    userStatus({'status': 'user_browse_allproducts'});
})


$('html,body').on('click','.productIcon',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    if(!$(this).hasClass('allProductsTagElem_selected')){
        showAllproductsPage($(this).attr('iconTag'));
        currentPage();
        window.history.pushState({'page':'allProducts','iconTag':$(this).attr('iconTag')},``, `https://${website.url}/${urlLang}/allproducts?tag=${$(this).attr('iconTag')}`);
        document.title = texts.other[$(this).attr('iconTag')]+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])
    }
    if($('#allProducts').hasClass('none') ){
        switchPage($('#allProducts'))
    }
    userStatus({'status': 'user_browse_allproducts'});
})


$('html,body').on('click','.productLink',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    if(window.browsingProduct != $(this).attr('productId') || $('#product').hasClass('none')){
        switchPage($('#product'),showProductPage($(this).attr('productId')))
        let product = products.find(item=> item.id == $(this).attr('productId'));
        window.history.pushState({'page':'product','productId':product.id},``, `https://${website.url}/${urlLang}/${product.catName}/${product.name}`);
        document.title = product.nameLang+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',product.descriptionLang)
        userStatus({'status': 'user_browse_product','product':product.name});
    }else{
        currentPage();
    }
})


$('html,body').on('click','.privacyPolicy',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    if($('#privacypolicy').hasClass('none')){
        switchPage($('#privacypolicy'))
        window.history.pushState({'page':'privacypolicy','iconTag':null},``, `https://${website.url}/${urlLang}/privacypolicy`);
        document.title = texts.other.privacypolicy+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])
    }else{
        currentPage();
    }
    userStatus({'status': 'user_browse_privacyPolicy'});
})
