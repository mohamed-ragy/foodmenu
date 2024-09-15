
set_editor_popup_editor_position_section = function(key_tree){
    $('#editor').css({
        top:($(`section[key_tree="${key_tree}"]`).offset().top) + 20,
        left:($(`section[key_tree="${key_tree}"]`).offset().left) + 20,
        right:'unset',
        bottom:'unset',
    })
}
//
$('body').on('dblclick','section',function(e){
    if($('.section_block:hover').length > 0){return}
    draw_editor_popup_rename();
})
$('body').on('contextmenu','section',function(e){
    if($(this).find('.section_block:hover').length > 0){return}
    show_contextMenu('section',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('mousedown','.section',function(e){
    if($('.section_block:hover').length > 0){return}
    if($(this).hasClass('section_selected')){return;}
    select($(this).attr('key_tree'));
    $(this).find('.edit_btns').first().addClass('edit_btns_animation_slide_right')
})
//
$('body').on('click','.swap_section_down_btn',function(e){
    hide_editor_popup('editor')
    if(!accessibility_check(window.selected,'section_swap')){return;}
    let section_from = get_element_data(window.selected);
    let section_sort = section_from.sort
    let section_to = window.template[window.selected_page].find(item=> item.sort == (section_sort) + (1));
    section_from.sort = (section_sort) + (1);
    section_to.sort = section_sort;
    $(`section[key_tree="${window.selected_page}.${section_sort}"]`).css({
        'transform':`translateY(${$(`section[key_tree="${window.selected_page}.${(section_sort) + (1)}"]`).height()}px)`,
    })
    $(`section[key_tree="${window.selected_page}.${(section_sort) + (1)}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="${window.selected_page}.${section_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        new_action('page');
        unselect()
    },200)
})
$('body').on('click','.swap_section_up_btn',function(e){
    hide_editor_popup('editor')
    if(!accessibility_check(window.selected,'section_swap')){return;}
    let section_from = get_element_data(window.selected);
    let section_sort = section_from.sort
    let section_to = window.template[window.selected_page].find(item=> item.sort == (section_sort) - (1));
    section_from.sort = (section_sort) - (1);
    section_to.sort = section_sort;
    $(`section[key_tree="${window.selected_page}.${section_sort}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="${window.selected_page}.${(section_sort) - (1)}"]`).height()}px)`,
    })
    $(`section[key_tree="${window.selected_page}.${(section_sort) - (1)}"]`).css({
        'transform':`translateY(${$(`section[key_tree="${window.selected_page}.${section_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        new_action('page');
        unselect()
    },200)
})
//
$('body').on('click','.dublicate_section_btn',function(e){
    hide_editor_popup('editor')
    if(!accessibility_check(window.selected,'section_dublicate')){return;}
    let section = get_element_data(window.selected);
    let new_section = JSON.parse(JSON.stringify(section));
    $(`section[key_tree="${window.selected_page}.${$(this).attr('section')}"]`).css({
        'margin-bottom': `${ $(`section[key_tree="${window.selected_page}.${$(this).attr('section')}"]`).height()}px`
    })
    setTimeout(()=>{
        for(const key in window.template[window.selected_page]){
            if(window.template[window.selected_page][key].sort > new_section.sort ){
                window.template[window.selected_page][key].sort = parseInt(window.template[window.selected_page][key].sort) + 1
            }
        }
        new_section.sort = parseInt(new_section.sort) + 1
        new_section.name = texts.copy_untitled_section.replace(':name:',new_section.name)
        reset_class_selectors(new_section)
        window.template[window.selected_page].push((new_section));
        window.template[window.selected_page].sort((a,b)=>{
            return a.sort - b.sort;
        })
        new_action('page');
        unselect()
        $('#website').animate({scrollTop:$(`section[key_tree="${window.selected_page}.${new_section.sort}"]`).position().top - 50},300)
    },200)

});
//
$('body').on('click','.delete_section_btn',function(e){
    delete_selected();
})