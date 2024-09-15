draw_website_colors = function(){
    $('#website_colors').find('.editor_popup_title').text(texts.website_style.website_colors)
    $('#website_colors').addClass('w350 h600').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'editor_popup_container',key:'website_colors'}).append(
            $('<div/>',{class:'m10 fs1 bold',text:texts.website_style.color_palette}),
            $('<div/>',{class:'w100p'}).append(
                $('<div/>',{class:'row alnC jstfyC ma'}).append(
                    $('<div/>',{class:'website_color_picker_container'}).append(
                        $('<div/>',{class:'ico-edit'}),
                        $('<input/>',{class:'color_picker website_color_picker',key:'color_1'})
                    ),
                    $('<div/>',{class:'website_color_palette_container'}).append(
                        $('<div/>',{text:texts.website_style.color_1}),
                        $('<div/>',{class:'website_color_palette'}).append(
                            $('<div/>',{class:'website_color',key:'color_1_1'}),
                            $('<div/>',{class:'website_color',key:'color_1_2'}),
                            $('<div/>',{class:'website_color',key:'color_1_3'}),
                            $('<div/>',{class:'website_color',key:'color_1_4'}),
                            $('<div/>',{class:'website_color',key:'color_1_5'}),
                            $('<div/>',{class:'website_color',key:'color_1_6'}),
                            $('<div/>',{class:'website_color',key:'color_1_7'}),
                        ),
                    )
                ),
                $('<div/>',{class:'row alnC jstfyC ma'}).append(
                    $('<div/>',{class:'website_color_picker_container'}).append(
                        $('<div/>',{class:'ico-edit'}),
                        $('<input/>',{class:'color_picker website_color_picker',key:'color_2'})
                    ),
                    $('<div/>',{class:'website_color_palette_container'}).append(
                        $('<div/>',{text:texts.website_style.color_2}),
                        $('<div/>',{class:'website_color_palette'}).append(
                            $('<div/>',{class:'website_color',key:'color_2_1'}),
                            $('<div/>',{class:'website_color',key:'color_2_2'}),
                            $('<div/>',{class:'website_color',key:'color_2_3'}),
                            $('<div/>',{class:'website_color',key:'color_2_4'}),
                            $('<div/>',{class:'website_color',key:'color_2_5'}),
                            $('<div/>',{class:'website_color',key:'color_2_6'}),
                            $('<div/>',{class:'website_color',key:'color_2_7'}),
                        ),
                    )
                ),
                $('<div/>',{class:'row alnC jstfyC ma'}).append(
                    $('<div/>',{class:'website_color_picker_container'}).append(
                        $('<div/>',{class:'ico-edit'}),
                        $('<input/>',{class:'color_picker website_color_picker',key:'color_3'})
                    ),
                    $('<div/>',{class:'website_color_palette_container'}).append(
                        $('<div/>',{text:texts.website_style.color_3}),
                        $('<div/>',{class:'website_color_palette'}).append(
                            $('<div/>',{class:'website_color',key:'color_3_1'}),
                            $('<div/>',{class:'website_color',key:'color_3_2'}),
                            $('<div/>',{class:'website_color',key:'color_3_3'}),
                            $('<div/>',{class:'website_color',key:'color_3_4'}),
                            $('<div/>',{class:'website_color',key:'color_3_5'}),
                            $('<div/>',{class:'website_color',key:'color_3_6'}),
                            $('<div/>',{class:'website_color',key:'color_3_7'}),
                        ),
                    )
                ),
                $('<div/>',{class:'row alnC jstfyC ma'}).append(
                    $('<div/>',{class:'website_color_picker_container'}).append(
                        $('<div/>',{class:'ico-edit'}),
                        $('<input/>',{class:'color_picker website_color_picker',key:'color_4'})
                    ),
                    $('<div/>',{class:'website_color_palette_container'}).append(
                        $('<div/>',{text:texts.website_style.color_4}),
                        $('<div/>',{class:'website_color_palette'}).append(
                            $('<div/>',{class:'website_color',key:'color_4_1'}),
                            $('<div/>',{class:'website_color',key:'color_4_2'}),
                            $('<div/>',{class:'website_color',key:'color_4_3'}),
                            $('<div/>',{class:'website_color',key:'color_4_4'}),
                            $('<div/>',{class:'website_color',key:'color_4_5'}),
                            $('<div/>',{class:'website_color',key:'color_4_6'}),
                            $('<div/>',{class:'website_color',key:'color_4_7'}),
                        ),
                    )
                ),
                $('<div/>',{class:'row alnC jstfyE mY10 w100p'}).append(
                    $('<button/>',{class:'btn btn-cancel editor_popup_show_container get_color_palettes',key:'color_palettes',text:texts.styling.browsePalettes}),
                ),
            ),
            $('<div/>',{class:'m10 fs1 bold',text:texts.website_style.custom_colors}),
            $('<div/>',{class:'custom_colors_container w100p-20 m10 row wrap alnS jstfyS'}).append(
                $('<button/>',{class:'color_picker add_custom_color ico-plus',tooltip:texts.website_style.add_color}),
            ),
        ),
        $('<div/>',{class:'editor_popup_container none',key:'color_palettes',parent_key:'website_colors'}).append(
            $('<div/>',{class:'mY10 mX10 fs1 bold',text:texts.website_style.color_palettes}), 
            $('<div/>',{class:'color_palettes_container row wrap alnC jstfyC w100p'}),
        ),

    )
    for(const key in window.template.website_colors.custom_colors){
        let color = window.template.website_colors.custom_colors[key];
        add_custom_color(key,color);
    }
    draw_color_palette(true);

    for(const key in window.colors){
        $('.color_palettes_container').append(
            $('<div/>',{class:'color_palette_preview',key:key}).append(
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key][0]}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key][1]}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key][2]}`}),
                $('<div/>',{class:'color_palette_preview_color',style:`background-color:${window.colors[key][3]}`}),
            )
        )
    }
}
draw_color_palette = function(set_picker=false){
    for(const key in window.template.website_colors.colors){
        let color = window.template.website_colors.colors[key];
        $(`.website_color[key="${key}"]`).css('background-color',`rgb(${color.r},${color.g},${color.b})`)
        if(key.split('_')[2] == 3 && set_picker){
            $(`.website_color_picker[key="color_${key.split('_')[1]}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color.r},${color.g},${color.b})`)
            $(`.website_color_picker[key="color_${key.split('_')[1]}"]`).val(`rgb(${color.r},${color.g},${color.b})`)
        }
        if(key.split('_')[2] == 7 && set_picker){
            $(`.website_color_picker[key="color_${key.split('_')[1]}"]`).closest('.website_color_picker_container').css('color',`rgb(${color.r},${color.g},${color.b})`)
        }
    }
}
draw_website_color_popup = function(color_key){
    let color = window.template.website_colors.colors[color_key];
    let color_rgb = `rgb(${color.r},${color.g},${color.b})`
    if($('.website_color_popup').length == 0){
        $('body').append(
            $('<div/>',{class:'website_color_popup none'})
        )
    }
    $('.website_color_popup').text('').attr('color_key',color_key).removeClass('none').css({
        left:$(`.website_color[key="${color_key}"]`).offset().left - ($('.website_color_popup').width() / 2 ) + ($(`.website_color[key="${color_key}"]`).width() / 2),
        top:$(`.website_color[key="${color_key}"]`).offset().top - $('.website_color_popup').height(),
    }).append(
        $('<div/>',{class:'row alnC jstfyC mY5'}).append(
            $('<div/>',{class:'website_color_darken ico-arrowLeft',tooltip:texts.website_style.darken}),
            $('<div/>',{class:'website_color_popup_color',style:`background-color:${color_rgb}`}),
            $('<div/>',{class:'website_color_lighten ico-arrowRight',tooltip:texts.website_style.lighten}),
        ),
        $('<div/>',{class:'column mX10 alnS jstfyS'}).append(
            $('<div/>',{class:'row alnC jstfyC w100p-10 p5'}).append(
                $('<div/>',{class:'website_color_popup_rgb fs085',text:color_rgb}),
                $('<div/>',{class:'ico-copy copy_website_color_popup_rgb pis-5 pointer'}),
            ),
            $('<div/>',{class:'row alnC jstfyC w100p-10 p5'}).append(
                $('<div/>',{class:'website_color_popup_hex fs085 ',text:rgbToHex(color_rgb)}),
                $('<div/>',{class:'ico-copy copy_website_color_popup_hex pis-5 pointer'}),
            ),
        )
    );

    if($('.website_color_popup').offset().left + $('.website_color_popup').width() > $(window).width()){
        $('.website_color_popup').css({
            left:$(window).width() - $('.website_color_popup').width()
        })
    }
}
get_rgb = function(color){
    color = color.replace('rgb(','').replace('rgba(','').replaceAll(' ','').replace(')','')
    color = color.split(',');

    return {
        r:parseInt(color[0]),
        g:parseInt(color[1]),
        b:parseInt(color[2]),
    }
}
set_color_palette = function(color,color_key){
    color = get_rgb(color);
    let gradation = window.template.website_colors.gradation[`${color_key}_gradation`];

    $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').parent().find('.website_color').removeClass('website_color_selected');
    $(`.website_color[key="${color_key}_3}"]`).addClass('website_color_selected')

    let color_1;let color_2;let color_3;let color_4;let color_5;let color_6; let color_7;
    color_1 = {r:(color.r)-(gradation*2),g:(color.g)-(gradation*2),b:(color.b)-(gradation*2)};
    color_2 = {r:(color.r)-(gradation*1),g:(color.g)-(gradation*1),b:(color.b)-(gradation*1)};
    color_3 = {r:color.r,g:color.g,b:color.b};
    color_4 = {r:(color.r)+(gradation*1),g:(color.g)+(gradation*1),b:(color.b)+(gradation*1)};
    color_5 = {r:(color.r)+(gradation*2),g:(color.g)+(gradation*2),b:(color.b)+(gradation*2)};
    color_6 = {r:(color.r)+(gradation*3),g:(color.g)+(gradation*3),b:(color.b)+(gradation*3)};
    color_7 = {r:(color.r)+(gradation*6),g:(color.g)+(gradation*6),b:(color.b)+(gradation*6)};

    
    color_1.r < 0 ? color_1.r = 0 : null;
    color_1.r > 255 ? color_1.r = 255 : null;
    color_1.g < 0 ? color_1.g = 0 : null;
    color_1.g > 255 ? color_1.g = 255 : null;
    color_1.b < 0 ? color_1.b = 0 : null;
    color_1.b > 255 ? color_1.b = 255 : null;

    color_2.r < 0 ? color_2.r = 0 : null;
    color_2.r > 255 ? color_2.r = 255 : null;
    color_2.g < 0 ? color_2.g = 0 : null;
    color_2.g > 255 ? color_2.g = 255 : null;
    color_2.b < 0 ? color_2.b = 0 : null;
    color_2.b > 255 ? color_2.b = 255 : null;

    // color_3.r < 0 ? color_3.r = 0 : null;
    // color_3.r > 255 ? color_3.r = 255 : null;
    // color_3.g < 0 ? color_3.g = 0 : null;
    // color_3.g > 255 ? color_3.g = 255 : null;
    // color_3.b < 0 ? color_3.b = 0 : null;
    // color_3.b > 255 ? color_3.b = 255 : null;

    color_4.r < 0 ? color_4.r = 0 : null;
    color_4.r > 255 ? color_4.r = 255 : null;
    color_4.g < 0 ? color_4.g = 0 : null;
    color_4.g > 255 ? color_4.g = 255 : null;
    color_4.b < 0 ? color_4.b = 0 : null;
    color_4.b > 255 ? color_4.b = 255 : null;

    color_5.r < 0 ? color_5.r = 0 : null;
    color_5.r > 255 ? color_5.r = 255 : null;
    color_5.g < 0 ? color_5.g = 0 : null;
    color_5.g > 255 ? color_5.g = 255 : null;
    color_5.b < 0 ? color_5.b = 0 : null;
    color_5.b > 255 ? color_5.b = 255 : null;

    color_6.r < 0 ? color_6.r = 0 : null;
    color_6.r > 255 ? color_6.r = 255 : null;
    color_6.g < 0 ? color_6.g = 0 : null;
    color_6.g > 255 ? color_6.g = 255 : null;
    color_6.b < 0 ? color_6.b = 0 : null;
    color_6.b > 255 ? color_6.b = 255 : null;

    color_7.r < 0 ? color_7.r = 0 : null;
    color_7.r > 255 ? color_7.r = 255 : null;
    color_7.g < 0 ? color_7.g = 0 : null;
    color_7.g > 255 ? color_7.g = 255 : null;
    color_7.b < 0 ? color_7.b = 0 : null;
    color_7.b > 255 ? color_7.b = 255 : null;

    // $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_3.r},${color_3.g},${color_3.b})`)
    // $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_7.r},${color_7.g},${color_7.b})`)

    window.template.website_colors.colors[`${color_key}_1`] = color_1;
    window.template.website_colors.colors[`${color_key}_2`] = color_2;
    window.template.website_colors.colors[`${color_key}_3`] = color_3;
    window.template.website_colors.colors[`${color_key}_4`] = color_4;
    window.template.website_colors.colors[`${color_key}_5`] = color_5;
    window.template.website_colors.colors[`${color_key}_6`] = color_6;
    window.template.website_colors.colors[`${color_key}_7`] = color_7;
    

    draw_color_palette(true);
}
// set_color_palette = function(color,color_key){
//     color = get_rgb(color);
//     let gradation = window.template.website_colors.gradation[`${color_key}_gradation`];
//     let this_color;
//     let max = color.r + color.g + color.b;
//     if(max <= 109){
//         this_color = '1';
//     }else if(max > 109 && max <= 218){
//         this_color = '2';
//     }else if(max > 218 && max <= 327){
//         this_color = '3';
//     }else if(max > 327 && max <= 406){
//         this_color = '4';
//     }else if(max > 406 && max <= 545){
//         this_color = '5'
//     }else if(max > 406 && max <= 654){
//         this_color = '6'
//     }else if(max > 654 && max <= 765){
//         this_color = '7'
//     }
    
