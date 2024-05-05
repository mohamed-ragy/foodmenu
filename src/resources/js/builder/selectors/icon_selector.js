draw_icon_selector = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,'0')

    // let val = get_key_tree(data.keys_arr[0].key_tree).elem[data.keys_arr[0].key];
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row selector_container`}).append(
        $('<div/>',{text:data.name}),
        selector = $('<div/>',{class:`selector select_icon`,icon_type:data.icon_type}).append(draw_icon_selector_icon(elem_val.val))
    )
    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    return selector_container;
}
draw_icon_selector_icon = function(val){
    let val_icon = '<svg width="25px" height="25px" fill="rgb(75,75,75)" stroke="rgb(75,75,75)" ';
    for(const key in val.attr){
        val_icon = `${val_icon} ${key}="${val.attr[key]}"`;
    }
    val_icon = `${val_icon}>`;
    for(const key in val.children){
        val_icon = `${val_icon}<${val.children[key].tag} `;
        for(const key2 in val.children[key].attr){
            val_icon = `${val_icon} ${key2}="${val.children[key].attr[key2]}"`
        }
        val_icon = `${val_icon}></${val.children[key].tag}>`;
    }
    val_icon = `${val_icon}</svg>`;
    return val_icon;
}
set_icon_selctor = function(selector){
    let val = get_key_tree(selector.attr('key_tree')).elem[selector.attr('key')];
    selector.text('').append(draw_icon_selector_icon(val))
}
$('body').on('click','.select_icon',function(e){
    // e.stopImmediatePropagation();
    $('.icons_browser').text('').attr('key_tree',$(this).attr('key_tree')).attr('key',$(this).attr('key')).css({
        right:$(window).width() - $(this).offset().left - $(this).outerWidth(),
        top:$(this).offset().top,
    })
    setTimeout(()=>{
        $('.icons_browser').addClass('icons_browser_show')
    },50)
    let icons = get_icons($(this).attr('icon_type'));
    for(const key in icons){
        let icon_data = icons[key];
        let icon = '<svg width="25px" height="25px" fill="rgb(75,75,75)" stroke="rgb(75,75,75)" ';
        for(const key2 in icon_data.svg_attr){
            icon = `${icon} ${key2}="${icon_data.svg_attr[key2]}"`;
        }
        icon = `${icon}>`;
        for(const key2 in icon_data.paths_attrs){
            icon = `${icon}<${icon_data.paths_attrs[key2].tag} `;
            for(const key3 in icon_data.paths_attrs[key2].attr){
                icon = `${icon} ${key3}="${icon_data.paths_attrs[key2].attr[key3]}"`
            }
            icon = `${icon}></${icon_data.paths_attrs[key2].tag}>`;
        }
        icon = `${icon}</svg>`;
        $('.icons_browser').append(
            $('<div/>',{class:'set_icon',key_tree:$(this).attr('key_tree'),key:$(this).attr('key'),icon_type:$(this).attr('icon_type'),icon_key:key}).append(
                icon
            )
        )
    }
})
$('body').on('click','.set_icon',function(e){
    // e.stopImmediatePropagation();
    let key_tree = $(this).attr('key_tree')
    let elem = get_key_tree(key_tree).elem;
    let icon_data = get_icons($(this).attr('icon_type'))[$(this).attr('icon_key')];
    elem[$(this).attr('key')].attr = {};
    elem[$(this).attr('key')].children = [];

    for(const key in icon_data.svg_attr){
        elem[$(this).attr('key')].attr[key] = icon_data.svg_attr[key];
    }
    for(const key in icon_data.paths_attrs){
        elem[$(this).attr('key')].children.push(icon_data.paths_attrs[key])
    }
    new_action();
})
