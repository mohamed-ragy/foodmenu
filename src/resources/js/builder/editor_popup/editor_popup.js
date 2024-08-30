create_editor_popup = function(id){
    let editor_popup_body_shortcuts = 'none';
    if(id == 'editor' || id == 'page_setup' || id == 'website_header'){editor_popup_body_shortcuts = ''}
    return new Promise((success,reject)=>{
        $('body').append(
            $('<div/>',{class:'editor_popup none',id:id}).append(
                $('<div/>',{class:'editor_popup_head'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'editor_popup_head_btn none ico-arrowLeft editor_popup_back_Btn'}),
                        $('<div/>',{class:'column alnS jstfyS'}).append(
                            $('<div/>',{class:'editor_popup_title'}),
                            $('<div/>',{class:'editor_popup_title2'})
                        )
                    ),
                    $('<div/>',{class:'ico-close mX10 editor_popup_close pointer'}),
                ),
                $('<div/>',{class:'editor_popup_body_wrapper'}).append(
                    $('<div/>',{class:`editor_popup_body_shortcuts ${editor_popup_body_shortcuts}`}),
                    $('<div/>',{class:'editor_popup_body'}),
                )
            ).css({
                right:'20px',
                top:'70px',
            })
        )
        success();
    })
}

fix_editor_popup_position = function(editor_popup){
    let editor_popup_top = editor_popup.offset().top;
    let editor_popup_bottom = (editor_popup_top) + (editor_popup.height());
    let editor_popup_left = editor_popup.offset().left;
    let editor_popup_right = (editor_popup_left) + (editor_popup.width());
    let window_height = $(window).height();
    let window_width = $(window).width();
    if(editor_popup_top <= $('.builder_header').height()){
        editor_popup.css({
            top:($('.builder_header').height()) + 50 + ($('.website_header').height()),
            bottom:'unset',
        })
    }
    if(editor_popup_bottom > window_height){
        editor_popup.css({
            top:'unset',
            bottom:'20px'
        })
    }
    if(editor_popup_left < 0){
        editor_popup.css({
            left:'20px',
            right:'unset',
        })
    }
    if(editor_popup_right > window_width){
        editor_popup.css({
            left:'unset',
            right:'20px',
        })
    }
    if(window.current_view == 'mobile'){
        editor_popup.css({
            top:$('#website').offset().top,
            bottom:'unset',
            left:$('#website').offset().left + $('#website').width() + 10,
            right:'unset',
        })
    }
}
show_editor_popup = function(elem,callback=()=>{}){
    $('.editor_popup').addClass('editor_popup_dump')
    $('.editor_popup_title2').text('')
    $(`#${elem}`).css({'animation-duration':'300ms'})
    switch(elem){
        case 'loading_spinner':
            get_loading_spinners();
        break;
        case 'popup_window':
            show_popup_window();
        break;
        case 'website_header':
            window.selected = 'website_header.children.header_wrapper';
            select(window.selected);
        break;
        default:

        break;
    }

    if(!$(`#${elem}`).hasClass('none') && elem !== 'editor'){
        $(`#${elem}`).removeClass('editor_popup_dump').addClass('editor_popup_flash')
        setTimeout(()=>{
            $(`#${elem}`).css({'animation-duration':'0ms'}).removeClass('editor_popup_flash')
        },1500)
    }else{
        $(`#${elem}`).removeClass('none editor_popup_dump')
    }
    if(elem == 'editor' && $('#editor:hover').length == 0){
        set_editor_popup_editor();
    }
    // $(`.editor_popup_body_shortcut`).removeClass('editor_popup_body_shortcut_selected')
    callback()
    set_responsive_selector();
    set_editor_popup_scroll_to_load_font_styles();
    set_all_editors();
        // if(elem === null){
    //     $('#editor_popup').css({
    //         left:($(window).width() / 2) - ($('#editor_popup').width() / 2),
    //         top:'20%',
    //     })
    // }else{
    //     $('#editor_popup').css({
    //         left:elem.offset().left + elem.outerWidth(),
    //         top:elem.offset().top,
    //     })
    // }

    // $('#editor_popup').removeClass('none')

    //fix editor position if out of the screen

}
hide_editor_popup = function(id){
    $(`#${id}`).addClass('none');
    if(id == 'editor'){
        $('#editor').find('.editor_popup_body').text('')
        // hide_popup_window();
    }
    stop_preview_animations();

    if($('.editor_popup:not(.none)').length == 0){
        $('.editor_popup_body_wrapper').off('scroll')
    }
}


