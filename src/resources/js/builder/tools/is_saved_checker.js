is_saved_checker = function(){
    if(JSON.stringify(window.last_saved_template) == JSON.stringify(window.template)){
        return true;
    }else{
        return false;
    }
}
