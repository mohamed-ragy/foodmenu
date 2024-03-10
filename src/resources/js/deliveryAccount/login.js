window.$ = require("jquery");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');

require("../cpanel/tools/loading.js")
require("../cpanel/tools/form/inputTxt.js")

$('.loginFormContainer').append(
    $('<div/>',{class:'formContainer'}).append(
        $('<a/>',{class:'hvr-tdNone taC pointer',href:process.env.MIX_APP_URL}).append(
            $('<img/>',{class:'foodMenuLogo',src:'/storage/logo/logo.png'})
        ),
        $('<div/>',{class:'m10 fs103 bold',text:window.texts.login}),

        $('<div/>',{class:'taC mX10 w350 mxw100p-40'}).append(
            $('<span/>',{id:'loginMsg',class:'cR',text:''})
        ),
        drawInputText('','ico-delivery','',window.texts.loginName,'loginName','text',window.texts.loginName,200,'clearVal','mY20','',false,''),
        drawInputText('','ico-password','',window.texts.password,'password','password',window.texts.password,200,'password','mT0','',false,''),
        $('<button/>',{class:'btn mT10',id:'loginBtn'}).append(
            $('<div/>',{class:'btnLoading'}),
            $('<div/>',{class:'btnTxt',text:window.texts.login})
        ),
    )
)
$('html,body').on('keypress','#loginName, #password',function(e){
    if(e.which == 13){
        $('#loginBtn').trigger('click');
    }
})
if(Cookies.get('deliveryLoginEmail')){
    $('#loginName').val(Cookies.get('deliveryLoginEmail'));
    $('#password').focus();
}else{
    $('#loginName').focus();
}
$('html,body').on('click','#loginBtn',function(e){
    $('#loginMsg').text('');
    showBtnLoading($('#loginBtn'));
    $('#loginName').prop('disabled',true);
    $('#password').prop('disabled',true);
    let loginName = $('#loginName').val();
    let password = $('#password').val();
    $.ajax({
        url:'/dologin',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            loginName:loginName,
            password:password,
        },success:function(r){
            hideBtnLoading($('#loginBtn'));
            $('#loginName').prop('disabled',false);
            $('#password').prop('disabled',false);
            if(r.status == 1){
                $('#loginFormContainer').css('opacity','0');
                setTimeout(function(){
                    location.reload();
                },400)
            }else if(r.status == 0){
                $('#loginMsg').text(r.msg);
                $('#password').val('').focus();
            }
        }
    })
})
