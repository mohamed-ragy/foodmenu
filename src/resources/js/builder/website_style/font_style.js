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
    $('#font_style').find('.editor_popup_title').text(texts.website_style.font_style)
    $('#font_style').addClass('w400').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'editor_popup_container',key:'font_style'}).append(
            $('<div/>',{id:'font_style_pack_container'}).append(
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.font_style_des}),
            ),

            $('<div/>',{class:'fs1 bold mB5 mT20',text:texts.styling.font_1}),
            draw_font_style_selector('font_style.font_1','name'),
            draw_number_picker({
                keys_arr:[{key:'line_height',key_tree:'font_style.font_1'}],
                name:texts.styling.lineHeight,
                step:.1,
                unit:'em'
            }),
            draw_number_picker({
                keys_arr:[{key:'letter_spacing',key_tree:'font_style.font_1'}],
                name:texts.styling.letterSpacing,
                step:.1,
                unit:'px'
            }),
            $('<div/>',{class:'fs1 bold mB5 mT30',text:texts.styling.font_2}),
            draw_font_style_selector('font_style.font_2','name'),
            draw_number_picker({
                keys_arr:[{key:'line_height',key_tree:'font_style.font_2'}],
                name:texts.styling.lineHeight,
                step:.1,
                unit:'em'
            }),
            draw_number_picker({
                keys_arr:[{key:'letter_spacing',key_tree:'font_style.font_2'}],
                name:texts.styling.letterSpacing,
                step:.1,
                unit:'px'
            }),
            $('<div/>',{class:'fs1 bold mB5 mT30',text:texts.styling.font_3}),
            draw_font_style_selector('font_style.font_3','name'),
            draw_number_picker({
                keys_arr:[{key:'line_height',key_tree:'font_style.font_3'}],
                name:texts.styling.lineHeight,
                step:.1,
                unit:'em'
            }),
            draw_number_picker({
                keys_arr:[{key:'letter_spacing',key_tree:'font_style.font_3'}],
                name:texts.styling.letterSpacing,
                step:.1,
                unit:'px'
            }),
            $('<div/>',{class:'fs1 bold mB5 mT30',text:texts.website_style.importGoogleFont}),
            $('<div/>',{class:'w100p'}).append(
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{text:texts.website_style.font_name}),
                    $('<input/>',{class:'google_font_input google_font_input_name input_editor_popup',key:'custom_name',key_tree:'font_style'})
                ),
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{text:texts.website_style.font_link}),
                    $('<input/>',{class:'google_font_input google_font_input_link input_editor_popup',key:'custom_link',key_tree:'font_style'})
                ),
                $('<div/>',{class:'row alnC jstfyE w100p-20 mX10'}).append(
                    $('<button/>',{class:'br2 google_font_clear_btn btn btn-cancel fs08 pY3 pX10 mnw0 mX5',text:texts.website_style.clear}),
                    $('<button/>',{class:'br2 google_font_import_btn btn btn-cancel fs08 pY3 pX10 mnw0 m0',text:texts.website_style.import}),
                )
            ),
        ),
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
