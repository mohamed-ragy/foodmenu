accessibility_check = function(key_tree,key){
    let accessibility = get_element_data(key_tree).accessibility;
    if(accessibility.includes(key)){
        return true;
    }else{
        return false;
    }
}