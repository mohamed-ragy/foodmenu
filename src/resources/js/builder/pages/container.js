set_editor_popup_editor_position_container = function(key_tree){
    let left = ($(`.container[key_tree="${key_tree}"]`).offset().left) + 10 + ($(`.container[key_tree="${key_tree}"]`).width())
    if(($(`.container[key_tree="${key_tree}"]`).offset().left) + (100) >= ($(window).width() / 2)){
        left = ($(`.container[key_tree="${key_tree}"]`).offset().left) - 10 - 350;
    }
    $('#editor').addClass('h600 w350').css({
        top:($(`.container[key_tree="${key_tree}"]`).offset().top),
        left:left,
        right:'unset',
        bottom:'unset',
    })
}
//
$('body').on('mousedown','.container',function(e){
    if($(this).hasClass('edit_container_selected')){return;}
    if($('.elem:hover').length > 0){return}
    select($(this).attr('key_tree'))
    $(this).find('.edit_btns').first().addClass('edit_btns_animation_slide_up')
})
$('body').on('contextmenu','.container',function(e){
    if($('.elem:hover').length > 0){return}
    show_contextMenu('container',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','.container',function(e){
    if($('.elem:hover').length > 0){return}
    draw_editor_popup_section_block_alignment();
})
//swap, dublicate and delete .. using elem events