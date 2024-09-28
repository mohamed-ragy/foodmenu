
show_website_form_loading = function(){
    $('.website_form').children().not('.form_loading_spinner').addClass('hidden')
    $('.website_form').find('.form_loading_spinner').removeClass('none')
}
hide_website_form_loading = function(not=[]){
    $('.website_form').find('.form_loading_spinner').addClass('none')
    website_form_children = $('.website_form').children();
    for(const key in not){
        website_form_children = website_form_children.not(not[key])
    }
    website_form_children.not('.form_loading_spinner').removeClass('hidden')
}
form_message = function(elem,type,msg){

    elem.closest('.website_form').find('.form_message').removeClass('website_form_success website_form_error website_form_warning').addClass(`website_form_${type}`).text(msg)
}
form_input_error = function(input,message){
    input.find('.form_input_box_input').addClass('form_input_box_input_error');
    input.find('.form_input_box_message').text(message)
    input.find('.form_input_box_input').focus();
}
form_check_box_error = function(check_box,message){
    check_box.closest('.form_check_box_container').find('.form_check_box_message').text(message)
}
clear_form_errors = function(){
    $('.form_input_box_input').removeClass('form_input_box_input_error');
    $('.form_input_box_message').text('');
    $('.form_check_box_message').text('')
}
//
$('body').on('keydown','.form_input_box_input',function(e){
    if(e.which == 13){
        $(this).closest('.website_form').find('.form_button').trigger('click')
    }
})