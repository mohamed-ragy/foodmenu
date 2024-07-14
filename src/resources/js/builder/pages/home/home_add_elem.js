// show_add_home_elem_popup = function(elem_type){
//     show_popup(function(){
//         $('.popupTitle').text(texts.add_element);
//         $('.popupBody').addClass('').append(
//             $('<div/>',{class:'add_home_elem_popup_container'}).append(
//                 $('<div/>',{class:'add_home_elem_type_elem_container'}).append(
//                     $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'title' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'title'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-title fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.title})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'paragraph' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'paragraph'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-paragraph fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.paragraph})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'image' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'image'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-image fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.image})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'button' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'button'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-button fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.button})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'icon' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'icon'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-icon fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.icon})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                     $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'line' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'line'}).append(
//                         $('<div/>',{}).append(
//                             $('<div/>',{class:'ico-line fs101 mie-10'}),
//                             $('<div/>',{text:texts.elems.line})
//                         ),
//                         $('<div/>',{class:'ico-arrowRight'})
//                     ),
//                 ),
//                 $('<div/>',{class:'add_home_elem_preview_container'})

//             )
//         )
//     });
//     draw_add_home_elem_previews(elem_type)
// }
// draw_add_home_elem_previews = function(elem_type){
//     let elems;
//     $('.add_home_elem_preview_container').text('')
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
//                 $('.add_home_elem_preview_container').append(
//                     $(`<div/>`,{elem_type:elem_type,key:key,class:'add_home_elem_elem',}).append(
//                         $(`<${elem.tag}/>`,{
//                             style:elem_style,text:texts.elems.title_placholder
//                         })
//                     )
//                 )
//             }
//         break;
//     }

// }
$('body').on('click','.add_home_elem',function(e){
    let new_elem;
    switch($(this).attr('elem_type')){
        case 'title':
            new_elem = home_elem_title()
        break;
        case 'paragraph':
            new_elem = home_elem_paragraph()
        break;
        case 'image':
            new_elem = home_elem_image()
        break;
        case 'button':
            new_elem = home_elem_button()
        break;
    }
    let elem = get_elem_data(window.selected).elem;
    new_elem.sort = elem.children.length;
    let new_elem_zindex = 1;
    for(const key in elem.children){
        if(elem.children[key].css['z-index'] >= new_elem_zindex){
            new_elem_zindex = parseInt(elem.children[key].css['z-index']) + 1;
        }
    }
    new_elem.css['z-index'] = new_elem_zindex;
    elem.children.push(new_elem);
    new_action();
    close_popup();
    select(`${window.selected}.children.${new_elem.sort}`)
})
// $('body').on('click','.add_home_elem',function(e){
//     let elem_type = $(this).attr('elem_type');
//     show_add_home_elem_popup(elem_type);
// })
// $('body').on('click','.add_home_elem_type_elem',function(e){
//     let elem_type = $(this).attr('elem_type');
//     draw_add_home_elem_previews(elem_type);
//     $('.add_home_elem_type_elem').removeClass('add_home_elem_type_elem_selected');
//     $(this).addClass('add_home_elem_type_elem_selected')
// })
// $('body').on('click','.add_home_elem_elem',function(){
//     let new_elem;
//     switch($(this).attr('elem_type')){
//         case 'title':
//             new_elem = get_titles()[$(this).attr('key')]
//         break;
//     }
//     let elem = get_elem_data(window.selected).elem;
//     new_elem.sort = elem.children.length;
//     elem.children.push(new_elem);
//     new_action();
//     close_popup();
//     select(`${window.selected}.children.${new_elem.sort}`)
// })