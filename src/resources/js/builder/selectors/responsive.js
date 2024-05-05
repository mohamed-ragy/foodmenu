responsive_icon = function(responsive_class='responsive_desktop_mobile'){
    if(responsive_class == 'responsive_desktop_mobile'){
        return $('<div/>',{class:'ico-responsive responsive responsive_desktop_mobile'});
    }else if(responsive_class == 'responsive_desktop'){
        return $('<div/>',{class:'ico-desktop responsive responsive_desktop'});
    }else if(responsive_class == 'responsive_mobile'){
        return $('<div/>',{class:'ico-mobile responsive responsive_mobile'});
    }
}
$('body').on('click','.responsive',function(e){
    // e.stopImmediatePropagation();
    if($(this).hasClass('responsive_desktop')){
        $(this).removeClass('responsive_desktop ico-desktop').addClass('responsive_mobile ico-mobile')
    }else if($(this).hasClass('responsive_mobile')){
        $(this).removeClass('responsive_mobile ico-mobile').addClass('responsive_desktop_mobile ico-responsive')
    }else if($(this).hasClass('responsive_desktop_mobile')){
        $(this).removeClass('responsive_desktop_mobile ico-responsive').addClass('responsive_desktop ico-desktop')
    }
    undo_redo_actions();
})
set_responsive_icons = function(){
    $('.responsive').each(function(){
        try{
            let selector_container = $(this).closest('.selector_container');
            let selector = selector_container.find('.selector')
            // if(selector_container.attr('is_responsive') == '1'){
                let key_tree = selector.attr('key_tree');
                let key = selector.attr('key')
                let elem_data = get_key_tree(key_tree);
                if(elem_data.elem[key] === elem_data.elem_mobile[key]){
                    $(this).removeClass().addClass('responsive responsive_desktop_mobile ico-responsive')
                }else{
                    if(window.current_view == 'mobile'){
                        $(this).removeClass().addClass('responsive responsive_mobile ico-mobile')
                    }else if(window.current_view == 'desktop'){
                        $(this).removeClass().addClass('responsive responsive_desktop ico-desktop')
                    }
                }
            // }
        }catch{}

    })
}