//     $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').parent().find('.website_color').removeClass('website_color_selected');
//     $(`.website_color[key="${color_key}_${this_color}"]`).addClass('website_color_selected')
//     let color_1;let color_2;let color_3;let color_4;let color_5;let color_6; let color_7;
//     switch(this_color){
//         case '1':
//             color_1 = {r:color.r,g:color.g,b:color.b};
//             color_2 = {r:(color.r)+(gradation*1),g:(color.g)+(gradation*1),b:(color.b)+(gradation*1)};
//             color_3 = {r:(color.r)+(gradation*2),g:(color.g)+(gradation*2),b:(color.b)+(gradation*2)};
//             color_4 = {r:(color.r)+(gradation*3),g:(color.g)+(gradation*3),b:(color.b)+(gradation*3)};
//             color_5 = {r:(color.r)+(gradation*4),g:(color.g)+(gradation*4),b:(color.b)+(gradation*4)};
//             color_6 = {r:(color.r)+(gradation*5),g:(color.g)+(gradation*5),b:(color.b)+(gradation*5)};
//             color_7 = {r:(color.r)+(gradation*6),g:(color.g)+(gradation*6),b:(color.b)+(gradation*6)};
//         break;
//         case '2':
//             color_1 = {r:(color.r)-(gradation*1),g:(color.g)-(gradation*1),b:(color.b)-(gradation*1)};
//             color_2 = {r:color.r,g:color.g,b:color.b};
//             color_3 = {r:(color.r)+(gradation*1),g:(color.g)+(gradation*1),b:(color.b)+(gradation*1)};
//             color_4 = {r:(color.r)+(gradation*2),g:(color.g)+(gradation*2),b:(color.b)+(gradation*2)};
//             color_5 = {r:(color.r)+(gradation*3),g:(color.g)+(gradation*3),b:(color.b)+(gradation*3)};
//             color_6 = {r:(color.r)+(gradation*4),g:(color.g)+(gradation*4),b:(color.b)+(gradation*4)};
//             color_7 = {r:(color.r)+(gradation*5),g:(color.g)+(gradation*5),b:(color.b)+(gradation*5)};
//         break;
//         case '3':
//             color_1 = {r:(color.r)-(gradation*2),g:(color.g)-(gradation*2),b:(color.b)-(gradation*2)};
//             color_2 = {r:(color.r)-(gradation*1),g:(color.g)-(gradation*1),b:(color.b)-(gradation*1)};
//             color_3 = {r:color.r,g:color.g,b:color.b};
//             color_4 = {r:(color.r)+(gradation*1),g:(color.g)+(gradation*1),b:(color.b)+(gradation*1)};
//             color_5 = {r:(color.r)+(gradation*2),g:(color.g)+(gradation*2),b:(color.b)+(gradation*2)};
//             color_6 = {r:(color.r)+(gradation*3),g:(color.g)+(gradation*3),b:(color.b)+(gradation*3)};
//             color_7 = {r:(color.r)+(gradation*4),g:(color.g)+(gradation*4),b:(color.b)+(gradation*4)};
//         break;
//         case '4':
//             color_1 = {r:(color.r)-(gradation*3),g:(color.g)-(gradation*3),b:(color.b)-(gradation*3)};
//             color_2 = {r:(color.r)-(gradation*2),g:(color.g)-(gradation*2),b:(color.b)-(gradation*2)};
//             color_3 = {r:(color.r)-(gradation*1),g:(color.g)-(gradation*1),b:(color.b)-(gradation*1)};
//             color_4 = {r:color.r,g:color.g,b:color.b};
//             color_5 = {r:(color.r)+(gradation*1),g:(color.g)+(gradation*1),b:(color.b)+(gradation*1)};
//             color_6 = {r:(color.r)+(gradation*2),g:(color.g)+(gradation*2),b:(color.b)+(gradation*2)};
//             color_7 = {r:(color.r)+(gradation*3),g:(color.g)+(gradation*3),b:(color.b)+(gradation*3)};
//         break;
//         case '5':
//             color_1 = {r:(color.r)-(gradation*4),g:(color.g)-(gradation*4),b:(color.b)-(gradation*4)};
//             color_2 = {r:(color.r)-(gradation*3),g:(color.g)-(gradation*3),b:(color.b)-(gradation*3)};
//             color_3 = {r:(color.r)-(gradation*2),g:(color.g)-(gradation*2),b:(color.b)-(gradation*2)};
//             color_4 = {r:(color.r)-(gradation*1),g:(color.g)-(gradation*1),b:(color.b)-(gradation*1)};
//             color_5 = {r:color.r,g:color.g,b:color.b};
//             color_6 = {r:(color.r)+(gradation*1),g:(color.g)+(gradation*1),b:(color.b)+(gradation*1)};
//             color_7 = {r:(color.r)+(gradation*2),g:(color.g)+(gradation*2),b:(color.b)+(gradation*2)};
//         break;
//         case '6':
//             color_1 = {r:(color.r)-(gradation*5),g:(color.g)-(gradation*5),b:(color.b)-(gradation*5)};
//             color_2 = {r:(color.r)-(gradation*4),g:(color.g)-(gradation*4),b:(color.b)-(gradation*4)};
//             color_3 = {r:(color.r)-(gradation*3),g:(color.g)-(gradation*3),b:(color.b)-(gradation*3)};
//             color_4 = {r:(color.r)-(gradation*2),g:(color.g)-(gradation*2),b:(color.b)-(gradation*2)};
//             color_5 = {r:(color.r)-(gradation*1),g:(color.g)-(gradation*1),b:(color.b)-(gradation*1)};
//             color_6 = {r:color.r,g:color.g,b:color.b};
//             color_7 = {r:(color.r)+(gradation*1),g:(color.g)+(gradation*1),b:(color.b)+(gradation*1)};
//         break;
//         case '7':
//             color_1 = {r:(color.r)-(gradation*6),g:(color.g)-(gradation*6),b:(color.b)-(gradation*6)};
//             color_2 = {r:(color.r)-(gradation*5),g:(color.g)-(gradation*5),b:(color.b)-(gradation*5)};
//             color_3 = {r:(color.r)-(gradation*4),g:(color.g)-(gradation*4),b:(color.b)-(gradation*4)};
//             color_4 = {r:(color.r)-(gradation*3),g:(color.g)-(gradation*3),b:(color.b)-(gradation*3)};
//             color_5 = {r:(color.r)-(gradation*2),g:(color.g)-(gradation*2),b:(color.b)-(gradation*2)};
//             color_6 = {r:(color.r)-(gradation*1),g:(color.g)-(gradation*1),b:(color.b)-(gradation*1)};
//             color_7 = {r:color.r,g:color.g,b:color.b};
//         break;
//     }
    
