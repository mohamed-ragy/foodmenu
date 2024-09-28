generate_elems_style = function(elem){
    // if('children' in elem){
        generate_elem_style(elem);
        for(const key in elem.children){
            generate_elems_style(elem.children[key])
        }
    // }else{
    //     for(const key in elem.children){
    //         generate_elems_style(elem.children[key])
    //     }
    // }

}
generate_elem_style = function(elem){
    if(elem.class_selector === undefined){return;}
    remove_css_rule(`.${elem.class_selector}`)
    remove_css_rule(`.${elem.class_selector}_container`)
    remove_css_rule(`.${elem.class_selector}:hover`)
    remove_css_rule(`.${elem.class_selector}_container:hover`)
    remove_css_rule(`.${elem.class_selector}:focus`)
    remove_css_rule(`.${elem.class_selector}_container:focus`)
    remove_css_rule(`.${elem.class_selector}:disabled`)
    remove_css_rule(`.${elem.class_selector}_container:disabled`)
    remove_css_rule(`.${elem.class_selector}:active`)
    remove_css_rule(`.${elem.class_selector}_container:active`)
    remove_css_rule(`.${elem.class_selector}_error`)
    remove_css_rule(`.${elem.class_selector}_container_error`)
    remove_css_rule(`.${elem.class_selector}_selected`)
    remove_css_rule(`.${elem.class_selector}_selected`)
    let style_obj = {};
    for(const key in elem.css){
        let val = elem.css[key];
        style_obj[key] = val;
    }
    if('font_style' in elem){
        for(const key in elem.font_style){
            let font_name = elem.font_style[key];
            if(font_name != '' && !window.used_font_styles.includes(font_name)){
                window.used_font_styles.push(font_name)
            }
            if(font_name != '' && !window.loaded_fonts.includes(font_name)){
                load_font_style(font_name)
            }
        }
        if(window.preview_language in elem.font_style){
            if(elem.font_style[window.preview_language] !== ''){
                style_obj['font-family'] = elem.font_style[window.preview_language];
            }
        }
    }
    if(window.current_view == 'mobile'){
        for(const key in elem.css_mobile){
            style_obj[key] = elem.css_mobile[key];
        }
        if('background' in elem){set_background_style(elem.background,style_obj);}
        if('background_mobile' in elem){set_background_style(elem.background_mobile,style_obj);}
        if(elem.type == 'section' && elem.has_driver == '1'){style_obj[`padding-${elem.driver.position}`] = elem.driver.css_mobile.height}
        if(elem.type == 'section' && elem.sort == 0 && elem.attr.adapt_header == '1'){
            style_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
            if(elem.has_driver == '1' && elem.driver.position == 'top'){
                style_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css.height} + ${$('.website_header').outerHeight}px`;
            }else{
                style_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
            }
        }
    }else{
        if('background' in elem){set_background_style(elem.background,style_obj);}
        if(elem.type == 'section' && elem.has_driver == '1'){style_obj[`padding-${elem.driver.position}`] = elem.driver.css.height}
        if(elem.type == 'section' && elem.sort == 0 && elem.attr.adapt_header == '1'){
            style_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
            if(elem.has_driver == '1' && elem.driver.position == 'top'){
                style_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css_mobile.height} + ${$('.website_header').outerHeight}px`;
            }else{
                style_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
            }
        }
    }

    if('accessibility' in elem){
        if(elem.accessibility.includes('selected')){
            let style_obj_selected = {};
            for(const key in elem.css_selected){
                let val = elem.css_selected[key];
                style_obj_selected[key] = val;
            }
            if(window.current_view == 'mobile'){
                for(const key in elem.css_selected_mobile){
                    style_obj_selected[key] = elem.css_selected_mobile[key]
                }
                if('background_selected_mobile' in elem){
                    set_background_style(elem.background_selected_mobile,style_obj_selected)
                }
            }else{
                if('background_selected' in elem){
                    set_background_style(elem.background_selected,style_obj_selected);
                }
            }
            console.log(style_obj_selected)
            genrate_elem_style_class(elem,`.${elem.class_selector}_selected`,'',style_obj_selected);
            genrate_elem_style_class(elem,`.${elem.class_selector}_selected`,':focus',style_obj_selected);
            genrate_elem_style_class(elem,`.${elem.class_selector}_selected`,':hover',style_obj_selected);
            genrate_elem_style_class(elem,`.${elem.class_selector}_selected`,':active',style_obj_selected);
            genrate_elem_style_class(elem,`.${elem.class_selector}_selected`,':disabled',style_obj_selected);
        }
        if(elem.accessibility.includes('error')){
            let style_obj_error = {};
            for(const key in elem.css_error){
                let val = elem.css_error[key];
                style_obj_error[key] = val;
            }
            if(window.current_view == 'mobile'){
                for(const key in elem.css_error_mobile){
                    style_obj_error[key] = elem.css_error_mobile[key];
                }
                if('background_error_mobile' in elem){
                    set_background_style(elem.background_error_mobile,style_obj_error);
                }
            }else{
                if('background_error' in elem){
                    set_background_style(elem.background_error,style_obj_error);
                }
            }
            genrate_elem_style_class(elem,`.${elem.class_selector}_error`,'',style_obj_error);
            genrate_elem_style_class(elem,`.${elem.class_selector}_error`,':focus',style_obj_error);
            genrate_elem_style_class(elem,`.${elem.class_selector}_error`,':hover',style_obj_error);
            genrate_elem_style_class(elem,`.${elem.class_selector}_error`,':active',style_obj_error);
            genrate_elem_style_class(elem,`.${elem.class_selector}_error`,':disabled',style_obj_error);
        }
        if(elem.accessibility.includes('hyperlink')){
            genrate_elem_style_class(elem,`.${elem.class_selector}`,' a',{
                color:elem.css_hyperlink.color,
                'text-decoration':elem.css_hyperlink['text-decoration']
            });
            if(elem.accessibility.includes('hover')){
                genrate_elem_style_class(elem,`.${elem.class_selector}`,' a:hover',{
                    color:elem.css_hyperlink_hover.color,
                    'text-decoration':elem.css_hyperlink_hover['text-decoration']
                })
            }
        }
        if( elem.accessibility.includes('click') ){
            let style_obj_click = {};
            for(const key in elem.css_click){
                let val = elem.css_click[key];
                style_obj_click[key] = val;
            }
            if(window.current_view == 'mobile'){
                for(const key in elem.css_click_mobile){
                    style_obj_click[key] = elem.css_click_mobile[key];
                }
                if('background_click_mobile' in elem){
                    set_background_style(elem.background_click_mobile,style_obj_click);
                }
            }else{
                if('background_click' in elem){
                    set_background_style(elem.background_click,style_obj_click);
                }
            }
            genrate_elem_style_class(elem,`.${elem.class_selector}`,':active',style_obj_click);
        }
        if( elem.accessibility.includes('focus') ){
            let style_obj_focus = {};
            for(const key in elem.css_focus){
                let val = elem.css_focus[key];
                style_obj_focus[key] = val;
            }
            if(window.current_view == 'mobile'){
                for(const key in elem.css_focus_mobile){
                    style_obj_focus[key] = elem.css_focus_mobile[key];
                }
                if('background_focus_mobile' in elem){
                    set_background_style(elem.background_focus_mobile,style_obj_focus);
                }
            }else{
                if('background_focus' in elem){
                    set_background_style(elem.background_focus,style_obj_focus);
                }
            }
            genrate_elem_style_class(elem,`.${elem.class_selector}`,':focus',style_obj_focus);
        }
        if( elem.accessibility.includes('disabled') ){
            let style_obj_disabled = {};
            for(const key in elem.css_disabled){
                let val = elem.css_disabled[key];
                style_obj_disabled[key] = val;
            }
            if(window.current_view == 'mobile'){
                for(const key in elem.css_disabled_mobile){
                    style_obj_disabled[key] = elem.css_disabled_mobile[key];
                }
                if('background_disabled_mobile' in elem){
                    set_background_style(elem.background_disabled_mobile,style_obj_disabled);
                }
            }else{
                if('background_disabled' in elem){
                    set_background_style(elem.background_disabled,style_obj_disabled);
                }
            }
            genrate_elem_style_class(elem,`.${elem.class_selector}`,':disabled',style_obj_disabled);
        }
        if( elem.accessibility.includes('hover') ){
            let style_obj_hover = {};
            for(const key in elem.css_hover){
                let val = elem.css_hover[key];
                style_obj_hover[key] = val;
            }
            if(window.current_view == 'mobile'){
                for(const key in elem.css_hover_mobile){
                    style_obj_hover[key] = elem.css_hover_mobile[key];
                }
                if('background_hover_mobile' in elem){
                    set_background_style(elem.background_hover_mobile,style_obj_hover);
                }

            }else{
                if('background_hover' in elem){
                    set_background_style(elem.background_hover,style_obj_hover);
                }
            }
            genrate_elem_style_class(elem,`.${elem.class_selector}`,':hover',style_obj_hover);
        }
        for(const key in elem.children){
            let child = elem.children[key];
            if('accessibility' in child){
                if(child.accessibility.includes('can_parent_hover')){
                    // remove_css_rule(`.${elem.class_selector}:hover .${child.class_selector}`)
                    // remove_css_rule(`.${elem.class_selector}:hover .${child.class_selector}_container`)
                }
                if(child.accessibility.includes('parent_hover')){
                    let style_obj_parent_hover = {};
                    for(const key in child.css_hover){
                        let val = child.css_hover[key];
                        style_obj_parent_hover[key] = val;
                    }
                    if(window.current_view == 'mobile'){
                        for(const key in child.css_hover_mobile){
                            style_obj_parent_hover[key] = child.css_hover_mobile[key];
                        }
                        if('background_hover_mobile' in child){
                            set_background_style(child.background_hover_mobile,style_obj_parent_hover);
                        }
                    }else{
                        if('background_hover' in child){
                            set_background_style(child.background_hover,style_obj_parent_hover);
                        }
                    }
                    genrate_elem_style_class(child,`.${elem.class_selector}`,``,style_obj_parent_hover);
                    genrate_elem_style_class(child,`.${elem.class_selector}`,`:hover`,style_obj_parent_hover);
                }
            }
        }

    }
    if('css_placeholder' in elem){
        let style_obj_placeholder = {};
        for(const key in elem.css_placeholder){
            let val = elem.css_placeholder[key];
            style_obj_placeholder[key] = val;
        }
        if(window.current_view == 'mobile'){
            for(const key in elem.css_placeholder_mobile){
                style_obj_placeholder[key] = elem.css_placeholder_mobile[key];
            }
        }
        genrate_elem_style_class(elem,`.${elem.class_selector}`,'::placeholder',style_obj_placeholder)
    }
    genrate_elem_style_class(elem,`.${elem.class_selector}`,'',style_obj);

    if('css_children' in elem){
        for(const key in elem.css_children){
            apply_css_rule(`.${elem.class_selector} ${key}`,elem.css_children[key],elem.vars)
        }
    }
    if('keyframes' in elem){
        apply_css_keyframes_rule(elem.keyframes,elem.vars)
    }

}
genrate_elem_style_class = function(elem,selector,selector_prefix,style_obj){
    let style_container_obj = {};
    if(elem.type == 'section_block'){
        if('transform' in style_obj){style_container_obj['transform'] = style_obj['transform']; delete style_obj['transform']}
        if('transform-origin' in style_obj){style_container_obj['transform-origin'] = style_obj['transform-origin']; delete style_obj['transform-origin']}
        if('margin' in style_obj){style_container_obj['margin'] = style_obj['margin']; style_obj['margin'] = 'unset'}
        if('z-index' in style_obj){style_container_obj['z-index'] = style_obj['z-index'];style_obj['z-index'] = 'unset'}
        if('grid-area' in style_obj){style_container_obj['grid-area'] = style_obj['grid-area'];style_obj['grid-area'] = 'unset'}
        if('transition-duration' in style_obj){style_container_obj['transition-duration'] = style_obj['transition-duration'];}
        if('transition-delay' in style_obj){style_container_obj['transition-delay'] = style_obj['transition-delay'];}
        if('transition-timing-function' in style_obj){style_container_obj['transition-timing-function'] = style_obj['transition-timing-function'];}
        style_obj['width'] = '100%';
        style_obj['height'] = '100%';
    }else if(elem.type == 'elem' || elem.type == 'container' || elem.type == 'form_elements' || elem.type == 'form_element'){
        if('width' in style_obj){style_container_obj['width'] = style_obj['width']; style_obj['width'] = '100%'}
        if('height' in style_obj){style_container_obj['height'] = style_obj['height']; style_obj['height'] = '100%'}
        if('min-width' in style_obj){style_container_obj['min-width'] = style_obj['min-width']; delete style_obj['min-width']}
        if('max-width' in style_obj){style_container_obj['max-width'] = style_obj['max-width']; delete style_obj['max-width']}
        if('min-height' in style_obj){style_container_obj['min-height'] = style_obj['min-height']; delete style_obj['min-height']}
        if('max-height' in style_obj){style_container_obj['max-height'] = style_obj['max-height']; delete style_obj['max-height']}
        if('transform' in style_obj){style_container_obj['transform'] = style_obj['transform']; delete style_obj['transform']}
        if('transform-origin' in style_obj){style_container_obj['transform-origin'] = style_obj['transform-origin']; delete style_obj['transform-origin']}
        if('align-self' in style_obj){style_container_obj['align-self'] = style_obj['align-self']; delete style_obj['align-self']}
        if('margin' in style_obj){style_container_obj['margin'] = style_obj['margin']; style_obj['margin'] = 'unset'}
        if('z-index' in style_obj){style_container_obj['z-index'] = style_obj['z-index'];style_obj['z-index'] = 'unset'}
        if('transition-duration' in style_obj){style_container_obj['transition-duration'] = style_obj['transition-duration'];}
        if('transition-delay' in style_obj){style_container_obj['transition-delay'] = style_obj['transition-delay'];}
        if('position' in style_obj){style_container_obj['position'] = style_obj['position'];}
        if('inset' in style_obj){style_container_obj['inset'] = style_obj['inset'];}
        if('transition-timing-function' in style_obj){style_container_obj['transition-timing-function'] = style_obj['transition-timing-function'];}
        if('display' in style_obj){
            if(style_obj['display'] == 'none'){
                style_container_obj = {};
            }
        }
    }

    if('animation' in elem){
        if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
            delete style_obj['transform'];
            delete style_obj['filter'];
            delete style_obj['transform-origin'];
            delete style_obj['transition-duration'];
            delete style_obj['transition-delay'];
            delete style_obj['transition-timing-function'];
            delete style_container_obj['transform'];
            delete style_container_obj['filter'];
            delete style_container_obj['transform-origin'];
            delete style_container_obj['transition-duration'];
            delete style_container_obj['transition-delay'];
            delete style_container_obj['transition-timing-function'];
            
            if(window.current_view == 'desktop'){
                generate_elem_animation_classes(elem);
            }else if(window.current_view == 'mobile'){
                generate_elem_animation_classes(elem);
            }
        }
    }

    apply_css_rule(`${selector}${selector_prefix}`,style_obj,elem.vars)

    if(Object.keys(style_container_obj).length > 0){
        apply_css_rule(`${selector}_container${selector_prefix}`,style_container_obj,elem.vars)
    }
}
apply_css_rule = function(selector,style_obj,vars=null){
    let style = '';
    for(const key in style_obj){
        let val = style_obj[key];
        if(vars !== null && vars !== undefined){
            for(const key in vars){
                val = val.replaceAll(key,vars[key])
            }
        }
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(selector == '.popup_container' && key == 'position'){val = 'absolute';}
        if(val == 'dynamic' && key == 'position'){val = 'sticky'}

        if(key == 'max-width' || key == 'width' || key == 'min-width'){
            let margin_right = '0px';
            let margin_left = '0px';
            if(val != 'auto' && 'margin' in style_obj && style_obj['margin'] != 'unset' && style_obj['margin'] != 'auto'){
                let margin = style_obj['margin']
                if(vars !== null && vars !== undefined){
                    for(const key in vars){
                        margin = margin.replaceAll(key,vars[key])
                    }
                }
                margin = margin.split(' ');
                margin[1] !== 'auto' ? margin_right = margin[1] : null;
                margin[3] !== 'auto' ? margin_left = margin[3] : null;
                val = `calc(${val} - ${margin_right} - ${margin_left})`
            }
        }

        if(key == 'max-height' || key == 'height' || key == 'min-height'){
            let margin_top = '0px';
            let margin_bottom = '0px';
            if(val != 'auto' && 'margin' in style_obj && style_obj['margin'] != 'unset' && style_obj['margin'] != 'auto'){
                let margin = style_obj['margin']
                if(vars !== null && vars !== undefined){
                    for(const key in vars){
                        margin = margin.replaceAll(key,vars[key])
                    }
                }
                margin = margin.split(' ');
                margin[0] !== 'auto' ? margin_top = margin[0] : null;
                margin[2] !== 'auto' ? margin_bottom = margin[2] : null;
                val = `calc(${val} - ${margin_top} - ${margin_bottom})`
            }
            
            if(key == 'min-height' && 'margin-top' in style_obj && 'margin-bottom' in style_obj && val != 'auto'){
                val = `calc(${val} - ${style_obj['margin-top']} - ${style_obj['margin-bottom']})`
            }
        }
        

        style = `${style}${key}:${val};`
    }
    update_css_rule(selector,style)
}
apply_css_keyframes_rule = function(keyframes,vars){
    for(const key in keyframes){
        let keyframe_style = '';
        for(const key2 in keyframes[key]){
            let _keyframe_style = '';
            for(const key3 in keyframes[key][key2]){
                let val = keyframes[key][key2][key3];
                if(vars !== null && vars !== undefined){
                    for(const key in vars){
                        val = val.replaceAll(key,vars[key])
                    }
                }
                _keyframe_style = `${_keyframe_style}${key3}:${val};`
            }
            keyframe_style = `${keyframe_style}${key2}{${_keyframe_style}}`
        }
        update_css_rule(`@keyframes ${key}`,keyframe_style)
    }
}
remove_css_rule = function (selector) {
    var styleSheet = $('style')[0].sheet;
    var rules = styleSheet.cssRules || styleSheet.rules;

    // Convert the selector to a regular expression to match variations like pseudo-classes and child selectors
    var selectorRegex = new RegExp('^' + selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '(\\s|\\:|\\>|\\.|#|$)');

    // Loop through the rules from the end to the beginning to avoid skipping indexes
    for (var i = rules.length - 1; i >= 0; i--) {
        var rule = rules[i];

        // Handle standard CSS rules (including pseudo and child selectors)
        if (rule.selectorText && selectorRegex.test(rule.selectorText)) {
            styleSheet.deleteRule(i);
        }

        // Handle @keyframes rules (both prefixed and unprefixed)
        else if (rule.type === CSSRule.KEYFRAMES_RULE || rule.type === CSSRule.WEBKIT_KEYFRAMES_RULE) {
            if (rule.name === selector.replace(/@keyframes\s+/, "")) {
                styleSheet.deleteRule(i);
            }
        }
    }
}
update_css_rule = function(selector, newRule) {
    var styleSheet = $('style')[0].sheet;
    if (!styleSheet) return; // Ensure the stylesheet is loaded
    
    var rules = styleSheet.cssRules || styleSheet.rules;
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].type === CSSRule.KEYFRAMES_RULE && rules[i].name === selector.replace('@keyframes ', '')) {
            remove_css_rule(selector);
            styleSheet.insertRule('@keyframes ' + selector.replace('@keyframes ', '') + ' { ' + newRule + ' }', i); // Insert the new @keyframes rule
            return; // Exit after updating
        }
        if (rules[i].selectorText === selector) {
            remove_css_rule(selector);
            styleSheet.insertRule(selector + ' { ' + newRule + ' }', i); // Insert the new rule
            return; // Exit after updating
        }
    }
    // If the rule doesn't exist, add it
    styleSheet.insertRule(selector + ' { ' + newRule + ' }');
}
check_css_rule = function(selector) {
    var styleSheet = $('style')[0].sheet;
    if (!styleSheet) return false; // Ensure the stylesheet is loaded
    
    var rules = styleSheet.cssRules || styleSheet.rules;
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === selector) {
            return true; // Rule exists
        }
    }
    return false; // Rule does not exist
}
get_css_rule = function(selector) {
    var styleSheetList = document.styleSheets;

    for (var i = 0; i < styleSheetList.length; i++) {
        var styleSheet = styleSheetList[i];
        var rules = styleSheet.cssRules || styleSheet.rules;

        for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (rule.selectorText === selector) {
                return rule.cssText; // Return the entire CSS rule as a string
            }
        }
    }
    return null; // Return null if the selector is not found
};
get_css_rule_value = function(selector) {
    var styleSheetList = document.styleSheets;

    for (var i = 0; i < styleSheetList.length; i++) {
        var styleSheet = styleSheetList[i];
        var rules = styleSheet.cssRules || styleSheet.rules;

        for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (rule.selectorText === selector) {
                return rule.style.cssText; // Return only the properties and values
            }
        }
    }
    return null; // Return null if the selector is not found
};

