
$('body').on('click',function(e){
    if($('#clr-picker:hover').length > 0){return;}
    hide_website_pages_menu();
    hide_website_style_menu();
    hide_website_tools_menu();
    hide_show_preview_languages_menu();
    hidePopupSelectors();
    hide_contextMenu();
})
$(window).on('focus', function() {
    play_preview_animations();
});

$(window).on('blur', function() {
    stop_preview_animations();
});
$(window).resize(function(){
    $(':root').css('--screen_height',`calc(${$('body').outerHeight()}px - ${$('header').outerHeight()}px - ${$('.website_header').outerHeight() ?? 0}px)`)
    fix_header_nav_list();
})
window.addEventListener("beforeunload", function (e) {
    if(!is_saved_checker()){
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
    }
});
$('body').on('contextmenu',function(e){
    if(!$(this).attr('contenteditable') !== 'true'){
        e.preventDefault()
    }
})
keyboard_shortcuts = function(e){
    if(e.shiftKey && (e.ctrlKey || e.metaKey) && e.which == 90){
        e.preventDefault();
        redo();
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 90){
        e.preventDefault();
        undo();
    }
    else if(e.altKey && e.which == 88){
        view_toggle()
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 83){
        e.preventDefault();
        if(!is_saved_checker()){
            $('#save').trigger('click')
        }
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 67){
        copy()
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 88){
        cut()
    }
    else if((e.ctrlKey || e.metaKey) && e.which == 86	){
        paste()
    }
    else if(
        (e.ctrlKey || e.metaKey) && e.which == 49 ||
        (e.ctrlKey || e.metaKey) && e.which == 50 ||
        (e.ctrlKey || e.metaKey) && e.which == 51 ||
        (e.ctrlKey || e.metaKey) && e.which == 52 ||
        (e.ctrlKey || e.metaKey) && e.which == 53 ||
        (e.ctrlKey || e.metaKey) && e.which == 54 ||
        (e.ctrlKey || e.metaKey) && e.which == 55 ||
        (e.ctrlKey || e.metaKey) && e.which == 56 ||
        (e.ctrlKey || e.metaKey) && e.which == 57
    ){
        e.preventDefault();
        try{
            window.preview_language = Object.keys(window.website_data.languages)[e.which - 49];
            $('.showWebsitePreviewLangs').children().first().text(window.website_data.languages[window.preview_language].name)
            window.history.pushState({},'',`/?template_id=${window.template_id}&preview_language=${window.preview_language}`)
            set_website_variable_data()
            render_all();
        }catch{}

    }

    if(e.which == '46'){
        delete_selected();
    }

    if(e.which == 27){
        hidePopupSelectors(true);   
        $('.editor_popup').each(function(){
            if(!$(this).hasClass('editor_popup_dump')){
                hide_editor_popup($(this).attr('id'));
                return false;
            }
        })
        hide_popup_window();
        window.selected = null;
    }
    if(e.altKey){
        e.preventDefault();
    }
    if(e.altKey && e.which == 83){
        set_preview_mode();
    }
    else if(e.altKey  && e.which == 65){
        heighlight_all();
    }

    if(e.shiftKey && (e.ctrlKey || e.metaKey) && e.which == 38){
        e.preventDefault();
        editor_bring_to_front();
    }else if(e.shiftKey && (e.ctrlKey || e.metaKey) && e.which == 40){
        e.preventDefault();
        editor_send_to_back();
    }else if((e.ctrlKey || e.metaKey) && e.which == 38){
        e.preventDefault();
        editor_bring_forward();
    }else if((e.ctrlKey || e.metaKey) && e.which == 40){
        e.preventDefault();
        editor_send_backward();
    }
    if((e.ctrlKey || e.metaKey)){
        window.ctrl_pressed = true;
    }

}
$('body').on('keydown',function(e){
    keyboard_shortcuts(e)
})
$('body').on('mousemove',function(e){
    window.pageX = e.pageX;
    window.pageY = e.pageY;
})
$('body').on('keyup',function(e){
    // e.stopImmediatePropagation();
    if(e.altKey && e.which == 83){
        unset_preview_mode();
    }
    else if(e.altKey  && e.which == 65){
        deheighlight_all();
    }
    window.ctrl_pressed = false;

});

///
$('body').on('click','a',function(e){
    e.preventDefault();
})
$('body').on('click','.open_page',function(e){
    e.preventDefault();
    if(!is_preview_mode()){return;}
    set_page($(this).attr('page'))
})
$('body').on('click','.scroll_to_section',function(e){
    e.preventDefault();
    if(!is_preview_mode()){return;}
    $('#website').animate({
        scrollTop:$(`.${$(this).attr('section')}`).position().top,
    },500)
})
//
$('body').on('mouseenter','a',function(){
    if($(this).hasClass('open_page')){
        $(this).attr('tooltip',`<div class="fs101">${texts.website_pages.link_to}:</div><div class="fs101 cB underline ellipsis">https://${window.website_data.url}${$(this).attr('href')}</div>`)
    }else if($(this).hasClass('open_popup')){
        $(this).attr('tooltip',`<div class="fs101">${texts.website_pages.add_to_cart}:</div><div class="fs101 cB underline">${$(this).attr('product')}</div>`)
    }else if($(this).hasClass('scroll_to_section')){
        let section = window.template[window.selected_page].find(item=>item.class_selector == $(this).attr('section'))
        let section_name = '';
        try{
            section_name = section.name;
        }catch{}
        $(this).attr('tooltip',`<div class="fs101">${texts.website_pages.scroll_to_section}:</div><div class="fs101 cB underline">${section_name}</div>`)
    }
})
$('body').on('mouseenter','button',function(){
    if($(this).hasClass('open_page')){
        $(this).attr('tooltip',`<div class="fs101">${texts.website_pages.link_to}:</div><div class="fs101 cB underline ellipsis">https://${window.website_data.url}${$(this).attr('href')}</div>`)
    }else if($(this).hasClass('open_popup')){
        $(this).attr('tooltip',`<div class="fs101">${texts.website_pages.add_to_cart}:</div><div class="fs101 cB underline">${$(this).attr('product')}</div>`)

    }else if($(this).hasClass('scroll_to_section')){
        let section = window.template[window.selected_page].find(item=>item.class_selector == $(this).attr('section'))
        let section_name = '';
        try{
            section_name = section.name;
        }catch{}
        $(this).attr('tooltip',`<div class="fs101">${texts.website_pages.scroll_to_section}:</div><div class="fs101 cB underline">${section_name}</div>`)
    }
})
// $('body').on('mosueleave','a',function(){
// })
//
// document.execCommand = function(command, showUI, value) {
//     throw new Error("execCommand is disabled");
// };

const originalExecCommand = document.execCommand;

document.execCommand = function(command, showUI, value) {
    // Convert command to lowercase to ensure case-insensitive comparison
    const allowedCommands = ['copy', 'cut','paste', 'selectall'];
    command = command.toLowerCase();

    if (allowedCommands.includes(command)) {
        // If the command is allowed, call the original execCommand
        return originalExecCommand.call(document, command, showUI, value);
    } else {
        // Otherwise, throw an error or handle the disallowed command
        throw new Error(`execCommand "${command}" is disabled`);
    }
};


//
