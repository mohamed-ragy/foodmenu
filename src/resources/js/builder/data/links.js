get_hyperLinks = function(){
    let  hyperLinks = [
        {
            name:texts.website_pages.home,
            class:'open_page',
            attr:{
                href:'/home',
                page:'home',
            }
        },{
            name:texts.website_pages.about_us,
            class:'open_page',
            attr:{
                href:'/about_us',
                page:'about_us',
            }
        },{
            name:texts.website_pages.all_products,
            class:'open_page',
            attr:{
                href:'/all_products',
                page:'all_products',
            }
        },{
            name:texts.website_pages.cart,
            class:'open_page',
            attr:{
                href:'/cart',
                page:'cart',
            }
        },{
            name:texts.website_pages.track_order,
            class:'open_page',
            attr:{
                href:'/track_order',
                page:'track_order',
            }
        },{
            name:texts.website_pages.privacy_policy,
            class:'open_page',
            attr:{
                href:'/privacy_policy',
                page:'privacy_policy',
            }
        }
    ];
    for(const key in window.website_data.categories){
        let category = window.website_data.categories[key];
        hyperLinks.push({
            name:texts.website_pages.category_page.replace(':name:',category.name),
            class:'open_page',
            attr:{
                href:`/${category.name}`,
                page:'category',
                category:category.name
            }
        });
        for(const key in window.website_data.products){
            let product = window.website_data.products[key];
            if(product.category_id == category.id){
                hyperLinks.push({
                    name:texts.website_pages.product_page.replace(':name:',product.name),
                    class:'open_page',
                    attr:{
                        href:`/${category.name}/${product.name}`,
                        page:'product',
                        category:category.name,
                        product:product.name
                    }
                });

                hyperLinks.push({
                    name:texts.website_pages.addToCart_product.replace(':name:',product.name),
                    class:'open_popup',
                    attr:{
                        href:'/#add_to_cart',
                        popup:'add_to_cart',
                        product:product.name
                    }
                })
            }

        }
    }
    if(window.selected_page == 'home'){
        for(const key in window.template.home){
            hyperLinks.push({
                name:texts.scroll_to.replace(':name:',window.template.home[key].name),
                class:'scroll_to_section',
                attr:{
                    href:'/#scroll_to_section',
                    section:window.template.home[key].class_selector,
                }
            })
        }
    }
    return hyperLinks

}
