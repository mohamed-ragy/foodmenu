
draw_website_colors = function(){
    $('#website_colors').find('.editor_popup_title').text(texts.website_style.website_colors)
    $('#website_colors').addClass('w400 h1000').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'editor_popup_container',key:'website_colors'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.styling.color_palettes}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.styling.color_palettes_des}),
            $('<div/>',{class:'row alnC jstfyE w100p mT30'}).append(
                $('<button/>',{class:'btn btn-cancel editor_popup_show_container get_color_palettes',key:'color_palettes',text:texts.styling.browsePalettes}),
            ),
            $('<div/>',{class:'mT40 w100p mB20'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.styling.colorThemes}),
                $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.styling.colorThemes_des}),
                $('<div/>',{class:'w100p'}).append(
                    draw_editor_show_container({key:'color_theme_1',name:texts.styling.color_theme_1,container_class:'color_theme color_theme_1',attr:{color_theme:'color_theme_1'},row_class:false}),
                    draw_editor_show_container({key:'color_theme_2',name:texts.styling.color_theme_2,container_class:'color_theme color_theme_2',attr:{color_theme:'color_theme_2'},row_class:false}),
                    draw_editor_show_container({key:'color_theme_3',name:texts.styling.color_theme_3,container_class:'color_theme color_theme_3',attr:{color_theme:'color_theme_3'},row_class:false}),
                    draw_editor_show_container({key:'color_theme_4',name:texts.styling.color_theme_4,container_class:'color_theme color_theme_4',attr:{color_theme:'color_theme_4'},row_class:false}),
                )
            ),
        ),
        $('<div/>',{class:'editor_popup_container none',key:'color_palettes',parent_key:'website_colors'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.styling.colorsPalettes}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.styling.colorsPalettes_des}),
            $('<div/>',{class:'color_palettes_container row wrap alnC jstfyC w100p'})
        ),

    )
    for(i=1;i<=4;i++){
        $('#website_colors').find('.editor_popup_body').append(
            $('<div/>',{class:'editor_popup_container none',key:`color_theme_${i}`,parent_key:'website_colors'}).append(
                $('<div/>',{class:'inter fs1 bold mB20',text:texts.styling[`color_theme_${i}`]}),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`bg`}],name:texts.styling.theme_color}),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`txt`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`a`}],name:texts.styling.acolor}),
                draw_select_box({
                    keys_arr:[{key:`adecoration`,key_tree:`website_colors.color_themes.color_theme_${i}`}],
                    name:texts.styling.adecoration,
                    selections:[
                        {text:texts.styling.normal,class:'pX10',key:'unset'},
                        {text:texts.styling.underline,class:'pX10',key:'underline'},
                    ],
                }),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`a_hover`}],name:texts.styling.acolorHover}),
                draw_select_box({
                    keys_arr:[{key:`adecoration_hover`,key_tree:`website_colors.color_themes.color_theme_${i}`}],
                    name:texts.styling.acolorHoverDecoration,
                    selections:[
                        {text:texts.styling.normal,class:'pX10',key:'unset'},
                        {text:texts.styling.underline,class:'pX10',key:'underline'},
                    ],
                }),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`star`}],name:texts.styling.color_star}),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`success`}],name:texts.styling.color_success}),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`error`}],name:texts.styling.color_error}),
                draw_color_picker({keys_arr:[{key_tree:`website_colors.color_themes.color_theme_${i}`,key:`warning`}],name:texts.styling.color_warning}),

            ),
        )
    }
    for(const key in window.colors){
        $('.color_palettes_container').append(
            $('<div/>',{class:'color_palette_preview',key:key}).append(
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_theme_1.bg}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_theme_2.bg}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_theme_3.bg}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_theme_4.bg}`}),
            )
        )
    }
}
///

$('body').on('click','.color_palette_preview',function(e){
    //e.stopImmediatePropagation();
    let colors = window.colors[$(this).attr('key')]
    window.template.website_colors.color_themes.color_theme_1.bg = colors.color_theme_1.bg
    window.template.website_colors.color_themes.color_theme_1.txt = colors.color_theme_1.txt
    window.template.website_colors.color_themes.color_theme_1.a = colors.color_theme_1.a
    window.template.website_colors.color_themes.color_theme_1.a_hover = colors.color_theme_1.a_hover
    window.template.website_colors.color_themes.color_theme_1.star = colors.color_theme_1.star
    window.template.website_colors.color_themes.color_theme_1.success = colors.color_theme_1.success
    window.template.website_colors.color_themes.color_theme_1.error = colors.color_theme_1.error
    window.template.website_colors.color_themes.color_theme_1.warning = colors.color_theme_1.warning

    window.template.website_colors.color_themes.color_theme_2.bg = colors.color_theme_2.bg
    window.template.website_colors.color_themes.color_theme_2.txt = colors.color_theme_2.txt
    window.template.website_colors.color_themes.color_theme_2.a = colors.color_theme_2.a
    window.template.website_colors.color_themes.color_theme_2.a_hover = colors.color_theme_2.a_hover
    window.template.website_colors.color_themes.color_theme_2.star = colors.color_theme_2.star
    window.template.website_colors.color_themes.color_theme_2.success = colors.color_theme_2.success
    window.template.website_colors.color_themes.color_theme_2.error = colors.color_theme_2.error
    window.template.website_colors.color_themes.color_theme_2.warning = colors.color_theme_2.warning

    window.template.website_colors.color_themes.color_theme_3.bg = colors.color_theme_3.bg
    window.template.website_colors.color_themes.color_theme_3.txt = colors.color_theme_3.txt
    window.template.website_colors.color_themes.color_theme_3.a = colors.color_theme_3.a
    window.template.website_colors.color_themes.color_theme_3.a_hover = colors.color_theme_3.a_hover
    window.template.website_colors.color_themes.color_theme_3.star = colors.color_theme_3.star
    window.template.website_colors.color_themes.color_theme_3.success = colors.color_theme_3.success
    window.template.website_colors.color_themes.color_theme_3.error = colors.color_theme_3.error
    window.template.website_colors.color_themes.color_theme_3.warning = colors.color_theme_3.warning

    new_action();
})
