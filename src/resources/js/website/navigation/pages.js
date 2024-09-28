open_page = function(data){
    $('#page').removeClass(`${window.page_transition}_in`);
    $('#page').addClass(`${window.page_transition}_out`);
    $('body').css('overflow-x','hidden');
    window.window_history.push(data.params)
    setTimeout(()=>{
        $('body').scrollTop(0);
        $('#page').removeClass(`${window.page_transition}_out`).addClass(`${window.page_transition}_in`);
        $('#page').html(data.html);
        set_website_data();
        scroll_elem_animation('top');
        set_page_before_animation();
        setTimeout(()=>{
            $('body').css('overflow-x','');
            $('#page').removeClass(`${window.page_transition}_in`);
            setTimeout(()=>{
                set_page_after_animation();
            },parseInt(window.page_transition_duration.replace('ms','')));
        },parseInt(window.page_transition_duration.replace('ms','')));
    },parseInt(window.page_transition_duration.replace('ms','')) - 100);
};
set_page = function(){
    set_page_before_animation();
    set_page_after_animation();
}
set_page_before_animation = function(){
    switch(window.history.state.page){
        case 'account':
            $(`.user_account_menu_elem`).removeClass('user_account_menu_elem_selected')
            $(`.user_account_menu_elem[account_page="${window.history.state.account_page}"]`).addClass('user_account_menu_elem_selected')
            $('.account_page_content').addClass('none');
            $(`.account_page_content[account_page="${window.history.state.account_page}"]`).removeClass('none')
            if(window.history.state.account_page == 'account_information'){
                $('.account_information_name').find('.form_input_box_input').val(auth.name)
                $('.account_information_email').find('.form_input_box_input').val(auth.email)
                $('.account_information_phone_number').find('.form_input_box_input').val(auth.phoneNumber)
            }
        break;
    }
}
set_page_after_animation = function(){
    switch(window.history.state.page){
        case 'account':
            if(window.history.state.account_page == 'change_account_password'){
                $('.change_account_password_current_password').find('.form_input_box_input').focus();
            }
        break;
    }
}
$('body').on('click','.open_page',function(e){
    e.preventDefault();
    let page = $(this).attr('page');
    let params = {page:page};
    let page_params = $(this).attr('page_params')
    if(page_params){
        page_params = page_params.split(';');
        for(const key in page_params){
            let param = page_params[key];
            if(param.includes(':')){
                param = param.split(':')
                params[param[0]] = param[1]
            }
        }
    }
    open_page({
        html:window.pages[page],
        params:params,
    });
})