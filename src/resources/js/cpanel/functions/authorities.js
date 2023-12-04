
authorities = function(){
    if(account.is_master == false){
        $('.authority_master').hide();
    }
    if(account.authorities[0] == 0){
        $('.authority_0').hide();
    }
    if(account.authorities[1] == 0){
        $('.authority_1').hide();
    }
    if(account.authorities[2] == 0){
        $('.authority_2').hide();
    }
    if(account.authorities[3] == 0){
        $('.authority_3').hide();
    }
    if(account.authorities[4] == 0){
        $('.authority_4').hide();
    }
    if(account.authorities[5] == 0){
        $('.authority_5').hide();
    }
}
authorities();
