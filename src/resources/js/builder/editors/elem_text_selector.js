draw_text_editors = function(data){
    let editors = $('<div/>',{
        class:`w100p`,
    });
    for(const key in window.website_data.languages){
        let language = window.website_data.languages[key];

        editors.append(
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09',text:language.name}),
                $('<div/>',{
                    class:'editor text_editor',
                    key_tree:data.key_tree,
                    key:language.code,
                }).append(
                    $('<div/>',{class:'text_editor_btns'}).append(
                        $('<button/>',{tooltip:texts.styling.font_size,class:'text_editor_format_style text_editor_format_font_size ico-font_size f09 contextMenu',contextMenu_type:'text_editor_font_size',key_tree:window.selected}),
                        $('<button/>',{tooltip:texts.styling.bold,class:'text_editor_format text_editor_format_style ico-bold',format_action:'bold',format_tag:'span'}),
                        $('<button/>',{tooltip:texts.styling.italic,class:'text_editor_format text_editor_format_style ico-italic',format_action:'italic',format_tag:'span'}),
                        $('<button/>',{tooltip:texts.styling.underline,class:'text_editor_format text_editor_format_style ico-underline',format_action:'underline',format_tag:'span'}),
                        draw_color_picker({
                            dummy:true,
                            dummy_class:'text_editor_format_color',
                        }),
                        $('<button/>',{tooltip:texts.styling.font_color,class:'text_editor_format text_editor_format_style ico-text_color fs08',format_action:'font_color',format_tag:'span'}),
                        draw_color_picker({
                            dummy:true,
                            dummy_class:'text_editor_format_bgcolor',
                        }),
                        $('<button/>',{tooltip:texts.styling.bg_color,class:'text_editor_format text_editor_format_style ico-background_color fs085',format_action:'bg_color',format_tag:'span'}),
                        $('<button/>',{tooltip:texts.styling.hyperlink,class:'text_editor_format_style text_editor_format_hyperlink ico-link fs08 contextMenu',contextMenu_type:'text_editor_hyperlink',key_tree:window.selected}),
                        $('<button/>',{tooltip:texts.styling.clear_formating,class:'text_editor_format text_editor_format_style ico-no fs08',format_action:'remove_format',format_tag:'span'}),
                    ),
                    $('<div/>',{class:'text_editor_editor',contenteditable:true})
                )
            )

        )
    }

    return editors;
}
set_text_editor = function(editor){
    let val = get_editor_val(editor);
    editor.find('.text_editor_editor').html(val)
}
draw_text_editor_font_size_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.largest,attrs:{format_action:'font_size',format_tag:'span',font_size:'1.6em'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.larger,attrs:{format_action:'font_size',format_tag:'span',font_size:'1.4em'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.large,attrs:{format_action:'font_size',format_tag:'span',font_size:'1.2em'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.normal,attrs:{format_action:'font_size',format_tag:'span',font_size:'1em'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.small,attrs:{format_action:'font_size',format_tag:'span',font_size:'.8em'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.smaller,attrs:{format_action:'font_size',format_tag:'span',font_size:'.6em'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.smallest,attrs:{format_action:'font_size',format_tag:'span',font_size:'.4em'}}),
    )
}
draw_text_editor_hyperlinks_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.website_pages.home,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'home'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.website_pages.about_us,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'about_us'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.website_pages.all_products,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'all_products'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.website_pages.cart,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'cart'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.website_pages.track_order,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'track_order'}}),
        draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.website_pages.privacy_policy,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'privacy_policy'}}),
        draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.category_pages,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_categories_contextMenu()}),
        draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.product_pages,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_products_contextMenu()}),
        draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.add_to_cart,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_add_to_cart_contextMenu()}),
        window.selected_page == 'home' ? draw_contextMenu_elem({icon:'',child1_text:texts.website_pages.scroll_to_section,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_scroll_to_section_contextMenu()}) : '',
        
        
    )
}
draw_text_editor_hyperlinks_categories_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.categories){
        let category = window.website_data.categories[key];
        contextMenu.append(
            draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:category.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:category.name}})
        )
    }
    return contextMenu;
}
draw_text_editor_hyperlinks_products_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.products){
        let product = window.website_data.products[key];
        contextMenu.append(
            draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:product.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:product.name}})
        )
    }
    return contextMenu;
}
draw_text_editor_hyperlinks_add_to_cart_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.website_data.products){
        let product = window.website_data.products[key];
        contextMenu.append(
            draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:product.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:`addToCart_${product.name}`}})
        )
    }
    return contextMenu;
}
draw_text_editor_hyperlinks_scroll_to_section_contextMenu = function(){
    let contextMenu = $('<div/>',{class:'w100p'});
    for(const key in window.template.home){
        let section = window.template.home[key];
        contextMenu.append(
            draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:section.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:`scroll_to_${section.name}`}})
        )
    }
    return contextMenu;
}

