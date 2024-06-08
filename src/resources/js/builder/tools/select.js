select = function(key_tree){
    if(typeof(key_tree) === 'undefined'){return;}
    if(key_tree != window.selected){
        hide_editor_popup('editor')
    }
    let elem = get_key_tree(key_tree).elem;
    window.selected = key_tree;
    $('section').removeClass('section_selected');
    $(`.section_block`).removeClass('section_block_selected')
    $(`.home_elem`).removeClass('edit_home_elem_selected')
    switch(elem.type){
        case 'home_section':
            $(`section[key_tree="${key_tree}"]`).addClass('section_selected')
        break;
        case 'home_section_block':
            $(`.section_block[key_tree="${key_tree}"]`).addClass('section_block_selected')
        break;
        case 'home_elem':
            $(`.home_elem[key_tree="${key_tree}"]`).addClass('edit_home_elem_selected')
        break;
    }
}
heighlight_all = function(){
    $('section').addClass('section_selected');
    $(`.section_block`).addClass('section_block_selected')
    $(`.home_elem`).addClass('edit_home_elem_selected')
    $('.website_header').addClass('selected_header')
    $('.set_show_metrics').addClass('header_icon_selected')
}
deheighlight_all = function(){
    $('section').removeClass('section_selected');
    $(`.section_block`).removeClass('section_block_selected')
    $(`.home_elem`).removeClass('edit_home_elem_selected')
    if(!window.is_header_selected){
        $('.website_header').removeClass('selected_header')
    }
    $('.set_show_metrics').removeClass('header_icon_selected')
}
heighlight_all_toggle = function(){
    if( $('.set_show_metrics').hasClass('header_icon_selected')){
        deheighlight_all();
    }else{
        heighlight_all()
    }
}
set_preview_mode = function(){
    $('.set_preview_mode').addClass('header_icon_selected')
    $('#website').addClass('preview_mode')
    // $('section').addClass('section_clear')
    // $('.website_header').addClass('selected_header_clear')
}
unset_preview_mode = function(){
    $('.set_preview_mode').removeClass('header_icon_selected')
    $('#website').removeClass('preview_mode')
    // $('section').removeClass('section_clear')
    // $('.website_header').removeClass('selected_header_clear')

}
preview_mode_toggle = function(){

    if( $('.set_preview_mode').hasClass('header_icon_selected')){
        unset_preview_mode();
    }else{
        set_preview_mode()
    }
}
//

///



$('body').on('mouseup touchend','.home_elem',function(e){
    if($(this).hasClass('editing_edit_home_elem_editing')){return;}
    select($(this).attr('key_tree'))
})

//
