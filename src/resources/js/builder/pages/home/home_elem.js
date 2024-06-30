draw_home_elem_contextMenu = function(elem_data){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-arrowUp fs08',class:`swap_home_elem_up_btn ${elem_data.elem.sort == 0 ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.swapUp}),
        draw_contextMenu_elem({icon:'ico-arrowDown fs08',class:`swap_home_elem_down_btn ${elem_data.elem.sort == get_home_elem_parent(window.selected).children.length - 1 ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.swapDown}),
        draw_contextMenu_elem({icon:'ico-copy',class:`dublicate_home_elem_btn`,child1_text:texts.dublicate}),
        draw_contextMenu_elem({icon:'ico-delete',class:`delete_home_elem_btn cR`,child1_text:texts.delete}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-cut',class:`cut`,child1_text:texts.cut,child2_text:texts.keyboard_shortcuts.cut,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-copy',class:`copy`,child1_text:texts.copy,child2_text:texts.keyboard_shortcuts.copy,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-paste',class:`paste ${!window.builder_clipboard ? 'contextMenu_elem_dummy' : '  '}`,child1_text:texts.paste,child2_text:texts.keyboard_shortcuts.paste,child2_class:'fs07'}),
        draw_contextMenu_line(),
        elem_data.elem.elem_type == 'title' || elem_data.elem.elem_type == 'paragraph' ? 
        draw_contextMenu_elem({icon:'ico-edit_text',class:`editor_text`,child1_text:texts.styling.text})
        : '',
        draw_contextMenu_elem({icon:'ico-sizing',child1_text:texts.sizing,child2_class:'ico-arrowRight',submenu:draw_home_elem_sizing_contextMenu(elem_data.elem.elem_type)}),
        draw_contextMenu_elem({icon:'ico-spacing',child1_text:texts.spacing,child2_class:'ico-arrowRight',submenu:draw_home_elem_spacing_contextMenu()}),
        draw_contextMenu_elem({icon:'ico-styling',child1_text:texts._styling,child2_class:'ico-arrowRight',submenu:draw_home_elem_styling_contextMenu()}),
        // draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-background',class:'editor_background',child1_text:texts.styling.block_background}),
    )
}
draw_home_elem_sizing_contextMenu = function(elem_type){
    let width_dummy = '';
    let height_dummy = '';
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-width',class:`editor_width ${width_dummy}`,child1_text:texts.styling.width}),
        draw_contextMenu_elem({icon:'ico-height',class:`editor_height ${height_dummy}`,child1_text:texts.styling.height}),
    ) 
}
draw_home_elem_spacing_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-padding',class:`editor_padding`,child1_text:texts.styling.padding}),
        draw_contextMenu_elem({icon:'ico-margin',class:`editor_margin`,child1_text:texts.styling.margin}),
    ) 
}
draw_home_elem_styling_contextMenu = function(){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-filter',class:`editor_filter`,child1_text:texts.styling.filter}),
        draw_contextMenu_elem({icon:'ico-border',class:`editor_border`,child1_text:texts.styling.border}),
        draw_contextMenu_elem({icon:'ico-border_radius',class:`editor_border_radius`,child1_text:texts.styling.border_radius}),
        draw_contextMenu_elem({icon:'ico-box_shadow',class:`editor_box_shadow`,child1_text:texts.styling.box_shadow}),
    )
}
//
draw_editor_popup_editor_shortcuts_home_elem_title = function(){
    $('#editor').find('.editor_popup_body_shortcuts').append(
        
        $('<div/>',{class:`editor_popup_body_shortcut ico-edit_text editor_text`,tooltip:texts.styling.text}),

        $('<div/>',{class:`editor_popup_body_shortcut ico-width editor_width`,tooltip:texts.styling.width}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-height editor_height`,tooltip:texts.styling.height}),

        $('<div/>',{class:`editor_popup_body_shortcut ico-padding editor_padding`,tooltip:texts.styling.padding}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-margin editor_margin`,tooltip:texts.styling.margin}),

        $('<div/>',{class:`editor_popup_body_shortcut ico-filter editor_filter`,tooltip:texts.styling.filter}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-border editor_border`,tooltip:texts.styling.border}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-border_radius editor_border_radius`,tooltip:texts.styling.border_radius}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-box_shadow editor_box_shadow`,tooltip:texts.styling.box_shadow}),

        $('<div/>',{class:`editor_popup_body_shortcut ico-background editor_background`,tooltip:texts.styling.background}),

    )
}
set_editor_popup_editor_position_home_elem = function(key_tree){
    console.log(key_tree)
    let left = ($(`.home_elem[key_tree="${key_tree}"]`).offset().left) + 10 + ($(`.home_elem[key_tree="${key_tree}"]`).width())
    if(($(`.home_elem[key_tree="${key_tree}"]`).offset().left) + (100) >= ($(window).width() / 2)){
        left = ($(`.home_elem[key_tree="${key_tree}"]`).offset().left) - 10 - 350;
    }
    $('#editor').addClass('h600 w350').css({
        top:($(`.home_elem[key_tree="${key_tree}"]`).offset().top),
        left:left,
        right:'unset',
        bottom:'unset',
    })
}

