addToInputList = function(list,text,key,_class=''){
    if(list.children().first().hasClass('inputListElementLoading1')){
        list.text('');
    }
    list.append(
        $('<div/>',{
            html:text,
            key:key,
            class:`inputListElement ${_class}`
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
