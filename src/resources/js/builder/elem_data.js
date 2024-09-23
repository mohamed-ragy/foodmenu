get_element_data = function(key_tree,get_element = null){
    let keys = key_tree.split('.');
    let elem = window.template;
    let element;
    let section;
    let section_wrapper;
    let section_block;
    for(const key in keys){
        elem = elem[keys[key]];
        if('type' in elem){
            if(elem.type == 'section'){
                section = elem;
            }else if(elem.type == 'section_wrapper'){
                section_wrapper = elem;
            }else if(elem.type == 'section_block'){
                section_block = elem;
            }else if(elem.type == 'elem'){
                element = elem;
            }
        }

    }

    if(get_element == 'section'){
        return section;
    }else if(get_element == 'section_wrapper'){
        return section_wrapper
    }else if(get_element == 'section_block'){
        return section_block
    }else if(get_element == 'element'){
        return element;
    }else{
        return elem;
    }
}
get_element_parent_data = function(elem_key_tree){
    try{
        let lastDotIndex = elem_key_tree.lastIndexOf('.');
        let secondLastDotIndex = elem_key_tree.lastIndexOf('.', lastDotIndex - 1);
        let parent_key_tree = elem_key_tree.slice(0, secondLastDotIndex);
        return get_element_data(parent_key_tree);
    }catch{
        return undefined;
    }
}
get_element_val = function(elem,variable_key,key){
    let val;
    let val_mobile;
    if(variable_key === null || typeof(variable_key) === 'undefined'){
        val = elem[key];
    }else if(key === null || key === undefined){
        val = elem[variable_key];
        val_mobile = elem[`${variable_key}_mobile`];
        console.log(elem[`${variable_key}_mobile`])
    }else{
        if(typeof(elem[variable_key]) !== 'undefined'){
            if(key in elem[variable_key]){val = elem[variable_key][key]}
        }
        if(typeof(elem[`${variable_key}_mobile`]) !== 'undefined'){
            if(key in elem[`${variable_key}_mobile`]){val_mobile = elem[`${variable_key}_mobile`][key]}
        }
    }
    if(val_mobile === undefined){val_mobile = val}
    return {
        val:val,
        val_mobile:val_mobile,
    }
}
get_parent_key_tree = function(key_tree){
    let lastDotIndex = key_tree.lastIndexOf('.');
    let secondLastDotIndex = key_tree.lastIndexOf('.', lastDotIndex - 1);
    let parent_key_tree = key_tree.slice(0, secondLastDotIndex);
    return parent_key_tree;
}