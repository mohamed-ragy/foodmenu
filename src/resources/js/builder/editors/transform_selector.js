draw_transform_editor = function(data){
    let editor = $('<div/>',{
        class:`editor transform_editor w100p ${data.container_class ?? ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        $('<div/>',{class:'editor_popup_row'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.styling.translate}),
                $('<div/>',{class:'translate_val fs08 c_white-11'}),
            ),
            $('<div/>',{class:'transform_btns_container'}).append(
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<button/>',{class:'transform_btn turbo ico-arrowUp',transform_action:'up'}),
                ),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<button/>',{class:'transform_btn turbo ico-arrowLeft',transform_action:'left'}),
                    $('<button/>',{class:'transform_btn turbo ico-border',transform_action:'translate_center'}),
                    $('<button/>',{class:'transform_btn turbo ico-arrowRight',transform_action:'right'}),
                ),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<button/>',{class:'transform_btn turbo ico-arrowDown',transform_action:'down'}),
                ),
            )
        ),
        $('<div/>',{class:'editor_popup_row'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.styling.rotate_z}),
                $('<div/>',{class:'rotate_z_val fs08 c_white-11'}),
            ),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_z_minus bold',transform_action:'rotate_z_minus'}),
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_center fs101',transform_action:'rotate_z_center'}),
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_z_plus bold',transform_action:'rotate_z_plus'}),
            )
        ),
        $('<div/>',{class:'editor_popup_row'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.styling.rotate_x}),
                $('<div/>',{class:'rotate_x_val fs08 c_white-11'}),
            ),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_x_minus bold fs102',transform_action:'rotate_x_minus'}),
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_center fs101',transform_action:'rotate_x_center'}),
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_x_plus bold fs102',transform_action:'rotate_x_plus'}),
            )
        ),
        $('<div/>',{class:'editor_popup_row'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.styling.rotate_y}),
                $('<div/>',{class:'rotate_y_val fs08 c_white-11'}),
            ),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_y_minus bold fs102',transform_action:'rotate_y_minus'}),
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_center fs101',transform_action:'rotate_y_center'}),
                $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_y_plus bold fs102',transform_action:'rotate_y_plus'}),
            )
        ),
        $('<div/>',{class:'editor_popup_row'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.styling.scale}),
                $('<div/>',{class:'scale_val fs08 c_white-11'}),
            ),
            $('<div/>',{class:'transform_btns_container'}).append(
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<div/>',{class:'transform_scale_btn dummy_transform_btn'}),
                    $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_up  fs102',transform_action:'scale_v_up'}),
                    $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_up  fs102',transform_action:'scale_up'}),
                ),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_down  fs102',transform_action:'scale_h_down'}),
                    $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-border',transform_action:'scale_center'}),
                    $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_up  fs102',transform_action:'scale_h_up'}),
                ),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_down  fs102',transform_action:'scale_down'}),
                    $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_down  fs102',transform_action:'scale_v_down'}),
                    $('<div/>',{class:'transform_scale_btn dummy_transform_btn'}),
                )
            )
        )
    )


    return editor;
}
set_transform_editor = function(editor){
    let val = get_editor_val(editor).split(' ');
    let translate = val[0].replace('translate(','').replace(')','').replaceAll('px','').split(',');
    let rotate_x = val[1].replace('rotateX(','').replace('deg','').replace(')','');
    let rotate_y = val[2].replace('rotateY(','').replace('deg','').replace(')','');
    let rotate_z = val[3].replace('rotateZ(','').replace('deg','').replace(')','');
    let scale_x = val[4].replace('scaleX(','').replace(')','');
    let scale_y = val[5].replace('scaleY(','').replace(')','');
    editor.find('.translate_val').text(`X:${translate[0]}, Y:${translate[1]}`)
    editor.find('.rotate_x_val').text(`${rotate_x}deg`)
    editor.find('.rotate_y_val').text(`${rotate_y}deg`)
    editor.find('.rotate_z_val').text(`${rotate_z}deg`)
    editor.find('.scale_val').text(`X:${scale_x}, Y:${scale_y}`)
}

$('body').on('change','.transform_editor',function(){
    new_action();
})
$('body').on('mousedown','.transform_btn',function(e){
    let editor = $(this).closest('.transform_editor');
    let val = get_editor_val(editor).split(' ');
    let translate = val[0].replace('translate(','').replace(')','').replaceAll('px','').split(',');
    let rotate_x = val[1].replace('rotateX(','').replace('deg','').replace(')','');
    let rotate_y = val[2].replace('rotateY(','').replace('deg','').replace(')','');
    let rotate_z = val[3].replace('rotateZ(','').replace('deg','').replace(')','');
    let scale_x = val[4].replace('scaleX(','').replace(')','');
    let scale_y = val[5].replace('scaleY(','').replace(')','');
    switch ($(this).attr('transform_action')) {
        case 'right':
            translate[0] = parseInt(translate[0]) + 1
        break;
        case 'left':
            translate[0] = parseInt(translate[0]) - 1
        break;
        case 'up':
            translate[1] = parseInt(translate[1]) - 1
        break;
        case 'down':
            translate[1] = parseInt(translate[1]) + 1
        break;
        case 'translate_center':
            translate[0] = '0';
            translate[1] = '0';
        break;
        case 'rotate_z_plus':
            rotate_z = parseInt(rotate_z) + 1;
        break;
        case 'rotate_z_minus':
            rotate_z = parseInt(rotate_z) - 1;
        break;
        case 'rotate_z_center':
            rotate_z = 0;
        break;
        case 'rotate_x_plus':
            rotate_x = parseInt(rotate_x) + 1;
        break;
        case 'rotate_x_minus':
            rotate_x = parseInt(rotate_x) - 1;
        break;
        case 'rotate_x_center':
            rotate_x = 0;
        break;
        case 'rotate_y_plus':
            rotate_y = parseInt(rotate_y) + 1;
        break;
        case 'rotate_y_minus':
            rotate_y = parseInt(rotate_y) - 1;
        break;
        case 'rotate_y_center':
            rotate_y = 0;
        break;
        case 'scale_up':
            scale_x = parseFloat(scale_x) + 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
            scale_y = parseFloat(scale_y) + 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_h_up':
            scale_x = parseFloat(scale_x) + 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
        break;
        case 'scale_v_up':
            scale_y = parseFloat(scale_y) + 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_down':
            scale_x = parseFloat(scale_x) - 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
            scale_y = parseFloat(scale_y) - 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_h_down':
            scale_x = parseFloat(scale_x) - 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
        break;
        case 'scale_v_down':
            scale_y = parseFloat(scale_y) - 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_center':
            scale_y = 1;
            scale_x = 1;
        break;
    }

    let new_transform = `translate(${translate[0]}px,${translate[1]}px) rotateX(${rotate_x}deg) rotateY(${rotate_y}deg) rotateZ(${rotate_z}deg) scaleX(${scale_x}) scaleY(${scale_y})`;
    set_val(editor,new_transform);
    undo_redo_actions();
})
$('body').on('mouseup','.transform_btn',function(e){
    $(this).closest('.transform_editor').trigger('change')
});