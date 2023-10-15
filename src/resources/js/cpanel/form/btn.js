drawSaveCancelBtns = function(saveId,cancelId,containerClass,saveBtnKey){
    return $('<div/>',{class:`btnContainer ${containerClass}`}).append(
        $('<button/>',{class:'btn btn-cancel',text:texts.cpanel.public.cancel,id:cancelId}),
        $('<button/>',{class:'btn mis-5',id:saveId,key:saveBtnKey}).append(
            $('<div/>',{class:'btnLoading'}),
            $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
        ),
    )
}
