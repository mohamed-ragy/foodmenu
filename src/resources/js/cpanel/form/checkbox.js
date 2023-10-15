drawSwitchBtn = function(autoHelp,text,id,containerClass='checkboxlabel_100p ',inputClass=''){
    let switchBtnTxt = '';
    let inputElem = $('<input/>',{id:id,type:'checkbox',class:`checkbox ${inputClass}`,name:'checkbox'});
    let switchBtnSpan = $('<span/>',{class:''});
    if(text != null){
        switchBtnTxt = $('<span/>',{class:'mX5',html:text});
        switchBtnSpan = $('<span/>',{class:'mX5'})
    }
    if(id == null){
        inputElem = $('<input/>',{type:'checkbox',class:`checkbox ${inputClass}`,name:'checkbox'});
    }
    return $('<label/>',{class:`${containerClass}`,autoHelp:autoHelp}).append(
                switchBtnTxt,
                inputElem,
                switchBtnSpan
            )
}
