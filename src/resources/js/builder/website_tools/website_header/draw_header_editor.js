set_editor_popup_editor_position_header = function(){
    $('#editor').addClass('h600 w350').css({
        top:($(`.website_header`).offset().top) + ($(`.website_header`).height()) + 20,
        left:($(`.header_wrapper`).width()) + ($('.header_wrapper').offset().left) - $('#editor').width(),
        right:'unset',
        bottom:'unset',
    })
}
// draw_website_header_editor = function(){
//     $('#website_header').find('.editor_popup_title').text(texts.website_tools.header)
//     $('#website_header').find('.editor_popup_body_shortcuts').append(
//         $('<div/>',{class:`editor_popup_body_shortcut ico-header_layout editor_popup_show_shortcut editor_popup_body_shortcut_selected`,tooltip:texts.styling.header_layout,key:'website_header_layout'}),
//         $('<div/>',{class:`editor_popup_body_shortcut ico-sizing editor_popup_show_shortcut`,tooltip:texts.sizing,key:'website_header_sizing'}),
//         // $('<div/>',{class:`editor_popup_body_shortcut ico-padding editor_popup_show_shortcut`,tooltip:texts.styling.padding,key:'website_header_padding'}),
//         // $('<div/>',{class:`editor_popup_body_shortcut ico-box_shadow editor_popup_show_shortcut`,tooltip:texts.styling.box_shadow,key:'website_header_box_shadow'}),
//         $('<div/>',{class:`editor_popup_body_shortcut ico-logo_restaurant_name editor_popup_show_shortcut`,tooltip:texts.styling.logo_restaurant_name,key:'website_header_logo'}),
//         $('<div/>',{class:`editor_popup_body_shortcut ico-navigation_list editor_popup_show_shortcut`,tooltip:texts.styling.navigation_list,key:'website_header_navigation_list'}),
//         $('<div/>',{class:`editor_popup_body_shortcut ico-icon editor_popup_show_shortcut`,tooltip:texts.styling.header_navList,key:'website_header_navigation_icons'}),
//         $('<div/>',{class:`editor_popup_body_shortcut ico-drop_down_list editor_popup_show_shortcut`,tooltip:texts.styling.drop_down_list,key:'website_header_drop_down_list'}),
//         $('<div/>',{class:`editor_popup_body_shortcut ico-mobile_navbar_icon editor_popup_show_shortcut`,tooltip:texts.styling.header_mobileNav_icon,key:'website_header_mobile_navbar_icon'}),
        
//     );
//     $('#website_header').addClass('w350 h600').find('.editor_popup_body').text('').append(
//         draw_editors_container({
//             is_responsive:false,
//             editors:[
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content',key:'website_header_layout'}).append(

//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_sizing'}).append(
//                     $('<div/>',{class:'w100p editor_popup_container',key:'website_header',}).append(
//                         $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
//                             $('<div/>',{class:'fs09',text:texts.styling.position}),
//                             draw_select_box({
//                                 key_tree:'website_header.elems.css',
//                                 variable_key:null,
//                                 key:'position',
//                                 selections:[{text:texts.styling.local,key:'relative'},{text:texts.styling.fixed,key:'sticky'}],
//                             }),
//                         ),
//                         $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
//                             $('<div/>',{class:'fs09',text:texts.styling.max_width}),
//                             draw_select_box({
//                                 key_tree:'website_header.elems.children.header_wrapper.css',
//                                 variable_key:null,
//                                 key:'max-width',
//                                 selections:[{text:texts.styling.max_content,key:'var(--page_max_width)'},{text:texts.styling.full_page,key:'100%'}],
//                             }),
//                         ),
//                     ),
//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_padding'}).append(
//                     draw_editors_container({
//                         is_responsive:true,
//                         editors:[
//                             draw_four_number_pickers({
//                                 key_tree:'website_header.elems.children.header_wrapper',
//                                 variable_key:'css',
//                                 key:'padding',
//                                 units:['px'],
//                                 step:1,
//                                 names:[texts.styling.padding,texts.styling.padding_top,texts.styling.padding_right,texts.styling.padding_bottom,texts.styling.padding_left]
//                             })
//                         ]
//                     }),
//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_box_shadow'}).append(
//                     draw_editors_container({
//                         is_responsive:true,
//                         editors:[
//                             draw_box_shadow_editor({
//                                 key_tree:'website_header.elems',
//                                 variable_key:'css',
//                                 key:'box-shadow',
//                             })
//                         ]
//                     }),
//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_logo'}).append(

