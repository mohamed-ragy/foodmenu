set_editor_popup_editor_position_elem = function(key_tree){
    let left = ($(`.elem[key_tree="${key_tree}"]`).offset().left) + 10 + ($(`.elem[key_tree="${key_tree}"]`).width())
    if(($(`.elem[key_tree="${key_tree}"]`).offset().left) + (100) >= ($(window).width() / 2)){
        left = ($(`.elem[key_tree="${key_tree}"]`).offset().left) - 10 - 350;
    }
    $('#editor').css({
        top:($(`.elem[key_tree="${key_tree}"]`).offset().top),
        left:left,
        right:'unset',
        bottom:'unset',
    })
}

//
$('body').on('mousedown','.elem',function(e){
    if($(this).hasClass('edit_elem_selected')){return;}
    select($(this).attr('key_tree'))
})
$('body').on('contextmenu','.elem',function(e){
    if($('[contenteditable="true"]:hover').length > 0){return}
    show_contextMenu('elem',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','.elem',function(e){
    let elem = get_element_data(window.selected);   
    if(elem.accessibility.includes('edit_text')){
        edit_text(window.selected);
    }else if(elem.elem_type == 'image'){
        draw_editor_popup_image()
        // $('.select_image_editor').trigger('click')
    }else if(elem.elem_type == 'button'){
        draw_editor_popup_button();
    }else if(elem.elem_type == 'icon'){
        draw_editor_popup_icon();
    }
})
$('body').on('click','.swap_elem_up_btn',function(){
    hide_editor_popup('editor')
    let elem_from = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    let elem_sort = elem_from.sort
    let elem_to = parent.children.find(item=>item.sort == (elem_sort) - (1));
    elem_from.sort = parseInt(elem_sort) - (1);
    elem_to.sort = elem_sort;
    parent.children.sort((a,b)=>{
        return a.sort - b.sort;
    })
    new_action(get_parent_key_tree(window.selected));
    unselect()
})
$('body').on('click','.swap_elem_down_btn',function(){
    hide_editor_popup('editor')
    let elem_from = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    let elem_sort = elem_from.sort
    let elem_to = parent.children.find(item=>item.sort == (elem_sort) + (1));
    elem_from.sort = parseInt(elem_sort) + (1);
    elem_to.sort = elem_sort;
    parent.children.sort((a,b)=>{
        return a.sort - b.sort;
    })
    new_action(get_parent_key_tree(window.selected));
    unselect()
})
$('body').on('click','.dublicate_elem_btn',function(){
    hide_editor_popup('editor')
    let elem = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    let new_elem = JSON.parse(JSON.stringify(elem));
    reset_class_selectors(new_elem);
    new_elem.sort = parseInt(elem.sort) + (1);
    for(const key in parent.children){
        if(parent.children[key].sort >= new_elem.sort){
            parent.children[key].sort = parseInt(parent.children[key].sort) + (1)
        }
    }
    parent.children.push(new_elem);
    new_action(get_parent_key_tree(window.selected));
    unselect()
})
$('body').on('click','.delete_elem_btn',function(){
    delete_selected();
})