//     color_1.r < 0 ? color_1.r = 0 : null;
//     color_1.r > 255 ? color_1.r = 255 : null;
//     color_1.g < 0 ? color_1.g = 0 : null;
//     color_1.g > 255 ? color_1.g = 255 : null;
//     color_1.b < 0 ? color_1.b = 0 : null;
//     color_1.b > 255 ? color_1.b = 255 : null;

//     color_2.r < 0 ? color_2.r = 0 : null;
//     color_2.r > 255 ? color_2.r = 255 : null;
//     color_2.g < 0 ? color_2.g = 0 : null;
//     color_2.g > 255 ? color_2.g = 255 : null;
//     color_2.b < 0 ? color_2.b = 0 : null;
//     color_2.b > 255 ? color_2.b = 255 : null;

//     color_3.r < 0 ? color_3.r = 0 : null;
//     color_3.r > 255 ? color_3.r = 255 : null;
//     color_3.g < 0 ? color_3.g = 0 : null;
//     color_3.g > 255 ? color_3.g = 255 : null;
//     color_3.b < 0 ? color_3.b = 0 : null;
//     color_3.b > 255 ? color_3.b = 255 : null;

//     color_4.r < 0 ? color_4.r = 0 : null;
//     color_4.r > 255 ? color_4.r = 255 : null;
//     color_4.g < 0 ? color_4.g = 0 : null;
//     color_4.g > 255 ? color_4.g = 255 : null;
//     color_4.b < 0 ? color_4.b = 0 : null;
//     color_4.b > 255 ? color_4.b = 255 : null;