//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_navigation_list'}).append(

//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_navigation_icons'}).append(

//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_drop_down_list'}).append(

//                 ),
//                 $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'website_header_mobile_navbar_icon'}).append(

//                 ),
//             ]
//         })
//     )
// }
__draw_website_header_editor11 = function(){
    
    return;
    $('#website_header').find('.editor_popup_title').text(texts.website_tools.header)
    $('#website_header').addClass('').find('.editor_popup_body').text('').append(
        // $('<div/>',{class:'w100p editor_popup_container',key:'header_editor',}).append(
        //     $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_tools.header_des}),
        //     $('<div/>',{class:'row alnC jstfyE w100p mY20'}).append(
        //         $('<button/>',{class:'btn btn-cancel editor_popup_show_container',text:texts.change_layout,key:'change_header_layout'}),
        //     ),


        //     //////
        //     $('<div/>',{class:'fs1 bold mT30',text:texts.styling.header_components}),
        //     draw_editor_show_container({key:'logo_restaurant_name',name:texts.styling.logo_restaurant_name,row_class:true}),
        //     draw_editor_show_container({key:'navigation_list',name:texts.styling.navigation_list,row_class:true,container_class:''}),
        //     draw_editor_show_container({key:'navigation_icons',name:texts.styling.header_navList,row_class:true,container_class:''}),
            // draw_editor_show_container({key:'drop_down_list',name:texts.styling.drop_down_list,row_class:true,container_class:''}),
        //     draw_editor_show_container({key:'mobile_navbar_icon',name:texts.styling.header_mobileNav_icon,row_class:true,container_class:''}),
        // ),

        // $('<div/>',{class:'editor_popup_container none',key:'change_header_layout',parent_key:'header_editor'}),

        // $('<div/>',{class:'editor_popup_container none',key:'header_box_shadow',parent_key:'header_editor'}).append(
        //     draw_drop_shadow_select({
        //         keys_arr:['website_header.elems.css'],
        //     }),
        // ),

        $('<div/>',{class:'editor_popup_container none',key:'logo_restaurant_name',parent_key:'header_editor'}).append(
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.logo_restaurant_name}),
            // draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_logo.css',step:1,units:['px'],is_responsive:true}),
            // draw_number_picker({
            //     keys_arr:[{key:'gap',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.css'}],
            //     name:texts.styling.gap,
            //     step:1,
            //     units:['px'],
            //     is_responsive:true
            // }),
            // $('<div/>',{class:'fs1 bold mT20',text:texts.styling.restauran_logo}),
            // draw_select_box({
            //     keys_arr:[{key:'display',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_logo.css'}],
            //     name:texts.styling.display,
            //     selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
            //     selection_class:'pX10'
            // }),
            // draw_number_picker({
            //     keys_arr:[{key:'height',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_logo.css'}],
            //     name:texts.styling.size,
            //     step:1,
            //     units:['px'],
            //     is_responsive:true
            // }),
            // $('<div/>',{class:'fs1 bold mT20',text:texts.styling.restaurant_name}),
            // draw_select_box({
            //     keys_arr:[{key:'display',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name.css'}],
            //     name:texts.styling.display,
            //     selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
            //     selection_class:'pX10'
            // }),
            // draw_input_list({
            //     keys_arr:[{key:'font_style',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name'}],
            //     name:texts.styling.font_style,
            //     selections:[
            //         {name:'font_1',val:'font_1',class:'font_1'},
            //         {name:'font_2',val:'font_2',class:'font_2'},
            //         {name:'font_3',val:'font_3',class:'font_3'},
            //     ]
            // }),
            // draw_select_box({
            //     keys_arr:[{key:'font-weight',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name.css'}],
            //     name:texts.styling.font_weight,
            //     selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
            //     selection_class:'pX10'
            // }),
            // draw_number_picker({
            //     keys_arr:[{key:'font-size',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name.css'}],
            //     name:texts.styling.font_size,
            //     step:.1,
            //     units:['em'],
            //     is_responsive:true
            // }),

        ),

        $('<div/>',{class:'editor_popup_container none',key:'navigation_list',parent_key:'header_editor'}).append(
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.navigation_list}),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_navList.css',step:1,units:['px'],is_responsive:false}),
            draw_number_picker({
                keys_arr:[{key:'gap',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.css'}],
                name:texts.styling.gap,
                step:1,
                units:['px'],
            }),
            draw_input_list({
                keys_arr:[{key:'font_style',key_tree:'website_header.elems.children.header_wrapper.children.header_navList'}],
                name:texts.styling.font_style,
                selections:[
                    {name:'font_1',val:'font_1',class:'font_1'},
                    {name:'font_2',val:'font_2',class:'font_2'},
                    {name:'font_3',val:'font_3',class:'font_3'},
                ]
            }),
            draw_select_box({
                keys_arr:[{key:'font-weight',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.css'}],
                name:texts.styling.font_weight,
                selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                selection_class:'pX10'
            }),
            draw_number_picker({
                keys_arr:[{key:'font-size',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.css'}],
                name:texts.styling.font_size,
                step:.1,
                units:['em'],
            }),
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.list_items}),
            $('<div/>',{class:'w100p edit_header_navList_container relative'})
        ),

        $('<div/>',{class:'editor_popup_container none',key:'navigation_icons',parent_key:'header_editor'}).append(
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.header_navList}),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.css',step:1,units:['px'],is_responsive:false}),
            draw_number_picker({
                keys_arr:[{key:'gap',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.css'}],
                name:texts.styling.gap,
                step:1,
                units:['px'],
            }),
            $('<div/>',{class:'edit_header_iconList_container relative'}),
        ),
        $('<div/>',{class:'editor_popup_container none',key:'header_cart',parent_key:'navigation_icons'}).append(
            draw_icon_selector({
                keys_arr:[{key:'header_icon_cart',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children'}],
                name:texts.styling.header_cart,
                icon_type:'cart'
            }),
            draw_number_picker({
                keys_arr:[
                    {key:'width',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart.css'},
                    {key2:'height',key_tree2:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart.css'},
                ],
                name:texts.styling.icons_size,
                step:1,
                units:['px'],
            }),
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.cart_items_number}),
            draw_input_list({
                keys_arr:[{key:'font_style',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num'}],
                name:texts.styling.font_style,
                selections:[
                    {name:'font_1',val:'font_1',class:'font_1'},
                    {name:'font_2',val:'font_2',class:'font_2'},
                    {name:'font_3',val:'font_3',class:'font_3'},
                ]
            }),
            draw_number_picker({
                keys_arr:[
                    {key:'font-size',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num.css'},
                    // {key2:'line-height',key_tree2:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num.css'},
                ],
                name:texts.styling.size,
                step:.1,
                units:['em'],
            }),
            // draw_transform_selector({keys_arr:[{key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num.css',key:'transform'}]}),
        ),
        $('<div/>',{class:'editor_popup_container none',key:'header_user',parent_key:'navigation_icons'}).append(
            draw_icon_selector({
                keys_arr:[{key:'header_icon_user',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_user.children'}],
                name:texts.styling.header_user,
                icon_type:'user',
            }),
            draw_number_picker({
                keys_arr:[
                    {key:'width',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_user.children.header_icon_user.css'},
                    {key2:'height',key_tree2:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_user.children.header_icon_user.css'},
                ],
                name:texts.styling.icons_size,
                step:1,
                units:['px'],
            }),

        ),
        $('<div/>',{class:'editor_popup_container none',key:'header_language',parent_key:'navigation_icons'}).append(
            draw_icon_selector({
                keys_arr:[{key:'header_icon_language',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_language.children'}],
                name:texts.styling.header_language,
                icon_type:'language',
            }),
            draw_number_picker({
                keys_arr:[
                    {key:'width',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_language.children.header_icon_language.css'},
                    {key2:'height',key_tree2:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_language.children.header_icon_language.css'},
                ],
                name:texts.styling.icons_size,
                step:1,
                units:['px'],
            }),
        ),

        $('<div/>',{class:'editor_popup_container mnh100p none preview_header_drop_down_list',key:'drop_down_list',parent_key:'header_editor',header_list:'foodmenu'}).append(
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.drop_down_list}),
            draw_color_picker({
                keys_arr:[{key:'background-color',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css'}],
                name:texts.styling.bg_color,
            }),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css',step:1,units:['px'],is_responsive:false}),
            draw_select_border_radius({keys_arr:[`website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css`],step:1,units:['px'],is_responsive:false}),
            draw_editor_show_container({key:'drop_down_list_shadow',name:texts.styling.drop_shadow,row_class:true}),
            draw_input_list({
                keys_arr:[{key:'animation',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list'}],
                name:texts.styling.animation,
                selections:get_inputList_obj('transtions'),
                after:$('<div/>',{class:'header_drop_down_list_animation_preview mis-5 fs101 pointer ico-play',})
            }),
            draw_number_picker({
                keys_arr:[{key:'animation-duration',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css'}],
                name:texts.styling.animation_duration,
                step:100,
                units:['ms'],
            }),
            //
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.drop_down_list_item}),
            draw_color_picker({
              keys_arr:[{key:'background-color',key_tree:'website_header.header_drop_down_list_item.css'}],
              name:texts.styling.bg_color
            }),
            draw_color_picker({
                keys_arr:[{key:'color',key_tree:'website_header.header_drop_down_list_item.css'}],
                name:texts.styling.font_color
            }),
            draw_select_padding({key_tree:'website_header.header_drop_down_list_item.css',step:1,units:['px'],is_responsive:false}),
            draw_select_border_radius({keys_arr:[`website_header.header_drop_down_list_item.css`],step:1,units:['px'],is_responsive:false}),
            draw_input_list({
                keys_arr:[{key:'font_style',key_tree:'website_header.header_drop_down_list_item'}],
                name:texts.styling.font_style,
                selections:[
                    {name:'font_1',val:'font_1',class:'font_1'},
                    {name:'font_2',val:'font_2',class:'font_2'},
                    {name:'font_3',val:'font_3',class:'font_3'},
                ]
            }),
            draw_select_box({
                keys_arr:[{key:'font-weight',key_tree:'website_header.header_drop_down_list_item.css'}],
                name:texts.styling.font_weight,
                selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                selection_class:'pX10'
            }),
            draw_number_picker({
                keys_arr:[{key:'font-size',key_tree:'website_header.header_drop_down_list_item.css'}],
                name:texts.styling.font_size,
                step:.1,
                units:['em'],
            }),
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.drop_down_list_item_hover}),
            draw_color_picker({
                keys_arr:[{key:'background-color',key_tree:'website_header.header_drop_down_list_item.css_hover'}],
                name:texts.styling.bg_color,
            }),
            draw_color_picker({
                keys_arr:[{key:'color',key_tree:'website_header.header_drop_down_list_item.css_hover'}],
                name:texts.styling.font_color,
                is_important:true
            }),
        ),
        $('<div/>',{class:'editor_popup_container mnh100p none preview_header_drop_down_list',key:'drop_down_list_shadow',parent_key:'drop_down_list',header_list:'foodmenu'}).append(
            draw_drop_shadow_select({
                keys_arr:['website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css'],
            }),
        ),
        $('<div/>',{class:'editor_popup_container none',key:'mobile_navbar_icon',parent_key:'header_editor'}).append(
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.header_mobileNav_icon}),
            draw_icon_selector({
                keys_arr:[{key:'header_mobileNav_icon',key_tree:'website_header.elems.children.header_wrapper.children.header_mobileNav_icon.children'}],
                name:texts.styling.icon,
                icon_type:'menu',
            }),
            draw_number_picker({
                keys_arr:[
                    {key:'width',key_tree:'website_header.elems.children.header_wrapper.children.header_mobileNav_icon.children.header_mobileNav_icon.css'},
                    {key2:'height',key_tree2:'website_header.elems.children.header_wrapper.children.header_mobileNav_icon.children.header_mobileNav_icon.css'},
                ],
                name:texts.styling.icons_size,
                step:1,
                units:['px'],
            }),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_mobileNav_icon.css',step:1,units:['px'],is_responsive:false}),
        ),
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
    draw_edit_header_navList();
    draw_edit_header_iconList();
}