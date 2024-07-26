draw_png_icon_selector = function(data){
    let editor = $('<div/>',{
        class:`editor png_icon_selector_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        $('<div/>',{class:'w100p editor_popup_brdrT editor_popup_row_sticky pT20 pB10 row alnC jstfyC'}).append(
            draw_input_list({
                dummy:true,
                dummy_class:'png_icon_selector_tags',
                selections:[
                    {name:texts.png_icon_tags.food_and_beverages,val:'food_and_beverages'},
                    {name:texts.png_icon_tags.utensils_and_kitchenware,val:'utensils_and_kitchenware'},
                    {name:texts.png_icon_tags.restaurant_operations,val:'restaurant_operations'},
                    {name:texts.png_icon_tags.food_ingredients,val:'food_ingredients'},
                    {name:texts.png_icon_tags.promotions_and_marketing,val:'promotions_and_marketing'},
                    {name:texts.png_icon_tags.miscellaneous,val:'miscellaneous'},
                ]
            })
        ),
        $('<div/>',{class:'png_icon_selector_container'})   
    )
    return editor;
}
set_png_icon_selector = function(editor){
    let val = get_editor_val(editor);
    if(typeof(get_dummy_val(editor.find('.png_icon_selector_tags'))) === 'undefined'){
        set_dummy_input_list(editor,'food_and_beverages');
        draw_png_icon_list(editor,'food_and_beverages');
    }
}
draw_png_icon_list = function(editor,tag){
    let val = get_editor_val(editor);
    let icon_val = val.replace(`/storage/imgs/png_icons/${tag}/`,'').replace('.png','');
    editor.find('.png_icon_selector_container').text('');
    for(const key in window.png_icons[tag]){
        let icon = window.png_icons[tag][key];
        editor.find('.png_icon_selector_container').append(
            $('<img/>',{class:`png_icon_preview ${icon_val == icon ? 'png_icon_preview_selected' : ''}`,src:`/storage/imgs/png_icons/${tag}/${icon}.png`})
        );
    }
}
//
$('body').on('click','.png_icon_preview',function(){
    let new_val = $(this).attr('src');
    set_val($(this).closest('.png_icon_selector_editor'),new_val);
    new_action();
})
$('body').on('change','.png_icon_selector_tags',function(){
    let tag = get_dummy_val($(this));
    draw_png_icon_list($(this).closest('.png_icon_selector_editor'),tag)
})