set_background_style = function(background,style_obj){
    if(background.type == 'none'){
        style_obj['background'] = 'none';
    }else if(background.type == 'color'){
        style_obj['background'] = background.color;
    }else if(background.type == 'gradient'){
        style_obj['background'] = background.gradient;
    }else if(background.type == 'backdrop_filter'){
        style_obj['background-color'] = background.backdrop_filter_color;
        style_obj['backdrop-filter'] = background.backdrop_filter;
    }else if(background.type == 'image'){
        style_obj['background-image'] = `url('${background.background_image}')`
        style_obj['background-size'] = background.background_size;
        style_obj['background-attachment'] = background.background_attachment;
        style_obj['background-repeat'] = background.background_repeat;
        style_obj['background-position'] = background.background_position;
        style_obj['background-blend-mode'] = background.background_blend_mode;
        style_obj['background-color'] = background.background_blend_mode_color;
    }
}
generate_elem_animation_classes = function(elem){
    let animation;
    window.current_view == 'desktop' ? animation = elem.animation : window.current_view == 'mobile' ? animation = elem.animation_mobile : null;
    
    apply_css_rule(`.${elem.class_selector}_animation_up_out`,{
        'transition-duration':animation.up_out_duration,
        'transition-delay':animation.up_out_delay,
        'transition-timing-function':animation.up_out_timing_function,
        'transform':animation.up_out_transform,
        'transform-origin':animation.up_out_transform_origin,
        'filter':animation.up_out_filter,
    })

    apply_css_rule(`.${elem.class_selector}_animation_up`,{
        'transition-duration':animation.up_duration,
        'transition-delay':animation.up_delay,
        'transition-timing-function':animation.up_timing_function,
        'transform':animation.up_transform,
        'transform-origin':animation.up_transform_origin,
        'filter':animation.up_filter,
    })

    apply_css_rule(`.${elem.class_selector}_animation_in`,{
        'transition-duration':animation.in_duration,
        'transition-delay':animation.in_delay,
        'transition-timing-function':animation.in_timing_function,
        'transform':animation.in_transform,
        'transform-origin':animation.in_transform_origin,
        'filter':animation.in_filter,
    })
    
    apply_css_rule(`.${elem.class_selector}_animation_down`,{
        'transition-duration':animation.down_duration,
        'transition-delay':animation.down_delay,
        'transition-timing-function':animation.down_timing_function,
        'transform':animation.down_transform,
        'transform-origin':animation.down_transform_origin,
        'filter':animation.down_filter,
    })

    apply_css_rule(`.${elem.class_selector}_animation_down_out`,{
        'transition-duration':animation.down_out_duration,
        'transition-delay':animation.down_out_delay,
        'transition-timing-function':animation.down_out_timing_function,
        'transform':animation.down_out_transform,
        'transform-origin':animation.down_out_transform_origin,
        'filter':animation.down_out_filter,
    })
}