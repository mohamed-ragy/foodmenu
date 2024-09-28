open_popup = function(data){
    if(!(data.popup in window.popups)){return}
    if(window.auth.type == 'user'){
        if(['login','signup','reset_password_1','reset_password_2','reset_password_3'].includes(data.popup)){
            window.window_history.delete('popup')
            return;
        }
    }
    $('.popup_card').removeClass(window.popup_transition);
    setTimeout(()=>{
        $('.popup_card').children().not('.popup_close').remove();
        $('.popup_card').append(window.popups[data.popup]);
        $('.popup_container').removeClass('none');
        $('.popup_card').addClass(window.popup_transition);
        if('before_animation' in data){
            data.before_animation();
        }
        setTimeout(()=>{
            if('after_animation' in data){
                data.after_animation();
            }
        },parseInt(window.popup_transition_duration.replace('ms','')));
        //
        window.window_history.replace({popup:data.popup })
    });
};
close_popup = function(callback=()=>{}){
    $('.popup_container').addClass('none');
    $('.popup_card').removeClass(window.popup_transition);
    $('.popup_card').children().not('.popup_close').remove();
    user_status({'status':`user_browse_`+window.history.state.page});
    window.window_history.delete('popup')
};
$('body').on('click','.open_popup',function(e){
    e.preventDefault();
    let popup = $(this).attr('popup');
    let input_focus = $(this).attr('input_focus');
    open_popup({
        popup:popup,
        after_animation:function(){
            if(input_focus !== undefined){
                $(`${input_focus}`).focus()
            }
        }
    })
})
$('body').on('click','.popup_close',function(e){
    close_popup();
})