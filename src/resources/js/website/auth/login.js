$('body').on('click','.login_button',function(){
    let email = $('.login_email').find('.form_input_box_input');
    let password = $('.login_password').find('.form_input_box_input');
    let remember;
    let this_btn = $(this);
    $('.login_remember_me').find('.check_box_marker').hasClass('none') ? remember = 0 : remember = 1;
    show_website_form_loading();
    form_message(this_btn,'',texts.authentication.login_description)
    $.ajax({
        url:'/api/auth',
        data:{user_login:email.val(),user_password:password.val(),remember:remember},
        success:function(r){
            clear_form_errors();
            if(r.msg == 'authentication.login_fail'){
                hide_website_form_loading();
                form_input_error($('.login_password'),'')
                form_input_error($('.login_email'),'')
                form_message(this_btn,'error',get_text(r.msg))
            }else if(r.msg == 'authentication.userBanned'){
                form_message(this_btn,'error',get_text(r.msg))
                hide_website_form_loading();
            }else if(r.msg == 'logged_in'){
                window.window_history.delete('popup')
                window.location.reload(true);
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message(this_btn,'error',get_text('other.unknown_error'))
        }
    })
});

$('body').on('click','.logout',function(){
    user_status({'status':'user_loggingOut'})
    $.ajax({
        url:'/api/auth',
        data:{'user_logout':true},
        success:function(){
            window.location.reload(true);
        }
    })

})