require('./draw_header.js')

set_editor_popup_editor_position_header = function(){
    $('#editor').css({
        top:($(`.website_header`).offset().top) + ($(`.website_header`).height()) + 20,
        left:($(`.header_wrapper`).width()) + ($('.header_wrapper').offset().left) - $('#editor').width(),
        right:'unset',
        bottom:'unset',
    })
}
//events
$('body').on('dblclick','.website_header',function(e){
    if($('.header_navList:hover').length > 0){return}
    if($('.header_logo:hover').length > 0){return}
    if($('.header_iconsList:hover').length > 0){return}
    if($('.header_mobileNav_icon:hover').length > 0){return}
    draw_editor_popup_header_settings()
})
$('body').on('contextmenu','.website_header',function(e){
    if($('.header_navList:hover').length > 0){return}
    if($('.header_logo:hover').length > 0){return}
    if($('.header_iconsList:hover').length > 0){return}
    if($('.header_mobileNav_icon:hover').length > 0){return}
    show_contextMenu('website_header',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('mousedown','.website_header',function(e){
    if($('.header_navList:hover').length > 0){return}
    if($('.header_logo:hover').length > 0){return}
    if($('.header_iconsList:hover').length > 0){return}
    if($('.header_mobileNav_icon:hover').length > 0){return}
    if($(this).hasClass('selected_header')){return;}
    select($(this).attr('key_tree'));
    $(this).find('.edit_btns').addClass('edit_btns_animation_slide_down')
})
//
$('body').on('dblclick','.header_logo',function(e){
    draw_editor_popup_header_logo_alignment()
})
$('body').on('dblclick','.header_navList ',function(e){
    draw_editor_popup_header_navList()
})
$('body').on('dblclick','.header_iconsList ',function(e){
    draw_editor_popup_header_iconsList()
})
$('body').on('dblclick','.header_mobileNav_icon ',function(e){
    draw_editor_header_mobileNav_icon()
})
$('body').on('contextmenu','.header_component',function(e){
    let key_tree = $(this).attr('key_tree');
    show_contextMenu('header_component',key_tree,{x:e.pageX,y:e.pageY})
})
$('body').on('mousedown','.header_component',function(e){
    select($(this).attr('key_tree'));
})
