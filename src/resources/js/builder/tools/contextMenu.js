let contextMenu_scroll_interval = null;
hide_contextMenu = function(force=false){
    if(force){
        clearInterval(contextMenu_scroll_interval)
        $('#contextMenu').addClass('none').text('');
        $('#contextSubmenu').text('').addClass('none');
    }else if($('#contextMenu:hover').length == 0 && $('.contextMenu:hover').length == 0 ){
        clearInterval(contextMenu_scroll_interval)
        $('#contextMenu').addClass('none').text('')
        $('#contextSubmenu').text('').addClass('none')
    }
}
draw_contextMenu_elem = function(data){
    let context_elem =  $('<div/>',{class:`contextMenu_elem ${data.submenu ? 'contextMenu_elem_submenu' : ''} ${data.class}`,key:data.key ?? ''}).append(
        $('<div/>',{class:'row alnC jstfyC'}).append(
            data.icon ? 
            $('<div/>',{class:`contextMenu_elem_icon ${data.icon}`})
            : data.img ? 
            $('<img/>',{class:`contextMenu_elem_img`,src:data.img})
            :
            $('<div/>',{class:`contextMenu_elem_icon`}),
            $('<div/>',{class:`fs09 ${data.child1_class ?? ''}`,text:data.child1_text ?? ''}),
        ),
        $('<div/>',{class:`fs07 ${data.child2_class ?? ''}`,text:data.child2_text ?? ''}),
        data.submenu ? $('<div/>',{class:'contextSubmenu'}).append(data.submenu) : '',
    )
    for(const key in data.attrs){
        context_elem.attr(key,data.attrs[key])
    }
    return context_elem;
}
draw_contextMenu_line = function(){
    return $('<div/>',{class:'contextMenu_line'})
}
show_contextMenu = function(type,key_tree,cord){
    hide_contextMenu();
    $('#contextMenu').text('')
    select(key_tree)
    let elem_data;
    switch(type){
        case 'home_section':
            elem_data = get_elem_data(key_tree);
            $('#contextMenu').append(
                draw_home_section_contextMenu(elem_data)
            )
        break;
        case 'home_section_block':
            elem_data = get_elem_data(key_tree);
            $('#contextMenu').append(
                draw_home_section_block_contextMenu(elem_data)
            )
        break;
        case 'home_elem':
            elem_data = get_elem_data(key_tree);
            $('#contextMenu').append(
                draw_home_elem_contextMenu(elem_data)
            )
        break;
        case 'text_editor_hyperlink':
            $('#contextMenu').append(
                draw_text_editor_hyperlinks_contextMenu()
            )
        break;
        case 'text_editor_font_size':
            $('#contextMenu').append(
                draw_text_editor_font_size_contextMenu()
            )
        break;
        case 'button_function':
            $('#contextMenu').append(
                draw_button_function_hyperlinks_contextMenu()
            )
        break;
    }
    try{
        if(elem_has_animation(key_tree,false)){
            $('.editor_transform').addClass('contextMenu_elem_dummy')
            $('.editor_filter').addClass('contextMenu_elem_dummy')
        }
    }catch{}

    setTimeout(()=>{
        let x = cord.x;
        let y = cord.y;
        $('#contextMenu').css({
            left:x,
            top:y,
        }).removeClass('none')

        if(x > $(window).width() / 2){
            x = (x) - ($('#contextMenu').outerWidth())
            $('#contextMenu').css({
                left:x,
            })
        }
        if(y > $(window).height() / 2){
            y = (y) - ($('#contextMenu').outerHeight())
            $('#contextMenu').css({
                top:y,
            })
        }
        if(y + $('#contextMenu').height() > $(window).height()){
            y = (y) - ( (y) +  ($('#contextMenu').height()) - ($(window).height()) ) - 50
            $('#contextMenu').css({
                top:y,
            })
        }
        if($('#contextMenu').offset().top < 0){
            y = (y) - ( (y) +  ($('#contextMenu').height()) - ($(window).height()) ) - 50
            $('#contextMenu').css({
                top:y,
            })
        }
        if($('#contextMenu')[0].scrollHeight > $('#contextMenu').outerHeight()){
            $('#contextMenu').prepend(
                $('<div/>',{class:'contextMenu_scrollIcon_up ico-arrowUp'}),
            ).append(
                $('<div/>',{class:'contextMenu_scrollIcon_down ico-arrowDown'})
            )
        }
    },100)
}
scroll_contextMenu = function(direction){
    contextMenu_scroll_interval = setInterval(()=>{
        $('#contextMenu').animate({
            scrollTop:direction == 'up' ? ($('#contextMenu').scrollTop()) - 50 : direction == 'down' ? ($('#contextMenu').scrollTop()) + 50 : 0,
        },{duration:250},{specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
    },250)
}
scroll_contextSubmenu = function(direction){
    contextMenu_scroll_interval = setInterval(()=>{
        $('#contextSubmenu').animate({
            scrollTop:direction == 'up' ? ($('#contextSubmenu').scrollTop()) - 50 : direction == 'down' ? ($('#contextSubmenu').scrollTop()) + 50 : 0,
        },{duration:250},{specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
    },250)
}

$('body').on('mouseenter','.contextMenu_scrollIcon_up',function(e){
    scroll_contextMenu('up')
})
$('body').on('mouseenter','.contextMenu_scrollIcon_down',function(e){
    scroll_contextMenu('down')
})
$('body').on('mouseenter','.contextSubmenu_scrollIcon_up',function(e){
    scroll_contextSubmenu('up')
})
$('body').on('mouseenter','.contextSubmenu_scrollIcon_down',function(e){
    scroll_contextSubmenu('down')
})
$('body').on('mouseleave','.contextMenu_scrollIcon_down, .contextMenu_scrollIcon_up, .contextSubmenu_scrollIcon_up, .contextSubmenu_scrollIcon_down',function(){
    clearInterval(contextMenu_scroll_interval)
})


$('body').on('click','.contextMenu_elem',function(e){
    if($(this).hasClass('contextMenu_elem_submenu')){return;}
    hide_contextMenu(true);
})                                                                                                                                                                                                                                                                                                                                                                
$('body').on('click','.contextMenu',function(e){
    show_contextMenu($(this).attr('contextMenu_type'),$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
$('body').on('mouseenter','.contextMenu_elem_submenu',function(e){
    $('#contextSubmenu').text('').append($(this).find('.contextSubmenu').html());

    $('#contextSubmenu').css({
        top:($(this).offset().top) - (40),
        bottom:'unset',
        left:($(this).offset().left) + ($(this).outerWidth()) - 10,
    }).removeClass('none')

    if(($('#contextSubmenu').offset().left) + ($('#contextSubmenu').outerWidth()) > $(window).width()){
        $('#contextSubmenu').css({
            left:($(this).offset().left) - ($('#contextSubmenu').outerWidth()) + 10,
        })
    }

    if(($('#contextSubmenu').offset().top ) + ($('#contextSubmenu').height()) >= $(window).height()){
        $('#contextSubmenu').css('bottom',20);
        $('#contextSubmenu').prepend(
            $('<div/>',{class:'contextSubmenu_scrollIcon_up ico-arrowUp'}),
        ).append(
            $('<div/>',{class:'contextSubmenu_scrollIcon_down ico-arrowDown'})
        )
    }
})
$('body').on('mouseleave','.contextMenu_elem_submenu, #contextSubmenu',function(e){
    if($('#contextSubmenu:hover').length == 0){
        $('#contextSubmenu').text('').addClass('none')
    }
})