//     color_5.r < 0 ? color_5.r = 0 : null;
//     color_5.r > 255 ? color_5.r = 255 : null;
//     color_5.g < 0 ? color_5.g = 0 : null;
//     color_5.g > 255 ? color_5.g = 255 : null;
//     color_5.b < 0 ? color_5.b = 0 : null;
//     color_5.b > 255 ? color_5.b = 255 : null;

//     color_6.r < 0 ? color_6.r = 0 : null;
//     color_6.r > 255 ? color_6.r = 255 : null;
//     color_6.g < 0 ? color_6.g = 0 : null;
//     color_6.g > 255 ? color_6.g = 255 : null;
//     color_6.b < 0 ? color_6.b = 0 : null;
//     color_6.b > 255 ? color_6.b = 255 : null;

//     color_7.r < 0 ? color_7.r = 0 : null;
//     color_7.r > 255 ? color_7.r = 255 : null;
//     color_7.g < 0 ? color_7.g = 0 : null;
//     color_7.g > 255 ? color_7.g = 255 : null;
//     color_7.b < 0 ? color_7.b = 0 : null;
//     color_7.b > 255 ? color_7.b = 255 : null;

//     switch(this_color){
//         case '1':
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_1.r},${color_1.g},${color_1.b})`)
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_7.r},${color_7.g},${color_7.b})`)
//             break;
//         case '2':
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_2.r},${color_2.g},${color_2.b})`)
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_7.r},${color_7.g},${color_7.b})`)
//         break;
//         case '3':
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_3.r},${color_3.g},${color_3.b})`)
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_7.r},${color_7.g},${color_7.b})`)
//         break;
//         case '4':
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_4.r},${color_4.g},${color_4.b})`)
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_7.r},${color_7.g},${color_7.b})`)
//         break;
//         case '5':
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_5.r},${color_5.g},${color_5.b})`)
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_1.r},${color_1.g},${color_1.b})`)
//         break;
//         case '6':
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_6.r},${color_6.g},${color_6.b})`)
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_1.r},${color_1.g},${color_1.b})`)
//         break;
//         case '7':
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('background-color',`rgb(${color_7.r},${color_7.g},${color_7.b})`)
//             $(`.website_color_picker[key="${color_key}"]`).closest('.website_color_picker_container').css('color',`rgb(${color_1.r},${color_1.g},${color_1.b})`)
//         break;
//     }
//     window.template.website_colors.colors[`${color_key}_1`] = color_1;
//     window.template.website_colors.colors[`${color_key}_2`] = color_2;
//     window.template.website_colors.colors[`${color_key}_3`] = color_3;
//     window.template.website_colors.colors[`${color_key}_4`] = color_4;
//     window.template.website_colors.colors[`${color_key}_5`] = color_5;
//     window.template.website_colors.colors[`${color_key}_6`] = color_6;
//     window.template.website_colors.colors[`${color_key}_7`] = color_7;
    

