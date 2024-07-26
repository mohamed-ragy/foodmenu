window.animations.push(
    {
        name:'slide_against_scroll',
        repeat:'1',
        up_out_duration:'400ms',
        up_out_delay:'50ms',
        up_out_timing_function:get_timing_function('ease_out_quint'),
        up_out_transform:'translate(0px,-100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_out_transform_origin:'center',
        up_out_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        up_duration:'400ms',
        up_delay:'50ms',
        up_timing_function:get_timing_function('ease_out_quint'),
        up_transform:'translate(0px,-50px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_transform_origin:'center',
        up_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        in_duration:'400ms',
        in_delay:'50ms',
        in_timing_function:get_timing_function('ease_out_quint'),
        in_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        in_transform_origin:'center',
        in_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_duration:'400ms',
        down_delay:'50ms',
        down_timing_function:get_timing_function('ease_out_quint'),
        down_transform:'translate(0px,50px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_transform_origin:'center',
        down_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_out_duration:'400ms',
        down_out_delay:'50ms',
        down_out_timing_function:get_timing_function('ease_out_quint'),
        down_out_transform:'translate(0px,100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_out_transform_origin:'center',
        down_out_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
    }
)
window.animations_previews.push(
    {
        name:'slide_against_scroll',
        preview_model:'3',
        elem_duration:500,
        elem_delay:400,
        up:{
            'transition-timing-function':get_timing_function('ease_out_circ'),
            transform:'translateY(-20px) scaleX(1)',
            'transform-origin':'center',
            // opacity:'0',
            // filter:'blur(10px)',
        },
        in:{
            'transition-timing-function':get_timing_function('ease_out_circ'),
            transform:'translateY(0px) scaleX(1)',
            'transform-origin':'center',
            // opacity:'1',
            // filter:'blur(0px)',
        },
        down:{
            'transition-timing-function':get_timing_function('ease_out_circ'),
            transform:'translateY(20px) scaleX(1)',
            'transform-origin':'center',
            // opacity:'0',
            // filter:'blur(10px)',
        },
        
    }
)