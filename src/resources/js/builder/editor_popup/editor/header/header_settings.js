const jquery = require("jquery");

draw_editor_popup_header_settings = function(){
    if(!accessibility_check(window.selected,'header_settings')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'w100p editor_popup_container',key:'header_settings'}).append(
                        $('<div/>',{class:'row alnC jstfyE w100p'}).append(
                            $('<button/>',{class:'btn btn-cancel editor_popup_show_container',text:texts.change_layout,key:'change_header_layout'}),
                        ),
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.position}),
                            draw_select_box({
                                key_tree:'website_header',
                                variable_key:'css',
                                key:'position',
                                selections:[{text:texts.styling.local,key:'relative'},{text:texts.styling.fixed,key:'sticky'},{text:texts.styling.dynamic,key:'dynamic'}],
                                editor_class:'header_position_select_box',

                            }),
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.max_width}),
                            draw_select_box({
                                key_tree:'website_header.children.header_wrapper',
                                variable_key:'css',
                                key:'max-width',
                                selections:[{text:texts.styling.max_content,key:'var(--page_max_width)'},{text:texts.styling.full_page,key:'100%'}],
                            }),
                        ),
                    ),
                    $('<div/>',{class:'w100p editor_popup_container none',key:'change_header_layout',parent_key:'header_settings'}).append(
                        $('<div/>',{class:'bold m10 mT20',text:texts.styling.change_header_layout})
                    )
                ]
            })
        )
        for(const key in window.header_layouts){
            let layout = window.header_layouts[key];
            let container_style = '';
            for(const key in layout.container){
                container_style = `${container_style}${key}:${layout.container[key]};`;
            }
            let elem1_style = '';
            for(const key in layout.elem1){
                elem1_style = `${elem1_style}${key}:${layout.elem1[key]};`;
            }
            let elem2_style = '';
            for(const key in layout.elem2){
                elem2_style = `${elem2_style}${key}:${layout.elem2[key]};`;
            }
            let elem3_style = '';
            for(const key in layout.elem3){
                elem3_style = `${elem3_style}${key}:${layout.elem3[key]};`;
            }
            $('.editor_popup_container[key="change_header_layout"]').append(
                $('<div/>',{
                    class:'header_preview_container',
                    key:key,
                    style:container_style,
                }).append(
                    $('<div/>',{class:'header_preview_elem1',style:elem1_style}).append(
                        $('<div/>')
                    ),
                    $('<div/>',{class:'header_preview_elem2',style:elem2_style}).append(
                        $('<div/>'),
                        $('<div/>'),
                        $('<div/>'),
                    ),
                    $('<div/>',{class:'header_preview_elem3',style:elem3_style}).append(
                        $('<div/>'),
                        $('<div/>'),
                        $('<div/>'),
                    ),
                )
            )
        }
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.header_settings)
            $(`.editor_popup_body_shortcut.editor_header_settings`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_header_settings',function(e){
    draw_editor_popup_header_settings();
})
$('body').on('click','.header_preview_container',function(e){
    let layout = window.header_layouts[$(this).attr('key')];
    for(const key in layout.container){
        window.template.website_header.children.header_wrapper.css[key] = layout.container[key];
    }
    for(const key in layout.elem1){
        window.template.website_header.children.header_wrapper.children.header_logo.css[key] = layout.elem1[key];
    }
    for(const key in layout.elem2){
        window.template.website_header.children.header_wrapper.children.header_navList.css[key] = layout.elem2[key];
    }
    for(const key in layout.elem3){
        window.template.website_header.children.header_wrapper.children.header_iconsList.css[key] = layout.elem3[key];
    }
    new_action('website_header');
    set_page_setup_vars()
})
$('body').on('change','.header_position_select_box',function(e){
    let val = get_editor_val($(this));
    if(val == 'dynamic'){
        window.template.website_header.attr.dynamic = '1';
        $('#website').find('.website_header').attr('dynamic','1')
    }else{
        window.template.website_header.attr.dynamic = '0';
        $('#website').find('.website_header').attr('dynamic','0')
    }
})