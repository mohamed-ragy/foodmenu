showLoading = function(elem){
    elem.css('visibility','visible')
}
hideLoading = function(elem){
    elem.css('visibility','hidden')
}

showBtnLoading = function(btn){
    btn.prop('disabled',true)
    btn.find('.btnTxt').css('visibility','hidden')
    btn.find('.btnLoading').css('visibility','visible')
    btn.find('.btnLoading_s').css('visibility','visible')
}
hideBtnLoading = function(btn){
    btn.prop('disabled',false)
    btn.find('.btnTxt').css('visibility','visible')
    btn.find('.btnLoading').css('visibility','hidden')
    btn.find('.btnLoading_s').css('visibility','hidden')
}
