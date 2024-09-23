$('body').on('click','.signup_button',function(){
    let name = $('.signup_name').find('.form_input_box_input');
    let email = $('.signup_email').find('.form_input_box_input');
    let password = $('.signup_password').find('.form_input_box_input');
    let password_confirm = $('.signup_password_confirm').find('.form_input_box_input');
    let privacy_policy;
    $('.signup_privacy_policy').find('.check_box_marker').hasClass('none') ? privacy_policy = 0 : privacy_policy = 1;
    form_message('','')
    show_website_form_loading();
    $.ajax({
        url:'/api/auth',
        data:{
            user_signup:true,
            name:name.val(),
            email:email.val(),
            password:password.val(),
            password_confirm:password_confirm.val(),
            privacy_policy:privacy_policy,
        },
        success:function(r){
            clear_form_errors();
            if(r.status == 'error'){
                if('privacy_policy' in r.errors){
                    form_check_box_error($('.signup_privacy_policy'),get_text(r.errors.privacy_policy[0]))
                }
                if('password_confirm' in r.errors){
                    form_input_error($('.signup_password_confirm'),get_text(r.errors.password_confirm[0]))
                }
                if('password' in r.errors){
                    form_input_error($('.signup_password'),get_text(r.errors.password[0]))
                }
                if('email' in r.errors){
                    form_input_error($('.signup_email'),get_text(r.errors.email[0]))
                }
                if('name' in r.errors){
                    form_input_error($('.signup_name'),get_text(r.errors.name[0]))
                }
                hide_website_form_loading();
            }
            else if(r.status == 'success'){
                let email_val = email.val();
                open_popup(window.popups.login,function(){
                    form_message('success',get_text(r.msg))
                    $('.login_email').find('.form_input_box_input').val(email_val)
                    $('.login_password').find('.form_input_box_input').focus()
                })
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message('error',window.texts.other.unknown_error)
        }
    })
});
