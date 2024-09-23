$('body').on('click','.reset_password_1_button',function(){
    let email = $('.reset_password_1_email').find('.form_input_box_input');
    form_message('',texts.authentication.reset_password_description)
    show_website_form_loading();
    $.ajax({
        url:'/api/auth',
        data:{reset_password_1:true,email:email.val()},
        success:function(r){
            clear_form_errors();
            if(r.status == 'error'){
                form_input_error($('.reset_password_1_email'),get_text(r.msg))
                hide_website_form_loading();
            }else if(r.status == 'success'){
                form_message('success',get_text(r.msg));
                $('.reset_password_1_email').addClass('none');
                $('.reset_password_1_button').addClass('none');
                $('.website_form').append(
                    $('<button/>',{class:'popup_close form_button ',text:window.texts.other.ok})
                )
                hide_website_form_loading();
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message('error',window.texts.other.unknown_error)
        }
    })
});
