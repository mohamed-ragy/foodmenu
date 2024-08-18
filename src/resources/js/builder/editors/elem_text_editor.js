draw_text_editors = function(data){
    let show_all_buttons = true;
    let elem_data = get_elem_data(window.selected);
    if(elem_data.elem.elem_type == 'button'){
        show_all_buttons = false;
    }
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
                    variable_key:data.variable_key,
                    key:language.code,
                }).append(
                    $('<div/>',{class:'text_editor_btns'}).append(
                        $('<button/>',{tooltip:texts.styling.font_size,class:'text_editor_format_style text_editor_format_font_size ico-font_size f09 contextMenu',contextMenu_type:'text_editor_font_size',key_tree:window.selected}),
                        $('<button/>',{tooltip:texts.styling.bold,class:'text_editor_format text_editor_format_style ico-bold',format_action:'B'}),
                        $('<button/>',{tooltip:texts.styling.italic,class:'text_editor_format text_editor_format_style ico-italic',format_action:'I'}),
                        $('<button/>',{tooltip:texts.styling.underline,class:'text_editor_format text_editor_format_style ico-underline',format_action:'U'}),
                        show_all_buttons ? draw_color_picker({
                            dummy:true,
                            dummy_class:'text_editor_format_color',
                        }) : '',
                        show_all_buttons ? $('<button/>',{tooltip:texts.styling.font_color,class:'text_editor_format text_editor_format_style ico-text_color fs08',format_action:'font_color'}) : '',
                        show_all_buttons ? draw_color_picker({
                            dummy:true,
                            dummy_class:'text_editor_format_bgcolor',
                        }) : '',
                        show_all_buttons ? $('<button/>',{tooltip:texts.styling.bg_color,class:'text_editor_format text_editor_format_style ico-background_color fs085',format_action:'bg_color'}) : '',
                        show_all_buttons ? $('<button/>',{tooltip:texts.styling.hyperlink,class:'text_editor_format_style text_editor_format_hyperlink ico-link fs08 contextMenu',contextMenu_type:'text_editor_hyperlink',key_tree:window.selected}) : '',
                        $('<button/>',{tooltip:texts.styling.clear_formating,class:'text_editor_format text_editor_format_style ico-unlink fs08 none',format_action:'remove_hyperlink'}),
                        $('<button/>',{tooltip:texts.styling.clear_formating,class:'text_editor_format text_editor_format_style ico-no fs08',format_action:'remove_format'}),
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
// window.savedSelection = null;
// document.addEventListener("selectionchange", function() {
//     let selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//         window.savedSelection = selection.getRangeAt(0);
//     }else{
//         // window.savedSelection = null;
//     }
// });
// get_selection_element = function(){
//     // let selection = window.getSelection();
//     // if (selection.rangeCount === 0 || selection.toString().trim() === '') {return;}
//     // selection.removeAllRanges();
//     // selection.addRange(window.savedSelection);
//     // let range = selection.getRangeAt(0);
//     // let element;
//     let anchorNode = range.startContainer;
//     if(anchorNode.nodeType == 3 ){
        
//     }
    // let element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
//     return element;
// }
// get_selection_element = function(tag,create){
//     if (window.savedSelection === null) { return; }
//     let selection = window.getSelection();
//     selection.removeAllRanges();
//     selection.addRange(window.savedSelection);
//     let range = selection.getRangeAt(0);
//     let anchorNode = range.startContainer;
//     // console.log(anchorNode);
//     let element = null;
//     // let node = selection.anchorNode;
//     // if(node.nodeType === 1){
//     //     element = node
//     // }else if(node.nodeType == 3 && $(node.parentElement).text().trim() == selection.toString().trim()){
//     //     element = node.parentElement;
//     // }else if(node.nodeType == 3){
//     //     create_element(tag,range,selection)
//     // }

//     // return element;

//     if (selection.rangeCount === 0 || selection.toString().trim() === '') {
//         element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
//     }else{
//         if(anchorNode.nodeType === 1 ){
//             element = range.commonAncestorContainer;
//         }else if($(anchorNode.parentElement).text().trim() == selection.toString().trim()){
//             element = anchorNode.parentElement;
//         }else{
//             create ? element = create_element(tag) : null;
//         }
//         if($(element).hasClass('text_editor_editor')){
//             create ? element = create_element(tag) : null;
//         }
//     }


//     return element
// }
format_text = function(format_action,tag,key){
    let element = get_selection_element(tag,true);
    // console.log(element)
    // let parent = $(element).parent();
    // if(!parent.hasClass('text_editor_editor')){
    //     $(element).css('font-weight',$(parent).css('font-weight'));
    // }
    // console.log(element,parent)
    switch(format_action){
        case 'B':
            try{
                if(element.style['font-weight'] == 'bold'){
                    element.style['font-weight'] = '';
                }else{
                    element.style['font-weight'] = 'bold';
                }
            }catch{
                $(element).css('font-weight','bold');
            }
        break;
        case 'I':
            try{
                if(element.style['font-style'] == 'italic'){
                    element.style['font-style'] = '';
                }else{
                    element.style['font-style'] = 'italic';
                }
            }catch{
                $(element).css('font-style','italic');
            }
        break;
        case 'U':
            try{
                if(element.style['text-decoration'] == 'underline'){
                    element.style['text-decoration'] = '';
                }else{
                    element.style['text-decoration'] = 'underline';
                }
            }catch{
                $(element).css('text-decoration','underline');
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
                    _elem.attr('href',`/${window.selected_text_editor.attr('key')}${hyperlink.attr[key2]}`)
                }else{
                    _elem.attr(key2,hyperlink.attr[key2])
                }
            }
            _elem.css('text-decoration','underline');

        break;
        case 'remove_hyperlink':
            $(element).after($('<span/>',{
                style:$(element).attr('style'),
                text:$(element).text(),
            }));
            $(element).remove();
        break;
    }
    clear_format_text($(element).closest('.text_editor_editor'));
    // return element;

    // if(anchorNode.nodeType === Node.ELEMENT_NODE ){
    //     console.log('gaga')
    //     element = anchorNode;
    // }else if(anchorNode.nodeType === Node.ELEMENT_TEXT ){
    //     console.log('gaga2')
    //     element = create_element(tag,range,selection)
    // }else{
    //     console.log('gaga3')
    //     element = range.startContainer.parentNode;
    //     // element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
    //     if($(element).hasClass('format_container')){
    //         element = create_element(tag,range,selection)
    //     }
    //     // else if(tag !== $(element).prop('tagName')){
    //     //     element = create_element(tag,range,selection)
    //     // }else{
    //     //     //format
    //     //     // unformat_text(tag,element);
    //     // }
    // }
}

// create_element = function(tag){
//     let newElement = document.createElement(tag);
//     let selection = window.getSelection();
//     selection.removeAllRanges();
//     selection.addRange(window.savedSelection);
//     let range = selection.getRangeAt(0);
//     range.surroundContents(newElement);
//     setTimeout(()=>{
//         range.selectNodeContents(newElement);
//         selection.addRange(range);  
//     })
//     return newElement;
// }
// clear_format_text = function(editor){
//     editor.children().each(function(){
//         let remove_elem = false;
//         if($(this).attr('style') == '' && $(this).prop('tagName') == 'SPAN'){
//             remove_elem = true;
//         }
//         if($(this).attr('style') == undefined && $(this).prop('tagName') == 'SPAN'){
//             remove_elem = true;
//         }
//         if($(this).text() == '' && $(this).prop('tagName') == 'SPAN'){
//             remove_elem = true;
//         }
//         if(!$(this).hasClass('text_editor_editor')){
//             if($(this).attr('style') == $(this).parent().attr('style') && $(this).prop('tagName') == 'SPAN' && $(this).parent().prop('tagName') == 'SPAN'){
//                 remove_elem = true;
//             }
//         }
//         if(remove_elem){
//             $(this).before($(this).html())
//             $(this).remove();
//         }
//         clear_format_text($(this))
//     })
// }
set_text_editor_btns = function(editor){
    if (window.savedSelection === null) { return; }
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(window.savedSelection);
    let range = selection.getRangeAt(0);
    let anchorNode = range.startContainer;
    let element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
    if(element.style['font-weight'] == 'bold'){
        editor.find('.text_editor_format[format_action="B"]').addClass('text_editor_format_style_selected')
    }else{
        editor.find('.text_editor_format[format_action="B"]').removeClass('text_editor_format_style_selected')
    }
    if(element.style['font-style'] == 'italic'){
        editor.find('.text_editor_format[format_action="I"]').addClass('text_editor_format_style_selected')
    }else{
        editor.find('.text_editor_format[format_action="I"]').removeClass('text_editor_format_style_selected')
    }

    if(element.style['text-decoration'] == 'underline'){
        editor.find('.text_editor_format[format_action="U"]').addClass('text_editor_format_style_selected')
    }else{
        editor.find('.text_editor_format[format_action="U"]').removeClass('text_editor_format_style_selected')
    }

    if(element.tagName == 'A'){
        editor.find('.text_editor_format_hyperlink').addClass('none')
        editor.find('.text_editor_format[format_action="remove_hyperlink"]').addClass('text_editor_format_style_selected').removeClass('none')
    }else{
        editor.find('.text_editor_format_hyperlink').removeClass('none')
        editor.find('.text_editor_format[format_action="remove_hyperlink"]').removeClass('text_editor_format_style_selected').addClass('none')
    }
}
$('body').on('click','.text_editor_format',function(e){
    e.preventDefault();
    let editor = $(this).closest('.text_editor');
    let tag = 'SPAN';
    let key = null;
    let format_action = $(this).attr('format_action');
     if(format_action == 'hyperlink'){
        tag = 'A';
        key = $(this).attr('hyperlink_key');
    }else if(format_action == 'font_size'){
        key = $(this).attr('font_size')
    }
    // if($(this).hasClass('text_editor_format_style_selected')){
        // unformat_text(format_action,tag)
    // }else{
        format_text(format_action,tag,key)
        setTimeout(()=>{
            set_text_editor_btns(editor);
        },100)
    // }

    // let element = get_selected_text_elem(tag);
    // if(element === undefined){
    //     return;
    // }
    // try{
    //     format_text(element,format_action,key);
    // }catch{}
    // setTimeout(()=>{
        // clean_formats(editor.find('.format_container'))
    // },100)
})
$('body').on('mouseup keyup','.text_editor_editor',function(e){
    window.selected_text_editor = $(this).closest('.text_editor');
    setTimeout(()=>{
        set_text_editor_btns($(this).closest('.text_editor'));
    },100)
})
// get_selected_text_elem = function(tag) {
//     if (window.savedSelection === null) {
//         return null;
//     }
    // let selection = window.getSelection();
//     // console.log(window.savedSelection)
//     // if (selection.rangeCount === 0 || selection.toString().trim() === '') {return;}
    // selection.removeAllRanges();
    // selection.addRange(window.savedSelection);
    // let range = selection.getRangeAt(0);
    // let anchorNode = range.startContainer;
    // let element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
    // if (element && $(element).text().trim() === selection.toString().trim() && !$(element).hasClass('format_container')) {
//         if(element.tagName == tag){
//             return element;
//         }else if(element.tagName == 'SPAN' && tag == 'A'){
//             var newElement = document.createElement(tag);
//             Array.from(element.attributes).forEach(attr => newElement.setAttribute(attr.name, attr.value));
//             while (element.firstChild) {
//                 newElement.appendChild(element.firstChild);
//             }
//             element.parentNode.replaceChild(newElement, element);
//             return newElement;
//         }else{
//             return element
//         }
//     } else {
//         let newElement = document.createElement(tag);
//         range.surroundContents(newElement);
//         setTimeout(()=>{
//             range.selectNodeContents(newElement);
//             selection.addRange(range);  
//         })
//         return newElement;
//     }
// }
// format_text = function(element,format_action,key){
//     let editor = $(element).closest('.text_editor')
//     switch(format_action){
//         case 'bold':
//             if(element.style['font-weight'] == 'bold'){
//                 element.style['font-weight'] = 'normal';
//             }else{
//                 element.style['font-weight'] = 'bold'
//             }
//         break;
//         case 'italic':
//             if(element.style['font-style'] == 'italic'){
//                 element.style['font-style'] = 'normal';
//             }else{
//                 element.style['font-style'] = 'italic'
//             }
//         break;
//         case 'underline':
//             if(element.style['text-decoration'] == 'underline'){
//                 element.style['text-decoration'] = 'none';
//             }else{
//                 element.style['text-decoration'] = 'underline'
//             }
//         break;
//         case 'hyperlink':
//             let hyperlink = get_hyperlinks()[key];
//             $(element).removeClass('open_page open_popup scroll_to_section').addClass(hyperlink.class);
//             for(const key in hyperlink.attr){
//                 if(key == 'href'){
//                     $(element).attr(key,`/${window.selected_text_editor.attr('key')}${hyperlink.attr[key]}`)
//                 }else{
//                     $(element).attr(key,hyperlink.attr[key])
//                 }
//             }
//             editor.find('.text_editor_format_hyperlink').addClass('none')
//             editor.find('.text_editor_format[format_action="remove_hyperlink"]').addClass('text_editor_format_style_selected').removeClass('none')
//         break;
//         case 'remove_hyperlink':
//             $(element).removeClass('open_page open_popup scroll_to_section')
//             $(element).removeAttr('href');
//             var newElement = document.createElement('SPAN');
//             Array.from(element.attributes).forEach(attr => newElement.setAttribute(attr.name, attr.value));
//             while (element.firstChild) {
//                 newElement.appendChild(element.firstChild);
//             }
//             element.parentNode.replaceChild(newElement, element);
//             editor.find('.text_editor_format_hyperlink').removeClass('none')
//             editor.find('.text_editor_format[format_action="remove_hyperlink"]').removeClass('text_editor_format_style_selected').addClass('none')
//         break;
//         case 'font_size':
//             console.log(key)
//             $(element).css('font-size',key);
//         break;
//     }
// }
// clean_formats = function(elem,remove_empty=false){
//     elem.children().each(function(){
//         let remove_elem = false;
//         if($(this).attr('style') == $(this).parent().attr('style') && $(this).prop('tagName') == $(this).parent().prop('tagName')){
//             remove_elem = true;
//         }
//         if($(this).text().trim() === '' && remove_empty){
//             remove_elem = true;
//         }
//         if(remove_elem){
//             $(this).before($(this).html())
//             $(this).remove();
//         }
//         clean_formats($(this),remove_empty)
//     })
// }


// $('body').on('focusout','.text_editor_editor',function(e){
//     clean_formats($(this).find('.format_container'),true)
// })
///

// draw_text_editor_font_size_contextMenu = function(){
//     return $('<div/>',{class:'w100p'}).append(
//         draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.largest,attrs:{format_action:'font_size',font_size:'1.6em'}}),
//         draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.larger,attrs:{format_action:'font_size',font_size:'1.4em'}}),
//         draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.large,attrs:{format_action:'font_size',font_size:'1.2em'}}),
//         draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.normal,attrs:{format_action:'font_size',font_size:'1em'}}),
//         draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.small,attrs:{format_action:'font_size',font_size:'.8em'}}),
//         draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.smaller,attrs:{format_action:'font_size',font_size:'.6em'}}),
//         draw_contextMenu_elem({icon:'',class:`text_editor_format`,child1_text:texts.styling.smallest,attrs:{format_action:'font_size',font_size:'.4em'}}),
//     )
// }
// draw_text_editor_hyperlinks_contextMenu = function(){
//     return $('<div/>',{class:'w100p'}).append(
//         draw_contextMenu_elem({icon:'ico-home',class:`text_editor_format`,child1_text:texts.website_pages.home,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'home'}}),
//         draw_contextMenu_elem({icon:'ico-about_us',class:`text_editor_format`,child1_text:texts.website_pages.about_us,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'about_us'}}),
//         draw_contextMenu_elem({icon:'ico-product fs101',class:`text_editor_format`,child1_text:texts.website_pages.all_products,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'all_products'}}),
//         draw_contextMenu_elem({icon:'ico-cart',class:`text_editor_format`,child1_text:texts.website_pages.cart,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'cart'}}),
//         draw_contextMenu_elem({icon:'ico-order',class:`text_editor_format`,child1_text:texts.website_pages.track_order,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'track_order'}}),
//         draw_contextMenu_elem({icon:'ico-privacy_policy',class:`text_editor_format`,child1_text:texts.website_pages.privacy_policy,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:'privacy_policy'}}),
//         draw_contextMenu_elem({child1_text:texts.website_pages.category_pages,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_categories_contextMenu()}),
//         draw_contextMenu_elem({child1_text:texts.website_pages.product_pages,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_products_contextMenu()}),
//         draw_contextMenu_elem({child1_text:texts.website_pages.add_to_cart,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_add_to_cart_contextMenu()}),
//         window.selected_page == 'home' ? draw_contextMenu_elem({child1_text:texts.website_pages.scroll_to_section,child2_class:'ico-arrowRight',submenu:draw_text_editor_hyperlinks_scroll_to_section_contextMenu()}) : '',
        
        
//     )
// }
// draw_text_editor_hyperlinks_categories_contextMenu = function(){
//     let contextMenu = $('<div/>',{class:'w100p'});
//     for(const key in window.website_data.categories){
//         let category = window.website_data.categories[key];
//         contextMenu.append(
//             draw_contextMenu_elem({img:category.img.replace('.','_thumbnail.'),class:`text_editor_format`,child1_text:category.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:category.name}})
//         )
//     }
//     return contextMenu;
// }
// draw_text_editor_hyperlinks_products_contextMenu = function(){
//     let contextMenu = $('<div/>',{class:'w100p'});
//     for(const key in window.website_data.products){
//         let product = window.website_data.products[key];
//         contextMenu.append(
//             draw_contextMenu_elem({img:product.img.replace('.','_thumbnail.'),class:`text_editor_format`,child1_text:product.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:product.name}})
//         )
//     }
//     return contextMenu;
// }
// draw_text_editor_hyperlinks_add_to_cart_contextMenu = function(){
//     let contextMenu = $('<div/>',{class:'w100p'});
//     for(const key in window.website_data.products){
//         let product = window.website_data.products[key];
//         contextMenu.append(
//             draw_contextMenu_elem({img:product.img.replace('.','_thumbnail.'),class:`text_editor_format`,child1_text:product.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:`addToCart_${product.name}`}})
//         )
//     }
//     return contextMenu;
// }
// draw_text_editor_hyperlinks_scroll_to_section_contextMenu = function(){
//     let contextMenu = $('<div/>',{class:'w100p'});
//     for(const key in window.template.home){
//         let section = window.template.home[key];
//         contextMenu.append(
//             draw_contextMenu_elem({icon:'ico-section',class:`text_editor_format`,child1_text:section.name,attrs:{format_action:'hyperlink',format_tag:'a',hyperlink_key:`scroll_to_${section.name}`}})
//         )
//     }
//     return contextMenu;
// }

// //
// get_text_selection_span = function(text_editor,tag='span'){
//     let selection = window.getSelection();
//     if(selection.toString().length == 0){
//         if(selection.rangeCount == 0){
//             let temp_range = document.createRange();
//             temp_range.selectNodeContents(text_editor.find('.format_container')[0]);
//             let temp_selection = window.getSelection();
//             temp_selection.removeAllRanges();
//             temp_selection.addRange(temp_range);
//             selection = window.getSelection();
//         }
//         else if(selection.rangeCount > 0){
//             let range = selection.getRangeAt(0);
//             let span = range.commonAncestorContainer;
//             if (span.nodeType !== 1) {
//                 span = span.parentElement;
//             }
//             return span
//         }
//     }
//     let range = selection.getRangeAt(0).cloneRange();
//     let node = selection.anchorNode;
//     let span
//     if(node.nodeType === 1 && !$(node).hasClass('format')){
//         text_editor.find('.format_container').focus()
//         return selection.anchorNode.parentElement;
//     }
//     else 
//     if (node.nodeType === 1 && $(node).hasClass('format')) {
//         span = node;
//     }else if(node.nodeType == 3 && $(node.parentElement).text().trim() == selection.toString().trim() && $(node.parentElement).hasClass('format')){
//         span = node.parentElement;
//     }else if(node.nodeType == 3){
//         span = document.createElement(tag);
//         span.className = 'format';
//         span.appendChild(range.extractContents());
//         range.insertNode(span);
//     }
//     return span;
// }
// set_text_selection_format_btns = function(text_editor){
//     let selection = window.getSelection();
//     let node = selection.anchorNode;
//     let span;
//     if (node.nodeType === 1 && $(node).hasClass('format')) {
//         span = node;
//     }else if(node.nodeType == 3 && $(node.parentElement).hasClass('format')){
//         span = node.parentElement;
//     }
//     setTimeout(()=>{
//         $('.contextMenu_elem_icon').removeClass('ico-check fs07')
//         $(`.contextMenu_elem[font_size="${$(span).css('font-size')}"]`).find('.contextMenu_elem_icon').addClass('ico-check fs07')
//     },100)
//     if($(span).css('font-size') == '16px'){
//         // text_editor.find('.text_editor_format[format_action="font_size"]').removeClass('text_editor_format_style_selected');
//     }else{
//         // text_editor.find('.text_editor_format[format_action="font_size"]').addClass('text_editor_format_style_selected');
//     }
//     if($(span).css('font-weight') == '700'){
//         text_editor.find('.text_editor_format[format_action="bold"]').addClass('text_editor_format_style_selected');
//     }else{
//         text_editor.find('.text_editor_format[format_action="bold"]').removeClass('text_editor_format_style_selected');
//     }

//     if($(span).css('font-style') == 'italic'){
//         text_editor.find('.text_editor_format[format_action="italic"]').addClass('text_editor_format_style_selected');
//     }else{
//         text_editor.find('.text_editor_format[format_action="italic"]').removeClass('text_editor_format_style_selected');
//     }

//     if($(span).css('text-decoration-line') == 'underline'){
//         text_editor.find('.text_editor_format[format_action="underline"]').addClass('text_editor_format_style_selected');
//     }else{
//         text_editor.find('.text_editor_format[format_action="underline"]').removeClass('text_editor_format_style_selected');
//     }
//     if($(span).prop('tagName') == 'A'){
//         text_editor.find('.text_editor_format_hyperlink').addClass('ico-unlink').removeClass('ico-link contextMenu');
//         text_editor.find('.text_editor_format_hyperlink').attr('tooltip',texts.styling.remove_hyperlink);
//     }else{
//         text_editor.find('.text_editor_format_hyperlink').addClass('ico-link contextMenu').removeClass('ico-unlink')
//         text_editor.find('.text_editor_format_hyperlink').attr('tooltip',texts.styling.hyperlink);
//     }
//     if(typeof(span) == 'undefined'){
//         text_editor.find('.text_editor_format[format_action="font_color"]').parent().find('.ico-text_color').css('color','')
//         set_dummy_color_picker(text_editor.find('.text_editor_format_color'),'--')
//         text_editor.find('.text_editor_format[format_action="bg_color"]').parent().find('.ico-background_color').css('background-color','')
//         set_dummy_color_picker(text_editor.find('.text_editor_format_bgcolor'),'--')
//     }else{
//         text_editor.find('.text_editor_format[format_action="font_color"]').parent().find('.ico-text_color').css('color',span.style.color ?? '--')
//         set_dummy_color_picker(text_editor.find('.text_editor_format_color'),span.style.color)
//         text_editor.find('.text_editor_format[format_action="bg_color"]').parent().find('.ico-background_color').css('color',span.style['background-color'] ?? '--')
//         set_dummy_color_picker(text_editor.find('.text_editor_format_bgcolor'),span.style['background-color'])
//     }
// }
// clean_unformated_text = function(text_editor,selection,selection_string){
//     if(text_editor.find('.text_editor_editor').children().length === 0){
//         let text = text_editor.find('.text_editor_editor').children().text();
//         text_editor.find('.text_editor_editor').children().text('').append(
//             $('<div/>',{class:'format format_container',text:text})
//         )
//     }
//     text_editor.find('.format').each(function(){
//         let remove_elem = false;
//         let font_size_check = false;
//         if($(this).css('font-size') == '16px' || $(this).css('font-size') == '1em'){font_size_check = true;}
//         if(
//             $(this).prop('tagName') == 'SPAN' &&

//             font_size_check &&
//             $(this).css('font-weight') == '400' &&
//             $(this).css('font-style') == 'normal' &&
//             $(this).css('text-decoration-line') == 'none' &&

//             // $(this).parent().css('font-size') == '16px' &&
//             // $(this).parent().css('font-weight') == '400' &&
//             // $(this).parent().css('font-style') == 'normal' &&
//             // $(this).parent().css('text-decoration-line') == 'none' &&

//             $(this).css('color') === $(this).parent().css('color') &&
//             $(this).css('background-color') === $(this).parent().css('background-color') 
//         ){
//             remove_elem = true;
//         }



//         if($(this).text().trim().length == 0){
//             remove_elem = true;
//         }

//         if(!$(this).hasClass('format')){
//             remove_elem = true;
//         }
//         if($(this).hasClass('format_container') && $(this).text().trim().length > 0){
//             remove_elem = false;
//         }


//         if(remove_elem){
//             $(this).after($(this).text());
//             $(this).remove();
//         }else{
//             let new_elem;
//             if($(this).prop('tagName') == 'A'){
//                 new_elem = $('<a/>');
//             }else{
//                 new_elem = $('<span/>');
//                 $(this).removeClass('open_page open_popup scroll_to_section')
//                 $(this).attr('page','');
//                 $(this).attr('popup','');
//                 $(this).attr('section','')
//                 $(this).attr('product','')
//                 $(this).attr('category','')
//                 $(this).attr('href','')
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
//     if(text_editor.find('.text_editor_editor').find('.format_container').length === 0){
//         let html = text_editor.find('.text_editor_editor').html();
//         text_editor.find('.text_editor_editor').text('').append(
//             $('<div/>',{class:'format format_container'}).append(html)
//         )
//     }
// }
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
// $('body').on('mouseup keyup','.text_editor_editor',function(e){
//     // e.stopPropagation();
//     set_text_selection_format_btns($(this).closest('.text_editor'));
//     // hidePopupSelectors();
// });
// $('body').on('input','.text_editor_editor',function(e){
//     let new_val = $(this).html();
//     if($(this).closest('.text_editor').find('.format_container').length == 0 || $(this).closest('.text_editor').find('.format_container').text() == ''){
//         $(this).text('').append(`<div class="format format_container">${new_val}</div>`)
//     }
//     set_val($(this).closest('.text_editor'),new_val);
//     new_action(false,true);

// })
// $('body').on('click','.text_editor_format_font_size',function(){
//     let text_editor = window.selected_text_editor = $(this).closest('.text_editor');
//     set_text_selection_format_btns(text_editor);

// })
// $('body').on('click','.text_editor_format_hyperlink',function(){
//     if($(this).hasClass('ico-link')){
//         window.selected_text_editor = $(this).closest('.text_editor');
//     }else if($(this).hasClass('ico-unlink')){
//         let selection = window.getSelection();
//         let node = selection.anchorNode;
//         let span
//         if (node.nodeType === 1 && $(node).hasClass('format')) {
//             span = node;
//         }else if(node.nodeType == 3 && $(node.parentElement).hasClass('format')){
//             span = node.parentElement;
//         }
//         let selection_string = selection.toString();
//         let text_editor = $(span).closest('.text_editor');
//         $(span).after($(span).text());
//         $(span).remove();
//         set_text_selection_format_btns(text_editor);
//         clean_unformated_text(text_editor,selection,selection_string);
//         text_editor.find('.text_editor_editor').trigger('input')
//     }
// })
// $('body').on('click','.text_editor_format',function(e){
//     // e.stopImmediatePropagation();
//     let span = get_text_selection_span($(this).closest('.text_editor'),$(this).attr('format_tag'));
//     if(typeof(span) == 'undefined'){return;}
//     let selection = window.getSelection();
//     let newRange = document.createRange();
//     newRange.selectNodeContents(span);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//     span = selection.anchorNode;
//     let selection_string = selection.toString();
//     let new_action = true;
//     switch($(this).attr('format_action')){
//         case 'font_size':
//             $(span).css('font-size',$(this).attr('font_size'))
//             new_action = false;
//             set_text_selection_format_btns(window.selected_text_editor);
//             clean_unformated_text(window.selected_text_editor,selection,selection_string);
//             window.selected_text_editor.find('.text_editor_editor').trigger('input')
//         break;
//         case 'bold':
//             if($(span).css('font-weight')  == '700'){
//                 $(span).css('font-weight','400');
//                 $(span).children().css('font-weight','400');
//             }else{
//                 $(span).css('font-weight','700');
//             }
//         break;
//         case 'italic':
//             if($(span).css('font-style') == 'italic'){
//                 $(span).css('font-style','normal');
//                 $(span).children().css('font-style','normal');
//             }else{
//                 $(span).css('font-style','italic');
//             }
//         break;
//         case 'underline':
//             if($(span).css('text-decoration-line') == 'underline'){
//                 $(span).css('text-decoration-line','none');
//                 $(span).children().css('text-decoration-line','none');
//             }else{
//                 $(span).css('text-decoration-line','underline');
//             }
//         break;
//         case 'font_color':
//             new_action = false;
//             setTimeout(()=>{
//                 $(this).closest('.text_editor_btns').find('.text_editor_format_color').trigger('mouseup')
//             })
//         break;
//         case 'bg_color':
//             new_action = false;
//             setTimeout(()=>{
//                 $(this).closest('.text_editor_btns').find('.text_editor_format_bgcolor').trigger('mouseup')
//             })
//         break;
//         case 'remove_format':
//             $(this).closest('.text_editor').find('.text_editor_editor').find('.format').each(function(){
//                 if($(this).hasClass('format_container')){
//                     $(this).after($('<div/>',{class:'format format_container',text:$(this).text()}))
//                     $(this).remove();
//                 }else{
//                     $(this).after($(this).text());
//                     $(this).remove();
//                 }
//             })
//             $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
//             new_action = false;
//         break;
//         case 'hyperlink':
//             let hyperlink = get_hyperlinks()[$(this).attr('hyperlink_key')];
//             if($(span).prop('tagName') != 'A'){
//                 let span_text = $(span).text();
//                $(span).text('').append(
//                     span = $('<a/>',{class:'format',text:span_text})
//                 )
//             }
//             $(span).removeClass('open_page open_popup scroll_to_section').addClass(hyperlink.class);
//             for(const key in hyperlink.attr){
//                 if(key == 'href'){
//                     $(span).attr(key,`/${window.selected_text_editor.attr('key')}${hyperlink.attr[key]}`)
//                 }else{
//                     $(span).attr(key,hyperlink.attr[key])
//                 }
//             }

//             new_action = false;
//             set_text_selection_format_btns(window.selected_text_editor);
//             clean_unformated_text(window.selected_text_editor,selection,selection_string);
//             window.selected_text_editor.find('.text_editor_editor').trigger('input')
//         break;
//     }


//     if(new_action){
//         set_text_selection_format_btns($(this).closest('.text_editor'));
//         clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
//         $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
//     }
// });
// $('body').on('change','.text_editor_format_color',function(){
//     let span = get_text_selection_span($(this).closest('.text_editor'));
//     if(typeof(span) == 'undefined'){return;}
//     let selection = window.getSelection();
//     let newRange = document.createRange();
//     newRange.selectNodeContents(span);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//     span = selection.anchorNode;
//     let selection_string = selection.toString();
//     let new_val = get_dummy_val($(this));
//     $(span).css('color',new_val);
//     $(span).children().css('color',new_val);
//     set_text_selection_format_btns($(this).closest('.text_editor'));
//     clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
//     $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
// })
// $('body').on('change','.text_editor_format_bgcolor',function(){
//     let span = get_text_selection_span($(this).closest('.text_editor'));
//     if(typeof(span) == 'undefined'){return;}
//     let selection = window.getSelection();
//     let newRange = document.createRange();
//     newRange.selectNodeContents(span);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//     span = selection.anchorNode;
//     let selection_string = selection.toString();
//     let new_val = get_dummy_val($(this));
//     $(span).css('background-color',new_val);
//     $(span).children().css('background-color',new_val);
//     set_text_selection_format_btns($(this).closest('.text_editor'));
//     clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
//     $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
// })
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
//     clean_unformated_text($(this).closest('.text_editor'),selection,selection_string);
//     $(this).closest('.text_editor').find('.text_editor_editor').trigger('input')
// })

//
