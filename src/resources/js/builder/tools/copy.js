window.builder_clipboard
can_copy = function(){
    if(typeof(window.selected) === 'undefined'){return false;}
    if(window.selected == null){return false;}
    if(!accessibility_check(window.selected,'copy')){return false;}
    if(
        $(`.${get_elem_data(window.selected).elem.class_selector}`).attr('contenteditable') == 'true'
    ){
        return false;
    }
    return true;    
}
copy = function(){
    if(!can_copy()){return;}
    let copy_elem = get_elem_data(window.selected).elem
    window.builder_clipboard = JSON.parse(JSON.stringify(copy_elem));   
    let copied_section_name = texts.copy_untitled_section.replace(':name:',window.builder_clipboard.name)
    window.builder_clipboard.name = copied_section_name
}
//
cut = function(){
    if(!can_copy()){return;}
    let cut_elem = get_elem_data(window.selected).elem;
    window.builder_clipboard = JSON.parse(JSON.stringify(cut_elem));   
    remove_cut_elem(cut_elem)
}
remove_cut_elem = function(cut_elem){
    if(cut_elem.type == 'section'){
        window.template[window.selected_page].splice(cut_elem.sort,1)
        window.selected = undefined;
        for(const key in window.template[window.selected_page]){
            window.template[window.selected_page][key].sort = parseInt(key);
        }
    }else if(cut_elem.type == 'section_block'){
        cut_elem.children = []
    }else if(cut_elem.type == 'elem'){
        let section_block = get_elem_data(window.selected).section_block;
        section_block.children.splice(cut_elem.sort,1)
        for(const key in section_block.children){
            section_block.children[key].sort = parseInt(key);
        }
        
    }
    hide_editor_popup('editor')
    new_action();
}
//
paste = function(){
    if(!can_copy()){return;}
    let _paste_elem = window.builder_clipboard;
    if(_paste_elem.type == 'section'){
        paste_section(_paste_elem)
    }else if(_paste_elem.type == 'section_block'){
        paste_section_block(_paste_elem);
    }else if(_paste_elem.type == 'elem'){
        paste_elem(_paste_elem)
    }
}
paste_section = function(paste_elem){
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let selected_section = get_elem_data(window.selected).section;
    let new_section_sort = parseInt(selected_section.sort) + 1;
    let new_section = JSON.parse(JSON.stringify(paste_elem));
    for(const key in window.template[window.selected_page]){
        if(window.template[window.selected_page][key].sort > selected_section.sort ){
            window.template[window.selected_page][key].sort = parseInt(window.template[window.selected_page][key].sort) + 1
        }
    }
    new_section.sort = new_section_sort;
    reset_class_selectors(new_section);
    window.template[window.selected_page].push((new_section));
    window.template[window.selected_page].sort((a,b)=>{
        return a.sort - b.sort;
    })
    new_action();
    $('#website').animate({scrollTop:$(`section[key_tree="${window.selected_page}.${new_section.sort}"]`).position().top - 50},300)
}
paste_section_block = function(paste_elem){
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let selected_section_block = get_elem_data(window.selected).section_block;
    if(selected_section_block == null){return;}
    for(const key in paste_elem.children){
        let child = paste_elem.children[key];
        reset_class_selectors(child);
        selected_section_block.children.push(JSON.parse(JSON.stringify(child)))
    }
    for(const key in selected_section_block.children){
        selected_section_block.children[key].sort = key
    }
    new_action();
}
paste_elem = function(_paste_elem){
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let selected_elem = get_elem_data(window.selected).elem;
    reset_class_selectors(_paste_elem);
    if(selected_elem.type == 'section_block'){
        selected_elem.children.push(_paste_elem);
        for(const key in selected_elem.children){
            selected_elem.children[key].sort = key;
        }
    }else if(selected_elem.type == 'elem'){
        let selected_section_block = get_elem_data(window.selected).section_block;
        _paste_elem.sort = parseInt(selected_elem.sort) + 1
        selected_section_block.children.push(JSON.parse(JSON.stringify(_paste_elem)));
        for(const key in selected_section_block.children){
            if(parseInt(selected_section_block.children[key].sort) >= _paste_elem.sort && _paste_elem.class_selector != selected_section_block.children[key].class_selector){
                selected_section_block.children[key].sort = parseInt(selected_section_block.children[key].sort) + 1
            }
        }
    }

    new_action();
}
///
$('body').on('click','.copy',function(){copy()})
$('body').on('click','.cut',function(){cut()})
$('body').on('click','.paste',function(){paste()})
