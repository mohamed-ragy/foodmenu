draw_aspect_ratio_editor = function(data){
    let editor = $('<div/>',{
        class:`editor aspect_ratio_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'w100p row alnC jstfyC wrap'}).append(
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'auto',style:`aspect-ratio:auto;height:50px;`,text:texts.styling.auto}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'1/1',style:`aspect-ratio:1/1;`,text:'1:1'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'4/3',style:`aspect-ratio:4/3;`,text:'4:3'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'3/2',style:`aspect-ratio:3/2;`,text:'3:2'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'16/9',style:`aspect-ratio:16/9;`,text:'16:9'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'2/1',style:`aspect-ratio:2/1;`,text:'2:1'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'31/9',style:`aspect-ratio:31/9;`,text:'31:9'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'5/4',style:`aspect-ratio:5/4;`,text:'5:4'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'3/4',style:`aspect-ratio:3/4;`,text:'3:4'}),
            $('<div/>',{class:'aspect_ratio_item',aspect_ratio:'9/16',style:`aspect-ratio:9/16;`,text:'9:16'}),
        )
    );
    return editor;
}
set_aspect_ratio_editor = function(editor){
    let val = get_editor_val(editor);
    editor.find('.aspect_ratio_item').removeClass('aspect_ratio_item_selected');
    editor.find(`.aspect_ratio_item[aspect_ratio="${val}"]`).addClass('aspect_ratio_item_selected');
}
$('body').on('click','.aspect_ratio_item',function(){
    let editor = $(this).closest('.aspect_ratio_editor');
    let new_val = $(this).attr('aspect_ratio');
    set_val(editor,new_val);
    new_action(editor.attr('render'));
    set_aspect_ratio_editor(editor)
})