editor_bring_to_front = function(){
    let elem = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    let new_zindex = elem.css['z-index'];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) >= parseInt(new_zindex)){
                new_zindex = parseInt(child.css['z-index']) + 1;
            }
        }
    }
    elem.css['z-index'] = new_zindex;
    new_action('','');
    generate_elem_style(elem)
}
$('body').on('click','.editor_bring_to_front',function(){
    editor_bring_to_front()
})
//
editor_bring_forward = function(){
    let elem = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    let zindex_arr = [];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) >= parseInt(elem.css['z-index'])){
                zindex_arr.push(parseInt(child.css['z-index']))
            }
        }
    }
    let new_zindex = elem.css['z-index'];
    if(zindex_arr.length > 0){
        new_zindex = Math.min(...zindex_arr) +1;
    }
    elem.css['z-index'] = new_zindex;
    new_action('','');
    generate_elem_style(elem)
}
$('body').on('click','.editor_bring_forward',function(){
    editor_bring_forward();
})
//
editor_send_to_back = function(){
    let elem = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    let new_zindex = elem.css['z-index'];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) <= parseInt(new_zindex)){
                if(child.css['z-index'] == 1){
                    child.css['z-index'] = 2;
                    new_zindex = 1;
                }else{
                    new_zindex = parseInt(child.css['z-index']) - 1;
                }
            }
        }
    }
    elem.css['z-index'] = new_zindex;
    new_action('','');
    generate_elem_style(elem)
}
$('body').on('click','.editor_send_to_back',function(){
    editor_send_to_back();
})
//
editor_send_backward = function(){
    let elem = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    let zindex_arr = [];
    for(const key in parent.children){
        let child = parent.children[key];
        if(parseInt(child.sort) != parseInt(elem.sort)){
            if(parseInt(child.css['z-index']) <= parseInt(elem.css['z-index'])){
                zindex_arr.push(parseInt(child.css['z-index']))
            }
        }
    }
    let new_zindex = elem.css['z-index'];
    if(zindex_arr.length > 0){
        new_zindex = Math.min(...zindex_arr) -1;
    }
    if(new_zindex >= 0){
        new_zindex = 1;
    }
    elem.css['z-index'] = new_zindex;
    new_action('','');
    generate_elem_style(elem)
}
$('body').on('click','.editor_send_backward',function(){
    editor_send_backward();
})
// 