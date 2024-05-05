draw_website_header_html = function(){
    $('.website_header').remove();
    $('#page').before(create_html(window.template.website_header.elems,'website_header.elems'))
    let sorted_header_navList = $('.header_navList').children().sort((a,b)=>{
        return parseInt($(a).attr('sort')) - parseInt($(b).attr('sort'))
    })
    $('.header_navList').append(sorted_header_navList)

    let sorted_header_iconList = $('.header_iconsList').children().sort((a,b)=>{
        return parseInt($(a).attr('sort')) - parseInt($(b).attr('sort'))
    })
    $('.header_iconsList').append(sorted_header_iconList)

    draw_edit_header_navList();
    draw_edit_header_iconList();
    setTimeout(()=>{
        fix_header_nav_list();
    },200)
}
draw_website_header = function(){
    $('#website_header').find('.editor_popup_title').text(texts.website_tools.header)
    $('#website_header').addClass('').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'w100p editor_popup_container',key:'header_editor',}).append(
            $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_tools.header_des}),
            $('<div/>',{class:'row alnC jstfyE w100p mY20'}).append(
                $('<button/>',{class:'btn btn-cancel editor_popup_show_container',text:texts.change_layout,key:'change_header_layout'}),
            ),
            draw_color_theme_Picker({
                keys_arr:[{key:'color_theme',key_tree:'website_header.elems'}],
                name:texts.styling.color_theme
            }),
            draw_select_box({
                keys_arr:[{key:'position',key_tree:'website_header.elems.css'}],
                name:texts.styling.position,
                selections:[{text:texts.styling.local,key:'relative'},{text:texts.styling.fixed,key:'sticky'}],
                selection_class:'pX10'
            }),
            draw_select_box({
                keys_arr:[{key:'max-width',key_tree:'website_header.elems.children.header_wrapper.css'}],
                name:texts.styling.max_width,
                selections:[{text:texts.styling.max_content,key:'var(--page_max_width)'},{text:texts.styling.full_page,key:'100%'}],
                selection_class:'pX10'
            }),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.css',step:1,unit:'px',is_responsive:true}),
            draw_editor_show_container({key:'header_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
            //////
            $('<div/>',{class:'fs1 bold mT30',text:texts.styling.header_components}),
            draw_editor_show_container({key:'logo_restaurant_name',name:texts.styling.logo_restaurant_name,row_class:true}),
            draw_editor_show_container({key:'navigation_list',name:texts.styling.navigation_list,row_class:true,container_class:''}),
            draw_editor_show_container({key:'navigation_icons',name:texts.styling.navigation_icons,row_class:true,container_class:''}),
            draw_editor_show_container({key:'drop_down_list',name:texts.styling.drop_down_list,row_class:true,container_class:''}),
            draw_editor_show_container({key:'mobile_navbar_icon',name:texts.styling.mobile_navbar_icon,row_class:true,container_class:''}),
        ),

        $('<div/>',{class:'editor_popup_container none',key:'change_header_layout',parent_key:'header_editor'}),

        $('<div/>',{class:'editor_popup_container none',key:'header_box_shadow',parent_key:'header_editor'}).append(
            draw_drop_shadow_select({
                keys_arr:['website_header.elems.css'],
            }),
        ),

        $('<div/>',{class:'editor_popup_container none',key:'logo_restaurant_name',parent_key:'header_editor'}).append(
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.logo_restaurant_name}),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_logo.css',step:1,unit:'px',is_responsive:true}),
            draw_number_picker({
                keys_arr:[{key:'gap',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.css'}],
                name:texts.styling.gap,
                step:1,
                unit:'px',
                is_responsive:true
            }),
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.restauran_logo}),
            draw_select_box({
                keys_arr:[{key:'display',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_logo.css'}],
                name:texts.styling.display,
                selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
                selection_class:'pX10'
            }),
            draw_number_picker({
                keys_arr:[{key:'height',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_logo.css'}],
                name:texts.styling.size,
                step:1,
                unit:'px',
                is_responsive:true
            }),
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.restaurant_name}),
            draw_select_box({
                keys_arr:[{key:'display',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name.css'}],
                name:texts.styling.display,
                selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
                selection_class:'pX10'
            }),
            draw_input_list({
                keys_arr:[{key:'font_style',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name'}],
                name:texts.styling.font_style,
                selections:[
                    {name:'font_1',val:'font_1',class:'font_1'},
                    {name:'font_2',val:'font_2',class:'font_2'},
                    {name:'font_3',val:'font_3',class:'font_3'},
                ]
            }),
            draw_select_box({
                keys_arr:[{key:'font-weight',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name.css'}],
                name:texts.styling.font_weight,
                selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                selection_class:'pX10'
            }),
            draw_number_picker({
                keys_arr:[{key:'font-size',key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name.css'}],
                name:texts.styling.font_size,
                step:.1,
                unit:'em',
                is_responsive:true
            }),

        ),

        $('<div/>',{class:'editor_popup_container none',key:'navigation_list',parent_key:'header_editor'}).append(
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.navigation_list}),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_navList.css',step:1,unit:'px',is_responsive:false}),
            draw_number_picker({
                keys_arr:[{key:'gap',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.css'}],
                name:texts.styling.gap,
                step:1,
                unit:'px',
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
                unit:'em',
            }),
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.list_items}),
            $('<div/>',{class:'w100p edit_header_navList_container relative'})
        ),

        $('<div/>',{class:'editor_popup_container none',key:'navigation_icons',parent_key:'header_editor'}).append(
            $('<div/>',{class:'fs1 bold mT20',text:texts.styling.navigation_icons}),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.css',step:1,unit:'px',is_responsive:false}),
            draw_number_picker({
                keys_arr:[{key:'gap',key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.css'}],
                name:texts.styling.gap,
                step:1,
                unit:'px',
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
                unit:'px',
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
                unit:'em',
            }),
            draw_transform_selector({keys_arr:[{key_tree:'website_header.elems.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num.css',key:'transform'}]}),
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
                unit:'px',
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
                unit:'px',
            }),
        ),

        $('<div/>',{class:'editor_popup_container mnh100p none preview_header_drop_down_list',key:'drop_down_list',parent_key:'header_editor',header_list:'foodmenu'}).append(
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.drop_down_list}),
            draw_color_picker({
                keys_arr:[{key:'background-color',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css'}],
                name:texts.styling.bg_color,
            }),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css',step:1,unit:'px',is_responsive:false}),
            draw_select_border_radius({keys_arr:[`website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css`],step:1,unit:'px',is_responsive:false}),
            draw_editor_show_container({key:'drop_down_list_shadow',name:texts.styling.drop_shadow,row_class:true}),
            draw_input_list({
                keys_arr:[{key:'animation',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list'}],
                name:texts.styling.animation,
                selections:window.inputList_arr.transtions,
                after:$('<div/>',{class:'header_drop_down_list_animation_preview mis-5 fs101 pointer ico-play',})
            }),
            draw_number_picker({
                keys_arr:[{key:'animation-duration',key_tree:'website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.css'}],
                name:texts.styling.animation_duration,
                step:100,
                unit:'ms',
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
            draw_select_padding({key_tree:'website_header.header_drop_down_list_item.css',step:1,unit:'px',is_responsive:false}),
            draw_select_border_radius({keys_arr:[`website_header.header_drop_down_list_item.css`],step:1,unit:'px',is_responsive:false}),
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
                unit:'em',
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
            $('<div/>',{class:'fs1 bold mB20',text:texts.styling.mobile_navbar_icon}),
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
                unit:'px',
            }),
            draw_select_padding({key_tree:'website_header.elems.children.header_wrapper.children.header_mobileNav_icon.css',step:1,unit:'px',is_responsive:false}),
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
draw_edit_header_navList = function(){
    let sorted_header_navList = Object.entries(window.template.website_header.elems.children.header_wrapper.children.header_navList.children).sort(function(a, b) {
        return parseInt(a[1].attr.sort) - parseInt(b[1].attr.sort);
    });
    $('.edit_header_navList_container').text('');
    for(const key in sorted_header_navList){
        let item_key = sorted_header_navList[key][0];
        let item = sorted_header_navList[key][1];
        let sort = item.attr.sort;
        if(item_key != 'header_drop_down_list' && item_key != 'header_list_see_more'){
            $('.edit_header_navList_container').append(
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'ico-drag mie-10 c_white-11 fs101 cursorMove header_nav_list_sorter',item_sort:sort,key_tree:`website_header.elems.children.header_wrapper.children.header_navList.children.${item_key}.attr`}),
                        $('<div/>',{text:texts.styling[item_key]}),
                    ),
                    draw_select_box({
                        keys_arr:[{key:'display',key_tree:`website_header.elems.children.header_wrapper.children.header_navList.children.${item_key}.css`}],
                        name:null,
                        selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
                        selection_class:'pX10'
                    }),
                )
            )
        }

    }
}
draw_edit_header_iconList = function(){
    let sorted_header_iconList = Object.entries(window.template.website_header.elems.children.header_wrapper.children.header_iconsList.children).sort(function(a,b){
        return parseInt(a[1].attr.sort) - parseInt(b[1].attr.sort);
    });
    $('.edit_header_iconList_container').text('');
    for(const key in sorted_header_iconList){
        let icon_key = sorted_header_iconList[key][0];
        let icon = sorted_header_iconList[key][1];
        let sort = icon.attr.sort;
        $('.edit_header_iconList_container').append(
            $('<div/>',{class:'editor_popup_row pointer editor_popup_show_container',key:icon_key}).append(
                $('<div/>',{class:'row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-drag mie-10 c_white-11 fs101 cursorMove header_icon_list_sorter',icon_sort:sort,key_tree:`website_header.elems.children.header_wrapper.children.header_iconsList.children.${icon_key}.attr`}),
                    $('<div/>',{text:texts.styling[icon_key]}),
                ),
                $('<div/>',{class:'ico-arrowRight'})
            ),
        )
    }
}
fix_header_nav_list = function(){
    let header_width = $('.website_header').width();
    let header_children_width = $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth();
    let header_navList_children = $($('.header_navList').children().get().reverse());
    if(header_width < header_children_width){
        $('.header_list_see_more').removeClass('none')
        header_navList_children.each(function(){
            if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu') && $(this).css('display') != 'none'){
                $(this).addClass('none');
                if(header_width >= $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth()){
                    return false;
                }
            }
        })
    }else{
        $('.header_list_see_more').addClass('none')
        $('.header_navList').children().each(function(){
            if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')){
                $(this).removeClass('none');
            }
        })
        if(header_width < $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth()){
            fix_header_nav_list();
        }
    }
}


//events
$('body').on('click','.website_header',function(e){
    //e.stopImmediatePropagation();
    show_editor_popup('website_header')
})
$('body').on('click','.header_preview_container',function(e){
    //e.stopImmediatePropagation();
    let layout = window.header_layouts[$(this).attr('key')];
    for(const key in layout.container){
        window.template.website_header.elems.children.header_wrapper.css[key] = layout.container[key];
    }
    for(const key in layout.elem1){
        window.template.website_header.elems.children.header_wrapper.children.header_logo.css[key] = layout.elem1[key];
    }
    for(const key in layout.elem2){
        window.template.website_header.elems.children.header_wrapper.children.header_navList.css[key] = layout.elem2[key];
    }
    for(const key in layout.elem3){
        window.template.website_header.elems.children.header_wrapper.children.header_iconsList.css[key] = layout.elem3[key];
    }
    new_action();
})
//
$('body').on('mousedown','.header_nav_list_sorter',function(e){
    //e.stopImmediatePropagation();
    if($('.header_nav_list_sorter_div').length == 0){
        $('.edit_header_navList_container').append(
            $('<div/>',{class:'editor_popup_row header_nav_list_sorter_div',item_sort:$(this).attr('item_sort'),style:'position:absolute;top:0;left:0;width:100%'}).append(
                $(this).closest('.editor_popup_row').html()
            )
        )
        $('.header_nav_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_navList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mousemove','.edit_header_navList_container',function(e){
    //e.stopImmediatePropagation();
    if($('.header_nav_list_sorter_div').length > 0){
        $('.header_nav_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_navList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mouseleave','.edit_header_navList_container',function(e){
    //e.stopImmediatePropagation();
    if($('.header_nav_list_sorter_div').length > 0){
        $('.header_nav_list_sorter_div').remove();
    }
})
$('body').on('mouseup','.header_nav_list_sorter_div',function(e){
    //e.stopImmediatePropagation();
        let from_key_tree = $('.header_nav_list_sorter_div').find('.header_nav_list_sorter').attr('key_tree');
        let from_sort = $('.header_nav_list_sorter_div').find('.header_nav_list_sorter').attr('item_sort');
        let to_key_tree;
        let to_sort;
        $('.edit_header_navList_container').children().each(function(e){
            if($(this).offset().top < $('.header_nav_list_sorter_div').offset().top && (parseFloat($(this).offset().top) + parseFloat($(this).outerHeight())) > $('.header_nav_list_sorter_div').offset().top){
                to_key_tree = $(this).find('.header_nav_list_sorter').attr('key_tree');
                to_sort = $(this).find('.header_nav_list_sorter').attr('item_sort');
            }
        })
        get_key_tree(from_key_tree).elem.sort = to_sort;
        get_key_tree(to_key_tree).elem.sort = from_sort;
        new_action();
})
//
$('body').on('mousedown','.header_icon_list_sorter',function(e){
    //e.stopImmediatePropagation();
    if($('.header_icon_list_sorter_div').length == 0){
        $('.edit_header_iconList_container').append(
            $('<div/>',{class:'editor_popup_row header_icon_list_sorter_div',icon_sort:$(this).attr('icon_sort'),style:'position:absolute;top:0;left:0;width:100%'}).append(
                $(this).closest('.editor_popup_row').html()
            )
        )
        $('.header_icon_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_iconList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mousemove','.edit_header_iconList_container',function(e){
    //e.stopImmediatePropagation();
    if($('.header_icon_list_sorter_div').length > 0){
        $('.header_icon_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_iconList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mouseleave','.edit_header_iconList_container',function(e){
    //e.stopImmediatePropagation();
    if($('.header_icon_list_sorter_div').length > 0){
        $('.header_icon_list_sorter_div').remove();
    }
})
$('body').on('mouseup','.header_icon_list_sorter_div',function(e){
    //e.stopImmediatePropagation();
        let from_key_tree = $('.header_icon_list_sorter_div').find('.header_icon_list_sorter').attr('key_tree');
        let from_sort = $('.header_icon_list_sorter_div').find('.header_icon_list_sorter').attr('icon_sort');
        let to_key_tree;
        let to_sort;
        $('.edit_header_iconList_container').children().each(function(e){
            if($(this).offset().top < $('.header_icon_list_sorter_div').offset().top && (parseFloat($(this).offset().top) + parseFloat($(this).outerHeight())) > $('.header_icon_list_sorter_div').offset().top){
                to_key_tree = $(this).find('.header_icon_list_sorter').attr('key_tree');
                to_sort = $(this).find('.header_icon_list_sorter').attr('icon_sort');
            }
        })
        get_key_tree(from_key_tree).elem.sort = to_sort;
        get_key_tree(to_key_tree).elem.sort = from_sort;
        new_action();
})
//

show_header_drop_down = function(list){
    $('.header_drop_down_list').text('')
    let item_style = `font-family:var(--${window.template.website_header.header_drop_down_list_item.font_style}_name);line-height:var(--${window.template.website_header.header_drop_down_list_item.font_style}_line_height);letter-spacing:var(--${window.template.website_header.header_drop_down_list_item.font_style}_letter_spacing);`;
    let item_style_hover = `font-family:var(--${window.template.website_header.header_drop_down_list_item.font_style}_name);line-height:var(--${window.template.website_header.header_drop_down_list_item.font_style}_line_height);letter-spacing:var(--${window.template.website_header.header_drop_down_list_item.font_style}_letter_spacing);`;
    for(const key2 in window.template.website_header.header_drop_down_list_item.css){
        item_style = `${item_style}${key2}:${key2,window.template.website_header.header_drop_down_list_item.css[key2]};`
        item_style_hover = `${item_style_hover}${key2}:${key2,window.template.website_header.header_drop_down_list_item.css[key2]};`
    }
    for(const key2 in window.template.website_header.header_drop_down_list_item.css_hover){
        item_style_hover = `${item_style_hover}${key2}:${key2,window.template.website_header.header_drop_down_list_item.css_hover[key2]};`
    }
    switch(list){
        case 'foodmenu':
            for(const key in window.website_data.categories){
                let category = window.website_data.categories[key];
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item',
                        style:item_style,href:`/${category.name}`,
                        style_desktop:item_style,
                        href:`/${category.name}`,
                        style_hover:item_style_hover,
                        text:category.names[window.preview_language],
                        onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
                        onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
                    })
                )
            }

        break;
        case 'user':
            $('.header_drop_down_list').append(
                $('<a/>',{
                    class:'header_drop_down_list_item',
                    style:item_style,
                    style_desktop:item_style,
                    style_hover:item_style_hover,
                    text:window.website_texts.text.authentication.login,
                    onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
                    onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
                }),
                $('<a/>',{
                    class:'header_drop_down_list_item',
                    style:item_style,
                    style_desktop:item_style,
                    style_hover:item_style_hover,
                    text:window.website_texts.text.authentication.signup,
                    onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
                    onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
                })
            )
        break;
        case 'language':
            for(const key in window.website_data.languages){
                let language = window.website_data.languages[key];
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item',
                        style:item_style,
                        style_desktop:item_style,
                        style_hover:item_style_hover,
                        text:language.name,
                        onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
                        onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
                    }),
                )
            }
        break;
        case 'see_more':
            $('.header_navList').children().each(function(){
                if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')){
                    if($(this).hasClass('none')){
                        $('.header_drop_down_list').append(
                            $('<a/>',{
                                class:'header_drop_down_list_item open_page',
                                page:$(this).children().first().attr('page'),
                                style:item_style,
                                style_desktop:item_style,
                                style_hover:item_style_hover,
                                text:$(this).children().first().text(),
                                onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
                                onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
                            }),
                        )
                    }
                }
            })

        break;
    }
    $('.header_drop_down_list').removeClass('none').css({
        'top':$(`.show_header_drop_down_list[header_list="${list}"]`).position().top + $(`.show_header_drop_down_list[header_list="${list}"]`).outerHeight(),
        'left':$(`.show_header_drop_down_list[header_list="${list}"]`).offset().left,
    })
    if($('.header_drop_down_list').offset().left + $('.header_drop_down_list').outerWidth() > $(window).width()){
        $('.header_drop_down_list').css({
            'left':$(window).width() - $('.header_drop_down_list').outerWidth(),
        })
    }
    if(window.show_header_drop_down_list == false){
        $('.header_drop_down_list').addClass(window.template.website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.animation)
    }
    window.show_header_drop_down_list = true;
}
$('body').on('mouseleave','.website_header',function(e){
    // //e.stopImmediatePropagation();
    $('.header_drop_down_list').addClass('none');
    window.show_header_drop_down_list = false;
})
$('body').on('mouseover','.show_header_drop_down_list, .preview_header_drop_down_list',function(e){
    // //e.stopImmediatePropagation();
    show_header_drop_down($(this).attr('header_list'));
})
$('body').on('click','.editor_popup_head_btn[key="header_editor"]',function(e){
    $('.header_drop_down_list').addClass('none');
    window.show_header_drop_down_list = false;
})
///
$('body').on('click','.header_drop_down_list_animation_preview',function(e){
    //e.stopImmediatePropagation();
    $('.header_drop_down_list').addClass('none');
    window.show_header_drop_down_list = false;
    setTimeout(()=>{
        show_header_drop_down('foodmenu');
    },200)
})
//

