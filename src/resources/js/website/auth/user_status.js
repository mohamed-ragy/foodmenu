user_status = function(status){
    if(status == null){return;}
    status.status !== 'user_idle' ?  auth.last_status = status : null;

    switch(status.status){
        //here will add params if the status should has ones and get them from window[param] .. ex window.product window.category
    }

    $.ajax({
        url:'/api/activity',
        data:{new_activity:status}
    })
}
reset_auth_idel_interval = function(){
    if(auth.is_idel >= 60){
        user_status(auth.last_status);
        auth.is_idel = 0;
        auth.idel_interval = setInterval(() => {
            auth.is_idel++;
            if(auth.is_idel >= 60){
                user_status({'status' :'user_idle'});
                clearInterval(auth.idel_interval);
            }
        }, 1000);
    }
}
auth.idel_interval = setInterval(() => {
    auth.is_idel++;
    if(auth.is_idel >= 60){
        user_status({'status' :'user_idle'});
        clearInterval(auth.idel_interval);
    }
}, 1000);
$(window).focus(() => {
    reset_auth_idel_interval();
})
$(document).on('keydown mousemove',() => {
    reset_auth_idel_interval()
});
