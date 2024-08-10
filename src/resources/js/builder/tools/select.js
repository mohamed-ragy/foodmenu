select = function(key_tree){
    try{
        if(typeof(key_tree) === 'undefined'){return;}
        if(key_tree != window.selected){
            hide_editor_popup('editor')
        }
        let elem = get_elem_data(key_tree).elem
        window.selected = key_tree;
        $('section').removeClass('section_selected');
        $(`.section_block`).removeClass('section_block_selected')
        $(`.elem`).removeClass('edit_elem_selected')
        $('.website_header').removeClass('selected_header')
        $('.header_component').removeClass('header_component_selected')
        switch(elem.type){
            case 'section':
                $(`section[key_tree="${key_tree}"]`).addClass('section_selected')
            break;
            case 'section_block':
                $(`.section_block[key_tree="${key_tree}"]`).addClass('section_block_selected')
            break;
            case 'elem':
                $(`.elem[key_tree="${key_tree}"]`).addClass('edit_elem_selected')
            break;
            case 'website_header':
                $('.website_header').addClass('selected_header')
            break;
            case 'header_component':
                $(`.header_component[key_tree="${key_tree}"]`).addClass('header_component_selected')
            break;
        }
    }catch{
        hide_editor_popup('editor')
    }
}

heighlight_all = function(){
    $('section').addClass('section_selected');
    $(`.section_block`).addClass('section_block_selected')
    $(`.elem`).addClass('edit_elem_selected')
    $('.website_header').addClass('selected_header')
    $('.set_show_metrics').addClass('header_icon_selected')
}
deheighlight_all = function(){
    $('section').removeClass('section_selected');
    $(`.section_block`).removeClass('section_block_selected')
    $(`.elem`).removeClass('edit_elem_selected')
    $('.website_header').removeClass('selected_header')
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
}
unset_preview_mode = function(){
    $('.set_preview_mode').removeClass('header_icon_selected')
    $('#website').removeClass('preview_mode')

}
preview_mode_toggle = function(){

    if( $('.set_preview_mode').hasClass('header_icon_selected')){
        unset_preview_mode();
    }else{
        set_preview_mode()
    }
}
is_preview_mode = function(){
    if($('.set_preview_mode').hasClass('header_icon_selected')){return true;}else{return false}
}
window.temp_preview_mode_timeout = null;
temp_preview_mode = function(){
    clearTimeout(window.temp_preview_mode_timeout);
    set_preview_mode();
    window.temp_preview_mode_timeout = setTimeout(()=>{
        unset_preview_mode();
    },2000)
}
//

///
$('body').on('click','.select',function(){
    let key_tree = $(this).attr('key_tree');
    select(key_tree);
    $('#website').animate({
        scrollTop: $(`#website`).find(`[key_tree="${key_tree}"]`).first().offset().top - $('#website').offset().top + $('#website').scrollTop() - 300
    },500)
})



//
