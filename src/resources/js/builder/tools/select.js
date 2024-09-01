select = function(key_tree){
    // if(window.selected == key_tree){return;}
    // try{
        if(typeof(key_tree) === 'undefined'){return;}
        if(key_tree != window.selected){
            hide_editor_popup('editor')
        }
        console.log(key_tree)
        let elem = get_element_data(key_tree)
        window.selected = key_tree;
        show_edit_btns(key_tree)
        $('section').removeClass('section_selected');
        $(`.section_block`).removeClass('section_block_selected')
        $(`.elem`).removeClass('edit_elem_selected')
        $(`.container`).removeClass('edit_container_selected')
        $('.website_header').removeClass('selected_header')
        $('.header_component').removeClass('header_component_selected')
        $('.header_navList_item').removeClass('header_component_selected')
        $('#website').find('.popup_card').removeClass('popup_window_selected')
        hide_header_drop_down_list();   
        let selection = window.getSelection();
        selection.removeAllRanges();
        $('[contenteditable]').attr('contenteditable',false)
        switch(elem.type){
            case 'section':
                $(`section[key_tree="${key_tree}"]`).addClass('section_selected')
            break;
            case 'section_block':
                $(`.section_block[key_tree="${key_tree}"]`).addClass('section_block_selected')
            break;
            case 'elem':
                $(`.elem[key_tree="${key_tree}"]`).addClass('edit_elem_selected');
            break;
            case 'container':
                $(`.container[key_tree="${key_tree}"]`).addClass('edit_container_selected');
            break;
            //header
            case 'website_header':
                $('.website_header').addClass('selected_header')
            break;
            case 'header_component':
                $(`.header_component[key_tree="${key_tree}"]`).addClass('header_component_selected')
            break;
            case 'header_navList_item':
                $('.header_navList_item').addClass('header_component_selected')
                $(`.header_navList `).addClass('header_component_selected')
            break;
            case 'header_navList_item':
                $('.header_navList_item').addClass('header_component_selected')
                $(`.header_navList `).addClass('header_component_selected')
            break;
            case 'header_drop_down_list':
                show_header_drop_down_list('foodmenu');
            break;
            case 'header_drop_down_list_item':
                show_header_drop_down_list('foodmenu');
            break;
            //popup window
            case 'popup_card':
                if(window.website_popup_opened){
                    $('#website').find('.popup_card').addClass('popup_window_selected')
                }else{
                    open_website_popup();
                }
            break;
        }
    // }catch{
    //     hide_editor_popup('editor')
    // }
}
unselect = function(){
    window.selected = null;
    hide_editor_popup();
    hide_edit_btns()
    $('section').removeClass('section_selected');
    $(`.section_block`).removeClass('section_block_selected')
    $(`.elem`).removeClass('edit_elem_selected')
    $(`.container`).removeClass('edit_container_selected')
    $('.website_header').removeClass('selected_header')
    $('.header_component').removeClass('header_component_selected')
    $('.header_navList_item').removeClass('header_component_selected')
    $('#website').find('.popup_card').removeClass('popup_window_selected')
    hide_header_drop_down_list();   
    let selection = window.getSelection();
    selection.removeAllRanges();
    $('[contenteditable]').attr('contenteditable',false)
}
//
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
    $('.edit_btns').css('display','none')
}
unset_preview_mode = function(){
    $('.set_preview_mode').removeClass('header_icon_selected')
    $('#website').removeClass('preview_mode')
    $('.edit_btns').css('display','flex')
}
preview_mode_toggle = function(){
    if( $('.set_preview_mode').hasClass('header_icon_selected')){
        unset_preview_mode();
    }else{
        set_preview_mode();
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
    try{
        $('#website').animate({
            scrollTop: $(`#website`).find(`[key_tree="${key_tree}"]`).first().offset().top - $('#website').offset().top + $('#website').scrollTop() - 300
        },500)
    }catch{}
})



//
