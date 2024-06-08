show_add_home_elem_popup = function(elem_type){
    show_popup(function(){
        $('.popupTitle').text(texts.add_element);
        $('.popupBody').addClass('').append(
            $('<div/>',{class:'add_home_elem_popup_container'}).append(
                $('<div/>',{class:'add_home_elem_type_elem_container'}).append(
                    $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'title' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'title'}).append(
                        $('<div/>',{}).append(
                            $('<div/>',{class:'ico-title fs101 mie-10'}),
                            $('<div/>',{text:texts.elems.title})
                        ),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                    $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'paragraph' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'paragraph'}).append(
                        $('<div/>',{}).append(
                            $('<div/>',{class:'ico-paragraph fs101 mie-10'}),
                            $('<div/>',{text:texts.elems.paragraph})
                        ),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                    $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'image' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'image'}).append(
                        $('<div/>',{}).append(
                            $('<div/>',{class:'ico-image fs101 mie-10'}),
                            $('<div/>',{text:texts.elems.image})
                        ),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                    $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'button' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'button'}).append(
                        $('<div/>',{}).append(
                            $('<div/>',{class:'ico-button fs101 mie-10'}),
                            $('<div/>',{text:texts.elems.button})
                        ),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                    $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'icon' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'icon'}).append(
                        $('<div/>',{}).append(
                            $('<div/>',{class:'ico-icon fs101 mie-10'}),
                            $('<div/>',{text:texts.elems.icon})
                        ),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                    $('<div/>',{class:`add_home_elem_type_elem ${elem_type == 'line' ? 'add_home_elem_type_elem_selected' : ''}`,elem_type:'line'}).append(
                        $('<div/>',{}).append(
                            $('<div/>',{class:'ico-line fs101 mie-10'}),
                            $('<div/>',{text:texts.elems.line})
                        ),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                ),
                $('<div/>',{class:'add_home_elem_preview_container'})

            )
        )
    });
    draw_add_home_elem_previews(elem_type)
}
draw_add_home_elem_previews = function(elem_type){
    
}
$('body').on('click','.add_home_elem',function(e){
    let elem_type = $(this).attr('elem_type');
    show_add_home_elem_popup(elem_type);
})
$('body').on('click','.add_home_elem_type_elem',function(e){
    let elem_type = $(this).attr('elem_type');
    draw_add_home_elem_previews(elem_type);
    $('.add_home_elem_type_elem').removeClass('add_home_elem_type_elem_selected');
    $(this).addClass('add_home_elem_type_elem_selected')
})