require('./editors/rename.js')//done
require('./editors/number_picker.js')//need to test dummy
require('./editors/inputList.js')//need to test dummy
require('./editors/select_box.js')//need to test dummy
require('./editors/switch_btn.js')//need to test dummy
require('./editors/gradient_editor.js')//done
require('./editors/img_browser.js')//done
require('./editors/image_position.js')//
require('./editors/background_filter.js')//
require('./editors/select_range.js')//need to set the original set select range function
require('./editors/color_picker.js')//need to set test dummy
require('./editors/backdrop_filter.js')//done
require('./editors/border_editor.js')//done
require('./editors/box_shadow_editor.js')//done
require('./editors/filter.js')//done

require('./editors/font_style_picker.js')//done
require('./editors/elem_text_selector.js')//done

require('./editors/transform_selector.js')//
require('./editors/animation/animation_editor.js')//
require('./editors/timing_function.js')//

//responsive selectors
require('./editors/padding_selector.js')//need to be removed
require('./editors/border_radius_selector.js')//need to be removed
require('./editors/margin_selector.js')//need to be removed
require('./editors/text_shadow_selector.js')//need to be removed
require('./editors/zindex_selector.js')//
require('./editors/opacity_selector.js')//

//nonresponsive selectors
require('./editors/font_style_picker.js')//
require('./editors/icon_selector.js')//
//



//tools
require('./editors/editor_popup_show_container.js')
require('./editors/responsive.js')
require('./editors/editor_details.js')

draw_editors_container = function(data){
    let editors_container;
    editors_container = $('<div/>',{class:`editors_container`,is_responsive:data.is_responsive ? '1' : '0'}).append(
        $('<div/>',{class:'mT5 mB10'}).append(
            data.is_responsive ? draw_responsive_selector() : '',
        )
    )
    for(const key in data.editors){
        editors_container.append(data.editors[key])
    }
    return editors_container;
}
get_editor_val = function(editor){
    let editors_container = editor.closest('.editors_container')
    let is_responsive = editors_container.attr('is_responsive');
    let key_tree = editor.attr('key_tree');
    let variable_key = editor.attr('variable_key');
    let key = editor.attr('key');
    let elem_data = get_elem_data(key_tree,variable_key,key);
    if(is_responsive == '0'){
        return elem_data.val;
    }else if(is_responsive == '1'){
        if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
            if(elem_data.val === elem_data.val_mobile || typeof(elem_data.val_mobile) === 'undefined'){
                return elem_data.val;
            }else{
                return '--';
            }
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
            return elem_data.val;
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
            if(typeof(elem_data.val_mobile) === 'undefined'){
                return elem_data.val;
            }else{
                return elem_data.val_mobile;
            }
        }
    }
}
set_val= function(editor,new_val){
    editor = editor.closest('.editor');
    let editors_container = editor.closest('.editors_container')
    let is_responsive = editors_container.attr('is_responsive');
    let key_tree = editor.attr('key_tree');
    let variable_key = editor.attr('variable_key');
    let key = editor.attr('key');
    let elem_data = get_elem_data(key_tree,variable_key,key);
    if(is_responsive == '0'){
        elem_data.data[key] = new_val;
    }else if(is_responsive == '1'){
        if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
            elem_data.data[key] = new_val;
            elem_data.data_mobile[key] = new_val;
            // delete elem_data.data_mobile[key]
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
            if(typeof(elem_data.data_mobile[key]) === 'undefined'){
                elem_data.data_mobile[key] = elem_data.data[key];
            }
            elem_data.data[key] = new_val;
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
            elem_data.data_mobile[key] = new_val;
        }
    }

}
get_dummy_val = function(editor){
    let val;
    if(editor.hasClass('number_picker_editor')){
        val = `${editor.find('.number_picker_input').val()}${editor.find('.number_picker_unit_select').text()}`
    }else if(editor.hasClass('inputList_editor')){
        val = editor.attr('val')
    }else if(editor.hasClass('select_box_editor')){
        val = editor.find('.select_box_selected').attr('key')
    }else if(editor.hasClass('switch_btn')){
        if(editor.hasClass('switch_btn_selected')){
            val = '1';
        }else{val = '0'}
    }else if(editor.hasClass('select_range')){
        val = editor.find('.select_range_val').text();
    }else if(editor.hasClass('color_picker_editor')){
        val = editor.attr('color_var')
    }else if(editor.hasClass('border_editor')){
        val = `${get_dummy_val(editor.find('.border_editor_width'))} ${get_dummy_val(editor.find('.border_editor_style'))} ${get_dummy_val(editor.find('.border_editor_color'))}`;
    }

    return val;
}
set_dummy_val = function(editor,val){
    if(editor.hasClass('number_picker_editor')){
        set_dummy_number_picker(editor,val);
    }else if(editor.hasClass('inputList_editor')){
        set_dummy_input_list(editor,val);
    }else if(editor.hasClass('select_box_editor')){
        set_dummy_select_box(editor,val);
    }else if(editor.hasClass('switch_btn')){
        set_dummy_switch_btn(editor,val);
    }else if(editor.hasClass('select_range')){
        set_dummy_select_range(editor,val);
    }else if(editor.hasClass('color_picker_editor')){
        set_dummy_color_picker(editor,val);
    }else if(editor.hasClass('border_editor')){
        set_dummy_border_editor(editor,val);
    }
}

