$('body').on('click','.open_page',function(e){
    e.preventDefault();
    let page = $(this).attr('page');
    switch(page){
        case 'home': 
            open_page(window.pages.home,user_status({'status':'user_browse_home'}))
        break;
    }
})
//
$('body').on('click','.open_popup',function(e){
    e.preventDefault();
    let popup = $(this).attr('popup');
    let input_focus = $(this).attr('input_focus');
    let user_status_obj;
    switch(popup){
        case 'login':
            user_status_obj = {'status':'user_loggingIn'}
        break;
        case 'signup':
            user_status_obj = {'status':'user_signingUp'}
        break;
        case 'reset_password_1':
            user_status_obj = {'status':'user_signingUp'}
        break;
    }
    open_popup(window.popups[popup],function(){
        user_status(user_status_obj)
        if(input_focus !== undefined){
            $(`${input_focus}`).focus()
        }
    })


})
$('body').on('click','.popup_close',function(e){
    close_popup();
})
//
$('body').on('click','.scroll_to_section',function(e){
    e.preventDefault();
    $('body').animate({
        scrollTop:$(`.${$(this).attr('section')}`).position().top,
    },1000)
})
$('body').on('click select','.check_box',function(e){
    let marker = $(this).find('.check_box_marker')
    if(marker.hasClass('none')){
        marker.removeClass('none');
    }else {
        marker.addClass('none')
    }
})
$('body').on('keydown','.check_box',function(e){
    if (e.which === 32) {
        let marker = $(this).find('.check_box_marker')
        if(marker.hasClass('none')){
            marker.removeClass('none');
        }else {
            marker.addClass('none')
        }
    }
})
//
// $('body').on('click','.change_language',function(e){
                // window.location.href = `/${$(this).attr('language')}/home`
    //             $('.website_loading').removeClass('none')
    // $.ajax({
    //     url:'/api/website',
    //     data:{
    //         change_language:$(this).attr('langauge')
    //     },success:function(r){
    //         // console.log(r)
    //         if(r.state == 1){
    //             // window.location.reload();
    //         }
    //     }
    // })
// })
