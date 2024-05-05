$('body').on('click','.open_page',function(e){
    e.preventDefault();
    switch($(this).attr('page')){
        case 'home':
            open_page(()=>{draw_home_page()})
        break;
    }
})
//
$('body').on('click','.open_popup',function(e){
    e.preventDefault();
    switch($(this).attr('popup')){
        case '':
        break;
    }
})
$('body').on('click','.popup_close',function(e){
    close_popup();
})
//
$('body').on('click','.scroll_to_section',function(e){
    e.preventDefault();
    $('body').animate({
        scrollTop:$(`.${$(this).attr('section')}`).position().top,
    },500)
})
$('body').on('click','.checkbox',function(e){
    if($(this).hasClass('checkbox_checked')){
        $(this).removeClass('checkbox_checked');
    }else {
        $(this).addClass('checkbox_checked')
    }
})
//
$('body').on('click','.change_language',function(e){
    $('.website_loading').removeClass('none')
    $.ajax({
        url:'/api/website',
        data:{
            change_language:$(this).attr('langauge')
        },success:function(r){
            console.log(r)
            if(r.state == 1){
                window.location.reload();
            }
        }
    })
})
