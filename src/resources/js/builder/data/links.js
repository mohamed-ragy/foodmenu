get_hyperlinks = function(){
    let  hyperlinks = {
        home:{
            name:texts.website_pages.home,
            class:'open_page',
            attr:{
                href:'/home',
                page:'home',
            }
        },
        about_us:{
            name:texts.website_pages.about_us,
            class:'open_page',
            attr:{
                href:'/about_us',
                page:'about_us',
            }
        },
        all_products:{
            name:texts.website_pages.all_products,
            class:'open_page',
            attr:{
                href:'/all_products',
                page:'all_products',
            }
        },
        cart:{
            name:texts.website_pages.cart,
            class:'open_page',
            attr:{
                href:'/cart',
                page:'cart',
            }
        },
        track_order:{
            name:texts.website_pages.track_order,
            class:'open_page',
            attr:{
                href:'/track_order',
                page:'track_order',
            }
        },
        privacy_policy:{
            name:texts.website_pages.privacy_policy,
            class:'open_page',
            attr:{
                href:'/privacy_policy',
                page:'privacy_policy',
            }
        }
    };
    for(const key in window.website_data.categories){
        let category = window.website_data.categories[key];
        hyperlinks[category.name] = {
            name:texts.website_pages.category_page.replace(':name:',category.name),
            class:'open_page',
            attr:{
                href:`/${category.name}`,
                page:'category',
                category:category.name
            }
        }

        for(const key in window.website_data.products){
            let product = window.website_data.products[key];
            if(product.category_id == category.id){
                hyperlinks[product.name] = {
                    name:texts.website_pages.product_page.replace(':name:',product.name),
                    class:'open_page',
                    attr:{
                        href:`/${category.name}/${product.name}`,
                        page:'product',
                        category:category.name,
                        product:product.name
                    }
                }
                hyperlinks[`addToCart_${product.name}`] = {
                    name:texts.website_pages.addToCart_product.replace(':name:',product.name),
                    class:'open_popup',
                    attr:{
                        // href:'/#add_to_cart',
                        popup:'add_to_cart',
                        product:product.name
                    }
                }
            }
        }
    }

    // if(window.template.settings.selected_page == 'home'){
        for(const key in window.template[window.template.settings.selected_page]){
            let section = window.template[window.template.settings.selected_page][key];
            hyperlinks[`scroll_to_${section.name}`] = {
                name:texts.scroll_to.replace(':name:',section.name),
                class:'scroll_to_section',
                attr:{
                    // href:'/#scroll_to_section',
                    section:window.template[window.template.settings.selected_page][key].class_selector,
                }
            }
        }
    // }
    return hyperlinks

}
