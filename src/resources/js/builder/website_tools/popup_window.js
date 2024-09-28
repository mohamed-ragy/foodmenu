render_website_popup = function(){
    $('#website').find('.popup_container').remove();
    $('#website').prepend(generate_html(window.template.popup_window,'popup_window'))
    if(window.template.settings.website_popup_opened == '1'){
        open_website_popup(window.template.settings.selected_popup)
    }
    console.log('popup rendered')
}
draw_popup = function(popup){
    window.template.settings.selected_popup = popup;
    $('#website').find('.popup_card').append(
        generate_html(window.template[popup],popup),
    )
    try{
        select(window.selected)
    }catch{}
}
open_website_popup = function(popup){
    window.template.settings.selected_popup = popup;
    $('#website').css('overflow-y','hidden').scrollTop(0)
    $('#website').find('.popup_container').removeClass('none')
    $('#website').find('.popup_card').children()
    .not('.popup_close')
    .not('.edit_popup_padding_top')
    .not('.edit_popup_padding_bottom')
    .not('.edit_popup_padding_right')
    .not('.edit_popup_padding_left')
    .not('.select_popup_title')
    .remove()
    if(popup !== null){
        draw_popup(window.template.settings.selected_popup)
    }
    if(window.template.settings.website_popup_opened == '0'){
        $('#website').find('.popup_container').find('.popup_card').addClass(window.template.popup_window.children.popup_card.transition)
        window.template.settings.website_popup_opened = '1';
    }
}
hide_popup_window = function(){
    window.template.settings.website_popup_opened = '0';
    $('#website').find('.popup_container').addClass('none')
    $('#website').css('overflow-y','auto')
    $('.current_page_name').text(texts.website_pages[window.template.settings.selected_page])
}
set_editor_popup_editor_position_popup = function(){
    $('#editor').css({
        top:($('#website').find(`.popup_card`).offset().top) - 100,
        left:($(`#website`).find('.popup_card').width()) + ($(`#website`).find('.popup_card').offset().left) + 100,
        right:'unset',
        bottom:'unset',
    })
}
//events
$('body').on('click','.popup_card',function(){
    if($('.popup_close:hover').length > 0){return;}
    if($('.form_elements:hover').length > 0){return;}
    if($(this).hasClass('popup_window_selected')){return;}
    select('popup_window.children.popup_card');
    $(this).find('.edit_btns').addClass('edit_btns_animation_slide_right')
})
$('body').on('dblclick','.popup_card',function(){
    if($('.popup_close:hover').length > 0){return;}
    if($('.form_elements:hover').length > 0){return;}
    draw_editor_popup_popup_widnow();
})
$('body').on('contextmenu','.popup_card',function(e){
    if($('.popup_close:hover').length > 0){return;}
    if($('.form_elements:hover').length > 0){return;}
    show_contextMenu('popup_card',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
//
$('body').on('mouseup','.popup_close',function(e){
    unselect()
    hide_popup_window();
    hide_editor_popup('editor')
})