//
get_text_selection_span = function(text_editor,tag='span'){
    let selection = window.getSelection();
    if(selection.toString().length == 0){
        if(selection.rangeCount == 0){
            let temp_range = document.createRange();
            temp_range.selectNodeContents(text_editor.find('.format_container')[0]);
            let temp_selection = window.getSelection();
            temp_selection.removeAllRanges();
            temp_selection.addRange(temp_range);
            selection = window.getSelection();
        }else if(selection.rangeCount > 0){
            let range = selection.getRangeAt(0);
            let span = range.commonAncestorContainer;
            if (span.nodeType !== 1) {
                span = span.parentElement;
            }
            return span
        }
    }
    let range = selection.getRangeAt(0).cloneRange();
    let node = selection.anchorNode;
    let span
    if(node.nodeType === 1 && !$(node).hasClass('format')){
        text_editor.find('.format_container').focus()
        return selection.anchorNode.parentElement;
    }
    else 
    if (node.nodeType === 1 && $(node).hasClass('format')) {
        span = node;
    }else if(node.nodeType == 3 && $(node.parentElement).text().trim() == selection.toString().trim() && $(node.parentElement).hasClass('format')){
        span = node.parentElement;
    }else if(node.nodeType == 3){
        span = document.createElement(tag);
        span.className = 'format';
        span.appendChild(range.extractContents());
        range.insertNode(span);
    }
    return span;
}
set_text_selection_format_btns = function(text_editor){
    let selection = window.getSelection();
    let node = selection.anchorNode;
    let span;
    if (node.nodeType === 1 && $(node).hasClass('format')) {
        span = node;
    }else if(node.nodeType == 3 && $(node.parentElement).hasClass('format')){
        span = node.parentElement;
    }
    setTimeout(()=>{
        $('.contextMenu_elem_icon').removeClass('ico-check fs07')
        $(`.contextMenu_elem[font_size="${$(span).css('font-size')}"]`).find('.contextMenu_elem_icon').addClass('ico-check fs07')
    },100)
    if($(span).css('font-size') == '16px'){
        // text_editor.find('.text_editor_format[format_action="font_size"]').removeClass('text_editor_format_style_selected');
    }else{
        // text_editor.find('.text_editor_format[format_action="font_size"]').addClass('text_editor_format_style_selected');
    }
    if($(span).css('font-weight') == '700'){
        text_editor.find('.text_editor_format[format_action="bold"]').addClass('text_editor_format_style_selected');
    }else{
        text_editor.find('.text_editor_format[format_action="bold"]').removeClass('text_editor_format_style_selected');
    }

    if($(span).css('font-style') == 'italic'){
        text_editor.find('.text_editor_format[format_action="italic"]').addClass('text_editor_format_style_selected');
    }else{
        text_editor.find('.text_editor_format[format_action="italic"]').removeClass('text_editor_format_style_selected');
    }

    if($(span).css('text-decoration-line') == 'underline'){
        text_editor.find('.text_editor_format[format_action="underline"]').addClass('text_editor_format_style_selected');
    }else{
        text_editor.find('.text_editor_format[format_action="underline"]').removeClass('text_editor_format_style_selected');
    }
    if($(span).prop('tagName') == 'A'){
        text_editor.find('.text_editor_format_hyperlink').addClass('ico-unlink').removeClass('ico-link contextMenu');
        text_editor.find('.text_editor_format_hyperlink').attr('tooltip',texts.styling.remove_hyperlink);
    }else{
        text_editor.find('.text_editor_format_hyperlink').addClass('ico-link contextMenu').removeClass('ico-unlink')
        text_editor.find('.text_editor_format_hyperlink').attr('tooltip',texts.styling.hyperlink);
    }
    if(typeof(span) == 'undefined'){
        text_editor.find('.text_editor_format[format_action="font_color"]').parent().find('.ico-text_color').css('color','')
        set_dummy_color_picker(text_editor.find('.text_editor_format_color'),'--')
        text_editor.find('.text_editor_format[format_action="bg_color"]').parent().find('.ico-background_color').css('background-color','')
        set_dummy_color_picker(text_editor.find('.text_editor_format_bgcolor'),'--')
    }else{
        text_editor.find('.text_editor_format[format_action="font_color"]').parent().find('.ico-text_color').css('color',span.style.color ?? '--')
        set_dummy_color_picker(text_editor.find('.text_editor_format_color'),span.style.color)
        text_editor.find('.text_editor_format[format_action="bg_color"]').parent().find('.ico-background_color').css('color',span.style['background-color'] ?? '--')
        set_dummy_color_picker(text_editor.find('.text_editor_format_bgcolor'),span.style['background-color'])
    }
}
clean_unformated_text = function(text_editor,selection,selection_string){
    if(text_editor.find('.text_editor_editor').children().length === 0){
        let text = text_editor.find('.text_editor_editor').children().text();
        text_editor.find('.text_editor_editor').children().text('').append(
            $('<div/>',{class:'format format_container',text:text})
        )
    }
    text_editor.find('.format').each(function(){
        let remove_elem = false;
        let font_size_check = false;
        if($(this).css('font-size') == '16px' || $(this).css('font-size') == '1em'){font_size_check = true;}
        if(
            $(this).prop('tagName') == 'SPAN' &&

            font_size_check &&
            $(this).css('font-weight') == '400' &&
            $(this).css('font-style') == 'normal' &&
            $(this).css('text-decoration-line') == 'none' &&

            // $(this).parent().css('font-size') == '16px' &&
            // $(this).parent().css('font-weight') == '400' &&
            // $(this).parent().css('font-style') == 'normal' &&
            // $(this).parent().css('text-decoration-line') == 'none' &&

            $(this).css('color') === $(this).parent().css('color') &&
            $(this).css('background-color') === $(this).parent().css('background-color') 
        ){
            remove_elem = true;
        }



        if($(this).text().trim().length == 0){
            remove_elem = true;
        }

        if(!$(this).hasClass('format')){
            remove_elem = true;
        }
        if($(this).hasClass('format_container') && $(this).text().trim().length > 0){
            remove_elem = false;
        }


        if(remove_elem){
            $(this).after($(this).text());
            $(this).remove();
        }else{
            let new_elem;
            if($(this).prop('tagName') == 'A'){
                new_elem = $('<a/>');
            }else{
                new_elem = $('<span/>');
                $(this).removeClass('open_page open_popup scroll_to_section')
                $(this).attr('page','');
                $(this).attr('popup','');
                $(this).attr('section','')
                $(this).attr('product','')
                $(this).attr('category','')
                $(this).attr('href','')
            }
            $.each($(this).prop('attributes'), function() {
                if(this.value != ''){
                    new_elem.attr(this.name, this.value);
                }
            });
            new_elem.append($(this).contents());
            $(this).after(new_elem);
            $(this).remove();
            if(selection_string == new_elem.text()){
                let range = document.createRange();
                range.selectNodeContents(new_elem.get(0));
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    })
    if(text_editor.find('.text_editor_editor').find('.format_container').length === 0){
        let html = text_editor.find('.text_editor_editor').html();
        text_editor.find('.text_editor_editor').text('').append(
            $('<div/>',{class:'format format_container'}).append(html)
        )
    }
}
//events
// $('body').on('change','.text_editor_editor',function(){
//     console.log('gaga')
//     console.log($(this).html());
// })

$('body').on('keydown','.text_editor_editor',function(e){
    if(e.ctrlKey ){
        if(
            e.ctrlKey && e.which == 65 ||
            e.ctrlKey && e.which == 67 ||
            e.ctrlKey && e.which == 86 ||
            e.ctrlKey && e.which == 88 ||
            e.shiftKey && e.ctrlKey && e.which == 90 ||
            e.ctrlKey && e.which == 90 ||
            e.ctrlKey && e.which == 83

        ){

        }else{
            e.preventDefault();
            // e.stopPropagation();
        }
    }

});
$('body').on('mouseup keyup','.text_editor_editor',function(e){
    // e.stopPropagation();
    set_text_selection_format_btns($(this).closest('.text_editor'));
    // hidePopupSelectors();
});
$('body').on('input','.text_editor_editor',function(e){
    // set_text_selection_format_btns($(this).closest('.elem_text_selector'));
    let new_val = $(this).html();
    if($(this).closest('.text_editor').find('.format_container').length == 0 || $(this).closest('.text_editor').find('.format_container').text() == ''){
        $(this).text('').append(`<div class="format format_container">${new_val}</div>`)
    }
    set_val($(this).closest('.text_editor'),new_val);
    new_action(false,true);
    // if($(this).hasClass('elem_text_selector_editor_editor_popup')){
    //     new_action(false,true);
    // }else{
    //     new_action(false,false)
    // }
})
$('body').on('click','.text_editor_format_font_size',function(){
    let text_editor = window.selected_text_editor = $(this).closest('.text_editor');
    // text_editor.find('.text_editor_editor').fox
    set_text_selection_format_btns(text_editor);

})
$('body').on('click','.text_editor_format_hyperlink',function(){
    if($(this).hasClass('ico-link')){
        window.selected_text_editor = $(this).closest('.text_editor');
    }else if($(this).hasClass('ico-unlink')){
        let selection = window.getSelection();
        let node = selection.anchorNode;
        let span
        if (node.nodeType === 1 && $(node).hasClass('format')) {
            span = node;
        }else if(node.nodeType == 3 && $(node.parentElement).hasClass('format')){
            span = node.parentElement;
        }
        let selection_string = selection.toString();
        let text_editor = $(span).closest('.text_editor');
        $(span).after($(span).text());
        $(span).remove();
        set_text_selection_format_btns(text_editor);
        clean_unformated_text(text_editor,selection,selection_string);
        text_editor.find('.text_editor_editor').trigger('input')
    }
})
$('body').on('click','.text_editor_format',function(e){
    // e.stopImmediatePropagation();
    let span = get_text_selection_span($(this).closest('.text_editor'),$(this).attr('format_tag'));
    if(typeof(span) == 'undefined'){return;}
    let selection = window.getSelection();
    let newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);
    span = selection.anchorNode;
    let selection_string = selection.toString();
    let new_action = true;
    switch($(this).attr('format_action')){
        case 'font_size':
            $(span).css('font-size',$(this).attr('font_size'))
            new_action = false;
            set_text_selection_format_btns(window.selected_text_editor);
            clean_unformated_text(window.selected_text_editor,selection,selection_string);
            window.selected_text_editor.find('.text_editor_editor').trigger('input')
        break;
        case 'bold':
            if($(span).css('font-weight')  == '700'){
                $(span).css('font-weight','400');
                $(span).children().css('font-weight','400');
            }else{
                $(span).css('font-weight','700');
            }
        break;
        case 'italic':
            if($(span).css('font-style') == 'italic'){
                $(span).css('font-style','normal');
                $(span).children().css('font-style','normal');
            }else{
                $(span).css('font-style','italic');
            }
        break;
        case 'underline':
            if($(span).css('text-decoration-line') == 'underline'){
                $(span).css('text-decoration-line','none');
                $(span).children().css('text-decoration-line','none');
            }else{
                $(span).css('text-decoration-line','underline');
            }
        break;
        case 'font_color':
            new_action = false;
            setTimeout(()=>{
                $(this).closest('.text_editor_btns').find('.text_editor_format_color').trigger('mouseup')
            })
        break;
        case 'bg_color':
            new_action = false;
            setTimeout(()=>{
                $(this).closest('.text_editor_btns').find('.text_editor_format_bgcolor').trigger('mouseup')
            })
        break;
        case 'remove_format':
            $(this).closest('.text_editor').find('.text_editor_editor').find('.format').each(function(){
                if($(this).hasClass('format_container')){
                    $(this).after($('<div/>',{class:'format format_container',text:$(this).text()}))
                    $(this).remove();
                }else{
                    $(this).after($(this).text());
                    $(this).remove();
                }
            })
            $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
            new_action = false;
        break;
        case 'hyperlink':
            let hyperlink = get_hyperlinks()[$(this).attr('hyperlink_key')];
            if($(span).prop('tagName') != 'A'){
                let span_text = $(span).text();
               $(span).text('').append(
                    span = $('<a/>',{class:'format',text:span_text})
                )
            }
            $(span).removeClass('open_page open_popup scroll_to_section').addClass(hyperlink.class);
            for(const key in hyperlink.attr){
                if(key == 'href'){
                    $(span).attr(key,`/${window.selected_text_editor.attr('key')}${hyperlink.attr[key]}`)
                }else{
                    $(span).attr(key,hyperlink.attr[key])
                }
            }

            new_action = false;
            set_text_selection_format_btns(window.selected_text_editor);
            clean_unformated_text(window.selected_text_editor,selection,selection_string);
            window.selected_text_editor.find('.text_editor_editor').trigger('input')
        break;
    }


    if(new_action){
        set_text_selection_format_btns($(this).closest('.text_editor'));
        clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
        $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
    }
});
$('body').on('change','.text_editor_format_color',function(){
        let span = get_text_selection_span($(this).closest('.text_editor'));
        if(typeof(span) == 'undefined'){return;}
        let selection = window.getSelection();
        let newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
        span = selection.anchorNode;
        let selection_string = selection.toString();
        let new_val = get_dummy_val($(this));
        $(span).css('color',new_val);
        $(span).children().css('color',new_val);
        set_text_selection_format_btns($(this).closest('.text_editor'));
        clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
        $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
})
$('body').on('change','.text_editor_format_bgcolor',function(){
    let span = get_text_selection_span($(this).closest('.text_editor'));
    if(typeof(span) == 'undefined'){return;}
    let selection = window.getSelection();
    let newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);
    span = selection.anchorNode;
    let selection_string = selection.toString();
    let new_val = get_dummy_val($(this));
    $(span).css('background-color',new_val);
    $(span).children().css('background-color',new_val);
    set_text_selection_format_btns($(this).closest('.text_editor'));
    clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
    $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
})
$('body').on('paste','[contenteditable]',function(e){
    e.preventDefault();
    let clipboardData = (event.clipboardData || window.clipboardData).getData('text/plain');
    let selection = window.getSelection();
    let selection_string = selection.toString();
    let selected_range = window.getSelection().getRangeAt(0);
    selected_range.deleteContents();
    let newNode = document.createTextNode(clipboardData);
    selected_range.insertNode(newNode);
    selected_range.setEnd(newNode, newNode.length);
    selected_range.setStart(newNode, newNode.length);
    clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
    $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
})

