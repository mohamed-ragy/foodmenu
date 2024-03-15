draw_color_theme_Picker = function(id,key_tree,last_key){
    key_tree = key_tree.split('.');
    let template = window.template;
    for(const key in key_tree){
        template = window.template[key_tree[key]];
    }

    let selected_color_theme = template[last_key];
    return $('<div/>',{id:id,class:`color_theme_picker_container ${selected_color_theme}`,key_tree:key_tree,key:last_key}).append(
        $('<div/>',{class:'mie-5',text:texts.website_style[selected_color_theme]}),
        $('<div/>',{class:'ico-arrowDown mis-5'}),
    )
}

$('html,body').on('click','.color_theme_picker_container',function(e){
    e.stopImmediatePropagation();
    let key_tree = $(this).attr('key_tree').split('.');
    let template = window.template;
    for(const key in key_tree){
        template = window.template[key_tree[key]];
    }

    let selected_color_theme = template[$(this).attr('key')];
    $('.color_theme_picker_themes').attr('key_tree',$(this).attr('key_tree')).attr('key',$(this).attr('key')).attr('theme_picker',$(this).attr('id')).text('').append(
        selected_color_theme != 'color_1_2' ? $('<div/>',{class:'color_theme_picker_theme color_1_2',text:texts.website_style.color_1_2,key:'color_1_2'}) : '',
        selected_color_theme != 'color_1_3' ? $('<div/>',{class:'color_theme_picker_theme color_1_3',text:texts.website_style.color_1_3,key:'color_1_3'}) : '',
        selected_color_theme != 'color_1_4' ? $('<div/>',{class:'color_theme_picker_theme color_1_4',text:texts.website_style.color_1_4,key:'color_1_4'}) : '',
        selected_color_theme != 'color_2_1' ? $('<div/>',{class:'color_theme_picker_theme color_2_1',text:texts.website_style.color_2_1,key:'color_2_1'}) : '',
        selected_color_theme != 'color_2_3' ? $('<div/>',{class:'color_theme_picker_theme color_2_3',text:texts.website_style.color_2_3,key:'color_2_3'}) : '',
        selected_color_theme != 'color_2_4' ? $('<div/>',{class:'color_theme_picker_theme color_2_4',text:texts.website_style.color_2_4,key:'color_2_4'}) : '',
        selected_color_theme != 'color_3_1' ? $('<div/>',{class:'color_theme_picker_theme color_3_1',text:texts.website_style.color_3_1,key:'color_3_1'}) : '',
        selected_color_theme != 'color_3_2' ? $('<div/>',{class:'color_theme_picker_theme color_3_2',text:texts.website_style.color_3_2,key:'color_3_2'}) : '',
        selected_color_theme != 'color_3_4' ? $('<div/>',{class:'color_theme_picker_theme color_3_4',text:texts.website_style.color_3_4,key:'color_3_4'}) : '',
        selected_color_theme != 'color_4_1' ? $('<div/>',{class:'color_theme_picker_theme color_4_1',text:texts.website_style.color_4_1,key:'color_4_1'}) : '',
        selected_color_theme != 'color_4_2' ? $('<div/>',{class:'color_theme_picker_theme color_4_2',text:texts.website_style.color_4_2,key:'color_4_2'}) : '',
        selected_color_theme != 'color_4_3' ? $('<div/>',{class:'color_theme_picker_theme color_4_3',text:texts.website_style.color_4_3,key:'color_4_3'}) : '',
    ).removeClass('none').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})
$('html,body').on('click','.color_theme_picker_theme',function(e){
    e.stopImmediatePropagation();
    let key_tree = $('.color_theme_picker_themes').attr('key_tree').split('.');
    let template = window.template;
    for(const key in key_tree){
        template = window.template[key_tree[key]];
    }
    template[$('.color_theme_picker_themes').attr('key')] = $(this).attr('key');
    $(`#${$('.color_theme_picker_themes').attr('theme_picker')}`).removeClass().addClass(`color_theme_picker_container ${$(this).attr('key')}`).children().first().text($(this).text())
    $('.color_theme_picker_themes').addClass('none')
    new_action();
})
