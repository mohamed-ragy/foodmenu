generate_style = function(elem){
    let style_desktop_obj = {};
    let style_mobile_obj = {};

    let desktop = '';
    let desktop_container = '';
    let mobile = '';
    let mobile_container = '';

    for(let key in elem.css){
        let val = elem.css[key];
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(elem.type == 'popup_window'){
            if(val == 'fixed' && key == 'position'){
                val = 'absolute'
            }
        }
        if('animation' in elem){
            if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
                if(key == 'transform'){
                    val = 'unset'
                }
                if(key == 'filter'){
                    val = 'unset'
                }
            }
        }
        style_desktop_obj[key] = val;
    }
    if('background' in elem){
       set_background_style(elem.background,style_desktop_obj);
            // if(elem.background.type == 'none'){
            //     style_desktop_obj['background-color'] = 'unset';
            // }else if(elem.background.type == 'color'){
            //     style_desktop_obj['background-color'] = elem.background.color;
            // }else if(elem.background.type == 'gradient'){
            //     style_desktop_obj['background'] = elem.background.gradient;
            // }else if(elem.background.type == 'backdrop_filter'){
            //     style_desktop_obj['background-color'] = elem.background.backdrop_filter_color;
            //     style_desktop_obj['backdrop-filter'] = elem.background.backdrop_filter;

            // }else if(elem.background.type == 'image'){
            //     style_desktop_obj['background-image'] = `url('${elem.background.background_image}')`
            //     style_desktop_obj['background-size'] = elem.background.background_size;
            //     style_desktop_obj['background-attachment'] = elem.background.background_attachment;
            //     style_desktop_obj['background-repeat'] = elem.background.background_repeat;
            //     style_desktop_obj['background-position'] = elem.background.background_position;
            //     style_desktop_obj['background-blend-mode'] = elem.background.background_blend_mode;
            //     style_desktop_obj['background-color'] = elem.background.background_blend_mode_color;
            // }
    }
    if('font_style' in elem){
        if(typeof(elem.font_style) === 'object'){
            if(window.preview_language in elem.font_style){
                style_desktop_obj['font-family'] = elem.font_style[window.preview_language];
            }
        }
    }

    //
    style_mobile_obj = JSON.parse(JSON.stringify(style_desktop_obj));
    for(let key in elem.css_mobile){
        let val = elem.css_mobile[key];
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(elem.type == 'popup_window'){
            if(val == 'fixed' && key == 'position'){
                val = 'absolute'
            }
        }
        if('animation' in elem){
            if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
                if(key == 'transform'){
                    val = 'unset'
                }
                if(key == 'filter'){
                    val = 'unset'
                }
            }
        }
        style_mobile_obj[key] = val;
    }
    if('background_mobile' in elem){
        set_background_style(elem.background_mobile,style_mobile_obj);
        // if(elem.background_mobile.type == 'none'){
        //     style_mobile_obj['background-color'] = 'unset';
        //     style_mobile_obj['background-image'] = `unset`
        //     style_mobile_obj['background-size'] = `unset`
        //     style_mobile_obj['background-attachment'] = `unset`
        //     style_mobile_obj['background-repeat'] = `unset`
        //     style_mobile_obj['background-position'] = `unset`
        //     style_mobile_obj['background-blend-mode'] = `unset`
        // }else if(elem.background_mobile.type == 'color'){
        //     style_mobile_obj['background-color'] = elem.background_mobile.color;
        //     style_mobile_obj['background-image'] = `unset`
        //     style_mobile_obj['background-size'] = `unset`
        //     style_mobile_obj['background-attachment'] = `unset`
        //     style_mobile_obj['background-repeat'] = `unset`
        //     style_mobile_obj['background-position'] = `unset`
        //     style_mobile_obj['background-blend-mode'] = `unset`
        // }else if(elem.background_mobile.type == 'gradient'){
        //     style_mobile_obj['background'] = elem.background_mobile.gradient;
        //     style_mobile_obj['background-image'] = `unset`
        //     style_mobile_obj['background-size'] = `unset`
        //     style_mobile_obj['background-attachment'] = `unset`
        //     style_mobile_obj['background-repeat'] = `unset`
        //     style_mobile_obj['background-position'] = `unset`
        //     style_mobile_obj['background-blend-mode'] = `unset`
        // }else if(elem.background_mobile.type == 'backdrop_filter'){
        //     style_mobile_obj['background-color'] = elem.background_mobile.backdrop_filter_color;
        //     style_mobile_obj['backdrop-filter'] = elem.background_mobile.backdrop_filter;
        //     style_mobile_obj['background-image'] = `unset`
        //     style_mobile_obj['background-size'] = `unset`
        //     style_mobile_obj['background-attachment'] = `unset`
        //     style_mobile_obj['background-repeat'] = `unset`
        //     style_mobile_obj['background-position'] = `unset`
        //     style_mobile_obj['background-blend-mode'] = `unset`

        // }else if(elem.background_mobile.type == 'image'){
        //     style_mobile_obj['background-image'] = `url('${elem.background_mobile.background_image}')`
        //     style_mobile_obj['background-size'] = elem.background_mobile.background_size;
        //     style_mobile_obj['background-attachment'] = elem.background_mobile.background_attachment;
        //     style_mobile_obj['background-repeat'] = elem.background_mobile.background_repeat;
        //     style_mobile_obj['background-position'] = elem.background_mobile.background_position;
        //     style_mobile_obj['background-blend-mode'] = elem.background_mobile.background_blend_mode;
        //     style_mobile_obj['background-color'] = elem.background_mobile.background_blend_mode_color;
        // }
    }

    //

    if(elem.type == 'section' && elem.has_driver == '1'){
        style_desktop_obj[`padding-${elem.driver.position}`] = elem.driver.css.height;
        style_mobile_obj[`padding-${elem.driver.position}`] = elem.driver.css_mobile.height;
    }
    if(elem.type == 'section' && elem.sort == 0 && elem.attr.adapt_header == '1'){
        style_desktop_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
        style_mobile_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
        if(elem.has_driver == '1' && elem.driver.position == 'top'){
            style_desktop_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css.height} + ${$('.website_header').outerHeight}px`;
            style_mobile_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css_mobile.height} + ${$('.website_header').outerHeight}px`;
        }else{
            style_desktop_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
            style_mobile_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
        }

    }
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
        desktop_container = `${desktop_container}height:${style_desktop_obj['height']};`
        mobile_container = `${mobile_container}height:${style_mobile_obj['height']};`

        desktop_container = `${desktop_container}max-height:${style_desktop_obj['max-height']};`
        mobile_container = `${mobile_container}max-height:${style_mobile_obj['max-height']};`

        desktop_container = `${desktop_container}min-height:${style_desktop_obj['min-height']};`
        mobile_container = `${mobile_container}min-height:${style_mobile_obj['min-height']};`

        desktop_container = `${desktop_container}width:${style_desktop_obj['width']};`
        mobile_container = `${mobile_container}width:${style_mobile_obj['width']};`

        desktop_container = `${desktop_container}max-width:${style_desktop_obj['max-width']};`
        mobile_container = `${mobile_container}max-width:${style_mobile_obj['max-width']};`

        desktop_container = `${desktop_container}min-width:${style_desktop_obj['min-width']};`
        mobile_container = `${mobile_container}min-width:${style_mobile_obj['min-width']};`

        desktop_container = `${desktop_container}transform:${style_desktop_obj['transform']};`
        mobile_container = `${mobile_container}transform:${style_mobile_obj['transform']};`

        desktop_container = `${desktop_container}transform-origin:${style_desktop_obj['transform-origin']};`
        mobile_container = `${mobile_container}transform-origin:${style_mobile_obj['transform-origin']};`

        desktop_container = `${desktop_container}margin:${style_desktop_obj['margin']};`
        mobile_container = `${mobile_container}margin:${style_mobile_obj['margin']};`

        desktop_container = `${desktop_container}align-self:${style_desktop_obj['align-self']};`
        mobile_container = `${mobile_container}align-self:${style_mobile_obj['align-self']};`
    
        desktop_container = `${desktop_container}z-index:${style_desktop_obj['z-index']};`
        mobile_container = `${mobile_container}z-index:${style_mobile_obj['z-index']};`

        desktop_container = `${desktop_container}transition-duration:${style_desktop_obj['transition-duration']};`
        mobile_container = `${mobile_container}transition-duration:${style_mobile_obj['transition-duration']};`

        desktop_container = `${desktop_container}transition-delay:${style_desktop_obj['transition-delay']};`
        mobile_container = `${mobile_container}transition-delay:${style_mobile_obj['transition-delay']};`


        desktop_container = `${desktop_container}transition-timing-function:${style_desktop_obj['transition-timing-function']};`
        mobile_container = `${mobile_container}transition-timing-function:${style_mobile_obj['transition-timing-function']};`


        delete style_desktop_obj['transform']
        delete style_mobile_obj['transform']

        delete style_desktop_obj['transform-origin']
        delete style_mobile_obj['transform-origin']

        delete style_desktop_obj['max-width']
        delete style_mobile_obj['max-width']

        delete style_desktop_obj['min-width']
        delete style_mobile_obj['min-width']

        delete style_desktop_obj['max-height']
        delete style_mobile_obj['max-height']

        delete style_desktop_obj['min-height']
        delete style_mobile_obj['min-height']

        delete style_desktop_obj['align-self']
        delete style_mobile_obj['align-self']

        style_desktop_obj['margin'] = 'unset';
        style_mobile_obj['margin'] = 'unset';

        style_desktop_obj['width'] = '100%';
        style_mobile_obj['width'] = '100%';

        style_desktop_obj['height'] = '100%';
        style_mobile_obj['height'] = '100%';

        style_desktop_obj['transition-delay'] = '0ms';
        style_mobile_obj['transition-delay'] = '0ms';
        
        style_desktop_obj['transition-duration'] = '0ms';
        style_mobile_obj['transition-duration'] = '0ms';
    }
    if(elem.type == 'section_block'){
        desktop_container = `${desktop_container}transform:${style_desktop_obj['transform']};`
        mobile_container = `${mobile_container}transform:${style_mobile_obj['transform']};`

        desktop_container = `${desktop_container}transform-origin:${style_desktop_obj['transform-origin']};`
        mobile_container = `${mobile_container}transform-origin:${style_mobile_obj['transform-origin']};`

        desktop_container = `${desktop_container}margin:${style_desktop_obj['margin']};`
        mobile_container = `${mobile_container}margin:${style_mobile_obj['margin']};`

        desktop_container = `${desktop_container}z-index:${style_desktop_obj['z-index']};`
        mobile_container = `${mobile_container}z-index:${style_mobile_obj['z-index']};`

        desktop_container = `${desktop_container}grid-area:${style_desktop_obj['grid-area']};`
        mobile_container = `${mobile_container}grid-area:${style_mobile_obj['grid-area']};`

        desktop_container = `${desktop_container}transition-duration:${style_desktop_obj['transition-duration']};`
        mobile_container = `${mobile_container}transition-duration:${style_mobile_obj['transition-duration']};`

        desktop_container = `${desktop_container}transition-delay:${style_desktop_obj['transition-delay']};`
        mobile_container = `${mobile_container}transition-delay:${style_mobile_obj['transition-delay']};`


        desktop_container = `${desktop_container}transition-timing-function:${style_desktop_obj['transition-timing-function']};`
        mobile_container = `${mobile_container}transition-timing-function:${style_mobile_obj['transition-timing-function']};`

        delete style_desktop_obj['transform']
        delete style_mobile_obj['transform']

        delete style_desktop_obj['transform-origin']
        delete style_mobile_obj['transform-origin']

        style_desktop_obj['margin'] = 'unset';
        style_mobile_obj['margin'] = 'unset';

        style_desktop_obj['width'] = '100%';
        style_mobile_obj['width'] = '100%';

        style_desktop_obj['height'] = '100%';
        style_mobile_obj['height'] = '100%';

        style_desktop_obj['transition-delay'] = '0ms';
        style_mobile_obj['transition-delay'] = '0ms';
        
        style_desktop_obj['transition-duration'] = '0ms';
        style_mobile_obj['transition-duration'] = '0ms';
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
remove_css_rule = function (selector) {
    console.log(selector)
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
