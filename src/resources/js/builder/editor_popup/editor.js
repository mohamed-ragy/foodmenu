require('./editor/general.js');
require('./editor/section.js');
require('./editor/section_block.js');

set_editor_popup_editor = function(){
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let elem_data = get_elem_data(window.selected);
    $("#editor").css({
        top:'unset',
        bottom:'unset',
        left:'unset',
        right:'unset',
    })
    $('#editor').find('.editor_popup_head_btn').addClass('none');
    $('#editor').find('.editor_popup_title').text('')
    $('#editor').find('.editor_popup_body_shortcuts').text('')
    switch(elem_data.elem.type){
        case 'home_section':
            $('#editor').find('.editor_popup_title').text(elem_data.elem.name)
            set_editor_popup_editor_position_home_section(window.selected);
            draw_editor_popup_editor_shortcuts_home_section(elem_data);
        break;
        case 'home_section_block':
            $('#editor').find('.editor_popup_title').text(texts.section_block)
            set_editor_popup_editor_position_home_section_block(window.selected);
            draw_editor_popup_editor_shortcuts_home_section_block(elem_data);
        break;
        case 'home_elem':
            // if(elem_data.elem.elem_type == 'title' || elem_data.elem.elem_type == 'paragraph'){
                $('#editor').find('.editor_popup_title').text(texts.elems[elem_data.elem.elem_type])
                draw_editor_popup_editor_shortcuts_home_elem(elem_data);
            // }
            set_editor_popup_editor_position_home_elem(window.selected);
        break;
    }
    fix_editor_popup_position($('#editor'))
}

$('body').on('click','.editor_popup_body_shortcut',function(e){
    // undo_redo_actions(true,false);
    $('#editor').find('.editor_popup_body_wrapper').scrollTop(0)
    $('#editor').find('.editor_popup_head_btn').addClass('none');
    stop_preview_animations();
    if($(this).hasClass('editor_animation')){
        play_preview_animations();
    }
})
