// require("../bootstrap");
window.$ = require("jquery");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');

$(document).ready(function(){

    require("../cpanel/tools/loading.js")

    $('.clearVal').on('click',function(){
        if($(this).closest('.inputTextContainer').find('.inputText').prop('disabled')){return}
        $(this).closest('.inputTextContainer').find('.inputText').val('')
    });
    $('.passwordShowHide').on('click',function(){
        if($(this).hasClass('ico-showPassword')){
            $(this).removeClass('ico-showPassword').addClass('ico-hidePassword');
            $(this).closest('.inputTextContainer').find('.inputText').prop('type','text');
        }else if($(this).hasClass('ico-hidePassword')){
            $(this).removeClass('ico-hidePassword').addClass('ico-showPassword');
            $(this).closest('.inputTextContainer').find('.inputText').prop('type','password');
        }
    });
    $('#loginName, #password').on('keypress',function(e){
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


    $('#loginBtn').on('click',function(e){
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

});
