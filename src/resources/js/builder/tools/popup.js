show_popup = function(callback=()=>{}){
    $('.popupContainer').removeClass('none').text('').append(
        $('<div/>',{class:'popupCard'}).append(
            $('<div/>',{class:'popupHead'}).append(
                $('<div/>',{class:'popupTitle'}),
                $('<div/>',{class:'popupCloseStyle popupClose ico-close'}),
            ),
            $('<div/>',{class:'popupBody'})
        )
    )
    callback();
}
close_popup = function(){
    $('.popupContainer').text('').addClass('none');
    window.is_imgBrowser_opened = false;
}
$('body').on('click','.popupClose',function(e){
    close_popup();
})
$('body').on('click','.popup2Close',function(e){
    $('.popupCard2').remove();
})
