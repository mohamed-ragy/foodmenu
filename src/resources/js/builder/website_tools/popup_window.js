render_website_popup = function(popup){
    $('#website').find('.popup_container').remove();
    $('#website').prepend(generate_html(window.template.popup_window,'popup_window'))
    console.log('popup rendered')
}
draw_popup = function(popup){
    $('.showWebsitePages').find('.website_page_name').text(texts.website_pages[popup])
    window.selected_popup = popup;
    $('#website').find('.popup_card').append(
        generate_html(window.template[popup],popup),
    )
}
open_website_popup = function(popup){
    window.website_popup_opened = true;
    $('#website').css('overflow-y','hidden').scrollTop(0)
    $('#website').find('.popup_container').removeClass('none')
    $('#website').find('.popup_card').children()
    .not('.popup_close')
    .not('.edit_popup_padding_top')
    .not('.edit_popup_padding_bottom')
    .not('.edit_popup_padding_right')
    .not('.edit_popup_padding_left')
    .remove()
    switch(popup){
        case 'popup_window':
            $('.showWebsitePages').find('.website_page_name').text(texts.website_pages[window.selected_page])
            select('popup_window.children.popup_card');
        break;
        case 'login_popup':
            draw_popup(popup)
            select('login_popup')
        break;
    }
    $('#website').find('.popup_container').find('.popup_card').addClass(window.template.popup_window.children.popup_card.transition)
}
hide_popup_window = function(){
    window.website_popup_opened = false;
    window.selected_popup = 'popup_window';
    $('#website').find('.popup_container').addClass('none')
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
    unselect()
    hide_popup_window();
    hide_editor_popup('editor')
})