//

//
// draw_elem_text_selector = function(key_tree){
//     return '';
//     let elem_data = get_key_tree(key_tree).elem;
//     let elem = $('<div/>',{class:'elem_text_selector_container'}).append(
//         $('<div/>',{class:'bold mT20',text:texts.styling.text})
//     );
//     let hyperLinks = get_hyperLinks();
//     for(const key in window.website_data.languages){
//         let language = window.website_data.languages[key];
//         let this_links_dropDown;
//         elem.append(
//             $('<div/>',{class:'elem_text_selector'}).append(
//                 $('<div/>',{class:'fs09 mT20 mis-5',text:language.name}),
//                 $('<div/>',{class:'elem_text_selector_format_btns'}).append(
//                     $('<button/>',{tooltip:texts.styling.bold,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-bold',format_action:'bold',format_tag:'span'}),
//                     $('<button/>',{tooltip:texts.styling.italic,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-italic',format_action:'italic',format_tag:'span'}),
//                     $('<button/>',{tooltip:texts.styling.underline,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-underline fs1',format_action:'underline',format_tag:'span'}),
//                     $('<div/>',{tooltip:texts.styling.font_color,class:''}).append(
//                         $('<input/>',{format_action:'color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'color'}),
//                         $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
//                             $('<span/>',{class:'ico-text_color fs101'}),
//                             $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
//                         ),
//                     ),
//                     $('<div/>',{tooltip:texts.styling.bg_color,class:''}).append(
//                         $('<input/>',{format_action:'background_color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'background_color'}),
//                         $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
//                             $('<span/>',{class:'ico-background_color fs103'}),
//                             $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
//                         ),
//                     ),

