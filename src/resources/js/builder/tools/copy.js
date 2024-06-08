window.builder_clipboard
copy = function(){
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let copy_elem = get_key_tree(window.selected).elem
    window.builder_clipboard = JSON.parse(JSON.stringify(copy_elem));   
    let copied_section_name = texts.copy_untitled_section.replace(':name:',window.builder_clipboard.name)
    window.builder_clipboard.name = copied_section_name
}
$('body').on('click','.copy',function(){copy()})
//
$('body').on('click','.cut',function(){cut()})
cut = function(){
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let cut_elem = get_key_tree(window.selected).elem;
    window.builder_clipboard = JSON.parse(JSON.stringify(cut_elem));   
    remove_cut_elem(cut_elem)
}
remove_cut_elem = function(cut_elem){
    if(cut_elem.type == 'home_section'){
        window.template.home.splice(cut_elem.sort,1)
        window.selected = undefined;
        for(const key in window.template.home){
            window.template.home[key].sort = parseInt(key);
        }
    }
    hide_editor_popup('editor')
    new_action();
}
//
paste = function(){
    return;
    let paste_elem = window.builder_clipboard;
    if(paste_elem.type == 'home_section'){
        paste_home_section(paste_elem)
    }
}
$('body').on('click','.paste',function(){paste()})
paste_home_section = function(paste_elem){
    // let selected_elem = get_key_tree(window.selected).elem;
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let selected_home_section_key = get_key_tree(window.selected).home_section_key;
    let selected_home_section = window.template.home[selected_home_section_key];
    let new_section_sort = parseInt(selected_home_section.sort) + 1;
    let new_section = JSON.parse(JSON.stringify(paste_elem));
    for(const key in window.template.home){
        if(window.template.home[key].sort > selected_home_section.sort ){
            window.template.home[key].sort = parseInt(window.template.home[key].sort) + 1
        }
    }
    new_section.sort = new_section_sort;
    reset_class_selectors(new_section)
    window.template.home.push((new_section));
    window.template.home.sort((a,b)=>{
        return a.sort - b.sort;
    })
    new_action();
    $('#website').animate({scrollTop:$(`section[key_tree="home.${new_section.sort}"]`).position().top - 50},300)
}