window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
require('../page_loading.js')
require("../cpanel/tools/loading.js")
require('../cpanel/tools/form/checkbox.js')

require("./billing/tools/tooltip.js")

require('./billing/draw_pages.js')
require('./billing/events.js')
require('./billing/functions.js')

require('./billing/showPage.js')
require('./billing/showPopup.js')
require('./billing/process_data.js')

hide_page_loading();
showPopup('login')
$('#confirmIdentity').select()
$('html,body').on('keypress','#confirmIdentity',function(e){
    e.stopImmediatePropagation();
    if(e.which == 13){
        $('#confirmIdentity_btn').trigger('click')
    }
})
$('html,body').on('click','#confirmIdentity_btn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#confirmIdentity_btn'));
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            get_data:true,
            password:$('#confirmIdentity').val(),
        },success:function(r){
            hideBtnLoading($('#confirmIdentity_btn'));
            if(r.passwordCheck == 1){
                process_data(r)
                closePopup();
            }else if(r.passwordCheck == 0){
                $('#confirmIdentity').val('')
                $('#login-message').removeClass().addClass('cR taC').text(r.msg)
            }else if(r.passwordCheck == 2){
                $('.popupBody').text('').append(
                    $('<div/>',{class:'cR fs101 m5 bold',text:r.msg})
                )
                setTimeout(()=>{
                    window.location.href = process.env.MIX_CPANEL_URL;
                },30000)
            }
        }
    })

})
