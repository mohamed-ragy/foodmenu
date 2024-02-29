showPage = function(page){
    $('.page').addClass('page_hidden');
    setTimeout(()=>{
        $('.page').text('');
        switch(page){
            case 'home':
                draw_page_home();
            break;
            case 'change_plan':
                draw_page_change_plan();
            break;
        }
        $('.page').removeClass('page_hidden')
    },300)
    
}

$('html,body').on('click','.openPage',function(e){
    e.stopImmediatePropagation();
    showPage($(this).attr('page'))
})
