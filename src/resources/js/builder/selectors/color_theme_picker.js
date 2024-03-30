draw_color_theme_Picker = function(id,key_tree,last_key){
    let key_tree_arr = key_tree.split('.');
    let template = window.template;
    for(const key in key_tree_arr){
        template = template[key_tree_arr[key]];
    }
    let selected_color_theme = template[last_key];
    return $('<div/>',{id:id,class:`color_theme_picker_container ${selected_color_theme}`,key_tree:key_tree,key:last_key}).append(
        $('<div/>',{class:'mie-5',text:texts.website_style[selected_color_theme]}),
        $('<div/>',{class:'ico-arrowDown mis-5'}),
    )
}

$('html,body').on('click','.color_theme_picker_container',function(e){
    e.stopImmediatePropagation();
    hidePopupSelectors();
    let key_tree = $(this).attr('key_tree').split('.');
    let template = window.template;
    for(const key in key_tree){
        template = template[key_tree[key]];
    }
    let selected_color_theme = template[$(this).attr('key')];
    $('.color_theme_picker_themes').attr('key_tree',$(this).attr('key_tree')).attr('key',$(this).attr('key')).attr('theme_picker',$(this).attr('id')).text('').append(
        selected_color_theme != 'transparent' && $(this).attr('key') != 'page_color_theme' ? $('<div/>',{class:'color_theme_picker_theme',text:texts.website_style.transparent,key:'transparent'}) : '',
        selected_color_theme != 'color_theme_1' ? $('<div/>',{class:'color_theme_picker_theme color_theme_1',text:texts.website_style.color_theme_1,key:'color_theme_1'}) : '',
        selected_color_theme != 'color_theme_2' ? $('<div/>',{class:'color_theme_picker_theme color_theme_2',text:texts.website_style.color_theme_2,key:'color_theme_2'}) : '',
        selected_color_theme != 'color_theme_3' ? $('<div/>',{class:'color_theme_picker_theme color_theme_3',text:texts.website_style.color_theme_3,key:'color_theme_3'}) : '',
        selected_color_theme != 'color_theme_4' ? $('<div/>',{class:'color_theme_picker_theme color_theme_4',text:texts.website_style.color_theme_4,key:'color_theme_4'}) : '',
        selected_color_theme != 'color_theme_5' ? $('<div/>',{class:'color_theme_picker_theme color_theme_5',text:texts.website_style.color_theme_5,key:'color_theme_5'}) : '',
        selected_color_theme != 'color_theme_6' ? $('<div/>',{class:'color_theme_picker_theme color_theme_6',text:texts.website_style.color_theme_6,key:'color_theme_6'}) : '',
        selected_color_theme != 'color_theme_7' ? $('<div/>',{class:'color_theme_picker_theme color_theme_7',text:texts.website_style.color_theme_7,key:'color_theme_7'}) : '',
        selected_color_theme != 'color_theme_8' ? $('<div/>',{class:'color_theme_picker_theme color_theme_8',text:texts.website_style.color_theme_8,key:'color_theme_8'}) : '',
        selected_color_theme != 'color_theme_9' ? $('<div/>',{class:'color_theme_picker_theme color_theme_9',text:texts.website_style.color_theme_9,key:'color_theme_9'}) : '',
        selected_color_theme != 'color_theme_10' ? $('<div/>',{class:'color_theme_picker_theme color_theme_10',text:texts.website_style.color_theme_1,key:'color_theme_10'}) : '',
        selected_color_theme != 'color_theme_11' ? $('<div/>',{class:'color_theme_picker_theme color_theme_11',text:texts.website_style.color_theme_11,key:'color_theme_11'}) : '',
        selected_color_theme != 'color_theme_12' ? $('<div/>',{class:'color_theme_picker_theme color_theme_12',text:texts.website_style.color_theme_12,key:'color_theme_12'}) : '',
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
        template = template[key_tree[key]];
    }
    template[$('.color_theme_picker_themes').attr('key')] = $(this).attr('key');
    $(`#${$('.color_theme_picker_themes').attr('theme_picker')}`).removeClass().addClass(`color_theme_picker_container ${$(this).attr('key')}`).children().first().text($(this).text())
    $('.color_theme_picker_themes').addClass('none')
    new_action();
})
