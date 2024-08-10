draw_contextMenu = function(){
    let elem_data = get_elem_data(window.selected);
    let accessibility = elem_data.elem.accessibility;
    let contextMenu = $('<div/>',{class:'w100p'});


    //swap,dublicate,delete,add_elem
    if(accessibility.includes('header_logo_alignment')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-alignment',class:`editor_header_logo_alignment`,child1_text:texts.styling.alignment})
        )
    }
    if(accessibility.includes('header_logo_logo')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-logo_restaurant_name',class:`editor_header_logo_logo`,child1_text:texts.styling.restauran_logo})
        )
    }
    if(accessibility.includes('header_logo_restaurant_name')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-title',class:`editor_header_logo_restaurant_name`,child1_text:texts.styling.restaurant_name})
        )
    }
    if(accessibility.includes('header_navList')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-navigation_list fs101',class:`editor_header_navList`,child1_text:texts.styling.header_navList})
        )
    }
    if(accessibility.includes('add_elem')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-add_elem',child1_text:texts.add_element,child2_class:'ico-arrowRight',submenu:draw_section_block_add_elem_contextMenu(accessibility)}),
        )
    }
    if(accessibility.includes('elem_swap')){
        let section_block = elem_data.section_block;
        let swap_up_icon;let swap_up_text;
        let swap_down_icon;let swap_down_text;
        let is_up_down = true;
        if(window.current_view == 'desktop'){
            if(section_block.css['flex-direction'] == 'row'){is_up_down = false;}
        }else if(window.current_view == 'mobile'){
            if(section_block.css_mobile['flex-direction'] == 'row'){is_up_down = false;}
        }
        if(is_up_down){
            swap_up_icon = 'ico-arrowUp';
            swap_up_text = texts.swapUp;
            swap_down_icon = 'ico-arrowDown';
            swap_down_text = texts.swapDown;
        }else{
            swap_up_icon = 'ico-arrowLeft';
            swap_up_text = texts.swapLeft;
            swap_down_icon = 'ico-arrowRight';
            swap_down_text = texts.swapRight;
        }
        contextMenu.append(
            draw_contextMenu_elem({icon:`${swap_up_icon} fs08`,class:`swap_elem_up_btn ${elem_data.elem.sort == 0 ? 'contextMenu_elem_dummy' : ''}`,child1_text:swap_up_text}),
            draw_contextMenu_elem({icon:`${swap_down_icon} fs08`,class:`swap_elem_down_btn ${elem_data.elem.sort == elem_data.section_block.children.length - 1 ? 'contextMenu_elem_dummy' : ''}`,child1_text:swap_down_text}),
        )
    }
    if(accessibility.includes('elem_dublicate')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-copy',class:`dublicate_elem_btn`,child1_text:texts.dublicate})
        )
    }
    if(accessibility.includes('elem_delete')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-delete cR',class:`delete_elem_btn`,child1_class:'cR',child1_text:texts.delete,child2_text:texts.keyboard_shortcuts.delete})
        )
    }
    if(accessibility.includes('section_swap')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-arrowUp fs08',class:`swap_section_up_btn ${elem_data.elem.sort == 0 ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.move_section_up}),
            draw_contextMenu_elem({icon:'ico-arrowDown fs08',class:`swap_section_down_btn ${elem_data.elem.sort == window.template.home.length - 1 ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.move_section_down}),
        )
    }
    if(accessibility.includes('section_dublicate')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-copy',class:`dublicate_section_btn`,child1_text:texts.dublicateSection})
        )
    }
    if(accessibility.includes('section_delete')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-delete cR',class:`delete_section_btn`,child1_class:'cR',child1_text:texts.deleteSection,child2_text:texts.keyboard_shortcuts.delete}),
        )
    }
    contextMenu.append(draw_contextMenu_line())
    //copy,cut,paste
    if(accessibility.includes('copy')){
        let paste_class = 'contextMenu_elem_dummy';
        try{
            if(elem_data.elem.type == 'section'){
                if(window.builder_clipboard.type == 'section'){paste_class = ''}
            }else if(elem_data.elem.type == 'section_block'){
                if(window.builder_clipboard.type == 'section' || window.builder_clipboard.type == 'section_block' || window.builder_clipboard.type == 'elem'){
                    paste_class = '';
                }
            }else if(elem_data.elem.type == 'elem'){
                if(window.builder_clipboard.type == 'section' || window.builder_clipboard.type == 'section_block' || window.builder_clipboard.type == 'elem'){
                    paste_class = '';
                }
            }
        }catch{}
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-cut',class:`cut`,child1_text:texts.cut,child2_text:texts.keyboard_shortcuts.cut,child2_class:'fs07'}),
            draw_contextMenu_elem({icon:'ico-copy',class:`copy`,child1_text:texts.copy,child2_text:texts.keyboard_shortcuts.copy,child2_class:'fs07'}),
            draw_contextMenu_elem({icon:'ico-paste',class:`paste ${paste_class}`,child1_text:texts.paste,child2_text:texts.keyboard_shortcuts.paste,child2_class:'fs07'}),
        )
    }
    contextMenu.append(draw_contextMenu_line())
    //main edits
    if(accessibility.includes('header_settings')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-header',child1_text:texts.header_settings,class:`editor_header_settings`}),
        )
    }
    if(accessibility.includes('button')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-button',class:`editor_button`,child1_text:texts.styling.button})
        )
    }
    if(accessibility.includes('text')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-edit_text',class:`editor_text`,child1_text:texts.styling.text})
        )
    }
    if(accessibility.includes('image')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-image',class:`editor_image`,child1_text:texts.styling.image})
        )
    }
    if(accessibility.includes('icon')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-icon',class:`editor_icon`,child1_text:texts.styling.icon})
        )
    }
    if(accessibility.includes('display')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-display',class:`editor_display`,child1_text:texts.styling.display}),
        )
    }
    if(accessibility.includes('elem_arrange')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-layers fs101',child1_text:texts.arrange,child2_class:'ico-arrowRight',submenu:draw_elem_arrange_contextMenu(elem_data)}),
        )
    }

    if(accessibility.includes('section_rename')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-rename',class:`editor_section_rename`,child1_text:texts.rename,}),
        )
    }
    if(accessibility.includes('section_sizing')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-sizing',class:`editor_section_sizing`,child1_text:texts.sizing,}),
        )
    }
    if(accessibility.includes('section_spacing')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-spacing',class:`editor_section_spacing`,child1_text:texts.spacing,}),
        )
    }
    if(accessibility.includes('section_adapt_header')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-header',class:`editor_section_adapt_header ${elem_data.elem.sort == 0 ? '' : 'contextMenu_elem_dummy'}`,child1_text:texts.styling.adapt_header}),
        )
    }
    if(accessibility.includes('section_layout')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-layout',class:'editor_section_layout',child1_text:texts.change_layout}),
        )
    }
    if(accessibility.includes('section_driver')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-driver',class:'editor_section_driver',child1_text:texts.styling.section_driver}),
        )
    }
    if(accessibility.includes('alignment')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-alignment',class:`editor_alignment`,child1_text:texts.styling.alignment}),
        )
    }
    if(accessibility.includes('block_arrange')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-layers fs101',child1_text:texts.arrange,child2_class:'ico-arrowRight',submenu:draw_section_block_arrange_contextMenu(elem_data)}),
        )
    }
    if(accessibility.includes('styling')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-styling',child1_text:texts._styling,child2_class:'ico-arrowRight',submenu:draw_styling_contextMenu(accessibility)}),
        )
    }
    if(accessibility.includes('sizing')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-sizing',child1_text:texts.sizing,child2_class:'ico-arrowRight',class:elem_data.elem.elem_type == 'icon' ? `contextMenu_elem_dummy` : '',submenu:draw_sizing_contextMenu(accessibility)}),
        )
    }
    if(accessibility.includes('spacing')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-spacing',child1_text:texts.spacing,child2_class:'ico-arrowRight',submenu:draw_spacing_contextMenu(accessibility)}),
        )
    }
    if(accessibility.includes('animation')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-animation',class:`editor_animation`,child1_text:texts.styling.animation }),
        )
    }
    if(accessibility.includes('background')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-background',class:'editor_background',child1_text:texts.styling.background}),
        )
    }
    if(accessibility.includes('block_elems')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-layers',child1_text:texts.styling.elements,class:`${elem_data.elem.children.length == '0' ? 'contextMenu_elem_dummy' : ''}`,child2_class:'ico-arrowRight',submenu:draw_section_block_elements_contextMenu()}),
        )
    }
    if(accessibility.includes('interactions')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-interactions fs101',class:'editor_interactions',child1_text:texts.interactions}),
        )
    }



    //
    let context_children_check = false;
    contextMenu.children().each(function(){
        if($(this).hasClass('contextMenu_line')){
            if(context_children_check == true){
                $(this).remove();
            }else{
                context_children_check = true;
            }
        }else{
            context_children_check = false;
        }
    })
    while(contextMenu.children().first().hasClass('contextMenu_line')){
        contextMenu.children().first().remove();
    }
    while(contextMenu.children().last().hasClass('contextMenu_line')){
        contextMenu.children().last().remove();
    }
    return contextMenu;
}

draw_sizing_contextMenu = function(accessibility){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-width',class:`editor_width ${!accessibility.includes('width') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.width}),
        draw_contextMenu_elem({icon:'ico-height',class:`editor_height ${!accessibility.includes('height') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.height}),
    ) 
}
draw_spacing_contextMenu = function(accessibility){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-padding',class:`editor_padding ${!accessibility.includes('padding') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.padding}),
        draw_contextMenu_elem({icon:'ico-margin',class:`editor_margin ${!accessibility.includes('margin') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.margin}),
    ) 
}
draw_styling_contextMenu = function(accessibility){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-filter',class:`editor_filter ${!accessibility.includes('filter') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.filter}),
        draw_contextMenu_elem({icon:'ico-border',class:`editor_border ${!accessibility.includes('border') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.border}),
        draw_contextMenu_elem({icon:'ico-border_radius',class:`editor_border_radius ${!accessibility.includes('border_radius') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.border_radius}),
        draw_contextMenu_elem({icon:'ico-box_shadow',class:`editor_box_shadow ${!accessibility.includes('box_shadow') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.box_shadow}),
        draw_contextMenu_elem({icon:'ico-transform',class:`editor_transform ${!accessibility.includes('transform') ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.styling.transform}),
    )
}
//
draw_section_block_add_elem_contextMenu = function(accessibility){
    let contextMenu = $('<div/>',{class:'w100p'});
    if(accessibility.includes('add_elem_title')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-title',class:`add_elem`,child1_text:texts.elems.title,attrs:{'elem_type':'title'}}),
        )
    }
    if(accessibility.includes('add_elem_paragraph')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-paragraph',class:`add_elem`,child1_text:texts.elems.paragraph,attrs:{'elem_type':'paragraph'}}),
        )
    }
    if(accessibility.includes('add_elem_image')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-image fs101',class:`add_elem`,child1_text:texts.elems.image,attrs:{'elem_type':'image'}}),
        )
    }
    if(accessibility.includes('add_elem_button')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-button fs101',class:`add_elem`,child1_text:texts.elems.button,attrs:{'elem_type':'button'}}),
        )
    }
    if(accessibility.includes('add_elem_icon')){
        contextMenu.append(
            draw_contextMenu_elem({icon:'ico-icon',class:`add_elem`,child1_text:texts.elems.icon,attrs:{'elem_type':'icon'}}),
        )
    }
    return contextMenu;
}
draw_section_block_arrange_contextMenu = function(elem_data){
    let parent = elem_data.section_wrapper;
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
draw_section_block_elements_contextMenu = function(){
    let container =  $('<div/>',{class:'w100p'})
    let elements = get_elem_data(window.selected).elem.children;
    for(const key in elements){
        container.append(
            draw_contextMenu_elem({icon:`ico-${elements[key].elem_type}`,class:'select',child1_text:texts.elems[elements[key].elem_type],attrs:{key_tree:`${window.selected}.children.${key}`}})
        )
    }
    return container;
}
//
draw_elem_arrange_contextMenu = function(elem_data){
    let parent = elem_data.section_block;
    let bring_to_front_dummy = 'contextMenu_elem_dummy';
    let bring_forward_dummy = 'contextMenu_elem_dummy';
    let send_backward_dummy = 'contextMenu_elem_dummy';
    let send_to_back_dummy = 'contextMenu_elem_dummy';
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem_data.elem.sort)){
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