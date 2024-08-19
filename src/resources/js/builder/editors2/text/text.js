
//////
show_text_format_popup = async function(){
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let rect = range.getBoundingClientRect();
    let top = rect.top + $(window).scrollTop();
    let left = rect.left + $(window).scrollLeft();
    let isClipboardEmpty
    try{
        let clipboardText = await navigator.clipboard.readText();
        isClipboardEmpty = !clipboardText.trim();
    }catch{
        isClipboardEmpty = true;
    }
    $('.text_format_popup').css({
        top:top - 50,
        left:left,
        right:'unset',
    }).text('').append(
        $('<button/>',{tooltip:texts.styling.font_size,class:'ico-font_size text_format_btnfont_size contextMenu',tag:'SPAN',contextMenu_type:'text_editor_font_size'}),
        $('<button/>',{tooltip:texts.styling.bold,class:'ico-bold text_format_btn',tag:'SPAN',action:'bold'}),
        $('<button/>',{tooltip:texts.styling.italic,class:'ico-italic text_format_btn',tag:'SPAN',action:'italic'}),
        $('<button/>',{tooltip:texts.styling.underline,class:'ico-underline text_format_btn',tag:'SPAN',action:'underline'}),
        $('<button/>',{tooltip:texts.styling.font_color,class:'ico-text_color text_format_btn_font_color_show'}),
        draw_color_picker({
            dummy:true,
            dummy_class:'text_format_btn_font_color',
        }),
        $('<button/>',{tooltip:texts.styling.bg_color,class:'ico-background_color text_format_btn_bg_color_show'}),
        draw_color_picker({
            dummy:true,
            dummy_class:'text_format_btn_bg_color',
        }),
        $('<button/>',{tooltip:texts.styling.clear_formating,class:'ico-erase text_format_btn',tag:'SPAN',action:'remove_format'}),
        $('<div/>',{class:'text_format_btn_split'}),
        $('<button/>',{tooltip:texts.styling.hyperlink,class:'ico-link text_format_btn_hyperlink contextMenu',tag:'A',contextMenu_type:'text_editor_hyperlink'}),
        $('<button/>',{tooltip:texts.styling.remove_hyperlink,class:'ico-unlink none text_format_btn',tag:'SPAN',action:'remove_hyperlink'}),
        $('<div/>',{class:'text_format_btn_split'}),
        $('<button/>',{tooltip:texts.copy,class:`ico-copy2 ${selection.toString().trim() == '' || selection.toString().length == 0 ? 'text_format_btn_dummy' : ''}`,click:async function(){
            try {
                let selectedText = window.getSelection().toString();
                await navigator.clipboard.writeText(selectedText);
            }catch{}
        }}),
        $('<button/>',{tooltip:texts.cut,class:`ico-cut2 ${selection.toString().trim() == '' || selection.toString().length == 0 ? 'text_format_btn_dummy' : ''}`,click:async function(){
                try {
                    var selectedText = window.getSelection();
                    if (selectedText.toString()) {
                        await navigator.clipboard.writeText(selectedText.toString());
                        selectedText.deleteFromDocument();
                        new_action(false,true)
                    }
                }catch{}
            }}),
        $('<button/>',{tooltip:texts.paste,class:`ico-paste2 ${isClipboardEmpty ? 'text_format_btn_dummy' : ''}`,click:async function(){
            try {
                let editableDiv = document.querySelector('[contenteditable="true"]');
                if (editableDiv) {
                    let clipboardText = await navigator.clipboard.readText();
                    let selection = window.getSelection();
                    let range = selection.getRangeAt(0);
                    range.deleteContents();
                    
                    let textNode = document.createTextNode(clipboardText);
                    range.insertNode(textNode);
    
                    range.setStartAfter(textNode);
                    range.setEndAfter(textNode);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    new_action(false,true)
                }
            }catch{}
        }}),
        $('<div/>',{class:'text_format_btn_split'}),
        $('<button/>',{tooltip:texts.styling.align_start,class:'ico-align_start text_format_btn',tag:'SPAN',action:'text_align',key:'start'}),
        $('<button/>',{tooltip:texts.styling.align_center,class:'ico-align_center text_format_btn',tag:'SPAN',action:'text_align',key:'center'}),
        $('<button/>',{tooltip:texts.styling.align_end,class:'ico-align_end text_format_btn',tag:'SPAN',action:'text_align',key:'end'}),
    ).removeClass('none')
    set_text_format_popup_btns();
    if($('.text_format_popup').offset().left + $('.text_format_popup').width() > $(window).width()){
        $('.text_format_popup').css({
            left:'unset',
            right:'50px',
        })
    }
}
set_text_format_popup_btns = function(){
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let anchorNode = range.startContainer;
    let element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
    //
    if(element.style['font-weight'] == 'bold'){
        $('.text_format_popup').find('.text_format_btn[action="bold"]').addClass('text_format_btn_selected')
    }else{
        $('.text_format_popup').find('.text_format_btn[action="bold"]').removeClass('text_format_btn_selected')
    }

    if(element.style['font-style'] == 'italic'){
        $('.text_format_popup').find('.text_format_btn[action="italic"]').addClass('text_format_btn_selected')
    }else{
        $('.text_format_popup').find('.text_format_btn[action="italic"]').removeClass('text_format_btn_selected')
    }

    if(element.style['text-decoration'] == 'underline'){
        $('.text_format_popup').find('.text_format_btn[action="underline"]').addClass('text_format_btn_selected')
    }else{
        $('.text_format_popup').find('.text_format_btn[action="underline"]').removeClass('text_format_btn_selected')
    }

    if(element.tagName == 'A'){
        $('.text_format_popup').find('.text_format_btn_hyperlink').addClass('none')
        $('.text_format_popup').find('.text_format_btn[action="remove_hyperlink"]').addClass('text_format_btn_selected').removeClass('none')
    }else{
        $('.text_format_popup').find('.text_format_btn_hyperlink').removeClass('none')
        $('.text_format_popup').find('.text_format_btn[action="remove_hyperlink"]').removeClass('text_format_btn_selected').addClass('none')
    }

    if(element.style['font-size'] !== '1em' && element.style['font-size'] !== ''){
        $('.text_format_popup').find('.text_format_btnfont_size').addClass('text_format_btn_selected')
    }else{
        $('.text_format_popup').find('.text_format_btnfont_size').removeClass('text_format_btn_selected')
    }

    if(element.style['color'] != ''){
        $('.text_format_popup').find('.text_format_btn_font_color_show').addClass('text_format_btn_selected')
        $('.text_format_popup').find('.text_format_btn_font_color_show').css('color',`${element.style['color']} !important`);
        set_dummy_val($('.text_format_popup').find('.text_format_btn_font_color'),element.style['color'])
    }else{
        $('.text_format_popup').find('.text_format_btn_font_color_show').removeClass('text_format_btn_selected').css('color','');
    }

    if(element.style['background-color'] != ''){
        $('.text_format_popup').find('.text_format_btn_bg_color_show').addClass('text_format_btn_selected')
        $('.text_format_popup').find('.text_format_btn_bg_color_show').css('color',`${element.style['background-color']} !important`);
        set_dummy_val($('.text_format_popup').find('.text_format_btn_bg_color'),element.style['background-color'])
    }else{
        $('.text_format_popup').find('.text_format_btn_bg_color_show').removeClass('text_format_btn_selected').css('color','');
    }

    let elem_data = get_elem_data(window.selected).elem;
    let text_align;
    window.current_view == 'desktop' ? text_align = elem_data.css['text-align'] : window.current_view == 'mobile' ? text_align = elem_data.css_mobile['text-align'] : null;
    $('.text_format_popup').find(`.text_format_btn[action="text_align"]`).removeClass('text_format_btn_selected')
    $('.text_format_popup').find(`.text_format_btn[action="text_align"][key="${text_align}"]`).addClass('text_format_btn_selected')

}
get_selection_element = function(tag,create){
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let anchorNode = range.startContainer;
    console.log(anchorNode.nodeType)
    let element = null;
    if (selection.rangeCount === 0 || selection.toString().trim() === '') {
        element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
    }else{
        if(anchorNode.nodeType === 1 ){
            element = range.commonAncestorContainer;
        }else if($(anchorNode.parentElement).text().trim() == selection.toString().trim()){
            element = anchorNode.parentElement;
        }else if($(range.commonAncestorContainer).hasClass('format_container')){
            element = range.commonAncestorContainer;
        }
        else{
            create ? element = create_element(tag) : null;
        }
        if($(element).hasClass('elem')){
            create ? element = create_element(tag) : null;
        }
    }
    return element
}
create_element = function(tag){
    let newElement = document.createElement(tag);
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    range.surroundContents(newElement);
    newElement.style['font-weight'] = newElement.parentNode.style['font-weight'];
    newElement.style['font-style'] = newElement.parentNode.style['font-style'];
    newElement.style['text-decoration'] = newElement.parentNode.style['text-decoration'];
    newElement.style['font-size'] = newElement.parentNode.style['font-size'];
    setTimeout(()=>{
        range.selectNodeContents(newElement);
        selection.addRange(range);
    })
    return newElement;
}
clear_format_text = function(element){
    let remove_elem = false;
    if(element.attr('style') == '' && element.prop('tagName') == 'SPAN'){
        remove_elem = true;
    }
    if(element.attr('style') == undefined && element.prop('tagName') == 'SPAN'){
        remove_elem = true;
    }
    if(element.text() == '' && element.prop('tagName') == 'SPAN'){
        remove_elem = true;
    }
    if(!element.hasClass('elem')){
        if(
            element.prop('tagName') == 'SPAN' &&
            element.parent().prop('tagName') == 'SPAN' &&
            element.css('font-weight') == element.parent().css('font-weight') &&
            element.css('font-style') == element.parent().css('font-style') &&
            element.css('text-decoration') == element.parent().css('text-decoration') &&
            element.css('font-size') == element.parent().css('font-size')
        ){
            remove_elem = true;
        }

        if(element.attr('style') == element.parent().attr('style') && element.prop('tagName') == 'SPAN' && element.parent().prop('tagName') == 'SPAN'){
            remove_elem = true;
        }
        if(element.prop('tagName') != 'SPAN' && element.prop('tagName') != 'A'){
            remove_elem = true;
        }
    }
    if(element.hasClass('format_container')){remove_elem = false}


    if(remove_elem){
        element.after(element.html())
        element.remove();
        if(!$('[contenteditable="true"]').children().first().hasClass('format_container')){
            $('[contenteditable="true"]').children().first().addClass('format_container')
        }
    }
    element.children().each(function(){
        clear_format_text($(this))
    })

}
format_text = function(element,action,key){
    let elem_data = get_elem_data(window.selected);
    switch(action){
        case 'bold':
            try{
                if(element.style['font-weight'] == 'bold'){
                    element.style['font-weight'] = 'normal';
                }else{
                    element.style['font-weight'] = 'bold';
                }
            }catch{
            }
        break;
        case 'italic':
            try{
                if(element.style['font-style'] == 'italic'){
                    element.style['font-style'] = 'normal';
                }else{
                    element.style['font-style'] = 'italic';
                }
            }catch{
            }
        break;
        case 'underline':
            try{
                if(element.style['text-decoration'] == 'underline'){
                    element.style['text-decoration'] = 'none';
                }else{
                    element.style['text-decoration'] = 'underline';
                }
            }catch{
            }
        break;
        case 'hyperlink':
            let hyperlink = get_hyperlinks()[key];
            let _elem;
            if($(element).prop('tagName') !== 'A'){
                $(element).before(_elem = $('<a/>',{
                    style:$(element).attr('style'),
                    text:$(element).text(),
                }))
                $(element).remove();
            }else{
                _elem = $(element);
            }
            _elem.removeClass('open_page open_popup scroll_to_section').addClass(hyperlink.class);
            for(const key2 in hyperlink.attr){
                if(key2 == 'href'){
                    _elem.attr('href',`/${window.preview_language}${hyperlink.attr[key2]}`)
                }else{
                    _elem.attr(key2,hyperlink.attr[key2])
                }
            }
            _elem.css('text-decoration','underline');
             element = _elem[0]
        break;
        case 'remove_hyperlink':
            let _elem2;
            $(element).css('text-decoration','');
            $(element).after(_elem2 = $('<span/>',{
                style:$(element).attr('style'),
                text:$(element).text(),
            }));
            $(element).remove();
            element = _elem2[0]
        break;
        case 'font_size':
            $(element).css('font-size',key)
        break;
        case 'font_color':
            $(element).css('color',key)
        break;
        case 'bg_color':
            $(element).css('background-color',key)
        break;
        case 'remove_format':
            $(element).attr('style','')
            $(element).children().each(function(){
                $(this).attr('style','')
            })
        break;
        case 'text_align':
            elem_data.elem[`${window.current_view == 'desktop' ? 'css' : window.current_view == 'mobile' ? 'css_mobile' : null}`]['text-align'] = key;
            $(`.${elem_data.elem.class_selector}`).css('text-align',key)
        break;
    }
    elem_data.elem.text.val[window.preview_language] = $(`.${elem_data.elem.class_selector}`).html();
    new_action(true,false);
    setTimeout(()=>{
        set_text_format_popup_btns();
    })

}
///
$('body').on('click','.edit_text',function(){
    let key_tree = $(this).attr('key_tree');
    let elem_data = get_elem_data(key_tree);
    if(elem_data.elem.accessibility.includes('edit_text')){
        let contenteditable_elem = $(`.${elem_data.elem.class_selector}`);
        if(contenteditable_elem.attr('contenteditable') == 'false'){
            contenteditable_elem.attr('contenteditable',true);
            setTimeout(()=>{
                let selection = window.getSelection();
                let range = document.createRange();
                range.selectNodeContents(contenteditable_elem.find('.format_container')[0]);
                selection.removeAllRanges();
                selection.addRange(range);
                show_text_format_popup()
            })
        }
    }
})
document.addEventListener('selectionchange',function(){
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        if(selection.toString().trim() == ''){
            $('.text_format_popup').addClass('none')
        }
    }else{
        $('.text_format_popup').addClass('none')
    }
})
$('body').on('mouseup','#website',function(){
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        // if(selection.toString().trim() == ''){
            // $('.text_format_popup').addClass('none')
        // }else{
            show_text_format_popup()
        // }
    }else{
        $('.text_format_popup').addClass('none')
    }
})
$('body').on('input','.elem[contenteditable="true"]',function(){
    clear_format_text($(this))
    setTimeout(()=>{
        let elem_data = get_elem_data(window.selected);
        elem_data.elem.text.val[window.preview_language] = $(this).html();
        new_action(true,false);
    })

})
$('body').on('mouseup','.elem[contenteditable="true"]',function(){
    clear_format_text($(this))
})
//
$('body').on('click','.text_format_btn',function(e){
    e.preventDefault();
    let tag = $(this).attr('tag')
    let element = get_selection_element(tag,true);
    setTimeout(()=>{
        format_text(element,$(this).attr('action'),$(this).attr('key'));
    },200)
})
$('body').on('change','.text_format_btn_font_color',function(){
    let val = get_dummy_val($(this));
    let tag = 'SPAN';
    let element = get_selection_element(tag,true);
    format_text(element,'font_color',val)
})
$('body').on('change','.text_format_btn_bg_color',function(){
    let val = get_dummy_val($(this));
    let tag = 'SPAN';
    let element = get_selection_element(tag,true);
    format_text(element,'bg_color',val)
})
$('body').on('click','.text_format_btn_font_color_show',function(){
    setTimeout(()=>{
        $(this).closest('.text_format_popup').find('.text_format_btn_font_color').trigger('mouseup')
    })
})
$('body').on('click','.text_format_btn_bg_color_show',function(){
    setTimeout(()=>{
        $(this).closest('.text_format_popup').find('.text_format_btn_bg_color').trigger('mouseup')
    })
})
//
$('body').on('keydown','[contenteditable]',function(e){
    if((e.ctrlKey || e.metaKey) && e.which == 67){
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 88){
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 86	){
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 65){

    }
    else if((e.ctrlKey || e.metaKey) || e.altKey){
        e.preventDefault();
    }else{
        keyboard_shortcuts(e)
    }
})
$('body').on('paste','[contenteditable]',function(e){
    e.preventDefault();
    paste_text();
})
paste_text = function(){
    let clipboardData = (event.clipboardData || window.clipboardData).getData('text/plain');
    let selection = window.getSelection();
    let selection_string = selection.toString();
    let selected_range = window.getSelection().getRangeAt(0);
    selected_range.deleteContents();
    let newNode = document.createTextNode(clipboardData);
    selected_range.insertNode(newNode);
    selected_range.setEnd(newNode, newNode.length);
    selected_range.setStart(newNode, newNode.length);
    setTimeout(()=>{
        let contenteditable_elem = $('[contenteditable="true"]')
        clear_format_text(contenteditable_elem.find('.format_container'));
        contenteditable_elem.trigger('input')
    })
}
//
draw_text_editor_hyperlinks_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-home',class:`text_format_btn`,child1_text:texts.website_pages.home,attrs:{action:'hyperlink',tag:'A',key:'home'}}),
        draw_contextMenu_elem({icon:'ico-about_us',class:`text_format_btn`,child1_text:texts.website_pages.about_us,attrs:{action:'hyperlink',tag:'A',key:'about_us'}}),
        draw_contextMenu_elem({icon:'ico-product fs101',class:`text_format_btn`,child1_text:texts.website_pages.all_products,attrs:{action:'hyperlink',tag:'A',key:'all_products'}}),
        draw_contextMenu_elem({icon:'ico-cart',class:`text_format_btn`,child1_text:texts.website_pages.cart,attrs:{action:'hyperlink',tag:'A',key:'cart'}}),
        draw_contextMenu_elem({icon:'ico-order',class:`text_format_btn`,child1_text:texts.website_pages.track_order,attrs:{action:'hyperlink',tag:'A',key:'track_order'}}),
        draw_contextMenu_elem({icon:'ico-privacy_policy',class:`text_format_btn`,child1_text:texts.website_pages.privacy_policy,attrs:{action:'hyperlink',tag:'A',key:'privacy_policy'}}),
        draw_contextMenu_elem({child1_text:texts.website_pages.category_pages,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_categories_contextMenu()}),
        draw_contextMenu_elem({child1_text:texts.website_pages.product_pages,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_products_contextMenu()}),
        draw_contextMenu_elem({child1_text:texts.website_pages.add_to_cart,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_add_to_cart_contextMenu()}),
        window.selected_page == 'home' ? draw_contextMenu_elem({child1_text:texts.website_pages.scroll_to_section,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_scroll_to_section_contextMenu()}) : '',


    )
}
draw_text_editor_hyperlinks_categories_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.categories){
        let category = window.website_data.categories[key];
        contextMenu.append(
            draw_contextMenu_elem({img:category.img.replace('.','_thumbnail.'),class:`text_format_btn`,child1_text:category.name,attrs:{action:'hyperlink',tag:'A',key:category.name}})
        )
    }
    return contextMenu;
}
draw_text_editor_hyperlinks_products_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.products){
        let product = window.website_data.products[key];
        contextMenu.append(
            draw_contextMenu_elem({img:product.img.replace('.','_thumbnail.'),class:`text_format_btn`,child1_text:product.name,attrs:{action:'hyperlink',tag:'A',key:product.name}})
        )
    }
    return contextMenu;
}
draw_text_editor_hyperlinks_add_to_cart_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.products){
        let product = window.website_data.products[key];
        contextMenu.append(
            draw_contextMenu_elem({img:product.img.replace('.','_thumbnail.'),class:`text_format_btn`,child1_text:product.name,attrs:{action:'hyperlink',tag:'A',key:`addToCart_${product.name}`}})
        )
    }
    return contextMenu;
}
draw_text_editor_hyperlinks_scroll_to_section_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.template.home){
        let section = window.template.home[key];
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-section',class:`text_format_btn`,child1_text:section.name,attrs:{action:'hyperlink',tag:'A',key:`scroll_to_${section.name}`}})
        )
    }
    return contextMenu;
}
draw_text_editor_font_size_contextMenu = function(){
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let anchorNode = range.startContainer;
    let element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
    let font_size = '';
    try{
        element.style['font-size'] == '1.6em' ? font_size = '1.6' : null;
        element.style['font-size'] == '1.4em' ? font_size = '1.4' : null;
        element.style['font-size'] == '1.2em' ? font_size = '1.2' : null;
        element.style['font-size'] == '0.8em' ? font_size = '0.8' : null;
        element.style['font-size'] == '0.6em' ? font_size = '0.6' : null;
        element.style['font-size'] == '0.4em' ? font_size = '0.4' : null;
    }catch{}
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-font_size fs102',class:`text_format_btn`,child2_class:`${font_size == '1.4' ? 'ico-check' : ''}`,child1_text:texts.styling.larger,attrs:{tag:'SPAN',action:'font_size',key:'1.4em'}}),
        draw_contextMenu_elem({icon:'ico-font_size fs103',class:`text_format_btn`,child2_class:`${font_size == '1.6' ? 'ico-check' : ''}`,child1_text:texts.styling.largest,attrs:{tag:'SPAN',action:'font_size',key:'1.6em'}}),
        draw_contextMenu_elem({icon:'ico-font_size fs101',class:`text_format_btn`,child2_class:`${font_size == '1.2' ? 'ico-check' : ''}`,child1_text:texts.styling.large,attrs:{tag:'SPAN',action:'font_size',key:'1.2em'}}),
        draw_contextMenu_elem({icon:'ico-font_size fs1',class:`text_format_btn`,child2_class:`${font_size == '' ? 'ico-check' : ''}`,child1_text:texts.styling.normal,attrs:{tag:'SPAN',action:'font_size',key:'1em'}}),
        draw_contextMenu_elem({icon:'ico-font_size fs09',class:`text_format_btn`,child2_class:`${font_size == '0.8' ? 'ico-check' : ''}`,child1_text:texts.styling.small,attrs:{tag:'SPAN',action:'font_size',key:'0.8em'}}),
        draw_contextMenu_elem({icon:'ico-font_size fs08',class:`text_format_btn`,child2_class:`${font_size == '0.6' ? 'ico-check' : ''}`,child1_text:texts.styling.smaller,attrs:{tag:'SPAN',action:'font_size',key:'0.6em'}}),
        draw_contextMenu_elem({icon:'ico-font_size fs07',class:`text_format_btn`,child2_class:`${font_size == '0.4' ? 'ico-check' : ''}`,child1_text:texts.styling.smallest,attrs:{tag:'SPAN',action:'font_size',key:'0.4em'}}),
    )
}