//                     $('<button/>',{class:'elem_text_selector_format_btn2 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2',format_action:'link'}).append(
//                         $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-link'}),
//                         $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-arrowDown fs06 bold mis-10'}),
//                         this_links_dropDown = $('<div/>',{class:'elem_text_selector_format_btn2_dropDown elem_text_selector_format_btn2_dropDown_editor_popup none'})
//                     ),
//                     $('<button/>',{tooltip:texts.styling.remove_hyperlinke,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style none ico-unlink',format_action:'unlink',format_tag:'a'}),

//                     $('<button/>',{tooltip:texts.styling.clear_formating,class:'elem_text_selector_format_btn4 elem_text_selector_format_btn_style ico-erase fs1',format_action:'clear'}),

//                 ),
//                 $('<div/>',{class:'builder_font elem_text_selector_editor elem_text_selector_editor_editor_popup',contenteditable:true,lang:language.code,key_tree:key_tree,html:elem_data.text.val[language.code]})
//             )
//         )
//         for(const key in hyperLinks){
//             this_links_dropDown.append(
//                 $('<div/>',{
//                     class:`elem_text_selector_format_btn2_dropDown_elem elem_text_selector_format_btn builder_font`,
//                     format_action:'link',
//                     format_tag:'a',
//                     text:hyperLinks[key].name,
//                     link_key:key
//                 })
//             )

