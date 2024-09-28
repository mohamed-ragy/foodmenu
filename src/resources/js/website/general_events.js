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
