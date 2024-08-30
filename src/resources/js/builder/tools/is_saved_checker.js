is_saved_checker = function(){
    if(JSON.stringify(window.last_saved_template) == JSON.stringify(window.template)){
        $('#save').prop('disabled',true).find('.btnTxt').text(texts.saved)
        return true;
    }else{
        $('#save').prop('disabled',false).find('.btnTxt').text(texts.save)
        return false;
    }
}