//         }
//     }

//     return elem
// }
// draw_edit_home_text_elem_text = function(elem){
//     let key_tree = elem.attr('key_tree');
//     let elem_data = get_key_tree(elem.attr('key_tree')).elem;
//     elem.addClass('editing_edit_home_elem_editing')
//     elem.text('')
//     let this_links_dropDown;
//     let hyperLinks = get_hyperLinks();
//     elem.append(
//         $('<div/>',{class:'elem_text_selector'}).append(
//             $('<div/>',{class:'elem_text_selector_format_btns elem_text_selector_format_btns_website_body'}).append(
//                 $('<button/>',{tooltip:texts.styling.bold,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-bold',format_action:'bold',format_tag:'span'}),
//                 $('<button/>',{tooltip:texts.styling.italic,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-italic',format_action:'italic',format_tag:'span'}),
//                 $('<button/>',{tooltip:texts.styling.underline,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-underline fs1',format_action:'underline',format_tag:'span'}),
//                 $('<div/>',{tooltip:texts.styling.font_color,class:''}).append(
//                     $('<input/>',{format_action:'color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'color'}),
//                     $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
//                         $('<span/>',{class:'ico-text_color fs101'}),
//                         $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
//                     ),
//                 ),
//                 $('<div/>',{tooltip:texts.styling.bg_color,class:''}).append(
//                     $('<input/>',{format_action:'background_color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'background_color'}),
//                     $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
//                         $('<span/>',{class:'ico-background_color fs103'}),
//                         $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
//                     ),
//                 ),

