$('body').on('click','.reset_password_1_button',function(){
    let email = $('.reset_password_1_email').find('.form_input_box_input');
    let this_btn = $(this);
    form_message(this_btn,'',texts.authentication.reset_password_description)
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
                open_popup({
                    popup:'reset_password_2',
                    after_animation:function(){
                        $('.reset_password_2_code').find('.form_input_box_input').focus();
                    }
                })
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message(this_btn,'error',get_text('other.unknown_error'))
        }
    })
});
$('body').on('click','.reset_password_2_button',function(){
    let code = $('.reset_password_2_code').find('.form_input_box_input').val();
    let this_btn = $(this);
    show_website_form_loading();
    $.ajax({
        url:'/api/auth',
        data:{reset_password_2:true,code:code},
        success:function(r){
            clear_form_errors();
            if(r.status == 'error'){
                form_input_error($('.reset_password_2_code'),get_text(r.msg))
                hide_website_form_loading();
            }else if(r.status == 'success'){
                window.reset_password_code = code;
                open_popup({
                    popup:'reset_password_3',
                    after_animation:function(){
                        $('.reset_password_3_password').find('.form_input_box_input').focus();
                    }
                })
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message(this_btn,'error',get_text('other.unknown_error'))
        }
    })
})
$('body').on('click','.reset_password_3_button',function(){
    let code = window.reset_password_code;
    let password = $('.reset_password_3_password').find('.form_input_box_input');
    let password_confirm = $('.reset_password_3_password_confirm').find('.form_input_box_input');
    let this_btn = $(this);
    show_website_form_loading();
    $.ajax({
        url:'/api/auth',
        data:{reset_password_3:true,code:code,password:password.val(),password_confirm:password_confirm.val()},
        success:function(r){
            clear_form_errors();
            if(r.status == 'error'){
                hide_website_form_loading();
                $('.reset_password_3_button, .reset_password_3_password, .reset_password_3_password_confirm').addClass('none')
                $('.website_form').append(
                    $('<button/>',{class:'form_button popup_close',text:texts.other.ok})
                )
                form_message(this_btn,'error',get_text(r.msg))
            }else if(r.status == 'password_error'){
                if('password_confirm' in r.errors){
                    form_input_error($('.reset_password_3_password_confirm'),get_text(r.errors.password_confirm[0]))
                }
                if('password' in r.errors){
                    form_input_error($('.reset_password_3_password'),get_text(r.errors.password[0]))
                }
                hide_website_form_loading();
            }else if(r.status == 'success'){
                open_popup({
                    popup:'login',
                    before_animation:function(){
                        form_message(this_btn,'success',get_text(r.msg))
                        $('.login_email').find('.form_input_box_input').val(r.email);
                    },
                    after_animation:function(){
                        $('.login_password').find('.form_input_box_input').focus();
                    }
                })
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message(this_btn,'error',get_text('other.unknown_error'))
        }
    })

});