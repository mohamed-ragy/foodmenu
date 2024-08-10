$('body').on('click','.edit_alignment_btn_container',function(){
    let key = $(this).parent().attr('key');
    let val = $(this).attr('key');
    let elem = get_elem_data($(this).parent().attr('key_tree')).elem;
    let variable_key = 'css';
    window.current_view == 'mobile' ? variable_key = 'css_mobile' : window.current_view == 'desktop' ? variable_key = 'css' : null ;
    if(key == 'align-items'){
        for(const key in elem.children){
            let child = elem.children[key];
            child[variable_key]['align-self'] = 'auto';
        }
    }
    elem[variable_key][key] = val;
    setTimeout(()=>{
        new_action();
    })
})
$('body').on('click','.edit_alignment_btn_self',function(){
    let key_tree = $(this).attr('key_tree');
    let key = $(this).attr('key');
    let variable_key = 'css';
    window.current_view == 'mobile' ? variable_key = 'css_mobile' : window.current_view == 'desktop' ? variable_key = 'css' : null ;
    let elem_data = get_elem_data($(this).parent().attr('key_tree'));
    let elem = elem_data.elem;
    let parent = elem_data.section_block;
    let parent_align_items = parent[variable_key]['align-items']
    let current_align_self = elem[variable_key]['align-self'];
    let new_val;
    if(current_align_self != 'auto'){
        if(key == 'backward' && current_align_self == 'flex-end'){
            new_val = 'center';
        }else if(key == 'backward' && current_align_self == 'center'){
            new_val = 'flex-start';
        }else if(key == 'forward' && current_align_self == 'flex-start'){
            new_val = 'center'
        }else if(key == 'forward' && current_align_self == 'center'){
            new_val = 'flex-end';
        }
    }else{
        if(key == 'backward' && parent_align_items == 'flex-end'){
            new_val = 'center';
        }else if(key == 'backward' && parent_align_items == 'center'){
            new_val = 'flex-start';
        }else if(key == 'forward' && parent_align_items == 'flex-start'){
            new_val = 'center'
        }else if(key == 'forward' && parent_align_items == 'center'){
            new_val = 'flex-end';
        }
    }

    elem[variable_key]['align-self'] = new_val;
    setTimeout(()=>{
        new_action();
    })
})