// draw_selector_name = function(data){
//     return $('<div/>',{class:`selector_name_container ${data.container_class ?? ''}`}).append(
//         $('<div/>',{class:'row alnBL jstfyS'}).append(
//             data.data.before_name ?? '',
//             $('<div/>',{class:`fs09 ${data.name_class ?? ''}`,text:data.name}),
//             data.data.after_name ?? '',
//         ),
//         $('<div/>',{class:`selector_responsive_hover_container ${data.data.responsive_icon === false && data.data.hover_icon === false ? 'none' : ''} ${data.data.is_responsive !== true && data.data.is_hover !== true ? 'none' : ''}`}).append(
//             data.data.is_responsive && data.data.responsive_icon !== false ? responsive_icon(data.responsive_class) : '',
//             data.data.is_hover && data.data.hover_icon !== false ? hover_icon() : '',
//         )
//     )
// }
// get_val = function(selector){
//     let selector_container = selector.closest('.selector_container')
//     let key_tree = selector.attr('key_tree');
//     let key = selector.attr('key');
//     let elem_data = get_key_tree(key_tree);

// }
// get_selector_val = function(selector){
//     let selector_container = selector.closest('.selector_container')
//     let key_tree = selector.attr('key_tree');
//     let key = selector.attr('key');
//     let elem_data = get_key_tree(key_tree);
//     let val;
//     let val_hover;
//     if(selector_container.attr('is_responsive') == '1'){
//         if(selector_container.find('.responsive').hasClass('responsive_desktop')){
//             val = elem_data.elem[key]
//             if(key in elem_data.elem_hover){val_hover = elem_data.elem_hover[key];}
//         }else if(selector_container.find('.responsive').hasClass('responsive_mobile')){
//             val = elem_data.elem_mobile[key];
//             if(key in elem_data.elem_mobile_hover){val_hover = elem_data.elem_mobile_hover[key]}
//         }else if(selector_container.find('.responsive').hasClass('responsive_desktop_mobile') ){
//             // if(elem_data.elem[key] === elem_data.elem_mobile[key]){
//             if(JSON.stringify(elem_data.elem[key]) === JSON.stringify(elem_data.elem_mobile[key])){
//                 val = elem_data.elem[key];
//                 // if(key in elem_data.elem_hover){val_hover = elem_data.elem_hover[key];}
//             }else{
//                 val = null;
//                 // val_hover = null;
//             }
//             if(key in elem_data.elem_hover){
//                 if(elem_data.elem_hover[key] === elem_data.elem_mobile_hover[key]){
//                     val_hover = elem_data.elem_hover[key];
//                 }else{
//                     val_hover = null;
//                 }
//             }
//         }
//     }else{
//         val = elem_data.elem[key]
//         if(key in elem_data.elem_hover){val_hover = elem_data.elem_hover[key];}
//     }


//     // if(key_tree == 'home.1.children.section_wrapper.children.2.css'){
//         // console.log(elem_data)
//     // console.log(val_hover)
//     // }

