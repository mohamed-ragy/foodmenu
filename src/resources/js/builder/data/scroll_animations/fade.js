window.animations.push(
    {
        name:'fade',
        repeat:'0',
        
        up_out_duration:'300ms',
        up_out_delay:'0ms',
        up_out_timing_function:get_timing_function('ease_in_out_sine'),
        up_out_transform: 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_out_transform_origin:'center',
        up_out_filter:'opacity(0%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        up_duration:'300ms',
        up_delay:'0ms',
        up_timing_function:get_timing_function('ease_in_out_sine'),
        up_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_transform_origin:'center',
        up_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        in_duration:'300ms',
        in_delay:'0ms',
        in_timing_function:get_timing_function('ease_in_out_sine'),
        in_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        in_transform_origin:'center',
        in_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_duration:'300ms',
        down_delay:'0ms',
        down_timing_function:get_timing_function('ease_in_out_sine'),
        down_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_transform_origin:'center',
        down_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_out_duration:'300ms',
        down_out_delay:'0ms',
        down_out_timing_function:get_timing_function('ease_in_out_sine'),
        down_out_transform: 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_out_transform_origin:'center',
        down_out_filter:'opacity(0%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
    }
)
window.animations_previews.push(
    {
        name:'fade',
        preview_model:'1',
        elem_duration:500,
        elem_delay:500,
        up:{
            'transition-timing-function':get_timing_function('ease_in_out_sine'),
            opacity:'1',
        },
        in:{
            'transition-timing-function':get_timing_function('ease_in_out_sine'),
            opacity:'1',
        },
        down:{
            'transition-timing-function':get_timing_function('ease_in_out_sine'),
            opacity:'0',
        },
    }
)