// websockets events in the liveChat.js file

let userIsIdle = 0;
let lastUserStatus = null;
let userIsIdleInterval = null;
userStatus = (status) => {
    if(status == null){return;}
    console.log(status)
    status.status !== 'user_idle' ?  lastUserStatus = status.status : null;
    // if(loginCheck){
        $.ajax({
            url:'/website/activity',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                newActivity:status,
            }
        })
    // }
    // loginCheck ? userStatusChannel.whisper('userStatus',{status:status,userId:user.id})
    // : userStatusChannel.whisper('userStatus',{status:status,userId:'guest_'+user.id })

    status.status == 'user_browse_home' ? routeName = 'website.home' : null;
    status.status == 'user_browse_aboutus' ? routeName = 'website.aboutus' : null;
    status.status == 'user_browse_allproducts' ? routeName = 'website.allproducts' : null;
    status.status == 'user_browse_privacyPolicy' ? routeName = 'website.privacypolicy' : null;
    status.status == 'user_manageProfile' ? routeName = 'website.profile' : null;
    status.status == 'user_changePassword' ? routeName = 'website.profile' : null;
    status.status == 'user_changeEmail' ? routeName = 'website.profile' : null;
    status.status == 'user_checkOrderHistory' ? routeName = 'website.profile' : null;
    status.status == 'user_browse_category' ? routeName = 'website.category' : null;
    status.status == 'user_browse_category' ? pageCategoryId = status.categoryId : null;
    status.status == 'user_browse_product' ? routeName = 'website.product' : null;
    status.status == 'user_browse_product' ? pageProductId = products.find(item=> item.name == status.productName).id : null;
}
lastUserStatusFun = function(){
    userStatus(lastUserStatus);
}
userStatusBrowsingPage = () => {
    return;
    let status ;
    routeName == 'website.home' ? status = {'status': 'user_browse_home'}
    : routeName == 'website.aboutus' ? status = {'status': 'user_browse_aboutus'}
    : routeName == 'website.allproducts' ? status = {'status': 'user_browse_allproducts'}
    : routeName == 'website.category' ? status = {'status': 'user_browse_category','category':categories.find(item=>item.id == pageCategoryId).name}
    : routeName == 'website.product' ? status = {'status': 'user_browse_product','product':products.find(item=> item.id == pageProductId).name}
    : routeName == 'website.privacypolicy' ? status = {'status': 'user_browse_privacyPolicy'}
    : routeName == 'website.profile' ? status = {'status': 'user_manageProfile'}
    :null;
    userStatus(status);
}
$(window).focus(() => {
    if(userIsIdle >= 60){
        userStatus(lastUserStatus);
        userIsIdle = 0;
        userIsIdleInterval = setInterval(() => {
            userIsIdle++;
            if(userIsIdle >= 60){
                userStatus({'status' :'user_idle'});
                clearInterval(userIsIdleInterval);
            }
        }, 1000);
    }
})
$(document).on('keydown mousemove',() => {
    if(userIsIdle >= 60){
        userStatus(lastUserStatus);
        userIsIdle = 0;
        userIsIdleInterval = setInterval(() => {
            userIsIdle++;
            if(userIsIdle >= 60){
                userStatus({'status' :'user_idle'});
                clearInterval(userIsIdleInterval);
            }
        }, 1000);
    }
});

userIsIdleInterval = setInterval(() => {
    userIsIdle++;
    if(userIsIdle >= 60){
        userStatus({'status' :'user_idle'});
        clearInterval(userIsIdleInterval);
    }
}, 1000);

if(loginCheck){
    setInterval(()=>{
        $.ajax({
            url:'/website/activity',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                userLastSeen:true,
            }
        })
    },60000)

}