editor_popup_to_child = function(container){
    window.toolTipElem = undefined;
    let editor_popup = container.closest('.editor_popup');
    editor_popup.find('.editor_popup_back_Btn').attr('key',container.attr('parent_key')).removeClass('none');

    editor_popup.find('.editor_popup_body').addClass('ofH')
    editor_popup.find('.editor_popup_container').addClass('editor_popup_slide_0_to_left');
    container.removeClass('none').addClass('editor_popup_slide_right_to_0')
    setTimeout(()=>{
        editor_popup.find('.editor_popup_container').each(function(){
            if($(this).attr('key') == container.attr('key')){
                $(this).removeClass('editor_popup_slide_right_to_0 editor_popup_slide_0_to_left');
            }else{
                $(this).removeClass('editor_popup_slide_right_to_0 editor_popup_slide_0_to_left').addClass('none');
            }
        });
        editor_popup.find('.editor_popup_body').removeClass('ofH').scrollTop(0)
        set_all_editors();
    },150)
}
editor_popup_to_parent = function(container){
    window.toolTipElem = undefined;
    let editor_popup = container.closest('.editor_popup');
    if(typeof(container).attr('parent_key') !== 'undefined'){
        editor_popup.find('.editor_popup_back_Btn').attr('key',container.attr('parent_key')).removeClass('none');
    }else{
        editor_popup.find('.editor_popup_back_Btn').attr('key',null).addClass('none');
    }
    editor_popup.find('.editor_popup_body').addClass('ofH')
    editor_popup.find('.editor_popup_container').addClass('editor_popup_slide_0_to_right');
    container.removeClass('none').addClass('editor_popup_slide_right_to_0')
    setTimeout(()=>{
        editor_popup.find('.editor_popup_container').each(function(){
            if($(this).attr('key') == container.attr('key')){
                $(this).removeClass('editor_popup_slide_right_to_0 editor_popup_slide_0_to_right');
            }else{
                $(this).removeClass('editor_popup_slide_right_to_0 editor_popup_slide_0_to_right').addClass('none');
            }
        });
        editor_popup.find('.editor_popup_body').removeClass('ofH').scrollTop(0)
        set_all_editors();
    },150)
}
//events
$('body').on('click','.editor_popup_show_container',function(e){
    editor_popup_to_child($(this).closest('.editor_popup').find(`.editor_popup_container[key="${$(this).attr('key')}"]`))
})
$('body').on('click','.editor_popup_back_Btn',function(e){
    editor_popup_to_parent($(this).closest('.editor_popup').find(`.editor_popup_container[key="${$(this).attr('key')}"]`))
});
//
$(document).on('click','.editor_popup',function(e){
    $('.editor_popup').addClass('editor_popup_dump')
    $(this).removeClass('editor_popup_dump')
})
$('body').on('mousedown touchstart','.editor_popup_head',function(e){
    e.preventDefault();
    if($('.ico-close:hover').length > 0 || $('.ico-arrowLeft:hover').length > 0){return;}
    //
    //
    $(this).closest('.editor_popup').attr('onMove','true');
    $(this).closest('.editor_popup').addClass('editor_popup_OnMove')
    if(window.matchMedia("(pointer: coarse)").matches){
        $(this).closest('.editor_popup').attr('gapX', e.originalEvent.changedTouches[0].pageX - $(this).closest('.editor_popup').position().left);
        $(this).closest('.editor_popup').attr('gapY', e.originalEvent.changedTouches[0].pageY - $(this).closest('.editor_popup').position().top);
    }else{
        $(this).closest('.editor_popup').attr('gapX', e.pageX - $(this).closest('.editor_popup').position().left);
        $(this).closest('.editor_popup').attr('gapY', e.pageY - $(this).closest('.editor_popup').position().top);
    }
})
$('body').on('mouseup touchend','.editor_popup_head',function(e){
    $(this).closest('.editor_popup').attr('onMove','false');
    $(this).closest('.editor_popup').removeClass('editor_popup_OnMove')

});
$('body').on('mousemove touchmove','.editor_popup_head',function(e){
    e.preventDefault();
    if( $(this).closest('.editor_popup').attr('onMove') == 'true' ){
        if(window.matchMedia("(pointer: coarse)").matches){
            $(this).closest('.editor_popup').css({
                right:'unset',
                bottom:'unset',
                left:e.originalEvent.touches[0].pageX -  $(this).closest('.editor_popup').attr('gapX'),
                top:e.originalEvent.touches[0].pageY -  $(this).closest('.editor_popup').attr('gapY'),
            });
        }else{
            $(this).closest('.editor_popup').css({
                right:'unset',
                bottom:'unset',
                left:e.pageX -  $(this).closest('.editor_popup').attr('gapX'),
                top:e.pageY -  $(this).closest('.editor_popup').attr('gapY'),
            });

        }
        fix_editor_popup_position($(this).closest('.editor_popup'))
    }
})

$('body').on('click','.editor_popup_close',function(e){
    hide_editor_popup($(this).closest('.editor_popup').attr('id'));
})

//
$('body').on('click','.editor_popup_show_shortcut',function(){
    let editor_popup = $(this).closest('.editor_popup')
    let shortcut = $(this).attr('key');
    editor_popup.find('.editor_popup_shortcut_content').addClass('none');
    editor_popup.find(`.editor_popup_shortcut_content[key="${shortcut}"]`).removeClass('none');
    editor_popup.find('.editor_popup_container').removeClass('none')
    editor_popup.find('.editor_popup_container[parent_key]').addClass('none')
})