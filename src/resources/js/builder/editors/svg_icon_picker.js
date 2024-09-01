draw_svg_icon_picker = function(data){
    let editor = $('<div/>',{
        class:`editor svg_icon_picker w100p`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        icon_type:data.icon_type,
        render:data.render ?? data.key_tree,
    })
    return editor;
}
set_svg_icon_picker = function(editor){
    let icon = get_editor_val(editor);
    editor.text('').append(
        draw_svg_icon_picker_icon(icon)
    );
}
draw_svg_icon_picker_icon = function(val){
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
$('body').on('mouseup','.svg_icon_picker',function(e){
    let editor = $(this)
    window.selected_svg_icon_picker = editor;
    $('.icons_browser').text('').css({
        right:$(window).width() - $(this).offset().left - $(this).outerWidth(),
        top:$(this).offset().top,
    })
    setTimeout(()=>{
        $('.icons_browser').addClass('icons_browser_show')
    },50)
    let icons = get_icons(editor.attr('icon_type'));
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
            $('<div/>',{class:'set_icon',key_tree:editor.attr('key_tree'),key:editor.attr('key'),icon_type:editor.attr('icon_type'),icon_key:key}).append(
                icon
            )
        )
    }
})
$('body').on('click','.set_icon',function(e){
    let key_tree = window.selected_svg_icon_picker.attr('key_tree')
    let elem = get_element_data(key_tree);
    let icon_data = get_icons($(this).attr('icon_type'))[$(this).attr('icon_key')];
    elem[window.selected_svg_icon_picker.attr('key')].attr = {};
    elem[window.selected_svg_icon_picker.attr('key')].children = [];
    for(const key in icon_data.svg_attr){
        elem[window.selected_svg_icon_picker.attr('key')].attr[key] = icon_data.svg_attr[key];
    }
    for(const key in icon_data.paths_attrs){
        elem[window.selected_svg_icon_picker.attr('key')].children.push(icon_data.paths_attrs[key])
    }
    new_action(window.selected_svg_icon_picker.attr('render'));
    set_svg_icon_picker(window.selected_svg_icon_picker);
})