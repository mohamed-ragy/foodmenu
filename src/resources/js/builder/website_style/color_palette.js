set_colors_vars = function(){
    $(':root').css('--color_1',`rgb(${window.template.colors.c1.r},${window.template.colors.c1.g},${window.template.colors.c1.b})`);
    $(':root').css('--color_2',`rgb(${window.template.colors.c2.r},${window.template.colors.c2.g},${window.template.colors.c2.b})`);
    $(':root').css('--color_3',`rgb(${window.template.colors.c3.r},${window.template.colors.c3.g},${window.template.colors.c3.b})`);
    $(':root').css('--color_4',`rgb(${window.template.colors.c4.r},${window.template.colors.c4.g},${window.template.colors.c4.b})`);
}
draw_color_palette = function(){
    $('#color_palette').find('.editor_popup_body').text('').append(
        $('<div/>',{id:'color_palette_container'}).append(
            $('<div/>',{class:'fs1 bold',text:texts.website_style.colors}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.colors_des}),
            $('<div/>',{class:'row w100p alnC jstfyC'}).append(
                $('<div/>',{class:'color_edit color_1',color:'c1'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c1'}),
                ),
                $('<div/>',{class:'color_edit color_2',color:'c2'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c2'}),
                ),
                $('<div/>',{class:'color_edit color_3',color:'c3'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c3'}),
                ),
                $('<div/>',{class:'color_edit color_4',color:'c4'}).append(
                    $('<div/>',{class:'ico-edit color_edit_icon'}),
                    $('<input/>',{class:'color_edit_input vH',type:'color',color:'c4'}),
                ),
            ),
            $('<div/>',{class:'row alnC jstfyE w100p mT30'}).append(
                $('<button/>',{class:'btn btn-cancel browseColorPalettes',text:texts.website_style.browsePalettes}),
            ),
            $('<div/>',{class:'mT40 w100p '}).append(
            $('<div/>',{class:'fs1 bold',text:texts.website_style.colorThemes}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.colorThemes_des}),
            $('<div/>',{class:'row wrap alnC jstfyC'}).append(
                    $('<div/>',{class:'color_theme color_1_2',color_theme:'color_1_2'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',1)})
                    ),
                    $('<div/>',{class:'color_theme color_1_3',color_theme:'color_1_3'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',2)})
                    ),
                    $('<div/>',{class:'color_theme color_1_4',color_theme:'color_1_4'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',3)})
                    ),
                    $('<div/>',{class:'color_theme color_2_1',color_theme:'color_2_1'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',4)})
                    ),
                    $('<div/>',{class:'color_theme color_2_3',color_theme:'color_2_3'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',5)})
                    ),
                    $('<div/>',{class:'color_theme color_2_4',color_theme:'color_2_4'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',6)})
                    ),
                    $('<div/>',{class:'color_theme color_3_1',color_theme:'color_3_1'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',7)})
                    ),
                    $('<div/>',{class:'color_theme color_3_2',color_theme:'color_3_2'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',8)})
                    ),
                    $('<div/>',{class:'color_theme color_3_4',color_theme:'color_3_4'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',9)})
                    ),
                    $('<div/>',{class:'color_theme color_4_1',color_theme:'color_4_1'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',10)})
                    ),
                    $('<div/>',{class:'color_theme color_4_2',color_theme:'color_4_2'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',12)})
                    ),
                    $('<div/>',{class:'color_theme color_4_3',color_theme:'color_4_3'}).append(
                        $('<div/>',{class:'ico-check0 color_theme_check'}),
                        $('<div/>',{class:'',text:texts.website_style.colorThemeTxt.replace(':number:',12)})
                    ),
                )
            )
        ),
        $('<div/>',{id:'color_palettes_container',class:'none'}).append(
            $('<button/>',{class:'backToColorPalete btn btn-cancel',text:texts.back}),
            $('<div/>',{class:'',text:texts.website_style.browsePalettes}),
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
    setDefault_color_theme();
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
    let r = window.template.colors[$(this).attr('color')].r;
    let g = window.template.colors[$(this).attr('color')].g;
    let b = window.template.colors[$(this).attr('color')].b;
    $(this).find('.color_edit_input').val(rgb_To_Hex(r,g,b))
    $(this).find('.color_edit_input')[0].click()
})
$('html,body').on('input','.color_edit_input',function(e){
    e.stopImmediatePropagation()
    let color = hex_to_rgb($(this).val())
    window.template.colors[$(this).attr('color')].r = color.r;
    window.template.colors[$(this).attr('color')].g = color.g;
    window.template.colors[$(this).attr('color')].b = color.b;
    set_colors_vars()

})
$('html,body').on('change','.color_edit_input',function(e){
    e.stopImmediatePropagation()
    new_action();

})
setDefault_color_theme = function(){
    $('.color_theme').find('.color_theme_check').removeClass('ico-check1').addClass('ico-check0');
    $(`.color_theme[color_theme="${window.template.colors.default_color_theme}"]`).find('.color_theme_check').removeClass('ico-check0').addClass('ico-check1');
}
$('html,body').on('click','.color_theme',function(e){
    e.stopImmediatePropagation();
    window.template.colors.default_color_theme = $(this).attr('color_theme');
    setDefault_color_theme();
    new_action();
})
//
$('html,body').on('click','.browseColorPalettes',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('#color_palette_container'),$('#color_palettes_container'))
})
$('html,body').on('click','.backToColorPalete',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('#color_palette_container'),$('#color_palettes_container'))
})
