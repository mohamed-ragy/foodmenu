window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
require('../page_loading.js')

require('../cpanel/tools/loading.js')
require('../cpanel/functions/coolDown.js')

require('../builder/tools/alerts.js')
require('../builder/tools/tooltip.js');
require('../builder/tools/popup.js');
require('../builder/tools/editor_popup.js');
require('../builder/tools/is_saved_checker.js');
require('../builder/tools/selectors.js');

require('../builder/process_data.js')
require('../builder/undo_redo.js')
require('../builder/website_style.js')

require('./draw.js')

$.ajax({
    url:'api',
    type:'post',
    data:{
        _token:$('meta[name="csrf-token"]').attr('content'),
        getData:true,
        template_id:window.template_id,
    },success:function(r){
        process_data(r);
    }
})
$('html,body').on('click',function(e){
    hide_components_menu()
    hide_website_style_menu();
    $('.editor_popup').addClass('editor_popup_dump')
    hidePopupSelectors();
})

window.addEventListener("beforeunload", function (e) {
    if(!is_saved_checker()){
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
    }
  });

$('html,body').on('keydown',function(e){
    e.stopImmediatePropagation();
    if(e.shiftKey && e.ctrlKey && e.which == 90){
        redo();
    }
    else if(e.ctrlKey && e.which == 90){
        undo();
    }else if(e.ctrlKey && e.which == 83){
        e.preventDefault();
        if(!is_saved_checker()){
            save();
        }
    }

})

save = function(){
    if(!coolDownChecker()){return;}
    return new Promise(function(resolve,reject){

        let save_template = JSON.parse(JSON.stringify(window.template))
        $.ajax({
            url:'api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                save_template:true,
                template:save_template,
            },success:function(r){
                // process_data(r);
                if(r.save_template_state == 1){
                    window.last_saved_template = JSON.parse(JSON.stringify(save_template))
                    resolve();
                }else if(r.save_template_state == 0){
                    showAlert('error',texts.responses.tempalteSaveFail,4000,true);
                    reject();
                }
            }
        })

    });

}
$('html,body').on('click','#save',function(e){
    e.stopImmediatePropagation();

    showBtnLoading($('#save'))
    // save().then()
    save().then(function(){
        hideBtnLoading($('#save'))
        if(is_saved_checker()){
            $('#save').prop('disabled',true)
        }else{
            $('#save').prop('disabled',false)
        }
        showAlert('success',texts.responses.templateSaved,4000,true);
    })
})


