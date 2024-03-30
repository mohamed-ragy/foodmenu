set_website_colors_settings = function(){
    set_website_colors_vars();
}
draw_website_colors = function(){
    $('#website_colors').find('.editor_popup_title').text(texts.website_style.website_colors)
    $('#website_colors').find('.editor_popup_head_btn').text('').append(
        $('<div/>',{class:'backToColorPalete none ico-arrowLeft pointer fs101'}),
    )
    $('#website_colors').addClass('w400 h1000').find('.editor_popup_body').text('').append(
        $('<div/>',{id:'color_palette_container'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.website_style.color_palettes}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.color_palettes_des}),
            $('<div/>',{class:'row w100p alnC jstfyC color_palette_container_color_theme'}),
            $('<div/>',{class:'row alnC jstfyE w100p mT30'}).append(
                $('<button/>',{class:'btn btn-cancel browseColorPalettes',text:texts.website_style.browsePalettes}),
            ),
            $('<div/>',{class:'mT40 w100p mB20'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.colorThemes}),
                $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.colorThemes_des}),
                $('<div/>',{class:'row wrap alnC jstfyC'}).append(
                    $('<div/>',{class:'color_theme color_theme_1',color_theme:'color_theme_1'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_1})
                    ),
                    $('<div/>',{class:'color_theme color_theme_2',color_theme:'color_theme_2'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_2})
                    ),
                    $('<div/>',{class:'color_theme color_theme_3',color_theme:'color_theme_3'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_3})
                    ),
                    $('<div/>',{class:'color_theme color_theme_4',color_theme:'color_theme_4'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_4})
                    ),
                    $('<div/>',{class:'color_theme color_theme_5',color_theme:'color_theme_5'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_5})
                    ),
                    $('<div/>',{class:'color_theme color_theme_6',color_theme:'color_theme_6'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_6})
                    ),
                    $('<div/>',{class:'color_theme color_theme_7',color_theme:'color_theme_7'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_7})
                    ),
                    $('<div/>',{class:'color_theme color_theme_8',color_theme:'color_theme_8'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_8})
                    ),
                    $('<div/>',{class:'color_theme color_theme_9',color_theme:'color_theme_9'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_9})
                    ),
                    $('<div/>',{class:'color_theme color_theme_10',color_theme:'color_theme_10'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_10})
                    ),
                    $('<div/>',{class:'color_theme color_theme_11',color_theme:'color_theme_11'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_11})
                    ),
                    $('<div/>',{class:'color_theme color_theme_12',color_theme:'color_theme_12'}).append(
                        $('<div/>',{class:'',text:texts.website_style.color_theme_12})
                    ),
                )
            ),
            $('<div/>',{class:'mT40 w100p'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.otherColors}),
                $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.otherColors_des}),
                $('<div/>',{class:'w100p other_color_container'})
            ),
        ),
        $('<div/>',{id:'color_palettes_container',class:'none'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.website_style.colorsPalettes}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.colorsPalettes_des}),
            $('<div/>',{class:'color_palettes_container row alnC jstfyC wrap '}).append(
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
                $('<div/>',{class:'color_palette_preview_loading cardLoading'}),
            )
        )
    )
    for(const key in window.template.website_colors.color_theme){
        $('.color_palette_container_color_theme').append(
            // $('<div/>',{class:'color_edit'}).append(
                // $('<div/>',{class:'ico-edit color_edit_icon'}),
                $('<div/>',{class:'color_picker_container_L mis-5'}).append(
                    $('<input/>',{class:'color_picker color_picker_L',type:'text',style:`background-color:var(--${key})`,value:window.template.website_colors.color_theme[key],key:key,key_tree:'website_colors.color_theme'}),
                )
            // ),
        )
    }
    //
    for(const key in window.template.website_colors.other_colors){
        $('.other_color_container').append(
            $('<div/>',{class:'other_color_row'}).append(
                $('<div/>',{class:'fs09 taS mis-10',text:texts.website_style[key]}),
                $('<input/>',{class:'color_picker',type:'text','data-coloris':true,style:`background-color:var(--${key})`,color_var:key,value:window.template.website_colors.other_colors[key],key:key,key_tree:'website_colors.other_colors'}),
            ),
        )
    }
}
///
// rgb_To_Hex =  function (r, g, b) {
//     return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
// }
// hex_to_rgb = function(hex){
//     let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//       r: parseInt(result[1], 16),
//       g: parseInt(result[2], 16),
//       b: parseInt(result[3], 16)
//     } : null;
// }
//
draw_color_palettes = function(){
    $('.color_palettes_container').text('')
    for(const key in window.colors){
        $('.color_palettes_container').append(
            $('<div/>',{class:'color_palette_preview',key:key}).append(
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_1}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_2}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_3}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key].color_4}`})
            )
        )
    }
}
get_colors = function(){
    if(window.colors.length == 0){
        $.ajax({
            url:'api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                get_colors:true,
            },success:function(r){
                window.colors = r.colors;
                draw_color_palettes();
            }
        })
    }else{
        draw_color_palettes();
    }
}
//events

$('html,body').on('click','.browseColorPalettes',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('#color_palette_container'),$('#color_palettes_container'))
    $('.backToColorPalete').removeClass('none');
    get_colors();
})
$('html,body').on('click','.backToColorPalete',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('#color_palette_container'),$('#color_palettes_container'))
    $('.backToColorPalete').addClass('none');
})
$('html,body').on('click','.color_palette_preview',function(e){
    e.stopImmediatePropagation();
    let color = window.colors[$(this).attr('key')]
    window.template.website_colors.color_theme.color_1 = color.color_1;
    window.template.website_colors.color_theme.color_2 = color.color_2;
    window.template.website_colors.color_theme.color_3 = color.color_3;
    window.template.website_colors.color_theme.color_4 = color.color_4;
    new_action();
    editor_popup_to_parent($('#color_palette_container'),$('#color_palettes_container'))
    $('.backToColorPalete').addClass('none');
})
