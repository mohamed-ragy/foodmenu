get_default_style = function(style,push_data={}){
    let data;
    switch(style){
        case 'section_wrapper':
            data = {
                'box-sizing': 'border-box',
                'position': 'relative',
                'display': 'grid',
                'padding-right':'0px',
                'padding-left':'0px',
                'margin-right': 'auto',
                'margin-left': 'auto',

                'max-width': 'var(--page_max_width)',
                'min-height': '500px',
                'padding-top': '100px',
                'padding-bottom': '100px',
                'grid-gap': '10px',
                'margin-top': '0px',
                'margin-bottom': '0px',
            }
        break;
        case 'background':
            data =  {
                type:'none',
                color:'rgba(var(--color_1_7),1)',
                gradient:get_default_style('linear_gradient'),
                backdrop_filter:get_default_style('backdrop_filter'),
                backdrop_filter_color:'rgba(var(--color_1_7),.2)',
                background_image: '/storage/imgs/cpanel/noimg.png',
                background_attachment: 'local',
                background_size: 'cover',
                background_repeat: 'no-repeat',
                background_position: '50% 50%',
                background_blend_mode: 'normal',
                background_blend_mode_color:'rgba(var(--color_1_2),1)',
            };
        break;
        case 'background_none':
            data =  {
                type:'none',
            };
        break;
        case 'background_color':
            data =  {
                type:'color',
                color:'rgba(var(--color_1_7),1)',
            };
        break;
        case 'background_gradient':
            data =  {
                type:'gradient',
                gradient:get_default_style('linear_gradient'),
            };
        break;
        case 'background_backdrop_filter':
            data =  {
                type:'backdrop_filter',
                backdrop_filter:get_default_style('backdrop_filter'),
                backdrop_filter_color:'rgba(var(--color_1_7),.2)',
            };
        break;
        case 'background_image':
            data =  {
                type:'image',
                background_image: '/storage/imgs/cpanel/noimg.png',
                background_attachment: 'local',
                background_size: 'cover',
                background_repeat: 'no-repeat',
                background_position: '50% 50%',
                background_blend_mode: 'normal',
                background_blend_mode_color:'rgba(var(--color_1_2),1)',
            };
        break;
        case 'animation':
            data = {
                name:'no_animation',
                repeat:'0',
    
                up_out_duration:'0ms',
                up_out_delay:'0ms',
                up_out_timing_function:get_timing_function('linear'),
                up_out_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                up_out_transform_origin:'center',
                up_out_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                up_duration:'0ms',
                up_delay:'0ms',
                up_timing_function:get_timing_function('linear'),
                up_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                up_transform_origin:'center',
                up_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                in_duration:'0ms',
                in_delay:'0ms',
                in_timing_function:get_timing_function('linear'),
                in_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                in_transform_origin:'center',
                in_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                down_duration:'0ms',
                down_delay:'0ms',
                down_timing_function:get_timing_function('linear'),
                down_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                down_transform_origin:'center',
                down_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                down_out_duration:'0ms',
                down_out_delay:'0ms',
                down_out_timing_function:get_timing_function('linear'),
                down_out_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                down_out_transform_origin:'center',
                down_out_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
            };
        break;
        ///
        case 'backdrop_filter':
            data = 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)';
        break;
        case 'backdrop_filter_undefined':
            data = 'blur(--) brightness(--) contrast(--) saturate(--) grayscale(--) hue-rotate(--) invert(--) sepia(--)';
        break;
        case 'linear_gradient':
            data = 'linear-gradient(90deg, rgba(var(--color_1_5),1) 0%, rgba(var(--color_2_5),1) 100%)';
        break;
        case 'radial_gradient':
            data = 'radial-gradient(circle, rgba(var(--color_1_5),1) 0%, rgba(var(--color_2_5),1) 100%)';
        break;
        //
        case 'transition-timing-function':
            data = 'linear';
        break;
        case 'transition-duration':
            data = '0ms';
        break;
        case 'transition-delay':
            data = '0ms';
        break;
        case 'padding':
            data = '20px 20px 20px 20px';
        break;
        case 'margin':
            data = '20px 20px 20px 20px';
        break;
        case 'border-top':
            data = '0px none rgba(var(--color_4_1),1)';
        break;
        case 'border-right':
            data = '0px none rgba(var(--color_4_1),1)';
        break;
        case 'border-bottom':
            data = '0px none rgba(var(--color_4_1),1)';
        break;
        case 'border-left':
            data = '0px none rgba(var(--color_4_1),1)';
        break;
        case 'border-radius':
            data = '0px 0px 0px 0px';
        break;
        case 'box-shadow':
            data = 'none';
        break;
        case '':
            data = '';
        break;
        case '':
            data = '';
        break;
        case '':
            data = '';
        break;
        case 'transform-origin':
            data = 'center';
        break;

        case 'transform':
            data = 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)';
        break;
        case 'transform_undefined':
            data = 'translate(--,--) rotateX(--) rotateY(--) rotateZ(--) scaleX(--) scaleY(--)';
        break;
        case 'filter':
            data = 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(var(--color_4_1),0))';
        break;
        case 'filter_undefined':
            data = 'opacity(--) blur(--) brightness(--) contrast(--) saturate(--) grayscale(--) hue-rotate(--) invert(--) sepia(--) drop-shadow(-- -- -- rgba(--,1))';
        break;
    
        case 'container_limited_accessibility':
            data = [
                'interactions','can_hover','can_parent_hover',
                'elem_swap',
                'alignment','display','arrange',
                'sizing','width','height',
                'spacing','margin','padding',
                'styling','border','border_radius','box_shadow','transform','filter',
                'animation','background','background_gradient','background_backdrop_filter','background_image',
                'block_elems'
            ];
        break;
        case 'text_limited_accessibility':
            data = [
                'interactions','can_hover','can_click','can_parent_hover',
                'elem_swap',
                'text_style','text_color','select_font',
                'display',
                'arrange',
                'sizing','width','height',
                'spacing','margin','padding',
                'styling','filter','border','border_radius','box_shadow','transform',
                'animation',
                'background','background_gradient','background_backdrop_filter','background_image',
            ];
        break;
    }
    for(const key in push_data){
        data[key] = push_data[key]
    }
    return data;
}
get_default_styles = function(styles_keys,data={}){
    for(const key in styles_keys){
        if(styles_keys[key] == 'border'){
            data['border-top'] = get_default_style('border-top');
            data['border-right'] = get_default_style('border-right');
            data['border-bottom'] = get_default_style('border-bottom');
            data['border-left'] = get_default_style('border-left');
        }else if(styles_keys[key] == 'width'){
            data['width'] = 'auto';
            data['min-width'] = 'auto';
            data['max-width'] = '100%';
        }else if(styles_keys[key] == 'height'){
            data['height'] = 'auto';
            data['min-height'] = 'auto';
            data['max-height'] = '100%';
        }
        
        else{
            data[styles_keys[key]] = get_default_style(styles_keys[key]);
        }
    }
    return data;
}
