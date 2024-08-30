show_popup_window = function(callback=()=>{}){
    window.website_popup_opened = true;
    $('#website').find('.popup_container').remove();
    $('#website').prepend(generate_html(window.template.popup_window,'popup_window'))
    $('#website').css('overflow-y','hidden').scrollTop(0)
    $('.popup_container').removeClass('none')
    callback();
    $('.popup_container').find('.popup_card').addClass(window.template.popup_window.transition)
    console.log('popup rendered')
}
hide_popup_window = function(){
    window.website_popup_opened = false;
    window.selected_popup = 'popup_window';
    $('#website').find('.popup_container').remove();
    $('#website').css('overflow-y','auto')
    $('.showWebsitePages').find('.website_page_name').text(texts.website_pages[window.selected_page])
}
set_editor_popup_editor_position_popup = function(){
    $('#editor').addClass('h600 w350').css({
        top:($('#website').find(`.popup_card`).offset().top) - 100,
        left:($(`#website`).find('.popup_card').width()) + ($(`#website`).find('.popup_card').offset().left) + 100,
        right:'unset',
        bottom:'unset',
    })
}
//events
$('body').on('click','.popup_card',function(){
    if($('.popup_close:hover').length > 0){return;}
    if($('.container:hover').length > 0){return;}
    if($(this).hasClass('popup_window_selected')){return;}
    select('popup_window.children.popup_card');
    $(this).find('.edit_btns').addClass('edit_btns_animation_slide_right')
})
$('body').on('dblclick','.popup_card',function(){
    if($('.popup_close:hover').length > 0){return;}
    if($('.container:hover').length > 0){return;}
    draw_editor_popup_popup_widnow();
})
$('body').on('contextmenu','.popup_card',function(e){
    if($('.popup_close:hover').length > 0){return;}
    if($('.container:hover').length > 0){return;}
    show_contextMenu('popup_card',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
//
$('body').on('mouseup','.popup_close',function(e){
    window.selected = null;
    hide_popup_window();
    hide_editor_popup('editor')
})



