create_editor_popup = function(id){
    return new Promise((success,reject)=>{
        $('body').append(
            $('<div/>',{class:'editor_popup none',id:id}).append(
                // $('<div/>',{class:'editor_popup_resizeIcon ico-drag2'}),
                $('<div/>',{class:'editor_popup_head'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'editor_popup_head_btn mie-5 none ico-arrowLeft editor_popup_back_Btn'}),
                        $('<div/>',{class:'editor_popup_title bold'})
                    ),
                    $('<div/>',{class:'ico-close mX5 editor_popup_close pointer'}),
                ),
                $('<div/>',{class:'editor_popup_body_wrapper'}).append(
                    $('<div/>',{class:'editor_popup_body_shortcuts'}),
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
}
show_editor_popup = function(elem,callback=()=>{}){
    $('.editor_popup').addClass('editor_popup_dump')
    $(`#${elem}`).css({'animation-duration':'300ms'})
    switch(elem){
        case 'loading_spinner':
            get_loading_spinners();
        break;
        case 'popup_window':
            show_popup_window();
        break;
        case 'website_header':
            window.is_header_selected = true;
            $('#website').scrollTop(0);
            $('.website_header').addClass('selected_header')
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
    $(`.editor_popup_body_shortcut`).removeClass('editor_popup_body_shortcut_selected')
    set_view_style();
    callback()
    set_responsive_selector();
    undo_redo_actions(true,false);
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

    }else if(id == 'popup_window'){
        hide_popup_window();
    }else if(id == 'website_header'){
        window.is_header_selected = false;
        $('.website_header').removeClass('selected_header')
    }
    stop_preview_animations();
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
        undo_redo_actions(true,false);
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
        undo_redo_actions(true,false);
    },150)
}
//events
$('body').on('click','.editor_popup_show_container',function(e){
    // e.stopImmediatePropagation();
    // e.stopPropagation();
    editor_popup_to_child($(this).closest('.editor_popup').find(`.editor_popup_container[key="${$(this).attr('key')}"]`))
})
$('body').on('click','.editor_popup_back_Btn',function(e){
    // //e.stopImmediatePropagation();
    // e.stopPropagation();
    editor_popup_to_parent($(this).closest('.editor_popup').find(`.editor_popup_container[key="${$(this).attr('key')}"]`))
    // hidePopupSelectors();
});
//
$(document).on('click','.editor_popup',function(e){
    // //e.stopImmediatePropagation();
        $('.editor_popup').addClass('editor_popup_dump')
        $(this).removeClass('editor_popup_dump')
        // hidePopupSelectors();
})
$('body').on('mousedown touchstart','.editor_popup_head',function(e){
    //e.stopImmediatePropagation();
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
    //e.stopImmediatePropagation();
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
    //e.stopImmediatePropagation();
    hide_editor_popup($(this).closest('.editor_popup').attr('id'));
})

// ///
// $('body').on('mousedown touchstart','.editor_popup_resizeIcon',function(e){
//     //e.stopImmediatePropagation();
//     e.preventDefault();
//     //
//     $(this).closest('.editor_popup').attr('onresize','true');
//     if(window.matchMedia("(pointer: coarse)").matches){
//         $(this).closest('.editor_popup').attr('gapX_resize', e.originalEvent.changedTouches[0].pageX );
//         $(this).closest('.editor_popup').attr('gapY_resize', e.originalEvent.changedTouches[0].pageY );
//     }else{
//         $(this).closest('.editor_popup').attr('gapX_resize', e.pageX );
//         $(this).closest('.editor_popup').attr('gapY_resize', e.pageY );
//     }

// })
// $('body').on('mouseup touchend','.editor_popup',function(e){
//     $(this).closest('.editor_popup').attr('onresize','false');
// })
// $('body').on('mousemove touchmove','.editor_popup',function(e){
//     // e.preventDefault();
//     //e.stopImmediatePropagation();
//     if( $(this).closest('.editor_popup').attr('onresize') == 'true' ){
//         if(window.matchMedia("(pointer: coarse)").matches){
//             $(this).closest('.editor_popup').css({
//                 left:$(this).closest('.editor_popup').offset().left,
//                 top:$(this).closest('.editor_popup').offset().top,
//                 width:$(this).closest('.editor_popup').attr('gapX_resize') - e.originalEvent.touches[0].pageX + $(this).closest('.editor_popup').width(),
//                 width:( ($(this).closest('.editor_popup').attr('gapX_resize') - e.originalEvent.touches[0].pageX) * - 1 ) + $(this).closest('.editor_popup').width(),
//                 height:( ($(this).closest('.editor_popup').attr('gapY_resize') - e.originalEvent.touches[0].pageY) * - 1 ) + $(this).closest('.editor_popup').height(),
//             });
//             $(this).closest('.editor_popup').attr('gapX_resize', e.originalEvent.changedTouches[0].pageX );
//             $(this).closest('.editor_popup').attr('gapY_resize', e.originalEvent.changedTouches[0].pageY );
//         }else{
//             $(this).closest('.editor_popup').css({
//                 left:$(this).closest('.editor_popup').offset().left,
//                 top:$(this).closest('.editor_popup').offset().top,
//                 width:( ($(this).closest('.editor_popup').attr('gapX_resize') - e.pageX) * - 1 ) + $(this).closest('.editor_popup').width(),
//                 height:( ($(this).closest('.editor_popup').attr('gapY_resize') - e.pageY) * - 1 ) + $(this).closest('.editor_popup').height(),
//             });
//             $(this).closest('.editor_popup').attr('gapX_resize', e.pageX );
//             $(this).closest('.editor_popup').attr('gapY_resize', e.pageY );
//         }
//         if( $(this).closest('.editor_popup').height() <= 300){$(this).closest('.editor_popup').height(300);}
//         if($(this).closest('.editor_popup').width() <= 300){$(this).closest('.editor_popup').width(300);}
//     }
// })
// //