//                 $('<button/>',{class:'elem_text_selector_format_btn2 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2',format_action:'link'}).append(
//                     $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-link'}),
//                     $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-arrowDown fs06 bold mis-10'}),
//                     this_links_dropDown = $('<div/>',{class:'elem_text_selector_format_btn2_dropDown none'})
//                 ),
//                 $('<button/>',{tooltip:texts.styling.remove_hyperlinke,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style none ico-unlink',format_action:'unlink',format_tag:'a'}),

//                 $('<button/>',{tooltip:texts.styling.clear_formating,class:'elem_text_selector_format_btn4 elem_text_selector_format_btn_style ico-erase fs1',format_action:'clear'}),

//             ),
//             $('<div/>',{class:' elem_text_selector_editor',contenteditable:true,lang:window.preview_language,key_tree:key_tree,html:elem_data.text.val[window.preview_language]})
//         )
//     )
//     for(const key in hyperLinks){
//         this_links_dropDown.append(
//             $('<div/>',{
//                 class:`elem_text_selector_format_btn2_dropDown_elem elem_text_selector_format_btn builder_font`,
//                 format_action:'link',
//                 format_tag:'a',
//                 text:hyperLinks[key].name,
//                 link_key:key
//             })
//         )
//     }

//     let range = document.createRange();
//     range.selectNodeContents(elem.find('.elem_text_selector_editor').get(0));
//     let selection = window.getSelection();
//     selection.removeAllRanges();
//     selection.addRange(range);
// }
//
// $('body').on('click','.elem_text_selector_format_btn4',function(e){
//     // e.stopImmediatePropagation();
//     $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').find('.format').each(function(){
//         if($(this).hasClass('format_container')){
//             $(this).after($('<div/>',{class:'format format_container',text:$(this).text()}))
//             $(this).remove();
//         }else{
//             $(this).after($(this).text());
//             $(this).remove();
//         }
//     })
//     $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
// })
// $('body').on('click','.elem_text_selector_format_btn3',function(e){
//     // e.stopImmediatePropagation();
//     $(this).parent().find('.color_picker').trigger('click')
// })
// $('body').on('input','.elem_text_selector_format_btn3_picker',function(e){
//     // e.stopImmediatePropagation();
//     let span = get_text_selection_span($(this).closest('.elem_text_selector'));
//     if(typeof(span) == 'undefined'){return;}
//     let selection = window.getSelection();
//     let newRange = document.createRange();
//     newRange.selectNodeContents(span);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//     span = selection.anchorNode;
//     let selection_string = selection.toString();

//     if($(this).attr('format_action') == 'color'){
//         $(span).css('color',$(this).val())
//     }else if($(this).attr('format_action') == 'background_color'){
//         $(span).css('background-color',$(this).val())
//     }

// })
// $('body').on('change','.elem_text_selector_format_btn3_picker',function(e){
//     // e.stopImmediatePropagation();
//     let span = get_text_selection_span($(this).closest('.elem_text_selector'));
//     if(typeof(span) == 'undefined'){return;}
//     let selection = window.getSelection();
//     let newRange = document.createRange();
//     newRange.selectNodeContents(span);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//     let selection_string = selection.toString();
//     set_text_selection_format_btns($(this).closest('.elem_text_selector'));
//     clean_unformated_text($(this).closest('.elem_text_selector'),selection,selection_string);
//     $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
// })
// $('body').on('click','.elem_text_selector_format_btn2',function(e){
//     // e.stopImmediatePropagation();
//     switch ($(this).attr('format_action')) {
//         case 'link':
//                 if($(this).find('.elem_text_selector_format_btn2_dropDown').hasClass('elem_text_selector_format_btn2_dropDown_editor_popup')){
//                     $(this).find('.elem_text_selector_format_btn2_dropDown').removeClass('none').css({
//                         top:$(this).offset().top + $(this).height(),
//                         left:$(this).offset().left,
//                     })
//                 }else{
//                     $(this).find('.elem_text_selector_format_btn2_dropDown').removeClass('none').css({
//                         top:$(this).position().top - 2,
//                         left:$(this).position().left,
//                     })
//                 }
//             break;

