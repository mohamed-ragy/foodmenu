
play_transition = function(elem,animation,duration,delay){
    elem.removeClass(`${animation} animated`)
    setTimeout(()=>{
        elem.addClass(`${animation} animated`)
        setTimeout(()=>{
            elem.removeClass(`${animation}`)
    },duration.replace('ms',''))
    },delay)

}
$('body').on('click','.play_elem_animation',function(e){
    // e.stopImmediatePropagation();
    let item = get_key_tree($(this).attr('elem_key_tree')).elem
    play_transition(
        $(`.${item.class_selector}`),
        item.attr.animation,
        item.css['animation-duration'],
        item.attr['animation_delay'],
    )
})
