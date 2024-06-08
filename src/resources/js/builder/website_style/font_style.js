set_google_custom_font = function(){
    if(window.template.font_style.google_font.link == null || window.template.font_style.google_font.link == ''){
        $('.google_font_input_name').val('');
        $('.google_font_input_link').val('');
    }else{
        $('.google_font_input_name').val(window.template.font_style.google_font.name);
        $('.google_font_input_link').val(window.template.font_style.google_font.link);
        try{
            let font_link = window.template.font_style.google_font.link.split('family=')[1];
            font_link = font_link.split("')")[0];
            $('#custom_font').attr('href',`https://fonts.googleapis.com/css2?family=${font_link}`)

        }catch{
        }

    }

}
draw_font_style = function(){
    return;
    $('#font_style').find('.editor_popup_title').text(texts.website_style.font_style)
    $('#font_style').addClass('w300 h370').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'editor_popup_container mT10',key:'font_style'}).append(
            draw_editor_show_container({key:'font_style_1',name:texts.styling.font_1,row_class:true}),
            draw_editor_show_container({key:'font_style_2',name:texts.styling.font_2,row_class:true}),
            draw_editor_show_container({key:'font_style_3',name:texts.styling.font_3,row_class:true}),
            draw_editor_show_container({key:'google_font',name:texts.website_style.importGoogleFont,row_class:true}),
        ),
        $('<div/>',{class:'editor_popup_container mT10 none',key:'font_style_1',parent_key:'font_style'}).append(
            $('<div/>',{class:'inter fs09 bold m10',text:texts.styling.font_1}),
            draw_font_style_selector('font_style.font_1','name'),
            draw_number_picker({
                keys_arr:[{key:'line_height',key_tree:'font_style.font_1'}],
                name:texts.styling.lineHeight,
                step:.1,
                units:['em'],
            }),
            draw_number_picker({
                keys_arr:[{key:'letter_spacing',key_tree:'font_style.font_1'}],
                name:texts.styling.letterSpacing,
                step:.1,
                units:['px'],
            }),
        ),
        $('<div/>',{class:'editor_popup_container mT10 none',key:'font_style_2',parent_key:'font_style'}).append(
            $('<div/>',{class:'inter fs09 bold m10',text:texts.styling.font_2}),
            draw_font_style_selector('font_style.font_2','name'),
            draw_number_picker({
                keys_arr:[{key:'line_height',key_tree:'font_style.font_2'}],
                name:texts.styling.lineHeight,
                step:.1,
                units:['em'],
            }),
            draw_number_picker({
                keys_arr:[{key:'letter_spacing',key_tree:'font_style.font_2'}],
                name:texts.styling.letterSpacing,
                step:.1,
                units:['px'],
            }),
        ),
        $('<div/>',{class:'editor_popup_container mT10 none',key:'font_style_3',parent_key:'font_style'}).append(
            $('<div/>',{class:'inter fs09 bold m10',text:texts.styling.font_3}),
            draw_font_style_selector('font_style.font_3','name'),
            draw_number_picker({
                keys_arr:[{key:'line_height',key_tree:'font_style.font_3'}],
                name:texts.styling.lineHeight,
                step:.1,
                units:['em'],
            }),
            draw_number_picker({
                keys_arr:[{key:'letter_spacing',key_tree:'font_style.font_3'}],
                name:texts.styling.letterSpacing,
                step:.1,
                units:['px'],
            }),
        ),
        $('<div/>',{class:'editor_popup_container mT10 none',key:'google_font',parent_key:'font_style'}).append(
            $('<div/>',{class:'inter fs09 bold m10',text:texts.website_style.importGoogleFont}),
            $('<div/>',{class:'editor_popup_row'}).append(
                $('<div/>',{text:texts.website_style.font_name}),
                $('<input/>',{class:'google_font_input google_font_input_name input_editor_popup',key:'custom_name',key_tree:'font_style'})
            ),
            $('<div/>',{class:'editor_popup_row'}).append(
                $('<div/>',{text:texts.website_style.font_link}),
                $('<input/>',{class:'google_font_input google_font_input_link input_editor_popup',key:'custom_link',key_tree:'font_style'})
            ),
            $('<div/>',{class:'row alnC jstfyE w100p-20 mX10'}).append(
                $('<button/>',{class:'br2 google_font_clear_btn btn btn-cancel fs08 pY1 pX10  mX5',text:texts.website_style.clear}),
                $('<button/>',{class:'br2 google_font_import_btn btn btn-cancel fs08 pY1 pX10  m0',text:texts.website_style.import}),
            )
        )
    )
    set_google_custom_font();
}


//events

$('body').on('click','.google_font_import_btn',function(e){
    //e.stopImmediatePropagation();
    window.template.font_style.google_font.name = $('.google_font_input_name').val();
    window.template.font_style.google_font.link = $('.google_font_input_link').val();
    set_google_custom_font();
    new_action();
})
$('body').on('click','.google_font_clear_btn',function(e){
    //e.stopImmediatePropagation();
    window.template.font_style.google_font.name = '';
    window.template.font_style.google_font.link = '';
    set_google_custom_font();
    new_action();
})