//     draw_color_palette(false);
// }
    //
draw_custom_colors = function(){
    $('.website_custom_color').each(function(){
        if($(this).attr('custom_color_name') in window.template.website_colors.custom_colors){
            let color = window.template.website_colors.custom_colors[$(this).attr('custom_color_name')]
            $(this).val(`rgb(${color.r},${color.g},${color.b})`).css('background-color',`rgb(${color.r},${color.g},${color.b})`)
        }else{
            $(this).remove()
        }
    })
    for(const key in window.template.website_colors.custom_colors){
        let color = window.template.website_colors.custom_colors[key];
        if($(`.website_custom_color[custom_color_name="${key}"]`).length == 0){
            add_custom_color(key,color);
        }
    }
}
add_custom_color = function(color_name,color){
    $('.custom_colors_container').find('.add_custom_color').before(
        $('<input/>',{custom_color_name:color_name,class:'website_custom_color color_picker',style:`background-color:rgb(${color.r},${color.g},${color.b})`,value:`rgb(${color.r},${color.g},${color.b})`})
    )
}
///
$('body').on('click','.website_color_picker',function(){
    setTimeout(()=>{
        $('#clr-picker').append(
            $('<div/>',{class:'website_color_picker_gradation_c m10 w100p-20'}).append(
                $('<div/>',{class:'fs085 c_txt1',text:texts.website_style.gradation_lvl}),
                 draw_select_range({
                    dummy:true,
                    dummy_class:'website_color_picker_gradation',
                    range:{min:30,max:70,step:1},
                    unit:'',
                    key:$(this).attr('key')
                })
            )
        )
        set_dummy_select_range($('.website_color_picker_gradation'),window.template.website_colors.gradation[`${$(this).attr('key')}_gradation`])
    },50)
    set_dummy_select_range($('.website_color_picker_gradation'),window.template.website_colors.gradation[`${$(this).attr('key')}_gradation`])
})
$('body').on('change','.website_color_picker_gradation',function(){
    let color_key = $(this).attr('key');
    console.log(color_key)
    let color = `rgb(${$('#color_picker_rgb_input_r').val()},${$('#color_picker_rgb_input_g').val()},${$('#color_picker_rgb_input_b').val()})`
    window.template.website_colors.gradation[`${color_key}_gradation`] = get_dummy_val($(this).closest('.select_range'));
    set_color_palette(color,color_key);
    new_action('website_colors');
})
$(document).on('input','.website_color_picker',function(e){
    set_color_palette($(this).val(),$(this).attr('key'))
    set_website_colors_vars();
    set_all_editors()
})
$(document).on('change','.website_color_picker',function(e){
    set_color_palette($(this).val(),$(this).attr('key'))
    new_action('website_colors');
    $('.website_color_selected').removeClass('website_color_selected')
})
//
$('body').on('mouseenter','.website_color',function(){
    draw_website_color_popup($(this).attr('key'))
    $('.website_color').removeClass('website_color_selected');
    $(this).addClass('website_color_selected')
})
$('body').on('mouseleave','.website_color, .website_color_popup',function(){
    if($('.website_color:hover').length > 0 || $('.website_color_popup:hover').length > 0 ){return;}
    $('.website_color_popup').remove();
    $('.website_color').removeClass('website_color_selected');
})
$('body').on('click','.website_color_lighten',function(e){
    let color_key = $('.website_color_popup').attr('color_key');
    let color = window.template.website_colors.colors[color_key];
    let r = color.r + 10;
    let g = color.g + 10;
    let b = color.b + 10;
    r > 255 ? r = 255 : null;
    g > 255 ? g = 255 : null;
    b > 255 ? b = 255 : null;
    window.template.website_colors.colors[color_key].r = r;
    window.template.website_colors.colors[color_key].g = g;
    window.template.website_colors.colors[color_key].b = b;
    let color_rgb = `rgb(${r},${g},${b})`;
    let color_hex = rgbToHex(color_rgb);
    $('.website_color_popup_rgb').text(color_rgb)
    $('.website_color_popup_hex').text(color_hex)
    $(`.website_color[key="${color_key}"]`).css('background-color',color_rgb);
    $('.website_color_popup_color').css('background-color',color_rgb);
    new_action('website_colors');
})
$('body').on('click','.website_color_darken',function(e){
    let color_key = $('.website_color_popup').attr('color_key');
    let color = window.template.website_colors.colors[color_key];
    let r = color.r - 10;
    let g = color.g - 10;
    let b = color.b - 10;
    r < 0 ? r = 0 : null;
    g < 0 ? g = 0 : null;
    b < 0 ? b = 0 : null;
    window.template.website_colors.colors[color_key].r = r;
    window.template.website_colors.colors[color_key].g = g;
    window.template.website_colors.colors[color_key].b = b;
    let color_rgb = `rgb(${r},${g},${b})`;
    let color_hex = rgbToHex(color_rgb);
    $('.website_color_popup_rgb').text(color_rgb)
    $('.website_color_popup_hex').text(color_hex)
    $(`.website_color[key="${color_key}"]`).css('background-color',color_rgb);
    $('.website_color_popup_color').css('background-color',color_rgb);
    new_action('website_colors');
})
$('body').on('click','.copy_website_color_popup_rgb',function(){
    navigator.clipboard.writeText($('.website_color_popup_rgb').text()).then(function(){
        showAlert('normal',texts.copied,4000,true);
    });
})
$('body').on('click','.copy_website_color_popup_hex',function(){
    navigator.clipboard.writeText($('.website_color_popup_hex').text()).then(function(){
        showAlert('normal',texts.copied,4000,true);
    });
})
//

