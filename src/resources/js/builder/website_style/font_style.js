set_font_style_settings = function(){
    set_font_style_vars();
    $('.title_weight_select').removeClass('select_box_selected')
    $(`.title_weight_select[key="${window.template.font_style.title_weight}"]`).addClass('select_box_selected')

    $('.title_line_height_select').removeClass('select_box_selected')
    $(`.title_line_height_select[key="${window.template.font_style.title_line_height}"]`).addClass('select_box_selected')

    $('.title_letter_spacing_select').removeClass('select_box_selected')
    $(`.title_letter_spacing_select[key="${window.template.font_style.title_letter_spacing}"]`).addClass('select_box_selected')

    $('.paragraph_weight_select').removeClass('select_box_selected')
    $(`.paragraph_weight_select[key="${window.template.font_style.paragraph_weight}"]`).addClass('select_box_selected')

    $('.paragraph_line_height_select').removeClass('select_box_selected')
    $(`.paragraph_line_height_select[key="${window.template.font_style.paragraph_line_height}"]`).addClass('select_box_selected')

    $('.paragraph_letter_spacing_select').removeClass('select_box_selected')
    $(`.paragraph_letter_spacing_select[key="${window.template.font_style.paragraph_letter_spacing}"]`).addClass('select_box_selected')
}
draw_font_style = function(){
    $('#font_style').find('.editor_popup_title').text(texts.website_style.font_style)
    $('#font_style').find('.editor_popup_head_btn').text('').append(
        $('<div/>',{class:'backToFontStyle none ico-arrowLeft pointer fs101'}),
    )
    $('#font_style').addClass('w400 h750').find('.editor_popup_body').text('').append(
        $('<div/>',{id:'font_style_pack_container',class:''}).append(
            $('<div/>',{id:'font_style_pack_container'}).append(
                // $('<div/>',{class:'inter fs1 bold',text:texts.website_style.font_style}),
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.font_style_des}),

                $('<div/>',{class:`font_style_pack body_color_theme mnh100`}).append(
                    $('<div/>',{class:`fs103 font_t`,text:texts.website_style.titleFont_style}),
                    $('<div/>',{class:`fs09 font_p`,text:texts.website_style.paragraphFont_style}),
                ),
            ),
            $('<div/>',{class:'row alnC jstfyE w100p mT30'}).append(
                $('<button/>',{class:'btn btn-cancel changeFontStyle',text:texts.website_style.changeFontStyle}),
            ),
            $('<div/>',{class:'w100p mT40'}).append(
                $('<div/>',{class:'fs1 bold mB5',text:texts.website_style.titleFont}),
                $('<div/>',{class:'w100p mB40'}).append(
                    $('<div/>',{class:'font_settings_row'}).append(
                        $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.fontWeight}),
                        $('<div/>',{class:'mis-10 select_box_container',key_tree:'font_style',key:'title_weight'}).append(
                            $('<div/>',{class:`pY5 pX10 title_weight_select select_box`,text:texts.select_elems.bold,key:'bold'}),
                            $('<div/>',{class:`pY5 pX10 title_weight_select select_box`,text:texts.select_elems.normal,key:'normal'}),
                        )
                    ),
                    $('<div/>',{class:'font_settings_row'}).append(
                        $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.lineHeight}),
                        $('<div/>',{class:'mis-10 select_box_container',key_tree:'font_style',key:'title_line_height'}).append(
                            $('<div/>',{class:`pY5 w25 title_line_height_select select_box`,text:'XS',key:'.8em'}),
                            $('<div/>',{class:`pY5 w25 title_line_height_select select_box`,text:'S',key:'1.2em'}),
                            $('<div/>',{class:`pY5 w25 title_line_height_select select_box`,text:'M',key:'1.6em'}),
                            $('<div/>',{class:`pY5 w25 title_line_height_select select_box`,text:'L',key:'2em'}),
                            $('<div/>',{class:`pY5 w25 title_line_height_select select_box`,text:'XL',key:'2.4em'}),
                        )
                    ),
                    $('<div/>',{class:'font_settings_row brdrB0'}).append(
                        $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.letterSpacing}),
                        $('<div/>',{class:'mis-10 select_box_container',key_tree:'font_style',key:'title_letter_spacing'}).append(
                            $('<div/>',{class:`pY5 w25 title_letter_spacing_select select_box`,text:'XS',key:'0.01em'}),
                            $('<div/>',{class:`pY5 w25 title_letter_spacing_select select_box`,text:'S',key:'0.04em'}),
                            $('<div/>',{class:`pY5 w25 title_letter_spacing_select select_box`,text:'M',key:'0.08em'}),
                            $('<div/>',{class:`pY5 w25 title_letter_spacing_select select_box`,text:'L',key:'0.12em'}),
                            $('<div/>',{class:`pY5 w25 title_letter_spacing_select select_box`,text:'XL',key:'0.16em'}),
                        )
                    ),
                ),
                $('<div/>',{class:'fs1 bold mB5',text:texts.website_style.paragraphFont}),
                $('<div/>',{class:'w100p'}).append(
                    $('<div/>',{class:'font_settings_row'}).append(
                        $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.fontWeight}),

                        $('<div/>',{class:'mis-10 select_box_container',key_tree:'font_style',key:'paragraph_weight'}).append(
                            $('<div/>',{class:`pY5 pX10 paragraph_weight_select select_box`,text:texts.select_elems.bold,key:'bold'}),
                            $('<div/>',{class:`pY5 pX10 paragraph_weight_select select_box`,text:texts.select_elems.normal,key:'normal'}),
                        )
                    ),
                    $('<div/>',{class:'font_settings_row'}).append(
                        $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.lineHeight}),
                        $('<div/>',{class:'mis-10 select_box_container',key_tree:'font_style',key:'paragraph_line_height'}).append(
                            $('<div/>',{class:`pY5 w25 paragraph_line_height_select select_box`,text:'XS',key:'.8em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_line_height_select select_box`,text:'S',key:'1.2em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_line_height_select select_box`,text:'M',key:'1.6em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_line_height_select select_box`,text:'L',key:'2em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_line_height_select select_box`,text:'XL',key:'2.4em'}),
                        )
                    ),
                    $('<div/>',{class:'font_settings_row brdrB0'}).append(
                        $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.letterSpacing}),
                        $('<div/>',{class:'mis-10 select_box_container',key_tree:'font_style',key:'paragraph_letter_spacing'}).append(
                            $('<div/>',{class:`pY5 w25 paragraph_letter_spacing_select select_box`,text:'XS',key:'0.01em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_letter_spacing_select select_box`,text:'S',key:'0.04em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_letter_spacing_select select_box`,text:'M',key:'0.08em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_letter_spacing_select select_box`,text:'L',key:'0.12em'}),
                            $('<div/>',{class:`pY5 w25 paragraph_letter_spacing_select select_box`,text:'XL',key:'0.16em'}),
                        )
                    ),
                ),
            )
        ),
        $('<div/>',{id:'font_style_packs_container',class:'none'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.website_style.fontStyles}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.fontStyles_des}),
            $('<div/>',{class:'font_style_packs_container '}).append(
                $('<div/>',{class:'font_style_pack_loading'}).append(
                    $('<div/>',{class:'cardLoading br5 mY5 h20 w150'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                ),
                $('<div/>',{class:'font_style_pack_loading'}).append(
                    $('<div/>',{class:'cardLoading br5 mY5 h20 w150'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                ),
                $('<div/>',{class:'font_style_pack_loading'}).append(
                    $('<div/>',{class:'cardLoading br5 mY5 h20 w150'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                ),
                $('<div/>',{class:'font_style_pack_loading'}).append(
                    $('<div/>',{class:'cardLoading br5 mY5 h20 w150'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                    $('<div/>',{class:'cardLoading br5 mY5 h10 w250'}),
                ),
            )
        ),
    )
    try{
        set_font_style_settings();
    }catch{}
}

draw_font_styles = function(){
    $('.font_style_packs_container').text('')
    for(const key in window.fonts){
        $('.font_style_packs_container').append(
            $('<div/>',{class:`font_style_pack font_style_pack_change body_color_theme`,key:key}).append(
                $('<div/>',{style:`font-family:${window.fonts[key].title}`,class:`font_t pointer fs103`,text:texts.website_style.titleFont_style}),
                $('<div/>',{style:`font-family:${window.fonts[key].paragraph}`,class:`font-p pointer fs09`,text:texts.website_style.paragraphFont_style}),
            )
        )
    }
}
get_fonts = function(){
    if(window.fonts.length == 0){
        $.ajax({
            url:'api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                get_fonts:true,
            },success:function(r){
                window.fonts = r.fonts;
                draw_font_styles();
            }
        })
    }else{
        draw_color_palettes();
    }
}
//events
$('html,body').on('click','.changeFontStyle',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('#font_style_pack_container'),$('#font_style_packs_container'))
    $('.backToFontStyle').removeClass('none');
    get_fonts();
})
$('html,body').on('click','.backToFontStyle',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('#font_style_pack_container'),$('#font_style_packs_container'))
    $('.backToFontStyle').addClass('none');
})
$('html,body').on('click','.font_style_pack_change',function(e){
    e.stopImmediatePropagation();
    let font = window.fonts[$(this).attr('key')];
    window.template.font_style.title = font.title;
    window.template.font_style.paragraph = font.paragraph;
    new_action();
    editor_popup_to_parent($('#font_style_pack_container'),$('#font_style_packs_container'))
    $('.backToFontStyle').addClass('none');
})
