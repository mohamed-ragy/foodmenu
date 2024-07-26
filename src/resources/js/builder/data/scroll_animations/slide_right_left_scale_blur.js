window.animations.push(
    {
        name:'slide_right_left_scale_blur',
        repeat:'1',

        up_out_duration:'200ms',
        up_out_delay:'0ms',
        up_out_timing_function:get_timing_function('ease_in_out_sine'),
        up_out_transform: 'translate(-200px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1.6) scaleY(1)',
        up_out_transform_origin:'right',   
        up_out_filter:'opacity(0%) blur(10px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',

        up_duration:'250ms',
        up_delay:'0ms',
        up_timing_function:get_timing_function('ease_in_out_expo'),
        up_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_transform_origin:'right',   
        up_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        in_duration:'250ms',
        in_delay:'0ms',
        in_timing_function:get_timing_function('ease_in_out_expo'),
        in_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        in_transform_origin:'right',   
        in_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_duration:'250ms',
        down_delay:'0ms',
        down_timing_function:get_timing_function('ease_in_out_expo'),
        down_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_transform_origin:'left', 
        down_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_out_duration:'200ms',
        down_out_delay:'0ms',
        down_out_timing_function:get_timing_function('ease_in_out_sine'),
        down_out_transform: 'translate(200px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1.6) scaleY(1)',
        down_out_transform_origin:'left', 
        down_out_filter:'opacity(0%) blur(10px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',

    }
)
window.animations_previews.push(
   {
        name:'slide_right_left_scale_blur',
        preview_model:'3',
        elem_duration:500,
        elem_delay:100,
        up:{
            'transition-timing-function':get_timing_function('ease_out_expo'),
            transform:'translateX(-20px) scaleX(1.2)',
            'transform-origin':'right',
            opacity:'0',
            filter:'blur(10px)',
        },
        in:{
            'transition-timing-function':get_timing_function('ease_in_back'),
            transform:'translateX(0px) scaleX(1)',
            'transform-origin':'right',
            opacity:'1',
            filter:'blur(0px)',
        },
        down:{
            'transition-timing-function':get_timing_function('ease_out_expo'),
            transform:'translateX(20px) scaleX(1.2)',
            'transform-origin':'right',
            opacity:'0',
            filter:'blur(10px)',
        },
        
    },
)