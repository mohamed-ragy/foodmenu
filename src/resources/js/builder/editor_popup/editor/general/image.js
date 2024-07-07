draw_editor_popup_image = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                
                ]
            })
        )
    })
}
$('body').on('click','.editor_image',function(e){
    draw_editor_popup_image();
})