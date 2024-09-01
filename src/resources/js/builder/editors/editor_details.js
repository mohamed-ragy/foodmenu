set_editor_details = function(editor){
    let editors_container = editor.closest('.editors_container');
    let is_show_details = false;
    let check_val = get_dummy_val(editors_container.find('[editor_details="1"]').first());
    editors_container.find('[editor_details="1"]').each(function(){
        if(get_dummy_val($(this)) !== check_val){
            is_show_details = true;
        }
    })
    if(is_show_details){
        set_dummy_val(editor,'--')
        show_editor_details(editors_container)
    }else{
        if(check_val == '----'){check_val = '--'}
        set_dummy_val(editor,check_val)
    }
}
$('body').on('change','.editor_details_head',function(){
    let editor = $(this);
    let new_val = get_dummy_val(editor);
    let editors_container = editor.closest('.editors_container');
    editors_container.find('[editor_details="1"]').each(function(){
        set_val($(this),new_val);
    })
    // new_action('','');
})
show_editor_details = function(editors_container){
    editors_container.find('.editor_details_toggle').removeClass('ico-arrowRight2').addClass('ico-arrowDown2')
    editors_container.find('.editor_detail_container').addClass('editor_detail_container_show')
    editors_container.find('.editor_details_head').addClass('none')
}
hide_editor_details = function(editors_container){
    editors_container.find('.editor_details_toggle').addClass('ico-arrowRight2').removeClass('ico-arrowDown2')
    editors_container.find('.editor_detail_container').removeClass('editor_detail_container_show')
    editors_container.find('.editor_details_head').removeClass('none')
}
$('body').on('click','.editor_details_toggle',function(e){
    if($(this).hasClass('ico-arrowRight2')){
        show_editor_details($(this).closest('.editors_container'))
    }else if($(this).hasClass('ico-arrowDown2')){
        hide_editor_details($(this).closest('.editors_container'))
    }
})