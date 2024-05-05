is_saved_checker = function(){
    if(JSON.stringify(window.last_saved_template) == JSON.stringify(window.template)){
        $('#save').prop('disabled',true).text(texts.saved)
        return true;
    }else{
        $('#save').prop('disabled',false).text(texts.save)
        return false;
    }
}
