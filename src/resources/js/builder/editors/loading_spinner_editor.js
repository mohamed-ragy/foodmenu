draw_loading_spinner_editor = function(data){
    let editor = $('<div/>',{
        class:`editor loading_spinner_editor ${data.editor_class ?? ''}`,
        key_tree:data.key_tree,
    }).append(
        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.spinner_colors}),
            $('<div/>',{class:'row alnC jstfyE loading_spinner_editor_colors'})
        ),
        $('<div/>',{class:'w100p loading_spinner_editor_other_editors'}),
    );

    return editor;
}
set_loading_spinner_editor = function(editor){
    let key_tree = editor.attr('key_tree')
    let elem = get_element_data(key_tree)
    editor.find('.loading_spinner_editor_colors').text('')
    editor.find('.loading_spinner_editor_other_editors').text('')
    $('.loading_spinnser_preivew').removeClass('loading_spinnser_preivew_selected');
    $(`.loading_spinnser_preivew[spinner_key="${elem.spinner_key}"]`).addClass('loading_spinnser_preivew_selected')
    for(const key in elem.vars){
        let _var = elem.vars[key];
        if(key.includes('color')){
            let _color_picker;
            editor.find('.loading_spinner_editor_colors').append(
                _color_picker = draw_color_picker({
                    key_tree:key_tree,
                    variable_key:'vars',
                    key:key,
                    editor_class:'mX5'
                })
            )
            set_color_picker(_color_picker)
        }else if(key == ':size:'){
            let _size_picker;
            editor.find('.loading_spinner_editor_other_editors').append(
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.size}),
                    _size_picker = draw_select_range({
                        key_tree:key_tree,
                        variable_key:'vars',
                        key:key,
                        range:{max:200,min:30,step:1},
                        unit:'px',
                    })
                )
            )
            set_select_range(_size_picker)
        }else if(key == ':thickness:'){
            let _thickness_editor;
            editor.find('.loading_spinner_editor_other_editors').append(
                $('<div/>',{class:'editor_popup_col'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.thickness}),
                    _thickness_editor = draw_number_picker({
                        key_tree:key_tree,
                        variable_key:'vars',
                        key:key,
                        units:['px'],
                        step:1,
                    })
                )
            )
            set_number_picker(_thickness_editor)
        }else if(key == ':speed:'){
            let _speed_picker;
            editor.find('.loading_spinner_editor_other_editors').append(
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'fs09',text:texts.speed}),
                    _speed_picker = draw_select_range({
                        key_tree:key_tree,
                        variable_key:'vars',
                        key:key,
                        range:{max:5000,min:200,step:100},
                        unit:'',
                    })
                )
            )
            set_select_range(_speed_picker)
        }
    }
}