//         default:
//             break;
//     }
// })


// set_text_selection_format_btns = function(elem_text_selector){
//         let selection = window.getSelection();
//         let node = selection.anchorNode;
//         let span
//         if (node.nodeType === 1 && $(node).hasClass('format')) {
//             span = node;
//         }else if(node.nodeType == 3 && $(node.parentElement).hasClass('format')){
//             span = node.parentElement;
//         }
//         if($(span).css('font-weight') == '700'){
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="bold"]').addClass('elem_text_selector_format_btn_selected');
//         }else{
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="bold"]').removeClass('elem_text_selector_format_btn_selected');
//         }

//         if($(span).css('font-style') == 'italic'){
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="italic"]').addClass('elem_text_selector_format_btn_selected');
//         }else{
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="italic"]').removeClass('elem_text_selector_format_btn_selected');
//         }

//         if($(span).css('text-decoration-line') == 'underline'){
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="underline"]').addClass('elem_text_selector_format_btn_selected');
//         }else{
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="underline"]').removeClass('elem_text_selector_format_btn_selected');
//         }

//         if($(span).attr('href') == null || $(span).attr('href') == ''){
//             elem_text_selector.find('.elem_text_selector_format_btn2[format_action="link"]').removeClass('none')
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="unlink"]').addClass('none')
//         }else{
//             elem_text_selector.find('.elem_text_selector_format_btn[format_action="unlink"]').removeClass('none')
//             elem_text_selector.find('.elem_text_selector_format_btn2[format_action="link"]').addClass('none')
//         }
//         if(typeof(span) == 'undefined'){
//             elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="color"]').parent().find('.ico-text_color').css('color','')
//             elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="background_color"]').parent().find('.ico-background_color').css('color','')
//         }else{
//             elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="color"]').parent().find('.ico-text_color').css('color',span.style.color ?? '')
//             elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="background_color"]').parent().find('.ico-background_color').css('color',span.style['background-color'] ?? '')
//         }
// }
// clean_unformated_text = function(elem_text_selector,selection,selection_string){
//     if(elem_text_selector.find('.elem_text_selector_editor').children().length === 0){
//         let text = elem_text_selector.find('.elem_text_selector_editor').children().text();
//         elem_text_selector.find('.elem_text_selector_editor').children().text('').append(
//             $('<div/>',{class:'format format_container',text:text})
//         )
//     }
//     elem_text_selector.find('.elem_text_selector_editor').children().each(function(){
//         let remove_elem = false;
//         if(
//             $(this).css('font-weight') == '400' &&
//             $(this).css('font-style') == 'normal' &&
//             $(this).css('text-decoration-line') == 'none' &&

//             $(this).parent().css('font-weight') == '400' &&
//             $(this).parent().css('font-style') == 'normal' &&
//             $(this).parent().css('text-decoration-line') == 'none'
//         ){
//             remove_elem = true;
//         }
//         if(
//             $(this).attr('href') == '' && remove_elem ||
//             typeof($(this).attr('href')) === 'undefined' && remove_elem
//         ){
//             remove_elem = true;
//         }else{
//             remove_elem = false
//         }

//         if(
//             $(this).get(0).style['color'] == '' && remove_elem
//         ){
//             remove_elem = true;
//         }else{
//             remove_elem = false;
//         }

//         if(
//             $(this).get(0).style['background-color'] == '' && remove_elem
//         ){
//             remove_elem = true;
//         }else{
//             remove_elem = false;
//         }

//         if(!$(this).hasClass('format')){
//             remove_elem = true;
//         }

//         if($(this).hasClass('format_container')){
//             remove_elem = false;
//         }



//         if(remove_elem){
//             $(this).after($(this).text());
//             $(this).remove();
//         }else{
//             if(typeof($(this).attr('href')) === 'undefined' || $(this).attr('href') == ''){
//                 new_elem = $('<span/>');
//                 $(this).removeClass('open_page open_popup scroll_to_section')
//                 $(this).attr('page','');
//                 $(this).attr('popup','');
//                 $(this).attr('section','')
//             }else{
//                 new_elem = $('<a/>');
//             }
//             $.each($(this).prop('attributes'), function() {
//                 if(this.value != ''){
//                     new_elem.attr(this.name, this.value);
//                 }
//             });
//             new_elem.append($(this).contents());
//             $(this).after(new_elem);
//             $(this).remove();
//             if(selection_string == new_elem.text()){
//                 let range = document.createRange();
//                 range.selectNodeContents(new_elem.get(0));
//                 selection.removeAllRanges();
//                 selection.addRange(range);
//             }

