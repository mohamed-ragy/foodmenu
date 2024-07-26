//
draw_home_section_block_contextMenu = function(elem_data){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-add_elem',child1_text:texts.add_element,child2_class:'ico-arrowRight',submenu:draw_home_section_block_add_elem_contextMenu()}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-cut',class:`cut`,child1_text:texts.cut,child2_text:texts.keyboard_shortcuts.cut,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-copy',class:`copy`,child1_text:texts.copy,child2_text:texts.keyboard_shortcuts.copy,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-paste',class:`paste ${!window.builder_clipboard ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.paste,child2_text:texts.keyboard_shortcuts.paste,child2_class:'fs07'}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-alignment',class:`editor_alignment`,child1_text:texts.styling.alignment}),
        draw_contextMenu_elem({icon:'ico-layers fs101',child1_text:texts.arrange,child2_class:'ico-arrowRight',submenu:draw_home_section_block_arrange_contextMenu(elem_data)}),
        draw_contextMenu_elem({icon:'ico-spacing',child1_text:texts.spacing,child2_class:'ico-arrowRight',submenu:draw_home_section_block_spacing_contextMenu()}),
        draw_contextMenu_elem({icon:'ico-styling',child1_text:texts._styling,child2_class:'ico-arrowRight',submenu:draw_home_section_block_styling_contextMenu()}),
        draw_contextMenu_elem({icon:'ico-animation',class:`editor_animation`,child1_text:texts.styling.animation }),
        draw_contextMenu_elem({icon:'ico-background',class:'editor_background',child1_text:texts.styling.block_background}),
        draw_contextMenu_elem({icon:'ico-layers',child1_text:texts.styling.elements,class:`${elem_data.elem.children.length == '0' ? 'contextMenu_elem_dummy' : ''}`,child2_class:'ico-arrowRight',submenu:draw_home_section_block_elements_contextMenu()}),


    )
}
draw_home_section_block_add_elem_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-title',class:`add_home_elem`,child1_text:texts.elems.title,attrs:{'elem_type':'title'}}),
        draw_contextMenu_elem({icon:'ico-paragraph',class:`add_home_elem`,child1_text:texts.elems.paragraph,attrs:{'elem_type':'paragraph'}}),
        draw_contextMenu_elem({icon:'ico-image fs101',class:`add_home_elem`,child1_text:texts.elems.image,attrs:{'elem_type':'image'}}),
        draw_contextMenu_elem({icon:'ico-button fs101',class:`add_home_elem`,child1_text:texts.elems.button,attrs:{'elem_type':'button'}}),
        draw_contextMenu_elem({icon:'ico-icon',class:`add_home_elem`,child1_text:texts.elems.icon,attrs:{'elem_type':'icon'}}),
    )
}
draw_home_section_block_arrange_contextMenu = function(elem_data){
    let parent = get_home_elem_parent(window.selected);
    let bring_to_front_dummy = 'contextMenu_elem_dummy';
    let bring_forward_dummy = 'contextMenu_elem_dummy';
    let send_backward_dummy = 'contextMenu_elem_dummy';
    let send_to_back_dummy = 'contextMenu_elem_dummy';
    for(const key in parent.children){
        let child = parent.children[key];
        if((child.class_selector) != (elem_data.elem.class_selector)){
            if(child.css['z-index'] >= elem_data.elem.css['z-index']){
                bring_to_front_dummy = '';
                bring_forward_dummy = '';
            }
            if(child.css['z-index'] <= elem_data.elem.css['z-index']){
                send_backward_dummy = '';
                send_to_back_dummy = '';
            }
        }
    }
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-bring_to_front',class:`editor_bring_to_front ${bring_to_front_dummy}`,child1_text:texts.bring_to_front,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.bring_to_front}),
        draw_contextMenu_elem({icon:'ico-bring_forward',class:`editor_bring_forward ${bring_forward_dummy}`,child1_text:texts.bring_forward,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.bring_forward}),
        draw_contextMenu_elem({icon:'ico-send_backward',class:`editor_send_backward ${send_backward_dummy}`,child1_text:texts.send_backward,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.send_backward}),
        draw_contextMenu_elem({icon:'ico-send_to_back',class:`editor_send_to_back ${send_to_back_dummy}`,child1_text:texts.send_to_back,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.send_to_back}),
    ) 
}


draw_home_section_block_styling_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-border',class:`editor_border`,child1_text:texts.styling.border}),
        draw_contextMenu_elem({icon:'ico-border_radius',class:`editor_border_radius`,child1_text:texts.styling.border_radius}),
        draw_contextMenu_elem({icon:'ico-box_shadow',class:`editor_box_shadow`,child1_text:texts.styling.box_shadow}),
    )
}
draw_home_section_block_spacing_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-padding',class:`editor_padding`,child1_text:texts.styling.padding}),
        draw_contextMenu_elem({icon:'ico-margin',class:`editor_margin`,child1_text:texts.styling.margin}),
    ) 
}
draw_home_section_block_elements_contextMenu = function(){
    let container =  $('<div/>',{class:'w100p'})
    let elements = get_elem_data(window.selected).elem.children;
    for(const key in elements){
        container.append(
            draw_contextMenu_elem({icon:`ico-${elements[key].elem_type}`,class:'select',child1_text:texts.elems[elements[key].elem_type],attrs:{key_tree:`${window.selected}.children.${key}`}})
        )
    }
    return container;
}
draw_editor_popup_editor_shortcuts_home_section_block = function(elem_data){
    $('#editor').find('.editor_popup_body_shortcuts').append(
        $('<div/>',{class:`editor_popup_body_shortcut ico-alignment editor_alignment`,tooltip:texts.styling.alignment}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-padding editor_padding`,tooltip:texts.styling.padding}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-margin editor_margin`,tooltip:texts.styling.margin}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-border editor_border`,tooltip:texts.styling.border}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-border_radius editor_border_radius`,tooltip:texts.styling.border_radius}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-box_shadow editor_box_shadow`,tooltip:texts.styling.box_shadow}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-animation editor_animation`,tooltip:texts.styling.animation}),
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
    show_contextMenu('home_section_block',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
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
$('body').on('dblclick','.add_elem_popup_elem_contenteditable',function(e){
    if($(this).hasClass('editing_edit_home_elem_editing')){return;}
    draw_edit_home_text_elem_text($(this).closest('.home_elem'))
    hide_editor_popup('editor')
})
///
