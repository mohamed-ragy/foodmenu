require('./editor/section.js');
require('./editor/header.js');
require('./editor/general.js');

set_editor_popup_editor = function(){
    if(typeof(window.selected) === 'undefined'){return;}
    if(window.selected == null){return;}
    let elem_data = get_elem_data(window.selected);
    $("#editor").css({
        top:'unset',
        bottom:'unset',
        left:'unset',
        right:'unset',
    })
    $('#editor').find('.editor_popup_head_btn').addClass('none');
    $('#editor').find('.editor_popup_title').text('')
    
    switch(elem_data.elem.type){
        case 'section':
            $('#editor').find('.editor_popup_title').text(elem_data.elem.name)
            set_editor_popup_editor_position_section(window.selected);
            // draw_editor_popup_editor_shortcuts_section(elem_data);
        break;
        case 'section_block':
            $('#editor').find('.editor_popup_title').text(texts.section_block)
            set_editor_popup_editor_position_section_block(window.selected);
            // draw_editor_popup_editor_shortcuts_section_block(elem_data);
        break;
        case 'elem':
            $('#editor').find('.editor_popup_title').text(texts.elems[elem_data.elem.elem_type])
            // draw_editor_popup_editor_shortcuts_elem(elem_data);
            set_editor_popup_editor_position_elem(window.selected);
        break;
        case 'website_header': 
            $('#editor').find('.editor_popup_title').text(texts.website_tools.header)
            set_editor_popup_editor_position_header();
        break;
        case 'header_component': 
            $('#editor').find('.editor_popup_title').text(texts.styling[elem_data.elem.header_component])
            set_editor_popup_editor_position_header();
        break;
        case 'header_navList_item':
            $('#editor').find('.editor_popup_title').text(texts.styling.header_navList)
            set_editor_popup_editor_position_header();
        break;
        case 'header_drop_down_list':
            $('#editor').find('.editor_popup_title').text(texts.styling.drop_down_list)
            set_editor_popup_editor_position_header();
        break;
        case 'header_drop_down_list_item':
            $('#editor').find('.editor_popup_title').text(texts.styling.drop_down_list_item)
            set_editor_popup_editor_position_header();
        break;
    }
    fix_editor_popup_position($('#editor'))
    draw_editor_popup_editor_shortcuts();
}

