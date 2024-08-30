require('./editors/animation/animation_editor.js')//
require('./editors/animation/animation_preview.js')//
require('./editors/img_browser/img_browser.js')//
require('./editors/img_browser/pexels.js')//
require('./editors/img_browser/user_storage.js')//
require('./editors/aspect_ratio_editor.js')//
require('./editors/backdrop_filter.js')//
require('./editors/background_filter.js')//
require('./editors/border_editor.js')//
require('./editors/box_shadow_editor.js')//
require('./editors/button_function.js')//
require('./editors/color_picker.js')//
require('./editors/filter.js')//
require('./editors/font_style_picker.js')//
require('./editors/four_number_pickers.js')//
require('./editors/gradient_editor.js')//
require('./editors/svg_icon_picker.js')//
require('./editors/image_position.js')//
require('./editors/inputList.js')//
require('./editors/number_picker.js')//
require('./editors/png_icon_selector.js')//
require('./editors/rename.js')//
require('./editors/select_box.js')//
require('./editors/select_range.js')//
require('./editors/switch_btn.js')//
require('./editors/timing_function.js')//
require('./editors/transform_editor.js')//
require('./editors/interactions_picker.js')//

//tools
require('./editors/editor_details.js')//not used yet
require('./editors/editor_popup_show_container.js')//
require('./editors/responsive.js')//
require('./editors/interactions.js')//


draw_editors_container = function(data){
    let editors_container;
    editors_container = $('<div/>',{class:`editors_container`,is_responsive:data.is_responsive ? '1' : '0',is_interactions:data.interactions ? '1' : '0'}).append(
        $('<div/>',{class:'mT5 mB10'}).append(
            data.is_responsive ? draw_responsive_selector() : '',
            data.interactions ? draw_interactions_selector(data.interactions) : '',
        ),
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
    if(editors_container.attr('is_interactions') == '1'){
        let variable_key2 = editors_container.find('.interaction_elem_selected').attr('key');
        if(variable_key2 != 'regular'){
            variable_key = `${variable_key}_${variable_key2}`
        }
    }
    let elem = get_element_data(key_tree);
    let val = get_element_val(elem,variable_key,key)
    if(is_responsive == '0'){
        return val.val;
    }else if(is_responsive == '1'){
        if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
            if(val.val === val.val_mobile || typeof(val.val_mobile) === 'undefined'){
                return val.val;
            }else{
                return '--';
            }
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
            return val.val;
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
            if(typeof(val.val_mobile) === 'undefined'){
                return val.val;
            }else{
                return val.val_mobile;
            }
        }
    }
}
set_val = function(editor,new_val){
    editor = editor.closest('.editor');
    let editors_container = editor.closest('.editors_container')
    let is_responsive = editors_container.attr('is_responsive');
    let key_tree = editor.attr('key_tree');
    let variable_key = editor.attr('variable_key');
    let key = editor.attr('key');
    if(editors_container.attr('is_interactions') == '1'){
        let variable_key2 = editors_container.find('.interaction_elem_selected').attr('key');
        if(variable_key2 != 'regular'){
            variable_key = `${variable_key}_${variable_key2}`
        }
    }
    let elem = get_element_data(key_tree);
    if(is_responsive == '0'){
        if(variable_key === undefined){
            elem[key] = new_val;
        }else{
            elem[variable_key][key] = new_val;
        }
        
    }else if(is_responsive == '1'){
        if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
            if(variable_key === undefined){
                elem[key] = new_val;
                elem[`${key}_mobile`] = new_val;
            }else{
                elem[variable_key][key] = new_val;
                elem[`${variable_key}_mobile`][key] = new_val;
            }

        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
            if(variable_key === undefined){
                if(typeof(elem[`${key}_mobile`]) === 'undefined'){
                    elem[`${key}_mobile`] = elem[key];
                }
                elem[variable_key][key] = new_val;
            }else{
                if(typeof(elem[`${variable_key}_mobile`][key]) === 'undefined'){
                    elem[`${variable_key}_mobile`][key] = elem[variable_key][key];
                }
                elem[variable_key][key] = new_val;
            }
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
            if(variable_key === undefined){
                elem[`${key}_mobile`] = new_val;
            }else{
                elem[`${variable_key}_mobile`][key] = new_val;
            }
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

hidePopupSelectors = function(force = false){
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