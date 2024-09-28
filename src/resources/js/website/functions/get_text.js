get_text = function(tree){
    let text = window.texts;
    tree = tree.split('.')
    for(const key in tree){
        text = text[tree[key]]
    }
    return text
}
