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
    for(const key in keys){
        if(key == keys.length -1 ){
            elem_mobile = elem[`${keys[key]}_mobile`]
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
        elem_key:elem_key,
        elem_key_tree:elem_key_tree,
        parent:parent,
        parent_key:parent_key,
        parent_key_tree:parent_key_tree,
    };
}
