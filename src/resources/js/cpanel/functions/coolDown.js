window.coolDown = 0;
setInterval(()=>{
    window.coolDown = 0;
},15000)
coolDownChecker = function(){
    if(window.coolDown > 7){
        showAlert('warning',texts.cpanel.public.coolDown,4000,true);
        return false;
    }else{
        window.coolDown ++;
        return true;
    }
}
