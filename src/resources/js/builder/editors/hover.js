draw_hover_selector = function(){
    return $('<div/>',{class:'hover_selector_container'}).append(
        $('<div/>',{class:'hover_selector hover_selector_selected',key:'regular'}).append(
            $('<div/>',{class:'ico-regular mie-5'}),
            $('<div/>',{text:texts.regular})
        ),
        $('<div/>',{class:'hover_selector',key:'hover'}).append(
            $('<div/>',{class:'ico-hover mie-5'}),
            $('<div/>',{text:texts.hover}).append(
                $('<div/>',{class:'has_hover none'}),
            ),
        ),
    )
}
set_hover_selector = function(){
    $('.hover_selector_container').each(function(){
        let editors_container = $(this).closest('.editors_container');
        if(editors_container.find('.hover_selector_selected').attr('key') == 'hover'){
            editors_container.find('.remove_hover').removeClass('none')
        }else{
            editors_container.find('.remove_hover').addClass('none')
        }
        let has_hover = false;
        editors_container.find('.editor').each(function(){
            if(!$(this).hasClass('dummy_editor')){
                let key_tree = $(this).attr('key_tree');
                let variable_key = $(this).attr('variable_key');
                let key = $(this).attr('key');
                let elem_data = get_elem_data(key_tree,variable_key,key);
                if(typeof(elem_data.val_hover) !== 'undefined' || typeof(elem_data.val_mobile_hover) !== 'undefined'){
                    has_hover = true;
                }
                if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
                    if(typeof(elem_data.val_hover) === 'undefined' && typeof(elem_data.val_mobile_hover) === 'undefined'){
                        $(this).find('.remove_hover').addClass('none')
                    }else{
                        $(this).find('.remove_hover').removeClass('none')
                    }
                }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
                    if(typeof(elem_data.val_hover) === 'undefined'){
                        $(this).find('.remove_hover').addClass('none')
                    }else{
                        $(this).find('.remove_hover').removeClass('none')
                    }
                }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
                    if(typeof(elem_data.val_mobile_hover) === 'undefined'){
                        $(this).find('.remove_hover').addClass('none')
                    }else{
                        $(this).find('.remove_hover').removeClass('none')
                    }
                }
            }
        })
        if(has_hover){
            editors_container.find('.has_hover').removeClass('none')
        }else{
            editors_container.find('.has_hover').addClass('none')
        }
    })
}
$('body').on('click','.hover_selector',function(){
    $('.hover_selector').removeClass('hover_selector_selected');
    $(this).addClass('hover_selector_selected')
    undo_redo_actions(true,false)
})
$('body').on('click','.remove_hover',function(){
    let editor = $(this).closest('.editor');
    let editors_container = editor.closest('.editors_container');
    let key_tree = editor.attr('key_tree');
    let variable_key = editor.attr('variable_key');
    let key = editor.attr('key');
    let elem_data = get_elem_data(key_tree,variable_key,key);
    if(editors_container.attr('is_responsive') == '1'){
        if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
            delete elem_data.data_hover[key];
            delete elem_data.data_mobile_hover[key];
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
            delete elem_data.data_hover[key];
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
            delete elem_data.data_mobile_hover[key];
        }
    }else{
        delete elem_data.data_hover[key];
    }
    undo_redo_actions();
    set_hover_selector();
    new_action();
})
// hover_icon = function(){
//     let elem_data  = get_key_tree(window.selected);
//     // if(elem_data.elem.animation.animation.name != 'no_animation' && elem_data.elem.animation_mobile.animation.name != 'no_animation'){
//         // return $('<div/>',{class:'row alnC jstfyC'}).append(
//         //     $('<div/>',{class:'ico-regular hover_regular_dummy',tooltip:texts.hover_not_allowed}),
//         // )
//     // }else{
//         return $('<div/>',{class:'row alnC jstfyC'}).append(
//             $('<div/>',{class:'hover ico-regular hover_regular',tooltip:texts.regular_style}),
//             $('<div/>',{class:`ico-hover clear_hover none`,tooltip:texts.clear_hover_styling}),
//         )
//     // }
// }

// $('body').on('click','.hover',function(e){
//     let elem_data  = get_key_tree(window.selected);
//     if(elem_data.elem.animation.name != 'no_animation' || elem_data.elem.animation_mobile.name != 'no_animation'){
//         showAlert('error',texts.hover_not_allowed,5000,true)
//         return;
//     }
//     if($(this).hasClass('hover_regular')){
//         $(this).removeClass('hover_regular ico-regular').addClass('hover_hover ico-hover').attr('tooltip',texts.hover_style)
//         undo_redo_actions(true,false);
//     }else{
//         $(this).addClass('hover_regular ico-regular').removeClass('hover_hover ico-hover').attr('tooltip',texts.regular_style)
//         undo_redo_actions(true,false);
//     }
//     updateToolTip();
// })