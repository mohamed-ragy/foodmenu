accessibility_check = function(key_tree,key){
    let accessibility = get_elem_data(key_tree).elem.accessibility;
    if(accessibility.includes(key)){
        return true;
    }else{
        return false;
    }
}