//         }
//     })
//     if(elem_text_selector.find('.elem_text_selector_editor').find('.format_container').length === 0){
//         let html = elem_text_selector.find('.elem_text_selector_editor').html();
//         elem_text_selector.find('.elem_text_selector_editor').text('').append(
//             $('<div/>',{class:'format format_container'}).append(html)
//         )
//     }
// }
//
// $('body').on('keydown','.elem_text_selector_editor',function(e){
//     if(e.ctrlKey ){
//         if(
//             e.ctrlKey && e.which == 65 ||
//             e.ctrlKey && e.which == 67 ||
//             e.ctrlKey && e.which == 86 ||
//             e.ctrlKey && e.which == 88 ||
//             e.shiftKey && e.ctrlKey && e.which == 90 ||
//             e.ctrlKey && e.which == 90 ||
//             e.ctrlKey && e.which == 83

//         ){

//         }else{
//             e.preventDefault();
//             // e.stopPropagation();
//         }
//     }

// });
// $('body').on('mouseup keyup','.elem_text_selector_editor',function(e){
//     // e.stopPropagation();
//     set_text_selection_format_btns($(this).closest('.elem_text_selector'));
//     // hidePopupSelectors();
// });

// $('body').on('input','.elem_text_selector_editor',function(e){
//     // e.stopImmediatePropagation();
//     set_text_selection_format_btns($(this).closest('.elem_text_selector'));
//     let key_tree = $(this).attr('key_tree');
//     let elem = get_key_tree(key_tree).elem
//     elem.text.val[$(this).attr('lang')] = $(this).html();
//     if($(this).hasClass('elem_text_selector_editor_editor_popup')){
//         new_action(false,true);
//     }else{
//         new_action(false,false)
//     }
// })
// $('body').on('click','.elem_text_selector_format_btn',function(e){
//     // e.stopImmediatePropagation();
//     let span = get_text_selection_span($(this).closest('.elem_text_selector'));
//     if(typeof(span) == 'undefined'){return;}
//     let selection = window.getSelection();
//     let newRange = document.createRange();
//     newRange.selectNodeContents(span);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//     span = selection.anchorNode;
//     let selection_string = selection.toString();

//     if($(this).attr('format_action') == 'bold'){
//         if($(span).css('font-weight')  == '700'){
//             $(span).css('font-weight','400');
//             $(span).children().css('font-weight','400');
//             // $(span).children('.format').css('font-weight','normal');
//         }else{
//             $(span).css('font-weight','700');
//         }
//     }else if($(this).attr('format_action') == 'italic'){
//         if($(span).css('font-style') == 'italic'){
//             $(span).css('font-style','normal');
//             $(span).children().css('font-style','normal');
//             // $(span).children('.format').css('font-style','');
//         }else{
//             $(span).css('font-style','italic');
//         }
//     }else if($(this).attr('format_action') == 'underline'){
//         if($(span).css('text-decoration-line') == 'underline'){
//             $(span).css('text-decoration-line','none');
//             $(span).children().css('text-decoration-line','none');
//             // $(span).children('.format').css('text-decoration','');
//         }else{
//             $(span).css('text-decoration-line','underline');
//         }
//     }else if($(this).attr('format_action') == 'link'){
//         let hyperLink = get_hyperLinks()[$(this).attr('link_key')]
//         $(span).addClass(hyperLink.class)
//         for(const key in hyperLink.attr){
//             $(span).attr(key,hyperLink.attr[key])
//         }
//         // $(span).attr('page',$(this).attr('format_class'))
//     }else if($(this).attr('format_action') == 'unlink'){
//         $(span).attr('href','')
//     }

//     set_text_selection_format_btns($(this).closest('.elem_text_selector'));
//     clean_unformated_text($(this).closest('.elem_text_selector'),selection,selection_string);
//     $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
// });

// $('body').on('paste','[contenteditable]',function(e){
//     e.preventDefault();
//     let clipboardData = (event.clipboardData || window.clipboardData).getData('text/plain');
//     let selection = window.getSelection();
//     let selection_string = selection.toString();
//     let selected_range = window.getSelection().getRangeAt(0);
//     selected_range.deleteContents();
//     let newNode = document.createTextNode(clipboardData);
//     selected_range.insertNode(newNode);
//     selected_range.setEnd(newNode, newNode.length);
//     selected_range.setStart(newNode, newNode.length);
//     clean_unformated_text($(this).closest('.elem_text_selector'),selection,selection_string);
//     $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
// })
