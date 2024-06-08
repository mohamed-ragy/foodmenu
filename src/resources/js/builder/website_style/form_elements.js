draw_form_elements = function(){
    return;
    $('#form_elements').find('.editor_popup_title').text(texts.website_style.form_elements)
    $('#form_elements').addClass('w500 h850').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'w100p mB40'}).append(

            $('<div/>',{class:'editor_popup_container',key:'form_elements'}).append(
                // $('<div/>',{class:'inter fs1 bold',text:texts.website_style.form_elements}),
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.form_elements_des}),
                draw_select_box({
                    keys_arr:[{key:'align-items',key_tree:'form_elements.elems.form.css'}],
                    name:texts.styling.form_align,
                    selections:[
                        {text:'',class:'ico-align_start',key:'flex-start'},
                        {text:'',class:'ico-align_center',key:'center'},
                        {text:'',class:'ico-align_end',key:'flex-end'},
                    ],
                }),
                draw_select_range({
                    keys_arr:[{key:'spacing',key_tree:'form_elements'}],
                    name:texts.styling.form_spacing,
                    range:{min:0,max:20,step:1},
                    unit:'px'
                }),
                draw_editor_show_container({key:'input_box',name:texts.website_style.input_box,row_class:true}),
                draw_editor_show_container({key:'checkbox',name:texts.website_style.checkbox,row_class:true}),
                draw_editor_show_container({key:'button1',name:texts.website_style.button1,row_class:true}),
                draw_editor_show_container({key:'button2',name:texts.website_style.button2,row_class:true}),
                draw_editor_show_container({key:'button3',name:texts.website_style.button3,row_class:true}),
            ),
            //
            $('<div/>',{class:'editor_popup_container none',key:'input_box',parent_key:'form_elements'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.input_box}),
                $('<div/>',{class:'fs085 c_white-11',text:texts.website_style.input_box_des}),
                $('<div/>',{class:'w100p-20 form  pY20 pX10 sticky t-10 brdrB1 zx10'}).append(
                    $('<label/>',{class:'input_label',text:texts.website_style.dummyLabel}),
                    $('<input/>',{class:'input',value:texts.website_style.dummyInputBox}),
                ),
                draw_select_box({
                    keys_arr:[{key:'text-align',key_tree:'form_elements.elems.input.css'}],
                    name:texts.styling.text_align,
                    selections:[
                        {text:'',class:'ico-align_start',key:'start'},
                        {text:'',class:'ico-align_center',key:'center'},
                        {text:'',class:'ico-align_end',key:'end'},
                    ],
                }),
                draw_select_range({
                    keys_arr:[{key:'padding-block',key_tree:'form_elements.elems.input.css'}],
                    name:texts.styling.padding_y,
                    range:{min:0,max:20,step:1},
                    unit:'px'
                }),
                draw_select_range({
                    keys_arr:[{key:'padding-inline',key_tree:'form_elements.elems.input.css'}],
                    name:texts.styling.padding_x,
                    range:{min:0,max:20,step:1},
                    unit:'px'
                }),
                draw_input_list({
                    keys_arr:[{key:'font_style',key_tree:'form_elements.elems.input'}],
                    name:texts.styling.font_style,
                    selections:[
                        {name:'font_1',val:'font_1',class:'font_1'},
                        {name:'font_2',val:'font_2',class:'font_2'},
                        {name:'font_3',val:'font_3',class:'font_3'},
                    ]
                }),
                draw_select_range({
                    keys_arr:[{key:'font-size',key_tree:'form_elements.elems.input.css'}],
                    name:texts.styling.font_size,
                    range:{min:.5,max:3,step:.1},
                    unit:'em'
                }),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.input.css`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.input.css`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'input_box_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'input_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                draw_editor_show_container({key:'input_box_label',name:texts.styling.label,row_class:true}),
                draw_select_range({
                    keys_arr:[{key:'transition-duration',key_tree:'form_elements.elems.input.css'}],
                    name:texts.website_style.transitionDuration,
                    range:{min:0,max:2000,step:1},
                    unit:'ms'
                }),
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.on_focus}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.input.css_focus`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.input.css_focus`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_select_range({
                    keys_arr:[{key:'outline-width',key_tree:'form_elements.elems.input.css_focus'}],
                    name:texts.website_style.outline_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.input.css_focus`,key:`outline-color`}],name:texts.styling.outline_color}),
                draw_editor_show_container({key:'input_focus_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'input_box_border',parent_key:'input_box'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border.replace(':name:',texts.website_style.input_box)}),
                $('<div/>',{class:'w100p-20 form  pY20 pX10 sticky t-10 brdrB1 zx10'}).append(
                    $('<label/>',{class:'input_label',text:texts.website_style.dummyLabel}),
                    $('<input/>',{class:'input',value:texts.website_style.dummyInputBox}),
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.input.css`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.input.css']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.input.css'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.input.css`],step:1,units:['px'],is_responsive:false}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'input_box_shadow',parent_key:'input_box'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow.replace(':name:',texts.website_style.input_box)}),
                $('<div/>',{class:'w100p-20 form  pY20 pX10 sticky t-10 brdrB1 zx10'}).append(
                    $('<label/>',{class:'input_label',text:texts.website_style.dummyLabel}),
                    $('<input/>',{class:'input',value:texts.website_style.dummyInputBox}),
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.input.css'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'input_box_label',parent_key:'input_box'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_label.replace(':name:',texts.website_style.input_box)}),
                $('<div/>',{class:'w100p-20 form  pY20 pX10 sticky t-10 brdrB1 zx10'}).append(
                    $('<label/>',{class:'input_label',text:texts.website_style.dummyLabel}),
                    $('<input/>',{class:'input',value:texts.website_style.dummyInputBox}),
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.input_label.css`,key:`color`}],name:texts.styling.font_color}),
                draw_input_list({
                    keys_arr:[{key:'font_style',key_tree:'form_elements.elems.input_label'}],
                    name:texts.styling.font_style,
                    selections:[
                        {name:'font_1',val:'font_1',class:'font_1'},
                        {name:'font_2',val:'font_2',class:'font_2'},
                        {name:'font_3',val:'font_3',class:'font_3'},
                    ]
                }),
                draw_select_range({
                    keys_arr:[{key:'font-size',key_tree:'form_elements.elems.input_label.css'}],
                    name:texts.styling.label_font_size,
                    range:{min:.5,max:3,step:.1},
                    unit:'em'
                }),
                draw_select_range({
                    keys_arr:[{key:'margin-inline',key_tree:'form_elements.elems.input_label.css'}],
                    name:texts.styling.label_margin,
                    range:{min:0,max:30,step:1},
                    unit:'px'
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'input_focus_box_shadow',parent_key:'input_box'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_focus.replace(':name:',texts.website_style.input_box)}),
                $('<div/>',{class:'w100p-20 form  pY20 pX10 sticky t-10 brdrB1 zx10'}).append(
                    $('<label/>',{class:'input_label',text:texts.website_style.dummyLabel}),
                    $('<input/>',{class:'input',value:texts.website_style.dummyInputBox}),
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.input.css_focus'],
                }),
            ),
            //
            $('<div/>',{class:'editor_popup_container none',key:'checkbox',parent_key:'form_elements'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.checkbox}),
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.checkbox_des}),
                $('<div/>',{class:'w100p-20 form  pY20 pX10 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'checkbox_container'})
                ),
                draw_select_range({
                    keys_arr:[{key:'border-radius',key_tree:'form_elements.elems.checkbox.css'}],
                    name:texts.styling.border_radius,
                    range:{min:1,max:20,step:1},
                    unit:'px'
                }),
                draw_select_range({
                    keys_arr:[{key:'width',key_tree:'form_elements.elems.checkbox.css'},{key2:'height',key_tree2:'form_elements.elems.checkbox.css'}],
                    name:texts.website_style.size,
                    range:{min:.8,max:1.5,step:.1},
                    unit:'em'
                }),
                draw_select_range({
                    keys_arr:[{key:'padding',key_tree:'form_elements.elems.checkbox.css'}],
                    name:texts.styling.padding,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.checkbox.css`,key:`border-color`}],name:texts.styling.color}),
                draw_icon_selector({
                    keys_arr:[{key:'checkbox',key_tree:'form_elements.elems'}],
                    name:texts.styling.check_mark_icon,
                    icon_type:'check'
                }),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.checkbox_checked.css`,key:`fill`},{key_tree2:`form_elements.elems.checkbox_checked.css`,key2:`stroke`}],name:texts.styling.check_mark_color}),
            ),
            //
            $('<div/>',{class:'editor_popup_container none',key:'button1',parent_key:'form_elements'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.button1}),
                $('<div/>',{class:'fs085 c_white-11',text:texts.website_style.button1_des}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                        $('<button/>',{class:'button1 m5',disabled:true,text:texts.website_style.button1_disabled}),
                    )
                ),
                draw_select_range({
                    keys_arr:[{key:'padding-block',key_tree:'form_elements.elems.button1.css'}],
                    name:texts.styling.padding_y,
                    range:{min:0,max:25,step:1},
                    unit:'px'
                }),
                draw_select_range({
                    keys_arr:[{key:'padding-inline',key_tree:'form_elements.elems.button1.css'}],
                    name:texts.styling.padding_x,
                    range:{min:0,max:50,step:1},
                    unit:'px'
                }),
                draw_input_list({
                    keys_arr:[{key:'font_style',key_tree:'form_elements.elems.button1'}],
                    name:texts.styling.font_style,
                    selections:[
                        {name:'font_1',val:'font_1',class:'font_1'},
                        {name:'font_2',val:'font_2',class:'font_2'},
                        {name:'font_3',val:'font_3',class:'font_3'},
                    ]
                }),
                draw_select_box({
                    keys_arr:[{key:'font-weight',key_tree:'form_elements.elems.button1.css'}],
                    name:texts.styling.font_weight,
                    selections:[
                        {text:texts.styling.bold,key:'bold'},
                        {text:texts.styling.normal,key:'normal'},
                    ],
                    selection_class:'pX10'
                }),
                draw_select_range({
                    keys_arr:[{key:'font-size',key_tree:'form_elements.elems.button1.css'}],
                    name:texts.styling.font_size,
                    range:{min:.5,max:3,step:.1},
                    unit:'em'
                }),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button1_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button1_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                draw_select_range({
                    keys_arr:[{key:'transition-duration',key_tree:'form_elements.elems.button1.css'}],
                    name:texts.website_style.transitionDuration,
                    range:{min:0,max:2000,step:1},
                    unit:'ms'
                }),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.on_hover}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_hover`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_hover`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button1_hover_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button1_hover_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.on_click}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_active`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_active`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button1_active_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button1_active_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.disabled}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_disabled`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_disabled`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button1_disabled_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button1_disabled_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_border',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button1.css']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button1.css'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button1.css`],step:1,units:['px'],is_responsive:false}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_box_shadow',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button1.css'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_hover_border',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_hover.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_hover`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button1.css_hover']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button1.css_hover'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button1.css_hover`],step:1,units:['px'],is_responsive:false}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_hover_box_shadow',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_hover.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button1.css_hover'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_active_border',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_click.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_active`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button1.css_active']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button1.css_active'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button1.css_active`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_active_box_shadow',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_click.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button1.css_active'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_disabled_border',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_disabled.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',disabled:true,text:texts.website_style.button1_disabled}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button1.css_disabled`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button1.css_disabled']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button1.css_disabled'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button1.css_disabled`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button1_disabled_box_shadow',parent_key:'button1'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_disabled.replace(':name:',texts.website_style.button1)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',disabled:true,text:texts.website_style.button1_disabled}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button1.css_disabled'],
                }),
            ),
            //
            $('<div/>',{class:'editor_popup_container none',key:'button2',parent_key:'form_elements'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.button2}),
                $('<div/>',{class:'fs085 c_white-11',text:texts.website_style.button2_des}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                        $('<button/>',{class:'button2 m5',disabled:true,text:texts.website_style.button2_disabled}),
                    )
                ),
                draw_select_range({
                    keys_arr:[{key:'padding-block',key_tree:'form_elements.elems.button2.css'}],
                    name:texts.styling.padding_y,
                    range:{min:0,max:25,step:1},
                    unit:'px'
                }),
                draw_select_range({
                    keys_arr:[{key:'padding-inline',key_tree:'form_elements.elems.button2.css'}],
                    name:texts.styling.padding_x,
                    range:{min:0,max:50,step:1},
                    unit:'px'
                }),
                draw_input_list({
                    keys_arr:[{key:'font_style',key_tree:'form_elements.elems.button2'}],
                    name:texts.styling.font_style,
                    selections:[
                        {name:'font_1',val:'font_1',class:'font_1'},
                        {name:'font_2',val:'font_2',class:'font_2'},
                        {name:'font_3',val:'font_3',class:'font_3'},
                    ]
                }),
                draw_select_box({
                    keys_arr:[{key:'font-weight',key_tree:'form_elements.elems.button2.css'}],
                    name:texts.styling.font_weight,
                    selections:[
                        {text:texts.styling.bold,key:'bold'},
                        {text:texts.styling.normal,key:'normal'},
                    ],
                    selection_class:'pX10'
                }),
                draw_select_range({
                    keys_arr:[{key:'font-size',key_tree:'form_elements.elems.button2.css'}],
                    name:texts.styling.font_size,
                    range:{min:.5,max:3,step:.1},
                    unit:'em'
                }),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button2_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button2_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                draw_select_range({
                    keys_arr:[{key:'transition-duration',key_tree:'form_elements.elems.button2.css'}],
                    name:texts.website_style.transitionDuration,
                    range:{min:0,max:2000,step:1},
                    unit:'ms'
                }),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.on_hover}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_hover`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_hover`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button2_hover_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button2_hover_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.on_click}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_active`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_active`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button2_active_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button2_active_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.disabled}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_disabled`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_disabled`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button2_disabled_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button2_disabled_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_border',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button2.css']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button2.css'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button2.css`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_box_shadow',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button2.css'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_hover_border',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_hover.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_hover`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button2.css_hover']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button2.css_hover'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button2.css_hover`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_hover_box_shadow',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_hover.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button2.css_hover'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_active_border',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_click.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_active`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button2.css_active']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button2.css_active'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button2.css_active`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_active_box_shadow',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_click.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button2.css_active'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_disabled_border',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_disabled.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',disabled:true,text:texts.website_style.button2_disabled}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button2.css_disabled`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button2.css_disabled']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button2.css_disabled'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button2.css_disabled`],step:1,units:['px'],is_responsive:false}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button2_disabled_box_shadow',parent_key:'button2'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_disabled.replace(':name:',texts.website_style.button2)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',disabled:true,text:texts.website_style.button2_disabled}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button2.css_disabled'],
                }),
            ),
            //
            $('<div/>',{class:'editor_popup_container none',key:'button3',parent_key:'form_elements'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.button3}),
                $('<div/>',{class:'fs085 c_white-11',text:texts.website_style.button3_des}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',text:texts.website_style.button3}),
                        $('<button/>',{class:'button3 m5',disabled:true,text:texts.website_style.button3_disabled}),
                    )
                ),
                draw_select_range({
                    keys_arr:[{key:'padding-block',key_tree:'form_elements.elems.button3.css'}],
                    name:texts.styling.padding_y,
                    range:{min:0,max:25,step:1},
                    unit:'px'
                }),
                draw_select_range({
                    keys_arr:[{key:'padding-inline',key_tree:'form_elements.elems.button3.css'}],
                    name:texts.styling.padding_x,
                    range:{min:0,max:50,step:1},
                    unit:'px'
                }),
                draw_input_list({
                    keys_arr:[{key:'font_style',key_tree:'form_elements.elems.button3'}],
                    name:texts.styling.font_style,
                    selections:[
                        {name:'font_1',val:'font_1',class:'font_1'},
                        {name:'font_2',val:'font_2',class:'font_2'},
                        {name:'font_3',val:'font_3',class:'font_3'},
                    ]
                }),
                draw_select_box({
                    keys_arr:[{key:'font-weight',key_tree:'form_elements.elems.button3.css'}],
                    name:texts.styling.font_weight,
                    selections:[
                        {text:texts.styling.bold,key:'bold'},
                        {text:texts.styling.normal,key:'normal'},
                    ],
                    selection_class:'pX10'
                }),
                draw_select_range({
                    keys_arr:[{key:'font-size',key_tree:'form_elements.elems.button3.css'}],
                    name:texts.styling.font_size,
                    range:{min:.5,max:3,step:.1},
                    unit:'em'
                }),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button3_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button3_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                draw_select_range({
                    keys_arr:[{key:'transition-duration',key_tree:'form_elements.elems.button3.css'}],
                    name:texts.website_style.transitionDuration,
                    range:{min:0,max:2000,step:1},
                    unit:'ms'
                }),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.on_hover}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_hover`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_hover`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button3_hover_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button3_hover_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.on_click}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_active`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_active`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button3_active_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button3_active_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
                //
                $('<div/>',{class:'fs1 bold mT20',text:texts.styling.disabled}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_disabled`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_disabled`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_editor_show_container({key:'button3_disabled_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'button3_disabled_box_shadow',name:texts.styling.drop_shadow,row_class:true}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_border',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',text:texts.website_style.button3}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button3.css']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button3.css'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button3.css`],step:1,units:['px'],is_responsive:false}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_box_shadow',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',text:texts.website_style.button3}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button3.css'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_hover_border',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_hover.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',text:texts.website_style.button3}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_hover`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button3.css_hover']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button3.css_hover'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button3.css_hover`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_hover_box_shadow',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_hover.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',text:texts.website_style.button3}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button3.css_hover'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_active_border',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_click.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',text:texts.website_style.button3}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_active`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button3.css_active']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button3.css_active'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button3.css_active`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_active_box_shadow',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_click.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',text:texts.website_style.button3}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button3.css_active'],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_disabled_border',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_border_disabled.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',disabled:true,text:texts.website_style.button3_disabled}),
                    )
                ),
                draw_color_picker({keys_arr:[{key_tree:`form_elements.elems.button3.css_disabled`,key:`border-color`}],name:texts.styling.border_color}),
                // draw_select_box_border({
                //     keys_arr:['form_elements.elems.button3.css_disabled']
                // }),
                draw_select_range({
                    keys_arr:[{key:'border-width',key_tree:'form_elements.elems.button3.css_disabled'}],
                    name:texts.styling.border_width,
                    range:{min:0,max:5,step:1},
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`form_elements.elems.button3.css_disabled`],step:1,units:['px'],is_responsive:false}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'button3_disabled_box_shadow',parent_key:'button3'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.name_shadow_disabled.replace(':name:',texts.website_style.button3)}),
                $('<div/>',{class:'w100p form  pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button3 m5',disabled:true,text:texts.website_style.button3_disabled}),
                    )
                ),
                draw_drop_shadow_select({
                    keys_arr:['form_elements.elems.button3.css_disabled'],
                }),
            ),

        ),
    )
    draw_website_checkbox()
}

//events
$('body').on('click','.checkbox',function(e){
    //e.stopImmediatePropagation();
    if($(this).hasClass("checkbox_checked")){
        $(this).removeClass('checkbox_checked');
    }else{
        $(this).addClass('checkbox_checked');
    }
})
draw_website_checkbox = function(){
    $('.checkbox_container').each(function(){
        $(this).text('').append(
            create_html(window.template.form_elements.elems.checkbox)
        )
        $(this).find('.checkbox').addClass('checkbox_checked')
    })
}
