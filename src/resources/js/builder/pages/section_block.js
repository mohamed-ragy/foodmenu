set_editor_popup_editor_position_section_block = function(key_tree){
    let left = ($(`.section_block[key_tree="${key_tree}"]`).offset().left) + 10 + ($(`.section_block[key_tree="${key_tree}"]`).width())
    if(($(`.section_block[key_tree="${key_tree}"]`).offset().left) + (100) >= ($(window).width() / 2)){
        left = ($(`.section_block[key_tree="${key_tree}"]`).offset().left) - 10 - 350;
    }
    $('#editor').css({
        top:($(`.section_block[key_tree="${key_tree}"]`).offset().top),
        left:left,
        right:'unset',
        bottom:'unset',
    })
}
$('body').on('contextmenu','.section_block',function(e){
    if($('.elem:hover').length > 0){return}
    if($('.container:hover').length > 0){return}
    show_contextMenu('section_block',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','.section_block',function(e){
    if($('.elem:hover').length > 0){return}
    if($('.container:hover').length > 0){return}
    draw_editor_popup_section_block_alignment();
})
$('body').on('mousedown','.section_block',function(e){
    if($('.elem:hover').length > 0){return}
    if($('.container:hover').length > 0){return}
    if($(this).hasClass('section_block_selected')){return;}
    select($(this).attr('key_tree'));
    $(this).find('.edit_btns').first().addClass('edit_btns_animation_slide_up')
})