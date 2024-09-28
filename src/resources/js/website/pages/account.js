$('body').on('click','.user_account_menu_elem',function(){
    let account_page = $(this).attr("account_page");
    if(account_page){
        window.window_history.replace({'account_page':account_page});
        set_page();
    }
})
$('body').on('click','.account_information_button ',function(){
    let name = $('.account_information_name').find('.form_input_box_input');
    let email = $('.account_information_email').find('.form_input_box_input');
    let phone_number = $('.account_information_phone_number').find('.form_input_box_input');
    let this_btn = $(this);
    form_message(this_btn,'','')
    show_website_form_loading();
    $.ajax({
        url:'/api/auth',
        data:{account_information:true,email:email.val(),name:name.val(),phone_number:phone_number.val()},
        success:function(r){
            clear_form_errors();
            if(r.status == 'error'){
                if('name' in r.errors){
                    form_input_error($('.account_information_name'),get_text(r.errors.name[0]))
                }
                if('email' in r.errors){
                    form_input_error($('.account_information_email'),get_text(r.errors.email[0]))
                }
                if('phoneNumber' in r.errors){
                    form_input_error($('.account_information_phone_number'),get_text(r.errors.phoneNumber[0]))
                }
                hide_website_form_loading();
            }
            else if(r.status == 'success'){
                form_message(this_btn,'success',get_text(r.msg))
                hide_website_form_loading();
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message(this_btn,'error',get_text('other.unknown_error'))
        }
    })
})
$('body').on('click','.change_account_password_button',function(){
    let current_password = $('.change_account_password_current_password').find('.form_input_box_input');
    let new_password = $('.change_account_password_new_password').find('.form_input_box_input');
    let new_password_confirm = $('.change_account_password_new_password_confirm').find('.form_input_box_input');
    let this_btn = $(this);
    form_message(this_btn,'','')
    $.ajax({
        url:'/api/auth',
        data:{change_account_password:true,current_password:current_password.val(),new_password:new_password.val(),new_password_confirm:new_password_confirm.val()},
        success:function(r){
            clear_form_errors();
            if(r.status == 'error'){
                if('new_password_confirm' in r.errors){
                    form_input_error($('.change_account_password_new_password_confirm'),get_text(r.errors.new_password_confirm[0]))
                }
                if('new_password' in r.errors){
                    form_input_error($('.change_account_password_new_password'),get_text(r.errors.new_password[0]))
                }
                if('current_password' in r.errors){
                    form_input_error($('.change_account_password_current_password'),get_text(r.errors.current_password[0]))
                }
                hide_website_form_loading();
            }else if(r.status == 'success'){
                form_message(this_btn,'success',get_text(r.msg))
                current_password.val('')
                new_password.val('')
                new_password_confirm.val('')
                hide_website_form_loading();
            }
        },error(r){
            clear_form_errors();
            hide_website_form_loading()
            form_message(this_btn,'error',get_text('other.unknown_error'))
        }
    })

})