$('body').on('click','.add_custom_color',function(){
    setTimeout(()=>{
        $('#clr-picker').append(
            $('<button/>',{class:'btn btn-cancel mX10 mT5 mB10 add_custom_color_confirm btn_small',text:texts.website_style.add_color})
        )
    },50)
})
$('body').on('click','.add_custom_color_confirm',function(){
    let color_name = hash();
    window.template.website_colors.custom_colors[color_name] = {
        r:$('#color_picker_rgb_input_r').val(),
        g:$('#color_picker_rgb_input_g').val(),
        b:$('#color_picker_rgb_input_b').val(),
    }
    add_custom_color(color_name,window.template.website_colors.custom_colors[color_name])
    new_action('website_colors');
    set_all_editors()
    Coloris.close();
})
$('body').on('click','.website_custom_color',function(){
    setTimeout(()=>{
        $('#clr-picker').append(
            $('<button/>',{custom_color_name:$(this).attr('custom_color_name'),class:'btn btn_small btn-cancel mX10 mT5 mB10 remove_custom_color',text:texts.website_style.remove_color})
        )
    },50)
})
$('body').on('click','.remove_custom_color',function(){
    delete window.template.website_colors.custom_colors[$(this).attr('custom_color_name')]
    $(':root').css(`--${$(this).attr('custom_color_name')}`,``)
    draw_custom_colors();
    new_action('website_colors');
    set_all_editors()
    Coloris.close();
})
$(document).on('input','.website_custom_color,.color_picker_editor_color_selected',function(e){
    let new_color = $(this).val();
    $(this).css('background-color',$(this).val())
    new_color = new_color.replace('rgb(','').replace(')','').split(',');
    window.template.website_colors.custom_colors[$(this).attr('custom_color_name')] = {r:new_color[0],g:new_color[1],b:new_color[2]}
    set_website_colors_vars();
    set_all_editors()
})
$(document).on('change','.website_custom_color,.color_picker_editor_color_selected',function(e){
    let new_color = $(this).val();
    new_color = new_color.replace('rgb(','').replace(')','').split(',');
    window.template.website_colors.custom_colors[$(this).attr('custom_color_name')] = {r:new_color[0],g:new_color[1],b:new_color[2]}
    new_action('website_colors');

})
//
$('body').on('click','.color_palette_preview',function(e){
    let colors = window.colors[$(this).attr('key')]
    set_color_palette(colors[0],'color_1');
    set_color_palette(colors[1],'color_2');
    set_color_palette(colors[2],'color_3');
    set_color_palette(colors[3],'color_4');
    $('.website_color_selected').removeClass('website_color_selected')
    new_action('website_colors');
})
