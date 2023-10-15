window.onlineAccounts = [];

///
window.products = website.products;
window.categories = website.categories;
texts = website.website_texts[lang];
website.currency = website.currencies[lang];

if(website.useCustomColors == true){
    window.colors = website.customColorsHexCode;
}else{
    window.colors = website.websiteColorsHexCode;
}

/////////////////
for(const key in website.workingDays_delivery){
    website.workingDays_delivery[key]['working'] == true ? website.workingDays_delivery[key]['working'] = 1 : website.workingDays_delivery[key]['working'] == false ? website.workingDays_delivery[key]['working'] = 0 : null;
    website.workingDays_delivery[key]['working24'] == true ? website.workingDays_delivery[key]['working24'] = 1 : website.workingDays_delivery[key]['working24'] == false ? website.workingDays_delivery[key]['working24'] = 0 : null;
}
for(const key in website.workingDays_pickup){
    website.workingDays_pickup[key]['working'] == true ? website.workingDays_pickup[key]['working'] = 1 : website.workingDays_pickup[key]['working'] == false ? website.workingDays_pickup[key]['working'] = 0 : null;
    website.workingDays_pickup[key]['working24'] == true ? website.workingDays_pickup[key]['working24'] = 1 : website.workingDays_pickup[key]['working24'] == false ? website.workingDays_pickup[key]['working24'] = 0 : null;
}
for(const key in website.workingDays_dinein){
    website.workingDays_dinein[key]['working'] == true ? website.workingDays_dinein[key]['working'] = 1 : website.workingDays_dinein[key]['working'] == false ? website.workingDays_dinein[key]['working'] = 0 : null;
    website.workingDays_dinein[key]['working24'] == true ? website.workingDays_dinein[key]['working24'] = 1 : website.workingDays_dinein[key]['working24'] == false ? website.workingDays_dinein[key]['working24'] = 0 : null;
}
///////////////

website.address = website.addresses[lang];
website.trendingProducts = website.trendingProducts;
window.announcement = website.website_announcements[lang];
website.privacyPolicy = website.website_privacyPolicy[lang];
website.restaurantName = website.websiteNames[lang] != '' && website.websiteNames[lang] != null ? website.websiteNames[lang] : website.domainName;
// website.languages = website.languages.split('.')
if(website.isDemo == true && website.templateData.imgsType == 'trans'){
    for(const key in imgs){
        imgs[key].url = (imgs[key].url).replace('/demo/','/demoTrans/')
        imgs[key].thumbnailUrl = (imgs[key].thumbnailUrl).replace('/demo/','/demoTrans/')
    }
}


website.logo = website.logo ? `/storage/${imgs.find(item => item.id == website.logo).url}` : `/storage/imgs/templates/${website.template}/logo.webp`
website.icon = website.icon ? `/storage/${imgs.find(item => item.id == website.icon).url}` : `/storage/imgs/templates/${website.template}/icon.webp`

for(const key in products){

    products[key].imgUrl = products[key].img_id ? '/storage/'+imgs.find(item => item.id == products[key].img_id).url : '/storage/imgs/noimg.png';
    products[key].thumbnailUrl = products[key].img_id ? '/storage/'+imgs.find(item => item.id == products[key].img_id).thumbnailUrl : '/storage/imgs/noimg.png';
    products[key].nameLang = products[key][`name_${lang}`] ? products[key][`name_${lang}`] : products[key].name;
    products[key].descriptionLang = products[key][`description_${lang}`] ? products[key][`description_${lang}`] : ``;
    products[key].catName = categories.find(item=> item.id == products[key].category_id).name;
    products[key].link = `/${urlLang}/${categories.find(item=> item.id == products[key].category_id).name}/${products[key].name}`;
    let productDefaultPrice = parseFloat(products[key].price);
    for(const key2 in products[key].product_options){
        for(const key3 in products[key].product_options[key2].product_option_selections){
            if(products[key].product_options[key2].product_option_selections[key3].isDefault == true){
                productDefaultPrice = productDefaultPrice + parseFloat(products[key].product_options[key2].product_option_selections[key3].price)
            }
        }
    }
    products[key].defaultPrice = website.currency+parseFloat(productDefaultPrice).toFixed(2);
}
for(const key in categories){
    categories[key].imgUrl = categories[key].img_id ? `/storage/${imgs.find(item => item.id == categories[key].img_id).url}` : `/storage/imgs/noimg.png`;
    categories[key].thumbnailUrl = categories[key].img_id ? `/storage/${imgs.find(item => item.id == categories[key].img_id).thumbnailUrl}` : `/storage/imgs/noimg.png`;
    categories[key].nameLang = categories[key][`name_${lang}`] ? categories[key][`name_${lang}`] : categories[key].name;
    categories[key].descriptionLang = categories[key][`description_${lang}`] ? categories[key][`description_${lang}`] : '';
    categories[key].link = `/${urlLang}/${categories[key].name}`;
}

