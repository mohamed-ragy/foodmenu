set_editor_popup_editor_position_elem = function(key_tree){
    let left = ($(`.elem[key_tree="${key_tree}"]`).offset().left) + 10 + ($(`.elem[key_tree="${key_tree}"]`).width())
    if(($(`.elem[key_tree="${key_tree}"]`).offset().left) + (100) >= ($(window).width() / 2)){
        left = ($(`.elem[key_tree="${key_tree}"]`).offset().left) - 10 - 350;
    }
    $('#editor').addClass('h600 w350').css({
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
$('body').on('contextmenu','.elem.edit',function(e){
    if($(this).attr('contenteditable') != 'true'){
        show_contextMenu('elem',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
    }
})
$('body').on('dblclick','.elem',function(e){
    let elem_data = get_elem_data(window.selected);
    if(elem_data.elem.accessibility.includes('edit_text')){
        if($(this).find('.edit').attr('contenteditable') == 'false'){
            $(this).find('.edit').attr('contenteditable',true);
            setTimeout(()=>{
                let selection = window.getSelection();
                let range = document.createRange();
                range.selectNodeContents($(this).find('.format_container')[0]);
                selection.removeAllRanges();
                selection.addRange(range);
                show_text_format_popup()
            })
        }

    }else if(elem_data.elem.elem_type == 'image'){
        draw_editor_popup_image()
        // $('.select_image_editor').trigger('click')
    }else if(elem_data.elem.elem_type == 'button'){
        draw_editor_popup_button();
    }else if(elem_data.elem.elem_type == 'icon'){
        draw_editor_popup_icon();
    }
})
$('body').on('click','.swap_elem_up_btn',function(){
    hide_editor_popup('editor')
    let elem_data = get_elem_data(window.selected);
    let parent = elem_data.section_block;
    let elem_from = elem_data.elem;
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
$('body').on('click','.swap_elem_down_btn',function(){
    hide_editor_popup('editor')
    let elem_data = get_elem_data(window.selected);
    let parent = elem_data.section_block;
    let elem_from = elem_data.elem;
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
$('body').on('click','.dublicate_elem_btn',function(){
    hide_editor_popup('editor')
    let elem_data = get_elem_data(window.selected);
    let elem = elem_data.elem;
    let parent = elem_data.section_block;
    let new_elem = JSON.parse(JSON.stringify(elem));
    reset_class_selectors(new_elem);
    new_elem.sort = parseInt(elem.sort) + (1);
    for(const key in parent.children){
        if(parent.children[key].sort >= new_elem.sort){
            parent.children[key].sort = parseInt(parent.children[key].sort) + (1)
        }
    }
    parent.children.push(new_elem);
    window.selected = undefined;
    new_action();
})
$('body').on('click','.delete_elem_btn',function(){
    delete_selected();
})

