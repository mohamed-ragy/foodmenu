addToInputList = function(list,text,key){
    if(list.children().first().hasClass('inputListElementLoading1')){
        list.text('');
    }
    list.append(
        $('<div/>',{
            text:text,
            key:key,
            class:'inputListElement'
        }).append(
            $('<div/>',{class:`inputListElement_unsaved none`})
        )
    )
}
resetInputList = function(list){
    list.text('');
    list.append(
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
    )
}