$('body').on('click','.editor_popup_body_shortcut',function(e){
    setTimeout(()=>{
        undo_redo_actions(true,false);
    },100)
    let editor_popup = $(this).closest('.editor_popup');
    editor_popup.find('.editor_popup_body_wrapper').scrollTop(0)
    editor_popup.find('.editor_popup_head_btn').addClass('none');
    editor_popup.find('.editor_popup_body_shortcut').removeClass('editor_popup_body_shortcut_selected');
    editor_popup.find('.editor_popup_body_shortcut_open_group').removeClass('editor_popup_body_shortcut_open_group_selected')
    $(this).addClass('editor_popup_body_shortcut_selected')
    if($(this).hasClass('editor_popup_body_shortcut_group_elem')){
        $(this).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
    }
    stop_preview_animations();
    if($(this).hasClass('editor_animation')){
        play_preview_animations();
    }
})
$('body').on('click','.set_editor_popup_editor',function(){
    set_editor_popup_editor();
})
draw_editor_popup_editor_shortcuts = function(){
    let elem_data = get_elem_data(window.selected);
    let accessibility = elem_data.elem.accessibility;
    $('#editor').find('.editor_popup_body_shortcuts').text('')
    $('#editor').find('.editor_popup_body_shortcuts').append(
        accessibility.includes('header_settings') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-header editor_header_settings`,tooltip:texts.header_settings})
        :'',
        accessibility.includes('header_components') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-header_layout editor_header_components`,tooltip:texts.styling.header_components})
        :'',
        accessibility.includes('header_logo_alignment') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-alignment editor_header_logo_alignment`,tooltip:texts.styling.alignment})
        :'',
        accessibility.includes('header_navList') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-navigation_list editor_header_navList`,tooltip:texts.styling.header_navList})
        :'',
        accessibility.includes('header_iconsList') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-icon editor_header_iconsList`,tooltip:texts.styling.header_iconsList})
        :'',
        accessibility.includes('header_logo_logo') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-logo_restaurant_name editor_header_logo_logo`,tooltip:texts.styling.restauran_logo})
        :'',
        accessibility.includes('header_logo_restaurant_name') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-title editor_header_logo_restaurant_name`,tooltip:texts.styling.restaurant_name})
        :'',
        accessibility.includes('header_drop_down_list') ? 
        $('<div/>',{class:`editor_popup_body_shortcut ico-drop_down_list editor_header_drop_down_list`,tooltip:texts.styling.drop_down_list})
        :'',
        accessibility.includes('header_drop_down_list_item') ? 
        $('<div/>',{class:`editor_popup_body_shortcut ico-list editor_header_drop_down_list_item`,tooltip:texts.styling.drop_down_list_item})
        :'',
        accessibility.includes('header_mobileNav_icon') ?
        $('<div/>',{class:'editor_popup_body_shortcut ico-mobile_navbar_icon editor_header_mobileNav_icon',tooltip:texts.styling.header_mobileNav_icon})
        :'',
        accessibility.includes('button') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-button editor_button`,tooltip:texts.styling.button})
        : '',
        accessibility.includes('text') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-text editor_text`,tooltip:texts.styling.text})
        : '',
        accessibility.includes('image') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-image editor_image`,tooltip:texts.styling.image})
        : '',
        accessibility.includes('icon') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-icon editor_icon`,tooltip:texts.styling.icon})
        : '',
        accessibility.includes('display') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-display editor_display`,tooltip:texts.styling.display})
        : '',
        accessibility.includes('section_rename') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-rename editor_section_rename`,tooltip:texts.rename})
        : '',
        accessibility.includes('section_sizing') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-sizing editor_section_sizing`,tooltip:texts.sizing})
        : '',
        accessibility.includes('section_spacing') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-spacing editor_section_spacing`,tooltip:texts.spacing})
        : '',
        accessibility.includes('section_adapt_header') && elem_data.elem.sort == 0 ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-header editor_section_adapt_header`,tooltip:texts.styling.adapt_header})
        : '',
        accessibility.includes('section_layout') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-layout editor_section_layout`,tooltip:texts.change_layout})
        : '',
        accessibility.includes('section_driver') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-driver editor_section_driver`,tooltip:texts.styling.section_driver})
        : '',
        accessibility.includes('alignment') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-alignment editor_alignment`,tooltip:texts.styling.alignment})
        : '',
        //styling
        accessibility.includes('styling') ?
        $('<div/>',{class:'editor_popup_body_shortcut_group'}).append(
            $('<div/>',{class:`editor_popup_body_shortcut_open_group ico-styling `,tooltip:texts.styling.styling}),
            $('<div/>',{class:`${accessibility.includes('filter') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-filter editor_filter`,tooltip:texts.styling.filter}),   
            $('<div/>',{class:`${accessibility.includes('border') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-border editor_border`,tooltip:texts.styling.border}),   
            $('<div/>',{class:`${accessibility.includes('border_radius') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-border_radius editor_border_radius`,tooltip:texts.styling.border_radius}),   
            $('<div/>',{class:`${accessibility.includes('box_shadow') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-box_shadow editor_box_shadow`,tooltip:texts.styling.box_shadow}),   
            $('<div/>',{class:`${accessibility.includes('transform') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-transform editor_transform`,tooltip:texts.styling.transform}),   

        )
        : '',
        //sizing
        accessibility.includes('sizing') ?
        $('<div/>',{class:'editor_popup_body_shortcut_group'}).append(
            $('<div/>',{class:`editor_popup_body_shortcut_open_group ico-sizing `,tooltip:texts.styling.sizing}),
            $('<div/>',{class:`${accessibility.includes('width') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-width editor_width`,tooltip:texts.styling.width}),   
            $('<div/>',{class:`${accessibility.includes('height') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-height editor_height`,tooltip:texts.styling.height}),
        )
        : '',
        //spacing
        accessibility.includes('spacing') ?
         $('<div/>',{class:'editor_popup_body_shortcut_group'}).append(
            $('<div/>',{class:`editor_popup_body_shortcut_open_group ico-spacing `,tooltip:texts.styling.spacing}),
            $('<div/>',{class:`${accessibility.includes('padding') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-padding editor_padding`,tooltip:texts.styling.padding}),   
            $('<div/>',{class:`${accessibility.includes('margin') ? '' : 'editor_popup_body_shortcut_dump'} editor_popup_body_shortcut_group_elem editor_popup_body_shortcut ico-margin editor_margin`,tooltip:texts.styling.margin}),   
         )
        : '',
        //
        accessibility.includes('animation') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-animation editor_animation`,tooltip:texts.styling.animation})
        : '',
        accessibility.includes('background') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-background editor_background`,tooltip:texts.styling.background})
        : '',
        accessibility.includes('interactions') ?
        $('<div/>',{class:`editor_popup_body_shortcut ico-interactions editor_interactions`,tooltip:texts.interactions})
        : '',
    )
}