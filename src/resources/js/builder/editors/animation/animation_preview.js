stop_preview_animations = function(){
    $('.animation_preview_scroll').css('transform',`translateY(0px)`)
    $('.animation_preview').scrollTop(0)
    clearTimeout(window.animations_preveiw_interval)
}
play_preview_animations = function(){
    stop_preview_animations();
    
    let x = 1;
    
    $('.animation_preview_elem').each(function(){
        let animation_name = $(this).attr('animation_name');
        let animation = window.animations_previews.find(item=>item.name == animation_name);
        $(this).attr('style','');
        $(this).css({
            // 'transition-timing-function':animation.timing_function,
            'transition-duration':`${animation.elem_duration}ms`
        })
        for(const key in animation.down){
            $(this).css(key,animation.down[key])
        }
    });
    window.animations_preveiw_interval = setInterval(() => {
        let scroll_bar;let scroll_top;let animation_style;let elem_timeout= 0;
        switch(x){
            case 1:scroll_bar='15';scroll_top=60;animation_style='in';elem_timeout=400;break;
            case 2:scroll_bar='30';scroll_top=120;animation_style='up';break;
            case 3:scroll_bar='15';scroll_top=60;animation_style='in';elem_timeout=400;break;
            case 4:scroll_bar='0';scroll_top=0;animation_style='down';break;
        }

        $('.animation_preview_scroll').css({'transform':`translateY(${scroll_bar}px)`})
        $('.animation_preview').animate({'scrollTop':scroll_top},500)

        $('.animation_preview_elem').each(function(){
            let animation_name = $(this).attr('animation_name');
            let animation = window.animations_previews.find(item=>item.name == animation_name);
            // $(this).attr('style','');
            $(this).css({
                // 'transition-timing-function':animation.timing_function,
                'transition-duration':`${animation.elem_duration}ms`
            })
            setTimeout(()=>{
                for(const key in animation[animation_style]){
                    $(this).css(key,animation[animation_style][key])
                }
            },x == 1 || x == 3 ? animation.elem_delay : 0)
        });
        if(x >= 4){x = 1;}else{x++;}
    },1500);
} 
//
draw_animation_preview_model = function(animation){

    switch(animation.preview_model){
        case 'none':
            return $('<div/>',{animation_name:'no_animation',class:`animation_preview_container column alnC jstfyC`}).append(
                    $('<div/>',{class:'ico-no cR fs103'}),
                    $('<div/>',{class:'fs08 mT5 c_white-10',text:texts.select_elems._no_animation})
                )
        break;
        case 'custom':
            return $('<div/>',{animation_name:'customized_animation',class:`editor_popup_show_container animation_preview_container_dump column alnC jstfyC`,key:'customize_animation'}).append(
                $('<div/>',{class:'ico-edit cG fs103'}),
                $('<div/>',{class:'fs08 mT5 c_white-10',text:texts.select_elems._custom_animation})
            )
        break;
        case '1':
            return draw_animation_preview_model_1(animation)
        break;
        case '2':
            return draw_animation_preview_model_2(animation)
        break;
        case '3':
            return draw_animation_preview_model_3(animation)
        break;
    }
}
draw_animation_preview_model_1 = function(animation){
    return $('<div/>',{animation_name:animation.name,class:`animation_preview_container`}).append(
        $('<div/>',{class:'animation_preview_scroll'}),
        $('<div/>',{class:'animation_preview'}).append(
            $('<div/>',{class:'animation_preview_body'}).append(
                $('<div/>',{class:'animation_preview_body_top'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
                $('<div/>',{class:'animation_preview_body_mid row alnC jstfyC'}).append(
                    $('<div/>',{class:' row alnC jstfyE h100p'}).append(
                        $('<img/>',{src:'./storage/imgs/burger_icon.png',class:`animation_preview_elem`,animation_name:animation.name})
                    ),
                    $('<div/>',{class:'mis-5'}).append(
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    ),
                ),
                $('<div/>',{class:'animation_preview_body_bottom'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
            )
        )
    )
}
draw_animation_preview_model_2 = function(animation){
    return $('<div/>',{animation_name:animation.name,class:`animation_preview_container`}).append(
        $('<div/>',{class:'animation_preview_scroll'}),
        $('<div/>',{class:'animation_preview'}).append(
            $('<div/>',{class:'animation_preview_body'}).append(
                $('<div/>',{class:'animation_preview_body_top'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
                $('<div/>',{class:'animation_preview_body_mid row alnC jstfyC'}).append(
                    $('<div/>',{class:'mie-5'}).append(
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    ),
                    $('<div/>',{class:' row alnC jstfyE h100p'}).append(
                        $('<img/>',{src:'./storage/imgs/burger_icon.png',class:`animation_preview_elem`,animation_name:animation.name})
                    ),
                ),
                $('<div/>',{class:'animation_preview_body_bottom'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
            )
        )
    )
}
draw_animation_preview_model_3 = function(animation){
    return $('<div/>',{animation_name:animation.name,class:`animation_preview_container`}).append(
        $('<div/>',{class:'animation_preview_scroll'}),
        $('<div/>',{class:'animation_preview'}).append(
            $('<div/>',{class:'animation_preview_body'}).append(
                $('<div/>',{class:'animation_preview_body_top'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
                $('<div/>',{class:'animation_preview_body_mid row alnC jstfyC'}).append(
                    $('<div/>',{class:'mie-5'}).append(
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w20'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w20'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w20'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    ),
                    $('<div/>',{class:' row alnC jstfyE h100p'}).append(
                        $('<img/>',{src:'./storage/imgs/burger_icon.png',class:`animation_preview_elem`,animation_name:animation.name})
                    ),
                    $('<div/>',{class:'mis-5'}).append(
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w20'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w20'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w20'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    ),
                ),
                $('<div/>',{class:'animation_preview_body_bottom'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
            )
        )
    )
}
//