get_elem_data = function(key_tree,variable_key,key){
    let keys = key_tree.split('.');
    let elem = window.template;
    let section = null;
    let section_wrapper = null;
    let section_block = null;
    for(const key in keys){
        elem = elem[keys[key]];
        if(elem.type == 'section'){
            section = elem;
        }else if(elem.type == 'section_wrapper'){
            section_wrapper = elem;
        }else if(elem.type == 'section_block'){
            section_block = elem;
        }

    }

    let elem_data;
    let elem_data_mobile;
    if(variable_key === null || typeof(variable_key) === 'undefined'){
        elem_data = elem
    }else{
        elem_data = elem[variable_key];
        elem_data_mobile = elem[`${variable_key}_mobile`];
    }
    let val;
    let val_mobile;
    if(variable_key === null || typeof(variable_key) === 'undefined'){
        val = elem[key];
    }else{
        if(typeof(elem_data) !== 'undefined'){
            if(key in elem_data){val = elem_data[key]}
        }
        if(typeof(elem_data_mobile) !== 'undefined'){
            if(key in elem_data_mobile){val_mobile = elem_data_mobile[key]}
        }
    }
    return {
        elem:elem,
        data:elem_data,
        data_mobile:elem_data_mobile,
        val:val,
        val_mobile:val_mobile,
        section:section,
        section_wrapper:section_wrapper,
        section_block:section_block,
    }
}

// get_elem_parent = function(elem_key_tree){
//     let lastDotIndex = elem_key_tree.lastIndexOf('.');
//     let secondLastDotIndex = elem_key_tree.lastIndexOf('.', lastDotIndex - 1);
//     let parent_key_tree = elem_key_tree.slice(0, secondLastDotIndex);
//     return get_elem_data(parent_key_tree).elem;
// }