window.auth = {
    is_idel:0,
    idel_interval:null,
    last_status:null,
}
if(window.user != null){
    auth.id = window.user.id;
    auth.type = 'user';
    auth.name = window.user.name;
}
else if(window.guest != null){
    auth.id = window.guest.id;
    auth.type = 'guest';
    auth.name = window.guest.name;
}