//     if(selector_container.attr('is_hover') == '1'){
//         if(selector_container.find('.hover').hasClass('hover_hover')){
//             return val_hover;
//         }else{
//             return val;
//         }
//     }else{
//         return val;
//     }
// }
// get_elem_val = function(elem_data,key_val,is_responsive){
//     if(is_responsive == '1'){
//         let responsive_class = '';
//         let val = null;
//         let val_hover = null;
//         let val_desktop = elem_data.elem[key_val];
//         let val_mobile = elem_data.elem_mobile[key_val];
//         let val_desktop_hover = elem_data.elem_hover[key_val];
//         let val_mobile_hover = elem_data.elem_mobile_hover[key_val];

//         if(JSON.stringify(val_desktop) == JSON.stringify(val_mobile)){
//             val = val_desktop;
//             val_hover = val_desktop_hover;
//             responsive_class = 'responsive_desktop_mobile'
//         }else{
//             if(window.current_view == 'mobile'){
//                 responsive_class = 'responsive_mobile'
//                 val = val_mobile;
//                 val_hover = val_mobile_hover;
//             }else if(window.current_view == 'desktop'){
//                 responsive_class = 'responsive_desktop'
//                 val = val_desktop;
//                 val_hover = val_desktop_hover;
//             }
//         }
//         return {
//             val:val,
//             val_hover:val_hover,
//             val_desktop:val_desktop,
//             val_mobile:val_mobile,
//             val_desktop_hover:val_desktop_hover,
//             val_mobile_hover:val_mobile_hover,
//             responsive_class:responsive_class,
//         }
//     }else{
//         return {
//             val:elem_data.elem[key_val],
//             val_hover:elem_data.elem_hover[key_val],
//             val_desktop:null,
//             val_mobile:null,
//             val_desktop_hover:null,
//             val_mobile_hover:null,
//             responsive_class:''
//         }
//     }

// }
// set_elem_val = function(elem,new_val){
//     let responsive_elem = elem.closest('.selector_container').find('.responsive');
//     $.each(elem.closest('.selector')[0].attributes, function(index, attr) {
//         if(/key_tree\d+$/.test(attr.name) || attr.name == 'key_tree'){
//             let key_tree = attr.value;
//             let key = elem.closest('.selector').attr(`key${attr.name.replace('key_tree','')}`);
//             let elem_data = get_key_tree(key_tree);
//             let is_hover = false;
//             let save_hover = false;

//             if(elem.closest('.selector_container').attr('is_hover') == '1'){
//                 is_hover = true;
//                 if(elem.closest('.selector_container').find('.hover').hasClass('hover_hover')){
//                     save_hover = true;
//                 }
//             }

//             if(responsive_elem.hasClass('responsive_desktop_mobile')){
//                 if(save_hover){
//                     elem_data.elem_hover[key] = new_val;
//                     elem_data.elem_mobile_hover[key] = new_val;
//                 }else{
//                     if(is_hover){
//                         if(elem_data.elem[key] === elem_data.elem_hover[key]){
//                             elem_data.elem_hover[key] = new_val;
//                         }
//                         if(elem_data.elem_mobile[key] === elem_data.elem_mobile_hover[key]){
//                             elem_data.elem_mobile_hover[key] = new_val;
//                         }
//                     }
//                     elem_data.elem[key] = new_val;
//                     elem_data.elem_mobile[key] = new_val;
//                 }
//             }else if(responsive_elem.hasClass('responsive_desktop')){
//                 if(save_hover){
//                     elem_data.elem_hover[key] = new_val;
//                 }else{
//                     if(is_hover){
//                         if(elem_data.elem[key] === elem_data.elem_hover[key]){
//                             elem_data.elem_hover[key] = new_val;
//                         }
//                     }
//                     elem_data.elem[key] = new_val;
//                 }
//             }else if(responsive_elem.hasClass('responsive_mobile')){
//                 if(save_hover){
//                     elem_data.elem_mobile_hover[key] = new_val;
//                 }else{
//                     if(is_hover){
//                         if(elem_data.elem_mobile[key] === elem_data.elem_mobile_hover[key]){
//                             elem_data.elem_mobile_hover[key] = new_val;
//                         }
//                     }
//                     elem_data.elem_mobile[key] = new_val;
//                 }
//             }else{
//                 if(save_hover){
//                     elem_data.elem_hover[key] = new_val;
//                 }else{
//                     if(is_hover){
//                         if(elem_data.elem[key] === elem_data.elem_hover[key]){
//                             elem_data.elem_hover[key] = new_val;
//                         }
//                     }
//                     elem_data.elem[key] = new_val;
//                 }
//             }
//         }
//     })
//     if(responsive_elem.hasClass('responsive_desktop')){
//         if(window.current_view == 'mobile'){
//             desktop_view();
//         }
//     }else if(responsive_elem.hasClass('responsive_mobile')){
//         if(window.current_view == 'desktop'){
//             mobile_view();
//         }
//     }
// }


