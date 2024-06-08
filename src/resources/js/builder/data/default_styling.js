get_default_style = function(style,push_data){
    switch(style){
        case 'section_wrapper':

        break;
        case 'background_image':
            return {
                'background-image': '/storage/imgs/cpanel/noimg.png',
                'background-attachment': 'local',
                'background-position': '50% 50%',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                'background-blend-mode': 'normal',
                // 'background-color': 'rgba(200,200,200,1)',
            };
        break;
        case 'background_image_mobile':
            return {
                'background-attachment': 'local',
                'background-position': '50% 50%',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
            };
        break;
        case 'backdrop-filter':
            return 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)';
        break;
        case 'animation':
            return {
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
            return 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)';
        break;
        case 'filter':
            return 'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
        case '':
            return '';
        break;
    }
}