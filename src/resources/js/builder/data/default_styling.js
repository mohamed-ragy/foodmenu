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
        case 'section_wrapper_mobile':
            data = {
                'max-width': 'var(--page_max_width)',
                'min-height': '500px',
                'padding-top': '100px',
                'padding-bottom': '100px',
                'grid-gap': '5px',
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
        case 'backdrop_filter':
            data = 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)';
        break;
        case 'animation':
            data = {
                name:'no_animation',
                repeat:'0',
    
                up_out_duration:'0ms',
                up_out_delay:'0ms',
                up_out_timing_function:get_timing_function('linear'),
                up_out_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                up_out_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                up_duration:'0ms',
                up_delay:'0ms',
                up_timing_function:get_timing_function('linear'),
                up_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                up_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                in_duration:'0ms',
                in_delay:'0ms',
                in_timing_function:get_timing_function('linear'),
                in_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                in_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                down_duration:'0ms',
                down_delay:'0ms',
                down_timing_function:get_timing_function('linear'),
                down_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                down_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                
                down_out_duration:'0ms',
                down_out_delay:'0ms',
                down_out_timing_function:get_timing_function('linear'),
                down_out_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                down_out_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
            };
        break;
        case 'transform':
            data = 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)';
        break;
        case 'filter':
            data = 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))';
        break;
        case 'linear_gradient':
            data = 'linear-gradient(90deg, rgba(var(--color_1_5),1) 0%, rgba(var(--color_2_5),1) 100%)';
        break;
        case 'radial_gradient':
            data = 'radial-gradient(circle, rgba(var(--color_1_5),1) 0%, rgba(var(--color_2_5),1) 100%)';
        break;
        case '':
            data = '';
        break;
    }
    for(const key in push_data){
        data[key] = push_data[key]
    }
    return data;
}