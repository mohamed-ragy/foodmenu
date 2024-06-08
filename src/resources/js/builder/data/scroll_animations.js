let timing_functions = get_timing_functions();
get_timing_function = function(timing_function){
    return timing_functions.find(item=> item.name == timing_function).val;
}
window.animations = [
    {
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
        
    },
    {
        name:'fade',
        repeat:'0',
        
        up_out_duration:'300ms',
        up_out_delay:'0ms',
        up_out_timing_function:get_timing_function('ease_in_out_sine'),
        up_out_transform: 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_out_filter:'opacity(0%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        up_duration:'300ms',
        up_delay:'0ms',
        up_timing_function:get_timing_function('ease_in_out_sine'),
        up_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        in_duration:'300ms',
        in_delay:'0ms',
        in_timing_function:get_timing_function('ease_in_out_sine'),
        in_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        in_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_duration:'300ms',
        down_delay:'0ms',
        down_timing_function:get_timing_function('ease_in_out_sine'),
        down_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_out_duration:'300ms',
        down_out_delay:'0ms',
        down_out_timing_function:get_timing_function('ease_in_out_sine'),
        down_out_transform: 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_out_filter:'opacity(0%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
    },
    {
        name:'slide_left_left_scale_blur',
        repeat:'1',

        up_out_duration:'100ms',
        up_out_delay:'0ms',
        up_out_timing_function:get_timing_function('ease_in_out_sine'),
        up_out_transform: 'translate(-200px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1.6) scaleY(1)',
        up_out_filter:'opacity(0%) blur(10px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',

        up_duration:'150ms',
        up_delay:'0ms',
        up_timing_function:get_timing_function('ease_in_out_expo'),
        up_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        up_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        in_duration:'150ms',
        in_delay:'0ms',
        in_timing_function:get_timing_function('ease_in_out_expo'),
        in_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        in_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_duration:'150ms',
        down_delay:'0ms',
        down_timing_function:get_timing_function('ease_in_out_expo'),
        down_transform:'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
        down_filter:'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        
        down_out_duration:'100ms',
        down_out_delay:'0ms',
        down_out_timing_function:get_timing_function('ease_in_out_sine'),
        down_out_transform: 'translate(-200px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1.6) scaleY(1)',
        down_out_filter:'opacity(0%) blur(10px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',

    }
]
window.animations_previews = [
    {
        name:'no_animation',
        preview_model:'none',
        elem_duration:'0ms',
        elem_delay:'0ms',
    },
    {
        name:'fade',
        preview_model:'1',
        elem_duration:500,
        elem_delay:500,
        up:{
            'transition-timing-function':timing_functions.find(item=> item.name == 'ease_in_out_sine').val,
            opacity:'0',
        },
        in:{
            'transition-timing-function':timing_functions.find(item=> item.name == 'ease_in_out_sine').val,
            opacity:'1',
        },
        down:{
            'transition-timing-function':timing_functions.find(item=> item.name == 'ease_in_out_sine').val,
            opacity:'0',
        },
    },
    {
        name:'slide_left_left_scale_blur',
        preview_model:'1',
        elem_duration:500,
        elem_delay:100,
        up:{
            'transition-timing-function':timing_functions.find(item=> item.name == 'ease_out_expo').val,
            transform:'translateX(-20px) scaleX(1.2)',
            opacity:'0',
            filter:'blur(10px)',
        },
        in:{
            'transition-timing-function':timing_functions.find(item=> item.name == 'ease_in_back').val,
            transform:'translateX(0px) scaleX(1)',
            opacity:'1',
            filter:'blur(0px)',
        },
        down:{
            'transition-timing-function':timing_functions.find(item=> item.name == 'ease_out_expo').val,
            transform:'translateX(-20px) scaleX(1.2)',
            opacity:'0',
            filter:'blur(10px)',
        },
        
    },
 
]