//
$('body').on('contextmenu','.home_elem',function(e){
    show_contextMenu('home_elem',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','.home_elem',function(e){
    let elem_data = get_elem_data(window.selected);
    // if(elem_data.elem.elem_type == 'text' || elem_data.elem.elem_type == 'paragraph'){
    //     draw_editor_popup_text();
    // }
    // draw_editor_popup_width();
})
$('body').on('click','.swap_home_elem_up_btn',function(){
    hide_editor_popup('editor')
    let parent = get_home_elem_parent(window.selected);
    let elem_from = get_elem_data(window.selected).elem;
    let elem_sort = elem_from.sort
    let elem_to = parent.children.find(item=>item.sort == (elem_sort) - (1));
    elem_from.sort = parseInt(elem_sort) - (1);
    elem_to.sort = elem_sort;
    parent.children.sort((a,b)=>{
        return a.sort - b.sort;
    })
    window.selected = undefined;
    new_action();
})
$('body').on('click','.swap_home_elem_down_btn',function(){
    hide_editor_popup('editor')
    let parent = get_home_elem_parent(window.selected);
    let elem_from = get_elem_data(window.selected).elem;
    let elem_sort = elem_from.sort
    let elem_to = parent.children.find(item=>item.sort == (elem_sort) + (1));
    elem_from.sort = parseInt(elem_sort) + (1);
    elem_to.sort = elem_sort;
    parent.children.sort((a,b)=>{
        return a.sort - b.sort;
    })
    window.selected = undefined;
    new_action();
})
$('body').on('click','.dublicate_home_elem_btn',function(){
    hide_editor_popup('editor')
    let elem = get_elem_data(window.selected).elem;
    let new_elem = JSON.parse(JSON.stringify(elem));
    reset_class_selectors(new_elem);
    new_elem.sort = parseInt(elem.sort) + (1); 
    let parent = get_home_elem_parent(window.selected);
    for(const key in parent.children){
        if(parent.children[key].sort >= new_elem.sort){
            parent.children[key].sort = parseInt(parent.children[key].sort) + (1)
        }
    }
    parent.children.push(new_elem);
    window.selected = undefined;
    new_action();
})
$('body').on('click','.delete_home_elem_btn',function(){
    hide_editor_popup('editor')
    let this_elem_sort = get_elem_data(window.selected).elem.sort;
    let new_children = [];
    let parent = get_home_elem_parent(window.selected);
    for(const key in parent.children){
        if(parent.children[key].sort != this_elem_sort){
            new_children.push(parent.children[key]);
        }
    }
    for(const key in new_children){
        new_children[key].sort = key;
    }
    parent.children = new_children;
    window.selected = undefined;
    new_action();
})
$('body').on('dblclick','.home_elem',function(e){
    draw_editor_popup_text();
})