draw_select_background_filter = function(data){
    let editor = $('<div/>',{
        class:`editor select_background_filter`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    });
    let background_blend_mode = get_inputList_obj('background_blend_mode');
    for(const key in background_blend_mode){
        let filter = background_blend_mode[key];

        editor.append(
            $('<div/>',{
                class:`background_filter_preview`,
                filter_val:filter.val,
            }).append(
                $('<div/>',{
                    class:`background_filter_preview_img`,
                    style:`background-blend-mode:${filter.val};`
                }),
                $('<div/>',{class:'background_filter_preview_name',text:texts.select_elems[`_${filter.name}`]})
            )

        )
    }
    return editor;
}
set_select_background_filter = function(editor){
    let val = get_editor_val(editor);
    console.log(val)
    $(`.background_filter_preview`).removeClass('background_filter_preview_selected')
    $(`.background_filter_preview[filter_val="${val}"]`).addClass('background_filter_preview_selected')
    let image_url = $('.background_image_editor').find('img').attr('src');
    $('.background_filter_preview_img').css('background-image',`url(${image_url})`)
    let blend_color = get_dummy_val($('.background_blend_color_editor'));
    $('.background_filter_preview_img').css({
        'background-image':`url(${image_url})`,
        'background-color':blend_color,
    })
}
$('body').on('change','.background_image_editor',function(){
    let image_url = $('.background_image_editor').find('img').attr('src');
    $('.background_filter_preview_img').css({
        'background-image':`url(${image_url})`,
    })

})
$('body').on('change','.background_blend_color_editor',function(){
    let blend_color = get_dummy_val($('.background_blend_color_editor'));
    $('.background_filter_preview_img').css({
        'background-color':blend_color,
    })
})
$('body').on('click','.background_filter_preview',function(){
    let new_val = $(this).attr('filter_val');
    let editor = $(this).closest('.select_background_filter');
    set_val(editor,new_val);
    new_action();
})