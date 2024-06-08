// draw_editor_show_container = function(key,name,container_class='',attr,editor_popup_row_class=true){
draw_editor_show_container = function(data){
    let elem = $('<div/>',{class:`${data.row_class ? 'editor_popup_row' : ''} pointer  editor_popup_show_container ${data.container_class ?? ''}`,key:data.key}).append(
        $('<div/>',{class:'fs09',text:data.name}),
        $('<div/>',{class:'fs08 ico-arrowRight'})
    )
    for(const key in data.attr){
        elem.attr(key,data.attr[key])
    }
    return elem;
}
