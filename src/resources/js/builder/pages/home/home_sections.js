draw_home_section_contextMenu = function(elem_data){
    return $('<div/>',{class:'w100p'}).append(
        draw_contextMenu_elem({icon:'ico-arrowUp fs08',class:`swap_home_section_up_btn ${elem_data.elem.sort == 0 ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.move_section_up}),
        draw_contextMenu_elem({icon:'ico-arrowDown fs08',class:`swap_home_section_down_btn ${elem_data.elem.sort == window.template.home.length - 1 ? 'contextMenu_elem_dummy' : ''}`,child1_text:texts.move_section_down}),
        draw_contextMenu_elem({icon:'ico-copy',class:`dublicate_home_section_btn`,child1_text:texts.dublicateSection}),
        draw_contextMenu_elem({icon:'ico-delete',class:`delete_home_section_btn cR`,child1_text:texts.deleteSection}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-cut',class:`cut`,child1_text:texts.cut,child2_text:texts.keyboard_shortcuts.cut,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-copy',class:`copy`,child1_text:texts.copy,child2_text:texts.keyboard_shortcuts.copy,child2_class:'fs07'}),
        draw_contextMenu_elem({icon:'ico-paste',class:`paste ${!window.builder_clipboard ? 'contextMenu_elem_dummy' : '  '}`,child1_text:texts.paste,child2_text:texts.keyboard_shortcuts.paste,child2_class:'fs07'}),
        draw_contextMenu_line(),
        draw_contextMenu_elem({icon:'ico-rename',class:`editor_section_rename`,child1_text:texts.rename,}),
        draw_contextMenu_elem({icon:'ico-sizing',class:`editor_section_sizing`,child1_text:texts.sizing,}),
        draw_contextMenu_elem({icon:'ico-spacing',class:`editor_section_spacing`,child1_text:texts.spacing,}),
        draw_contextMenu_elem({icon:'ico-header',class:`editor_section_adapt_header ${elem_data.elem.sort == 0 ? '' : 'contextMenu_elem_dummy'}`,child1_text:texts.styling.adapt_header}),
        draw_contextMenu_elem({icon:'ico-background',class:'editor_background',child1_text:texts.styling.section_background}),
        draw_contextMenu_elem({icon:'ico-layout',class:'editor_section_layout',child1_text:texts.change_layout}),
        draw_contextMenu_elem({icon:'ico-driver',class:'editor_section_driver',child1_text:texts.styling.section_driver}),
    )
}

draw_editor_popup_editor_shortcuts_home_section = function(elem_data){
    $('#editor').find('.editor_popup_body_shortcuts').append(
        $('<div/>',{class:`editor_popup_body_shortcut ico-rename editor_section_rename`,tooltip:texts.rename}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-sizing editor_section_sizing`,tooltip:texts.sizing}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-spacing editor_section_spacing`,tooltip:texts.spacing}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-header editor_section_adapt_header ${elem_data.elem.sort == 0 ? '' : 'none'}`,tooltip:texts.styling.adapt_header}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-background editor_background`,tooltip:texts.styling.section_background}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-layout editor_section_layout`,tooltip:texts.change_layout}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-driver editor_section_driver`,tooltip:texts.styling.section_driver}),
    )
}
set_editor_popup_editor_position_home_section = function(key_tree){
    $('#editor').addClass('h600 w350').css({
        top:($(`section[key_tree="${key_tree}"]`).offset().top) + 20,
        left:($(`section[key_tree="${key_tree}"]`).offset().left) + 20,
        right:'unset',
        bottom:'unset',
    })
}

set_adapted_header = function(){
    if(typeof(window.template.home[0]) === 'undefined'){return;}
    if(window.template.home[0].adapt_header == '1' && $('#website').scrollTop() == 0){
        $('.website_header').addClass('adapted_header')
        $('section').first().find('.select_section_title').css('top',$('.website_header').outerHeight())
    }else{
        $('.website_header').removeClass('adapted_header')

    }
}

//events
$('body').on('contextmenu','section',function(e){
    if($('.section_block:hover').length > 0){return}
    show_contextMenu('home_section',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','section',function(e){
    if($('.section_block:hover').length > 0){return}
    draw_editor_popup_section_rename();
})
$('body').on('mouseup touchend','section',function(e){
    if($('.section_block:hover').length > 0){return}
    select($(this).attr('key_tree'));
})
$('body').on('click','.swap_home_section_down_btn',function(e){
    hide_editor_popup('editor')
    let section_from = get_elem_data(window.selected).elem;
    let section_sort = section_from.sort
    let section_to = window.template.home.find(item=> item.sort == (section_sort) + (1));
    section_from.sort = (section_sort) + (1);
    section_to.sort = section_sort;
    $(`section[key_tree="home.${section_sort}"]`).css({
        'transform':`translateY(${$(`section[key_tree="home.${(section_sort) + (1)}"]`).height()}px)`,
    })
    $(`section[key_tree="home.${(section_sort) + (1)}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="home.${section_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        window.selected = undefined;
        new_action();
    },200)

})
$('body').on('click','.swap_home_section_up_btn',function(e){
    hide_editor_popup('editor')
    let section_from = get_elem_data(window.selected).elem;
    let section_sort = section_from.sort
    let section_to = window.template.home.find(item=> item.sort == (section_sort) - (1));
    section_from.sort = (section_sort) - (1);
    section_to.sort = section_sort;
    $(`section[key_tree="home.${section_sort}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="home.${(section_sort) - (1)}"]`).height()}px)`,
    })
    $(`section[key_tree="home.${(section_sort) - (1)}"]`).css({
        'transform':`translateY(${$(`section[key_tree="home.${section_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        window.selected = undefined;
        new_action();
    },200)
})

$('body').on('click','.dublicate_home_section_btn',function(e){
    hide_editor_popup('editor')
    let section = get_elem_data(window.selected).elem;
    let new_section = JSON.parse(JSON.stringify(section));
    $(`section[key_tree="home.${$(this).attr('section')}"]`).css({
        'margin-bottom': `${ $(`section[key_tree="home.${$(this).attr('section')}"]`).height()}px`
    })
    setTimeout(()=>{
        for(const key in window.template.home){
            if(window.template.home[key].sort > new_section.sort ){
                window.template.home[key].sort = parseInt(window.template.home[key].sort) + 1
            }
        }
        new_section.sort = parseInt(new_section.sort) + 1
        new_section.name = texts.copy_untitled_section.replace(':name:',new_section.name)
        reset_class_selectors(new_section)
        window.template.home.push((new_section));
        window.template.home.sort((a,b)=>{
            return a.sort - b.sort;
        })
        new_action();
        $('#website').animate({scrollTop:$(`section[key_tree="home.${new_section.sort}"]`).position().top - 50},300)
    },200)

});
$('body').on('click','.delete_home_section_btn',function(e){
    hide_editor_popup('editor')
    let section = get_elem_data(window.selected).elem;
    window.template.home.splice(section.sort,1)
    window.selected = undefined;
    for(const key in window.template.home){
        window.template.home[key].sort = parseInt(key);
    }
    new_action();
})

//
$('body').on('click','.elem_text_selector_editor a',function(e){
    e.stopImmediatePropagation();
})
$('body').on('click','.scroll_to_section',function(e){
    // e.stopImmediatePropagation();
    e.preventDefault();
    $('#website').animate({
        scrollTop:$(`.${$(this).attr('section')}`).position().top,
    },500)
})

