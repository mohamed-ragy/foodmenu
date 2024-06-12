draw_gradient_editor = function(data){
    let editor = $('<div/>',{
        class:`editor gradient_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.gradient_style}),
            draw_select_box({
                dummy:true,
                dummy_class:'gradient_editor_type',
                selections:[
                    {text:texts.styling.linear,key:'linear',show_elem:'gradient_editor_angle_container'},
                    {text:texts.styling.radial,key:'radial',hide_elem:'gradient_editor_angle_container'},
                ]
            }),
        ),
        $('<div/>',{class:'editor_popup_col gradient_editor_angle_container'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.angle}),
            draw_select_range({
                dummy:true,
                dummy_class:'gradient_editor_angle',
                unit:'deg',
                range:{min:0,max:360,step:1}
            })
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.colors}),
            $('<div/>',{class:'gradient_editor_colors_position'}),
        ),
    )
    return editor;
}

set_gradient_editor = function(editor){
    let val = get_editor_val(editor);
    if(val == '--'){return}
    val = val.split(', ')
    if(val[0].includes('linear-gradient')){
        set_dummy_select_box(editor.find('.gradient_editor_type'),'linear');
        set_dummy_select_range(editor.find('.gradient_editor_angle'),val[0].replace('linear-gradient(',''))
    }else if(val[0].includes('radial-gradient')){
        set_dummy_select_box(editor.find('.gradient_editor_type'),'radial');
    }
    color_gradient_editor_colors_position(editor);
    draw_gradient_editor_colors(editor);
}
color_gradient_editor_colors_position = function(editor){
    let val = get_editor_val(editor);
    val = val.split(', ');
    let preview_gradient = `linear-gradient(90deg`;
    for(const key in val){
        if(key != 0){
            preview_gradient = `${preview_gradient}, ${val[key]}`;
        }
    }
    $('.gradient_editor_colors_position').css('background',preview_gradient)
}
draw_gradient_editor_colors = function(editor){
    let val = get_editor_val(editor);
    if(val == '--'){return}
    val = val.split(', ');
    let this_color_picker;
    $('.gradient_editor_colors').text('')
    $('.gradient_editor_colors_position').text('')
    for(const key in val){
        if(key != 0){
            let color = val[key].split(' ')
            color[1] = color[1].replace(')','');
            $('.gradient_editor_colors_position').append(
                this_color_picker = draw_color_picker({
                    key:key,
                    dummy:true,
                    dummy_class:'gradient_editor_colors_position_color'
                }),
            );
            set_dummy_color_picker(this_color_picker,color[0])
            this_color_picker.css('left',color[1])
        }
    }

}
set_gradient_editor_val = function(editor,colors=[]){
    let type = get_dummy_val(editor.find('.gradient_editor_type'));
    let new_val = '';
    if(type === 'linear'){
        let angle = 
        new_val = `linear-gradient(${get_dummy_val(editor.find('.gradient_editor_angle'))}`
        }else if(type === 'radial'){
        new_val = `radial-gradient(circle`
    }
    $('.gradient_editor_colors_position_color').each(function(){
        let stop = (Math.round($(this).position().left) / Math.round($('.gradient_editor_colors_position').width())) * 100;
        colors.push({
            color:get_dummy_val($(this)),
            stop:Math.round(stop),
        })
    })
    colors.sort(function(a,b){
        return a.stop - b.stop;
    })
    for(const key in colors){
        new_val = `${new_val}, ${colors[key].color} ${colors[key].stop}%`;
    }
    new_val = `${new_val})`
    set_val(editor,new_val);
    new_action(false,true)
    color_gradient_editor_colors_position(editor);
}
//events
$('body').on('change','.gradient_editor_colors_position_color',function(){
    set_gradient_editor_val($(this).closest('.gradient_editor'))
})
$('body').on('mousedown','.gradient_editor_colors_position_color',function(){
    $(this).attr('onMove','1')
})
$('body').on('mousemove','.gradient_editor_colors_position_color',function(e){
    if($(this).attr('onMove') == '1'){
        $(this).attr('stop','1')
        let new_position = e.pageX - $('.gradient_editor_colors_position').offset().left;
        if(new_position <= 0){new_position = 0}
        if(new_position >= $('.gradient_editor_colors_position').width()){
            new_position = $('.gradient_editor_colors_position').width()
        }
        $(this).css('left',`${new_position}px`)
    }
});
$('body').on('mouseup mouseleave','.gradient_editor_colors_position_color',function(e){
    if($(this).attr('onMove') == '1'){
        let editor = $(this).closest('.gradient_editor')
        $(this).attr('onMove','0')
        set_gradient_editor_val(editor)
    }
    if($(this).attr('stop') == '1'){
        e.stopImmediatePropagation();
        $(this).attr('stop','0')
    }
})
$('body').on('contextmenu','.gradient_editor_colors_position_color',function(e){
    let editor = $(this).closest('.gradient_editor');
    if(editor.find('.gradient_editor_colors_position_color').length <= 2){return;}
    $(this).remove();
    set_gradient_editor_val(editor);
    draw_gradient_editor_colors(editor)
    color_gradient_editor_colors_position(editor);

})
$('body').on('change','.gradient_editor_type',function(){
    let editor = $(this).closest('.gradient_editor')
    set_gradient_editor_val(editor)
    draw_gradient_editor_colors(editor);
})
$('body').on('change','.gradient_editor_angle',function(){
    let editor = $(this).closest('.gradient_editor')
    set_gradient_editor_val(editor)
})
$('body').on('click','.gradient_editor_colors_position',function(e){
    if($('.gradient_editor_colors_position_color:hover').length > 0){return;}
    let editor = $(this).closest('.gradient_editor')
    let new_stop = Math.round( ( Math.round(e.pageX - $('.gradient_editor_colors_position').offset().left) / Math.round($('.gradient_editor_colors_position').width()) ) * 100);
    if(new_stop < 0){new_stop = 0}
    if(new_stop > 100){new_stop = 100}
    set_gradient_editor_val(editor,[{color:`rgba(var(--color_1_7),1)`,stop:new_stop}])
    draw_gradient_editor_colors(editor);
})