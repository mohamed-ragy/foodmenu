draw_home_elem_contextMenu = function(elem_data){
    let section_block = get_home_elem_parent(window.selected);
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

    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:`${swap_up_icon} fs08`,class:`swap_home_elem_up_btn ${elem_data.elem.sort == 0 ? 'contextMenu_elem_dummy' : ''}`,child1_text:swap_up_text}),
        draw_contextMenu_elem({icon:`${swap_down_icon} fs08`,class:`swap_home_elem_down_btn ${elem_data.elem.sort == get_home_elem_parent(window.selected).children.length - 1 ? 'contextMenu_elem_dummy' : ''}`,child1_text:swap_down_text}),
        draw_contextMenu_elem({icon:'ico-copy',class:`dublicate_home_elem_btn`,child1_text:texts.dublicate}),
        draw_contextMenu_elem({icon:'ico-delete',class:`delete_home_elem_btn cR`,child1_text:texts.delete}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-cut',class:`cut`,child1_text:texts.cut,child2_text:texts.keyboard_shortcuts.cut,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-copy',class:`copy`,child1_text:texts.copy,child2_text:texts.keyboard_shortcuts.copy,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-paste',class:`paste ${!window.builder_clipboard ? 'contextMenu_elem_dummy' : '  '}`,child1_text:texts.paste,child2_text:texts.keyboard_shortcuts.paste,child2_class:'fs07'}),
        draw_contextMenu_line(),
        elem_data.elem.elem_type == 'button' ?  
        draw_contextMenu_elem({icon:'ico-button',class:`editor_button`,child1_text:texts.styling.button})
        : '',
        elem_data.elem.elem_type == 'title' || elem_data.elem.elem_type == 'paragraph' || elem_data.elem.elem_type == 'button' ? 
        draw_contextMenu_elem({icon:'ico-edit_text',class:`editor_text`,child1_text:texts.styling.text})
        : '',
        elem_data.elem.elem_type == 'image' ? 
        draw_contextMenu_elem({icon:'ico-image',class:`editor_image`,child1_text:texts.styling.image})
        :'',
        draw_contextMenu_elem({icon:'ico-display',class:`editor_display`,child1_text:texts.styling.display}),
        draw_contextMenu_elem({icon:'ico-layers fs101',child1_text:texts.arrange,child2_class:'ico-arrowRight',submenu:draw_home_elem_arrange_contextMenu(elem_data)}),
        draw_contextMenu_elem({icon:'ico-sizing',child1_text:texts.sizing,child2_class:'ico-arrowRight',submenu:draw_home_elem_sizing_contextMenu(elem_data.elem.elem_type)}),
        draw_contextMenu_elem({icon:'ico-spacing',child1_text:texts.spacing,child2_class:'ico-arrowRight',submenu:draw_home_elem_spacing_contextMenu()}),
        draw_contextMenu_elem({icon:'ico-styling',child1_text:texts._styling,child2_class:'ico-arrowRight',submenu:draw_home_elem_styling_contextMenu(elem_data.elem.elem_type)}),
        // draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-animation',class:`editor_animation`,child1_text:texts.styling.animation }),
        elem_data.elem.elem_type != 'image' && elem_data.elem.elem_type != 'button'?
        draw_contextMenu_elem({icon:'ico-background',class:'editor_background',child1_text:texts.styling.block_background})
        : '',
    )
}
draw_home_elem_arrange_contextMenu = function(elem_data){
    let parent = get_home_elem_parent(window.selected);
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
        draw_contextMenu_elem({icon:'ico-bring_to_front',class:`editor_home_elem_bring_to_front ${bring_to_front_dummy}`,child1_text:texts.bring_to_front,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.bring_to_front}),
        draw_contextMenu_elem({icon:'ico-bring_forward',class:`editor_home_elem_bring_forward ${bring_forward_dummy}`,child1_text:texts.bring_forward,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.bring_forward}),
        draw_contextMenu_elem({icon:'ico-send_backward',class:`editor_home_elem_send_backward ${send_backward_dummy}`,child1_text:texts.send_backward,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.send_backward}),
        draw_contextMenu_elem({icon:'ico-send_to_back',class:`editor_home_elem_send_to_back ${send_to_back_dummy}`,child1_text:texts.send_to_back,child2_class:'mis-40',child2_text:texts.keyboard_shortcuts.send_to_back}),
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
draw_home_elem_styling_contextMenu = function(elem_type){
    let button_dummy_class = '';
    if(elem_type == 'button'){button_dummy_class = 'contextMenu_elem_dummy'}
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-filter',class:`${button_dummy_class} editor_filter`,child1_text:texts.styling.filter}),
        draw_contextMenu_elem({icon:'ico-border',class:`${button_dummy_class} editor_border`,child1_text:texts.styling.border}),
        draw_contextMenu_elem({icon:'ico-border_radius',class:`${button_dummy_class} editor_border_radius`,child1_text:texts.styling.border_radius}),
        draw_contextMenu_elem({icon:'ico-box_shadow',class:`${button_dummy_class} editor_box_shadow`,child1_text:texts.styling.box_shadow}),
        draw_contextMenu_elem({icon:'ico-transform',class:`editor_transform`,child1_text:texts.styling.transform}),
    )
}
//
draw_editor_popup_editor_shortcuts_home_elem = function(elem_data){
    $('#editor').find('.editor_popup_body_shortcuts').append(
        elem_data.elem.elem_type == 'button' ? 
        $('<div/>',{class:`editor_popup_body_shortcut ico-button editor_button`,tooltip:texts.styling.button})
        :'',
        elem_data.elem.elem_type == 'title' || elem_data.elem.elem_type == 'paragraph' || elem_data.elem.elem_type == 'button' ? 
        $('<div/>',{class:`editor_popup_body_shortcut ico-edit_text editor_text`,tooltip:texts.styling.text})
        : '',
        
        elem_data.elem.elem_type == 'image' ? 
        $('<div/>',{class:`editor_popup_body_shortcut ico-image editor_image`,tooltip:texts.styling.image})
        :'',
        
        $('<div/>',{class:`editor_popup_body_shortcut ico-display editor_display`,tooltip:texts.styling.display}),

        $('<div/>',{class:`editor_popup_body_shortcut ico-width editor_width`,tooltip:texts.styling.width}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-height editor_height`,tooltip:texts.styling.height}),

        $('<div/>',{class:`editor_popup_body_shortcut ico-padding editor_padding`,tooltip:texts.styling.padding}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-margin editor_margin`,tooltip:texts.styling.margin}),

        elem_data.elem.elem_type != 'button' ? $('<div/>',{class:`editor_popup_body_shortcut ico-filter editor_filter`,tooltip:texts.styling.filter}) : '',
        elem_data.elem.elem_type != 'button' ? $('<div/>',{class:`editor_popup_body_shortcut ico-border editor_border`,tooltip:texts.styling.border}) : '',
        elem_data.elem.elem_type != 'button' ? $('<div/>',{class:`editor_popup_body_shortcut ico-border_radius editor_border_radius`,tooltip:texts.styling.border_radius}) : '',
        elem_data.elem.elem_type != 'button' ? $('<div/>',{class:`editor_popup_body_shortcut ico-box_shadow editor_box_shadow`,tooltip:texts.styling.box_shadow}) : '',
        $('<div/>',{class:`editor_popup_body_shortcut ico-transform editor_transform`,tooltip:texts.styling.transform}),

        $('<div/>',{class:`editor_popup_body_shortcut ico-animation editor_animation`,tooltip:texts.styling.animation}),

        elem_data.elem.elem_type != 'image' && elem_data.elem.elem_type != 'button'?
        $('<div/>',{class:`editor_popup_body_shortcut ico-background editor_background`,tooltip:texts.styling.background})
        :'',
    )
}
set_editor_popup_editor_position_home_elem = function(key_tree){
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
$('body').on('mouseup touchend','.home_elem',function(e){
    if($(this).hasClass('editing_edit_home_elem_editing')){return;}
    select($(this).attr('key_tree'))
})
$('body').on('contextmenu','.home_elem',function(e){
    show_contextMenu('home_elem',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','.home_elem',function(e){
    let elem_data = get_elem_data(window.selected);
    if(elem_data.elem.elem_type == 'title' || elem_data.elem.elem_type == 'paragraph'){
        draw_editor_popup_text();
    }else if(elem_data.elem.elem_type == 'image'){
        draw_editor_popup_image()
    }else if(elem_data.elem.elem_type == 'button'){
        draw_editor_popup_button();
    }
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
// $('body').on('dblclick','.home_elem',function(e){
//     draw_editor_popup_text();
// })

editor_home_elem_bring_to_front = function(){
    let elem = get_elem_data(window.selected).elem;
    let parent = get_home_elem_parent(window.selected);
    let new_zindex = elem.css['z-index'];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) >= parseInt(new_zindex)){
                new_zindex = parseInt(child.css['z-index']) + 1;
            }
        }
    }
    elem.css['z-index'] = new_zindex;
    new_action();
}
$('body').on('click','.editor_home_elem_bring_to_front',function(){
    editor_home_elem_bring_to_front()

})
//
editor_home_elem_bring_forward = function(){
    let elem = get_elem_data(window.selected).elem;
    let parent = get_home_elem_parent(window.selected);
    let zindex_arr = [];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) >= parseInt(elem.css['z-index'])){
                zindex_arr.push(parseInt(child.css['z-index']))
            }
        }
    }
    let new_zindex = elem.css['z-index'];
    if(zindex_arr.length > 0){
        new_zindex = Math.min(...zindex_arr) +1;
    }
    elem.css['z-index'] = new_zindex;
    new_action();
}
$('body').on('click','.editor_home_elem_bring_forward',function(){
    editor_home_elem_bring_forward();
})
//
editor_home_elem_send_to_back = function(){
    let elem = get_elem_data(window.selected).elem;
    let parent = get_home_elem_parent(window.selected);
    let new_zindex = elem.css['z-index'];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) <= parseInt(new_zindex)){
                if(child.css['z-index'] == 1){
                    child.css['z-index'] = 2;
                    new_zindex = 1;
                }else{
                    new_zindex = parseInt(child.css['z-index']) - 1;
                }
            }
        }
    }
    elem.css['z-index'] = new_zindex;
    new_action();
}
$('body').on('click','.editor_home_elem_send_to_back',function(){
    editor_home_elem_send_to_back();
})
//
editor_home_elem_send_backward = function(){
    let elem = get_elem_data(window.selected).elem;
    let parent = get_home_elem_parent(window.selected);
    let zindex_arr = [];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) <= parseInt(elem.css['z-index'])){
                zindex_arr.push(parseInt(child.css['z-index']))
            }
        }
    }
    let new_zindex = elem.css['z-index'];
    if(zindex_arr.length > 0){
        new_zindex = Math.min(...zindex_arr) -1;
    }
    if(new_zindex >= 0){
        new_zindex = 1;
    }
    elem.css['z-index'] = new_zindex;
    new_action();
}
$('body').on('click','.editor_home_elem_send_backward',function(){
    editor_home_elem_send_backward();
})
// 