window.loginWithCart = false;
window.orders = {};
window.trackingOrder = null;
window.promocode = null;
window.announcement_Arr = []
window.reviews = [];
window.browsingProduct = null;
window.browsingCategory = null;
for(const key in products){
    products[key].getReviews = true;
    products[key].noMoreReviews = false;
    window.reviews[products[key].id] = [];
}
///////
website.topRatedProducts = [];
for(const key in products){
    products[key].rating > 0 ? website.topRatedProducts.push(products[key]) : null;
}
website.topRatedProducts.sort( (a, b) => {
    if(Math.round(b.rating) == Math.round(a.rating)){
        return parseFloat(b.ratings_sum) - parseFloat(a.ratings_sum);
    }else{
        return parseFloat(b.rating ) - parseFloat(a.rating);
    }
})
website.topRatedProducts = website.topRatedProducts.slice(0,10)
//////
website.mostPopularProducts = [];
for(const key in products){
    products[key].ordered_sum > 0 ? website.mostPopularProducts.push(products[key]) : null;
}
website.mostPopularProducts.sort((a,b) => {
    return parseInt(b.ordered_sum) - parseInt(a.ordered_sum);
})
// console.log(website.mostPopularProducts)
website.mostPopularProducts = website.mostPopularProducts.slice(0,10)
/////
website.trendingProducts2 = [];
for(const key in website.trendingProducts){
    let product = products.find(item => item.name == key);
    if(typeof(product) !== 'undefined'){
        website.trendingProducts2.push(product);
    }
}
// console.log(website.trendingProducts2)

// if(routeName == 'website.home'){
    website.gallery == '' ? website.gallery = [] : website.gallery = website.gallery.split('.');
    website.galleryImgs = [];
    if(website.isDemo){
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery1.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery1_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery2.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery2_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery3.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery3_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery4.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery4_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery5.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery5_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery6.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery6_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery7.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery7_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery8.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery8_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery9.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery9_thumbnail.webp`});
        website.galleryImgs.push({url:`/storage/imgs/demo/${website.domainName}/gallery/gallery10.webp`,thumbnailUrl:`/storage/imgs/demo/${website.domainName}/gallery/gallery10_thumbnail.webp`});
    }else{
        for(const key in website.gallery){
            try{
                website.galleryImgs.push({
                    url:'/storage/'+imgs.find(item=> item.id == website.gallery[key]).url,
                    thumbnailUrl:'/storage/'+imgs.find(item=> item.id == website.gallery[key]).thumbnailUrl
                })
            } catch{}


        }
    }
    if(website.galleryImgs.length == 0){
        $('.gallerySection').hide();
    }
    // console.log(website.galleryImgs)
    website.introImg_url = website.intro.img != 'template' ? `/storage/${imgs.find(item => item.id == website.intro.img).url}` : `/storage/imgs/templates/${website.template}/intro.webp` ;

    !website.intro[`title_${lang}`] ? website.introTitle = website.restaurantName : website.introTitle = website.intro[`title_${lang}`]
    !website.intro[`des_${lang}`] ? website.introDescription = website.websiteDescriptions[lang] : website.introDescription = website.intro[`des_${lang}`]

    website.infoImg_url = website.info.img != 'template' ? `/storage/${imgs.find(item => item.id == website.info.img).url}` : `/storage/imgs/templates/${website.template}/info.webp`
    !website.info[`title_${lang}`] ? website.infoTitle = '' : website.infoTitle = website.info[`title_${lang}`]
    !website.info[`des_${lang}`] ? website.infoDescription = '' : website.infoDescription = website.info[`des_${lang}`]

    website.ourStoryImg_url = website.ourStory.img != 'template' ? `/storage/${imgs.find(item => item.id == website.ourStory.img).url}` : `/storage/imgs/templates/${website.template}/ourStory.webp`;
    !website.ourStory[`title_${lang}`] ? website.ourStoryTitle = '' : website.ourStoryTitle = website.ourStory[`title_${lang}`]
    !website.ourStory[`des_${lang}`] ? website.ourStoryDescription = '' : website.ourStoryDescription = website.ourStory[`des_${lang}`]

    let tempCustomersReviews = [];
    for(const key in customersReviews){
        let product = products.find(item=> item.id == customersReviews[key].product_id);
        if(typeof(product) !== 'undefined'){
            tempCustomersReviews.push(customersReviews[key]);
        }
    }
    customersReviews = tempCustomersReviews;
    if(customersReviews.length == 0){
        $('.customersReviewsSection').hide();
    }
    //////
    !website.topRatedProducts.length > 0 ? $('.topRatedSection').hide() : null ;
    !website.mostPopularProducts.length > 0 ? $('.mostPopularSection').hide() : null ;
    !website.trendingProducts2.length > 0 ? $('.trendingSection').hide() : null ;

// }
console.log(website)
chatmsgs = [];
