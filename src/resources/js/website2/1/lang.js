drawLangElem = function(code,name,flag){
    $('#langSelectContainer').append(
        $('<a/>',{
            href:`/${code}/home`,
            class:'row alnC jstfyC mY-5',
        }).append(
            $('<img/>',{
                class:'w-20 h-20 br-50p mX-5',
                src:`/storage/imgs/flags/${flag}.png`
            }),
            $('<span/>',{text:name,})
        )
    )
}
