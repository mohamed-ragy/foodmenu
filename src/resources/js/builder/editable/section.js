show_edit_section = function(key_tree){
    deselect_all();
    window.selected_section_key_tree = key_tree;

    let section_key_tree = key_tree.split('.');
    let section = window.template
    for(const key in section_key_tree){
        section = section[section_key_tree[key]];
    }
    $(`section[key_tree="${key_tree}"]`).find('.section_container').addClass('section_selected')
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_head_btn').text('').append(
            $('<div/>',{class:'back_to_section_editor_settings none ico-arrowLeft pointer fs101'}),
        )
        $('#editor').find('.editor_popup_body').text('').append(

            $('<div/>',{id:'section_editor_settings'}).append(
                $('<div/>',{class:'row alnC jstfyE w100p mY30'}).append(
                    $('<button/>',{class:'btn btn-cancel change_section_layout',text:texts.change_layout}),
                ),
                $('<div/>',{class:'section_style_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.min_height}),
                    $('<div/>',{class:'inputList_container',id:`${key_tree.replace('.','_')}_min_height`,key_tree:`${key_tree}.children.section_container.style`,key:'min-height'}).append(
                        $('<div/>',{class:'',text:texts.select_elems[`_${section.children.section_container.style['min-height']}`] ?? texts.select_elems._100vh}),
                        $('<div/>',{class:'ico-arrowDown'}),
                        $('<div/>',{class:'none inputList_elems_temp'}).append(
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._100vh,key:'var(--screen_height)'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._400px,key:'400px'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._500px,key:'500px'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._600px,key:'600px'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._700px,key:'700px'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._800px,key:'800px'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._900px,key:'900px'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems._1000px,key:'1000px'}),

                        )
                    )
                ),
                $('<div/>',{class:'section_style_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.color_theme}),
                    draw_color_theme_Picker(`${key_tree.replace('.','_')}_color_theme`,`${key_tree}`,'color_theme')
                ),
                $('<div/>',{class:'section_style_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.backgroundImage}),
                    $('<div/>',{class:`switch_btn use_section_background_image`,key_tree:key_tree})
                ),
                $('<div/>',{class:'section_style_row section_style_row_background_image'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.image}),
                    $('<div/>',{class:'editor_popup_img_select select_img',key_tree:`${key_tree}.style`,key:'background-image'}).append(
                        $('<img/>',{class:'editor_popup_img_select_img',id:`${key_tree.replace('.','_')}_background_image`}),
                        $('<div/>',{class:'ico-edit editor_popup_img_select_edit_icon'})
                    )
                ),
                $('<div/>',{class:'section_style_row section_style_row_background_image'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.imageSize}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:`${key_tree}.style`,key:'background-size'}).append(
                        $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgSize_select select_box`,text:texts.select_elems.cover,key:'cover'}),
                        $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgSize_select select_box`,text:texts.select_elems.contain,key:'contain'}),
                    )
                ),
                $('<div/>',{class:'section_style_row section_style_row_background_image'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.imageStyle}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:`${key_tree}.style`,key:'background-attachment'}).append(
                        $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgAttachment_select select_box`,text:texts.select_elems.fixed,key:'fixed'}),
                        $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgAttachment_select select_box`,text:texts.select_elems.local,key:'local'}),
                    )
                ),
                $('<div/>',{class:'section_style_row section_style_row_background_image'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.imagePosition}),
                    $('<div/>',{class:'row alnC jstfyE mis-10'}).append(
                        $('<div/>',{class:'select_box_container',key_tree:`${key_tree}.style`,key:'background-position-x'}).append(
                            $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgPositionX_select select_box ico-position_left`,key:'left'}),
                            $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgPositionX_select select_box ico-position_hcenter`,key:'center'}),
                            $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgPositionX_select select_box ico-position_right`,key:'right'}),
                        ),
                        $('<div/>',{class:'mis-5 select_box_container',key_tree:`${key_tree}.style`,key:'background-position-y'}).append(
                            $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgPositionY_select select_box ico-position_top`,key:'top'}),
                            $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgPositionY_select select_box ico-position_vcenter`,key:'center'}),
                            $('<div/>',{class:`p5 ${key_tree.replace('.','_')}_bgPositionY_select select_box ico-position_bottom`,key:'bottom'}),
                        ),
                    )

                ),
            ),
            $('<div/>',{id:'section_editor_settings_change_layout',class:'row wrap alnC jstfyC w100p none'})
        )
    })
    for(const key in window.section_layouts){
        $('#section_editor_settings_change_layout').append(
            window.section_layouts[key].preview_html
        )
    }
    set_edit_section(section);
}
set_edit_section = function(section){

    if(section.style['background-image'] == 'unset'){
        $('.use_section_background_image').removeClass('switch_btn_selected')
        $('.section_style_row_background_image').addClass('none')
    }else{
        $('.use_section_background_image').addClass('switch_btn_selected')
        $(`#${window.selected_section_key_tree.replace('.','_')}_background_image`).attr('src',section.style['background-image'])
        $('.section_style_row_background_image').removeClass('none')

    }

    $(`.${window.selected_section_key_tree.replace('.','_')}_bgSize_select`).removeClass('select_box_selected')
    $(`.${window.selected_section_key_tree.replace('.','_')}_bgSize_select[key="${section.style['background-size']}"]`).addClass('select_box_selected')

    $(`.${window.selected_section_key_tree.replace('.','_')}_bgAttachment_select`).removeClass('select_box_selected')
    $(`.${window.selected_section_key_tree.replace('.','_')}_bgAttachment_select[key="${section.style['background-attachment']}"]`).addClass('select_box_selected')

    $(`.${window.selected_section_key_tree.replace('.','_')}_bgPositionX_select`).removeClass('select_box_selected')
    $(`.${window.selected_section_key_tree.replace('.','_')}_bgPositionX_select[key="${section.style['background-position-x']}"]`).addClass('select_box_selected')

    $(`.${window.selected_section_key_tree.replace('.','_')}_bgPositionY_select`).removeClass('select_box_selected')
    $(`.${window.selected_section_key_tree.replace('.','_')}_bgPositionY_select[key="${section.style['background-position-y']}"]`).addClass('select_box_selected')

    $(`#${window.selected_section_key_tree.replace('.','_')}_min_height`).children().first().text(texts.select_elems[`_${section.children.section_container.style['min-height']}`] ?? texts.select_elems._100vh)

}
//events
$('html,body').on('click','.change_section_layout',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('#section_editor_settings'),$('#section_editor_settings_change_layout'))
    $('.back_to_section_editor_settings').removeClass('none');
})
$('html,body').on('click','.back_to_section_editor_settings',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('#section_editor_settings'),$('#section_editor_settings_change_layout'))
    $('.back_to_section_editor_settings').addClass('none');
})
$('html,body').on('click','.section_layout_elem',function(e){
    e.stopImmediatePropagation();
    let layout = window.section_layouts.find(item=>item.layout == $(this).attr('layout')).section_container;
    console.log(layout)
    let key_tree = window.selected_section_key_tree.split('.');
    // let template = window.template;
    // for(const key in key_tree){
    //     template = window.template[key_tree[key]];
    // }
    // template = layout;
    window.template[key_tree[0]][key_tree[1]].children.section_container =  layout;
    new_action();
    editor_popup_to_parent($('#section_editor_settings'),$('#section_editor_settings_change_layout'))
    $('.back_to_section_editor_settings').addClass('none');
})
///
$('html,body').on('click','.edit_section_btn',function(e){
    e.stopImmediatePropagation();
    show_edit_section($(this).attr('key_tree'))
})
$('html,body').on('click','.use_section_background_image',function(e){
    e.stopImmediatePropagation();
    let section_key_tree = window.selected_section_key_tree.split('.');
    let section = window.template;
    for(const key in section_key_tree){
        section = section[section_key_tree[key]];
    }
    if(!$(this).hasClass('switch_btn_selected')){
        section.style['background-image'] = '/storage/imgs/cpanel/noimg2.png';
    }else{
        section.style['background-image'] = 'unset';
    }
    new_action();
})
