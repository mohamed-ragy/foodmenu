
set_editor_popup_editor_position_section = function(key_tree){
    $('#editor').addClass('h600 w350').css({
        top:($(`section[key_tree="${key_tree}"]`).offset().top) + 20,
        left:($(`section[key_tree="${key_tree}"]`).offset().left) + 20,
        right:'unset',
        bottom:'unset',
    })
}
//
$('body').on('dblclick','section',function(e){
    if($('.section_block:hover').length > 0){return}
    draw_editor_popup_section_rename();
})
$('body').on('contextmenu','section',function(e){
    if($(this).find('.section_block:hover').length > 0){return}
    show_contextMenu('section',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('click','.section',function(e){
    if($('.section_block:hover').length > 0){return}
    select($(this).attr('key_tree'));
})
//
$('body').on('click','.swap_section_down_btn',function(e){
    hide_editor_popup('editor')
    if(!accessibility_check(window.selected,'section_swap')){return;}
    let section_from = get_elem_data(window.selected).elem;
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
        window.selected = undefined;
        new_action();
    },200)
})
$('body').on('click','.swap_section_up_btn',function(e){
    hide_editor_popup('editor')
    if(!accessibility_check(window.selected,'section_swap')){return;}
    let section_from = get_elem_data(window.selected).elem;
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
        window.selected = undefined;
        new_action();
    },200)
})
//
$('body').on('click','.dublicate_section_btn',function(e){
    hide_editor_popup('editor')
    if(!accessibility_check(window.selected,'section_dublicate')){return;}
    let section = get_elem_data(window.selected).elem;
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
        new_action();
        console.log($(`section[key_tree="${window.selected_page}.${new_section.sort}"]`).position().top)
        $('#website').animate({scrollTop:$(`section[key_tree="${window.selected_page}.${new_section.sort}"]`).position().top - 50},300)
    },200)

});
//
$('body').on('click','.delete_section_btn',function(e){
    delete_selected();
})