hidePopupSelectors = function(force = false){
    // console.log('hidePopupSelectors triggered')

    if($('.number_picker_units:hover').length == 0 && $('.number_picker_unit_select:hover').length == 0 || force){
        $('.number_picker_units').addClass('none')
        window.selected_number_picker = null;
    }
    if(
        $('.inputList_elems:hover').length == 0 &&
        $('.inputList_editor:hover').length == 0 &&
        !$('.inputList_elems').is(':focus') 
        || force
    ){
        $('.inputList_elems').addClass('none')
        window.selected_inputList = null;
    }

    $('.icons_browser').removeClass('icons_browser_show');

    if($('.font_style_selector_elems:hover').length == 0 && $('.font_style_selector_container:hover').length == 0 || force){
        $('.font_style_selector_elems').addClass('none')
    }

    $('.editing_edit_home_elem_editing').each(function(){
        if($(this).is(':hover') == false || force){
            let new_elem = create_html(get_elem_data($(this).attr('key_tree')).elem,$(this).attr('key_tree'));
            $(this).before($(new_elem).addClass('animated'));
            $(this).remove();

        }
    })

    if($('.add_elem_popup:hover').length == 0 && $('.section_add_elem_btn:hover').length == 0 || force){
        $('.add_elem_popup').addClass('none')
    }
    if($('.color_picker_editor_popup:hover').length == 0 && $('#clr-picker:hover').length == 0 && $('.color_picker_editor:hover').length == 0 || force){
        $('.color_picker_editor_popup').addClass('none')
        window.selected_color_picker_editor = null;
    }
    if(force){
        Coloris.close();
    }

}


let turbo_interval = null;
let turbo_level = 201;
turbo_interval_function = function(elem){
    turbo_interval = setInterval(()=>{
        elem.trigger('mousedown');
        if(turbo_level > 1){
            turbo_level = turbo_level - 10
            clearInterval(turbo_interval);
            turbo_interval_function(elem);
        }
    },turbo_level)
}
$('body').on('mousedown','.turbo',function(e){
    // e.stopImmediatePropagation();
    clearInterval(turbo_interval);
    turbo_interval_function($(this))
})
$('body').on('mouseup','.turbo',function(e){
    turbo_level = 201;
    clearInterval(turbo_interval);
})
$('body').on('mouseleave','.turbo',function(e){
    turbo_level = 201;
    clearInterval(turbo_interval);
})
//
$('body').on('click','.show_selector_details',function(e){
    if($(this).hasClass('show_selector_details_selected')){
        $(this).removeClass('show_selector_details_selected ico-arrowDown2').addClass('ico-arrowRight2');
        $(this).closest('.selector_container').find('.selector_details').addClass('selector_details_hidden');
        $(this).closest('.selector_container').find('.selector_no_details').removeClass('selector_noDetails_hidden')
    }else{
        $(this).addClass('show_selector_details_selected ico-arrowDown2').removeClass('ico-arrowRight2');
        $(this).closest('.selector_container').find('.selector_details').removeClass('selector_details_hidden');
        $(this).closest('.selector_container').find('.selector_no_details').addClass('selector_noDetails_hidden')
    }
})
//
$('body').on('click','.tab',function(){
    let tabs_container = $(this).closest('.tabs_container');
    tabs_container.find('.tab').removeClass('tab_selected');
    $(this).addClass('tab_selected');
    tabs_container.find('.tab').each(function(){
        $(`.tab_content[tab_content="${$(this).attr('tab')}"]`).addClass('none')
    })
    $(`.tab_content[tab_content="${$(this).attr('tab')}"]`).removeClass('none')
})
//
$('body').on('click','.editor_popup_group_title',function(){
    if($(this).closest('.editor_popup_group').hasClass('editor_popup_group_selected')){
        $(this).closest('.editor_popup_group').removeClass('editor_popup_group_selected');
        return;
    }
    $(this).closest('.editor_popup_groups').find('.editor_popup_group').removeClass('editor_popup_group_selected');
    $(this).closest('.editor_popup_group').addClass('editor_popup_group_selected')
})