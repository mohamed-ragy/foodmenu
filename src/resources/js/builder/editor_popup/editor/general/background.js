draw_editor_popup_background = function(){
    show_editor_popup('editor',function(){
        let elem = get_key_tree(window.selected).elem;
        let backdrop_filter_container = '';
        // if(elem.type !== 'home_section'){
        //     backdrop_filter_container = $('<div/>',{class:`elem_backdrop_filter 100p ${elem.background != 'backdrop_filter' ? 'none' : ''}`}).append(
        //         draw_backdrop_filter({
        //             keys_arr:[{key_tree:`${window.selected}.css`,key:'backdrop-filter'}],
        //             is_responsive:true,
        //             is_hover:true,
        //         })
        //     )
        // }
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'editor_popup_container w100p',key:'elem_background_image'}).append(
                draw_editors_container({
                    is_responsive:false,
                    is_hover:false,
                    editors:[
                        $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.background}),
                            draw_select_box({
                                key_tree:window.selected,
                                variable_key:null,
                                key:'background',
                                selections:[
                                    {text:texts.styling.none,key:'none',hide_elem:'editor_background_color.editor_background_gradient.editor_background_backdrop_filter.editor_background_image'},
                                    {text:texts.styling.color,key:'color',show_elem:'editor_background_color',hide_elem:'editor_background_gradient.editor_background_backdrop_filter.editor_background_image'},
                                    {text:texts.styling.gradient,key:'gradient',show_elem:'editor_background_gradient',hide_elem:'editor_background_color.editor_background_backdrop_filter.editor_background_image'},
                                    {text:texts.styling.backdrop_filter,class:`${elem.type == 'home_section' ? 'none' : ''}`,key:'backdrop_filter',show_elem:'editor_background_backdrop_filter',hide_elem:'editor_background_color.editor_background_gradient.editor_background_image'},
                                    {text:texts.styling.image,key:'image',show_elem:'editor_background_image',hide_elem:'editor_background_color.editor_background_gradient.editor_background_backdrop_filter'},
                                ],
                            }),
                        )
                    ]
                }),
                draw_editors_container({
                    is_responsive:true,
                    is_hover:false,
                    editors:[
                        draw_color_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'background-color',
                        })
                    ]
                }),

                // $('<div/>',{class:`elem_background_image 100p ${elem.background != 'image' ? 'none' : ''}`}).append(
                //     draw_image_selector([{key:'background-image',key_tree:`${window.selected}.background_image`}]),
                //     draw_editor_show_container({
                //         key:'elem_background_filter',
                //         name:texts.styling.image_filter,
                //         row_class:true,
                //     }),
                //     draw_select_box({
                //         keys_arr:[{key:'background-size',key_tree:`${window.selected}.background_image`}],
                //         name:texts.styling.imageSize,
                //         selections:[
                //             {text:texts.styling.cover,key:'cover'},
                //             {text:texts.styling.contain,key:'contain'},
                //         ],
                //         is_responsive:true,
                //     }),
                //     draw_select_box({
                //         keys_arr:[{key:'background-attachment',key_tree:`${window.selected}.background_image`}],
                //         name:texts.styling.imageStyle,
                //         selections:[
                //             {text:texts.styling.fixed,key:'fixed'},
                //             {text:texts.styling.local,key:'local'},
                //         ],
                //         is_responsive:true,
                //     }),
                //     draw_select_box({
                //         keys_arr:[{key:'background-repeat',key_tree:`${window.selected}.background_image`}],
                //         name:texts.styling.imageRepeat,
                //         selections:[
                //             {text:texts.styling.repeat,key:'repeat'},
                //             {text:texts.styling.no_repeat,key:'no-repeat'},
                //         ],
                //         is_responsive:true,
                //     }),
                //     draw_image_position_selector({keys_arr:[{key:'background-position',key_tree:`${window.selected}.background_image`}],is_responsive:true,container_class:'editor_popup_row_border_bottom',}),
            
                // ),
                // backdrop_filter_container,
            ),
            // $('<div/>',{class:'editor_popup_container none w100p',key:'elem_background_filter',parent_key:'elem_background_image'}).append(
            //     draw_color_picker({
            //         keys_arr:[{key_tree:`${window.selected}.background_image`,key:'background-color'}],
            //         name:texts.styling.filter_color,
            //         container_class:'editor_popup_row_border_bottom editor_popup_row_sticky',
            //         color_picker_class:'background_filter_preview_color'
            //     }),
            //     $('<div/>',{class:'fs09 mX10 mY10',text:texts.styling.filter_style}),
            //     $('<div/>',{class:'elem_background_filters row wrap alnC jstfyC w100p'})
            // )
        )
        // for(const key in window.inputList_arr.background_blend_mode){
        //     let filter = window.inputList_arr.background_blend_mode[key];
        //     $('.elem_background_filters').append(
        //         $('<div/>',{
        //             class:`background_filter_preview_container ${elem.background_image['background-blend-mode'] == filter.val ? 'background_filter_preview_selected' : ''}`,
        //             filter_val:filter.val,
        //         }).append(
        //             $('<div/>',{
        //                 class:`background_filter_preview`,
        //                 style:`background-image:url(${elem.background_image['background-image']});background-blend-mode:${filter.val};background-color:${elem.background_image['background-color']}`
        //             }),
        //             $('<div/>',{class:'background_filter_preview_name',text:texts.select_elems[`_${filter.name}`]})
        //         )
    
        //     )
        // }
        $(`.editor_popup_body_shortcut.editor_background`).addClass('editor_popup_body_shortcut_selected')
    });

}
$('body').on('click','.editor_popup_show_container[key="elem_background_filter"]',function(){
    let img_src = $('#editor').find('.editor_popup_img_select_img').attr('src');
    $('.background_filter_preview').css('background-image',`url(${img_src})`)
})
$('body').on('input','.background_filter_preview_color',function(e){
    $('.background_filter_preview').css('background-color',$(this).val())
})
$('body').on('click','.background_filter_preview_container',function(e){
    get_key_tree(window.selected).elem.background_image['background-blend-mode'] = $(this).attr('filter_val')
    new_action();
    $('.background_filter_preview_container').removeClass('background_filter_preview_selected');
    $(this).addClass('background_filter_preview_selected')
})
$('body').on('click','.editor_background',function(e){
        draw_editor_popup_background();

})