//responsive selectors
require('./selectors/number_picker.js')//done
require('./selectors/select_box.js')//done
require('./selectors/select_range.js')//done
require('./selectors/padding_selector.js')//done
require('./selectors/margin_selector.js')//done
require('./selectors/border_radius_selector.js')//done
require('./selectors/transform_selector.js')//done
require('./selectors/iamge_position_selector.js')//done
require('./selectors/inputList.js')//done
require('./selectors/color_theme_picker.js')//done
require('./selectors/color_picker.js')//done
require('./selectors/switch_btn.js')//done
require('./selectors/select_box_border.js')//done
require('./selectors/drop_shadow_selector.js')//done
require('./selectors/backdrop_filter.js')//done
require('./selectors/text_shadow_selector.js')//done
require('./selectors/zindex_selector.js')//done
require('./selectors/opacity_selector.js')//done

//nonresponsive selectors
require('./selectors/font_style_selector.js')//done
require('./selectors/img_browser.js')//done
require('./selectors/icon_selector.js')//done
require('./selectors/elem_text_selector.js')//done
//



//tools
require('./selectors/editor_popup_show_container.js')
require('./selectors/responsive.js')

get_selector_val = function(selector){
    let selector_container = selector.closest('.selector_container')
    let key_tree = selector.attr('key_tree');
    let key = selector.attr('key')
    let elem_data = get_key_tree(key_tree);
    let val;
    if(selector_container.attr('is_responsive') == '1'){
        if(selector_container.find('.responsive').hasClass('responsive_desktop')){
            val = elem_data.elem[key]
        }else if(selector_container.find('.responsive').hasClass('responsive_mobile')){
            val = elem_data.elem_mobile[key]
        }else if(selector_container.find('.responsive').hasClass('responsive_desktop_mobile') ){
            if(elem_data.elem[key] === elem_data.elem_mobile[key]){
                val = elem_data.elem[key]
            }else{
                val = null;
            }
        }
    }else{
        val = elem_data.elem[key]
    }

    if(key_tree == 'home.0.children.section_wrapper.children.0.children.0.css'){
        // console.log(elem_val)
    }
    return val;
}
get_elem_val = function(elem_data,key_val,is_responsive){
    if(is_responsive == '1'){
        let responsive_class = '';
        let val = null;
        let val_desktop = elem_data.elem[key_val];
        let val_mobile = elem_data.elem_mobile[key_val];
        if(val_desktop == val_mobile){
            val = val_desktop;
            responsive_class = 'responsive_desktop_mobile'
        }else{
            if(window.current_view == 'mobile'){
                responsive_class = 'responsive_mobile'
                val = val_mobile;
            }else if(window.current_view == 'desktop'){
                responsive_class = 'responsive_desktop'
                val = val_desktop;
            }
        }
        return {
            val:val,
            val_desktop:val_desktop,
            val_mobile:val_mobile,
            responsive_class:responsive_class,
        }
    }else{
        return {
            val:elem_data.elem[key_val],
            val_desktop:null,
            val_mobile:null,
            responsive_class:''
        }
    }

}

set_elem_val = function(elem,new_val){
    let responsive_elem = elem.closest('.selector_container').find('.responsive');
    $.each(elem.closest('.selector')[0].attributes, function(index, attr) {
        if(/key_tree\d+$/.test(attr.name) || attr.name == 'key_tree'){
            let key_tree = attr.value;
            let key = elem.closest('.selector').attr(`key${attr.name.replace('key_tree','')}`);
            let elem_data = get_key_tree(key_tree);
            if(responsive_elem.hasClass('responsive_desktop_mobile')){
                elem_data.elem[key] = new_val;
                elem_data.elem_mobile[key] = new_val;
            }else if(responsive_elem.hasClass('responsive_desktop')){
                elem_data.elem[key] = new_val;
            }else if(responsive_elem.hasClass('responsive_mobile')){
                elem_data.elem_mobile[key] = new_val;
            }else{
                elem_data.elem[key] = new_val;
            }
        }
    })
    if(responsive_elem.hasClass('responsive_desktop')){
        if(window.current_view == 'mobile'){
            desktop_view();
        }
    }else if(responsive_elem.hasClass('responsive_mobile')){
        if(window.current_view == 'desktop'){
            mobile_view();
        }
    }
}


hidePopupSelectors = function(){
    // console.log('hidePopupSelectors triggered')

    if($('.color_theme_picker_themes:hover').length == 0 && $('.color_theme_picker_container:hover').length == 0){
        $('.color_theme_picker_themes').addClass('none')
        window.selected_color_theme_picker = null;
    }
    if($('.inputList_elems:hover').length == 0 && $('.inputList_container:hover').length == 0 && $('.inputList_container_no_action:hover').length == 0){
        $('.inputList_elems').addClass('none')
        window.selected_inputList = null;
    }

    $('.icons_browser').removeClass('icons_browser_show');

    if($('.font_style_selector_elems:hover').length == 0 && $('.font_style_selector_container:hover').length == 0){
        $('.font_style_selector_elems').addClass('none')
    }

    if($('.elem_text_selector_format_btn2:hover').length == 0 && $('.elem_text_selector_format_btn2_dropDown:hover').length == 0){
        $('.elem_text_selector_format_btn2_dropDown').addClass('none')
    }

    $('.editing_edit_home_elem_editing').each(function(){
        if($(this).is(':hover') == false){
            let new_elem = create_html(get_key_tree($(this).attr('key_tree')).elem,$(this).attr('key_tree'));
            $(this).before($(new_elem).addClass('animated'));
            $(this).remove();

        }
    })

    if($('.add_elem_popup:hover').length == 0 && $('.section_add_elem_btn:hover').length == 0){
        $('.add_elem_popup').addClass('none')
    }
}


$('body').on('click','.tab',function(e){
    // e.stopImmediatePropagation();
    $('.tab').removeClass('tab_selected');
    $(this).addClass('tab_selected')
    $('.tab_content').addClass('none');
    $(`.tab_content[tab_content="${$(this).attr('tab')}"]`).removeClass('none')
})

let turbo_interval = null;
let turbo_level = 201;
turbo_interval_function = function(elem){
    turbo_interval = setInterval(()=>{
        elem.trigger('click');
        if(turbo_level > 1){
            turbo_level = turbo_level - 40
            clearInterval(turbo_interval);
            turbo_interval_function(elem);
        }
    },turbo_level)
}
$('body').on('mousedown','.turbo',function(e){
    // e.stopImmediatePropagation();
    turbo_interval_function($(this))
})
$('body').on('mouseup','.turbo',function(e){
    // e.stopImmediatePropagation();
    turbo_level = 201;
    clearInterval(turbo_interval);
})
$('body').on('mouseleave','.turbo',function(e){
    // e.stopImmediatePropagation();
    turbo_level = 201;
    clearInterval(turbo_interval);
})
