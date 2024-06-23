//
draw_home_section_block_contextMenu = function(elem_data){
    return $('<div/>',{class:'w100p'}).append(
        // draw_contextMenu_elem({icon:'ico-add_elem',class:`section_block_add_elem`,child1_text:texts.add_element}),
        draw_contextMenu_elem({icon:'ico-add_elem',child1_text:texts.add_element,child2_class:'ico-arrowRight',submenu:draw_home_section_block_add_elem_contextMenu()}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-cut',class:`cut`,child1_text:texts.cut,child2_text:texts.keyboard_shortcuts.cut,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-copy',class:`copy`,child1_text:texts.copy,child2_text:texts.keyboard_shortcuts.copy,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-paste',class:`paste ${!window.builder_clipboard ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.paste,child2_text:texts.keyboard_shortcuts.paste,child2_class:'fs07'}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-alignment',class:`editor_alignment`,child1_text:texts.styling.alignment}),
        draw_contextMenu_elem({icon:'ico-padding',class:`editor_padding`,child1_text:texts.styling.padding}),
        // draw_contextMenu_elem({icon:'ico-sizing',class:'contextMenu_elem_dummy',child1_text:texts.sizing,child2_class:'ico-arrowRight',submenu:draw_home_section_block_sizing_contextMenu()}),
        // draw_contextMenu_elem({icon:'ico-sizing',child1_text:texts.styling.positioning,child2_class:'ico-arrowRight',submenu:draw_home_section_block_positioning_contextMenu()}),
        draw_contextMenu_elem({icon:'ico-styling',child1_text:texts._styling,child2_class:'ico-arrowRight',submenu:draw_home_section_block_styling_contextMenu()}),
        // draw_contextMenu_elem({icon:'ico-animation',class:`editor_animation`,child1_text:texts.styling.animation }),
        draw_contextMenu_elem({icon:'ico-background',class:'editor_background',child1_text:texts.styling.block_background}),


    )
}
// draw_home_section_block_sizing_contextMenu = function(){
//     return $('<div/>',{class:'w100p'}).append(
//         draw_contextMenu_elem({icon:'ico-width',class:`editor_width contextMenu_elem_dummy`,child1_text:texts.styling.width}),
//         draw_contextMenu_elem({icon:'ico-height',class:`editor_height contextMenu_elem_dummy`,child1_text:texts.styling.height}),
//     ) 
// }
// draw_home_section_block_positioning_contextMenu = function(){
//     return $('<div/>',{class:'w100p'}).append(
//         draw_contextMenu_elem({icon:'ico-padding',class:`editor_padding`,child1_text:texts.styling.padding}),
//         // draw_contextMenu_elem({icon:'ico-margin',class:`editor_margin contextMenu_elem_dummy`,child1_text:texts.styling.margin}),
//         // draw_contextMenu_elem({icon:'ico-transform',class:`editor_transform`,child1_text:texts.styling.transform}),
//     )
// }
draw_home_section_block_add_elem_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-title',class:`add_home_elem`,child1_text:texts.elems.title,attrs:{'elem_type':'title'}}),
        draw_contextMenu_elem({icon:'ico-paragraph',class:`add_home_elem`,child1_text:texts.elems.paragraph,attrs:{'elem_type':'paragraph'}}),
        draw_contextMenu_elem({icon:'ico-image fs101',class:`add_home_elem`,child1_text:texts.elems.image,attrs:{'elem_type':'image'}}),
        draw_contextMenu_elem({icon:'ico-button fs101',class:`add_home_elem`,child1_text:texts.elems.button,attrs:{'elem_type':'button'}}),
        draw_contextMenu_elem({icon:'ico-icon',class:`add_home_elem`,child1_text:texts.elems.icon,attrs:{'elem_type':'icon'}}),
        draw_contextMenu_elem({icon:'ico-line',class:`add_home_elem`,child1_text:texts.elems.line,attrs:{'elem_type':'line'}}),

    )
}
draw_home_section_block_styling_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        // draw_contextMenu_elem({icon:'ico-filter',class:`editor_filter`,child1_text:texts.styling.filter}),
        draw_contextMenu_elem({icon:'ico-border',class:`editor_border`,child1_text:texts.styling.border}),
        draw_contextMenu_elem({icon:'ico-border_radius',class:`editor_border_radius`,child1_text:texts.styling.border_radius}),
        draw_contextMenu_elem({icon:'ico-box_shadow',class:`editor_box_shadow`,child1_text:texts.styling.box_shadow}),
    )
}
draw_editor_popup_editor_shortcuts_home_section_block = function(elem_data){
    $('#editor').find('.editor_popup_body_shortcuts').append(
        $('<div/>',{class:`editor_popup_body_shortcut ico-alignment editor_alignment`,tooltip:texts.styling.alignment}),
        // $('<div/>',{class:`editor_popup_body_shortcut contextMenu_elem_dummy ico-width editor_width`,tooltip:texts.styling.width}),
        // $('<div/>',{class:`editor_popup_body_shortcut contextMenu_elem_dummy ico-height editor_height`,tooltip:texts.styling.height}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-padding editor_padding`,tooltip:texts.styling.padding}),
        // $('<div/>',{class:`editor_popup_body_shortcut contextMenu_elem_dummy ico-margin editor_margin`,tooltip:texts.styling.margin}),
        // $('<div/>',{class:`editor_popup_body_shortcut ico-transform editor_transform`,tooltip:texts.styling.transform}),
        // $('<div/>',{class:`editor_popup_body_shortcut ico-filter editor_filter`,tooltip:texts.styling.filter}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-border editor_border`,tooltip:texts.styling.border}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-border_radius editor_border_radius`,tooltip:texts.styling.border_radius}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-box_shadow editor_box_shadow`,tooltip:texts.styling.box_shadow}),
        // $('<div/>',{class:`editor_popup_body_shortcut ico-animation editor_animation`,tooltip:texts.styling.animation}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-background editor_background`,tooltip:texts.styling.section_background}),
    )
}
set_editor_popup_editor_position_home_section_block = function(key_tree){
    let left = ($(`.section_block[key_tree="${key_tree}"]`).offset().left) + 10 + ($(`.section_block[key_tree="${key_tree}"]`).width())
    if(($(`.section_block[key_tree="${key_tree}"]`).offset().left) + (100) >= ($(window).width() / 2)){
        left = ($(`.section_block[key_tree="${key_tree}"]`).offset().left) - 10 - 350;
    }
    $('#editor').addClass('h600 w350').css({
        top:($(`.section_block[key_tree="${key_tree}"]`).offset().top),
        left:left,
        right:'unset',
        bottom:'unset',
    })
}
$('body').on('contextmenu','.section_block',function(e){
    if($('.home_elem:hover').length > 0){return}
    show_contextMenu($(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','.section_block',function(e){
    if($('.home_elem:hover').length > 0){return}
    draw_editor_popup_section_block_alignment();
})
$('body').on('mouseup touchend','.section_block',function(e){
    if($('.home_elem:hover').length > 0){return}
    select($(this).attr('key_tree'));
})
//
// select_section_black =function(key_tree){
//     deselect_all();
//     hide_editor_popup('editor')
//     window.selected_section_block = key_tree;
//     $(`.section_block[key_tree="${key_tree}"]`).addClass('section_block_selected')
// }
// select_section_elem = function(key_tree){
//     deselect_all();
//     hide_editor_popup('editor')
//     window.selected_elem = key_tree;
//     $(`.home_elem[key_tree="${window.selected_elem}"]`).addClass('edit_home_elem_selected');
// }
//
// $('body').on('click','.section_block',function(e){
//     // e.stopImmediatePropagation();
//     // if($(this).children().hasClass('editing_edit_home_elem_editing')){return;}
//     if($('.section_block_edit_btns:hover').length > 0){return;}
//     if($('.home_elem:hover').length > 0){return;}
//     select_section_black($(this).attr('key_tree'))
// })
// $('body').on('click','.section_block_edit_btn',function(e){
//     // e.stopImmediatePropagation();
//     show_edit_home_section_block($(this).attr('key_tree'))
// })
///
// show_edit_home_elem_editor_popup = function(elem_type,elem_key_tree){
//     if(elem_type == 'title'){
//         show_edit_home_title(elem_key_tree)
//     }else if(elem_type == 'paragraph'){
//         show_edit_home_paragraph(elem_key_tree)
//     }else if(elem_type == 'image'){
//         show_edit_home_image(elem_key_tree);
//     }
// }
// $('body').on('click','.section_add_elem_btn',function(e){
//     // e.stopImmediatePropagation();
//     $('.add_elem_popup').attr('key_tree',$(this).attr('key_tree')).text('').css({
//         'top':$(this).offset().top + $(this).outerHeight(),
//         'left':$(this).offset().left,
//     }).removeClass('none');
//     for(const key in window.home_elems){
//         $('.add_elem_popup').append(
//             $('<div/>',{class:'add_elem_popup_elem',elem:window.home_elems[key]}).append(
//                 $('<div/>',{class:`ico-${window.home_elems[key]}`}),
//                 $('<div/>',{text:texts.elems[window.home_elems[key]]})
//             )
//         )
//     }
// })
// $('body').on('click','.add_elem_popup_elem',function(e){
//     // e.stopImmediatePropagation();
//     let section_block = get_key_tree($('.add_elem_popup').attr('key_tree')).elem;
//     let elem = get_home_elem($(this).attr('elem'));
//     elem.sort = parseInt(section_block.children.length + 1);
//     section_block.children.push(JSON.parse(JSON.stringify(elem)));
//     new_action();
//     show_edit_home_elem_editor_popup($(this).attr('elem'),`${$('.add_elem_popup').attr('key_tree')}.children.${(parseInt(section_block.children.length) - 1)}`)
// })
// //
// $('body').on('click','.home_elem',function(e){
//     if($(this).hasClass('editing_edit_home_elem_editing')){return;}
//     if($('.elem_edit_btns:hover').length > 0){return;}
//     // e.stopPropagation();
//     select_section_elem($(this).attr('key_tree'))

// })
// $('body').on('click','.edit_home_elem_btn',function(e){
//     if($(this).closest('.home_elem').hasClass('editing_edit_home_elem_editing')){return;}
//     // e.stopPropagation();
//     show_edit_home_elem_editor_popup($(this).closest('.home_elem').attr('elem'),$(this).closest('.home_elem').attr('key_tree'))

// })
// $('body').on('click','.delete_home_elem',function(e){
//     e.stopPropagation();
//     // e.stopImmediatePropagation();
//     let key_tree = get_key_tree($(this).closest('.home_elem').attr('key_tree'));
//     key_tree.parent.children.splice(key_tree.elem_key,1);
//     for(const key in key_tree.parent.children){
//         key_tree.parent.children[key].sort =  parseInt(key) + 1;
//     }
//     hide_editor_popup('editor')
//     deselect_all();
//     new_action();
// })
// $('body').on('click','.swap_up_home_elem',function(e){
//     e.stopPropagation();
//     // e.stopImmediatePropagation();
//     let key_tree = get_key_tree($(this).closest('.home_elem').attr('key_tree'));
//     let temp_from = key_tree.elem.sort;
//     key_tree.parent.children.find(item=>item.sort == parseInt(temp_from) - 1).sort = temp_from;
//     key_tree.elem.sort = parseInt(temp_from) - 1;
//     hide_editor_popup('editor')
//     new_action();
//     deselect_all();
// })
// $('body').on('click','.swap_down_home_elem',function(e){
//     e.stopPropagation();
//     // e.stopImmediatePropagation();
//     let key_tree = get_key_tree($(this).closest('.home_elem').attr('key_tree'));
//     let temp_from = key_tree.elem.sort;
//     key_tree.parent.children.find(item=>item.sort == parseInt(temp_from) + 1).sort = temp_from;
//     key_tree.elem.sort = parseInt(temp_from) + 1;
//     hide_editor_popup('editor')
//     new_action();
//     deselect_all();
// })
// $('body').on('click','.edit_home_text_elem_text',function(e){
//     // e.stopImmediatePropagation();
//     draw_edit_home_text_elem_text($(this).closest('.home_elem'))
//     hide_editor_popup('editor')
// })
$('body').on('dblclick','.add_elem_popup_elem_contenteditable',function(e){
    if($(this).hasClass('editing_edit_home_elem_editing')){return;}
    draw_edit_home_text_elem_text($(this).closest('.home_elem'))
    hide_editor_popup('editor')
})
