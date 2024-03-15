set_colors_vars = function(){
    $(':root').css('--color_1',`rgb(${window.template.website_colors.c1.r},${window.template.website_colors.c1.g},${window.template.website_colors.c1.b})`);
    $(':root').css('--color_2',`rgb(${window.template.website_colors.c2.r},${window.template.website_colors.c2.g},${window.template.website_colors.c2.b})`);
    $(':root').css('--color_3',`rgb(${window.template.website_colors.c3.r},${window.template.website_colors.c3.g},${window.template.website_colors.c3.b})`);
    $(':root').css('--color_4',`rgb(${window.template.website_colors.c4.r},${window.template.website_colors.c4.g},${window.template.website_colors.c4.b})`);

    $(':root').css('--color_star',`rgb(${window.template.website_colors.c_star.r},${window.template.website_colors.c_star.g},${window.template.website_colors.c_star.b})`);
    $(':root').css('--color_error',`rgb(${window.template.website_colors.c_error.r},${window.template.website_colors.c_error.g},${window.template.website_colors.c_error.b})`);
    $(':root').css('--color_success',`rgb(${window.template.website_colors.c_success.r},${window.template.website_colors.c_success.g},${window.template.website_colors.c_success.b})`);
    $(':root').css('--color_warning',`rgb(${window.template.website_colors.c_warning.r},${window.template.website_colors.c_warning.g},${window.template.website_colors.c_warning.b})`);



}
draw_website_colors = function(){
    $('#website_colors').find('.editor_popup_head_btn').text('').append(
        $('<div/>',{class:'backToColorPalete none ico-arrowLeft pointer fs101'}),
    )
    $('#website_colors').addClass('w400 h1000').find('.editor_popup_body').text('').append(
        $('<div/>',{id:'color_palette_container'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.website_style.color_palettes}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.color_palettes_des}),
            $('<div/>',{class:'row w100p alnC jstfyC'}).append(
                $('<div/>',{class:'color_edit bgc_1',color:'c1'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c1'}),
                ),
                $('<div/>',{class:'color_edit bgc_2',color:'c2'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c2'}),
                ),
                $('<div/>',{class:'color_edit bgc_3',color:'c3'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c3'}),
                ),
                $('<div/>',{class:'color_edit bgc_4',color:'c4'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c4'}),
                ),
            ),
            $('<div/>',{class:'row alnC jstfyE w100p mT30'}).append(
                $('<button/>',{class:'btn btn-cancel browseColorPalettes',text:texts.website_style.browsePalettes}),
            ),
            $('<div/>',{class:'mT40 w100p mB20'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.colorThemes}),
                $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.colorThemes_des}),
                $('<div/>',{class:'row wrap alnC jstfyC'}).append(
                    $('<div/>',{class:'color_theme color_1_2',color_theme:'color_1_2'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_1_2})
                    ),
                    $('<div/>',{class:'color_theme color_1_3',color_theme:'color_1_3'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_1_3})
                    ),
                    $('<div/>',{class:'color_theme color_1_4',color_theme:'color_1_4'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_1_4})
                    ),
                    $('<div/>',{class:'color_theme color_2_1',color_theme:'color_2_1'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_2_1})
                    ),
                    $('<div/>',{class:'color_theme color_2_3',color_theme:'color_2_3'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_2_3})
                    ),
                    $('<div/>',{class:'color_theme color_2_4',color_theme:'color_2_4'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_2_4})
                    ),
                    $('<div/>',{class:'color_theme color_3_1',color_theme:'color_3_1'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_3_1})
                    ),
                    $('<div/>',{class:'color_theme color_3_2',color_theme:'color_3_2'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_3_2})
                    ),
                    $('<div/>',{class:'color_theme color_3_4',color_theme:'color_3_4'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_3_4})
                    ),
                    $('<div/>',{class:'color_theme color_4_1',color_theme:'color_4_1'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_4_1})
                    ),
                    $('<div/>',{class:'color_theme color_4_2',color_theme:'color_4_2'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_4_2})
                    ),
                    $('<div/>',{class:'color_theme color_4_3',color_theme:'color_4_3'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_4_3})
                    ),
                )
            ),
            $('<div/>',{class:'mT40 w100p'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.otherColors}),
                $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.otherColors_des}),
                $('<div/>',{class:'w100p'}).append(
                    $('<div/>',{class:'other_color_row'}).append(
                        $('<div/>',{class:'fs09 taS mis-10',text:texts.website_style.ratingStarsColor}),
                        $('<div/>',{class:'taE mie-10 color_s_circle color_edit bgc_star',color:'c_star'}).append(
                            $('<input/>',{class:'color_edit_input vH absolute',type:'color',color:'c_star'}),
                        ),
                    ),
                    $('<div/>',{class:'other_color_row'}).append(
                        $('<div/>',{class:'fs09 taS mis-10',text:texts.website_style.successMsgColor}),
                        $('<div/>',{class:'taE mie-10 color_s_circle color_edit bgc_success',color:'c_success'}).append(
                            $('<input/>',{class:'color_edit_input vH absolute',type:'color',color:'c_success'}),
                        ),
                    ),
                    $('<div/>',{class:'other_color_row'}).append(
                        $('<div/>',{class:'fs09 taS mis-10',text:texts.website_style.errorMsgColor}),
                        $('<div/>',{class:'taE mie-10 color_s_circle color_edit bgc_error',color:'c_error'}).append(
                            $('<input/>',{class:'color_edit_input vH absolute',type:'color',color:'c_error'}),
                        ),
                    ),
                    $('<div/>',{class:'other_color_row'}).append(
                        $('<div/>',{class:'fs09 taS mis-10',text:texts.website_style.warningMsgColor}),
                        $('<div/>',{class:'taE mie-10 color_s_circle color_edit bgc_warning',color:'c_warning'}).append(
                            $('<input/>',{class:'color_edit_input vH absolute',type:'color',color:'c_warning'}),
                        ),
                    ),
                )
            ),
        ),
        $('<div/>',{id:'color_palettes_container',class:'none'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.website_style.colorsPalettes}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.colorsPalettes_des}),
            $('<div/>',{class:'color_palettes_container row alnC jstfyC wrap '})
        )

    )

    for(const key in window.colors){
        $('.color_palettes_container').append(
            $('<div/>',{class:'color_palette_preview',key:key}).append(
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:rgb(${window.colors[key].c1.r},${window.colors[key].c1.g},${window.colors[key].c1.b})`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:rgb(${window.colors[key].c2.r},${window.colors[key].c2.g},${window.colors[key].c2.b})`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:rgb(${window.colors[key].c3.r},${window.colors[key].c3.g},${window.colors[key].c3.b})`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:rgb(${window.colors[key].c4.r},${window.colors[key].c4.g},${window.colors[key].c4.b})`})
            )
        )
    }
}
///
rgb_To_Hex =  function (r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
hex_to_rgb = function(hex){
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
//events
$('html,body').on('click','.color_edit',function(e){
    e.stopImmediatePropagation();
    let r = window.template.website_colors[$(this).attr('color')].r;
    let g = window.template.website_colors[$(this).attr('color')].g;
    let b = window.template.website_colors[$(this).attr('color')].b;
    $(this).find('.color_edit_input').val(rgb_To_Hex(r,g,b))
    $(this).find('.color_edit_input')[0].click()
})
$('html,body').on('input','.color_edit_input',function(e){
    e.stopImmediatePropagation()
    let color = hex_to_rgb($(this).val())
    window.template.website_colors[$(this).attr('color')].r = color.r;
    window.template.website_colors[$(this).attr('color')].g = color.g;
    window.template.website_colors[$(this).attr('color')].b = color.b;
    set_colors_vars()

})
$('html,body').on('change','.color_edit_input',function(e){
    e.stopImmediatePropagation()
    new_action();

})
//
$('html,body').on('click','.browseColorPalettes',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('#color_palette_container'),$('#color_palettes_container'))
    $('.backToColorPalete').removeClass('none');
})
$('html,body').on('click','.backToColorPalete',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('#color_palette_container'),$('#color_palettes_container'))
    $('.backToColorPalete').addClass('none');
})
$('html,body').on('click','.color_palette_preview',function(e){
    e.stopImmediatePropagation();
    let color = window.colors[$(this).attr('key')]
    window.template.website_colors.c1 = JSON.parse(JSON.stringify(color.c1));
    window.template.website_colors.c2 = JSON.parse(JSON.stringify(color.c2));
    window.template.website_colors.c3 = JSON.parse(JSON.stringify(color.c3));
    window.template.website_colors.c4 = JSON.parse(JSON.stringify(color.c4));
    new_action();
    editor_popup_to_parent($('#color_palette_container'),$('#color_palettes_container'))
    $('.backToColorPalete').addClass('none');
})
