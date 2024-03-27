show_edit_home_section = function(section_key){
    deselect_all();
    window.selected_section = section_key;
    let section = window.template.home[section_key];
    if(typeof(section) == 'undefined'){return;}
    $('#editor').find('.editor_popup_title').text(section.name)
    $(`section[key_tree="home.${section_key}"]`).addClass('section_selected')
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_head_btn').text('').append(
            $('<div/>',{class:'back_to_home_section_editor_settings none ico-arrowLeft pointer fs101'}),
        )
        $('#editor').addClass('mnw400').find('.editor_popup_body').text('').append(

            $('<div/>',{id:'home_section_editor_settings'}).append(
                $('<div/>',{class:'row alnC jstfyE w100p mY30'}).append(
                    $('<button/>',{class:'btn btn-cancel change_home_section_layout',text:texts.change_layout}),
                ),
                $('<div/>',{class:'section_style_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.name}),
                    $('<input>',{class:'input_editor_name editor_font',value:section.name,key_tree:`home.${section_key}`})
                ),
                $('<div/>',{class:'section_style_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.min_height}),
                    $('<div/>',{class:'inputList_container',id:`home_${section_key}_min_height`,key_tree:`home.${section_key}.children.section_container.style`,key:'min-height'}).append(
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
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.blocks_gap}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:`home.${section_key}.children.section_container.style`,key:'grid-gap'}).append(
                        $('<div/>',{class:`pY5 w25 home_${section_key}_grid_gap_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_grid_gap_select select_box`,text:'XS',key:'2px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_grid_gap_select select_box`,text:'S',key:'5px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_grid_gap_select select_box`,text:'M',key:'10px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_grid_gap_select select_box`,text:'L',key:'15px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_grid_gap_select select_box`,text:'XL',key:'20px'}),
                    )
                ),
                $('<div/>',{class:'section_style_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.margin}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:`home.${section_key}.style`,key:'padding'}).append(
                        $('<div/>',{class:`pY5 w25 home_${section_key}_padding_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_padding_select select_box`,text:'XS',key:'2px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_padding_select select_box`,text:'S',key:'5px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_padding_select select_box`,text:'M',key:'10px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_padding_select select_box`,text:'L',key:'15px'}),
                        $('<div/>',{class:`pY5 w25 home_${section_key}_padding_select select_box`,text:'XL',key:'20px'}),
                    )
                ),
                $('<div/>',{class:'section_style_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.background}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:`home.${section_key}`,key:'background'}).append(
                        $('<div/>',{class:`p5 home_${section_key}_background_select select_box`,text:texts.select_elems.color_theme,key:'color_theme'}),
                        $('<div/>',{class:`p5 home_${section_key}_background_select select_box`,text:texts.select_elems.image,key:'image'}),
                        // $('<div/>',{class:`p5 home_${section_key}_background_select select_box`,text:texts.select_elems.artistic,key:'artistic'}),
                    )
                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_color_theme`}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.color_theme}),
                    draw_color_theme_Picker(`home_${section_key}_color_theme`,`home.${section_key}`,'color_theme')
                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_background_image`}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.image}),
                    $('<div/>',{class:'editor_popup_img_select select_img',key_tree:`home.${section_key}.background_style`,key:'background-image'}).append(
                        $('<img/>',{class:'editor_popup_img_select_img',id:`home_${section_key}_background_image`}),
                        $('<div/>',{class:'ico-edit editor_popup_img_select_edit_icon'})
                    )
                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_background_image`}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.imageSize}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:`home.${section_key}.background_style`,key:'background-size'}).append(
                        $('<div/>',{class:`p5 home_${section_key}_bgSize_select select_box`,text:texts.select_elems.cover,key:'cover'}),
                        $('<div/>',{class:`p5 home_${section_key}_bgSize_select select_box`,text:texts.select_elems.contain,key:'contain'}),
                    )
                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_background_image`}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.imageStyle}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:`home.${section_key}.background_style`,key:'background-attachment'}).append(
                        $('<div/>',{class:`p5 home_${section_key}_bgAttachment_select select_box`,text:texts.select_elems.fixed,key:'fixed'}),
                        $('<div/>',{class:`p5 home_${section_key}_bgAttachment_select select_box`,text:texts.select_elems.local,key:'local'}),
                    )
                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_background_image`}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.imagePosition}),
                    $('<div/>',{class:'row alnC jstfyE mis-10'}).append(
                        $('<div/>',{class:'select_box_container',key_tree:`home.${section_key}.background_style`,key:'background-position-x'}).append(
                            $('<div/>',{class:`p5 home_${section_key}_bgPositionX_select select_box ico-position_left`,key:'left'}),
                            $('<div/>',{class:`p5 home_${section_key}_bgPositionX_select select_box ico-position_hcenter`,key:'center'}),
                            $('<div/>',{class:`p5 home_${section_key}_bgPositionX_select select_box ico-position_right`,key:'right'}),
                        ),
                        $('<div/>',{class:'mis-5 select_box_container',key_tree:`home.${section_key}.background_style`,key:'background-position-y'}).append(
                            $('<div/>',{class:`p5 home_${section_key}_bgPositionY_select select_box ico-position_top`,key:'top'}),
                            $('<div/>',{class:`p5 home_${section_key}_bgPositionY_select select_box ico-position_vcenter`,key:'center'}),
                            $('<div/>',{class:`p5 home_${section_key}_bgPositionY_select select_box ico-position_bottom`,key:'bottom'}),
                        ),
                    )

                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_background_image`}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.imageRepeat}),
                    $('<div/>',{class:`switch_btn switch_btn_action home_${section_key}_bgRepeat_select`,key_tree:`home.${section_key}.background_style`,key:'background-repeat',switch_on:'repeat',switch_off:'no-repeat'})
                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_background_image`}).append(
                    $('<div/>',{class:'taS mie-10 row alnC jstfyC'}).append(
                        $('<div/>',{class:'fs09',text:texts.imageBlendMode}),
                        $('<span/>',{class:'ico-info fs09 mis-5',tooltip:texts.infos.imageBlendMode})
                    ),
                    $('<div/>',{class:'inputList_container',id:`home_${section_key}_bg_filter`,key_tree:`home.${section_key}.background_style`,key:'background-blend-mode'}).append(
                        $('<div/>',{class:'',text:''}),
                        $('<div/>',{class:'ico-arrowDown'}),
                        $('<div/>',{class:'none inputList_elems_temp'}).append(
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems.normal,key:'normal'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems.color,key:'color'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['color-burn'],key:'color-burn'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['color-dodge'],key:'color-dodge'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems.darken,key:'darken'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems.difference,key:'difference'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems.exclusion,key:'exclusion'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['hard-light'],key:'hard-light'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['hue'],key:'hue'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['lighten'],key:'lighten'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['luminosity'],key:'luminosity'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['multiply'],key:'multiply'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['overlay'],key:'overlay'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['saturation'],key:'saturation'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['screen'],key:'screen'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems['soft-light'],key:'soft-light'}),


                        )
                    )
                ),
                $('<div/>',{class:`section_style_row home_${window.selected_section}_style_row_background_image`}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.backgroundColor}),
                    $('<div/>',{class:'color_s_circle color_select_no_var',id:`home_${section_key}_background_style_background_color`,key_tree:`home.${section_key}.background_style`,key:'background-color'}).append(
                        $('<input/>',{class:'color_select_no_var_input vH absolute',type:'color'}),
                    ),
                )
            ),
            $('<div/>',{id:'home_section_editor_settings_change_layout',class:'row wrap alnC jstfyC w100p none'})
        )
    })
    let section_layouts = get_home_sections_layouts();
    for(const key in section_layouts){
        let layout = section_layouts[key]
        let section_container = layout.section_container;
        let thisLayoutContainer;
        $('#home_section_editor_settings_change_layout').append(
            $('<div/>',{class:'change_home_section_layout_elem',layout:layout.layout}).append(
                thisLayoutContainer = $('<div/>',{class:'section_layout_elem_S'})
            )
        )
        thisLayoutContainer.css({
            'grid-template-areas':layout.section_container.style['grid-template-areas'],
            'grid-template-columns':layout.section_container.style['grid-template-columns'],
        })
        let children_counter = 0;
        for(const key2 in section_container.children){
            children_counter++;
            thisLayoutContainer.append(
                $('<div/>',{class:'',style:`grid-area:elem${children_counter};outline:1px solid var(--white-4);`})
            )
        }
    }
    set_editor_poup_home_section();
}
set_editor_poup_home_section = function(){
    if(typeof(window.template.home[window.selected_section]) == 'undefined'){
        deselect_all();
        hide_editor_popup('editor')
        return;
    }

    $(`.home_${window.selected_section}_style_row_color_theme`).removeClass('none')
    $(`.home_${window.selected_section}_style_row_background_image`).removeClass('none')
    $(`.home_${window.selected_section}_style_row_background_artistic`).removeClass('none')

    $(`.home_${window.selected_section}_background_select`).removeClass('select_box_selected')
    $(`.home_${window.selected_section}_background_select[key="${window.template.home[window.selected_section].background}"]`).addClass('select_box_selected')

    if(window.template.home[window.selected_section].background == 'color_theme'){
        $(`.home_${window.selected_section}_style_row_background_image`).addClass('none')
        $(`.home_${window.selected_section}_style_row_background_artistic`).addClass('none')
        window.template.home[window.selected_section].background_style = {}

    }else if(window.template.home[window.selected_section].background == 'image'){
        $(`.home_${window.selected_section}_style_row_color_theme`).addClass('none')
        $(`.home_${window.selected_section}_style_row_background_artistic`).addClass('none')
        window.template.home[window.selected_section].background_style = {
            'background-image' : window.template.home[window.selected_section].background_style['background-image'] ?? '/storage/imgs/cpanel/noimg2.png',
            'background-attachment' : window.template.home[window.selected_section].background_style['background-attachment'] ?? 'local',
            'background-position-x' : window.template.home[window.selected_section].background_style['background-position-x'] ?? 'center',
            'background-position-y' : window.template.home[window.selected_section].background_style['background-position-y'] ?? 'center',
            'background-repeat' : window.template.home[window.selected_section].background_style['background-repeat'] ?? 'no-repeat',
            'background-size' : window.template.home[window.selected_section].background_style['background-size'] ?? 'cover',
            'background-blend-mode' : window.template.home[window.selected_section].background_style['background-blend-mode'] ?? 'normal',
            'background-color' : window.template.home[window.selected_section].background_style['background-color'] ?? '#ffffff',
        }
        $(`#home_${window.selected_section}_background_image`).attr('src',window.template.home[window.selected_section].background_style['background-image'] ?? '/storage/imgs/cpanel/noimg2.png')

        $(`.home_${window.selected_section}_bgSize_select`).removeClass('select_box_selected')
        $(`.home_${window.selected_section}_bgSize_select[key="${window.template.home[window.selected_section].background_style['background-size']}"]`).addClass('select_box_selected')

        $(`.home_${window.selected_section}_bgAttachment_select`).removeClass('select_box_selected')
        $(`.home_${window.selected_section}_bgAttachment_select[key="${window.template.home[window.selected_section].background_style['background-attachment']}"]`).addClass('select_box_selected')

        $(`.home_${window.selected_section}_bgPositionX_select`).removeClass('select_box_selected')
        $(`.home_${window.selected_section}_bgPositionX_select[key="${window.template.home[window.selected_section].background_style['background-position-x']}"]`).addClass('select_box_selected')

        $(`.home_${window.selected_section}_bgPositionY_select`).removeClass('select_box_selected')
        $(`.home_${window.selected_section}_bgPositionY_select[key="${window.template.home[window.selected_section].background_style['background-position-y']}"]`).addClass('select_box_selected')
        if(window.template.home[window.selected_section].background_style['background-repeat'] == 'repeat'){
            $(`.home_${window.selected_section}_bgRepeat_select`).addClass('switch_btn_selected')
        }else if(window.template.home[window.selected_section].background_style['background-repeat'] == 'no-repeat'){
            $(`.home_${window.selected_section}_bgRepeat_select`).removeClass('switch_btn_selected')
        }
        $(`#home_${window.selected_section}_bg_filter`).children().first().text(texts.select_elems[window.template.home[window.selected_section].background_style['background-blend-mode']])
        $(`#home_${window.selected_section}_background_style_background_color`).css({'background-color':window.template.home[window.selected_section].background_style['background-color']})

    }else if(window.template.home[window.selected_section].background == 'artistic'){
        $(`.home_${window.selected_section}_style_row_color_theme`).addClass('none')
        $(`.home_${window.selected_section}_style_row_background_image`).addClass('none')
        window.template.home[window.selected_section].background_style = {}

    }


    $(`#home_${window.selected_section}_min_height`).children().first().text(texts.select_elems[`_${window.template.home[window.selected_section].children.section_container.style['min-height']}`] ?? texts.select_elems._100vh)

    $(`.home_${window.selected_section}_grid_gap_select`).removeClass('select_box_selected')
    $(`.home_${window.selected_section}_grid_gap_select[key="${window.template.home[window.selected_section].children.section_container.style['grid-gap']}"]`).addClass('select_box_selected')

    $(`.home_${window.selected_section}_padding_select`).removeClass('select_box_selected')
    $(`.home_${window.selected_section}_padding_select[key="${window.template.home[window.selected_section].style['padding']}"]`).addClass('select_box_selected')
}
//events
$('html,body').on('click','.change_home_section_layout',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('#home_section_editor_settings'),$('#home_section_editor_settings_change_layout'))
    $('.back_to_home_section_editor_settings').removeClass('none');
})
$('html,body').on('click','.back_to_home_section_editor_settings',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('#home_section_editor_settings'),$('#home_section_editor_settings_change_layout'))
    $('.back_to_home_section_editor_settings').addClass('none');
})
$('html,body').on('click','.change_home_section_layout_elem',function(e){
    e.stopImmediatePropagation();
    let section_layouts = get_home_sections_layouts();
    let layout = JSON.parse(JSON.stringify(section_layouts.find(item=>item.layout == $(this).attr('layout')).section_container));
    window.template.home[window.selected_section].children.section_container = layout
    new_action();
    editor_popup_to_parent($('#home_section_editor_settings'),$('#home_section_editor_settings_change_layout'))
    $('.back_to_home_section_editor_settings').addClass('none');
})
///
$('html,body').on('click','section[type="home_section"]',function(e){
    // e.stopImmediatePropagation();
    if($('.home_section_elements_container:hover').length > 0){return}
    if($('.section_btns_container:hover').length != 0){return}
    show_edit_home_section($(this).attr("key_tree").split('.')[1])
})
$('html,body').on('click','.edit_home_section_btn',function(e){
    e.stopImmediatePropagation();
    show_edit_home_section($(this).attr('section'))
})
///
$('html,body').on('click','.delete_home_section_btn',function(e){
    e.stopImmediatePropagation();
    let selected_section = window.selected_section;
    if(window.selected_section == $(this).attr('section')){
        selected_section = null;
    }
    window.template.home.splice($(this).attr('section'),1)
    for(const key in window.template.home){
        if(selected_section == window.template.home[key].sort ){
            selected_section = key;
        }
        window.template.home[key].sort = parseInt(key);

    }
    hide_editor_popup('editor')
    deselect_all();
    new_action();

    if(selected_section != null){
        show_edit_home_section(selected_section)
    }

})
//
$('html,body').on('click','.swap_home_section_down_btn',function(e){
    e.stopImmediatePropagation();
    let from_sort =  parseInt(window.template.home[$(this).attr('section')].sort);
    let to_sort =  parseInt(window.template.home[$(this).attr('section')].sort) + 1;
    $(`section[key_tree="home.${from_sort}"]`).css({
        'transform':`translateY(${$(`section[key_tree="home.${to_sort}"]`).height()}px)`,
    })
    $(`section[key_tree="home.${to_sort}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="home.${from_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        for(const key in window.template.home){
            if(window.template.home[key].sort == to_sort){
                window.template.home[key].sort = from_sort;
            }
        }
        window.template.home[$(this).attr('section')].sort = to_sort;
        hide_editor_popup('editor')
        deselect_all();
        new_action();
        show_edit_home_section(to_sort)
    },200)

})
$('html,body').on('click','.swap_home_section_up_btn',function(e){
    e.stopImmediatePropagation();
    let from_sort =  parseInt(window.template.home[$(this).attr('section')].sort);
    let to_sort =  parseInt(window.template.home[$(this).attr('section')].sort) - 1;
    $(`section[key_tree="home.${from_sort}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="home.${to_sort}"]`).height()}px)`,
    })
    $(`section[key_tree="home.${to_sort}"]`).css({
        'transform':`translateY(${$(`section[key_tree="home.${from_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        for(const key in window.template.home){
            if(window.template.home[key].sort == to_sort){
                window.template.home[key].sort = from_sort;
            }
        }
        window.template.home[$(this).attr('section')].sort = to_sort;
        hide_editor_popup('editor')
        deselect_all();
        new_action();
        show_edit_home_section(to_sort)
    },200)
})
$('html,body').on('click','.dublicate_home_section_btn',function(e){
    e.stopImmediatePropagation();
    let new_section = window.template.home[$(this).attr('section')];
    $(`section[key_tree="home.${$(this).attr('section')}"]`).css({
        'margin-bottom': `${ $(`section[key_tree="home.${$(this).attr('section')}"]`).height()}px`
    })
    setTimeout(()=>{
        window.template.home.push(JSON.parse(JSON.stringify(new_section)));
        window.template.home.sort((a,b)=>{
            return a.sort - b.sort;
        })
        for(const key in window.template.home){
            window.template.home[key].sort = parseInt(key) + 1
        }
        new_action();
        $('#website').animate({scrollTop:$(`section[key_tree="home.${parseInt($(this).attr('section')) + 1}"]`).position().top - 50},300)
        show_edit_home_section(parseInt($(this).attr('section')) + 1)
    },200)

});
