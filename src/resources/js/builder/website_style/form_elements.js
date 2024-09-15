require('./form_elements/website_form.js')

render_form_elements = function(){
    for(const key in window.template.form_elements){
        generate_elem_style(window.template.form_elements[key]);
    }
    console.log('form_elements rendered')
}
$('body').on('dblclick','.website_form',function(){
    draw_editor_popup_website_form()
})