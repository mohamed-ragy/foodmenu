drawSwitchBtn = function(autoHelp,text,id,containerClass='checkboxlabel_100p ',inputClass='',tooltip='',checked=false,key=null){
    let switchBtnTxt = '';
    let inputElem = $('<input/>',{id:id,type:'checkbox',class:`checkbox ${inputClass}`,name:'checkbox',key:key,checked:checked});
    let switchBtnSpan = $('<span/>',{class:''});
    if(text != null){
        switchBtnTxt = $('<span/>',{class:text == null ? '' : 'mX5',html:text});
        switchBtnSpan = $('<span/>',{class:'mX5'})
    }
    if(id == null){
        inputElem = $('<input/>',{type:'checkbox',class:`checkbox ${inputClass}`,name:'checkbox',key:key,checked:checked});
    }
    return $('<label/>',{class:`${containerClass}`,autoHelp:autoHelp,tooltip:tooltip}).append(
                switchBtnTxt,
                inputElem,
                switchBtnSpan
            )
}
