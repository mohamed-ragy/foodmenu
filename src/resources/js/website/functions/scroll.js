
smooth_scroll_event = function(){
    $('body, html').off('wheel');
    document.body.addEventListener('wheel', function(event) {
        if(window.scrolling == true){
            event.preventDefault();
            return;
        }
        if(!$('.popup_container').hasClass('none')){return;}
        if(event.wheelDelta < 0){
            window.scrolling = true;
            $('body').stop(true,false).animate({scrollTop:$('body').scrollTop() + parseFloat(window.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.smooth_scroll_duration.replace('ms','')),specialEasing: {width: 'easeOutQuint',height: 'easeOutQuint'}});
            setTimeout(()=>{
                window.scrolling = false;
            },parseInt(window.smooth_scroll_duration.replace('ms','')))
        }else{
            window.scrolling = true;
            $('body').stop(true,false).animate({scrollTop:$('body').scrollTop() - parseFloat(window.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.smooth_scroll_duration.replace('ms','')),specialEasing: {width: 'easeOutQuint',height: 'easeOutQuint'}});
            setTimeout(()=>{
                window.scrolling = false;
            },parseInt(window.smooth_scroll_duration.replace('ms','')))
        }
    }, { passive: false });
}