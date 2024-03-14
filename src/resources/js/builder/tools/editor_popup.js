create_editor_popup = function(id,callback=()=>{}){
    $('body').append(
        $('<div/>',{class:'editor_popup none',id:id}).append(
            $('<div/>',{class:'editor_popup_head'}).append(
                $('<div/>',{class:''}),
                $('<div/>',{class:'ico-drag'}),
                $('<div/>',{class:'ico-close editor_popup_close pointer'}),
            ),
            $('<div/>',{class:'editor_popup_body'}),
        ).css({
            right:'20px',
            top:'70px',
        })
    )
    callback();
}

show_editor_popup = function(elem,callback=()=>{}){
    // $('#editor_popup').text('').append(
    //     $('<div/>',{class:'editor_popup_head'}).append(
    //         $('<div/>',{class:''}),
    //         $('<div/>',{class:'ico-drag'}),
    //         $('<div/>',{class:'ico-close editor_popup_close pointer'}),
    //     ),
    //     $('<div/>',{class:'editor_popup_body'}),
    // )
    switch(elem){
        case 'color_palette':
            draw_color_palette();
            $('#color_palette').removeClass('none editor_popup_dump')
        break;
    }

    callback()

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
}


//events
// window.editor_popup_onMove = false;
$('html,body').on('click','.editor_popup',function(e){
    e.stopImmediatePropagation();
    $(this).removeClass('editor_popup_dump')

})
$('html,body').on('mousedown touchstart','.editor_popup_head',function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    $(this).closest('.editor_popup').attr('onMove','true');
    $('#editor_popup').addClass('editor_popup_OnMove')
    if(window.matchMedia("(pointer: coarse)").matches){
        $(this).closest('.editor_popup').attr('gapX', e.originalEvent.changedTouches[0].pageX - $(this).closest('.editor_popup').position().left);
        $(this).closest('.editor_popup').attr('gapY', e.originalEvent.changedTouches[0].pageY - $(this).closest('.editor_popup').position().top);
    }else{
        $(this).closest('.editor_popup').attr('gapX', e.pageX - $(this).closest('.editor_popup').position().left);
        $(this).closest('.editor_popup').attr('gapY', e.pageY - $(this).closest('.editor_popup').position().top);
    }
})
$('html,body').on('mouseup touchend','.editor_popup_head',function(e){
    $(this).closest('.editor_popup').attr('onMove','false');
    $(this).closest('.editor_popup').removeClass('editor_popup_OnMove')

});
$('html,body').on('mousemove touchmove','.editor_popup_head',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    if( $(this).closest('.editor_popup').attr('onMove') == 'true' ){
        if(window.matchMedia("(pointer: coarse)").matches){
            $(this).closest('.editor_popup').css({
                right:'unset',
                left:e.originalEvent.touches[0].pageX -  $(this).closest('.editor_popup').attr('gapX'),
                top:e.originalEvent.touches[0].pageY -  $(this).closest('.editor_popup').attr('gapY'),
            });
        }else{
            $(this).closest('.editor_popup').css({
                right:'unset',
                left:e.pageX -  $(this).closest('.editor_popup').attr('gapX'),
                top:e.pageY -  $(this).closest('.editor_popup').attr('gapY'),
            });

        }
    }
})

$('html,body').on('click','.editor_popup_close',function(e){
    e.stopImmediatePropagation();
    hide_editor_popup($(this).closest('.editor_popup').attr('id'));
})

editor_popup_to_child = function(parent,child){
    parent.closest('.editor_popup_body').addClass('ofH')
    parent.removeClass('none').addClass('editor_popup_slide_0_to_left');
    setTimeout(()=>{
        child.removeClass('none').addClass('editor_popup_slide_right_to_0');
        setTimeout(()=>{
            child.removeClass('editor_popup_slide_right_to_0');
            parent.addClass('none').removeClass('editor_popup_slide_0_to_left');
            parent.closest('.editor_popup_body').removeClass('ofH').scrollTop(0)
        },190)
    },190)
}
editor_popup_to_parent = function(parent,child){
    parent.closest('.editor_popup_body').addClass('ofH')
    child.removeClass('none').addClass('editor_popup_slide_0_to_right');
    setTimeout(()=>{
        parent.removeClass('none').addClass('editor_popup_slide_left_to_0');
        setTimeout(()=>{
            parent.removeClass('editor_popup_slide_left_to_0');
            child.addClass('none').removeClass('editor_popup_slide_0_to_right');
            parent.closest('.editor_popup_body').removeClass('ofH').scrollTop(0)
        },190)
    },190)
}
