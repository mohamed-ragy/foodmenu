draw_responsive_selector = function(){
    return $('<div/>',{class:'responsive_selector_container'}).append(
        $('<div/>',{class:'responsive_selector',key:'general'}).append(
            $('<div/>',{class:'ico-responsive mie-5'}),
            $('<div/>',{text:texts.general})
        ),
        $('<div/>',{class:'responsive_selector',key:'desktop'}).append(
            $('<div/>',{class:'ico-desktop mie-5'}),
            $('<div/>',{text:texts.desktop})
        ),
        $('<div/>',{class:'responsive_selector',key:'mobile'}).append(
            $('<div/>',{class:'ico-mobile mie-5'}),
            $('<div/>',{text:texts.mobile})
        ),
    )
}
set_responsive_selector = function(){
    $('.responsive_selector_container').each(function(){
        let editors_container = $(this).closest('.editors_container');
        let is_general = true;
        editors_container.find('.editor').each(function(){
            if(!$(this).hasClass('dummy_editor')){
                let key_tree = $(this).attr('key_tree');
                let variable_key = $(this).attr('variable_key');
                let key = $(this).attr('key');
                let elem_data = get_elem_data(key_tree,variable_key,key);
                if(elem_data.val !== elem_data.val_mobile && typeof(elem_data.val_mobile) !== 'undefined'){
                    is_general = false;
                }
            }
        })
        $(this).find('.responsive_selector').removeClass('responsive_selector_selected')
        if(is_general){
            $(this).find('.responsive_selector[key="general"]').addClass('responsive_selector_selected')
        }else{
            if(window.current_view == 'desktop'){
                $(this).find('.responsive_selector[key="desktop"]').addClass('responsive_selector_selected')
            }else if(window.current_view == 'mobile'){
                $(this).find('.responsive_selector[key="mobile"]').addClass('responsive_selector_selected')
            }
        }
    })
    set_hover_selector();
}
$('body').on('click','.responsive_selector',function(){
    $('.responsive_selector').removeClass('responsive_selector_selected');
    $(this).addClass('responsive_selector_selected')
    undo_redo_actions(true,false)
})

// responsive_icon = function(responsive_class='responsive_desktop_mobile'){
//     if(responsive_class == 'responsive_desktop_mobile'){
//         return $('<div/>',{class:'ico-responsive responsive responsive_desktop_mobile',tooltip:''});
//     }else if(responsive_class == 'responsive_desktop'){
//         return $('<div/>',{class:'ico-desktop responsive responsive_desktop',tooltip:texts.desktop_style});
//     }else if(responsive_class == 'responsive_mobile'){
//         return $('<div/>',{class:'ico-mobile responsive responsive_mobile',tooltip:texts.mobile_style});
//     }
// }
// $('body').on('click','.responsive',function(e){
//     // e.stopImmediatePropagation();
//     if($(this).hasClass('responsive_desktop')){
//         $(this).removeClass('responsive_desktop ico-desktop').addClass('responsive_mobile ico-mobile').attr('tooltip',texts.mobile_style)
//     }else if($(this).hasClass('responsive_mobile')){
//         $(this).removeClass('responsive_mobile ico-mobile').addClass('responsive_desktop_mobile ico-responsive').attr('tooltip','')
//     }else if($(this).hasClass('responsive_desktop_mobile')){
//         $(this).removeClass('responsive_desktop_mobile ico-responsive').addClass('responsive_desktop ico-desktop').attr('tooltip',texts.desktop_style)
//     }
//     undo_redo_actions();
//     updateToolTip();
// })
// set_responsive_icons = function(){
//     $('.responsive').each(function(){
//         try{
//             let selector_container = $(this).closest('.selector_container');
//             let selector = selector_container.find('.selector')

//             let is_hover = false;
//             if($(this).closest('.selector_container').attr('is_hover') == '1'){
//                 if($(this).closest('.selector_container').find('.hover').hasClass('hover_hover')){
//                     is_hover = true;
//                 }
//             }

//             let responsive_check = true;
//             let hover_responsive_check = true;
//             selector.each(function(){
//                 let key_tree = $(this).attr('key_tree');
//                 let key = $(this).attr('key')
//                 let elem_data = get_key_tree(key_tree);
//                 if(elem_data.elem[key] !== elem_data.elem_mobile[key]){
//                     responsive_check = false;
//                 }
//                 if(elem_data.elem_hover[key] !== elem_data.elem_mobile_hover[key]){
//                     hover_responsive_check = false;
//                 }
//             })
//             if(is_hover){
//                 if(hover_responsive_check){
//                     $(this).removeClass().addClass('responsive responsive_desktop_mobile ico-responsive').attr('tooltip','')
//                 }else{
//                     if(window.current_view == 'mobile'){
//                         $(this).removeClass().addClass('responsive responsive_mobile ico-mobile').attr('tooltip',texts.mobile_style)
//                     }else if(window.current_view == 'desktop'){
//                         $(this).removeClass().addClass('responsive responsive_desktop ico-desktop').attr('tooltip',texts.desktop_style)
//                     }
//                 }
//             }else{
//                 if(responsive_check){
//                     $(this).removeClass().addClass('responsive responsive_desktop_mobile ico-responsive').attr('tooltip','')
//                 }else{
//                     if(window.current_view == 'mobile'){
//                         $(this).removeClass().addClass('responsive responsive_mobile ico-mobile').attr('tooltip',texts.mobile_style)
//                     }else if(window.current_view == 'desktop'){
//                         $(this).removeClass().addClass('responsive responsive_desktop ico-desktop').attr('tooltip',texts.desktop_style)
//                     }
//                 }
//             }
//             updateToolTip();
//         }catch{}

//     })
// }
