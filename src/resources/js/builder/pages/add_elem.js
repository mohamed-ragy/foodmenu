// show_add_elem_popup = function(elem_type){
//     show_popup(function(){
//         $('.popupTitle').text(texts.add_element);
//         $('.popupBody').addClass('').append(
//             $('<div/>',{class:'add_elem_popup_container'}).append(
//                 $('<div/>',{class:'add_elem_type_elem_container'}).append(
//                     $('<div/>',{class:`add_elem_type_elem ${elem_type == 'title' ? 'add_elem_type_elem_selected' : ''}`,elem_type:'title'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-title fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.title})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_elem_type_elem ${elem_type == 'paragraph' ? 'add_elem_type_elem_selected' : ''}`,elem_type:'paragraph'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-paragraph fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.paragraph})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_elem_type_elem ${elem_type == 'image' ? 'add_elem_type_elem_selected' : ''}`,elem_type:'image'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-image fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.image})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_elem_type_elem ${elem_type == 'button' ? 'add_elem_type_elem_selected' : ''}`,elem_type:'button'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-button fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.button})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_elem_type_elem ${elem_type == 'icon' ? 'add_elem_type_elem_selected' : ''}`,elem_type:'icon'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-icon fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.icon})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_elem_type_elem ${elem_type == 'line' ? 'add_elem_type_elem_selected' : ''}`,elem_type:'line'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-line fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.line})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                 ),
//                 $('<div/>',{class:'add_elem_preview_container'})

//             )
//         )
//     });
//     draw_add_elem_previews(elem_type)
// }
// draw_add_elem_previews = function(elem_type){
//     let elems;
//     $('.add_elem_preview_container').text('')
//     switch(elem_type){
//         case 'title':
//             elems = get_titles();
//             for(const key in elems){
//                 let elem = elems[key];
//                 let elem_style = '';
//                 for(const key2 in elem.css){
//                     elem_style = `${elem_style}${key2}:${elem.css[key2]};`
//                 }
//                 if('font_style' in elem){
//                     if(window.preview_language in elem.font_style){
//                         elem_style = `${elem_style}font-family:${elem.font_style[window.preview_language]}`
//                     }
//                 }
//                 $('.add_elem_preview_container').append(
//                     $(`<div/>`,{elem_type:elem_type,key:key,class:'add_elem_elem',}).append(
//                         $(`<${elem.tag}/>`,{
//                             style:elem_style,text:texts.elems.title_placeholder
//                         })
//                     )
//                 )
//             }
//         break;
//     }

// }
$('body').on('click','.add_elem',function(e){
    let new_elem;
    switch($(this).attr('elem_type')){
        case 'title':
            new_elem = elem_title()
        break;
        case 'paragraph':
            new_elem = elem_paragraph()
        break;
        case 'image':
            new_elem = elem_image();
        break;
        case 'button':
            new_elem = elem_button();
            let button_style = get_buttons('1',0);
            for(const key in button_style.css){
                new_elem.css[key] = button_style.css[key];
                new_elem.css_mobile[key] = button_style.css[key];
                new_elem.css_click[key] = button_style.css[key];
                new_elem.css_click_mobile[key] = button_style.css[key];
            }
            for(const key in button_style.css_hover){
                new_elem.css_hover[key] = button_style.css_hover[key];
                new_elem.css_hover_mobile[key] = button_style.css_hover[key];
            }
            for(const key in button_style.css_disabled){
                new_elem.css_disabled[key] = button_style.css_disabled[key];
            }
            new_elem.attr.href = '/home';
            new_elem.attr.page = 'home';
            new_elem.class = `${new_elem.class} open_page`
        break;
        case 'icon':
            new_elem = elem_icon();
        break;
        case 'container': 
            new_elem = elem_container();
        break;
    }
    let section_block = get_element_data(window.selected);
    new_elem.sort = section_block.children.length;
    let new_elem_zindex = 1;
    for(const key in section_block.children){
        if(section_block.children[key].css['z-index'] >= new_elem_zindex){
            new_elem_zindex = parseInt(section_block.children[key].css['z-index']) + 1;
        }
    }
    new_elem.css['z-index'] = new_elem_zindex;
    section_block.children.push(new_elem);
    new_action(window.selected);
    close_popup();
    select(`${window.selected}.children.${new_elem.sort}`)
    switch($(this).attr('elem_type')){
        case 'title':
            draw_editor_popup_text();
        break;
        case 'paragraph':
            draw_editor_popup_text();
        break;
        case 'image':
            setTimeout(()=>{
                draw_editor_popup_image();
                $('.select_image_editor').trigger('click')
            })
        break;
        case 'button':
            draw_editor_popup_button();
        break;
        case 'icon':
            setTimeout(()=>{
                draw_editor_popup_icon();
                $('.png_icon_selector_editor').trigger('click')
            })
        break;

    }
})
// $('body').on('click','.add_elem',function(e){
//     let elem_type = $(this).attr('elem_type');
//     show_add_elem_popup(elem_type);
// })
// $('body').on('click','.add_elem_type_elem',function(e){
//     let elem_type = $(this).attr('elem_type');
//     draw_add_elem_previews(elem_type);
//     $('.add_elem_type_elem').removeClass('add_elem_type_elem_selected');
//     $(this).addClass('add_elem_type_elem_selected')
// })
// $('body').on('click','.add_elem_elem',function(){
//     let new_elem;
//     switch($(this).attr('elem_type')){
//         case 'title':
//             new_elem = get_titles()[$(this).attr('key')]
//         break;
//     }
//     let elem = get_element_data(window.selected);
//     new_elem.sort = elem.children.length;
//     elem.children.push(new_elem);
//     new_action(window.selected);
//     close_popup();
//     select(`${window.selected}.children.${new_elem.sort}`)
// })