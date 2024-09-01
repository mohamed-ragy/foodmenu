draw_button_function_editor = function(data){
    let editor = $('<div/>',{
        class:`editor button_function_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    });

    return editor;
}
set_button_function_editor = function(editor){
    let val = get_editor_val(editor);
    let elem = get_element_data(window.selected);
    editor.text('').append(
        draw_button_function_preview(elem)
    )
}
draw_button_function_hyperlinks_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-home',class:`editor_set_function`,child1_text:texts.website_pages.home,attrs:{hyperlink_key:'home'}}),
        draw_contextMenu_elem({icon:'ico-about_us',class:`editor_set_function`,child1_text:texts.website_pages.about_us,attrs:{hyperlink_key:'about_us'}}),
        draw_contextMenu_elem({icon:'ico-product fs101',class:`editor_set_function`,child1_text:texts.website_pages.all_products,attrs:{hyperlink_key:'all_products'}}),
        draw_contextMenu_elem({icon:'ico-cart',class:`editor_set_function`,child1_text:texts.website_pages.cart,attrs:{hyperlink_key:'cart'}}),
        draw_contextMenu_elem({icon:'ico-order',class:`editor_set_function`,child1_text:texts.website_pages.track_order,attrs:{hyperlink_key:'track_order'}}),
        draw_contextMenu_elem({icon:'ico-privacy_policy',class:`editor_set_function`,child1_text:texts.website_pages.privacy_policy,attrs:{hyperlink_key:'privacy_policy'}}),
        draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.category_pages,child2_class:'ico-arrowRight',submenu:draw_button_function_hyperlinks_categories_contextMenu()}),
        draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.product_pages,child2_class:'ico-arrowRight',submenu:draw_button_function_hyperlinks_products_contextMenu()}),
        draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.add_to_cart,child2_class:'ico-arrowRight',submenu:draw_button_function_hyperlinks_add_to_cart_contextMenu()}),
        window.selected_page == 'home' ? draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.scroll_to_section,child2_class:'ico-arrowRight',submenu:draw_button_function_hyperlinks_scroll_to_section_contextMenu()}) : '',
    )
}
draw_button_function_hyperlinks_categories_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.categories){
        let category = window.website_data.categories[key];
        contextMenu.append(
            draw_contextMenu_elem({img:category.img.replace('.','_thumbnail.'),class:`editor_set_function`,child1_text:category.name,attrs:{hyperlink_key:category.name}})
        )
    }
    return contextMenu;
}
draw_button_function_hyperlinks_products_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.products){
        let product = window.website_data.products[key];
        contextMenu.append(
            draw_contextMenu_elem({img:product.img.replace('.','_thumbnail.'),class:`editor_set_function`,child1_text:product.name,attrs:{hyperlink_key:product.name}})
        )
    }
    return contextMenu;
}
draw_button_function_hyperlinks_add_to_cart_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.products){
        let product = window.website_data.products[key];
        contextMenu.append(
            draw_contextMenu_elem({img:product.img.replace('.','_thumbnail.'),class:`editor_set_function`,child1_text:product.name,attrs:{hyperlink_key:`addToCart_${product.name}`}})
        )
    }
    return contextMenu;
}
draw_button_function_hyperlinks_scroll_to_section_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.template.home){
        let section = window.template.home[key];
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-section',class:`editor_set_function`,child1_text:section.name,attrs:{hyperlink_key:`scroll_to_${section.name}`}})
        )
    }
    return contextMenu;
}

draw_button_function_preview = function(elem){
    let img;
    elem.attr.href == 'null' ? img = $('<div/>',{class:'button_function_preview_icon cR ico-no'}) : '';
    let text;
    elem.attr.href == 'null' ? text = texts.styling.no_action : '';
    let hyperlink = elem.attr.href == 'null' ? '' : elem.attr.href;
    if(elem.class.includes('open_page')){
        switch(elem.attr.page){
            case 'home':
                img = $('<div/>',{class:'button_function_preview_icon ico-home'})
                text = texts.open_name_page.replace(':name:',texts.website_pages.home.replace('page',''));
            break;
            case 'about_us':
                img = $('<div/>',{class:'button_function_preview_icon ico-about_us'})
                text = texts.open_name_page.replace(':name:',texts.website_pages.about_us.replace('page',''));
                break;
            case 'all_products':
                img = $('<div/>',{class:'button_function_preview_icon ico-product fs101'})
                text = texts.open_name_page.replace(':name:',texts.website_pages.all_products.replace('page',''));
            break;
            case 'cart':
                img = $('<div/>',{class:'button_function_preview_icon ico-cart'})
                text = texts.open_name_page.replace(':name:',texts.website_pages.cart.replace('page',''));
            break;
            case 'track_order':
                img = $('<div/>',{class:'button_function_preview_icon ico-order'})
                text = texts.open_name_page.replace(':name:',texts.website_pages.track_order.replace('page',''));
            break;
            case 'privacy_policy':
                img = $('<div/>',{class:'button_function_preview_icon ico-privacy_policy'})
                text = texts.open_name_page.replace(':name:',texts.website_pages.privacy_policy.replace('page',''));
            break;
            case 'category':
                let category = window.website_data.categories.find(item=>item.name == elem.attr.category)
                img = $('<img/>',{class:'button_function_preview_img',src:category.img.replace('.','_thumbnail.')});
                text = texts.open_name_page.replace(':name:',category.name.replace('page',''));
            break;
            case 'product':
                let product = window.website_data.products.find(item=>item.name == elem.attr.product)
                img = $('<img/>',{class:'button_function_preview_img',src:product.img.replace('.','_thumbnail.')});
                text = texts.open_name_page.replace(':name:',product.name.replace('page',''));
            break;
        }
    }else if(elem.class.includes('open_popup')){
        switch(elem.attr.popup){
            case 'add_to_cart':
                let product = window.website_data.products.find(item=>item.name == elem.attr.product)
                img = $('<img/>',{class:'button_function_preview_img',src:product.img.replace('.','_thumbnail.')});
                text = texts.add_name_to_cart.replace(':name:',product.name);
            break;
        }
    }else if(elem.class.includes('scroll_to_section')){
        img = $('<div/>',{class:'button_function_preview_icon ico-section'})
        text = texts.scroll_to.replace(':name:',window.template.home.find(item=>item.class_selector == elem.attr.section).name);
        console.log(text)
    }

    return $('<div/>',{class:'button_function_preview_container contextMenu',contextMenu_type:'button_function'}).append(
        $('<div/>',{class:'w100p row alnC jstfy'}).append(
            img,
            $('<div/>',{class:'fs085 mis-5 mie-20',text:text}),
            $('<div/>',{class:'ico-arrowDown fs08'})
        ),
        // $('<div/>',{class:''}).append(
        //     $('<a/>',{class:'w100p',text:hyperlink,href:hyperlink,target:'_blank'})
        // )
    )
}

//events
$('body').on('click','.button_function_preview_container',function(){
    window.selected_button_function_editor = $(this).closest('.button_function_editor')
})
$('body').on('click','.editor_set_function',function(){
    let action = $(this).attr('action_key');
    let elem = get_element_data(window.selected);
    elem.class = elem.class.replaceAll('open_page','').replaceAll('open_popup','').replaceAll('scroll_to_section','');
    delete elem.attr.href;
    delete elem.attr.page;
    delete elem.attr.popup;
    delete elem.attr.section;
    delete elem.attr.product;
    delete elem.attr.category;
    let elem_class_selector = get_element_data(window.selected).class_selector;
    $(`.${elem_class_selector}`).attr('href','')
    $(`.${elem_class_selector}`).attr('page','')
    $(`.${elem_class_selector}`).attr('popup','')
    $(`.${elem_class_selector}`).attr('section','')
    $(`.${elem_class_selector}`).attr('product','')
    $(`.${elem_class_selector}`).attr('category','')
    $(`.${elem_class_selector}`).removeClass('open_page')
    $(`.${elem_class_selector}`).removeClass('open_popup')
    $(`.${elem_class_selector}`).removeClass('scroll_to_section')

    let hyperlink = get_hyperlinks()[$(this).attr('hyperlink_key')];
    for(const key in hyperlink.attr){
        elem.attr[key] = hyperlink.attr[key];
        $(`.${elem_class_selector}`).attr(key,hyperlink.attr[key])
    }
    $(`.${elem_class_selector}`).addClass(hyperlink.class)
    elem.class = `${elem.class} ${hyperlink.class}`;
    new_action(window.selected_button_function_editor.attr('render'));
    set_button_function_editor(window.selected_button_function_editor);
})