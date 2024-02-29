
hide_page_loading = function(){
    $('#page_loading').css('transition-duration','800ms');
    $('#page_loading').css('opacity',0);
    setTimeout(()=>{
        $('#page_loading').hide();
        $('#page_loading').css('transition-duration','0ms');
    },510)
}
show_page_loading = function(){
    $('#page_loading').show();

}
