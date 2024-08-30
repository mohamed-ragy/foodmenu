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
    remove_css_rule(`.${elem.class_selector}:active`)
    remove_css_rule(`.${elem.class_selector}_container:active`)
    remove_css_rule(`.${elem.class_selector}:disabled`)
    remove_css_rule(`.${elem.class_selector}_container:disabled`)
    remove_css_rule(`.${elem.class_selector}:focus`)
    remove_css_rule(`.${elem.class_selector}_container:focus`)
    let style_obj = {};
    let style_obj_hover = {};
    
    for(const key in elem.css){
        let val = elem.css[key];
        if('animation' in elem){
            if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
                if(key == 'transform-origin'){val = 'unset'}
                if(key == 'transform'){val = 'unset'}
                if(key == 'filter'){val = 'unset'}
            }
        }
        style_obj[key] = val;
    }
    if('font_style' in elem){
        if(typeof(elem.font_style) === 'object'){
            if(window.preview_language in elem.font_style){
                style_obj['font-family'] = elem.font_style[window.preview_language];
            }
        }
    }
    if(window.current_view == 'mobile'){
        for(const key in elem.css_mobile){
            style_obj[key] = elem.css_mobile[key];
        }
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

    genrate_elem_style_class(elem,`.${elem.class_selector}`,'',style_obj);
    if('accessibility' in elem){
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
                    remove_css_rule(`.${elem.class_selector}:hover .${child.class_selector}`)
                    remove_css_rule(`.${elem.class_selector}:hover .${child.class_selector}_container`)
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
                    genrate_elem_style_class(child,`.${elem.class_selector}:hover .${child.class_selector}`,``,style_obj_parent_hover);
                }
            }
        }

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
        if('transition-timing-function' in style_obj){style_container_obj['transition-timing-function'] = style_obj['transition-timing-function'];style_obj['transition-timing-function'] = 'unset'}
        style_obj['width'] = '100%';
        style_obj['height'] = '100%';
    }else if(elem.type == 'elem' || elem.type == 'container'){
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
        if('transition-timing-function' in style_obj){style_container_obj['transition-timing-function'] = style_obj['transition-timing-function'];style_obj['transition-timing-function'] = 'unset'}
    }
    apply_css_rule(`${selector}${selector_prefix}`,style_obj)
    if(Object.keys(style_container_obj).length > 0){
        apply_css_rule(`${selector}_container${selector_prefix}`,style_container_obj)
    }
}
apply_css_rule = function(selector,style_obj){
    let style = '';
    for(const key in style_obj){
        let val = style_obj[key];
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(val == 'fixed' && key == 'position'){val = 'absolute'}

        if(key == 'max-width' || key == 'width' || key == 'min-width'){
            let margin_right = '0px';
            let margin_left = '0px';
            if(val.includes('%') && style_obj['margin'] != 'unset'){
                try{
                    let margin = style_obj['margin'].split(' ');
                    margin_right = margin[1];
                    margin_left = margin[3];
                }catch{}
                val = `calc(${val} - ${margin_right} - ${margin_left})`
            }
        }

        if(key == 'max-height' || key == 'height' || key == 'min-height'){
            let margin_top = '0px';
            let margin_bottom = '0px';
            if(val.includes('%') && style_obj['margin'] != 'unset'){
                try{
                    let margin = style_obj['margin'].split(' ');
                    margin_top = margin[0];
                    margin_bottom = margin[2];
                }catch{}
                val = `calc(${val} - ${margin_top} - ${margin_bottom})`
            }
        }

        style = `${style}${key}:${val};`
    }
    update_css_rule(selector,style)
}
remove_css_rule = function (selector) {
    var styleSheet = $('style')[0].sheet;
    var rules = styleSheet.cssRules || styleSheet.rules;
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === selector) {
            styleSheet.deleteRule(i);
            return;
        }
    }
}
update_css_rule = function(selector, newRule) {
    var styleSheet = $('style')[0].sheet;
    if (!styleSheet) return; // Ensure the stylesheet is loaded
    
    var rules = styleSheet.cssRules || styleSheet.rules;
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === selector) {
            styleSheet.deleteRule(i); // Remove the existing rule
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
generate_style = function(elem){
    return;
    let style_desktop_obj = {};
    let style_mobile_obj = {};

    let desktop = '';
    let desktop_container = '';
    let mobile = '';
    let mobile_container = '';

    // for(let key in elem.css){
    //     let val = elem.css[key];
    //     if(val == '100vh'){val = 'calc(100vh - 40px)'}
    //     if(elem.type == 'popup_window'){
    //         if(val == 'fixed' && key == 'position'){
    //             val = 'absolute'
    //         }
    //     }
    //     if('animation' in elem){
    //         if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
    //             if(key == 'transform'){
    //                 val = 'unset'
    //             }
    //             if(key == 'filter'){
    //                 val = 'unset'
    //             }
    //         }
    //     }
    //     style_desktop_obj[key] = val;
    // }
    // if('background' in elem){
    //    set_background_style(elem.background,style_desktop_obj);
    // }
    // if('font_style' in elem){
    //     if(typeof(elem.font_style) === 'object'){
    //         if(window.preview_language in elem.font_style){
    //             style_desktop_obj['font-family'] = elem.font_style[window.preview_language];
    //         }
    //     }
    // }

    //
    // style_mobile_obj = JSON.parse(JSON.stringify(style_desktop_obj));
    // for(let key in elem.css_mobile){
    //     let val = elem.css_mobile[key];
    //     if(val == '100vh'){val = 'calc(100vh - 40px)'}
    //     if(elem.type == 'popup_window'){
    //         if(val == 'fixed' && key == 'position'){
    //             val = 'absolute'
    //         }
    //     }
    //     if('animation' in elem){
    //         if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
    //             if(key == 'transform'){
    //                 val = 'unset'
    //             }
    //             if(key == 'filter'){
    //                 val = 'unset'
    //             }
    //         }
    //     }
    //     style_mobile_obj[key] = val;
    // }
    // if('background_mobile' in elem){
    //     set_background_style(elem.background_mobile,style_mobile_obj);
    // }

    //

    // if(elem.type == 'section' && elem.has_driver == '1'){
    //     style_desktop_obj[`padding-${elem.driver.position}`] = elem.driver.css.height;
    //     style_mobile_obj[`padding-${elem.driver.position}`] = elem.driver.css_mobile.height;
    // }
    // if(elem.type == 'section' && elem.sort == 0 && elem.attr.adapt_header == '1'){
        // style_desktop_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
        // style_mobile_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
        // if(elem.has_driver == '1' && elem.driver.position == 'top'){
        //     style_desktop_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css.height} + ${$('.website_header').outerHeight}px`;
        //     style_mobile_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css_mobile.height} + ${$('.website_header').outerHeight}px`;
        // }else{
        //     style_desktop_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
        //     style_mobile_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
        // }

    // }
    //

    if('animation' in elem){
        if(elem.animation.name != 'no_animation'){
            style_desktop_obj['filter'] = elem.animation.in_filter;
            style_desktop_obj['transform'] = elem.animation.in_transform;
            style_desktop_obj['transform-origin'] = elem.animation.in_transform_origin;
        }
        if(elem.animation_mobile.name != 'no_animation'){
            style_mobile_obj['filter'] = elem.animation_mobile.in_filter;
            style_mobile_obj['transform'] = elem.animation_mobile.in_transform;
            style_mobile_obj['transform-origin'] = elem.animation_mobile.in_transform_origin;
        }
    }

    //

    if(style_desktop_obj['display'] == 'none'){
        style_desktop_obj = {display:'none'};
    }
    if(style_mobile_obj['display'] == 'none'){
        style_mobile_obj = {display:'none'};
    }





    if(elem.type == 'elem' || elem.type == 'container'){
        // desktop_container = `${desktop_container}height:${style_desktop_obj['height']};`
        // mobile_container = `${mobile_container}height:${style_mobile_obj['height']};`

        // desktop_container = `${desktop_container}max-height:${style_desktop_obj['max-height']};`
        // mobile_container = `${mobile_container}max-height:${style_mobile_obj['max-height']};`

        // desktop_container = `${desktop_container}min-height:${style_desktop_obj['min-height']};`
        // mobile_container = `${mobile_container}min-height:${style_mobile_obj['min-height']};`

        // desktop_container = `${desktop_container}width:${style_desktop_obj['width']};`
        // mobile_container = `${mobile_container}width:${style_mobile_obj['width']};`

        // desktop_container = `${desktop_container}max-width:${style_desktop_obj['max-width']};`
        // mobile_container = `${mobile_container}max-width:${style_mobile_obj['max-width']};`

        // desktop_container = `${desktop_container}min-width:${style_desktop_obj['min-width']};`
        // mobile_container = `${mobile_container}min-width:${style_mobile_obj['min-width']};`

        // desktop_container = `${desktop_container}transform:${style_desktop_obj['transform']};`
        // mobile_container = `${mobile_container}transform:${style_mobile_obj['transform']};`

        // desktop_container = `${desktop_container}transform-origin:${style_desktop_obj['transform-origin']};`
        // mobile_container = `${mobile_container}transform-origin:${style_mobile_obj['transform-origin']};`

        // desktop_container = `${desktop_container}margin:${style_desktop_obj['margin']};`
        // mobile_container = `${mobile_container}margin:${style_mobile_obj['margin']};`

        // desktop_container = `${desktop_container}align-self:${style_desktop_obj['align-self']};`
        // mobile_container = `${mobile_container}align-self:${style_mobile_obj['align-self']};`
    
        // desktop_container = `${desktop_container}z-index:${style_desktop_obj['z-index']};`
        // mobile_container = `${mobile_container}z-index:${style_mobile_obj['z-index']};`

        // desktop_container = `${desktop_container}transition-duration:${style_desktop_obj['transition-duration']};`
        // mobile_container = `${mobile_container}transition-duration:${style_mobile_obj['transition-duration']};`

        // desktop_container = `${desktop_container}transition-delay:${style_desktop_obj['transition-delay']};`
        // mobile_container = `${mobile_container}transition-delay:${style_mobile_obj['transition-delay']};`


        // desktop_container = `${desktop_container}transition-timing-function:${style_desktop_obj['transition-timing-function']};`
        // mobile_container = `${mobile_container}transition-timing-function:${style_mobile_obj['transition-timing-function']};`


        // delete style_desktop_obj['transform']
        // delete style_mobile_obj['transform']

        // delete style_desktop_obj['transform-origin']
        // delete style_mobile_obj['transform-origin']

        // delete style_desktop_obj['max-width']
        // delete style_mobile_obj['max-width']

        // delete style_desktop_obj['min-width']
        // delete style_mobile_obj['min-width']

        // delete style_desktop_obj['max-height']
        // delete style_mobile_obj['max-height']

        // delete style_desktop_obj['min-height']
        // delete style_mobile_obj['min-height']

        // delete style_desktop_obj['align-self']
        // delete style_mobile_obj['align-self']

        // style_desktop_obj['margin'] = 'unset';
        // style_mobile_obj['margin'] = 'unset';

        // style_desktop_obj['width'] = '100%';
        // style_mobile_obj['width'] = '100%';

        // style_desktop_obj['height'] = '100%';
        // style_mobile_obj['height'] = '100%';

        // style_desktop_obj['transition-delay'] = '0ms';
        // style_mobile_obj['transition-delay'] = '0ms';
        
        // style_desktop_obj['transition-duration'] = '0ms';
        // style_mobile_obj['transition-duration'] = '0ms';
    }
    if(elem.type == 'section_block'){
        // desktop_container = `${desktop_container}transform:${style_desktop_obj['transform']};`
        // mobile_container = `${mobile_container}transform:${style_mobile_obj['transform']};`

        // desktop_container = `${desktop_container}transform-origin:${style_desktop_obj['transform-origin']};`
        // mobile_container = `${mobile_container}transform-origin:${style_mobile_obj['transform-origin']};`

        // desktop_container = `${desktop_container}margin:${style_desktop_obj['margin']};`
        // mobile_container = `${mobile_container}margin:${style_mobile_obj['margin']};`

        // desktop_container = `${desktop_container}z-index:${style_desktop_obj['z-index']};`
        // mobile_container = `${mobile_container}z-index:${style_mobile_obj['z-index']};`

        // desktop_container = `${desktop_container}grid-area:${style_desktop_obj['grid-area']};`
        // mobile_container = `${mobile_container}grid-area:${style_mobile_obj['grid-area']};`

        // desktop_container = `${desktop_container}transition-duration:${style_desktop_obj['transition-duration']};`
        // mobile_container = `${mobile_container}transition-duration:${style_mobile_obj['transition-duration']};`

        // desktop_container = `${desktop_container}transition-delay:${style_desktop_obj['transition-delay']};`
        // mobile_container = `${mobile_container}transition-delay:${style_mobile_obj['transition-delay']};`


        // desktop_container = `${desktop_container}transition-timing-function:${style_desktop_obj['transition-timing-function']};`
        // mobile_container = `${mobile_container}transition-timing-function:${style_mobile_obj['transition-timing-function']};`

        // delete style_desktop_obj['transform']
        // delete style_mobile_obj['transform']

        // delete style_desktop_obj['transform-origin']
        // delete style_mobile_obj['transform-origin']

        // style_desktop_obj['margin'] = 'unset';
        // style_mobile_obj['margin'] = 'unset';

        // style_desktop_obj['width'] = '100%';
        // style_mobile_obj['width'] = '100%';

        // style_desktop_obj['height'] = '100%';
        // style_mobile_obj['height'] = '100%';

        // style_desktop_obj['transition-delay'] = '0ms';
        // style_mobile_obj['transition-delay'] = '0ms';
        
        // style_desktop_obj['transition-duration'] = '0ms';
        // style_mobile_obj['transition-duration'] = '0ms';
    }


    for(const key in style_desktop_obj){
        desktop = `${desktop}${key}:${style_desktop_obj[key]};`
    }
    for(const key in style_mobile_obj){
        mobile = `${mobile}${key}:${style_mobile_obj[key]};`
    }
    // remove_css_rule(`.${elem.class_selector}`)
    if(check_css_rule(`.${elem.class_selector}`)){
        update_css_rule(`.${elem.class_selector}`,desktop)
    }else{
        $('style').append(`.${elem.class_selector}{${desktop}}`)
    }
    return {
        desktop:desktop,
        mobile:mobile,
        desktop_container:desktop_container,
        mobile_container:mobile_container,
    }
}

set_background_style = function(background,style_obj){
    if(background.type == 'none'){

    }else if(background.type == 'color'){
        style_obj['background-color'] = background.color;
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
