let params = new URLSearchParams(window.location.search)
if(params.get('unblock') != null){
    showBtnLoading($('#loginBtn'));
    $('#loginEmailinput').val(params.get('email')).prop('disabled',true)
    $('#loginPasswordinput').prop('disabled',true)

    let unblockCode = params.get('unblock');
    window.history.replaceState({},'','/login')
    $.ajax({
        url:'/dologin',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            unblockAccount:unblockCode,
            email:params.get('email'),
        },success:function(r){
            resetLoginForm();
            if(r.code == 0){
                $('#loginMsg').removeClass().addClass('cR').text(r.msg)
            }else if(r.code == 1){
                $('#loginMsg').removeClass().addClass('cG').text(r.msg)
            }
        }
    })
}
