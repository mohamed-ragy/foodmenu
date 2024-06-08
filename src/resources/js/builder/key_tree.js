get_key_tree = function(key_tree){
    let keys = key_tree.split('.');

    let elem = window.template;
    let elem_key;
    let elem_key_tree = key_tree;

    let parent_loop = window.template;
    let parent = null;
    let parent_key;
    let parent_key_tree = ``;
    let elem_mobile;
    
    let elem_hover = {};
    let elem_mobile_hover = {};

    let home_section_key = null;
    for(const key in keys){
        if(keys[key] == 'home'){
            home_section_key = keys[parseInt(key) + (1)]
        }
        if(key == keys.length -1 ){
            elem_mobile = elem[`${keys[key]}_mobile`]
            if(`${keys[key]}_hover` in elem){elem_hover = elem[`${keys[key]}_hover`]}
            if(`${keys[key]}_mobile_hover` in elem){elem_mobile_hover = elem[`${keys[key]}_mobile_hover`]}
        }
        elem = elem[keys[key]];
        elem_key = keys[key]
    }
    for(const key in keys){
        if(parent_key_tree == ``){
            parent_key_tree = `${keys[key]}`
        }else{
            parent_key_tree = `${parent_key_tree}.${keys[key]}`
        }
        parent_loop = parent_loop[keys[key]]

        if('children' in parent_loop){
            for(const child in parent_loop.children){
                if(parent_loop.children[child] == elem){
                    parent = parent_loop
                    parent_key = keys[key]
                    break;
                }
            }
        }
        if(parent != null){break;}

    }
    return {
        elem:elem,
        elem_mobile:elem_mobile,
        elem_hover:elem_hover,
        elem_mobile_hover:elem_mobile_hover,
        elem_key:elem_key,
        elem_key_tree:elem_key_tree,
        parent:parent,
        parent_key:parent_key,
        parent_key_tree:parent_key_tree,
        home_section_key:home_section_key,
    };
}
